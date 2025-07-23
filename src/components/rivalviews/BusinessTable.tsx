import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  MapPin, 
  Star, 
  TrendingUp,
  Eye,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';

interface BusinessTableProps {
  businesses?: RivalBusiness[];
  onBusinessClick?: (business: RivalBusiness) => void;
  selectedBusiness?: RivalBusiness | null;
  onCompareClick?: (business: RivalBusiness) => void;
}

const BusinessTable: React.FC<BusinessTableProps> = ({
  businesses = [],
  onBusinessClick = () => {},
  selectedBusiness = null,
  onCompareClick = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<keyof RivalBusiness>('ilaScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data si aucune donnée fournie
  const mockData: RivalBusiness[] = [
    {
      id: '1',
      name: 'Restaurant Le Gourmet',
      city: 'Montréal',
      sector: 'Restaurant',
      address: '123 rue Sainte-Catherine, Montréal',
      lat: 45.5017,
      lng: -73.5673,
      ilaScore: 85,
      organicTraffic: 15420,
      indexedKeywords: 245,
      reviewCount: 128,
      googleRating: 4.6,
      serpRank: 3,
      isSponsored: false,
      source: 'GMB' as const,
      phone: '(514) 123-4567',
      website: 'https://legourmet.ca',
      status: 'prospect' as const,
      potential: 'high' as const,
      isChain: false,
      top10Keywords: 45,
      backlinks: 1250,
      totalComments: 45,
      hasPhotos: true
    },
    {
      id: '2', 
      name: 'Meubles Design Plus',
      city: 'Laval',
      sector: 'Meubles',
      address: '456 boul. des Laurentides, Laval',
      lat: 45.6066,
      lng: -73.7124,
      ilaScore: 72,
      organicTraffic: 8930,
      indexedKeywords: 156,
      reviewCount: 89,
      googleRating: 4.3,
      serpRank: 7,
      isSponsored: true,
      source: 'SEO' as const,
      phone: '(450) 987-6543',
      website: 'https://meublesdesignplus.ca',
      status: 'contacted' as const,
      potential: 'medium' as const,
      isChain: false,
      top10Keywords: 23,
      backlinks: 890,
      totalComments: 23,
      hasPhotos: false
    }
  ];

  const dataToUse = businesses.length > 0 ? businesses : mockData;

  // Filtrage et tri des données
  const filteredAndSortedBusinesses = useMemo(() => {
    let filtered = dataToUse.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           business.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           business.sector.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSector = filterSector === 'all' || business.sector === filterSector;
      
      return matchesSearch && matchesSector;
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [dataToUse, searchQuery, sortBy, sortOrder, filterSector]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBusinesses.length / itemsPerPage);
  const paginatedBusinesses = filteredAndSortedBusinesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Secteurs uniques pour le filtre
  const uniqueSectors = [...new Set(dataToUse.map(b => b.sector))];

  const handleSort = (key: keyof RivalBusiness) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      {/* Contrôles de filtrage */}
      <Card className="bg-black/50 border-[#8E44FF]/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtres & Recherche
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, ville..."
                className="pl-10 bg-black/50 border-[#8E44FF]/30 text-white"
              />
            </div>

            {/* Filtre par secteur */}
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="bg-black/50 border-[#8E44FF]/30 text-white">
                <SelectValue placeholder="Tous les secteurs" />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#8E44FF]/30">
                <SelectItem value="all" className="text-white">Tous les secteurs</SelectItem>
                {uniqueSectors.map(sector => (
                  <SelectItem key={sector} value={sector} className="text-white">
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Statistiques */}
            <div className="text-white/60 text-sm flex items-center justify-end">
              {filteredAndSortedBusinesses.length} entreprise(s) • Page {currentPage}/{totalPages || 1}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des données */}
      <Card className="bg-black/50 border-[#8E44FF]/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#8E44FF]/10 border-b border-[#8E44FF]/20">
                <tr>
                  <th className="text-left p-4 text-white font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('name')}
                      className="text-white hover:bg-white/10 p-0 h-auto"
                    >
                      Entreprise
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-4 text-white font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('city')}
                      className="text-white hover:bg-white/10 p-0 h-auto"
                    >
                      Localisation
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-4 text-white font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('ilaScore')}
                      className="text-white hover:bg-white/10 p-0 h-auto"
                    >
                      Score ILA™
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-4 text-white font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('googleRating')}
                      className="text-white hover:bg-white/10 p-0 h-auto"
                    >
                      Google
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-left p-4 text-white font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('organicTraffic')}
                      className="text-white hover:bg-white/10 p-0 h-auto"
                    >
                      SEO
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </Button>
                  </th>
                  <th className="text-center p-4 text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBusinesses.map((business, index) => (
                  <tr
                    key={business.id}
                    className={`border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer ${
                      selectedBusiness?.id === business.id ? 'bg-[#8E44FF]/10' : ''
                    }`}
                    onClick={() => onBusinessClick(business)}
                  >
                    <td className="p-4">
                      <div>
                        <div className="text-white font-medium">{business.name}</div>
                        <div className="text-white/60 text-sm">{business.sector}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-white/80">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{business.city}</span>
                      </div>
                      {business.distanceFromUser && (
                        <div className="text-white/60 text-xs">
                          {business.distanceFromUser.toFixed(1)} km
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge className={`${getScoreBadgeColor(business.ilaScore)} text-white`}>
                        {business.ilaScore}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-white text-sm">{business.googleRating.toFixed(1)}</span>
                      </div>
                      <div className="text-white/60 text-xs">
                        {business.reviewCount} avis
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-white text-sm">{business.organicTraffic.toLocaleString()}</span>
                      </div>
                      <div className="text-white/60 text-xs">
                        {business.top10Keywords} TOP 10
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBusinessClick(business);
                          }}
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/10"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCompareClick(business);
                          }}
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/10"
                        >
                          <ArrowLeftRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-white/10">
              <div className="text-white/60 text-sm">
                {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedBusinesses.length)} sur {filteredAndSortedBusinesses.length}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center px-3 text-white/80 text-sm">
                  {currentPage} / {totalPages}
                </div>
                <Button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessTable;