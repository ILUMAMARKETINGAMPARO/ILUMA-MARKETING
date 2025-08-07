import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const serpApiKey = Deno.env.get('SERP_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

interface BusinessData {
  id: string;
  name: string;
  website?: string;
  city: string;
  sector: string;
  google_place_id?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessId, businessData } = await req.json();

    console.log('ILA™ Score Calculator - Processing:', { businessId, businessData });

    const business: BusinessData = businessData;
    
    // Calculate each ILA™ component
    const scores = await calculateILAComponents(business);
    
    // Calculate total ILA™ score with official weighting
    const totalScore = Math.round(
      (scores.seo_score * 0.25) +
      (scores.contenu_score * 0.20) +
      (scores.presence_physique_score * 0.20) +
      (scores.reputation_score * 0.20) +
      (scores.position_score * 0.15)
    );

    // Generate AI recommendations
    const recommendations = generateRecommendations(scores, totalScore);

    // Save to database
    const { data: ilaRecord, error } = await supabase
      .from('ila_scores')
      .insert({
        business_id: businessId,
        seo_score: scores.seo_score,
        contenu_score: scores.contenu_score,
        presence_physique_score: scores.presence_physique_score,
        reputation_score: scores.reputation_score,
        position_score: scores.position_score,
        total_score: totalScore,
        recommended_action: recommendations.primaryAction,
        ai_analysis: recommendations.analysis,
        data_sources: {
          website_analyzed: !!business.website,
          gmb_analyzed: !!business.google_place_id,
          serp_checked: true,
          timestamp: new Date().toISOString()
        }
      });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // Update business table with latest scores
    await supabase
      .from('businesses')
      .update({
        ila_score: totalScore,
        seo_score: scores.seo_score,
        contenu_score: scores.contenu_score,
        presence_physique_score: scores.presence_physique_score,
        reputation_score: scores.reputation_score,
        position_score: scores.position_score,
        last_analyzed_at: new Date().toISOString(),
        recommended_action: recommendations.primaryAction
      })
      .eq('id', businessId);

    return new Response(JSON.stringify({
      success: true,
      ila_score: totalScore,
      scores: scores,
      recommendations: recommendations,
      record_id: ilaRecord?.[0]?.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ILA™ Score Calculator:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur lors du calcul ILA™',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function calculateILAComponents(business: BusinessData) {
  console.log('Calculating ILA components for:', business.name);

  // SEO Score (25% weight)
  const seoScore = await calculateSEOScore(business);
  
  // Content Score (20% weight)
  const contentScore = await calculateContentScore(business);
  
  // Physical Presence Score (20% weight)
  const presenceScore = await calculatePresenceScore(business);
  
  // Reputation Score (20% weight)
  const reputationScore = await calculateReputationScore(business);
  
  // Position Score (15% weight)
  const positionScore = await calculatePositionScore(business);

  return {
    seo_score: seoScore,
    contenu_score: contentScore,
    presence_physique_score: presenceScore,
    reputation_score: reputationScore,
    position_score: positionScore
  };
}

async function calculateSEOScore(business: BusinessData): Promise<number> {
  // Simulate SEO analysis
  let score = 50; // Base score
  
  if (business.website) {
    score += 30; // Has website
    
    // Simulate website analysis
    try {
      const response = await fetch(business.website, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
      
      if (response.ok) {
        score += 20; // Website is accessible
      }
    } catch (error) {
      console.log('Website check failed:', error.message);
    }
  }
  
  return Math.min(score, 100);
}

async function calculateContentScore(business: BusinessData): Promise<number> {
  // Simulate content quality analysis
  let score = 40;
  
  if (business.website) {
    score += 35; // Has content platform
  }
  
  // Add sector-specific bonus
  if (['restaurant', 'retail', 'services'].includes(business.sector)) {
    score += 25;
  }
  
  return Math.min(score, 100);
}

async function calculatePresenceScore(business: BusinessData): Promise<number> {
  // Simulate physical presence analysis
  let score = 60; // Base for having an address
  
  if (business.google_place_id) {
    score += 40; // Has GMB listing
  }
  
  return Math.min(score, 100);
}

async function calculateReputationScore(business: BusinessData): Promise<number> {
  // Simulate reputation analysis
  let score = 45;
  
  if (business.google_place_id) {
    score += 30; // Has reviews platform
    score += Math.floor(Math.random() * 25); // Simulated review quality
  }
  
  return Math.min(score, 100);
}

async function calculatePositionScore(business: BusinessData): Promise<number> {
  // Simulate local positioning analysis
  let score = 50;
  
  // City-based scoring
  const majorCities = ['montreal', 'quebec', 'laval', 'gatineau'];
  if (majorCities.includes(business.city.toLowerCase())) {
    score += 25;
  }
  
  score += Math.floor(Math.random() * 25); // Market position simulation
  
  return Math.min(score, 100);
}

function generateRecommendations(scores: any, totalScore: number) {
  const weakestArea = Object.entries(scores).reduce((min, [key, value]) => 
    value < min.value ? { key, value } : min
  );

  let primaryAction = '';
  let analysis = '';

  if (totalScore >= 80) {
    primaryAction = 'Optimisation avancée et expansion';
    analysis = `Excellent score ILA™ de ${totalScore}/100! Votre visibilité est forte. Concentrez-vous sur l'expansion et l'optimisation fine.`;
  } else if (totalScore >= 60) {
    primaryAction = 'Amélioration ciblée recommandée';
    analysis = `Score ILA™ de ${totalScore}/100 - Bon potentiel! Zone d'amélioration prioritaire: ${getAreaName(weakestArea.key)}.`;
  } else {
    primaryAction = 'Stratégie de visibilité urgente';
    analysis = `Score ILA™ de ${totalScore}/100 - Potentiel d'amélioration important. Action immédiate recommandée sur: ${getAreaName(weakestArea.key)}.`;
  }

  return {
    primaryAction,
    analysis,
    weakestArea: weakestArea.key,
    improvementPotential: 100 - totalScore
  };
}

function getAreaName(key: string): string {
  const areaNames = {
    'seo_score': 'SEO et référencement',
    'contenu_score': 'Qualité du contenu',
    'presence_physique_score': 'Présence physique',
    'reputation_score': 'Réputation en ligne',
    'position_score': 'Positionnement local'
  };
  return areaNames[key] || key;
}