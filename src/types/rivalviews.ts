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
  
  // Nouvelles variables pour Score ILA™ (selon document QRVISIBILITÉ™)
  isChain: boolean; // Succursale ou non
  chainCount?: number; // Nombre de succursales
  indexedKeywords: number; // Mots-clés indexés (Ahrefs)
  top10Keywords: number; // Mots-clés top 10 (Ahrefs)
  topKeyword?: string; // Top mot-clé par volume
  topKeywordVolume?: number; // Volume du top mot-clé
  backlinks: number; // Nombre total de backlinks (Ahrefs)
  organicTraffic: number; // Trafic organique estimé mensuel (Ahrefs)
  totalComments: number; // Nombre total de commentaires (GMB)
  hasPhotos: boolean; // Présence de photos (GMB)
  distanceFromUser?: number; // Distance / concentration concurrentielle
  lastReview?: string; // Dernier avis (preview)
  avgPosition?: number; // Position moyenne SEO
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