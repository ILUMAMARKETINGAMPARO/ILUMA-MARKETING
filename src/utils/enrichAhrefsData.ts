import { supabase } from '@/integrations/supabase/client';

// Function to extract domain from URL
function extractDomain(url: string): string {
  if (!url) return '';
  
  // Remove protocol
  let domain = url.replace(/^https?:\/\//, '');
  // Remove www
  domain = domain.replace(/^www\./, '');
  // Remove trailing slash and path
  domain = domain.split('/')[0];
  // Remove trailing slash
  domain = domain.replace(/\/$/, '');
  
  return domain.toLowerCase();
}

export async function enrichBusinessesWithAhrefs() {
  console.log('🚀 Début de l\'enrichissement avec les données Ahrefs...');
  
  try {
    // 1. Récupérer les entreprises qui ont un site web mais pas encore de données Ahrefs
    const { data: businesses, error: businessError } = await supabase
      .from('businesses')
      .select('id, name, website, domain_rating, total_backlinks')
      .not('website', 'is', null)
      .neq('website', '')
      .is('domain_rating', null);

    if (businessError) {
      console.error('❌ Erreur lors de la récupération des entreprises:', businessError);
      return { success: false, error: businessError.message };
    }

    console.log(`📊 ${businesses?.length || 0} entreprises à enrichir`);

    if (!businesses || businesses.length === 0) {
      return { success: true, message: 'Aucune entreprise à enrichir' };
    }

    // 2. Récupérer toutes les données Ahrefs
    const { data: ahrefsData, error: ahrefsError } = await supabase
      .from('ahref')
      .select(`
        "Target", 
        "Domain Rating", 
        "Ahrefs Rank", 
        "Total Backlinks", 
        "Total Traffic",
        "Total Keywords (asc)",
        "Ref domains Dofollow",
        "Backlinks Text",
        "Backlinks NoFollow",
        domain_clean
      `);

    if (ahrefsError) {
      console.error('❌ Erreur lors de la récupération des données Ahrefs:', ahrefsError);
      return { success: false, error: ahrefsError.message };
    }

    console.log(`📈 ${ahrefsData?.length || 0} entrées Ahrefs disponibles`);

    let enrichedCount = 0;
    const batchSize = 10;

    // 3. Traiter les entreprises par lots
    for (let i = 0; i < businesses.length; i += batchSize) {
      const batch = businesses.slice(i, i + batchSize);
      
      for (const business of batch) {
        if (!business.website) continue;

        const businessDomain = extractDomain(business.website);
        
        // Chercher les données Ahrefs correspondantes
        const ahrefsMatch = ahrefsData?.find(ahrefs => {
          if (!ahrefs.domain_clean && !ahrefs.Target) return false;
          
          const ahreDomain = ahrefs.domain_clean || extractDomain(ahrefs.Target || '');
          return ahreDomain === businessDomain;
        });

        if (ahrefsMatch) {
          // Convertir les valeurs
          const domainRating = parseFloat(ahrefsMatch["Domain Rating"]?.toString() || '0') || 0;
          const ahrefsRank = parseInt(ahrefsMatch["Ahrefs Rank"]?.toString() || '0') || null;
          const totalBacklinks = parseInt(ahrefsMatch["Total Backlinks"]?.toString() || '0') || 0;
          const totalTraffic = parseInt(ahrefsMatch["Total Traffic"]?.toString() || '0') || 0;
          const totalKeywords = parseInt(ahrefsMatch["Total Keywords (asc)"]?.toString() || '0') || 0;
          const refDomainsDofollow = parseInt(ahrefsMatch["Ref domains Dofollow"]?.toString() || '0') || 0;
          const backlinksText = parseInt(ahrefsMatch["Backlinks Text"]?.toString() || '0') || 0;
          const backlinksNofollow = parseInt(ahrefsMatch["Backlinks NoFollow"]?.toString() || '0') || 0;

          // Mettre à jour l'entreprise
          const { error: updateError } = await supabase
            .from('businesses')
            .update({
              domain_rating: domainRating,
              ahrefs_rank: ahrefsRank,
              total_backlinks: totalBacklinks,
              organic_traffic: totalTraffic,
              total_keywords: totalKeywords,
              ref_domains_dofollow: refDomainsDofollow,
              backlinks_text: backlinksText,
              backlinks_nofollow: backlinksNofollow,
              updated_at: new Date().toISOString()
            })
            .eq('id', business.id);

          if (updateError) {
            console.error(`❌ Erreur mise à jour ${business.name}:`, updateError);
          } else {
            enrichedCount++;
            console.log(`✅ ${business.name} enrichi (DR: ${domainRating}, Backlinks: ${totalBacklinks})`);
          }
        }
      }

      // Pause entre les lots
      if (i + batchSize < businesses.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    console.log(`🎉 Enrichissement terminé: ${enrichedCount} entreprises mises à jour`);
    return { 
      success: true, 
      enrichedCount,
      totalProcessed: businesses.length,
      message: `${enrichedCount} entreprises enrichies avec succès`
    };

  } catch (error) {
    console.error('❌ Erreur générale:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
}