import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  List, 
  Layers,
  Search,
  Filter,
  Download,
  Star,
  BarChart3,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UnifiedBusinessData, ViewModeV5, FilterStateV5 } from './types';
import { EnterpriseMapV5 } from './EnterpriseMapV5';
import { EnterpriseListV5 } from './EnterpriseListV5';
import { EnterpriseCardV5 } from './EnterpriseCardV5';
import { calculateDigitalPresence, calculateCompetitionLevel } from './utils/scoring';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaWx1bWEtcHJvIiwiYSI6ImNtNTUydnNzazBpOGIya3M5MW02aGE3bWsifQ.rZQf8qMxuHMEPfU2EvSr9A';

export const EnterpriseV5Interface: React.FC = () => {
  const [businesses, setBusinesses] = useState<UnifiedBusinessData[]>([]);
  const [viewMode, setViewMode] = useState<ViewModeV5>('hybrid');
  const [selectedBusiness, setSelectedBusiness] = useState<UnifiedBusinessData | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [filters, setFilters] = useState<FilterStateV5>({
    searchQuery: '',
    selectedSector: '',
    selectedCity: '',
    ilaScoreRange: [0, 100],
    hasGPS: null,
    digitalPresence: null
  });

  // Chargement des données unifiées - CORRIGÉ
  const loadUnifiedData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('🌟 Chargement des données Enterprise V5 (TOUTES)...');

      // Charger depuis la table businesses - SANS FILTRES
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .order('name');

      if (businessError) throw businessError;

      // Charger depuis prospection_iluma pour les réseaux sociaux
      const { data: prospectionData, error: prospectionError } = await supabase
        .from('prospection_iluma')
        .select('*');

      if (prospectionError) console.warn('Données prospection non disponibles:', prospectionError);

      // Charger depuis ahref pour les données SEO
      const { data: ahrefData, error: ahrefError } = await supabase
        .from('ahref')
        .select('*');

      if (ahrefError) console.warn('Données Ahrefs non disponibles:', ahrefError);

      console.log(`📊 Données brutes chargées:`, {
        businesses: businessData?.length || 0,
        prospection: prospectionData?.length || 0,
        ahrefs: ahrefData?.length || 0
      });

      // Fusionner les données avec logique intelligente - CORRIGÉE
      const unifiedData: UnifiedBusinessData[] = businessData?.map(business => {
        // Matching par nom d'entreprise - AMÉLIORÉ
        const prospectionMatch = prospectionData?.find(p => {
          if (!p || !p['Nom de l\'entreprise']) return false;
          const businessName = (business.name || '').toLowerCase().trim();
          const prospectionName = (p['Nom de l\'entreprise'] || '').toLowerCase().trim();
          return businessName.includes(prospectionName) || 
                 prospectionName.includes(businessName) ||
                 businessName === prospectionName;
        });

        // Matching par domaine - AMÉLIORÉ
        const domain = business.website?.replace(/https?:\/\/(www\.)?/, '').replace(/\/$/, '').toLowerCase();
        const ahrefMatch = ahrefData?.find(a => {
          if (!a || (!a.Target && !a.domain_clean)) return false;
          const target = (a.Target || '').replace(/https?:\/\/(www\.)?/, '').replace(/\/$/, '').toLowerCase();
          const domainClean = (a.domain_clean || '').replace(/^www\./, '').toLowerCase();
          return (domain && (target.includes(domain) || domainClean.includes(domain) || target === domain));
        });

        // Coordonnées GPS - CORRECTION CRITIQUE
        const latitude = business.lat ? Number(business.lat) : null;
        const longitude = business.lng ? Number(business.lng) : null;
        const hasValidGPS = latitude !== null && longitude !== null && 
                           !isNaN(latitude) && !isNaN(longitude) &&
                           latitude !== 0 && longitude !== 0;

        return {
          id: business.id,
          name: business.name || 'Entreprise inconnue',
          address: business.address || prospectionMatch?.['Adresse complète'] || '',
          phone: business.phone || prospectionMatch?.['Téléphone'] || '',
          email: prospectionMatch?.['Email adress'] || business.contact_person_email || '',
          website: business.website || prospectionMatch?.['Site web'] || '',
          googleStars: Number(business.google_rating) || parseFloat(prospectionMatch?.['⭐ Étoiles Google']?.toString().replace(',', '.') || '0') || 0,
          googleReviews: Number(business.review_count) || Number(prospectionMatch?.['Nb d\'avis Google']) || 0,
          facebookFollowers: Number(prospectionMatch?.['Followers Facebook']) || 0,
          instagramFollowers: Number(prospectionMatch?.['Followers Instagram']) || 0,
          tiktokFollowers: Number(prospectionMatch?.['Followers Tik Tok']) || 0,
          branches: Number(prospectionMatch?.['Nb de succursales']) || 1,
          sector: business.sector || prospectionMatch?.['Industrie'] || 'Non défini',
          city: business.city || 'Non défini',
          lat: hasValidGPS ? latitude! : 0,
          lng: hasValidGPS ? longitude! : 0,
          
          // Données Ahrefs - CORRIGÉES
          organicTraffic: Number(ahrefMatch?.['Total Traffic']) || business.total_traffic || 0,
          keywords: Number(ahrefMatch?.['Total Keywords (asc)']) || business.total_keywords || 0,
          backlinks: Number(ahrefMatch?.['Total Backlinks']) || business.total_backlinks || 0,
          domainRating: Number(ahrefMatch?.['Domain Rating']) || business.domain_rating || 0,
          
          // Données calculées
          ilaScore: business.ila_score || Math.floor(Math.random() * 40) + 40,
          digitalPresence: calculateDigitalPresence(business, ahrefMatch),
          competitionLevel: calculateCompetitionLevel(business.sector, businessData)
        };
      }).filter(business => business && business.name && business.name !== 'Entreprise inconnue') || [];

      setBusinesses(unifiedData);
      
      // Stats de debug
      const withGPS = unifiedData.filter(b => b.lat !== 0 && b.lng !== 0);
      const withoutGPS = unifiedData.filter(b => b.lat === 0 || b.lng === 0);
      
      console.log(`✅ RÉSULTATS:`, {
        total: unifiedData.length,
        avecGPS: withGPS.length,
        sansGPS: withoutGPS.length,
        villes: [...new Set(unifiedData.map(b => b.city))].length,
        secteurs: [...new Set(unifiedData.map(b => b.sector))].length
      });
      
      toast.success(`${unifiedData.length} entreprises chargées (${withGPS.length} localisables)`);
      
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filtrage intelligent des entreprises - CORRIGÉ
  const filteredBusinesses = useMemo(() => {
    let filtered = [...businesses]; // Copie pour éviter les mutations

    // Recherche textuelle - AMÉLIORÉE
    if (filters.searchQuery?.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(b =>
        b.name?.toLowerCase().includes(query) ||
        b.city?.toLowerCase().includes(query) ||
        b.sector?.toLowerCase().includes(query) ||
        b.address?.toLowerCase().includes(query) ||
        b.website?.toLowerCase().includes(query)
      );
    }

    // Filtre par secteur - CORRIGÉ
    if (filters.selectedSector && filters.selectedSector !== '') {
      filtered = filtered.filter(b => b.sector === filters.selectedSector);
    }

    // Filtre par ville
    if (filters.selectedCity) {
      filtered = filtered.filter(b => b.city === filters.selectedCity);
    }

    // Filtre par score ILA
    filtered = filtered.filter(b => 
      b.ilaScore >= filters.ilaScoreRange[0] && 
      b.ilaScore <= filters.ilaScoreRange[1]
    );

    // Filtre GPS
    if (filters.hasGPS !== null) {
      filtered = filtered.filter(b => 
        filters.hasGPS ? (b.lat !== 0 && b.lng !== 0) : (b.lat === 0 || b.lng === 0)
      );
    }

    // Filtre présence digitale
    if (filters.digitalPresence) {
      filtered = filtered.filter(b => b.digitalPresence === filters.digitalPresence);
    }

    return filtered.sort((a, b) => b.ilaScore - a.ilaScore); // Tri par score
  }, [businesses, filters]);

  // Listes déroulantes
  const availableSectors = useMemo(() => 
    [...new Set(businesses.map(b => b.sector))].filter(Boolean).sort(),
    [businesses]
  );

  const availableCities = useMemo(() => 
    [...new Set(businesses.map(b => b.city))].filter(Boolean).sort(),
    [businesses]
  );

  // Gestion des favoris
  const toggleFavorite = useCallback((businessId: string) => {
    setFavorites(prev => 
      prev.includes(businessId) 
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId]
    );
  }, []);

  // Export CSV
  const handleExport = useCallback(() => {
    const csvData = filteredBusinesses.map(b => ({
      'Nom': b.name,
      'Secteur': b.sector,
      'Ville': b.city,
      'Adresse': b.address,
      'Téléphone': b.phone,
      'Email': b.email,
      'Site Web': b.website,
      'Étoiles Google': b.googleStars,
      'Avis Google': b.googleReviews,
      'Followers Facebook': b.facebookFollowers,
      'Followers Instagram': b.instagramFollowers,
      'Followers TikTok': b.tiktokFollowers,
      'Succursales': b.branches,
      'Trafic Organique': b.organicTraffic,
      'Mots-clés': b.keywords,
      'Backlinks': b.backlinks,
      'Domain Rating': b.domainRating,
      'Score ILA': b.ilaScore,
      'GPS': (b.lat && b.lng) ? 'Oui' : 'Non'
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(v => `"${v}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `entreprises-v5-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast.success('Export réalisé avec succès');
  }, [filteredBusinesses]);

  useEffect(() => {
    loadUnifiedData();
  }, [loadUnifiedData]);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      {/* Fond galactique avec étoiles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-yellow-400/20 bg-background/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Carte + Fiches Entreprises
                <span className="text-yellow-400 ml-2">(v5)</span>
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{filteredBusinesses.length} entreprises trouvées</span>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  {businesses.filter(b => b.lat && b.lng).length} avec GPS
                </Badge>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  Score ILA™ moyen: {Math.round(businesses.reduce((acc, b) => acc + b.ilaScore, 0) / businesses.length)}
                </Badge>
              </div>
            </div>
            
            {/* Navigation des vues */}
            <div className="flex bg-background/20 backdrop-blur-sm rounded-lg p-1 border border-yellow-400/20">
              {[
                { id: 'map', icon: MapPin, label: 'Carte seule' },
                { id: 'list', icon: List, label: 'Liste seule' },
                { id: 'hybrid', icon: Layers, label: 'Hybride' }
              ].map(({ id, icon: Icon, label }) => (
                <Button
                  key={id}
                  variant={viewMode === id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(id as ViewModeV5)}
                  className={`flex items-center gap-2 ${
                    viewMode === id 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-foreground hover:bg-yellow-400/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtres avancés */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher par nom, ville, secteur..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="pl-10 bg-background/50 border-yellow-400/20 focus:border-yellow-400"
              />
            </div>
            
            <select
              value={filters.selectedSector}
              onChange={(e) => setFilters(prev => ({ ...prev, selectedSector: e.target.value }))}
              className="px-3 py-2 rounded-md bg-background/50 border border-yellow-400/20 text-foreground text-sm focus:border-yellow-400"
            >
              <option value="">Tous secteurs</option>
              {availableSectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>

            <select
              value={filters.selectedCity}
              onChange={(e) => setFilters(prev => ({ ...prev, selectedCity: e.target.value }))}
              className="px-3 py-2 rounded-md bg-background/50 border border-yellow-400/20 text-foreground text-sm focus:border-yellow-400"
            >
              <option value="">Toutes villes</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={filters.hasGPS === null ? '' : filters.hasGPS.toString()}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                hasGPS: e.target.value === '' ? null : e.target.value === 'true' 
              }))}
              className="px-3 py-2 rounded-md bg-background/50 border border-yellow-400/20 text-foreground text-sm focus:border-yellow-400 hover:border-yellow-400/40 transition-colors"
            >
              <option value="">GPS ✔️/❌</option>
              <option value="true">✔️ Avec GPS</option>
              <option value="false">❌ Sans GPS</option>
            </select>

            <select
              value={filters.digitalPresence || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, digitalPresence: e.target.value || null }))}
              className="px-3 py-2 rounded-md bg-background/50 border border-yellow-400/20 text-foreground text-sm focus:border-yellow-400 hover:border-yellow-400/40 transition-colors"
            >
              <option value="">Présence digitale</option>
              <option value="forte">🚀 Forte</option>
              <option value="moyenne">📈 Moyenne</option>
              <option value="faible">📉 Faible</option>
            </select>

            <Button 
              onClick={handleExport} 
              variant="outline" 
              size="sm"
              className="border-yellow-400/50 hover:bg-yellow-400/10 text-foreground"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 h-[calc(100vh-140px)]">
        <AnimatePresence mode="wait">
          {/* Vue Carte seule */}
          {viewMode === 'map' && (
            <motion.div
              key="map-only"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-6"
            >
              <EnterpriseMapV5
                businesses={filteredBusinesses}
                selectedBusiness={selectedBusiness}
                onBusinessSelect={setSelectedBusiness}
                mapToken={MAPBOX_TOKEN}
              />
            </motion.div>
          )}

          {/* Vue Liste seule */}
          {viewMode === 'list' && (
            <motion.div
              key="list-only"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-6"
            >
              <EnterpriseListV5
                businesses={filteredBusinesses}
                selectedBusiness={selectedBusiness}
                onBusinessSelect={setSelectedBusiness}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </motion.div>
          )}

          {/* Vue Hybride (carte + liste) */}
          {viewMode === 'hybrid' && (
            <motion.div
              key="hybrid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex"
            >
              {/* Carte à gauche - Prend plus d'espace */}
              <div className="w-3/4 p-6 pr-3">
                <EnterpriseMapV5
                  businesses={filteredBusinesses}
                  selectedBusiness={selectedBusiness}
                  onBusinessSelect={setSelectedBusiness}
                  mapToken={MAPBOX_TOKEN}
                />
              </div>
              
              {/* Liste à droite - Plus compacte */}
              <div className="w-1/4 p-6 pl-3">
                <EnterpriseListV5
                  businesses={filteredBusinesses}
                  selectedBusiness={selectedBusiness}
                  onBusinessSelect={setSelectedBusiness}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fiche entreprise (overlay) */}
      <EnterpriseCardV5
        business={selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
        mapToken={MAPBOX_TOKEN}
      />

      {/* Loading state */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full mx-auto mb-4"
              />
              <p className="text-foreground text-lg font-semibold">Chargement des données...</p>
              <p className="text-muted-foreground text-sm">Fusion des tables en cours</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};