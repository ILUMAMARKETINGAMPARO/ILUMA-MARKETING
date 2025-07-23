import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, Star, TrendingUp, Search, Target, Plus, Eye } from 'lucide-react';

import { RivalBusiness as ImportedRivalBusiness } from '@/types/rivalviews.ts';

// Interface adaptée pour la carte
interface MapBusiness {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  ila_score: number;
  seo_score: number;
  contenu_score: number;
  reputation_score: number;
  position_score: number;
  google_rating: number;
  review_count: number;
  total_keywords: number;
  top10_keywords: number;
  top20_keywords: number;
  organic_traffic: number;
  domain_rating: number;
  sector: string;
  recommended_action: string;
  website?: string;
  phone?: string;
}

// Fonction pour convertir les données
const convertToMapBusiness = (business: ImportedRivalBusiness): MapBusiness => ({
  id: business.id,
  name: business.name,
  address: business.address,
  city: business.city,
  lat: business.lat,
  lng: business.lng,
  ila_score: business.ilaScore,
  seo_score: Math.floor(business.ilaScore * 0.5), // Conversion approximative
  contenu_score: Math.floor(business.ilaScore * 0.4),
  reputation_score: Math.floor(business.googleRating * 10),
  position_score: business.serpRank || 1,
  google_rating: business.googleRating,
  review_count: business.reviewCount,
  total_keywords: business.indexedKeywords,
  top10_keywords: business.top10Keywords,
  top20_keywords: business.top10Keywords * 3,
  organic_traffic: business.organicTraffic,
  domain_rating: 30 + Math.floor(business.ilaScore * 0.7),
  sector: business.sector,
  recommended_action: business.notes || 'SEO',
  website: business.website,
  phone: business.phone
});

// Données d'exemple selon vos spécifications
const sampleBusinesses: MapBusiness[] = [
  {
    id: '1',
    name: 'Matelas Houde',
    address: '3512 Bd Industriel',
    city: 'Laval',
    lat: 45.5808,
    lng: -73.7050,
    ila_score: 68,
    seo_score: 35,
    contenu_score: 28,
    reputation_score: 41,
    position_score: 5,
    google_rating: 4.1,
    review_count: 240,
    total_keywords: 14708,
    top10_keywords: 650,
    top20_keywords: 1980,
    organic_traffic: 40142,
    domain_rating: 34,
    sector: 'Matelas',
    recommended_action: 'SEO',
    website: 'tecnic.ca'
  },
  {
    id: '2',
    name: 'Dormez-Vous',
    address: '1234 Rue Example',
    city: 'Montréal',
    lat: 45.5017,
    lng: -73.5673,
    ila_score: 85,
    seo_score: 47,
    contenu_score: 46,
    reputation_score: 48,
    position_score: 1,
    google_rating: 4.8,
    review_count: 456,
    total_keywords: 48000,
    top10_keywords: 1120,
    top20_keywords: 2460,
    organic_traffic: 70000,
    domain_rating: 76,
    sector: 'Matelas',
    recommended_action: 'Podcast',
    website: 'dormez-vous.ca'
  }
];

interface RivalBusinessMapProps {
  businesses?: ImportedRivalBusiness[];
}

const RivalBusinessMap: React.FC<RivalBusinessMapProps> = ({ businesses = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<MapBusiness | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedBusinesses, setComparedBusinesses] = useState<MapBusiness[]>([]);

  // Convertir les données reçues
  const mapBusinesses = businesses.length > 0 
    ? businesses.map(convertToMapBusiness) 
    : sampleBusinesses;

  useEffect(() => {
    if (!mapContainer.current) return;

    // Token Mapbox
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvLWRhdmlkIiwiYSI6ImNtY3dvMWVyaDAwYzQya3B6enJ5dXkycGcifQ.IseIJ0ySJRvHbKYWKo7C8A';

    // Initialiser la carte centrée sur Montréal
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-73.5673, 45.5017],
      zoom: 10
    });

    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Ajouter les marqueurs pour chaque entreprise
    mapBusinesses.forEach((business) => {
      // Couleur du marqueur selon le score ILA
      const getMarkerColor = (score: number) => {
        if (score >= 80) return '#22c55e'; // Vert
        if (score >= 60) return '#f59e0b'; // Orange
        return '#ef4444'; // Rouge
      };

      // Créer un élément DOM personnalisé pour le marqueur
      const markerElement = document.createElement('div');
      markerElement.className = 'rival-marker';
      markerElement.style.cssText = `
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: ${getMarkerColor(business.ila_score)};
        border: 3px solid white;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 12px;
      `;
      markerElement.textContent = business.ila_score.toString();

      // Créer le popup au survol
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25
      }).setHTML(`
        <div style="padding: 12px; max-width: 300px;">
          <div style="font-weight: bold; color: #8E44FF; margin-bottom: 8px;">
            🏢 ${business.name}
          </div>
          <div style="font-size: 13px; line-height: 1.4;">
            📈 <strong>Trafic estimé (Ahrefs):</strong> ${business.organic_traffic.toLocaleString()} /mois<br>
            🔎 <strong>Total de mots-clés:</strong> ${business.total_keywords.toLocaleString()}<br>
            🥇 <strong>Top 10:</strong> ${business.top10_keywords} mots-clés<br>
            🥈 <strong>Top 20:</strong> ${business.top20_keywords} mots-clés<br>
            💥 <strong>Mot-clé #1:</strong> "matelas orthopédique" (2 500 vues)<br>
            <br>
            📊 <strong>Score SEO Iluma:</strong> ${business.seo_score} / 50<br>
            ⭐ <strong>Réputation Google:</strong> ${business.google_rating} ★<br>
            🎯 <strong>Action IA recommandée:</strong> ${business.recommended_action}
          </div>
        </div>
      `);

      // Créer le marqueur
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([business.lng, business.lat])
        .setPopup(popup)
        .addTo(map.current!);

      // Événements
      markerElement.addEventListener('mouseenter', () => {
        popup.addTo(map.current!);
      });

      markerElement.addEventListener('mouseleave', () => {
        popup.remove();
      });

      markerElement.addEventListener('click', () => {
        setSelectedBusiness(business);
        popup.remove();
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [mapBusinesses]);

  const getScoreColor = (score: number) => {
    if (score >= 40) return 'text-green-400';
    if (score >= 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  const addToComparison = (business: MapBusiness) => {
    if (comparedBusinesses.length < 2 && !comparedBusinesses.find(b => b.id === business.id)) {
      setComparedBusinesses([...comparedBusinesses, business]);
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Carte */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Légende */}
      <Card className="absolute top-4 left-4 bg-black/80 border-[#8E44FF]/30 backdrop-blur-sm">
        <div className="p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#8E44FF]" />
            Score ILA™
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-300">80-100: Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-gray-300">60-79: Bon</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-300">0-59: À améliorer</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Fiche détaillée */}
      {selectedBusiness && (
        <Card className="absolute top-4 right-4 w-96 max-h-[80vh] overflow-y-auto bg-black/90 border-[#8E44FF]/30 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {selectedBusiness.name}
                </h2>
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedBusiness.address}, {selectedBusiness.city}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedBusiness(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              {/* Score ILA */}
              <div className="bg-gradient-to-r from-[#8E44FF]/20 to-transparent p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Score ILA™</span>
                  <Badge className={`${getScoreColor(selectedBusiness.ila_score)} bg-transparent border`}>
                    {selectedBusiness.ila_score}/100
                  </Badge>
                </div>
              </div>

              {/* Détails SEO */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Score SEO</div>
                  <div className="text-lg font-bold text-white">{selectedBusiness.seo_score}/50</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Score Contenu</div>
                  <div className="text-lg font-bold text-white">{selectedBusiness.contenu_score}/50</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Réputation</div>
                  <div className="text-lg font-bold text-white flex items-center gap-1">
                    {selectedBusiness.google_rating}
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400">Position</div>
                  <div className="text-lg font-bold text-white">#{selectedBusiness.position_score}</div>
                </div>
              </div>

              {/* Métriques Ahrefs */}
              <Separator className="bg-gray-800" />
              <div className="space-y-3">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#8E44FF]" />
                  Métriques SEO (Ahrefs)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total mots-clés:</span>
                    <span className="text-white font-medium">{selectedBusiness.total_keywords.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trafic estimé:</span>
                    <span className="text-white font-medium">{selectedBusiness.organic_traffic.toLocaleString()}/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Top 10 mots-clés:</span>
                    <span className="text-white font-medium">{selectedBusiness.top10_keywords}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Domain Rating:</span>
                    <span className="text-white font-medium">{selectedBusiness.domain_rating}</span>
                  </div>
                </div>
              </div>

              {/* Action recommandée */}
              <div className="bg-[#8E44FF]/10 border border-[#8E44FF]/30 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-[#8E44FF]" />
                  <span className="text-white font-medium">Action IA recommandée</span>
                </div>
                <span className="text-[#8E44FF] font-medium">{selectedBusiness.recommended_action}</span>
              </div>

              {/* Actions CTA */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80"
                  onClick={() => addToComparison(selectedBusiness)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  CRM
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-[#8E44FF]/30 text-[#8E44FF] hover:bg-[#8E44FF]/10"
                  onClick={() => addToComparison(selectedBusiness)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Comparer
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Panneau de comparaison */}
      {comparedBusinesses.length > 0 && (
        <Card className="absolute bottom-4 left-4 right-4 bg-black/90 border-[#8E44FF]/30 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Comparaison 1 vs 1</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setComparedBusinesses([])}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
            
            {comparedBusinesses.length === 2 ? (
              <div className="grid grid-cols-2 gap-6">
                {comparedBusinesses.map((business, index) => (
                  <div key={business.id} className="space-y-2">
                    <h4 className="font-medium text-white text-center">
                      {business.name}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Score SEO:</span>
                        <span className="text-white">{business.seo_score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trafic:</span>
                        <span className="text-white">{business.organic_traffic.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mots-clés:</span>
                        <span className="text-white">{business.total_keywords.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">
                Sélectionnez 2 entreprises pour les comparer
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default RivalBusinessMap;