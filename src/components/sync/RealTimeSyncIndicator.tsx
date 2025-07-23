import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Bell, 
  BellOff,
  Activity,
  Zap,
  Brain,
  MessageCircle
} from 'lucide-react';
import { useRealTimeSync } from '@/hooks/useRealTimeSync.ts';
import { useToast } from '@/hooks/use-toast.ts';

const RealTimeSyncIndicator: React.FC = () => {
  const { isConnected, events, syncNow, clearOldEvents } = useRealTimeSync();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const { toast } = useToast();

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'insight': return Brain;
      case 'interaction': return MessageCircle;
      case 'analytics': return Activity;
      case 'automation': return Zap;
      default: return Bell;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'insight': return 'text-yellow-400';
      case 'interaction': return 'text-blue-400';
      case 'analytics': return 'text-green-400';
      case 'automation': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const recentEvents = events.slice(0, 5);
  const unreadCount = events.filter(e => 
    new Date(e.timestamp) > new Date(Date.now() - 30 * 60 * 1000)
  ).length;

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Indicateur principal */}
        <motion.div
          className={`
            p-3 rounded-full glass-effect border cursor-pointer
            ${isConnected ? 'border-green-400/50 bg-green-400/10' : 'border-red-400/50 bg-red-400/10'}
          `}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-400" />
            )}
            
            {unreadCount > 0 && (
              <Badge 
                variant="secondary" 
                className="bg-accent text-white text-xs px-1.5 py-0.5"
              >
                {unreadCount}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Panel étendu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="absolute top-16 right-0 w-80 p-4 glass-effect border border-white/20 rounded-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  <span className="text-white font-['Montserrat'] font-semibold">
                    Sync Temps Réel
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-1"
                  >
                    {showNotifications ? (
                      <Bell className="w-4 h-4 text-accent" />
                    ) : (
                      <BellOff className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={syncNow}
                    className="p-1"
                  >
                    <RefreshCw className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-white/70 text-sm">
                  {isConnected ? 'Connecté & Synchronisé' : 'Déconnecté'}
                </span>
              </div>

              {/* Événements récents */}
              <div className="space-y-2">
                <h4 className="text-white/80 text-sm font-medium mb-2">
                  Activité Récente
                </h4>
                
                {recentEvents.length === 0 ? (
                  <div className="text-white/50 text-sm text-center py-4">
                    Aucun événement récent
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {recentEvents.map((event) => {
                      const EventIcon = getEventIcon(event.type);
                      const eventColor = getEventColor(event.type);
                      
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-3 p-2 bg-white/5 rounded-lg"
                        >
                          <EventIcon className={`w-4 h-4 mt-0.5 ${eventColor}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-xs truncate">
                              {event.type === 'insight' && event.data.insight_data?.message}
                              {event.type === 'interaction' && 'Nouvelle interaction LILO™'}
                              {event.type === 'analytics' && `Module ${event.data.module_name} - ${event.data.action_type}`}
                              {event.type === 'automation' && 'Automatisation déclenchée'}
                            </div>
                            <div className="text-white/50 text-xs">
                              {new Date(event.timestamp).toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearOldEvents}
                  className="flex-1 text-xs"
                >
                  Effacer
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="flex-1 text-xs"
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RealTimeSyncIndicator;