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
    console.log('🚀 Début de l\'optimisation automatique des entreprises');

    // 1. Récupérer toutes les entreprises sans coordonnées
    const { data: businesses, error: fetchError } = await supabase
      .from('businesses')
      .select('*')
      .or('lat.is.null,lng.is.null');

    if (fetchError) {
      console.error('Erreur récupération entreprises:', fetchError);
      throw fetchError;
    }

    if (!businesses || businesses.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Aucune entreprise à optimiser',
        stats: { processed: 0, geocoded: 0, cleaned: 0, errors: 0 }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`📊 ${businesses.length} entreprises à optimiser`);

    let processed = 0;
    let geocoded = 0;
    let cleaned = 0;
    let errors = 0;

    // 2. Traiter par lots de 5 pour éviter la surcharge
    const batchSize = 5;
    for (let i = 0; i < businesses.length; i += batchSize) {
      const batch = businesses.slice(i, i + batchSize);
      
      console.log(`🔄 Traitement du lot ${Math.floor(i/batchSize) + 1}/${Math.ceil(businesses.length/batchSize)}`);

      // Traiter le lot en parallèle
      const batchPromises = batch.map(async (business) => {
        try {
          // Nettoyer les données
          const cleanedData = cleanBusinessData(business);
          
          // Géocoder si possible
          let coordinates = null;
          if (cleanedData.fullAddress) {
            coordinates = await geocodeAddress(cleanedData.fullAddress);
            if (coordinates) {
              geocoded++;
            }
          }

          // Mettre à jour en base
          const updateData = {
            name: cleanedData.name,
            address: cleanedData.address,
            city: cleanedData.city,
            sector: cleanedData.sector,
            ...(coordinates && {
              lat: coordinates.lat,
              lng: coordinates.lng
            }),
            updated_at: new Date().toISOString()
          };

          const { error: updateError } = await supabase
            .from('businesses')
            .update(updateData)
            .eq('id', business.id);

          if (updateError) throw updateError;

          processed++;
          cleaned++;
          
          console.log(`✅ ${cleanedData.name} - ${coordinates ? 'Géocodé' : 'Nettoyé'}`);

        } catch (error) {
          console.error(`❌ Erreur pour ${business.name}:`, error);
          errors++;
        }
      });

      await Promise.all(batchPromises);

      // Pause entre les lots
      if (i + batchSize < businesses.length) {
        console.log('⏱️ Pause de 2 secondes...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`🎉 Optimisation terminée! Processed: ${processed}, Geocoded: ${geocoded}, Errors: ${errors}`);

    return new Response(JSON.stringify({
      success: true,
      message: 'Optimisation automatique terminée!',
      stats: { processed, geocoded, cleaned, errors },
      details: {
        total_businesses: businesses.length,
        success_rate: Math.round((processed / businesses.length) * 100)
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Erreur optimization:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur lors de l\'optimisation',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function cleanBusinessData(business: any) {
  // Extraire les informations de l'adresse depuis le nom si nécessaire
  let address = business.address;
  let city = business.city;
  let name = business.name;

  // Si le nom contient une adresse complète (format: "123 Rue Example, Ville, QC Code")
  if (business.name && business.name.includes(',') && (!address || address === 'null')) {
    const parts = business.name.split(',').map((p: string) => p.trim());
    if (parts.length >= 2) {
      // Essayer de distinguer le nom de l'entreprise de l'adresse
      const firstPart = parts[0];
      
      // Si la première partie commence par un chiffre, c'est probablement une adresse
      if (/^\d/.test(firstPart)) {
        address = firstPart;
        city = parts[1];
        // Essayer de deviner le nom de l'entreprise basé sur le secteur
        name = generateBusinessName(business.sector || 'Service', city);
      } else {
        // Chercher une partie qui commence par un chiffre
        const addressPart = parts.find(part => /^\d/.test(part.trim()));
        if (addressPart) {
          const addressIndex = parts.indexOf(addressPart);
          name = parts.slice(0, addressIndex).join(' ').trim();
          address = addressPart;
          city = parts[addressIndex + 1] || parts[parts.length - 1];
        } else {
          address = parts[0];
          city = parts[1];
          name = `Entreprise ${city}`;
        }
      }
    }
  }

  // Nettoyer le nom
  name = name?.replace(/['"]/g, '').trim() || 'Entreprise inconnue';
  if (name.length > 100) {
    name = name.substring(0, 97) + '...';
  }

  // Nettoyer la ville
  city = city?.replace(/['"]/g, '').trim() || 'Non spécifiée';
  if (city === 'Non spécifié' || city === 'null') {
    city = 'Non spécifiée';
  }

  // Nettoyer l'adresse
  address = address?.replace(/['"]/g, '').trim() || null;
  if (address === 'null') {
    address = null;
  }

  // Déterminer le secteur basé sur le nom/mot-clés
  let sector = business.sector;
  if (!sector || sector === 'À déterminer' || sector === 'Non spécifié') {
    sector = determineSector(name.toLowerCase());
  }

  const fullAddress = address && city 
    ? `${address}, ${city}, ${business.province || 'QC'}, ${business.country || 'Canada'}`
    : null;

  return {
    name,
    address,
    city,
    sector,
    fullAddress
  };
}

function generateBusinessName(sector: string, city: string): string {
  const prefixes = {
    'restaurant': ['Restaurant', 'Bistro', 'Café'],
    'commerce': ['Boutique', 'Magasin', 'Commerce'],
    'santé': ['Clinique', 'Centre', 'Soins'],
    'service': ['Services', 'Entreprise', 'Solutions'],
    'beauté': ['Salon', 'Spa', 'Esthétique']
  };

  const sectorKey = Object.keys(prefixes).find(key => 
    sector.toLowerCase().includes(key)
  ) || 'service';

  const prefix = prefixes[sectorKey as keyof typeof prefixes][0];
  return `${prefix} ${city}`;
}

function determineSector(name: string): string {
  const sectors = {
    'restaurant': ['restaurant', 'resto', 'café', 'bar', 'pub', 'bistro', 'brasserie', 'pizz'],
    'commerce': ['magasin', 'boutique', 'shop', 'store', 'commerce', 'vente'],
    'santé': ['dentiste', 'médecin', 'clinique', 'pharmacie', 'optique', 'physiothérapie', 'santé'],
    'service': ['service', 'réparation', 'nettoyage', 'entretien', 'garage', 'consultation'],
    'immobilier': ['immobilier', 'courtier', 'hypothèque', 'construction', 'rénovation'],
    'beauté': ['coiffure', 'esthétique', 'spa', 'salon', 'beauté', 'manucure'],
    'transport': ['taxi', 'transport', 'livraison', 'déménagement', 'auto'],
    'finance': ['banque', 'assurance', 'comptable', 'finance', 'crédit'],
    'éducation': ['école', 'formation', 'cours', 'éducation', 'apprentissage'],
    'technologie': ['informatique', 'tech', 'développement', 'logiciel', 'web']
  };

  for (const [sectorName, keywords] of Object.entries(sectors)) {
    if (keywords.some(keyword => name.includes(keyword))) {
      return sectorName.charAt(0).toUpperCase() + sectorName.slice(1);
    }
  }

  return 'Services généraux';
}

async function geocodeAddress(address: string): Promise<{lat: number, lng: number} | null> {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&limit=1&country=CA`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const [lng, lat] = feature.center;
      return { lat, lng };
    }
    
    return null;
  } catch (error) {
    console.warn(`Erreur géocodage pour ${address}:`, error);
    return null;
  }
}