import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SERPAPI_KEY = Deno.env.get('SERPAPI_KEY');
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');


const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

async function enrichWithSERP(businessName: string, website: string) {
  if (!SERPAPI_KEY || !website) return null;

  try {
    const domain = new URL(website).hostname.replace('www.', '');
    const serpUrl = `https://serpapi.com/search.json?engine=google&q=site:${domain}&api_key=${SERPAPI_KEY}`;
    
    const response = await fetch(serpUrl);
    if (!response.ok) return null;
    
    const data = await response.json();
    
    // Analyser les résultats SERP
    const organicResults = data.organic_results || [];
    const indexedPages = organicResults.length;
    
    // Estimer les mots-clés et le trafic (simulation basée sur les pages indexées)
    const estimatedKeywords = Math.floor(indexedPages * 2.5);
    const estimatedTraffic = Math.floor(indexedPages * 15);
    const top10Keywords = Math.floor(estimatedKeywords * 0.1);
    
    return {
      pages_indexees: indexedPages,
      total_keywords: estimatedKeywords,
      top10_keywords: top10Keywords,
      organic_traffic: estimatedTraffic,
      trafic_organique_estime: estimatedTraffic,
      presence_blog: organicResults.some((r: any) => 
        r.link?.includes('/blog') || r.link?.includes('/article')
      )
    };
  } catch (error) {
    console.error('SERP enrichment error:', error);
    return null;
  }
}

async function enrichWithAI(businessData: any) {
  if (!OPENAI_API_KEY) return null;

  try {
    const prompt = `Analyse cette entreprise et génère un résumé IA stratégique:
    
Nom: ${businessData.name}
Secteur: ${businessData.sector}
Ville: ${businessData.city}
Site web: ${businessData.website || 'N/A'}
Note Google: ${businessData.google_rating}/5 (${businessData.review_count} avis)

Fournis un résumé de 2-3 phrases sur:
1. Positionnement concurrentiel
2. Opportunités d'amélioration SEO/visibilité
3. Potentiel commercial estimé`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Tu es un expert en analyse concurrentielle et marketing digital. Sois concis et actionnable.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.7
      }),
    });

    if (!response.ok) return null;
    
    const data = await response.json();
    return {
      ai_summary: data.choices[0]?.message?.content || null
    };
  } catch (error) {
    console.error('AI enrichment error:', error);
    return null;
  }
}

async function enrichSocialMedia(businessName: string, website: string) {
  // Simulation de données réseaux sociaux (à remplacer par vraies APIs)
  const hasWebsite = !!website;
  const estimatedFollowers = hasWebsite ? Math.floor(Math.random() * 5000) + 100 : 0;
  
  return {
    social_media_presence: hasWebsite ? Math.floor(Math.random() * 3) + 1 : 0, // 1-3 plateformes
    estimated_social_followers: estimatedFollowers,
    social_engagement_score: hasWebsite ? Math.floor(Math.random() * 40) + 10 : 0
  };
}

async function calculateEnhancedILAScore(businessData: any, enrichments: any) {
  let score = 0;
  
  // Score de base (40 points max)
  if (businessData.google_rating >= 4.5) score += 15;
  else if (businessData.google_rating >= 4.0) score += 10;
  else if (businessData.google_rating >= 3.5) score += 5;
  
  if (businessData.review_count >= 50) score += 10;
  else if (businessData.review_count >= 20) score += 7;
  else if (businessData.review_count >= 5) score += 4;
  
  if (businessData.has_photos) score += 8;
  if (businessData.website) score += 7;
  
  // Score SEO (30 points max)
  if (enrichments.serp) {
    const serpData = enrichments.serp;
    if (serpData.pages_indexees >= 20) score += 10;
    else if (serpData.pages_indexees >= 10) score += 7;
    else if (serpData.pages_indexees >= 5) score += 4;
    
    if (serpData.total_keywords >= 100) score += 10;
    else if (serpData.total_keywords >= 50) score += 7;
    else if (serpData.total_keywords >= 20) score += 4;
    
    if (serpData.top10_keywords >= 10) score += 10;
    else if (serpData.top10_keywords >= 5) score += 6;
    else if (serpData.top10_keywords >= 2) score += 3;
  }
  
  // Score réseaux sociaux (20 points max)
  if (enrichments.social) {
    const socialData = enrichments.social;
    if (socialData.social_media_presence >= 3) score += 8;
    else if (socialData.social_media_presence >= 2) score += 5;
    else if (socialData.social_media_presence >= 1) score += 3;
    
    if (socialData.estimated_social_followers >= 1000) score += 8;
    else if (socialData.estimated_social_followers >= 500) score += 5;
    else if (socialData.estimated_social_followers >= 100) score += 2;
    
    if (socialData.social_engagement_score >= 30) score += 4;
    else if (socialData.social_engagement_score >= 20) score += 2;
  }
  
  // Score bonus pour présence web complète (10 points max)
  if (businessData.website && enrichments.serp?.presence_blog) score += 5;
  if (enrichments.ai?.ai_summary) score += 3;
  if (businessData.phone && businessData.address) score += 2;
  
  return Math.min(Math.round(score), 100);
}

async function determinePotential(ilaScore: number, businessData: any) {
  if (ilaScore >= 80) return 'very_high';
  if (ilaScore >= 60) return 'high';
  if (ilaScore >= 40) return 'medium';
  if (ilaScore >= 20) return 'low';
  return 'very_low';
}

async function generateRecommendations(businessData: any, ilaScore: number) {
  const recommendations = [];
  
  if (!businessData.website) {
    recommendations.push("Créer un site web professionnel");
  }
  
  if (businessData.google_rating < 4.0) {
    recommendations.push("Améliorer la satisfaction client pour augmenter la note Google");
  }
  
  if (businessData.review_count < 20) {
    recommendations.push("Encourager plus d'avis clients Google");
  }
  
  if (!businessData.has_photos) {
    recommendations.push("Ajouter des photos professionnelles sur Google My Business");
  }
  
  if (ilaScore < 50) {
    recommendations.push("Développer une stratégie SEO locale");
  }
  
  return recommendations.join(" • ");
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessId, enrichmentTypes = ['serp', 'ai', 'social'] } = await req.json();
    
    if (!businessId) {
      throw new Error('Business ID is required');
    }

    // Récupérer les données de l'entreprise
    const { data: business, error: fetchError } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', businessId)
      .single();

    if (fetchError || !business) {
      throw new Error('Business not found');
    }

    console.log(`Enriching business: ${business.name}`);

    const enrichments: any = {};
    
    // Enrichissement SERP/SEO
    if (enrichmentTypes.includes('serp') && business.website) {
      enrichments.serp = await enrichWithSERP(business.name, business.website);
      console.log(`SERP data enriched for ${business.name}`);
    }
    
    // Enrichissement IA
    if (enrichmentTypes.includes('ai')) {
      enrichments.ai = await enrichWithAI(business);
      console.log(`AI analysis completed for ${business.name}`);
    }
    
    // Enrichissement réseaux sociaux
    if (enrichmentTypes.includes('social')) {
      enrichments.social = await enrichSocialMedia(business.name, business.website);
      console.log(`Social media data enriched for ${business.name}`);
    }

    // Calculer le score ILA amélioré
    const enhancedILAScore = await calculateEnhancedILAScore(business, enrichments);
    const potential = await determinePotential(enhancedILAScore, business);
    const recommendations = await generateRecommendations(business, enhancedILAScore);

    // Préparer les données à mettre à jour
    const updateData: any = {
      ila_score: enhancedILAScore,
      potential: potential,
      recommended_action: recommendations,
      last_analyzed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Ajouter les données enrichies
    if (enrichments.serp) {
      Object.assign(updateData, enrichments.serp);
    }
    
    if (enrichments.ai) {
      Object.assign(updateData, enrichments.ai);
    }

    // Mettre à jour l'entreprise dans Supabase
    const { data: updatedBusiness, error: updateError } = await supabase
      .from('businesses')
      .update(updateData)
      .eq('id', businessId)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Failed to update business: ${updateError.message}`);
    }

    // Sauvegarder l'historique d'enrichissement
    await supabase.from('enrichissement_history').insert({
      business_id: businessId,
      enrichment_type: enrichmentTypes.join(', '),
      data_before: business,
      data_after: updatedBusiness,
      ai_confidence_score: enhancedILAScore,
      processed_by: 'business-enricher'
    });

    console.log(`Business enrichment completed: ${business.name} (ILA: ${business.ila_score} → ${enhancedILAScore})`);

    return new Response(JSON.stringify({
      success: true,
      message: `Business enriched successfully`,
      business: updatedBusiness,
      enrichments_applied: enrichmentTypes,
      ila_improvement: enhancedILAScore - (business.ila_score || 0)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in business-enricher:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});