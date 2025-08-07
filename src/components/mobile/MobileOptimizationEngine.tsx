import React, { useEffect, useCallback, useState } from 'react';
import { useDeviceInfo } from '@/hooks/use-mobile';

interface MobileOptimizationEngineProps {
  children: React.ReactNode;
}

const MobileOptimizationEngine: React.FC<MobileOptimizationEngineProps> = ({ children }) => {
  const { isMobile, isTablet, width, height, orientation } = useDeviceInfo();
  const [isOptimized, setIsOptimized] = useState(false);

  const optimizeForMobile = useCallback(() => {
    if (!isMobile && !isTablet) return;

    // Optimisation des touches et interactions
    const optimizeTouchTargets = () => {
      const elements = document.querySelectorAll('button, a, [role="button"], input, textarea, select');
      elements.forEach((element) => {
        const el = element as HTMLElement;
        const computedStyle = window.getComputedStyle(el);
        const height = parseInt(computedStyle.height);
        
        // Assurer des zones de touch de minimum 44px (Apple HIG) / 48px (Material Design)
        if (height < 48) {
          el.style.minHeight = '48px';
          el.style.padding = '12px 16px';
        }
        
        // Améliorer l'espacement tactile
        el.style.touchAction = 'manipulation';
        
        // Feedback tactile amélioré
        el.addEventListener('touchstart', () => {
          el.style.transform = 'scale(0.98)';
          el.style.opacity = '0.8';
        }, { passive: true });
        
        el.addEventListener('touchend', () => {
          el.style.transform = 'scale(1)';
          el.style.opacity = '1';
        }, { passive: true });
      });
    };

    // Optimisation du viewport et du contenu
    const optimizeViewport = () => {
      // Mettre à jour le viewport meta tag si nécessaire
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover');
      
      // Optimiser pour les notches (iPhone X+)
      document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top)');
      document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
    };

    // Optimisation des polices pour mobile
    const optimizeFonts = () => {
      const baseSize = width < 375 ? 14 : 16;
      document.documentElement.style.fontSize = `${baseSize}px`;
      
      // Améliorer la lisibilité
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
      textElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.textRendering = 'optimizeLegibility';
        (el.style as any).webkitFontSmoothing = 'antialiased';
        (el.style as any).mozOsxFontSmoothing = 'grayscale';
      });
    };

    // Optimisation des animations pour performance mobile
    const optimizeAnimations = () => {
      // Détecter les performances mobiles
      const isLowPerformance = width < 375 || navigator.hardwareConcurrency <= 2;
      
      if (isLowPerformance) {
        // Réduire les animations complexes
        const animatedElements = document.querySelectorAll('[class*="animate-"], [style*="animation"]');
        animatedElements.forEach((element) => {
          const el = element as HTMLElement;
          el.style.animationDuration = '0.3s'; // Réduire la durée
          el.style.animationIterationCount = '1'; // Une seule fois
        });
      }
      
      // Optimiser les transformations
      const transformElements = document.querySelectorAll('[style*="transform"]');
      transformElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.willChange = 'transform';
        el.style.transform += ' translateZ(0)'; // Forcer l'accélération GPU
      });
    };

    // Optimisation du scroll
    const optimizeScrolling = () => {
      document.body.style.overscrollBehavior = 'none'; // Éviter le bounce
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Améliorer le scroll inertiel sur iOS
      const scrollContainers = document.querySelectorAll('[style*="overflow"], .overflow-auto, .overflow-scroll');
      scrollContainers.forEach((container) => {
        const el = container as HTMLElement;
        (el.style as any).webkitOverflowScrolling = 'touch';
        el.style.scrollbarWidth = 'thin';
      });
    };

    // Optimisation des images et médias
    const optimizeMedia = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        // Loading lazy par défaut
        if (!img.loading) {
          img.loading = 'lazy';
        }
        
        // Améliorer la performance
        img.style.willChange = 'auto';
        img.style.backfaceVisibility = 'hidden';
      });
      
      // Optimiser les vidéos
      const videos = document.querySelectorAll('video');
      videos.forEach((video) => {
        video.playsInline = true;
        video.preload = 'metadata';
      });
    };

    // Optimisation spécifique pour petits écrans
    const optimizeSmallScreens = () => {
      if (width < 375) {
        document.documentElement.classList.add('small-screen');
        
        // Adapter les espacements
        const containers = document.querySelectorAll('.container, .max-w-7xl, .max-w-6xl');
        containers.forEach((container) => {
          const el = container as HTMLElement;
          el.style.paddingLeft = '12px';
          el.style.paddingRight = '12px';
        });
        
        // Adapter les modals et popups
        const modals = document.querySelectorAll('[role="dialog"], .modal, .popup');
        modals.forEach((modal) => {
          const el = modal as HTMLElement;
          el.style.margin = '8px';
          el.style.maxHeight = `${height - 100}px`;
          el.style.overflow = 'auto';
        });
      }
    };

    // Exécuter toutes les optimisations
    optimizeTouchTargets();
    optimizeViewport();
    optimizeFonts();
    optimizeAnimations();
    optimizeScrolling();
    optimizeMedia();
    optimizeSmallScreens();
    
    setIsOptimized(true);
  }, [isMobile, isTablet, width, height]);

  // Optimisation pour les changements d'orientation
  const handleOrientationChange = useCallback(() => {
    if (!isMobile && !isTablet) return;
    
    // Délai pour permettre au navigateur de se stabiliser
    setTimeout(() => {
      // Recalculer la hauteur du viewport
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      
      // Réajuster les éléments fullscreen
      const fullscreenElements = document.querySelectorAll('.h-screen, .min-h-screen');
      fullscreenElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.height = `calc(var(--vh, 1vh) * 100)`;
      });
    }, 300);
  }, [isMobile, isTablet]);

  useEffect(() => {
    optimizeForMobile();
    
    // Écouter les changements d'orientation
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Écouter les événements de performance
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure' && entry.duration > 100) {
          console.log('Performance warning:', entry.name, entry.duration);
        }
      });
    });
    
    if ('PerformanceObserver' in window) {
      observer.observe({ entryTypes: ['measure', 'navigation'] });
    }
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
      observer.disconnect();
    };
  }, [optimizeForMobile, handleOrientationChange]);

  // Ajouter des classes CSS conditionnelles
  useEffect(() => {
    document.documentElement.classList.toggle('is-mobile', isMobile);
    document.documentElement.classList.toggle('is-tablet', isTablet);
    document.documentElement.classList.toggle('is-landscape', orientation === 'landscape');
    document.documentElement.classList.toggle('is-portrait', orientation === 'portrait');
    document.documentElement.classList.toggle('mobile-optimized', isOptimized);
  }, [isMobile, isTablet, orientation, isOptimized]);

  return <>{children}</>;
};

export default MobileOptimizationEngine;