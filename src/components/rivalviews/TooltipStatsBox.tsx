import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageContext } from '@/contexts/LanguageContext';
import { RivalBusiness } from '@/types/rivalviews';
import { Star, TrendingUp, Globe, MapPin, Phone, Mail } from 'lucide-react';

interface TooltipStatsBoxProps {
  business: RivalBusiness;
  isDetailed?: boolean;
}

const TooltipStatsBox: React.FC<TooltipStatsBoxProps> = ({ business, isDetailed = false }) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';

  const content = {
    fr: {
      score: "Score ILA™",
      keywords: "Mots-clés indexés",
      topKeywords: "Mots-clés top 10",
      bestKeyword: "Meilleur mot-clé",
      reviews: "Avis Google",
      rating: "Note moyenne",
      contact: "Contact",
      sector: "Secteur",
      status: "Statut",
      potential: "Potentiel"
    },
    en: {
      score: "ILA™ Score",
      keywords: "Indexed keywords",
      topKeywords: "Top 10 keywords",
      bestKeyword: "Best keyword",
      reviews: "Google reviews",
      rating: "Average rating",
      contact: "Contact",
      sector: "Sector",
      status: "Status",
      potential: "Potential"
    },
    es: {
      score: "Puntuación ILA™",
      keywords: "Palabras clave indexadas",
      topKeywords: "Palabras clave top 10",
      bestKeyword: "Mejor palabra clave",
      reviews: "Reseñas Google",
      rating: "Calificación promedio",
      contact: "Contacto",
      sector: "Sector",
      status: "Estado",
      potential: "Potencial"
    }
  };

  const t = content[language as keyof typeof content];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPotentialColor = (potential: string) => {
    const colors = {
      high: 'text-emerald-400',
      medium: 'text-yellow-400',
      low: 'text-red-400'
    };
    return colors[potential as keyof typeof colors] || 'text-gray-400';
  };

  const mockKeywords = [
    'restaurant montreal', 'livraison rapide', 'cuisine locale', 'avis clients', 'menu prix'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.2 }}
      className="z-50"
    >
      <Card className={`glass-effect border-white/30 shadow-2xl ${isDetailed ? 'w-80' : 'w-64'} backdrop-blur-md`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg font-['Montserrat'] flex items-center justify-between">
            <span className="truncate">{business.name}</span>
            <Badge className={`${getScoreColor(business.ilaScore)} bg-transparent border-current`}>
              {business.ilaScore}
            </Badge>
          </CardTitle>
          <div className="flex items-center text-white/60 text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            {business.city}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Score ILA™ */}
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm">{t.score}</span>
            <div className="flex items-center">
              <TrendingUp className={`w-4 h-4 mr-1 ${getScoreColor(business.ilaScore)}`} />
              <span className={`font-bold ${getScoreColor(business.ilaScore)}`}>
                {business.ilaScore}/100
              </span>
            </div>
          </div>

          {/* Google Reviews */}
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm">{t.rating}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              <span className="text-white font-medium">
                {business.googleRating} ({business.reviewCount})
              </span>
            </div>
          </div>

          {isDetailed && (
            <>
              {/* Mock SEO Data */}
              <div className="border-t border-white/10 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">{t.keywords}</span>
                  <span className="text-white font-medium">{business.indexedKeywords}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">{t.topKeywords}</span>
                  <span className="text-emerald-400 font-medium">{business.top10Keywords}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">{t.bestKeyword}</span>
                  <span className="text-white font-medium text-xs">{business.topKeyword}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">Backlinks</span>
                  <span className="text-white font-medium">{business.backlinks}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">Trafic mensuel</span>
                  <span className="text-white font-medium">{business.organicTraffic.toLocaleString()}</span>
                </div>
              </div>

              {/* Network Info */}
              {business.isChain && (
                <div className="border-t border-white/10 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">Type</span>
                    <span className="text-yellow-400 font-medium text-sm">Réseau</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">Succursales</span>
                    <span className="text-white font-medium">{business.chainCount}</span>
                  </div>
                </div>
              )}

              {/* Photos & Distance */}
              <div className="border-t border-white/10 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">Photos</span>
                  <span className={`font-medium text-sm ${business.hasPhotos ? 'text-emerald-400' : 'text-red-400'}`}>
                    {business.hasPhotos ? 'Oui' : 'Non'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">Distance</span>
                  <span className="text-white font-medium text-sm">{business.distanceFromUser}km</span>
                </div>

                {business.avgPosition && (
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">Pos. moyenne</span>
                    <span className="text-white font-medium text-sm">{business.avgPosition}</span>
                  </div>
                )}
              </div>

              {/* Top Keywords */}
              <div className="border-t border-white/10 pt-3">
                <div className="text-white/80 text-sm mb-2">Top 3 mots-clés:</div>
                <div className="flex flex-wrap gap-1">
                  <div className="text-xs border-white/20 text-white/60 bg-white/10 px-2 py-1 rounded">
                    {business.topKeyword} ({business.topKeywordVolume?.toLocaleString()})
                  </div>
                </div>
              </div>

              {/* Last Review Preview */}
              {business.lastReview && (
                <div className="border-t border-white/10 pt-3">
                  <div className="text-white/80 text-sm mb-1">Dernier avis:</div>
                  <div className="text-white/60 text-xs italic">"{business.lastReview}"</div>
                </div>
              )}

              {/* Business Info */}
              <div className="border-t border-white/10 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">{t.sector}</span>
                  <span className="text-white font-medium text-sm">{business.sector}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">{t.potential}</span>
                  <span className={`font-medium text-sm ${getPotentialColor(business.potential)}`}>
                    {business.potential === 'high' ? 'Élevé' : 
                     business.potential === 'medium' ? 'Moyen' : 'Faible'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">Commentaires</span>
                  <span className="text-white font-medium text-sm">{business.totalComments}</span>
                </div>
              </div>

              {/* Contact Info */}
              {(business.phone || business.email || business.website) && (
                <div className="border-t border-white/10 pt-3 space-y-1">
                  {business.phone && (
                    <div className="flex items-center text-white/60 text-xs">
                      <Phone className="w-3 h-3 mr-2" />
                      {business.phone}
                    </div>
                  )}
                  {business.email && (
                    <div className="flex items-center text-white/60 text-xs">
                      <Mail className="w-3 h-3 mr-2" />
                      {business.email}
                    </div>
                  )}
                  {business.website && (
                    <div className="flex items-center text-white/60 text-xs">
                      <Globe className="w-3 h-3 mr-2" />
                      Site web
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TooltipStatsBox;