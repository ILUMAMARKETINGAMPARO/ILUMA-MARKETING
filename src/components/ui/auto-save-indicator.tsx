import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Save, 
  Check, 
  Loader2, 
  Clock, 
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutoSaveIndicatorProps {
  hasChanges: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  onSaveNow?: () => void;
  enabled?: boolean;
  className?: string;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  hasChanges,
  isSaving,
  lastSaved,
  onSaveNow,
  enabled = true,
  className
}) => {
  const getStatusIcon = () => {
    if (!enabled) return <WifiOff className="w-3 h-3" />;
    if (isSaving) return <Loader2 className="w-3 h-3 animate-spin" />;
    if (hasChanges) return <AlertCircle className="w-3 h-3" />;
    if (lastSaved) return <Check className="w-3 h-3" />;
    return <Wifi className="w-3 h-3" />;
  };

  const getStatusText = () => {
    if (!enabled) return 'Auto-sauvegarde désactivée';
    if (isSaving) return 'Sauvegarde en cours...';
    if (hasChanges) return 'Modifications non sauvegardées';
    if (lastSaved) return 'Sauvegardé';
    return 'Aucune modification';
  };

  const getStatusColor = () => {
    if (!enabled) return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    if (isSaving) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (hasChanges) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (lastSaved) return 'bg-green-500/20 text-green-400 border-green-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getLastSavedText = () => {
    if (!lastSaved) return null;
    
    const now = new Date();
    const diffMs = now.getTime() - lastSaved.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'À l\'instant';
    if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    
    return lastSaved.toLocaleDateString('fr-FR');
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded text-xs border transition-all duration-200",
              getStatusColor()
            )}>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1"
              >
                {getStatusIcon()}
                <span>{getStatusText()}</span>
              </motion.div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs">
              <div>{getStatusText()}</div>
              {lastSaved && (
                <div className="text-white/60 mt-1">
                  Dernière sauvegarde: {getLastSavedText()}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {hasChanges && onSaveNow && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button
              size="sm"
              variant="outline"
              onClick={onSaveNow}
              disabled={isSaving}
              className="h-6 px-2 text-xs border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
            >
              <Save className="w-3 h-3 mr-1" />
              Sauvegarder
            </Button>
          </motion.div>
        </AnimatePresence>
      )}

      {lastSaved && (
        <span className="text-xs text-white/50 hidden md:inline">
          {getLastSavedText()}
        </span>
      )}
    </div>
  );
};

export default AutoSaveIndicator;