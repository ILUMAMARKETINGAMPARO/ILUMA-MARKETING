import React, { useState, useMemo } from 'react';
import { RivalBusiness } from '@/types/rivalviews';
import { ProfessionalMapController } from './ProfessionalMapController';
import { ProfessionalControls } from './ProfessionalControls';
import { ProfessionalLegend } from './ProfessionalLegend';
import CompetitorInsightsDashboard from './CompetitorInsightsDashboard';
import EnhancedAnalyticsDashboard from './EnhancedAnalyticsDashboard';
import DiscoveryMode from './DiscoveryMode';

interface ProfessionalMapInterfaceProps {
  businesses: RivalBusiness[];
  onBusinessClick?: (business: RivalBusiness) => void;
  filters?: {
    sector?: string;
    scoreMin?: number;
    scoreMax?: number;
  };
}

export const ProfessionalMapInterface: React.FC<ProfessionalMapInterfaceProps> = ({
  businesses,
  onBusinessClick,
  filters = {}
}) => {
  // États locaux pour les contrôles
  const [mapStyle, setMapStyle] = useState<'light' | 'dark' | 'satellite'>('satellite');
  const [clustering, setClustering] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState(filters.sector || 'all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'analytics' | 'discovery' | 'insights'>('map');

  // Données dérivées
  const availableSectors = useMemo(() => {
    const sectors = [...new Set(businesses.map(b => b.sector))];
    return sectors.sort();
  }, [businesses]);

  const availableCities = useMemo(() => {
    const cities = [...new Set(businesses.map(b => b.city))];
    return cities.sort();
  }, [businesses]);

  // Filtrage avancé
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      // Secteur
      if (selectedSector !== 'all' && !business.sector.toLowerCase().includes(selectedSector.toLowerCase())) {
        return false;
      }

      // Ville
      if (selectedCity !== 'all' && !business.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }

      // Score
      if (business.ilaScore < scoreRange[0] || business.ilaScore > scoreRange[1]) {
        return false;
      }

      // Recherche
      if (searchQuery && !business.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !business.sector.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !business.city.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [businesses, selectedSector, selectedCity, scoreRange, searchQuery]);

  // Distribution des scores
  const scoreDistribution = useMemo(() => {
    return {
      excellent: filteredBusinesses.filter(b => b.ilaScore >= 80).length,
      good: filteredBusinesses.filter(b => b.ilaScore >= 60 && b.ilaScore < 80).length,
      poor: filteredBusinesses.filter(b => b.ilaScore < 60).length
    };
  }, [filteredBusinesses]);

  const handleScoreFilterClick = (minScore: number, maxScore: number) => {
    setScoreRange([minScore, maxScore]);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExport = () => {
    const csvData = filteredBusinesses.map(b => ({
      Nom: b.name,
      Secteur: b.sector,
      Ville: b.city,
      'Score ILA': b.ilaScore,
      'Note Google': b.googleRating,
      'Nb Avis': b.reviewCount,
      Téléphone: b.phone,
      'Site Web': b.website
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rivalviews-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('sector', selectedSector);
    url.searchParams.set('city', selectedCity);
    url.searchParams.set('scoreMin', scoreRange[0].toString());
    url.searchParams.set('scoreMax', scoreRange[1].toString());
    
    navigator.clipboard.writeText(url.toString()).then(() => {
      alert('Lien copié dans le presse-papier !');
    });
  };

  const handleBusinessSelect = (business: RivalBusiness) => {
    setSelectedBusiness(business);
    if (onBusinessClick) {
      onBusinessClick(business);
    }
  };

  const handleViewWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Contrôles professionnels */}
      <ProfessionalControls
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        scoreRange={scoreRange}
        onScoreRangeChange={setScoreRange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        mapStyle={mapStyle}
        onMapStyleChange={setMapStyle}
        clustering={clustering}
        onClusteringChange={setClustering}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onShare={handleShare}
        totalBusinesses={businesses.length}
        filteredCount={filteredBusinesses.length}
        availableSectors={availableSectors}
        availableCities={availableCities}
      />

      {/* Navigation entre vues */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
        {[
          { id: 'map', label: 'Carte Interactive', icon: '🗺️' },
          { id: 'analytics', label: 'Analytics Avancés', icon: '📊' },
          { id: 'discovery', label: 'Mode Découverte', icon: '🔍' },
          { id: 'insights', label: 'Insights Concurrents', icon: '💡' }
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setViewMode(id as any)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              viewMode === id
                ? 'bg-white shadow-sm text-purple-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span className="mr-2">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Contenu principal selon la vue */}
      {viewMode === 'map' && (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Carte principale */}
          <div className="xl:col-span-3">
            <div className="h-[700px] rounded-xl overflow-hidden shadow-2xl">
              <ProfessionalMapController
                businesses={filteredBusinesses}
                onBusinessClick={handleBusinessSelect}
                style={mapStyle}
                clustering={clustering}
                filters={{
                  sector: selectedSector !== 'all' ? selectedSector : undefined,
                  scoreMin: scoreRange[0],
                  scoreMax: scoreRange[1],
                  city: selectedCity !== 'all' ? selectedCity : undefined
                }}
              />
            </div>
          </div>

          {/* Légende et statistiques */}
          <div className="xl:col-span-1 space-y-4">
            <ProfessionalLegend
              totalBusinesses={businesses.length}
              filteredCount={filteredBusinesses.length}
              scoreDistribution={scoreDistribution}
              onScoreFilterClick={handleScoreFilterClick}
            />
          </div>
        </div>
      )}

      {viewMode === 'analytics' && (
        <EnhancedAnalyticsDashboard
          businesses={businesses}
          filteredBusinesses={filteredBusinesses}
          selectedSector={selectedSector}
          onSectorChange={setSelectedSector}
          onExportData={handleExport}
          onRefreshData={handleRefresh}
        />
      )}

      {viewMode === 'discovery' && (
        <DiscoveryMode
          businesses={filteredBusinesses}
          onBusinessSelect={handleBusinessSelect}
          onCompareSelect={handleBusinessSelect}
        />
      )}

      {viewMode === 'insights' && selectedBusiness && (
        <CompetitorInsightsDashboard
          business={selectedBusiness}
          competitors={filteredBusinesses}
          onViewWebsite={handleViewWebsite}
          onAnalyzeCompetitor={handleBusinessSelect}
        />
      )}

      {viewMode === 'insights' && !selectedBusiness && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Sélectionnez une entreprise
          </h3>
          <p className="text-slate-600">
            Cliquez sur une entreprise pour voir ses insights détaillés
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalMapInterface;