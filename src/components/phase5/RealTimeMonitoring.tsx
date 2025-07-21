import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Wifi, Server, Users, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const RealTimeMonitoring = () => {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulation des mises à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const systemStatus = [
    { name: 'API ILUMA', status: 'operational', uptime: '99.9%', responseTime: '45ms', icon: Server },
    { name: 'Module ADLUMA', status: 'operational', uptime: '99.8%', responseTime: '32ms', icon: CheckCircle },
    { name: 'BlogIA Engine', status: 'warning', uptime: '98.5%', responseTime: '120ms', icon: AlertCircle },
    { name: 'Hub Services', status: 'operational', uptime: '99.7%', responseTime: '28ms', icon: CheckCircle },
    { name: 'ILA Calculator', status: 'operational', uptime: '99.9%', responseTime: '15ms', icon: CheckCircle }
  ];

  const liveMetrics = [
    { title: 'Utilisateurs Actifs', value: '1,247', change: '+12', icon: Users, color: 'text-blue-400' },
    { title: 'Requêtes/Seconde', value: '156', change: '+8', icon: Activity, color: 'text-green-400' },
    { title: 'Temps de Réponse Moyen', value: '34ms', change: '-5ms', icon: Clock, color: 'text-purple-400' },
    { title: 'Taux de Succès', value: '99.2%', change: '+0.3%', icon: TrendingUp, color: 'text-cyan-400' }
  ];

  const recentEvents = [
    { time: '14:32:15', type: 'info', message: 'Nouveau client connecté au module ADLUMA' },
    { time: '14:31:45', type: 'success', message: 'Calcul ILA terminé avec succès (Score: 94)' },
    { time: '14:30:22', type: 'warning', message: 'Latence élevée détectée sur BlogIA (120ms)' },
    { time: '14:29:10', type: 'info', message: 'Synchronisation des données MPE terminée' },
    { time: '14:28:33', type: 'success', message: 'Backup automatique effectué avec succès' }
  ];

  const performanceData = [
    { name: 'CPU', value: 45, status: 'normal' },
    { name: 'Mémoire', value: 68, status: 'normal' },
    { name: 'Stockage', value: 23, status: 'normal' },
    { name: 'Réseau', value: 12, status: 'normal' },
    { name: 'Base de Données', value: 89, status: 'warning' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'warning': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'error': return 'bg-red-500/20 border-red-500/30 text-red-300';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec statut en direct */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity className="w-8 h-8 text-green-400" />
              {isLive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Monitoring Temps Réel</h3>
              <p className="text-white/60">Dernière mise à jour : {lastUpdate.toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-400" />
            <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
              En Direct
            </Badge>
          </div>
        </div>
      </Card>

      {/* Métriques en Temps Réel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 p-6">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                <span className="text-green-400 text-sm font-medium">{metric.change}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-white/60 text-sm">{metric.title}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Statut des Services */}
      <Card className="glass-effect border-white/20 p-6">
        <h4 className="text-lg font-bold text-white mb-6">Statut des Services</h4>
        <div className="space-y-4">
          {systemStatus.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-4">
                <service.icon className={`w-5 h-5 ${service.status === 'operational' ? 'text-green-400' : 'text-yellow-400'}`} />
                <div>
                  <h5 className="font-medium text-white">{service.name}</h5>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>Uptime: {service.uptime}</span>
                    <span>Réponse: {service.responseTime}</span>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(service.status)}>
                {service.status === 'operational' ? 'Opérationnel' : 'Attention'}
              </Badge>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Performance du Système et Événements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance */}
        <Card className="glass-effect border-white/20 p-6">
          <h4 className="text-lg font-bold text-white mb-6">Performance Système</h4>
          <div className="space-y-4">
            {performanceData.map((item, index) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">{item.name}</span>
                  <span className={`text-sm ${item.status === 'warning' ? 'text-yellow-400' : 'text-white/60'}`}>
                    {item.value}%
                  </span>
                </div>
                <Progress 
                  value={item.value} 
                  className={`h-2 ${item.status === 'warning' ? 'bg-yellow-500/20' : ''}`}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Événements Récents */}
        <Card className="glass-effect border-white/20 p-6">
          <h4 className="text-lg font-bold text-white mb-6">Événements Récents</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${getEventTypeColor(event.type)}`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/60 text-xs">{event.time}</span>
                    <Badge 
                      className={`text-xs ${
                        event.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-300' :
                        event.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' :
                        'bg-blue-500/20 border-blue-500/30 text-blue-300'
                      }`}
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-white/80 text-sm">{event.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;