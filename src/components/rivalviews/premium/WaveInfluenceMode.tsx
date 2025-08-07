import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Zap, 
  TrendingUp, 
  Star, 
  MapPin, 
  Target, 
  Waves,
  Eye,
  BarChart3,
  Filter,
  Settings
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import { useMapbox } from '../MapboxProvider';
import { toast } from 'sonner';

interface WaveInfluenceModeProps {
  businesses: RivalBusiness[];
  onBusinessClick: (business: RivalBusiness) => void;
  selectedBusiness: RivalBusiness | null;
}

interface InfluenceWave {
  id: string;
  center: [number, number];
  radius: number;
  influence: number;
  color: string;
  business: RivalBusiness;
  pulse: boolean;
}

interface WaveFilters {
  influenceMin: number;
  influenceMax: number;
  showPredictive: boolean;
  waveIntensity: number;
}

const WaveInfluenceMode: React.FC<WaveInfluenceModeProps> = ({
  businesses,
  onBusinessClick,
  selectedBusiness
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const waveLayersRef = useRef<string[]>([]);
  
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredBusiness, setHoveredBusiness] = useState<RivalBusiness | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  
  const [filters, setFilters] = useState<WaveFilters>({
    influenceMin: 0,
    influenceMax: 100,
    showPredictive: true,
    waveIntensity: 0.5
  });

  const { token, isReady: tokenReady } = useMapbox();

  // **CALCUL D'INFLUENCE BASÉ SUR SCORE ILA™**
  const calculateInfluence = useCallback((business: RivalBusiness): number => {
    const baseInfluence = business.ilaScore;
    const trafficBonus = Math.min(business.organicTraffic / 1000, 20);
    const reviewBonus = Math.min(business.reviewCount / 100, 15);
    const backlinksBonus = Math.min(business.backlinks / 100, 10);
    const keywordsBonus = Math.min(business.indexedKeywords / 50, 10);
    
    return Math.min(100, baseInfluence + trafficBonus + reviewBonus + backlinksBonus + keywordsBonus);
  }, []);

  // **GÉNÉRATION DES VAGUES D'INFLUENCE**
  const influenceWaves = useMemo((): InfluenceWave[] => {
    return businesses
      .filter(business => {
        const influence = calculateInfluence(business);
        return influence >= filters.influenceMin && influence <= filters.influenceMax;
      })
      .map(business => {
        const influence = calculateInfluence(business);
        const radius = (influence / 100) * 0.02 * filters.waveIntensity; // Rayon adaptatif
        
        // Couleur basée sur l'influence
        let color: string;
        if (influence >= 80) color = '#22c55e'; // Vert - Influence forte
        else if (influence >= 60) color = '#f59e0b'; // Orange - Influence moyenne
        else if (influence >= 40) color = '#ef4444'; // Rouge - Influence faible
        else color = '#8b5cf6'; // Violet - Influence très faible

        return {
          id: business.id,
          center: [business.lng, business.lat],
          radius,
          influence,
          color,
          business,
          pulse: influence >= 70 // Pulse pour les influences élevées
        };
      });
  }, [businesses, calculateInfluence, filters]);

  // **INITIALISATION CARTE AVEC STYLE GALACTIQUE**
  useEffect(() => {
    if (!mapContainer.current || map.current || !tokenReady || !token) return;

    try {
      setIsLoading(true);
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-73.5673, 45.5017],
        zoom: 11,
        pitch: 0,
        bearing: 0
      });

      // Style galactique Iluma™
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(10, 10, 20)',
          'high-color': 'rgb(20, 20, 40)',
          'horizon-blend': 0.15,
        });
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        setIsMapReady(true);
        setIsLoading(false);
        console.log('🌊 Mode Vagues d\'Influence activé');
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

  // **ANIMATION DES VAGUES**
  useEffect(() => {
    if (!isMapReady) return;

    const animate = () => {
      setAnimationFrame(prev => prev + 1);
      setTimeout(animate, 2000); // Animation toutes les 2 secondes
    };

    animate();
  }, [isMapReady]);

  // **CRÉATION DES COUCHES DE VAGUES**
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Nettoyer les anciennes couches (d'abord les layers, puis les sources)
    waveLayersRef.current.forEach(layerId => {
      // Supprimer d'abord toutes les couches liées à cette source
      const baseId = layerId.replace('-source-', '-layer-').replace('-source-', '-point-');
      const pointLayerId = layerId.replace('-source-', '-point-');
      const waveLayerId = layerId.replace('-source-', '-layer-');
      
      if (map.current?.getLayer(pointLayerId)) {
        map.current.removeLayer(pointLayerId);
      }
      if (map.current?.getLayer(waveLayerId)) {
        map.current.removeLayer(waveLayerId);
      }
      // Maintenant supprimer la source
      if (map.current?.getSource(layerId)) {
        map.current.removeSource(layerId);
      }
    });
    waveLayersRef.current = [];

    // Créer les nouvelles vagues
    influenceWaves.forEach((wave, index) => {
      const sourceId = `wave-source-${wave.id}`;
      const layerId = `wave-layer-${wave.id}`;
      const pointLayerId = `point-layer-${wave.id}`;
      
      waveLayersRef.current.push(sourceId, layerId, pointLayerId);

      // Source pour la vague
      map.current?.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: wave.center
          },
          properties: {
            influence: wave.influence,
            name: wave.business.name,
            radius: wave.radius
          }
        }
      });

      // Couche de vague (cercle avec ondulation)
      map.current?.addLayer({
        id: layerId,
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, wave.radius * 1000 * (wave.pulse ? 1 + Math.sin(animationFrame * 0.1) * 0.3 : 1),
            15, wave.radius * 5000 * (wave.pulse ? 1 + Math.sin(animationFrame * 0.1) * 0.3 : 1)
          ],
          'circle-color': wave.color,
          'circle-opacity': wave.pulse ? 0.6 + Math.sin(animationFrame * 0.1) * 0.2 : 0.4,
          'circle-stroke-width': 2,
          'circle-stroke-color': wave.color,
          'circle-stroke-opacity': 0.8
        }
      });

      // Point central pour interaction
      map.current?.addLayer({
        id: pointLayerId,
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-radius': 8,
          'circle-color': wave.color,
          'circle-opacity': 1,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.8
        }
      });

      // Événements d'interaction
      map.current?.on('mouseenter', pointLayerId, () => {
        setHoveredBusiness(wave.business);
        map.current!.getCanvas().style.cursor = 'pointer';
      });

      map.current?.on('mouseleave', pointLayerId, () => {
        setHoveredBusiness(null);
        map.current!.getCanvas().style.cursor = '';
      });

      map.current?.on('click', pointLayerId, () => {
        onBusinessClick(wave.business);
      });
    });

    // Ajuster la vue pour inclure toutes les vagues
    if (influenceWaves.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      influenceWaves.forEach(wave => {
        bounds.extend(wave.center);
      });
      
      map.current.fitBounds(bounds, {
        padding: 100,
        maxZoom: 14,
        duration: 1000
      });
    }

  }, [influenceWaves, isMapReady, animationFrame, onBusinessClick]);

  return (
    <div className="relative h-full">
      {/* **CHARGEMENT** */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card/90 p-6 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3">
              <Waves className="w-6 h-6 text-primary animate-pulse" />
              <span>Calcul des vagues d'influence...</span>
            </div>
          </div>
        </div>
      )}

      {/* **CARTE PRINCIPALE** */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* **STATISTIQUES TEMPS RÉEL** */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <Badge className="bg-black/80 text-white backdrop-blur-sm border border-primary/30">
          <Waves className="w-3 h-3 mr-1" />
          {influenceWaves.length} vagues d'influence
        </Badge>
        
        <Badge className="bg-green-500/20 text-green-400 backdrop-blur-sm border border-green-500/30">
          <TrendingUp className="w-3 h-3 mr-1" />
          Moy. {Math.round(influenceWaves.reduce((sum, w) => sum + w.influence, 0) / influenceWaves.length || 0)}%
        </Badge>

        <Badge className="bg-purple-500/20 text-purple-400 backdrop-blur-sm border border-purple-500/30">
          <Target className="w-3 h-3 mr-1" />
          {influenceWaves.filter(w => w.pulse).length} hautes influences
        </Badge>
      </div>

      {/* **CONTRÔLES VAGUES** */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowControls(!showControls)}
          className="bg-black/80 border-primary/30 text-white backdrop-blur-sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Contrôles
        </Button>
      </div>

      {/* **PANNEAU CONTRÔLES VAGUES** */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-16 right-4 z-20 w-80"
          >
            <Card className="bg-black/90 border-primary/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Waves className="w-4 h-4" />
                  Contrôles Vagues d'Influence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filtre influence */}
                <div>
                  <label className="text-white/60 text-xs">
                    Influence: {filters.influenceMin}% - {filters.influenceMax}%
                  </label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={[filters.influenceMin, filters.influenceMax]}
                      onValueChange={(value) => setFilters(prev => ({ 
                        ...prev, 
                        influenceMin: value[0],
                        influenceMax: value[1]
                      }))}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Intensité des vagues */}
                <div>
                  <label className="text-white/60 text-xs">
                    Intensité des vagues: {Math.round(filters.waveIntensity * 100)}%
                  </label>
                  <div className="mt-2">
                    <Slider
                      value={[filters.waveIntensity]}
                      onValueChange={(value) => setFilters(prev => ({ 
                        ...prev, 
                        waveIntensity: value[0]
                      }))}
                      max={1}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Mode prédictif */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="predictive"
                    checked={filters.showPredictive}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      showPredictive: e.target.checked 
                    }))}
                    className="rounded"
                  />
                  <label htmlFor="predictive" className="text-white/80 text-sm">
                    IA Prédictive
                  </label>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* **LÉGENDE INTERACTIVE** */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="bg-black/80 border-primary/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Légende Influence
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-white/80">80-100% - Influence Dominante</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-white/80">60-79% - Influence Forte</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-white/80">40-59% - Influence Modérée</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-white/80">0-39% - Influence Émergente</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* **BUSINESS HOVER CARD** */}
      <AnimatePresence>
        {hoveredBusiness && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
          >
            <Card className="bg-black/90 border-primary/30 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-4 text-center">
                <h3 className="text-white font-medium text-lg">{hoveredBusiness.name}</h3>
                <p className="text-white/60 text-sm mb-3">{hoveredBusiness.sector} • {hoveredBusiness.city}</p>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/60">Influence</span>
                    <p className="text-primary font-bold text-lg">
                      {Math.round(calculateInfluence(hoveredBusiness))}%
                    </p>
                  </div>
                  <div>
                    <span className="text-white/60">Score ILA™</span>
                    <p className="text-white font-bold">{hoveredBusiness.ilaScore}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Trafic</span>
                    <p className="text-white">{hoveredBusiness.organicTraffic}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Avis</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white">{hoveredBusiness.googleRating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WaveInfluenceMode;