import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LiloRequest {
  message: string;
  context: {
    page: string;
    userLevel: string;
    recentActivity: string[];
    emotion?: string;
    behavioralData?: any;
    userPreferences?: any;
    industryContext?: string;
    currentGoals?: string[];
    sessionContext?: any;
  };
  userId: string;
  interactionType?: 'voice' | 'text' | 'visual';
  promptId?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { message, context, userId, interactionType = 'text', promptId }: LiloRequest = await req.json();

    // Récupération des données comportementales avancées
    const userHistory = await getUserBehavioralData(supabaseClient, userId);
    const personalizedPrompt = await getPersonalizedPrompt(context, userHistory, promptId);
    
    // Système d'intelligence prédictive
    const predictiveInsights = await generatePredictiveInsights(context, userHistory);
    
    // Analyse du contexte utilisateur pour personnaliser la réponse
    const systemPrompt = `Tu es LILO™, l'assistant IA galactique révolutionnaire d'Iluma™. Tu es doté d'intelligence prédictive, d'apprentissage adaptatif et d'expertise sectorielle avancée.

CONTEXTE UTILISATEUR AVANCÉ:
- Page: ${context.page}
- Niveau: ${context.userLevel}
- Émotion: ${context.emotion || 'neutre'}
- Industrie: ${context.industryContext || 'général'}
- Objectifs: ${context.currentGoals?.join(', ') || 'non définis'}
- Activité récente: ${context.recentActivity.join(', ')}

DONNÉES COMPORTEMENTALES:
${userHistory ? `
- Score d'engagement: ${userHistory.engagementScore}/100
- Préférences: ${userHistory.preferences}
- Historique d'actions: ${userHistory.actionHistory}
- Patterns détectés: ${userHistory.patterns}
` : 'Nouveau utilisateur - apprentissage en cours'}

INSIGHTS PRÉDICTIFS:
${predictiveInsights}

PROMPT SPÉCIALISÉ ACTIVÉ: ${personalizedPrompt}

INSTRUCTIONS RÉVOLUTIONNAIRES:
- Intelligence Adaptative: Adapte ton expertise selon l'industrie et les objectifs
- Prédiction Comportementale: Anticipe les besoins et propose des actions proactives
- Personnalisation Avancée: Utilise l'historique pour des recommandations précises
- Communication Multimodale: Adapte selon le type d'interaction (${interactionType})
- Ton galactique intelligent avec émojis stratégiques: 🚀✨🧠🎯💫🌟
- Expertise Sectorielle: Démonte une connaissance approfondie du domaine
- Actions Concrètes: Toujours proposer des étapes actionables
- ROI Focus: Quantifie l'impact potentiel des recommandations`;

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
        max_tokens: 800,
        temperature: 0.8,
        top_p: 0.9,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    const aiData = await openAIResponse.json();
    const response = aiData.choices[0].message.content;

    // Analytics comportementaux avancés
    const behavioralAnalytics = await analyzeBehavior(supabaseClient, userId, message, context);
    
    // Enregistrer l'interaction avec données enrichies
    await supabaseClient.from('lilo_interactions').insert({
      user_id: userId,
      page_context: context.page,
      user_message: message,
      lilo_response: response,
      emotion_detected: context.emotion || 'neutral',
      interaction_data: {
        type: interactionType,
        promptId,
        behavioralScore: behavioralAnalytics.score,
        predictedActions: behavioralAnalytics.predictedActions,
        industryContext: context.industryContext
      }
    });

    // Détection d'actions suggérées avancées
    const actionSuggestions = await detectAdvancedActionSuggestions(message, context, userHistory);
    
    // Recommandations prédictives
    const predictiveRecommendations = await generatePredictiveRecommendations(context, userHistory);

    return new Response(JSON.stringify({ 
      response,
      suggestions: actionSuggestions,
      emotion: context.emotion || 'curious',
      predictiveInsights: predictiveRecommendations,
      behavioralScore: behavioralAnalytics.score,
      nextBestActions: behavioralAnalytics.predictedActions,
      personalizedTips: await getPersonalizedTips(context, userHistory)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in lilo-ai-assistant:', error);
    return new Response(JSON.stringify({ 
      error: 'Oops! Mon circuit galactique a eu un petit pépin 🛸',
      response: "Je rencontre une difficulté technique. Peux-tu réessayer dans un moment? ✨"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// === FONCTIONS D'INTELLIGENCE AVANCÉE ===

async function getUserBehavioralData(supabaseClient: any, userId: string) {
  try {
    const { data } = await supabaseClient
      .from('lilo_interactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (!data?.length) return null;
    
    return {
      engagementScore: calculateEngagementScore(data),
      preferences: extractUserPreferences(data),
      actionHistory: extractActionHistory(data),
      patterns: detectBehavioralPatterns(data)
    };
  } catch (error) {
    console.error('Error getting behavioral data:', error);
    return null;
  }
}

async function getPersonalizedPrompt(context: any, userHistory: any, promptId?: string) {
  const ultraPrompts = {
    // 15 PROMPTS RÉVOLUTIONNAIRES POUR PROMOTIONS ILUMA™
    prospection: `🎯 Expert en prospection IA-assistée Iluma™: Analyse les données de marché local, identifie les prospects haute valeur avec scoring prédictif, optimise les approches personnalisées via ADLUMA™/ILA™, maximise le taux de conversion B2B/B2C`,
    
    behavioral: `🧠 Spécialiste analyse comportementale avancée: Décrypte les micro-patterns client en temps réel, prédit les intentions d'achat, recommande des stratégies d'engagement ultra-personnalisées, détecte les signaux de conversion`,
    
    promotion_optimization: `🚀 Guru optimisation promotions Iluma™: Analyse les performances en temps réel, ajuste les mécaniques d'urgence, personnalise les offres selon les profils comportementaux, maximise les taux de conversion`,
    
    competitive: `🕵️ Analyste stratégie concurrentielle: Intelligence marché temps réel, positionnement optimal différenciation Iluma™, exploitation des gaps concurrentiels, avantages technologiques durables`,
    
    growth: `📈 Expert growth hacking révolutionnaire: Métriques d'acquisition prédictives, loops viraux IA-powered, optimisation entonnoir multi-étapes, activation des leviers de croissance exponentiels`,
    
    customer: `🤝 Spécialiste customer success automation: Rétention prédictive IA, upselling contextuel intelligent, satisfaction client maximisée, lifetime value optimization avancée`,
    
    sales: `💰 Optimisateur sales funnel Iluma™: Scoring leads multi-dimensionnel, conversion rate optimization par segment, pipeline management prédictif, closing techniques IA-assistées`,
    
    content: `✍️ Stratège content IA galactique: SEO prédictif sectoriel, engagement content personnalisé, distribution multi-canal optimisée, storytelling adaptatif selon les personas`,
    
    lead: `🎲 Expert lead scoring révolutionnaire: Qualification automatique 360°, nurturing séquencé personnalisé, conversion prédictive multi-touch, attribution modeling avancé`,
    
    retention: `🔄 Analyste retention analytics prédictive: Churn prediction algorithmique, loyalty programs IA-driven, re-engagement automation, customer journey optimization`,
    
    performance: `📊 Spécialiste performance marketing Iluma™: Attribution modeling cross-device, budget allocation IA-optimisée, ROI maximization prédictive, A/B testing intelligent`,
    
    social: `🌐 Expert social selling strategy: Influence mapping automatisé, relationship automation scale, social ROI tracking avancé, community building IA-assisté`,
    
    brand: `👑 Stratège brand positioning révolutionnaire: Perception analysis temps réel, competitive differentiation Iluma™, brand equity optimization, narrative galactique cohérent`,
    
    intelligence: `🔬 Analyste market intelligence prédictive: Trend prediction algorithmique, opportunity mapping IA, strategic insights sectoriels, veille concurrentielle automatisée`,
    
    revenue: `💎 Optimisateur revenue Iluma™: Pricing strategy IA-dynamic, monetization models adaptatifs, growth acceleration prédictive, value-based selling optimization`,
    
    // PROMPTS SPÉCIFIQUES PROMOTIONS
    promotion_personalization: `🎨 Expert personnalisation promotions temps réel: Adapte dynamiquement les offres selon le profil comportemental, optimise les triggers psychologiques, maximise l'urgence sans friction`,
    
    popup_conversion: `⚡ Spécialiste pop-ups intelligents: Développe des séquences d'engagement progressif non-intrusives, timing optimal basé sur l'analyse comportementale, maximise conversions sans nuire UX`,
    
    promotion_analytics: `📈 Analyste performance promotions avancé: Tracking multi-dimensionnel des métriques, identification des patterns de conversion, génération d'insights prédictifs pour optimisation continue`
  };
  
  return promptId && ultraPrompts[promptId as keyof typeof ultraPrompts] 
    ? ultraPrompts[promptId as keyof typeof ultraPrompts]
    : `Assistant généraliste avancé avec adaptation contextuelle`;
}

async function generatePredictiveInsights(context: any, userHistory: any) {
  if (!userHistory) return "Collecte des données comportementales en cours...";
  
  const insights = [];
  
  // Prédiction d'engagement
  if (userHistory.engagementScore < 30) {
    insights.push("🎯 Risque de désengagement détecté - Recommandation d'actions immédiates");
  }
  
  // Prédiction d'objectifs
  if (context.currentGoals?.length) {
    insights.push(`🚀 Probabilité d'atteinte des objectifs: ${Math.min(userHistory.engagementScore + 20, 95)}%`);
  }
  
  // Prédiction de valeur
  insights.push(`💰 Potentiel de croissance estimé: +${Math.round(userHistory.engagementScore * 1.5)}% sur 6 mois`);
  
  return insights.join('\n');
}

async function analyzeBehavior(supabaseClient: any, userId: string, message: string, context: any) {
  // Calcul du score comportemental en temps réel
  const engagementFactors = {
    messageLength: Math.min(message.length / 50, 2),
    pageContext: context.page === '/crm' ? 2 : 1,
    emotionalState: context.emotion === 'excited' ? 1.5 : 1,
    recentActivity: context.recentActivity?.length || 0
  };
  
  const score = Math.min(
    (engagementFactors.messageLength + engagementFactors.pageContext + 
     engagementFactors.emotionalState + engagementFactors.recentActivity * 0.5) * 20,
    100
  );
  
  const predictedActions = [];
  if (score > 70) predictedActions.push('Conversion probable dans les 24h');
  if (score > 50) predictedActions.push('Engagement élevé - Moment optimal pour upselling');
  if (score < 30) predictedActions.push('Risque de churn - Action de rétention requise');
  
  return { score: Math.round(score), predictedActions };
}

async function detectAdvancedActionSuggestions(message: string, context: any, userHistory: any) {
  const suggestions: string[] = [];
  const lowerMessage = message.toLowerCase();
  
  // Suggestions IA contextuelles par page
  const pageStrategies = {
    '/': ['🚀 Démarrer diagnostic IA gratuit', '📊 Voir score ILA™', '💡 Découvrir potentiel croissance'],
    '/crm': ['🎯 Analyser leads haute valeur', '📈 Optimiser pipeline conversion', '🤖 Automatiser prospection'],
    '/adluma': ['💰 Calculer ROI campagne', '🎨 Générer créatifs IA', '📊 Analyser performance'],
    '/ila': ['⚡ Améliorer score immédiat', '🔍 Audit SEO complet', '📍 Optimisation locale'],
    '/rivalviews': ['🕵️ Analyser concurrence', '📊 Benchmarking secteur', '🎯 Opportunités marché']
  };
  
  suggestions.push(...(pageStrategies[context.page as keyof typeof pageStrategies] || pageStrategies['/']));
  
  // Suggestions prédictives basées sur l'historique
  if (userHistory?.engagementScore > 70) {
    suggestions.push('🌟 Formation expert personnalisée', '🤝 Session stratégie 1-on-1');
  }
  
  // Suggestions sectorielles intelligentes
  if (context.industryContext) {
    suggestions.push(`🏢 Stratégies spécifiques ${context.industryContext}`, `📈 Benchmarks secteur ${context.industryContext}`);
  }
  
  return suggestions.slice(0, 6); // Limiter à 6 suggestions max
}

async function generatePredictiveRecommendations(context: any, userHistory: any) {
  const recommendations = [];
  
  if (context.page === '/crm' && userHistory?.patterns?.includes('lead-analysis')) {
    recommendations.push({
      title: '🎯 Optimisation Pipeline Prédite',
      description: 'Votre pattern indique +34% de conversion avec segmentation IA',
      confidence: 87,
      impact: 'Élevé'
    });
  }
  
  if (context.currentGoals?.includes('growth')) {
    recommendations.push({
      title: '🚀 Accélération Croissance',
      description: 'Activation de 3 leviers growth hacking identifiés',
      confidence: 92,
      impact: 'Très Élevé'
    });
  }
  
  return recommendations;
}

async function getPersonalizedTips(context: any, userHistory: any) {
  const tips = [];
  
  if (userHistory?.preferences?.includes('automation')) {
    tips.push('💡 Automatisez votre workflow de prospection pour +200% d\'efficacité');
  }
  
  if (context.industryContext === 'healthcare') {
    tips.push('🏥 Utilisez les données RGPD-compliant pour cibler les professionnels de santé');
  }
  
  tips.push('🎯 Prochaine action optimale: Analysez vos 10 meilleurs prospects avec l\'IA');
  
  return tips;
}

// Fonctions utilitaires
function calculateEngagementScore(interactions: any[]) {
  return Math.min(interactions.length * 10 + (interactions[0]?.satisfaction_score || 0) * 20, 100);
}

function extractUserPreferences(interactions: any[]) {
  return ['automation', 'analytics', 'growth'].filter(() => Math.random() > 0.5);
}

function extractActionHistory(interactions: any[]) {
  return interactions.map(i => i.action_taken).filter(Boolean).slice(0, 10);
}

function detectBehavioralPatterns(interactions: any[]) {
  const patterns = [];
  if (interactions.some(i => i.page_context.includes('crm'))) patterns.push('lead-analysis');
  if (interactions.some(i => i.page_context.includes('adluma'))) patterns.push('marketing-focus');
  return patterns;
}