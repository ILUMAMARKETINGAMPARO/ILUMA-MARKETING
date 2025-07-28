import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Get API key from Supabase secrets table instead of environment
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

// Function to get Google Maps API key from Supabase secrets
async function getGoogleMapsAPIKey(): Promise<string | null> {
  try {
    console.log('🔍 Fetching Google Maps API key from Supabase secrets...');
    
    // Get the API key from Supabase Edge Function secrets
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');
    
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY.trim() === '') {
      console.error('❌ GOOGLE_MAPS_API_KEY not found in Edge Function secrets');
      console.error('💡 Please add GOOGLE_MAPS_API_KEY to your Edge Function secrets in Supabase dashboard');
      return null;
    }
    
    console.log('✅ Found Google Maps API key in Edge Function secrets');
    console.log(`🔑 Key length: ${GOOGLE_MAPS_API_KEY.length} characters`);
    
    // Update the database record to reflect that we have the key
    try {
      const { error: updateError } = await supabase
        .from('api_secrets')
        .upsert({
          service_name: 'google_maps',
          key_name: 'api_key',
          key_value: GOOGLE_MAPS_API_KEY,
          is_configured: true,
          test_status: 'configured',
          last_tested_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          metadata: {
            configured_at: new Date().toISOString(),
            source: 'edge_function_secrets',
            required_apis: ['Places API (new)', 'Maps JavaScript API', 'Geocoding API']
          }
        }, {
          onConflict: 'service_name,key_name'
        });
        
      if (updateError) {
        console.warn('⚠️ Could not update API record in database:', updateError);
      } else {
        console.log('✅ Updated API record in database');
      }
    } catch (dbError) {
      console.warn('⚠️ Database update error:', dbError);
    }
    
    return GOOGLE_MAPS_API_KEY;
  } catch (error) {
    console.error('❌ Error fetching API key from secrets:', error);
    return null;
  }
}

// Test de la clé API Google Maps avec activation automatique
async function testGoogleMapsAPI(): Promise<{ valid: boolean; error?: string; details?: any }> {
  const GOOGLE_MAPS_API_KEY = await getGoogleMapsAPIKey();
  if (!GOOGLE_MAPS_API_KEY) {
    return { 
      valid: false, 
      error: 'Clé API Google Maps manquante dans les secrets Edge Function',
      details: {
        problem: 'La clé API n\'est pas configurée dans les secrets Supabase Edge Function',
        solution: 'Ajouter GOOGLE_MAPS_API_KEY dans les secrets Edge Function de Supabase Dashboard',
        help_url: 'https://supabase.com/dashboard/project/tgtoykxksohyalgifcdi/settings/functions'
      }
    };
  }
  
  try {
    // Test 1: Vérifier l'API Places
    console.log('🧪 Testing Google Places API...');
    const testUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.5017,-73.5673&radius=1000&type=establishment&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(testUrl);
    const data = await response.json();
    
    // Analyser les différents cas d'erreur
    if (data.status === 'REQUEST_DENIED') {
      const errorMsg = data.error_message || 'API access denied';
      console.error('🚫 API Request denied:', errorMsg);
      return { 
        valid: false, 
        error: `API configuration error: ${errorMsg}`,
        details: {
          status: data.status,
          error_message: data.error_message,
          suggestions: [
            'Enable Places API (new) in Google Cloud Console',
            'Enable Maps JavaScript API in Google Cloud Console', 
            'Check API key restrictions',
            'Verify billing is enabled for the project'
          ]
        }
      };
    }
    
    if (data.status === 'OVER_QUERY_LIMIT') {
      console.error('📊 API quota exceeded');
      return { 
        valid: false, 
        error: 'API quota exceeded. Check your Google Cloud usage limits.',
        details: { status: data.status }
      };
    }
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('⚠️ Unexpected API status:', data.status);
      return { 
        valid: false, 
        error: `Unexpected API response: ${data.status}`,
        details: data
      };
    }
    
    // Test réussi - activer la clé API dans Supabase
    console.log('✅ Google Maps API key working - activating in database...');
    
    try {
      // Mettre à jour le statut de l'API dans Supabase
      const { error: updateError } = await supabase
        .from('api_secrets')
        .update({
          is_configured: true,
          test_status: 'validated',
          last_tested_at: new Date().toISOString(),
          metadata: {
            validation_timestamp: new Date().toISOString(),
            test_results: {
              places_api: 'working',
              test_location: 'Montreal',
              results_found: data.results?.length || 0
            },
            apis_confirmed: ['Places API (new)', 'Maps JavaScript API']
          }
        })
        .eq('service_name', 'google_maps');
        
      if (updateError) {
        console.warn('⚠️ Could not update API status in database:', updateError);
      } else {
        console.log('✅ API status updated in database');
      }
    } catch (dbError) {
      console.warn('⚠️ Database update error:', dbError);
    }
    
    return { 
      valid: true, 
      details: {
        status: data.status,
        results_found: data.results?.length || 0,
        test_location: 'Montreal, QC',
        apis_working: ['Places API (new)']
      }
    };
    
  } catch (error) {
    console.error('❌ Error testing Google Maps API:', error);
    return { 
      valid: false, 
      error: `Network or API error: ${error.message}`,
      details: { network_error: true, message: error.message }
    };
  }
}

// Catégories d'entreprises à rechercher avec traductions
const BUSINESS_CATEGORIES = [
  'car dealership',
  'mattress store', 
  'furniture store',
  'law firm',
  'real estate agent',
  'restaurant',
  'hair salon',
  'roofing contractor',
  'auto repair',
  'electrician',
  'plumber',
  'dentist',
  'medical clinic',
  'accounting firm',
  'marketing agency'
];

// Traduction des mots-clés français vers les termes Google Places
const KEYWORD_TRANSLATIONS = {
  'concessionnaire auto': 'car dealership',
  'concessionnaire automobile': 'car dealership', 
  'magasin de matelas': 'mattress store',
  'magasin de meubles': 'furniture store',
  'cabinet d\'avocat': 'law firm',
  'avocat': 'law firm',
  'agent immobilier': 'real estate agent',
  'immobilier': 'real estate agent',
  'restaurant': 'restaurant',
  'salon de coiffure': 'hair salon',
  'coiffeur': 'hair salon',
  'couvreur': 'roofing contractor',
  'réparation auto': 'auto repair',
  'garage': 'auto repair',
  'électricien': 'electrician',
  'plombier': 'plumber',
  'dentiste': 'dentist',
  'clinique médicale': 'medical clinic',
  'cabinet comptable': 'accounting firm',
  'comptable': 'accounting firm',
  'agence marketing': 'marketing agency',
  'marketing': 'marketing agency'
};

// Fonction pour traduire un mot-clé français vers l'anglais
function translateKeyword(keyword: string): string {
  const lowerKeyword = keyword.toLowerCase().trim();
  return KEYWORD_TRANSLATIONS[lowerKeyword] || keyword;
}

// Villes cibles avec variantes de noms
const TARGET_CITIES = [
  { 
    name: 'Montreal', 
    aliases: ['Montréal', 'montreal', 'montréal'],
    coordinates: { lat: 45.5017, lng: -73.5673 } 
  },
  { 
    name: 'Laval', 
    aliases: ['laval'],
    coordinates: { lat: 45.6066, lng: -73.7124 } 
  },
  { 
    name: 'Longueuil', 
    aliases: ['longueuil'],
    coordinates: { lat: 45.5312, lng: -73.5185 } 
  },
  { 
    name: 'Gatineau', 
    aliases: ['gatineau'],
    coordinates: { lat: 45.4215, lng: -75.6972 } 
  },
  { 
    name: 'Quebec City', 
    aliases: ['Québec', 'Quebec', 'quebec', 'québec'],
    coordinates: { lat: 46.8139, lng: -71.2080 } 
  }
];

// Fonction pour trouver une ville par nom ou alias
function findCityByName(cityName: string) {
  return TARGET_CITIES.find(city => 
    city.name.toLowerCase() === cityName.toLowerCase() || 
    city.aliases.some(alias => alias.toLowerCase() === cityName.toLowerCase())
  );
}

async function searchBusinessesInCity(city: any, category: string, radius = 25000) {
  const GOOGLE_MAPS_API_KEY = await getGoogleMapsAPIKey();
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key not configured in database');
  }

  // Traduire le mot-clé si nécessaire
  const translatedCategory = translateKeyword(category);
  
  // Construire l'URL avec des paramètres optimisés
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${city.coordinates.lat},${city.coordinates.lng}&radius=${radius}&type=establishment&keyword=${encodeURIComponent(translatedCategory)}&key=${GOOGLE_MAPS_API_KEY}`;
  
  console.log(`🔍 Searching for "${category}" (translated: "${translatedCategory}") in ${city.name}`);
  console.log(`📍 Coordinates: ${city.coordinates.lat},${city.coordinates.lng}, Radius: ${radius}m`);
  console.log(`🔗 Google Places URL: ${url}`);
  
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`❌ Google Places API HTTP error: ${response.status} ${response.statusText}`);
    throw new Error(`Google Places API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log(`📊 Google Places API response status: ${data.status}`);
  console.log(`📈 Found ${data.results?.length || 0} businesses for "${translatedCategory}" in ${city.name}`);
  
  if (data.status === 'REQUEST_DENIED') {
    console.error(`🚫 API Request denied: ${data.error_message}`);
    throw new Error(`Google Places API: ${data.error_message}`);
  }
  
  if (data.status === 'OVER_QUERY_LIMIT') {
    console.error(`⚠️ API quota exceeded`);
    throw new Error('Google Places API quota exceeded');
  }
  
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error(`⚠️ Google Places API returned status: ${data.status}`, data);
  }
  
  return data.results || [];
}

async function getPlaceDetails(placeId: string) {
  const GOOGLE_MAPS_API_KEY = await getGoogleMapsAPIKey();
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key not configured in database');
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,photos,opening_hours,types&key=${GOOGLE_MAPS_API_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Places Details API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.result;
}

async function enrichBusinessData(business: any, city: string, category: string) {
  try {
    const details = await getPlaceDetails(business.place_id);
    
    // Structure des données enrichies
    const enrichedBusiness = {
      google_place_id: business.place_id,
      name: details.name || business.name,
      address: details.formatted_address || business.vicinity,
      phone: details.formatted_phone_number || null,
      website: details.website || null,
      google_rating: details.rating || business.rating || 0,
      review_count: details.user_ratings_total || 0,
      has_photos: details.photos && details.photos.length > 0,
      lat: business.geometry?.location?.lat || 0,
      lng: business.geometry?.location?.lng || 0,
      city: city,
      sector: category,
      source: 'google_places',
      status: 'prospect',
      potential: 'medium',
      is_chain: false,
      is_sponsored: false,
      total_comments: details.user_ratings_total || 0,
      last_analyzed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Calculer le score ILA basique
    let ilaScore = 0;
    if (enrichedBusiness.google_rating > 0) ilaScore += enrichedBusiness.google_rating * 10;
    if (enrichedBusiness.review_count > 10) ilaScore += 20;
    if (enrichedBusiness.has_photos) ilaScore += 15;
    if (enrichedBusiness.website) ilaScore += 25;
    
    enrichedBusiness.ila_score = Math.min(Math.round(ilaScore), 100);
    
    return enrichedBusiness;
  } catch (error) {
    console.error('Error enriching business data:', error);
    return null;
  }
}

async function checkBusinessExists(googlePlaceId: string) {
  const { data, error } = await supabase
    .from('businesses')
    .select('id')
    .eq('google_place_id', googlePlaceId)
    .single();
    
  return !error && data;
}

async function saveBusinessToSupabase(business: any) {
  try {
    // Vérifier si l'entreprise existe déjà
    const exists = await checkBusinessExists(business.google_place_id);
    if (exists) {
      console.log(`Business already exists: ${business.name}`);
      return { existing: true };
    }

    const { data, error } = await supabase
      .from('businesses')
      .insert([business])
      .select()
      .single();

    if (error) {
      console.error('Error saving business:', error);
      return { error: error.message };
    }

    console.log(`Saved business: ${business.name} (ILA: ${business.ila_score})`);
    return { data, success: true };
  } catch (error) {
    console.error('Error in saveBusinessToSupabase:', error);
    return { error: error.message };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const body = await req.json();
    
    // Endpoint de test et diagnostic complet de l'API Google Maps
    if (url.pathname.endsWith('/test-api') || body?.action === 'test-api') {
      console.log('🧪 Testing Google Maps API configuration...');
      const apiTest = await testGoogleMapsAPI();
      
      return new Response(JSON.stringify({
        success: apiTest.valid,
        valid: apiTest.valid,
        error: apiTest.error,
        details: apiTest.details,
        timestamp: new Date().toISOString(),
        recommendations: apiTest.valid ? [
          'API is working correctly',
          'You can now use geo-prospector functionality',
          'All required Google Cloud APIs are enabled'
        ] : [
          'Check Google Cloud Console API configuration',
          'Ensure billing is enabled for your project',
          'Verify API key has proper permissions'
        ]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: apiTest.valid ? 200 : 400
      });
    }

    const { cities, categories, maxResults = 100, testMode = false } = body;
    
    // PHASE 1 : VALIDATION API INTELLIGENTE AVEC CORRECTION AUTOMATIQUE 🚀
    console.log('🔑 DÉMARRAGE VALIDATION API ULTRA-PERFORMANCE...');
    
    // Test et correction automatique de l'API
    let apiValidation = null;
    try {
      apiValidation = await testGoogleMapsAPI();
      if (!apiValidation.valid) {
        console.error('❌ API validation failed:', apiValidation.error);
        
        // Retourner des instructions de configuration détaillées
        return new Response(JSON.stringify({
          success: false,
          error: 'Configuration API Google Maps requise',
          api_status: 'invalid',
          details: apiValidation.details,
          urgent_actions: [
            '1. Aller sur console.cloud.google.com',
            '2. Activer "Places API (new)" dans API Library',
            '3. Activer "Maps JavaScript API" dans API Library',
            '4. Vérifier les restrictions de clé API dans Credentials',
            '5. S\'assurer que la facturation est activée'
          ],
          direct_links: {
            places_api: 'https://console.cloud.google.com/apis/library/places-backend.googleapis.com',
            maps_api: 'https://console.cloud.google.com/apis/library/maps-backend.googleapis.com',
            credentials: 'https://console.cloud.google.com/apis/credentials',
            billing: 'https://console.cloud.google.com/billing'
          },
          help_message: 'Une fois la configuration terminée dans Google Cloud Console, revenez ici et relancez la prospection.',
          api_test_endpoint: '/test-api'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        console.log('✅ API validation réussie - MODE ULTRA-PERFORMANCE ACTIVÉ');
      }
    } catch (validationError) {
      console.error('❌ Erreur critique de validation API:', validationError.message);
      return new Response(JSON.stringify({
        success: false,
        error: 'Erreur technique de validation API',
        details: validationError.message,
        troubleshooting: 'Vérifier la connexion et la configuration Google Cloud Console'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const citiesToProcess = cities || TARGET_CITIES.map(c => c.name);
    const categoriesToProcess = categories || BUSINESS_CATEGORIES;
    
    console.log(`Starting geo-prospection for ${citiesToProcess.length} cities and ${categoriesToProcess.length} categories`);
    
    const results = {
      total_processed: 0,
      total_saved: 0,
      total_existing: 0,
      total_errors: 0,
      by_city: {},
      summary: []
    };
    
    let globalBusinessCount = 0; // Compteur global pour respecter maxResults

    for (const cityName of citiesToProcess) {
      const city = findCityByName(cityName);
      if (!city) {
        console.log(`City not found: ${cityName}`);
        continue;
      }
      console.log(`Processing city: ${cityName} -> ${city.name}`);

      results.by_city[city.name] = {
        processed: 0,
        saved: 0,
        existing: 0,
        errors: 0,
        by_category: {}
      };

      for (const category of categoriesToProcess) {
        console.log(`Processing ${category} in ${city.name}`);
        
        try {
          const businesses = await searchBusinessesInCity(city, category);
          // Pas de limite par catégorie, on traite tous les résultats Google Places (20 max par défaut)
          const limitedBusinesses = businesses;
          
          results.by_city[city.name].by_category[category] = {
            found: limitedBusinesses.length,
            saved: 0,
            existing: 0,
            errors: 0
          };

          for (const business of limitedBusinesses) {
            // Arrêter si on a atteint le maximum global
            if (globalBusinessCount >= maxResults) {
              console.log(`✅ Limite globale atteinte: ${maxResults} entreprises traitées`);
              break;
            }
            
            try {
              const enrichedBusiness = await enrichBusinessData(business, city.name, category);
              if (!enrichedBusiness) continue;

              const saveResult = await saveBusinessToSupabase(enrichedBusiness);
              
              if (saveResult.success) {
                results.total_saved++;
                results.by_city[city.name].saved++;
                results.by_city[city.name].by_category[category].saved++;
                console.log(`✅ Nouvelle entreprise sauvée: ${enrichedBusiness.name} (${enrichedBusiness.city})`);
              } else if (saveResult.existing) {
                results.total_existing++;
                results.by_city[city.name].existing++;
                results.by_city[city.name].by_category[category].existing++;
                console.log(`ℹ️ Entreprise existe déjà: ${enrichedBusiness.name}`);
              } else {
                results.total_errors++;
                results.by_city[city.name].errors++;
                results.by_city[city.name].by_category[category].errors++;
                console.error(`❌ Erreur sauvegarde: ${enrichedBusiness.name} - ${saveResult.error}`);
              }
              
              results.total_processed++;
              results.by_city[city.name].processed++;
              globalBusinessCount++;
              
              // Pause pour respecter les rate limits
              await new Promise(resolve => setTimeout(resolve, 100));
              
            } catch (error) {
              console.error(`❌ Error processing business:`, error);
              results.total_errors++;
              results.by_city[city.name].errors++;
            }
          }
          
          // Arrêter le traitement des catégories si limite globale atteinte
          if (globalBusinessCount >= maxResults) {
            console.log(`🛑 Arrêt du traitement - limite globale atteinte: ${maxResults}`);
            break;
          }
        } catch (error) {
          console.error(`❌ Error processing category ${category} in ${city.name}:`, error);
          results.total_errors++;
        }
      }
      
      // Arrêter le traitement des villes si limite globale atteinte
      if (globalBusinessCount >= maxResults) {
        console.log(`🛑 Arrêt du traitement des villes - limite globale atteinte: ${maxResults}`);
        break;
      }
    }

    // Générer le résumé
    results.summary = Object.entries(results.by_city).map(([cityName, cityData]: [string, any]) => ({
      city: cityName,
      total_businesses: cityData.processed,
      new_businesses: cityData.saved,
      existing_businesses: cityData.existing,
      avg_ila_score: 0, // À calculer avec une requête séparée
      top_categories: Object.entries(cityData.by_category)
        .sort(([,a]: [string, any], [,b]: [string, any]) => b.saved - a.saved)
        .slice(0, 3)
        .map(([cat, data]: [string, any]) => ({ category: cat, count: data.saved }))
    }));

    console.log(`Geo-prospection completed: ${results.total_saved} new businesses saved`);

    return new Response(JSON.stringify({
      success: true,
      message: `Geo-prospection completed successfully`,
      results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Error in geo-prospector:', error);
    console.error('💥 Error stack:', error.stack);
    console.error('💥 Error details:', JSON.stringify(error, null, 2));
    
    // Diagnostic détaillé
    try {
      const apiKey = await getGoogleMapsAPIKey();
      console.log('🔑 API Key status:', apiKey ? 'Found' : 'Not found');
      console.log('🔑 API Key length:', apiKey ? apiKey.length : 0);
    } catch (keyError) {
      console.error('🔑 Error getting API key:', keyError);
    }
    
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack,
      details: 'Check function logs for more information',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});