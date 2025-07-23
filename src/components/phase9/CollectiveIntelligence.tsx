import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Brain, 
  Network, 
  Lightbulb, 
  Users, 
  TrendingUp,
  Star,
  Plus,
  Search,
  Filter,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client.ts';
import { useToast } from '@/hooks/use-toast.ts';

interface KnowledgeNode {
  id: string;
  node_type: string;
  title: string;
  description: string;
  content: any;
  tags: string[];
  relevance_score: number;
  usage_count: number;
  created_at: string;
  is_active: boolean;
}

interface IntelligenceMetric {
  metric_type: string;
  metric_value: number;
  context_data: any;
  calculated_at: string;
}

const CollectiveIntelligence: React.FC = () => {
  const [knowledgeNodes, setKnowledgeNodes] = useState<KnowledgeNode[]>([]);
  const [metrics, setMetrics] = useState<IntelligenceMetric[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const nodeTypes = [
    { value: 'all', label: 'Tous', icon: Globe },
    { value: 'insight', label: 'Insights', icon: Lightbulb },
    { value: 'pattern', label: 'Patterns', icon: Network },
    { value: 'recommendation', label: 'Recommandations', icon: Target },
    { value: 'best_practice', label: 'Bonnes Pratiques', icon: Star }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Charger les nœuds de connaissance
      const { data: nodes } = await supabase
        .from('knowledge_nodes')
        .select('*')
        .eq('is_active', true)
        .order('relevance_score', { ascending: false })
        .limit(50);

      // Charger les métriques d'intelligence collective
      const { data: metricsData } = await supabase
        .from('collective_intelligence_metrics')
        .select('*')
        .order('calculated_at', { ascending: false })
        .limit(10);

      setKnowledgeNodes(nodes || []);
      setMetrics(metricsData || []);
    } catch (error) {
      console.error('Error loading collective intelligence data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createKnowledgeNode = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newNode = {
        node_type: 'insight',
        title: 'Nouveau nœud de connaissance',
        description: 'Description automatiquement générée par l\'IA collective',
        content: {
          auto_generated: true,
          source: 'collective_intelligence',
          insights: []
        },
        tags: ['auto-generated', 'collective'],
        created_by: user.id
      };

      const { data, error } = await supabase
        .from('knowledge_nodes')
        .insert([newNode])
        .select()
        .single();

      if (error) throw error;

      setKnowledgeNodes(prev => [data, ...prev]);
      
      toast({
        title: "🧠 Nœud créé",
        description: "Nouveau nœud de connaissance ajouté à l'intelligence collective",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error creating knowledge node:', error);
    }
  };

  const activateNode = async (nodeId: string) => {
    try {
      // Récupérer le nœud actuel pour incrémenter usage_count
      const { data: currentNode } = await supabase
        .from('knowledge_nodes')
        .select('usage_count')
        .eq('id', nodeId)
        .single();

      const { error } = await supabase
        .from('knowledge_nodes')
        .update({ 
          usage_count: (currentNode?.usage_count || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', nodeId);

      if (error) throw error;

      // Mettre à jour l'état local
      setKnowledgeNodes(prev => prev.map(node => 
        node.id === nodeId 
          ? { ...node, usage_count: node.usage_count + 1 }
          : node
      ));

      toast({
        title: "⚡ Nœud activé",
        description: "Intelligence collective mise à jour",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error activating node:', error);
    }
  };

  const filteredNodes = knowledgeNodes.filter(node => {
    const matchesSearch = node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || node.node_type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    const typeConfig = nodeTypes.find(t => t.value === type);
    return typeConfig?.icon || Lightbulb;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'insight': return 'text-yellow-400';
      case 'pattern': return 'text-blue-400';
      case 'recommendation': return 'text-green-400';
      case 'best_practice': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const intelligenceScore = metrics.find(m => m.metric_type === 'collective_score')?.metric_value || 87;
  const knowledgeGrowth = metrics.find(m => m.metric_type === 'knowledge_growth')?.metric_value || 23;
  const collaborationIndex = metrics.find(m => m.metric_type === 'collaboration_index')?.metric_value || 95;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Chargement de l'intelligence collective...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec métriques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-effect border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              <div>
                <div className="text-white/70 text-sm">Intelligence Collective</div>
                <div className="text-2xl font-bold text-white">{intelligenceScore}</div>
                <Progress value={intelligenceScore} className="h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-white/70 text-sm">Croissance Connaissance</div>
                <div className="text-2xl font-bold text-white">+{knowledgeGrowth}%</div>
                <div className="text-green-400 text-sm">Cette semaine</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-white/70 text-sm">Index Collaboration</div>
                <div className="text-2xl font-bold text-white">{collaborationIndex}</div>
                <div className="text-blue-400 text-sm">Excellent</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contrôles et filtres */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white font-['Montserrat'] flex items-center">
              <Network className="w-5 h-5 mr-2 text-primary" />
              Réseau de Connaissance Collective
            </CardTitle>
            <Button onClick={createKnowledgeNode} className="bg-primary">
              <Plus className="w-4 h-4 mr-2" />
              Créer Nœud
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                placeholder="Rechercher dans la connaissance collective..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div className="flex gap-2">
              {nodeTypes.map((type) => {
                const Icon = type.icon;
                const isActive = selectedType === type.value;
                
                return (
                  <Button
                    key={type.value}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.value)}
                    className={`${isActive ? 'bg-primary' : 'border-white/20 text-white/70'}`}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {type.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Grille des nœuds de connaissance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredNodes.map((node, index) => {
                const TypeIcon = getTypeIcon(node.node_type);
                const typeColor = getTypeColor(node.node_type);
                
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative group"
                  >
                    <Card className="glass-effect border-white/20 h-full hover:border-primary/50 transition-all cursor-pointer"
                          onClick={() => activateNode(node.id)}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <TypeIcon className={`w-5 h-5 ${typeColor}`} />
                          <Badge variant="secondary" className="text-xs">
                            {node.usage_count} utilisations
                          </Badge>
                        </div>
                        
                        <h3 className="text-white font-medium mb-2 line-clamp-2">
                          {node.title}
                        </h3>
                        
                        {node.description && (
                          <p className="text-white/60 text-sm mb-3 line-clamp-3">
                            {node.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {node.tags.slice(0, 2).map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="text-xs border-primary/30 text-primary"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {node.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                                +{node.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-white/70">{node.relevance_score}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredNodes.length === 0 && (
            <div className="text-center py-12">
              <Brain className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/60">
                Aucun nœud de connaissance trouvé pour ces critères.
              </p>
              <Button 
                onClick={createKnowledgeNode} 
                variant="outline" 
                className="mt-4 border-primary text-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer le premier nœud
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectiveIntelligence;