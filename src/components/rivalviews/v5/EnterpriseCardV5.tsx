import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  Phone, 
  Globe, 
  Mail,
  Building,
  BarChart3,
  Download,
  UserPlus,
  Edit,
  X,
  ExternalLink,
  Target,
  Users
} from 'lucide-react';
import { UnifiedBusinessData } from './types';
import { EnterpriseMapV5 } from './EnterpriseMapV5';

interface EnterpriseCardV5Props {
  business: UnifiedBusinessData | null;
  onClose: () => void;
  mapToken: string;
}

export const EnterpriseCardV5: React.FC<EnterpriseCardV5Props> = ({
  business,
  onClose,
  mapToken
}) => {
  if (!business) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getILARecommendation = (score: number) => {
    if (score >= 80) return 'Excellent positionnement, maintenir les efforts';
    if (score >= 60) return 'Bon potentiel, optimisations SEO recommandées';
    if (score >= 40) return 'Potentiel moyen, stratégie digitale à revoir';
    return 'Faible visibilité, accompagnement prioritaire';
  };

  const getMatchingPotential = (business: UnifiedBusinessData) => {
    let score = 0;
    
    // Facteurs positifs
    if (business.organicTraffic < 500) score += 30;
    if (business.ilaScore < 60) score += 25;
    if (!business.website || business.website === '') score += 20;
    if (business.googleReviews < 20) score += 15;
    if (business.keywords < 50) score += 10;
    
    if (score >= 70) return { level: 'Élevé', color: 'text-green-400', description: 'Client idéal pour QRVISIBILITÉ™' };
    if (score >= 40) return { level: 'Moyen', color: 'text-yellow-400', description: 'Prospect intéressant avec potentiel' };
    return { level: 'Faible', color: 'text-red-400', description: 'Accompagnement nécessaire' };
  };

  const matching = getMatchingPotential(business);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, type: "spring", damping: 20 }}
        className="fixed right-0 top-0 h-full w-full max-w-2xl z-50 overflow-auto"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(245, 158, 11, 0.2)',
        }}
      >
        <div className="p-6 space-y-6">
          {/* En-tête */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {business.name}
              </h2>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  {business.sector}
                </Badge>
                <span className="text-muted-foreground">{business.city}</span>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="hover:bg-yellow-400/10">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Mini-carte si GPS disponible */}
          {business.lat && business.lng && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="h-48 rounded-lg overflow-hidden"
            >
              <EnterpriseMapV5
                businesses={[business]}
                selectedBusiness={business}
                onBusinessSelect={() => {}}
                mapToken={mapToken}
              />
            </motion.div>
          )}

          {/* Score ILA™ détaillé */}
          <Card className="bg-background/50 border-yellow-400/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Score ILA™</h3>
                <span className={`text-3xl font-bold ${getScoreColor(business.ilaScore)}`}>
                  {business.ilaScore}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {getILARecommendation(business.ilaScore)}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Présence digitale:</span>
                  <div className="font-medium text-foreground capitalize">{business.digitalPresence}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Concurrence:</span>
                  <div className="font-medium text-foreground capitalize">{business.competitionLevel}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Données générales */}
          <Card className="bg-background/50 border-border/50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-foreground">Coordonnées</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span className="text-foreground">{business.address}</span>
              </div>
              
              {business.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span className="text-foreground">{business.phone}</span>
                </div>
              )}
              
              {business.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-foreground">{business.email}</span>
                </div>
              )}
              
              {business.website && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <a 
                    href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-yellow-400 transition-colors"
                  >
                    {business.website}
                    <ExternalLink className="w-3 h-3 inline ml-1" />
                  </a>
                </div>
              )}
              
              {business.branches > 1 && (
                <div className="flex items-center gap-3 text-sm">
                  <Building className="w-4 h-4 text-orange-400" />
                  <span className="text-foreground">{business.branches} succursales</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO & Performance */}
          <Card className="bg-background/50 border-border/50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-foreground">Performance SEO</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Mots-clés indexés</div>
                  <div className="text-xl font-bold text-blue-400">{business.keywords}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Trafic organique</div>
                  <div className="text-xl font-bold text-green-400">{business.organicTraffic.toLocaleString()}/mois</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Backlinks</div>
                  <div className="text-xl font-bold text-purple-400">{business.backlinks.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Domain Rating</div>
                  <div className="text-xl font-bold text-orange-400">{business.domainRating}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avis Google */}
          <Card className="bg-background/50 border-border/50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-foreground">Réputation Google</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold text-foreground">{business.googleStars}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {business.googleReviews} avis
                </div>
              </div>
              
              {/* Réseaux sociaux */}
              {(business.facebookFollowers > 0 || business.instagramFollowers > 0 || business.tiktokFollowers > 0) && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <h4 className="text-sm font-medium text-foreground mb-2">Réseaux sociaux</h4>
                  <div className="flex gap-4 text-sm">
                    {business.facebookFollowers > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-foreground">{business.facebookFollowers.toLocaleString()} FB</span>
                      </div>
                    )}
                    {business.instagramFollowers > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-pink-400" />
                        <span className="text-foreground">{business.instagramFollowers.toLocaleString()} IG</span>
                      </div>
                    )}
                    {business.tiktokFollowers > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-red-400" />
                        <span className="text-foreground">{business.tiktokFollowers.toLocaleString()} TT</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Matching potentiel */}
          <Card className="bg-background/50 border-yellow-400/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-foreground">Potentiel QRVISIBILITÉ™</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Niveau de matching:</span>
                <Badge variant="outline" className={`${matching.color} border-current`}>
                  {matching.level}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{matching.description}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2 border-yellow-400/50 hover:bg-yellow-400/10">
              <Edit className="w-4 h-4" />
              Corriger adresse
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-green-400/50 hover:bg-green-400/10">
              <UserPlus className="w-4 h-4" />
              Associer partenaire
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-blue-400/50 hover:bg-blue-400/10">
              <Download className="w-4 h-4" />
              Exporter PDF
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};