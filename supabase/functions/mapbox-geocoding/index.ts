import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MapboxGeocodingRequest {
  action: 'get_token' | 'geocode';
  address?: string;
}

interface MapboxResponse {
  features: Array<{
    center: [number, number];
    place_name: string;
    properties: {
      accuracy?: string;
    };
  }>;
}

Deno.serve(async (req) => {
  console.log('🗺️ Mapbox Geocoding Function appelée');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, address }: MapboxGeocodingRequest = await req.json();
    console.log('📡 Action demandée:', action);

    // Récupérer le token Mapbox depuis les secrets
    const mapboxToken = Deno.env.get('MAPBOX_PUBLIC_TOKEN');
    
    if (!mapboxToken) {
      console.error('❌ Token Mapbox non configuré');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Token Mapbox non configuré dans les secrets Supabase' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    switch (action) {
      case 'get_token':
        // Retourner le token pour utilisation côté client
        console.log('🔑 Envoi du token Mapbox');
        return new Response(
          JSON.stringify({ 
            success: true, 
            token: mapboxToken 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );

      case 'geocode':
        if (!address) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Adresse requise pour le géocodage' 
            }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        console.log('🎯 Géocodage de l\'adresse:', address);

        // Construire l'URL de l'API Mapbox
        const encodedAddress = encodeURIComponent(address);
        const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&limit=1&country=CA`;

        // Appeler l'API Mapbox
        const mapboxResponse = await fetch(geocodingUrl);
        
        if (!mapboxResponse.ok) {
          console.error('❌ Erreur API Mapbox:', mapboxResponse.status);
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: `Erreur API Mapbox: ${mapboxResponse.status}` 
            }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        const geocodingData: MapboxResponse = await mapboxResponse.json();
        console.log('📍 Réponse Mapbox:', geocodingData);

        if (geocodingData.features && geocodingData.features.length > 0) {
          const [lng, lat] = geocodingData.features[0].center;
          console.log('✅ Coordonnées trouvées:', { lat, lng });
          
          return new Response(
            JSON.stringify({ 
              success: true, 
              coordinates: { lat, lng },
              place_name: geocodingData.features[0].place_name
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        } else {
          console.log('❌ Aucune coordonnée trouvée pour:', address);
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Aucune coordonnée trouvée pour cette adresse' 
            }),
            { 
              status: 404, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

      default:
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Action non reconnue' 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
    }
  } catch (error) {
    console.error('💥 Erreur dans mapbox-geocoding:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur interne' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});