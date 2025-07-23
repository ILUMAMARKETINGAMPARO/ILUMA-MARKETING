import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, AlertTriangle, Info, Zap, Clock, Users, Settings } from 'lucide-react';

const RealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Projet ADLUMA Mis à Jour',
      message: 'Le score ILA a augmenté de 15 points',
      timestamp: new Date(),
      read: false,
      urgent: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Attention Requise',
      message: 'Le trafic sur KatzSport a baissé de 12%',
      timestamp: new Date(Date.now() - 300000),
      read: false,
      urgent: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Nouveau Lead',
      message: 'Un prospect s\'est inscrit via la landing page',
      timestamp: new Date(Date.now() - 600000),
      read: true,
      urgent: false
    }
  ]);

  const [liveStats, setLiveStats] = useState({
    activeUsers: 247,
    todayNotifications: 38,
    avgResponseTime: 2.4,
    systemStatus: 'optimal'
  });

  // Simulation de notifications temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification = {
          id: Date.now(),
          type: ['success', 'warning', 'info'][Math.floor(Math.random() * 3)] as 'success' | 'warning' | 'info',
          title: 'Nouvelle Activité Détectée',
          message: 'Activité automatique générée pour la démonstration',
          timestamp: new Date(),
          read: false,
          urgent: Math.random() > 0.8
        };
        
        setNotifications(prev => [newNotification, ...prev].slice(0, 10));
        setLiveStats(prev => ({
          ...prev,
          todayNotifications: prev.todayNotifications + 1,
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getNotificationIcon = (type: string, urgent: boolean) => {
    const iconClass = urgent ? "animate-pulse" : "";
    switch (type) {
      case 'success': return <CheckCircle className={`w-5 h-5 text-green-400 ${iconClass}`} />;
      case 'warning': return <AlertTriangle className={`w-5 h-5 text-yellow-400 ${iconClass}`} />;
      default: return <Info className={`w-5 h-5 text-blue-400 ${iconClass}`} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <div>
              <div className="text-2xl font-bold text-white">{liveStats.activeUsers}</div>
              <div className="text-white/60 text-sm">Utilisateurs Actifs</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{liveStats.todayNotifications}</div>
              <div className="text-white/60 text-sm">Notifications Aujourd'hui</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">{liveStats.avgResponseTime}s</div>
              <div className="text-white/60 text-sm">Temps de Réponse</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-lg font-bold text-white capitalize">{liveStats.systemStatus}</div>
              <div className="text-white/60 text-sm">État Système</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Real-Time Notifications Feed */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold text-white">Flux Temps Réel</h3>
            {unreadCount > 0 && (
              <Badge className="bg-red-500/20 border-red-500/30 text-red-300">
                {unreadCount} non lues
              </Badge>
            )}
          </div>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                  notification.read 
                    ? 'bg-white/5 border-white/10' 
                    : notification.urgent
                    ? 'bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/20'
                    : 'bg-green-500/10 border-green-500/30'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  {getNotificationIcon(notification.type, notification.urgent)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        {notification.title}
                        {notification.urgent && (
                          <Badge className="bg-red-500/20 border-red-500/30 text-red-300 text-xs">
                            URGENT
                          </Badge>
                        )}
                      </h4>
                      <span className="text-xs text-white/60">
                        {notification.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>

      {/* Notification Channels */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Canaux de Notification</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Push Browser</span>
            </div>
            <p className="text-white/60 text-sm">Notifications instantanées dans le navigateur</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Slack/Teams</span>
            </div>
            <p className="text-white/60 text-sm">Intégration avec vos outils de travail</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Webhooks</span>
            </div>
            <p className="text-white/60 text-sm">Automatisation via API personnalisées</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RealTimeNotifications;

