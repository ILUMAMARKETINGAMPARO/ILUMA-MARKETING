export interface BusinessData {
  id: string;
  name: string;
  city: string;
  address: string;
  phone?: string;
  gmbLink?: string;
  website?: string;
  googleRating?: number;
  reviewCount?: number;
  serpRank?: number;
  isSponsored: boolean;
  source: string;
  sector: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  ilaScore: {
    overall: number;
    seo: number;
    visibility: number;
    reputation: number;
    technical: number;
  };
  status: 'prospect' | 'contacted' | 'client' | 'inactive';
  assignedTo?: string;
  lastContact?: Date;
  notes?: string;
  actions: BusinessAction[];
  hasWebsite?: boolean;
  potential?: 'high' | 'medium' | 'low';
}

export interface BusinessAction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'follow-up' | 'quote';
  date: Date;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  assignedTo: string;
}

export interface HeatmapFilters {
  cities: string[];
  sectors: string[];
  ilaScoreRange: [number, number];
  status: string[];
  assignedTo: string[];
  hasGMB: boolean | null;
  hasWebsite: boolean | null;
  minReviewCount: number;
}

export interface MapCluster {
  id: string;
  center: { lat: number; lng: number };
  businesses: BusinessData[];
  averageIlaScore: number;
  count: number;
}

export interface HeatmapStats {
  totalBusinesses: number;
  averageIlaScore: number;
  topSectors: Array<{ sector: string; count: number; avgScore: number }>;
  cityDistribution: Array<{ city: string; count: number; avgScore: number }>;
  conversionOpportunities: number;
  highPotentialLeads: BusinessData[];
}

export interface HeatmapContextType {
  businesses: BusinessData[];
  filteredBusinesses: BusinessData[];
  filters: HeatmapFilters;
  stats: HeatmapStats;
  selectedBusiness: BusinessData | null;
  clusters: MapCluster[];
  isLoading: boolean;
  
  // Data management
  loadBusinessData: (csvData: string) => Promise<void>;
  updateBusiness: (id: string, updates: Partial<BusinessData>) => Promise<void>;
  addAction: (businessId: string, action: Omit<BusinessAction, 'id'>) => Promise<void>;
  
  // Filtering
  setFilters: (filters: Partial<HeatmapFilters>) => void;
  resetFilters: () => void;
  
  // Selection
  selectBusiness: (business: BusinessData | null) => void;
  
  // ILA Scoring
  calculateILAScore: (business: Partial<BusinessData>) => Promise<number>;
  recalculateAllScores: () => Promise<void>;
  
  // Export
  exportData: (format: 'csv' | 'pdf' | 'json') => Promise<void>;
  exportCRM: (businessIds: string[]) => Promise<void>;
}