import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Star, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Brain,
  Target,
  Users,
  Calendar
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';

interface EnhancedBusinessTooltipProps {
  business: RivalBusiness;
  position: { x: number; y: number };
  onCompare: () => void;
  onViewDetails: () => void;
  onAddToCRM: () => void;
  isVisible: boolean;
}

const EnhancedBusinessTooltip: React.FC<EnhancedBusinessTooltipProps> = ({
  business,
  position,
  onCompare,
  onViewDetails,
  onAddToCRM,
  isVisible
}) => {
  if (!isVisible) return null;

  const getScoreColor = (score: number) => {
    if (score >= 86) return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
    if (score >= 66) return 'text-green-400 bg-green-400/20 border-green-400/30';
    if (score >= 41) return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
    return 'text-red-400 bg-red-400/20 border-red-400/30';
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'text-[#00FF88] bg-[#00FF88]/20 border-[#00FF88]/30';
      case 'medium': return 'text-[#FFD56B] bg-[#FFD56B]/20 border-[#FFD56B]/30';
      default: return 'text-white/60 bg-white/10 border-white/20';
    }
  };

  return (
    <Card 
      className="glass-effect border-white/20 p-4 absolute z-50 w-80 shadow-2xl"
      style={{
        left: position.x + 10,
        top: position.y - 200,
        transform: position.y < 200 ? 'translateY(200px)' : 'none'
      }}
    >
      {/* Header avec nom et score */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white font-['Montserrat'] mb-1">
            {business.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/80">{business.city}</span>
            <Badge className="text-xs">{business.sector}</Badge>
          </div>
        </div>
        <Badge className={`${getScoreColor(business.ilaScore)} font-bold`}>
          ILA™ {business.ilaScore}/100
        </Badge>
      </div>

      {/* Métriques clés */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#FFD56B]" />
            <span className="text-sm text-white/80">
              {business.googleRating || 'N/A'} ⭐
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/80">
              {business.reviewCount || 0} avis
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#8E44FF]" />
            <Badge className={getPotentialColor(business.potential)}>
              {business.potential === 'high' ? 'Fort' : 
               business.potential === 'medium' ? 'Moyen' : 'Faible'} potentiel
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/80 capitalize">
              {business.status}
            </span>
          </div>
        </div>
      </div>

      {/* Analyse IA si disponible */}
      {business.notes && (
        <div className="mb-4 p-3 bg-[#8E44FF]/10 border border-[#8E44FF]/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-[#8E44FF]" />
            <span className="text-sm font-medium text-white">Analyse IA</span>
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            {business.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={onViewDetails}
          className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Détails
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCompare}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Target className="w-4 h-4 mr-1" />
          Comparer
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onAddToCRM}
          className="border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10"
        >
          <Calendar className="w-4 h-4" />
        </Button>
      </div>

      {/* Contact rapide si disponible */}
      {business.phone && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <a 
            href={`tel:${business.phone}`}
            className="flex items-center gap-2 text-sm text-[#FFD56B] hover:text-[#FFD56B]/80 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {business.phone}
          </a>
        </div>
      )}
    </Card>
  );
};

export default EnhancedBusinessTooltip;