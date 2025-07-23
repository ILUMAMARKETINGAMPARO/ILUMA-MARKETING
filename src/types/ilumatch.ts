export interface ILAMetrics {
  trafficScore: number;
  backlinksScore: number;
  speedScore: number;
  uxScore: number;
  gmbScore: number;
  localVisibilityScore: number;
  contentQualityScore: number;
  technicalSeoScore: number;
  socialSignalsScore: number;
  competitionScore: number;
}

export interface ILACalculation {
  businessId: string;
  overallScore: number;
  metrics: ILAMetrics;
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

export interface BusinessProfile {
  id: string;
  name: string;
  sector: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  website?: string;
  phone?: string;
  email?: string;
  gmbUrl?: string;
  languages: ('fr' | 'en' | 'es')[];
  ilaScore: ILACalculation;
}

export interface ILUMATCHResult {
  id: string;
  business1: BusinessProfile;
  business2: BusinessProfile;
  matchType: 'perfecto' | 'compensatorio' | 'no_recomendado';
  compatibility: number;
  scoreDelta: number;
  synergies: string[];
  generatedPitch: {
    fr: string;
    en: string;
    es: string;
  };
  generatedCTA: {
    fr: string;
    en: string;
    es: string;
  };
  createdAt: Date;
  status: 'active' | 'pending' | 'declined';
}

export interface ILUMATCHContextType {
  businesses: BusinessProfile[];
  matches: ILUMATCHResult[];
  isCalculating: boolean;
  addBusiness: (business: Omit<BusinessProfile, 'id' | 'ilaScore'>) => Promise<void>;
  calculateILA: (businessId: string) => Promise<ILACalculation>;
  findMatches: (businessId: string) => Promise<ILUMATCHResult[]>;
  generateContent: (match: ILUMATCHResult) => Promise<void>;
}