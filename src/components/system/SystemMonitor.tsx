import React, { useEffect } from 'react';
import { useSystemMonitoring } from '@/hooks/useSystemMonitoring';
import { useSystem } from '@/contexts/SystemContext';
import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SystemMonitor: React.FC = () => {
  const { systemState, trackUserInteraction } = useSystemMonitoring();
  const { clearErrors, clearWarnings } = useSystem();

  useEffect(() => {
    // Track page view
    trackUserInteraction('page_view', { 
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  }, [trackUserInteraction]);

  if (!systemState.features.debugMode) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      {systemState.errors.length > 0 && (
        <Card className="mb-2 p-3 bg-red-950/80 border-red-500/30 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm font-medium">
                Erreurs ({systemState.errors.length})
              </span>
            </div>
            <button 
              onClick={clearErrors}
              className="text-red-400 hover:text-red-300 text-xs"
            >
              Effacer
            </button>
          </div>
          <div className="max-h-20 overflow-y-auto">
            {systemState.errors.slice(-3).map((error, index) => (
              <p key={index} className="text-red-200 text-xs mb-1">
                {error}
              </p>
            ))}
          </div>
        </Card>
      )}

      {systemState.warnings.length > 0 && (
        <Card className="mb-2 p-3 bg-yellow-950/80 border-yellow-500/30 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium">
                Avertissements ({systemState.warnings.length})
              </span>
            </div>
            <button 
              onClick={clearWarnings}
              className="text-yellow-400 hover:text-yellow-300 text-xs"
            >
              Effacer
            </button>
          </div>
          <div className="max-h-20 overflow-y-auto">
            {systemState.warnings.slice(-2).map((warning, index) => (
              <p key={index} className="text-yellow-200 text-xs mb-1">
                {warning}
              </p>
            ))}
          </div>
        </Card>
      )}

      {systemState.errors.length === 0 && systemState.warnings.length === 0 && (
        <Card className="p-3 bg-green-950/80 border-green-500/30 backdrop-blur">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-medium">
              Système Opérationnel
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-green-500/20 text-green-300 text-xs">
              <Activity className="w-3 h-3 mr-1" />
              {systemState.performance.loadTime.toFixed(0)}ms
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 text-xs">
              {systemState.analytics.userInteractions} interactions
            </Badge>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SystemMonitor;