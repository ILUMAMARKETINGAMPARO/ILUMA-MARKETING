import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Database,
  Key,
  UserCheck,
  Activity,
  Globe,
  Server,
  Fingerprint
} from 'lucide-react';

const SecurityMonitor = () => {
  const [securityMetrics, setSecurityMetrics] = useState({
    overallScore: 96,
    activeThreats: 0,
    blockedAttempts: 23,
    authenticatedUsers: 15,
    encryptionStatus: 'active',
    lastScan: '2 min ago'
  });

  const [securityFeatures, setSecurityFeatures] = useState([
    {
      name: 'Row Level Security (RLS)',
      status: 'active',
      description: 'Protection des données au niveau base',
      lastChecked: '1 min ago',
      coverage: 100
    },
    {
      name: 'API Rate Limiting',
      status: 'active',
      description: 'Protection contre les attaques DDoS',
      lastChecked: '3 min ago',
      coverage: 98
    },
    {
      name: 'JWT Authentication',
      status: 'active',
      description: 'Tokens sécurisés pour l\'authentification',
      lastChecked: '1 min ago',
      coverage: 100
    },
    {
      name: 'SSL/TLS Encryption',
      status: 'active',
      description: 'Chiffrement des communications',
      lastChecked: '5 min ago',
      coverage: 100
    },
    {
      name: 'Input Validation',
      status: 'active',
      description: 'Validation des données entrantes',
      lastChecked: '2 min ago',
      coverage: 95
    },
    {
      name: 'CORS Protection',
      status: 'active',
      description: 'Protection Cross-Origin',
      lastChecked: '1 min ago',
      coverage: 100
    }
  ]);

  const [recentEvents, setRecentEvents] = useState([
    {
      id: 1,
      type: 'success',
      event: 'Connexion sécurisée établie',
      user: 'sergio@ilumamarketing.com',
      timestamp: '2 min ago',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      type: 'warning',
      event: 'Tentative de connexion échouée',
      user: 'unknown@suspicious.com',
      timestamp: '5 min ago',
      ip: '10.0.0.1'
    },
    {
      id: 3,
      type: 'info',
      event: 'Scan de sécurité terminé',
      user: 'system',
      timestamp: '10 min ago',
      ip: 'internal'
    },
    {
      id: 4,
      type: 'success',
      event: 'Sauvegarde chiffrée créée',
      user: 'system',
      timestamp: '15 min ago',
      ip: 'internal'
    }
  ]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Eye;
      default: return Activity;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{securityMetrics.overallScore}%</div>
              <div className="text-white/60 text-sm">Score Sécurité</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <div className="text-2xl font-bold text-white">{securityMetrics.activeThreats}</div>
              <div className="text-white/60 text-sm">Menaces Actives</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Lock className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{securityMetrics.blockedAttempts}</div>
              <div className="text-white/60 text-sm">Tentatives Bloquées</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">{securityMetrics.authenticatedUsers}</div>
              <div className="text-white/60 text-sm">Utilisateurs Actifs</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Security Features Status */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">État des Protections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    feature.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <h4 className="font-semibold text-white">{feature.name}</h4>
                </div>
                <Badge className={
                  feature.status === 'active' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                }>
                  {feature.status}
                </Badge>
              </div>
              
              <p className="text-sm text-white/70 mb-3">{feature.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Couverture</span>
                  <span>{feature.coverage}%</span>
                </div>
                <Progress value={feature.coverage} className="h-2" />
                <div className="text-xs text-white/50">
                  Dernière vérification: {feature.lastChecked}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recent Security Events */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Événements de Sécurité</h3>
        <div className="space-y-3">
          {recentEvents.map((event, index) => {
            const IconComponent = getEventIcon(event.type);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-5 h-5 ${getEventColor(event.type)}`} />
                  <div>
                    <h4 className="font-medium text-white">{event.event}</h4>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span>Utilisateur: {event.user}</span>
                      <span>IP: {event.ip}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-white/50">{event.timestamp}</span>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Security Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 bg-blue-600 hover:bg-blue-700">
          <Fingerprint className="w-5 h-5 mr-2" />
          Scan Complet
        </Button>
        <Button className="h-16 bg-green-600 hover:bg-green-700">
          <Database className="w-5 h-5 mr-2" />
          Backup Sécurisé
        </Button>
        <Button className="h-16 bg-purple-600 hover:bg-purple-700">
          <Key className="w-5 h-5 mr-2" />
          Rotation Clés
        </Button>
      </div>
    </div>
  );
};

export default SecurityMonitor;