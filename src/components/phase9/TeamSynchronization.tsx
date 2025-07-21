import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import SyncStatusHeader from './SyncStatusHeader';
import SyncMetrics from './SyncMetrics';
import TeamGrid from './TeamGrid';
import SyncActivityFeed from './SyncActivityFeed';
import SyncControls from './SyncControls';

const TeamSynchronization = () => {
  const [syncStatus, setSyncStatus] = useState('active');

  const teams = [
    {
      name: 'Marketing Strategy',
      members: 8,
      syncRate: 94,
      status: 'synchronized',
      lastSync: '2 min ago',
      activities: 23,
      color: 'text-blue-400'
    },
    {
      name: 'Creative Design',
      members: 6,
      syncRate: 87,
      status: 'syncing',
      lastSync: 'En cours...',
      activities: 18,
      color: 'text-purple-400'
    },
    {
      name: 'Development',
      members: 12,
      syncRate: 91,
      status: 'synchronized',
      lastSync: '5 min ago',
      activities: 34,
      color: 'text-green-400'
    },
    {
      name: 'Analytics',
      members: 4,
      syncRate: 96,
      status: 'synchronized',
      lastSync: '1 min ago',
      activities: 12,
      color: 'text-cyan-400'
    }
  ];

  const syncActivities = [
    {
      type: 'knowledge_share',
      title: 'Partage de Connaissances',
      description: 'L\'équipe Design a partagé 3 nouveaux insights avec Marketing',
      timestamp: 'Il y a 2 minutes',
      teams: ['Design', 'Marketing'],
      impact: 'high'
    },
    {
      type: 'workflow_sync',
      title: 'Synchronisation Workflow',
      description: 'Automatisation des handoffs entre Dev et Analytics',
      timestamp: 'Il y a 8 minutes',
      teams: ['Development', 'Analytics'],
      impact: 'medium'
    },
    {
      type: 'resource_optimization',
      title: 'Optimisation Ressources',
      description: 'Redistribution intelligente des tâches sur 4 équipes',
      timestamp: 'Il y a 15 minutes',
      teams: ['Toutes'],
      impact: 'high'
    },
    {
      type: 'conflict_resolution',
      title: 'Résolution Conflit',
      description: 'IA a détecté et résolu un conflit de priorités',
      timestamp: 'Il y a 23 minutes',
      teams: ['Marketing', 'Development'],
      impact: 'medium'
    }
  ];

  const syncMetrics = [
    { label: 'Taux de Synchronisation Global', value: '92%', trend: '+8%' },
    { label: 'Temps de Réponse Moyen', value: '1.2s', trend: '-34%' },
    { label: 'Conflits Résolus Auto', value: '89%', trend: '+12%' },
    { label: 'Efficacité Collaborative', value: '94%', trend: '+15%' }
  ];

  return (
    <div className="space-y-6">
      {/* Status Global de Synchronisation */}
      <Card className="glass-effect border-white/20 p-6">
        <SyncStatusHeader syncStatus={syncStatus} />
        <SyncMetrics metrics={syncMetrics} />
      </Card>

      {/* État des Équipes */}
      <TeamGrid teams={teams} />

      {/* Flux d'Activités de Synchronisation */}
      <SyncActivityFeed activities={syncActivities} />

      {/* Contrôles de Synchronisation */}
      <SyncControls />
    </div>
  );
};

export default TeamSynchronization;