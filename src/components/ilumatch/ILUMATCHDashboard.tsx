import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Target, 
  MapPin, 
  TrendingUp, 
  Users, 
  Zap, 
  Globe, 
  Calendar,
  Star,
  ArrowRight,
  BarChart3,
  Network
} from 'lucide-react';
import { useILUMATCH } from '@/contexts/ILUMATCHContext';
import BusinessRegistrationForm from './BusinessRegistrationForm';
import MatchesMap from './MatchesMap';
import ILAScoreCard from './ILAScoreCard';

const ILUMATCHDashboard = () => {
  const { businesses, matches, isCalculating } = useILUMATCH();
  const [activeTab, setActiveTab] = useState('overview');

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case 'perfecto':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'compensatorio':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-red-500/20 text-red-300 border-red-500/30';
    }
  };

  const getMatchTypeLabel = (type: string) => {
    switch (type) {
      case 'perfecto':
        return 'Match Parfait';
      case 'compensatorio':
        return 'Match Compensatoire';
      default:
        return 'Non Recommandé';
    }
  };

  const stats = {
    totalBusinesses: businesses.length,
    activeMatches: matches.filter(m => m.status === 'active').length,
    averageILA: businesses.length > 0 ? Math.round(businesses.reduce((sum, b) => sum + b.ilaScore.overallScore, 0) / businesses.length) : 0,
    perfectMatches: matches.filter(m => m.matchType === 'perfecto').length
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-[#8E44FF]/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-['Montserrat']">
                {stats.totalBusinesses}
              </div>
              <div className="text-white/60 text-sm font-['Montserrat']">Entreprises</div>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-[#8E44FF]/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-['Montserrat']">
                {stats.activeMatches}
              </div>
              <div className="text-white/60 text-sm font-['Montserrat']">Matches Actifs</div>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-[#8E44FF]/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-['Montserrat']">
                {stats.averageILA}
              </div>
              <div className="text-white/60 text-sm font-['Montserrat']">Score ILA Moyen</div>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-[#8E44FF]/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-['Montserrat']">
                {stats.perfectMatches}
              </div>
              <div className="text-white/60 text-sm font-['Montserrat']">Matches Parfaits</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-5 bg-black/40 border border-white/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#8E44FF]">
            <Brain className="w-4 h-4 mr-2" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="businesses" className="data-[state=active]:bg-[#8E44FF]">
            <Users className="w-4 h-4 mr-2" />
            Entreprises
          </TabsTrigger>
          <TabsTrigger value="matches" className="data-[state=active]:bg-[#8E44FF]">
            <Target className="w-4 h-4 mr-2" />
            Matches
          </TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-[#8E44FF]">
            <MapPin className="w-4 h-4 mr-2" />
            Carte
          </TabsTrigger>
          <TabsTrigger value="add" className="data-[state=active]:bg-[#8E44FF]">
            <Zap className="w-4 h-4 mr-2" />
            Ajouter
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Matches Récents */}
            <Card className="glass-effect border-[#8E44FF]/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat']">
                Matches Récents
              </h3>
              <div className="space-y-4">
                {matches.slice(0, 3).map((match) => (
                  <div key={match.id} className="p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getMatchTypeColor(match.matchType)}>
                          {getMatchTypeLabel(match.matchType)}
                        </Badge>
                        <span className="text-white/80 text-sm font-['Montserrat']">
                          {match.compatibility}% compatible
                        </span>
                      </div>
                    </div>
                    <div className="text-white font-medium font-['Montserrat'] mb-1">
                      {match.business1.name} ↔ {match.business2.name}
                    </div>
                    <div className="text-white/60 text-sm font-['Montserrat']">
                      {match.synergies.slice(0, 2).join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Performers */}
            <Card className="glass-effect border-[#8E44FF]/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat']">
                Top Performers ILA™
              </h3>
              <div className="space-y-4">
                {businesses
                  .sort((a, b) => b.ilaScore.overallScore - a.ilaScore.overallScore)
                  .slice(0, 3)
                  .map((business) => (
                    <div key={business.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <div>
                        <div className="text-white font-medium font-['Montserrat']">
                          {business.name}
                        </div>
                        <div className="text-white/60 text-sm font-['Montserrat']">
                          {business.sector}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#FFD56B] font-['Montserrat']">
                          {business.ilaScore.overallScore}
                        </div>
                        <div className="text-white/60 text-xs font-['Montserrat']">
                          Score ILA
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="businesses" className="space-y-6">
          <div className="grid gap-6">
            {businesses.map((business) => (
              <ILAScoreCard key={business.id} business={business} />
            ))}
            {businesses.length === 0 && (
              <Card className="glass-effect border-white/20 p-12 text-center">
                <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                  Aucune entreprise enregistrée
                </h3>
                <p className="text-white/60 mb-6 font-['Montserrat']">
                  Ajoutez votre première entreprise pour commencer l'analyse ILA™
                </p>
                <Button 
                  onClick={() => setActiveTab('add')}
                  className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] font-['Montserrat']"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Ajouter une entreprise
                </Button>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <div className="grid gap-6">
            {matches.map((match) => (
              <Card key={match.id} className="glass-effect border-[#8E44FF]/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getMatchTypeColor(match.matchType)}>
                    {getMatchTypeLabel(match.matchType)}
                  </Badge>
                  <div className="text-white/60 text-sm font-['Montserrat']">
                    {match.createdAt.toLocaleDateString()}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-black/20 rounded-lg">
                    <div className="text-lg font-bold text-white font-['Montserrat']">
                      {match.business1.name}
                    </div>
                    <div className="text-white/60 text-sm font-['Montserrat'] mb-2">
                      {match.business1.sector}
                    </div>
                    <div className="text-2xl font-bold text-[#8E44FF] font-['Montserrat']">
                      {match.business1.ilaScore.overallScore}
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-black/20 rounded-lg">
                    <div className="text-lg font-bold text-white font-['Montserrat']">
                      {match.business2.name}
                    </div>
                    <div className="text-white/60 text-sm font-['Montserrat'] mb-2">
                      {match.business2.sector}
                    </div>
                    <div className="text-2xl font-bold text-[#FFD56B] font-['Montserrat']">
                      {match.business2.ilaScore.overallScore}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80 font-['Montserrat']">Compatibilité</span>
                    <span className="text-white font-bold font-['Montserrat']">{match.compatibility}%</span>
                  </div>
                  <Progress value={match.compatibility} className="h-2" />
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-medium mb-2 font-['Montserrat']">Synergies identifiées:</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.synergies.map((synergy, index) => (
                      <Badge key={index} variant="outline" className="border-[#8E44FF]/30 text-[#8E44FF]">
                        {synergy}
                      </Badge>
                    ))}
                  </div>
                </div>

                {match.generatedPitch.fr && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-2 font-['Montserrat']">Pitch Généré:</h4>
                    <p className="text-white/80 text-sm font-['Montserrat'] bg-black/20 p-4 rounded-lg">
                      {match.generatedPitch.fr}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-['Montserrat']">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {match.generatedCTA.fr || 'Activer ce partenariat'}
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']">
                    Voir détails
                  </Button>
                </div>
              </Card>
            ))}
            
            {matches.length === 0 && (
              <Card className="glass-effect border-white/20 p-12 text-center">
                <Target className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                  Aucun match trouvé
                </h3>
                <p className="text-white/60 font-['Montserrat']">
                  Ajoutez plus d'entreprises pour découvrir des opportunités de partenariat
                </p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="map">
          <MatchesMap businesses={businesses} matches={matches} />
        </TabsContent>

        <TabsContent value="add">
          <BusinessRegistrationForm />
        </TabsContent>
      </Tabs>

      {/* Loading Overlay */}
      {isCalculating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <Card className="glass-effect border-[#8E44FF]/20 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#8E44FF] border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
              Calcul du Score ILA™ en cours...
            </h3>
            <p className="text-white/70 font-['Montserrat']">
              Analyse des métriques et recherche de matches optimaux
            </p>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ILUMATCHDashboard;