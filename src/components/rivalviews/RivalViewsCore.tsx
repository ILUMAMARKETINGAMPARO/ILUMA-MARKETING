import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map, 
  TableProperties, 
  Swords,
  Eye,
  Zap,
  Crown,
  Sparkles
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import ClusterEmotionMode from './modes/ClusterEmotionMode';
import TableMapMode from './modes/TableMapMode';
import DuelMode from './modes/DuelMode';

// Types pour les modes RIVALVIEWS™
export type RivalViewMode = 'cluster' | 'table' | 'duel';

interface RivalViewsCoreProps {
  businesses: RivalBusiness[];
  onBusinessClick?: (business: RivalBusiness) => void;
  onExport?: () => void;
  className?: string;
}

const RivalViewsCore: React.FC<RivalViewsCoreProps> = ({
  businesses,
  onBusinessClick,
  onExport,
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState<RivalViewMode>('cluster');
  const [selectedBusinesses, setSelectedBusinesses] = useState<RivalBusiness[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Configuration des modes avec style galactique
  const modes = [
    {
      id: 'cluster' as RivalViewMode,
      name: 'Cluster Émotion',
      description: 'Vue immersive avec pins animés et IA LILO™',
      icon: Eye,
      color: 'from-primary to-primary-foreground',
      accentColor: 'text-primary',
      isPremium: false
    },
    {
      id: 'table' as RivalViewMode,
      name: 'Table-Carte',
      description: 'Explorer les données avec filtres multi-critères',
      icon: TableProperties,
      color: 'from-blue-500 to-purple-600',
      accentColor: 'text-blue-400',
      isPremium: false
    },
    {
      id: 'duel' as RivalViewMode,
      name: 'Duel 1v1',
      description: 'Comparaison directe premium avec IA',
      icon: Swords,
      color: 'from-amber-500 to-orange-600',
      accentColor: 'text-amber-400',
      isPremium: true
    }
  ];

  // Transition fluide entre modes
  const handleModeChange = useCallback(async (newMode: RivalViewMode) => {
    if (newMode === activeMode || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Animation de transition
    await new Promise(resolve => setTimeout(resolve, 150));
    setActiveMode(newMode);
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [activeMode, isTransitioning]);

  // Gestion sélection pour mode Duel
  const handleBusinessSelect = useCallback((business: RivalBusiness) => {
    if (activeMode === 'duel') {
      setSelectedBusinesses(prev => {
        const exists = prev.find(b => b.id === business.id);
        if (exists) {
          return prev.filter(b => b.id !== business.id);
        }
        if (prev.length >= 2) {
          return [prev[1], business]; // Remplace le premier par le nouveau
        }
        return [...prev, business];
      });
    }
    onBusinessClick?.(business);
  }, [activeMode, onBusinessClick]);

  // Statistiques rapides
  const stats = {
    total: businesses.length,
    highScore: businesses.filter(b => b.ilaScore >= 80).length,
    withWebsite: businesses.filter(b => b.website).length,
    avgScore: Math.round(businesses.reduce((sum, b) => sum + b.ilaScore, 0) / businesses.length)
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5 ${className}`}>
      {/* Header galactique avec sélecteur de modes */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et stats */}
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  RIVALVIEWS™
                </h1>
                <p className="text-sm text-muted-foreground">
                  {stats.total} concurrents • Score moyen: {stats.avgScore}
                </p>
              </div>
              
              {/* Badges statistiques */}
              <div className="hidden md:flex gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Crown className="w-3 h-3 mr-1" />
                  {stats.highScore} Premium
                </Badge>
                <Badge variant="outline" className="border-green-500/30 text-green-400">
                  <Zap className="w-3 h-3 mr-1" />
                  {stats.withWebsite} Web
                </Badge>
              </div>
            </div>

            {/* Sélecteur de modes premium */}
            <div className="flex bg-card/50 backdrop-blur-sm rounded-xl p-1 border border-border/30">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = activeMode === mode.id;
                
                return (
                  <Button
                    key={mode.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleModeChange(mode.id)}
                    disabled={isTransitioning}
                    className={`
                      relative px-4 py-2 rounded-lg transition-all duration-300
                      ${isActive 
                        ? `bg-gradient-to-r ${mode.color} text-white shadow-lg scale-105` 
                        : `hover:bg-muted/50 ${mode.accentColor}`
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{mode.name}</span>
                      {mode.isPremium && !isActive && (
                        <Sparkles className="w-3 h-3 text-amber-400" />
                      )}
                    </div>
                    
                    {/* Indicateur actif */}
                    {isActive && (
                      <motion.div
                        layoutId="activeMode"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-transparent"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Description du mode actif */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-3 text-sm text-muted-foreground"
            >
              {modes.find(m => m.id === activeMode)?.description}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Contenu principal avec transitions */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1]
            }}
            className="min-h-[calc(100vh-140px)]"
          >
            {activeMode === 'cluster' && (
              <ClusterEmotionMode
                businesses={businesses}
                onBusinessClick={handleBusinessSelect}
                onExport={onExport}
              />
            )}
            
            {activeMode === 'table' && (
              <TableMapMode
                businesses={businesses}
                onBusinessClick={handleBusinessSelect}
                onExport={onExport}
              />
            )}
            
            {activeMode === 'duel' && (
              <DuelMode
                businesses={businesses}
                selectedBusinesses={selectedBusinesses}
                onBusinessSelect={handleBusinessSelect}
                onExport={onExport}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Overlay de transition */}
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/50 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <div className="flex items-center gap-3 text-primary">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="font-medium">Changement de mode...</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RivalViewsCore;