import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, TrendingUp } from 'lucide-react';

const ActiveKnowledgeNodes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const knowledgeNodes = [
    {
      id: 'marketing-strategy',
      title: 'Stratégies Marketing Avancées',
      category: 'Marketing',
      connections: 234,
      contributors: 12,
      insights: 45,
      lastUpdate: '2h ago',
      trending: true
    },
    {
      id: 'ai-automation',
      title: 'Automatisation IA',
      category: 'Technology',
      connections: 189,
      contributors: 8,
      insights: 67,
      lastUpdate: '30min ago',
      trending: true
    },
    {
      id: 'customer-psychology',
      title: 'Psychologie Client',
      category: 'Psychology',
      connections: 156,
      contributors: 15,
      insights: 34,
      lastUpdate: '1h ago',
      trending: false
    },
    {
      id: 'data-visualization',
      title: 'Visualisation de Données',
      category: 'Analytics',
      connections: 198,
      contributors: 6,
      insights: 78,
      lastUpdate: '45min ago',
      trending: true
    }
  ];

  return (
    <Card className="glass-effect border-white/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Nœuds de Connaissances Actifs</h3>
        <div className="flex items-center gap-2">
          <select 
            className="bg-black/40 border border-white/20 rounded px-3 py-1 text-white text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Toutes catégories</option>
            <option value="marketing">Marketing</option>
            <option value="technology">Technology</option>
            <option value="analytics">Analytics</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {knowledgeNodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                <h4 className="font-medium text-white">{node.title}</h4>
              </div>
              {node.trending && (
                <Badge className="bg-red-500/20 border-red-500/30 text-red-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-xs mb-3">
              <div className="text-center">
                <div className="text-emerald-300 font-medium">{node.connections}</div>
                <div className="text-white/60">Connexions</div>
              </div>
              <div className="text-center">
                <div className="text-blue-300 font-medium">{node.contributors}</div>
                <div className="text-white/60">Contributeurs</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-300 font-medium">{node.insights}</div>
                <div className="text-white/60">Insights</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-white/50">
              <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300">
                {node.category}
              </Badge>
              <span>Mis à jour {node.lastUpdate}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default ActiveKnowledgeNodes;