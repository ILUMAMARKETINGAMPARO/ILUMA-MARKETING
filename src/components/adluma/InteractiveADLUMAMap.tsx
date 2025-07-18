import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapbox } from '@/components/rivalviews/MapboxProvider';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Circle, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMapLogging } from '@/hooks/useMapLogging';

interface InteractiveADLUMAMapProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  radius: number;
  setRadius: (radius: number) => void;
  language: 'fr' | 'en' | 'es';
}

const InteractiveADLUMAMap: React.FC<InteractiveADLUMAMapProps> = ({
  selectedLocation,
  setSelectedLocation,
  radius,
  setRadius,
  language
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const circleLayer = useRef<string | null>(null);
  const { token, isReady } = useMapbox();
  const { logMapInteraction } = useMapLogging();
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const content = {
    fr: {
      clickToSelect: "Cliquez sur la carte pour sélectionner un point",
      locationSelected: "Point sélectionné",
      radius: "Rayon",
      coverage: "Zone de couverture estimée"
    },
    en: {
      clickToSelect: "Click on the map to select a point",
      locationSelected: "Point selected",
      radius: "Radius", 
      coverage: "Estimated coverage area"
    },
    es: {
      clickToSelect: "Haz clic en el mapa para seleccionar un punto",
      locationSelected: "Punto seleccionado",
      radius: "Radio",
      coverage: "Área de cobertura estimada"
    }
  };

  const text = content[language];

  // Villes du Québec avec leurs coordonnées réelles
  const quebecCities = {
    'Montréal': [-73.567256, 45.501689],
    'Québec': [-71.207430, 46.813878],
    'Laval': [-73.692269, 45.606998],
    'Gatineau': [-75.7135, 45.4765],
    'Sherbrooke': [-71.899729, 45.400691],
    'Trois-Rivières': [-72.542914, 46.343542],
    'Chicoutimi': [-71.060816, 48.421625],
    'Rimouski': [-68.536034, 48.449242]
  };

  useEffect(() => {
    if (!mapContainer.current || !isReady || !token) return;

    // Initialiser la carte centrée sur le Québec
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-72.0, 46.5], // Centre du Québec
      zoom: 6,
      pitch: 0
    });

    map.current.on('load', () => {
      // Ajouter des marqueurs pour les villes importantes
      Object.entries(quebecCities).forEach(([city, [lng, lat]]) => {
        new mapboxgl.Marker({
          color: '#8E44FF',
          scale: 0.7
        })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(city))
        .addTo(map.current!);
      });
    });

    // Gérer les clics sur la carte
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setCoordinates([lng, lat]);
      
      // Logger l'interaction
      logMapInteraction({
        page_context: 'adluma',
        action_type: 'click',
        location_data: { lat, lng }
      });
      
      // Reverse geocoding simple pour obtenir le nom du lieu
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&language=${language}`)
        .then(response => response.json())
        .then(data => {
          if (data.features && data.features.length > 0) {
            const place = data.features[0];
            const locationName = place.place_name || place.text || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            setSelectedLocation(locationName);
            
            // Logger avec l'adresse résolue
            logMapInteraction({
              page_context: 'adluma',
              action_type: 'marker_add',
              location_data: { lat, lng, address: locationName }
            });
          }
        })
        .catch(() => {
          const locationName = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setSelectedLocation(locationName);
        });

      // Supprimer le marqueur précédent
      if (marker.current) {
        marker.current.remove();
      }

      // Ajouter un nouveau marqueur
      marker.current = new mapboxgl.Marker({
        color: '#FFD56B',
        scale: 1.2
      })
      .setLngLat([lng, lat])
      .addTo(map.current!);

      updateRadiusCircle([lng, lat], radius);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isReady, token, language]);

  const updateRadiusCircle = (center: [number, number], radiusKm: number) => {
    if (!map.current) return;

    // Supprimer le cercle précédent
    if (circleLayer.current) {
      if (map.current.getLayer(circleLayer.current)) {
        map.current.removeLayer(circleLayer.current);
      }
      if (map.current.getSource(circleLayer.current)) {
        map.current.removeSource(circleLayer.current);
      }
    }

    // Créer un nouveau cercle
    const layerId = `radius-circle-${Date.now()}`;
    circleLayer.current = layerId;

    // Calculer les points du cercle
    const points = [];
    const steps = 64;
    for (let i = 0; i < steps; i++) {
      const angle = (i * 360) / steps;
      const lat = center[1] + (radiusKm / 111) * Math.cos((angle * Math.PI) / 180);
      const lng = center[0] + (radiusKm / (111 * Math.cos((center[1] * Math.PI) / 180))) * Math.sin((angle * Math.PI) / 180);
      points.push([lng, lat]);
    }
    points.push(points[0]); // Fermer le polygone

    map.current.addSource(layerId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [points]
        },
        properties: {}
      }
    });

    map.current.addLayer({
      id: layerId,
      type: 'fill',
      source: layerId,
      paint: {
        'fill-color': '#8E44FF',
        'fill-opacity': 0.2
      }
    });

    map.current.addLayer({
      id: `${layerId}-border`,
      type: 'line',
      source: layerId,
      paint: {
        'line-color': '#8E44FF',
        'line-width': 2,
        'line-opacity': 0.8
      }
    });
  };

  // Mettre à jour le cercle quand le rayon change
  useEffect(() => {
    if (coordinates && map.current) {
      updateRadiusCircle(coordinates, radius);
      
      // Logger le changement de rayon
      logMapInteraction({
        page_context: 'adluma',
        action_type: 'radius_change',
        location_data: { 
          lat: coordinates[1], 
          lng: coordinates[0], 
          radius 
        }
      });
    }
  }, [radius, coordinates, logMapInteraction]);

  // Centrer sur une ville prédéfinie
  const centerOnCity = (cityName: string) => {
    const coords = quebecCities[cityName as keyof typeof quebecCities];
    if (coords && map.current) {
      map.current.flyTo({
        center: coords as [number, number],
        zoom: 10,
        duration: 1500
      });
      
      // Logger l'action de centrage
      logMapInteraction({
        page_context: 'adluma',
        action_type: 'center',
        location_data: { 
          lat: coords[1], 
          lng: coords[0], 
          address: cityName 
        }
      });
    }
  };

  if (!isReady) {
    return (
      <Card className="glass-effect border-white/20 p-6">
        <div className="h-80 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8E44FF] mx-auto mb-4"></div>
            <p>Chargement de la carte...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Carte interactive */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Carte Interactive ADLUMA™
          </h3>
          <p className="text-white/70 text-sm">
            {text.clickToSelect}
          </p>
        </div>
        
        <div 
          ref={mapContainer} 
          className="h-80 rounded-lg overflow-hidden border border-white/10"
        />

        {/* Instructions de navigation rapide */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.keys(quebecCities).map((city) => (
            <Button
              key={city}
              variant="outline"
              size="sm"
              onClick={() => centerOnCity(city)}
              className="text-xs border-white/20 text-white hover:bg-white/10"
            >
              <Target className="w-3 h-3 mr-1" />
              {city}
            </Button>
          ))}
        </div>
      </Card>

      {/* Informations sur la sélection */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="glass-effect border-white/20 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="w-5 h-5 text-[#FFD56B]" />
              <span className="text-white font-semibold">{text.locationSelected}:</span>
            </div>
            <Badge className="bg-[#FFD56B]/20 text-[#FFD56B] text-sm">
              {selectedLocation}
            </Badge>
          </Card>

          <Card className="glass-effect border-white/20 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{text.radius}: {radius} km</span>
                <Circle className="w-5 h-5 text-[#8E44FF]" />
              </div>
              
              <input
                type="range"
                min="1"
                max="100"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              
              <div className="flex justify-between text-white/60 text-xs">
                <span>1 km</span>
                <span>100 km</span>
              </div>

              <div className="pt-3 border-t border-white/20">
                <p className="text-white/70 text-sm">
                  {text.coverage}: <strong>{Math.round(Math.PI * radius * radius)} km²</strong>
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveADLUMAMap;