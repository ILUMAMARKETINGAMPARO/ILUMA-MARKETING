import React, { createContext, useContext, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapboxContextType {
  token: string | null;
  isReady: boolean;
  error: string | null;
  refreshToken: () => void;
}

const MapboxContext = createContext<MapboxContextType | null>(null);

export const useMapbox = () => {
  const context = useContext(MapboxContext);
  if (!context) {
    throw new Error('useMapbox must be used within a MapboxProvider');
  }
  return context;
};

interface MapboxProviderProps {
  children: React.ReactNode;
}

const MapboxProvider: React.FC<MapboxProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMapboxToken = async () => {
    try {
      setLoading(true);
      setError(null);

      // Essayer de récupérer le token depuis Supabase
      const { data, error: supabaseError } = await supabase
        .from('api_secrets')
        .select('key_value')
        .eq('service_name', 'mapbox')
        .eq('key_name', 'access_token')
        .eq('is_configured', true)
        .maybeSingle();

      let tokenToUse = null;
      
      if (supabaseError || !data?.key_value) {
        // Fallback sur le token hardcodé si pas configuré dans Supabase
        console.warn('Token Mapbox non configuré dans Supabase, utilisation du fallback');
        tokenToUse = 'pk.eyJ1Ijoic2VyZ2lvLWRhdmlkIiwiYSI6ImNtY3dvMWVyaDAwYzQya3B6enJ5dXkycGcifQ.IseIJ0ySJRvHbKYWKo7C8A';
      } else {
        tokenToUse = data.key_value;
      }
      
      // Définir le token globalement
      mapboxgl.accessToken = tokenToUse;
      setToken(tokenToUse);

      setIsReady(true);
    } catch (err) {
      console.error('Erreur lors de la récupération du token Mapbox:', err);
      setError('Impossible de charger le token Mapbox');
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = () => {
    fetchMapboxToken();
  };

  useEffect(() => {
    fetchMapboxToken();
  }, []);

  if (loading) {
    return (
      <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8E44FF]"></div>
          <span className="ml-3 text-white">Configuration Mapbox en cours...</span>
        </div>
      </Card>
    );
  }

  if (error || !token) {
    return (
      <Card className="bg-black/40 border-red-500/30 backdrop-blur-xl p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-red-400 mb-2">
            Erreur de configuration Mapbox
          </h3>
          <p className="text-red-300 mb-4">
            {error || 'Token Mapbox non disponible'}
          </p>
          <Button
            onClick={refreshToken}
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </Card>
    );
  }

  const contextValue: MapboxContextType = {
    token,
    isReady,
    error,
    refreshToken
  };

  return (
    <MapboxContext.Provider value={contextValue}>
      {children}
    </MapboxContext.Provider>
  );
};

export default MapboxProvider;