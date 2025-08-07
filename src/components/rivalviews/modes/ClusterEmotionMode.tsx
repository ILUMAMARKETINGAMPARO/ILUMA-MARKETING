import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Phone, 
  Globe, 
  Star,
  Eye,
  Heart,
  Zap,
  TrendingUp,
  Filter,
  Search,
  X,
  Sparkles,
  Bot,
  Users
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import MapboxProvider, { useMapbox } from '../MapboxProvider';
import EnrichedBusinessCard from '../components/EnrichedBusinessCard';
import mapboxgl from 'mapbox-gl';

interface ClusterEmotionModeProps {
  businesses: RivalBusiness[];
  onBusinessClick?: (business: RivalBusiness) => void;
  onExport?: () => void;
}

// Émojis par secteur d'activité
const getSectorEmoji = (sector: string): string => {
  const sectorMap: Record<string, string> = {
    'Meubles': '🛋️',
    'magasin de meubles': '🛋️',
    'Restaurants': '🍽️',
    'restaurant': '🍽️',
    'Santé': '🏥',
    'santé': '🏥',
    'médical': '🏥',
    'Bébé': '👶',
    'bébé': '👶',
    'Mode': '👕',
    'mode': '👕',
    'vêtements': '👕',
    'Beauté': '💅',
    'beauté': '💅',
    'esthétique': '💅',
    'Ésthétique': '💅',
    'lunetterie': '👓',
    'Lunetterie': '👓',
    'optique': '👓',
    'École de conduite': '🚗',
    'conduite': '🚗',
    'Comptable': '📊',
    'comptable': '📊',
    'Avocats': '⚖️',
    'avocat': '⚖️',
    'notaire': '📝',
    'Vente automobile': '🚙',
    'automobile': '🚙',
  };
  
  const lowerSector = sector.toLowerCase();
  for (const [key, emoji] of Object.entries(sectorMap)) {
    if (lowerSector.includes(key.toLowerCase())) {
      return emoji;
    }
  }
  return '🏢'; // Emoji par défaut
};

// Composant de carte Mapbox améliorée
const RivalMap: React.FC<{ 
  businesses: RivalBusiness[]; 
  filteredBusinesses: RivalBusiness[];
  onBusinessClick: (business: RivalBusiness) => void;
  onBusinessHover: (business: RivalBusiness | null) => void;
}> = ({ businesses, filteredBusinesses, onBusinessClick, onBusinessHover }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { token, isReady } = useMapbox();
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!isReady || !token || !mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-73.5673, 45.5017], // Montréal
      zoom: 10,
      pitch: 45,
      bearing: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isReady, token]);

  useEffect(() => {
    if (!map.current) return;

    // Nettoyer les anciens marqueurs
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Créer de nouveaux marqueurs pour les entreprises filtrées
    filteredBusinesses.forEach((business) => {
      if (!business.lat || !business.lng) return;

      const emoji = getSectorEmoji(business.sector);
      const score = business.ilaScore;
      
      // Couleur du halo selon score ILA™
      const getHaloColor = (score: number) => {
        if (score >= 80) return '#FFD700';
        if (score >= 60) return '#4ADE80';
        if (score >= 40) return '#F97316';
        return '#EF4444';
      };

      // Créer l'élément DOM pour le marqueur
      const el = document.createElement('div');
      el.className = 'rival-marker';
      el.innerHTML = `
        <div class="relative group cursor-pointer">
          <!-- Halo animé -->
          <div class="absolute inset-0 rounded-full animate-pulse" 
               style="
                 background: radial-gradient(circle, ${getHaloColor(score)}40 0%, ${getHaloColor(score)}20 50%, transparent 100%);
                 width: ${Math.max(30, score / 2)}px;
                 height: ${Math.max(30, score / 2)}px;
                 margin: -${Math.max(15, score / 4)}px;
                 box-shadow: 0 0 ${score / 3}px ${getHaloColor(score)};
               ">
          </div>
          
          <!-- Emoji pin -->
          <div class="relative z-10 w-8 h-8 flex items-center justify-center bg-black/80 border-2 rounded-full text-lg transform transition-all duration-300 hover:scale-125 hover:shadow-lg"
               style="border-color: ${getHaloColor(score)}; box-shadow: 0 0 15px ${getHaloColor(score)}40;">
            ${emoji}
          </div>
          
          <!-- Score badge -->
          <div class="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold border"
               style="border-color: ${getHaloColor(score)}; color: ${getHaloColor(score)};">
            ${score}
          </div>
        </div>
      `;

      // Événements de survol et clic
      el.addEventListener('mouseenter', () => onBusinessHover(business));
      el.addEventListener('mouseleave', () => onBusinessHover(null));
      el.addEventListener('click', () => onBusinessClick(business));

      const marker = new mapboxgl.Marker(el)
        .setLngLat([business.lng, business.lat])
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [filteredBusinesses, onBusinessClick, onBusinessHover]);

  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
};

const ClusterEmotionMode: React.FC<ClusterEmotionModeProps> = ({
  businesses,
  onBusinessClick,
  onExport
}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);
  const [hoveredBusiness, setHoveredBusiness] = useState<RivalBusiness | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  
  // États de filtres
  const [filters, setFilters] = useState({
    sector: 'all',
    city: 'all',
    ilaScoreRange: [0, 100],
    minReviews: 0,
    minTraffic: 0,
    searchQuery: ''
  });

  const handleBusinessClick = useCallback((business: RivalBusiness) => {
    setSelectedBusiness(business);
    onBusinessClick?.(business);
  }, [onBusinessClick]);

  const handleCloseCard = useCallback(() => {
    setSelectedBusiness(null);
  }, []);

  // Appliquer les filtres
  const filteredBusinesses = businesses.filter(business => {
    if (filters.sector !== 'all' && !business.sector.toLowerCase().includes(filters.sector.toLowerCase())) return false;
    if (filters.city !== 'all' && business.city !== filters.city) return false;
    if (business.ilaScore < filters.ilaScoreRange[0] || business.ilaScore > filters.ilaScoreRange[1]) return false;
    if (business.reviewCount < filters.minReviews) return false;
    if (business.organicTraffic < filters.minTraffic) return false;
    if (filters.searchQuery && !business.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  // Secteurs uniques pour le filtre
  const uniqueSectors = Array.from(new Set(businesses.map(b => b.sector)));
  const uniqueCities = Array.from(new Set(businesses.map(b => b.city)));

  // Couleur du pin selon score ILA™
  const getBusinessColor = (score: number) => {
    if (score >= 80) return '#FFD700'; // Or pour excellence
    if (score >= 60) return '#4ADE80'; // Vert pour bon
    if (score >= 40) return '#F97316'; // Orange pour moyen
    return '#EF4444'; // Rouge pour faible
  };

  return (
    <div className="relative h-[calc(100vh-140px)] bg-gray-900">
      {/* Filtres intelligents */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="absolute top-0 left-0 z-50 w-80 h-full bg-black/95 backdrop-blur-xl border-r border-primary/30 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Filtres Intelligents</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Recherche */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Recherche</label>
                <Input
                  placeholder="Nom d'entreprise..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              {/* Secteur */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Secteur</label>
                <Select value={filters.sector} onValueChange={(value) => setFilters(prev => ({ ...prev, sector: value }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les secteurs</SelectItem>
                    {uniqueSectors.map(sector => (
                      <SelectItem key={sector} value={sector}>
                        {getSectorEmoji(sector)} {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ville */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Ville</label>
                <Select value={filters.city} onValueChange={(value) => setFilters(prev => ({ ...prev, city: value }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {uniqueCities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Score ILA™ */}
              <div>
                <label className="text-sm text-gray-300 mb-3 block">
                  Score ILA™: {filters.ilaScoreRange[0]} - {filters.ilaScoreRange[1]}
                </label>
                <Slider
                  value={filters.ilaScoreRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, ilaScoreRange: value }))}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Avis minimum */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Avis minimum: {filters.minReviews}</label>
                <Slider
                  value={[filters.minReviews]}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, minReviews: value[0] }))}
                  max={200}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Trafic minimum */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Trafic minimum: {filters.minTraffic}</label>
                <Slider
                  value={[filters.minTraffic]}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, minTraffic: value[0] }))}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                {filteredBusinesses.length} / {businesses.length} entreprises affichées
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel IA LILO™ */}
      <AnimatePresence>
        {showAIPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-0 right-0 z-50 w-80 h-full bg-black/95 backdrop-blur-xl border-l border-primary/30 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                LILO™ Assistant
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAIPanel(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-primary/20 to-transparent border-primary/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Bot className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-white mb-2">
                        "Voici les 3 entreprises les plus visibles dans votre zone:"
                      </p>
                      <div className="space-y-2">
                        {filteredBusinesses
                          .sort((a, b) => b.ilaScore - a.ilaScore)
                          .slice(0, 3)
                          .map((business, index) => (
                            <div key={business.id} className="text-xs text-gray-300 flex items-center gap-2">
                              <span className="text-primary font-bold">#{index + 1}</span>
                              <span>{getSectorEmoji(business.sector)}</span>
                              <span>{business.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {business.ilaScore}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full" variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                Analyser les opportunités
              </Button>

              <Button className="w-full" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Illumatch™ Alliances
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carte interactive style Airbnb */}
      <MapboxProvider>
        <div className="relative w-full h-full">
          <RivalMap
            businesses={businesses}
            filteredBusinesses={filteredBusinesses}
            onBusinessClick={handleBusinessClick}
            onBusinessHover={setHoveredBusiness}
          />
          
          {/* Mini-fiche au survol */}
          <AnimatePresence>
            {hoveredBusiness && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute top-4 left-4 z-40 max-w-sm"
              >
                <Card className="bg-black/90 backdrop-blur-xl border-primary/30 shadow-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {getSectorEmoji(hoveredBusiness.sector)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm mb-1">
                          {hoveredBusiness.name}
                        </h3>
                        <p className="text-xs text-gray-300 mb-2">
                          {hoveredBusiness.sector} • {hoveredBusiness.city}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Badge 
                              variant="secondary" 
                              className="bg-primary/20 text-primary border-primary/30 text-xs px-1"
                            >
                              ILA™ {hoveredBusiness.ilaScore}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{hoveredBusiness.googleRating} ({hoveredBusiness.reviewCount})</span>
                          </div>
                          <div className="text-gray-400">
                            🌐 {hoveredBusiness.organicTraffic || 0}/mois
                          </div>
                          <div className="text-gray-400">
                            🔑 {hoveredBusiness.indexedKeywords || 0} mots-clés
                          </div>
                        </div>

                        <div className="flex gap-1 mt-3">
                          <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                            Comparer
                          </Button>
                          <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                            Mission
                          </Button>
                          <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                            Voir fiche
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contrôles d'action flottants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40"
          >
            <Card className="bg-black/90 backdrop-blur-xl border-primary/30">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    Filtres
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowAIPanel(!showAIPanel)}
                  >
                    <Bot className="w-4 h-4 mr-1" />
                    LILO™
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={onExport}
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Légende émojis secteurs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 z-40"
          >
            <Card className="bg-black/90 backdrop-blur-xl border-primary/30">
              <CardContent className="p-4">
                <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Secteurs d'Activité
                </h4>
                
                <div className="space-y-2 text-xs">
                  {Array.from(new Set(filteredBusinesses.map(b => b.sector))).slice(0, 6).map((sector) => (
                    <div key={sector} className="flex items-center gap-2">
                      <span className="text-lg">{getSectorEmoji(sector)}</span>
                      <span className="text-gray-300 text-xs">{sector}</span>
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {filteredBusinesses.filter(b => b.sector === sector).length}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-700 space-y-2">
                  {[
                    { score: '80-100', color: '#FFD700', label: 'Excellence' },
                    { score: '60-79', color: '#4ADE80', label: 'Performance' },
                    { score: '40-59', color: '#F97316', label: 'Potentiel' },
                    { score: '0-39', color: '#EF4444', label: 'Opportunité' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full shadow-lg"
                        style={{ 
                          backgroundColor: item.color,
                          boxShadow: `0 0 10px ${item.color}40`
                        }}
                      />
                      <span className="text-gray-300 text-xs">{item.label}</span>
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {filteredBusinesses.filter(b => {
                          if (item.score === '80-100') return b.ilaScore >= 80;
                          if (item.score === '60-79') return b.ilaScore >= 60 && b.ilaScore < 80;
                          if (item.score === '40-59') return b.ilaScore >= 40 && b.ilaScore < 60;
                          return b.ilaScore < 40;
                        }).length}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </MapboxProvider>

      {/* Fiche enrichie en overlay */}
      <AnimatePresence>
        {selectedBusiness && (
          <EnrichedBusinessCard
            business={selectedBusiness}
            onClose={handleCloseCard}
            onNext={() => {
              const currentIndex = filteredBusinesses.findIndex(b => b.id === selectedBusiness.id);
              const nextIndex = (currentIndex + 1) % filteredBusinesses.length;
              setSelectedBusiness(filteredBusinesses[nextIndex]);
            }}
            onPrevious={() => {
              const currentIndex = filteredBusinesses.findIndex(b => b.id === selectedBusiness.id);
              const prevIndex = currentIndex === 0 ? filteredBusinesses.length - 1 : currentIndex - 1;
              setSelectedBusiness(filteredBusinesses[prevIndex]);
            }}
            isOverlay={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClusterEmotionMode;