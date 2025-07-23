import { ILAMetrics, ILAAnalysis } from '@/types/ila.ts';

export const calculateILAScore = async (metrics: Partial<ILAMetrics>): Promise<ILAAnalysis> => {
  // Algorithme de scoring ILA avancé
  const weights = {
    seoScore: 0.25,
    contentScore: 0.2,
    conversionScore: 0.25,
    engagementScore: 0.15,
    technicalScore: 0.15
  };

  let totalScore = 0;
  let totalWeight = 0;

  Object.entries(metrics).forEach(([key, value]) => {
    if (value !== undefined && key in weights) {
      const weight = weights[key as keyof typeof weights];
      totalScore += value * weight;
      totalWeight += weight;
    }
  });

  const overallScore = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;

  // Génération dynamique des recommandations
  const recommendations: string[] = [];
  if (metrics.seoScore && metrics.seoScore < 80) {
    recommendations.push('Améliorer l\'optimisation SEO technique');
  }
  if (metrics.conversionScore && metrics.conversionScore < 85) {
    recommendations.push('Optimiser les pages de conversion');
  }
  if (metrics.contentScore && metrics.contentScore < 90) {
    recommendations.push('Enrichir la stratégie de contenu');
  }

  return {
    overallScore,
    metrics: {
      seoScore: metrics.seoScore || 0,
      contentScore: metrics.contentScore || 0,
      conversionScore: metrics.conversionScore || 0,
      engagementScore: metrics.engagementScore || 0,
      technicalScore: metrics.technicalScore || 0
    },
    trends: {
      direction: overallScore > 85 ? 'up' : overallScore < 75 ? 'down' : 'stable',
      percentage: Math.round(Math.random() * 20)
    },
    recommendations,
    riskFactors: [],
    opportunities: []
  };
};
