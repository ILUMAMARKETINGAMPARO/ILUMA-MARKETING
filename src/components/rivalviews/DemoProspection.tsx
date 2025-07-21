import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MapPin, Building, TrendingUp, Loader2, CheckCircle } from 'lucide-react';
import { emitProspectionComplete } from '@/utils/globalEvents';

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
}

const DemoProspection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProspectionResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "🔍 Recherche des magasins de meubles à Laval",
    "📍 Géolocalisation via Google Maps API", 
    "🏢 Enrichissement données GMB",
    "📊 Calcul Score ILA™",
    "💾 Injection en Supabase",
    "✅ Validation et affichage"
  ];

  const startProspection = async () => {
    setIsLoading(true);
    setCurrentStep(0);
    setResults(null);

    try {
      // Progression des étapes
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => prev < steps.length - 1 ? prev + 1 : prev);
      }, 1500);

      toast.info("🚀 Lancement de la prospection automatisée...");

      const { data, error } = await supabase.functions.invoke('geo-prospector', {
        body: {
          cities: ['Laval'],
          categories: ['furniture store'],
          maxResults: 10
        }
      });

      clearInterval(stepInterval);
      setCurrentStep(steps.length - 1);

      if (error) {
        console.error('Erreur prospection:', error);
        toast.error("Erreur lors de la prospection: " + error.message);
        return;
      }

      console.log('Résultats prospection:', data);
      setResults(data.results);
      
      toast.success(`✅ Prospection terminée ! ${data.results.total_saved} nouvelles entreprises ajoutées`);

      // Déclencher le calcul ILA™ pour les nouvelles entreprises
      if (data.results.total_saved > 0) {
        toast.info("🧮 Calcul des Scores ILA™ en cours...");
        
        const { error: ilaError } = await supabase.functions.invoke('ila-calculator', {
          body: { recalculate_all: false }
        });

        if (ilaError) {
          console.error('Erreur calcul ILA:', ilaError);
          toast.warning("Scores ILA™ calculés partiellement");
        } else {
          toast.success("🎯 Scores ILA™ calculés avec succès !");
        }

        // 🌐 ÉMETTRE L'ÉVÉNEMENT GLOBAL DE PROSPECTION TERMINÉE
        emitProspectionComplete({
          total_saved: data.results.total_saved,
          total_processed: data.results.total_processed,
          cities: data.results.summary?.map(s => s.city) || ['Laval']
        });

        // Notification interactive pour voir les nouvelles données
        setTimeout(() => {
          toast.success(
            `🗺️ ${data.results.total_saved} nouvelles entreprises disponibles sur la carte !`,
            {
              duration: 5000,
              action: {
                label: "Voir sur la carte",
                onClick: () => {
                  // L'événement permettra au RevolveViewsClient de se mettre à jour
                  console.log('Redirection vers la carte...');
                }
              }
            }
          );
        }, 1000);
      }

    } catch (error) {
      console.error('Erreur lors de la prospection:', error);
      toast.error("Erreur technique lors de la prospection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            Démonstration Prospection IA - Magasins de Meubles Laval
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Bouton de lancement */}
          <Button 
            onClick={startProspection}
            disabled={isLoading}
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
                <TrendingUp className="h-4 w-4 mr-2" />
                Lancer la Prospection Automatisée
              </>
            )}
          </Button>

          {/* Progression des étapes */}
          {isLoading && (
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                    index <= currentStep 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : index === currentStep ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          )}

          {/* Résultats */}
          {results && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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
                  <div className="text-sm text-muted-foreground">Déjà existantes</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">{results.total_errors}</div>
                  <div className="text-sm text-muted-foreground">Erreurs</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Résumé par ville */}
          {results?.summary && results.summary.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Résumé par ville :</h3>
              {results.summary.map((cityResult, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{cityResult.city}</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <Badge variant="outline">{cityResult.total_businesses} total</Badge>
                    <Badge variant="default">{cityResult.new_businesses} nouvelles</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoProspection;