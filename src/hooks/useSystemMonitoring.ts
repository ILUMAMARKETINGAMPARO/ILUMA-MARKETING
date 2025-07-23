import { useEffect, useCallback } from 'react';
import { useSystem } from '@/contexts/SystemContext';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  networkLatency?: number;
}

export const useSystemMonitoring = () => {
  const { state, addError, addWarning, updatePerformance, trackAnalytics } = useSystem();

  // Monitoring des performances de chargement
  const monitorPageLoad = useCallback(() => {
    const startTime = performance.now();
    
    const measureLoadTime = () => {
      const loadTime = performance.now() - startTime;
      updatePerformance({ loadTime });
      
      // Ajouter un warning si le chargement est lent
      if (loadTime > 3000) {
        addWarning(`Page load time exceeded 3 seconds: ${loadTime}ms`);
      }
    };

    // Mesurer quand la page est complètement chargée
    if (document.readyState === 'complete') {
      measureLoadTime();
    } else {
      window.addEventListener('load', measureLoadTime);
      return () => window.removeEventListener('load', measureLoadTime);
    }
  }, [updatePerformance, addWarning]);

  // Monitoring des erreurs JavaScript
  const monitorErrors = useCallback(() => {
    const handleError = (event: ErrorEvent) => {
      const errorMessage = `JavaScript Error: ${event.message} at ${event.filename}:${event.lineno}`;
      addError(errorMessage);
      console.error('System Error Detected:', errorMessage);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = `Unhandled Promise Rejection: ${event.reason}`;
      addError(errorMessage);
      console.error('Promise Rejection Detected:', errorMessage);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [addError]);

  // Monitoring des performances en temps réel
  const monitorPerformance = useCallback(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          updatePerformance({
            loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
            renderCount: state.performance.renderCount + 1
          });
        }
        
        if (entry.entryType === 'largest-contentful-paint') {
          const lcpValue = entry.startTime;
          if (lcpValue > 2500) {
            addWarning(`LCP is slower than recommended: ${lcpValue}ms`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint'] });
    
    return () => observer.disconnect();
  }, [updatePerformance, addWarning, state.performance.renderCount]);

  // Analytics et tracking des interactions
  const trackUserInteraction = useCallback((event: string, data?: any) => {
    trackAnalytics({ 
      userInteractions: state.analytics.userInteractions + 1 
    });
    
    // Log pour debugging si nécessaire
    if (state.features.debugMode) {
      console.log('User Interaction:', event, data);
    }
  }, [trackAnalytics, state.analytics.userInteractions, state.features.debugMode]);

  // Monitoring de la mémoire (si supporté)
  const monitorMemory = useCallback(() => {
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      if (memoryInfo.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.8) {
        addWarning('Memory usage is high - consider optimizing');
      }
    }
  }, [addWarning]);

  // Initialiser tous les monitors
  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];
    
    cleanupFunctions.push(monitorPageLoad() || (() => {}));
    cleanupFunctions.push(monitorErrors());
    cleanupFunctions.push(monitorPerformance());
    
    // Monitor mémoire toutes les 30 secondes
    const memoryInterval = setInterval(monitorMemory, 30000);
    cleanupFunctions.push(() => clearInterval(memoryInterval));

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [monitorPageLoad, monitorErrors, monitorPerformance, monitorMemory]);

  return {
    systemState: state,
    trackUserInteraction,
    metrics: {
      errors: state.errors,
      warnings: state.warnings,
      performance: state.performance,
      analytics: state.analytics
    }
  };
};

export default useSystemMonitoring;