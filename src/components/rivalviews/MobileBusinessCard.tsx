import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  TrendingUp, 
  Target, 
  ArrowLeftRight, 
  Phone, 
  Globe,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';

interface MobileBusinessCardProps {
  business: RivalBusiness;
  isNew?: boolean;
  isReference?: boolean;
  onCompareClick?: (business: RivalBusiness) => void;
  onSelectClick?: (business: RivalBusiness) => void;
  isSelected?: boolean;
}

const MobileBusinessCard: React.FC<MobileBusinessCardProps> = ({
  business,
  isNew = false,
  isReference = false,
  onCompareClick,
  onSelectClick,
  isSelected = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card 
        className={`
          bg-black/90 border-[#8E44FF]/30 backdrop-blur-xl relative
          ${isReference ? 'border-[#FFD56B] ring-1 ring-[#FFD56B]/50' : ''}
          ${isNew ? 'ring-2 ring-green-400 ring-offset-1 ring-offset-black' : ''}
          ${isSelected ? 'border-[#8E44FF] ring-1 ring-[#8E44FF]/50' : ''}
          transition-all duration-200
        `}
        onClick={() => onSelectClick?.(business)}
      >
        {/* Badge "NOUVEAU" */}
        {isNew && (
          <div className="absolute -top-1 -right-1 z-10">
            <Badge className="bg-green-500 text-white text-xs px-2 py-0.5 animate-pulse">
              ✨ NOUVEAU
            </Badge>
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-white text-base leading-tight truncate">
                {business.name}
              </CardTitle>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-[#8E44FF] flex-shrink-0" />
                <p className="text-white/60 text-xs truncate">{business.city}</p>
              </div>
              <p className="text-[#8E44FF] text-xs mt-1">{business.sector}</p>
            </div>
            
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <Badge className={`
                text-xs px-2 py-1
                ${business.ilaScore >= 80 ? 'bg-green-500' : 
                  business.ilaScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'} 
                text-white
              `}>
                ILA: {business.ilaScore}
              </Badge>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          {/* Statistiques RÉELLES de votre Supabase - Métriques principales */}
          <div className="grid grid-cols-3 gap-2 text-xs mb-3">
            {/* Google Rating */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400 font-medium">GMB</span>
              </div>
              <div className="text-white font-semibold">
                {business.googleRating.toFixed(1)}/5
              </div>
              <div className="text-white/60">
                ({business.reviewCount})
              </div>
            </div>
            
            {/* Trafic Organique */}
            <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-green-400 font-medium">Trafic</span>
              </div>
              <div className="text-white font-semibold">
                {business.organicTraffic > 0 ? (business.organicTraffic > 1000 ? `${Math.round(business.organicTraffic/1000)}K` : business.organicTraffic) : '0'}
              </div>
              <div className="text-white/60">
                /mois
              </div>
            </div>
            
            {/* Mots-clés */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
              <div className="flex items-center gap-1 mb-1">
                <Target className="w-3 h-3 text-purple-400" />
                <span className="text-purple-400 font-medium">KW</span>
              </div>
              <div className="text-white font-semibold">
                {business.indexedKeywords > 0 ? (business.indexedKeywords > 1000 ? `${Math.round(business.indexedKeywords/1000)}K` : business.indexedKeywords) : '0'}
              </div>
              <div className="text-white/60">
                mots-clés
              </div>
            </div>
          </div>

          {/* Statistiques avancées - Deuxième ligne COMPLÈTE */}
          <div className="grid grid-cols-3 gap-2 text-xs mb-3">
            {/* Backlinks */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded p-1.5">
              <div className="flex items-center justify-between">
                <span className="text-orange-400 font-medium">BL</span>
                <span className="text-white font-semibold">
                  {business.backlinks > 0 ? (business.backlinks > 1000 ? `${Math.round(business.backlinks/1000)}K` : business.backlinks) : '0'}
                </span>
              </div>
            </div>
            
            {/* Domain Rating */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-1.5">
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-medium">DR</span>
                <span className="text-white font-semibold">
                  {business.domainRating || '0'}
                </span>
              </div>
            </div>
            
            {/* Ref Domains */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-1.5">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-medium">RD</span>
                <span className="text-white font-semibold">
                  {business.refDomains || '0'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Badges de performance avancés */}
          <div className="flex flex-wrap gap-1 text-xs mb-2">
            {business.organicTraffic > 5000 && (
              <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded">🔥 Trafic Fort</span>
            )}
            {business.domainRating && business.domainRating > 30 && (
              <span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">💪 Autorité</span>
            )}
            {business.presenceBlog && (
              <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">📝 Blog</span>
            )}
            {business.refDomainsEducational && business.refDomainsEducational > 0 && (
              <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">🎓 EDU</span>
            )}
            {business.refDomainsGovernmental && business.refDomainsGovernmental > 0 && (
              <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded">🏛️ GOV</span>
            )}
          </div>
          
          {/* Actions mobiles */}
          <div className="flex gap-2">
            {onCompareClick && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onCompareClick(business);
                }}
                className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white h-8 text-xs"
                size="sm"
              >
                <ArrowLeftRight className="w-3 h-3 mr-1" />
                Comparer
              </Button>
            )}
            
            {business.phone && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`tel:${business.phone}`, '_self');
                }}
                variant="outline"
                className="border-[#FFD56B] text-[#FFD56B] hover:bg-[#FFD56B]/10 h-8 px-3"
                size="sm"
              >
                <Phone className="w-3 h-3" />
              </Button>
            )}
            
            {business.website && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(business.website, '_blank');
                }}
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400/10 h-8 px-3"
                size="sm"
              >
                <Globe className="w-3 h-3" />
              </Button>
            )}
          </div>
          
          {/* Détails supplémentaires COMPLETS */}
          <div className="text-xs text-white/60 space-y-1">
            <div className="flex justify-between">
              <span>Trafic organique:</span>
              <span className="text-white">{business.organicTraffic.toLocaleString()}/mois</span>
            </div>
            <div className="flex justify-between">
              <span>Backlinks totaux:</span>
              <span className="text-white">{business.backlinks.toLocaleString()}</span>
            </div>
            {business.refDomains && business.refDomains > 0 && (
              <div className="flex justify-between">
                <span>Domaines référents:</span>
                <span className="text-white">{business.refDomains}</span>
              </div>
            )}
            {business.pagesIndexees && business.pagesIndexees > 0 && (
              <div className="flex justify-between">
                <span>Pages indexées:</span>
                <span className="text-white">{business.pagesIndexees}</span>
              </div>
            )}
            {business.ahrefsRank && business.ahrefsRank > 0 && (
              <div className="flex justify-between">
                <span>Ahrefs Rank:</span>
                <span className="text-white">{business.ahrefsRank.toLocaleString()}</span>
              </div>
            )}
            {business.distanceFromUser && (
              <div className="flex justify-between">
                <span>Distance:</span>
                <span className="text-white">{business.distanceFromUser.toFixed(1)} km</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MobileBusinessCard;