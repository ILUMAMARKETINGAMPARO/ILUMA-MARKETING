import { ILACalculation, ILAMetrics, BusinessProfile } from '@/types/ilumatch';

// Poids pour chaque métrique dans le calcul ILA
const WEIGHTS = {
  trafficScore: 0.15,
  backlinksScore: 0.12,
  speedScore: 0.10,
  uxScore: 0.08,
  gmbScore: 0.20,
  localVisibilityScore: 0.15,
  contentQualityScore: 0.08,
  technicalSeoScore: 0.07,
  socialSignalsScore: 0.03,
  competitionScore: 0.02
};

export const calculateILAScore = async (business: Partial<BusinessProfile>): Promise<ILACalculation> => {
  // Simulation des appels API réels
  const metrics: ILAMetrics = {
    trafficScore: await getTrafficScore(business.website),
    backlinksScore: await getBacklinksScore(business.website),
    speedScore: await getSpeedScore(business.website),
    uxScore: await getUXScore(business.website),
    gmbScore: await getGMBScore(business.gmbUrl),
    localVisibilityScore: await getLocalVisibilityScore(business.address),
    contentQualityScore: await getContentQualityScore(business.website),
    technicalSeoScore: await getTechnicalSeoScore(business.website),
    socialSignalsScore: await getSocialSignalsScore(business.name),
    competitionScore: await getCompetitionScore(business.sector, business.address)
  };

  // Calcul du score ILA avec la formule pondérée
  const overallScore = Math.round(
    Object.entries(metrics).reduce((total, [key, value]) => {
      const weight = WEIGHTS[key as keyof typeof WEIGHTS] || 0;
      return total + (value * weight);
    }, 0)
  );

  return {
    businessId: business.id || 'temp',
    overallScore,
    metrics,
    lastUpdated: new Date(),
    trend: overallScore > 75 ? 'up' : overallScore < 60 ? 'down' : 'stable',
    trendPercentage: Math.floor(Math.random() * 15) + 5
  };
};

// Simulations des extracteurs API (M1)
const getTrafficScore = async (website?: string): Promise<number> => {
  // Integration avec Google Search Console API
  if (!website) return 20;
  return Math.floor(Math.random() * 40) + 60;
};

const getBacklinksScore = async (website?: string): Promise<number> => {
  // Integration avec Ahrefs API
  if (!website) return 15;
  return Math.floor(Math.random() * 50) + 50;
};

const getSpeedScore = async (website?: string): Promise<number> => {
  // Integration avec PageSpeed Insights API
  if (!website) return 30;
  return Math.floor(Math.random() * 30) + 70;
};

const getUXScore = async (website?: string): Promise<number> => {
  // Analyse UX automatisée
  if (!website) return 40;
  return Math.floor(Math.random() * 35) + 65;
};

const getGMBScore = async (gmbUrl?: string): Promise<number> => {
  // Integration avec Google My Business API
  return Math.floor(Math.random() * 25) + 75;
};

const getLocalVisibilityScore = async (address?: string): Promise<number> => {
  // Integration avec SerpAPI pour le ranking local
  return Math.floor(Math.random() * 40) + 60;
};

const getContentQualityScore = async (website?: string): Promise<number> => {
  // Analyse du contenu avec GPT-4
  if (!website) return 45;
  return Math.floor(Math.random() * 30) + 70;
};

const getTechnicalSeoScore = async (website?: string): Promise<number> => {
  // Audit SEO technique automatisé
  if (!website) return 35;
  return Math.floor(Math.random() * 40) + 60;
};

const getSocialSignalsScore = async (businessName?: string): Promise<number> => {
  // Analyse des signaux sociaux
  return Math.floor(Math.random() * 30) + 40;
};

const getCompetitionScore = async (sector?: string, address?: string): Promise<number> => {
  // Analyse de la concurrence locale
  return Math.floor(Math.random() * 20) + 80;
};