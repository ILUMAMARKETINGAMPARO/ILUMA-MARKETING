import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

const PerformanceOptimizer: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    ttfb: 0
  });
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    // Initialize performance optimizations
    initializePerformanceOptimizations();
    
    // Measure Core Web Vitals
    measureCoreWebVitals();
    
    // Setup intersection observer for lazy loading
    setupLazyLoading();
    
    // Preload critical resources
    preloadCriticalResources();
  }, []);

  const initializePerformanceOptimizations = () => {
    // Add critical CSS inline
    const criticalCSS = `
      .critical-above-fold {
        font-display: swap;
        contain: layout style;
      }
      .lazy-load {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .lazy-load.loaded {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    // Enable passive event listeners
    const addPassiveEventListener = () => {
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          get: () => {
            supportsPassive = true;
            return true;
          }
        });
        window.addEventListener('testPassive', () => {}, opts);
        window.removeEventListener('testPassive', () => {}, opts);
      } catch (e) {}
      
      return supportsPassive;
    };

    if (addPassiveEventListener()) {
      document.addEventListener('scroll', () => {}, { passive: true });
      document.addEventListener('touchstart', () => {}, { passive: true });
    }
  };

  const measureCoreWebVitals = () => {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
        }
      }).observe({ entryTypes: ['paint'] });
    }
  };

  const setupLazyLoading = () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.classList.add('loaded');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });

      const componentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            componentObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '100px 0px'
      });

      document.querySelectorAll('.lazy-load').forEach(el => {
        componentObserver.observe(el);
      });
    }
  };

  const preloadCriticalResources = () => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.onload = () => {
      fontLink.rel = 'stylesheet';
    };
    document.head.appendChild(fontLink);

    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.supabase.co',
      'https://clerk.dev'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    const prefetchDomains = [
      'https://analytics.google.com',
      'https://www.googletagmanager.com'
    ];

    prefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  };

  const optimizeImages = () => {
    setIsOptimizing(true);
    
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('webp') > -1;
    };

    if (supportsWebP()) {
      document.querySelectorAll('img').forEach((img: HTMLImageElement) => {
        if (img.src && !img.src.includes('.webp')) {
          const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          
          const testImg = new Image();
          testImg.onload = () => {
            img.src = webpSrc;
          };
          testImg.src = webpSrc;
        }
      });
    }

    setTimeout(() => setIsOptimizing(false), 1000);
  };

  const getPerformanceScore = (): number => {
    let score = 100;
    
    if (metrics.lcp > 4000) score -= 30;
    else if (metrics.lcp > 2500) score -= 15;
    
    if (metrics.fid > 300) score -= 25;
    else if (metrics.fid > 100) score -= 10;
    
    if (metrics.cls > 0.25) score -= 25;
    else if (metrics.cls > 0.1) score -= 10;
    
    return Math.max(score, 0);
  };

  // Ne pas afficher le composant visuel - seulement exécuter les optimisations en arrière-plan
  return null;
};

export default PerformanceOptimizer;