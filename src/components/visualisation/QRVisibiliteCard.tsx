import React from 'react';
import { useHeatmap } from '@/contexts/HeatmapContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Globe, Star, TrendingUp } from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';

interface QRVisibiliteCardProps {
  business: RivalBusiness;
  onSelect?: (business: RivalBusiness) => void;
  onAction?: (business: RivalBusiness, action: string) => void;
  className?: string;
}

const QRVisibiliteCard: React.FC<QRVisibiliteCardProps> = ({
  business,
  onSelect,
  onAction,
  className
}) => {
  const getStatusColor = (status: string) => {
    const colors = {
      prospect: 'bg-blue-500/20 text-blue-300',
      contacted: 'bg-yellow-500/20 text-yellow-300',
      client: 'bg-green-500/20 text-green-300',
      lost: 'bg-red-500/20 text-red-300'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-300';
  };

  const getPotentialColor = (potential: string) => {
    const colors = {
      high: 'text-green-400',
      medium: 'text-yellow-400',
      low: 'text-red-400'
    };
    return colors[potential as keyof typeof colors] || 'text-gray-400';
  };

  const getILAColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className={`glass-effect border-white/20 hover:border-primary/50 transition-all duration-300 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-white text-lg mb-1">{business.name}</CardTitle>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4" />
              {business.address}, {business.city}
            </div>
          </div>
          <Badge className={getStatusColor(business.status)}>
            {business.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Informations de base */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="text-white/60">Secteur</div>
            <div className="text-white font-medium">{business.sector}</div>
          </div>
          <div className="space-y-2">
            <div className="text-white/60">Source</div>
            <div className="text-white font-medium">{business.source}</div>
          </div>
        </div>

        {/* Score ILA et évaluation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-white/80 text-sm">Score ILA™</span>
          </div>
          <Badge className={`font-bold ${getILAColor(business.ilaScore)}`}>
            {business.ilaScore}/100
          </Badge>
        </div>

        {/* Avis Google */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-white/80 text-sm">Google</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white font-medium">{business.googleRating}</span>
            <span className="text-white/60 text-sm">({business.reviewCount} avis)</span>
          </div>
        </div>

        {/* Potentiel */}
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm">Potentiel</span>
          <span className={`font-medium ${getPotentialColor(business.potential)}`}>
            {business.potential === 'high' ? 'Élevé' : 
             business.potential === 'medium' ? 'Moyen' : 'Faible'}
          </span>
        </div>

        {/* Contact */}
        <div className="space-y-2 border-t border-white/10 pt-3">
          {business.phone && (
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Phone className="w-4 h-4" />
              {business.phone}
            </div>
          )}
          {business.email && (
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Mail className="w-4 h-4" />
              {business.email}
            </div>
          )}
          {business.website && (
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Globe className="w-4 h-4" />
              Site web
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-white/10">
          <Button
            size="sm"
            onClick={() => onSelect?.(business)}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white"
            variant="outline"
          >
            Voir détails
          </Button>
          <Button
            size="sm"
            onClick={() => onAction?.(business, 'contact')}
            className="flex-1 bg-gradient-to-r from-primary to-secondary text-black"
          >
            Contacter
          </Button>
        </div>

        {/* Tags */}
        {business.tags && business.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {business.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-white/20 text-white/60">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRVisibiliteCard;