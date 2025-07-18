import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'card' | 'inline' | 'overlay';
  timeout?: number;
  onTimeout?: () => void;
}

const LoadingState = ({ 
  message = 'Chargement...', 
  size = 'md', 
  variant = 'card',
  timeout = 8000,
  onTimeout
}: LoadingStateProps) => {
  const [isTimeout, setIsTimeout] = useState(false);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  useEffect(() => {
    if (timeout > 0) {
      const timer = setTimeout(() => {
        setIsTimeout(true);
        onTimeout?.();
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout, onTimeout]);

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center gap-3">
      {!isTimeout ? (
        <>
          <Loader2 className={`${sizeClasses[size]} text-emerald-400 animate-spin`} />
          <span className="text-white/80">{message}</span>
        </>
      ) : (
        <>
          <AlertCircle className={`${sizeClasses[size]} text-yellow-500`} />
          <span className="text-white/80">Chargement plus long que prévu</span>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="mt-2 border-white/20 text-white hover:bg-white/10"
          >
            Recharger
          </Button>
        </>
      )}
    </div>
  );

  if (variant === 'card') {
    return (
      <Card className="glass-effect border-white/20 p-8">
        <LoadingContent />
      </Card>
    );
  }

  if (variant === 'overlay') {
    return (
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-black/80 border border-white/20 rounded-lg p-6">
          <LoadingContent />
        </div>
      </div>
    );
  }

  return <LoadingContent />;
};

export default LoadingState;