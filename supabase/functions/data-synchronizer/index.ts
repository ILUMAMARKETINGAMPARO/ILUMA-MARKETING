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

async function runFullProspectionWorkflow(cities: string[], categories: string[]) {
  const workflowResults = {
    prospection: null,
    enrichment: null,
    ila_calculation: null,
    summary: null
  };

  try {
    console.log('Starting full prospection workflow...');
    
    // Étape 1: Prospection géolocalisée
    console.log('Step 1: Geo-prospection...');
    const prospectionResponse = await supabase.functions.invoke('geo-prospector', {
      body: { cities, categories, maxResults: 25 }
    });
    
    if (prospectionResponse.error) {
      throw new Error(`Prospection failed: ${prospectionResponse.error.message}`);
    }
    
    workflowResults.prospection = prospectionResponse.data;
    const newBusinesses = prospectionResponse.data.results?.total_saved || 0;
    
    console.log(`Prospection completed: ${newBusinesses} new businesses found`);
    
    // Étape 2: Enrichissement des nouvelles entreprises
    if (newBusinesses > 0) {
      console.log('Step 2: Business enrichment...');
      
      // Récupérer les entreprises récemment ajoutées
      const { data: recentBusinesses } = await supabase
        .from('businesses')
        .select('id, name')
        .gte('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString()) // 10 minutes
        .limit(50);
      
      let enrichedCount = 0;
      for (const business of recentBusinesses || []) {
        try {
          const enrichmentResponse = await supabase.functions.invoke('business-enricher', {
            body: { 
              businessId: business.id,
              enrichmentTypes: ['serp', 'ai', 'social']
            }
          });
          
          if (!enrichmentResponse.error) {
            enrichedCount++;
            console.log(`Enriched: ${business.name}`);
          }
          
          // Pause pour respecter les rate limits
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Failed to enrich ${business.name}:`, error);
        }
      }
      
      workflowResults.enrichment = {
        total_processed: recentBusinesses?.length || 0,
        successfully_enriched: enrichedCount
      };
    }
    
    // Étape 3: Calcul des scores ILA
    console.log('Step 3: ILA score calculation...');
    const ilaResponse = await supabase.functions.invoke('ila-calculator', {
      body: { batchMode: true }
    });
    
    if (!ilaResponse.error) {
      workflowResults.ila_calculation = ilaResponse.data;
      console.log(`ILA calculation completed for ${ilaResponse.data.summary?.successful || 0} businesses`);
    }
    
    // Étape 4: Générer le résumé final
    const { data: totalBusinesses } = await supabase
      .from('businesses')
      .select('count(*)', { count: 'exact' });
    
    const { data: cityStats } = await supabase
      .from('businesses')
      .select('city, ila_score')
      .not('ila_score', 'is', null);
    
    const cityGroups = cityStats?.reduce((acc: any, business: any) => {
      if (!acc[business.city]) {
        acc[business.city] = [];
      }
      acc[business.city].push(business.ila_score);
      return acc;
    }, {}) || {};
    
    const citySummary = Object.entries(cityGroups).map(([city, scores]: [string, any[]]) => ({
      city,
      total_businesses: scores.length,
      average_ila: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
      top_score: Math.max(...scores),
      high_potential: scores.filter(score => score >= 70).length
    }));
    
    workflowResults.summary = {
      total_businesses_in_db: totalBusinesses?.[0]?.count || 0,
      workflow_execution_time: new Date().toISOString(),
      cities_analyzed: citySummary,
      new_businesses_added: newBusinesses,
      businesses_enriched: workflowResults.enrichment?.successfully_enriched || 0,
      ila_scores_calculated: workflowResults.ila_calculation?.summary?.successful || 0
    };
    
    console.log('Full workflow completed successfully');
    return workflowResults;
    
  } catch (error) {
    console.error('Workflow error:', error);
    throw error;
  }
}

async function syncRivalViewsData() {
  try {
    console.log('Synchronizing RivalViews data...');
    
    // Mettre à jour les métriques globales
    const { data: metrics } = await supabase
      .from('businesses')
      .select('city, sector, ila_score, potential, google_rating')
      .not('ila_score', 'is', null);
    
    if (!metrics) return null;
    
    // Calculer les métriques par ville
    const cityMetrics = metrics.reduce((acc: any, business: any) => {
      const city = business.city;
      if (!acc[city]) {
        acc[city] = {
          total: 0,
          high_potential: 0,
          avg_ila: 0,
          avg_rating: 0,
          sectors: {}
        };
      }
      
      acc[city].total++;
      if (business.ila_score >= 70) acc[city].high_potential++;
      acc[city].avg_ila += business.ila_score;
      acc[city].avg_rating += business.google_rating || 0;
      
      // Compter par secteur
      if (!acc[city].sectors[business.sector]) {
        acc[city].sectors[business.sector] = 0;
      }
      acc[city].sectors[business.sector]++;
      
      return acc;
    }, {});
    
    // Finaliser les moyennes
    Object.values(cityMetrics).forEach((city: any) => {
      city.avg_ila = Math.round(city.avg_ila / city.total);
      city.avg_rating = Math.round((city.avg_rating / city.total) * 10) / 10;
    });
    
    // Enregistrer les métriques dans collective_intelligence_metrics
    const timestamp = new Date().toISOString();
    await supabase.from('collective_intelligence_metrics').insert([
      {
        metric_type: 'city_overview',
        metric_value: Object.keys(cityMetrics).length,
        context_data: cityMetrics,
        calculated_at: timestamp
      },
      {
        metric_type: 'total_businesses',
        metric_value: metrics.length,
        context_data: { last_sync: timestamp },
        calculated_at: timestamp
      }
    ]);
    
    console.log(`RivalViews data synchronized: ${Object.keys(cityMetrics).length} cities, ${metrics.length} businesses`);
    return cityMetrics;
    
  } catch (error) {
    console.error('Sync error:', error);
    return null;
  }
}

async function generateCrossRecommendations() {
  try {
    console.log('Generating cross-platform recommendations...');
    
    // Identifier les opportunités ELUMATCH™
    const { data: highPotentialBusinesses } = await supabase
      .from('businesses')
      .select('*')
      .gte('ila_score', 70)
      .is('crm_status', null)
      .limit(20);
    
    // Générer des recommandations QRVISIBILITÉ™
    const { data: lowVisibilityBusinesses } = await supabase
      .from('businesses')
      .select('*')
      .lt('ila_score', 40)
      .not('website', 'is', null)
      .limit(10);
    
    const recommendations = [];
    
    // Recommandations ELUMATCH™
    for (const business of highPotentialBusinesses || []) {
      recommendations.push({
        recommendation_type: 'elumatch_opportunity',
        recommendation_data: {
          business_id: business.id,
          business_name: business.name,
          ila_score: business.ila_score,
          suggested_action: 'Proposer services premium ELUMATCH™',
          priority: business.ila_score >= 85 ? 'high' : 'medium'
        },
        confidence_score: Math.min(business.ila_score, 95),
        source_context: 'rivalviews_analysis',
        target_context: 'elumatch_platform'
      });
    }
    
    // Recommandations QRVISIBILITÉ™
    for (const business of lowVisibilityBusinesses || []) {
      recommendations.push({
        recommendation_type: 'qrvisibilite_opportunity',
        recommendation_data: {
          business_id: business.id,
          business_name: business.name,
          ila_score: business.ila_score,
          suggested_action: 'Proposer amélioration visibilité QR',
          issues: ['Faible score ILA', 'Potentiel d\'amélioration SEO']
        },
        confidence_score: 100 - business.ila_score,
        source_context: 'rivalviews_analysis',
        target_context: 'qrvisibilite_platform'
      });
    }
    
    // Enregistrer les recommandations
    if (recommendations.length > 0) {
      await supabase.from('cross_recommendations').insert(recommendations);
      console.log(`Generated ${recommendations.length} cross-platform recommendations`);
    }
    
    return recommendations;
    
  } catch (error) {
    console.error('Recommendations generation error:', error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      action = 'full_workflow',
      cities = ['Montreal', 'Laval', 'Longueuil', 'Gatineau', 'Quebec City'],
      categories = ['car dealership', 'mattress store', 'furniture store', 'law firm', 'real estate agent']
    } = await req.json();
    
    let result = null;
    
    switch (action) {
      case 'full_workflow':
        console.log('Executing full prospection workflow...');
        result = await runFullProspectionWorkflow(cities, categories);
        break;
        
      case 'sync_rivalviews':
        console.log('Synchronizing RivalViews data...');
        result = await syncRivalViewsData();
        break;
        
      case 'generate_recommendations':
        console.log('Generating cross-platform recommendations...');
        result = await generateCrossRecommendations();
        break;
        
      default:
        throw new Error(`Unknown action: ${action}`);
    }
    
    return new Response(JSON.stringify({
      success: true,
      action,
      result,
      executed_at: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in data-synchronizer:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});