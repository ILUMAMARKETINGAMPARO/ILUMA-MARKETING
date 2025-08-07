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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();

    console.log('SERP Data Collector - Action:', action);

    switch (action) {
      case 'analyze_local_serp':
        return await analyzeLocalSERP(data.query, data.location);
      
      case 'check_business_ranking':
        return await checkBusinessRanking(data.businessName, data.keywords, data.location);
      
      case 'competitor_analysis':
        return await competitorAnalysis(data.sector, data.location);
      
      case 'bulk_keyword_analysis':
        return await bulkKeywordAnalysis(data.keywords, data.location);
      
      default:
        throw new Error(`Action non supportée: ${action}`);
    }

  } catch (error) {
    console.error('Error in SERP Data Collector:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur SERP Data Collector',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function analyzeLocalSERP(query: string, location: string) {
  try {
    // Simulate SERP API call (replace with actual SERP API when available)
    const serpResults = await simulateSERPResults(query, location);
    
    // Analyze SERP features
    const analysis = {
      total_results: serpResults.length,
      local_pack_present: serpResults.some(r => r.type === 'local'),
      featured_snippet: serpResults.some(r => r.type === 'featured_snippet'),
      ads_count: serpResults.filter(r => r.type === 'ad').length,
      organic_results: serpResults.filter(r => r.type === 'organic').length,
      top_domains: getTopDomains(serpResults),
      difficulty_score: calculateKeywordDifficulty(serpResults),
      opportunities: identifyOpportunities(serpResults)
    };

    // Save analysis to database
    await supabase.from('liaisons_crm').insert({
      type: 'service_solution',
      source_id: crypto.randomUUID(),
      cible_id: crypto.randomUUID(),
      metadata: {
        type: 'serp_analysis',
        query,
        location,
        analysis,
        timestamp: new Date().toISOString()
      }
    });

    return new Response(JSON.stringify({
      success: true,
      query,
      location,
      analysis,
      results: serpResults.slice(0, 10) // Return top 10 results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('SERP analysis error:', error);
    throw error;
  }
}

async function checkBusinessRanking(businessName: string, keywords: string[], location: string) {
  try {
    const rankings = [];

    for (const keyword of keywords) {
      const serpResults = await simulateSERPResults(keyword, location);
      
      const ranking = findBusinessRanking(serpResults, businessName);
      
      rankings.push({
        keyword,
        position: ranking.position,
        type: ranking.type, // organic, local, ads
        url: ranking.url,
        title: ranking.title,
        difficulty: calculateKeywordDifficulty(serpResults)
      });
    }

    // Update business ranking data
    const businessData = await supabase
      .from('businesses')
      .select('id')
      .ilike('name', `%${businessName}%`)
      .single();

    if (businessData.data) {
      await supabase
        .from('businesses')
        .update({
          serp_rank: Math.min(...rankings.map(r => r.position).filter(p => p > 0)) || null,
          last_analyzed_at: new Date().toISOString()
        })
        .eq('id', businessData.data.id);
    }

    return new Response(JSON.stringify({
      success: true,
      business: businessName,
      location,
      rankings,
      average_position: calculateAveragePosition(rankings),
      improvement_suggestions: generateRankingImprovements(rankings)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Business ranking error:', error);
    throw error;
  }
}

async function competitorAnalysis(sector: string, location: string) {
  try {
    const sectorKeywords = getSectorKeywords(sector);
    const competitors = [];

    for (const keyword of sectorKeywords.slice(0, 5)) {
      const serpResults = await simulateSERPResults(keyword, location);
      
      const topCompetitors = serpResults
        .filter(r => r.type === 'organic' || r.type === 'local')
        .slice(0, 5)
        .map(r => ({
          name: extractBusinessName(r.title),
          domain: extractDomain(r.url),
          position: r.position,
          keyword
        }));

      competitors.push(...topCompetitors);
    }

    // Aggregate competitor data
    const competitorMap = new Map();
    competitors.forEach(comp => {
      const key = comp.domain;
      if (!competitorMap.has(key)) {
        competitorMap.set(key, {
          domain: comp.domain,
          name: comp.name,
          appearances: 0,
          average_position: 0,
          keywords: []
        });
      }
      
      const existing = competitorMap.get(key);
      existing.appearances++;
      existing.keywords.push({ keyword: comp.keyword, position: comp.position });
      existing.average_position = existing.keywords.reduce((sum, k) => sum + k.position, 0) / existing.keywords.length;
    });

    const topCompetitors = Array.from(competitorMap.values())
      .sort((a, b) => b.appearances - a.appearances)
      .slice(0, 10);

    return new Response(JSON.stringify({
      success: true,
      sector,
      location,
      competitors: topCompetitors,
      market_analysis: {
        competition_level: assessCompetitionLevel(topCompetitors),
        market_saturation: calculateMarketSaturation(topCompetitors),
        opportunities: identifyMarketOpportunities(topCompetitors, sectorKeywords)
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Competitor analysis error:', error);
    throw error;
  }
}

async function bulkKeywordAnalysis(keywords: string[], location: string) {
  try {
    const results = [];

    for (const keyword of keywords) {
      const serpResults = await simulateSERPResults(keyword, location);
      
      results.push({
        keyword,
        search_volume: estimateSearchVolume(keyword),
        difficulty: calculateKeywordDifficulty(serpResults),
        local_intent: hasLocalIntent(keyword),
        serp_features: analyzeSERPFeatures(serpResults),
        opportunities: identifyKeywordOpportunities(keyword, serpResults)
      });
    }

    // Sort by opportunity score
    results.sort((a, b) => calculateOpportunityScore(b) - calculateOpportunityScore(a));

    return new Response(JSON.stringify({
      success: true,
      location,
      total_keywords: keywords.length,
      results,
      summary: {
        high_opportunity: results.filter(r => calculateOpportunityScore(r) >= 70).length,
        medium_opportunity: results.filter(r => calculateOpportunityScore(r) >= 40 && calculateOpportunityScore(r) < 70).length,
        low_opportunity: results.filter(r => calculateOpportunityScore(r) < 40).length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Bulk keyword analysis error:', error);
    throw error;
  }
}

// Simulation functions (replace with actual SERP API calls)
async function simulateSERPResults(query: string, location: string) {
  // Simulate SERP results structure
  const results = [];
  
  // Add some ads
  for (let i = 1; i <= 2; i++) {
    results.push({
      position: i,
      type: 'ad',
      title: `${query} - Service Premium ${i}`,
      url: `https://example-ad-${i}.com`,
      description: `Publicité pour ${query} à ${location}`
    });
  }
  
  // Add local pack
  if (hasLocalIntent(query)) {
    for (let i = 1; i <= 3; i++) {
      results.push({
        position: i,
        type: 'local',
        title: `${query} ${location} - Business ${i}`,
        url: `https://local-business-${i}.com`,
        description: `Service local de ${query}`,
        rating: 4.0 + Math.random(),
        reviews: Math.floor(Math.random() * 100) + 10
      });
    }
  }
  
  // Add organic results
  for (let i = 1; i <= 10; i++) {
    results.push({
      position: results.length + 1,
      type: 'organic',
      title: `${query} - Guide complet ${i}`,
      url: `https://example-${i}.com`,
      description: `Information sur ${query} à ${location}`
    });
  }
  
  return results;
}

// Helper functions
function getTopDomains(results: any[]) {
  const domains = results.map(r => extractDomain(r.url));
  const counts = domains.reduce((acc, domain) => {
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(counts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([domain, count]) => ({ domain, count }));
}

function calculateKeywordDifficulty(results: any[]): number {
  const factors = {
    ads: results.filter(r => r.type === 'ad').length * 10,
    domains: new Set(results.map(r => extractDomain(r.url))).size,
    localPack: results.some(r => r.type === 'local') ? 20 : 0
  };
  
  return Math.min(factors.ads + (100 - factors.domains * 5) + factors.localPack, 100);
}

function identifyOpportunities(results: any[]): string[] {
  const opportunities = [];
  
  if (results.filter(r => r.type === 'ad').length < 2) {
    opportunities.push('Peu de concurrence publicitaire');
  }
  
  if (results.some(r => r.type === 'local')) {
    opportunities.push('Présence locale possible');
  }
  
  if (!results.some(r => r.type === 'featured_snippet')) {
    opportunities.push('Featured snippet disponible');
  }
  
  return opportunities;
}

function findBusinessRanking(results: any[], businessName: string) {
  const found = results.find(r => 
    r.title.toLowerCase().includes(businessName.toLowerCase()) ||
    r.url.toLowerCase().includes(businessName.toLowerCase().replace(/\s+/g, ''))
  );
  
  return found ? {
    position: found.position,
    type: found.type,
    url: found.url,
    title: found.title
  } : { position: 0, type: null, url: null, title: null };
}

function getSectorKeywords(sector: string): string[] {
  const keywordMap = {
    'restaurant': ['restaurant', 'livraison', 'menu', 'réservation', 'cuisine'],
    'retail': ['magasin', 'boutique', 'vente', 'produits', 'shopping'],
    'services': ['services', 'consultation', 'professionnel', 'expertise', 'conseil'],
    'santé': ['clinique', 'médecin', 'santé', 'soins', 'consultation']
  };
  
  return keywordMap[sector] || ['services', 'professionnel', 'local'];
}

function extractBusinessName(title: string): string {
  return title.split(' - ')[0] || title.substring(0, 50);
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function hasLocalIntent(keyword: string): boolean {
  const localIndicators = ['près de moi', 'local', 'montréal', 'québec', 'laval'];
  return localIndicators.some(indicator => keyword.toLowerCase().includes(indicator));
}

function estimateSearchVolume(keyword: string): number {
  // Simulate search volume based on keyword length and type
  const baseVolume = Math.max(100, 1000 - (keyword.length * 20));
  return baseVolume + Math.floor(Math.random() * 500);
}

function analyzeSERPFeatures(results: any[]) {
  return {
    ads: results.filter(r => r.type === 'ad').length,
    local_pack: results.some(r => r.type === 'local'),
    featured_snippet: results.some(r => r.type === 'featured_snippet'),
    organic_count: results.filter(r => r.type === 'organic').length
  };
}

function identifyKeywordOpportunities(keyword: string, results: any[]): string[] {
  const opportunities = [];
  
  if (results.filter(r => r.type === 'ad').length < 3) {
    opportunities.push('Faible concurrence publicitaire');
  }
  
  if (hasLocalIntent(keyword) && !results.some(r => r.type === 'local')) {
    opportunities.push('Opportunité de référencement local');
  }
  
  return opportunities;
}

function calculateOpportunityScore(result: any): number {
  let score = 50; // Base score
  
  if (result.difficulty < 30) score += 30;
  else if (result.difficulty < 60) score += 15;
  
  if (result.local_intent) score += 20;
  if (result.search_volume > 500) score += 10;
  
  return Math.min(score, 100);
}

function calculateAveragePosition(rankings: any[]): number {
  const validPositions = rankings.filter(r => r.position > 0).map(r => r.position);
  return validPositions.length > 0 ? validPositions.reduce((sum, pos) => sum + pos, 0) / validPositions.length : 0;
}

function generateRankingImprovements(rankings: any[]): string[] {
  const improvements = [];
  
  const avgPosition = calculateAveragePosition(rankings);
  
  if (avgPosition > 10) {
    improvements.push('Optimisation SEO technique recommandée');
  }
  
  if (rankings.some(r => r.position === 0)) {
    improvements.push('Création de contenu pour mots-clés manquants');
  }
  
  improvements.push('Amélioration de la présence locale');
  
  return improvements;
}

function assessCompetitionLevel(competitors: any[]): string {
  if (competitors.length > 15) return 'Très élevée';
  if (competitors.length > 10) return 'Élevée';
  if (competitors.length > 5) return 'Modérée';
  return 'Faible';
}

function calculateMarketSaturation(competitors: any[]): number {
  return Math.min((competitors.length / 20) * 100, 100);
}

function identifyMarketOpportunities(competitors: any[], keywords: string[]): string[] {
  const opportunities = [];
  
  if (competitors.length < 5) {
    opportunities.push('Marché peu saturé - opportunité d\'entrée');
  }
  
  opportunities.push('Niches spécialisées disponibles');
  opportunities.push('Optimisation locale possible');
  
  return opportunities;
}