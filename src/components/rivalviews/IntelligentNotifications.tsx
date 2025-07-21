import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, TrendingUp, AlertTriangle, Target, Users, Calendar, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'opportunity' | 'warning' | 'success' | 'info';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  businessId?: string;
  businessName?: string;
  actionUrl?: string;
  timestamp: Date;
  read: boolean;
}

interface IntelligentNotificationsProps {
  onNotificationClick?: (notification: Notification) => void;
}

const IntelligentNotifications: React.FC<IntelligentNotificationsProps> = ({
  onNotificationClick
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simuler des notifications intelligentes basées sur l'IA
  useEffect(() => {
    const generateIntelligentNotifications = () => {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'opportunity',
          title: 'Opportunité détectée',
          message: 'Restaurant La Belle Époque (ILA: 45) montre des signes d\'expansion. Score de potentiel élevé.',
          priority: 'high',
          businessId: 'business_1',
          businessName: 'Restaurant La Belle Époque',
          actionUrl: '/rivalviews?business=business_1',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          read: false
        },
        {
          id: '2',
          type: 'warning',
          title: 'Concurrent actif',
          message: 'Café du Coin a augmenté son budget Google Ads de 40% ce mois-ci.',
          priority: 'medium',
          businessId: 'business_2',
          businessName: 'Café du Coin',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: false
        },
        {
          id: '3',
          type: 'success',
          title: 'Amélioration détectée',
          message: 'Boulangerie Martin (ILA: 72) a gagné 15 points ce mois. Stratégie payante.',
          priority: 'medium',
          businessId: 'business_3',
          businessName: 'Boulangerie Martin',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          read: true
        },
        {
          id: '4',
          type: 'info',
          title: 'Nouvelle tendance locale',
          message: '23% d\'augmentation des recherches "livraison rapide" dans votre zone.',
          priority: 'low',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          read: false
        },
        {
          id: '5',
          type: 'opportunity',
          title: 'Moment optimal détecté',
          message: 'Vendredi 15h: pic d\'activité local prévu. Boostez vos campagnes maintenant.',
          priority: 'high',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
          read: false
        }
      ];

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    };

    generateIntelligentNotifications();

    // Simuler des nouvelles notifications toutes les 2 minutes
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ['opportunity', 'warning', 'info'][Math.floor(Math.random() * 3)] as any,
        title: 'Nouvelle opportunité IA',
        message: 'Notre IA a détecté une nouvelle opportunité dans votre zone.',
        priority: 'medium',
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [newNotification, ...prev].slice(0, 10));
      setUnreadCount(prev => prev + 1);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'success': return <TrendingUp className="w-4 h-4 text-blue-400" />;
      default: return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}j`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative text-white/70 hover:text-white"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </Button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 w-96 z-50"
          >
            <Card className="bg-black/95 border-[#8E44FF]/30 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg font-['Montserrat'] flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#8E44FF]" />
                    Notifications IA
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs text-white/60 hover:text-white"
                      >
                        Tout lire
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 max-h-96 overflow-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-white/60">
                    <Bell className="w-12 h-12 mx-auto mb-3 text-white/30" />
                    <p>Aucune notification</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                          !notification.read ? 'bg-white/5' : 'bg-white/2'
                        } hover:bg-white/10 cursor-pointer transition-colors`}
                        onClick={() => {
                          markAsRead(notification.id);
                          onNotificationClick?.(notification);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-sm font-semibold ${
                                !notification.read ? 'text-white' : 'text-white/80'
                              }`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-white/50">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                            </div>
                            <p className={`text-sm ${
                              !notification.read ? 'text-white/90' : 'text-white/60'
                            }`}>
                              {notification.message}
                            </p>
                            {notification.businessName && (
                              <div className="mt-2 flex items-center justify-between">
                                <Badge variant="outline" className="text-xs border-[#8E44FF]/30 text-[#8E44FF]">
                                  {notification.businessName}
                                </Badge>
                                {notification.actionUrl && (
                                  <ExternalLink className="w-3 h-3 text-white/40" />
                                )}
                              </div>
                            )}
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#8E44FF] rounded-full mt-2"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntelligentNotifications;