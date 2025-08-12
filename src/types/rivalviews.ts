export interface RivalBusiness {
  id: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  website?: string;
  sector: string;
  googleRating: number;
  reviewCount: number;
  serpRank: number;
  isSponsored: boolean;
  source: 'SEO' | 'GMB' | 'Ads' | 'Social';
  lat: number;
  lng: number;
  ilaScore: number;
  status: 'prospect' | 'contacted' | 'client' | 'lost';
  lastContact?: string;
  assignedTo?: string;
  notes?: string;
  potential: 'low' | 'medium' | 'high';
  tags?: string[];
  
  // Données complètes de performance selon format demandé
  isChain: boolean;
  chainCount?: number;
  indexedKeywords: number; // Total mots-clés (Ahrefs)
  top10Keywords: number; // Top 10 mots-clés
  top20Keywords?: number; // Top 20 mots-clés calculé
  topKeyword?: string; // Mot-clé #1 principal
  topKeywordVolume?: number; // Volume mensuel du mot-clé #1
  backlinks: number; // Backlinks totaux
  organicTraffic: number; // Trafic estimé/mois (Ahrefs)
  totalComments: number; // Commentaires GMB
  hasPhotos: boolean; // Photos présentes
  distanceFromUser?: number;
  lastReview?: string;
  avgPosition?: number;
  
  // Données sociales enrichies
  followersInstagram?: number;
  followersFacebook?: number;
  followersTikTok?: number;
  followersLinkedIn?: number;
  
  // Métriques SEO avancées
  domainRating?: number; // DR Ahrefs
  ahrefsRank?: number;
  refDomains?: number; // Domaines référents
  seoScore?: number; // Score SEO sur 5
  
  // Métriques Ahrefs complètes - TOUTES les données de Supabase
  refDomainsDofollow?: number;
  refDomainsGovernmental?: number;
  refDomainsEducational?: number;
  refIps?: number;
  refSubnets?: number;
  linkedDomains?: number;
  backlinksText?: number;
  backlinksNofollow?: number;
  backlinksRedirect?: number;
  backlinksImage?: number;
  backlinksFrame?: number;
  backlinksForm?: number;
  backlinksGovernmental?: number;
  backlinksEducational?: number;
  
  // Métriques de contenu et blog
  presenceBlog?: boolean;
  qualiteBlog?: number;
  pagesIndexees?: number;
  
  // Métriques financières
  cpcMoyen?: number;
  kdMoyen?: number;
  
  // Scores détaillés ILA
  seoScoreDetailed?: number;
  contenuScore?: number;
  presencePhysiqueScore?: number;
  reputationScore?: number;
  positionScore?: number;
  
  // Actions et recommandations IA
  aiRecommendedAction?: string; // Action IA recommandée
  aiAnalysis?: string; // Analyse complète IA
  competitorAnalysis?: string; // Analyse concurrentielle
  
  // Synchronisation CRM
  crmId?: string; // ID dans le CRM
  lastSyncAt?: string; // Dernière synchronisation
  syncStatus?: 'synced' | 'pending' | 'error';
}

export interface RivalFilters {
  sector?: string;
  city?: string;
  ilaScoreMin?: number;
  ilaScoreMax?: number;
  status?: RivalBusiness['status'];
  potential?: RivalBusiness['potential'];
  source?: RivalBusiness['source'];
  hasWebsite?: boolean;
  googleRatingMin?: number;
  searchQuery?: string;
}

export interface RivalStats {
  totalBusinesses: number;
  averageILAScore: number;
  topSector: string;
  conversionRate: number;
  prospectsByStatus: Record<string, number>;
  scoreDistribution: {
    high: number;    // 80-100
    medium: number;  // 60-79
    low: number;     // 0-59
  };
}

export interface RivalZone {
  id: string;
  name: string;
  center: [number, number];
  radius: number;
  businesses: string[]; // IDs des businesses dans cette zone
  averageScore: number;
  density: 'low' | 'medium' | 'high';
  opportunity: 'low' | 'medium' | 'high';
}

export interface RivalAnalysis {
  businessId: string;
  recommendations: string[];
  competitors: RivalBusiness[];
  opportunities: {
    seo: string[];
    local: string[];
    content: string[];
  };
  estimatedROI: {
    monthly: number;
    yearly: number;
    confidence: number;
  };
}

export interface RivalExportData {
  businesses: RivalBusiness[];
  stats: RivalStats;
  filters: RivalFilters;
  generatedAt: string;
  context: string;
}