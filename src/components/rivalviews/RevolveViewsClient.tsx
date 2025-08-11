import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExcelBusinessImporter from './ExcelBusinessImporter';
import AutoOptimizer from './AutoOptimizer';
import SimpleMap from './SimpleMap';
import ClientAnalysisMode from './ClientAnalysisMode';
import BusinessControls from './BusinessControls';
import MapboxProvider from './MapboxProvider';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile, useDeviceInfo } from '@/hooks/use-mobile';
import { useDebounce } from '@/hooks/use-debounce';
import EmployeeAuth from './EmployeeAuth';
import EmployeeSection from './EmployeeSection';
import SimplifiedRivalViews from './SimplifiedRivalViews';
import EnhancedBusinessCard from './EnhancedBusinessCard';
import { MapPin, Star, TrendingUp, BarChart3, Users, Crown, Eye, Shuffle, List, Database, Zap, Building2, Target, Rocket, X, ArrowLeftRight, Upload, RefreshCw, Sparkles, AlertTriangle, Info, CheckCircle, Clock, Filter, Search, Settings, Globe } from 'lucide-react';
import { RivalBusiness, RivalFilters } from '@/types/rivalviews';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfessionalMapInterface } from './professional/ProfessionalMapInterface';
import RivalViewsProV5 from './RivalViewsProV5';

// Lazy loading des composants lourds
// const LiloAssistant = lazy(() => import('./LiloAssistant'));

// Constantes pour les catégories
const BUSINESS_CATEGORIES = ['all', 'esthétique', 'avocats', 'comptable', 'école de conduite', 'lunetterie', 'magasin de meubles', 'vente automobile'];
const RevolveViewsClient: React.FC = () => {
  // États principaux
  const [businesses, setBusinesses] = useState<RivalBusiness[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);
  const [selectedBusinessForCompare, setSelectedBusinessForCompare] = useState<RivalBusiness | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'simplified' | 'map' | 'analysis'>('simplified');
  const [compareMode, setCompareMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [showEmployeeAuth, setShowEmployeeAuth] = useState(false);
  const [isEmployeeMode, setIsEmployeeMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'simplified' | 'map' | 'analysis'>('simplified');

  // Hooks
  const {
    user
  } = useAuth();
  const isMobile = useIsMobile();
  const deviceInfo = useDeviceInfo();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // États pour la comparaison
  const [referenceBusiness, setReferenceBusiness] = useState<RivalBusiness | null>(null);
  const [compareBusiness, setCompareBusiness] = useState<RivalBusiness | null>(null);

  // Gestion des filtres
  const [filters, setFilters] = useState<RivalFilters>({});
  const handleFiltersChange = useCallback((newFilters: RivalFilters) => {
    setFilters(newFilters);
  }, []);

  // Fonction pour charger des données d'exemple
  const handleLoadSampleData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('🎯 Chargement des données d\'exemple...');

      // Temporairement désactivé
      toast.success('✨ Fonctionnalité temporairement désactivée');

      // Recharger les données après insertion
      await loadBusinessData();
    } catch (error) {
      console.error('💥 Erreur lors du chargement des données d\'exemple:', error);
      toast.error('Erreur lors du chargement des données d\'exemple');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonction pour synchroniser les données depuis Excel
  const handleSyncData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Synchronisation des données depuis Excel...');

      // Temporairement désactivé
      toast.success('✨ Fonctionnalité temporairement désactivée');

      // Recharger les données après synchronisation
      await loadBusinessData();
    } catch (error) {
      console.error('💥 Erreur lors de la synchronisation:', error);
      toast.error('Erreur lors de la synchronisation');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonction pour enrichir avec les données Ahrefs
  const handleEnrichAhrefs = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        enrichBusinessesWithAhrefs
      } = await import('@/utils/enrichAhrefsData');
      const result = await enrichBusinessesWithAhrefs();
      console.log('Ahrefs enrichment result:', result);
      if (result.success) {
        toast.success(result.message || `${result.enrichedCount} entreprises enrichies avec les données Ahrefs`);
        // Recharger les données
        await loadBusinessData();
      } else {
        toast.error(result.error || 'Erreur lors de l\'enrichissement Ahrefs');
      }
    } catch (error) {
      console.error('Ahrefs enrichment error:', error);
      toast.error('Erreur lors de l\'enrichissement Ahrefs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // INSTRUCTUS™ - Fonction optimisée avec synchronisation complète
  const loadBusinessData = useCallback(async (city?: string) => {
    try {
      console.log('🧩 INSTRUCTUS™ - Chargement des données synchronisées...');
      setIsLoading(true);

      // Utiliser la classe de synchronisation pour charger les données enrichies
      const { BusinessDataSync } = await import('@/utils/businessDataSync');
      const enrichedBusinesses = await BusinessDataSync.loadEnrichedBusinessData();
      
      // Filtrer par ville si nécessaire
      const filteredBusinesses = city 
        ? enrichedBusinesses.filter(b => b.city.toLowerCase().includes(city.toLowerCase()))
        : enrichedBusinesses;

      setBusinesses(filteredBusinesses);
      console.log(`✅ INSTRUCTUS™ - ${filteredBusinesses.length} entreprises enrichies chargées`);

      // Log d'exemple des données enrichies
      if (filteredBusinesses.length > 0) {
        const sample = filteredBusinesses[0];
        console.log('📊 ÉCHANTILLON ENRICHI:', {
          name: sample.name,
          sector: sample.sector,
          ilaScore: sample.ilaScore,
          seoScore: sample.seoScore,
          organicTraffic: sample.organicTraffic,
          indexedKeywords: sample.indexedKeywords,
          top10Keywords: sample.top10Keywords,
          topKeyword: sample.topKeyword,
          aiRecommendedAction: sample.aiRecommendedAction,
          followersInstagram: sample.followersInstagram,
          followersFacebook: sample.followersFacebook
        });
      }

    } catch (error) {
      console.error('❌ INSTRUCTUS™ - Erreur lors du chargement:', error);
      toast.error('Erreur lors du chargement des données');
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Chargement initial des données
  useEffect(() => {
    console.log('🚀 INSTRUCTUS™ - Initialisation du composant principal - DEBUT');
    loadBusinessData().then(() => {
      console.log('✅ INSTRUCTUS™ - Chargement initial terminé');
    }).catch(error => {
      console.error('❌ INSTRUCTUS™ - Erreur chargement initial:', error);
    });
  }, [loadBusinessData]);

  // Filtrage des entreprises selon la recherche et catégorie
  const filteredBusinesses = useMemo(() => {
    let filtered = businesses;

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(business => business.sector.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    // Filtre par recherche
    if (debouncedSearchQuery) {
      filtered = filtered.filter(business => business.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || business.city.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || business.sector.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
    }

    // Appliquer les filtres avancés
    if (filters.sector && filters.sector !== 'all') {
      filtered = filtered.filter(b => b.sector.toLowerCase().includes(filters.sector!.toLowerCase()));
    }
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(b => b.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.ilaScoreMin !== undefined) {
      filtered = filtered.filter(b => b.ilaScore >= filters.ilaScoreMin!);
    }
    if (filters.ilaScoreMax !== undefined) {
      filtered = filtered.filter(b => b.ilaScore <= filters.ilaScoreMax!);
    }
    if (filters.status) {
      filtered = filtered.filter(b => b.status === filters.status);
    }
    if (filters.potential) {
      filtered = filtered.filter(b => b.potential === filters.potential);
    }
    if (filters.hasWebsite !== undefined) {
      filtered = filtered.filter(b => filters.hasWebsite ? !!b.website : !b.website);
    }
    if (filters.googleRatingMin !== undefined) {
      filtered = filtered.filter(b => b.googleRating >= filters.googleRatingMin!);
    }
    return filtered;
  }, [businesses, selectedCategory, debouncedSearchQuery, filters]);

  // Gestion des clics sur les entreprises
  const handleBusinessClick = useCallback((business: RivalBusiness) => {
    console.log('🎯 Business clicked:', business.name);
    if (compareMode) {
      if (!referenceBusiness) {
        setReferenceBusiness(business);
        toast.info(`${business.name} sélectionnée comme référence`);
      } else if (referenceBusiness.id !== business.id) {
        setCompareBusiness(business);
        toast.success(`Comparaison: ${referenceBusiness.name} vs ${business.name}`);
      }
    } else {
      setSelectedBusiness(business);
    }
  }, [compareMode, referenceBusiness]);

  // Gestion du clic sur compare
  const handleCompareClick = useCallback((business: RivalBusiness) => {
    console.log('🔄 Compare clicked:', business.name);
    if (!compareMode) {
      setCompareMode(true);
      setReferenceBusiness(business);
      toast.info(`Mode comparaison activé - ${business.name} sélectionnée comme référence`);
    } else {
      if (referenceBusiness && referenceBusiness.id !== business.id) {
        setCompareBusiness(business);
        toast.success(`Comparaison: ${referenceBusiness.name} vs ${business.name}`);
      }
    }
  }, [compareMode, referenceBusiness]);

  // Reset de la comparaison
  const resetComparison = useCallback(() => {
    setCompareMode(false);
    setReferenceBusiness(null);
    setCompareBusiness(null);
    setSelectedBusinessForCompare(null);
  }, []);

  // Gestion du mode employé
  const handleEmployeeLogin = () => {
    setIsEmployeeMode(true);
    setActiveTab('analysis');
    setShowEmployeeAuth(false);
  };
  return (
    <div className={`${isMobile ? 'min-h-screen' : 'min-h-screen'} bg-gradient-to-br from-black via-[#1a0b2e] to-black text-white ${isMobile ? 'overflow-auto' : ''}`}>
      {/* Header avec statistiques - Mobile responsive */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className={`relative ${isMobile ? 'p-3' : 'p-4 md:p-6'} bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 border-b border-[#8E44FF]/30 backdrop-blur-sm`}
      >
        <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-col md:flex-row'} items-start ${isMobile ? '' : 'md:items-center'} justify-between gap-4`}>
          <div className={isMobile ? 'w-full' : ''}>
            <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent`}>
              RivalViews™ {isMobile ? '' : 'Professional'}
            </h1>
            <p className={`text-white/80 mt-1 ${isMobile ? 'text-xs' : ''}`}>
              {isMobile ? 'IA concurrentielle' : 'Intelligence artificielle pour l\'analyse concurrentielle avancée'}
            </p>
          </div>
          
          <div className={`flex ${isMobile ? 'flex-row justify-between w-full text-xs items-center' : 'items-center gap-4 text-sm'} text-white/80`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{isMobile ? 'Active' : 'Mapbox Satellite Active'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>{filteredBusinesses.length} / {businesses.length} {isMobile ? 'visibles' : 'entreprises visibles'}</span>
            </div>
            {!isMobile && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Score moyen: {businesses.length > 0 ? Math.round(businesses.reduce((acc, b) => acc + b.ilaScore, 0) / businesses.length) : 0}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Navigation professionnelle - Mobile responsive */}
      <Tabs value={activeTab} onValueChange={value => setActiveTab(value as 'simplified' | 'map' | 'analysis')} className="w-full">
        <TabsList className={`grid w-full grid-cols-3 bg-slate-900/80 border border-purple-500/20 backdrop-blur-sm ${isMobile ? 'mb-4 p-1 mx-2 mt-2 h-12' : 'mb-10 p-2 mx-6 mt-6'} rounded-2xl`}>
          <TabsTrigger 
            value="simplified" 
            className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl ${isMobile ? 'py-1 px-1 text-xs h-10' : 'py-3'}`}
          >
            <Eye className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ${isMobile ? 'mr-1' : 'mr-2'}`} />
            <span className={isMobile ? 'hidden' : ''}>Vue </span>Simplifiée
          </TabsTrigger>
          <TabsTrigger 
            value="map" 
            className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl ${isMobile ? 'py-1 px-1 text-xs h-10' : 'py-3'}`}
          >
            <MapPin className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ${isMobile ? 'mr-1' : 'mr-2'}`} />
            <span className={isMobile ? 'hidden' : ''}>Vue </span>Carte
          </TabsTrigger>
          <TabsTrigger 
            value="analysis" 
            className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-700 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-xl ${isMobile ? 'py-1 px-1 text-xs h-10' : 'py-3'}`}
          >
            <BarChart3 className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-5 h-5 mr-2'}`} />
            <span className={`font-semibold ${isMobile ? 'text-xs' : ''}`}>
              Analyse
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Vue Simplifiée */}
        <TabsContent value="simplified" className={isMobile ? "mt-0 p-0" : "mt-0 px-6"}>
          <div className={`space-y-${isMobile ? '3' : '6'}`}>
            {/* Barre de recherche et filtres - Mobile optimisé */}
            <div className={`${isMobile ? 'px-2' : ''} flex flex-col ${isMobile ? 'gap-2' : 'md:flex-row gap-4'} items-center justify-between`}>
              <Input
                placeholder={isMobile ? "Rechercher..." : "Rechercher une entreprise..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isMobile ? 'w-full h-10' : 'max-w-md'} bg-black/20 border-white/20 text-white placeholder:text-white/60`}
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className={`${isMobile ? 'w-full h-10' : 'w-[200px]'} bg-black/20 border-white/20 text-white`}>
                  <SelectValue placeholder={isMobile ? "Secteur" : "Filtrer par secteur"} />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  {BUSINESS_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                      {category === 'all' ? 'Tous les secteurs' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Statistiques rapides pour mobile - Plus détaillées */}
            {isMobile && filteredBusinesses.length > 0 && (
              <div className="px-2">
                <div className="bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10 rounded-lg p-4 border border-[#8E44FF]/20">
                  <div className="grid grid-cols-2 gap-4 text-center mb-3">
                    <div>
                      <div className="text-xl font-bold text-white">{filteredBusinesses.length}</div>
                      <div className="text-xs text-white/60">Entreprises</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-[#8E44FF]">
                        {Math.round(filteredBusinesses.reduce((acc, b) => acc + b.ilaScore, 0) / filteredBusinesses.length)}
                      </div>
                      <div className="text-xs text-white/60">Score ILA moy.</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-sm font-bold text-green-400">
                        {filteredBusinesses.filter(b => b.ilaScore >= 80).length}
                      </div>
                      <div className="text-white/60">Excellence</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-blue-400">
                        {filteredBusinesses.filter(b => b.ilaScore >= 60 && b.ilaScore < 80).length}
                      </div>
                      <div className="text-white/60">Performance</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-orange-400">
                        {filteredBusinesses.filter(b => b.ilaScore < 60).length}
                      </div>
                      <div className="text-white/60">Potentiel</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grille des entreprises enrichies - Mobile optimisé */}
            <div className={`${isMobile ? 'px-2' : ''} grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'}`}>
              {filteredBusinesses.map((business) => (
                <EnhancedBusinessCard
                  key={business.id}
                  business={business}
                  onSelect={setSelectedBusiness}
                  onCompare={handleCompareClick}
                  onAddToCRM={(business) => {
                    // Synchroniser avec le CRM
                    toast.success(`${business.name} ajouté au CRM`);
                  }}
                />
              ))}
            </div>

            {/* Message si aucune entreprise */}
            {filteredBusinesses.length === 0 && !isLoading && (
              <div className={`text-center ${isMobile ? 'py-8' : 'py-12'}`}>
                <p className="text-white/60">{isMobile ? 'Aucun résultat' : 'Aucune entreprise trouvée'}</p>
                {isMobile && (
                  <p className="text-white/40 text-sm mt-2">Modifiez vos filtres</p>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Vue Carte */}
        <TabsContent value="map" className={`mt-0 ${isMobile ? 'px-0' : 'px-0'}`}>
          <div className={`space-y-0 ${isMobile ? 'h-auto' : ''}`}>
            {/* Interface RIVALVIEWS™ Pro V5 - Version optimisée mobile */}
            <div className={isMobile ? 'h-auto min-h-screen' : ''}>
              <RivalViewsProV5 />
            </div>
          </div>
        </TabsContent>

        {/* Mode Analyse */}
        <TabsContent value="analysis" className="mt-0 px-6">
          <AnimatePresence mode="wait">
            {!isEmployeeMode ? <motion.div key="auth" initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.95
          }} className="flex items-center justify-center min-h-[600px]">
                <EmployeeAuth onSuccess={handleEmployeeLogin} />
              </motion.div> : <motion.div key="employee-section" initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.95
          }} className="w-full">
                <EmployeeSection onLogout={() => {
              setIsEmployeeMode(false);
              setActiveTab('simplified');
            }} />
              </motion.div>}
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      {/* Assistant LILO™ désactivé temporairement */}

      {/* Modal d'import Excel */}
      {showImportModal && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} className="bg-gradient-to-br from-black via-[#1a0b2e] to-black border border-[#8E44FF]/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Importer des entreprises Excel</h2>
                  <p className="text-white/60 text-sm">
                    Importez vos entreprises depuis un fichier Excel pour enrichir la carte interactive
                  </p>
                </div>
                <Button onClick={() => setShowImportModal(false)} variant="ghost" size="sm" className="text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <ExcelBusinessImporter onImportComplete={() => {
            setShowImportModal(false);
            loadBusinessData();
          }} />
            </div>
          </motion.div>
        </div>}

      {/* Modal d'optimisation automatique */}
      {showOptimizer && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} className="bg-gradient-to-br from-black via-[#1a0b2e] to-black border border-[#8E44FF]/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Optimiseur Automatique IA</h2>
                  <p className="text-white/60 text-sm">
                    Analyse et optimise automatiquement vos données d'entreprises
                  </p>
                </div>
                <Button onClick={() => setShowOptimizer(false)} variant="ghost" size="sm" className="text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <AutoOptimizer onOptimizationComplete={() => {
            setShowOptimizer(false);
            loadBusinessData();
          }} />
            </div>
          </motion.div>
        </div>}
    </div>
  );
};
export default RevolveViewsClient;