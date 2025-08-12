// Types partagés pour le module v5 - COMPLET avec toutes les statistiques Supabase
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
  
  // Données Ahrefs principales
  organicTraffic: number;
  keywords: number;
  backlinks: number;
  domainRating: number;
  
  // Données calculées
  ilaScore: number;
  digitalPresence: 'forte' | 'moyenne' | 'faible';
  competitionLevel: 'élevée' | 'moyenne' | 'faible';
  
  // Métriques Ahrefs complètes
  refDomains?: number;
  refDomainsDofollow?: number;
  refDomainsGovernmental?: number;
  refDomainsEducational?: number;
  refIps?: number;
  refSubnets?: number;
  linkedDomains?: number;
  ahrefsRank?: number;
  backlinksText?: number;
  backlinksNofollow?: number;
  backlinksRedirect?: number;
  backlinksImage?: number;
  backlinksFrame?: number;
  backlinksForm?: number;
  backlinksGovernmental?: number;
  backlinksEducational?: number;
  
  // Métriques de contenu
  presenceBlog?: boolean;
  qualiteBlog?: number;
  pagesIndexees?: number;
  
  // Métriques financières
  cpcMoyen?: number;
  kdMoyen?: number;
  
  // Scores détaillés
  seoScoreDetailed?: number;
  contenuScore?: number;
  presencePhysiqueScore?: number;
  reputationScore?: number;
  positionScore?: number;
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