import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Key, Globe, Shield, Activity, AlertCircle, CheckCircle, Copy } from 'lucide-react';

const APIConnectors = () => {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Iluma™ Core API',
      key: 'iluma_live_sk_1234567890abcdef',
      type: 'Production',
      status: 'active',
      usage: 85,
      limit: 10000,
      created: '2024-01-15',
      lastUsed: '2 min ago',
      modules: ['CRM', 'ILA™', 'ADLUMA™']
    },
    {
      id: 2,
      name: 'RivalViews™ Sync API',
      key: 'reval_sk_0987654321fedcba',
      type: 'Integration',
      status: 'active',
      usage: 67,
      limit: 5000,
      created: '2024-02-01',
      lastUsed: '5 min ago',
      modules: ['RivalViews™', 'CRM']
    },
    {
      id: 3,
      name: 'ILUMATCH™ Connect API',
      key: 'match_sk_abc123def456',
      type: 'Integration',
      status: 'active',
      usage: 34,
      limit: 3000,
      created: '2024-02-10',
      lastUsed: '1 hour ago',
      modules: ['ILUMATCH™', 'ILA™']
    },
    {
      id: 4,
      name: 'BlogIA Generator API',
      key: 'blog_sk_xyz789uvw012',
      type: 'Content',
      status: 'active',
      usage: 12,
      limit: 1000,
      created: '2024-02-15',
      lastUsed: '3 hours ago',
      modules: ['BlogIA', 'CRM']
    }
  ]);

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/ila/score',
      description: 'Calcule et récupère le score ILA™',
      category: 'ILA™'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/adluma/simulate',
      description: 'Lance une simulation ADLUMA™',
      category: 'ADLUMA™'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/ilumatch/partners',
      description: 'Trouve des partenaires compatibles',
      category: 'ILUMATCH™'
    },
    {
      method: 'PUT',
      endpoint: '/api/v1/revalviews/sync',
      description: 'Synchronise les données RivalViews™',
      category: 'RivalViews™'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/blogia/generate',
      description: 'Génère du contenu IA contextuel',
      category: 'BlogIA'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/crm/insights',
      description: 'Récupère les insights CRM intelligents',
      category: 'CRM'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500';
      case 'POST': return 'bg-blue-500';
      case 'PUT': return 'bg-yellow-500';
      case 'DELETE': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* API Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Key className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{apiKeys.length}</div>
              <div className="text-white/60 text-sm">Clés API</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">2.4K</div>
              <div className="text-white/60 text-sm">Requêtes/Jour</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-white/60 text-sm">Uptime API</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">TLS 1.3</div>
              <div className="text-white/60 text-sm">Sécurité</div>
            </div>
          </div>
        </Card>
      </div>

      {/* API Keys Management */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Gestion des Clés API</h3>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Key className="w-4 h-4 mr-2" />
            Nouvelle Clé
          </Button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey, index) => (
            <motion.div
              key={apiKey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    apiKey.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                  }`} />
                  <h4 className="font-semibold text-white">{apiKey.name}</h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      apiKey.type === 'Production' 
                        ? 'border-red-500/30 text-red-300' 
                        : 'border-blue-500/30 text-blue-300'
                    }`}
                  >
                    {apiKey.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => copyToClipboard(apiKey.key)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-white/60 mb-1">Clé API</div>
                  <div className="font-mono text-sm text-white bg-black/20 p-2 rounded">
                    {apiKey.key.slice(0, 20)}...
                  </div>
                </div>
                 <div>
                   <div className="text-xs text-white/60 mb-1">Utilisation</div>
                   <div className="flex items-center gap-2">
                     <Progress value={apiKey.usage} className="flex-1" />
                     <span className="text-sm text-white">{apiKey.usage}%</span>
                   </div>
                   <div className="text-xs text-white/60 mt-1">
                     {Math.round(apiKey.limit * apiKey.usage / 100)} / {apiKey.limit} requêtes
                   </div>
                   {apiKey.modules && (
                     <div className="flex gap-1 mt-2">
                       {apiKey.modules.map((module) => (
                         <Badge key={module} className="text-xs bg-[#8E44FF]/20 text-[#8E44FF]">
                           {module}
                         </Badge>
                       ))}
                     </div>
                   )}
                 </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Créée le {apiKey.created}</span>
                <span>Dernière utilisation: {apiKey.lastUsed}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* API Documentation */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Documentation API</h3>
        <div className="space-y-3">
          {apiEndpoints.map((endpoint, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-4">
                <Badge className={`${getMethodColor(endpoint.method)} text-white font-mono text-xs`}>
                  {endpoint.method}
                </Badge>
                <code className="text-white font-mono">{endpoint.endpoint}</code>
                <span className="text-white/70 text-sm">{endpoint.description}</span>
              </div>
              <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                {endpoint.category}
              </Badge>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-white">Base URL</span>
          </div>
          <code className="text-[#8E44FF] font-mono">https://api.iluma-marketing.com/v1</code>
        </div>
      </Card>
    </div>
  );
};

export default APIConnectors;