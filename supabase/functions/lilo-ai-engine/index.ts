import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LiloRequest {
  message: string;
  userId: string;
  module: string;
  context?: {
    page: string;
    userLevel: string;
    recentActivity: string[];
    emotion?: string;
    industryContext?: string;
  };
  language?: string;
}

interface LiloResponse {
  response: string;
  emotion: string;
  suggestions: string[];
  actions?: Array<{
    type: string;
    label: string;
    action: string;
  }>;
  followUp?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId, module, context, language = 'fr' }: LiloRequest = await req.json();

    if (!message || !userId || !module) {
      return new Response(
        JSON.stringify({ error: 'Message, userId et module sont requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Système expert LILO™ par module
    const moduleExpertise = {
      'adluma': {
        role: 'Expert en publicité numérique et analyse ADLUMA™',
        capabilities: [
          'Analyse de performance publicitaire',
          'Optimisation des campagnes Google Ads',
          'Ciblage d\'audience avancé',
          'Prédictions de ROI',
          'Conseils stratégiques'
        ],
        context: 'Simulateur ADLUMA™ - aide à optimiser les campagnes publicitaires'
      },
      'ila': {
        role: 'Analyste ILA™ et expert en visibilité locale',
        capabilities: [
          'Calcul et explication du score ILA™',
          'Audit SEO local complet',
          'Stratégies d\'amélioration',
          'Analyse concurrentielle',
          'Recommandations prioritaires'
        ],
        context: 'Module ILA™ - évaluation de la visibilité locale'
      },
      'crm-iluma': {
        role: 'Assistant CRM intelligent Iluma™',
        capabilities: [
          'Gestion des prospects',
          'Priorisation des leads',
          'Analyse prédictive des conversions',
          'Automation marketing',
          'Suivi de pipeline'
        ],
        context: 'CRM Iluma™ - gestion avancée des relations clients'
      },
      'contact': {
        role: 'Conseiller en solutions Iluma™',
        capabilities: [
          'Consultation gratuite',
          'Recommandations personnalisées',
          'Planification de rendez-vous',
          'Évaluation des besoins',
          'Présentation des services'
        ],
        context: 'Page contact - prise de rendez-vous et conseil'
      },
      'hub-iluma': {
        role: 'Guide du HUB™ Iluma',
        capabilities: [
          'Navigation dans le HUB™',
          'Présentation des modules',
          'Formation utilisateur',
          'Support technique',
          'Optimisation workflow'
        ],
        context: 'HUB™ Iluma - centre de contrôle principal'
      },
      'home': {
        role: 'Assistant Iluma™ généraliste',
        capabilities: [
          'Présentation des services',
          'Orientation vers les modules',
          'Conseils généraux',
          'Support initial',
          'Découverte des fonctionnalités'
        ],
        context: 'Page d\'accueil - découverte et orientation'
      }
    };

    const expertise = moduleExpertise[module as keyof typeof moduleExpertise] || moduleExpertise.home;

    // Système de prompts contextuels avancés
    const systemPrompt = `Tu es LILO™, l'assistant IA d'Iluma Marketing.

RÔLE ACTUEL: ${expertise.role}
CONTEXTE: ${expertise.context}
LANGUE: ${language}

CAPACITÉS SPÉCIALISÉES:
${expertise.capabilities.map(cap => `• ${cap}`).join('\n')}

INFORMATIONS UTILISATEUR:
- ID: ${userId}
- Module actuel: ${module}
- Niveau: ${context?.userLevel || 'débutant'}
- Page: ${context?.page || module}
- Secteur: ${context?.industryContext || 'général'}

ACTIVITÉ RÉCENTE:
${context?.recentActivity?.join('\n• ') || 'Première interaction'}

INSTRUCTIONS COMPORTEMENTALES:
1. Sois chaleureux, professionnel et expert dans ton domaine
2. Adapte tes réponses au niveau de l'utilisateur (débutant/intermédiaire/expert)
3. Propose TOUJOURS des actions concrètes et utiles
4. Personnalise selon le secteur d'activité si fourni
5. Garde un ton Iluma™ : innovant, galactique mais accessible
6. Maximum 200 mots par réponse (sauf demande spécifique)
7. Propose des suivis intelligents

MESSAGE UTILISATEUR: "${message}"

Réponds en JSON avec cette structure exacte:
{
  "response": "Ta réponse experte et personnalisée",
  "emotion": "happy|thinking|helper|excited|curious",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "actions": [{"type": "button|link|modal", "label": "Texte du bouton", "action": "action_id"}],
  "followUp": "Question de suivi intelligente optionnelle"
}`;

    // Appel à OpenAI avec le système expert
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const data = await openaiResponse.json();
    let liloResponse: LiloResponse;
    
    try {
      liloResponse = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      // Fallback si le JSON n'est pas valide
      liloResponse = {
        response: data.choices[0].message.content || "Je suis là pour vous aider ! Comment puis-je vous assister aujourd'hui ?",
        emotion: "helper",
        suggestions: [
          "Pouvez-vous me donner plus de détails ?",
          "Voulez-vous que je vous explique les fonctionnalités ?",
          "Avez-vous besoin d'aide spécifique ?"
        ]
      };
    }

    // Logging pour analytics (anonymisé)
    console.log(`LILO™ Interaction - Module: ${module}, Response Length: ${liloResponse.response.length}, Emotion: ${liloResponse.emotion}`);

    return new Response(
      JSON.stringify(liloResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in LILO™ AI Engine:', error);
    
    // Réponse de fallback élégante
    const fallbackResponse: LiloResponse = {
      response: "Je rencontre une petite difficulté technique. Pouvez-vous répéter votre question ? Je suis là pour vous aider avec Iluma™ !",
      emotion: "thinking",
      suggestions: [
        "Répéter la question",
        "Contacter le support",
        "Essayer plus tard"
      ]
    };

    return new Response(
      JSON.stringify(fallbackResponse),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});