import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Search, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import { secureApiService } from '@/services/secureApiService';

interface MobileMapProps {
  height?: string;
  showControls?: boolean;
  locations?: Array<{
    lng: number;
    lat: number;
    title: string;
    description?: string;
  }>;
}

const MobileMap: React.FC<MobileMapProps> = ({ 
  height = "h-64 md:h-96", 
  showControls = true,
  locations = []
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (map.current || !mapContainer.current) return;

      try {
        // Get secure token
        const mapboxToken = await secureApiService.getMapboxToken();
        
        if (!mapboxToken) {
          console.warn('Mapbox token manquant. Veuillez configurer votre clé Mapbox dans les paramètres.');
          return;
        }

        mapboxgl.accessToken = mapboxToken;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [-73.567256, 45.501689], // Montréal par défaut
          zoom: 12,
          attributionControl: false,
          logoPosition: 'bottom-right'
        });

        // Styles responsive
        map.current.on('load', () => {
          setIsLoaded(true);
          
          // Ajouter les marqueurs pour les locations
          locations.forEach((location, index) => {
            const el = document.createElement('div');
            el.className = 'w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center';
            el.innerHTML = '<div class="w-2 h-2 bg-white rounded-full"></div>';
            
            const popup = new mapboxgl.Popup({ 
              offset: 25,
              className: 'mobile-map-popup'
            }).setHTML(`
              <div class="p-2">
                <h3 class="font-semibold text-sm mb-1">${location.title}</h3>
                ${location.description ? `<p class="text-xs text-gray-600">${location.description}</p>` : ''}
              </div>
            `);
            
            new mapboxgl.Marker(el)
              .setLngLat([location.lng, location.lat])
              .setPopup(popup)
              .addTo(map.current!);
          });
        });

        // Optimisation mobile
        map.current.touchZoomRotate.disableRotation();
        map.current.dragPan.disable();
        map.current.scrollZoom.disable();

        // Activer le drag uniquement sur desktop
        const enableInteraction = () => {
          if (window.innerWidth > 768) {
            map.current?.dragPan.enable();
            map.current?.scrollZoom.enable();
          }
        };

        enableInteraction();
        window.addEventListener('resize', enableInteraction);

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, [locations]);

  const zoomIn = () => {
    map.current?.zoomIn();
  };

  const zoomOut = () => {
    map.current?.zoomOut();
  };

  const findUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.longitude,
            position.coords.latitude
          ];
          setUserLocation(coords);
          map.current?.flyTo({ center: coords, zoom: 14 });
        },
        (error) => {
          console.warn('Géolocalisation non disponible:', error);
        }
      );
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div ref={mapContainer} className={`w-full ${height} relative`}>
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
            </div>
          </div>
        )}
      </div>
      
      {showControls && isLoaded && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 shadow-lg"
            onClick={zoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 shadow-lg"
            onClick={zoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 shadow-lg"
            onClick={findUserLocation}
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      )}

      <style>{`
        .mobile-map-popup .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          color: hsl(var(--foreground));
        }
        
        .mobile-map-popup .mapboxgl-popup-tip {
          border-top-color: hsl(var(--background));
        }
        
        .mapboxgl-ctrl-attrib {
          font-size: 10px;
          opacity: 0.7;
        }
        
        @media (max-width: 768px) {
          .mapboxgl-popup-content {
            max-width: 200px;
          }
        }
      `}</style>
    </Card>
  );
};

export default MobileMap;