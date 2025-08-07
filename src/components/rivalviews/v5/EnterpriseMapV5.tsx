import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { UnifiedBusinessData } from './types';
import { getScoreColor } from './utils/scoring';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Building, Eye, AlertTriangle, Users, TrendingUp, Navigation } from 'lucide-react';
interface EnterpriseMapV5Props {
  businesses: UnifiedBusinessData[];
  selectedBusiness: UnifiedBusinessData | null;
  onBusinessSelect: (business: UnifiedBusinessData | null) => void;
  mapToken: string;
}
export const EnterpriseMapV5: React.FC<EnterpriseMapV5Props> = ({
  businesses,
  selectedBusiness,
  onBusinessSelect,
  mapToken
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [hoveredBusiness, setHoveredBusiness] = useState<UnifiedBusinessData | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Entreprises sans GPS - LOGIQUE CORRIGÉE
  const businessesWithoutGPS = businesses.filter(b => !b.lat || !b.lng || b.lat === 0 || b.lng === 0 || isNaN(b.lat) || isNaN(b.lng));
  const businessesWithGPS = businesses.filter(b => b.lat && b.lng && b.lat !== 0 && b.lng !== 0 && !isNaN(b.lat) && !isNaN(b.lng));
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Utiliser le token fourni par l'utilisateur
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvLWRhdmlkIiwiYSI6ImNtY3dvMWVyaDAwYzQya3B6enJ5dXkycGcifQ.IseIJ0ySJRvHbKYWKo7C8A';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-73.5673, 45.5017], // Montréal
      zoom: 10,
      pitch: 0,
      bearing: 0,
      antialias: true
    });

    // Style personnalisé Iluma pour la carte
    map.current.on('load', () => {
      setMapLoaded(true);

      // Ajouter des clusters pour les entreprises
      map.current!.addSource('businesses', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });

      // Style pour les clusters
      map.current!.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'businesses',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': ['step', ['get', 'point_count'], '#F59E0B', 100, '#EF4444', 750, '#DC2626'],
          'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.8
        }
      });

      // Nombres dans les clusters
      map.current!.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'businesses',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
        paint: {
          'text-color': '#ffffff'
        }
      });

    // Points individuels - style avec couleurs selon score ILA™ et émojis
    map.current!.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'businesses',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': [
          'case',
          ['>=', ['get', 'ilaScore'], 80], '#10B981', // Vert pour excellent (80+)
          ['>=', ['get', 'ilaScore'], 60], '#F59E0B', // Orange pour bon (60-79)
          '#EF4444' // Rouge pour moyen/faible (<60)
        ],
        'circle-radius': 20,
        'circle-stroke-width': 3,
        'circle-stroke-color': [
          'case',
          ['>=', ['get', 'ilaScore'], 80], '#065F46', // Bordure verte foncée
          ['>=', ['get', 'ilaScore'], 60], '#92400E', // Bordure orange foncée  
          '#991B1B' // Bordure rouge foncée
        ],
        'circle-opacity': 0.9,
        'circle-stroke-opacity': 1
      }
    });

    // Émojis dans les pins selon le secteur
    map.current!.addLayer({
      id: 'business-icons',
      type: 'symbol',
      source: 'businesses',
      filter: ['!', ['has', 'point_count']],
      layout: {
        'text-field': [
          'case',
          ['in', 'esthétique', ['downcase', ['get', 'sector']]], '💅',
          ['in', 'lunetterie', ['downcase', ['get', 'sector']]], '👓',
          ['in', 'automobile', ['downcase', ['get', 'sector']]], '🚗',
          ['in', 'conduite', ['downcase', ['get', 'sector']]], '🚙',
          ['in', 'meubles', ['downcase', ['get', 'sector']]], '🛋️',
          ['in', 'avocats', ['downcase', ['get', 'sector']]], '⚖️',
          ['in', 'comptable', ['downcase', ['get', 'sector']]], '📊',
          '🏢' // Icône par défaut
        ],
        'text-size': 16,
        'text-offset': [0, 0],
        'text-anchor': 'center'
      },
      paint: {
        'text-opacity': 1,
        'text-color': '#ffffff'
      }
    });

      // Interaction avec les clusters
      map.current!.on('click', 'clusters', e => {
        const features = map.current!.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        const clusterId = features[0].properties?.cluster_id;
        const source = map.current!.getSource('businesses') as mapboxgl.GeoJSONSource;
        if (source && clusterId) {
          source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
            if (err) return;
            map.current!.easeTo({
              center: (features[0].geometry as any).coordinates,
              zoom: zoom,
              duration: 500
            });
          });
        }
      });

      // Interaction avec les points individuels - AMÉLIORÉE
      map.current!.on('click', 'unclustered-point', e => {
        const business = businessesWithGPS.find(b => b.id === e.features[0].properties.id);
        if (business) {
          onBusinessSelect(business);
          // Animation de zoom sur l'entreprise sélectionnée
          map.current!.flyTo({
            center: [business.lng, business.lat],
            zoom: 16,
            duration: 1500,
            essential: true
          });
        }
      });

      // Hover effects améliorés
      map.current!.on('mouseenter', 'unclustered-point', e => {
        map.current!.getCanvas().style.cursor = 'pointer';
        const business = businessesWithGPS.find(b => b.id === e.features[0].properties.id);
        setHoveredBusiness(business || null);

        // Effet de glow sur hover
        map.current!.setPaintProperty('unclustered-point', 'circle-stroke-width', ['case', ['==', ['get', 'id'], e.features[0].properties.id], 6,
        // Plus épais sur hover
        3]);
      });
      map.current!.on('mouseleave', 'unclustered-point', () => {
        map.current!.getCanvas().style.cursor = '';
        setHoveredBusiness(null);
        // Reset stroke width
        map.current!.setPaintProperty('unclustered-point', 'circle-stroke-width', 3);
      });

      // Hover sur les icônes également
      map.current!.on('mouseenter', 'business-icons', e => {
        map.current!.getCanvas().style.cursor = 'pointer';
        const business = businessesWithGPS.find(b => b.id === e.features[0].properties.id);
        setHoveredBusiness(business || null);
      });
      map.current!.on('mouseleave', 'business-icons', () => {
        map.current!.getCanvas().style.cursor = '';
        setHoveredBusiness(null);
      });
    });

    // Navigation controls avec style Iluma
    map.current.addControl(new mapboxgl.NavigationControl({
      visualizePitch: true
    }), 'top-right');

    // Cleanup
    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [mapToken]);

  // Mise à jour des données GeoJSON avec numérotation
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    const geojsonData: any = {
      type: 'FeatureCollection' as const,
      features: businessesWithGPS.map((business, index) => ({
        type: 'Feature' as const,
        properties: {
          id: business.id,
          name: business.name,
          ilaScore: business.ilaScore,
          sector: business.sector,
          googleReviews: business.googleReviews,
          organicTraffic: business.organicTraffic,
          city: business.city,
          address: business.address,
          website: business.website,
          businessNumber: index + 1 // Numéro séquentiel pour les pins
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [business.lng, business.lat]
        }
      }))
    };
    const source = map.current.getSource('businesses') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData(geojsonData);
    }

    // Ajuster la vue pour inclure tous les points
    if (businessesWithGPS.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      businessesWithGPS.forEach(business => {
        bounds.extend([business.lng, business.lat]);
      });
      map.current.fitBounds(bounds, {
        padding: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 350
        },
        // Plus d'espace à droite pour la sidebar
        duration: 1000
      });
    }
  }, [businessesWithGPS, mapLoaded]);

  // Centrer sur l'entreprise sélectionnée
  useEffect(() => {
    if (selectedBusiness && map.current && selectedBusiness.lat && selectedBusiness.lng) {
      map.current.flyTo({
        center: [selectedBusiness.lng, selectedBusiness.lat],
        zoom: 15,
        duration: 1000,
        essential: true
      });
    }
  }, [selectedBusiness]);
  return <div className="relative h-full w-full">
      {/* Carte principale */}
      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.3
    }} className="relative h-full w-full rounded-lg overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      border: '1px solid rgba(245, 158, 11, 0.2)'
    }}>
        <div ref={mapContainer} className="absolute inset-0" style={{
        filter: 'brightness(0.9) contrast(1.1) saturate(1.2)'
      }} />
        
        {/* Overlay avec effet galactique */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-background/5" />
          {/* Étoiles scintillantes subtiles */}
          {[...Array(15)].map((_, i) => <motion.div key={i} className="absolute w-0.5 h-0.5 bg-yellow-400 rounded-full" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }} animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [0.5, 1, 0.5]
        }} transition={{
          duration: 3 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 3
        }} />)}
        </div>

        {/* Hover card pour les entreprises */}
        <AnimatePresence>
          {hoveredBusiness && <motion.div initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: 10
        }} className="absolute top-4 left-4 z-10 pointer-events-none">
              <Card className="bg-background/95 backdrop-blur-sm border-yellow-400/30 shadow-xl">
                <CardContent className="p-4 min-w-[280px]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{hoveredBusiness.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      Score: {hoveredBusiness.ilaScore}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>{hoveredBusiness.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-3 h-3" />
                      <span>{hoveredBusiness.sector}</span>
                    </div>
                    {hoveredBusiness.googleStars > 0 && <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{hoveredBusiness.googleStars} ({hoveredBusiness.googleReviews} avis)</span>
                      </div>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>}
        </AnimatePresence>

        {/* Légende améliorée */}
        

        {/* Stats en haut à droite */}
        
      </motion.div>

      {/* Sidebar pour entreprises sans GPS */}
      <AnimatePresence>
        {businessesWithoutGPS.length > 0 && <motion.div initial={{
        opacity: 0,
        x: 100
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: 100
      }} transition={{
        duration: 0.3
      }} className="absolute top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-xl border-l border-yellow-400/20 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-semibold text-foreground">Sans coordonnées GPS</h3>
              </div>
              
              <div className="space-y-3">
                {businessesWithoutGPS.map(business => <motion.div key={business.id} layout className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-yellow-400/30 transition-colors cursor-pointer" onClick={() => onBusinessSelect(business)}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground text-sm">{business.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {business.ilaScore}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="w-3 h-3" />
                        <span>{business.sector}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{business.city}</span>
                      </div>
                      {business.googleStars > 0 && <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{business.googleStars} ({business.googleReviews} avis)</span>
                        </div>}
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Voir détails
                    </Button>
                  </motion.div>)}
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};