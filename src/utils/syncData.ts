import { supabase } from '@/integrations/supabase/client';

export async function syncProspectionData() {
  try {
    console.log('🚀 Démarrage de la synchronisation directe...');
    
    // Récupérer les entreprises manquantes depuis prospection_iluma
    const { data: prospectionData, error: prospectionError } = await supabase
      .from('prospection_iluma')
      .select('*');
    
    if (prospectionError) {
      console.error('❌ Erreur prospection:', prospectionError);
      throw prospectionError;
    }
    
    // Récupérer les entreprises existantes
    const { data: existingBusinesses, error: existingError } = await supabase
      .from('businesses')
      .select('name');
    
    if (existingError) {
      console.error('❌ Erreur businesses:', existingError);
      throw existingError;
    }
    
    const existingNames = new Set(existingBusinesses?.map(b => b.name?.toLowerCase()) || []);
    
    // Préparer les nouvelles entreprises
    const newBusinesses = [];
    let processed = 0;
    
    for (const prospect of prospectionData || []) {
      const name = prospect["Nom de l'entreprise"];
      if (!name || existingNames.has(name.toLowerCase())) continue;
      
      const address = prospect["Adresse complète"] || null;
      let city = 'Non spécifié';
      
      if (address) {
        if (address.includes('Montréal') || address.includes('Montreal')) city = 'Montréal';
        else if (address.includes('Québec') || address.includes('Quebec')) city = 'Québec';
        else if (address.includes('Laval')) city = 'Laval';
        else if (address.includes('Longueuil')) city = 'Longueuil';
        else if (address.includes('Gatineau')) city = 'Gatineau';
        else if (address.includes('Sherbrooke')) city = 'Sherbrooke';
        else if (address.includes('Trois-Rivières')) city = 'Trois-Rivières';
      }
      
      const rating = prospect["⭐ Étoiles Google"];
      const googleRating = rating && /^[0-9,\.]+$/.test(rating) 
        ? parseFloat(rating.replace(',', '.')) 
        : null;
      
      const reviewCount = prospect["Nb d'avis Google"] || 0;
      
      let ilaScore = 60;
      if (googleRating && googleRating >= 4.5) ilaScore = 85;
      else if (googleRating && googleRating >= 4.0) ilaScore = 75;
      
      let potential = 'low';
      if (googleRating && googleRating >= 4.5 && reviewCount >= 50) potential = 'high';
      else if (googleRating && googleRating >= 4.0) potential = 'medium';
      
      newBusinesses.push({
        name,
        address,
        city,
        province: 'QC',
        country: 'Canada',
        sector: prospect["Industrie"] || 'Non spécifié',
        phone: prospect["Téléphone"] || null,
        website: prospect["Site web"] || null,
        google_rating: googleRating,
        review_count: reviewCount,
        ila_score: ilaScore,
        status: 'prospect',
        potential,
        source: 'manual'
      });
      
      processed++;
      if (processed >= 100) break; // Limiter à 100 pour cette batch
    }
    
    console.log(`📦 Insertion de ${newBusinesses.length} nouvelles entreprises...`);
    
    // Insérer par batches de 20
    let totalInserted = 0;
    for (let i = 0; i < newBusinesses.length; i += 20) {
      const batch = newBusinesses.slice(i, i + 20);
      
      const { error: insertError } = await supabase
        .from('businesses')
        .insert(batch);
      
      if (insertError) {
        console.error(`❌ Erreur batch ${Math.floor(i/20) + 1}:`, insertError);
        continue;
      }
      
      totalInserted += batch.length;
      console.log(`✅ Batch ${Math.floor(i/20) + 1} inséré: ${batch.length} entreprises`);
    }
    
    console.log(`🎉 Synchronisation terminée ! ${totalInserted} entreprises ajoutées`);
    return { success: true, inserted: totalInserted };
    
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
    throw error;
  }
}