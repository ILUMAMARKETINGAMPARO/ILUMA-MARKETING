import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  Target, 
  TrendingUp,
  Search,
  MapPin,
  Star,
  BarChart3,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';

interface CityViewProps {
  businesses: RivalBusiness[];
  selectedBusinesses: string[];
  setSelectedBusinesses: (selected: string[]) => void;
  showFiltersPanel: boolean;
}

interface CityStats {
  city: string;
  businesses: RivalBusiness[];
  totalCount: number;
  clientsCount: number;
  prospectsCount: number;
  avgIlaScore: number;
  avgGoogleRating: number;
  totalTraffic: number;
  potential: 'high' | 'medium' | 'low';
}

const CityView: React.FC<CityViewProps> = ({
  businesses,
  selectedBusinesses,
  setSelectedBusinesses,
  showFiltersPanel
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'count' | 'score' | 'traffic' | 'rating'>('count');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Grouper les entreprises par ville et calculer les statistiques
  const cityStats = useMemo(() => {
    const grouped = businesses.reduce((acc, business) => {
      if (!acc[business.city]) {
        acc[business.city] = [];
      }
      acc[business.city].push(business);
      return acc;
    }, {} as Record<string, RivalBusiness[]>);

    const stats: CityStats[] = Object.entries(grouped).map(([city, cityBusinesses]) => {
      const totalCount = cityBusinesses.length;
      const clientsCount = cityBusinesses.filter(b => b.status === 'client').length;
      const prospectsCount = cityBusinesses.filter(b => b.status === 'prospect').length;
      const avgIlaScore = cityBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / totalCount;
      const avgGoogleRating = cityBusinesses.reduce((sum, b) => sum + b.googleRating, 0) / totalCount;
      const totalTraffic = cityBusinesses.reduce((sum, b) => sum + b.organicTraffic, 0);
      
      let potential: 'high' | 'medium' | 'low' = 'low';
      if (avgIlaScore >= 70 && prospectsCount >= 5) potential = 'high';
      else if (avgIlaScore >= 50 && prospectsCount >= 2) potential = 'medium';

      return {
        city,
        businesses: cityBusinesses,
        totalCount,
        clientsCount,
        prospectsCount,
        avgIlaScore: Math.round(avgIlaScore),
        avgGoogleRating: Math.round(avgGoogleRating * 10) / 10,
        totalTraffic,
        potential
      };
    });

    // Filtrage par recherche
    const filtered = searchTerm 
      ? stats.filter(stat => stat.city.toLowerCase().includes(searchTerm.toLowerCase()))
      : stats;

    // Tri
    return filtered.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (sortBy) {
        case 'score':
          aValue = a.avgIlaScore;
          bValue = b.avgIlaScore;
          break;
        case 'traffic':
          aValue = a.totalTraffic;
          bValue = b.totalTraffic;
          break;
        case 'rating':
          aValue = a.avgGoogleRating;
          bValue = b.avgGoogleRating;
          break;
        default:
          aValue = a.totalCount;
          bValue = b.totalCount;
      }

      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });
  }, [businesses, searchTerm, sortBy, sortOrder]);

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const handleCitySelect = (cityData: CityStats) => {
    setSelectedCity(selectedCity === cityData.city ? null : cityData.city);
  };

  const toggleBusinessSelection = (businessId: string) => {
    if (selectedBusinesses.includes(businessId)) {
      setSelectedBusinesses(selectedBusinesses.filter(id => id !== businessId));
    } else {
      setSelectedBusinesses([...selectedBusinesses, businessId]);
    }
  };

  const selectAllInCity = (cityBusinesses: RivalBusiness[]) => {
    const cityIds = cityBusinesses.map(b => b.id);
    const newSelection = [...new Set([...selectedBusinesses, ...cityIds])];
    setSelectedBusinesses(newSelection);
  };

  return (
    <div className="space-y-6">
      {/* Panneau de contrôles */}
      <Card className="glass-effect border-white/20 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <Input
              placeholder="Rechercher une ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-white/20 text-white"
            />
          </div>
          
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="bg-black/20 border-white/20 text-white">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20">
              <SelectItem value="count">Nombre d'entreprises</SelectItem>
              <SelectItem value="score">Score ILA™ moyen</SelectItem>
              <SelectItem value="traffic">Trafic total</SelectItem>
              <SelectItem value="rating">Note Google moyenne</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            {sortOrder === 'desc' ? <ArrowDown className="w-4 h-4 mr-2" /> : <ArrowUp className="w-4 h-4 mr-2" />}
            {sortOrder === 'desc' ? 'Décroissant' : 'Croissant'}
          </Button>

          <div className="text-sm text-white/60 flex items-center justify-end">
            <Building2 className="w-4 h-4 mr-1" />
            {cityStats.length} ville{cityStats.length !== 1 ? 's' : ''}
          </div>
        </div>
      </Card>

      {/* Liste des villes */}
      <div className="space-y-4">
        {cityStats.map((cityData) => (
          <motion.div key={cityData.city} layout>
            <Card className={`glass-effect border-white/20 overflow-hidden ${
              selectedCity === cityData.city ? 'ring-2 ring-[#8E44FF]/50' : ''
            }`}>
              {/* En-tête de la ville */}
              <div 
                className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => handleCitySelect(cityData)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white font-['Montserrat']">
                          {cityData.city}
                        </h3>
                        <Badge className={`${getPotentialColor(cityData.potential)} border`}>
                          Potentiel {cityData.potential}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          <span>{cityData.totalCount} entreprises</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-green-400" />
                          <span>{cityData.clientsCount} clients</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4 text-yellow-400" />
                          <span>{cityData.prospectsCount} prospects</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#FFD56B]">
                          {cityData.avgIlaScore}/100
                        </div>
                        <div className="text-xs text-white/60">Score ILA™</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400 flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {cityData.avgGoogleRating}
                        </div>
                        <div className="text-xs text-white/60">Note Google</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {(cityData.totalTraffic / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-white/60">Trafic/mois</div>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAllInCity(cityData.businesses);
                      }}
                      className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                    >
                      Tout sélectionner
                    </Button>
                  </div>
                </div>
              </div>

              {/* Détail des entreprises de la ville */}
              {selectedCity === cityData.city && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10"
                >
                  <div className="p-6 bg-black/20">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Entreprises à {cityData.city}
                    </h4>
                    
                    <div className="grid gap-3">
                      {cityData.businesses.map((business) => (
                        <div 
                          key={business.id}
                          className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/40 transition-colors"
                        >
                          <Checkbox
                            checked={selectedBusinesses.includes(business.id)}
                            onCheckedChange={() => toggleBusinessSelection(business.id)}
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-medium">
                                {business.name}
                              </span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  business.status === 'client' ? 'border-green-400 text-green-400' :
                                  business.status === 'prospect' ? 'border-yellow-400 text-yellow-400' :
                                  business.status === 'contacted' ? 'border-blue-400 text-blue-400' :
                                  'border-red-400 text-red-400'
                                }`}
                              >
                                {business.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-white/60">
                              {business.sector} • Score ILA™: {business.ilaScore}/100
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {cityStats.length === 0 && (
        <Card className="glass-effect border-white/20 p-12 text-center">
          <Building2 className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
            Aucune ville trouvée
          </h3>
          <p className="text-white/60 font-['Montserrat']">
            Ajustez vos critères de recherche
          </p>
        </Card>
      )}
    </div>
  );
};

export default CityView;