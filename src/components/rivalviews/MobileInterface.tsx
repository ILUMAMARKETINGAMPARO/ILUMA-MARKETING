import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  MapPin,
  X,
  ChevronUp,
  ChevronDown,
  Menu,
  Grid,
  List,
  Target,
  Eye,
  MoreHorizontal,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';
import MobileBusinessList from './MobileBusinessList';
import MobileBusinessCard from './MobileBusinessCard';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface MobileInterfaceProps {
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

const MobileInterface: React.FC<MobileInterfaceProps> = ({
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
  const [activeView, setActiveView] = useState<'map' | 'list' | 'compare'>('map');
  const [showSearch, setShowSearch] = useState(false);
  const constraintsRef = useRef(null);

  // Calcul des hauteurs responsive
  const getSheetHeight = () => {
    const vh = window.innerHeight;
    switch (bottomSheetHeight) {
      case 'min': return vh * 0.15; // 15% de l'écran
      case 'mid': return vh * 0.5;  // 50% de l'écran  
      case 'full': return vh * 0.85; // 85% de l'écran
      default: return vh * 0.15;
    }
  };

  // Gestion des swipes verticaux
  const handlePanEnd = (event: any, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    if (velocity < -500 || offset < -100) {
      // Swipe vers le haut
      if (bottomSheetHeight === 'min') setBottomSheetHeight('mid');
      else if (bottomSheetHeight === 'mid') setBottomSheetHeight('full');
    } else if (velocity > 500 || offset > 100) {
      // Swipe vers le bas
      if (bottomSheetHeight === 'full') setBottomSheetHeight('mid');
      else if (bottomSheetHeight === 'mid') setBottomSheetHeight('min');
    }
  };

  // Sommaire des données pour l'en-tête
  const businessSummary = {
    total: businesses.length,
    highScore: businesses.filter(b => b.ilaScore >= 80).length,
    mediumScore: businesses.filter(b => b.ilaScore >= 60 && b.ilaScore < 80).length,
    newCount: newBusinessIds.size
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-black via-[#1a1a2e] to-black overflow-hidden relative">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-[#8E44FF]/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-[#8E44FF]" />
            <div>
              <h1 className="text-white font-bold text-lg">RivalViews™</h1>
              <p className="text-white/60 text-xs">Intelligence Concurrentielle</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowSearch(!showSearch)}
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white p-2"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white p-2"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black/95 border-[#8E44FF]/30">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu RivalViews™</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-3">
                  <Button
                    onClick={() => setActiveView('map')}
                    variant={activeView === 'map' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Vue Carte
                  </Button>
                  <Button
                    onClick={() => setActiveView('list')}
                    variant={activeView === 'list' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <List className="w-4 h-4 mr-2" />
                    Vue Liste
                  </Button>
                  {compareMode && (
                    <Button
                      onClick={() => setActiveView('compare')}
                      variant={activeView === 'compare' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Comparaison
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Barre de recherche extensible */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/40" />
                <Input
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onCitySearch(searchQuery);
                    }
                  }}
                  placeholder="Rechercher par ville, secteur..."
                  className="pl-10 bg-black/50 border-[#8E44FF]/30 text-white placeholder:text-white/40"
                />
                <Button
                  onClick={() => setShowSearch(false)}
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 text-white/60 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Zone de contenu principal (Carte/Liste) */}
      <div className="absolute inset-0 pt-16 pb-0">
        {activeView === 'map' && (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-black flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#8E44FF] mx-auto mb-4 animate-pulse" />
              <h3 className="text-white text-xl font-bold mb-2">Carte Interactive</h3>
              <p className="text-white/60">Visualisation des concurrents en cours de développement</p>
              <p className="text-white/40 text-sm mt-2">Utilisez la vue liste pour explorer les données</p>
            </div>
          </div>
        )}

        {activeView === 'list' && (
          <div className="w-full h-full p-4">
            <MobileBusinessList
              businesses={businesses}
              selectedBusiness={selectedBusiness}
              onBusinessSelect={onBusinessSelect}
              onCompareClick={onCompareClick}
              newBusinessIds={newBusinessIds}
              className="h-full"
            />
          </div>
        )}

        {activeView === 'compare' && compareMode && (
          <div className="w-full h-full p-4 space-y-4 overflow-y-auto">
            <div className="text-center">
              <h3 className="text-white text-lg font-bold mb-2">Mode Comparaison</h3>
              <p className="text-white/60 text-sm">Analysez les différences entre entreprises</p>
            </div>
            
            {referenceBusiness && (
              <div>
                <h4 className="text-[#FFD56B] font-semibold mb-2">🏆 Référence</h4>
                <MobileBusinessCard
                  business={referenceBusiness}
                  isReference={true}
                  onSelectClick={onBusinessSelect}
                />
              </div>
            )}
            
            {compareBusiness && (
              <div>
                <h4 className="text-[#8E44FF] font-semibold mb-2">⚖️ Comparaison</h4>
                <MobileBusinessCard
                  business={compareBusiness}
                  onSelectClick={onBusinessSelect}
                />
              </div>
            )}
            
            {referenceBusiness && compareBusiness && (
              <div className="bg-black/40 rounded-lg p-4 border border-[#8E44FF]/20">
                <h4 className="text-white font-semibold mb-3">📊 Analyse Comparative</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Score ILA™:</span>
                    <div className="flex items-center gap-2">
                      <Badge className={referenceBusiness.ilaScore > compareBusiness.ilaScore ? 'bg-green-500' : 'bg-gray-500'}>
                        {referenceBusiness.ilaScore}
                      </Badge>
                      <span className="text-white/40">vs</span>
                      <Badge className={compareBusiness.ilaScore > referenceBusiness.ilaScore ? 'bg-green-500' : 'bg-gray-500'}>
                        {compareBusiness.ilaScore}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Avis Google:</span>
                    <div className="flex items-center gap-2">
                      <span className={referenceBusiness.reviewCount > compareBusiness.reviewCount ? 'text-green-400' : 'text-white'}>
                        {referenceBusiness.reviewCount}
                      </span>
                      <span className="text-white/40">vs</span>
                      <span className={compareBusiness.reviewCount > referenceBusiness.reviewCount ? 'text-green-400' : 'text-white'}>
                        {compareBusiness.reviewCount}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Mots-clés TOP 10:</span>
                    <div className="flex items-center gap-2">
                      <span className={referenceBusiness.top10Keywords > compareBusiness.top10Keywords ? 'text-green-400' : 'text-white'}>
                        {referenceBusiness.top10Keywords}
                      </span>
                      <span className="text-white/40">vs</span>
                      <span className={compareBusiness.top10Keywords > referenceBusiness.top10Keywords ? 'text-green-400' : 'text-white'}>
                        {compareBusiness.top10Keywords}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Sheet avec résumé et entreprise sélectionnée */}
      <motion.div
        ref={constraintsRef}
        className="absolute bottom-0 left-0 right-0 z-30"
        style={{ height: getSheetHeight() }}
        drag="y"
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        onPanEnd={handlePanEnd}
      >
        <Card className="h-full bg-black/95 backdrop-blur-xl border-t border-[#8E44FF]/30 rounded-t-xl border-b-0">
          {/* Handle pour le drag */}
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-2 mb-4" />
          
          <CardHeader className="pb-2 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">
                {selectedBusiness ? selectedBusiness.name : 'Vue d\'ensemble'}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setBottomSheetHeight(
                    bottomSheetHeight === 'min' ? 'mid' : bottomSheetHeight === 'mid' ? 'full' : 'min'
                  )}
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white p-1"
                >
                  {bottomSheetHeight === 'min' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-4 pb-4 overflow-y-auto">
            {selectedBusiness ? (
              <div className="space-y-4">
                <MobileBusinessCard
                  business={selectedBusiness}
                  isNew={newBusinessIds.has(selectedBusiness.id)}
                  onCompareClick={onCompareClick}
                />
                
                {bottomSheetHeight === 'full' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Détails supplémentaires quand le sheet est étendu */}
                    <div className="bg-black/40 rounded-lg p-4 border border-[#8E44FF]/20">
                      <h4 className="text-white font-semibold mb-3">📍 Informations de Contact</h4>
                      <div className="space-y-2 text-sm">
                        {selectedBusiness.address && (
                          <div className="text-white/80">{selectedBusiness.address}</div>
                        )}
                        {selectedBusiness.phone && (
                          <div className="text-[#FFD56B]">{selectedBusiness.phone}</div>
                        )}
                        {selectedBusiness.website && (
                          <div className="text-green-400 truncate">{selectedBusiness.website}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-black/40 rounded-lg p-4 border border-[#8E44FF]/20">
                      <h4 className="text-white font-semibold mb-3">🎯 Opportunités Détectées</h4>
                      <div className="space-y-2 text-sm">
                        {selectedBusiness.ilaScore < 60 && (
                          <div className="text-green-400">• Faible concurrence SEO - Opportunité élevée</div>
                        )}
                        {selectedBusiness.reviewCount < 50 && (
                          <div className="text-yellow-400">• Peu d'avis Google - Amélioration possible</div>
                        )}
                        {selectedBusiness.top10Keywords < 10 && (
                          <div className="text-blue-400">• Potentiel SEO inexploité</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Résumé global */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#8E44FF]/10 rounded-lg p-3 border border-[#8E44FF]/20">
                    <div className="text-[#8E44FF] text-2xl font-bold">{businessSummary.total}</div>
                    <div className="text-white/60 text-xs">Entreprises analysées</div>
                  </div>
                  
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <div className="text-green-400 text-2xl font-bold">{businessSummary.highScore}</div>
                    <div className="text-white/60 text-xs">Score ILA ≥ 80</div>
                  </div>
                  
                  <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                    <div className="text-yellow-400 text-2xl font-bold">{businessSummary.mediumScore}</div>
                    <div className="text-white/60 text-xs">Score ILA 60-79</div>
                  </div>
                  
                  <div className="bg-[#FFD56B]/10 rounded-lg p-3 border border-[#FFD56B]/20">
                    <div className="text-[#FFD56B] text-2xl font-bold">{businessSummary.newCount}</div>
                    <div className="text-white/60 text-xs">Nouvelles entreprises</div>
                  </div>
                </div>
                
                <div className="text-center text-white/60 text-sm">
                  <p>Touchez une entreprise pour voir les détails</p>
                  <p className="text-xs text-white/40 mt-1">Glissez vers le haut pour plus d'options</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Loader pour les données */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-[#8E44FF] border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-white text-sm">Chargement des données...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileInterface;