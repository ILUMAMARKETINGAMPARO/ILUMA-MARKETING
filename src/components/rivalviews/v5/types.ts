// Types partagés pour le module v5
export interface UnifiedBusinessData {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  googleStars: number;
  googleReviews: number;
  facebookFollowers?: number;
  instagramFollowers?: number;
  tiktokFollowers?: number;
  branches: number;
  sector: string;
  city: string;
  lat: number;
  lng: number;
  
  // Données Ahrefs
  organicTraffic: number;
  keywords: number;
  backlinks: number;
  domainRating: number;
  
  // Données calculées
  ilaScore: number;
  digitalPresence: 'forte' | 'moyenne' | 'faible';
  competitionLevel: 'élevée' | 'moyenne' | 'faible';
}

export type ViewModeV5 = 'map' | 'list' | 'hybrid';

export interface FilterStateV5 {
  searchQuery: string;
  selectedSector: string;
  selectedCity: string;
  ilaScoreRange: [number, number];
  hasGPS: boolean | null;
  digitalPresence: string | null;
}