import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client.ts';
import { toast } from 'sonner';
import { 
  Search, 
  MapPin, 
  Building, 
  Users, 
  TrendingUp, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Target,
  Zap,
  Database,
  BarChart3
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  sector?: string;
  city?: string;
}

interface ProspectionResult {
  total_processed: number;
  total_saved: number;
  total_existing: number;
  total_errors: number;
  summary: Array<{
    city: string;
    total_businesses: number;
    new_businesses: number;
    existing_businesses: number;
  }>;
  // Additional fields for API test results
  success?: boolean;
  message?: string;
  error?: string;
  details?: any;
  businesses?: any[];
  total_found?: number;
  recommendations?: string[];
  urgent_actions?: string[];
  help_links?: any;
}

interface ProspectionRequest {
  keyword: string;
  city: string;
  clientId?: string;
  maxResults: number;
}

const ProspectionModule: React.FC = () => {
  // États du formulaire
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [maxResults, setMaxResults] = useState(20);
  
  // États du processus
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ProspectionResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  
  // États des données
  const [clients, setClients] = useState<Client[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Suggestions de mots-clés populaires
  const POPULAR_KEYWORDS = [
    'restaurant', 'avocat', 'dentiste', 'coiffeur', 'garage', 'pharmacie',
    'boulangerie', 'fleuriste', 'vétérinaire', 'électricien', 'plombier',
    'magasin de meubles', 'magasin de matelas', 'concessionnaire',
    'cabinet comptable', 'agence immobilière', 'spa', 'fitness'
  ];

  // Villes du Québec populaires
  const QUEBEC_CITIES = [
    'Montréal', 'Laval', 'Québec', 'Longueuil', 'Sherbrooke', 'Gatineau',
    'Trois-Rivières', 'Saint-Laurent', 'Brossard', 'Lévis', 'Terrebonne',
    'Saint-Jean-sur-Richelieu', 'Repentigny', 'Drummondville', 'Saint-Jérôme'
  ];

  // Étapes de la prospection
  const PROSPECTION_STEPS = [
    { label: "🔍 Recherche par mot-clé", description: "Analyse des mots-clés et de la géolocalisation" },
    { label: "📍 Géolocalisation Google Maps", description: "Extraction des coordonnées et adresses" },
    { label: "🏢 Enrichissement données", description: "Collecte GMB, avis, photos, contacts" },
    { label: "🧠 Calcul Score ILA™", description: "Analyse SEO, présence sociale, réputation" },
    { label: "💾 Injection Supabase", description: "Sauvegarde structurée en base de données" },
    { label: "✅ Finalisation", description: "Validation et mise à disposition" }
  ];

  // Charger les clients depuis le CRM
  useEffect(() => {
    const loadClients = async () => {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('id, name, sector, city')
          .eq('status', 'client')
          .limit(50);

        if (data && !error) {
          setClients(data);
        }
      } catch (error) {
        console.error('Erreur chargement clients:', error);
      }
    };

    loadClients();

    // Charger les recherches récentes depuis localStorage
    const saved = localStorage.getItem('iluma_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Valider le formulaire
  const isFormValid = () => {
    return keyword.trim().length >= 3 && city.trim().length >= 2;
  };

  // Sauvegarder une recherche
  const saveSearch = (searchTerm: string) => {
    const searches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 10);
    setRecentSearches(searches);
    localStorage.setItem('iluma_recent_searches', JSON.stringify(searches));
  };

  // Test et activation de l'API Google Maps
  const testAPI = async () => {
    setIsLoading(true);
    setErrors([]);
    setResults(null); // Clear previous results
    
    try {
      toast.info("🧪 Test et activation de l'API Google Maps...");
      
      const { data, error } = await supabase.functions.invoke('geo-prospector', {
        body: { action: 'test-api' }
      });
      
      if (error) {
        console.error('API test error:', error);
        throw new Error(error.message);
      }
      
      console.log('API test response:', data);
      
      if (data?.success || data?.valid) {
        toast.success("✅ API Google Maps activée et opérationnelle!");
        setErrors([]); // Clear all errors
        
        // Set successful test results to show API is working
        setResults({
          total_processed: 0,
          total_saved: 0,
          total_existing: 0,
          total_errors: 0,
          summary: [],
          success: true,
          message: "✅ API Google Maps correctement configurée",
          details: {
            test_location: data.details?.test_location || "Montreal, QC",
            results_found: data.details?.results_found || 0,
            apis_working: data.details?.apis_working || ["Places API (new)"],
            timestamp: data.timestamp
          },
          businesses: [],
          total_found: 0,
          recommendations: data.recommendations || [
            "API is working correctly",
            "You can now use geo-prospector functionality",
            "All required Google Cloud APIs are enabled"
          ]
        });
        
        // Afficher les détails de la réussite
        if (data.details?.results_found > 0) {
          toast.info(`🎯 Test réussi: ${data.details.results_found} résultats trouvés à ${data.details.test_location}`);
        }
      } else {
        const errorMsg = data?.error || data?.details || "Configuration API invalide";
        console.error('API validation failed:', data);
        
        // Préparer les erreurs et suggestions
        const errorList = [errorMsg];
        if (data?.urgent_actions) {
          errorList.push(...data.urgent_actions);
        }
        if (data?.api_details?.suggestions) {
          errorList.push(...data.api_details.suggestions);
        }
        
        setErrors(errorList);
        setResults({
          total_processed: 0,
          total_saved: 0,
          total_existing: 0,
          total_errors: 0,
          summary: [],
          success: false,
          error: errorMsg,
          urgent_actions: data?.urgent_actions,
          help_links: data?.direct_links
        });
        toast.error(`❌ Configuration API requise: ${errorMsg}`);
        
        // Afficher les liens d'aide si disponibles
        if (data?.help_links?.length > 0) {
          toast.info("📖 Liens utiles affichés dans les détails ci-dessous");
        }
      }
    } catch (error: any) {
      console.error('Critical API test error:', error);
      const errorMsg = error.message || "Erreur de test API critique";
      setErrors([
        errorMsg,
        "Vérifiez votre connexion internet",
        "Consultez les logs de la fonction Edge dans Supabase"
      ]);
      setResults({
        total_processed: 0,
        total_saved: 0,
        total_existing: 0,
        total_errors: 0,
        summary: [],
        success: false,
        error: errorMsg
      });
      toast.error(`❌ Erreur critique: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Lancer la prospection
  const startProspection = async () => {
    if (!isFormValid()) {
      toast.error("Veuillez remplir les champs requis (mot-clé et ville)");
      return;
    }

    setIsLoading(true);
    setCurrentStep(0);
    setProgress(0);
    setResults(null);
    setErrors([]);

    const searchTerm = `${keyword} à ${city}`;
    saveSearch(searchTerm);

    try {
      // Animation des étapes
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev < PROSPECTION_STEPS.length - 1 ? prev + 1 : prev;
          setProgress((next / (PROSPECTION_STEPS.length - 1)) * 100);
          return next;
        });
      }, 2000);

      toast.info(`🚀 Lancement : prospection "${searchTerm}"`);

      // Appel à l'Edge Function
      const requestData: ProspectionRequest = {
        keyword,
        city,
        clientId: selectedClient === 'none' ? undefined : selectedClient || undefined,
        maxResults
      };

      const { data, error } = await supabase.functions.invoke('geo-prospector', {
        body: {
          cities: [city],
          categories: [keyword],
          maxResults,
          clientId: selectedClient === 'none' ? null : selectedClient || null
        }
      });

      clearInterval(stepInterval);
      setCurrentStep(PROSPECTION_STEPS.length - 1);
      setProgress(100);

      if (error) {
        console.error('Erreur prospection:', error);
        setErrors([error.message]);
        toast.error(`❌ Erreur : ${error.message}`);
        return;
      }

      if (data?.error) {
        console.error('Erreur API:', data);
        setErrors([data.error, ...(data.suggestions || [])]);
        toast.error(`❌ ${data.error}`);
        return;
      }

      console.log('Résultats prospection:', data);
      setResults(data.results);
      
      toast.success(`✅ Prospection terminée ! ${data.results.total_saved} nouvelles entreprises`);

      // Calcul automatique des scores ILA™
      if (data.results.total_saved > 0) {
        toast.info("🧮 Calcul des Scores ILA™...");
        
        const { error: ilaError } = await supabase.functions.invoke('ila-calculator', {
          body: { recalculate_all: false }
        });

        if (ilaError) {
          console.warn('Erreur calcul ILA:', ilaError);
          toast.warning("⚠️ Scores ILA™ calculés partiellement");
        } else {
          toast.success("🎯 Scores ILA™ calculés avec succès !");
        }
      }

    } catch (error: any) {
      console.error('Erreur prospection:', error);
      setErrors([error?.message || 'Erreur technique inconnue']);
      toast.error("❌ Erreur technique lors de la prospection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulaire de prospection */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Prospection Géolocalisée Intelligente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Status API dynamique */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                  🚀 Système de Prospection IA - Prêt pour l'activation
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                  <div>• API Google Maps: Prête à activer automatiquement</div>
                  <div>• Places API (new): Auto-configuration au premier test</div>
                  <div>• Géolocalisation: Montréal, Laval, Québec +12 villes</div>
                  <div>• Score ILA™: Calcul automatique post-prospection</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ligne 1: Mot-clé et Ville */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mot-clé / Catégorie *</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ex: avocat, restaurant, dentiste..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-10"
                  list="keywords-suggestions"
                />
                <datalist id="keywords-suggestions">
                  {POPULAR_KEYWORDS.map(kw => (
                    <option key={kw} value={kw} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ville *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ex: Montréal, Laval, Québec..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="pl-10"
                  list="cities-suggestions"
                />
                <datalist id="cities-suggestions">
                  {QUEBEC_CITIES.map(city => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Ligne 2: Client CRM et Nombre de résultats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Client CRM (optionnel)</label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Sélectionner un client..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucun client spécifique</SelectItem>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} {client.city && `(${client.city})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre max de résultats</label>
              <Select value={maxResults.toString()} onValueChange={(v) => setMaxResults(parseInt(v))}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 entreprises</SelectItem>
                  <SelectItem value="20">20 entreprises</SelectItem>
                  <SelectItem value="50">50 entreprises</SelectItem>
                  <SelectItem value="100">100 entreprises</SelectItem>
                  <SelectItem value="200">200 entreprises</SelectItem>
                  <SelectItem value="500">500 entreprises</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Recherches récentes */}
          {recentSearches.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Recherches récentes :</label>
              <div className="flex flex-wrap gap-2">
                {recentSearches.slice(0, 5).map((search, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => {
                      const parts = search.split(' à ');
                      if (parts.length === 2) {
                        setKeyword(parts[0]);
                        setCity(parts[1]);
                      }
                    }}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="space-y-3">
            {/* Bouton de test et activation API */}
            <Button 
              onClick={testAPI}
              disabled={isLoading}
              variant="outline"
              className="w-full border-primary/40 hover:bg-primary/10"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Activation en cours...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2 text-primary" />
                  Activer et Tester les APIs Google
                </>
              )}
            </Button>

            {/* Bouton de lancement principal */}
            <Button 
              onClick={startProspection}
              disabled={isLoading || !isFormValid()}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Prospection en cours...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Lancer la Prospection Automatisée
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progression en temps réel */}
      {isLoading && (
        <Card className="border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Prospection en cours - {keyword} à {city}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} className="w-full" />
            
            <div className="space-y-3">
              {PROSPECTION_STEPS.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                    index <= currentStep 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-muted/5'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {index < currentStep ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : index === currentStep ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.label}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Résultats de la prospection */}
      {results && (
        <Card className="border-green-500/20 bg-green-500/5 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Prospection Terminée - {keyword} à {city}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Métriques principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{results.total_processed}</div>
                  <div className="text-sm text-muted-foreground">Entreprises traitées</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">{results.total_saved}</div>
                  <div className="text-sm text-muted-foreground">Nouvelles ajoutées</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">{results.total_existing}</div>
                  <div className="text-sm text-muted-foreground">Déjà en base</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">{results.total_errors}</div>
                  <div className="text-sm text-muted-foreground">Erreurs</div>
                </CardContent>
              </Card>
            </div>

            {/* Résumé par ville */}
            {results.summary && results.summary.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Détail par ville :
                </h3>
                {results.summary.map((cityResult, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">{cityResult.city}</span>
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="outline">{cityResult.total_businesses} total</Badge>
                      <Badge variant="default" className="bg-green-500">
                        {cityResult.new_businesses} nouvelles
                      </Badge>
                      <Badge variant="secondary">
                        {cityResult.existing_businesses} existantes
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions rapides */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Voir dans RivalViews™
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Assigner aux commerciaux
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyser les Scores ILA™
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Erreurs et assistance avancée */}
      {errors.length > 0 && (
        <Card className="border-amber-500/20 bg-amber-500/5 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              Configuration API Google Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Messages d'erreur */}
            <div className="space-y-2">
              {errors.map((error, index) => (
                <div key={index} className="text-sm text-amber-700 dark:text-amber-300 p-2 bg-amber-100/50 dark:bg-amber-900/20 rounded border-l-4 border-amber-400">
                  {index === 0 ? '🚨 ' : '• '}{error}
                </div>
              ))}
            </div>
            
            {/* Guide de configuration détaillé */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Guide Configuration Google Cloud Console
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400">🎯 Étapes obligatoires :</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1 ml-3">
                    <div>1. Aller sur <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">console.cloud.google.com</code></div>
                    <div>2. Dans "API Library", rechercher et activer :</div>
                    <div className="ml-3">
                      <div>• <strong>Places API (new)</strong></div>
                      <div>• <strong>Maps JavaScript API</strong></div>
                      <div>• <strong>Geocoding API</strong> (optionnel)</div>
                    </div>
                    <div>3. Dans "Credentials", vérifier que votre clé API n'a pas de restrictions trop strictes</div>
                    <div>4. Dans "Billing", s'assurer qu'un mode de paiement valide est configuré</div>
                    <div>5. Revenir ici et cliquer "Activer et Tester les APIs"</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400">🔗 Liens directs utiles :</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1 ml-3">
                    <div>• <code>console.cloud.google.com/apis/library/places-backend.googleapis.com</code></div>
                    <div>• <code>console.cloud.google.com/apis/library/maps-backend.googleapis.com</code></div>
                    <div>• <code>console.cloud.google.com/apis/credentials</code></div>
                  </div>
                </div>
                
                <div className="text-xs text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-900/20 p-2 rounded border-l-2 border-green-400">
                  💡 Une fois configuré, le système activera automatiquement toutes les fonctionnalités de prospection géolocalisée !
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProspectionModule;