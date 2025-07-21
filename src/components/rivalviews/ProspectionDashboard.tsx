import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Users, 
  Star,
  Target,
  Zap,
  RefreshCw,
  Download
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ProspectionDashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const TARGET_CITIES = [
    'Montreal', 'Laval', 'Longueuil', 'Gatineau', 'Quebec City'
  ];

  const TARGET_CATEGORIES = [
    'car dealership', 'mattress store', 'furniture store', 
    'law firm', 'real estate agent', 'restaurant', 
    'hair salon', 'roofing contractor', 'auto repair', 
    'electrician', 'plumber', 'dentist'
  ];

  const runFullProspection = async () => {
    setIsRunning(true);
    setProgress(0);
    
    try {
      toast.info('Démarrage de la prospection géolocalisée automatisée...');
      
      // Simulation du progrès
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 2, 90));
      }, 1000);

      const { data, error } = await supabase.functions.invoke('data-synchronizer', {
        body: {
          action: 'full_workflow',
          cities: TARGET_CITIES,
          categories: TARGET_CATEGORIES
        }
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) {
        throw new Error(error.message);
      }

      setResults(data.result);
      toast.success(`Prospection terminée ! ${data.result?.summary?.new_businesses_added || 0} nouvelles entreprises ajoutées.`);
      
    } catch (error) {
      console.error('Prospection error:', error);
      toast.error('Erreur lors de la prospection automatisée');
    } finally {
      setIsRunning(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const runILACalculation = async () => {
    try {
      toast.info('Calcul des scores ILA en cours...');
      
      const { data, error } = await supabase.functions.invoke('ila-calculator', {
        body: { batchMode: true }
      });

      if (error) throw new Error(error.message);
      
      toast.success(`Scores ILA calculés pour ${data.summary?.successful || 0} entreprises`);
      
    } catch (error) {
      console.error('ILA calculation error:', error);
      toast.error('Erreur lors du calcul des scores ILA');
    }
  };

  const syncRivalViews = async () => {
    try {
      toast.info('Synchronisation RivalViews en cours...');
      
      const { data, error } = await supabase.functions.invoke('data-synchronizer', {
        body: { action: 'sync_rivalviews' }
      });

      if (error) throw new Error(error.message);
      
      toast.success('Données RivalViews synchronisées avec succès');
      
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Erreur lors de la synchronisation');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec actions principales */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Prospection Automatisée</h2>
          <p className="text-muted-foreground">
            Automatisation complète de la prospection géolocalisée avec IA
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={runFullProspection}
            disabled={isRunning}
            className="bg-primary hover:bg-primary/90"
          >
            {isRunning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                En cours...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Lancer Prospection
              </>
            )}
          </Button>
          
          <Button variant="outline" onClick={runILACalculation}>
            <Target className="h-4 w-4 mr-2" />
            Calculer ILA
          </Button>
          
          <Button variant="outline" onClick={syncRivalViews}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Synchroniser
          </Button>
        </div>
      </div>

      {/* Barre de progression */}
      {isRunning && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Prospection en cours...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Recherche et enrichissement des données dans {TARGET_CITIES.length} villes
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="cities">Villes Cibles</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="results">Résultats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Villes Cibles</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{TARGET_CITIES.length}</div>
                <p className="text-xs text-muted-foreground">
                  Québec métropolitain
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Secteurs</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{TARGET_CATEGORIES.length}</div>
                <p className="text-xs text-muted-foreground">
                  Catégories d'entreprises
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">APIs Connectées</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Google Maps, SERP, AI, GMB
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Potentiel</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1000+</div>
                <p className="text-xs text-muted-foreground">
                  Entreprises par ville
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Workflow d'Automatisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="bg-blue-50">1</Badge>
                  <div>
                    <h4 className="font-medium">Prospection Géolocalisée</h4>
                    <p className="text-sm text-muted-foreground">
                      Recherche automatique via Google Maps API dans toutes les villes cibles
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="bg-green-50">2</Badge>
                  <div>
                    <h4 className="font-medium">Enrichissement Multi-Source</h4>
                    <p className="text-sm text-muted-foreground">
                      SERP API + OpenAI pour données SEO, réseaux sociaux et analyse IA
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="bg-purple-50">3</Badge>
                  <div>
                    <h4 className="font-medium">Calcul Score ILA™</h4>
                    <p className="text-sm text-muted-foreground">
                      Algorithme avancé avec pondération sectorielle et benchmark local
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="bg-orange-50">4</Badge>
                  <div>
                    <h4 className="font-medium">Intégration RivalViews™</h4>
                    <p className="text-sm text-muted-foreground">
                      Synchronisation temps réel avec dashboards et recommandations cross-platform
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Villes Cibles - Québec Métropolitain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TARGET_CITIES.map((city) => (
                  <div key={city} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">{city}</h4>
                      <p className="text-sm text-muted-foreground">
                        Rayon de recherche: 15km
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Secteurs d'Activité Ciblés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {TARGET_CATEGORIES.map((category) => (
                  <Badge key={category} variant="secondary" className="justify-start p-2">
                    <Building2 className="h-4 w-4 mr-2" />
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results ? (
            <div className="space-y-4">
              {results.summary && (
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé de la Dernière Prospection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {results.summary.new_businesses_added || 0}
                        </div>
                        <p className="text-sm text-muted-foreground">Nouvelles entreprises</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {results.summary.businesses_enriched || 0}
                        </div>
                        <p className="text-sm text-muted-foreground">Enrichies avec IA</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                          {results.summary.ila_scores_calculated || 0}
                        </div>
                        <p className="text-sm text-muted-foreground">Scores ILA calculés</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {results.summary?.cities_analyzed && (
                <Card>
                  <CardHeader>
                    <CardTitle>Analyse par Ville</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.summary.cities_analyzed.map((city: any) => (
                        <div key={city.city} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{city.city}</h4>
                            <p className="text-sm text-muted-foreground">
                              {city.total_businesses} entreprises • Score ILA moyen: {city.average_ila}
                            </p>
                          </div>
                          <Badge variant={city.high_potential > 0 ? "default" : "secondary"}>
                            {city.high_potential} haute potentiel
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <p>Aucune prospection exécutée récemment.</p>
                  <p className="text-sm">Lancez une prospection pour voir les résultats ici.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProspectionDashboard;