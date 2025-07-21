import React from 'react';
import KnowledgeMetrics from './KnowledgeMetrics';
import NetworkEvolutionChart from './NetworkEvolutionChart';
import ActiveKnowledgeNodes from './ActiveKnowledgeNodes';
import ExpertiseMapping from './ExpertiseMapping';
import NetworkActions from './NetworkActions';

const KnowledgeNetwork = () => {
  return (
    <div className="space-y-6">
      {/* Métriques du Réseau de Connaissances */}
      <KnowledgeMetrics />

      {/* Graphique Évolution du Réseau */}
      <NetworkEvolutionChart />

      {/* Nœuds de Connaissances Actifs */}
      <ActiveKnowledgeNodes />

      {/* Cartographie d'Expertise */}
      <ExpertiseMapping />

      {/* Actions du Réseau */}
      <NetworkActions />
    </div>
  );
};

export default KnowledgeNetwork;