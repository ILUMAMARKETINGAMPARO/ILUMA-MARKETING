import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Map, 
  Layers, 
  Filter, 
  Search, 
  Settings, 
  MapPin, 
  Globe,
  Satellite,
  Moon,
  Sun,
  Grid3X3,
  Target,
  Download,
  Share,
  RefreshCw,
  TrendingUp,
  Eye,
  EyeOff,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfessionalControlsProps {
  // Filtres
  selectedSector: string;
  onSectorChange: (sector: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  scoreRange: [number, number];
  onScoreRangeChange: (range: [number, number]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  
  // Vue carte
  mapStyle: 'light' | 'dark' | 'satellite';
  onMapStyleChange: (style: 'light' | 'dark' | 'satellite') => void;
  clustering: boolean;
  onClusteringChange: (enabled: boolean) => void;
  
  // Actions
  onRefresh: () => void;
  onExport: () => void;
  onShare: () => void;
  
  // Données
  totalBusinesses: number;
  filteredCount: number;
  isLoading?: boolean;
  
  // Secteurs et villes disponibles
  availableSectors: string[];
  availableCities: string[];
}

export const ProfessionalControls: React.FC<ProfessionalControlsProps> = ({
  selectedSector,
  onSectorChange,
  selectedCity,
  onCityChange,
  scoreRange,
  onScoreRangeChange,
  searchQuery,
  onSearchChange,
  mapStyle,
  onMapStyleChange,
  clustering,
  onClusteringChange,
  onRefresh,
  onExport,
  onShare,
  totalBusinesses,
  filteredCount,
  isLoading = false,
  availableSectors,
  availableCities
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const mapStyleOptions = [
    { value: 'light', label: 'Clair', icon: Sun, gradient: 'from-sky-400 to-blue-500' },
    { value: 'dark', label: 'Sombre', icon: Moon, gradient: 'from-slate-600 to-slate-800' },
    { value: 'satellite', label: 'Satellite', icon: Satellite, gradient: 'from-green-500 to-emerald-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Premium avec design futuriste */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-purple-500/20"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.1)_50%,transparent_75%)] bg-[length:20px_20px]" />
        
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30 animate-pulse" />
              </motion.div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Intelligence Concurrentielle</h3>
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 backdrop-blur-sm">
                      <Zap className="w-3 h-3 mr-1" />
                      {filteredCount} / {totalBusinesses} entreprises
                    </Badge>
                  </motion.div>
                  <span className="text-slate-300 text-sm">Analyse en temps réel</span>
                </div>
              </div>
            </div>
            
            {/* Actions Premium */}
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefresh}
                  disabled={isLoading}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Actualiser
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExport}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onShare}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </motion.div>

      {/* Contrôles principaux avec design moderne */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-slate-800">Recherche</span>
                </div>
                <Input
                  placeholder="Nom, secteur, ville..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Filter className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-slate-800">Filtres</span>
                </div>
                
                <div className="space-y-3">
                  <Select value={selectedSector} onValueChange={onSectorChange}>
                    <SelectTrigger className="border-slate-200 focus:border-emerald-500 transition-colors">
                      <SelectValue placeholder="Secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les secteurs</SelectItem>
                      {availableSectors.map(sector => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedCity} onValueChange={onCityChange}>
                    <SelectTrigger className="border-slate-200 focus:border-emerald-500 transition-colors">
                      <SelectValue placeholder="Ville" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les villes</SelectItem>
                      {availableCities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Score ILA™ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-slate-800">Score ILA™</span>
                  </div>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {scoreRange[0]} - {scoreRange[1]}
                  </Badge>
                </div>
                
                <div className="px-1">
                  <Slider
                    value={scoreRange}
                    onValueChange={onScoreRangeChange}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="text-red-500 font-medium">Faible</span>
                  <span className="text-orange-500 font-medium">Moyen</span>
                  <span className="text-green-500 font-medium">Excellent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Affichage carte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Map className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-slate-800">Vue</span>
                </div>
                
                {/* Style de carte avec design premium */}
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
                    {mapStyleOptions.map(({ value, label, icon: Icon, gradient }) => (
                      <motion.button
                        key={value}
                        onClick={() => onMapStyleChange(value as any)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative flex flex-col items-center gap-1 p-3 rounded-lg text-xs font-medium transition-all ${
                          mapStyle === value
                            ? `bg-gradient-to-br ${gradient} text-white shadow-lg`
                            : 'text-slate-600 hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Clustering avec toggle premium */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Grid3X3 className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-800">Clustering</span>
                    </div>
                    <Switch
                      checked={clustering}
                      onCheckedChange={onClusteringChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Paramètres avancés avec animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-slate-200/50 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-slate-800">Paramètres avancés</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {showAdvanced ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showAdvanced ? 'Masquer' : 'Afficher'}
              </Button>
            </div>
            
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className="text-2xl font-bold text-slate-900 mb-1">2h</div>
                        <div className="text-sm text-slate-600">Dernière sync</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className="text-2xl font-bold text-slate-900 mb-1">99.9%</div>
                        <div className="text-sm text-slate-600">Précision GPS</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-xl">
                        <div className="text-2xl font-bold text-slate-900 mb-1">IA</div>
                        <div className="text-sm text-slate-600">Enrichissement</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfessionalControls;