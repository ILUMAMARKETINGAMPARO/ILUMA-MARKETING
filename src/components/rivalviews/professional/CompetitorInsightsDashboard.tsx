import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RivalBusiness } from '@/types/rivalviews';
import { 
  Target, 
  Star, 
  ExternalLink,
  MessageSquare,
  ArrowUpRight,
  Crown
} from 'lucide-react';

interface CompetitorInsightsDashboardProps {
  business: RivalBusiness;
  competitors: RivalBusiness[];
  onViewWebsite?: (url: string) => void;
  onAnalyzeCompetitor?: (business: RivalBusiness) => void;
}

const CompetitorInsightsDashboard: React.FC<CompetitorInsightsDashboardProps> = ({
  business,
  competitors,
  onViewWebsite,
  onAnalyzeCompetitor
}) => {
  // Calcul des métriques essentielles
  const sectorCompetitors = competitors.filter(c => c.sector === business.sector);
  const avgScore = sectorCompetitors.length > 0 
    ? sectorCompetitors.reduce((sum, c) => sum + c.ilaScore, 0) / sectorCompetitors.length 
    : 0;
  
  const rankingPosition = sectorCompetitors
    .sort((a, b) => b.ilaScore - a.ilaScore)
    .findIndex(c => c.id === business.id) + 1;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-4">
      {/* Header simplifié */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-white border border-slate-200 shadow-sm"
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                {business.name.charAt(0)}
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900">{business.name}</h3>
                <div className="flex items-center gap-3 text-sm">
                  <Badge className={`${getScoreColor(business.ilaScore)} border text-xs`}>
                    {business.ilaScore}/100
                  </Badge>
                  <span className="text-slate-600">{business.city} • {business.sector}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {business.website && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewWebsite?.(business.website!)}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </motion.div>

      {/* Métriques essentielles en grille compacte */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-slate-600">Score ILA™</span>
            </div>
            <div className="text-lg font-bold text-slate-900">{business.ilaScore}/100</div>
            <div className="text-xs text-slate-500">#{rankingPosition} sur {sectorCompetitors.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-medium text-slate-600">Note Google</span>
            </div>
            <div className="text-lg font-bold text-slate-900">{business.googleRating}/5</div>
            <div className="text-xs text-slate-500">{business.reviewCount} avis</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-slate-600">Trafic/mois</span>
            </div>
            <div className="text-lg font-bold text-slate-900">{business.organicTraffic.toLocaleString()}</div>
            <div className="text-xs text-slate-500">{business.top10Keywords} mots-clés top 10</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium text-slate-600">Backlinks</span>
            </div>
            <div className="text-lg font-bold text-slate-900">{business.backlinks}</div>
            <div className="text-xs text-slate-500">Autorité domaine</div>
          </CardContent>
        </Card>
      </div>

      {/* Analyse rapide */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-slate-900 mb-3">Analyse rapide</h4>
          <div className="space-y-2">
            {business.ilaScore > avgScore && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Performance supérieure à la moyenne du secteur (+{(business.ilaScore - avgScore).toFixed(1)} points)</span>
              </div>
            )}
            {business.googleRating >= 4.5 && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Excellente réputation client</span>
              </div>
            )}
            {business.organicTraffic > 5000 && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Fort trafic organique</span>
              </div>
            )}
            {business.ilaScore < 60 && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Score ILA™ à améliorer</span>
              </div>
            )}
            {business.organicTraffic < 1000 && (
              <div className="flex items-center gap-2 text-orange-700 bg-orange-50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">Potentiel SEO sous-exploité</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorInsightsDashboard;