import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Network, Lightbulb, TrendingUp, Users, Eye } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface KnowledgeNode {
  id: string;
  title: string;
  category: string;
  relevance: number;
  connections: number;
  insights: string[];
  lastAccessed: string;
}

interface LiloKnowledgeEngineProps {
  userId?: string;
  module: string;
  onInsightSelect?: (insight: string) => void;
}

const LiloKnowledgeEngine: React.FC<LiloKnowledgeEngineProps> = ({
  userId,
  module,
  onInsightSelect
}) => {
  const { t } = useLanguage();
  const [activeNodes, setActiveNodes] = useState<KnowledgeNode[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLearning, setIsLearning] = useState(false);

  const categories = ['all', 'analytics', 'marketing', 'design', 'strategy', 'technology'];

  const mockKnowledgeNodes: KnowledgeNode[] = [
    {
      id: 'analytics-trends',
      title: 'Tendances Analytics Q4 2024',
      category: 'analytics',
      relevance: 95,
      connections: 23,
      insights: [
        'Les conversions mobiles augmentent de 34%',
        'Le taux d\'engagement vocal croît de 87%',
        'L\'IA prédictive améliore les résultats de 45%'
      ],
      lastAccessed: '2024-01-15T10:30:00Z'
    },
    {
      id: 'marketing-automation',
      title: 'Automatisation Marketing Avancée',
      category: 'marketing',
      relevance: 88,
      connections: 31,
      insights: [
        'Personnalisation dynamique booste ROI de 67%',
        'Séquences multi-canal optimisent conversions',
        'IA comportementale prédit intentions d\'achat'
      ],
      lastAccessed: '2024-01-15T09:15:00Z'
    },
    {
      id: 'ux-psychology',
      title: 'Psychologie UX & Conversion',
      category: 'design',
      relevance: 91,
      connections: 19,
      insights: [
        'Micro-interactions augmentent engagement de 52%',
        'Design émotionnel influence décisions d\'achat',
        'Architecture cognitive améliore parcours utilisateur'
      ],
      lastAccessed: '2024-01-15T08:45:00Z'
    }
  ];

  useEffect(() => {
    // Simuler le chargement des nœuds de connaissance
    setIsLearning(true);
    setTimeout(() => {
      setActiveNodes(mockKnowledgeNodes);
      setIsLearning(false);
    }, 1500);
  }, [module]);

  const filteredNodes = selectedCategory === 'all' 
    ? activeNodes 
    : activeNodes.filter(node => node.category === selectedCategory);

  const handleLearnMore = async (nodeId: string) => {
    setIsLearning(true);
    // Simuler l'apprentissage approfondi
    setTimeout(() => {
      setIsLearning(false);
    }, 1000);
  };

  return (
    <Card className="glass-effect border-purple-500/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">LILO™ Knowledge Engine</h3>
            <p className="text-white/60 text-sm">Intelligence collective en temps réel</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isLearning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-300 text-sm">Apprentissage...</span>
            </motion.div>
          )}
          <Badge className="bg-emerald-500/20 border-emerald-500/30 text-emerald-300">
            {activeNodes.length} nœuds actifs
          </Badge>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category 
              ? "bg-purple-600 hover:bg-purple-700" 
              : "border-white/20 text-white/60 hover:text-white"
            }
          >
            {category === 'all' ? 'Tous' : category}
          </Button>
        ))}
      </div>

      {/* Nœuds de connaissance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Card className="glass-effect border-white/10 p-4 hover:border-purple-500/50 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm mb-1">{node.title}</h4>
                    <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300 text-xs">
                      {node.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-white/40">
                    <Network className="w-3 h-3" />
                    <span className="text-xs">{node.connections}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                    <span>Pertinence</span>
                    <span>{node.relevance}%</span>
                  </div>
                  <Progress 
                    value={node.relevance} 
                    className="h-1 bg-white/10"
                  />
                </div>

                <div className="space-y-2 mb-4">
                  {node.insights.slice(0, 2).map((insight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => onInsightSelect?.(insight)}
                    >
                      <Lightbulb className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-white/80">{insight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-white/40">
                    <Eye className="w-3 h-3" />
                    <span className="text-xs">
                      {new Date(node.lastAccessed).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLearnMore(node.id)}
                    disabled={isLearning}
                    className="h-6 px-2 text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
                  >
                    Approfondir
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredNodes.length === 0 && !isLearning && (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/60">Aucun nœud de connaissance trouvé pour cette catégorie</p>
        </div>
      )}

      {/* Statistiques du réseau */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <div className="text-center">
          <div className="text-xl font-bold text-emerald-400">2,847</div>
          <div className="text-xs text-white/60">Connexions totales</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-400">1,023</div>
          <div className="text-xs text-white/60">Insights générés</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-purple-400">94%</div>
          <div className="text-xs text-white/60">Précision IA</div>
        </div>
      </div>
    </Card>
  );
};

export default LiloKnowledgeEngine;