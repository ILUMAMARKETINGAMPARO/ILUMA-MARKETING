import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessData, HeatmapFilters, HeatmapStats, MapCluster, HeatmapContextType, BusinessAction } from '@/types/heatmap';

const HeatmapContext = createContext<HeatmapContextType | undefined>(undefined);

const defaultFilters: HeatmapFilters = {
  cities: [],
  sectors: [],
  ilaScoreRange: [0, 100],
  status: [],
  assignedTo: [],
  hasGMB: null,
  hasWebsite: null,
  minReviewCount: 0
};

export const HeatmapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<BusinessData[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessData[]>([]);
  const [filters, setFilters] = useState<HeatmapFilters>(defaultFilters);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessData | null>(null);
  const [clusters, setClusters] = useState<MapCluster[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Calcul des statistiques
  const stats: HeatmapStats = React.useMemo(() => {
    const total = businesses.length;
    const avgScore = total > 0 ? Math.round(businesses.reduce((sum, b) => sum + b.ilaScore.overall, 0) / total) : 0;
    
    const sectorStats = businesses.reduce((acc, business) => {
      if (!acc[business.sector]) {
        acc[business.sector] = { count: 0, totalScore: 0 };
      }
      acc[business.sector].count++;
      acc[business.sector].totalScore += business.ilaScore.overall;
      return acc;
    }, {} as Record<string, { count: number; totalScore: number }>);

    const topSectors = Object.entries(sectorStats)
      .map(([sector, data]) => ({
        sector,
        count: data.count,
        avgScore: Math.round(data.totalScore / data.count)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const cityStats = businesses.reduce((acc, business) => {
      if (!acc[business.city]) {
        acc[business.city] = { count: 0, totalScore: 0 };
      }
      acc[business.city].count++;
      acc[business.city].totalScore += business.ilaScore.overall;
      return acc;
    }, {} as Record<string, { count: number; totalScore: number }>);

    const cityDistribution = Object.entries(cityStats)
      .map(([city, data]) => ({
        city,
        count: data.count,
        avgScore: Math.round(data.totalScore / data.count)
      }))
      .sort((a, b) => b.count - a.count);

    const highPotentialLeads = businesses
      .filter(b => b.ilaScore.overall >= 75 && b.status === 'prospect')
      .sort((a, b) => b.ilaScore.overall - a.ilaScore.overall)
      .slice(0, 10);

    return {
      totalBusinesses: total,
      averageIlaScore: avgScore,
      topSectors,
      cityDistribution,
      conversionOpportunities: businesses.filter(b => b.ilaScore.overall >= 60 && b.status === 'prospect').length,
      highPotentialLeads
    };
  }, [businesses]);

  // Filtrage des entreprises
  useEffect(() => {
    let filtered = businesses;

    if (filters.cities.length > 0) {
      filtered = filtered.filter(b => filters.cities.includes(b.city));
    }

    if (filters.sectors.length > 0) {
      filtered = filtered.filter(b => filters.sectors.includes(b.sector));
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter(b => filters.status.includes(b.status));
    }

    if (filters.assignedTo.length > 0) {
      filtered = filtered.filter(b => b.assignedTo && filters.assignedTo.includes(b.assignedTo));
    }

    if (filters.hasGMB !== null) {
      filtered = filtered.filter(b => !!b.gmbLink === filters.hasGMB);
    }

    if (filters.hasWebsite !== null) {
      filtered = filtered.filter(b => !!b.website === filters.hasWebsite);
    }

    filtered = filtered.filter(b => 
      b.ilaScore.overall >= filters.ilaScoreRange[0] && 
      b.ilaScore.overall <= filters.ilaScoreRange[1]
    );

    if (filters.minReviewCount > 0) {
      filtered = filtered.filter(b => (b.reviewCount || 0) >= filters.minReviewCount);
    }

    setFilteredBusinesses(filtered);
    generateClusters(filtered);
  }, [businesses, filters]);

  const generateClusters = (businessList: BusinessData[]) => {
    // Algorithme de clustering simple par proximité géographique
    const clusters: MapCluster[] = [];
    const processed = new Set<string>();
    
    businessList.forEach(business => {
      if (processed.has(business.id)) return;
      
      const nearby = businessList.filter(other => {
        if (processed.has(other.id) || other.id === business.id) return false;
        
        const distance = Math.sqrt(
          Math.pow(business.coordinates.lat - other.coordinates.lat, 2) +
          Math.pow(business.coordinates.lng - other.coordinates.lng, 2)
        );
        
        return distance < 0.01; // ~1km radius
      });
      
      const clusterBusinesses = [business, ...nearby];
      
      clusters.push({
        id: `cluster_${clusters.length}`,
        center: {
          lat: clusterBusinesses.reduce((sum, b) => sum + b.coordinates.lat, 0) / clusterBusinesses.length,
          lng: clusterBusinesses.reduce((sum, b) => sum + b.coordinates.lng, 0) / clusterBusinesses.length
        },
        businesses: clusterBusinesses,
        averageIlaScore: Math.round(
          clusterBusinesses.reduce((sum, b) => sum + b.ilaScore.overall, 0) / clusterBusinesses.length
        ),
        count: clusterBusinesses.length
      });
      
      clusterBusinesses.forEach(b => processed.add(b.id));
    });
    
    setClusters(clusters);
  };

  const loadBusinessData = async (csvData: string) => {
    setIsLoading(true);
    try {
      const { parseBusinessData } = await import('@/utils/heatmapDataParser');
      const parsedBusinesses = parseBusinessData(csvData);
      setBusinesses(parsedBusinesses);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBusiness = async (id: string, updates: Partial<BusinessData>) => {
    setBusinesses(prev => prev.map(business => 
      business.id === id 
        ? { ...business, ...updates }
        : business
    ));
  };

  const addAction = async (businessId: string, action: Omit<BusinessAction, 'id'>) => {
    const newAction: BusinessAction = {
      ...action,
      id: `action_${Date.now()}`
    };

    setBusinesses(prev => prev.map(business => 
      business.id === businessId 
        ? { ...business, actions: [...business.actions, newAction] }
        : business
    ));
  };

  const setFiltersUpdate = (newFilters: Partial<HeatmapFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const selectBusiness = (business: BusinessData | null) => {
    setSelectedBusiness(business);
  };

  const calculateILAScore = async (business: Partial<BusinessData>): Promise<number> => {
    // Simulation du calcul ILA avancé
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let score = 50;
    
    if (business.googleRating) {
      score += (business.googleRating / 5) * 20;
    }
    
    if (business.reviewCount && business.reviewCount > 10) {
      score += Math.min(15, Math.log(business.reviewCount) * 3);
    }
    
    if (business.gmbLink) score += 10;
    if (business.website) score += 10;
    if (business.isSponsored) score += 5;
    
    return Math.min(100, Math.max(0, Math.round(score)));
  };

  const recalculateAllScores = async () => {
    setIsLoading(true);
    
    const updatedBusinesses = await Promise.all(
      businesses.map(async (business) => {
        const newScore = await calculateILAScore(business);
        return {
          ...business,
          ilaScore: {
            ...business.ilaScore,
            overall: newScore
          }
        };
      })
    );
    
    setBusinesses(updatedBusinesses);
    setIsLoading(false);
  };

  const exportData = async (format: 'csv' | 'pdf' | 'json') => {
    const dataToExport = filteredBusinesses;
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `heatmap_ila_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }
    
    // TODO: Implémenter export CSV et PDF
  };

  const exportCRM = async (businessIds: string[]) => {
    const selectedBusinesses = businesses.filter(b => businessIds.includes(b.id));
    // TODO: Intégration avec le CRM ILUMA
    console.log('Export vers CRM:', selectedBusinesses);
  };

  return (
    <HeatmapContext.Provider value={{
      businesses,
      filteredBusinesses,
      filters,
      stats,
      selectedBusiness,
      clusters,
      isLoading,
      loadBusinessData,
      updateBusiness,
      addAction,
      setFilters: setFiltersUpdate,
      resetFilters,
      selectBusiness,
      calculateILAScore,
      recalculateAllScores,
      exportData,
      exportCRM
    }}>
      {children}
    </HeatmapContext.Provider>
  );
};

export const useHeatmap = () => {
  const context = useContext(HeatmapContext);
  if (!context) {
    throw new Error('useHeatmap must be used within a HeatmapProvider');
  }
  return context;
};