import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  Trash2,
  Settings,
  Tag,
  MapPin,
  Building,
  Save,
  RotateCw
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';

interface DynamicDropdownManagerProps {
  isOpen: boolean;
  onClose: () => void;
  businesses: RivalBusiness[];
}

const DynamicDropdownManager: React.FC<DynamicDropdownManagerProps> = ({
  isOpen,
  onClose,
  businesses
}) => {
  const [sectors, setSectors] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [newSector, setNewSector] = useState('');
  const [newCity, setNewCity] = useState('');

  // Extract unique sectors and cities from businesses
  React.useEffect(() => {
    const uniqueSectors = [...new Set(businesses.map(b => b.sector))];
    const uniqueCities = [...new Set(businesses.map(b => b.city))];
    setSectors(uniqueSectors);
    setCities(uniqueCities);
  }, [businesses]);

  const addSector = () => {
    if (newSector && !sectors.includes(newSector)) {
      setSectors([...sectors, newSector]);
      setNewSector('');
    }
  };

  const addCity = () => {
    if (newCity && !cities.includes(newCity)) {
      setCities([...cities, newCity]);
      setNewCity('');
    }
  };

  const removeSector = (sector: string) => {
    setSectors(sectors.filter(s => s !== sector));
  };

  const removeCity = (city: string) => {
    setCities(cities.filter(c => c !== city));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#0B0B0E] border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white font-['Montserrat']">
            Gestionnaire de Filtres Dynamiques
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Secteurs */}
          <Card className="glass-effect border-white/20 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-5 h-5 text-[#8E44FF]" />
              <h3 className="text-white font-medium">Secteurs</h3>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Nouveau secteur..."
                  value={newSector}
                  onChange={(e) => setNewSector(e.target.value)}
                  className="bg-black/20 border-white/20 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addSector()}
                />
                <Button onClick={addSector} size="sm" className="bg-[#8E44FF] hover:bg-[#8E44FF]/80">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <Badge key={sector} variant="outline" className="border-white/20 text-white flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {sector}
                    <button
                      onClick={() => removeSector(sector)}
                      className="ml-1 hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Villes */}
          <Card className="glass-effect border-white/20 p-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#8E44FF]" />
              <h3 className="text-white font-medium">Villes</h3>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Nouvelle ville..."
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="bg-black/20 border-white/20 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addCity()}
                />
                <Button onClick={addCity} size="sm" className="bg-[#8E44FF] hover:bg-[#8E44FF]/80">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <Badge key={city} variant="outline" className="border-white/20 text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {city}
                    <button
                      onClick={() => removeCity(city)}
                      className="ml-1 hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} className="border-white/20 text-white hover:bg-white/10">
              Fermer
            </Button>
            <Button className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicDropdownManager;