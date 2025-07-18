import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target, 
  DollarSign, 
  User, 
  Calendar, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import SectionWrapper from '../foundation/SectionWrapper';

interface Opportunity {
  id: string;
  title: string;
  client: string;
  assignedTo: string;
  stage: 'prospect' | 'diagnostic' | 'proposal' | 'negotiation' | 'contract' | 'delivery';
  value: number;
  probability: number;
  closeDate: Date;
  description: string;
  services: string[];
}

interface OpportunitiesSectionProps {
  selectedOpportunities: string[];
  setSelectedOpportunities: (selected: string[]) => void;
  onAdd: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({
  selectedOpportunities,
  setSelectedOpportunities,
  onAdd,
  onEdit,
  onRemove
}) => {
  const { clients } = useCRM();

  // Generate mock opportunities from clients
  const generateOpportunities = (): Opportunity[] => {
    return clients.map(client => ({
      id: `opp-${client.id}`,
      title: `Opportunité ${client.name}`,
      client: client.name,
      assignedTo: client.assignedTo,
      stage: client.status === 'prospect' ? 'prospect' : 
             client.revenue > 2000 ? 'negotiation' : 'diagnostic',
      value: client.revenue || Math.floor(Math.random() * 5000) + 1000,
      probability: Math.floor(Math.random() * 40) + 40, // 40-80%
      closeDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000), // next 60 days
      description: `Opportunité de vente pour ${client.name} dans le secteur ${client.sector}`,
      services: client.services
    }));
  };

  const opportunities = generateOpportunities();

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospect': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'diagnostic': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'proposal': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'negotiation': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'contract': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'delivery': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'prospect': return 'Prospect';
      case 'diagnostic': return 'Diagnostic';
      case 'proposal': return 'Proposition';
      case 'negotiation': return 'Négociation';
      case 'contract': return 'Contrat';
      case 'delivery': return 'Livraison';
      default: return stage;
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-400';
    if (probability >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const totalValue = opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <SectionWrapper
        title="Gestion des Opportunités"
        icon={Target}
        selectedItems={selectedOpportunities.length}
        onAdd={onAdd}
        onEdit={onEdit}
        onRemove={onRemove}
        addLabel="Nouvelle Opportunité"
        editLabel="Modifier"
        removeLabel="Supprimer"
        headerActions={
          <div className="text-right">
            <div className="text-lg font-bold text-green-400">
              {totalValue.toLocaleString()}€
            </div>
            <div className="text-xs text-white/60">Valeur pondérée</div>
          </div>
        }
      >
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <motion.div key={opportunity.id} layout>
              <Card className={`glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-colors ${
                selectedOpportunities.includes(opportunity.id) ? 'ring-2 ring-[#8E44FF]/50 bg-[#8E44FF]/10' : ''
              }`}>
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedOpportunities.includes(opportunity.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedOpportunities([...selectedOpportunities, opportunity.id]);
                      } else {
                        setSelectedOpportunities(selectedOpportunities.filter(id => id !== opportunity.id));
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white font-['Montserrat']">
                          {opportunity.title}
                        </h3>
                        <Badge className={`${getStageColor(opportunity.stage)} border text-xs`}>
                          {getStageLabel(opportunity.stage)}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-400 flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {opportunity.value.toLocaleString()}€
                        </div>
                        <div className={`text-sm font-medium ${getProbabilityColor(opportunity.probability)}`}>
                          {opportunity.probability}% probabilité
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-white/70 mb-3 font-['Montserrat'] text-sm">
                      {opportunity.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>Client: {opportunity.client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>Assigné: {opportunity.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Clôture: {opportunity.closeDate.toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {opportunity.services.slice(0, 2).map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-white/20 text-white/60">
                            {service}
                          </Badge>
                        ))}
                        {opportunity.services.length > 2 && (
                          <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                            +{opportunity.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {opportunities.length === 0 && (
          <Card className="glass-effect border-white/20 p-8 text-center">
            <Target className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 font-['Montserrat']">
              Aucune opportunité trouvée. Créez-en une nouvelle pour commencer.
            </p>
          </Card>
        )}
      </SectionWrapper>
    </motion.div>
  );
};

export default OpportunitiesSection;