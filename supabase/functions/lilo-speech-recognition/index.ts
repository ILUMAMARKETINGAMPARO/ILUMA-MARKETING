import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SpeechRequest {
  audio: string; // base64 encoded audio
  language?: string;
  module?: string;
  userId?: string;
  continuous?: boolean;
}

interface SpeechResponse {
  text: string;
  confidence: number;
  language: string;
  duration: number;
  success: boolean;
  suggestions?: string[];
}

// Fonction pour optimiser les chunks audio
function processBase64AudioChunks(base64String: string, chunkSize = 32768) {
  const chunks: Uint8Array[] = [];
  let position = 0;
  
  while (position < base64String.length) {
    const chunk = base64String.slice(position, position + chunkSize);
    const binaryChunk = atob(chunk);
    const bytes = new Uint8Array(binaryChunk.length);
    
    for (let i = 0; i < binaryChunk.length; i++) {
      bytes[i] = binaryChunk.charCodeAt(i);
    }
    
    chunks.push(bytes);
    position += chunkSize;
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

// Génération de suggestions contextuelles selon le module
const generateContextualSuggestions = (text: string, module?: string): string[] => {
  const baseQuestions = {
    'adluma': [
      "Comment optimiser mes campagnes Google Ads ?",
      "Quel budget recommandez-vous pour mon secteur ?",
      "Comment améliorer mon ROI publicitaire ?"
    ],
    'ila': [
      "Comment améliorer mon score ILA™ ?",
      "Que signifie ma note actuelle ?",
      "Quelles sont mes priorités SEO ?"
    ],
    'crm-iluma': [
      "Comment mieux qualifier mes prospects ?",
      "Quelle stratégie de suivi recommandez-vous ?",
      "Comment automatiser mon pipeline de vente ?"
    ],
    'hub-iluma': [
      "Montrez-moi les outils disponibles",
      "Comment intégrer tous ces services ?",
      "Quel est le meilleur point de départ ?"
    ],
    'contact': [
      "Quels services correspondent à mes besoins ?",
      "Comment planifier une consultation ?",
      "Quel est votre processus de travail ?"
    ],
    'home': [
      "Que peut faire Iluma™ pour moi ?",
      "Par où commencer ?",
      "Montrez-moi vos services"
    ]
  };

  const moduleQuestions = baseQuestions[module as keyof typeof baseQuestions] || baseQuestions.home;
  
  // Filtrer selon le contexte de la reconnaissance vocale
  if (text.toLowerCase().includes('aide') || text.toLowerCase().includes('help')) {
    return moduleQuestions.slice(0, 2);
  }
  
  if (text.toLowerCase().includes('comment') || text.toLowerCase().includes('how')) {
    return moduleQuestions.filter(q => q.toLowerCase().includes('comment'));
  }
  
  return moduleQuestions.slice(0, 3);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: SpeechRequest = await req.json();
    const { audio, language = 'fr', module, userId, continuous = false } = body;

    if (!audio) {
      return new Response(
        JSON.stringify({ error: 'Audio data is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Speech recognition service not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log(`Processing speech recognition for language: ${language}, module: ${module}`);

    // Traitement optimisé des chunks audio
    const binaryAudio = processBase64AudioChunks(audio);
    
    // Préparation du formulaire pour Whisper
    const formData = new FormData();
    const audioBlob = new Blob([binaryAudio], { type: 'audio/webm' });
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', language === 'fr' ? 'fr' : 'en');
    formData.append('response_format', 'verbose_json');
    formData.append('temperature', '0.2'); // Plus de précision

    const startTime = Date.now();

    // Appel à l'API OpenAI Whisper
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI Whisper API error:', response.status, errorText);
      throw new Error(`Whisper API error: ${response.status}`);
    }

    const result = await response.json();
    const processingTime = Date.now() - startTime;

    // Génération de suggestions contextuelles
    const suggestions = generateContextualSuggestions(result.text, module);

    const speechResponse: SpeechResponse = {
      text: result.text,
      confidence: result.segments?.[0]?.no_speech_prob ? 
        1 - result.segments[0].no_speech_prob : 0.9,
      language: result.language || language,
      duration: processingTime,
      success: true,
      suggestions
    };

    console.log(`Speech recognition successful: "${result.text}" (${processingTime}ms)`);

    // Enregistrement de l'interaction pour l'apprentissage
    if (userId && module) {
      // TODO: Enregistrer dans la table lilo_interactions pour améliorer l'IA
      console.log(`Logging interaction for user ${userId} in module ${module}`);
    }

    return new Response(
      JSON.stringify(speechResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in lilo-speech-recognition:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Speech recognition failed',
        success: false,
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});