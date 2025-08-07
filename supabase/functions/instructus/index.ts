import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SearchResult {
  title: string
  link: string
  snippet: string
}

interface GoogleSearchResponse {
  items?: SearchResult[]
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { entreprise, customSearchId } = await req.json()

    if (!entreprise) {
      throw new Error('Nom de l\'entreprise requis')
    }

    // Get Google Custom Search API key from database
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from('api_secrets')
      .select('key_value')
      .eq('service_name', 'google_custom_search')
      .eq('key_name', 'api_key')
      .single()

    if (apiKeyError || !apiKeyData?.key_value) {
      throw new Error('Clé API Google Custom Search non configurée')
    }

    const apiKey = apiKeyData.key_value
    const cx = customSearchId || 'a0e20b5e8a0604d64' // Default custom search engine ID

    // Build search query
    const searchQuery = `${entreprise} site officiel`
    
    // Call Google Custom Search API
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(searchQuery)}&num=3`
    
    console.log('🔍 INSTRUCTUS™ - Recherche pour:', entreprise)
    
    const response = await fetch(searchUrl)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur API Google:', errorText)
      throw new Error(`Erreur API Google Custom Search: ${response.status}`)
    }

    const searchData: GoogleSearchResponse = await response.json()
    
    if (!searchData.items || searchData.items.length === 0) {
      console.log('⚠️ Aucun résultat trouvé pour:', entreprise)
      
      // Save empty result
      await supabase.from('prospects_enrichis').insert({
        entreprise,
        site_web: null,
        snippet: 'Aucun résultat trouvé',
        titre: 'Aucun résultat',
        search_query: searchQuery,
        confidence_score: 0
      })

      return new Response(
        JSON.stringify({
          success: true,
          entreprise,
          site_web: null,
          message: 'Aucun résultat trouvé'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get the best result (first one)
    const bestResult = searchData.items[0]
    
    // Calculate confidence score based on search quality
    let confidenceScore = 50 // Base score
    
    if (bestResult.title.toLowerCase().includes(entreprise.toLowerCase())) {
      confidenceScore += 30
    }
    
    if (bestResult.link.includes('www.')) {
      confidenceScore += 10
    }
    
    if (bestResult.snippet.toLowerCase().includes('officiel')) {
      confidenceScore += 10
    }

    // Save enriched data to database
    const { data: savedData, error: saveError } = await supabase
      .from('prospects_enrichis')
      .insert({
        entreprise,
        site_web: bestResult.link,
        snippet: bestResult.snippet,
        titre: bestResult.title,
        search_query: searchQuery,
        confidence_score: Math.min(confidenceScore, 100)
      })
      .select()
      .single()

    if (saveError) {
      console.error('❌ Erreur sauvegarde:', saveError)
      throw saveError
    }

    console.log('✅ INSTRUCTUS™ - Enrichissement réussi:', {
      entreprise,
      site_web: bestResult.link,
      confidence: confidenceScore
    })

    return new Response(
      JSON.stringify({
        success: true,
        entreprise,
        site_web: bestResult.link,
        snippet: bestResult.snippet,
        titre: bestResult.title,
        confidence_score: confidenceScore,
        id: savedData.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('❌ INSTRUCTUS™ Erreur:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})