import { useState, useCallback, useEffect } from 'react';
import { usePromotionAnalytics } from './usePromotionAnalytics';

interface QuizResults {
  totalScore: number;
  category: 'Starter' | 'Growth' | 'Premium';
  profileType: 'analytical' | 'creative' | 'technical' | 'strategic';
  preferences: {
    budget: number;
    timeline: number;
    priority: string;
  };
  answers: any[];
}

interface ROIData {
  currentRevenue: number;
  targetGrowth: number;
  timeframe: number;
  projectedROI: number;
  investmentRecommendation: number;
  confidence: number;
}

interface FlowState {
  step: number;
  quizResults: QuizResults | null;
  roiData: ROIData | null;
  personalizedOffer: any;
  conversionScore: number;
  isReady: boolean;
}

export const usePromotionFlow = () => {
  const { trackInteraction, getPersonalizedOffer, getEngagementScore } = usePromotionAnalytics();
  
  const [flowState, setFlowState] = useState<FlowState>({
    step: 1,
    quizResults: null,
    roiData: null,
    personalizedOffer: null,
    conversionScore: 0,
    isReady: false
  });

  // Calculer le profil utilisateur basé sur les réponses du quiz
  const calculateUserProfile = useCallback((answers: any[]): QuizResults => {
    let totalScore = 0;
    let analyticalScore = 0;
    let creativeScore = 0;
    let technicalScore = 0;
    let strategicScore = 0;

    answers.forEach((answer, index) => {
      totalScore += answer.value;
      
      // Analyser le type de réponse pour déterminer le profil
      switch (index) {
        case 0: // Secteur d'activité
          if (answer.text.includes('Tech') || answer.text.includes('Innovation')) {
            technicalScore += 25;
          } else if (answer.text.includes('Créatif') || answer.text.includes('Design')) {
            creativeScore += 25;
          } else if (answer.text.includes('Conseil') || answer.text.includes('Finance')) {
            analyticalScore += 25;
          } else {
            strategicScore += 25;
          }
          break;
        case 1: // Objectif principal
          if (answer.text.includes('Analyser') || answer.text.includes('Données')) {
            analyticalScore += 20;
          } else if (answer.text.includes('Créer') || answer.text.includes('Brand')) {
            creativeScore += 20;
          } else if (answer.text.includes('Optimiser') || answer.text.includes('Technique')) {
            technicalScore += 20;
          } else {
            strategicScore += 20;
          }
          break;
        case 2: // Budget
          // Le budget influence la stratégie
          if (answer.value > 30) {
            strategicScore += 15;
          } else if (answer.value > 20) {
            analyticalScore += 15;
          } else {
            creativeScore += 15;
          }
          break;
      }
    });

    // Déterminer le profil dominant
    const profiles = {
      analytical: analyticalScore,
      creative: creativeScore,
      technical: technicalScore,
      strategic: strategicScore
    };

    const profileType = Object.entries(profiles).reduce((a, b) => 
      profiles[a[0] as keyof typeof profiles] > profiles[b[0] as keyof typeof profiles] ? a : b
    )[0] as 'analytical' | 'creative' | 'technical' | 'strategic';

    // Déterminer la catégorie
    let category: 'Starter' | 'Growth' | 'Premium';
    if (totalScore < 40) category = 'Starter';
    else if (totalScore < 80) category = 'Growth';
    else category = 'Premium';

    // Extraire les préférences
    const budgetAnswer = answers[2];
    const preferences = {
      budget: budgetAnswer?.value || 20,
      timeline: 3, // par défaut
      priority: answers[1]?.category || 'growth'
    };

    return {
      totalScore,
      category,
      profileType,
      preferences,
      answers
    };
  }, []);

  // Calculer ROI personnalisé basé sur le quiz
  const calculatePersonalizedROI = useCallback((
    quizResults: QuizResults,
    currentRevenue: number,
    targetGrowth: number,
    timeframe: number
  ): ROIData => {
    let baseROI = (currentRevenue * (targetGrowth / 100)) / (timeframe / 12);
    let confidence = 70; // Base confidence
    let investmentRecommendation = 0;

    // Ajustements basés sur le profil
    switch (quizResults.profileType) {
      case 'analytical':
        baseROI *= 1.3; // Les analytiques obtiennent de meilleurs résultats
        confidence += 15;
        break;
      case 'strategic':
        baseROI *= 1.25;
        confidence += 10;
        break;
      case 'technical':
        baseROI *= 1.2;
        confidence += 12;
        break;
      case 'creative':
        baseROI *= 1.15;
        confidence += 8;
        break;
    }

    // Ajustements basés sur la catégorie
    switch (quizResults.category) {
      case 'Premium':
        baseROI *= 1.4;
        confidence += 15;
        investmentRecommendation = Math.max(5000, currentRevenue * 0.15);
        break;
      case 'Growth':
        baseROI *= 1.2;
        confidence += 10;
        investmentRecommendation = Math.max(2500, currentRevenue * 0.10);
        break;
      case 'Starter':
        baseROI *= 1.1;
        confidence += 5;
        investmentRecommendation = Math.max(1000, currentRevenue * 0.05);
        break;
    }

    // Ajustement temporel
    if (timeframe < 6) {
      baseROI *= 0.8; // Moins de temps = moins de ROI
      confidence -= 10;
    } else if (timeframe > 12) {
      baseROI *= 1.2; // Plus de temps = plus de ROI
      confidence += 10;
    }

    return {
      currentRevenue,
      targetGrowth,
      timeframe,
      projectedROI: Math.round(baseROI),
      investmentRecommendation: Math.round(investmentRecommendation),
      confidence: Math.min(confidence, 95)
    };
  }, []);

  // Gérer la completion du quiz
  const handleQuizComplete = useCallback(async (results: any) => {
    const quizResults = calculateUserProfile(results.answers);
    
    setFlowState(prev => ({
      ...prev,
      step: 2,
      quizResults,
      conversionScore: prev.conversionScore + 25
    }));

    await trackInteraction('quiz_completed', 'promotion_quiz', {
      results: quizResults,
      totalScore: quizResults.totalScore,
      category: quizResults.category,
      profileType: quizResults.profileType
    });
  }, [calculateUserProfile, trackInteraction]);

  // Gérer la completion du ROI
  const handleROIComplete = useCallback(async (roiInput: any) => {
    if (!flowState.quizResults) return;

    const roiData = calculatePersonalizedROI(
      flowState.quizResults,
      roiInput.currentRevenue,
      roiInput.targetGrowth,
      roiInput.timeframe
    );

    const personalizedOffer = getPersonalizedOffer();
    const engagementScore = getEngagementScore();

    // Ajuster l'offre basée sur le ROI calculé
    const enhancedOffer = {
      ...personalizedOffer,
      roi: roiData,
      customMessage: generateCustomMessage(flowState.quizResults, roiData),
      urgencyLevel: roiData.confidence > 85 ? 'high' : personalizedOffer.urgencyLevel,
      discount: Math.min(personalizedOffer.discount + Math.floor(roiData.confidence / 10), 50)
    };

    setFlowState(prev => ({
      ...prev,
      step: 3,
      roiData,
      personalizedOffer: enhancedOffer,
      conversionScore: prev.conversionScore + 35,
      isReady: true
    }));

    await trackInteraction('roi_calculated', 'roi_calculator', {
      roiData,
      personalizedOffer: enhancedOffer,
      conversionScore: flowState.conversionScore + 35
    });
  }, [flowState.quizResults, calculatePersonalizedROI, getPersonalizedOffer, getEngagementScore, trackInteraction]);

  // Générer un message personnalisé
  const generateCustomMessage = useCallback((
    quizResults: QuizResults,
    roiData: ROIData
  ): string => {
    const messages = {
      analytical: [
        `Selon nos analyses, votre profil ${quizResults.category} peut générer jusqu'à ${roiData.projectedROI.toLocaleString()}€ de ROI.`,
        `Les données montrent une probabilité de réussite de ${roiData.confidence}% pour votre profil analytique.`
      ],
      creative: [
        `Votre créativité mérite les meilleurs outils ! Transformez vos idées en ${roiData.projectedROI.toLocaleString()}€ de résultats.`,
        `Votre vision créative peut générer un ROI exceptionnel de ${roiData.projectedROI.toLocaleString()}€.`
      ],
      technical: [
        `Optimisez vos performances : notre solution technique peut vous rapporter ${roiData.projectedROI.toLocaleString()}€.`,
        `Votre expertise technique mérite un ROI à la hauteur : ${roiData.projectedROI.toLocaleString()}€ projetés.`
      ],
      strategic: [
        `Stratégiquement, c'est le moment parfait : ${roiData.projectedROI.toLocaleString()}€ de ROI vous attendent.`,
        `Votre vision stratégique peut transformer ${roiData.investmentRecommendation.toLocaleString()}€ en ${roiData.projectedROI.toLocaleString()}€.`
      ]
    };

    const profileMessages = messages[quizResults.profileType];
    return profileMessages[Math.floor(Math.random() * profileMessages.length)];
  }, []);

  // Avancer à l'étape suivante
  const nextStep = useCallback(() => {
    setFlowState(prev => ({
      ...prev,
      step: Math.min(prev.step + 1, 3)
    }));
  }, []);

  // Revenir à l'étape précédente
  const prevStep = useCallback(() => {
    setFlowState(prev => ({
      ...prev,
      step: Math.max(prev.step - 1, 1)
    }));
  }, []);

  // Réinitialiser le flow
  const resetFlow = useCallback(() => {
    setFlowState({
      step: 1,
      quizResults: null,
      roiData: null,
      personalizedOffer: null,
      conversionScore: 0,
      isReady: false
    });
  }, []);

  return {
    flowState,
    handleQuizComplete,
    handleROIComplete,
    nextStep,
    prevStep,
    resetFlow,
    calculatePersonalizedROI
  };
};