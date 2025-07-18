import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Cloud,
  CloudOff,
  Wifi,
  WifiOff
} from 'lucide-react';

interface AutoSaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error' | 'offline';
  lastSaved?: Date;
  nextSave?: Date;
  itemsChanged?: number;
}

const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  lastSaved,
  nextSave,
  itemsChanged = 0
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [timeAgo, setTimeAgo] = useState('');

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update time ago
  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diff = now.getTime() - lastSaved.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      if (seconds < 60) {
        setTimeAgo('À l\'instant');
      } else if (minutes < 60) {
        setTimeAgo(`Il y a ${minutes} min`);
      } else {
        setTimeAgo(`Il y a ${hours}h`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [lastSaved]);

  const getStatusConfig = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30',
        message: 'Hors ligne',
        pulse: false
      };
    }

    switch (status) {
      case 'saving':
        return {
          icon: Loader2,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/30',
          message: 'Sauvegarde...',
          pulse: true,
          spinning: true
        };
      case 'saved':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          message: 'Sauvegardé',
          pulse: false
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-400',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          message: 'Erreur de sauvegarde',
          pulse: true
        };
      case 'offline':
        return {
          icon: CloudOff,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          message: 'Mode hors ligne',
          pulse: false
        };
      default:
        return {
          icon: Cloud,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          message: 'En attente',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-40"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={status + isOnline.toString()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Badge className={`${config.bgColor} ${config.color} ${config.borderColor} border px-3 py-2 font-['Montserrat']`}>
            <div className="flex items-center gap-2">
              <motion.div
                animate={config.spinning ? { rotate: 360 } : {}}
                transition={config.spinning ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
              >
                <IconComponent className={`w-4 h-4 ${config.pulse ? 'animate-pulse' : ''}`} />
              </motion.div>
              
              <div className="flex flex-col">
                <span className="text-xs font-medium">
                  {config.message}
                </span>
                {lastSaved && status === 'saved' && (
                  <span className="text-xs opacity-70">
                    {timeAgo}
                  </span>
                )}
                {itemsChanged > 0 && status !== 'saving' && (
                  <span className="text-xs opacity-70">
                    {itemsChanged} modification{itemsChanged > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </Badge>
        </motion.div>
      </AnimatePresence>

      {/* Network status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOnline ? 0 : 1 }}
        className="absolute -bottom-2 -right-2"
      >
        <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-background flex items-center justify-center">
          <WifiOff className="w-2 h-2 text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AutoSaveIndicator;