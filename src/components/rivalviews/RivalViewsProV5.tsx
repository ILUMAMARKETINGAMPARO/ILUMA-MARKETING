import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  BarChart3,
  Users, 
  Building2, 
  Target, 
  Rocket, 
  Filter, 
  Search, 
  Settings, 
  Globe,
  Eye,
  Navigation,
  Download,
  Zap,
  Crown,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { EnterpriseMapV5 } from './v5/EnterpriseMapV5';
import { UnifiedBusinessData } from './v5/types';
import { calculateDigitalPresence, calculateCompetitionLevel } from './v5/utils/scoring';
import { useIsMobile } from '@/hooks/use-mobile';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaWx1bWFtYXJrZXRpbmciLCJhIjoiY2x6dzlmd2tpMDFzcTJscXprdWJtcXVyNyJ9.0XGVgDQQGbU8FBVb8m_JoA';

const RivalViewsProV5: React.FC = () => {
  const [businesses, setBusinesses] = useState<UnifiedBusinessData[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<UnifiedBusinessData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'premium' | 'web' | 'cluster' | 'table'>('premium');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const isMobile = useIsMobile();

  // Chargement des données unifiées avec BusinessDataSync
  const loadUnifiedData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Chargement RIVALVIEWS™ Pro V5 - Données unifiées...');

      // Utiliser le même système que RevolveViewsClient pour cohérence
      const { BusinessDataSync } = await import('@/utils/businessDataSync');
      const enrichedBusinesses = await BusinessDataSync.loadEnrichedBusinessData();
      
      // Filtrer uniquement les entreprises avec coordonnées GPS valides
      const businessesWithGPS = enrichedBusinesses.filter(business => 
        business.lat && 
        business.lng && 
        business.lat !== 0 && 
        business.lng !== 0
      );

      // Convertir en format UnifiedBusinessData COMPLET avec toutes les statistiques
      const unifiedData: UnifiedBusinessData[] = businessesWithGPS.map(business => ({
        id: business.id,
        name: business.name,
        address: business.address || '',
        phone: business.phone || '',
        email: business.email || '',
        website: business.website || '',
        googleStars: business.googleRating || 4.5,
        googleReviews: business.reviewCount || 0,
        facebookFollowers: business.followersFacebook || 0,
        instagramFollowers: business.followersInstagram || 0,
        tiktokFollowers: business.followersTikTok || 0,
        branches: business.isChain ? (business.chainCount || 1) : 1,
        sector: business.sector,
        city: business.city,
        lat: business.lat,
        lng: business.lng,
        
        // Données SEO/Ahrefs principales
        organicTraffic: business.organicTraffic || 0,
        keywords: business.indexedKeywords || 0,
        backlinks: business.backlinks || 0,
        domainRating: business.domainRating || 0,
        
        // Score ILA et présence numérique
        ilaScore: business.ilaScore || 65,
        digitalPresence: business.ilaScore >= 80 ? 'forte' : business.ilaScore >= 60 ? 'moyenne' : 'faible',
        competitionLevel: business.ilaScore >= 75 ? 'élevée' : business.ilaScore >= 50 ? 'moyenne' : 'faible',
        
        // Toutes les métriques Ahrefs complètes
        refDomains: business.refDomains || 0,
        refDomainsDofollow: business.refDomainsDofollow || 0,
        refDomainsGovernmental: business.refDomainsGovernmental || 0,
        refDomainsEducational: business.refDomainsEducational || 0,
        refIps: business.refIps || 0,
        refSubnets: business.refSubnets || 0,
        linkedDomains: business.linkedDomains || 0,
        ahrefsRank: business.ahrefsRank || 0,
        backlinksText: business.backlinksText || 0,
        backlinksNofollow: business.backlinksNofollow || 0,
        backlinksRedirect: business.backlinksRedirect || 0,
        backlinksImage: business.backlinksImage || 0,
        backlinksFrame: business.backlinksFrame || 0,
        backlinksForm: business.backlinksForm || 0,
        backlinksGovernmental: business.backlinksGovernmental || 0,
        backlinksEducational: business.backlinksEducational || 0,
        
        // Métriques de contenu
        presenceBlog: business.presenceBlog || false,
        qualiteBlog: business.qualiteBlog || 0,
        pagesIndexees: business.pagesIndexees || 0,
        
        // Métriques financières
        cpcMoyen: business.cpcMoyen || 0,
        kdMoyen: business.kdMoyen || 0,
        
        // Scores détaillés
        seoScoreDetailed: business.seoScoreDetailed || 0,
        contenuScore: business.contenuScore || 0,
        presencePhysiqueScore: business.presencePhysiqueScore || 0,
        reputationScore: business.reputationScore || 0,
        positionScore: business.positionScore || 0
      }));

      setBusinesses(unifiedData);
      console.log(`✅ RIVALVIEWS™ Pro V5 - ${unifiedData.length} entreprises avec GPS chargées`);
      
      // Statistiques détaillées
      const stats = {
        total: unifiedData.length,
        avecSiteWeb: unifiedData.filter(b => b.website).length,
        scoreILAMoyen: Math.round(unifiedData.reduce((acc, b) => acc + b.ilaScore, 0) / unifiedData.length),
        traficTotal: unifiedData.reduce((acc, b) => acc + b.organicTraffic, 0),
        secteurs: [...new Set(unifiedData.map(b => b.sector))].length
      };
      
      console.log('📊 STATISTIQUES RÉELLES:', stats);

    } catch (error) {
      console.error('❌ Erreur lors du chargement des données unifiées:', error);
      toast.error('Erreur lors du chargement des données');
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  // Filtrage des entreprises
  const filteredBusinesses = useMemo(() => {
    let filtered = businesses;

    if (selectedSector !== 'all') {
      filtered = filtered.filter(b => b.sector.toLowerCase().includes(selectedSector.toLowerCase()));
    }

    if (searchQuery) {
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.sector.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [businesses, selectedSector, searchQuery]);

  // Secteurs disponibles
  const availableSectors = useMemo(() => {
    const sectors = [...new Set(businesses.map(b => b.sector))];
    return sectors.sort();
  }, [businesses]);

  // Statistiques RÉELLES depuis votre base Supabase (302 entreprises)
  const stats = useMemo(() => {
    // IMPORTANT: Utiliser 'businesses' pour le total réel, 'filteredBusinesses' pour l'affichage
    const totalBusinesses = businesses.length; // Total réel de Supabase
    const displayedBusinesses = filteredBusinesses.length; // Après filtres
    const avgScore = businesses.length > 0 
      ? Math.round(businesses.reduce((sum, b) => sum + b.ilaScore, 0) / businesses.length)
      : 0;
    
    // Statistiques par performance (sur toutes les entreprises réelles)
    const excellence = businesses.filter(b => b.ilaScore >= 80).length;
    const performance = businesses.filter(b => b.ilaScore >= 60 && b.ilaScore < 80).length;
    const potential = businesses.filter(b => b.ilaScore >= 40 && b.ilaScore < 60).length;
    const opportunity = businesses.filter(b => b.ilaScore < 40).length;
    
    // Secteurs (sur les entreprises affichées)
    const sectorCounts = filteredBusinesses.reduce((acc, b) => {
      acc[b.sector] = (acc[b.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalBusinesses, // 302 entreprises Supabase
      displayedBusinesses, // Nombre affiché après filtres
      avgScore, // Score ILA moyen réel
      excellence, // Entreprises score ≥ 80
      performance, // Entreprises score 60-79
      potential, // Entreprises score 40-59
      opportunity, // Entreprises score < 40
      topSectors: Object.entries(sectorCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 6)
        .map(([sector, count]) => ({ sector, count }))
    };
  }, [businesses, filteredBusinesses]);

  useEffect(() => {
    loadUnifiedData();
  }, [loadUnifiedData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header RIVALVIEWS™ - Optimisé mobile */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative ${isMobile ? 'p-3' : 'p-6'} bg-gradient-to-r from-slate-800/90 to-blue-800/90 border-b border-blue-400/30 backdrop-blur-sm`}
      >
        <div className={`flex items-center ${isMobile ? 'justify-between' : 'justify-between'}`}>
          {/* Titre et stats */}
          <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-8'}`}>
            <div>
              <h1 className={`${isMobile ? 'text-xl' : 'text-4xl'} font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent`}>
                RIVALVIEWS™
              </h1>
              <p className={`text-slate-300 ${isMobile ? 'text-xs' : 'text-sm'} mt-1`}>
                {stats.totalBusinesses} concurrents • Score: {stats.avgScore}
              </p>
              {!isMobile && (
                <p className="text-cyan-400 text-xs">
                  Vue immersive avec pins animés et IA LILO™
                </p>
              )}
            </div>
          </div>

          {/* Badges de fonctionnalités - Mobile responsif */}
          {isMobile ? (
            <Button
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
              variant="outline"
              size="sm"
              className="border-blue-400 text-blue-400 hover:bg-blue-400/20"
            >
              <Menu className="w-4 h-4" />
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className="bg-emerald-500/20 border-emerald-400 text-emerald-400 px-3 py-1"
              >
                <span className="text-xl mr-2">🌟</span>
                <span className="font-semibold">{stats.totalBusinesses}</span>
                <span className="ml-1 text-xs">Premium</span>
              </Badge>
              
              <Badge 
                variant="outline" 
                className="bg-green-500/20 border-green-400 text-green-400 px-3 py-1"
              >
                <span className="text-xl mr-2">🌐</span>
                <span className="font-semibold">{Math.round(stats.avgScore)}</span>
                <span className="ml-1 text-xs">Score ILA</span>
              </Badge>

              <Button 
                variant="secondary"
                className="bg-purple-600/80 hover:bg-purple-700 text-white border-purple-400"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Cluster Enabled
              </Button>

              <Button 
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400/20"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Table-Carte
              </Button>

              <Button 
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/20"
              >
                <Zap className="w-4 h-4 mr-2" />
                Duel 1v1
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Interface principale */}
      <div className={`flex ${isMobile ? 'min-h-[80vh]' : 'h-[calc(100vh-140px)]'}`}>
        {/* Carte principale - Prend la majorité de l'espace */}
        <div className="flex-1 relative">
          <EnterpriseMapV5
            businesses={filteredBusinesses}
            selectedBusiness={selectedBusiness}
            onBusinessSelect={setSelectedBusiness}
            mapToken={MAPBOX_TOKEN}
          />

          {/* Contrôles flottants - Mobile optimisé */}
          <div className={`absolute ${isMobile ? 'top-2 left-2 right-2' : 'top-4 left-4'} z-20 flex ${isMobile ? 'flex-row gap-2' : 'flex-col gap-2'}`}>
            <Input
              placeholder={isMobile ? "Rechercher..." : "Rechercher..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${isMobile ? 'flex-1 h-10' : 'w-64'} bg-slate-900/90 border-slate-600 text-white`}
            />
            {!isMobile && (
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-64 bg-slate-900/90 border-slate-600 text-white">
                  <SelectValue placeholder="Tous les secteurs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  {availableSectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Panneau de droite - Desktop uniquement ou sidebar mobile */}
        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-600 p-6 overflow-y-auto"
          >
            {/* Header avec icône */}
            <div className="flex items-center gap-2 mb-6">
              <Eye className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Secteurs d'Activité</h3>
            </div>

            {/* Liste des secteurs avec comptes - Style exact de l'image */}
            <div className="space-y-3">
              {stats.topSectors.map(({ sector, count }, index) => {
                const getSectorEmoji = (sector: string) => {
                  if (sector.includes('comptable')) return '📊';
                  if (sector.includes('esthétique')) return '💅';
                  if (sector.includes('conduite')) return '🚗';
                  if (sector.includes('avocats')) return '⚖️';
                  if (sector.includes('automobile')) return '🚙';
                  if (sector.includes('lunetterie')) return '👓';
                  if (sector.includes('meubles')) return '🛋️';
                  return '🏢';
                };

                return (
                  <motion.div
                    key={sector}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getSectorEmoji(sector)}</span>
                      <span className="text-white capitalize">{sector}</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-600/80 text-white">
                      {count}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>

            {/* Section Performance - Exactement comme dans l'image */}
            <div className="mt-8 space-y-3">
              <h4 className="text-sm font-semibold text-slate-300 mb-4">Performance</h4>
              
              <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Excellence (80+)</span>
                </div>
                <span className="text-yellow-400 font-semibold">
                  {filteredBusinesses.filter(b => b.ilaScore >= 80).length}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Performance (60-79)</span>
                </div>
                <span className="text-green-400 font-semibold">
                  {filteredBusinesses.filter(b => b.ilaScore >= 60 && b.ilaScore < 80).length}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Potentiel (40-59)</span>
                </div>
                <span className="text-orange-400 font-semibold">
                  {filteredBusinesses.filter(b => b.ilaScore >= 40 && b.ilaScore < 60).length}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Opportunité (&lt;40)</span>
                </div>
                <span className="text-red-400 font-semibold">
                  {filteredBusinesses.filter(b => b.ilaScore < 40).length}
                </span>
              </div>
            </div>

            {/* Mascotte LILO™ en bas - Exactement comme dans l'image */}
            <div className="mt-8 text-center">
              <div className="inline-block">
                <div className="text-6xl">🤖</div>
                <div className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold mt-2">
                  LILO™
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {showMobileSidebar && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-600 z-50 overflow-y-auto"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Secteurs d'Activité</h3>
                    <Button
                      onClick={() => setShowMobileSidebar(false)}
                      variant="ghost"
                      size="sm"
                      className="text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Filtres pour mobile */}
                  <div className="mb-6">
                    <Select value={selectedSector} onValueChange={setSelectedSector}>
                      <SelectTrigger className="w-full bg-slate-800/50 border-slate-600 text-white">
                        <SelectValue placeholder="Tous les secteurs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les secteurs</SelectItem>
                        {availableSectors.map(sector => (
                          <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Liste des secteurs */}
                  <div className="space-y-3">
                    {stats.topSectors.map(({ sector, count }, index) => {
                      const getSectorEmoji = (sector: string) => {
                        if (sector.includes('comptable')) return '📊';
                        if (sector.includes('esthétique')) return '💅';
                        if (sector.includes('conduite')) return '🚗';
                        if (sector.includes('avocats')) return '⚖️';
                        if (sector.includes('automobile')) return '🚙';
                        if (sector.includes('lunetterie')) return '👓';
                        if (sector.includes('meubles')) return '🛋️';
                        return '🏢';
                      };

                      return (
                        <motion.div
                          key={sector}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{getSectorEmoji(sector)}</span>
                            <span className="text-white capitalize text-sm">{sector}</span>
                          </div>
                          <Badge variant="secondary" className="bg-blue-600/80 text-white">
                            {count}
                          </Badge>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Barre de contrôles en bas - Mobile optimisé */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="flex items-center gap-4 bg-slate-900/95 backdrop-blur-xl border border-slate-600 rounded-full px-6 py-3">
            <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white hover:text-purple-400">
              <Sparkles className="w-4 h-4 mr-2" />
              LILO™
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white hover:text-green-400">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RivalViewsProV5;