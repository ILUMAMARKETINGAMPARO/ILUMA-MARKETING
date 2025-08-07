import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Database, Map, Users, BarChart3, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCRM } from '@/contexts/CRMContext';

interface IntegrationStatusProps {
  onRefresh?: () => void;
}

const IntegrationStatus: React.FC<IntegrationStatusProps> = ({ onRefresh }) => {
  const [databaseCount, setDatabaseCount] = useState(0);
  const [recentImports, setRecentImports] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const { clients } = useCRM();

  const checkIntegrationStatus = async () => {
    setIsChecking(true);
    try {
      // Vérifier la base de données
      const { data: dbData, error } = await supabase
        .from('businesses')
        .select('id, created_at, lat, lng')
        .not('lat', 'is', null)
        .not('lng', 'is', null);

      if (error) {
        console.error('Erreur lors de la vérification:', error);
        return;
      }

      if (dbData) {
        setDatabaseCount(dbData.length);
        
        // Compter les imports récents (dernière heure)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recent = dbData.filter(business => 
          new Date(business.created_at) > oneHourAgo
        );
        setRecentImports(recent.length);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkIntegrationStatus();
    
    // Vérifier toutes les 30 secondes
    const interval = setInterval(checkIntegrationStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const integrationChecks = [
    {
      name: 'Base de données Supabase',
      status: databaseCount > 0 ? 'success' : 'warning',
      details: `${databaseCount} entreprises avec coordonnées`,
      icon: Database
    },
    {
      name: 'CRM Iluma™',
      status: clients.length > 0 ? 'success' : 'warning',
      details: `${clients.length} clients synchronisés`,
      icon: Users
    },
    {
      name: 'Carte interactive',
      status: databaseCount === clients.length && databaseCount > 0 ? 'success' : 'warning',
      details: `Synchronisation ${databaseCount === clients.length ? 'OK' : 'EN COURS'}`,
      icon: Map
    },
    {
      name: 'Import récent',
      status: recentImports > 0 ? 'success' : 'info',
      details: `${recentImports} nouveaux imports (1h)`,
      icon: BarChart3
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-black via-[#1a0b2e] to-black border border-[#8E44FF]/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">État de l'intégration Excel</CardTitle>
          <Button
            onClick={() => {
              checkIntegrationStatus();
              onRefresh?.();
            }}
            variant="ghost"
            size="sm"
            disabled={isChecking}
            className="text-[#8E44FF] hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {integrationChecks.map((check, index) => {
          const Icon = check.icon;
          const statusColors = {
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'text-blue-400',
            error: 'text-red-400'
          };
          
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${statusColors[check.status as keyof typeof statusColors]}`} />
                <div>
                  <div className="text-white font-medium text-sm">{check.name}</div>
                  <div className="text-white/60 text-xs">{check.details}</div>
                </div>
              </div>
              <Badge 
                className={
                  check.status === 'success' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : check.status === 'warning'
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }
              >
                {check.status === 'success' ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <AlertCircle className="w-3 h-3 mr-1" />
                )}
                {check.status === 'success' ? 'OK' : check.status === 'warning' ? 'WARN' : 'INFO'}
              </Badge>
            </div>
          );
        })}
        
        {databaseCount >= 248 && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
              <CheckCircle className="w-4 h-4" />
              Optimisation réussie ! 🎉
            </div>
            <p className="text-green-300/80 text-xs mt-1">
              {databaseCount} entreprises géocodées et synchronisées dans RivalViews™, la carte interactive et le CRM Iluma™.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationStatus;