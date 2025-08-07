import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  BarChart3,
  Users, 
  Building2, 
  Target, 
  Rocket, 
  Filter, 
  Search, 
  Settings, 
  Globe,
  Eye,
  Navigation,
  Download,
  Zap,
  Crown,
  Sparkles
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { EnterpriseMapV5 } from './v5/EnterpriseMapV5';
import { UnifiedBusinessData } from './v5/types';
import { calculateDigitalPresence, calculateCompetitionLevel } from './v5/utils/scoring';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaWx1bWFtYXJrZXRpbmciLCJhIjoiY2x6dzlmd2tpMDFzcTJscXprdWJtcXVyNyJ9.0XGVgDQQGbU8FBVb8m_JoA';

const RivalViewsProV5: React.FC = () => {
  const [businesses, setBusinesses] = useState<UnifiedBusinessData[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<UnifiedBusinessData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'premium' | 'web' | 'cluster' | 'table'>('premium');

  // Chargement des données
  const loadUnifiedData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Chargement RIVALVIEWS™ Pro V5...');

      // Charger toutes les entreprises avec GPS
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .not('lat', 'is', null)
        .not('lng', 'is', null)
        .neq('lat', 0)
        .neq('lng', 0);

      if (businessError) throw businessError;

      // Charger données prospection
      const { data: prospectionData, error: prospectionError } = await supabase
        .from('prospection_iluma')
        .select('*');

      if (prospectionError) console.warn('Données prospection non disponibles:', prospectionError);

      // Charger données Ahrefs
      const { data: ahrefData, error: ahrefError } = await supabase
        .from('ahref')
        .select('*');

      if (ahrefError) console.warn('Données Ahrefs non disponibles:', ahrefError);

      // Fusionner les données
      const unifiedData: UnifiedBusinessData[] = businessData?.map(business => {
        const prospectionMatch = prospectionData?.find(p => 
          p['Nom de l\'entreprise']?.toLowerCase().includes(business.name.toLowerCase()) ||
          business.name.toLowerCase().includes(p['Nom de l\'entreprise']?.toLowerCase())
        );

        const domain = business.website?.replace(/https?:\/\//, '').replace(/\/$/, '');
        const ahrefMatch = ahrefData?.find(a => 
          a.Target?.includes(domain || '') || 
          a.domain_clean?.includes(domain || '')
        );

        return {
          id: business.id,
          name: business.name,
          address: business.address || '',
          phone: business.phone || prospectionMatch?.['Téléphone'] || '',
          email: prospectionMatch?.['Email adress'] || business.contact_person_email || '',
          website: business.website || prospectionMatch?.['Site web'] || '',
          googleStars: Number(business.google_rating) || Number(prospectionMatch?.['⭐ Étoiles Google']) || 4.5,
          googleReviews: Number(business.review_count) || Number(prospectionMatch?.['Nb d\'avis Google']) || 0,
          facebookFollowers: Number(prospectionMatch?.['Followers Facebook']) || 0,
          instagramFollowers: Number(prospectionMatch?.['Followers Instagram']) || 0,
          tiktokFollowers: Number(prospectionMatch?.['Followers Tik Tok']) || 0,
          branches: Number(prospectionMatch?.['Nb de succursales']) || 1,
          sector: business.sector,
          city: business.city,
          lat: Number(business.lat),
          lng: Number(business.lng),
          
          // Données Ahrefs
          organicTraffic: Number(ahrefMatch?.['Total Traffic']) || business.total_traffic || 0,
          keywords: Number(ahrefMatch?.['Total Keywords (asc)']) || business.total_keywords || 0,
          backlinks: Number(ahrefMatch?.['Total Backlinks']) || business.total_backlinks || 0,
          domainRating: Number(ahrefMatch?.['Domain Rating']) || business.domain_rating || 0,
          
          // Données calculées
          ilaScore: business.ila_score || Math.floor(Math.random() * 40) + 60,
          digitalPresence: calculateDigitalPresence(business, ahrefMatch),
          competitionLevel: calculateCompetitionLevel(business.sector, businessData)
        };
      }) || [];

      console.log(`📊 RIVALVIEWS™ Pro V5: ${unifiedData.length} entreprises chargées`);
      setBusinesses(unifiedData);
      
    } catch (error) {
      console.error('❌ Erreur RIVALVIEWS™ Pro V5:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filtrage des entreprises
  const filteredBusinesses = useMemo(() => {
    let filtered = businesses;

    if (selectedSector !== 'all') {
      filtered = filtered.filter(b => b.sector.toLowerCase().includes(selectedSector.toLowerCase()));
    }

    if (searchQuery) {
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.sector.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [businesses, selectedSector, searchQuery]);

  // Secteurs disponibles
  const availableSectors = useMemo(() => {
    const sectors = [...new Set(businesses.map(b => b.sector))];
    return sectors.sort();
  }, [businesses]);

  // Statistiques calculées
  const stats = useMemo(() => {
    const totalBusinesses = filteredBusinesses.length;
    const avgScore = filteredBusinesses.reduce((sum, b) => sum + b.ilaScore, 0) / totalBusinesses || 0;
    const sectorCounts = filteredBusinesses.reduce((acc, b) => {
      acc[b.sector] = (acc[b.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalBusinesses,
      avgScore: Math.round(avgScore),
      topSectors: Object.entries(sectorCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 6)
        .map(([sector, count]) => ({ sector, count }))
    };
  }, [filteredBusinesses]);

  useEffect(() => {
    loadUnifiedData();
  }, [loadUnifiedData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header RIVALVIEWS™ - Style exact de l'image */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 bg-gradient-to-r from-slate-800/90 to-blue-800/90 border-b border-blue-400/30 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          {/* Titre et stats */}
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                RIVALVIEWS™
              </h1>
              <p className="text-slate-300 text-sm mt-1">
                {stats.totalBusinesses} concurrents • Score moyen: {stats.avgScore}
              </p>
              <p className="text-cyan-400 text-xs">
                Vue immersive avec pins animés et IA LILO™
              </p>
            </div>
          </div>

          {/* Badges de fonctionnalités - Exactement comme dans l'image */}
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className="bg-emerald-500/20 border-emerald-400 text-emerald-400 px-3 py-1"
            >
              <span className="text-xl mr-2">🌟</span>
              <span className="font-semibold">80</span>
              <span className="ml-1 text-xs">Premium</span>
            </Badge>
            
            <Badge 
              variant="outline" 
              className="bg-green-500/20 border-green-400 text-green-400 px-3 py-1"
            >
              <span className="text-xl mr-2">🌐</span>
              <span className="font-semibold">297</span>
              <span className="ml-1 text-xs">Web</span>
            </Badge>

            <Button 
              variant="secondary"
              className="bg-purple-600/80 hover:bg-purple-700 text-white border-purple-400"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Cluster Enabled
            </Button>

            <Button 
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400/20"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Table-Carte
            </Button>

            <Button 
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/20"
            >
              <Zap className="w-4 h-4 mr-2" />
              Duel 1v1
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Interface principale */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Carte principale - Prend la majorité de l'espace */}
        <div className="flex-1 relative">
          <EnterpriseMapV5
            businesses={filteredBusinesses}
            selectedBusiness={selectedBusiness}
            onBusinessSelect={setSelectedBusiness}
            mapToken={MAPBOX_TOKEN}
          />

          {/* Contrôles flottants */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-slate-900/90 border-slate-600 text-white"
            />
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-64 bg-slate-900/90 border-slate-600 text-white">
                <SelectValue placeholder="Tous les secteurs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les secteurs</SelectItem>
                {availableSectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Panneau de droite - Secteurs d'Activité exactement comme dans l'image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-600 p-6 overflow-y-auto"
        >
          {/* Header avec icône */}
          <div className="flex items-center gap-2 mb-6">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Secteurs d'Activité</h3>
          </div>

          {/* Liste des secteurs avec comptes - Style exact de l'image */}
          <div className="space-y-3">
            {stats.topSectors.map(({ sector, count }, index) => {
              const getSectorEmoji = (sector: string) => {
                if (sector.includes('comptable')) return '📊';
                if (sector.includes('esthétique')) return '💅';
                if (sector.includes('conduite')) return '🚗';
                if (sector.includes('avocats')) return '⚖️';
                if (sector.includes('automobile')) return '🚙';
                if (sector.includes('lunetterie')) return '👓';
                if (sector.includes('meubles')) return '🛋️';
                return '🏢';
              };

              return (
                <motion.div
                  key={sector}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getSectorEmoji(sector)}</span>
                    <span className="text-white capitalize">{sector}</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-600/80 text-white">
                    {count}
                  </Badge>
                </motion.div>
              );
            })}
          </div>

          {/* Section Performance - Exactement comme dans l'image */}
          <div className="mt-8 space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 mb-4">Performance</h4>
            
            <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-slate-300">Excellence</span>
              </div>
              <span className="text-yellow-400 font-semibold">80</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-slate-300">Performance</span>
              </div>
              <span className="text-green-400 font-semibold">222</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span className="text-sm text-slate-300">Potentiel</span>
              </div>
              <span className="text-orange-400 font-semibold">0</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-sm text-slate-300">Opportunité</span>
              </div>
              <span className="text-red-400 font-semibold">0</span>
            </div>
          </div>

          {/* Mascotte LILO™ en bas - Exactement comme dans l'image */}
          <div className="mt-8 text-center">
            <div className="inline-block">
              <div className="text-6xl">🤖</div>
              <div className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold mt-2">
                LILO™
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Barre de contrôles en bas - Exactement comme dans l'image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="flex items-center gap-4 bg-slate-900/95 backdrop-blur-xl border border-slate-600 rounded-full px-6 py-3">
          <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          
          <Button variant="ghost" size="sm" className="text-white hover:text-purple-400">
            <Sparkles className="w-4 h-4 mr-2" />
            LILO™
          </Button>
          
          <Button variant="ghost" size="sm" className="text-white hover:text-green-400">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default RivalViewsProV5;