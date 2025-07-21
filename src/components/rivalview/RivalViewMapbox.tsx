import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RivalBusiness } from '@/types/rivalviews';
import { MapPin, Search, Filter, Layers, Plus, Brain } from 'lucide-react';
import { useMapbox } from '../rivalviews/MapboxProvider';
import EnhancedMapControls from './EnhancedMapControls';
import CRMSyncManager from './CRMSyncManager';

// Configuration des icônes sectorielles
const SECTOR_ICONS = {
  'Meubles': '🪑',
  'Matelas': '🛏️', 
  'Restaurant': '🍽️',
  'Concessionnaires': '🚗',
  'Courtiers': '🏡',
  'Avocats': '⚖️',
  'Mécaniciens': '🔧',
  'Fleuristes': '💐',
  'Commerce': '🏪',
  'Services': '🔧',
  'Santé': '🏥',
  'Immobilier': '🏠',
  'Beauté': '💄'
};

// Token géré par le provider Mapbox

interface RivalViewMapboxProps {
  businesses: RivalBusiness[];
  onBusinessClick: (business: RivalBusiness) => void;
  selectedBusiness: RivalBusiness | null;
  onCompareClick: (business: RivalBusiness) => void;
  enableRealTimeFilters?: boolean;
  enableClusteringAI?: boolean;
  enableSatelliteView?: boolean;
  syncWithCRM?: boolean;
}

const RivalViewMapbox: React.FC<RivalViewMapboxProps> = ({
  businesses,
  onBusinessClick,
  selectedBusiness,
  onCompareClick,
  enableRealTimeFilters = true,
  enableClusteringAI = true,
  enableSatelliteView = true,
  syncWithCRM = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [mapStyle, setMapStyle] = useState<'light' | 'dark' | 'satellite'>('dark');
  const [showClusters, setShowClusters] = useState(enableClusteringAI);
  const [realTimeData, setRealTimeData] = useState<RivalBusiness[]>(businesses);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [showCRMSync, setShowCRMSync] = useState(syncWithCRM);
  const [realTimeFiltersActive, setRealTimeFiltersActive] = useState(enableRealTimeFilters);

  // Utiliser le token du provider
  const { token, isReady: tokenReady } = useMapbox();

  // Villes disponibles
  const cities = ['Montréal', 'Laval', 'Québec', 'Gatineau', 'Longueuil', 'Trois-Rivières'];
  const sectors = Object.keys(SECTOR_ICONS);

  // Filtrer les entreprises
  const filteredBusinesses = businesses.filter(business => {
    if (selectedCity && selectedCity !== 'all' && business.city !== selectedCity) return false;
    if (selectedSector && selectedSector !== 'all' && business.sector !== selectedSector) return false;
    if (searchQuery && !business.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Obtenir la couleur selon le score ILA™
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // emerald-500
    if (score >= 60) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  // Initialiser la carte Mapbox
  useEffect(() => {
    if (!mapContainer.current || map.current || !tokenReady || !token) return;

    try {
      // S'assurer que le token est défini
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: [-73.5673, 45.5017], // Montréal
        zoom: 10,
        projection: 'mercator'
      });
    } catch (error) {
      console.error('Erreur initialisation Mapbox:', error);
      setIsMapReady(false);
      return;
    }

    // Ajout des contrôles de navigation
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: false,
      }),
      'top-right'
    );

    // Ajout du geocoder pour la recherche (optionnel)
    // const geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl,
    //   countries: 'ca',
    //   language: 'fr',
    //   placeholder: 'Rechercher une adresse...'
    // });
    // map.current.addControl(geocoder, 'top-left');

    map.current.on('load', () => {
      setIsMapReady(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [tokenReady, token]);

  // Ajouter les marqueurs des entreprises
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Supprimer les marqueurs existants
    const existingMarkers = document.querySelectorAll('.custom-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Ajouter les nouveaux marqueurs
    filteredBusinesses.forEach((business) => {
      // Créer l'élément du marqueur
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-marker';
      markerEl.style.cssText = `
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${getScoreColor(business.ilaScore)};
        border: 2px solid white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
      `;

      // Ajouter l'icône sectorielle
      const sectorIcon = SECTOR_ICONS[business.sector as keyof typeof SECTOR_ICONS] || '🏪';
      markerEl.innerHTML = sectorIcon;

      // Effets hover
      markerEl.addEventListener('mouseenter', () => {
        markerEl.style.transform = 'scale(1.2)';
        markerEl.style.zIndex = '1000';
      });

      markerEl.addEventListener('mouseleave', () => {
        markerEl.style.transform = 'scale(1)';
        markerEl.style.zIndex = '1';
      });

      // Créer le popup d'information
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'custom-popup'
      }).setHTML(`
        <div class="p-4 bg-black/90 rounded-lg backdrop-blur-sm border border-white/20">
          <h3 class="font-bold text-white mb-2">${business.name}</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-300">Score ILA™:</span>
              <span class="text-${getScoreColor(business.ilaScore) === '#10b981' ? 'green' : getScoreColor(business.ilaScore) === '#eab308' ? 'yellow' : 'red'}-400 font-bold">${business.ilaScore}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-300">Trafic mensuel:</span>
              <span class="text-white">${business.organicTraffic.toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-300">Mots-clés:</span>
              <span class="text-white">${business.indexedKeywords}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-300">Avis Google:</span>
              <span class="text-white">${business.reviewCount} (${business.googleRating}⭐)</span>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-white/20 flex gap-2">
            <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors" onclick="window.handleBusinessClick('${business.id}')">
              Analyser
            </button>
            <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs transition-colors" onclick="window.handleCompareClick('${business.id}')">
              Comparer 1-à-1
            </button>
          </div>
        </div>
      `);

      // Créer le marqueur
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([business.lng, business.lat])
        .setPopup(popup)
        .addTo(map.current!);

      // Clic sur le marqueur
      markerEl.addEventListener('click', () => {
        onBusinessClick(business);
      });
    });

    // Ajuster la vue pour inclure tous les marqueurs
    if (filteredBusinesses.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredBusinesses.forEach(business => {
        bounds.extend([business.lng, business.lat]);
      });
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 14
      });
    }

    // Fonctions globales pour les boutons du popup
    (window as any).handleBusinessClick = (businessId: string) => {
      const business = businesses.find(b => b.id === businessId);
      if (business) onBusinessClick(business);
    };

    (window as any).handleCompareClick = (businessId: string) => {
      const business = businesses.find(b => b.id === businessId);
      if (business) onCompareClick(business);
    };

  }, [filteredBusinesses, isMapReady, businesses, onBusinessClick, onCompareClick]);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Montserrat']">
            Carte Interactive <span className="text-gradient">RivalView™</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
            Explorez et comparez {filteredBusinesses.length} entreprises avec la technologie Mapbox
          </p>
        </motion.div>

        {/* Contrôles et Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtres et Recherche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="bg-black/20 border-white/20 text-white">
                    <SelectValue placeholder="Sélectionner une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="bg-black/20 border-white/20 text-white">
                    <SelectValue placeholder="Secteur d'activité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les secteurs</SelectItem>
                    {sectors.map(sector => (
                      <SelectItem key={sector} value={sector}>
                        {SECTOR_ICONS[sector as keyof typeof SECTOR_ICONS]} {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Rechercher une entreprise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/20 border-white/20 text-white placeholder:text-white/60"
                />

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Avancé
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Légende des Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <Card className="glass-effect border-white/20 p-4">
            <CardContent className="p-0">
              <h3 className="text-lg font-bold text-white mb-3 font-['Montserrat'] text-center">
                Légende Score ILA™
              </h3>
              <div className="flex flex-wrap gap-6 justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg" />
                  <span className="text-white/80 font-['Montserrat']">Excellent (80-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg" />
                  <span className="text-white/80 font-['Montserrat']">Bon (60-79)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
                  <span className="text-white/80 font-['Montserrat']">À améliorer (0-59)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Carte Mapbox */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="glass-effect border-white/20 overflow-hidden">
            <CardContent className="p-0">
              <div 
                ref={mapContainer}
                className="w-full h-[90vh] relative"
              />
              
              {/* Contrôles avancés */}
              <EnhancedMapControls
                mapStyle={mapStyle}
                onMapStyleChange={setMapStyle}
                showClusters={showClusters}
                onClusterToggle={setShowClusters}
                realTimeFilters={realTimeFiltersActive}
                onRealTimeToggle={setRealTimeFiltersActive}
                syncWithCRM={showCRMSync}
                onCRMSyncToggle={setShowCRMSync}
                onRefreshData={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 1000);
                }}
                isLoading={isLoading}
              />

              {/* Sync CRM Manager */}
              <CRMSyncManager
                businesses={filteredBusinesses}
                onSyncComplete={(count) => {
                  console.log(`${count} entreprises synchronisées`);
                }}
                isVisible={showCRMSync}
              />
              
              {/* Overlays d'information */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-black/50 text-white backdrop-blur-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {filteredBusinesses.length} entreprises
                </Badge>
              </div>

              {/* Indicateur de statut connecté */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-green-500/20 text-green-400 backdrop-blur-sm border border-green-500/30">
                  🌍 Mapbox Connecté
                </Badge>
              </div>

              {/* Ancien code de fallback (désactivé) */}
              {false && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                  <Card className="glass-effect border-orange-500/50 p-6 m-4">
                    <CardContent className="p-0 text-center">
                      <h3 className="text-xl font-bold text-orange-500 mb-3">
                        Configuration Mapbox requise
                      </h3>
                      <p className="text-white/80 mb-4">
                        Pour utiliser RivalView™, ajoutez votre token Mapbox dans le composant.
                      </p>
                      <p className="text-sm text-white/60">
                        Obtenez votre token gratuit sur mapbox.com
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions & Smart Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center gap-4 mt-8"
        >
          <Button
            size="lg"
            onClick={() => {
              // Déclencher le Smart Analytics Engine depuis le parent
              const event = new CustomEvent('openSmartAnalytics', { detail: filteredBusinesses });
              window.dispatchEvent(event);
            }}
            className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-white font-['Montserrat'] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 animate-pulse" />
            <Brain className="w-5 h-5 mr-2 z-10 relative" />
            <span className="z-10 relative">🧠 Smart Analytics IA</span>
          </Button>

          {selectedBusiness && (
            <Button
              size="lg"
              onClick={() => onCompareClick(selectedBusiness)}
              className="bg-gradient-to-r from-primary to-accent text-white font-['Montserrat']"
            >
              Comparer avec {selectedBusiness.name}
            </Button>
          )}
        </motion.div>
      </div>

      {/* Styles CSS pour les popups */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-popup .mapboxgl-popup-content {
            background: transparent !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          .custom-popup .mapboxgl-popup-tip {
            border-top-color: rgba(0, 0, 0, 0.9) !important;
          }
        `
      }} />
    </section>
  );
};

export default RivalViewMapbox;