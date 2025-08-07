import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const mapboxToken = Deno.env.get('MAPBOX_ACCESS_TOKEN');
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

    console.log('RevalViews™ Mapbox - Action:', action);

    switch (action) {
      case 'geocode_address':
        return await geocodeAddress(data.address);
      
      case 'reverse_geocode':
        return await reverseGeocode(data.lat, data.lng);
      
      case 'get_businesses_in_area':
        return await getBusinessesInArea(data.bounds, data.filters);
      
      case 'update_business_location':
        return await updateBusinessLocation(data.businessId, data.lat, data.lng);
      
      default:
        throw new Error(`Action non supportée: ${action}`);
    }

  } catch (error) {
    console.error('Error in RevalViews™ Mapbox:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur RevalViews™ Mapbox',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function geocodeAddress(address: string) {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&limit=1&country=CA`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const [lng, lat] = feature.center;

      return new Response(JSON.stringify({
        success: true,
        data: { lat, lng },
        coordinates: { lat, lng },
        formatted_address: feature.place_name,
        context: feature.context
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Adresse non trouvée');
    }

  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

async function reverseGeocode(lat: number, lng: number) {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}&limit=1`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const feature = data.features[0];

      return new Response(JSON.stringify({
        success: true,
        address: feature.place_name,
        context: feature.context
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Coordonnées non trouvées');
    }

  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
}

async function getBusinessesInArea(bounds: any, filters: any = {}) {
  try {
    const { north, south, east, west } = bounds;
    
    let query = supabase
      .from('businesses')
      .select(`
        id, name, address, city, sector, lat, lng,
        google_rating, review_count, ila_score,
        status, potential, is_chain, has_photos
      `)
      .gte('lat', south)
      .lte('lat', north)
      .gte('lng', west)
      .lte('lng', east);

    // Apply filters
    if (filters.sector) {
      query = query.eq('sector', filters.sector);
    }
    
    if (filters.min_ila_score) {
      query = query.gte('ila_score', filters.min_ila_score);
    }
    
    if (filters.min_rating) {
      query = query.gte('google_rating', filters.min_rating);
    }

    const { data: businesses, error } = await query.limit(100);

    if (error) throw error;

    // Enhance with RevalViews™ insights
    const enhancedBusinesses = businesses?.map(business => ({
      ...business,
      revalviews_insights: {
        visibility_score: calculateVisibilityScore(business),
        competition_level: assessCompetitionLevel(business, businesses),
        growth_potential: assessGrowthPotential(business),
        recommendations: generateMapRecommendations(business)
      }
    }));

    return new Response(JSON.stringify({
      success: true,
      businesses: enhancedBusinesses,
      total_count: businesses?.length || 0,
      bounds_analyzed: bounds
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Get businesses error:', error);
    throw error;
  }
}

async function updateBusinessLocation(businessId: string, lat: number, lng: number) {
  try {
    // Update business coordinates
    const { error } = await supabase
      .from('businesses')
      .update({ 
        lat, 
        lng,
        updated_at: new Date().toISOString()
      })
      .eq('id', businessId);

    if (error) throw error;

    // Log the location update
    await supabase.from('liaisons_crm').insert({
      type: 'client_projet',
      source_id: businessId,
      cible_id: crypto.randomUUID(),
      metadata: {
        type: 'location_update',
        coordinates: { lat, lng },
        updated_by: 'revalviews_mapbox',
        timestamp: new Date().toISOString()
      }
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Localisation mise à jour avec succès'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Update location error:', error);
    throw error;
  }
}

function calculateVisibilityScore(business: any): number {
  let score = 0;
  
  // ILA score component (40%)
  if (business.ila_score) {
    score += (business.ila_score / 100) * 40;
  }
  
  // Google rating component (30%)
  if (business.google_rating) {
    score += (business.google_rating / 5) * 30;
  }
  
  // Review count component (20%)
  if (business.review_count) {
    const reviewScore = Math.min(business.review_count / 100, 1);
    score += reviewScore * 20;
  }
  
  // Visual presence (10%)
  if (business.has_photos) {
    score += 10;
  }
  
  return Math.round(score);
}

function assessCompetitionLevel(business: any, allBusinesses: any[]): string {
  const sameTypeBusinesses = allBusinesses.filter(b => 
    b.sector === business.sector && b.id !== business.id
  );
  
  const count = sameTypeBusinesses.length;
  
  if (count >= 10) return 'Élevée';
  if (count >= 5) return 'Modérée';
  if (count >= 2) return 'Faible';
  return 'Très faible';
}

function assessGrowthPotential(business: any): string {
  const score = business.ila_score || 0;
  const rating = business.google_rating || 0;
  
  if (score >= 80 && rating >= 4.5) return 'Excellent';
  if (score >= 60 && rating >= 4.0) return 'Bon';
  if (score >= 40 && rating >= 3.5) return 'Modéré';
  return 'À développer';
}

function generateMapRecommendations(business: any): string[] {
  const recommendations = [];
  
  if (!business.ila_score || business.ila_score < 60) {
    recommendations.push('Améliorer le score ILA™');
  }
  
  if (!business.google_rating || business.google_rating < 4.0) {
    recommendations.push('Optimiser les avis Google');
  }
  
  if (!business.has_photos) {
    recommendations.push('Ajouter des photos professionnelles');
  }
  
  if (business.review_count < 20) {
    recommendations.push('Augmenter le nombre d\'avis');
  }
  
  return recommendations.slice(0, 3);
}