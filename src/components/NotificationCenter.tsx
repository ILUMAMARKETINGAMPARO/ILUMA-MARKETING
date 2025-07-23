import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, X, TrendingUp, AlertTriangle, CheckCircle, Info, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Campagne AIMANT™ - Objectif atteint',
      description: 'Votre campagne a généré 150 leads ce mois, dépassant l\'objectif de 20%',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      actionUrl: '/campaigns/1'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Budget campagne bientôt épuisé',
      description: 'Il reste 15% du budget pour la campagne "SEO IA E-commerce"',
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
      actionUrl: '/campaigns/2'
    },
    {
      id: '3',
      type: 'info',
      title: 'Nouveau rapport disponible',
      description: 'Votre rapport mensuel de performance est prêt à être consulté',
      timestamp: '2024-01-14T16:00:00Z',
      read: true,
      actionUrl: '/reports'
    },
    {
      id: '4',
      type: 'error',
      title: 'Problème détecté sur landing page',
      description: 'Taux de conversion en baisse de 15% sur la page "Services B2B"',
      timestamp: '2024-01-14T14:20:00Z',
      read: false,
      actionUrl: '/landing-pages/services-b2b'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'warning':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'error':
        return 'from-red-500/20 to-pink-500/20 border-red-500/30';
      default:
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a moins d\'1h';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative glass-effect border-white/20 text-white hover:bg-white/10">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-5 h-5 text-xs flex items-center justify-center p-0">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-96 glass-effect border-white/20 bg-black/90 p-0 max-h-96 overflow-y-auto"
        align="end"
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-white/70 hover:text-white text-xs hover:bg-white/10"
                >
                  Tout marquer comme lu
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {unreadCount > 0 && (
            <p className="text-white/60 text-sm mt-1">
              {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <Bell className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/60">Aucune notification</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                  !notification.read ? 'bg-white/5' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${
                          notification.read ? 'text-white/80' : 'text-white'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className="text-white/60 text-xs mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-white/40 text-xs mt-2">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 w-6 p-0 text-white/50 hover:text-white hover:bg-white/10"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="h-6 w-6 p-0 text-white/50 hover:text-white hover:bg-white/10"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    {notification.actionUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 mt-2 text-xs bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30"
                      >
                        Voir détails
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <DropdownMenuSeparator className="bg-white/10" />
        <div className="p-2">
          <Button 
            variant="ghost" 
            className="w-full text-white/70 hover:text-white hover:bg-white/10 justify-center"
          >
            Voir toutes les notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;