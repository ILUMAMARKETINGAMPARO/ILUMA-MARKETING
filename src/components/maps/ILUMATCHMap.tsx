import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapbox } from '@/components/rivalviews/MapboxProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface ILUMATCHResult {
  business_id: string;
  business_name: string;
  match_type: string;
  match_score: number;
  sector: string;
  ila_score: number;
  location: [number, number];
  reason: string;
}

interface ILUMATCHMapProps {
  matches?: ILUMATCHResult[];
  onBusinessSelect?: (businessId: string) => void;
  className?: string;
}

const ILUMATCHMap: React.FC<ILUMATCHMapProps> = ({ 
  matches = [], 
  onBusinessSelect,
  className = ""
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { token, isReady } = useMapbox();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<ILUMATCHResult | null>(null);

  // Logging des interactions avec la carte
  const logMapInteraction = async (actionType: string, data: any) => {
    try {
      await supabase.from('map_interactions').insert({
        action_type: actionType,
        page_context: 'ilumatch',
        interaction_data: data,
        location_data: data.location || {}
      });
    } catch (error) {
      console.error('Erreur lors du logging:', error);
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !token || !isReady) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-73.566, 45.501], // Montréal par défaut
      zoom: 11
    });

    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Log de l'initialisation de la carte
    logMapInteraction('map_init', { 
      center: [-73.566, 45.501], 
      zoom: 11,
      matches_count: matches.length 
    });

    // Ajouter les marqueurs pour chaque match
    matches.forEach((match) => {
      if (match.location && match.location.length === 2) {
        const el = document.createElement('div');
        el.className = 'ilumatch-marker';
        el.style.cssText = `
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8E44FF, #F5D06F);
          border: 3px solid rgba(255, 255, 255, 0.8);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: 12px;
          box-shadow: 0 4px 12px rgba(142, 68, 255, 0.4);
          transition: transform 0.2s ease;
        `;
        el.textContent = Math.round(match.match_score).toString();

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.2)';
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
        });

        const popup = new mapboxgl.Popup({
          offset: 25,
          className: 'ilumatch-popup'
        }).setHTML(`
          <div class="p-3 bg-black/90 backdrop-blur-xl border border-[#8E44FF]/30 rounded-lg">
            <h3 class="text-white font-semibold mb-1">${match.business_name}</h3>
            <p class="text-[#F5D06F] text-sm mb-2">Match Score: ${match.match_score}%</p>
            <p class="text-gray-300 text-xs mb-2">${match.match_type}</p>
            <p class="text-gray-400 text-xs">${match.reason}</p>
            <div class="mt-2 flex gap-1">
              <span class="bg-[#8E44FF]/20 text-[#8E44FF] px-2 py-1 rounded text-xs">${match.sector}</span>
              <span class="bg-[#F5D06F]/20 text-[#F5D06F] px-2 py-1 rounded text-xs">ILA: ${match.ila_score}</span>
            </div>
          </div>
        `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat(match.location as [number, number])
          .setPopup(popup)
          .addTo(map.current!);

        el.addEventListener('click', () => {
          setSelectedMatch(match);
          logMapInteraction('business_select', {
            business_id: match.business_id,
            match_score: match.match_score,
            location: match.location
          });
          onBusinessSelect?.(match.business_id);
        });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [token, isReady, matches]);

  const filteredMatches = matches.filter(match => 
    match.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isReady) {
    return (
      <Card className={`bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl ${className}`}>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8E44FF]"></div>
            <span className="ml-3 text-white">Chargement de la carte ILUMATCH...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Contrôles de recherche */}
      <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#F5D06F]" />
            Carte des Matches ILUMATCH™
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une entreprise ou secteur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/20 border-[#8E44FF]/30 text-white placeholder-gray-400"
                aria-label="Rechercher dans les matches ILUMATCH"
              />
            </div>
            <Button variant="outline" className="border-[#8E44FF]/30 text-[#8E44FF]">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Statistiques */}
          <div className="flex gap-4 text-sm text-gray-300">
            <Badge variant="outline" className="border-[#F5D06F]/30 text-[#F5D06F]">
              {filteredMatches.length} matches trouvés
            </Badge>
            <Badge variant="outline" className="border-[#8E44FF]/30 text-[#8E44FF]">
              Score moyen: {Math.round(filteredMatches.reduce((acc, m) => acc + m.match_score, 0) / filteredMatches.length || 0)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Carte interactive */}
      <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl overflow-hidden">
        <div 
          ref={mapContainer}
          className="w-full h-[500px] rounded-lg"
          style={{ touchAction: 'manipulation' }}
        />
      </Card>

      {/* Détails du match sélectionné */}
      {selectedMatch && (
        <Card className="bg-black/40 border-[#F5D06F]/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-[#F5D06F]">Match Sélectionné</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-white font-semibold text-lg mb-2">{selectedMatch.business_name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Score de Match:</span>
                <span className="text-[#F5D06F] font-semibold ml-2">{selectedMatch.match_score}%</span>
              </div>
              <div>
                <span className="text-gray-400">Score ILA:</span>
                <span className="text-[#8E44FF] font-semibold ml-2">{selectedMatch.ila_score}</span>
              </div>
              <div>
                <span className="text-gray-400">Type de Match:</span>
                <span className="text-white ml-2">{selectedMatch.match_type}</span>
              </div>
              <div>
                <span className="text-gray-400">Secteur:</span>
                <span className="text-white ml-2">{selectedMatch.sector}</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-400 text-sm">Raison du Match:</span>
              <p className="text-gray-300 text-sm mt-1">{selectedMatch.reason}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ILUMATCHMap;