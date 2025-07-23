import { BusinessData } from '@/types/heatmap.ts';

// Coordonnées approximatives pour les villes du Québec
const CITY_COORDINATES = {
  'Montréal': { lat: 45.5017, lng: -73.5673 },
  'Laval': { lat: 45.6066, lng: -73.7124 },
  'Brossard': { lat: 45.4515, lng: -73.4488 },
  'Longueuil': { lat: 45.5312, lng: -73.5184 },
  'Saint-Laurent': { lat: 45.5088, lng: -73.6648 },
  'Boucherville': { lat: 45.5912, lng: -73.4368 }
};

// Secteurs d'activité détectés
const BUSINESS_SECTORS = {
  'meuble': ['meuble', 'mobilier', 'furniture', 'corbeil'],
  'matelas': ['matelas', 'dormez', 'sleep'],
  'cuisine': ['cuisine', 'kitchen', 'kwizine'],
  'decoration': ['décor', 'decoration', 'design', 'style'],
  'electromenager': ['électro', 'appliance', 'electro'],
  'magasin_general': ['walmart', 'costco', 'canadian tire']
};

export const parseBusinessData = (csvData: string): BusinessData[] => {
  const lines = csvData.split('\n');
  const businesses: BusinessData[] = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const fields = parseCSVLine(line);
    if (fields.length < 3) continue;
    
    const business = createBusinessFromFields(fields, i);
    if (business) {
      businesses.push(business);
    }
  }
  
  return businesses;
};

const parseCSVLine = (line: string): string[] => {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  fields.push(current.trim());
  return fields;
};

const createBusinessFromFields = (fields: string[], index: number): BusinessData | null => {
  const name = fields[0]?.replace(/"/g, '') || '';
  if (!name || name === 'Nom') return null;
  
  const city = detectCity(fields[1] || '');
  const address = fields[2]?.replace(/"/g, '') || '';
  const phone = fields[3]?.replace(/"/g, '') || '';
  const gmbLink = fields[4]?.replace(/"/g, '') || '';
  const website = fields[5]?.replace(/"/g, '') || '';
  const googleRating = parseFloat(fields[6]) || 0;
  const reviewCount = parseInt(fields[7]) || 0;
  const serpRank = parseInt(fields[8]) || 0;
  const isSponsored = fields[9]?.toLowerCase().includes('oui') || false;
  
  const sector = detectSector(name);
  const coordinates = generateCoordinates(city, address);
  const ilaScore = calculateInitialILAScore({
    googleRating,
    reviewCount,
    serpRank,
    hasGMB: !!gmbLink,
    hasWebsite: !!website,
    isSponsored
  });
  
  return {
    id: `business_${index}_${Date.now()}`,
    name,
    city,
    address,
    phone: phone || undefined,
    gmbLink: gmbLink || undefined,
    website: website || undefined,
    googleRating: googleRating || undefined,
    reviewCount: reviewCount || undefined,
    serpRank: serpRank || undefined,
    isSponsored,
    source: 'CSV_Import',
    sector,
    coordinates,
    ilaScore,
    status: 'prospect',
    actions: []
  };
};

const detectCity = (cityField: string): string => {
  const normalized = cityField.toLowerCase().replace(/[^a-z]/g, '');
  
  if (normalized.includes('montreal') || normalized.includes('montréal')) return 'Montréal';
  if (normalized.includes('laval')) return 'Laval';
  if (normalized.includes('brossard')) return 'Brossard';
  if (normalized.includes('longueuil')) return 'Longueuil';
  if (normalized.includes('saintlaurent') || normalized.includes('stlaurent')) return 'Saint-Laurent';
  if (normalized.includes('boucherville')) return 'Boucherville';
  
  return 'Montréal'; // Default
};

const detectSector = (businessName: string): string => {
  const normalized = businessName.toLowerCase();
  
  for (const [sector, keywords] of Object.entries(BUSINESS_SECTORS)) {
    if (keywords.some(keyword => normalized.includes(keyword))) {
      return sector;
    }
  }
  
  return 'commerce_general';
};

const generateCoordinates = (city: string, address: string): { lat: number; lng: number } => {
  const baseCoords = CITY_COORDINATES[city] || CITY_COORDINATES['Montréal'];
  
  // Add small random offset based on address hash for realistic distribution
  const addressHash = Array.from(address).reduce((hash, char) => 
    ((hash << 5) - hash) + char.charCodeAt(0), 0
  );
  
  const latOffset = ((addressHash % 100) - 50) * 0.001; // ±0.05 degrees
  const lngOffset = (((addressHash >> 8) % 100) - 50) * 0.001;
  
  return {
    lat: baseCoords.lat + latOffset,
    lng: baseCoords.lng + lngOffset
  };
};

const calculateInitialILAScore = (data: {
  googleRating: number;
  reviewCount: number;
  serpRank: number;
  hasGMB: boolean;
  hasWebsite: boolean;
  isSponsored: boolean;
}) => {
  // Calcul sophistiqué du score ILA™
  let seoScore = 50;
  let visibilityScore = 40;
  let reputationScore = 30;
  let technicalScore = 45;
  
  // SEO Score (basé sur SERP rank)
  if (data.serpRank > 0) {
    seoScore = Math.max(20, 100 - (data.serpRank * 5));
  }
  
  // Visibility Score (GMB, sponsored)
  if (data.hasGMB) visibilityScore += 30;
  if (data.isSponsored) visibilityScore += 20;
  if (data.hasWebsite) visibilityScore += 25;
  
  // Reputation Score (avis Google)
  if (data.googleRating > 0) {
    reputationScore = Math.min(100, (data.googleRating / 5) * 60 + (Math.log(data.reviewCount + 1) * 10));
  }
  
  // Technical Score (présence web)
  if (data.hasWebsite) technicalScore += 25;
  if (data.hasGMB) technicalScore += 20;
  
  // Score global pondéré
  const overall = Math.round(
    (seoScore * 0.3) + 
    (visibilityScore * 0.25) + 
    (reputationScore * 0.25) + 
    (technicalScore * 0.2)
  );
  
  return {
    overall: Math.min(100, Math.max(0, overall)),
    seo: Math.min(100, Math.max(0, seoScore)),
    visibility: Math.min(100, Math.max(0, visibilityScore)),
    reputation: Math.min(100, Math.max(0, reputationScore)),
    technical: Math.min(100, Math.max(0, technicalScore))
  };
};