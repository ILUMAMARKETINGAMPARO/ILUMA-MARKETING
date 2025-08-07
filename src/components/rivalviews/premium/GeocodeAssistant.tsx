import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  Search,
  Globe,
  Target,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface BusinessToGeocode {
  id: string;
  name: string;
  address: string;
  city: string;
  sector: string;
  currentLat?: number;
  currentLng?: number;
}

interface GeocodeResult {
  id: string;
  lat: number;
  lng: number;
  formattedAddress: string;
  confidence: 'high' | 'medium' | 'low';
  source: 'mapbox' | 'manual';
}

interface GeocodeAssistantProps {
  businessesToGeocode: BusinessToGeocode[];
  onGeocodeComplete: (results: GeocodeResult[]) => void;
  isVisible: boolean;
  onClose: () => void;
}

const GeocodeAssistant: React.FC<GeocodeAssistantProps> = ({
  businessesToGeocode,
  onGeocodeComplete,
  isVisible,
  onClose
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentBusiness, setCurrentBusiness] = useState<BusinessToGeocode | null>(null);
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [manualAddress, setManualAddress] = useState('');
  const [manualCoords, setManualCoords] = useState({ lat: '', lng: '' });

  // **PHASE 1: GÉOCODAGE AUTOMATIQUE MAPBOX**
  const geocodeWithMapbox = useCallback(async (business: BusinessToGeocode): Promise<GeocodeResult | null> => {
    try {
      const fullAddress = `${business.address}, ${business.city}, Quebec, Canada`;
      
      // Appel à l'edge function Mapbox
      const { data, error } = await supabase.functions.invoke('revalviews-mapbox', {
        body: {
          action: 'geocode_address',
          data: { address: fullAddress }
        }
      });

      if (error) throw error;

      if (data.success && data.coordinates) {
        return {
          id: business.id,
          lat: data.coordinates[1], // Latitude
          lng: data.coordinates[0], // Longitude
          formattedAddress: data.formatted_address || fullAddress,
          confidence: 'high',
          source: 'mapbox'
        };
      }

      return null;
    } catch (error) {
      console.error(`❌ Erreur géocodage ${business.name}:`, error);
      return null;
    }
  }, []);

  // **GÉOCODAGE BATCH INTELLIGENT**
  const startBatchGeocode = useCallback(async () => {
    if (businessesToGeocode.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setResults([]);
    setErrors([]);

    const newResults: GeocodeResult[] = [];
    const newErrors: string[] = [];

    for (let i = 0; i < businessesToGeocode.length; i++) {
      const business = businessesToGeocode[i];
      setCurrentBusiness(business);

      try {
        const result = await geocodeWithMapbox(business);
        
        if (result) {
          newResults.push(result);
          
          // Mettre à jour immédiatement la base de données
          await supabase
            .from('businesses')
            .update({
              lat: result.lat,
              lng: result.lng,
              address: result.formattedAddress,
              updated_at: new Date().toISOString()
            })
            .eq('id', business.id);

          toast.success(`✅ ${business.name} géocodé avec succès`);
        } else {
          newErrors.push(`${business.name}: Adresse non trouvée`);
          toast.warning(`⚠️ ${business.name}: Géocodage échoué`);
        }
      } catch (error) {
        newErrors.push(`${business.name}: Erreur technique`);
        toast.error(`❌ Erreur pour ${business.name}`);
      }

      // Délai pour éviter la surcharge de l'API
      if (i < businessesToGeocode.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setProgress(((i + 1) / businessesToGeocode.length) * 100);
    }

    setResults(newResults);
    setErrors(newErrors);
    setCurrentBusiness(null);
    setIsProcessing(false);

    // Notification finale
    toast.success(`🎯 Géocodage terminé: ${newResults.length} succès, ${newErrors.length} échecs`);
    
    // Appeler le callback parent
    onGeocodeComplete(newResults);
  }, [businessesToGeocode, geocodeWithMapbox, onGeocodeComplete]);

  // **GÉOCODAGE MANUEL**
  const handleManualGeocode = useCallback(async () => {
    if (!currentBusiness || !manualAddress) return;

    try {
      const result = await geocodeWithMapbox({
        ...currentBusiness,
        address: manualAddress
      });

      if (result) {
        setResults(prev => [...prev, result]);
        
        // Mettre à jour la base de données
        await supabase
          .from('businesses')
          .update({
            lat: result.lat,
            lng: result.lng,
            address: result.formattedAddress,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentBusiness.id);

        toast.success(`✅ ${currentBusiness.name} géocodé manuellement`);
        setManualAddress('');
        setCurrentBusiness(null);
      } else {
        toast.error('Adresse introuvable');
      }
    } catch (error) {
      toast.error('Erreur lors du géocodage manuel');
    }
  }, [currentBusiness, manualAddress, geocodeWithMapbox]);

  // **AJOUT COORDONNÉES MANUELLES**
  const handleManualCoords = useCallback(async () => {
    if (!currentBusiness || !manualCoords.lat || !manualCoords.lng) return;

    const lat = parseFloat(manualCoords.lat);
    const lng = parseFloat(manualCoords.lng);

    if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      toast.error('Coordonnées invalides');
      return;
    }

    try {
      const result: GeocodeResult = {
        id: currentBusiness.id,
        lat,
        lng,
        formattedAddress: currentBusiness.address,
        confidence: 'medium',
        source: 'manual'
      };

      setResults(prev => [...prev, result]);

      // Mettre à jour la base de données
      await supabase
        .from('businesses')
        .update({
          lat,
          lng,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentBusiness.id);

      toast.success(`✅ Coordonnées ajoutées pour ${currentBusiness.name}`);
      setManualCoords({ lat: '', lng: '' });
      setCurrentBusiness(null);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout des coordonnées');
    }
  }, [currentBusiness, manualCoords]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-background/95 border-primary/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Assistant de Géocodage IA
                <Badge className="bg-primary/20 text-primary">
                  ILUMA™ PREMIUM
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground">
                {businessesToGeocode.length} entreprises nécessitent une géolocalisation
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* **STATISTIQUES** */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{businessesToGeocode.length}</div>
                  <div className="text-sm text-muted-foreground">À géocoder</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{results.length}</div>
                  <div className="text-sm text-muted-foreground">Succès</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{errors.length}</div>
                  <div className="text-sm text-muted-foreground">Échecs</div>
                </div>
              </div>

              {/* **CONTRÔLES PRINCIPAUX** */}
              <div className="flex gap-4">
                <Button
                  onClick={startBatchGeocode}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Géocodage en cours...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Lancer le géocodage automatique
                    </>
                  )}
                </Button>
                
                <Button variant="outline" onClick={onClose}>
                  Fermer
                </Button>
              </div>

              {/* **BARRE DE PROGRESSION** */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  
                  {currentBusiness && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Search className="w-4 h-4 animate-pulse" />
                      Géocodage: {currentBusiness.name}...
                    </div>
                  )}
                </div>
              )}

              {/* **INTERFACE GÉOCODAGE MANUEL** */}
              {!isProcessing && businessesToGeocode.length > 0 && (
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Géocodage Manuel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Sélectionner une entreprise</label>
                      <select
                        value={currentBusiness?.id || ''}
                        onChange={(e) => {
                          const business = businessesToGeocode.find(b => b.id === e.target.value);
                          setCurrentBusiness(business || null);
                        }}
                        className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md"
                      >
                        <option value="">-- Choisir une entreprise --</option>
                        {businessesToGeocode.map(business => (
                          <option key={business.id} value={business.id}>
                            {business.name} ({business.city})
                          </option>
                        ))}
                      </select>
                    </div>

                    {currentBusiness && (
                      <div className="space-y-4 p-4 bg-background rounded-lg border">
                        <div>
                          <h4 className="font-semibold">{currentBusiness.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {currentBusiness.sector} • {currentBusiness.city}
                          </p>
                        </div>

                        {/* Méthode 1: Adresse corrigée */}
                        <div>
                          <label className="text-sm font-medium">Adresse corrigée</label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              placeholder={currentBusiness.address}
                              value={manualAddress}
                              onChange={(e) => setManualAddress(e.target.value)}
                              className="flex-1"
                            />
                            <Button onClick={handleManualGeocode} size="sm">
                              <Search className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Méthode 2: Coordonnées directes */}
                        <div>
                          <label className="text-sm font-medium">Ou coordonnées directes</label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              placeholder="Latitude (ex: 45.5017)"
                              value={manualCoords.lat}
                              onChange={(e) => setManualCoords(prev => ({ ...prev, lat: e.target.value }))}
                              type="number"
                              step="any"
                            />
                            <Input
                              placeholder="Longitude (ex: -73.5673)"
                              value={manualCoords.lng}
                              onChange={(e) => setManualCoords(prev => ({ ...prev, lng: e.target.value }))}
                              type="number"
                              step="any"
                            />
                            <Button onClick={handleManualCoords} size="sm">
                              <MapPin className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* **CONSEILS IA** */}
              <Card className="bg-blue-500/10 border-blue-500/20">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-300">Conseils LILO™</h4>
                      <ul className="text-sm text-blue-200 space-y-1">
                        <li>• Le géocodage automatique utilise l'API Mapbox pour une précision optimale</li>
                        <li>• Les coordonnées sont validées en temps réel</li>
                        <li>• Les mises à jour sont instantanées sur la carte</li>
                        <li>• En cas d'échec, corrigez l'adresse manuellement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* **RÉSULTATS** */}
              {(results.length > 0 || errors.length > 0) && (
                <div className="space-y-4">
                  {results.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Géocodage réussi ({results.length})
                      </h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {results.map(result => (
                          <div key={result.id} className="text-sm text-muted-foreground">
                            ✅ {businessesToGeocode.find(b => b.id === result.id)?.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {errors.length > 0 && (
                    <div>
                      <h4 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Échecs ({errors.length})
                      </h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {errors.map((error, index) => (
                          <div key={index} className="text-sm text-red-600">
                            ❌ {error}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GeocodeAssistant;