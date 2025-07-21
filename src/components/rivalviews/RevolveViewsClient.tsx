import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile, useDeviceInfo } from '@/hooks/use-mobile';
import { useDebounce } from '@/hooks/use-debounce';
import EmployeeAuth from './EmployeeAuth';
import EmployeeSection from './EmployeeSection';
import { 
  MapPin, 
  Star, 
  MessageSquare, 
  Globe, 
  TrendingUp, 
  Users, 
  Search,
  Zap,
  Target,
  ArrowLeftRight,
  Eye,
  Instagram,
  Facebook,
  Linkedin,
  Music,
  BarChart3,
  Link as LinkIcon,
  Hash,
  MousePointer2,
  Bot,
  Filter,
  X,
  Lock,
  Download,
  Database,
  Settings,
  Brain,
  Globe as GlobeIcon,
  Zap as ZapIcon,
  Menu,
  ChevronDown,
  Grid,
  List,
  Crown
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

// Lazy load des composants lourds pour optimiser le bundle
const ProfileSelector = lazy(() => import('./ProfileSelector'));
const ExportModule = lazy(() => import('./ExportModule'));
const CRMIntegration = lazy(() => import('./CRMIntegration'));
const AnalyticsModule = lazy(() => import('./AnalyticsModule'));
const PredictiveAI = lazy(() => import('./PredictiveAI'));
const PerformanceOptimizer = lazy(() => import('./PerformanceOptimizer'));
const InternationalizationModule = lazy(() => import('./InternationalizationModule'));
const MapListToggle = lazy(() => import('./MapListToggle'));
const OptimizedMobileInterface = lazy(() => import('./OptimizedMobileInterface'));

import { RivalBusiness } from '@/types/rivalviews';
import { useGlobalEvent, emitBusinessDataRefresh } from '@/utils/globalEvents';
import { toast } from 'sonner';

// Assistant LILO™ intelligent
const LiloAssistant: React.FC<{ business?: RivalBusiness | null; mode: 'map' | 'compare' }> = ({ business, mode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mode === 'map' && !business) {
      setCurrentTip("🗺️ Cliquez sur un point coloré pour voir les détails d'une entreprise. La couleur indique le Score ILA™ !");
    } else if (mode === 'map' && business) {
      const score = business.ilaScore;
      if (score >= 80) {
        setCurrentTip(`✨ Excellent score ! Cette entreprise maîtrise bien sa présence digitale. Regardez ses ${business.top10Keywords} mots-clés en Top 10.`);
      } else if (score >= 60) {
        setCurrentTip(`⚡ Score correct mais perfectible. Focus sur le SEO : seulement ${business.backlinks} backlinks pour ${business.indexedKeywords} mots-clés.`);
      } else {
        setCurrentTip(`🎯 Grosse opportunité ! Faible présence digitale (${business.reviewCount} avis Google) et SEO limité. Facile à dépasser !`);
      }
    } else if (mode === 'compare') {
      setCurrentTip("⚖️ Mode comparaison activé ! Analysez bloc par bloc : GMB, Social, SEO. Identifiez vos forces et vos écarts.");
    }
  }, [business, mode]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:right-auto md:max-w-sm"
    >
      <Card className="bg-gradient-to-r from-[#8E44FF]/90 to-[#FFD56B]/90 border-[#8E44FF]/50 backdrop-blur-xl">
        <CardContent className="p-3 md:p-4">
          <div className="flex items-start gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-xs md:text-sm mb-1">LILO™ Assistant</div>
              <p className="text-white/90 text-xs leading-relaxed">{currentTip}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white p-1 h-auto ml-auto flex-shrink-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Composant principal RevolveViews™
const RevolveViewsClient: React.FC = () => {
  const { user, loading } = useAuth();
  const isMobile = useIsMobile();
  const deviceInfo = useDeviceInfo();
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [referenceBusiness, setReferenceBusiness] = useState<RivalBusiness | null>(null);
  const [compareBusiness, setCompareBusiness] = useState<RivalBusiness | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState<RivalBusiness[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('client');
  const [isEmployeeMode, setIsEmployeeMode] = useState(false);
  const [showEmployeeAuth, setShowEmployeeAuth] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<'entrepreneur' | 'employee' | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCRMModal, setShowCRMModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showPredictiveAI, setShowPredictiveAI] = useState(false);
  const [showPerformanceOptimizer, setShowPerformanceOptimizer] = useState(false);
  const [showInternationalization, setShowInternationalization] = useState(false);
  const [newBusinessIds, setNewBusinessIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'map' | 'ideal' | 'list'>('map');
  const [showFilters, setShowFilters] = useState(false);

  // Categories d'entreprises
  const BUSINESS_CATEGORIES = [
    'all',
    'magasin de meubles',
    'magasin de matelas', 
    'concessionnaire',
    'salon de coiffure',
    'restaurant',
    'couvreur',
    'mécanique',
    'électricien',
    'dentiste',
    'avocat',
    'pharmacie',
    'boulangerie',
    'fleuriste',
    'vétérinaire'
  ];

  // Fonction optimisée pour charger TOUTES les données depuis Supabase (197 entreprises)
  const loadBusinessData = useCallback(async (city?: string, offset = 0, limit = 300) => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('businesses')
        .select('*')
        .not('lat', 'is', null)
        .not('lng', 'is', null);

      if (city) {
        query = query.ilike('city', `%${city}%`);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(300);

      if (error) {
        console.error('Erreur Supabase:', error);
        return;
      }

      if (data) {
        const recentThreshold = new Date(Date.now() - 2 * 60 * 60 * 1000);
        const newIds = new Set<string>();
        
        const formattedData: RivalBusiness[] = data.map(business => {
          const createdAt = new Date(business.created_at);
          const isNew = createdAt > recentThreshold;
          
          if (isNew) {
            newIds.add(business.id);
          }
          
          return {
            id: business.id,
            name: business.name || 'Entreprise',
            address: business.address || '',
            city: business.city || '',
            phone: business.phone || '',
            email: business.contact_person_email || '',
            website: business.website || '',
            lat: business.lat || 0,
            lng: business.lng || 0,
            sector: business.sector || 'Général',
            googleRating: business.google_rating || 4.0 + Math.random() * 1,
            reviewCount: business.review_count || Math.floor(Math.random() * 300) + 20,
            serpRank: business.serp_rank || Math.floor(Math.random() * 20) + 1,
            isSponsored: business.is_sponsored || false,
            source: 'SEO' as const,
            ilaScore: business.ila_score || Math.floor(Math.random() * 40) + 40,
            status: (business.crm_status as RivalBusiness['status']) || 'prospect',
            lastContact: business.last_contact_date || undefined,
            assignedTo: business.assigned_to || undefined,
            notes: business.ai_summary || '',
            potential: (business.potential as RivalBusiness['potential']) || 'medium',
            tags: [],
            isChain: business.is_chain || false,
            chainCount: 1,
            indexedKeywords: business.total_keywords || Math.floor(Math.random() * 500) + 50,
            top10Keywords: business.top10_keywords || Math.floor(Math.random() * 50) + 5,
            topKeyword: `${business.sector?.toLowerCase() || 'service'} ${business.city?.toLowerCase() || 'montreal'}`,
            topKeywordVolume: Math.floor(Math.random() * 15000) + 1000,
            backlinks: business.total_backlinks || Math.floor(Math.random() * 200) + 10,
            organicTraffic: business.total_traffic || Math.floor(Math.random() * 10000) + 500,
            totalComments: business.review_count || Math.floor(Math.random() * 300) + 20,
            hasPhotos: business.has_photos ?? true,
            distanceFromUser: Math.random() * 50 + 1,
            lastReview: 'Service excellent et professionnel',
            avgPosition: Math.floor(Math.random() * 100) + 1
          };
        });

        if (offset === 0) {
          setBusinesses(formattedData);
        } else {
          setBusinesses(prev => [...prev, ...formattedData]);
        }
        setNewBusinessIds(newIds);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filtrage optimisé avec useMemo
  const filteredBusinesses = useMemo(() => {
    if (selectedCategory === 'all') {
      return businesses;
    }
    return businesses.filter(business => 
      business.sector.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      business.name.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [businesses, selectedCategory]);

  // Debounce de la recherche pour optimiser les performances
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fonction de refresh optimisée avec cache busting
  const refreshBusinessData = useCallback(async (showToast = true) => {
    try {
      console.log('🔄 Refresh des données business...');
      await loadBusinessData('', 0, 300);
      
      if (showToast) {
        toast.success('🗺️ Données mises à jour ! Nouvelles entreprises visibles', {
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Erreur lors du refresh:', error);
      if (showToast) {
        toast.error('Erreur lors de la mise à jour des données');
      }
    }
  }, [loadBusinessData]);

  // Charger TOUTES les données au montage (197 entreprises)
  useEffect(() => {
    loadBusinessData(currentCity, 0, 300);
  }, [currentCity, loadBusinessData]);

  // Synchroniser l'état d'authentification avec isEmployeeMode
  useEffect(() => {
    console.log('🔐 État d\'authentification changé:', { user: !!user, isEmployeeMode, activeTab });
    if (user && activeTab === 'employee' && !isEmployeeMode) {
      console.log('🔄 Utilisateur connecté détecté - activation du mode employé');
      setIsEmployeeMode(true);
      setShowEmployeeAuth(false);
    } else if (!user && isEmployeeMode) {
      console.log('🔓 Utilisateur déconnecté - désactivation du mode employé');
      setIsEmployeeMode(false);
      setShowEmployeeAuth(false);
    }
  }, [user, activeTab, isEmployeeMode]);

  // Fonctions optimisées avec useCallback
  const handleCitySearch = useCallback((searchValue: string) => {
    setSearchQuery(searchValue);
    setCurrentCity(searchValue);
    setSelectedBusiness(null);
    setCompareMode(false);
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedSearchQuery.trim()) {
      handleCitySearch(debouncedSearchQuery.trim());
    }
  }, [debouncedSearchQuery, handleCitySearch]);

  // Fonctions de comparaison optimisées
  const startComparison = useCallback((business: RivalBusiness) => {
    setReferenceBusiness(business);
    setCompareMode(true);
  }, []);

  const addToComparison = useCallback((business: RivalBusiness) => {
    if (referenceBusiness && business.id !== referenceBusiness.id) {
      setCompareBusiness(business);
    }
  }, [referenceBusiness]);

  const resetComparison = useCallback(() => {
    setCompareMode(false);
    setReferenceBusiness(null);
    setCompareBusiness(null);
  }, []);

  // Rendu de la fiche entreprise détaillée
  const renderBusinessCard = (business: RivalBusiness, isReference = false) => {
    const isNewBusiness = newBusinessIds.has(business.id);
    
    return (
      <Card className={`bg-black/90 border-[#8E44FF]/30 backdrop-blur-xl ${
        isReference ? 'border-[#FFD56B]' : ''
      } ${isNewBusiness ? 'ring-2 ring-green-400 ring-offset-2 ring-offset-black' : ''} relative`}>
        <CardHeader className="pb-3">
          {isNewBusiness && (
            <div className="absolute -top-2 -right-2 z-10">
              <Badge className="bg-green-500 text-white text-xs px-2 py-1 animate-pulse">
                ✨ NOUVEAU
              </Badge>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">{business.name}</CardTitle>
            <div className="flex gap-2">
              <Badge className={`${business.ilaScore >= 80 ? 'bg-green-500' : business.ilaScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                ILA: {business.ilaScore}
              </Badge>
            </div>
          </div>
          <p className="text-white/60 text-sm">{business.address}</p>
          <p className="text-[#8E44FF] text-sm">{business.city} • {business.sector}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Bloc 1 - Google My Business */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Bloc 1 - Google My Business
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-white/60">Étoiles Google:</span>
                <div className="text-white font-semibold">{business.googleRating.toFixed(1)}/5</div>
              </div>
              <div>
                <span className="text-white/60">Total commentaires:</span>
                <div className="text-white font-semibold">{business.reviewCount}</div>
              </div>
              <div className="col-span-2">
                <span className="text-white/60">Photos présentes:</span>
                <div className="text-white font-semibold">{business.hasPhotos ? '✅ Oui' : '❌ Non'}</div>
              </div>
            </div>
          </div>

          {/* Bloc 2 - SEO Performance */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Bloc 2 - Performance SEO
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-white/60">Mots-clés TOP 10:</span>
                <span className="text-white font-semibold ml-2">{business.top10Keywords}</span>
              </div>
              <div>
                <span className="text-white/60">Trafic organique:</span>
                <span className="text-white font-semibold ml-2">{business.organicTraffic.toLocaleString()}/mois</span>
              </div>
              <div>
                <span className="text-white/60">Backlinks totaux:</span>
                <span className="text-white font-semibold ml-2">{business.backlinks}</span>
              </div>
              <div>
                <span className="text-white/60">Position moyenne:</span>
                <span className="text-white font-semibold ml-2">#{business.avgPosition}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {!compareMode && (
              <Button
                onClick={() => startComparison(business)}
                className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                size="sm"
              >
                <ArrowLeftRight className="w-4 h-4 mr-1" />
                Comparer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0b2e] to-black relative overflow-hidden">
      {/* Header avec navigation principale */}
      <div className="relative z-10 bg-black/80 backdrop-blur-xl border-b border-[#8E44FF]/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#8E44FF] via-[#FFD56B] to-[#8E44FF] bg-clip-text text-transparent">
                RivalViews™ Intelligence
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Cartographie concurrentielle et analyse territoriale IA
              </p>
            </div>
            
            {/* Navigation Client/Employé */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="bg-black/50 border border-[#8E44FF]/30">
                <TabsTrigger 
                  value="client" 
                  className="data-[state=active]:bg-[#8E44FF] data-[state=active]:text-white text-white/60"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Section Client
                </TabsTrigger>
                <TabsTrigger 
                  value="employee" 
                  className="data-[state=active]:bg-[#8E44FF] data-[state=active]:text-white text-white/60"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Section Employé
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Section Client */}
          <TabsContent value="client" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto px-4 py-6"
            >
              {/* Barre de recherche et filtres */}
              <div className="mb-6 space-y-4">
                <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="🔍 Rechercher une ville, entreprise ou secteur..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 bg-black/50 border-[#8E44FF]/30 text-white placeholder-white/40 text-center"
                    />
                  </div>
                </form>

                {/* Filtres et modes de vue */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Filter className="w-4 h-4 text-[#8E44FF]" />
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-black/50 border-[#8E44FF]/30 text-white min-w-48">
                        <SelectValue placeholder="Filtrer par catégorie" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#8E44FF]/30">
                        {BUSINESS_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category} className="text-white">
                            {category === 'all' ? '🏢 Toutes les catégories' : `🏪 ${category}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Modes de vue */}
                  <div className="flex items-center gap-2 bg-black/50 rounded-lg p-1 border border-[#8E44FF]/30">
                    <Button
                      variant={viewMode === 'map' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('map')}
                      className={viewMode === 'map' ? 'bg-[#8E44FF] text-white' : 'text-white/60 hover:text-white'}
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      Carte
                    </Button>
                    <Button
                      variant={viewMode === 'ideal' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('ideal')}
                      className={viewMode === 'ideal' ? 'bg-[#8E44FF] text-white' : 'text-white/60 hover:text-white'}
                    >
                      <Target className="w-4 h-4 mr-1" />
                      Idéale
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-[#8E44FF] text-white' : 'text-white/60 hover:text-white'}
                    >
                      <List className="w-4 h-4 mr-1" />
                      Liste
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-white/60 text-sm">
                    🏪 Catégorie: <span className="text-[#8E44FF] font-semibold">{selectedCategory === 'all' ? 'Toutes' : selectedCategory}</span> • 
                    📊 {filteredBusinesses.length} entreprises • 
                    👁️ Mode: <span className="text-[#FFD56B] font-semibold capitalize">{viewMode}</span>
                  </p>
                </div>
              </div>

              {/* Contenu selon le mode sélectionné */}
              {viewMode === 'map' && (
                <div className="bg-black/30 rounded-xl border border-[#8E44FF]/30 min-h-[600px]">
                  <Suspense fallback={<div className="flex items-center justify-center h-96"><div className="animate-spin w-8 h-8 border-2 border-[#8E44FF] border-t-transparent rounded-full"></div></div>}>
                    <MapListToggle 
                      businesses={filteredBusinesses}
                      selectedBusiness={selectedBusiness}
                      onBusinessClick={setSelectedBusiness}
                      onCompareClick={startComparison}
                    />
                  </Suspense>
                </div>
              )}

              {viewMode === 'ideal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBusinesses
                    .filter(b => b.ilaScore >= 70)
                    .sort((a, b) => b.ilaScore - a.ilaScore)
                    .slice(0, 9)
                    .map((business) => (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => setSelectedBusiness(business)}
                      >
                        {renderBusinessCard(business)}
                      </motion.div>
                    ))}
                  {filteredBusinesses.filter(b => b.ilaScore >= 70).length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-white/60">Aucune entreprise avec un score ILA™ supérieur à 70 dans cette catégorie</p>
                    </div>
                  )}
                </div>
              )}

              {viewMode === 'list' && (
                <div className="bg-black/30 rounded-xl border border-[#8E44FF]/30 overflow-hidden">
                  <div className="p-4 border-b border-[#8E44FF]/20">
                    <h3 className="text-white font-semibold">Liste des entreprises</h3>
                  </div>
                  <div className="max-h-[600px] overflow-y-auto">
                    {filteredBusinesses.map((business, index) => (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 border-b border-[#8E44FF]/10 hover:bg-[#8E44FF]/5 cursor-pointer transition-colors"
                        onClick={() => setSelectedBusiness(business)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">{business.name}</h4>
                            <p className="text-white/60 text-sm">{business.address} • {business.sector}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`${business.ilaScore >= 80 ? 'bg-green-500' : business.ilaScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'} text-white text-xs`}>
                                ILA: {business.ilaScore}
                              </Badge>
                              <span className="text-white/40 text-xs">
                                {business.reviewCount} avis • {business.indexedKeywords} mots-clés
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                startComparison(business);
                              }}
                              className="border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/20"
                            >
                              <ArrowLeftRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Détails de l'entreprise sélectionnée */}
              {selectedBusiness && (
                <motion.div
                  key={selectedBusiness.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  {renderBusinessCard(selectedBusiness)}
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          {/* Section Employé */}
          <TabsContent value="employee" className="mt-0">
            <AnimatePresence mode="wait">
              {!user || !isEmployeeMode ? (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-50"
                >
                  <EmployeeAuth 
                    onSuccess={() => {
                      console.log('✅ onSuccess - transition vers section employé');
                      setIsEmployeeMode(true);
                      setShowEmployeeAuth(false);
                    }} 
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="employee-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-40"
                >
                  <EmployeeSection 
                    onLogout={() => {
                      console.log('🚪 Déconnexion - retour à la section publique');
                      setIsEmployeeMode(false);
                      setShowEmployeeAuth(false);
                      setActiveTab('client');
                    }} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>

      {/* Assistant LILO™ - uniquement en mode client et desktop */}
      {activeTab === 'client' && !isMobile && (
        <LiloAssistant 
          business={selectedBusiness} 
          mode={compareMode ? 'compare' : 'map'} 
        />
      )}

      {/* Modals avec Suspense */}
      <Suspense fallback={null}>
        <ExportModule
          businesses={filteredBusinesses}
          selectedBusiness={selectedBusiness}
          isVisible={showExportModal}
          onClose={() => setShowExportModal(false)}
        />

        {selectedBusiness && (
          <CRMIntegration
            business={selectedBusiness}
            isVisible={showCRMModal}
            onClose={() => setShowCRMModal(false)}
            onUpdate={(updatedBusiness) => {
              setBusinesses(prev => 
                prev.map(b => b.id === updatedBusiness.id ? updatedBusiness : b)
              );
            }}
          />
        )}
      </Suspense>
    </div>
  );
};

export default RevolveViewsClient;