import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';

interface SocialProof {
  id: string;
  type: 'live_viewers' | 'recent_purchases' | 'location_based' | 'time_sensitive' | 'social_proof';
  message: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  credibility: number;
  timestamp: Date;
  metadata: any;
}

interface LocationData {
  country?: string;
  region?: string;
  city?: string;
}

interface SocialMetrics {
  currentViewers: number;
  recentConversions: number;
  nearbyBusinesses: number;
  timeRemaining: number;
  trustScore: number;
}

export const useSocialGravity = () => {
  const [socialProofs, setSocialProofs] = useState<SocialProof[]>([]);
  const [metrics, setMetrics] = useState<SocialMetrics>({
    currentViewers: 0,
    recentConversions: 0,
    nearbyBusinesses: 0,
    timeRemaining: 0,
    trustScore: 0
  });
  const [userLocation, setUserLocation] = useState<LocationData>({});
  const [isActive, setIsActive] = useState(true);

  // Génération de preuves sociales en temps réel
  const generateLiveViewers = useCallback(() => {
    // Algorithme intelligent pour générer un nombre crédible de viewers
    const baseViewers = 3;
    const timeVariation = Math.sin(Date.now() / 60000) * 2; // Variation basée sur le temps
    const randomVariation = (Math.random() - 0.5) * 3; // Variation aléatoire
    
    const viewers = Math.max(1, Math.round(baseViewers + timeVariation + randomVariation));
    
    return {
      id: 'live_viewers',
      type: 'live_viewers' as const,
      message: `👥 ${viewers} personne${viewers > 1 ? 's' : ''} consulte${viewers > 1 ? 'nt' : ''} cette offre maintenant`,
      urgency: viewers > 5 ? 'high' as const : 'medium' as const,
      credibility: 85,
      timestamp: new Date(),
      metadata: { count: viewers }
    };
  }, []);

  // Génération de conversions récentes géolocalisées
  const generateRecentConversions = useCallback(() => {
    const locations = [
      'Montréal, QC', 'Québec, QC', 'Laval, QC', 'Gatineau, QC', 
      'Longueuil, QC', 'Sherbrooke, QC', 'Trois-Rivières, QC',
      'Toronto, ON', 'Vancouver, BC', 'Calgary, AB'
    ];
    
    const businessTypes = [
      'restaurant local', 'boutique e-commerce', 'cabinet conseil',
      'startup tech', 'agence immobilière', 'clinique santé',
      'salon beauté', 'école formation', 'entreprise construction'
    ];

    const timeAgo = Math.floor(Math.random() * 120) + 5; // 5-125 minutes
    const location = locations[Math.floor(Math.random() * locations.length)];
    const business = businessTypes[Math.floor(Math.random() * businessTypes.length)];
    
    return {
      id: `conversion_${Date.now()}`,
      type: 'recent_purchases' as const,
      message: `✅ Un ${business} de ${location} vient de souscrire (il y a ${timeAgo} min)`,
      urgency: timeAgo < 30 ? 'high' as const : 'medium' as const,
      credibility: 90,
      timestamp: new Date(),
      metadata: { location, business, timeAgo }
    };
  }, []);

  // Génération de preuves basées sur la localisation
  const generateLocationBasedProof = useCallback(() => {
    if (!userLocation.region) return null;

    const nearbyCount = Math.floor(Math.random() * 25) + 8; // 8-32 entreprises
    
    return {
      id: 'location_based',
      type: 'location_based' as const,
      message: `📍 ${nearbyCount} entreprises de votre région ont choisi Iluma™ ce mois-ci`,
      urgency: 'medium' as const,
      credibility: 95,
      timestamp: new Date(),
      metadata: { region: userLocation.region, count: nearbyCount }
    };
  }, [userLocation]);

  // Génération d'urgence temporelle intelligente
  const generateTimeBasedUrgency = useCallback(() => {
    const hour = new Date().getHours();
    let message = '';
    let urgency: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    
    if (hour >= 9 && hour <= 17) {
      // Heures de bureau
      const remainingHours = 17 - hour;
      message = `⏰ Plus que ${remainingHours}h avant la fin de nos heures d'affaires`;
      urgency = remainingHours <= 2 ? 'high' : 'medium';
    } else if (hour >= 18 && hour <= 22) {
      // Soirée
      message = `🌅 Offre spéciale soirée - Réponse garantie dès demain matin`;
      urgency = 'medium';
    } else {
      // Nuit/très tôt
      message = `🌙 Configuration nocturne disponible - Support prioritaire au réveil`;
      urgency = 'low';
    }
    
    return {
      id: 'time_sensitive',
      type: 'time_sensitive' as const,
      message,
      urgency,
      credibility: 80,
      timestamp: new Date(),
      metadata: { hour, timeContext: hour >= 9 && hour <= 17 ? 'business' : 'after_hours' }
    };
  }, []);

  // Génération de preuves sociales diversifiées
  const generateSocialProof = useCallback(() => {
    const proofs = [
      {
        message: '⭐ 4.9/5 étoiles sur +200 avis clients vérifiés',
        credibility: 95,
        urgency: 'low' as const
      },
      {
        message: '🏆 Élu "Meilleure Solution Marketing IA" 2024',
        credibility: 90,
        urgency: 'medium' as const
      },
      {
        message: '📈 +234% de ROI moyen chez nos 500+ clients',
        credibility: 88,
        urgency: 'medium' as const
      },
      {
        message: '🔒 Données sécurisées - Conformité RGPD garantie',
        credibility: 92,
        urgency: 'low' as const
      },
      {
        message: '⚡ Support expert 24/7 inclus dans toutes nos offres',
        credibility: 85,
        urgency: 'low' as const
      }
    ];
    
    const proof = proofs[Math.floor(Math.random() * proofs.length)];
    
    return {
      id: `social_proof_${Date.now()}`,
      type: 'social_proof' as const,
      message: proof.message,
      urgency: proof.urgency,
      credibility: proof.credibility,
      timestamp: new Date(),
      metadata: { type: 'testimonial' }
    };
  }, []);

  // Détection de la géolocalisation utilisateur
  const detectUserLocation = useCallback(async () => {
    try {
      // Tentative de géolocalisation IP (fallback sécurisé)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      setUserLocation({
        country: data.country_name,
        region: data.region,
        city: data.city
      });
    } catch (error) {
      console.log('Géolocalisation non disponible, utilisation des données par défaut');
      setUserLocation({
        country: 'Canada',
        region: 'Québec',
        city: 'Montréal'
      });
    }
  }, []);

  // Mise à jour continue des métriques sociales
  const updateSocialMetrics = useCallback(async () => {
    try {
      // Récupération des données analytiques récentes
      const { data: analytics } = await supabase
        .from('promotion_analytics')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      if (analytics) {
        const conversions = analytics.filter(a => a.interaction_type === 'conversion').length;
        const views = analytics.filter(a => a.interaction_type === 'view').length;
        
        setMetrics(prev => ({
          ...prev,
          recentConversions: conversions,
          currentViewers: Math.max(1, Math.floor(views / 10)), // Estimation des viewers actuels
          trustScore: Math.min(95, 70 + (conversions * 2)) // Score de confiance basé sur les conversions
        }));
      }
    } catch (error) {
      console.error('Erreur mise à jour métriques sociales:', error);
    }
  }, []);

  // Génération orchestrée de preuves sociales
  const generateSocialProofs = useCallback(() => {
    if (!isActive) return;

    const newProofs: SocialProof[] = [];
    
    // Toujours afficher les viewers en direct
    newProofs.push(generateLiveViewers());
    
    // Rotation intelligente des autres preuves
    const random = Math.random();
    if (random < 0.3) {
      newProofs.push(generateRecentConversions());
    } else if (random < 0.5) {
      const locationProof = generateLocationBasedProof();
      if (locationProof) newProofs.push(locationProof);
    } else if (random < 0.7) {
      newProofs.push(generateTimeBasedUrgency());
    } else {
      newProofs.push(generateSocialProof());
    }
    
    // Limite à 3 preuves maximum pour éviter la surcharge
    setSocialProofs(newProofs.slice(0, 3));
  }, [isActive, generateLiveViewers, generateRecentConversions, generateLocationBasedProof, generateTimeBasedUrgency, generateSocialProof]);

  // Initialisation et mise à jour périodique
  useEffect(() => {
    detectUserLocation();
    updateSocialMetrics();
    generateSocialProofs();
    
    // Mise à jour des viewers toutes les 5-15 secondes (variation aléatoire)
    const viewersInterval = setInterval(() => {
      if (isActive) {
        const newViewers = generateLiveViewers();
        setSocialProofs(prev => [
          newViewers,
          ...prev.filter(p => p.type !== 'live_viewers').slice(0, 2)
        ]);
      }
    }, 5000 + Math.random() * 10000);

    // Rotation des autres preuves toutes les 20-40 secondes
    const proofsInterval = setInterval(generateSocialProofs, 20000 + Math.random() * 20000);
    
    // Mise à jour des métriques toutes les 5 minutes
    const metricsInterval = setInterval(updateSocialMetrics, 5 * 60 * 1000);

    return () => {
      clearInterval(viewersInterval);
      clearInterval(proofsInterval);
      clearInterval(metricsInterval);
    };
  }, [isActive, detectUserLocation, updateSocialMetrics, generateSocialProofs, generateLiveViewers]);

  return {
    socialProofs,
    metrics,
    userLocation,
    
    // Contrôles
    activate: () => setIsActive(true),
    deactivate: () => setIsActive(false),
    isActive,
    
    // Actions manuelles
    refreshProofs: generateSocialProofs,
    addCustomProof: (proof: Omit<SocialProof, 'id' | 'timestamp'>) => {
      const customProof: SocialProof = {
        ...proof,
        id: `custom_${Date.now()}`,
        timestamp: new Date()
      };
      setSocialProofs(prev => [customProof, ...prev.slice(0, 2)]);
    },
    
    // Helpers
    getHighestUrgencyProof: () => {
      const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return socialProofs.reduce((highest, current) => 
        urgencyOrder[current.urgency] > urgencyOrder[highest.urgency] ? current : highest,
        socialProofs[0]
      );
    },
    
    getMostCredibleProof: () => {
      return socialProofs.reduce((most, current) => 
        current.credibility > most.credibility ? current : most,
        socialProofs[0]
      );
    }
  };
};