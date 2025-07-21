import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation,
  Zap,
  Target,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Business {
  id: string;
  name: string;
  city: string;
  sector: string;
  lat: number;
  lng: number;
  ila_score: number;
  google_rating: number;
  review_count: number;
  address?: string;
}

const InteractiveMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('montreal');

  // Configuration des villes
  const CITIES = {
    montreal: { lat: 45.5017, lng: -73.5673, zoom: 11, name: 'Montréal' },
    laval: { lat: 45.6066, lng: -73.7124, zoom: 12, name: 'Laval' },
    quebec: { lat: 46.8139, lng: -71.2080, zoom: 11, name: 'Québec' },
    longueuil: { lat: 45.5411, lng: -73.5180, zoom: 12, name: 'Longueuil' }
  };

  // Charger les données
  const loadBusinessData = async (city?: string) => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('businesses')
        .select('id, name, city, sector, lat, lng, ila_score, google_rating, review_count, address')
        .not('lat', 'is', null)
        .not('lng', 'is', null);

      if (city) {
        query = query.ilike('city', `%${city}%`);
      }

      const { data, error } = await query.limit(100);

      if (error) {
        console.error('Erreur Supabase:', error);
        return;
      }

      if (data) {
        setBusinesses(data as Business[]);
      }
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBusinessData(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (cityKey: string) => {
    setSelectedCity(cityKey);
    setSelectedBusiness(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Vert
    if (score >= 60) return '#F59E0B'; // Jaune
    return '#EF4444'; // Rouge
  };

  const getScoreBadgeClass = (score: number) => {
    if (score >= 80) return 'bg-green-500 text-white';
    if (score >= 60) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="space-y-4">
      {/* Contrôles de navigation */}
      <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#8E44FF]" />
            Contrôles de Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recherche par ville */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Rechercher une ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40"
              />
            </div>

            {/* Sélection rapide de ville */}
            <div className="flex gap-2 flex-wrap">
              {Object.entries(CITIES).map(([key, city]) => (
                <Button
                  key={key}
                  variant={selectedCity === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCityChange(key)}
                  className={selectedCity === key 
                    ? "bg-[#8E44FF] text-white" 
                    : "border-white/20 text-white hover:bg-white/10"}
                >
                  {city.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-white/60 text-sm">
              {businesses.length} entreprise{businesses.length > 1 ? 's' : ''} dans la zone
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white/60">Score 80+</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-white/60">Score 60-79</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-white/60">Score 0-59</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone de carte et détails */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Carte (mode simulation) */}
        <Card className="lg:col-span-2 bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#8E44FF]" />
              Carte Interactive - {CITIES[selectedCity as keyof typeof CITIES]?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-lg h-96 overflow-hidden">
              {/* Simulation de carte avec points */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 opacity-20"></div>
              
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin w-8 h-8 border-2 border-[#8E44FF] border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <div className="absolute inset-0 p-4">
                  {/* Points simulés sur la carte */}
                  {businesses.slice(0, 15).map((business, index) => (
                    <motion.div
                      key={business.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${20 + (index % 8) * 10}%`,
                        top: `${20 + Math.floor(index / 8) * 15}%`,
                      }}
                      onClick={() => setSelectedBusiness(business)}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg hover:scale-110 transition-transform"
                        style={{ backgroundColor: getScoreColor(business.ila_score || 0) }}
                      >
                        {business.ila_score || 0}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Overlay d'informations */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl rounded-lg p-3">
                <p className="text-white/80 text-sm">
                  🗺️ Cliquez sur un point pour voir les détails
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panneau de détails */}
        <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#8E44FF]" />
              Détails Entreprise
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedBusiness ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-white font-semibold text-lg">{selectedBusiness.name}</h3>
                  <p className="text-white/60">{selectedBusiness.sector}</p>
                  <p className="text-white/80 text-sm">{selectedBusiness.address || selectedBusiness.city}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Score ILA™</span>
                    <Badge className={getScoreBadgeClass(selectedBusiness.ila_score || 0)}>
                      {selectedBusiness.ila_score || 0}/100
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Note Google</span>
                    <span className="text-white">{(selectedBusiness.google_rating || 0).toFixed(1)}/5</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Avis</span>
                    <span className="text-white">{selectedBusiness.review_count || 0}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button 
                    className="w-full bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Analyser en détail
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-[#FFD56B]/50 text-[#FFD56B] hover:bg-[#FFD56B]/20"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Ajouter au CRM
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">
                  Sélectionnez un point sur la carte pour voir les détails
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Liste des entreprises */}
      <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#8E44FF]" />
            Entreprises dans la Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.slice(0, 6).map((business, index) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedBusiness(business)}
                className="bg-white/5 border border-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{business.name}</h4>
                  <Badge className={getScoreBadgeClass(business.ila_score || 0)}>
                    {business.ila_score || 0}
                  </Badge>
                </div>
                <p className="text-white/60 text-xs">{business.sector}</p>
                <p className="text-white/40 text-xs">{business.city}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveMap;