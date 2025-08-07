import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RivalBusiness } from '@/types/rivalviews';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  TrendingUp,
  BarChart3,
  Eye,
  ThumbsUp,
  ExternalLink,
  X,
  Building2,
  Award,
  Target
} from 'lucide-react';

interface BusinessDetailPanelProps {
  business: RivalBusiness | null;
  onClose: () => void;
}

export const BusinessDetailPanel: React.FC<BusinessDetailPanelProps> = ({
  business,
  onClose
}) => {
  if (!business) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (score >= 60) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed right-0 top-0 h-full w-[400px] bg-gradient-to-b from-slate-900/98 to-slate-800/98 backdrop-blur-xl border-l border-purple-500/30 shadow-2xl z-50 overflow-y-auto"
    >
      {/* En-tête */}
      <div className="sticky top-0 bg-gradient-to-r from-purple-600/20 to-violet-600/20 p-4 border-b border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-400" />
            <h2 className="font-semibold text-white truncate">Détails Entreprise</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-red-500/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Informations principales */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg text-white truncate">
                  {business.name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">
                    {business.address}, {business.city}
                  </span>
                </div>
              </div>
              <Badge className={getScoreBadgeColor(business.ilaScore)}>
                {business.ilaScore}/100
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Score ILA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Score ILA™</span>
                <span className={`text-lg font-bold ${getScoreColor(business.ilaScore)}`}>
                  {business.ilaScore}/100
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    business.ilaScore >= 80 ? 'bg-emerald-500' :
                    business.ilaScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${business.ilaScore}%` }}
                />
              </div>
            </div>

            {/* Secteur */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Secteur</span>
              <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                {business.sector}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {business.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <a 
                  href={`tel:${business.phone}`}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {business.phone}
                </a>
              </div>
            )}
            {business.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <a 
                  href={`mailto:${business.email}`}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {business.email}
                </a>
              </div>
            )}
            {business.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-slate-400" />
                <a 
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  Site web
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Métriques sociales */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Métriques Sociales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {business.googleRating && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-slate-300">Google</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 font-semibold">{business.googleRating}</span>
                  <span className="text-xs text-slate-400">({business.reviewCount || 0} avis)</span>
                </div>
              </div>
            )}

            {(business as any).facebook_followers && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-slate-300">Facebook</span>
                </div>
                <span className="text-blue-400 font-semibold">
                  {(business as any).facebook_followers.toLocaleString()}
                </span>
              </div>
            )}

            {(business as any).instagram_followers && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-pink-400" />
                  <span className="text-sm text-slate-300">Instagram</span>
                </div>
                <span className="text-pink-400 font-semibold">
                  {(business as any).instagram_followers.toLocaleString()}
                </span>
              </div>
            )}

            {(business as any).tiktok_followers && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-slate-300">TikTok</span>
                </div>
                <span className="text-purple-400 font-semibold">
                  {(business as any).tiktok_followers.toLocaleString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Target className="h-4 w-4" />
              Informations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(business as any).branches && (business as any).branches > 1 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Succursales</span>
                <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                  {(business as any).branches}
                </Badge>
              </div>
            )}

            {business.potential && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Potentiel</span>
                <Badge 
                  variant="outline" 
                  className={
                    business.potential === 'high' 
                      ? 'text-emerald-400 border-emerald-500/30'
                      : 'text-amber-400 border-amber-500/30'
                  }
                >
                  {business.potential === 'high' ? 'Élevé' : 'Moyen'}
                </Badge>
              </div>
            )}

            {(business as any).total_traffic && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Traffic Web</span>
                <span className="text-sm font-semibold text-blue-400">
                  {(business as any).total_traffic.toLocaleString()}
                </span>
              </div>
            )}

            {(business as any).total_keywords && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Mots-clés</span>
                <span className="text-sm font-semibold text-violet-400">
                  {(business as any).total_keywords.toLocaleString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          {business.website && (
            <Button 
              variant="outline" 
              className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
              onClick={() => window.open(business.website, '_blank')}
            >
              <Globe className="h-4 w-4 mr-2" />
              Visiter le site web
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
            onClick={() => {
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${business.name} ${business.address} ${business.city}`
              )}`;
              window.open(googleMapsUrl, '_blank');
            }}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Voir sur Google Maps
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessDetailPanel;