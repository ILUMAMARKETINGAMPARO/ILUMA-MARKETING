import { BusinessProfile, ILUMATCHResult } from '@/types/ilumatch';

export const findBusinessMatches = async (
  targetBusiness: BusinessProfile,
  otherBusinesses: BusinessProfile[]
): Promise<ILUMATCHResult[]> => {
  const matches: ILUMATCHResult[] = [];

  for (const business of otherBusinesses) {
    // Éviter les compétiteurs directs
    if (isDirectCompetitor(targetBusiness, business)) continue;

    const scoreDelta = Math.abs(targetBusiness.ilaScore.overallScore - business.ilaScore.overallScore);
    const distance = calculateDistance(targetBusiness.coordinates, business.coordinates);
    
    // Critères de matching ILUMATCH™
    let matchType: 'perfecto' | 'compensatorio' | 'no_recomendado';
    let compatibility: number;

    if (scoreDelta <= 10 && distance <= 5) {
      matchType = 'perfecto';
      compatibility = 95 - scoreDelta;
    } else if (scoreDelta <= 20 && distance <= 10) {
      matchType = 'compensatorio';
      compatibility = 80 - scoreDelta;
    } else {
      matchType = 'no_recomendado';
      compatibility = Math.max(30, 60 - scoreDelta);
    }

    // Seuil minimum pour créer un match
    if (compatibility >= 60) {
      const match: ILUMATCHResult = {
        id: `match_${targetBusiness.id}_${business.id}_${Date.now()}`,
        business1: targetBusiness,
        business2: business,
        matchType,
        compatibility,
        scoreDelta,
        synergies: calculateSynergies(targetBusiness, business),
        generatedPitch: { fr: '', en: '', es: '' },
        generatedCTA: { fr: '', en: '', es: '' },
        createdAt: new Date(),
        status: 'pending'
      };

      matches.push(match);
    }
  }

  // Trier par compatibilité décroissante
  return matches.sort((a, b) => b.compatibility - a.compatibility);
};

const isDirectCompetitor = (business1: BusinessProfile, business2: BusinessProfile): boolean => {
  // Logique pour détecter les compétiteurs directs
  const sameSector = business1.sector.toLowerCase() === business2.sector.toLowerCase();
  const closeDistance = calculateDistance(business1.coordinates, business2.coordinates) < 2; // 2km
  
  return sameSector && closeDistance;
};

const calculateDistance = (coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }): number => {
  // Formule de Haversine pour calculer la distance
  const R = 6371; // Rayon de la Terre en km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const calculateSynergies = (business1: BusinessProfile, business2: BusinessProfile): string[] => {
  const synergies = [];
  
  // Synergie géographique
  const distance = calculateDistance(business1.coordinates, business2.coordinates);
  if (distance < 5) {
    synergies.push('Proximité géographique favorable');
  }

  // Synergie de scores
  const avgScore = (business1.ilaScore.overallScore + business2.ilaScore.overallScore) / 2;
  if (avgScore > 80) {
    synergies.push('Duo haute performance');
  }

  // Synergie de secteurs complémentaires
  if (areComplementarySectors(business1.sector, business2.sector)) {
    synergies.push('Secteurs complémentaires');
  }

  return synergies;
};

const areComplementarySectors = (sector1: string, sector2: string): boolean => {
  const complementaryPairs = [
    ['restaurant', 'traiteur'],
    ['coiffeur', 'esthétique'],
    ['fitness', 'nutrition'],
    ['immobilier', 'décoration'],
    ['automobile', 'assurance']
  ];

  return complementaryPairs.some(pair => 
    (pair.includes(sector1.toLowerCase()) && pair.includes(sector2.toLowerCase())) &&
    sector1.toLowerCase() !== sector2.toLowerCase()
  );
};