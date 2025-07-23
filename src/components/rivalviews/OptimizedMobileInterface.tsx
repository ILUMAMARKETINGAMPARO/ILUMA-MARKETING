import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  MapPin,
  X,
  ChevronUp,
  ChevronDown,
  Menu,
  List,
  Target,
  Eye,
  Loader2
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';
import { useDebounce } from '@/hooks/use-debounce';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer.ts';

// Lazy load des composants lourds
const MobileBusinessList = lazy(() => import('./MobileBusinessList'));
const MobileBusinessCard = lazy(() => import('./MobileBusinessCard'));

interface OptimizedMobileInterfaceProps {
  businesses: RivalBusiness[];
  selectedBusiness: RivalBusiness | null;
  onBusinessSelect: (business: RivalBusiness) => void;
  onCompareClick: (business: RivalBusiness) => void;
  compareMode: boolean;
  referenceBusiness: RivalBusiness | null;
  compareBusiness: RivalBusiness | null;
  newBusinessIds: Set<string>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCitySearch: (city: string) => void;
  isLoading: boolean;
}

// Composant de chargement optimisé
const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-[#8E44FF]" />
  </div>
));

const OptimizedMobileInterface: React.FC<OptimizedMobileInterfaceProps> = ({
  businesses,
  selectedBusiness,
  onBusinessSelect,
  onCompareClick,
  compareMode,
  referenceBusiness,
  compareBusiness,
  newBusinessIds,
  searchQuery,
  onSearchChange,
  onCitySearch,
  isLoading
}) => {
  const [bottomSheetHeight, setBottomSheetHeight] = useState<'min' | 'mid' | 'full'>('min');
  const [activeView, setActiveView] = useState<'map' | 'list' | 'compare'>('list'); // Commence par liste pour de meilleures performances
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Debounce de la recherche pour éviter les re-renders fréquents
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Pagination pour les performances
  const [displayedBusinesses, setDisplayedBusinesses] = useState<RivalBusiness[]>([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // Intersection observer pour le lazy loading
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  // Memoisation des calculs lourds
  const businessSummary = useMemo(() => ({
    total: businesses.length,
    highScore: businesses.filter(b => b.ilaScore >= 80).length,
    mediumScore: businesses.filter(b => b.ilaScore >= 60 && b.ilaScore < 80).length,
    newCount: newBusinessIds.size
  }), [businesses, newBusinessIds]);

  // Filtrage optimisé avec pagination
  const filteredBusinesses = useMemo(() => {
    if (!debouncedSearchQuery) return businesses;
    
    const query = debouncedSearchQuery.toLowerCase();
    return businesses.filter(business => 
      business.name.toLowerCase().includes(query) ||
      business.city.toLowerCase().includes(query) ||
      business.sector.toLowerCase().includes(query)
    );
  }, [businesses, debouncedSearchQuery]);

  // Pagination avec lazy loading
  const paginatedBusinesses = useMemo(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    return filteredBusinesses.slice(0, endIndex);
  }, [filteredBusinesses, page]);

  // Load more when scrolling
  React.useEffect(() => {
    if (isIntersecting && paginatedBusinesses.length < filteredBusinesses.length) {
      setPage(prev => prev + 1);
    }
  }, [isIntersecting, paginatedBusinesses.length, filteredBusinesses.length]);

  // Callbacks optimisés
  const handleSearchChange = useCallback((value: string) => {
    onSearchChange(value);
    setPage(1); // Reset pagination on search
  }, [onSearchChange]);

  const handleCitySearchSubmit = useCallback(() => {
    if (debouncedSearchQuery.trim()) {
      onCitySearch(debouncedSearchQuery.trim());
    }
  }, [debouncedSearchQuery, onCitySearch]);

  const toggleBottomSheet = useCallback(() => {
    setBottomSheetHeight(prev => 
      prev === 'min' ? 'mid' : prev === 'mid' ? 'full' : 'min'
    );
  }, []);

  // Animation configs optimisées
  const slideAnimation = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.2 }
  };

  const getSheetHeight = useCallback(() => {
    const vh = window.innerHeight;
    switch (bottomSheetHeight) {
      case 'min': return vh * 0.15;
      case 'mid': return vh * 0.5;
      case 'full': return vh * 0.85;
      default: return vh * 0.15;
    }
  }, [bottomSheetHeight]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-background via-background/90 to-background overflow-hidden relative">
      {/* Header optimisé */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-foreground font-bold text-lg">RivalViews™</h1>
              <p className="text-muted-foreground text-xs">Intelligence Concurrentielle</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowSearch(!showSearch)}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground p-2"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={() => setShowMenu(!showMenu)}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Barre de recherche avec animation optimisée */}
        <AnimatePresence>
          {showSearch && (
            <motion.div {...slideAnimation} className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCitySearchSubmit()}
                  placeholder="Rechercher par ville, secteur..."
                  className="pl-10 bg-background/50 border-border"
                />
                <Button
                  onClick={() => setShowSearch(false)}
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu simplifié */}
        <AnimatePresence>
          {showMenu && (
            <motion.div {...slideAnimation} className="px-4 pb-4 space-y-2">
              <Button
                onClick={() => { setActiveView('list'); setShowMenu(false); }}
                variant={activeView === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
              >
                <List className="w-4 h-4 mr-2" />
                Vue Liste
              </Button>
              <Button
                onClick={() => { setActiveView('map'); setShowMenu(false); }}
                variant={activeView === 'map' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Vue Carte
              </Button>
              {compareMode && (
                <Button
                  onClick={() => { setActiveView('compare'); setShowMenu(false); }}
                  variant={activeView === 'compare' ? 'default' : 'ghost'}
                  size="sm"
                  className="w-full justify-start"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Comparaison
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Zone de contenu principal avec lazy loading */}
      <div className="absolute inset-0 pt-16 pb-0">
        <Suspense fallback={<LoadingSpinner />}>
          {activeView === 'list' && (
            <div className="w-full h-full p-4">
              <MobileBusinessList
                businesses={paginatedBusinesses}
                selectedBusiness={selectedBusiness}
                onBusinessSelect={onBusinessSelect}
                onCompareClick={onCompareClick}
                newBusinessIds={newBusinessIds}
                className="h-full"
              />
              {/* Trigger pour lazy loading */}
              {paginatedBusinesses.length < filteredBusinesses.length && (
                <div ref={targetRef as React.RefObject<HTMLDivElement>} className="h-10 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}
            </div>
          )}

          {activeView === 'map' && (
            <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/5 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="text-foreground text-xl font-bold mb-2">Carte Interactive</h3>
                <p className="text-muted-foreground">Visualisation des concurrents en cours de développement</p>
                <p className="text-muted-foreground/60 text-sm mt-2">Utilisez la vue liste pour explorer les données</p>
              </div>
            </div>
          )}

          {activeView === 'compare' && compareMode && (
            <div className="w-full h-full p-4 space-y-4 overflow-y-auto">
              <div className="text-center">
                <h3 className="text-foreground text-lg font-bold mb-2">Mode Comparaison</h3>
                <p className="text-muted-foreground text-sm">Analysez les différences entre entreprises</p>
              </div>
              
              {referenceBusiness && (
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">🏆 Référence</h4>
                  <MobileBusinessCard
                    business={referenceBusiness}
                    isReference={true}
                    onSelectClick={onBusinessSelect}
                  />
                </div>
              )}
              
              {compareBusiness && (
                <div>
                  <h4 className="text-primary font-semibold mb-2">⚖️ Comparaison</h4>
                  <MobileBusinessCard
                    business={compareBusiness}
                    onSelectClick={onBusinessSelect}
                  />
                </div>
              )}
            </div>
          )}
        </Suspense>
      </div>

      {/* Bottom Sheet optimisé */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30"
        style={{ height: getSheetHeight() }}
        layout
      >
        <Card className="h-full bg-card/95 backdrop-blur-sm border-t border-border rounded-t-xl border-b-0">
          <div className="w-12 h-1 bg-muted-foreground/20 rounded-full mx-auto mt-2 mb-4" />
          
          <CardHeader className="pb-2 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground text-lg">
                {selectedBusiness ? selectedBusiness.name : 'Vue d\'ensemble'}
              </CardTitle>
              <Button
                onClick={toggleBottomSheet}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground p-1"
              >
                {bottomSheetHeight === 'min' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="px-4 pb-4 overflow-y-auto">
            <Suspense fallback={<LoadingSpinner />}>
              {selectedBusiness ? (
                <MobileBusinessCard
                  business={selectedBusiness}
                  isNew={newBusinessIds.has(selectedBusiness.id)}
                  onCompareClick={onCompareClick}
                />
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                    <div className="text-primary text-2xl font-bold">{businessSummary.total}</div>
                    <div className="text-muted-foreground text-xs">Entreprises analysées</div>
                  </div>
                  
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <div className="text-green-400 text-2xl font-bold">{businessSummary.highScore}</div>
                    <div className="text-muted-foreground text-xs">Score ILA ≥ 80</div>
                  </div>
                  
                  <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                    <div className="text-yellow-400 text-2xl font-bold">{businessSummary.mediumScore}</div>
                    <div className="text-muted-foreground text-xs">Score ILA 60-79</div>
                  </div>
                  
                  <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                    <div className="text-accent-foreground text-2xl font-bold">{businessSummary.newCount}</div>
                    <div className="text-muted-foreground text-xs">Nouvelles entreprises</div>
                  </div>
                </div>
              )}
            </Suspense>
          </CardContent>
        </Card>
      </motion.div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium">Chargement des données...</p>
            <p className="text-muted-foreground text-sm">Optimisation en cours</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(OptimizedMobileInterface);