import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Link2, 
  Database, 
  Map, 
  Brain, 
  Target, 
  BarChart3,
  Users,
  Globe,
  Zap,
  Check,
  AlertCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useInterconnection } from '@/contexts/InterconnectionContext';

const IntegrationHub = () => {
  const { isConnected, toggleConnection, dataFlows, syncAllModules } = useInterconnection();
  const [lastSync, setLastSync] = useState<Date>(new Date());

  const modules = [
    {
      id: 'crm',
      name: 'CRM Iluma™',
      icon: Users,
      status: 'connected',
      health: 98,
      description: 'Gestion clients intelligente avec IA',
      lastActivity: '2 min',
      flows: 47
    },
    {
      id: 'revalviews',
      name: 'RivalViews™',
      icon: Map,
      status: 'connected',
      health: 94,
      description: 'Carte interactive entreprises',
      lastActivity: '5 min',
      flows: 23
    },
    {
      id: 'adluma',
      name: 'ADLUMA™',
      icon: BarChart3,
      status: 'connected',
      health: 96,
      description: 'Simulateur publicité intelligente',
      lastActivity: '1 min',
      flows: 31
    },
    {
      id: 'ilumatch',
      name: 'ILUMATCH™',
      icon: Target,
      status: 'connected',
      health: 92,
      description: 'Matching partenaires automatique',
      lastActivity: '8 min',
      flows: 18
    },
    {
      id: 'blogia',
      name: 'BlogIA',
      icon: Globe,
      status: 'connected',
      health: 89,
      description: 'Génération contenu IA contextuel',
      lastActivity: '12 min',
      flows: 14
    },
    {
      id: 'ila',
      name: 'Score ILA™',
      icon: Brain,
      status: 'connected',
      health: 100,
      description: 'Calcul score visibilité temps réel',
      lastActivity: '1 min',
      flows: 67
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'warning': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'error': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-white/60 border-white/20 bg-white/10';
    }
  };

  const handleSync = async () => {
    await syncAllModules();
    setLastSync(new Date());
  };

  return (
    <div className="space-y-8">
      {/* Header avec contrôles globaux */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-2">
            Hub d'Intégration Iluma™
          </h2>
          <p className="text-white/70">
            Gestion centralisée des connexions inter-modules
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Interconnexion globale</span>
            <Switch
              checked={isConnected}
              onCheckedChange={toggleConnection}
              className="data-[state=checked]:bg-[#8E44FF]"
            />
          </div>
          <Button
            onClick={handleSync}
            className="bg-[#8E44FF] hover:bg-[#8E44FF]/80"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Synchroniser
          </Button>
        </div>
      </div>

      {/* Status global */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#8E44FF] mb-1">
              {modules.filter(m => m.status === 'connected').length}
            </div>
            <div className="text-sm text-white/60">Modules connectés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#FFD56B] mb-1">
              {dataFlows.length}
            </div>
            <div className="text-sm text-white/60">Flux de données</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00FF88] mb-1">
              {Math.round(modules.reduce((acc, m) => acc + m.health, 0) / modules.length)}%
            </div>
            <div className="text-sm text-white/60">Santé globale</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {lastSync.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            <div className="text-sm text-white/60">Dernière sync</div>
          </div>
        </div>
      </Card>

      {/* Grille des modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          const IconComponent = module.icon;
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#8E44FF]/20 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#8E44FF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white font-['Montserrat']">
                        {module.name}
                      </h3>
                      <Badge className={getStatusColor(module.status)}>
                        {module.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {module.status === 'connected' && (
                      <Check className="w-5 h-5 text-green-400" />
                    )}
                    {module.status === 'warning' && (
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-4">
                  {module.description}
                </p>

                {/* Santé du module */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Santé</span>
                    <span className="text-white font-bold">{module.health}%</span>
                  </div>
                  <Progress value={module.health} className="h-2" />
                </div>

                {/* Métriques */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/50 mb-1">Dernière activité</div>
                    <div className="text-white font-medium">{module.lastActivity}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Flux actifs</div>
                    <div className="text-[#8E44FF] font-bold">{module.flows}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    Configurer
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#8E44FF]/20 hover:bg-[#8E44FF]/30 text-[#8E44FF] border border-[#8E44FF]/30"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Flux de données en temps réel */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#FFD56B]" />
          Flux de Données Temps Réel
        </h3>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {dataFlows.slice(0, 10).map((flow) => (
            <div
              key={flow.id}
              className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  flow.processed ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'
                }`} />
                <span className="text-sm text-white">
                  {flow.sourceModule} → {flow.targetModule}
                </span>
                <Badge className="text-xs bg-[#8E44FF]/20 text-[#8E44FF]">
                  {flow.dataType}
                </Badge>
              </div>
              
              <div className="text-xs text-white/50">
                {flow.timestamp.toLocaleTimeString('fr-FR')}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default IntegrationHub;