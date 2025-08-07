import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('🚀 Début de la synchronisation des données de prospection...');

    // 1. Récupérer toutes les données de prospection_iluma
    const { data: prospectionData, error: prospectionError } = await supabaseClient
      .from('prospection_iluma')
      .select('*');

    if (prospectionError) {
      console.error('❌ Erreur lors de la récupération des données de prospection:', prospectionError);
      throw prospectionError;
    }

    console.log(`📊 ${prospectionData?.length || 0} entreprises trouvées dans prospection_iluma`);

    // 2. Récupérer les entreprises existantes pour éviter les doublons
    const { data: existingBusinesses, error: existingError } = await supabaseClient
      .from('businesses')
      .select('name, website');

    if (existingError) {
      console.error('❌ Erreur lors de la récupération des entreprises existantes:', existingError);
      throw existingError;
    }

    const existingNames = new Set(existingBusinesses?.map(b => b.name?.toLowerCase().trim()) || []);
    const existingWebsites = new Set(existingBusinesses?.map(b => b.website?.toLowerCase().trim()) || []);

    console.log(`📋 ${existingBusinesses?.length || 0} entreprises déjà existantes - synchronisation continue`);

    // 3. Préparer les nouvelles données
    const newBusinesses = [];
    let duplicateCount = 0;

    console.log(`🔍 Vérification des doublons existants...`);
    console.log(`📋 Noms existants (sample):`, Array.from(existingNames).slice(0, 5));
    console.log(`🌐 Sites existants (sample):`, Array.from(existingWebsites).slice(0, 5));

    for (const prospect of prospectionData || []) {
      // Récupérer le nom en testant différentes variantes de la colonne
      let name;
      const nameKeys = ["Nom de l'entreprise", "nom_entreprise", "entreprise", "name"];
      for (const key of nameKeys) {
        if (prospect[key] && prospect[key] !== 'undefined' && prospect[key] !== 'null') {
          name = prospect[key]?.toString()?.trim();
          break;
        }
      }
      
      // Si toujours pas de nom, essayer les clés directement
      if (!name) {
        const keys = Object.keys(prospect);
        console.log('🔍 Clés disponibles:', keys);
        // Prendre la première clé qui semble contenir un nom
        for (const key of keys) {
          const value = prospect[key]?.toString()?.trim();
          if (value && value !== 'undefined' && value !== 'null' && value.length > 2) {
            name = value;
            console.log(`✅ Nom trouvé via clé "${key}": ${name}`);
            break;
          }
        }
      }
      
      const website = prospect["Site web"]?.toString()?.trim();
      
      if (!name || name === '' || name.toLowerCase() === 'undefined' || name.toLowerCase() === 'null') {
        console.log(`⚠️ Entreprise ignorée (nom invalide: "${name}"):`, { 
          nom: name, 
          adresse: prospect["Adresse complète"],
          website: website
        });
        continue;
      }

      // Logique de déduplication simplifiée - uniquement sur le nom complet
      const nameKey = name.toLowerCase().trim();
      
      // Vérifier uniquement les doublons de nom exact
      const isDuplicateName = existingNames.has(nameKey);
      
      if (isDuplicateName) {
        console.log(`🔄 Doublon de nom détecté:`, { name: nameKey });
        duplicateCount++;
        continue;
      }

      // Extraire la ville de l'adresse
      const address = prospect["Adresse complète"] || '';
      const addressParts = address.split(',').map(part => part.trim());
      let city = 'Non spécifié';
      
      if (addressParts.length >= 2) {
        // Généralement la ville est le deuxième élément après la virgule
        city = addressParts[addressParts.length - 2] || addressParts[1] || 'Non spécifié';
      // Nettoyer la ville (enlever code postal et province)
        city = city.replace(/\s+[A-Z]\d[A-Z]\s*\d[A-Z]\d/g, '').replace(/\s+QC$/i, '').replace(/\s+Quebec$/i, '').trim();
      }

      // Calculer un score ILA basique basé sur les données disponibles
      let ilaScore = 50; // Score de base
      
      // Bonus pour les données disponibles
      if (website) ilaScore += 10;
      if (prospect["⭐ Étoiles Google"]) {
        const rating = parseFloat(prospect["⭐ Étoiles Google"]);
        if (rating >= 4.5) ilaScore += 15;
        else if (rating >= 4.0) ilaScore += 10;
        else if (rating >= 3.5) ilaScore += 5;
      }
      if (prospect["Nb d'avis Google"]) {
        const reviews = parseInt(prospect["Nb d'avis Google"]);
        if (reviews >= 100) ilaScore += 15;
        else if (reviews >= 50) ilaScore += 10;
        else if (reviews >= 20) ilaScore += 5;
      }
      if (prospect["Followers Facebook"] && parseInt(prospect["Followers Facebook"]) > 1000) ilaScore += 10;
      if (prospect["Followers Instagram"] && parseInt(prospect["Followers Instagram"]) > 1000) ilaScore += 10;

      const businessData = {
        name: name,
        address: address || null,
        city: city,
        province: 'QC',
        country: 'Canada',
        sector: prospect["Industrie"] || 'Non spécifié',
        phone: prospect["Téléphone"] || null,
        website: website || null,
        google_rating: prospect["⭐ Étoiles Google"] ? parseFloat(prospect["⭐ Étoiles Google"]) : null,
        review_count: prospect["Nb d'avis Google"] ? parseInt(prospect["Nb d'avis Google"]) : 0,
        ila_score: Math.min(ilaScore, 100),
        status: 'prospect',
        potential: ilaScore >= 70 ? 'high' : ilaScore >= 55 ? 'medium' : 'low',
        source: 'import_prospection',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      newBusinesses.push(businessData);
      existingNames.add(nameKey);
    }

    console.log(`✅ ${newBusinesses.length} nouvelles entreprises à insérer`);
    console.log(`⚠️ ${duplicateCount} doublons évités`);

    // 4. Insérer par batches de 200 pour aller plus vite
    const batchSize = 200;
    let insertedCount = 0;
    
    for (let i = 0; i < newBusinesses.length; i += batchSize) {
      const batch = newBusinesses.slice(i, i + batchSize);
      
      const { data: insertedData, error: insertError } = await supabaseClient
        .from('businesses')
        .insert(batch)
        .select('id');

      if (insertError) {
        console.error(`❌ Erreur lors de l'insertion du batch ${Math.floor(i/batchSize) + 1}:`, insertError);
        // Continuer avec le batch suivant
        continue;
      }

      insertedCount += insertedData?.length || 0;
      console.log(`📦 Batch ${Math.floor(i/batchSize) + 1} inséré: ${insertedData?.length || 0} entreprises`);
    }

    // 5. Statistiques finales
    const { data: finalCount } = await supabaseClient
      .from('businesses')
      .select('id', { count: 'exact', head: true });

    console.log('🎉 Synchronisation terminée !');
    console.log(`📊 Total entreprises en base: ${finalCount?.length || 'inconnu'}`);
    console.log(`✅ Nouvelles entreprises ajoutées: ${insertedCount}`);
    console.log(`⚠️ Doublons évités: ${duplicateCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Synchronisation terminée avec succès',
        stats: {
          totalInDatabase: finalCount?.length || 0,
          newlyAdded: insertedCount,
          duplicatesSkipped: duplicateCount,
          processedFromProspection: prospectionData?.length || 0
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ Erreur générale:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Erreur inconnue lors de la synchronisation'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
})