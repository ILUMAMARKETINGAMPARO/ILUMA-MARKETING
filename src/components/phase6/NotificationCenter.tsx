import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail, MessageSquare, AlertTriangle, CheckCircle, Clock, Settings } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Score ILA™ Optimisé',
      message: 'Client "Katz Sport": Score ILA™ augmenté de 73 → 89 (+16 points)',
      timestamp: '2 min ago',
      read: false,
      source: 'ILA™',
      action: 'view_score'
    },
    {
      id: 2,
      type: 'info',
      title: 'Nouveau Match ILUMATCH™',
      message: '3 partenaires potentiels détectés pour "Restaurant Chez Mario"',
      timestamp: '15 min ago',
      read: false,
      source: 'ILUMATCH™',
      action: 'view_matches'
    },
    {
      id: 3,
      type: 'success',
      title: 'Synchronisation RivalViews™',
      message: '127 nouvelles entreprises synchronisées depuis la carte',
      timestamp: '1 hour ago',
      read: true,
      source: 'RivalViews™',
      action: 'view_map'
    },
    {
      id: 4,
      type: 'warning',
      title: 'ADLUMA™ - Budget Optimal',
      message: 'Suggestion: Augmenter le budget de 200€ pour +34% d\'impressions',
      timestamp: '2 hours ago',
      read: false,
      source: 'ADLUMA™',
      action: 'optimize_budget'
    },
    {
      id: 5,
      type: 'info',
      title: 'BlogIA - Contenu Généré',
      message: 'Nouvel article SEO: "Optimiser sa visibilité locale" basé sur vos données',
      timestamp: '3 hours ago',
      read: true,
      source: 'BlogIA',
      action: 'view_article'
    },
    {
      id: 6,
      type: 'success',
      title: 'CRM - Lead Qualifié',
      message: 'LILO™ a détecté un lead haute valeur: "Clinique Dentaire Plus"',
      timestamp: '4 hours ago',
      read: false,
      source: 'CRM + LILO™',
      action: 'view_lead'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    inApp: true,
    sms: false,
    slack: true
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Bell className="w-5 h-5 text-blue-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{unreadCount}</div>
              <div className="text-white/60 text-sm">Non Lues</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">156</div>
              <div className="text-white/60 text-sm">Emails Envoyés</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">42</div>
              <div className="text-white/60 text-sm">Push Envoyés</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">24h</div>
              <div className="text-white/60 text-sm">Dernière Alert</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Notifications Récentes</h3>
          <div className="flex gap-3">
            <Button 
              size="sm" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={markAllAsRead}
            >
              Tout Marquer Lu
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                notification.read 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-indigo-500/10 border-indigo-500/30'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-4">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-white">{notification.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                        {notification.source}
                      </Badge>
                      <span className="text-xs text-white/60">{notification.timestamp}</span>
                    </div>
                  </div>
                   <p className="text-white/70 text-sm">{notification.message}</p>
                   {notification.action && (
                     <Button
                       size="sm"
                       className="mt-2 bg-[#8E44FF]/20 hover:bg-[#8E44FF]/30 text-[#8E44FF] border border-[#8E44FF]/30"
                     >
                       Action rapide
                     </Button>
                   )}
                 </div>
                 {!notification.read && (
                   <div className="w-2 h-2 bg-[#8E44FF] rounded-full animate-pulse" />
                 )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Paramètres de Notification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                {key === 'email' && <Mail className="w-5 h-5 text-white/60" />}
                {key === 'push' && <Bell className="w-5 h-5 text-white/60" />}
                {key === 'inApp' && <MessageSquare className="w-5 h-5 text-white/60" />}
                {key === 'sms' && <MessageSquare className="w-5 h-5 text-white/60" />}
                {key === 'slack' && <MessageSquare className="w-5 h-5 text-white/60" />}
                <span className="text-white capitalize">{key === 'inApp' ? 'In-App' : key}</span>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => 
                  setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                }
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NotificationCenter;