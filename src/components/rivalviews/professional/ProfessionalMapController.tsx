import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RivalBusiness } from '@/types/rivalviews';
import { MarkerManager } from './MarkerManager';
import { MapStyleManager } from './MapStyleManager';
import { ClusterManager } from './ClusterManager';
import { PopupManager } from './PopupManager';

interface ProfessionalMapControllerProps {
  businesses: RivalBusiness[];
  onBusinessClick?: (business: RivalBusiness) => void;
  style?: 'light' | 'dark' | 'satellite';
  clustering?: boolean;
  filters?: {
    sector?: string;
    scoreMin?: number;
    scoreMax?: number;
    city?: string;
  };
}

export const ProfessionalMapController: React.FC<ProfessionalMapControllerProps> = ({
  businesses,
  onBusinessClick,
  style = 'light',
  clustering = true,
  filters = {}
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Managers
  const markerManager = useRef<MarkerManager | null>(null);
  const styleManager = useRef<MapStyleManager | null>(null);
  const clusterManager = useRef<ClusterManager | null>(null);
  const popupManager = useRef<PopupManager | null>(null);

  // Initialisation de la carte
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    console.log('🗺️ Initialisation Professional Map Controller');

    try {
      // Configuration optimisée pour 302+ entreprises
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: style === 'satellite' ? 'mapbox://styles/mapbox/satellite-streets-v12' : 'mapbox://styles/mapbox/light-v11',
        center: [-73.5673, 45.5017], // Montréal
        zoom: 9, // Zoom initial optimisé pour voir plus d'entreprises
        pitch: 0,
        bearing: 0,
        attributionControl: false,
        logoPosition: 'bottom-right',
        antialias: true,
        maxZoom: 18,
        minZoom: 7, // Permettre un zoom plus large
        renderWorldCopies: false, // Performance optimization
        preserveDrawingBuffer: true // Pour les screenshots/exports
      });

      // Contrôles avancés
      map.current.addControl(new mapboxgl.NavigationControl({
        visualizePitch: true,
        showCompass: true
      }), 'top-right');

      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      map.current.addControl(new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric'
      }), 'bottom-left');

      // Gestionnaires
      styleManager.current = new MapStyleManager(map.current);
      markerManager.current = new MarkerManager(map.current);
      clusterManager.current = new ClusterManager(map.current);
      popupManager.current = new PopupManager(map.current);

      map.current.on('load', () => {
        console.log('✅ Professional Map chargée avec succès');
        setMapLoaded(true);
        setIsReady(true);
      });

      map.current.on('error', (e) => {
        console.error('❌ Erreur Professional Map:', e);
        setIsReady(false);
      });

      // Performance optimizations
      map.current.on('sourcedata', (e) => {
        if (e.sourceDataType === 'visibility') {
          // Optimiser le rendu lors des changements de visibilité
          map.current?.triggerRepaint();
        }
      });

    } catch (error) {
      console.error('❌ Erreur initialisation Professional Map:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Gestion du style de carte
  useEffect(() => {
    if (!isReady || !styleManager.current) return;
    
    styleManager.current.setStyle(style);
  }, [style, isReady]);

  // Filtrage et affichage des entreprises
  const filteredBusinesses = React.useMemo(() => {
    return businesses.filter(business => {
      // Filtre secteur
      if (filters.sector && filters.sector !== 'all') {
        if (!business.sector.toLowerCase().includes(filters.sector.toLowerCase())) {
          return false;
        }
      }

      // Filtre score
      if (filters.scoreMin !== undefined && business.ilaScore < filters.scoreMin) {
        return false;
      }
      if (filters.scoreMax !== undefined && business.ilaScore > filters.scoreMax) {
        return false;
      }

      // Filtre ville
      if (filters.city && filters.city !== 'all') {
        if (!business.city.toLowerCase().includes(filters.city.toLowerCase())) {
          return false;
        }
      }

      // Coordonnées valides
      return !!(business.lat && business.lng && 
        business.lat !== 0 && business.lng !== 0 &&
        !isNaN(Number(business.lat)) && !isNaN(Number(business.lng)));
    });
  }, [businesses, filters]);

  // Affichage des marqueurs - VERSION OPTIMISÉE POUR 302+ ENTREPRISES
  useEffect(() => {
    if (!isReady || !markerManager.current || !clusterManager.current) {
      console.log('⚠️ ProfessionalMapController: Pas prêt', { isReady, markerManager: !!markerManager.current, clusterManager: !!clusterManager.current });
      return;
    }

    console.log(`🎯 AFFICHAGE ENTREPRISES: ${filteredBusinesses.length} entreprises à traiter`);
    console.log('📊 Échantillon coordonnées:', filteredBusinesses.slice(0, 3).map(b => ({
      name: b.name,
      city: b.city,
      lat: b.lat,
      lng: b.lng,
      ilaScore: b.ilaScore,
      hasValidCoords: !!(b.lat && b.lng && b.lat !== 0 && b.lng !== 0)
    })));

    // Debug immédiat
    if (filteredBusinesses.length === 0) {
      console.error('❌ AUCUNE ENTREPRISE FILTRÉE - Vérifiez les données source');
      console.log('📋 Total businesses reçues:', businesses.length);
      return;
    }

    // FORCER LES MARQUEURS INDIVIDUELS POUR DEBUG - Toujours afficher les entreprises
    const shouldUseCluster = false; // FORCE DÉSACTIVÉ pour voir immédiatement les entreprises
    
    console.log('🔥 FORCE MODE MARQUEURS INDIVIDUELS pour', filteredBusinesses.length, 'entreprises');
    console.log('🔥 Premier marqueur test:', filteredBusinesses[0] ? {
      name: filteredBusinesses[0].name,
      lat: filteredBusinesses[0].lat,
      lng: filteredBusinesses[0].lng,
      coords: [filteredBusinesses[0].lng, filteredBusinesses[0].lat]
    } : 'Aucune entreprise');
    
    // Nettoyer d'abord les clusters
    clusterManager.current.clearClusters();
    
    // Puis afficher TOUS les marqueurs
    markerManager.current.updateMarkers(filteredBusinesses, onBusinessClick);

    // Ajuster la vue intelligemment
    if (filteredBusinesses.length > 0) {
      console.log('🗺️ Ajustement intelligent de la vue de la carte');
      
      const validBusinesses = filteredBusinesses.filter(b => 
        b.lat && b.lng && b.lat !== 0 && b.lng !== 0 && 
        !isNaN(Number(b.lat)) && !isNaN(Number(b.lng))
      );

      if (validBusinesses.length > 0) {
        const coordinates = validBusinesses.map(b => [Number(b.lng), Number(b.lat)]);
        const bounds = new mapboxgl.LngLatBounds();
        coordinates.forEach(coord => bounds.extend(coord as [number, number]));

        // Délai réduit pour une expérience plus fluide
        setTimeout(() => {
          if (map.current) {
            map.current.fitBounds(bounds, {
              padding: { top: 100, bottom: 100, left: 100, right: 100 },
              maxZoom: validBusinesses.length > 100 ? 10 : 13, // Zoom adaptatif
              duration: 800
            });
            console.log('✅ Vue adaptée pour', validBusinesses.length, 'entreprises valides');
          }
        }, 50);
      }
    } else {
      console.log('⚠️ Aucune entreprise valide à afficher');
    }

  }, [filteredBusinesses, clustering, onBusinessClick, isReady]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-xl shadow-2xl" />
      
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-xl">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-white font-medium">Chargement professionnel...</div>
            <div className="text-slate-400 text-sm mt-1">Initialisation des systèmes avancés</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalMapController;