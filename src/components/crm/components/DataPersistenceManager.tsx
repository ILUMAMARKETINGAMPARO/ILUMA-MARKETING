import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  Check, 
  AlertTriangle, 
  RefreshCw, 
  Save,
  HardDrive,
  Wifi,
  WifiOff,
  Clock
} from 'lucide-react';
import { useSave } from '@/contexts/SaveContext';

interface DataPersistenceManagerProps {
  dataType: 'collaborateur' | 'client' | 'tache' | 'reunion' | 'projet';
  contextId: string;
  data: any;
  className?: string;
}

export const DataPersistenceManager: React.FC<DataPersistenceManagerProps> = ({
  dataType,
  contextId,
  data,
  className
}) => {
  const { getSaveState, saveData } = useSave();
  const { toast } = useToast();
  const [persistenceStatus, setPersistenceStatus] = useState<'idle' | 'checking' | 'verified' | 'error'>('idle');
  const [lastVerification, setLastVerification] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const saveState = getSaveState(contextId);

  // Vérification de la connectivité
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Vérification de la persistance des données
  const verifyDataPersistence = async () => {
    if (!data) return;

    setPersistenceStatus('checking');
    
    try {
      // Vérification dans localStorage
      const storageKey = `iluma_${dataType}_${contextId}`;
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        
        // Vérifier si les données correspondent
        const dataExists = Array.isArray(parsedData) 
          ? parsedData.some((item: any) => item.id === data.id)
          : parsedData.id === data.id;
        
        if (dataExists) {
          setPersistenceStatus('verified');
          setLastVerification(new Date());
        } else {
          setPersistenceStatus('error');
          throw new Error('Données non trouvées dans le stockage local');
        }
      } else {
        setPersistenceStatus('error');
        throw new Error('Aucune donnée trouvée dans le stockage');
      }
    } catch (error) {
      setPersistenceStatus('error');
      toast({
        title: "❌ Erreur de vérification",
        description: "Les données ne sont pas correctement sauvegardées",
        variant: "destructive"
      });
    }
  };

  // Récupération d'urgence
  const emergencyRestore = async () => {
    try {
      await saveData(dataType, data, contextId, `Récupération d'urgence: ${dataType}`);
      
      toast({
        title: "🔄 Récupération réussie",
        description: "Les données ont été sauvegardées en urgence",
        variant: "default"
      });
      
      verifyDataPersistence();
    } catch (error) {
      toast({
        title: "❌ Échec de récupération",
        description: "Impossible de sauvegarder les données",
        variant: "destructive"
      });
    }
  };

  // Auto-vérification périodique
  useEffect(() => {
    if (saveState.status === 'saved') {
      const timeout = setTimeout(() => {
        verifyDataPersistence();
      }, 2000); // Vérifier 2 secondes après la sauvegarde

      return () => clearTimeout(timeout);
    }
  }, [saveState.status]);

  const getStatusIcon = () => {
    if (!isOnline) {
      return <WifiOff className="w-4 h-4 text-orange-400" />;
    }

    switch (persistenceStatus) {
      case 'checking':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />;
      case 'verified':
        return <Database className="w-4 h-4 text-green-400" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <HardDrive className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    if (!isOnline) {
      return "Mode hors ligne - sauvegarde locale";
    }

    switch (persistenceStatus) {
      case 'checking':
        return "Vérification de la persistance...";
      case 'verified':
        return lastVerification 
          ? `Données confirmées - ${lastVerification.toLocaleTimeString('fr-FR')}`
          : "Données confirmées";
      case 'error':
        return "Erreur de persistance détectée";
      default:
        return "En attente de sauvegarde";
    }
  };

  const getStatusColor = () => {
    if (!isOnline) {
      return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    }

    switch (persistenceStatus) {
      case 'checking':
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case 'verified':
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case 'error':
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Indicateur de statut compact */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border transition-all duration-300 ${getStatusColor()}`}
      >
        {getStatusIcon()}
        <span className="font-medium">{getStatusMessage()}</span>
      </motion.div>

      {/* Actions d'urgence */}
      <AnimatePresence>
        {persistenceStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <Card className="bg-red-500/10 border-red-500/30 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-red-300 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Sauvegarde non confirmée</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={verifyDataPersistence}
                    className="h-7 px-2 text-xs border-red-500/30 text-red-300 hover:bg-red-500/20"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Vérifier
                  </Button>
                  <Button
                    size="sm"
                    onClick={emergencyRestore}
                    className="h-7 px-2 text-xs bg-red-500/80 hover:bg-red-500 text-white"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Récupérer
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Informations de debug (développement) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="text-xs text-white/40">
          <summary className="cursor-pointer hover:text-white/60">Debug Info</summary>
          <div className="mt-2 space-y-1">
            <div>Type: {dataType}</div>
            <div>Context: {contextId}</div>
            <div>Save Status: {saveState.status}</div>
            <div>Persistence: {persistenceStatus}</div>
            <div>Online: {isOnline ? 'Oui' : 'Non'}</div>
            <div>Data ID: {data?.id || 'N/A'}</div>
          </div>
        </details>
      )}
    </div>
  );
};

export default DataPersistenceManager;