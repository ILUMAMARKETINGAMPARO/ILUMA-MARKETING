import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  Trash2,
  Search,
  Target,
  Building,
  MapPin,
  Save,
  RotateCw
} from 'lucide-react';
import { RivalBusiness, RivalFilters } from '@/types/rivalviews.ts';
import { generateRivalMockData, filterRivalBusinesses } from '@/utils/rivalviewsDataParser';
import SectionWrapper from '../foundation/SectionWrapper';

interface RevolveViewerSectionProps {
  selectedBusinesses: string[];
  setSelectedBusinesses: (selected: string[]) => void;
  onAdd: () => void;
  onEdit: () => void;
  onRemove: () => void;
  onImport: () => void;
  onExport: () => void;
}

const RevolveViewerSection: React.FC<RevolveViewerSectionProps> = ({
  selectedBusinesses,
  setSelectedBusinesses,
  onAdd,
  onEdit,
  onRemove,
  onImport,
  onExport
}) => {
  const [businesses] = useState<RivalBusiness[]>(generateRivalMockData(50));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showMap, setShowMap] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);

  const filters: RivalFilters = {
    sector: selectedSector === 'all' ? undefined : selectedSector,
    city: selectedCity === 'all' ? undefined : selectedCity,
    searchQuery: searchTerm || undefined
  };

  const filteredBusinesses = filterRivalBusinesses(businesses, filters);

  const handleBusinessSelect = (business: RivalBusiness) => {
    setSelectedBusiness(business);
    if (!selectedBusinesses.includes(business.id)) {
      setSelectedBusinesses([...selectedBusinesses, business.id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtres et contrôles */}
      <Card className="glass-effect border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Contrôles RevolveViewer™</h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onImport}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Importer
            </Button>
            <Button
              size="sm"
              onClick={onExport}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Save className="w-4 h-4 mr-1" />
              Exporter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-white/20 text-white"
            />
          </div>

          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="bg-black/20 border-white/20 text-white">
              <SelectValue placeholder="Secteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les secteurs</SelectItem>
              <SelectItem value="restaurant">Restaurant</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="bg-black/20 border-white/20 text-white">
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les villes</SelectItem>
              <SelectItem value="Montréal">Montréal</SelectItem>
              <SelectItem value="Laval">Laval</SelectItem>
              <SelectItem value="Longueuil">Longueuil</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={showMap}
              onCheckedChange={(checked) => setShowMap(checked === true)}
            />
            <label className="text-white/80 text-sm">Vue carte</label>
          </div>
        </div>
      </Card>

      {/* Résultats */}
      <Card className="glass-effect border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            <span className="text-white font-medium">
              {filteredBusinesses.length} entreprises trouvées
            </span>
            {selectedBusinesses.length > 0 && (
              <Badge className="bg-primary/20 text-primary">
                {selectedBusinesses.length} sélectionnées
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBusinesses.slice(0, 6).map((business) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect border-white/10 rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-all duration-300"
              onClick={() => handleBusinessSelect(business)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-medium text-sm">{business.name}</h4>
                <Badge className="text-xs">
                  ILA™ {business.ilaScore}
                </Badge>
              </div>
              
              <div className="space-y-1 text-xs text-white/60">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {business.city}
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  {business.sector}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Statut:</span>
                  <span className="text-white capitalize">{business.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBusinesses.length > 6 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Voir tous les résultats ({filteredBusinesses.length})
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RevolveViewerSection;