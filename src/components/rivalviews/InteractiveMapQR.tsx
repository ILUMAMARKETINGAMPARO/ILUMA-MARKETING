// ✅ VERSION MAPBOX INTÉGRÉE – MEILLEURES PRATIQUES

import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageContext } from '@/contexts/LanguageContext';
import { RivalBusiness } from '@/types/rivalviews.ts';
import TooltipStatsBox from './TooltipStatsBox';
import { MapPin, Zap, TrendingUp, Search, Filter } from 'lucide-react';

interface InteractiveMapQRProps {
  businesses: RivalBusiness[];
  onBusinessClick: (business: RivalBusiness) => void;
  selectedBusiness: RivalBusiness | null;
}

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const InteractiveMapQR: React.FC<InteractiveMapQRProps> = ({ 
  businesses, 
  onBusinessClick, 
  selectedBusiness 
}) => {
  const { language = 'fr' } = React.useContext(LanguageContext) ?? {};
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [hoveredBusiness, setHoveredBusiness] = useState<RivalBusiness | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Debug: Check if token is available
    console.log('MAPBOX_ACCESS_TOKEN:', MAPBOX_ACCESS_TOKEN);
    
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error('Token Mapbox manquant! Vérifiez votre fichier .env.local');
      return;
    }

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-73.6, 45.5],
      zoom: 9
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear previous markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    businesses.forEach((business) => {
      const marker = new mapboxgl.Marker({ color: '#10B981' })
        .setLngLat([business.lng, business.lat])
        .addTo(mapInstance.current!);

      marker.getElement().addEventListener('click', (e) => {
        e.stopPropagation();
        onBusinessClick(business);
      });

      markersRef.current.push(marker);
    });
  }, [businesses]);

  const content = {
    fr: {
      title: "Carte Interactive - 130 Commerces Québécois",
      subtitle: "Cliquez sur un point pour analyser la performance SEO locale",
      legend: "Légende des scores ILA™",
      high: "Excellent (80-100)",
      medium: "Bon (60-79)",
      low: "À améliorer (0-59)",
      tooltip: "Survolez ou cliquez pour plus d'infos",
      compare: "Comparer",
      analyze: "Analyser en détail"
    },
  };

  const t = content[language as keyof typeof content];
if (!businesses || businesses.length === 0) {
  businesses = [
    {
      id: "1",
      name: "Test Restaurant",
      address: "123 Test Street",
      city: "Montréal",
      sector: "restaurant",
      googleRating: 4.5,
      reviewCount: 100,
      serpRank: 1,
      isSponsored: false,
      source: "GMB" as const,
      lat: 45.5017,
      lng: -73.5673,
      ilaScore: 85,
      status: "prospect" as const,
      potential: "high" as const,
      isChain: false,
      indexedKeywords: 50,
      top10Keywords: 10,
      backlinks: 25,
      organicTraffic: 1500,
      totalComments: 100,
      hasPhotos: true
    }
  ];
}

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Montserrat']">
            {t.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="glass-effect border-white/20 overflow-hidden">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-white font-['Montserrat']">
                <MapPin className="w-6 h-6 inline-block mr-2" />
                {t.tooltip}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div ref={mapRef} className="w-full h-[75vh] rounded-b-xl" />
            </CardContent>
          </Card>
        </motion.div>

        {selectedBusiness && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center gap-4 mt-8"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-['Montserrat']"
            >
              <Search className="w-5 h-5 mr-2" />
              {t.analyze}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
            >
              <Filter className="w-5 h-5 mr-2" />
              {t.compare}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default InteractiveMapQR;