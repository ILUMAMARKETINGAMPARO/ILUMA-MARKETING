import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  Star,
  Globe,
  Phone,
  MapPin,
  TrendingUp,
  BarChart3,
  Users,
  ExternalLink,
  MessageCircle,
  Brain,
  Target,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import MapboxProvider from '../MapboxProvider';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface TableMapModeProps {
  businesses: RivalBusiness[];
  onBusinessClick?: (business: RivalBusiness) => void;
  onExport?: () => void;
}

const TableMapMode: React.FC<TableMapModeProps> = ({
  businesses,
  onBusinessClick,
  onExport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [viewSplit, setViewSplit] = useState<'table' | 'split'>('split');
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);
  
  // États pour les filtres avancés
  const [minReviews, setMinReviews] = useState(0);
  const [minTraffic, setMinTraffic] = useState(0);
  const [hoveredBusiness, setHoveredBusiness] = useState<RivalBusiness | null>(null);
  const [showAIPanel, setShowAIPanel] = useState(false);
  
  // Référence pour la carte
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Fonction pour obtenir l'emoji du secteur
  const getSectorEmoji = (sector: string): string => {
    const emojiMap: { [key: string]: string } = {
      'Ésthétique': '💅',
      'Lunetterie': '👓',
      'Magasin de meubles': '🛋️',
      'Vente automobile': '🚗',
      'École de conduite': '🚙',
      'Avocats': '⚖️',
      'Comptable': '📊',
      'Restaurants': '🍽️',
      'Santé': '🏥',
      'Mode': '👕',
      'Technologie': '💻',
      'Construction': '🏗️',
      'Immobilier': '🏠',
      'Finance': '💰',
      'Éducation': '📚',
      'Sport': '⚽',
      'Beauté': '💄',
      'Alimentation': '🍎',
      'Transport': '🚛'
    };
    return emojiMap[sector] || '🏢';
  };

  // Données filtrées
  const filteredBusinesses = useMemo(() => {
    let filtered = businesses;

    if (searchQuery) {
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.sector.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSector !== 'all') {
      filtered = filtered.filter(b => b.sector === selectedSector);
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(b => b.city === selectedCity);
    }

    filtered = filtered.filter(b => 
      b.ilaScore >= scoreRange[0] && b.ilaScore <= scoreRange[1]
    );

    return filtered.sort((a, b) => b.ilaScore - a.ilaScore);
  }, [businesses, searchQuery, selectedSector, selectedCity, scoreRange]);

  // Listes des options
  const sectors = useMemo(() => 
    [...new Set(businesses.map(b => b.sector))].sort(),
    [businesses]
  );

  const cities = useMemo(() => 
    [...new Set(businesses.map(b => b.city))].sort(),
    [businesses]
  );

  const handleBusinessClick = useCallback((business: RivalBusiness) => {
    setSelectedBusiness(business);
    onBusinessClick?.(business);
  }, [onBusinessClick]);

  // Configuration Mapbox avec MapboxProvider
  useEffect(() => {
    if (!mapContainer.current || !viewSplit.includes('split') && !viewSplit.includes('map')) return;

    console.log('🗺️ Initialisation carte TableMapMode');
    console.log('📊 Businesses disponibles:', filteredBusinesses.length);

    const initializeMap = async () => {
      try {
        // Utiliser un token Mapbox temporaire pour les tests
        const MAPBOX_TOKEN = 'pk.eyJ1IjoidGVzdC11c2VyIiwiYSI6ImNscDR3eDczdzBlNjIya21kNnNhaWVxaTgifQ.example';
        
        if (!mapboxgl.accessToken) {
          // Essayer de récupérer le token depuis l'API, sinon utiliser un fallback
          try {
            const response = await fetch('/api/mapbox-token');
            const { token } = await response.json();
            mapboxgl.accessToken = token || MAPBOX_TOKEN;
          } catch (error) {
            console.warn('⚠️ Impossible de récupérer le token Mapbox, utilisation du fallback');
            mapboxgl.accessToken = MAPBOX_TOKEN;
          }
        }

        // Ne créer la carte que si elle n'existe pas déjà
        if (!map.current) {
          map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [-73.5673, 45.5017], // Montréal
            zoom: 10,
            pitch: 45,
            bearing: 0
          });

          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
          
          // Effets atmosphériques
          map.current.on('style.load', () => {
            console.log('🎨 Style de carte chargé');
            map.current?.setFog({
              color: 'rgb(15, 15, 20)',
              'high-color': 'rgb(50, 50, 70)',
              'horizon-blend': 0.1,
            });
            updateMarkers();
          });

          map.current.on('load', () => {
            console.log('✅ Carte entièrement chargée');
            updateMarkers();
          });
        } else {
          // Si la carte existe déjà, juste mettre à jour les marqueurs
          updateMarkers();
        }
      } catch (error) {
        console.error('❌ Erreur initialisation Mapbox:', error);
        // Afficher un message d'erreur à l'utilisateur
        if (mapContainer.current) {
          mapContainer.current.innerHTML = `
            <div class="flex items-center justify-center h-full bg-red-900/20 border border-red-500/30 rounded-lg">
              <div class="text-center p-4">
                <div class="text-red-400 text-lg mb-2">⚠️ Erreur de carte</div>
                <div class="text-red-300 text-sm">Impossible de charger la carte Mapbox</div>
              </div>
            </div>
          `;
        }
      }
    };

    // Délai pour s'assurer que le DOM est prêt
    const timeoutId = setTimeout(initializeMap, 100);

    return () => {
      clearTimeout(timeoutId);
      markers.current.forEach(marker => marker.remove());
      // Ne pas supprimer la carte ici pour éviter les re-créations
    };
  }, [viewSplit]); // Dépendance sur viewSplit pour réinitialiser si nécessaire

  // Mettre à jour les marqueurs
  const updateMarkers = useCallback(() => {
    if (!map.current) return;

    // Supprimer les anciens marqueurs
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Créer les nouveaux marqueurs
    filteredBusinesses.forEach(business => {
      if (!business.lat || !business.lng) return;

      const emoji = getSectorEmoji(business.sector);
      const scoreColor = business.ilaScore >= 80 ? '#FFD700' : 
                        business.ilaScore >= 60 ? '#4FB3FF' :
                        business.ilaScore >= 40 ? '#FF8C42' : '#FF4757';

      // Élément du marqueur
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div class="relative group cursor-pointer transform hover:scale-110 transition-all duration-300">
          <div class="absolute inset-0 rounded-full animate-pulse" 
               style="background: radial-gradient(circle, ${scoreColor}40, transparent 70%); 
                      width: ${20 + (business.ilaScore / 100) * 30}px; 
                      height: ${20 + (business.ilaScore / 100) * 30}px;
                      transform: translate(-50%, -50%);"></div>
          <div class="relative z-10 bg-gray-900/90 backdrop-blur-sm rounded-full p-2 border-2 border-gray-700/50 
                      group-hover:border-${scoreColor} group-hover:shadow-lg group-hover:shadow-${scoreColor}/30">
            <span class="text-lg">${emoji}</span>
          </div>
        </div>
      `;

      // Popup au survol
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'rival-popup'
      });

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([business.lng, business.lat])
        .addTo(map.current!);

      // Événements
      markerElement.addEventListener('mouseenter', () => {
        setHoveredBusiness(business);
        popup.setHTML(`
          <div class="bg-gray-900/95 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50 min-w-64">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-bold text-white text-lg">${business.name}</h3>
                <p class="text-gray-300 text-sm">${business.sector} • ${business.city}</p>
              </div>
              <div class="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-1 rounded-full text-sm font-bold">
                ${business.ilaScore}
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-yellow-400">⭐</span>
                <span class="text-white">${business.googleRating || 'N/A'}</span>
                <span class="text-gray-400">(${business.reviewCount || 0})</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-blue-400">📈</span>
                <span class="text-white">${business.organicTraffic || 0}</span>
                <span class="text-gray-400">visits/mois</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-400">🔍</span>
                <span class="text-white">${business.indexedKeywords || 0}</span>
                <span class="text-gray-400">mots-clés</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-purple-400">📱</span>
                <span class="text-white">${(business as any).socialFollowers || 0}</span>
                <span class="text-gray-400">followers</span>
              </div>
            </div>

            <div class="flex gap-2 mt-3">
              <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                Comparer
              </button>
              <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                Voir fiche
              </button>
            </div>
          </div>
        `).addTo(map.current!);
      });

      markerElement.addEventListener('mouseleave', () => {
        setHoveredBusiness(null);
        popup.remove();
      });

      markerElement.addEventListener('click', () => {
        handleBusinessClick(business);
      });

      markers.current.push(marker);
    });
  }, [filteredBusinesses, handleBusinessClick]);

  // Mettre à jour les marqueurs quand les données changent
  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  const exportToCSV = useCallback(() => {
    const csvData = filteredBusinesses.map(b => ({
      'Nom': b.name,
      'Secteur': b.sector,
      'Ville': b.city,
      'Score ILA': b.ilaScore,
      'Note Google': b.googleRating,
      'Avis': b.reviewCount,
      'Téléphone': b.phone || '',
      'Site Web': b.website || '',
      'Trafic': b.organicTraffic || 0,
      'Mots-clés': b.indexedKeywords || 0,
      'Backlinks': b.backlinks || 0
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(v => `"${v}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rivalviews-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }, [filteredBusinesses]);

  // Suggestions IA LILO™
  const getAISuggestions = () => {
    const topPerformers = filteredBusinesses.slice(0, 3);
    const averageScore = filteredBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / filteredBusinesses.length;
    
    return {
      topPerformers,
      averageScore: Math.round(averageScore),
      insights: [
        `${topPerformers[0]?.name} domine le secteur avec un score de ${topPerformers[0]?.ilaScore}`,
        `Score moyen du secteur: ${Math.round(averageScore)}/100`,
        `${filteredBusinesses.filter(b => b.ilaScore < 60).length} entreprises ont un potentiel d'amélioration`
      ]
    };
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Barre d'outils avancée */}
      <Card className="m-4 mb-0 bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Recherche */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher entreprises, secteurs, villes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>

            {/* Filtres */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background/50 min-w-32"
            >
              <option value="all">Tous secteurs</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background/50 min-w-32"
            >
              <option value="all">Toutes villes</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {/* Score range */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Score:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={scoreRange[0]}
                onChange={(e) => setScoreRange([Number(e.target.value), scoreRange[1]])}
                className="w-16"
              />
              <span>{scoreRange[0]}</span>
              <span>-</span>
              <input
                type="range"
                min="0"
                max="100"
                value={scoreRange[1]}
                onChange={(e) => setScoreRange([scoreRange[0], Number(e.target.value)])}
                className="w-16"
              />
              <span>{scoreRange[1]}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportToCSV}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
            {/* Sélecteur de vue */}
            <div className="flex bg-muted rounded-lg p-1">
              {[
                { id: 'table', label: 'Table', icon: BarChart3 },
                { id: 'split', label: 'Split', icon: Eye }
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={viewSplit === id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewSplit(id as typeof viewSplit)}
                >
                  <Icon className="w-4 h-4" />
                  <span className="ml-1 hidden sm:inline">{label}</span>
                </Button>
              ))}
            </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
            <span>{filteredBusinesses.length} résultats</span>
            <span>Score moyen: {Math.round(filteredBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / filteredBusinesses.length)}</span>
            <span>Top performer: {filteredBusinesses[0]?.name}</span>
          </div>
        </CardContent>
      </Card>

      {/* Contenu principal */}
      <div className="flex-1 m-4 mt-2">
        {viewSplit === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Table */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Données Explorer ({filteredBusinesses.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm">
                      <tr>
                        <th className="text-left p-3 font-medium">Entreprise</th>
                        <th className="text-left p-3 font-medium">Score</th>
                        <th className="text-left p-3 font-medium">Contact</th>
                        <th className="text-left p-3 font-medium">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBusinesses.map((business, index) => (
                        <motion.tr
                          key={business.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`
                            border-b border-border/30 hover:bg-muted/30 cursor-pointer transition-colors
                            ${selectedBusiness?.id === business.id ? 'bg-primary/10' : ''}
                          `}
                          onClick={() => handleBusinessClick(business)}
                        >
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{business.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {business.sector} • {business.city}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge 
                              variant={business.ilaScore >= 80 ? 'default' : 'secondary'}
                              className={
                                business.ilaScore >= 80 ? 'bg-green-500' :
                                business.ilaScore >= 60 ? 'bg-blue-500' :
                                business.ilaScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                              }
                            >
                              {business.ilaScore}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              {business.phone && (
                                <Button size="sm" variant="ghost" className="w-6 h-6 p-0">
                                  <Phone className="w-3 h-3" />
                                </Button>
                              )}
                              {business.website && (
                                <Button size="sm" variant="ghost" className="w-6 h-6 p-0">
                                  <Globe className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                {business.googleRating}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-blue-500" />
                                {business.reviewCount}
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Carte intégrée avec IA LILO™ */}
            <div className="space-y-4 h-full flex flex-col">
              <Card className="bg-card/50 backdrop-blur-sm flex-1">
                <CardContent className="p-0 h-full">
                  <div ref={mapContainer} className="w-full h-full rounded-lg" />
                </CardContent>
              </Card>
              
              {/* Panel IA LILO™ */}
              <AnimatePresence>
                {showAIPanel && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-sm p-4 rounded-lg border border-purple-500/30"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-purple-300" />
                      <h3 className="font-bold text-white">LILO™ Intelligence</h3>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      {getAISuggestions().insights.map((insight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5" />
                          <span className="text-gray-200">{insight}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="text-purple-300 border-purple-500/50">
                        <Target className="w-4 h-4 mr-1" />
                        Voir suggestions
                      </Button>
                      <Button size="sm" variant="outline" className="text-blue-300 border-blue-500/50">
                        <Sparkles className="w-4 h-4 mr-1" />
                        Illumatch™
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Bouton IA */}
              <Button
                onClick={() => setShowAIPanel(!showAIPanel)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white self-end"
                size="sm"
              >
                <Brain className="w-4 h-4 mr-2" />
                IA LILO™
              </Button>
            </div>
          </div>
        ) : viewSplit === 'table' ? (
          /* Vue table complète */
          <Card className="bg-card/50 backdrop-blur-sm h-full">
            <CardContent className="p-0 h-full">
              {/* Table détaillée ici */}
            </CardContent>
          </Card>
        ) : (
          /* Vue carte complète */
          <Card className="bg-card/50 backdrop-blur-sm h-full">
            <CardContent className="p-0 h-full">
              <div ref={mapContainer} className="w-full h-full rounded-lg" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TableMapMode;