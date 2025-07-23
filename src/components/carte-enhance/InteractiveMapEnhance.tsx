import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  MapPin, Star, Search, Filter, Layers, Navigation, 
  TrendingUp, Globe, MessageCircle, Plus, Target,
  Zap, Eye, BarChart3, Download, Share2
} from 'lucide-react';
import { BusinessData } from '@/types/heatmap.ts';

interface InteractiveMapEnhanceProps {
  onBusinessSelect?: (business: BusinessData) => void;
  onZoneAnalysis?: (zone: { center: [number, number], radius: number }) => void;
}

const InteractiveMapEnhance: React.FC<InteractiveMapEnhanceProps> = ({
  onBusinessSelect,
  onZoneAnalysis
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  // États de filtres
  const [filters, setFilters] = useState({
    sector: 'all',
    ilaScore: [0, 100] as [number, number],
    googleRating: [0, 5] as [number, number],
    hasWebsite: 'all',
    radius: 5,
    keywords: ''
  });
  
  const [viewMode, setViewMode] = useState<'potential' | 'reviews'>('potential');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessData | null>(null);
  const [liloMessage, setLiloMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock data avec coordonnées réelles Montréal
  const businessData: BusinessData[] = [
    {
      id: '1',
      name: 'Restaurant Bella Vista',
      city: 'Montréal',
      address: '1234 Rue Saint-Laurent',
      phone: '(514) 555-0101',
      googleRating: 4.6,
      reviewCount: 184,
      serpRank: 2,
      isSponsored: false,
      source: 'SEO',
      sector: 'restaurant',
      coordinates: { lat: 45.5017, lng: -73.5673 },
      ilaScore: { overall: 85, seo: 88, visibility: 82, reputation: 90, technical: 78 },
      status: 'prospect',
      actions: [],
      hasWebsite: true,
      potential: 'high'
    },
    {
      id: '2',
      name: 'Clinique Dentaire Plus',
      city: 'Montréal', 
      address: '5678 Boulevard René-Lévesque',
      phone: '(514) 555-0202',
      googleRating: 3.8,
      reviewCount: 67,
      serpRank: 8,
      isSponsored: false,
      source: 'GMB',
      sector: 'santé',
      coordinates: { lat: 45.5088, lng: -73.5878 },
      ilaScore: { overall: 58, seo: 55, visibility: 60, reputation: 62, technical: 56 },
      status: 'prospect',
      actions: [],
      hasWebsite: false,
      potential: 'medium'
    },
    {
      id: '3',
      name: 'Boutique Mode Élégante',
      city: 'Montréal',
      address: '910 Avenue Mont-Royal',
      phone: '(514) 555-0303',
      googleRating: 4.2,
      reviewCount: 134,
      serpRank: 5,
      isSponsored: true,
      source: 'SEO',
      sector: 'retail',
      coordinates: { lat: 45.5247, lng: -73.5848 },
      ilaScore: { overall: 72, seo: 75, visibility: 70, reputation: 74, technical: 68 },
      status: 'contacted',
      actions: [],
      hasWebsite: true,
      potential: 'high'
    },
    {
      id: '4',
      name: 'Garage Auto Expert',
      city: 'Montréal',
      address: '432 Rue Sherbrooke',
      googleRating: 4.9,
      reviewCount: 298,
      serpRank: 1,
      isSponsored: false,
      source: 'GMB',
      sector: 'automobile',
      coordinates: { lat: 45.5200, lng: -73.5800 },
      ilaScore: { overall: 92, seo: 94, visibility: 90, reputation: 95, technical: 88 },
      status: 'client',
      actions: [],
      hasWebsite: true,
      potential: 'low'
    },
    {
      id: '5',
      name: 'Salon Beauté Divine',
      city: 'Montréal',
      address: '789 Rue Sainte-Catherine',
      googleRating: 3.2,
      reviewCount: 23,
      serpRank: 12,
      isSponsored: false,
      source: 'GMB',
      sector: 'beauté',
      coordinates: { lat: 45.5080, lng: -73.5700 },
      ilaScore: { overall: 42, seo: 38, visibility: 45, reputation: 40, technical: 48 },
      status: 'prospect',
      actions: [],
      hasWebsite: false,
      potential: 'high'
    }
  ];

  // Messages Lilo IA contextuels
  const liloMessages = {
    welcome: [
      "🗺️ Bienvenue sur la Carte ENHANCE ! Je vais vous guider dans l'exploration.",
      "🎯 Cette carte révèle les meilleures opportunités de prospection locale.",
      "🧠 Chaque point représente une entreprise avec son potentiel analysé par IA."
    ],
    analyzing: [
      "🔍 J'analyse cette zone... Plusieurs opportunités détectées !",
      "📊 Calcul du potentiel en cours... Les données arrivent !",
      "🎯 Identification des cibles prioritaires dans ce secteur..."
    ],
    recommendations: [
      "💡 Zone à fort potentiel détectée ! 5 entreprises sans site web optimal.",
      "⚡ Rosemont-Petite-Patrie : 12 entreprises avec moins de 20 avis Google.",
      "🎯 Secteur santé recommandé : faible concurrence SEO, demande élevée."
    ]
  };

  const getPointColor = (business: BusinessData) => {
    if (business.potential === 'high') return '#10B981'; // Vert
    if (business.potential === 'medium') return '#F59E0B'; // Jaune
    return '#EF4444'; // Rouge
  };

  const getILAScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Filtres appliqués
  const filteredBusinesses = businessData.filter(business => {
    if (filters.sector !== 'all' && business.sector !== filters.sector) return false;
    if (business.ilaScore.overall < filters.ilaScore[0] || business.ilaScore.overall > filters.ilaScore[1]) return false;
    if (business.googleRating && (business.googleRating < filters.googleRating[0] || business.googleRating > filters.googleRating[1])) return false;
    if (filters.hasWebsite !== 'all') {
      const hasWebsite = business.hasWebsite;
      if (filters.hasWebsite === 'yes' && !hasWebsite) return false;
      if (filters.hasWebsite === 'no' && hasWebsite) return false;
    }
    if (filters.keywords && !business.name.toLowerCase().includes(filters.keywords.toLowerCase())) return false;
    return true;
  });

  // Initialisation de la carte
  useEffect(() => {
    if (!mapContainer.current) return;

    // Configuration Mapbox
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-73.5673, 45.5017], // Montréal
      zoom: 12,
      pitch: 0,
      bearing: 0
    });

    // Contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Message d'accueil Lilo
    setLiloMessage(liloMessages.welcome[0]);

    return () => {
      map.current?.remove();
    };
  }, []);

  // Ajout des marqueurs
  useEffect(() => {
    if (!map.current) return;

    // Supprimer les anciens marqueurs
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    filteredBusinesses.forEach(business => {
      // Créer l'élément marqueur
      const el = document.createElement('div');
      el.className = 'business-marker';
      el.style.cssText = `
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${getPointColor(business)};
        border: 3px solid white;
        box-shadow: 0 0 20px ${getPointColor(business)}66;
        cursor: pointer;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
      `;
      
      // Hover effect
      el.onmouseenter = () => {
        el.style.transform = 'scale(1.5)';
        el.style.boxShadow = `0 0 30px ${getPointColor(business)}`;
      };
      
      el.onmouseleave = () => {
        el.style.transform = 'scale(1)';
        el.style.boxShadow = `0 0 20px ${getPointColor(business)}66`;
      };

      // Clic sur marqueur
      el.onclick = () => {
        setSelectedBusiness(business);
        onBusinessSelect?.(business);
        setIsAnalyzing(true);
        setLiloMessage(liloMessages.analyzing[Math.floor(Math.random() * liloMessages.analyzing.length)]);
        setTimeout(() => {
          setIsAnalyzing(false);
          setLiloMessage(liloMessages.recommendations[Math.floor(Math.random() * liloMessages.recommendations.length)]);
        }, 2000);
      };

      // Ajouter le marqueur à la carte
      new mapboxgl.Marker(el)
        .setLngLat([business.coordinates.lng, business.coordinates.lat])
        .addTo(map.current!);
    });
  }, [filteredBusinesses]);

  const HoverCard = ({ business }: { business: BusinessData }) => (
    <Card className="absolute bottom-4 left-4 right-4 glass-effect border-primary/30 p-4 z-50">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h4 className="font-bold text-foreground text-lg">{business.name}</h4>
          <p className="text-sm text-muted-foreground">{business.address}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{business.googleRating}</span>
              <span className="text-xs text-muted-foreground">({business.reviewCount} avis)</span>
            </div>
            <Badge className={`${business.potential === 'high' ? 'bg-green-500/20 text-green-400' : 
                             business.potential === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                             'bg-red-500/20 text-red-400'}`}>
              {business.potential === 'high' ? 'Potentiel élevé' : 
               business.potential === 'medium' ? 'À surveiller' : 'Saturé'}
            </Badge>
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${getILAScoreColor(business.ilaScore.overall)}`}>
            {business.ilaScore.overall}
          </div>
          <div className="text-xs text-muted-foreground">Score ILA™</div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button size="sm" className="flex-1">
          <Plus className="w-4 h-4 mr-1" />
          Ajouter à prospection
        </Button>
        <Button size="sm" variant="outline" className="border-primary/30">
          <MessageCircle className="w-4 h-4 mr-1" />
          Script contact
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Carte principale */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* CSS pour l'animation pulse */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `
      }} />

      {/* Panel de contrôles - Gauche */}
      <Card className="absolute top-4 left-4 w-80 glass-effect border-primary/30 p-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <div className="space-y-4">
          {/* Header avec Lilo */}
          <div className="flex items-center gap-3 pb-3 border-b border-primary/20">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Carte ENHANCE</h3>
              <p className="text-xs text-muted-foreground">Prospection Locale IA</p>
            </div>
          </div>

          {/* Message Lilo */}
          <Card className="bg-primary/10 border-primary/30 p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>
              <motion.p
                key={liloMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-foreground flex-1"
              >
                {liloMessage}
              </motion.p>
            </div>
            {isAnalyzing && (
              <div className="mt-2">
                <div className="w-full bg-primary/20 rounded-full h-1">
                  <div className="bg-primary h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}
          </Card>

          {/* Filtres */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtres
            </h4>
            
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une entreprise..."
                value={filters.keywords}
                onChange={(e) => setFilters(prev => ({ ...prev, keywords: e.target.value }))}
                className="pl-10"
              />
            </div>

            {/* Secteur */}
            <div>
              <label className="text-sm font-medium text-foreground">Secteur</label>
              <Select value={filters.sector} onValueChange={(value) => setFilters(prev => ({ ...prev, sector: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="santé">Santé</SelectItem>
                  <SelectItem value="retail">Commerce</SelectItem>
                  <SelectItem value="automobile">Automobile</SelectItem>
                  <SelectItem value="beauté">Beauté</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Score ILA */}
            <div>
              <label className="text-sm font-medium text-foreground">Score ILA™: {filters.ilaScore[0]} - {filters.ilaScore[1]}</label>
              <Slider
                value={filters.ilaScore}
                onValueChange={(value) => setFilters(prev => ({ ...prev, ilaScore: value as [number, number] }))}
                max={100}
                min={0}
                step={5}
                className="mt-2"
              />
            </div>

            {/* Note Google */}
            <div>
              <label className="text-sm font-medium text-foreground">Note Google: {filters.googleRating[0]} - {filters.googleRating[1]} ⭐</label>
              <Slider
                value={filters.googleRating}
                onValueChange={(value) => setFilters(prev => ({ ...prev, googleRating: value as [number, number] }))}
                max={5}
                min={0}
                step={0.1}
                className="mt-2"
              />
            </div>

            {/* Site web */}
            <div>
              <label className="text-sm font-medium text-foreground">Présence web</label>
              <Select value={filters.hasWebsite} onValueChange={(value) => setFilters(prev => ({ ...prev, hasWebsite: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="yes">Avec site web</SelectItem>
                  <SelectItem value="no">Sans site web</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Options d'affichage */}
          <div className="space-y-3 pt-3 border-t border-primary/20">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Affichage
            </h4>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Mode heatmap</span>
              <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Vue par</span>
              <Select value={viewMode} onValueChange={(value: 'potential' | 'reviews') => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="potential">Potentiel SEO</SelectItem>
                  <SelectItem value="reviews">Avis clients</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Statistiques */}
          <Card className="bg-muted/10 p-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-xl font-bold text-primary">{filteredBusinesses.length}</div>
                <div className="text-xs text-muted-foreground">Entreprises</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-400">
                  {filteredBusinesses.filter(b => b.potential === 'high').length}
                </div>
                <div className="text-xs text-muted-foreground">Potentiel élevé</div>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* Fiche business sélectionnée */}
      <AnimatePresence>
        {selectedBusiness && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <HoverCard business={selectedBusiness} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions rapides - Droite */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button
          size="sm"
          className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/30"
          onClick={() => {
            const center = map.current?.getCenter();
            if (center) {
              onZoneAnalysis?.({ center: [center.lng, center.lat], radius: filters.radius });
              setLiloMessage("🎯 Analyse de zone lancée ! Recherche des meilleures opportunités...");
            }
          }}
        >
          <Target className="w-5 h-5" />
        </Button>
        
        <Button
          size="sm"
          className="w-12 h-12 rounded-full bg-accent/20 hover:bg-accent/30"
          onClick={() => {
            setLiloMessage("📊 Génération du rapport en cours...");
          }}
        >
          <Download className="w-5 h-5" />
        </Button>
        
        <Button
          size="sm"
          className="w-12 h-12 rounded-full bg-green-500/20 hover:bg-green-500/30"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Mini-boussole */}
      <div className="absolute bottom-4 right-4">
        <Card className="glass-effect border-primary/30 p-2">
          <Navigation className="w-6 h-6 text-primary" />
        </Card>
      </div>

      {/* Légende */}
      <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-effect border-primary/30 p-3">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-foreground">Potentiel élevé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-foreground">À surveiller</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-foreground">Saturé</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveMapEnhance;