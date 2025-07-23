import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Workflow, 
  Zap, 
  Target, 
  TrendingUp,
  Users,
  MessageSquare,
  BarChart,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client.ts';
import { toast } from '@/hooks/use-toast.ts';

interface ModuleStatus {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error' | 'optimizing';
  performance: number;
  lastUpdate: Date;
  connections: string[];
  aiRecommendations: string[];
}

interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'paused' | 'completed';
  success_rate: number;
  last_run: Date;
}

interface LiloOrchestratorProps {
  isVisible: boolean;
  onClose: () => void;
}

export const LiloOrchestrator: React.FC<LiloOrchestratorProps> = ({
  isVisible,
  onClose
}) => {
  const [modules, setModules] = useState<ModuleStatus[]>([]);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [systemHealth, setSystemHealth] = useState(0);
  const [activeConnections, setActiveConnections] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Initialisation des modules et workflows
  useEffect(() => {
    if (isVisible) {
      initializeOrchestrator();
      const interval = setInterval(updateSystemStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const initializeOrchestrator = async () => {
    // Simulation des modules connectés
    const mockModules: ModuleStatus[] = [
      {
        id: 'crm',
        name: 'CRM Iluma™',
        status: 'active',
        performance: 92,
        lastUpdate: new Date(),
        connections: ['prospects', 'analytics', 'notifications'],
        aiRecommendations: ['Optimiser pipeline conversion', 'Segmenter leads haute valeur']
      },
      {
        id: 'adluma',
        name: 'ADLUMA™ Simulator',
        status: 'active',
        performance: 88,
        lastUpdate: new Date(),
        connections: ['crm', 'analytics'],
        aiRecommendations: ['Ajuster algorithme ROI', 'Intégrer données saisonnières']
      },
      {
        id: 'rivalviews',
        name: 'RivalViews Intelligence',
        status: 'optimizing',
        performance: 76,
        lastUpdate: new Date(),
        connections: ['crm', 'prospects'],
        aiRecommendations: ['Améliorer géolocalisation', 'Enrichir données concurrentielles']
      },
      {
        id: 'ila',
        name: 'ILA™ Scoring',
        status: 'active',
        performance: 94,
        lastUpdate: new Date(),
        connections: ['crm', 'analytics', 'notifications'],
        aiRecommendations: ['Affiner algorithme score', 'Ajouter métriques UX']
      },
      {
        id: 'prospects',
        name: 'Geo-Prospection',
        status: 'active',
        performance: 85,
        lastUpdate: new Date(),
        connections: ['crm', 'rivalviews'],
        aiRecommendations: ['Optimiser rayon recherche', 'Filtrer doublons']
      },
      {
        id: 'analytics',
        name: 'Analytics Engine',
        status: 'active',
        performance: 91,
        lastUpdate: new Date(),
        connections: ['crm', 'adluma', 'ila'],
        aiRecommendations: ['Prédictions temps réel', 'Dashboard exécutif']
      }
    ];

    // Workflows d'automatisation
    const mockWorkflows: AutomationWorkflow[] = [
      {
        id: 'lead-nurturing',
        name: 'Lead Nurturing Intelligent',
        description: 'Séquence automatique d\'engagement basée sur le score ILA™',
        trigger: 'Nouveau lead CRM',
        actions: ['Analyse ILA™', 'Segmentation IA', 'Email personnalisé', 'Suivi comportemental'],
        status: 'active',
        success_rate: 73,
        last_run: new Date()
      },
      {
        id: 'competitor-alert',
        name: 'Veille Concurrentielle',
        description: 'Surveillance automatique et alertes RivalViews',
        trigger: 'Nouveaux concurrents détectés',
        actions: ['Analyse concurrentielle', 'Mise à jour database', 'Notification équipe'],
        status: 'active',
        success_rate: 89,
        last_run: new Date()
      },
      {
        id: 'performance-optimization',
        name: 'Optimisation Performance',
        description: 'Ajustements automatiques des paramètres IA',
        trigger: 'Performance sous seuil',
        actions: ['Diagnostic système', 'Ajustement paramètres', 'Test performance'],
        status: 'active',
        success_rate: 95,
        last_run: new Date()
      }
    ];

    setModules(mockModules);
    setWorkflows(mockWorkflows);
    calculateSystemHealth(mockModules);
    setActiveConnections(mockModules.reduce((acc, m) => acc + m.connections.length, 0));
  };

  const updateSystemStatus = () => {
    setModules(prev => prev.map(module => ({
      ...module,
      performance: Math.max(0, Math.min(100, module.performance + (Math.random() - 0.5) * 10)),
      lastUpdate: new Date()
    })));
  };

  const calculateSystemHealth = (modulesList: ModuleStatus[]) => {
    const avgPerformance = modulesList.reduce((acc, m) => acc + m.performance, 0) / modulesList.length;
    const activeModules = modulesList.filter(m => m.status === 'active').length;
    const health = (avgPerformance * 0.7) + (activeModules / modulesList.length * 100 * 0.3);
    setSystemHealth(Math.round(health));
  };

  const optimizeSystem = async () => {
    setIsOptimizing(true);
    
    try {
      // Simulation d'optimisation système
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setModules(prev => prev.map(module => ({
        ...module,
        performance: Math.min(100, module.performance + Math.random() * 15),
        status: module.status === 'error' ? 'active' : module.status
      })));

      toast({
        title: "🚀 Optimisation Complétée",
        description: "Tous les modules ont été optimisés avec succès",
      });

      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'success',
        message: 'Optimisation système terminée avec succès',
        timestamp: new Date()
      }]);

    } catch (error) {
      toast({
        title: "❌ Erreur d'optimisation",
        description: "Une erreur est survenue lors de l'optimisation",
        variant: "destructive"
      });
    }

    setIsOptimizing(false);
  };

  const executeWorkflow = async (workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    if (!workflow) return;

    toast({
      title: `🔄 Exécution: ${workflow.name}`,
      description: "Workflow en cours d'exécution...",
    });

    // Simulation d'exécution
    setTimeout(() => {
      setWorkflows(prev => prev.map(w => 
        w.id === workflowId 
          ? { ...w, last_run: new Date(), success_rate: Math.min(100, w.success_rate + 2) }
          : w
      ));

      toast({
        title: "✅ Workflow Terminé",
        description: `${workflow.name} exécuté avec succès`,
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'optimizing': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'optimizing': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="glass-effect border-primary/30 shadow-2xl bg-background/95 backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground font-['Montserrat']">
                      LILO™ Orchestrator
                    </h2>
                    <p className="text-muted-foreground">
                      Centre de contrôle intelligent pour l'écosystème Iluma™
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Santé Système</div>
                    <div className="flex items-center gap-2">
                      <Progress value={systemHealth} className="w-24" />
                      <span className="text-lg font-bold text-foreground">{systemHealth}%</span>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
                    ×
                  </Button>
                </div>
              </div>

              {/* Stats rapides */}
              <div className="p-6 border-b border-border/10">
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {modules.filter(m => m.status === 'active').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Modules Actifs</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                    <div className="flex items-center gap-3">
                      <Network className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">{activeConnections}</div>
                        <div className="text-sm text-muted-foreground">Connexions</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                    <div className="flex items-center gap-3">
                      <Workflow className="w-8 h-8 text-purple-500" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {workflows.filter(w => w.status === 'active').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Workflows Actifs</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-orange-500" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(workflows.reduce((acc, w) => acc + w.success_rate, 0) / workflows.length)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Taux de Succès</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 p-6">
                {/* Modules Status */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground font-['Montserrat']">
                      État des Modules
                    </h3>
                    <Button
                      onClick={optimizeSystem}
                      disabled={isOptimizing}
                      size="sm"
                      className="bg-gradient-to-r from-primary to-accent text-white"
                    >
                      {isOptimizing ? (
                        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Zap className="w-4 h-4 mr-2" />
                      )}
                      Optimiser
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {modules.map((module) => (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Card className="p-4 bg-background/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(module.status)}
                              <div>
                                <div className="font-semibold text-foreground">
                                  {module.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {module.connections.length} connexions actives
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <Progress value={module.performance} className="w-16" />
                                <span className="text-sm font-medium">
                                  {module.performance}%
                                </span>
                              </div>
                              <Badge
                                variant="secondary"
                                className={`${getStatusColor(module.status)} text-white`}
                              >
                                {module.status}
                              </Badge>
                            </div>
                          </div>

                          {module.aiRecommendations.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border/10">
                              <div className="text-xs text-muted-foreground mb-1">
                                Recommandations IA:
                              </div>
                              <div className="space-y-1">
                                {module.aiRecommendations.map((rec, index) => (
                                  <div key={index} className="text-xs bg-primary/10 rounded px-2 py-1">
                                    {rec}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Workflows Automation */}
                <div>
                  <h3 className="text-lg font-bold text-foreground font-['Montserrat'] mb-4">
                    Workflows d'Automatisation
                  </h3>

                  <div className="space-y-3">
                    {workflows.map((workflow) => (
                      <motion.div
                        key={workflow.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Card className="p-4 bg-background/50">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-semibold text-foreground">
                                {workflow.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {workflow.description}
                              </div>
                            </div>
                            <Badge
                              variant={workflow.status === 'active' ? 'default' : 'secondary'}
                            >
                              {workflow.status}
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="text-xs text-muted-foreground">
                              <strong>Déclencheur:</strong> {workflow.trigger}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <strong>Actions:</strong> {workflow.actions.join(' → ')}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-500">
                                  {workflow.success_rate}%
                                </div>
                                <div className="text-xs text-muted-foreground">Succès</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-foreground">
                                  {workflow.last_run.toLocaleTimeString()}
                                </div>
                                <div className="text-xs text-muted-foreground">Dernière exéc.</div>
                              </div>
                            </div>
                            <Button
                              onClick={() => executeWorkflow(workflow.id)}
                              size="sm"
                              variant="outline"
                              className="border-primary/30"
                            >
                              <Workflow className="w-4 h-4 mr-2" />
                              Exécuter
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiloOrchestrator;