import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gauge, 
  Zap, 
  Database, 
  Server, 
  Globe,
  Activity,
  BarChart3,
  TrendingUp,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  Users
} from 'lucide-react';

const PerformanceOptimizer = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    overall: 94,
    apiResponse: 156,
    dbQueries: 89,
    pageLoad: 1.2,
    uptime: 99.9,
    activeUsers: 247,
    cacheHitRate: 87
  });

  const [systemResources, setSystemResources] = useState([
    {
      name: 'CPU Usage',
      value: 23,
      status: 'optimal',
      icon: Cpu,
      unit: '%'
    },
    {
      name: 'Memory Usage',
      value: 67,
      status: 'good',
      icon: HardDrive,
      unit: '%'
    },
    {
      name: 'Database Load',
      value: 45,
      status: 'optimal',
      icon: Database,
      unit: '%'
    },
    {
      name: 'Network I/O',
      value: 34,
      status: 'optimal',
      icon: Wifi,
      unit: 'Mbps'
    }
  ]);

  const [optimizations, setOptimizations] = useState([
    {
      id: 1,
      title: 'Cache Redis optimisé',
      description: 'Amélioration des temps de réponse de 40%',
      impact: 'high',
      status: 'active',
      savings: '2.3s'
    },
    {
      id: 2,
      title: 'Compression Gzip activée',
      description: 'Réduction de la bande passante de 65%',
      impact: 'medium',
      status: 'active',
      savings: '1.2MB'
    },
    {
      id: 3,
      title: 'Index de base de données',
      description: 'Requêtes 5x plus rapides',
      impact: 'high',
      status: 'active',
      savings: '890ms'
    },
    {
      id: 4,
      title: 'CDN Global activé',
      description: 'Livraison optimisée des assets',
      impact: 'medium',
      status: 'active',
      savings: '1.1s'
    }
  ]);

  const [cacheMetrics, setCacheMetrics] = useState([
    { name: 'Redis Cache', hitRate: 94, size: '2.3GB', requests: 15420 },
    { name: 'Browser Cache', hitRate: 87, size: '156MB', requests: 8930 },
    { name: 'CDN Cache', hitRate: 91, size: '4.7GB', requests: 23156 },
    { name: 'Query Cache', hitRate: 89, size: '890MB', requests: 12045 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500/20 border-green-500/30';
      case 'good': return 'bg-blue-500/20 border-blue-500/30';
      case 'warning': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'critical': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-white/10 border-white/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Gauge className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{performanceMetrics.overall}%</div>
              <div className="text-white/60 text-sm">Performance</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{performanceMetrics.apiResponse}ms</div>
              <div className="text-white/60 text-sm">Temps API</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">{performanceMetrics.uptime}%</div>
              <div className="text-white/60 text-sm">Uptime</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">{performanceMetrics.activeUsers}</div>
              <div className="text-white/60 text-sm">Utilisateurs</div>
            </div>
          </div>
        </Card>
      </div>

      {/* System Resources */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Ressources Système</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemResources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className={`w-6 h-6 ${getStatusColor(resource.status)}`} />
                  <Badge className={getStatusBg(resource.status)}>
                    {resource.status}
                  </Badge>
                </div>
                <h4 className="font-semibold text-white mb-2">{resource.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Usage actuel</span>
                    <span className="text-white font-bold">{resource.value}{resource.unit}</span>
                  </div>
                  <Progress value={resource.value} className="h-2" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Cache Performance */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Performance du Cache</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cacheMetrics.map((cache, index) => (
            <motion.div
              key={cache.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{cache.name}</h4>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {cache.hitRate}% hits
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Taille</span>
                  <span className="text-white">{cache.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Requêtes</span>
                  <span className="text-white">{cache.requests.toLocaleString()}</span>
                </div>
                <Progress value={cache.hitRate} className="h-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Active Optimizations */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Optimisations Actives</h3>
        <div className="space-y-4">
          {optimizations.map((optimization, index) => (
            <motion.div
              key={optimization.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div>
                  <h4 className="font-semibold text-white">{optimization.title}</h4>
                  <p className="text-sm text-white/70">{optimization.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={getImpactColor(optimization.impact)}>
                  {optimization.impact} impact
                </Badge>
                <div className="text-right">
                  <div className="text-green-400 font-bold">{optimization.savings}</div>
                  <div className="text-xs text-white/60">économisés</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Optimization Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 bg-green-600 hover:bg-green-700">
          <Zap className="w-5 h-5 mr-2" />
          Auto-Optimiser
        </Button>
        <Button className="h-16 bg-blue-600 hover:bg-blue-700">
          <Database className="w-5 h-5 mr-2" />
          Nettoyer Cache
        </Button>
        <Button className="h-16 bg-purple-600 hover:bg-purple-700">
          <BarChart3 className="w-5 h-5 mr-2" />
          Rapport Détaillé
        </Button>
      </div>
    </div>
  );
};

export default PerformanceOptimizer;