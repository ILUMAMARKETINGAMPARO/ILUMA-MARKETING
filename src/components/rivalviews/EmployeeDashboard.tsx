import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RivalBusiness } from '@/types/rivalviews.ts';
import { supabase } from '@/integrations/supabase/client.ts';
import { 
  Users, 
  Download, 
  Search, 
  Plus, 
  MapPin, 
  TrendingUp, 
  Star,
  Eye,
  Calendar,
  Target,
  Brain,
  X,
  Settings,
  Filter,
  Database,
  BarChart3
} from 'lucide-react';
import APIIntegrationManager from './APIIntegrationManager';
import OperationalAPIManager from './OperationalAPIManager';
import AhrefsDataImporter from './AhrefsDataImporter';
import BusinessStatsDisplay from './BusinessStatsDisplay';
import CRMManager from './CRMManager';
import PersonalDashboard from './PersonalDashboard';
import IntelligentNotifications from './IntelligentNotifications';
import LiveILACalculator from './LiveILACalculator';
import AutoDataEnrichment from './AutoDataEnrichment';

interface EmployeeDashboardProps {
  businesses: RivalBusiness[];
  onBusinessSelect: (business: RivalBusiness) => void;
  onClose: () => void;
  isVisible: boolean;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  businesses,
  onBusinessSelect,
  onClose,
  isVisible
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionCity, setExtractionCity] = useState('');
  const [extractionSector, setExtractionSector] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'extraction' | 'analytics' | 'operational' | 'crm' | 'personal'>('overview');
  const [realTimeData, setRealTimeData] = useState(businesses);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [realBusinesses, setRealBusinesses] = useState<any[]>([]);

  // Load real businesses from database for CRM
  useEffect(() => {
    const loadRealBusinesses = async () => {
      try {
        const { data } = await supabase
          .from('businesses')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (data) {
          setRealBusinesses(data);
        }
      } catch (error) {
        console.error('Error loading businesses:', error);
      }
    };

    if (activeTab === 'crm') {
      loadRealBusinesses();
    }
  }, [activeTab, refreshTrigger]);

  // Get unique values for filters
  const cities = Array.from(new Set(businesses.map(b => b.city))).sort();
  const sectors = Array.from(new Set(businesses.map(b => b.sector))).sort();
  
  // Filter businesses based on search and filters
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = !searchQuery || 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = !selectedCity || selectedCity === 'all' || business.city === selectedCity;
    const matchesSector = !selectedSector || selectedSector === 'all' || business.sector === selectedSector;
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || business.status === selectedStatus;
    
    return matchesSearch && matchesCity && matchesSector && matchesStatus;
  });

  // Statistics
  const stats = {
    total: businesses.length,
    prospects: businesses.filter(b => b.status === 'prospect').length,
    contacted: businesses.filter(b => b.status === 'contacted').length,
    clients: businesses.filter(b => b.status === 'client').length,
    averageILA: Math.round(businesses.reduce((acc, b) => acc + b.ilaScore, 0) / businesses.length),
    highPotential: businesses.filter(b => b.potential === 'high').length
  };

  const handleExtractFromAPI = async () => {
    if (!extractionCity || !extractionSector) {
      alert('Veuillez sélectionner une ville et un secteur pour l\'extraction');
      return;
    }

    setIsExtracting(true);
    
    // Simulate API extraction process
    try {
      // Here you would call Google Places API
      console.log(`Extracting businesses from ${extractionCity} in ${extractionSector} sector...`);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll show a success message
      alert(`Extraction terminée ! ${Math.floor(Math.random() * 20 + 5)} nouvelles entreprises ajoutées.`);
      
      // Reset form
      setExtractionCity('');
      setExtractionSector('');
    } catch (error) {
      console.error('Extraction failed:', error);
      alert('Erreur lors de l\'extraction. Veuillez réessayer.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleExportData = () => {
    const exportData = {
      businesses: filteredBusinesses,
      stats,
      generatedAt: new Date().toISOString(),
      filters: {
        city: selectedCity === 'all' ? '' : selectedCity,
        sector: selectedSector === 'all' ? '' : selectedSector,
        status: selectedStatus === 'all' ? '' : selectedStatus,
        search: searchQuery
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rivalviews-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospect': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'client': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'lost': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <Card className="mb-6 bg-black/90 border-[#8E44FF]/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-6 h-6 text-[#8E44FF]" />
                    <div>
                      <CardTitle className="text-white text-2xl font-['Montserrat']">
                        Dashboard Employé - RivalViews™
                      </CardTitle>
                      <p className="text-white/60">Gestion et extraction de données concurrentielles en temps réel</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <IntelligentNotifications />
                    <div className="flex bg-black/30 rounded-lg p-1">
                      <Button
                        variant={activeTab === 'overview' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab('overview')}
                        className={activeTab === 'overview' ? 'bg-[#8E44FF] text-white' : 'text-white/60'}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Vue d'ensemble
                      </Button>
                      <Button
                        variant={activeTab === 'extraction' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab('extraction')}
                        className={activeTab === 'extraction' ? 'bg-[#8E44FF] text-white' : 'text-white/60'}
                      >
                        <Database className="w-4 h-4 mr-2" />
                        API Extraction
                      </Button>
                      <Button
                        variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab('analytics')}
                        className={activeTab === 'analytics' ? 'bg-[#8E44FF] text-white' : 'text-white/60'}
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Analytics IA
                      </Button>
                      <Button
                        variant={activeTab === 'operational' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab('operational')}
                        className={activeTab === 'operational' ? 'bg-[#8E44FF] text-white' : 'text-white/60'}
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Opérationnel
                      </Button>
                      <Button
                        variant={activeTab === 'crm' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab('crm')}
                        className={activeTab === 'crm' ? 'bg-[#8E44FF] text-white' : 'text-white/60'}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        CRM
                      </Button>
                      <Button
                        variant={activeTab === 'personal' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab('personal')}
                        className={activeTab === 'personal' ? 'bg-[#8E44FF] text-white' : 'text-white/60'}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Mon Dashboard
                      </Button>
                    </div>
                    <Button
                      onClick={onClose}
                      variant="ghost"
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

          {/* Statistiques intelligentes Iluma™ */}
          <div className="mb-8">
            <BusinessStatsDisplay refreshTrigger={refreshTrigger} />
          </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Filters */}
                <div className="space-y-6">
                  {/* Filters */}
                  <Card className="bg-black/50 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filtres
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">Recherche</label>
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-3 text-white/40" />
                          <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Nom ou adresse..."
                            className="pl-10 bg-black/30 border-white/20 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">Ville</label>
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                          <SelectTrigger className="bg-black/30 border-white/20 text-white">
                            <SelectValue placeholder="Toutes les villes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes les villes</SelectItem>
                            {cities.map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-white/60 text-sm mb-2 block">Secteur</label>
                        <Select value={selectedSector} onValueChange={setSelectedSector}>
                          <SelectTrigger className="bg-black/30 border-white/20 text-white">
                            <SelectValue placeholder="Tous les secteurs" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les secteurs</SelectItem>
                            {sectors.map(sector => (
                              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-white/60 text-sm mb-2 block">Statut</label>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                          <SelectTrigger className="bg-black/30 border-white/20 text-white">
                            <SelectValue placeholder="Tous les statuts" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="prospect">Prospect</SelectItem>
                            <SelectItem value="contacted">Contacté</SelectItem>
                            <SelectItem value="client">Client</SelectItem>
                            <SelectItem value="lost">Perdu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={handleExportData}
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Exporter ({filteredBusinesses.length})
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Business List */}
                <div className="lg:col-span-2">
                  <Card className="bg-black/50 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Entreprises ({filteredBusinesses.length})
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-[600px] overflow-auto">
                        {filteredBusinesses.map((business) => (
                          <Card 
                            key={business.id} 
                            className="bg-white/5 border-white/10 hover:border-[#8E44FF]/30 transition-colors cursor-pointer"
                            onClick={() => onBusinessSelect(business)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white font-semibold truncate">{business.name}</h3>
                                <div className="flex items-center gap-2">
                                  <div className="text-[#8E44FF] font-bold">{business.ilaScore}</div>
                                  <Badge 
                                    variant="outline" 
                                    className={getStatusColor(business.status)}
                                  >
                                    {business.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {business.city}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  {business.googleRating?.toFixed(1)} ★
                                </span>
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  {business.organicTraffic?.toLocaleString() || 'N/A'}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                  {business.sector}
                                </Badge>
                                <div className={`text-xs font-semibold ${getPotentialColor(business.potential)}`}>
                                  Potentiel {business.potential}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* API Extraction Tab */}
            {activeTab === 'extraction' && (
              <div className="space-y-6">
                <AhrefsDataImporter 
                  onImportComplete={() => {
                    setRefreshTrigger(prev => prev + 1);
                    console.log('Import Ahrefs terminé');
                  }}
                />
                <APIIntegrationManager 
                  onDataExtracted={(data) => {
                    console.log('Données extraites:', data);
                    setRealTimeData(prev => [...prev, ...data]);
                    setRefreshTrigger(prev => prev + 1);
                  }}
                />
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LiveILACalculator 
                  onScoreCalculated={(score, breakdown) => {
                    console.log('Score calculé:', score, breakdown);
                  }}
                />
                <AutoDataEnrichment />
                
                <Card className="bg-black/50 border-white/20 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Insights Concurrentiels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <Target className="w-16 h-16 text-white/50 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Analyses concurrentielles</h3>
                        <p className="text-white/60">
                          Cartographie des opportunités de marché et analyse des écarts concurrentiels.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
          )}

          {/* Operational Tab */}
            {activeTab === 'operational' && (
              <OperationalAPIManager 
                onDataEnriched={(data) => {
                  console.log('Données enrichies:', data);
                  setRealTimeData(prev => [...prev, ...data]);
                  setRefreshTrigger(prev => prev + 1);
                }}
              />
            )}

            {/* CRM Tab */}
            {activeTab === 'crm' && (
              <div className="space-y-6">
                <Card className="bg-black/50 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      CRM et Suivi Commercial
                    </CardTitle>
                  </CardHeader>
                </Card>
                <CRMManager 
                  businesses={realBusinesses}
                  onBusinessUpdate={() => {
                    setRefreshTrigger(prev => prev + 1);
                  }}
                />
              </div>
            )}

            {/* Personal Dashboard Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <Card className="bg-black/50 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Mon Tableau de Bord Personnel
                    </CardTitle>
                  </CardHeader>
                </Card>
                <div className="bg-black/50 border-white/20 rounded-lg p-6">
                  <PersonalDashboard />
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;