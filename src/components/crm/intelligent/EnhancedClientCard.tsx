import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Brain,
  Target,
  MapPin,
  Phone,
  Mail,
  Globe,
  Zap,
  Star,
  Calendar,
  DollarSign,
  Users,
  Play,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { ClientFiche } from '@/types/crm.ts';

interface EnhancedClientCardProps {
  client: ClientFiche;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onActionTrigger: (action: string) => void;
  compact?: boolean;
}

const EnhancedClientCard: React.FC<EnhancedClientCardProps> = ({
  client,
  isSelected,
  onSelect,
  onActionTrigger,
  compact = false
}) => {
  const [showAISummary, setShowAISummary] = useState(false);

  // Couleur du score ILA™
  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-400/20', text: 'text-green-400', border: 'border-green-400/30' };
    if (score >= 60) return { bg: 'bg-yellow-400/20', text: 'text-yellow-400', border: 'border-yellow-400/30' };
    return { bg: 'bg-red-400/20', text: 'text-red-400', border: 'border-red-400/30' };
  };

  // Icône de tendance
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  // Couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'prospect': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'inactive': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'archived': return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  // Résumé IA généré
  const aiSummary = `Client ${client.status} avec un score ILA™ de ${client.ilaScore.current}/100. 
    Secteur ${client.sector}, revenus ${client.revenue.toLocaleString()}€. 
    ${client.services.length} services actifs. 
    Potentiel d'optimisation ${client.ilaScore.current < 70 ? 'élevé' : 'modéré'}.`;

  const scoreColor = getScoreColor(client.ilaScore.current);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Card className={`glass-effect border-white/20 transition-all duration-300 hover:border-[#8E44FF]/50 ${
        isSelected ? 'ring-2 ring-[#8E44FF]/50 border-[#8E44FF]/30' : ''
      } ${compact ? 'p-3' : 'p-4'}`}>
        
        {/* Header avec sélection */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              className="data-[state=checked]:bg-[#8E44FF] data-[state=checked]:border-[#8E44FF]"
            />
            <div className="flex items-center gap-2">
              <h3 className={`font-bold text-white font-['Montserrat'] ${compact ? 'text-sm' : 'text-base'}`}>
                {client.name}
              </h3>
              <Badge className={getStatusColor(client.status)}>
                {client.status}
              </Badge>
            </div>
          </div>
          
          {/* Actions rapides */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onActionTrigger('calculate_ila')}
              className="w-8 h-8 p-0 hover:bg-[#8E44FF]/20"
            >
              <TrendingUp className="w-4 h-4 text-[#8E44FF]" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onActionTrigger('find_matches')}
              className="w-8 h-8 p-0 hover:bg-[#FFD56B]/20"
            >
              <Target className="w-4 h-4 text-[#FFD56B]" />
            </Button>
          </div>
        </div>

        {/* Informations principales */}
        <div className="space-y-3">
          {/* Score ILA™ et revenus */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full ${scoreColor.bg} ${scoreColor.border} border`}>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${scoreColor.text} ${compact ? 'text-sm' : 'text-base'}`}>
                    ILA™ {client.ilaScore.current}
                  </span>
                  {getTrendIcon(client.ilaScore.trend)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-white/80">
              <DollarSign className="w-4 h-4" />
              <span className={`font-bold ${compact ? 'text-sm' : 'text-base'}`}>
                {client.revenue.toLocaleString()}€
              </span>
            </div>
          </div>

          {/* Secteur et localisation */}
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{client.sector}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{client.address.split(',')[1]?.trim() || 'Non définie'}</span>
            </div>
          </div>

          {/* Services */}
          {!compact && (
            <div className="flex flex-wrap gap-1">
              {client.services.slice(0, 3).map((service, index) => (
                <Badge 
                  key={index}
                  className="text-xs bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30"
                >
                  {service}
                </Badge>
              ))}
              {client.services.length > 3 && (
                <Badge className="text-xs bg-white/10 text-white/60">
                  +{client.services.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Responsable */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] flex items-center justify-center text-xs font-bold text-black">
                {client.assignedTo.charAt(0).toUpperCase()}
              </div>
              <span>{client.assignedTo}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Calendar className="w-4 h-4" />
              <span>{new Date(client.updatedAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>

          {/* Contact rapide */}
          {!compact && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              {client.contact.phone && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 hover:bg-white/10 text-white/70"
                  onClick={() => window.open(`tel:${client.contact.phone}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler
                </Button>
              )}
              {client.contact.email && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 hover:bg-white/10 text-white/70"
                  onClick={() => window.open(`mailto:${client.contact.email}`)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              )}
            </div>
          )}

          {/* Résumé IA */}
          <div className="pt-2 border-t border-white/10">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAISummary(!showAISummary)}
              className="w-full justify-start text-white/70 hover:bg-[#8E44FF]/10 hover:text-[#8E44FF]"
            >
              <Brain className="w-4 h-4 mr-2" />
              <span className="flex-1 text-left">
                {showAISummary ? 'Masquer' : 'Résumé'} IA
              </span>
              <Sparkles className="w-4 h-4" />
            </Button>
            
            {showAISummary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3 bg-[#8E44FF]/10 rounded-lg border border-[#8E44FF]/20"
              >
                <p className="text-xs text-white/80 leading-relaxed">
                  {aiSummary}
                </p>
                
                {/* Actions IA contextuelle */}
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => onActionTrigger('adluma')}
                    className="flex-1 bg-[#FFD56B]/20 hover:bg-[#FFD56B]/30 text-[#FFD56B] border border-[#FFD56B]/30"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    ADLUMA™
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onActionTrigger('ilumatch')}
                    className="flex-1 bg-[#00FF88]/20 hover:bg-[#00FF88]/30 text-[#00FF88] border border-[#00FF88]/30"
                  >
                    <Target className="w-3 h-3 mr-1" />
                    Match
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default EnhancedClientCard;