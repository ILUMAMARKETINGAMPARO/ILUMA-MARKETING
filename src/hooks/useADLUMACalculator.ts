import { useState, useCallback } from 'react';

export interface ADLUMAInputs {
  budget: number;
  sector: string;
  location: string;
  targetAudience: string;
  campaignType: string;
  duration: number;
}

export interface ADLUMAResults {
  estimatedImpressions: number;
  estimatedClicks: number;
  estimatedCPM: number;
  estimatedCPC: number;
  estimatedConversions: number;
  roi: number;
  recommendations: string[];
}

export const useADLUMACalculator = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<ADLUMAResults | null>(null);

  const calculateResults = useCallback(async (inputs: ADLUMAInputs): Promise<ADLUMAResults> => {
    setIsCalculating(true);
    
    // Simuler un délai de calcul IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Algorithme de calcul ADLUMA™
    const sectorMultipliers = {
      'restaurant': { cpm: 8, ctr: 2.1, cr: 3.2 },
      'retail': { cpm: 6, ctr: 1.8, cr: 2.8 },
      'services': { cpm: 12, ctr: 2.5, cr: 4.1 },
      'healthcare': { cpm: 15, ctr: 1.9, cr: 5.2 },
      'real-estate': { cpm: 10, ctr: 1.6, cr: 2.1 },
      'other': { cpm: 9, ctr: 2.0, cr: 3.0 }
    };

    const campaignMultipliers = {
      'google-ads': 1.2,
      'facebook-ads': 1.0,
      'instagram-ads': 1.1,
      'tiktok-ads': 0.8,
      'linkedin-ads': 1.5
    };

    const locationMultipliers = {
      'montreal': 1.1,
      'quebec': 0.9,
      'toronto': 1.3,
      'vancouver': 1.2,
      'other': 1.0
    };

    const sector = sectorMultipliers[inputs.sector as keyof typeof sectorMultipliers] || sectorMultipliers.other;
    const campaignMult = campaignMultipliers[inputs.campaignType as keyof typeof campaignMultipliers] || 1.0;
    const locationMult = locationMultipliers[inputs.location as keyof typeof locationMultipliers] || 1.0;

    const estimatedCPM = sector.cpm * campaignMult * locationMult;
    const estimatedImpressions = Math.round((inputs.budget * 1000) / estimatedCPM);
    const estimatedCTR = sector.ctr / 100;
    const estimatedClicks = Math.round(estimatedImpressions * estimatedCTR);
    const estimatedCPC = inputs.budget / estimatedClicks;
    const estimatedCR = sector.cr / 100;
    const estimatedConversions = Math.round(estimatedClicks * estimatedCR);
    const roi = Math.round(((estimatedConversions * 100) - inputs.budget) / inputs.budget * 100);

    const recommendations = [
      `Votre secteur (${inputs.sector}) a un CTR moyen de ${sector.ctr}%`,
      `Nous recommandons un budget journalier de ${Math.round(inputs.budget / inputs.duration)}$`,
      `Votre CPC estimé (${estimatedCPC.toFixed(2)}$) est ${estimatedCPC > 2 ? 'élevé' : 'compétitif'} pour votre marché`,
      roi > 50 ? 'Excellent potentiel de ROI détecté !' : 'Optimisation recommandée pour améliorer le ROI'
    ];

    const calculatedResults = {
      estimatedImpressions,
      estimatedClicks,
      estimatedCPM: Math.round(estimatedCPM * 100) / 100,
      estimatedCPC: Math.round(estimatedCPC * 100) / 100,
      estimatedConversions,
      roi,
      recommendations
    };

    setResults(calculatedResults);
    setIsCalculating(false);
    return calculatedResults;
  }, []);

  return {
    isCalculating,
    results,
    calculateResults,
    setResults
  };
};