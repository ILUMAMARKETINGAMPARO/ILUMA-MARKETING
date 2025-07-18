import { RivalBusiness, RivalStats, RivalFilters } from '@/types/rivalviews';

export const parseRivalCSVData = (csvString: string): RivalBusiness[] => {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    
    const name = values[1] || 'Entreprise inconnue';
    const business: RivalBusiness = {
      id: values[0] || `qr_${index}`,
      name,
      city: values[2] || 'Ville inconnue',
      address: values[3] || '',
      phone: values[4] || '',
      googleRating: parseFloat(values[5]) || 0,
      reviewCount: parseInt(values[6]) || 0,
      serpRank: parseInt(values[7]) || 999,
      isSponsored: values[8] === 'true',
      source: (values[9] as RivalBusiness['source']) || 'SEO',
      sector: values[10] || 'Services',
      lat: parseFloat(values[11]) || 45.5017,
      lng: parseFloat(values[12]) || -73.5673,
      ilaScore: parseInt(values[13]) || 0,
      status: (values[14] as RivalBusiness['status']) || 'prospect',
      website: values[15] === 'true' ? `https://${name.toLowerCase().replace(/\s+/g, '')}.com` : undefined,
      potential: (values[16] as RivalBusiness['potential']) || 'medium',
      tags: values[17] ? values[17].split(';') : [],
      
      // Nouvelles données ILA™
      isChain: Math.random() > 0.7,
      chainCount: Math.random() > 0.7 ? Math.floor(Math.random() * 8) + 2 : undefined,
      indexedKeywords: Math.floor(Math.random() * 100) + 20,
      top10Keywords: Math.floor(Math.random() * 25) + 5,
      topKeyword: 'restaurant montreal',
      topKeywordVolume: Math.floor(Math.random() * 5000) + 1000,
      backlinks: Math.floor(Math.random() * 200) + 10,
      organicTraffic: Math.floor(Math.random() * 10000) + 500,
      totalComments: parseInt(values[6]) || 0,
      hasPhotos: Math.random() > 0.3,
      distanceFromUser: Math.round((Math.random() * 40 + 1) * 10) / 10,
      lastReview: Math.random() > 0.5 ? "Excellent service, je recommande!" : undefined,
      avgPosition: Math.round((Math.random() * 30 + 5) * 10) / 10
    };
    
    return business;
  });
};

export const calculateRivalStats = (businesses: RivalBusiness[], filters?: RivalFilters): RivalStats => {
  const filteredBusinesses = filterRivalBusinesses(businesses, filters);
  
  const totalBusinesses = filteredBusinesses.length;
  const averageILAScore = totalBusinesses > 0 
    ? filteredBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / totalBusinesses 
    : 0;
  
  // Secteur le plus représenté
  const sectorCounts = filteredBusinesses.reduce((acc, b) => {
    acc[b.sector] = (acc[b.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topSector = Object.entries(sectorCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Aucun';
  
  // Taux de conversion (clients / total prospects)
  const clientCount = filteredBusinesses.filter(b => b.status === 'client').length;
  const conversionRate = totalBusinesses > 0 ? (clientCount / totalBusinesses) * 100 : 0;
  
  // Répartition par statut
  const prospectsByStatus = filteredBusinesses.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Distribution des scores
  const scoreDistribution = {
    high: filteredBusinesses.filter(b => b.ilaScore >= 80).length,
    medium: filteredBusinesses.filter(b => b.ilaScore >= 60 && b.ilaScore < 80).length,
    low: filteredBusinesses.filter(b => b.ilaScore < 60).length
  };
  
  return {
    totalBusinesses,
    averageILAScore: Math.round(averageILAScore),
    topSector,
    conversionRate: Math.round(conversionRate * 100) / 100,
    prospectsByStatus,
    scoreDistribution
  };
};

export const filterRivalBusinesses = (businesses: RivalBusiness[], filters?: RivalFilters): RivalBusiness[] => {
  if (!filters) return businesses;
  
  return businesses.filter(business => {
    // Filtre par secteur
    if (filters.sector && business.sector !== filters.sector) return false;
    
    // Filtre par ville
    if (filters.city && business.city !== filters.city) return false;
    
    // Filtre par score ILA
    if (filters.ilaScoreMin && business.ilaScore < filters.ilaScoreMin) return false;
    if (filters.ilaScoreMax && business.ilaScore > filters.ilaScoreMax) return false;
    
    // Filtre par statut
    if (filters.status && business.status !== filters.status) return false;
    
    // Filtre par potentiel
    if (filters.potential && business.potential !== filters.potential) return false;
    
    // Filtre par source
    if (filters.source && business.source !== filters.source) return false;
    
    // Filtre par présence site web
    if (filters.hasWebsite !== undefined) {
      const hasWebsite = Boolean(business.website);
      if (filters.hasWebsite !== hasWebsite) return false;
    }
    
    // Filtre par note Google
    if (filters.googleRatingMin && business.googleRating < filters.googleRatingMin) return false;
    
    // Filtre par recherche textuelle
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = `${business.name} ${business.address} ${business.sector}`.toLowerCase();
      if (!searchableText.includes(query)) return false;
    }
    
    return true;
  });
};

export const exportRivalData = (businesses: RivalBusiness[], format: 'csv' | 'json'): string => {
  if (format === 'json') {
    return JSON.stringify(businesses, null, 2);
  }
  
  // Export CSV
  const headers = [
    'id', 'name', 'city', 'address', 'phone', 'googleRating', 'reviewCount',
    'serpRank', 'isSponsored', 'source', 'sector', 'lat', 'lng', 'ilaScore',
    'status', 'website', 'potential', 'tags'
  ];
  
  const csvLines = [
    headers.join(','),
    ...businesses.map(b => [
      b.id, b.name, b.city, b.address, b.phone || '', b.googleRating,
      b.reviewCount, b.serpRank, b.isSponsored, b.source, b.sector,
      b.lat, b.lng, b.ilaScore, b.status, b.website || '',
      b.potential, (b.tags || []).join(';')
    ].join(','))
  ];
  
  return csvLines.join('\n');
};

export const generateRivalMockData = (count: number = 50): RivalBusiness[] => {
  const sectors = ['Meubles', 'Matelas', 'Restaurant', 'Concessionnaires', 'Courtiers', 'Avocats', 'Mécaniciens', 'Fleuristes', 'Commerce', 'Services', 'Santé', 'Immobilier', 'Beauté'];
  const cities = ['Montréal', 'Laval', 'Québec', 'Gatineau', 'Longueuil', 'Trois-Rivières'];
  const sources: RivalBusiness['source'][] = ['SEO', 'GMB', 'Ads', 'Social'];
  const statuses: RivalBusiness['status'][] = ['prospect', 'contacted', 'client', 'lost'];
  const potentials: RivalBusiness['potential'][] = ['low', 'medium', 'high'];
  
  // Noms d'entreprises québécoises réalistes par secteur
  const businessNames = {
    'Meubles': ['Mobilier Rustique', 'Ameublement Laval', 'Meubles Tanguay', 'Leon Mobilier', 'EconoMax Meubles'],
    'Matelas': ['Matelas Bonheur', 'Sleep Country', 'Dormez-Vous', 'Matelas Prestige', 'Concept Matelas'],
    'Restaurant': ['Chez Antoine', 'La Belle Province', 'Restaurant Milano', 'Bistro Le Montréalais', 'Cora Déjeuners'],
    'Concessionnaires': ['Honda Laval', 'Toyota Rive-Nord', 'Mazda Québec', 'Hyundai Gatineau', 'Nissan Montréal'],
    'Courtiers': ['Royal LePage', 'RE/MAX Québec', 'Century 21', 'Proprio Direct', 'Sutton Immobilier'],
    'Avocats': ['Cabinet Juridique Montréal', 'Avocats Laval Inc.', 'Droit & Justice', 'Lemieux Avocats', 'BCF Lawyers'],
    'Mécaniciens': ['Garage Pro-Tech', 'AutoService Plus', 'Mécanique Laval', 'Garage du Coin', 'Auto Excellence'],
    'Fleuristes': ['Fleurs Passion', 'Jardin Fleuri', 'Les Roses de Laval', 'Fleuriste Montréal', 'Bouquet Magique']
  };
  
  return Array.from({ length: count }, (_, i) => {
    const sector = sectors[Math.floor(Math.random() * sectors.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const reviewCount = Math.floor(Math.random() * 200) + 10;
    const isChain = Math.random() > 0.7;
    const topKeywords = [`${sector.toLowerCase()} ${city.toLowerCase()}`, `${sector} près de moi`, `meilleur ${sector} québec`];
    
    // Coordonnées réalistes par ville
    const cityCoords = {
      'Montréal': { lat: 45.5017, lng: -73.5673 },
      'Laval': { lat: 45.6066, lng: -73.7124 },
      'Québec': { lat: 46.8139, lng: -71.2080 },
      'Gatineau': { lat: 45.4765, lng: -75.7013 },
      'Longueuil': { lat: 45.5312, lng: -73.5182 },
      'Trois-Rivières': { lat: 46.3432, lng: -72.5462 }
    };
    
    const coords = cityCoords[city as keyof typeof cityCoords] || cityCoords['Montréal'];
    const businessNameList = businessNames[sector as keyof typeof businessNames] || [`${sector} ${city}`];
    const businessName = businessNameList[Math.floor(Math.random() * businessNameList.length)] || `${sector} ${city} ${i + 1}`;
    
    return {
      id: `qr_${i + 1}`,
      name: businessName,
      city,
      address: `${100 + i} Rue ${['Saint-Laurent', 'Notre-Dame', 'Sherbrooke', 'René-Lévesque', 'Sainte-Catherine'][Math.floor(Math.random() * 5)]}`,
      phone: `(${['514', '450', '418', '819', '438'][Math.floor(Math.random() * 5)]}) 555-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      email: `contact@${businessName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`,
      website: Math.random() > 0.3 ? `https://${businessName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com` : undefined,
      sector,
      googleRating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0
      reviewCount,
      serpRank: Math.floor(Math.random() * 20) + 1,
      isSponsored: Math.random() > 0.8,
      source: sources[Math.floor(Math.random() * sources.length)],
      lat: coords.lat + (Math.random() - 0.5) * 0.1,
      lng: coords.lng + (Math.random() - 0.5) * 0.1,
      ilaScore: Math.floor(Math.random() * 40) + 60, // 60-100
      status: statuses[Math.floor(Math.random() * statuses.length)],
      potential: potentials[Math.floor(Math.random() * potentials.length)],
      tags: Math.random() > 0.5 ? ['local', 'priority'] : undefined,
      
      // Nouvelles données ILA™ enrichies
      isChain,
      chainCount: isChain ? Math.floor(Math.random() * 8) + 2 : undefined,
      indexedKeywords: Math.floor(Math.random() * 100) + 20,
      top10Keywords: Math.floor(Math.random() * 25) + 5,
      topKeyword: topKeywords[Math.floor(Math.random() * topKeywords.length)],
      topKeywordVolume: Math.floor(Math.random() * 5000) + 1000,
      backlinks: Math.floor(Math.random() * 200) + 10,
      organicTraffic: Math.floor(Math.random() * 10000) + 500,
      totalComments: reviewCount,
      hasPhotos: Math.random() > 0.3,
      distanceFromUser: Math.round((Math.random() * 40 + 1) * 10) / 10,
      lastReview: Math.random() > 0.5 ? "Excellent service, je recommande!" : undefined,
      avgPosition: Math.round((Math.random() * 30 + 5) * 10) / 10
    };
  });
};