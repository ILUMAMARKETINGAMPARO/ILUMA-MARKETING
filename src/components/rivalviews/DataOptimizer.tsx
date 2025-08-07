import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Database, Zap, CheckCircle2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DataOptimizerProps {
  onOptimizationComplete: () => void;
}

const DataOptimizer: React.FC<DataOptimizerProps> = ({ onOptimizationComplete }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [results, setResults] = useState<{
    processed: number;
    geocoded: number;
    cleaned: number;
    errors: number;
  } | null>(null);
  const { toast } = useToast();

  const optimizeData = async () => {
    setIsOptimizing(true);
    setProgress(0);
    setResults(null);

    try {
      // 1. Récupérer toutes les entreprises sans coordonnées
      setCurrentStep('Récupération des données...');
      setProgress(5);

      const { data: businesses, error: fetchError } = await supabase
        .from('businesses')
        .select('*')
        .or('lat.is.null,lng.is.null');

      if (fetchError) throw fetchError;

      if (!businesses || businesses.length === 0) {
        toast({
          title: "Aucune donnée à optimiser",
          description: "Toutes les entreprises ont déjà des coordonnées",
          variant: "default",
        });
        setIsOptimizing(false);
        return;
      }

      const total = businesses.length;
      let processed = 0;
      let geocoded = 0;
      let cleaned = 0;
      let errors = 0;

      setProgress(10);

      // 2. Traiter chaque entreprise
      for (let i = 0; i < businesses.length; i++) {
        const business = businesses[i];
        setCurrentStep(`Optimisation ${i + 1}/${total}: ${business.name}`);
        setProgress(10 + ((i + 1) / total) * 80);

        try {
          // Nettoyer et restructurer les données
          const cleanedData = await cleanBusinessData(business);
          
          // Géocoder l'adresse si possible
          let geocodingResult = null;
          if (cleanedData.fullAddress) {
            geocodingResult = await geocodeAddress(cleanedData.fullAddress);
            if (geocodingResult) {
              geocoded++;
            }
          }

          // Mettre à jour en base
          const updateData = {
            ...cleanedData,
            ...(geocodingResult && {
              lat: geocodingResult.lat,
              lng: geocodingResult.lng
            }),
            updated_at: new Date().toISOString()
          };

          const { error: updateError } = await supabase
            .from('businesses')
            .update(updateData)
            .eq('id', business.id);

          if (updateError) throw updateError;

          processed++;
          cleaned++;

          // Pause pour éviter la surcharge de l'API
          if (i % 3 === 0) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }

        } catch (error) {
          console.error(`Erreur pour ${business.name}:`, error);
          errors++;
        }
      }

      setProgress(100);
      setCurrentStep('Optimisation terminée !');
      setResults({ processed, geocoded, cleaned, errors });

      toast({
        title: "Optimisation terminée !",
        description: `${geocoded} entreprises géocodées, ${cleaned} nettoyées`,
        variant: "default",
      });

      onOptimizationComplete();

    } catch (error) {
      console.error('Erreur lors de l\'optimisation:', error);
      toast({
        title: "Erreur d'optimisation",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const cleanBusinessData = async (business: any) => {
    // Extraire les informations de l'adresse depuis le nom si nécessaire
    let address = business.address;
    let city = business.city;
    let name = business.name;

    // Si le nom contient une adresse complète (format: "123 Rue Example, Ville, QC Code")
    if (business.name && business.name.includes(',') && !address) {
      const parts = business.name.split(',').map((p: string) => p.trim());
      if (parts.length >= 2) {
        address = parts[0]; // Première partie = adresse
        city = parts[1]; // Deuxième partie = ville
        
        // Extraire le nom de l'entreprise si possible (souvent avant l'adresse)
        const addressMatch = business.name.match(/^([^0-9]+?)(\d.+)/);
        if (addressMatch) {
          name = addressMatch[1].trim();
          address = addressMatch[2].split(',')[0].trim();
        }
      }
    }

    // Nettoyer le nom
    name = name || 'Entreprise inconnue';
    if (name.length > 100) {
      name = name.substring(0, 97) + '...';
    }

    // Déterminer le secteur basé sur le nom/mot-clés
    let sector = business.sector;
    if (!sector || sector === 'À déterminer' || sector === 'Non spécifié') {
      sector = determineSector(name.toLowerCase());
    }

    const fullAddress = address && city 
      ? `${address}, ${city}, ${business.province || 'QC'}, ${business.country || 'Canada'}`
      : null;

    return {
      name,
      address,
      city: city || 'Non spécifiée',
      sector,
      fullAddress
    };
  };

  const determineSector = (name: string): string => {
    const sectors = {
      'restaurant': ['restaurant', 'resto', 'café', 'bar', 'pub', 'bistro', 'brasserie'],
      'commerce': ['magasin', 'boutique', 'shop', 'store', 'commerce'],
      'santé': ['dentiste', 'médecin', 'clinique', 'pharmacie', 'optique', 'physiothérapie'],
      'service': ['service', 'réparation', 'nettoyage', 'entretien', 'garage'],
      'immobilier': ['immobilier', 'courtier', 'hypothèque', 'construction'],
      'beauté': ['coiffure', 'esthétique', 'spa', 'salon', 'beauté'],
      'transport': ['taxi', 'transport', 'livraison', 'déménagement'],
      'finance': ['banque', 'assurance', 'comptable', 'finance']
    };

    for (const [sectorName, keywords] of Object.entries(sectors)) {
      if (keywords.some(keyword => name.includes(keyword))) {
        return sectorName.charAt(0).toUpperCase() + sectorName.slice(1);
      }
    }

    return 'Services généraux';
  };

  const geocodeAddress = async (address: string) => {
    try {
      const response = await fetch(`https://tgtoykxksohyalgifcdi.supabase.co/functions/v1/revalviews-mapbox`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndG95a3hrc29oeWFsZ2lmY2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzA3OTQsImV4cCI6MjA2NzU0Njc5NH0.lZLZ2WRdrrvTEQQWI9uZsWb6qOw2R92B3WZGZKEdlf0`
        },
        body: JSON.stringify({
          action: 'geocode_address',
          data: { address }
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          return {
            lat: result.data.lat,
            lng: result.data.lng
          };
        }
      }
    } catch (error) {
      console.warn(`Erreur géocodage pour ${address}:`, error);
    }
    return null;
  };

  return (
    <Card className="w-full bg-gradient-to-br from-black via-[#1a0b2e] to-black border border-[#8E44FF]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Zap className="h-5 w-5 text-[#8E44FF]" />
          Optimiseur de Données RivalViews™
        </CardTitle>
        <CardDescription className="text-white/60">
          Nettoyage, géocodage et optimisation automatique de vos 321 entreprises pour affichage sur la carte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-black/40 rounded-lg border border-white/10">
            <Database className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-white text-sm">Nettoyage des données</div>
          </div>
          <div className="p-3 bg-black/40 rounded-lg border border-white/10">
            <MapPin className="h-8 w-8 text-[#8E44FF] mx-auto mb-2" />
            <div className="text-white text-sm">Géocodage GPS</div>
          </div>
          <div className="p-3 bg-black/40 rounded-lg border border-white/10">
            <CheckCircle2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-white text-sm">Optimisation IA</div>
          </div>
        </div>

        <Button
          onClick={optimizeData}
          disabled={isOptimizing}
          className="w-full bg-gradient-to-r from-[#8E44FF] to-[#B666FF] hover:from-[#7D3AE6] hover:to-[#A555E6] text-white"
        >
          {isOptimizing ? 'Optimisation en cours...' : 'Lancer l\'optimisation complète'}
        </Button>

        {isOptimizing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-white">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#8E44FF] animate-pulse" />
                {currentStep}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {results && (
          <div className="space-y-3 p-4 border rounded-lg bg-gradient-to-br from-green-500/10 to-[#8E44FF]/10 border-green-500/30">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Optimisation terminée !
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{results.processed}</div>
                <div className="text-sm text-white/60">Traitées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#8E44FF]">{results.geocoded}</div>
                <div className="text-sm text-white/60">Géocodées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{results.cleaned}</div>
                <div className="text-sm text-white/60">Nettoyées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{results.errors}</div>
                <div className="text-sm text-white/60">Erreurs</div>
              </div>
            </div>

            <div className="text-center text-[#8E44FF] text-sm">
              🎉 Vos entreprises sont maintenant visibles sur la carte RivalViews™ !
            </div>
          </div>
        )}

        <div className="text-xs text-white/60 bg-black/20 p-3 rounded border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <span className="font-medium text-white">Actions d'optimisation :</span>
          </div>
          <ul className="space-y-1 text-white/60">
            <li>• Nettoyage et restructuration des noms d'entreprises</li>
            <li>• Extraction et géocodage des adresses</li>
            <li>• Classification automatique des secteurs d'activité</li>
            <li>• Génération des coordonnées GPS pour la carte</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataOptimizer;