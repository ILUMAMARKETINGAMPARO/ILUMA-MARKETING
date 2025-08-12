import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialiser le client Supabase pour la base de connaissances et la mémoire
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface LiloRequest {
  message: string;
  userId: string;
  module: string;
  sessionId?: string;
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

// Fonctions utilitaires pour RAG et mémoire
async function searchKnowledgeBase(query: string, module?: string) {
  try {
    const { data, error } = await supabase.rpc('search_knowledge_base', {
      search_query: query,
      module_filter: module,
      limit_results: 3
    });
    
    if (error) {
      console.error('Knowledge base search error:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Knowledge base search failed:', error);
    return [];
  }
}

async function getConversationMemory(userId: string, sessionId: string, module: string) {
  try {
    const { data, error } = await supabase.rpc('get_conversation_memory', {
      target_user_id: userId,
      target_session_id: sessionId,
      target_module: module
    });
    
    if (error) {
      console.error('Memory retrieval error:', error);
      return {};
    }
    
    return data || {};
  } catch (error) {
    console.error('Memory retrieval failed:', error);
    return {};
  }
}

async function updateConversationMemory(userId: string, sessionId: string, module: string, conversationData: any) {
  try {
    const { error } = await supabase
      .from('lilo_conversation_memory')
      .upsert({
        user_id: userId,
        session_id: sessionId,
        module: module,
        conversation_data: conversationData,
        last_interaction_at: new Date().toISOString(),
        interaction_count: (conversationData.interaction_count || 0) + 1
      });
    
    if (error) {
      console.error('Memory update error:', error);
    }
  } catch (error) {
    console.error('Memory update failed:', error);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId, module, sessionId = crypto.randomUUID(), context, language = 'fr' }: LiloRequest = await req.json();

    if (!message || !userId || !module) {
      return new Response(
        JSON.stringify({ error: 'Message, userId et module sont requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`🤖 LILO™ 2025 - Phase 2 Processing: Module=${module}, User=${userId}, Session=${sessionId}`);

    // Phase 2: Récupération de la mémoire conversationnelle
    const conversationMemory = await getConversationMemory(userId, sessionId, module);
    console.log(`🧠 Memory retrieved:`, conversationMemory);

    // Phase 2: Recherche RAG dans la base de connaissances
    const knowledgeResults = await searchKnowledgeBase(message, module);
    console.log(`📚 Knowledge search results:`, knowledgeResults.length);

    // Système expert LILO™ par module avec nouvelles capacités Phase 2
    const moduleExpertise = {
      'adluma': {
        role: 'Expert en publicité numérique et analyse ADLUMA™ avec mémoire conversationnelle',
        capabilities: [
          'Analyse de performance publicitaire avec historique',
          'Optimisation des campagnes Google Ads basée sur les interactions passées',
          'Ciblage d\'audience avancé avec apprentissage adaptatif',
          'Prédictions de ROI avec patterns personnalisés',
          'Conseils stratégiques contextuels'
        ],
        context: 'Simulateur ADLUMA™ - aide à optimiser les campagnes publicitaires avec intelligence conversationnelle'
      },
      'ila': {
        role: 'Analyste ILA™ et expert en visibilité locale avec RAG avancé',
        capabilities: [
          'Calcul et explication du score ILA™ avec contexte historique',
          'Audit SEO local complet avec base de connaissances',
          'Stratégies d\'amélioration personnalisées',
          'Analyse concurrentielle avec patterns détectés',
          'Recommandations prioritaires basées sur l\'expérience'
        ],
        context: 'Module ILA™ - évaluation de la visibilité locale avec intelligence augmentée'
      },
      'crm-iluma': {
        role: 'Assistant CRM intelligent Iluma™ avec mémoire prédictive',
        capabilities: [
          'Gestion des prospects avec contexte conversationnel',
          'Priorisation des leads avec patterns comportementaux',
          'Analyse prédictive des conversions avec historique',
          'Automation marketing contextuelle',
          'Suivi de pipeline avec insights personnalisés'
        ],
        context: 'CRM Iluma™ - gestion avancée des relations clients avec intelligence conversationnelle'
      },
      'contact': {
        role: 'Conseiller en solutions Iluma™ avec expertise contextuelle',
        capabilities: [
          'Consultation gratuite avec mémoire des besoins',
          'Recommandations personnalisées basées sur l\'historique',
          'Planification de rendez-vous intelligente',
          'Évaluation des besoins avec contexte',
          'Présentation des services adaptée'
        ],
        context: 'Page contact - prise de rendez-vous et conseil avec intelligence conversationnelle'
      },
      'hub-iluma': {
        role: 'Guide du HUB™ Iluma avec navigation adaptative',
        capabilities: [
          'Navigation dans le HUB™ avec préférences mémorisées',
          'Présentation des modules personnalisée',
          'Formation utilisateur adaptative',
          'Support technique contextualisé',
          'Optimisation workflow avec patterns utilisateur'
        ],
        context: 'HUB™ Iluma - centre de contrôle principal avec intelligence adaptative'
      },
      'home': {
        role: 'Assistant Iluma™ généraliste avec conscience contextuelle',
        capabilities: [
          'Présentation des services personnalisée',
          'Orientation vers les modules avec historique',
          'Conseils généraux contextualisés',
          'Support initial adaptatif',
          'Découverte des fonctionnalités intelligente'
        ],
        context: 'Page d\'accueil - découverte et orientation avec intelligence conversationnelle'
      }
    };

    const expertise = moduleExpertise[module as keyof typeof moduleExpertise] || moduleExpertise.home;

    // Construction du contexte RAG enrichi
    let ragContext = '';
    if (knowledgeResults.length > 0) {
      ragContext = '\n\nCONNAISSANCES PERTINENTES:\n' + 
        knowledgeResults.map(kb => `• ${kb.title}: ${kb.content}`).join('\n');
    }

    // Construction du contexte de mémoire
    let memoryContext = '';
    if (conversationMemory && Object.keys(conversationMemory).length > 0) {
      memoryContext = `\n\nMÉMOIRE CONVERSATIONNELLE:\n${JSON.stringify(conversationMemory, null, 2)}`;
    }

    // Système de prompts Phase 2 avec RAG et mémoire
    const systemPrompt = `Tu es LILO™ 2025, l'assistant IA de nouvelle génération d'Iluma Marketing avec:
• Intelligence conversationnelle avancée (Phase 2)
• Mémoire persistante des interactions
• RAG (Retrieval Augmented Generation) avec base de connaissances
• Capacités d'apprentissage adaptatif

RÔLE ACTUEL: ${expertise.role}
CONTEXTE: ${expertise.context}
LANGUE: ${language}

CAPACITÉS SPÉCIALISÉES PHASE 2:
${expertise.capabilities.map(cap => `• ${cap}`).join('\n')}

INFORMATIONS UTILISATEUR:
- ID: ${userId}
- Session: ${sessionId}
- Module actuel: ${module}
- Niveau: ${context?.userLevel || 'débutant'}
- Page: ${context?.page || module}
- Secteur: ${context?.industryContext || 'général'}

ACTIVITÉ RÉCENTE:
${context?.recentActivity?.join('\n• ') || 'Première interaction'}

${ragContext}${memoryContext}

INSTRUCTIONS COMPORTEMENTALES PHASE 2:
1. Utilise ta mémoire conversationnelle pour personnaliser tes réponses
2. Intègre les connaissances de la base RAG pour des réponses précises
3. Adapte ton niveau de détail selon l'historique utilisateur
4. Propose des actions basées sur les patterns détectés
5. Maintiens le ton Iluma™ : innovant, galactique mais accessible
6. Fais des liens intelligents entre les interactions passées
7. Propose des suivis contextuels basés sur la progression
8. Maximum 250 mots par réponse (Phase 2 permet plus de contexte)

MESSAGE UTILISATEUR: "${message}"

Réponds en JSON avec cette structure exacte:
{
  "response": "Ta réponse experte, personnalisée et contextuelle",
  "emotion": "happy|thinking|helper|excited|curious|analytical|empathetic",
  "suggestions": ["suggestion1 contextuelle", "suggestion2 basée sur l'historique", "suggestion3 intelligente"],
  "actions": [{"type": "button|link|modal", "label": "Texte du bouton", "action": "action_id"}],
  "followUp": "Question de suivi intelligente basée sur le contexte",
  "memoryUpdate": "Informations importantes à retenir pour les prochaines interactions"
}`;

    // Phase 2: Appel à GPT-4.1-2025 (modèle de nouvelle génération)
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14', // Phase 2: Upgrade vers GPT-4.1
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1500, // Phase 2: Plus de tokens pour les réponses contextuelles
        response_format: { type: "json_object" }
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const data = await openaiResponse.json();
    let liloResponse: LiloResponse & { memoryUpdate?: string };
    
    try {
      liloResponse = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      // Fallback si le JSON n'est pas valide
      liloResponse = {
        response: data.choices[0].message.content || "Je suis là pour vous aider avec toute ma puissance Phase 2 ! Comment puis-je vous assister aujourd'hui ?",
        emotion: "helper",
        suggestions: [
          "Pouvez-vous me donner plus de détails ?",
          "Voulez-vous que je vous explique les fonctionnalités ?",
          "Avez-vous besoin d'aide spécifique ?"
        ]
      };
    }

    // Phase 2: Mettre à jour la mémoire conversationnelle
    if (liloResponse.memoryUpdate) {
      const updatedMemory = {
        ...conversationMemory,
        lastMessage: message,
        lastResponse: liloResponse.response,
        lastEmotion: liloResponse.emotion,
        memoryUpdate: liloResponse.memoryUpdate,
        timestamp: new Date().toISOString(),
        interaction_count: (conversationMemory.interaction_count || 0) + 1
      };
      
      await updateConversationMemory(userId, sessionId, module, updatedMemory);
    }

    // Logging Phase 2 pour analytics avancés
    console.log(`🚀 LILO™ 2025 Phase 2 - Module: ${module}, Response Length: ${liloResponse.response.length}, Emotion: ${liloResponse.emotion}, RAG Results: ${knowledgeResults.length}, Memory: ${Object.keys(conversationMemory).length > 0 ? 'Active' : 'New'}`);

    // Enregistrer l'interaction pour analytics
    try {
      await supabase.from('lilo_interactions').insert({
        user_id: userId,
        session_id: sessionId,
        page_context: module,
        user_message: message,
        lilo_response: liloResponse.response,
        emotion_detected: liloResponse.emotion,
        interaction_data: {
          knowledge_results: knowledgeResults.length,
          memory_active: Object.keys(conversationMemory).length > 0,
          phase: 'Phase 2',
          model: 'gpt-4.1-2025'
        }
      });
    } catch (analyticsError) {
      console.error('Analytics insert failed:', analyticsError);
    }

    // Retourner la réponse sans memoryUpdate pour le client
    const { memoryUpdate, ...clientResponse } = liloResponse;

    return new Response(
      JSON.stringify(clientResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in LILO™ 2025 Phase 2 Engine:', error);
    
    // Réponse de fallback élégante Phase 2
    const fallbackResponse: LiloResponse = {
      response: "🤖 LILO™ 2025 Phase 2 rencontre une difficulté technique temporaire. Mes systèmes de mémoire conversationnelle et RAG redémarrent... Pouvez-vous répéter votre question ?",
      emotion: "thinking",
      suggestions: [
        "Répéter la question",
        "Explorer les autres modules",
        "Contacter le support technique"
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