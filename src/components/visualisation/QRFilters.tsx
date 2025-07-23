import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Filter, Search, RotateCcw, MapPin } from 'lucide-react';
import { RivalFilters as RivalFiltersType } from '@/types/rivalviews.ts';

interface QRFiltersProps {
  filters: RivalFiltersType;
  onFiltersChange: (filters: RivalFiltersType) => void;
  availableSectors: string[];
  availableCities: string[];
  className?: string;
}

const QRFilters: React.FC<QRFiltersProps> = ({
  filters,
  onFiltersChange,
  availableSectors,
  availableCities,
  className
}) => {
  const updateFilter = (key: keyof RivalFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(v => 
    v !== undefined && v !== '' && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  return (
    <Card className={`glass-effect border-white/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filtres de Recherche
            {activeFiltersCount > 0 && (
              <Badge className="bg-primary/20 text-primary">
                {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-white/60 hover:text-white"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Recherche textuelle */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">
            Recherche
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Nom, adresse, secteur..."
              value={filters.searchQuery || ''}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              className="pl-10 bg-black/30 border-white/20 text-white"
            />
          </div>
        </div>

        {/* Secteur */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">
            Secteur d'activité
          </label>
          <Select
            value={filters.sector || ''}
            onValueChange={(value) => updateFilter('sector', value || undefined)}
          >
            <SelectTrigger className="bg-black/30 border-white/20 text-white">
              <SelectValue placeholder="Tous les secteurs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les secteurs</SelectItem>
              {availableSectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ville */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Localisation
          </label>
          <Select
            value={filters.city || ''}
            onValueChange={(value) => updateFilter('city', value || undefined)}
          >
            <SelectTrigger className="bg-black/30 border-white/20 text-white">
              <SelectValue placeholder="Toutes les villes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les villes</SelectItem>
              {availableCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Score ILA */}
        <div className="space-y-3">
          <label className="text-white/80 text-sm font-medium">
            Score ILA™ minimum
          </label>
          <div className="px-3">
            <Slider
              value={[filters.ilaScoreMin || 0]}
              onValueChange={([value]) => updateFilter('ilaScoreMin', value || undefined)}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>0</span>
              <span className="text-primary font-medium">
                {filters.ilaScoreMin || 0}
              </span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Note Google minimum */}
        <div className="space-y-3">
          <label className="text-white/80 text-sm font-medium">
            Note Google minimum
          </label>
          <div className="px-3">
            <Slider
              value={[filters.googleRatingMin || 0]}
              onValueChange={([value]) => updateFilter('googleRatingMin', value || undefined)}
              max={5}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>0</span>
              <span className="text-primary font-medium">
                {filters.googleRatingMin?.toFixed(1) || '0.0'}
              </span>
              <span>5.0</span>
            </div>
          </div>
        </div>

        {/* Statut */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">
            Statut commercial
          </label>
          <Select
            value={filters.status || ''}
            onValueChange={(value) => updateFilter('status', value || undefined)}
          >
            <SelectTrigger className="bg-black/30 border-white/20 text-white">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les statuts</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="contacted">Contacté</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="lost">Perdu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Potentiel */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">
            Potentiel commercial
          </label>
          <Select
            value={filters.potential || ''}
            onValueChange={(value) => updateFilter('potential', value || undefined)}
          >
            <SelectTrigger className="bg-black/30 border-white/20 text-white">
              <SelectValue placeholder="Tous les potentiels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les potentiels</SelectItem>
              <SelectItem value="high">Élevé</SelectItem>
              <SelectItem value="medium">Moyen</SelectItem>
              <SelectItem value="low">Faible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Source */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">
            Source de découverte
          </label>
          <Select
            value={filters.source || ''}
            onValueChange={(value) => updateFilter('source', value || undefined)}
          >
            <SelectTrigger className="bg-black/30 border-white/20 text-white">
              <SelectValue placeholder="Toutes les sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les sources</SelectItem>
              <SelectItem value="SEO">SEO</SelectItem>
              <SelectItem value="GMB">Google My Business</SelectItem>
              <SelectItem value="Ads">Publicités</SelectItem>
              <SelectItem value="Social">Réseaux sociaux</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Présence site web */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">
            Site web
          </label>
          <Select
            value={filters.hasWebsite?.toString() || ''}
            onValueChange={(value) => 
              updateFilter('hasWebsite', value === '' ? undefined : value === 'true')
            }
          >
            <SelectTrigger className="bg-black/30 border-white/20 text-white">
              <SelectValue placeholder="Peu importe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Peu importe</SelectItem>
              <SelectItem value="true">Avec site web</SelectItem>
              <SelectItem value="false">Sans site web</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRFilters;