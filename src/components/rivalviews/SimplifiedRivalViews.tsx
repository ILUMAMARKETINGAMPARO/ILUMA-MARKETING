import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  Phone, 
  Globe, 
  Users, 
  BarChart3,
  Download,
  Heart,
  Eye,
  Filter,
  Search,
  List,
  Map,
  Building
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import RivalViewsCore from './RivalViewsCore';

// Interface simplifiée pour les données unifiées
interface UnifiedBusinessData {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  googleStars: number;
  googleReviews: number;
  facebookFollowers?: number;
  instagramFollowers?: number;
  tiktokFollowers?: number;
  branches: number;
  sector: string;
  city: string;
  lat: number;
  lng: number;
  
  // Données Ahrefs
  organicTraffic: number;
  keywords: number;
  backlinks: number;
  domainRating: number;
  
  // Données calculées
  ilaScore: number;
  digitalPresence: 'forte' | 'moyenne' | 'faible';
  competitionLevel: 'élevée' | 'moyenne' | 'faible';
}

type ViewMode = 'map' | 'list' | 'detail';

const SimplifiedRivalViews: React.FC = () => {
  const [businesses, setBusinesses] = useState<UnifiedBusinessData[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [selectedBusiness, setSelectedBusiness] = useState<UnifiedBusinessData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showGeocodeAssistant, setShowGeocodeAssistant] = useState(false);
  const [showLILOAnalysis, setShowLILOAnalysis] = useState(false);
  const [businessesToGeocode, setBusinessesToGeocode] = useState<any[]>([]);

  // Chargement et agrégation des données OPTIMISÉ
  const loadUnifiedData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Chargement des données unifiées...');

      // Charger TOUTES les entreprises avec GPS (plus restrictif)
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .not('lat', 'is', null)
        .not('lng', 'is', null)
        .neq('lat', 0)
        .neq('lng', 0);

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

      // Fusionner les données
      const unifiedData: UnifiedBusinessData[] = businessData?.map(business => {
        // Chercher correspondance dans prospection_iluma par nom
        const prospectionMatch = prospectionData?.find(p => 
          p['Nom de l\'entreprise']?.toLowerCase().includes(business.name.toLowerCase()) ||
          business.name.toLowerCase().includes(p['Nom de l\'entreprise']?.toLowerCase())
        );

        // Chercher correspondance dans ahref par domaine
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
          ilaScore: business.ila_score || 60,
          digitalPresence: calculateDigitalPresence(business, ahrefMatch),
          competitionLevel: calculateCompetitionLevel(business.sector, businessData)
        };
      }) || [];

      console.log(`📊 Données fusionnées: ${unifiedData.length} entreprises avec GPS valides`);
      
      // Identifier les entreprises sans GPS pour géocodage
      const needGeocode = businessData?.filter(b => !b.lat || !b.lng || b.lat === 0 || b.lng === 0) || [];
      setBusinessesToGeocode(needGeocode);
      
      setBusinesses(unifiedData);
      toast.success(`${unifiedData.length} concurrents chargés (${needGeocode.length} à géocoder)`);
      
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonctions utilitaires
  const calculateDigitalPresence = (business: any, ahrefMatch: any): 'forte' | 'moyenne' | 'faible' => {
    const traffic = Number(ahrefMatch?.['Total Traffic']) || 0;
    const keywords = Number(ahrefMatch?.['Total Keywords (asc)']) || 0;
    
    if (traffic > 1000 || keywords > 100) return 'forte';
    if (traffic > 100 || keywords > 20) return 'moyenne';
    return 'faible';
  };

  const calculateCompetitionLevel = (sector: string, allBusinesses: any[]): 'élevée' | 'moyenne' | 'faible' => {
    const sectorCount = allBusinesses.filter(b => b.sector === sector).length;
    if (sectorCount > 20) return 'élevée';
    if (sectorCount > 10) return 'moyenne';
    return 'faible';
  };

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

  // Export Excel
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
      'Score ILA': b.ilaScore
    }));
    
    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(v => `"${v}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rivalviews-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }, [filteredBusinesses]);

  // Gestion des favoris
  const toggleFavorite = useCallback((businessId: string) => {
    setFavorites(prev => 
      prev.includes(businessId) 
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId]
    );
  }, []);

  // Conversion pour la carte Mapbox
  const convertToRivalBusiness = useCallback((business: UnifiedBusinessData): RivalBusiness => ({
    id: business.id,
    name: business.name,
    address: business.address,
    city: business.city,
    phone: business.phone,
    email: business.email,
    website: business.website,
    sector: business.sector,
    googleRating: business.googleStars,
    reviewCount: business.googleReviews,
    serpRank: 1,
    isSponsored: false,
    source: 'GMB',
    lat: business.lat,
    lng: business.lng,
    ilaScore: business.ilaScore,
    status: 'prospect',
    potential: 'medium',
    isChain: business.branches > 1,
    chainCount: business.branches,
    indexedKeywords: business.keywords,
    top10Keywords: Math.floor(business.keywords * 0.1),
    backlinks: business.backlinks,
    organicTraffic: business.organicTraffic,
    totalComments: business.googleReviews,
    hasPhotos: true
  }), []);

  useEffect(() => {
    loadUnifiedData();
  }, [loadUnifiedData]);

  return (
    <RivalViewsCore
      businesses={filteredBusinesses.map(convertToRivalBusiness)}
      onBusinessClick={(business) => {
        const original = businesses.find(b => b.id === business.id);
        setSelectedBusiness(original || null);
        setShowLILOAnalysis(true);
      }}
      onExport={handleExport}
    />
  );
};

// Composant de fiche détaillée
const CompetitorDetailSheet: React.FC<{
  business: UnifiedBusinessData;
  onClose: () => void;
}> = ({ business, onClose }) => (
  <Card className="max-w-4xl mx-auto">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{business.name}</h2>
          <p className="text-muted-foreground">{business.sector} • {business.city}</p>
        </div>
        <Button variant="ghost" onClick={onClose}>
          ✕
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coordonnées */}
        <div>
          <h3 className="font-semibold mb-3">Coordonnées</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {business.address}
            </div>
            {business.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {business.phone}
              </div>
            )}
            {business.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {business.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Présence en ligne */}
        <div>
          <h3 className="font-semibold mb-3">Présence en ligne</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Google</span>
              <p>{business.googleStars}⭐ ({business.googleReviews} avis)</p>
            </div>
            <div>
              <span className="text-muted-foreground">Facebook</span>
              <p>{business.facebookFollowers || 0} followers</p>
            </div>
            <div>
              <span className="text-muted-foreground">Instagram</span>
              <p>{business.instagramFollowers || 0} followers</p>
            </div>
            <div>
              <span className="text-muted-foreground">TikTok</span>
              <p>{business.tiktokFollowers || 0} followers</p>
            </div>
          </div>
        </div>

        {/* Données SEO */}
        <div>
          <h3 className="font-semibold mb-3">Performance SEO</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Trafic organique</span>
              <p>{business.organicTraffic} visites/mois</p>
            </div>
            <div>
              <span className="text-muted-foreground">Mots-clés</span>
              <p>{business.keywords}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Backlinks</span>
              <p>{business.backlinks}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Domain Rating</span>
              <p>{business.domainRating}</p>
            </div>
          </div>
        </div>

        {/* Analyse concurrentielle */}
        <div>
          <h3 className="font-semibold mb-3">Analyse</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Score ILA™</span>
              <Badge variant={business.ilaScore > 70 ? 'default' : 'secondary'}>
                {business.ilaScore}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Présence digitale</span>
              <Badge variant={business.digitalPresence === 'forte' ? 'default' : 'secondary'}>
                {business.digitalPresence}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Concurrence</span>
              <Badge variant={business.competitionLevel === 'élevée' ? 'destructive' : 'secondary'}>
                {business.competitionLevel}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Succursales</span>
              <span className="text-sm">{business.branches}</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default SimplifiedRivalViews;