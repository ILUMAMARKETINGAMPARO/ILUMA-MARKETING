import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, TrendingUp, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { RivalBusiness } from '@/types/rivalviews';

// Token Mapbox configuré
mapboxgl.accessToken = 'pk.eyJ1IjoiaWx1bWFtYXJrZXRpbmciLCJhIjoiY2x6dzlmd2tpMDFzcTJscXprdWJtcXVyNyJ9.0XGVgDQQGbU8FBVb8m_JoA';

interface SimpleMapProps {
  businesses: RivalBusiness[];
  onBusinessClick?: (business: RivalBusiness) => void;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ businesses, onBusinessClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      // Initialiser la carte
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-73.5673, 45.5017], // Montréal
        zoom: 11,
        pitch: 0,
        bearing: 0,
        attributionControl: false,
        logoPosition: 'bottom-right'
      });

    // Ajouter les contrôles
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      map.current.on('load', () => {
        console.log('🗺️ Carte Mapbox chargée avec succès');
        setMapLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error('❌ Erreur carte Mapbox:', e);
        setMapLoaded(true); // Permettre d'afficher quelque chose même en cas d'erreur
      });

    } catch (error) {
      console.error('❌ Erreur initialisation Mapbox:', error);
      setMapLoaded(true); // Forcer le chargement pour éviter l'état bloqué
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // INSTRUCTUS™ - Effect pour afficher les marqueurs sur la carte
  useEffect(() => {
    console.log('🧩 INSTRUCTUS™ - Vérification état carte:', { 
      mapLoaded, 
      mapExists: !!map.current, 
      businessCount: businesses.length 
    });

    if (!mapLoaded || !map.current) {
      console.log('⏳ INSTRUCTUS™ - Carte pas encore prête');
      return;
    }
    
    if (businesses.length === 0) {
      console.log('📭 INSTRUCTUS™ - Aucune entreprise à afficher');
      return;
    }

    console.log(`🎯 INSTRUCTUS™ - Début de l'affichage de ${businesses.length} entreprises`);

    // Nettoyer les anciens marqueurs
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filtrer les entreprises avec coordonnées valides
    const validBusinesses = businesses.filter(business => {
      const hasValidCoords = !!(business.lat && business.lng && 
        business.lat !== 0 && business.lng !== 0 &&
        !isNaN(Number(business.lat)) && !isNaN(Number(business.lng)));
      
      if (!hasValidCoords) {
        console.warn('❌ INSTRUCTUS™ - Coordonnées invalides pour:', business.name, { lat: business.lat, lng: business.lng });
      }
      
      return hasValidCoords;
    });

    console.log(`✅ INSTRUCTUS™ - ${validBusinesses.length} entreprises avec coordonnées valides`);

    if (validBusinesses.length === 0) {
      console.error('❌ INSTRUCTUS™ - Aucune entreprise avec coordonnées valides');
      return;
    }

    // Échantillon pour debug
    const sample = validBusinesses.slice(0, 3);
    console.log('🗺️ INSTRUCTUS™ - Échantillon coordonnées:', sample.map(b => ({
      name: b.name,
      lat: b.lat,
      lng: b.lng,
      ilaScore: b.ilaScore
    })));

    // Créer les marqueurs avec couleurs selon Score ILA™
    validBusinesses.forEach((business, index) => {
      // Déterminer la couleur selon le Score ILA™
      let markerColor, shadowColor;
      if (business.ilaScore >= 80) {
        markerColor = '#22c55e'; // Vert
        shadowColor = 'rgba(34, 197, 94, 0.6)';
      } else if (business.ilaScore >= 60) {
        markerColor = '#f59e0b'; // Orange
        shadowColor = 'rgba(245, 158, 11, 0.6)';
      } else {
        markerColor = '#ef4444'; // Rouge
        shadowColor = 'rgba(239, 68, 68, 0.6)';
      }

      // Créer l'élément du marqueur
      const markerEl = document.createElement('div');
      markerEl.className = 'iluma-marker';
      markerEl.style.cssText = `
        width: 24px;
        height: 24px;
        background: ${markerColor};
        border: 4px solid #ffffff;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.6), 0 0 0 2px rgba(0,0,0,0.1);
        position: relative;
        z-index: 1000;
        transition: transform 0.2s ease;
      `;

      // Animations subtiles et visibles
      markerEl.addEventListener('mouseenter', () => {
        markerEl.style.transform = 'scale(1.3)';
        markerEl.style.boxShadow = `0 6px 20px rgba(0,0,0,0.8), 0 0 0 3px ${markerColor}40`;
        markerEl.style.zIndex = '1001';
      });

      markerEl.addEventListener('mouseleave', () => {
        markerEl.style.transform = 'scale(1)';
        markerEl.style.boxShadow = `0 4px 12px rgba(0,0,0,0.6), 0 0 0 2px rgba(0,0,0,0.1)`;
        markerEl.style.zIndex = '1000';
      });

      // Popup enrichi avec données complètes
      const popup = new mapboxgl.Popup({
        offset: 25,
        className: 'instructus-popup',
        closeButton: true,
        closeOnClick: false
      }).setHTML(`
        <div class="p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border border-purple-400/50 rounded-lg min-w-[320px] max-w-[400px]">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-4 h-4 rounded-full animate-pulse" style="background: ${markerColor}"></div>
            <h3 class="text-white font-bold text-lg truncate">${business.name}</h3>
          </div>
          
          <div class="space-y-3 text-sm">
            <!-- Adresse et localisation -->
            <div class="flex items-start gap-2 text-gray-200">
              <div class="text-yellow-400 flex-shrink-0 mt-0.5">📍</div>
              <div>
                <div class="font-medium">${business.address}</div>
                <div class="text-purple-400 font-semibold">${business.city || 'Non spécifié'}</div>
              </div>
            </div>
            
            <!-- Secteur d'activité -->
            <div class="flex items-center gap-2 text-gray-200">
              <div class="text-blue-400 flex-shrink-0">🏢</div>
              <span class="capitalize font-medium">${business.sector || 'Services'}</span>
            </div>
            
            <!-- Score ILA™ avec badge coloré -->
            <div class="flex items-center gap-2 bg-black/30 rounded-lg p-2">
              <div class="text-yellow-400 flex-shrink-0">⚡</div>
              <div class="flex-1">
                <span class="text-yellow-400 font-bold text-lg">Score ILA™: ${business.ilaScore}</span>
                <div class="text-xs text-gray-400 mt-1">
                  ${business.ilaScore >= 80 ? '🟢 Excellent' : business.ilaScore >= 60 ? '🟡 Correct' : '🔴 Faible'}
                </div>
              </div>
            </div>
            
            <!-- Données Google -->
            ${business.googleRating ? `
              <div class="flex items-center gap-2 text-gray-200">
                <div class="text-yellow-400 flex-shrink-0">⭐</div>
                <span class="font-medium">${business.googleRating.toFixed(1)}/5 (${business.reviewCount || 0} avis)</span>
              </div>
            ` : ''}
            
            <!-- Site web -->
            ${business.website ? `
              <div class="flex items-center gap-2 text-gray-200">
                <div class="text-blue-400 flex-shrink-0">🌐</div>
                <span class="truncate text-blue-300">${business.website.replace(/^https?:\/\//, '')}</span>
              </div>
            ` : ''}
            
            <!-- Téléphone -->
            ${business.phone ? `
              <div class="flex items-center gap-2 text-gray-200">
                <div class="text-green-400 flex-shrink-0">📞</div>
                <span class="font-mono">${business.phone}</span>
              </div>
            ` : ''}
            
            <!-- SEO Data -->
            ${business.backlinks > 0 || business.indexedKeywords > 0 ? `
              <div class="bg-black/20 rounded-lg p-2 text-xs">
                <div class="text-green-400 font-semibold mb-1">📊 Données SEO</div>
                <div class="grid grid-cols-2 gap-1 text-gray-300">
                  <div>Backlinks: <span class="text-white font-semibold">${business.backlinks}</span></div>
                  <div>Mots-clés: <span class="text-white font-semibold">${business.indexedKeywords}</span></div>
                </div>
              </div>
            ` : ''}
          </div>
          
          <!-- Actions -->
          <div class="mt-4 pt-3 border-t border-gray-600 flex gap-2">
            <button 
              onclick="window.selectBusiness('${business.id}')" 
              class="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Voir détails →
            </button>
            <button 
              onclick="window.compareBusiness('${business.id}')" 
              class="bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Comparer
            </button>
          </div>
        </div>
      `);

      // Créer et ajouter le marqueur
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([Number(business.lng), Number(business.lat)])
        .setPopup(popup);

      // Ajouter à la carte
      marker.addTo(map.current!);

      // Event pour sélection
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('🎯 INSTRUCTUS™ - Clic sur:', business.name);
        if (onBusinessClick) {
          onBusinessClick(business);
        }
      });

      markersRef.current.push(marker);
      
      // Log de debug pour chaque marqueur créé
      if (index < 5) {
        console.log(`✅ INSTRUCTUS™ - Marqueur ${index + 1} créé:`, {
          name: business.name,
          coords: [business.lng, business.lat],
          score: business.ilaScore,
          color: markerColor
        });
      }
    });

    console.log(`🗺️ INSTRUCTUS™ - ${markersRef.current.length} marqueurs ajoutés à la carte`);

    // Ajuster la vue pour inclure tous les marqueurs
    if (validBusinesses.length > 0) {
      const coordinates = validBusinesses.map(business => [Number(business.lng), Number(business.lat)]);
      
      // Créer les bounds
      const bounds = new mapboxgl.LngLatBounds();
      coordinates.forEach(coord => bounds.extend(coord as [number, number]));

      // Appliquer les bounds avec padding
      setTimeout(() => {
        if (map.current) {
          map.current.fitBounds(bounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: 11
          });
        }
      }, 100);

      console.log('🗺️ INSTRUCTUS™ - Vue ajustée pour englober tous les marqueurs');
    }

    // Fonctions globales pour interactions
    (window as any).selectBusiness = (businessId: string) => {
      const business = validBusinesses.find(b => b.id === businessId);
      if (business && onBusinessClick) {
        console.log('🎯 INSTRUCTUS™ - Sélection business:', business.name);
        onBusinessClick(business);
      }
    };

    (window as any).compareBusiness = (businessId: string) => {
      const business = validBusinesses.find(b => b.id === businessId);
      if (business && onBusinessClick) {
        console.log('⚖️ INSTRUCTUS™ - Comparaison business:', business.name);
        onBusinessClick(business);
        window.dispatchEvent(new CustomEvent('startComparison', { detail: business }));
      }
    };

    console.log('🎯 INSTRUCTUS™ - Marqueurs créés avec succès');

  }, [mapLoaded, businesses, onBusinessClick]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {/* Overlay avec statistiques */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="bg-black/80 backdrop-blur-sm border border-[#8E44FF]/30">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-white text-sm">
              <MapPin className="w-4 h-4 text-[#8E44FF]" />
              <span className="font-medium">{businesses.length}</span>
              <span className="text-white/70">entreprises</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Légende Score ILA™ */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="bg-black/90 backdrop-blur-sm border border-purple-400/50">
          <CardContent className="p-3">
            <div className="text-xs text-white/70 mb-3 font-semibold">🧩 INSTRUCTUS™ - Score ILA™</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-500 border-2 border-yellow-400 rounded-full"></div>
                <span className="text-green-400 font-medium">80-100: Excellent</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-orange-500 border-2 border-yellow-400 rounded-full"></div>
                <span className="text-orange-400 font-medium">60-79: Correct</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-red-500 border-2 border-yellow-400 rounded-full"></div>
                <span className="text-red-400 font-medium">0-59: Faible</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-gray-400">
              {businesses.filter(b => b.lat && b.lng).length} entreprises géolocalisées
            </div>
          </CardContent>
        </Card>
      </div>

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-[#8E44FF] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <div className="text-sm">Chargement de la carte...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleMap;