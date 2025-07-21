import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Layers, Settings, Power, Zap, Target, Users, BarChart3, RefreshCw, AlertTriangle } from 'lucide-react';

const MPEControlCenter = () => {
  const [moduleStates, setModuleStates] = useState({
    adluma: true,
    blogia: true,
    hub: true,
    ila: true,
    landing: false
  });

  const mpeModules = [
    {
      id: 'adluma',
      name: 'ADLUMA',
      description: 'Module publicitaire intelligent avec IA',
      status: 'active',
      performance: 94,
      connections: 15,
      icon: Target,
      color: 'text-purple-400'
    },
    {
      id: 'blogia',
      name: 'BlogIA',
      description: 'Génération de contenu alimenté par IA',
      status: 'active',
      performance: 87,
      connections: 23,
      icon: BarChart3,
      color: 'text-blue-400'
    },
    {
      id: 'hub',
      name: 'Hub Services',
      description: 'Centre de coordination des services',
      status: 'active',
      performance: 91,
      connections: 31,
      icon: Layers,
      color: 'text-green-400'
    },
    {
      id: 'ila',
      name: 'ILA Calculator',
      description: 'Calculateur d\'intelligence landing avancée',
      status: 'active',
      performance: 96,
      connections: 8,
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      id: 'landing',
      name: 'Landing Pages',
      description: 'Générateur de pages d\'atterrissage',
      status: 'maintenance',
      performance: 0,
      connections: 0,
      icon: Users,
      color: 'text-red-400'
    }
  ];

  const interconnections = [
    { from: 'ADLUMA', to: 'ILA Calculator', strength: 85, status: 'strong' },
    { from: 'BlogIA', to: 'Hub Services', strength: 92, status: 'strong' },
    { from: 'Hub Services', to: 'ILA Calculator', strength: 78, status: 'moderate' },
    { from: 'ADLUMA', to: 'BlogIA', strength: 45, status: 'weak' },
    { from: 'Landing Pages', to: 'ILA Calculator', strength: 0, status: 'disconnected' }
  ];

  const systemAlerts = [
    {
      type: 'warning',
      message: 'Module Landing Pages en maintenance programmée',
      time: '14:30',
      priority: 'medium'
    },
    {
      type: 'info',
      message: 'Synchronisation MPE complétée avec succès',
      time: '14:15',
      priority: 'low'
    },
    {
      type: 'success',
      message: 'Performance globale optimisée (+12%)',
      time: '13:45',
      priority: 'high'
    }
  ];

  const toggleModule = (moduleId: string) => {
    setModuleStates(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'maintenance': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'error': return 'bg-red-500/20 border-red-500/30 text-red-300';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
    }
  };

  const getInterconnectionColor = (strength: number) => {
    if (strength > 80) return 'border-green-400';
    if (strength > 60) return 'border-yellow-400';
    if (strength > 0) return 'border-red-400';
    return 'border-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Centre de Contrôle MPE</h3>
              <p className="text-white/60">Gestion et monitoring des modules d'interconnexion</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Synchroniser
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>
      </Card>

      {/* Modules MPE Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mpeModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <module.icon className={`w-6 h-6 ${module.color}`} />
                  <div>
                    <h4 className="font-semibold text-white">{module.name}</h4>
                    <p className="text-white/60 text-sm">{module.description}</p>
                  </div>
                </div>
                <Switch
                  checked={moduleStates[module.id as keyof typeof moduleStates]}
                  onCheckedChange={() => toggleModule(module.id)}
                  disabled={module.status === 'maintenance'}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Statut</span>
                  <Badge className={getStatusColor(module.status)}>
                    {module.status === 'active' ? 'Actif' : 
                     module.status === 'maintenance' ? 'Maintenance' : 'Erreur'}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Performance</span>
                    <span className="text-white text-sm">{module.performance}%</span>
                  </div>
                  <Progress value={module.performance} className="h-2" />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Connexions</span>
                  <span className="text-white text-sm">{module.connections}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Interconnexions */}
      <Card className="glass-effect border-white/20 p-6">
        <h4 className="text-lg font-bold text-white mb-6">Matrice d'Interconnexions MPE</h4>
        <div className="space-y-4">
          {interconnections.map((connection, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 bg-white/5 rounded-lg border-l-4 ${getInterconnectionColor(connection.strength)}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-white font-medium">{connection.from}</div>
                <div className="text-white/60">→</div>
                <div className="text-white font-medium">{connection.to}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-white text-sm">{connection.strength}%</div>
                  <div className="text-white/60 text-xs capitalize">{connection.status}</div>
                </div>
                <Progress value={connection.strength} className="w-20 h-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Alertes Système */}
      <Card className="glass-effect border-white/20 p-6">
        <h4 className="text-lg font-bold text-white mb-6">Alertes Système</h4>
        <div className="space-y-3">
          {systemAlerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
            >
              <div className={`mt-1 ${
                alert.type === 'warning' ? 'text-yellow-400' :
                alert.type === 'success' ? 'text-green-400' : 'text-blue-400'
              }`}>
                {alert.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                 alert.type === 'success' ? <Zap className="w-4 h-4" /> :
                 <Settings className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white/60 text-xs">{alert.time}</span>
                  <Badge 
                    className={`text-xs ${
                      alert.priority === 'high' ? 'bg-red-500/20 border-red-500/30 text-red-300' :
                      alert.priority === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' :
                      'bg-blue-500/20 border-blue-500/30 text-blue-300'
                    }`}
                  >
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-white/80 text-sm">{alert.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MPEControlCenter;