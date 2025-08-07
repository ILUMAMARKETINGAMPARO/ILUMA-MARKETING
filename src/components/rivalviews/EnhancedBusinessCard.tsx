import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Star, 
  BarChart3, 
  Target, 
  Hash,
  Instagram,
  Facebook,
  Globe,
  Eye,
  Users,
  Zap,
  ArrowUpRight,
  MapPin,
  Phone
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';

interface EnhancedBusinessCardProps {
  business: RivalBusiness;
  onSelect?: (business: RivalBusiness) => void;
  onCompare?: (business: RivalBusiness) => void;
  onAddToCRM?: (business: RivalBusiness) => void;
  className?: string;
}

const EnhancedBusinessCard: React.FC<EnhancedBusinessCardProps> = ({
  business,
  onSelect,
  onCompare,
  onAddToCRM,
  className = ''
}) => {
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'low': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card className="glass-effect border-white/20 hover:border-[#8E44FF]/50 transition-all duration-300 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-white font-bold text-lg mb-2 font-['Montserrat']">
                🏢 {business.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{business.city}, {business.sector}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={`${getScoreColor(business.ilaScore)} border text-xs`}>
                ILA™ {business.ilaScore}
              </Badge>
              <Badge className={`${getPotentialColor(business.potential)} border text-xs`}>
                {business.potential}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Format uniforme selon demande */}
          <div className="space-y-2">
            {/* Trafic estimé */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#F5D06F]" />
                📈 Trafic estimé (Ahrefs) :
              </span>
              <span className="text-[#F5D06F] font-bold">
                {business.organicTraffic.toLocaleString()} /mois
              </span>
            </div>

            {/* Total mots-clés */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm flex items-center gap-2">
                <Hash className="w-4 h-4 text-white" />
                🔎 Total de mots-clés (Ahrefs) :
              </span>
              <span className="text-white font-semibold">
                {business.indexedKeywords.toLocaleString()}
              </span>
            </div>

            {/* Top 10 et Top 20 */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">🥇 Top 10 :</span>
                <span className="text-white font-semibold">{business.top10Keywords}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">🥈 Top 20 :</span>
                <span className="text-white font-semibold">{business.top20Keywords || 0}</span>
              </div>
            </div>

            {/* Mot-clé principal */}
            <div className="border-t border-white/10 pt-2">
              <div className="text-gray-300 text-sm mb-1">💥 Mot-clé #1 :</div>
              <div className="text-[#8E44FF] font-semibold text-sm">
                "{business.topKeyword}" ({business.topKeywordVolume?.toLocaleString() || '1,000'} vues)
              </div>
            </div>

            {/* Scores */}
            <div className="border-t border-white/10 pt-2 grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">📊 Score SEO Iluma™ :</span>
                <span className="text-[#F5D06F] font-bold">
                  {business.seoScore || (business.ilaScore / 20).toFixed(1)} / 5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">⭐ Réputation Google :</span>
                <span className="text-white font-semibold">
                  {business.googleRating} ★
                </span>
              </div>
            </div>

            {/* Social Media */}
            {(business.followersInstagram || business.followersFacebook) && (
              <div className="border-t border-white/10 pt-2">
                <div className="text-gray-300 text-sm mb-2">📱 Réseaux Sociaux :</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {business.followersInstagram && (
                    <div className="flex items-center gap-1">
                      <Instagram className="w-3 h-3 text-pink-400" />
                      <span className="text-white">{business.followersInstagram.toLocaleString()}</span>
                    </div>
                  )}
                  {business.followersFacebook && (
                    <div className="flex items-center gap-1">
                      <Facebook className="w-3 h-3 text-blue-400" />
                      <span className="text-white">{business.followersFacebook.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action IA recommandée */}
            <div className="border-t border-white/10 pt-2">
              <div className="text-gray-300 text-sm mb-1">🎯 Action IA recommandée :</div>
              <div className="text-[#8E44FF] font-bold text-sm">
                {business.aiRecommendedAction || 'SEO local + contenu blog'}
              </div>
            </div>
          </div>

          {/* Contact rapide */}
          {business.phone && (
            <div className="border-t border-white/10 pt-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open(`tel:${business.phone}`, '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Appeler
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect?.(business)}
              className="flex-1 border-[#8E44FF]/30 text-[#8E44FF] hover:bg-[#8E44FF]/10"
            >
              <Eye className="w-4 h-4 mr-2" />
              Détails
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCompare?.(business)}
              className="flex-1 border-[#FFD56B]/30 text-[#FFD56B] hover:bg-[#FFD56B]/10"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Comparer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddToCRM?.(business)}
              className="border-green-400/30 text-green-400 hover:bg-green-400/10"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedBusinessCard;