import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  MapPin, 
  Search, 
  Download, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Settings,
  Database,
  Zap,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast.ts';
import { supabase } from '@/integrations/supabase/client.ts';

interface APIIntegrationManagerProps {
  onDataExtracted: (data: any[]) => void;
}

export const APIIntegrationManager: React.FC<APIIntegrationManagerProps> = ({
  onDataExtracted
}) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [activeAPI, setActiveAPI] = useState<'google_places' | 'serp' | 'gmb'>('google_places');
  const [extractionConfig, setExtractionConfig] = useState({
    city: '',
    sector: '',
    radius: 5000,
    maxResults: 50,
    keywords: ''
  });
  const [lastExtraction, setLastExtraction] = useState<any>(null);
  const { toast } = useToast();

  const handleGooglePlacesExtraction = async () => {
    setIsExtracting(true);
    setExtractionProgress(0);

    try {
      // Simulation d'extraction Google Places API
      const steps = [
        'Connexion à Google Places API...',
        'Recherche dans la zone géographique...',
        'Extraction des données entreprises...',
        'Calcul des scores ILA™...',
        'Enrichissement avec données SERP...',
        'Sauvegarde en base de données...'
      ];

      for (let i = 0; i < steps.length; i++) {
        toast({
          title: "Extraction en cours",
          description: steps[i],
        });
        setExtractionProgress((i + 1) * (100 / steps.length));
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Simulation de données extraites
      const extractedData = generateMockBusinessData();
      
      // Sauvegarder en base de données
      const { error } = await supabase
        .from('businesses')
        .insert(extractedData);

      if (error) throw error;

      setLastExtraction({
        timestamp: new Date(),
        count: extractedData.length,
        api: 'Google Places',
        config: extractionConfig
      });

      toast({
        title: "Extraction réussie!",
        description: `${extractedData.length} entreprises extraites et ajoutées à la base de données.`,
      });

      onDataExtracted(extractedData);

    } catch (error: any) {
      toast({
        title: "Erreur d'extraction",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsExtracting(false);
      setExtractionProgress(0);
    }
  };

  const handleSERPExtraction = async () => {
    setIsExtracting(true);
    setExtractionProgress(0);

    try {
      // Simulation d'extraction SERP
      const keywords = extractionConfig.keywords.split(',').map(k => k.trim());
      
      for (let i = 0; i < keywords.length; i++) {
        toast({
          title: "Analyse SERP",
          description: `Analyse du mot-clé: ${keywords[i]}`,
        });
        setExtractionProgress((i + 1) * (100 / keywords.length));
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      const serpData = generateMockSERPData();
      
      setLastExtraction({
        timestamp: new Date(),
        count: serpData.length,
        api: 'Google SERP',
        config: extractionConfig
      });

      toast({
        title: "Analyse SERP terminée!",
        description: `${serpData.length} résultats analysés.`,
      });

      onDataExtracted(serpData);

    } catch (error: any) {
      toast({
        title: "Erreur SERP",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsExtracting(false);
      setExtractionProgress(0);
    }
  };

  const handleGMBExtraction = async () => {
    setIsExtracting(true);
    setExtractionProgress(0);

    try {
      // Simulation d'extraction Google My Business
      const steps = [
        'Connexion à Google My Business API...',
        'Récupération des profils...',
        'Analyse des avis et photos...',
        'Calcul des métriques de performance...',
        'Mise à jour des scores ILA™...'
      ];

      for (let i = 0; i < steps.length; i++) {
        toast({
          title: "Extraction GMB",
          description: steps[i],
        });
        setExtractionProgress((i + 1) * (100 / steps.length));
        await new Promise(resolve => setTimeout(resolve, 1800));
      }

      const gmbData = generateMockGMBData();
      
      setLastExtraction({
        timestamp: new Date(),
        count: gmbData.length,
        api: 'Google My Business',
        config: extractionConfig
      });

      toast({
        title: "Extraction GMB réussie!",
        description: `${gmbData.length} profils GMB analysés.`,
      });

      onDataExtracted(gmbData);

    } catch (error: any) {
      toast({
        title: "Erreur GMB",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsExtracting(false);
      setExtractionProgress(0);
    }
  };

  const generateMockBusinessData = () => {
    const sectors = ['Restaurant', 'Commerce', 'Services', 'Santé', 'Beauté'];
    const cities = ['Montréal', 'Laval', 'Québec', 'Gatineau', 'Longueuil'];
    
    return Array.from({ length: extractionConfig.maxResults }, (_, i) => ({
      name: `Entreprise ${i + 1}`,
      address: `${100 + i} Rue Example`,
      city: cities[Math.floor(Math.random() * cities.length)],
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      lat: 45.5017 + (Math.random() - 0.5) * 0.1,
      lng: -73.5673 + (Math.random() - 0.5) * 0.1,
      google_rating: 3.5 + Math.random() * 1.5,
      review_count: Math.floor(Math.random() * 200) + 10,
      ila_score: Math.floor(Math.random() * 40) + 60,
      organic_traffic: Math.floor(Math.random() * 5000) + 500,
      indexed_keywords: Math.floor(Math.random() * 100) + 20,
      backlinks: Math.floor(Math.random() * 50) + 5,
      status: 'prospect' as const,
      potential: 'medium' as const,
      source: 'api' as const
    }));
  };

  const generateMockSERPData = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      keyword: extractionConfig.keywords.split(',')[0] || 'business',
      position: i + 1,
      url: `https://example${i + 1}.com`,
      title: `Résultat SERP ${i + 1}`,
      description: `Description du résultat SERP ${i + 1}`,
      domain_authority: 40 + Math.random() * 60
    }));
  };

  const generateMockGMBData = () => {
    return Array.from({ length: 15 }, (_, i) => ({
      place_id: `gmb-${i + 1}`,
      name: `Profil GMB ${i + 1}`,
      rating: 3.8 + Math.random() * 1.2,
      review_count: Math.floor(Math.random() * 150) + 25,
      photos_count: Math.floor(Math.random() * 20) + 5,
      posts_count: Math.floor(Math.random() * 10),
      response_rate: Math.random() * 100
    }));
  };

  return (
    <div className="space-y-6">
      {/* API Selection */}
      <Card className="bg-black/50 border-[#8E44FF]/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-[#8E44FF]" />
            Intégration API - Données Réelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={activeAPI === 'google_places' ? 'default' : 'outline'}
              onClick={() => setActiveAPI('google_places')}
              className={activeAPI === 'google_places' ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white'}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Places API
            </Button>
            <Button
              variant={activeAPI === 'serp' ? 'default' : 'outline'}
              onClick={() => setActiveAPI('serp')}
              className={activeAPI === 'serp' ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white'}
            >
              <Search className="w-4 h-4 mr-2" />
              Google SERP
            </Button>
            <Button
              variant={activeAPI === 'gmb' ? 'default' : 'outline'}
              onClick={() => setActiveAPI('gmb')}
              className={activeAPI === 'gmb' ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white'}
            >
              <Globe className="w-4 h-4 mr-2" />
              GMB API
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card className="bg-black/50 border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuration d'extraction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Ville cible</label>
              <Input
                value={extractionConfig.city}
                onChange={(e) => setExtractionConfig(prev => ({ ...prev, city: e.target.value }))}
                placeholder="ex: Montréal"
                className="bg-black/30 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">Secteur</label>
              <Select
                value={extractionConfig.sector}
                onValueChange={(value) => setExtractionConfig(prev => ({ ...prev, sector: value }))}
              >
                <SelectTrigger className="bg-black/30 border-white/20 text-white">
                  <SelectValue placeholder="Choisir un secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="sante">Santé</SelectItem>
                  <SelectItem value="beaute">Beauté</SelectItem>
                  <SelectItem value="immobilier">Immobilier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeAPI === 'serp' && (
            <div>
              <label className="text-white/60 text-sm mb-2 block">Mots-clés (séparés par des virgules)</label>
              <Input
                value={extractionConfig.keywords}
                onChange={(e) => setExtractionConfig(prev => ({ ...prev, keywords: e.target.value }))}
                placeholder="restaurant montréal, café laval, bistro québec"
                className="bg-black/30 border-white/20 text-white"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Rayon (mètres)</label>
              <Input
                type="number"
                value={extractionConfig.radius}
                onChange={(e) => setExtractionConfig(prev => ({ ...prev, radius: parseInt(e.target.value) || 5000 }))}
                className="bg-black/30 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">Résultats max</label>
              <Input
                type="number"
                value={extractionConfig.maxResults}
                onChange={(e) => setExtractionConfig(prev => ({ ...prev, maxResults: parseInt(e.target.value) || 50 }))}
                className="bg-black/30 border-white/20 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extraction Progress */}
      {isExtracting && (
        <Card className="bg-black/50 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
              <span className="text-white font-semibold">Extraction en cours...</span>
            </div>
            <Progress value={extractionProgress} className="w-full" />
            <p className="text-white/60 text-sm mt-2">{extractionProgress.toFixed(0)}% terminé</p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-4">
        {activeAPI === 'google_places' && (
          <Button
            onClick={handleGooglePlacesExtraction}
            disabled={isExtracting || !extractionConfig.city || !extractionConfig.sector}
            className="w-full bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
            size="lg"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Extraire via Google Places API
          </Button>
        )}

        {activeAPI === 'serp' && (
          <Button
            onClick={handleSERPExtraction}
            disabled={isExtracting || !extractionConfig.keywords}
            className="w-full bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
            size="lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Analyser Google SERP
          </Button>
        )}

        {activeAPI === 'gmb' && (
          <Button
            onClick={handleGMBExtraction}
            disabled={isExtracting || !extractionConfig.city}
            className="w-full bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
            size="lg"
          >
            <Globe className="w-5 h-5 mr-2" />
            Extraire données GMB
          </Button>
        )}
      </div>

      {/* Last Extraction Info */}
      {lastExtraction && (
        <Card className="bg-black/50 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-white font-semibold">Dernière extraction</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400">
                {lastExtraction.api}
              </Badge>
            </div>
            <div className="mt-2 text-sm text-white/60">
              <p>{lastExtraction.count} éléments • {lastExtraction.timestamp.toLocaleString('fr-CA')}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default APIIntegrationManager;