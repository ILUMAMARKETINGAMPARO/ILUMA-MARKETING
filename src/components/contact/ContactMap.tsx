import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapbox } from '@/components/rivalviews/MapboxProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Phone, Mail } from 'lucide-react';

const ContactMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { token, isReady } = useMapbox();

  // Adresse exacte d'Iluma Marketing
  const ilumaLocation: [number, number] = [-73.567256, 45.501689]; // Montréal, QC
  const ilumaAddress = "Montréal, Québec, Canada";

  useEffect(() => {
    if (!mapContainer.current || !isReady || !token) return;

    // Initialiser la carte centrée sur l'adresse d'Iluma
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: ilumaLocation,
      zoom: 12,
      pitch: 45
    });

    map.current.on('load', () => {
      // Ajouter un marqueur personnalisé pour Iluma
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.borderRadius = '50%';
      el.style.background = 'linear-gradient(135deg, #8E44FF, #FFD56B)';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.border = '3px solid rgba(255, 255, 255, 0.8)';
      el.style.boxShadow = '0 0 20px rgba(142, 68, 255, 0.6)';
      el.style.cursor = 'pointer';
      el.innerHTML = '<svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>';

      // Ajouter le marqueur à la carte
      new mapboxgl.Marker(el)
        .setLngLat(ilumaLocation)
        .setPopup(
          new mapboxgl.Popup({ 
            offset: 25,
            className: 'iluma-popup'
          }).setHTML(`
            <div style="padding: 12px; background: linear-gradient(135deg, #0B0B0E, #1a1a2e); border-radius: 8px; color: white; min-width: 250px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #FFD56B;">Iluma Marketing</h3>
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #ffffff99;">${ilumaAddress}</p>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <svg width="16" height="16" fill="#8E44FF" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span style="font-size: 13px;">+1 (514) 882-8910</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <svg width="16" height="16" fill="#8E44FF" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span style="font-size: 13px;">administracion@ilumamarketing.com</span>
                </div>
              </div>
            </div>
          `)
        )
        .addTo(map.current!);

      // Ajouter un effet de halo autour du marqueur
      map.current!.addSource('iluma-halo', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: ilumaLocation
          },
          properties: {}
        }
      });

      map.current!.addLayer({
        id: 'iluma-halo',
        type: 'circle',
        source: 'iluma-halo',
        paint: {
          'circle-radius': {
            base: 1.75,
            stops: [
              [12, 30],
              [22, 180]
            ]
          },
          'circle-color': '#8E44FF',
          'circle-opacity': 0.15,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#8E44FF',
          'circle-stroke-opacity': 0.4
        }
      });

      // Animation du halo
      let animationId: number;
      let radius = 30;
      let growing = true;

      const animateHalo = () => {
        if (growing) {
          radius += 0.5;
          if (radius > 45) growing = false;
        } else {
          radius -= 0.5;
          if (radius < 30) growing = true;
        }

        map.current!.setPaintProperty('iluma-halo', 'circle-radius', radius);
        animationId = requestAnimationFrame(animateHalo);
      };

      animateHalo();

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    });

    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Ajouter le contrôle de géolocalisation
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isReady, token]);

  const openInMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ilumaAddress)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const getDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ilumaAddress)}`;
    window.open(directionsUrl, '_blank');
  };

  if (!isReady) {
    return (
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center">Notre localisation</CardTitle>
          <CardDescription className="text-white/70 text-center">
            Situés au cœur de Montréal pour mieux servir nos clients québécois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white/10 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8E44FF] mx-auto mb-4"></div>
              <p className="text-white/80">Chargement de la carte...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl text-white text-center">Notre localisation</CardTitle>
        <CardDescription className="text-white/70 text-center">
          Situés au cœur de Montréal pour mieux servir nos clients québécois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Carte interactive */}
          <div 
            ref={mapContainer} 
            className="h-80 rounded-xl overflow-hidden border border-white/10"
          />

          {/* Actions rapides */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={openInMaps}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 border border-white/20"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Voir sur Google Maps</span>
            </button>
            
            <button
              onClick={getDirections}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-4 py-2 rounded-lg transition-all duration-300 font-semibold"
            >
              <Navigation className="w-4 h-4" />
              <span className="text-sm">Obtenir un itinéraire</span>
            </button>
            
            <a
              href="tel:+15148828910"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 border border-white/20"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">Appeler</span>
            </a>
            
            <a
              href="mailto:administracion@ilumamarketing.com"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 border border-white/20"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Écrire</span>
            </a>
          </div>

          {/* Informations de contact */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-semibold mb-3 text-center">Informations de contact</h4>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4 text-[#8E44FF]" />
                <span>{ilumaAddress}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4 text-[#8E44FF]" />
                <span>+1 (514) 882-8910</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4 text-[#8E44FF]" />
                <span>administracion@ilumamarketing.com</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactMap;