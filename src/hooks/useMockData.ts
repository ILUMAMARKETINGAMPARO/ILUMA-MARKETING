import { useState, useEffect } from 'react';

// Types pour les différents types de données
export interface MockChartData {
  name: string;
  value: number;
  previous?: number;
}

export interface TimeSeriesData {
  month: string;
  [key: string]: string | number;
}

export interface NetworkData {
  date: string;
  nodes: number;
  connections: number;
  growth: number;
}

export const useMockData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<MockChartData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [networkData, setNetworkData] = useState<NetworkData[]>([]);

  // Données mockées pour les graphiques simples
  const mockChartData: MockChartData[] = [
    { name: 'SEO', value: 85, previous: 78 },
    { name: 'Content', value: 92, previous: 87 },
    { name: 'Conversion', value: 78, previous: 72 },
    { name: 'Engagement', value: 88, previous: 85 }
  ];

  // Données mockées pour les séries temporelles
  const mockTimeSeriesData: TimeSeriesData[] = [
    { month: 'Jan', seo: 85, content: 92, conversion: 78, engagement: 88 },
    { month: 'Fév', seo: 88, content: 94, conversion: 82, engagement: 90 },
    { month: 'Mar', seo: 92, content: 96, conversion: 85, engagement: 93 },
    { month: 'Avr', seo: 87, content: 93, conversion: 80, engagement: 91 },
    { month: 'Mai', seo: 95, content: 97, conversion: 88, engagement: 95 },
    { month: 'Jun', seo: 98, content: 99, conversion: 92, engagement: 97 }
  ];

  // Données mockées pour l'intelligence collective
  const mockIntelligenceData: TimeSeriesData[] = [
    { month: 'Jan', individual: 65, collective: 78, hybrid: 85 },
    { month: 'Fév', individual: 68, collective: 82, hybrid: 88 },
    { month: 'Mar', individual: 70, collective: 85, hybrid: 92 },
    { month: 'Avr', individual: 72, collective: 87, hybrid: 94 },
    { month: 'Mai', individual: 74, collective: 90, hybrid: 97 },
    { month: 'Jun', individual: 76, collective: 93, hybrid: 99 }
  ];

  // Données mockées pour le réseau de connaissances
  const mockNetworkData: NetworkData[] = [
    { date: 'Jan', nodes: 1200, connections: 340, growth: 12 },
    { date: 'Fév', nodes: 1450, connections: 420, growth: 18 },
    { date: 'Mar', nodes: 1680, connections: 580, growth: 25 },
    { date: 'Avr', nodes: 1920, connections: 720, growth: 32 },
    { date: 'Mai', nodes: 2240, connections: 890, growth: 28 },
    { date: 'Jun', nodes: 2580, connections: 1100, growth: 35 }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulation d'un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setChartData(mockChartData);
      setTimeSeriesData(mockTimeSeriesData);
      setNetworkData(mockNetworkData);
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Fonctions utilitaires pour récupérer des données spécifiques
  const getPerformanceData = () => mockTimeSeriesData;
  const getIntelligenceData = () => mockIntelligenceData;
  const getNetworkEvolutionData = () => mockNetworkData;
  
  const getKPIData = () => [
    { name: 'Score ILA Moyen', value: 94, previous: 82 },
    { name: 'Trafic Organique', value: 2400000, previous: 1880000 },
    { name: 'Taux Conversion', value: 8.7, previous: 7.5 },
    { name: 'Engagement Social', value: 94.2, previous: 77.3 }
  ];

  return {
    isLoading,
    chartData,
    timeSeriesData,
    networkData,
    getPerformanceData,
    getIntelligenceData,
    getNetworkEvolutionData,
    getKPIData
  };
};

// Hook pour la gestion de la performance
export const usePerformanceOptimization = () => {
  const [renderCount, setRenderCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    setRenderCount(prev => prev + 1);
    setLastUpdate(Date.now());
  });

  const resetMetrics = () => {
    setRenderCount(0);
    setLastUpdate(Date.now());
  };

  return {
    renderCount,
    lastUpdate,
    resetMetrics
  };
};