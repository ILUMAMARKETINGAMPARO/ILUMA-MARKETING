import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { LanguageContext } from '@/contexts/LanguageContext';
import { RivalFilters } from '@/types/rivalviews';
import { Filter, X, RotateCcw, Search } from 'lucide-react';

interface RivalFiltersPanelProps {
  filters: RivalFilters;
  onFiltersChange: (filters: RivalFilters) => void;
  onClose: () => void;
  businessCount: number;
}

const RivalFiltersPanel: React.FC<RivalFiltersPanelProps> = ({
  filters,
  onFiltersChange,
  onClose,
  businessCount
}) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';
  const [localFilters, setLocalFilters] = useState<RivalFilters>(filters);

  const content = {
    fr: {
      title: "Filtres Avancés",
      subtitle: "Affinez votre recherche de commerces",
      search: "Recherche par nom",
      searchPlaceholder: "Nom ou secteur...",
      sector: "Secteur d'activité",
      city: "Ville",
      scoreRange: "Plage Score ILA™",
      status: "Statut",
      potential: "Potentiel",
      source: "Source des données",
      rating: "Note Google minimum",
      hasWebsite: "Possède un site web",
      results: "résultats trouvés",
      apply: "Appliquer les filtres",
      reset: "Réinitialiser",
      close: "Fermer",
      sectors: {
        all: "Tous les secteurs",
        restaurant: "Restaurant",
        commerce: "Commerce",
        services: "Services",
        sante: "Santé",
        immobilier: "Immobilier",
        beaute: "Beauté"
      },
      cities: {
        all: "Toutes les villes",
        montreal: "Montréal",
        laval: "Laval",
        longueuil: "Longueuil",
        brossard: "Brossard",
        terrebonne: "Terrebonne",
        mascouche: "Mascouche",
        repentigny: "Repentigny",
        gatineau: "Gatineau",
        quebec: "Québec",
        sherbrooke: "Sherbrooke"
      },
      regions: {
        all: "Toutes les régions",
        montreal: "Grand Montréal",
        laval: "Laval",
        mauricie: "Mauricie",
        quebec: "Région de Québec",
        outaouais: "Outaouais",
        estrie: "Estrie"
      },
      statuses: {
        all: "Tous les statuts",
        prospect: "Prospect",
        contacted: "Contacté",
        client: "Client",
        lost: "Perdu"
      },
      potentials: {
        all: "Tous les potentiels",
        low: "Faible",
        medium: "Moyen",
        high: "Élevé"
      },
      sources: {
        all: "Toutes les sources",
        seo: "SEO",
        gmb: "Google My Business",
        ads: "Publicités",
        social: "Réseaux sociaux"
      }
    },
    en: {
      title: "Advanced Filters",
      subtitle: "Refine your business search",
      search: "Search by name",
      searchPlaceholder: "Name or sector...",
      sector: "Business sector",
      city: "City",
      scoreRange: "ILA™ Score Range",
      status: "Status",
      potential: "Potential",
      source: "Data source",
      rating: "Minimum Google rating",
      hasWebsite: "Has website",
      results: "results found",
      apply: "Apply filters",
      reset: "Reset",
      close: "Close",
      sectors: {
        all: "All sectors",
        restaurant: "Restaurant",
        commerce: "Retail",
        services: "Services",
        sante: "Health",
        immobilier: "Real Estate",
        beaute: "Beauty"
      },
      cities: {
        all: "All cities",
        montreal: "Montreal",
        laval: "Laval",
        longueuil: "Longueuil",
        brossard: "Brossard",
        terrebonne: "Terrebonne",
        mascouche: "Mascouche",
        repentigny: "Repentigny",
        gatineau: "Gatineau",
        quebec: "Quebec City",
        sherbrooke: "Sherbrooke"
      },
      regions: {
        all: "All regions",
        montreal: "Greater Montreal",
        laval: "Laval",
        mauricie: "Mauricie",
        quebec: "Quebec Region",
        outaouais: "Outaouais",
        estrie: "Eastern Townships"
      },
      statuses: {
        all: "All statuses",
        prospect: "Prospect",
        contacted: "Contacted",
        client: "Client",
        lost: "Lost"
      },
      potentials: {
        all: "All potentials",
        low: "Low",
        medium: "Medium",
        high: "High"
      },
      sources: {
        all: "All sources",
        seo: "SEO",
        gmb: "Google My Business",
        ads: "Ads",
        social: "Social Media"
      }
    },
    es: {
      title: "Filtros Avanzados",
      subtitle: "Refina tu búsqueda de negocios",
      search: "Buscar por nombre",
      searchPlaceholder: "Nombre o sector...",
      sector: "Sector de actividad",
      city: "Ciudad",
      scoreRange: "Rango Puntuación ILA™",
      status: "Estado",
      potential: "Potencial",
      source: "Fuente de datos",
      rating: "Calificación Google mínima",
      hasWebsite: "Tiene sitio web",
      results: "resultados encontrados",
      apply: "Aplicar filtros",
      reset: "Reiniciar",
      close: "Cerrar",
      sectors: {
        all: "Todos los sectores",
        restaurant: "Restaurante",
        commerce: "Comercio",
        services: "Servicios",
        sante: "Salud",
        immobilier: "Inmobiliaria",
        beaute: "Belleza"
      },
      cities: {
        all: "Todas las ciudades",
        montreal: "Montreal",
        laval: "Laval",
        longueuil: "Longueuil",
        brossard: "Brossard",
        terrebonne: "Terrebonne",
        mascouche: "Mascouche",
        repentigny: "Repentigny",
        gatineau: "Gatineau",
        quebec: "Ciudad de Quebec",
        sherbrooke: "Sherbrooke"
      },
      regions: {
        all: "Todas las regiones",
        montreal: "Gran Montreal",
        laval: "Laval",
        mauricie: "Mauricie",
        quebec: "Región de Quebec",
        outaouais: "Outaouais",
        estrie: "Cantones del Este"
      },
      statuses: {
        all: "Todos los estados",
        prospect: "Prospecto",
        contacted: "Contactado",
        client: "Cliente",
        lost: "Perdido"
      },
      potentials: {
        all: "Todos los potenciales",
        low: "Bajo",
        medium: "Medio",
        high: "Alto"
      },
      sources: {
        all: "Todas las fuentes",
        seo: "SEO",
        gmb: "Google My Business",
        ads: "Publicidad",
        social: "Redes sociales"
      }
    }
  };

  const t = content[language as keyof typeof content];

  const handleFilterChange = (key: keyof RivalFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters: RivalFilters = {};
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -400 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 top-0 h-full w-80 z-50 bg-black/90 backdrop-blur-md border-r border-white/20 overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white font-['Montserrat']">
              {t.title}
            </h2>
            <p className="text-white/60 text-sm font-['Montserrat']">
              {t.subtitle}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <Label className="text-white font-['Montserrat']">{t.search}</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/60" />
            <Input
              placeholder={t.searchPlaceholder}
              value={localFilters.searchQuery || ''}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>

        {/* Sector */}
        <div className="space-y-2">
          <Label className="text-white font-['Montserrat']">{t.sector}</Label>
          <Select
            value={localFilters.sector || 'all'}
            onValueChange={(value) => handleFilterChange('sector', value === 'all' ? undefined : value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.sectors.all}</SelectItem>
              <SelectItem value="Restaurant">{t.sectors.restaurant}</SelectItem>
              <SelectItem value="Commerce">{t.sectors.commerce}</SelectItem>
              <SelectItem value="Services">{t.sectors.services}</SelectItem>
              <SelectItem value="Santé">{t.sectors.sante}</SelectItem>
              <SelectItem value="Immobilier">{t.sectors.immobilier}</SelectItem>
              <SelectItem value="Beauté">{t.sectors.beaute}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label className="text-white font-['Montserrat']">{t.city}</Label>
          <Select
            value={localFilters.city || 'all'}
            onValueChange={(value) => handleFilterChange('city', value === 'all' ? undefined : value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.cities.all}</SelectItem>
              <SelectItem value="Montréal">{t.cities.montreal}</SelectItem>
              <SelectItem value="Laval">{t.cities.laval}</SelectItem>
              <SelectItem value="Longueuil">{t.cities.longueuil}</SelectItem>
              <SelectItem value="Brossard">{t.cities.brossard}</SelectItem>
              <SelectItem value="Terrebonne">{t.cities.terrebonne}</SelectItem>
              <SelectItem value="Mascouche">{t.cities.mascouche}</SelectItem>
              <SelectItem value="Repentigny">{t.cities.repentigny}</SelectItem>
              <SelectItem value="Gatineau">{t.cities.gatineau}</SelectItem>
              <SelectItem value="Québec">{t.cities.quebec}</SelectItem>
              <SelectItem value="Sherbrooke">{t.cities.sherbrooke}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Score Range */}
        <div className="space-y-4">
          <Label className="text-white font-['Montserrat']">{t.scoreRange}</Label>
          <div className="px-2">
            <Slider
              value={[localFilters.ilaScoreMin || 0, localFilters.ilaScoreMax || 100]}
              onValueChange={([min, max]) => {
                handleFilterChange('ilaScoreMin', min);
                handleFilterChange('ilaScoreMax', max);
              }}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/60 mt-2">
              <span>{localFilters.ilaScoreMin || 0}</span>
              <span>{localFilters.ilaScoreMax || 100}</span>
            </div>
          </div>
        </div>

        {/* Google Rating */}
        <div className="space-y-4">
          <Label className="text-white font-['Montserrat']">{t.rating}</Label>
          <div className="px-2">
            <Slider
              value={[localFilters.googleRatingMin || 0]}
              onValueChange={([min]) => handleFilterChange('googleRatingMin', min)}
              max={5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/60 mt-2">
              <span>0</span>
              <span>{localFilters.googleRatingMin?.toFixed(1) || '0.0'}+</span>
              <span>5</span>
            </div>
          </div>
        </div>

        {/* Has Website Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-white font-['Montserrat']">{t.hasWebsite}</Label>
          <Switch
            checked={localFilters.hasWebsite || false}
            onCheckedChange={(checked) => handleFilterChange('hasWebsite', checked)}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className="text-white font-['Montserrat']">{t.status}</Label>
          <Select
            value={localFilters.status || 'all'}
            onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.statuses.all}</SelectItem>
              <SelectItem value="prospect">{t.statuses.prospect}</SelectItem>
              <SelectItem value="contacted">{t.statuses.contacted}</SelectItem>
              <SelectItem value="client">{t.statuses.client}</SelectItem>
              <SelectItem value="lost">{t.statuses.lost}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Counter */}
        <Card className="glass-effect border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[hsl(var(--accent))] font-['Montserrat']">
              {businessCount}
            </div>
            <div className="text-white/80 text-sm font-['Montserrat']">
              {t.results}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-['Montserrat']"
            onClick={handleApplyFilters}
          >
            <Filter className="w-5 h-5 mr-2" />
            {t.apply}
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
            onClick={handleResetFilters}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            {t.reset}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RivalFiltersPanel;