import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  Phone, 
  Globe, 
  Filter,
  Search,
  Settings,
  BarChart3,
  Building,
  Users,
  Target,
  Zap,
  Waves
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import { useMapbox } from '../MapboxProvider';
import { toast } from 'sonner';
import WaveInfluenceMode from './WaveInfluenceMode';

interface OptimizedMapViewProps {
  businesses: RivalBusiness[];
  onBusinessClick: (business: RivalBusiness) => void;
  selectedBusiness: RivalBusiness | null;
}

type MapDisplayMode = 'classic' | 'waves' | 'constellations' | 'radar';

interface MapFilters {
  searchQuery: string;
  selectedSector: string;
  selectedCity: string;
  ilaScoreRange: [number, number];
  hasGPS: boolean | null;
  digitalPresence: string | null;
}

interface ClusterData {
  id: string;
  coordinates: [number, number];
  count: number;
  avgScore: number;
  businesses: RivalBusiness[];
}

const OptimizedMapView: React.FC<OptimizedMapViewProps> = ({
  businesses,
  onBusinessClick,
  selectedBusiness
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const clusterMarkers = useRef<mapboxgl.Marker[]>([]);
  
  // États
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredBusiness, setHoveredBusiness] = useState<RivalBusiness | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [useSmartClustering, setUseSmartClustering] = useState(true);
  const [visibleBusinesses, setVisibleBusinesses] = useState(0);
  const [gpsValidatedCount, setGpsValidatedCount] = useState(0);
  const [displayMode, setDisplayMode] = useState<MapDisplayMode>('classic');

  // **PHASE 1: FILTRES DYNAMIQUES**
  const [filters, setFilters] = useState<MapFilters>({
    searchQuery: '',
    selectedSector: 'all',
    selectedCity: 'all',
    ilaScoreRange: [0, 100],
    hasGPS: null,
    digitalPresence: null
  });

  const { token, isReady: tokenReady } = useMapbox();

  // **PHASE 1: DONNÉES OPTIMISÉES - Comptage GPS valides**
  useEffect(() => {
    const gpsValid = businesses.filter(b => 
      b.lat && b.lng && 
      b.lat !== 0 && b.lng !== 0 &&
      Math.abs(b.lat) <= 90 && Math.abs(b.lng) <= 180
    ).length;
    
    setGpsValidatedCount(gpsValid);
    console.log(`📍 GPS Status: ${gpsValid}/${businesses.length} entreprises localisées (${Math.round(gpsValid/businesses.length*100)}%)`);
    
    if (gpsValid < businesses.length) {
      toast.info(`${businesses.length - gpsValid} entreprises nécessitent un géocodage`, {
        description: `${gpsValid} entreprises sont correctement géolocalisées`
      });
    }
  }, [businesses]);

  // **PHASE 3: FILTRAGE INTELLIGENT**
  const filteredBusinesses = useMemo(() => {
    let filtered = businesses.filter(b => 
      b.lat && b.lng && b.lat !== 0 && b.lng !== 0
    );

    // Filtre par recherche
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(query) ||
        b.city.toLowerCase().includes(query) ||
        b.sector.toLowerCase().includes(query)
      );
    }

    // Filtre par secteur
    if (filters.selectedSector !== 'all') {
      filtered = filtered.filter(b => 
        b.sector.toLowerCase().includes(filters.selectedSector.toLowerCase())
      );
    }

    // Filtre par ville
    if (filters.selectedCity !== 'all') {
      filtered = filtered.filter(b => 
        b.city.toLowerCase().includes(filters.selectedCity.toLowerCase())
      );
    }

    // Filtre par score ILA
    filtered = filtered.filter(b => 
      b.ilaScore >= filters.ilaScoreRange[0] && 
      b.ilaScore <= filters.ilaScoreRange[1]
    );

    return filtered;
  }, [businesses, filters]);

  // **PHASE 3: CLUSTERS INTELLIGENTS**
  const smartClusters = useMemo(() => {
    if (!useSmartClustering || filteredBusinesses.length < 50) {
      return [];
    }

    const clusters: ClusterData[] = [];
    const processed = new Set<string>();
    
    filteredBusinesses.forEach(business => {
      if (processed.has(business.id)) return;
      
      const nearby = filteredBusinesses.filter(other => {
        if (other.id === business.id || processed.has(other.id)) return false;
        
        const distance = Math.sqrt(
          Math.pow(business.lat - other.lat, 2) + 
          Math.pow(business.lng - other.lng, 2)
        );
        
        return distance < 0.01; // Environ 1km
      });

      if (nearby.length >= 3) {
        const clusterBusinesses = [business, ...nearby];
        clusterBusinesses.forEach(b => processed.add(b.id));
        
        const avgLat = clusterBusinesses.reduce((sum, b) => sum + b.lat, 0) / clusterBusinesses.length;
        const avgLng = clusterBusinesses.reduce((sum, b) => sum + b.lng, 0) / clusterBusinesses.length;
        const avgScore = clusterBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / clusterBusinesses.length;

        clusters.push({
          id: `cluster-${business.id}`,
          coordinates: [avgLng, avgLat],
          count: clusterBusinesses.length,
          avgScore: Math.round(avgScore),
          businesses: clusterBusinesses
        });
      }
    });

    return clusters;
  }, [filteredBusinesses, useSmartClustering]);

  // Entreprises individuelles (non-clusterisées)
  const individualBusinesses = useMemo(() => {
    if (!useSmartClustering) return filteredBusinesses;
    
    const clusteredIds = new Set(
      smartClusters.flatMap(cluster => cluster.businesses.map(b => b.id))
    );
    
    return filteredBusinesses.filter(b => !clusteredIds.has(b.id));
  }, [filteredBusinesses, smartClusters, useSmartClustering]);

  // **PHASE 1: INITIALISATION CARTE OPTIMISÉE**
  useEffect(() => {
    if (!mapContainer.current || map.current || !tokenReady || !token) return;

    try {
      setIsLoading(true);
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-73.5673, 45.5017], // Montréal
        zoom: 11,
        pitch: 0,
        bearing: 0
      });

      // Performance optimizations
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(15, 15, 25)',
          'high-color': 'rgb(25, 25, 40)',
          'horizon-blend': 0.1,
        });
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        setIsMapReady(true);
        setIsLoading(false);
        console.log('🗺️ Carte Iluma™ Premium chargée avec succès');
      });

    } catch (error) {
      console.error('❌ Erreur initialisation carte:', error);
      setIsLoading(false);
      toast.error('Erreur lors du chargement de la carte');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [tokenReady, token]);

  // **PHASE 2: MARQUEURS PREMIUM STABLES**
  const updateMapMarkers = useCallback(() => {
    if (!map.current || !isMapReady) return;

    // Nettoyer les anciens marqueurs
    [...markers.current, ...clusterMarkers.current].forEach(marker => marker.remove());
    markers.current = [];
    clusterMarkers.current = [];

    // **CLUSTERS INTELLIGENTS**
    smartClusters.forEach(cluster => {
      const clusterEl = document.createElement('div');
      clusterEl.className = 'premium-cluster-marker';
      clusterEl.style.cssText = `
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8E44FF, #6B21A8);
        border: 4px solid white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: bold;
        color: white;
        box-shadow: 0 8px 25px rgba(142, 68, 255, 0.5);
        transition: all 0.3s ease;
        position: relative;
        z-index: 10;
      `;
      
      clusterEl.innerHTML = `
        <div style="font-size: 14px; line-height: 1;">${cluster.count}</div>
        <div style="font-size: 10px; opacity: 0.9;">★${cluster.avgScore}</div>
      `;

      // Hover effect sur cluster
      clusterEl.addEventListener('mouseenter', () => {
        clusterEl.style.transform = 'scale(1.1)';
        clusterEl.style.boxShadow = '0 12px 35px rgba(142, 68, 255, 0.7)';
      });

      clusterEl.addEventListener('mouseleave', () => {
        clusterEl.style.transform = 'scale(1)';
        clusterEl.style.boxShadow = '0 8px 25px rgba(142, 68, 255, 0.5)';
      });

      // Clic sur cluster = zoom
      clusterEl.addEventListener('click', () => {
        if (map.current) {
          map.current.flyTo({
            center: cluster.coordinates,
            zoom: 15,
            duration: 1500
          });
        }
      });

      const clusterMarker = new mapboxgl.Marker(clusterEl)
        .setLngLat(cluster.coordinates)
        .addTo(map.current);
      
      clusterMarkers.current.push(clusterMarker);
    });

    // **MARQUEURS INDIVIDUELS NUMÉROTÉS**
    individualBusinesses.forEach((business, index) => {
      const markerNumber = index + 1;
      
      const markerEl = document.createElement('div');
      markerEl.className = 'premium-numbered-marker';
      markerEl.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        border: 3px solid white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        color: white;
        box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        transition: box-shadow 0.3s ease;
        position: relative;
        z-index: 5;
      `;
      markerEl.textContent = markerNumber.toString();

      // **HOVER STABILISÉ - pas de déformation**
      markerEl.addEventListener('mouseenter', () => {
        markerEl.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.7)';
        setHoveredBusiness(business);
      });

      markerEl.addEventListener('mouseleave', () => {
        markerEl.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
        setHoveredBusiness(null);
      });

      // **CLIC SIMPLE - pas de déplacement automatique**
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        onBusinessClick(business);
      });

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([business.lng, business.lat])
        .addTo(map.current);
      
      markers.current.push(marker);
    });

    setVisibleBusinesses(individualBusinesses.length + smartClusters.reduce((sum, c) => sum + c.count, 0));

    // **AUTO-AJUSTEMENT VUE INTELLIGENT**
    if (filteredBusinesses.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredBusinesses.forEach(business => {
        bounds.extend([business.lng, business.lat]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 80,
        maxZoom: 14,
        duration: 1000
      });
    }

  }, [individualBusinesses, smartClusters, isMapReady, onBusinessClick]);

  useEffect(() => {
    updateMapMarkers();
  }, [updateMapMarkers]);

  // Secteurs et villes disponibles
  const availableSectors = useMemo(() => 
    [...new Set(businesses.map(b => b.sector))].sort(), 
    [businesses]
  );

  const availableCities = useMemo(() => 
    [...new Set(businesses.map(b => b.city))].sort(), 
    [businesses]
  );

  return (
    <div className="relative h-full">
      {/* **CHARGEMENT PREMIUM** */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card/90 p-6 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Chargement de la carte Iluma™...</span>
            </div>
          </div>
        </div>
      )}

      {/* **AFFICHAGE CONDITIONNEL SELON MODE** */}
      {displayMode === 'waves' ? (
        <WaveInfluenceMode 
          businesses={filteredBusinesses}
          onBusinessClick={onBusinessClick}
          selectedBusiness={selectedBusiness}
        />
      ) : (
        <div ref={mapContainer} className="w-full h-full" />
      )}

      {/* **PHASE 3: PANNEAU STATS TEMPS RÉEL** */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <Badge className="bg-black/80 text-white backdrop-blur-sm border border-primary/30">
          <MapPin className="w-3 h-3 mr-1" />
          {visibleBusinesses} / {businesses.length} entreprises
        </Badge>
        
        <Badge className="bg-green-500/20 text-green-400 backdrop-blur-sm border border-green-500/30">
          <Target className="w-3 h-3 mr-1" />
          {gpsValidatedCount} GPS validées ({Math.round(gpsValidatedCount/businesses.length*100)}%)
        </Badge>

        {smartClusters.length > 0 && (
          <Badge className="bg-purple-500/20 text-purple-400 backdrop-blur-sm border border-purple-500/30">
            <Building className="w-3 h-3 mr-1" />
            {smartClusters.length} clusters intelligents
          </Badge>
        )}
      </div>

      {/* **SÉLECTEUR MODE D'AFFICHAGE** */}
      <div className="absolute top-4 right-4 z-10 space-x-2 flex">
        <div className="bg-black/80 backdrop-blur-sm border border-primary/30 rounded-lg p-1 flex">
          {[
            { id: 'classic', icon: MapPin, label: 'Classic', desc: 'Vue traditionnelle' },
            { id: 'waves', icon: Waves, label: 'Vagues', desc: 'Mode Influence' },
            { id: 'constellations', icon: Star, label: 'Étoiles', desc: 'Secteurs' },
            { id: 'radar', icon: Target, label: 'Radar', desc: 'Intelligence' }
          ].map(({ id, icon: Icon, label, desc }) => (
            <Button
              key={id}
              variant={displayMode === id ? "default" : "ghost"}
              size="sm"
              onClick={() => setDisplayMode(id as MapDisplayMode)}
              className={`text-xs ${displayMode === id ? 'bg-primary text-white' : 'text-white/70 hover:text-white'}`}
              title={desc}
            >
              <Icon className="w-3 h-3 mr-1" />
              {label}
            </Button>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="bg-black/80 border-primary/30 text-white backdrop-blur-sm"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* **PANNEAU FILTRES DYNAMIQUES** */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-16 right-4 z-20 w-80"
          >
            <Card className="bg-black/90 border-primary/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Filtres Avancés
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recherche */}
                <div>
                  <label className="text-white/60 text-xs">Recherche</label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                    <Input
                      placeholder="Nom, ville, secteur..."
                      value={filters.searchQuery}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                {/* Score ILA */}
                <div>
                  <label className="text-white/60 text-xs">Score ILA™: {filters.ilaScoreRange[0]} - {filters.ilaScoreRange[1]}</label>
                  <div className="mt-2">
                    <Slider
                      value={filters.ilaScoreRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, ilaScoreRange: value as [number, number] }))}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Secteur */}
                <div>
                  <label className="text-white/60 text-xs">Secteur</label>
                  <select
                    value={filters.selectedSector}
                    onChange={(e) => setFilters(prev => ({ ...prev, selectedSector: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm"
                  >
                    <option value="all">Tous les secteurs</option>
                    {availableSectors.map(sector => (
                      <option key={sector} value={sector} className="bg-black">{sector}</option>
                    ))}
                  </select>
                </div>

                {/* Ville */}
                <div>
                  <label className="text-white/60 text-xs">Ville</label>
                  <select
                    value={filters.selectedCity}
                    onChange={(e) => setFilters(prev => ({ ...prev, selectedCity: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm"
                  >
                    <option value="all">Toutes les villes</option>
                    {availableCities.map(city => (
                      <option key={city} value={city} className="bg-black">{city}</option>
                    ))}
                  </select>
                </div>

                {/* Clustering */}
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Clustering intelligent</span>
                  <Button
                    variant={useSmartClustering ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUseSmartClustering(!useSmartClustering)}
                    className="h-8"
                  >
                    {useSmartClustering ? 'ON' : 'OFF'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* **PHASE 2: FICHE ENTREPRISE PREMIUM** */}
      <AnimatePresence>
        {selectedBusiness && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <Card className="bg-black/95 border-primary/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-start justify-between">
                  <div>
                    {selectedBusiness.name}
                    <Badge className="ml-2 bg-red-500/20 text-red-400">
                      Score {selectedBusiness.ilaScore}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onBusinessClick(selectedBusiness)}
                    className="text-white/60 hover:text-white"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <p className="text-white/60 text-sm">{selectedBusiness.sector} • {selectedBusiness.city}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">{selectedBusiness.googleRating}⭐</span>
                  <span className="text-white/60">({selectedBusiness.reviewCount} avis)</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-white">{selectedBusiness.organicTraffic.toLocaleString()} visites/mois</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span className="text-white">{selectedBusiness.indexedKeywords} mots-clés</span>
                </div>

                {selectedBusiness.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-purple-400" />
                    <a href={`tel:${selectedBusiness.phone}`} className="text-white hover:text-primary">
                      {selectedBusiness.phone}
                    </a>
                  </div>
                )}

                {selectedBusiness.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <a 
                      href={selectedBusiness.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary truncate"
                    >
                      {selectedBusiness.website.replace(/https?:\/\//, '')}
                    </a>
                  </div>
                )}

                <Button className="w-full mt-4" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Analyser avec LILO™
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* **TOOLTIP HOVER AMÉLIORÉ** */}
      <AnimatePresence>
        {hoveredBusiness && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: '50%',
              top: '20%',
              transform: 'translateX(-50%)'
            }}
          >
            <Card className="bg-black/90 border-primary/30 backdrop-blur-xl max-w-xs">
              <CardContent className="p-3">
                <h4 className="text-white font-semibold text-sm">{hoveredBusiness.name}</h4>
                <p className="text-white/60 text-xs">{hoveredBusiness.sector}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge className="bg-red-500/20 text-red-400 text-xs">
                    ILA™ {hoveredBusiness.ilaScore}
                  </Badge>
                  <span className="text-yellow-400 text-xs">
                    {hoveredBusiness.googleRating}⭐
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OptimizedMapView;