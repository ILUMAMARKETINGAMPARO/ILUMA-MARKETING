import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Map, 
  Upload, 
  Filter, 
  Download, 
  Search, 
  Users, 
  TrendingUp, 
  MapPin,
  Phone,
  Mail,
  Star,
  ExternalLink,
  Plus,
  Eye
} from 'lucide-react';
import { BusinessData, HeatmapFilters } from '@/types/heatmap';
import { parseBusinessData } from '@/utils/heatmapDataParser';

interface HeatmapInterfaceProps {
  businesses: BusinessData[];
  onBusinessesLoad: (businesses: BusinessData[]) => void;
  onBusinessSelect: (business: BusinessData | null) => void;
  selectedBusiness: BusinessData | null;
}

const HeatmapInterface: React.FC<HeatmapInterfaceProps> = ({
  businesses,
  onBusinessesLoad,
  onBusinessSelect,
  selectedBusiness
}) => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Partial<HeatmapFilters>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const parsedBusinesses = parseBusinessData(text);
    onBusinessesLoad(parsedBusinesses);
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = !filters.cities?.length || filters.cities.includes(business.city);
    const matchesSector = !filters.sectors?.length || filters.sectors.includes(business.sector);
    
    return matchesSearch && matchesCity && matchesSector;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-400/10';
    if (score >= 60) return 'text-yellow-400 bg-yellow-400/10';
    if (score >= 40) return 'text-orange-400 bg-orange-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  const stats = {
    total: businesses.length,
    avgScore: Math.round(businesses.reduce((sum, b) => sum + b.ilaScore.overall, 0) / businesses.length) || 0,
    highPotential: businesses.filter(b => b.ilaScore.overall >= 75).length,
    contacted: businesses.filter(b => b.status === 'contacted').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white font-['Montserrat'] mb-2">
                Heatmap ILA™ Intelligente
              </h1>
              <p className="text-white/60 font-['Montserrat']">
                Analyse géospatiale des scores ILA™ et opportunities de prospection
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] font-['Montserrat']"
              >
                <Upload className="w-4 h-4 mr-2" />
                Importer Données
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white font-['Montserrat']"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Entreprises', value: stats.total, icon: Users, color: 'text-blue-400' },
              { label: 'Score ILA™ Moyen', value: stats.avgScore, icon: TrendingUp, color: 'text-[#FFD56B]' },
              { label: 'Fort Potentiel', value: stats.highPotential, icon: Star, color: 'text-green-400' },
              { label: 'Contactées', value: stats.contacted, icon: Phone, color: 'text-purple-400' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="glass-effect border-white/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-black/20`}>
                      <IconComponent className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${stat.color} font-['Montserrat']`}>
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-sm font-['Montserrat']">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Contrôles et Filtres */}
        <Card className="glass-effect border-white/20 p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                <Input
                  placeholder="Rechercher par nom ou adresse..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/20 border-white/20 text-white"
                />
              </div>
            </div>
            
            <Select onValueChange={(value) => setFilters(prev => ({ ...prev, cities: [value] }))}>
              <SelectTrigger className="w-48 bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                <SelectItem value="Montréal">Montréal</SelectItem>
                <SelectItem value="Laval">Laval</SelectItem>
                <SelectItem value="Brossard">Brossard</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-white/20 text-white">
              <Filter className="w-4 h-4 mr-2" />
              Filtres Avancés
            </Button>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-black/20 border border-white/10">
            <TabsTrigger value="map" className="data-[state=active]:bg-[#8E44FF]/20">
              <Map className="w-4 h-4 mr-2" />
              Carte Interactive
            </TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-[#8E44FF]/20">
              <Users className="w-4 h-4 mr-2" />
              Liste Détaillée
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#8E44FF]/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <Card className="glass-effect border-white/20 p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-[#8E44FF] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                  Carte Interactive ILA™
                </h3>
                <p className="text-white/60 font-['Montserrat'] mb-4">
                  Visualisation géospatiale des scores et clusters d'opportunités
                </p>
                <Badge className="bg-[#FFD56B]/20 text-[#FFD56B]">
                  Intégration Mapbox en cours
                </Badge>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredBusinesses.map((business) => (
                <Card key={business.id} className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-white font-['Montserrat']">
                          {business.name}
                        </h3>
                        <Badge className={`px-2 py-1 text-xs ${getScoreColor(business.ilaScore.overall)}`}>
                          ILA™ {business.ilaScore.overall}
                        </Badge>
                        {business.isSponsored && (
                          <Badge className="bg-yellow-500/20 text-yellow-400">
                            Sponsorisé
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {business.address}, {business.city}
                        </div>
                        {business.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {business.phone}
                          </div>
                        )}
                        {business.googleRating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {business.googleRating} ({business.reviewCount} avis)
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {business.sector.replace('_', ' ')}
                        </Badge>
                        <Badge className={`${
                          business.status === 'prospect' ? 'bg-gray-500/20 text-gray-400' :
                          business.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                          business.status === 'client' ? 'bg-green-500/20 text-green-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {business.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white"
                        onClick={() => onBusinessSelect(business)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B]"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        CRM
                      </Button>
                      {business.gmbLink && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white"
                          onClick={() => window.open(business.gmbLink, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-effect border-white/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
                  Distribution des Scores ILA™
                </h3>
                <div className="space-y-4">
                  {[
                    { range: '80-100', count: businesses.filter(b => b.ilaScore.overall >= 80).length, color: 'bg-green-400' },
                    { range: '60-79', count: businesses.filter(b => b.ilaScore.overall >= 60 && b.ilaScore.overall < 80).length, color: 'bg-yellow-400' },
                    { range: '40-59', count: businesses.filter(b => b.ilaScore.overall >= 40 && b.ilaScore.overall < 60).length, color: 'bg-orange-400' },
                    { range: '0-39', count: businesses.filter(b => b.ilaScore.overall < 40).length, color: 'bg-red-400' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${item.color}`}></div>
                        <span className="text-white font-['Montserrat']">{item.range}</span>
                      </div>
                      <span className="text-white/60 font-['Montserrat']">{item.count} entreprises</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-effect border-white/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
                  Répartition par Ville
                </h3>
                <div className="space-y-3">
                  {Object.entries(
                    businesses.reduce((acc, business) => {
                      acc[business.city] = (acc[business.city] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([city, count]) => (
                    <div key={city} className="flex items-center justify-between">
                      <span className="text-white font-['Montserrat']">{city}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-black/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B]"
                            style={{ width: `${(count / businesses.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white/60 font-['Montserrat'] text-sm">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default HeatmapInterface;