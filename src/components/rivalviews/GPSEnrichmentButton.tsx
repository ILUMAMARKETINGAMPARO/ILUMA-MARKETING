import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { geoEnrichmentService } from '@/utils/geoEnrichment';
import { toast } from 'sonner';
import { 
  MapPin, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  Globe,
  Target,
  BarChart3
} from 'lucide-react';

interface GPSEnrichmentButtonProps {
  onEnrichmentComplete?: () => void;
}

interface EnrichmentProgress {
  current: number;
  total: number;
  currentBusiness: string;
  isRunning: boolean;
}

export const GPSEnrichmentButton: React.FC<GPSEnrichmentButtonProps> = ({
  onEnrichmentComplete
}) => {
  const [isEnriching, setIsEnriching] = useState(false);
  const [progress, setProgress] = useState<EnrichmentProgress>({
    current: 0,
    total: 0,
    currentBusiness: '',
    isRunning: false
  });
  const [lastResult, setLastResult] = useState<{
    total: number;
    enriched: number;
    failed: number;
  } | null>(null);

  const handleEnrichment = async () => {
    setIsEnriching(true);
    setProgress({ current: 0, total: 0, currentBusiness: '', isRunning: true });
    setLastResult(null);

    toast.info('🌍 Démarrage de l\'enrichissement GPS...');

    try {
      const result = await geoEnrichmentService.enrichAllBusinessesWithGPS(
        (current, total, currentBusiness) => {
          setProgress({
            current,
            total,
            currentBusiness,
            isRunning: true
          });
        }
      );

      setLastResult({
        total: result.total,
        enriched: result.enriched,
        failed: result.failed
      });

      if (result.success && result.enriched > 0) {
        // Recharger les données après enrichissement
        onEnrichmentComplete?.();
      }

    } catch (error) {
      console.error('Erreur enrichissement:', error);
      toast.error('Erreur lors de l\'enrichissement GPS');
    } finally {
      setIsEnriching(false);
      setProgress(prev => ({ ...prev, isRunning: false }));
    }
  };

  const testGeocode = async () => {
    const testAddress = "1105 Rue du Sud, Cowansville, QC";
    toast.info('🧪 Test de géocodage...');
    
    try {
      const coordinates = await geoEnrichmentService.testGeocode(testAddress);
      
      if (coordinates) {
        toast.success(`✅ Test réussi: ${coordinates.lat}, ${coordinates.lng}`);
      } else {
        toast.error('❌ Test échoué: Coordonnées non trouvées');
      }
    } catch (error) {
      toast.error('❌ Test échoué: Erreur API');
      console.error('Test géocodage échoué:', error);
    }
  };

  const progressPercentage = progress.total > 0 ? (progress.current / progress.total) * 100 : 0;

  return (
    <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border-emerald-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Globe className="h-5 w-5 text-emerald-400" />
          Enrichissement GPS Mapbox
        </CardTitle>
        <p className="text-sm text-slate-400">
          Géolocalise automatiquement toutes vos entreprises avec l'API Mapbox
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Boutons d'action */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleEnrichment}
            disabled={isEnriching}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
          >
            {isEnriching ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enrichissement en cours...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Compléter les coordonnées GPS
              </>
            )}
          </Button>

          <Button
            onClick={testGeocode}
            variant="outline"
            size="sm"
            className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
          >
            <Target className="h-3 w-3 mr-1" />
            Test géocodage
          </Button>
        </div>

        {/* Barre de progression */}
        {progress.isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Progression</span>
              <span className="text-emerald-400 font-semibold">
                {progress.current}/{progress.total}
              </span>
            </div>
            
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-slate-700"
            />
            
            {progress.currentBusiness && (
              <div className="text-xs text-slate-400 truncate">
                📍 En cours: {progress.currentBusiness}
              </div>
            )}
          </motion.div>
        )}

        {/* Résultats du dernier enrichissement */}
        {lastResult && !progress.isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 rounded-lg p-3 space-y-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Résultats</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="text-slate-400">Total</div>
                <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                  {lastResult.total}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-slate-400">Enrichies</div>
                <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {lastResult.enriched}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-slate-400">Échecs</div>
                <Badge variant="outline" className="text-red-400 border-red-500/30">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {lastResult.failed}
                </Badge>
              </div>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="text-xs text-slate-500 space-y-1">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>Utilise l'API Mapbox pour géocoder les adresses</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Met à jour automatiquement la table businesses</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            <span>Optimisé pour les adresses canadiennes (QC)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GPSEnrichmentButton;