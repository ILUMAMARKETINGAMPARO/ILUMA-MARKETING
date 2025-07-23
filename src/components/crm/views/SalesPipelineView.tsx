import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClientFiche } from '@/types/crm.ts';
import { useCRM } from '@/contexts/CRMContext';
import { ChevronLeft, ChevronRight, TrendingUp, DollarSign } from 'lucide-react';

interface PipelineStage {
  id: string;
  title: string;
  color: string;
  description: string;
  conversionRate: number;
}

const SalesPipelineView: React.FC = () => {
  const { clients } = useCRM();
  const [currentStage, setCurrentStage] = useState(0);

  const stages: PipelineStage[] = [
    {
      id: 'prospect',
      title: 'Prospect',
      color: '#FFD56B',
      description: 'Premiers contacts',
      conversionRate: 35
    },
    {
      id: 'diagnostic',
      title: 'Diagnostic',
      color: '#00BFFF',
      description: 'Analyse des besoins',
      conversionRate: 60
    },
    {
      id: 'proposal',
      title: 'Proposition',
      color: '#FF8C42',
      description: 'Devis envoyé',
      conversionRate: 45
    },
    {
      id: 'negotiation',
      title: 'Négociation',
      color: '#8E44FF',
      description: 'Discussion des termes',
      conversionRate: 70
    },
    {
      id: 'contract',
      title: 'Contrat',
      color: '#00FF88',
      description: 'Signature',
      conversionRate: 85
    },
    {
      id: 'delivery',
      title: 'Livraison',
      color: '#FF6B6B',
      description: 'Projet en cours',
      conversionRate: 95
    }
  ];

  // Mock data for pipeline stages
  const getClientsForStage = (stageId: string) => {
    // This would normally come from a pipeline status field
    const stageClients = clients.filter(client => {
      switch (stageId) {
        case 'prospect': return client.status === 'prospect';
        case 'diagnostic': return client.status === 'active' && client.services.length === 0;
        case 'proposal': return client.status === 'active' && client.services.length > 0;
        case 'negotiation': return client.status === 'active' && client.revenue > 0;
        case 'contract': return client.status === 'active' && client.revenue > 1000;
        case 'delivery': return client.status === 'active' && client.services.length > 2;
        default: return [];
      }
    });
    return stageClients;
  };

  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0);
  const averageDealSize = totalRevenue / Math.max(clients.length, 1);

  return (
    <div className="h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white font-['Montserrat']">
          Pipeline de Vente - Tunnel Horizontal
        </h2>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{totalRevenue.toLocaleString()}€</div>
            <div className="text-white/60 text-sm">Revenus totaux</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#FFD56B]">{Math.round(averageDealSize).toLocaleString()}€</div>
            <div className="text-white/60 text-sm">Panier moyen</div>
          </div>
        </div>
      </div>

      {/* Pipeline Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
          disabled={currentStage === 0}
          className="border-white/20 text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 flex gap-2">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={`flex-1 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index <= currentStage ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ backgroundColor: stage.color }}
              onClick={() => setCurrentStage(index)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentStage(Math.min(stages.length - 1, currentStage + 1))}
          disabled={currentStage === stages.length - 1}
          className="border-white/20 text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Current Stage View */}
      <motion.div
        key={currentStage}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass-effect border-white/20 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: stages[currentStage].color }}
            />
            <div>
              <h3 className="text-xl font-bold text-white font-['Montserrat']">
                {stages[currentStage].title}
              </h3>
              <p className="text-white/60">{stages[currentStage].description}</p>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1 text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-bold">{stages[currentStage].conversionRate}%</span>
                </div>
                <div className="text-white/60 text-xs">Conversion</div>
              </div>
              <Badge className="bg-white/10 text-white">
                {getClientsForStage(stages[currentStage].id).length} clients
              </Badge>
            </div>
          </div>

          {/* Clients in Current Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getClientsForStage(stages[currentStage].id).map((client) => (
              <motion.div
                key={client.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-effect border-white/10 p-4 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{client.name}</h4>
                    <p className="text-white/60 text-sm">{client.sector}</p>
                  </div>
                  <Badge className="bg-[#8E44FF]/20 text-[#8E44FF]">
                    {client.ilaScore.current}/100
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-green-400">
                    <DollarSign className="h-3 w-3" />
                    <span className="text-sm font-bold">{client.revenue.toLocaleString()}€</span>
                  </div>
                  <div className="text-white/60 text-xs">
                    {client.assignedTo}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stages.map((stage, index) => (
          <Card
            key={stage.id}
            className={`glass-effect border-white/20 p-4 cursor-pointer transition-all duration-300 ${
              index === currentStage ? 'ring-2 ring-white/30' : 'hover:bg-white/5'
            }`}
            onClick={() => setCurrentStage(index)}
          >
            <div className="text-center">
              <div
                className="w-8 h-8 rounded-full mx-auto mb-2"
                style={{ backgroundColor: stage.color }}
              />
              <div className="text-white font-medium text-sm">{stage.title}</div>
              <div className="text-2xl font-bold text-white mt-1">
                {getClientsForStage(stage.id).length}
              </div>
              <div className="text-white/60 text-xs">{stage.conversionRate}% conv.</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalesPipelineView;