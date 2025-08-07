// Utilitaires pour le calcul et l'affichage des scores

export const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10B981'; // Vert
  if (score >= 60) return '#F59E0B'; // Jaune
  if (score >= 40) return '#EF4444'; // Orange/Rouge
  return '#6B7280'; // Gris
};

export const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Bon';
  if (score >= 40) return 'Moyen';
  return 'Faible';
};

export const calculateDigitalPresence = (business: any, ahrefMatch: any): 'forte' | 'moyenne' | 'faible' => {
  const traffic = Number(ahrefMatch?.['Total Traffic']) || 0;
  const keywords = Number(ahrefMatch?.['Total Keywords (asc)']) || 0;
  
  if (traffic > 1000 || keywords > 100) return 'forte';
  if (traffic > 100 || keywords > 20) return 'moyenne';
  return 'faible';
};

export const calculateCompetitionLevel = (sector: string, allBusinesses: any[]): 'élevée' | 'moyenne' | 'faible' => {
  const sectorCount = allBusinesses.filter(b => b.sector === sector).length;
  if (sectorCount > 20) return 'élevée';
  if (sectorCount > 10) return 'moyenne';
  return 'faible';
};

export const getMatchingPotential = (business: any) => {
  let score = 0;
  
  // Facteurs positifs pour le matching QRVISIBILITÉ™
  if (business.organicTraffic < 500) score += 30;
  if (business.ilaScore < 60) score += 25;
  if (!business.website || business.website === '') score += 20;
  if (business.googleReviews < 20) score += 15;
  if (business.keywords < 50) score += 10;
  
  if (score >= 70) return { 
    level: 'Élevé', 
    color: 'text-green-400', 
    description: 'Client idéal pour QRVISIBILITÉ™',
    priority: 1
  };
  if (score >= 40) return { 
    level: 'Moyen', 
    color: 'text-yellow-400', 
    description: 'Prospect intéressant avec potentiel',
    priority: 2
  };
  return { 
    level: 'Faible', 
    color: 'text-red-400', 
    description: 'Accompagnement nécessaire',
    priority: 3
  };
};