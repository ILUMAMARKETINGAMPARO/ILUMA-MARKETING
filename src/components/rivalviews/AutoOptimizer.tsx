import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, CheckCircle2, MapPin, Database, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AutoOptimizerProps {
  onOptimizationComplete: () => void;
}

const AutoOptimizer: React.FC<AutoOptimizerProps> = ({ onOptimizationComplete }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    processed: number;
    geocoded: number;
    cleaned: number;
    errors: number;
    success_rate: number;
  } | null>(null);
  const { toast } = useToast();

  const runAutoOptimization = async () => {
    setIsOptimizing(true);
    setProgress(0);
    setResults(null);

    try {
      // Simuler le progrès pendant l'optimisation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) return prev + Math.random() * 10;
          return prev;
        });
      }, 1000);

      // Lancer l'optimisation automatique
      const { data, error } = await supabase.functions.invoke('optimize-businesses');

      clearInterval(progressInterval);
      setProgress(100);

      if (error) {
        throw error;
      }

      if (data.success) {
        setResults({
          processed: data.stats.processed,
          geocoded: data.stats.geocoded,
          cleaned: data.stats.cleaned,
          errors: data.stats.errors,
          success_rate: data.details?.success_rate || 0
        });

        toast({
          title: "🎉 Optimisation terminée !",
          description: `${data.stats.geocoded} entreprises géocodées et visibles sur la carte`,
          variant: "default",
        });

        // Attendre un peu puis refresh complet
        setTimeout(() => {
          // Force refresh de toute la page pour mettre à jour tous les composants
          window.location.reload();
        }, 1500);
      } else {
        throw new Error(data.error || 'Erreur inconnue');
      }

    } catch (error) {
      console.error('Erreur optimisation:', error);
      toast({
        title: "Erreur d'optimisation",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-black via-[#1a0b2e] to-black border border-[#8E44FF]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="p-2 bg-[#8E44FF]/20 rounded-lg">
            <Zap className="h-6 w-6 text-[#8E44FF]" />
          </div>
          Optimisation Automatique RivalViews™
        </CardTitle>
        <CardDescription className="text-white/70">
          Traitement intelligent de vos 321 entreprises : nettoyage, géocodage et affichage sur la carte
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!results && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-black/40 rounded-lg border border-white/10">
                <Database className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white text-sm font-medium">Nettoyage</div>
                <div className="text-white/60 text-xs">Restructuration des données</div>
              </div>
              <div className="text-center p-4 bg-black/40 rounded-lg border border-white/10">
                <MapPin className="h-8 w-8 text-[#8E44FF] mx-auto mb-2" />
                <div className="text-white text-sm font-medium">Géocodage</div>
                <div className="text-white/60 text-xs">Coordonnées GPS automatiques</div>
              </div>
              <div className="text-center p-4 bg-black/40 rounded-lg border border-white/10">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-white text-sm font-medium">Intégration</div>
                <div className="text-white/60 text-xs">Carte + CRM + Analytics</div>
              </div>
            </div>

            <Button
              onClick={runAutoOptimization}
              disabled={isOptimizing}
              className="w-full h-12 bg-gradient-to-r from-[#8E44FF] to-[#B666FF] hover:from-[#7D3AE6] hover:to-[#A555E6] text-white font-semibold text-lg"
            >
              {isOptimizing ? (
                <>
                  <Zap className="w-5 h-5 mr-2 animate-pulse" />
                  Optimisation en cours...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Lancer l'optimisation complète
                </>
              )}
            </Button>
          </>
        )}

        {isOptimizing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-white">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#8E44FF] animate-pulse" />
                Traitement des entreprises...
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
            <div className="text-center text-white/60 text-sm">
              Nettoyage des données et géocodage en cours...
            </div>
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xl font-bold text-white">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
              Optimisation terminée !
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">{results.geocoded}</div>
                <div className="text-sm text-white/80">Entreprises géocodées</div>
                <div className="text-xs text-green-300">Maintenant visibles sur la carte</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-[#8E44FF]/20 to-[#8E44FF]/10 rounded-lg border border-[#8E44FF]/30">
                <div className="text-2xl font-bold text-[#8E44FF]">{results.processed}</div>
                <div className="text-sm text-white/80">Entreprises traitées</div>
                <div className="text-xs text-[#8E44FF]/80">Données nettoyées et optimisées</div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/30">
              <div className="flex items-center gap-2 text-yellow-400 font-medium">
                <TrendingUp className="h-4 w-4" />
                Taux de réussite : {results.success_rate}%
              </div>
              <div className="text-white/70 text-sm mt-1">
                Vos entreprises sont maintenant intégrées dans RivalViews™, la carte interactive et le CRM Iluma™
              </div>
            </div>

            {results.errors > 0 && (
              <div className="text-center text-red-400 text-sm">
                {results.errors} erreurs rencontrées (données incomplètes)
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-white/50 bg-black/20 p-3 rounded border border-white/5">
          💡 <strong>Processus automatique :</strong> Extraction d'adresses, géocodage GPS, classification par secteur, synchronisation temps réel avec tous les modules Iluma™
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoOptimizer;