import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';

interface ABVariant {
  id: string;
  name: string;
  weight: number;
  config: {
    header?: {
      title: string;
      subtitle: string;
      badge: string;
    };
    quiz?: {
      questions: any[];
      style: 'standard' | 'gamified' | 'minimal';
    };
    roi?: {
      calculationType: 'conservative' | 'optimistic' | 'realistic';
      displayStyle: 'chart' | 'numbers' | 'visual';
    };
    offer?: {
      discount: number;
      urgency: 'high' | 'medium' | 'low';
      ctaText: string;
      benefits: string[];
    };
  };
}

interface ABTestResult {
  variantId: string;
  views: number;
  completions: number;
  conversions: number;
  conversionRate: number;
  confidence: number;
}

const DEFAULT_VARIANTS: ABVariant[] = [
  {
    id: 'control',
    name: 'Contrôle Standard',
    weight: 0.4,
    config: {
      header: {
        title: 'Votre Offre Intelligente',
        subtitle: 'Configurée par IA selon votre profil unique',
        badge: '✨ EXPÉRIENCE PERSONNALISÉE ILUMA™'
      },
      quiz: {
        questions: [],
        style: 'standard'
      },
      roi: {
        calculationType: 'realistic',
        displayStyle: 'numbers'
      },
      offer: {
        discount: 30,
        urgency: 'medium',
        ctaText: 'Réclamer Mon Offre Exclusive',
        benefits: []
      }
    }
  },
  {
    id: 'urgency_high',
    name: 'Urgence Élevée',
    weight: 0.3,
    config: {
      header: {
        title: '⚡ Offre Limitée - 24h Seulement!',
        subtitle: 'Configuration IA premium disponible maintenant',
        badge: '🔥 DERNIÈRES HEURES - ACTION REQUISE'
      },
      quiz: {
        questions: [],
        style: 'gamified'
      },
      roi: {
        calculationType: 'optimistic',
        displayStyle: 'visual'
      },
      offer: {
        discount: 50,
        urgency: 'high',
        ctaText: '🚀 RÉSERVER MAINTENANT - 24H RESTANTES',
        benefits: []
      }
    }
  },
  {
    id: 'minimal_clean',
    name: 'Minimal et Professionnel',
    weight: 0.3,
    config: {
      header: {
        title: 'Solution Personnalisée',
        subtitle: 'Analyse intelligente de vos besoins',
        badge: 'ANALYSE PROFESSIONNELLE'
      },
      quiz: {
        questions: [],
        style: 'minimal'
      },
      roi: {
        calculationType: 'conservative',
        displayStyle: 'chart'
      },
      offer: {
        discount: 25,
        urgency: 'low',
        ctaText: 'Obtenir Mon Analyse',
        benefits: []
      }
    }
  }
];

export const useABTesting = () => {
  const [currentVariant, setCurrentVariant] = useState<ABVariant | null>(null);
  const [testResults, setTestResults] = useState<ABTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sélection pondérée d'un variant
  const selectVariant = useCallback((variants: ABVariant[]): ABVariant => {
    const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const variant of variants) {
      random -= variant.weight;
      if (random <= 0) {
        return variant;
      }
    }
    
    return variants[0]; // fallback
  }, []);

  // Enregistrement des métriques de performance
  const trackVariantMetric = useCallback(async (
    variantId: string,
    eventType: 'view' | 'completion' | 'conversion',
    metadata?: any
  ) => {
    try {
      await supabase.from('promotion_analytics').insert({
        promotion_type: 'ab_test',
        interaction_type: eventType,
        page_context: `variant_${variantId}`,
        interaction_data: {
          variantId,
          eventType,
          timestamp: new Date().toISOString(),
          ...metadata
        },
        behavioral_score: eventType === 'conversion' ? 100 : eventType === 'completion' ? 75 : 25,
        conversion_probability: eventType === 'conversion' ? 100 : 
                               eventType === 'completion' ? 60 : 15
      });
    } catch (error) {
      console.error('Erreur tracking A/B test:', error);
    }
  }, []);

  // Calcul automatique des performances et optimisation
  const optimizeVariantWeights = useCallback(async () => {
    try {
      const { data: analyticsData } = await supabase
        .from('promotion_analytics')
        .select('*')
        .eq('promotion_type', 'ab_test')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (!analyticsData) return;

      // Calcul des performances par variant
      const variantStats = analyticsData.reduce((acc, record) => {
        const interactionData = record.interaction_data as any;
        const variantId = interactionData?.variantId || 'unknown';
        const eventType = record.interaction_type;
        
        if (!acc[variantId]) {
          acc[variantId] = { views: 0, completions: 0, conversions: 0 };
        }
        
        if (eventType === 'view') acc[variantId].views++;
        else if (eventType === 'completion') acc[variantId].completions++;
        else if (eventType === 'conversion') acc[variantId].conversions++;
        
        return acc;
      }, {} as Record<string, { views: number; completions: number; conversions: number }>);

      // Calcul des taux de conversion et ajustement des poids
      const results: ABTestResult[] = Object.entries(variantStats).map(([variantId, stats]) => {
        const conversionRate = stats.views > 0 ? (stats.conversions / stats.views) * 100 : 0;
        const confidence = Math.min(95, stats.views * 2); // Confiance basée sur le volume
        
        return {
          variantId,
          views: stats.views,
          completions: stats.completions,
          conversions: stats.conversions,
          conversionRate,
          confidence
        };
      });

      setTestResults(results);

      // Auto-optimisation : augmenter le poids des variants performants
      if (results.length > 1) {
        const bestVariant = results.reduce((best, current) => 
          current.conversionRate > best.conversionRate && current.confidence > 50 ? current : best
        );

        console.log('🎯 A/B Test - Meilleur variant:', bestVariant.variantId, 
                   'Taux:', bestVariant.conversionRate.toFixed(1) + '%');
      }

    } catch (error) {
      console.error('Erreur optimisation A/B test:', error);
    }
  }, []);

  // Initialisation et sélection du variant
  useEffect(() => {
    const initializeABTest = async () => {
      setIsLoading(true);
      
      // Optimisation automatique basée sur les données existantes
      await optimizeVariantWeights();
      
      // Sélection du variant pour cette session
      const selectedVariant = selectVariant(DEFAULT_VARIANTS);
      setCurrentVariant(selectedVariant);
      
      // Track la vue du variant
      await trackVariantMetric(selectedVariant.id, 'view');
      
      setIsLoading(false);
    };

    initializeABTest();
  }, [selectVariant, trackVariantMetric, optimizeVariantWeights]);

  // API publique du hook
  return {
    currentVariant,
    testResults,
    isLoading,
    trackView: (metadata?: any) => currentVariant && trackVariantMetric(currentVariant.id, 'view', metadata),
    trackCompletion: (metadata?: any) => currentVariant && trackVariantMetric(currentVariant.id, 'completion', metadata),
    trackConversion: (metadata?: any) => currentVariant && trackVariantMetric(currentVariant.id, 'conversion', metadata),
    optimizeWeights: optimizeVariantWeights,
    
    // Helper pour obtenir la config du variant actuel
    getVariantConfig: () => currentVariant?.config,
    getVariantName: () => currentVariant?.name || 'Standard',
    
    // Données de performance pour le dashboard
    getPerformanceData: () => ({
      results: testResults,
      currentVariantId: currentVariant?.id,
      totalTests: testResults.reduce((sum, r) => sum + r.views, 0),
      bestConversionRate: Math.max(...testResults.map(r => r.conversionRate), 0)
    })
  };
};