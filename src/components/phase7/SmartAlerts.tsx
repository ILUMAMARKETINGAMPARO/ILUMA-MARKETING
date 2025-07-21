import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  TrendingUp, 
  DollarSign,
  Bell,
  Settings,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const SmartAlerts = () => {
  const [alerts] = useState([
    {
      id: 1,
      type: 'security',
      level: 'high',
      title: 'Tentative d\'accès non autorisée détectée',
      description: '3 tentatives de connexion échouées depuis une IP inconnue',
      timestamp: new Date(Date.now() - 300000),
      status: 'active',
      module: 'CRM'
    },
    {
      id: 2,
      type: 'performance',
      level: 'medium', 
      title: 'Temps de réponse API élevé',
      description: 'ADLUMA™ API: Temps de réponse > 2s',
      timestamp: new Date(Date.now() - 180000),
      status: 'investigating',
      module: 'ADLUMA™'
    }
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'security': return Shield;
      case 'performance': return TrendingUp;
      case 'business': return DollarSign;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{alerts.length}</div>
              <div className="text-white/60 text-sm">Alertes Actives</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-white/60 text-sm">Sécurité</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">156ms</div>
              <div className="text-white/60 text-sm">Réponse Moy.</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-white/60 text-sm">Uptime</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Alertes Intelligentes</h3>
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const IconComponent = getAlertIcon(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <IconComponent className="w-6 h-6 text-red-400" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{alert.title}</h4>
                    <p className="text-white/70 text-sm">{alert.description}</p>
                    <Badge className="mt-2 bg-red-500/20 text-red-300">
                      {alert.level}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default SmartAlerts;