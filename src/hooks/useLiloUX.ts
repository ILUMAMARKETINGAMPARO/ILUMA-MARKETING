import { useState, useEffect, useCallback } from 'react';
import { LiloMemory } from '@/utils/LiloMemory';

export type LiloMood = 'happy' | 'thinking' | 'helper' | 'alert' | 'dormant' | 'curious' | 'excited';

interface UseLiloUXReturn {
  liloMood: LiloMood;
  liloMessage: string;
  handleNavigation: (path: string, type?: 'click' | 'hover') => void;
  handleCTAHighlight: () => void;
  updateMood: (mood: LiloMood, message?: string) => void;
  handleIlumaHover: () => void;
}

export const useLiloUX = (): UseLiloUXReturn => {
  const [liloMood, setLiloMood] = useState<LiloMood>('happy');
  const [liloMessage, setLiloMessage] = useState('');
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Initialize from memory
  useEffect(() => {
    const memory = LiloMemory.getMemory();
    if (memory.lastMood) {
      setLiloMood(memory.lastMood);
    }
    if (memory.lastMessage) {
      setLiloMessage(memory.lastMessage);
    }
  }, []);

  // Save to memory when mood changes
  useEffect(() => {
    LiloMemory.updateMood(liloMood, liloMessage);
  }, [liloMood, liloMessage]);

  const updateMood = useCallback((mood: LiloMood, message?: string) => {
    setLiloMood(mood);
    if (message) {
      setLiloMessage(message);
    }
  }, []);

  const handleNavigation = useCallback((path: string, type: 'click' | 'hover' = 'click') => {
    // Clear any existing hover timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    if (type === 'click') {
      // Update memory with new page
      LiloMemory.updateNavigation(path);
      
      // Set appropriate mood based on destination
      if (path === '/') {
        updateMood('happy', "Bienvenue sur Iluma ! 🚀");
      } else if (path === '/formation-iluma') {
        updateMood('helper', "Prêt pour ta formation ? C'est parti ! 🎓");
      } else if (path === '/contact') {
        updateMood('thinking', "Tu veux nous parler ? Super choix ! 💬");
      } else if (path.includes('/services/')) {
        updateMood('helper', "Explorons nos services ensemble ! ✨");
      } else {
        updateMood('thinking', "Intéressant, explorons cette section ! 🔍");
      }
    } else if (type === 'hover') {
      // Set a timeout for hover behavior
      const timeout = setTimeout(() => {
        updateMood('helper', "Tu hésites ? Je peux t'expliquer cette section ! 💡");
      }, 2000); // 2 seconds hover
      
      setHoverTimeout(timeout);
    }
  }, [hoverTimeout, updateMood]);

  const handleCTAHighlight = useCallback(() => {
    updateMood('alert', "Psst ! As-tu vu notre CTA magique ? Clique pour activer Iluma IA ! ✨");
    
    // Reset to normal after a few seconds
    setTimeout(() => {
      updateMood('happy', "Je suis là si tu as besoin d'aide ! 😊");
    }, 5000);
  }, [updateMood]);

  const handleIlumaHover = useCallback(() => {
    updateMood('excited', "Wow ! Tu découvres l'univers ILUMA ? C'est magique ! ✨🚀");
    
    // Reset after hover
    setTimeout(() => {
      updateMood('curious', "L'aventure Iluma™ commence ici ! Prêt ? 🌟");
    }, 3000);
  }, [updateMood]);

  // Detect scroll depth for mood changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage > 80 && liloMood !== 'helper') {
        updateMood('helper', "Tu arrives à la fin ! Besoin d'aide pour la suite ? 🎯");
        LiloMemory.updateScroll(scrollPercentage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [liloMood, updateMood]);

  // Detect inactivity
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (liloMood !== 'dormant') {
          // Occasionally hint at the secret ship
          const shipHints = [
            "Tu es encore là ? Je vais faire une petite sieste... 😴",
            "Je détecte un vaisseau non identifié en approche... 🛸",
            "Seuls les navigateurs galactiques savent où atterrir... ✨"
          ];
          const randomHint = shipHints[Math.floor(Math.random() * shipHints.length)];
          updateMood('dormant', randomHint);
        }
      }, 300000); // 5 minutes
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [liloMood, updateMood]);

  return {
    liloMood,
    liloMessage,
    handleNavigation,
    handleCTAHighlight,
    updateMood,
    handleIlumaHover
  };
};