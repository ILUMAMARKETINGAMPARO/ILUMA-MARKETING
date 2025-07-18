import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map, 
  Building2, 
  Table, 
  BarChart3,
  Upload,
  Download,
  Settings,
  Filter
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import { generateRivalMockData } from '@/utils/rivalviewsDataParser';
import MapView from './views/MapView';
import CityView from './views/CityView';
import TableView from './views/TableView';
import AnalyticsView from './views/AnalyticsView';
import DynamicDropdownManager from './DynamicDropdownManager';

interface RevolveViewerLayoutProps {
  selectedBusinesses: string[];
  setSelectedBusinesses: (selected: string[]) => void;
  onImport: () => void;
  onExport: () => void;
  importedBusinesses?: RivalBusiness[];
}

const RevolveViewerLayout: React.FC<RevolveViewerLayoutProps> = ({
  selectedBusinesses,
  setSelectedBusinesses,
  onImport,
  onExport,
  importedBusinesses = []
}) => {
  const [activeView, setActiveView] = useState('map');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [showDropdownManager, setShowDropdownManager] = useState(false);
  
  // Combine mock data with imported businesses - No limits, dynamic updates
  const [allBusinesses, setAllBusinesses] = useState<RivalBusiness[]>(() => [
    ...generateRivalMockData(200), // Increased base data
    ...importedBusinesses
  ]);

  // Update businesses when imported data changes
  useEffect(() => {
    setAllBusinesses(prev => {
      // Remove duplicates and add new imported businesses
      const existingIds = new Set(prev.map(b => b.id));
      const newBusinesses = importedBusinesses.filter(b => !existingIds.has(b.id));
      return [...prev, ...newBusinesses];
    });
  }, [importedBusinesses]);

  const views = [
    { 
      id: 'map', 
      label: 'Vue Carte', 
      icon: Map, 
      description: 'Visualisation géographique interactive'
    },
    { 
      id: 'cities', 
      label: 'Vue Villes', 
      icon: Building2, 
      description: 'Regroupement par localisation'
    },
    { 
      id: 'table', 
      label: 'Vue Tableau', 
      icon: Table, 
      description: 'Données tabulaires détaillées'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      description: 'Métriques et tendances'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header avec actions */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-2">
              🌎 RevolveViewer™ - Prospection Géolocalisée
            </h2>
            <p className="text-white/60 font-['Montserrat']">
              Système intelligent d'analyse et prospection commerciale multi-vues
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-[#8E44FF]">
                {allBusinesses.length}
              </div>
              <div className="text-xs text-white/60">Entreprises</div>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={onImport}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
              <Button
                size="sm"
                onClick={onExport}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button
                size="sm"
                onClick={() => setShowDropdownManager(true)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Gérer Filtres
              </Button>
              <Button
                size="sm"
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-black/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">
              {allBusinesses.filter(b => b.status === 'client').length}
            </div>
            <div className="text-xs text-white/60">Clients</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-yellow-400">
              {allBusinesses.filter(b => b.status === 'prospect').length}
            </div>
            <div className="text-xs text-white/60">Prospects</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-400">
              {allBusinesses.filter(b => b.status === 'contacted').length}
            </div>
            <div className="text-xs text-white/60">Contactés</div>
          </div>
          <div className="bg-black/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-[#8E44FF]">
              {selectedBusinesses.length}
            </div>
            <div className="text-xs text-white/60">Sélectionnés</div>
          </div>
        </div>
      </Card>

      {/* Navigation Multi-Vues */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6 bg-black/20 border border-white/10">
          {views.map((view) => {
            const IconComponent = view.icon;
            return (
              <TabsTrigger 
                key={view.id} 
                value={view.id}
                className="data-[state=active]:bg-[#8E44FF]/20 data-[state=active]:text-[#8E44FF] text-white/60 p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">{view.label}</span>
                  <span className="text-xs opacity-70 hidden lg:block">
                    {view.description}
                  </span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Vue Carte */}
        <TabsContent value="map" className="mt-0">
          <MapView
            businesses={allBusinesses}
            selectedBusinesses={selectedBusinesses}
            setSelectedBusinesses={setSelectedBusinesses}
            showFiltersPanel={showFiltersPanel}
          />
        </TabsContent>

        {/* Vue Villes */}
        <TabsContent value="cities" className="mt-0">
          <CityView
            businesses={allBusinesses}
            selectedBusinesses={selectedBusinesses}
            setSelectedBusinesses={setSelectedBusinesses}
            showFiltersPanel={showFiltersPanel}
          />
        </TabsContent>

        {/* Vue Tableau */}
        <TabsContent value="table" className="mt-0">
          <TableView
            businesses={allBusinesses}
            selectedBusinesses={selectedBusinesses}
            setSelectedBusinesses={setSelectedBusinesses}
            showFiltersPanel={showFiltersPanel}
          />
        </TabsContent>

        {/* Vue Analytics */}
        <TabsContent value="analytics" className="mt-0">
          <AnalyticsView
            businesses={allBusinesses}
            selectedBusinesses={selectedBusinesses}
          />
        </TabsContent>
      </Tabs>

      {/* Gestionnaire de Filtres Dynamiques */}
      <DynamicDropdownManager
        isOpen={showDropdownManager}
        onClose={() => setShowDropdownManager(false)}
        businesses={allBusinesses}
      />
    </motion.div>
  );
};

export default RevolveViewerLayout;