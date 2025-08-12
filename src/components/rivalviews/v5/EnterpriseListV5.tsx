import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  Phone, 
  Globe, 
  Heart,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { UnifiedBusinessData } from './types';

interface EnterpriseListV5Props {
  businesses: UnifiedBusinessData[];
  selectedBusiness: UnifiedBusinessData | null;
  onBusinessSelect: (business: UnifiedBusinessData) => void;
  favorites: string[];
  onToggleFavorite: (businessId: string) => void;
}

export const EnterpriseListV5: React.FC<EnterpriseListV5Props> = ({
  businesses,
  selectedBusiness,
  onBusinessSelect,
  favorites,
  onToggleFavorite
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getDigitalPresenceBadge = (presence: string): "default" | "secondary" | "destructive" => {
    const variants = {
      'forte': 'default' as const,
      'moyenne': 'secondary' as const,
      'faible': 'destructive' as const
    };
    return variants[presence as keyof typeof variants] || 'secondary';
  };

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
      {businesses.map((business, index) => (
        <motion.div
          key={business.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card 
            className={`group hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 ${
              selectedBusiness?.id === business.id 
                ? 'border-l-yellow-400 bg-background/80 shadow-lg ring-2 ring-yellow-400/20' 
                : 'border-l-border hover:border-l-yellow-400/60'
            }`}
            style={{
              background: selectedBusiness?.id === business.id 
                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(15, 23, 42, 0.8) 100%)'
                : 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(245, 158, 11, 0.1)'
            }}
            onClick={() => onBusinessSelect(business)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* En-tête avec nom et badges */}
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-yellow-400 transition-colors">
                      {business.name}
                    </h3>
                    <Badge 
                      variant={getDigitalPresenceBadge(business.digitalPresence)}
                      className="text-xs"
                    >
                      {business.digitalPresence}
                    </Badge>
                    {business.lat && business.lng ? (
                      <div title="GPS disponible">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                    ) : (
                      <div title="GPS manquant">
                        <XCircle className="w-4 h-4 text-red-400" />
                      </div>
                    )}
                  </div>

                  {/* Secteur et ville */}
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <span className="font-medium text-yellow-400">{business.sector}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {business.city}
                    </div>
                  </div>

                  {/* Statistiques RÉELLES de votre Supabase */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm mb-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{business.googleStars}</span>
                      <span className="text-xs">({business.googleReviews})</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="font-bold text-green-400">{business.organicTraffic.toLocaleString()}</span>
                      <span className="text-xs">trafic/mois</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="font-bold text-blue-400">{business.keywords.toLocaleString()}</span>
                      <span className="text-xs">mots-clés</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-4 h-4 text-purple-400 text-center font-bold">BL</span>
                      <span className="font-bold text-purple-400">{business.backlinks.toLocaleString()}</span>
                      <span className="text-xs">backlinks</span>
                    </div>
                    
                    <div className={`flex items-center gap-2 font-bold ${getScoreColor(business.ilaScore)}`}>
                      <span>ILA™ {business.ilaScore}</span>
                    </div>
                  </div>

                  {/* Métriques avancées COMPLÈTES - Toutes les données Supabase */}
                  {(business.domainRating > 0 || business.refDomains || business.ahrefsRank) && (
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground border-t border-border/20 pt-2">
                      {business.domainRating > 0 && (
                        <span>DR: <span className="text-orange-400 font-bold">{business.domainRating}</span></span>
                      )}
                      {business.refDomains && business.refDomains > 0 && (
                        <span>RD: <span className="text-blue-400 font-bold">{business.refDomains}</span></span>
                      )}
                      {business.ahrefsRank && business.ahrefsRank > 0 && (
                        <span>AR: <span className="text-purple-400 font-bold">{business.ahrefsRank.toLocaleString()}</span></span>
                      )}
                      {business.pagesIndexees && business.pagesIndexees > 0 && (
                        <span>Pages: <span className="text-indigo-400 font-bold">{business.pagesIndexees}</span></span>
                      )}
                      
                      {/* Badges de performance */}
                      {business.organicTraffic > 10000 && (
                        <span className="text-green-400 font-medium">🔥 FORT TRAFIC</span>
                      )}
                      {business.backlinks > 1000 && (
                        <span className="text-purple-400 font-medium">💪 FORTE AUTORITÉ</span>
                      )}
                      {business.keywords > 10000 && (
                        <span className="text-blue-400 font-medium">🎯 RICHE SEO</span>
                      )}
                      {business.presenceBlog && (
                        <span className="text-cyan-400 font-medium">📝 BLOG ACTIF</span>
                      )}
                      {business.refDomainsEducational && business.refDomainsEducational > 0 && (
                        <span className="text-yellow-400 font-medium">🎓 LIENS EDU</span>
                      )}
                      {business.refDomainsGovernmental && business.refDomainsGovernmental > 0 && (
                        <span className="text-red-400 font-medium">🏛️ LIENS GOV</span>
                      )}
                    </div>
                  )}
                  
                  {/* Scores détaillés ILA */}
                  {(business.seoScoreDetailed || business.contenuScore || business.reputationScore) && (
                    <div className="grid grid-cols-4 gap-2 text-xs mt-2 p-2 bg-background/20 rounded">
                      {business.seoScoreDetailed > 0 && (
                        <div className="text-center">
                          <div className="text-green-400 font-bold">{business.seoScoreDetailed}</div>
                          <div className="text-muted-foreground">SEO</div>
                        </div>
                      )}
                      {business.contenuScore > 0 && (
                        <div className="text-center">
                          <div className="text-blue-400 font-bold">{business.contenuScore}</div>
                          <div className="text-muted-foreground">Contenu</div>
                        </div>
                      )}
                      {business.reputationScore > 0 && (
                        <div className="text-center">
                          <div className="text-yellow-400 font-bold">{business.reputationScore}</div>
                          <div className="text-muted-foreground">Réputation</div>
                        </div>
                      )}
                      {business.positionScore > 0 && (
                        <div className="text-center">
                          <div className="text-purple-400 font-bold">{business.positionScore}</div>
                          <div className="text-muted-foreground">Position</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contact rapide */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    {business.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{business.phone}</span>
                      </div>
                    )}
                    {business.website && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span className="truncate max-w-[120px]">{business.website}</span>
                      </div>
                    )}
                  </div>

                  {/* Réseaux sociaux */}
                  {(business.facebookFollowers > 0 || business.instagramFollowers > 0 || business.tiktokFollowers > 0) && (
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      {business.facebookFollowers > 0 && (
                        <span className="text-blue-400">FB: {business.facebookFollowers.toLocaleString()}</span>
                      )}
                      {business.instagramFollowers > 0 && (
                        <span className="text-pink-400">IG: {business.instagramFollowers.toLocaleString()}</span>
                      )}
                      {business.tiktokFollowers > 0 && (
                        <span className="text-red-400">TT: {business.tiktokFollowers.toLocaleString()}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(business.id);
                    }}
                    className="hover:bg-yellow-400/10"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.includes(business.id) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-muted-foreground hover:text-yellow-400'
                      }`} 
                    />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};