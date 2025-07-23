import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  Check, 
  Loader2, 
  Clock, 
  AlertTriangle,
  Wifi,
  Database,
  HardDrive
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SaveIndicatorProps {
  hasChanges: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  onSaveNow?: () => void;
  enabled?: boolean;
  className?: string;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({
  hasChanges,
  isSaving,
  lastSaved,
  onSaveNow,
  enabled = true,
  className
}) => {
  const getStatusDisplay = () => {
    if (!enabled) {
      return {
        icon: <Wifi className="w-3 h-3" />,
        text: 'Hors ligne',
        color: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      };
    }
    
    if (isSaving) {
      return {
        icon: <Loader2 className="w-3 h-3 animate-spin" />,
        text: 'Sauvegarde...',
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      };
    }
    
    if (hasChanges) {
      return {
        icon: <AlertTriangle className="w-3 h-3" />,
        text: 'Non sauvegardé',
        color: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      };
    }
    
    if (lastSaved) {
      const diffMinutes = Math.floor((Date.now() - lastSaved.getTime()) / (1000 * 60));
      return {
        icon: <Check className="w-3 h-3" />,
        text: diffMinutes < 1 ? 'Sauvegardé' : `Sauvé il y a ${diffMinutes}min`,
        color: 'bg-green-500/20 text-green-400 border-green-500/30'
      };
    }
    
    return {
      icon: <HardDrive className="w-3 h-3" />,
      text: 'Prêt',
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
  };

  const status = getStatusDisplay();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border transition-all duration-300",
          status.color
        )}
      >
        {status.icon}
        <span className="font-medium">{status.text}</span>
        {hasChanges && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 bg-orange-400 rounded-full"
          />
        )}
      </motion.div>

      <AnimatePresence>
        {hasChanges && onSaveNow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="sm"
              onClick={onSaveNow}
              disabled={isSaving}
              className="h-7 px-3 text-xs bg-gradient-to-r from-[#8E44FF] to-[#8E44FF]/80 hover:from-[#8E44FF]/90 hover:to-[#8E44FF]/70 text-white border-none"
            >
              <Save className="w-3 h-3 mr-1" />
              Sauvegarder
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SaveIndicator;