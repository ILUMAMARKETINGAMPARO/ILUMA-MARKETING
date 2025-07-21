import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Users, MessageSquare, FileText, Video, Calendar, Zap, Eye } from 'lucide-react';

const CollaborativeWorkspace = () => {
  const [activeProject, setActiveProject] = useState('marketing-campaign');

  const workspaces = [
    {
      id: 'marketing-campaign',
      title: 'Campagne Q4 2024',
      description: 'Stratégie marketing multi-canaux pour le lancement produit',
      participants: 12,
      progress: 78,
      status: 'active',
      lastActivity: '5 min ago',
      tools: ['Design', 'Analytics', 'Content', 'Social']
    },
    {
      id: 'product-development',
      title: 'Développement Produit',
      description: 'Innovation et R&D pour les nouvelles fonctionnalités',
      participants: 8,
      progress: 45,
      status: 'planning',
      lastActivity: '23 min ago',
      tools: ['Dev', 'Design', 'Testing', 'Analytics']
    },
    {
      id: 'customer-research',
      title: 'Recherche Client',
      description: 'Analyse comportementale et insights consommateurs',
      participants: 6,
      progress: 92,
      status: 'review',
      lastActivity: '1h ago',
      tools: ['Research', 'Analytics', 'Surveys', 'Interviews']
    }
  ];

  const collaborationTools = [
    {
      name: 'Tableau Collaboratif',
      description: 'Brainstorming et mind mapping en temps réel',
      activeUsers: 8,
      icon: Share2,
      status: 'active'
    },
    {
      name: 'Chat IA Collectif',
      description: 'Discussion assistée par intelligence artificielle',
      activeUsers: 12,
      icon: MessageSquare,
      status: 'active'
    },
    {
      name: 'Documents Partagés',
      description: 'Édition collaborative de documents',
      activeUsers: 5,
      icon: FileText,
      status: 'idle'
    },
    {
      name: 'Visioconférence IA',
      description: 'Réunions avec transcription et insights automatiques',
      activeUsers: 0,
      icon: Video,
      status: 'available'
    }
  ];

  const recentActivities = [
    {
      type: 'contribution',
      user: 'Marie Chen',
      action: 'a ajouté 3 insights stratégiques',
      project: 'Campagne Q4 2024',
      timestamp: '2 min ago',
      impact: 'high'
    },
    {
      type: 'collaboration',
      user: 'Alex Rivera',
      action: 'a lancé une session de brainstorming',
      project: 'Développement Produit',
      timestamp: '15 min ago',
      impact: 'medium'
    },
    {
      type: 'completion',
      user: 'Sam Johnson',
      action: 'a finalisé l\'analyse des données',
      project: 'Recherche Client',
      timestamp: '45 min ago',
      impact: 'high'
    },
    {
      type: 'innovation',
      user: 'IA Assistant',
      action: 'a suggéré 5 optimisations possibles',
      project: 'Campagne Q4 2024',
      timestamp: '1h ago',
      impact: 'medium'
    }
  ];

  const workspaceMetrics = [
    { label: 'Projets Actifs', value: '23', change: '+4' },
    { label: 'Collaborateurs', value: '48', change: '+8' },
    { label: 'Sessions Aujourd\'hui', value: '156', change: '+23' },
    { label: 'Productivité', value: '94%', change: '+12%' }
  ];

  return (
    <div className="space-y-6">
      {/* Métriques Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {workspaceMetrics.map((metric, index) => (
          <Card key={index} className="glass-effect border-white/20 p-4">
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-white/60 text-sm mb-2">{metric.label}</div>
            <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
              {metric.change}
            </Badge>
          </Card>
        ))}
      </div>

      {/* Espaces de Travail Actifs */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Espaces de Travail Collaboratifs</h3>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Share2 className="w-4 h-4 mr-2" />
            Nouveau Workspace
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workspaces.map((workspace) => (
            <motion.div
              key={workspace.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeProject === workspace.id
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-white/5 border-white/10 hover:border-emerald-500/20'
              }`}
              onClick={() => setActiveProject(workspace.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-white">{workspace.title}</h4>
                <Badge className={
                  workspace.status === 'active' 
                    ? 'bg-green-500/20 border-green-500/30 text-green-300'
                    : workspace.status === 'planning'
                    ? 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                    : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
                }>
                  {workspace.status}
                </Badge>
              </div>
              
              <p className="text-white/70 text-sm mb-4">{workspace.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Progression</span>
                  <span className="text-emerald-300">{workspace.progress}%</span>
                </div>
                
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${workspace.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>👥 {workspace.participants} participants</span>
                  <span>🕒 {workspace.lastActivity}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {workspace.tools.map((tool, index) => (
                    <Badge key={index} className="bg-white/10 border-white/20 text-white/70 text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Outils de Collaboration */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Outils de Collaboration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {collaborationTools.map((tool, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <tool.icon className="w-6 h-6 text-emerald-400" />
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${
                    tool.status === 'active' ? 'bg-green-400 animate-pulse' :
                    tool.status === 'idle' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-xs text-white/60">{tool.status}</span>
                </div>
              </div>
              <h4 className="font-medium text-white mb-2">{tool.name}</h4>
              <p className="text-white/70 text-xs mb-3">{tool.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/50">
                  {tool.activeUsers > 0 ? `${tool.activeUsers} actifs` : 'Disponible'}
                </span>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                  Rejoindre
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Flux d'Activité Collaborative */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Activité Collaborative Récente</h3>
          <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300">
            <Eye className="w-3 h-3 mr-1" />
            En Direct
          </Badge>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'contribution' ? 'bg-green-500/20' :
                activity.type === 'collaboration' ? 'bg-blue-500/20' :
                activity.type === 'completion' ? 'bg-purple-500/20' :
                'bg-yellow-500/20'
              }`}>
                {activity.type === 'contribution' && <Zap className="w-4 h-4 text-green-400" />}
                {activity.type === 'collaboration' && <Users className="w-4 h-4 text-blue-400" />}
                {activity.type === 'completion' && <FileText className="w-4 h-4 text-purple-400" />}
                {activity.type === 'innovation' && <Share2 className="w-4 h-4 text-yellow-400" />}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white text-sm">{activity.user}</span>
                  <span className="text-white/70 text-sm">{activity.action}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>📁 {activity.project}</span>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      activity.impact === 'high' 
                        ? 'bg-red-500/20 border-red-500/30 text-red-300'
                        : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
                    }>
                      {activity.impact}
                    </Badge>
                    <span>⏰ {activity.timestamp}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Actions Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-effect border-emerald-500/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 font-medium">Planifier Session</span>
          </div>
          <p className="text-white/70 text-sm mb-3">
            Organiser une session de collaboration avec l'équipe
          </p>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            Programmer
          </Button>
        </Card>

        <Card className="glass-effect border-blue-500/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Chat IA Groupe</span>
          </div>
          <p className="text-white/70 text-sm mb-3">
            Démarrer une discussion assistée par IA
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Lancer Chat
          </Button>
        </Card>

        <Card className="glass-effect border-purple-500/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Document Collaboratif</span>
          </div>
          <p className="text-white/70 text-sm mb-3">
            Créer un nouveau document partagé
          </p>
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Nouveau Doc
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CollaborativeWorkspace;