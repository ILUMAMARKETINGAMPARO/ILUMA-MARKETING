import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  variant?: 'card' | 'inline';
}

const ErrorState = ({ 
  message, 
  onRetry,
  variant = 'card' 
}: ErrorStateProps) => {
  const defaultMessage = 'Erreur';
  
  const ErrorContent = () => (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <AlertTriangle className="w-12 h-12 text-red-400" />
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{defaultMessage}</h3>
        <p className="text-white/70">{message || 'Une erreur inattendue s\'est produite'}</p>
      </div>
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline" 
          className="border-red-500/30 text-red-300 hover:bg-red-500/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      )}
    </div>
  );

  if (variant === 'card') {
    return (
      <Card className="glass-effect border-red-500/20 p-8">
        <ErrorContent />
      </Card>
    );
  }

  return <ErrorContent />;
};

export default ErrorState;
