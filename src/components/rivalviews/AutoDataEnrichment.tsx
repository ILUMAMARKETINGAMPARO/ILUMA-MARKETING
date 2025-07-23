import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Database, 
  Zap, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Settings,
  Play,
  Pause,
  BarChart3,
  Globe,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client.ts';

interface EnrichmentStatus {
  isActive: boolean;
  lastUpdate: Date;
  nextUpdate: Date;
  progress: number;
  currentTask: string;
  totalBusinesses: number;
  enrichedToday: number;
  errors: number;
}

interface EnrichmentConfig {
  autoMode: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  dataSource: 'ahrefs' | 'googlemybusiness' | 'both';
  maxPerHour: number;
}

const AutoDataEnrichment: React.FC = () => {
  const [status, setStatus] = useState<EnrichmentStatus>({
    isActive: false,
    lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    nextUpdate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4h from now
    progress: 0,
    currentTask: '',
    totalBusinesses: 0,
    enrichedToday: 142,
    errors: 3
  });

  const [config, setConfig] = useState<EnrichmentConfig>({
    autoMode: true,
    frequency: 'daily',
    dataSource: 'both',
    maxPerHour: 50
  });

  const [isManualRunning, setIsManualRunning] = useState(false);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  // Charger les données depuis Supabase
  useEffect(() => {
    loadBusinessCount();
    loadRecentActivity();
  }, []);

  const loadBusinessCount = async () => {
    try {
      const { count } = await supabase
        .from('businesses')
        .select('*', { count: 'exact', head: true });
      
      setStatus(prev => ({
        ...prev,
        totalBusinesses: count || 0
      }));
    } catch (error) {
      console.error('Error loading business count:', error);
    }
  };

  const loadRecentActivity = async () => {
    try {
      const { data } = await supabase
        .from('enrichissement_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (data) {
        setRecentActivity(data);
      }
    } catch (error) {
      console.error('Error loading enrichment history:', error);
    }
  };

  const startManualEnrichment = async () => {
    setIsManualRunning(true);
    setStatus(prev => ({ ...prev, isActive: true, progress: 0, currentTask: 'Préparation...' }));

    // Simuler le processus d'enrichissement
    const tasks = [
      'Connexion aux APIs...',
      'Extraction des données Ahrefs...',
      'Mise à jour Google My Business...',
      'Calcul des scores ILA™...',
      'Sauvegarde des données...',
      'Génération des recommandations IA...'
    ];

    for (let i = 0; i < tasks.length; i++) {
      setStatus(prev => ({
        ...prev,
        currentTask: tasks[i],
        progress: Math.round(((i + 1) / tasks.length) * 100)
      }));
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setStatus(prev => ({
      ...prev,
      isActive: false,
      currentTask: 'Enrichissement terminé',
      lastUpdate: new Date(),
      nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h from now
      enrichedToday: prev.enrichedToday + Math.floor(Math.random() * 20 + 10)
    }));
    
    setIsManualRunning(false);
    loadRecentActivity();
  };

  const toggleAutoMode = (enabled: boolean) => {
    setConfig(prev => ({ ...prev, autoMode: enabled }));
    
    if (enabled) {
      setStatus(prev => ({
        ...prev,
        nextUpdate: new Date(Date.now() + getFrequencyMs(config.frequency))
      }));
    }
  };

  const getFrequencyMs = (frequency: string) => {
    switch (frequency) {
      case 'hourly': return 60 * 60 * 1000;
      case 'daily': return 24 * 60 * 60 * 1000;
      case 'weekly': return 7 * 24 * 60 * 60 * 1000;
      default: return 24 * 60 * 60 * 1000;
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDataSourceIcon = (source: string) => {
    switch (source) {
      case 'ahrefs': return <BarChart3 className="w-4 h-4" />;
      case 'googlemybusiness': return <MapPin className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Principal */}
      <Card className="bg-black/90 border-[#8E44FF]/30">
        <CardHeader>
          <CardTitle className="text-white font-['Montserrat'] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#8E44FF]" />
              Enrichissement Automatique des Données
            </div>
            <Badge variant={status.isActive ? "default" : "secondary"} className={
              status.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"
            }>
              {status.isActive ? 'Actif' : 'Inactif'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Métriques Principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{status.totalBusinesses}</div>
              <div className="text-white/60 text-sm">Entreprises Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{status.enrichedToday}</div>
              <div className="text-white/60 text-sm">Enrichies Aujourd'hui</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8E44FF]">{config.maxPerHour}</div>
              <div className="text-white/60 text-sm">Max/Heure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{status.errors}</div>
              <div className="text-white/60 text-sm">Erreurs</div>
            </div>
          </div>

          {/* Progress Bar */}
          <AnimatePresence>
            {status.isActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">{status.currentTask}</span>
                  <span className="text-white font-bold">{status.progress}%</span>
                </div>
                <Progress value={status.progress} className="h-2" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contrôles */}
          <div className="flex items-center justify-between">
            <Button
              onClick={startManualEnrichment}
              disabled={isManualRunning || status.isActive}
              className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-bold"
            >
              {isManualRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  En cours...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Lancer Maintenant
                </>
              )}
            </Button>

            <div className="text-right text-sm text-white/60">
              <div>Dernière MAJ: {formatTimestamp(status.lastUpdate)}</div>
              {config.autoMode && (
                <div>Prochaine: {formatTimestamp(status.nextUpdate)}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card className="bg-black/50 border-white/20">
        <CardHeader>
          <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mode Auto */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Mode Automatique</Label>
                <Switch
                  checked={config.autoMode}
                  onCheckedChange={toggleAutoMode}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80">Fréquence</Label>
                <Select 
                  value={config.frequency} 
                  onValueChange={(value: any) => setConfig(prev => ({ ...prev, frequency: value }))}
                >
                  <SelectTrigger className="bg-black/30 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Toutes les heures</SelectItem>
                    <SelectItem value="daily">Quotidien</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Source des données */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/80">Source des Données</Label>
                <Select 
                  value={config.dataSource} 
                  onValueChange={(value: any) => setConfig(prev => ({ ...prev, dataSource: value }))}
                >
                  <SelectTrigger className="bg-black/30 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ahrefs">Ahrefs uniquement</SelectItem>
                    <SelectItem value="googlemybusiness">Google My Business</SelectItem>
                    <SelectItem value="both">Les deux sources</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80">Limite par heure</Label>
                <Select 
                  value={config.maxPerHour.toString()} 
                  onValueChange={(value) => setConfig(prev => ({ ...prev, maxPerHour: parseInt(value) }))}
                >
                  <SelectTrigger className="bg-black/30 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25 entreprises/h</SelectItem>
                    <SelectItem value="50">50 entreprises/h</SelectItem>
                    <SelectItem value="100">100 entreprises/h</SelectItem>
                    <SelectItem value="200">200 entreprises/h</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activité Récente */}
      <Card className="bg-black/50 border-white/20">
        <CardHeader>
          <CardTitle className="text-white font-['Montserrat'] flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Activité Récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-60 overflow-auto">
            {recentActivity.length === 0 ? (
              <div className="text-center text-white/60 py-4">
                <Database className="w-12 h-12 mx-auto mb-2 text-white/30" />
                <p>Aucune activité récente</p>
              </div>
            ) : (
              recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {activity.enrichment_type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    )}
                    <div>
                      <div className="text-white text-sm font-medium">
                        {activity.enrichment_type === 'ahrefs_update' ? 'Mise à jour Ahrefs' :
                         activity.enrichment_type === 'gmb_update' ? 'Mise à jour GMB' :
                         'Enrichissement général'}
                      </div>
                      <div className="text-white/60 text-xs">
                        {new Date(activity.created_at).toLocaleString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.ai_confidence_score || 95}% conf.
                  </Badge>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoDataEnrichment;