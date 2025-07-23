import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  Workflow
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast.ts';
import { supabase } from '@/integrations/supabase/client.ts';

interface WorkflowRule {
  id: string;
  name: string;
  trigger: string;
  conditions: any[];
  actions: any[];
  isActive: boolean;
  executionCount: number;
  successRate: number;
}

interface AutomationMetrics {
  totalExecutions: number;
  successfulExecutions: number;
  activeWorkflows: number;
  avgExecutionTime: number;
}

const SmartWorkflowEngine: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowRule[]>([]);
  const [metrics, setMetrics] = useState<AutomationMetrics>({
    totalExecutions: 0,
    successfulExecutions: 0,
    activeWorkflows: 0,
    avgExecutionTime: 0
  });
  const [isEngineRunning, setIsEngineRunning] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadWorkflows();
    loadMetrics();
  }, []);

  const loadWorkflows = () => {
    // Workflows prédéfinis Iluma™
    const defaultWorkflows: WorkflowRule[] = [
      {
        id: 'welcome-journey',
        name: 'Parcours d\'Accueil Intelligent',
        trigger: 'user_registration',
        conditions: [
          { type: 'user_level', operator: 'equals', value: 'beginner' }
        ],
        actions: [
          { type: 'show_onboarding', module: 'ADLUMA' },
          { type: 'schedule_followup', delay: '24h' },
          { type: 'assign_lilo_mood', mood: 'excited' }
        ],
        isActive: true,
        executionCount: 47,
        successRate: 94
      },
      {
        id: 'completion-boost',
        name: 'Boost après Completion',
        trigger: 'module_completed',
        conditions: [
          { type: 'conversion_score', operator: 'greater_than', value: 80 }
        ],
        actions: [
          { type: 'unlock_next_module' },
          { type: 'generate_insight', confidence: 90 },
          { type: 'send_congratulations' }
        ],
        isActive: true,
        executionCount: 23,
        successRate: 87
      },
      {
        id: 'reengagement',
        name: 'Réengagement Intelligent',
        trigger: 'user_inactive',
        conditions: [
          { type: 'days_inactive', operator: 'greater_than', value: 7 },
          { type: 'previous_engagement', operator: 'greater_than', value: 50 }
        ],
        actions: [
          { type: 'personalized_reminder' },
          { type: 'suggest_quick_win' },
          { type: 'lilo_concern_mode' }
        ],
        isActive: true,
        executionCount: 12,
        successRate: 75
      },
      {
        id: 'score-milestone',
        name: 'Jalons de Performance',
        trigger: 'score_threshold',
        conditions: [
          { type: 'ila_score', operator: 'greater_than', value: 90 }
        ],
        actions: [
          { type: 'unlock_premium_features' },
          { type: 'generate_certificate' },
          { type: 'share_achievement' }
        ],
        isActive: true,
        executionCount: 8,
        successRate: 100
      }
    ];

    setWorkflows(defaultWorkflows);
    
    // Calculer les métriques
    const totalExec = defaultWorkflows.reduce((sum, w) => sum + w.executionCount, 0);
    const successfulExec = defaultWorkflows.reduce((sum, w) => 
      sum + Math.floor(w.executionCount * w.successRate / 100), 0
    );
    const activeCount = defaultWorkflows.filter(w => w.isActive).length;

    setMetrics({
      totalExecutions: totalExec,
      successfulExecutions: successfulExec,
      activeWorkflows: activeCount,
      avgExecutionTime: 1.2 // en secondes
    });
  };

  const loadMetrics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Charger les métriques réelles depuis la base
      const { data: analytics } = await supabase
        .from('module_analytics')
        .select('action_type')
        .eq('user_id', user.id);

      if (analytics) {
        const completions = analytics.filter(a => a.action_type === 'complete').length;
        setMetrics(prev => ({
          ...prev,
          totalExecutions: prev.totalExecutions + analytics.length,
          successfulExecutions: prev.successfulExecutions + completions
        }));
      }
    } catch (error) {
      console.error('Error loading metrics:', error);
    }
  };

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId ? { ...w, isActive: !w.isActive } : w
    ));

    toast({
      title: "🔄 Workflow modifié",
      description: "Configuration mise à jour avec succès",
      duration: 2000,
    });
  };

  const triggerWorkflow = async (workflowId: string) => {
    try {
      const workflow = workflows.find(w => w.id === workflowId);
      if (!workflow) return;

      // Simuler l'exécution
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const response = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:54321' : 'https://tgtoyxbkxsohyalgifrdi.supabase.co'}/functions/v1/intelligent-automation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndG95a3hrc29oeWFsZ2lmY2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzA3OTQsImV4cCI6MjA2NzU0Njc5NH0.lZLZ2WRdrrvTEQQWI9uZsWb6qOw2R92B3WZGZKEdlf0`
        },
        body: JSON.stringify({
          type: 'manual_trigger',
          data: { workflowId, actions: workflow.actions },
          userId: user.id
        })
      });

      if (response.ok) {
        // Mettre à jour le compteur
        setWorkflows(prev => prev.map(w => 
          w.id === workflowId 
            ? { ...w, executionCount: w.executionCount + 1 }
            : w
        ));

        toast({
          title: "⚡ Workflow exécuté",
          description: `${workflow.name} déclenché avec succès`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error triggering workflow:', error);
      toast({
        title: "❌ Erreur",
        description: "Impossible d'exécuter le workflow",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const toggleEngine = () => {
    setIsEngineRunning(!isEngineRunning);
    toast({
      title: isEngineRunning ? "⏸️ Moteur suspendu" : "▶️ Moteur activé",
      description: isEngineRunning 
        ? "Les automatisations sont en pause" 
        : "Les automatisations reprennent",
      duration: 2000,
    });
  };

  const getStatusColor = (successRate: number) => {
    if (successRate >= 90) return 'text-green-400';
    if (successRate >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header avec contrôles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-2xl font-bold text-white font-['Montserrat']">
              Moteur d'Automatisation IA
            </h2>
            <p className="text-white/70">
              Workflows intelligents et personnalisés
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge 
            variant={isEngineRunning ? "default" : "secondary"}
            className={isEngineRunning ? "bg-green-500" : "bg-gray-500"}
          >
            {isEngineRunning ? "Actif" : "Suspendu"}
          </Badge>
          
          <Button
            onClick={toggleEngine}
            variant={isEngineRunning ? "destructive" : "default"}
            size="sm"
          >
            {isEngineRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-white/70 text-sm">Exécutions</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {metrics.totalExecutions}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-white/70 text-sm">Succès</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {Math.round((metrics.successfulExecutions / metrics.totalExecutions) * 100) || 0}%
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Workflow className="w-4 h-4 text-blue-400" />
              <span className="text-white/70 text-sm">Workflows Actifs</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {metrics.activeWorkflows}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-white/70 text-sm">Temps Moyen</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {metrics.avgExecutionTime}s
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des workflows */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white font-['Montserrat']">
          Workflows Configurés
        </h3>

        {workflows.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`glass-effect border ${workflow.isActive ? 'border-accent/30' : 'border-white/20'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-accent" />
                    {workflow.name}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={workflow.isActive ? "default" : "secondary"}
                      className={workflow.isActive ? "bg-green-500" : "bg-gray-500"}
                    >
                      {workflow.isActive ? "Actif" : "Inactif"}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleWorkflow(workflow.id)}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Déclencheur */}
                  <div>
                    <span className="text-white/70 text-sm">Déclencheur:</span>
                    <div className="text-white font-medium">
                      {workflow.trigger.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>

                  {/* Métriques */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-white/70 text-xs">Exécutions</span>
                      <div className="text-white font-bold">{workflow.executionCount}</div>
                    </div>
                    <div>
                      <span className="text-white/70 text-xs">Taux de Succès</span>
                      <div className={`font-bold ${getStatusColor(workflow.successRate)}`}>
                        {workflow.successRate}%
                      </div>
                    </div>
                    <div>
                      <span className="text-white/70 text-xs">Performance</span>
                      <Progress 
                        value={workflow.successRate} 
                        className="h-2 mt-1"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => triggerWorkflow(workflow.id)}
                      disabled={!workflow.isActive}
                      className="flex-1"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Déclencher
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Analyser
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SmartWorkflowEngine;