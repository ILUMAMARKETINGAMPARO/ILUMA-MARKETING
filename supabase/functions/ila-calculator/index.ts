import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

// Pondérations par secteur d'activité
const SECTOR_WEIGHTS = {
  'car dealership': {
    presence_physique: 1.2,
    reputation: 1.3,
    seo: 1.0,
    contenu: 0.9,
    position: 1.1
  },
  'mattress store': {
    presence_physique: 1.1,
    reputation: 1.2,
    seo: 1.1,
    contenu: 1.0,
    position: 1.0
  },
  'furniture store': {
    presence_physique: 1.1,
    reputation: 1.1,
    seo: 1.0,
    contenu: 1.1,
    position: 1.0
  },
  'law firm': {
    presence_physique: 0.9,
    reputation: 1.4,
    seo: 1.2,
    contenu: 1.3,
    position: 1.1
  },
  'real estate agent': {
    presence_physique: 1.0,
    reputation: 1.3,
    seo: 1.1,
    contenu: 1.1,
    position: 1.2
  },
  'restaurant': {
    presence_physique: 1.3,
    reputation: 1.4,
    seo: 0.9,
    contenu: 0.8,
    position: 1.1
  },
  'hair salon': {
    presence_physique: 1.2,
    reputation: 1.3,
    seo: 0.8,
    contenu: 0.7,
    position: 1.2
  },
  'default': {
    presence_physique: 1.0,
    reputation: 1.0,
    seo: 1.0,
    contenu: 1.0,
    position: 1.0
  }
};

function calculatePresencePhysiqueScore(business: any): number {
  let score = 0;
  
  // Google My Business - 40% du score
  if (business.google_rating >= 4.5) score += 20;
  else if (business.google_rating >= 4.0) score += 15;
  else if (business.google_rating >= 3.5) score += 10;
  else if (business.google_rating >= 3.0) score += 5;
  
  // Nombre d'avis - 30% du score
  if (business.review_count >= 100) score += 15;
  else if (business.review_count >= 50) score += 12;
  else if (business.review_count >= 25) score += 9;
  else if (business.review_count >= 10) score += 6;
  else if (business.review_count >= 5) score += 3;
  
  // Photos et informations complètes - 30% du score
  if (business.has_photos) score += 8;
  if (business.phone) score += 4;
  if (business.address) score += 3;
  
  return Math.min(score, 50);
}

function calculateReputationScore(business: any): number {
  let score = 0;
  
  // Note Google pondérée - 60% du score
  const ratingScore = business.google_rating ? (business.google_rating / 5) * 30 : 0;
  score += ratingScore;
  
  // Volume d'avis - 25% du score
  if (business.review_count >= 200) score += 12;
  else if (business.review_count >= 100) score += 10;
  else if (business.review_count >= 50) score += 8;
  else if (business.review_count >= 20) score += 6;
  else if (business.review_count >= 10) score += 4;
  else if (business.review_count >= 5) score += 2;
  
  // Réseaux sociaux estimés - 15% du score
  if (business.estimated_social_followers >= 2000) score += 8;
  else if (business.estimated_social_followers >= 1000) score += 6;
  else if (business.estimated_social_followers >= 500) score += 4;
  else if (business.estimated_social_followers >= 100) score += 2;
  
  return Math.min(score, 50);
}

function calculateSEOScore(business: any): number {
  let score = 0;
  
  // Présence web de base - 20% du score
  if (business.website) score += 10;
  
  // Pages indexées - 30% du score
  if (business.pages_indexees >= 100) score += 15;
  else if (business.pages_indexees >= 50) score += 12;
  else if (business.pages_indexees >= 20) score += 9;
  else if (business.pages_indexees >= 10) score += 6;
  else if (business.pages_indexees >= 5) score += 3;
  
  // Mots-clés - 25% du score
  if (business.total_keywords >= 500) score += 12;
  else if (business.total_keywords >= 200) score += 10;
  else if (business.total_keywords >= 100) score += 8;
  else if (business.total_keywords >= 50) score += 6;
  else if (business.total_keywords >= 20) score += 4;
  else if (business.total_keywords >= 10) score += 2;
  
  // Mots-clés top 10 - 25% du score
  if (business.top10_keywords >= 50) score += 13;
  else if (business.top10_keywords >= 20) score += 10;
  else if (business.top10_keywords >= 10) score += 8;
  else if (business.top10_keywords >= 5) score += 5;
  else if (business.top10_keywords >= 2) score += 3;
  else if (business.top10_keywords >= 1) score += 1;
  
  return Math.min(score, 50);
}

function calculateContenuScore(business: any): number {
  let score = 0;
  
  // Blog/contenu - 40% du score
  if (business.presence_blog) score += 20;
  
  // Qualité du contenu estimée - 30% du score
  if (business.qualite_blog >= 8) score += 15;
  else if (business.qualite_blog >= 6) score += 12;
  else if (business.qualite_blog >= 4) score += 8;
  else if (business.qualite_blog >= 2) score += 4;
  
  // Trafic organique - 30% du score
  if (business.trafic_organique_estime >= 10000) score += 15;
  else if (business.trafic_organique_estime >= 5000) score += 12;
  else if (business.trafic_organique_estime >= 2000) score += 9;
  else if (business.trafic_organique_estime >= 1000) score += 6;
  else if (business.trafic_organique_estime >= 500) score += 3;
  else if (business.trafic_organique_estime >= 100) score += 1;
  
  return Math.min(score, 50);
}

function calculatePositionScore(business: any): number {
  let score = 0;
  
  // Position moyenne SERP - 40% du score
  if (business.serp_rank) {
    if (business.serp_rank <= 3) score += 20;
    else if (business.serp_rank <= 5) score += 15;
    else if (business.serp_rank <= 10) score += 10;
    else if (business.serp_rank <= 20) score += 5;
  }
  
  // Backlinks - 35% du score
  if (business.total_backlinks >= 1000) score += 17;
  else if (business.total_backlinks >= 500) score += 14;
  else if (business.total_backlinks >= 200) score += 11;
  else if (business.total_backlinks >= 100) score += 8;
  else if (business.total_backlinks >= 50) score += 5;
  else if (business.total_backlinks >= 20) score += 3;
  else if (business.total_backlinks >= 10) score += 1;
  
  // Domain Rating - 25% du score
  if (business.domain_rating >= 70) score += 13;
  else if (business.domain_rating >= 50) score += 10;
  else if (business.domain_rating >= 30) score += 7;
  else if (business.domain_rating >= 20) score += 4;
  else if (business.domain_rating >= 10) score += 2;
  
  return Math.min(score, 50);
}

function applySectorWeighting(scores: any, sector: string) {
  const weights = SECTOR_WEIGHTS[sector] || SECTOR_WEIGHTS.default;
  
  return {
    presence_physique_score: Math.round(scores.presence_physique * weights.presence_physique),
    reputation_score: Math.round(scores.reputation * weights.reputation),
    seo_score: Math.round(scores.seo * weights.seo),
    contenu_score: Math.round(scores.contenu * weights.contenu),
    position_score: Math.round(scores.position * weights.position)
  };
}

function generateILARecommendations(scores: any, business: any): string {
  const recommendations = [];
  
  // Analyser chaque score pour des recommandations spécifiques
  if (scores.presence_physique_score < 30) {
    if (business.review_count < 20) {
      recommendations.push("Encourager plus d'avis clients Google");
    }
    if (business.google_rating < 4.0) {
      recommendations.push("Améliorer la satisfaction client");
    }
    if (!business.has_photos) {
      recommendations.push("Ajouter des photos professionnelles GMB");
    }
  }
  
  if (scores.reputation_score < 30) {
    recommendations.push("Développer une stratégie de gestion de réputation");
    if (!business.estimated_social_followers || business.estimated_social_followers < 500) {
      recommendations.push("Créer et animer des profils réseaux sociaux");
    }
  }
  
  if (scores.seo_score < 30) {
    if (!business.website) {
      recommendations.push("Créer un site web professionnel");
    } else {
      recommendations.push("Optimiser le référencement naturel (SEO)");
      if (business.pages_indexees < 20) {
        recommendations.push("Enrichir le contenu du site web");
      }
    }
  }
  
  if (scores.contenu_score < 30) {
    if (!business.presence_blog) {
      recommendations.push("Créer un blog avec du contenu régulier");
    }
    recommendations.push("Développer une stratégie de content marketing");
  }
  
  if (scores.position_score < 30) {
    recommendations.push("Améliorer l'autorité du domaine avec des backlinks");
    recommendations.push("Optimiser pour les recherches locales");
  }
  
  return recommendations.slice(0, 3).join(" • ");
}

async function getCompetitorBenchmark(city: string, sector: string) {
  const { data: competitors, error } = await supabase
    .from('businesses')
    .select('ila_score, seo_score, contenu_score, presence_physique_score, reputation_score, position_score')
    .eq('city', city)
    .eq('sector', sector)
    .not('ila_score', 'is', null)
    .limit(50);

  if (error || !competitors?.length) {
    return null;
  }

  const avg_ila = competitors.reduce((sum, c) => sum + (c.ila_score || 0), 0) / competitors.length;
  const top_ila = Math.max(...competitors.map(c => c.ila_score || 0));
  
  return {
    market_average: Math.round(avg_ila),
    market_leader: top_ila,
    total_competitors: competitors.length
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessId, batchMode = false } = await req.json();
    
    let businessesToProcess = [];
    
    if (batchMode) {
      // Mode batch : traiter toutes les entreprises sans score ILA
      const { data: businesses, error } = await supabase
        .from('businesses')
        .select('*')
        .is('ila_score', null)
        .limit(100);
        
      if (error) throw new Error(`Failed to fetch businesses: ${error.message}`);
      businessesToProcess = businesses || [];
    } else {
      // Mode individuel
      if (!businessId) throw new Error('Business ID is required');
      
      const { data: business, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', businessId)
        .single();
        
      if (error || !business) throw new Error('Business not found');
      businessesToProcess = [business];
    }

    const results = [];
    
    for (const business of businessesToProcess) {
      try {
        console.log(`Calculating ILA score for: ${business.name}`);
        
        // Calculer les scores individuels
        const rawScores = {
          presence_physique: calculatePresencePhysiqueScore(business),
          reputation: calculateReputationScore(business),
          seo: calculateSEOScore(business),
          contenu: calculateContenuScore(business),
          position: calculatePositionScore(business)
        };
        
        // Appliquer la pondération sectorielle
        const weightedScores = applySectorWeighting(rawScores, business.sector);
        
        // Calculer le score ILA total
        const totalILA = Math.round(
          (weightedScores.presence_physique_score + 
           weightedScores.reputation_score + 
           weightedScores.seo_score + 
           weightedScores.contenu_score + 
           weightedScores.position_score) / 5 * 2
        );
        
        // Générer les recommandations
        const recommendations = generateILARecommendations(weightedScores, business);
        
        // Obtenir le benchmark concurrentiel
        const benchmark = await getCompetitorBenchmark(business.city, business.sector);
        
        // Déterminer le potentiel
        let potential = 'medium';
        if (totalILA >= 80) potential = 'very_high';
        else if (totalILA >= 60) potential = 'high';
        else if (totalILA >= 40) potential = 'medium';
        else if (totalILA >= 20) potential = 'low';
        else potential = 'very_low';
        
        // Mettre à jour l'entreprise
        const updateData = {
          ila_score: totalILA,
          seo_score: weightedScores.seo_score,
          contenu_score: weightedScores.contenu_score,
          presence_physique_score: weightedScores.presence_physique_score,
          reputation_score: weightedScores.reputation_score,
          position_score: weightedScores.position_score,
          potential: potential,
          recommended_action: recommendations,
          last_analyzed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const { data: updatedBusiness, error: updateError } = await supabase
          .from('businesses')
          .update(updateData)
          .eq('id', business.id)
          .select()
          .single();
          
        if (updateError) {
          console.error(`Failed to update business ${business.name}:`, updateError);
          continue;
        }
        
        // Enregistrer dans ila_scores
        await supabase.from('ila_scores').insert({
          business_id: business.id,
          seo_score: weightedScores.seo_score,
          contenu_score: weightedScores.contenu_score,
          presence_physique_score: weightedScores.presence_physique_score,
          reputation_score: weightedScores.reputation_score,
          position_score: weightedScores.position_score,
          total_score: totalILA,
          recommended_action: recommendations,
          calculation_method: 'enhanced_v2',
          data_sources: { 
            sector_weights: SECTOR_WEIGHTS[business.sector] || SECTOR_WEIGHTS.default,
            benchmark: benchmark 
          }
        });
        
        results.push({
          business_id: business.id,
          business_name: business.name,
          ila_score: totalILA,
          previous_score: business.ila_score,
          improvement: totalILA - (business.ila_score || 0),
          potential: potential,
          scores_breakdown: weightedScores,
          benchmark: benchmark,
          recommendations: recommendations
        });
        
        console.log(`ILA score calculated for ${business.name}: ${totalILA} (${potential})`);
        
      } catch (error) {
        console.error(`Error processing business ${business.name}:`, error);
        results.push({
          business_id: business.id,
          business_name: business.name,
          error: error.message
        });
      }
    }

    const summary = {
      total_processed: results.length,
      successful: results.filter(r => !r.error).length,
      errors: results.filter(r => r.error).length,
      average_score: results.filter(r => !r.error).reduce((sum, r) => sum + r.ila_score, 0) / results.filter(r => !r.error).length || 0
    };

    return new Response(JSON.stringify({
      success: true,
      message: `ILA calculation completed for ${summary.successful} businesses`,
      summary,
      results: batchMode ? summary : results[0]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ila-calculator:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});