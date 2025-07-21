import React, { useEffect } from 'react';

interface TouchOptimizerProps {
  children: React.ReactNode;
}

const TouchOptimizer: React.FC<TouchOptimizerProps> = ({ children }) => {
  useEffect(() => {
    // Prévenir le zoom sur double tap pour iOS Safari
    let lastTouchEnd = 0;
    const preventDefault = (e: TouchEvent) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Optimiser le scroll pour mobile
    const optimizeScroll = () => {
      // Ajouter smooth scroll pour tous les éléments
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Optimiser les cartes pour le touch
      const mapElements = document.querySelectorAll('[data-map="true"], .mapboxgl-canvas, .interactive-map');
      mapElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.touchAction = 'manipulation';
        (el.style as any).webkitOverflowScrolling = 'touch';
      });

      // Optimiser les boutons pour le touch
      const buttons = document.querySelectorAll('button, .btn, [role="button"]');
      buttons.forEach((button) => {
        const btn = button as HTMLElement;
        btn.style.touchAction = 'manipulation';
        
        // Ajouter feedback tactile
        btn.addEventListener('touchstart', () => {
          btn.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('touchend', () => {
          btn.style.transform = 'scale(1)';
        });
      });
    };

    // iOS Safari specific optimizations
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isIOS || isSafari) {
      // Prévenir le bounce effect
      document.body.style.overscrollBehavior = 'none';
      
      // Optimiser la navigation
      const navigation = document.querySelector('nav');
      if (navigation) {
        navigation.style.position = 'sticky';
        navigation.style.top = '0';
        navigation.style.zIndex = '1000';
      }
    }

    // Petits écrans (< 375px)
    const handleSmallScreens = () => {
      if (window.innerWidth < 375) {
        document.documentElement.style.fontSize = '14px';
        
        // Adapter les cartes
        const cards = document.querySelectorAll('.card, [class*="card"]');
        cards.forEach((card) => {
          const cardEl = card as HTMLElement;
          cardEl.style.padding = '12px';
          cardEl.style.margin = '8px 0';
        });
        
        // Adapter les textes
        const texts = document.querySelectorAll('h1, h2, h3, .text-xl, .text-2xl');
        texts.forEach((text) => {
          const textEl = text as HTMLElement;
          textEl.style.fontSize = 'clamp(1rem, 4vw, 1.5rem)';
          textEl.style.lineHeight = '1.4';
        });
      }
    };

    document.addEventListener('touchend', preventDefault, { passive: false });
    window.addEventListener('load', optimizeScroll);
    window.addEventListener('resize', handleSmallScreens);
    handleSmallScreens(); // Exécuter immédiatement

    return () => {
      document.removeEventListener('touchend', preventDefault);
      window.removeEventListener('load', optimizeScroll);
      window.removeEventListener('resize', handleSmallScreens);
    };
  }, []);

  return <>{children}</>;
};

export default TouchOptimizer;