import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Play, Pause, Settings, Plus, Zap, Clock, CheckCircle } from 'lucide-react';

const WorkflowAutomation = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Score ILA™ Auto-Update',
      description: 'Recalcul automatique du score ILA™ lors de nouvelles données',
      status: 'active',
      trigger: 'Nouveau lead CRM / MAJ données',
      actions: 5,
      executions: 234,
      successRate: 94,
      lastRun: '2 min ago',
      module: 'ILA™'
    },
    {
      id: 2,
      name: 'ILUMATCH™ Cross-Sync',
      description: 'Synchronisation automatique CRM ↔ ILUMATCH™',
      status: 'active',
      trigger: 'MAJ client compatible',
      actions: 3,
      executions: 156,
      successRate: 98,
      lastRun: '15 min ago',
      module: 'ILUMATCH™'
    },
    {
      id: 3,
      name: 'RivalViews™ Data Sync',
      description: 'Synchronisation bidirectionnelle CRM ↔ RivalViews™',
      status: 'active',
      trigger: 'Nouvelle entreprise détectée',
      actions: 4,
      executions: 89,
      successRate: 96,
      lastRun: '5 min ago',
      module: 'RivalViews™'
    },
    {
      id: 4,
      name: 'ADLUMA™ Auto-Launch',
      description: 'Lancement automatique simulateur depuis actions CRM',
      status: 'active',
      trigger: 'Score ILA™ < 60',
      actions: 6,
      executions: 67,
      successRate: 92,
      lastRun: '1 hour ago',
      module: 'ADLUMA™'
    },
    {
      id: 5,
      name: 'BlogIA Content Generation',
      description: 'Génération contenu basée sur actions CRM détectées',
      status: 'active',
      trigger: 'Tendances secteur identifiées',
      actions: 8,
      executions: 43,
      successRate: 89,
      lastRun: '2 hours ago',
      module: 'BlogIA'
    }
  ]);

  const toggleWorkflow = (id: number) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === id 
        ? { ...workflow, status: workflow.status === 'active' ? 'paused' : 'active' }
        : workflow
    ));
  };

  const workflowTemplates = [
    {
      name: 'Ecosystem Sync Iluma™',
      description: 'Synchronisation complète entre tous les modules',
      icon: '🔄',
      category: 'Iluma Core'
    },
    {
      name: 'IA Insight Generator',
      description: 'Génération automatique d\'insights cross-modules',
      icon: '🧠',
      category: 'Intelligence'
    },
    {
      name: 'Performance Monitor',
      description: 'Surveillance et optimisation continue',
      icon: '⚡',
      category: 'Monitoring'
    },
    {
      name: 'Client Journey Auto',
      description: 'Automatisation complète du parcours client',
      icon: '🎯',
      category: 'Experience'
    },
    {
      name: 'Content Strategy AI',
      description: 'Stratégie contenu basée données clients',
      icon: '📝',
      category: 'Content'
    },
    {
      name: 'Competitive Watch',
      description: 'Veille concurrentielle automatique via RivalViews™',
      icon: '👁️',
      category: 'Intelligence'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{workflows.filter(w => w.status === 'active').length}</div>
              <div className="text-white/60 text-sm">Workflows Actifs</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">531</div>
              <div className="text-white/60 text-sm">Exécutions/Jour</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-white/60 text-sm">Taux de Succès</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">24h</div>
              <div className="text-white/60 text-sm">Temps Économisé</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Workflows */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Workflows Actifs</h3>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Workflow
          </Button>
        </div>

        <div className="space-y-4">
          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  workflow.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                }`} />
                <div>
                  <h4 className="font-semibold text-white">{workflow.name}</h4>
                  <p className="text-sm text-white/70">{workflow.description}</p>
                   <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                     <span>Trigger: {workflow.trigger}</span>
                     <span>{workflow.actions} actions</span>
                     <span>{workflow.executions} exécutions</span>
                     <span className="text-green-400">{workflow.successRate}% succès</span>
                     {workflow.module && (
                       <Badge className="text-xs bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30">
                         {workflow.module}
                       </Badge>
                     )}
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    workflow.status === 'active' 
                      ? 'border-green-500/30 text-green-300' 
                      : 'border-gray-500/30 text-gray-300'
                  }`}
                >
                  {workflow.lastRun}
                </Badge>
                <Switch
                  checked={workflow.status === 'active'}
                  onCheckedChange={() => toggleWorkflow(workflow.id)}
                />
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Workflow Templates */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Modèles de Workflows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowTemplates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-500/50 transition-colors cursor-pointer"
            >
              <div className="text-2xl mb-3">{template.icon}</div>
              <h4 className="font-semibold text-white mb-2">{template.name}</h4>
              <p className="text-sm text-white/70 mb-3">{template.description}</p>
              <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                {template.category}
              </Badge>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default WorkflowAutomation;