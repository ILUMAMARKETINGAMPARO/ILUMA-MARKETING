import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';

interface QuantumOffer {
  id: string;
  price: number;
  originalPrice: number;
  discount: number;
  benefits: string[];
  urgency: {
    level: 'low' | 'medium' | 'high' | 'critical';
    timeRemaining: number;
    reason: string;
  };
  personalization: {
    profileMatch: number;
    customMessage: string;
    adaptedFeatures: string[];
  };
  probability: {
    conversion: number;
    engagement: number;
    satisfaction: number;
  };
}

interface UserProfile {
  demographic: {
    businessSize: 'startup' | 'small' | 'medium' | 'enterprise';
    industry: string;
    experience: 'beginner' | 'intermediate' | 'expert';
    budget: 'low' | 'medium' | 'high' | 'premium';
  };
  behavioral: {
    decisionStyle: 'analytical' | 'intuitive' | 'collaborative' | 'directive';
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    communicationPreference: 'data-driven' | 'story-driven' | 'visual';
    urgencyLevel: 'relaxed' | 'standard' | 'urgent';
  };
  psychographic: {
    values: string[];
    motivations: string[];
    painPoints: string[];
    goals: string[];
  };
  contextual: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    device: 'mobile' | 'tablet' | 'desktop';
    source: 'organic' | 'paid' | 'social' | 'direct' | 'referral';
    previousVisits: number;
  };
}

interface QuantumState {
  currentOffer: QuantumOffer | null;
  alternativeOffers: QuantumOffer[];
  optimizationHistory: Array<{
    timestamp: Date;
    change: string;
    reason: string;
    impact: number;
  }>;
  confidenceLevel: number;
  adaptationCount: number;
}

export const useQuantumPersonalization = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [quantumState, setQuantumState] = useState<QuantumState>({
    currentOffer: null,
    alternativeOffers: [],
    optimizationHistory: [],
    confidenceLevel: 0,
    adaptationCount: 0
  });
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Analyse en temps réel du profil utilisateur
  const analyzeUserProfile = useCallback(async (behaviorData: any): Promise<UserProfile> => {
    const contextual = {
      timeOfDay: getTimeOfDay(),
      device: getDeviceType(),
      source: getTrafficSource(),
      previousVisits: behaviorData.previousVisits || 0
    };

    // IA prédictive pour détecter les caractéristiques de l'utilisateur
    const demographic = await predictDemographics(behaviorData, contextual);
    const behavioral = await predictBehavioralTraits(behaviorData);
    const psychographic = await inferPsychographics(behavioral, demographic);

    return {
      demographic,
      behavioral,
      psychographic,
      contextual
    };
  }, []);

  // Prédiction des caractéristiques démographiques
  const predictDemographics = async (behaviorData: any, contextual: any) => {
    // Algorithme ML simplifié basé sur les patterns comportementaux
    let businessSize: 'startup' | 'small' | 'medium' | 'enterprise' = 'small';
    let industry = 'service';
    let experience: 'beginner' | 'intermediate' | 'expert' = 'intermediate';
    let budget: 'low' | 'medium' | 'high' | 'premium' = 'medium';

    // Analyse du temps passé et de la profondeur d'engagement
    if (behaviorData.timeOnSite > 300) { // Plus de 5 minutes
      experience = 'expert';
      businessSize = 'medium';
    } else if (behaviorData.timeOnSite > 120) {
      experience = 'intermediate';
    } else {
      experience = 'beginner';
      budget = 'low';
    }

    // Analyse du device pour inférer le contexte professionnel
    if (contextual.device === 'desktop' && contextual.timeOfDay === 'morning') {
      businessSize = businessSize === 'small' ? 'medium' : businessSize;
      budget = budget === 'low' ? 'medium' : budget;
    }

    // Analyse de la source de trafic
    if (contextual.source === 'organic') {
      experience = 'intermediate';
    } else if (contextual.source === 'direct') {
      experience = 'expert';
      budget = budget === 'low' ? 'medium' : 'high';
    }

    return { businessSize, industry, experience, budget };
  };

  // Prédiction des traits comportementaux
  const predictBehavioralTraits = async (behaviorData: any) => {
    let decisionStyle: 'analytical' | 'intuitive' | 'collaborative' | 'directive' = 'analytical';
    let riskTolerance: 'conservative' | 'moderate' | 'aggressive' = 'moderate';
    let communicationPreference: 'data-driven' | 'story-driven' | 'visual' = 'data-driven';
    let urgencyLevel: 'relaxed' | 'standard' | 'urgent' = 'standard';

    // Analyse des patterns de clic et de navigation
    if (behaviorData.clickHesitation > 2000) {
      decisionStyle = 'analytical';
      riskTolerance = 'conservative';
      urgencyLevel = 'relaxed';
    } else if (behaviorData.clickHesitation < 500) {
      decisionStyle = 'directive';
      riskTolerance = 'aggressive';
      urgencyLevel = 'urgent';
    }

    // Analyse du scroll et de l'engagement
    if (behaviorData.scrollDepth > 80) {
      communicationPreference = 'story-driven';
      if (behaviorData.timeOnSite > 180) {
        decisionStyle = 'collaborative';
      }
    } else if (behaviorData.scrollDepth < 30) {
      communicationPreference = 'visual';
      urgencyLevel = 'urgent';
    }

    return { decisionStyle, riskTolerance, communicationPreference, urgencyLevel };
  };

  // Inférence des aspects psychographiques
  const inferPsychographics = async (behavioral: any, demographic: any) => {
    const values: string[] = [];
    const motivations: string[] = [];
    const painPoints: string[] = [];
    const goals: string[] = [];

    // Mappage basé sur le profil comportemental et démographique
    if (behavioral.decisionStyle === 'analytical') {
      values.push('Précision', 'Fiabilité', 'Transparence');
      motivations.push('Optimisation', 'Contrôle', 'Mesure');
      painPoints.push('Manque de données', 'Incertitude');
      goals.push('Efficacité maximale', 'ROI mesurable');
    }

    if (behavioral.riskTolerance === 'conservative') {
      values.push('Sécurité', 'Stabilité');
      painPoints.push('Peur de l\'échec', 'Complexité');
      goals.push('Croissance stable', 'Réduction des risques');
    }

    if (demographic.businessSize === 'startup') {
      motivations.push('Innovation', 'Croissance rapide');
      painPoints.push('Budget limité', 'Manque de temps');
      goals.push('Scaling', 'Différenciation');
    }

    return { values, motivations, painPoints, goals };
  };

  // Génération d'offres quantiques personnalisées
  const generateQuantumOffer = useCallback((profile: UserProfile): QuantumOffer => {
    const basePrice = 2500;
    let finalPrice = basePrice;
    let discount = 0;
    const benefits: string[] = [];
    const adaptedFeatures: string[] = [];

    // Adaptation du prix selon le profil
    switch (profile.demographic.businessSize) {
      case 'startup':
        finalPrice = basePrice * 0.6;
        discount = 40;
        benefits.push('Tarif startup spécial', 'Support prioritaire pendant 6 mois');
        break;
      case 'small':
        finalPrice = basePrice * 0.8;
        discount = 20;
        benefits.push('Support dédié', 'Formation incluse');
        break;
      case 'medium':
        finalPrice = basePrice;
        discount = 0;
        benefits.push('Implementation complète', 'Support premium');
        break;
      case 'enterprise':
        finalPrice = basePrice * 1.5;
        discount = 0;
        benefits.push('Solution enterprise', 'Support 24/7', 'Dedicated account manager');
        break;
    }

    // Adaptation des fonctionnalités selon le style de décision
    switch (profile.behavioral.decisionStyle) {
      case 'analytical':
        adaptedFeatures.push('Dashboard analytics avancé', 'Rapports détaillés', 'A/B testing');
        benefits.push('Données en temps réel', 'ROI tracking automatique');
        break;
      case 'intuitive':
        adaptedFeatures.push('Interface simplifiée', 'Recommendations automatiques');
        benefits.push('Configuration en 1 clic', 'IA intuitive');
        break;
      case 'collaborative':
        adaptedFeatures.push('Multi-users', 'Partage d\'équipe', 'Commentaires');
        benefits.push('Collaboration d\'équipe', 'Workflows partagés');
        break;
      case 'directive':
        adaptedFeatures.push('Contrôles avancés', 'Automation custom');
        benefits.push('Contrôle total', 'Customisation poussée');
        break;
    }

    // Calcul de l'urgence selon le profil
    let urgencyLevel: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    let timeRemaining = 24 * 60; // 24 heures par défaut
    let urgencyReason = 'Offre limitée dans le temps';

    if (profile.behavioral.urgencyLevel === 'urgent') {
      urgencyLevel = 'high';
      timeRemaining = 2 * 60; // 2 heures
      urgencyReason = 'Action immédiate requise pour ce tarif';
    } else if (profile.contextual.timeOfDay === 'evening') {
      urgencyLevel = 'high';
      timeRemaining = 12 * 60; // 12 heures
      urgencyReason = 'Offre spéciale nocturne';
    }

    // Calcul des probabilités de conversion
    let conversionProbability = 0.25; // Base 25%
    if (profile.behavioral.riskTolerance === 'aggressive') conversionProbability += 0.2;
    if (profile.demographic.budget === 'high' || profile.demographic.budget === 'premium') conversionProbability += 0.15;
    if (profile.contextual.previousVisits > 0) conversionProbability += 0.1;
    if (profile.behavioral.urgencyLevel === 'urgent') conversionProbability += 0.1;

    // Message personnalisé
    const customMessage = generatePersonalizedMessage(profile, finalPrice, adaptedFeatures);

    return {
      id: `quantum_${Date.now()}`,
      price: finalPrice,
      originalPrice: basePrice,
      discount,
      benefits,
      urgency: {
        level: urgencyLevel,
        timeRemaining,
        reason: urgencyReason
      },
      personalization: {
        profileMatch: Math.round(conversionProbability * 100),
        customMessage,
        adaptedFeatures
      },
      probability: {
        conversion: Math.round(conversionProbability * 100),
        engagement: Math.min(95, Math.round(conversionProbability * 120)),
        satisfaction: Math.min(98, Math.round(conversionProbability * 130))
      }
    };
  }, []);

  // Génération de message personnalisé
  const generatePersonalizedMessage = (profile: UserProfile, price: number, features: string[]) => {
    const businessSizeMessages = {
      startup: `Parfait pour les startups ambitieuses comme vous ! Pour seulement ${price.toLocaleString()}€, transformez votre vision en croissance mesurable.`,
      small: `Idéal pour faire passer votre entreprise au niveau supérieur. Investissement de ${price.toLocaleString()}€ pour des résultats professionnels.`,
      medium: `Solution adaptée aux entreprises en croissance comme la vôtre. ${price.toLocaleString()}€ pour une transformation complète.`,
      enterprise: `Solution enterprise premium : ${price.toLocaleString()}€ pour une performance à la hauteur de vos ambitions.`
    };

    const decisionStyleAddons = {
      analytical: ' Données complètes et ROI mesurable garantis.',
      intuitive: ' Interface intuitive, résultats immédiats.',
      collaborative: ' Parfait pour votre équipe, collaboration optimisée.',
      directive: ' Contrôle total, customisation sans limites.'
    };

    let message = businessSizeMessages[profile.demographic.businessSize];
    message += decisionStyleAddons[profile.behavioral.decisionStyle];

    if (features.length > 0) {
      message += ` Inclus : ${features.slice(0, 2).join(', ')}.`;
    }

    return message;
  };

  // Optimisation continue en temps réel
  const optimizeOfferInRealTime = useCallback(async (interactionData: any) => {
    if (!quantumState.currentOffer || !userProfile) return;

    setIsOptimizing(true);

    try {
      // Analyse de l'engagement actuel
      const engagementScore = calculateEngagementScore(interactionData);
      
      // Si l'engagement est faible, adapter l'offre
      if (engagementScore < 40 && quantumState.adaptationCount < 3) {
        const optimizedOffer = await adaptOfferBasedOnEngagement(
          quantumState.currentOffer,
          userProfile,
          interactionData
        );

        setQuantumState(prev => ({
          ...prev,
          currentOffer: optimizedOffer,
          adaptationCount: prev.adaptationCount + 1,
          optimizationHistory: [
            ...prev.optimizationHistory,
            {
              timestamp: new Date(),
              change: 'Prix et urgence adaptés',
              reason: `Engagement faible (${engagementScore}%)`,
              impact: 15
            }
          ],
          confidenceLevel: Math.min(95, prev.confidenceLevel + 10)
        }));

        // Sauvegarder l'optimisation
        await supabase.from('predictive_insights').insert({
          insight_type: 'quantum_optimization',
        insight_data: JSON.parse(JSON.stringify({
          originalOffer: quantumState.currentOffer,
          optimizedOffer,
          engagementScore,
          adaptationCount: quantumState.adaptationCount + 1
        })),
          confidence_score: Math.round(engagementScore)
        });
      }
    } catch (error) {
      console.error('Erreur optimisation quantique:', error);
    } finally {
      setIsOptimizing(false);
    }
  }, [quantumState, userProfile]);

  // Calcul du score d'engagement
  const calculateEngagementScore = (interactionData: any): number => {
    let score = 50; // Base

    if (interactionData.timeOnPage > 60) score += 15;
    if (interactionData.scrollDepth > 50) score += 10;
    if (interactionData.elementsClicked > 2) score += 15;
    if (interactionData.hoverTime > 5000) score += 10;

    return Math.min(100, score);
  };

  // Adaptation de l'offre basée sur l'engagement
  const adaptOfferBasedOnEngagement = async (
    currentOffer: QuantumOffer,
    profile: UserProfile,
    interactionData: any
  ): Promise<QuantumOffer> => {
    const newOffer = { ...currentOffer };

    // Si l'utilisateur hésite, augmenter l'urgence et le discount
    if (interactionData.hesitationTime > 3000) {
      newOffer.discount = Math.min(newOffer.discount + 10, 50);
      newOffer.price = newOffer.originalPrice * (1 - newOffer.discount / 100);
      newOffer.urgency.level = 'high';
      newOffer.urgency.timeRemaining = Math.min(newOffer.urgency.timeRemaining, 60);
      newOffer.urgency.reason = 'Offre flash - Dernière chance !';
    }

    // Si peu d'engagement, simplifier l'offre
    if (interactionData.scrollDepth < 30) {
      newOffer.benefits = newOffer.benefits.slice(0, 3); // Réduire à 3 bénéfices
      newOffer.personalization.customMessage = `🎯 Simple et efficace : ${newOffer.price.toLocaleString()}€ pour transformer votre business.`;
    }

    // Adapter selon le device
    if (profile.contextual.device === 'mobile') {
      newOffer.personalization.customMessage = newOffer.personalization.customMessage
        .replace(/\. /g, '.\n')
        .substring(0, 120) + '...';
    }

    newOffer.id = `optimized_${Date.now()}`;
    return newOffer;
  };

  // Helpers pour l'analyse contextuelle
  const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
    const hour = new Date().getHours();
    if (hour < 6) return 'night';
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    if (hour < 22) return 'evening';
    return 'night';
  };

  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const getTrafficSource = (): 'organic' | 'paid' | 'social' | 'direct' | 'referral' => {
    const referrer = document.referrer;
    if (!referrer) return 'direct';
    if (referrer.includes('google') || referrer.includes('bing')) return 'organic';
    if (referrer.includes('facebook') || referrer.includes('twitter') || referrer.includes('linkedin')) return 'social';
    if (referrer.includes('ads') || referrer.includes('campaign')) return 'paid';
    return 'referral';
  };

  // Initialisation de la personnalisation quantique
  const initializeQuantumPersonalization = useCallback(async (behaviorData: any) => {
    try {
      const profile = await analyzeUserProfile(behaviorData);
      setUserProfile(profile);

      const primaryOffer = generateQuantumOffer(profile);
      
      // Génération d'offres alternatives pour l'A/B testing quantique
      const alternatives = await generateAlternativeOffers(profile, primaryOffer);

      setQuantumState({
        currentOffer: primaryOffer,
        alternativeOffers: alternatives,
        optimizationHistory: [{
          timestamp: new Date(),
          change: 'Offre initiale générée',
          reason: 'Première visite - Analyse profil',
          impact: 0
        }],
        confidenceLevel: primaryOffer.probability.conversion,
        adaptationCount: 0
      });

    } catch (error) {
      console.error('Erreur initialisation quantique:', error);
    }
  }, [analyzeUserProfile, generateQuantumOffer]);

  // Génération d'offres alternatives
  const generateAlternativeOffers = async (profile: UserProfile, primaryOffer: QuantumOffer) => {
    const alternatives: QuantumOffer[] = [];
    
    // Version conservatrice
    const conservativeOffer = { ...primaryOffer };
    conservativeOffer.discount = Math.max(0, primaryOffer.discount - 10);
    conservativeOffer.price = primaryOffer.originalPrice * (1 - conservativeOffer.discount / 100);
    conservativeOffer.urgency.level = 'low';
    conservativeOffer.id = `conservative_${Date.now()}`;
    alternatives.push(conservativeOffer);

    // Version agressive
    const aggressiveOffer = { ...primaryOffer };
    aggressiveOffer.discount = Math.min(60, primaryOffer.discount + 15);
    aggressiveOffer.price = primaryOffer.originalPrice * (1 - aggressiveOffer.discount / 100);
    aggressiveOffer.urgency.level = 'critical';
    aggressiveOffer.urgency.timeRemaining = 30;
    aggressiveOffer.id = `aggressive_${Date.now()}`;
    alternatives.push(aggressiveOffer);

    return alternatives;
  };

  return {
    userProfile,
    quantumState,
    isOptimizing,
    
    // Actions principales
    initializeQuantumPersonalization,
    optimizeOfferInRealTime,
    
    // Getters
    getCurrentOffer: () => quantumState.currentOffer,
    getConfidenceLevel: () => quantumState.confidenceLevel,
    getOptimizationHistory: () => quantumState.optimizationHistory,
    
    // Actions manuelles
    switchToAlternativeOffer: (index: number) => {
      if (quantumState.alternativeOffers[index]) {
        setQuantumState(prev => ({
          ...prev,
          currentOffer: prev.alternativeOffers[index],
          optimizationHistory: [
            ...prev.optimizationHistory,
            {
              timestamp: new Date(),
              change: 'Basculement vers offre alternative',
              reason: 'Action manuelle',
              impact: 5
            }
          ]
        }));
      }
    },
    
    // Resets
    resetPersonalization: () => {
      setUserProfile(null);
      setQuantumState({
        currentOffer: null,
        alternativeOffers: [],
        optimizationHistory: [],
        confidenceLevel: 0,
        adaptationCount: 0
      });
    }
  };
};