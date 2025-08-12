import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialiser le client Supabase pour Phase 3
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface VoiceRequest {
  text: string;
  userId?: string;
  voice?: string;
  emotion?: 'happy' | 'thinking' | 'helper' | 'alert' | 'excited' | 'confused';
  language?: string;
  module?: string;
  streaming?: boolean;
}

interface VoiceResponse {
  audioUrl?: string;
  audioData?: string;
  duration?: number;
  emotion: string;
  voiceId: string;
  success: boolean;
}

// Mappage des émotions vers les voix ElevenLabs optimisées
const getOptimalVoice = (emotion: string = 'happy', language: string = 'fr'): string => {
  const voiceMap = {
    'happy': 'Aria',         // Voix joyeuse et engageante
    'thinking': 'Sage',      // Voix réfléchie et posée
    'helper': 'Alice',       // Voix douce et serviable
    'alert': 'Echo',         // Voix claire et directe
    'excited': 'Shimmer',    // Voix énergique et dynamique
    'confused': 'Ballad',    // Voix empathique
    'curious': 'River',      // Voix curieuse
    'dormant': 'Coral'       // Voix calme
  };
  
  return voiceMap[emotion as keyof typeof voiceMap] || 'Aria';
};

// Optimisation du texte pour la synthèse vocale émotionnelle
const optimizeTextForEmotion = (text: string, emotion: string): string => {
  const emotionalMarkers = {
    'happy': { prefix: '✨ ', suffix: ' 😊', tone: 'joyeux' },
    'thinking': { prefix: '🤔 ', suffix: '...', tone: 'réfléchi' },
    'helper': { prefix: '💡 ', suffix: ' !', tone: 'bienveillant' },
    'alert': { prefix: '⚠️ ', suffix: ' !', tone: 'urgent' },
    'excited': { prefix: '🚀 ', suffix: ' 🎉', tone: 'enthousiaste' },
    'confused': { prefix: '❓ ', suffix: ' ?', tone: 'interrogatif' }
  };

  const marker = emotionalMarkers[emotion as keyof typeof emotionalMarkers];
  if (!marker) return text;

  // Ajout des marqueurs émotionnels pour influencer la synthèse
  return `${marker.prefix}${text}${marker.suffix}`;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: VoiceRequest = await req.json();
    const { text, userId, emotion = 'happy', language = 'fr', module = 'voice', streaming = false } = body;
    
    const startTime = Date.now();

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    if (!ELEVENLABS_API_KEY) {
      console.error('ELEVENLABS_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Voice synthesis service not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Optimiser le texte selon l'émotion
    const optimizedText = optimizeTextForEmotion(text, emotion);
    
    // Sélectionner la voix optimale
    const selectedVoice = getOptimalVoice(emotion, language);
    
    console.log(`Generating voice with emotion: ${emotion}, voice: ${selectedVoice}`);

    // Configuration avancée pour la synthèse émotionnelle
    const voiceConfig = {
      model_id: streaming ? "eleven_turbo_v2_5" : "eleven_multilingual_v2",
      voice_settings: {
        stability: emotion === 'alert' ? 0.8 : 0.5,
        similarity_boost: 0.8,
        style: emotion === 'excited' ? 1.0 : 0.5,
        use_speaker_boost: true
      },
      pronunciation_dictionary_locators: language === 'fr' ? ['french'] : []
    };

    // Appel à l'API ElevenLabs avec configuration émotionnelle
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: optimizedText,
        ...voiceConfig
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    // Conversion en base64 pour le streaming temps réel
    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    const voiceResponse: VoiceResponse = {
      audioData: base64Audio,
      emotion,
      voiceId: selectedVoice,
      success: true,
      duration: Math.ceil(text.length * 0.1) // Estimation approximative
    };

    const responseTime = Date.now() - startTime;
    
    // Enregistrer l'interaction vocale Phase 3 pour analytics
    if (userId) {
      try {
        await supabase
          .from('lilo_voice_interactions')
          .insert({
            user_id: userId,
            transcript: text,
            voice_id: selectedVoice,
            voice_model: voiceConfig.model_id,
            emotion: emotion,
            response_time_ms: responseTime,
            synthesis_quality: 'high',
            confidence: 0.95,
            module: module,
            metadata: {
              phase: 'Phase 3',
              engine: 'ElevenLabs',
              streaming: streaming,
              language: language
            }
          });
      } catch (dbError) {
        console.error('Failed to save voice interaction:', dbError);
      }
    }

    console.log(`🎙️ LILO™ Voice Phase 3 - ${responseTime}ms, ${text.length} chars, emotion: ${emotion}`);

    return new Response(
      JSON.stringify(voiceResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in lilo-voice-engine:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Voice synthesis failed',
        success: false,
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});