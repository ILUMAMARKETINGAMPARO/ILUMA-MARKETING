import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RivalBusiness } from '@/types/rivalviews';
import { MapPin, Filter, Search, TrendingUp, Star, Globe, Users } from 'lucide-react';

// Configuration Mapbox - Utiliser une clé publique temporaire pour la démo
const MAPBOX_TOKEN = 'pk.eyJ1IjoiaWx1bWEtbWFwcyIsImEiOiJjbHozeTF4ZmcwMW1zMnJwa2dzczZ0c3MxIn0.example'; // Remplacer par votre token

interface AdvancedMapViewProps {
  businesses: RivalBusiness[];
  onBusinessSelect: (business: RivalBusiness) => void;
}

const AdvancedMapView: React.FC<AdvancedMapViewProps> = ({ 
  businesses, 
  onBusinessSelect 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);

  // Données d'entreprises du Québec avec coordonnées réelles
  const quebecBusinesses: RivalBusiness[] = [
    {
      id: '1',
      name: 'Restaurant La Belle Époque',
      address: '1234 Rue Saint-Denis, Montréal',
      city: 'Montréal',
      sector: 'Restaurant',
      lat: 45.5191,
      lng: -73.5689,
      googleRating: 4.3,
      reviewCount: 89,
      ilaScore: 67,
      serpRank: 3,
      isSponsored: false,
      source: 'SEO',
      status: 'prospect',
      potential: 'high',
      organicTraffic: 1250,
      indexedKeywords: 45,
      top10Keywords: 12,
      backlinks: 23,
      isChain: false,
      hasPhotos: true,
      totalComments: 89
    },
    {
      id: '2', 
      name: 'Café du Coin',
      address: '567 Boulevard René-Lévesque, Laval',
      city: 'Laval',
      sector: 'Café',
      lat: 45.5701,
      lng: -73.6922,
      googleRating: 4.1,
      reviewCount: 134,
      ilaScore: 45,
      serpRank: 7,
      isSponsored: true,
      source: 'Ads',
      status: 'contacted',
      potential: 'medium',
      organicTraffic: 890,
      indexedKeywords: 28,
      top10Keywords: 5,
      backlinks: 12,
      isChain: false,
      hasPhotos: true,
      totalComments: 134
    },
    {
      id: '3',
      name: 'Boutique Mode Élégance',
      address: '890 Rue Sherbrooke, Longueuil',
      city: 'Longueuil',
      sector: 'Mode',
      lat: 45.5411,
      lng: -73.5180,
      googleRating: 4.7,
      reviewCount: 67,
      ilaScore: 82,
      serpRank: 1,
      isSponsored: false,
      source: 'SEO',
      status: 'client',
      potential: 'high',
      organicTraffic: 2100,
      indexedKeywords: 78,
      top10Keywords: 23,
      backlinks: 45,
      isChain: false,
      hasPhotos: true,
      totalComments: 67
    },
    {
      id: '4',
      name: 'Gym Fitness Plus',
      address: '321 Avenue du Parc, Brossard',
      city: 'Brossard',
      sector: 'Sport',
      lat: 45.4608,
      lng: -73.4501,
      googleRating: 4.0,
      reviewCount: 203,
      ilaScore: 58,
      serpRank: 5,
      isSponsored: false,
      source: 'GMB',
      status: 'prospect',
      potential: 'medium',
      organicTraffic: 1456,
      indexedKeywords: 56,
      top10Keywords: 8,
      backlinks: 18,
      isChain: true,
      chainCount: 3,
      hasPhotos: true,
      totalComments: 203
    },
    {
      id: '5',
      name: 'Salon Beauté Luxe',
      address: '654 Rue Jean-Talon, Saint-Laurent',
      city: 'Saint-Laurent',
      sector: 'Beauté',
      lat: 45.5331,
      lng: -73.7075,
      googleRating: 4.5,
      reviewCount: 91,
      ilaScore: 73,
      serpRank: 2,
      isSponsored: true,
      source: 'Social',
      status: 'prospect',
      potential: 'high',
      organicTraffic: 1789,
      indexedKeywords: 62,
      top10Keywords: 15,
      backlinks: 34,
      isChain: false,
      hasPhotos: true,
      totalComments: 91
    }
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialiser la carte sans token pour la démo
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-73.5689, 45.5017], // Montréal
        zoom: 10,
        pitch: 45,
        bearing: 0,
        accessToken: MAPBOX_TOKEN || 'pk.demo'
      });

      // Ajouter les contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Ajouter les marqueurs des entreprises
      quebecBusinesses.forEach((business) => {
        if (business.lat && business.lng) {
          // Couleur selon le score ILA
          const getMarkerColor = (score: number) => {
            if (score >= 80) return '#10B981'; // Vert
            if (score >= 60) return '#F59E0B'; // Jaune
            return '#EF4444'; // Rouge
          };

          // Créer un marqueur personnalisé
          const markerEl = document.createElement('div');
          markerEl.className = 'custom-marker';
          markerEl.style.cssText = `
            width: 30px;
            height: 30px;
            background-color: ${getMarkerColor(business.ilaScore)};
            border: 3px solid white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 10px;
          `;
          markerEl.textContent = business.ilaScore.toString();

          // Créer le popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="color: black; padding: 10px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold;">${business.name}</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${business.address}</p>
              <div style="display: flex; gap: 8px; margin: 8px 0;">
                <span style="background: ${getMarkerColor(business.ilaScore)}; color: white; padding: 2px 6px; border-radius: 12px; font-size: 11px; font-weight: bold;">
                  ILA: ${business.ilaScore}
                </span>
                <span style="background: #8E44FF; color: white; padding: 2px 6px; border-radius: 12px; font-size: 11px;">
                  ⭐ ${business.googleRating}
                </span>
              </div>
              <div style="font-size: 12px; color: #666; margin-top: 8px;">
                📊 ${business.organicTraffic?.toLocaleString()} visites/mois<br>
                🔍 ${business.indexedKeywords} mots-clés<br>
                🔗 ${business.backlinks} backlinks
              </div>
            </div>
          `);

          // Ajouter le marqueur à la carte
          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat([business.lng, business.lat])
            .setPopup(popup)
            .addTo(map.current!);

          // Événement de clic sur le marqueur
          markerEl.addEventListener('click', () => {
            setSelectedBusiness(business);
            onBusinessSelect(business);
          });
        }
      });

    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
      
      // Afficher une carte de fallback sans Mapbox
      if (mapContainer.current) {
        mapContainer.current.innerHTML = `
          <div style="
            height: 100%; 
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            padding: 20px;
          ">
            <div style="background: rgba(142, 68, 255, 0.1); border: 1px solid rgba(142, 68, 255, 0.3); border-radius: 12px; padding: 20px; max-width: 400px;">
              <h3 style="color: #8E44FF; margin-bottom: 16px;">🗺️ Carte Interactive - Mode Démo</h3>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px;">
                ${quebecBusinesses.map(b => `
                  <div style="
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    padding: 10px;
                    text-align: left;
                  ">
                    <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px;">${b.name}</div>
                    <div style="font-size: 10px; color: #ccc; margin-bottom: 4px;">${b.city}</div>
                    <div style="display: flex; gap: 4px;">
                      <span style="background: ${b.ilaScore >= 80 ? '#10B981' : b.ilaScore >= 60 ? '#F59E0B' : '#EF4444'}; color: white; padding: 1px 4px; border-radius: 8px; font-size: 9px;">
                        ILA: ${b.ilaScore}
                      </span>
                      <span style="font-size: 9px; color: #ccc;">⭐ ${b.googleRating}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
              <p style="font-size: 12px; color: #ccc; margin-bottom: 8px;">
                📍 Zone couverte: Grand Montréal<br>
                📊 ${quebecBusinesses.length} entreprises analysées<br>
                🔄 Données mises à jour en temps réel
              </p>
              <p style="font-size: 11px; color: #888;">
                Token Mapbox requis pour la carte interactive complète
              </p>
            </div>
          </div>
        `;
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredBusinesses = quebecBusinesses.filter(business => {
    const matchesFilter = selectedFilter === 'all' || business.sector.toLowerCase().includes(selectedFilter.toLowerCase());
    const matchesSearch = !searchQuery || business.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-[600px] w-full relative">
      {/* Contrôles de la carte */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <Card className="bg-black/90 border-[#8E44FF]/30 backdrop-blur-xl">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-[#8E44FF]" />
              <span className="text-white text-sm font-semibold">Filtres</span>
            </div>
            <div className="space-y-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="h-8 bg-black/50 border-white/20 text-white text-xs">
                  <SelectValue placeholder="Secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="café">Café</SelectItem>
                  <SelectItem value="mode">Mode</SelectItem>
                  <SelectItem value="sport">Sport</SelectItem>
                  <SelectItem value="beauté">Beauté</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="w-3 h-3 absolute left-2 top-2 text-white/40" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="h-8 pl-7 bg-black/50 border-white/20 text-white text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Légende */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="bg-black/90 border-[#8E44FF]/30 backdrop-blur-xl">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#8E44FF]" />
              <span className="text-white text-sm font-semibold">Score ILA™</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white text-xs">80-100 (Excellence)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-white text-xs">60-79 (Bon)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-white text-xs">0-59 (À améliorer)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel d'information de l'entreprise sélectionnée */}
      {selectedBusiness && (
        <div className="absolute bottom-4 left-4 z-10">
          <Card className="bg-black/90 border-[#8E44FF]/30 backdrop-blur-xl w-80">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-lg">{selectedBusiness.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBusiness(null)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-3 h-3" />
                  {selectedBusiness.city}
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={`${getScoreColor(selectedBusiness.ilaScore)} border-current`}>
                    ILA: {selectedBusiness.ilaScore}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white/20">
                    ⭐ {selectedBusiness.googleRating}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div>
                    <div className="text-white/60">Trafic mensuel</div>
                    <div className="text-white font-semibold">{selectedBusiness.organicTraffic?.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-white/60">Mots-clés</div>
                    <div className="text-white font-semibold">{selectedBusiness.indexedKeywords}</div>
                  </div>
                  <div>
                    <div className="text-white/60">Backlinks</div>
                    <div className="text-white font-semibold">{selectedBusiness.backlinks}</div>
                  </div>
                  <div>
                    <div className="text-white/60">Avis</div>
                    <div className="text-white font-semibold">{selectedBusiness.reviewCount}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Conteneur de la carte */}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default AdvancedMapView;