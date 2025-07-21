import React, { Suspense, useState, useEffect } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  timeout?: number;
}

const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({ 
  children, 
  fallback,
  className = "min-h-screen bg-black flex items-center justify-center",
  timeout = 10000
}) => {
  const [isTimeout, setIsTimeout] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeout(true);
      setTimeout(() => setShowRetry(true), 2000);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  const handleRetry = () => {
    setIsTimeout(false);
    setShowRetry(false);
    window.location.reload();
  };

  const defaultFallback = (
    <div className={className}>
      <div className="text-center max-w-md mx-auto">
        {!isTimeout ? (
          <>
            <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--primary))] mx-auto mb-4" />
            <p className="text-white font-['Montserrat'] mb-2">Chargement...</p>
            <p className="text-white/60 text-sm">Optimisation en cours</p>
          </>
        ) : (
          <>
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-white font-['Montserrat'] text-lg mb-2">Chargement plus long que prévu</h3>
            <p className="text-white/70 text-sm mb-4">La page est en cours d'optimisation</p>
            {showRetry && (
              <button 
                onClick={handleRetry}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                Recharger la page
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export default LazyLoadWrapper;