import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';

interface BehavioralData {
  engagementScore: number;
  preferences: string[];
  actionHistory: string[];
  patterns: string[];
  churnRisk: number;
  conversionProbability: number;
  nextBestActions: string[];
}

interface PredictiveInsight {
  title: string;
  description: string;
  confidence: number;
  impact: 'Faible' | 'Moyen' | 'Élevé' | 'Très Élevé';
  category: 'engagement' | 'conversion' | 'retention' | 'growth';
  actionRequired: boolean;
}

interface LiloAdvancedState {
  behavioralData: BehavioralData | null;
  predictiveInsights: PredictiveInsight[];
  isAnalyzing: boolean;
  emotion: string;
  adaptivePersonality: string;
  currentExpertise: string;
  learningScore: number;
}

export const useLiloAdvanced = (userId: string = 'demo-user', context: any = {}) => {
  const [state, setState] = useState<LiloAdvancedState>({
    behavioralData: null,
    predictiveInsights: [],
    isAnalyzing: false,
    emotion: 'curious',
    adaptivePersonality: 'helpful',
    currentExpertise: 'general',
    learningScore: 0
  });

  // Analyse comportementale en temps réel
  const analyzeBehavior = useCallback(async (interactionData: any) => {
    setState(prev => ({ ...prev, isAnalyzing: true }));

    try {
      // Calculer le score d'engagement
      const engagementFactors = {
        sessionDuration: interactionData.sessionDuration || 0,
        interactionFrequency: interactionData.interactionCount || 0,
        pageDepth: interactionData.pageDepth || 1,
        emotionalState: getEmotionalValue(interactionData.emotion),
        goalAlignment: interactionData.goalAlignment || 0
      };

      const engagementScore = Math.min(
        (engagementFactors.sessionDuration * 0.2 +
         engagementFactors.interactionFrequency * 0.3 +
         engagementFactors.pageDepth * 0.2 +
         engagementFactors.emotionalState * 0.2 +
         engagementFactors.goalAlignment * 0.1) * 20,
        100
      );

      // Prédire le risque de churn
      const churnRisk = Math.max(0, 100 - engagementScore - (interactionData.recentActivity?.length || 0) * 5);

      // Probabilité de conversion
      const conversionProbability = Math.min(
        engagementScore * 0.8 + (interactionData.pageDepth || 1) * 10,
        95
      );

      // Générer les actions recommandées
      const nextBestActions = generateNextBestActions(engagementScore, churnRisk, conversionProbability);

      const behavioralData: BehavioralData = {
        engagementScore: Math.round(engagementScore),
        preferences: extractPreferences(interactionData),
        actionHistory: interactionData.actionHistory || [],
        patterns: detectPatterns(interactionData),
        churnRisk: Math.round(churnRisk),
        conversionProbability: Math.round(conversionProbability),
        nextBestActions
      };

      // Générer des insights prédictifs
      const predictiveInsights = await generatePredictiveInsights(behavioralData, context);

      // Adapter la personnalité de LILO
      const adaptivePersonality = adaptPersonality(behavioralData, context);
      const emotion = adaptEmotion(behavioralData);
      const currentExpertise = selectExpertise(context, behavioralData);

      setState(prev => ({
        ...prev,
        behavioralData,
        predictiveInsights,
        emotion,
        adaptivePersonality,
        currentExpertise,
        learningScore: Math.min(prev.learningScore + 1, 100),
        isAnalyzing: false
      }));

      // Enregistrer l'analyse pour l'apprentissage futur
      await saveBehavioralAnalysis(userId, behavioralData, predictiveInsights);

    } catch (error) {
      console.error('Error analyzing behavior:', error);
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }
  }, [userId, context]);

  // Apprentissage adaptatif basé sur les interactions
  const learnFromInteraction = useCallback(async (interaction: any) => {
    try {
      const { data } = await supabase
        .from('lilo_interactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (data) {
        const learningPatterns = extractLearningPatterns(data);
        setState(prev => ({
          ...prev,
          learningScore: Math.min(prev.learningScore + learningPatterns.improvement, 100)
        }));
      }
    } catch (error) {
      console.error('Error in adaptive learning:', error);
    }
  }, [userId]);

  // Génération d'insights prédictifs avancés
  const generatePredictiveInsights = async (
    behavioralData: BehavioralData, 
    context: any
  ): Promise<PredictiveInsight[]> => {
    const insights: PredictiveInsight[] = [];

    // Insight sur l'engagement
    if (behavioralData.engagementScore < 40) {
      insights.push({
        title: '⚠️ Risque de Désengagement Détecté',
        description: `Score d'engagement faible (${behavioralData.engagementScore}%). Actions immédiates recommandées.`,
        confidence: 85,
        impact: 'Élevé',
        category: 'engagement',
        actionRequired: true
      });
    }

    // Insight sur la conversion
    if (behavioralData.conversionProbability > 70) {
      insights.push({
        title: '🎯 Moment Optimal pour Conversion',
        description: `Probabilité de conversion élevée (${behavioralData.conversionProbability}%). Proposez une action commerciale.`,
        confidence: 92,
        impact: 'Très Élevé',
        category: 'conversion',
        actionRequired: true
      });
    }

    // Insight sectoriel
    if (context.industryContext && behavioralData.engagementScore > 60) {
      insights.push({
        title: '🏢 Opportunité Sectorielle Identifiée',
        description: `Intérêt élevé pour ${context.industryContext}. Recommandations spécialisées disponibles.`,
        confidence: 78,
        impact: 'Moyen',
        category: 'growth',
        actionRequired: false
      });
    }

    // Insight de rétention
    if (behavioralData.churnRisk > 60) {
      insights.push({
        title: '🔄 Action de Rétention Requise',
        description: `Risque de churn élevé (${behavioralData.churnRisk}%). Programme de fidélisation recommandé.`,
        confidence: 88,
        impact: 'Élevé',
        category: 'retention',
        actionRequired: true
      });
    }

    return insights;
  };

  // Fonctions utilitaires
  const getEmotionalValue = (emotion: string): number => {
    const emotionValues = {
      'excited': 10,
      'happy': 8,
      'curious': 6,
      'neutral': 4,
      'confused': 2,
      'frustrated': 0
    };
    return emotionValues[emotion as keyof typeof emotionValues] || 4;
  };

  const extractPreferences = (interactionData: any): string[] => {
    const preferences = [];
    if (interactionData.pageDepth > 3) preferences.push('detailed-analysis');
    if (interactionData.emotion === 'excited') preferences.push('innovation');
    if (interactionData.interactionCount > 5) preferences.push('interactive');
    return preferences;
  };

  const detectPatterns = (interactionData: any): string[] => {
    const patterns = [];
    if (interactionData.pageContext?.includes('crm')) patterns.push('lead-management');
    if (interactionData.pageContext?.includes('adluma')) patterns.push('marketing-focus');
    if (interactionData.sessionDuration > 300) patterns.push('deep-engagement');
    return patterns;
  };

  const generateNextBestActions = (
    engagementScore: number,
    churnRisk: number,
    conversionProbability: number
  ): string[] => {
    const actions = [];

    if (conversionProbability > 70) {
      actions.push('Proposer une démo personnalisée');
      actions.push('Offrir un audit gratuit');
    }

    if (engagementScore < 40) {
      actions.push('Envoyer contenu éducatif');
      actions.push('Programmer un rappel personnalisé');
    }

    if (churnRisk > 60) {
      actions.push('Activer programme de fidélisation');
      actions.push('Offrir support prioritaire');
    }

    actions.push('Analyser la concurrence');
    actions.push('Optimiser le parcours utilisateur');

    return actions.slice(0, 4);
  };

  const adaptPersonality = (behavioralData: BehavioralData, context: any): string => {
    if (behavioralData.engagementScore < 30) return 'encouraging';
    if (behavioralData.conversionProbability > 80) return 'decisive';
    if (context.industryContext === 'technology') return 'technical';
    return 'helpful';
  };

  const adaptEmotion = (behavioralData: BehavioralData): string => {
    if (behavioralData.conversionProbability > 80) return 'excited';
    if (behavioralData.churnRisk > 70) return 'concerned';
    if (behavioralData.engagementScore > 70) return 'happy';
    return 'curious';
  };

  const selectExpertise = (context: any, behavioralData: BehavioralData): string => {
    if (context.pageContext?.includes('crm')) return 'lead-management';
    if (context.pageContext?.includes('adluma')) return 'marketing';
    if (behavioralData.patterns.includes('lead-management')) return 'sales';
    return 'general';
  };

  const extractLearningPatterns = (interactions: any[]): { improvement: number } => {
    const recentSatisfaction = interactions
      .filter(i => i.satisfaction_score)
      .map(i => i.satisfaction_score)
      .slice(0, 5);
    
    const avgSatisfaction = recentSatisfaction.length > 0
      ? recentSatisfaction.reduce((a, b) => a + b, 0) / recentSatisfaction.length
      : 0;
    
    return { improvement: Math.max(0, avgSatisfaction - 3) };
  };

  const saveBehavioralAnalysis = async (
    userId: string,
    behavioralData: BehavioralData,
    insights: PredictiveInsight[]
  ) => {
    try {
      await supabase.from('lilo_interactions').insert({
        user_id: userId,
        page_context: context.page || 'unknown',
        user_message: 'behavioral_analysis',
        lilo_response: JSON.stringify({
          behavioralData,
          insights,
          timestamp: new Date().toISOString()
        }),
        emotion_detected: behavioralData ? 'analytical' : 'neutral'
      });
    } catch (error) {
      console.error('Error saving behavioral analysis:', error);
    }
  };

  // Initialisation
  useEffect(() => {
    if (userId) {
      analyzeBehavior({
        sessionDuration: 120,
        interactionCount: 1,
        pageDepth: 1,
        emotion: 'curious',
        goalAlignment: 0.5,
        pageContext: context.page
      });
    }
  }, [userId, analyzeBehavior, context.page]);

  return {
    ...state,
    analyzeBehavior,
    learnFromInteraction,
    generatePredictiveInsights: () => generatePredictiveInsights(state.behavioralData!, context)
  };
};

export default useLiloAdvanced;