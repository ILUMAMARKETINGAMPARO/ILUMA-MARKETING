import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client.ts';

export type LiloEmotion = 'curious' | 'excited' | 'helping' | 'thinking' | 'celebrating' | 'concerned' | 'focused' | 'playful';

interface EmotionContext {
  emotion: LiloEmotion;
  reason: string;
  confidence: number;
  suggestions: string[];
}

export const useLiloEmotion = () => {
  const [currentEmotion, setCurrentEmotion] = useState<LiloEmotion>('curious');
  const [emotionContext, setEmotionContext] = useState<EmotionContext | null>(null);
  const [userEngagement, setUserEngagement] = useState(0);
  const location = useLocation();

  // Detect emotion based on user behavior and context
  const detectEmotion = async (userActivity?: any): Promise<EmotionContext> => {
    const path = location.pathname;
    let emotion: LiloEmotion = 'curious';
    let reason = '';
    let confidence = 70;
    let suggestions: string[] = [];

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get recent user analytics for context
      let recentActivity = null;
      if (user) {
        const { data } = await supabase
          .from('module_analytics')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        recentActivity = data;
      }

      // Context-based emotion detection
      switch (path) {
        case '/':
          if (recentActivity && recentActivity.length === 0) {
            emotion = 'excited';
            reason = 'Nouvel utilisateur détecté';
            confidence = 85;
            suggestions = ['Découvrir ADLUMA™', 'Voir la méthode Iluma™', 'Prendre le tour guidé'];
          } else if (recentActivity && recentActivity.length > 10) {
            emotion = 'celebrating';
            reason = 'Utilisateur très actif';
            confidence = 90;
            suggestions = ['Voir vos statistiques', 'Découvrir de nouveaux modules', 'Partager vos résultats'];
          } else {
            emotion = 'curious';
            reason = 'Page d\'accueil visitée';
            suggestions = ['Explorer les modules', 'Voir les nouveautés', 'Obtenir de l\'aide'];
          }
          break;

        case '/adluma':
          emotion = 'focused';
          reason = 'Utilisation du simulateur ADLUMA™';
          confidence = 88;
          suggestions = ['Optimiser vos paramètres', 'Comparer avec ILA™', 'Exporter vos résultats'];
          break;

        case '/ila':
          emotion = 'thinking';
          reason = 'Analyse du score ILA™';
          confidence = 85;
          suggestions = ['Améliorer votre score', 'Voir les recommandations', 'Passer à ADLUMA™'];
          break;

        case '/crm-iluma':
          emotion = 'helping';
          reason = 'Gestion CRM active';
          confidence = 82;
          suggestions = ['Ajouter un client', 'Voir les analytics', 'Automatiser les tâches'];
          break;

        case '/ilumatch':
          emotion = 'playful';
          reason = 'Recherche de partenariats';
          confidence = 80;
          suggestions = ['Élargir vos critères', 'Voir les suggestions', 'Contacter des partenaires'];
          break;

        case '/dashboard-avance':
          if (recentActivity && recentActivity.length < 3) {
            emotion = 'concerned';
            reason = 'Peu d\'activité récente détectée';
            confidence = 75;
            suggestions = ['Reprendre ADLUMA™', 'Voir vos modules', 'Obtenir des conseils'];
          } else {
            emotion = 'celebrating';
            reason = 'Consultation des métriques avancées';
            confidence = 88;
            suggestions = ['Analyser les tendances', 'Optimiser votre stratégie', 'Partager vos succès'];
          }
          break;

        default:
          emotion = 'curious';
          reason = 'Navigation générale';
          suggestions = ['Retour à l\'accueil', 'Voir vos modules', 'Obtenir de l\'aide'];
      }

      // Adjust based on user activity patterns
      if (recentActivity) {
        const avgTimeSpent = recentActivity.reduce((acc, a) => acc + (a.time_spent || 0), 0) / recentActivity.length;
        const completions = recentActivity.filter(a => a.action_type === 'complete').length;
        
        if (avgTimeSpent > 300) { // Plus de 5 minutes en moyenne
          if (emotion === 'curious') emotion = 'focused';
          confidence += 10;
        }
        
        if (completions > 2) {
          if (emotion === 'focused') emotion = 'celebrating';
          confidence += 15;
        }
        
        setUserEngagement(Math.min(100, (avgTimeSpent / 60) + (completions * 20)));
      }

      // Log the emotion detection
      if (user) {
        await supabase.from('lilo_interactions').insert({
          user_id: user.id,
          page_context: path,
          emotion_detected: emotion,
          user_message: `Emotion auto-détectée: ${reason}`,
          lilo_response: `Mode ${emotion} activé (${confidence}% confiance)`
        });
      }

    } catch (error) {
      console.error('Error detecting emotion:', error);
    }

    return { emotion, reason, confidence, suggestions };
  };

  // Update emotion when page changes
  useEffect(() => {
    const updateEmotion = async () => {
      const context = await detectEmotion();
      setCurrentEmotion(context.emotion);
      setEmotionContext(context);
    };

    updateEmotion();
  }, [location.pathname]);

  // Manually trigger emotion change
  const triggerEmotion = async (emotion: LiloEmotion, reason: string) => {
    setCurrentEmotion(emotion);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('lilo_interactions').insert({
          user_id: user.id,
          page_context: location.pathname,
          emotion_detected: emotion,
          user_message: `Emotion manuelle: ${reason}`,
          lilo_response: `Mode ${emotion} activé manuellement`
        });
      }
    } catch (error) {
      console.error('Error triggering emotion:', error);
    }
  };

  // Get emotion-specific animations
  const getEmotionAnimations = () => {
    const animations = {
      curious: { 
        scale: [1, 1.05, 1], 
        rotate: [0, 5, 0],
        transition: { duration: 3, repeat: Infinity }
      },
      excited: { 
        scale: [1, 1.2, 1], 
        rotate: [0, 15, 0],
        transition: { duration: 2, repeat: Infinity }
      },
      helping: { 
        scale: [1, 1.08, 1], 
        rotate: [0, -8, 0],
        transition: { duration: 2.5, repeat: Infinity }
      },
      thinking: { 
        scale: [1, 0.98, 1], 
        rotate: [0, 0, 0],
        transition: { duration: 4, repeat: Infinity }
      },
      celebrating: { 
        scale: [1, 1.3, 1], 
        rotate: [0, 25, 0],
        transition: { duration: 1.5, repeat: Infinity }
      },
      concerned: { 
        scale: [1, 0.95, 1], 
        rotate: [0, -3, 0],
        transition: { duration: 3.5, repeat: Infinity }
      },
      focused: { 
        scale: [1, 1.02, 1], 
        rotate: [0, 2, 0],
        transition: { duration: 5, repeat: Infinity }
      },
      playful: { 
        scale: [1, 1.15, 0.95, 1], 
        rotate: [0, 10, -5, 0],
        transition: { duration: 2, repeat: Infinity }
      }
    };

    return animations[currentEmotion];
  };

  // Get emotion-specific messages
  const getEmotionMessage = () => {
    const messages = {
      curious: "Je suis curieux de voir ce que vous allez découvrir ! 🤔",
      excited: "C'est fantastique ! Je sens de grandes choses à venir ! ✨",
      helping: "Je suis là pour vous accompagner dans cette étape 🤝",
      thinking: "Laissez-moi analyser vos données... 🧠",
      celebrating: "Bravo ! Vos résultats sont impressionnants ! 🎉",
      concerned: "Je remarque que vous êtes moins actif. Puis-je vous aider ? 😊",
      focused: "Parfait ! Vous êtes vraiment concentré sur vos objectifs 🎯",
      playful: "Explorons ensemble de nouvelles possibilités ! 🚀"
    };

    return messages[currentEmotion];
  };

  return {
    currentEmotion,
    emotionContext,
    userEngagement,
    detectEmotion,
    triggerEmotion,
    getEmotionAnimations,
    getEmotionMessage
  };
};