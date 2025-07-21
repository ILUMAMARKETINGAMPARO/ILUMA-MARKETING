import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RivalBusiness } from '@/types/rivalviews';
import { MapPin, Layers, RotateCw, Maximize2, Filter } from 'lucide-react';
import { useMapbox } from './MapboxProvider';
import BusinessHoverTooltip from './BusinessHoverTooltip';

interface IdealMapViewProps {
  businesses: RivalBusiness[];
  onBusinessClick: (business: RivalBusiness) => void;
  selectedBusiness: RivalBusiness | null;
}

const IdealMapView: React.FC<IdealMapViewProps> = ({
  businesses,
  onBusinessClick,
  selectedBusiness
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [viewMode, setViewMode] = useState<'streets' | 'satellite'>('streets');
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  // État pour l'infobulle hover
  const [hoveredBusiness, setHoveredBusiness] = useState<RivalBusiness | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Utiliser le token du provider
  const { token, isReady: tokenReady } = useMapbox();

  // Initialiser la carte
  useEffect(() => {
    if (!mapContainer.current || map.current || !tokenReady || !token) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-73.5673, 45.5017], // Montréal
        zoom: 11,
        pitch: 0,
        bearing: 0
      });
    } catch (error) {
      console.error('Erreur initialisation carte idéale:', error);
      return;
    }

    // Navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

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

  // Changer le style de carte
  const changeMapStyle = (style: 'streets' | 'satellite') => {
    if (!map.current) return;
    
    const styleUrl = style === 'satellite' 
      ? 'mapbox://styles/mapbox/satellite-streets-v12'
      : 'mapbox://styles/mapbox/dark-v11';
    
    map.current.setStyle(styleUrl);
    setViewMode(style);
  };

  // Ajouter les marqueurs numérotés
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Supprimer les anciens marqueurs
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Ajouter les nouveaux marqueurs
    businesses.forEach((business, index) => {
      const markerNumber = index + 53; // Commencer à 53 comme dans l'image

      // Créer l'élément du marqueur
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-numbered-marker';
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
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        transition: all 0.3s ease;
        position: relative;
        z-index: 1;
      `;

      markerEl.textContent = markerNumber.toString();

      // Effets hover avec infobulle - SANS animations pour éviter les déplacements
      markerEl.addEventListener('mouseenter', (e) => {
        // Afficher l'infobulle UNIQUEMENT
        setHoveredBusiness(business);
        setTooltipPosition({ x: e.clientX, y: e.clientY });
      });

      markerEl.addEventListener('mouseleave', () => {
        // Masquer l'infobulle UNIQUEMENT
        setHoveredBusiness(null);
      });

      markerEl.addEventListener('mousemove', (e) => {
        if (hoveredBusiness?.id === business.id) {
          setTooltipPosition({ x: e.clientX, y: e.clientY });
        }
      });

      // Créer le marqueur STATIQUE - pas de popup, pas d'animation au clic
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([business.lng, business.lat])
        .addTo(map.current!);

      markers.current.push(marker);

      // Clic SIMPLE - juste appeler la fonction sans déplacer la carte
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêcher le bubbling
        onBusinessClick(business);
      });
    });

    // Ajuster la vue
    if (businesses.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      businesses.forEach(business => {
        bounds.extend([business.lng, business.lat]);
      });
      map.current.fitBounds(bounds, {
        padding: 80,
        maxZoom: 13
      });
    }

    // Fonction globale pour les boutons
    (window as any).handleBusinessAnalyze = (businessId: string) => {
      const business = businesses.find(b => b.id === businessId);
      if (business) onBusinessClick(business);
    };

  }, [businesses, isMapReady, onBusinessClick]);

  // Plus de flyTo automatique au clic pour éviter le déplacement des pins

  return (
    <div className="space-y-4">

      {/* Carte principale */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <Card className="bg-black/20 border-[#8E44FF]/30 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-0">
            <div 
              ref={mapContainer}
              className="w-full h-[80vh] relative"
            />
            
            {/* Stats overlay */}
            <div className="absolute top-4 left-4 z-10 space-y-2">
              <Badge className="bg-black/50 text-white backdrop-blur-sm border border-white/20">
                <MapPin className="w-3 h-3 mr-1" />
                {businesses.length} entreprises mappées
              </Badge>
              <Badge className="bg-red-500/20 text-red-400 backdrop-blur-sm border border-red-500/30">
                🎯 Mode Vue Idéale
              </Badge>
            </div>

            {/* Légende */}
            <div className="absolute bottom-4 left-4 z-10">
              <Card className="bg-black/80 border-white/20 backdrop-blur-sm">
                <CardContent className="p-3">
                  <h4 className="text-white font-semibold mb-2 text-sm">Légende</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      53
                    </div>
                    <span className="text-white/80 text-xs">Entreprises numérotées</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-green-500/20 text-green-400 backdrop-blur-sm border border-green-500/30">
                🌍 Mapbox Connecté
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Entreprise sélectionnée */}
      {selectedBusiness && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <Card className="bg-black/90 border-[#8E44FF]/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                {selectedBusiness.name}
              </CardTitle>
              <p className="text-white/60 text-sm">{selectedBusiness.address}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Score ILA™:</span>
                  <Badge className="bg-red-500/20 text-red-400">
                    {selectedBusiness.ilaScore}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Secteur:</span>
                  <span className="text-white">{selectedBusiness.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Trafic:</span>
                  <span className="text-white">{selectedBusiness.organicTraffic.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Infobulle hover */}
      <BusinessHoverTooltip
        business={hoveredBusiness}
        isVisible={!!hoveredBusiness}
        position={tooltipPosition}
      />
    </div>
  );
};

export default IdealMapView;