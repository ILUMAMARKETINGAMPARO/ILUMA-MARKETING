import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSocialGravity } from '@/hooks/useSocialGravity.ts';
import { MapPin, Users, Star, TrendingUp, Clock, Shield } from 'lucide-react';

interface SocialGravityWidgetProps {
  className?: string;
  position?: 'top' | 'bottom' | 'side';
}

const SocialGravityWidget: React.FC<SocialGravityWidgetProps> = ({
  className = "",
  position = 'bottom'
}) => {
  const { 
    socialProofs, 
    metrics, 
    userLocation, 
    getHighestUrgencyProof,
    getMostCredibleProof 
  } = useSocialGravity();

  // Sélection du proof principal à afficher
  const primaryProof = getHighestUrgencyProof() || socialProofs[0];
  const secondaryProofs = socialProofs.filter(p => p.id !== primaryProof?.id).slice(0, 2);

  // Configuration d'animation selon la position
  const getAnimationConfig = () => {
    switch (position) {
      case 'top':
        return {
          initial: { y: -50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -50, opacity: 0 }
        };
      case 'side':
        return {
          initial: { x: 50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 50, opacity: 0 }
        };
      default: // bottom
        return {
          initial: { y: 50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 50, opacity: 0 }
        };
    }
  };

  // Icône selon le type de proof
  const getProofIcon = (type: string) => {
    switch (type) {
      case 'live_viewers': return Users;
      case 'recent_purchases': return TrendingUp;
      case 'location_based': return MapPin;
      case 'time_sensitive': return Clock;
      case 'social_proof': return Star;
      default: return Shield;
    }
  };

  // Couleur selon l'urgence
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'primary';
      case 'low': return 'secondary';
      default: return 'muted';
    }
  };

  // Effet de pulse pour les preuves critiques
  const getPulseAnimation = (urgency: string) => {
    if (urgency === 'critical') {
      return {
        scale: [1, 1.02, 1],
        transition: { duration: 2, repeat: Infinity }
      };
    }
    return {};
  };

  // Widget principal de preuve sociale
  const PrimaryProofWidget = () => {
    if (!primaryProof) return null;

    const Icon = getProofIcon(primaryProof.type);
    const urgencyColor = getUrgencyColor(primaryProof.urgency);
    const animation = getAnimationConfig();

    return (
      <motion.div
        key={primaryProof.id}
        {...animation}
        animate={{
          ...animation.animate,
          ...getPulseAnimation(primaryProof.urgency)
        }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Card className={`border border-${urgencyColor}/20 bg-gradient-to-r from-background via-background to-${urgencyColor}/5 shadow-lg`}>
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-${urgencyColor}/10 flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 text-${urgencyColor}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-tight">
                  {primaryProof.message}
                </p>
                
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs bg-${urgencyColor}/10 text-${urgencyColor} border-${urgencyColor}/20`}
                  >
                    {primaryProof.credibility}% fiable
                  </Badge>
                  
                  {primaryProof.urgency === 'critical' && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Badge variant="destructive" className="text-xs">
                        ⚡ URGENT
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Métriques en temps réel (compact)
  const LiveMetrics = () => {
    if (position === 'side') return null; // Pas d'affichage des métriques en sidebar

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="grid grid-cols-2 gap-2 mt-3"
      >
        <div className="text-center p-2 rounded-lg bg-muted/20">
          <div className="text-lg font-bold text-primary">{metrics.currentViewers}</div>
          <div className="text-xs text-muted-foreground">Visiteurs</div>
        </div>
        
        <div className="text-center p-2 rounded-lg bg-muted/20">
          <div className="text-lg font-bold text-success">{metrics.recentConversions}</div>
          <div className="text-xs text-muted-foreground">Conversions 24h</div>
        </div>
      </motion.div>
    );
  };

  // Preuves secondaires (carousel mini)
  const SecondaryProofs = () => {
    if (secondaryProofs.length === 0 || position === 'side') return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-3 space-y-2"
      >
        <AnimatePresence mode="wait">
          {secondaryProofs.slice(0, 1).map((proof) => {
            const Icon = getProofIcon(proof.type);
            const color = getUrgencyColor(proof.urgency);
            
            return (
              <motion.div
                key={proof.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-2 p-2 rounded-lg bg-${color}/5 border border-${color}/10`}
              >
                <Icon className={`w-3 h-3 text-${color} flex-shrink-0`} />
                <span className="text-xs text-muted-foreground truncate">
                  {proof.message}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Informations de localisation
  const LocationInfo = () => {
    if (!userLocation.city || position === 'side') return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="mt-2 text-center"
      >
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>
            {userLocation.city}, {userLocation.region}
          </span>
        </div>
      </motion.div>
    );
  };

  // Effet de brillance périodique
  const ShineEffect = () => {
    if (primaryProof?.urgency !== 'high' && primaryProof?.urgency !== 'critical') return null;

    return (
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '200%', opacity: [0, 0.5, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 3,
          ease: "easeInOut" 
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-warning/20 to-transparent pointer-events-none"
      />
    );
  };

  if (!primaryProof) {
    return null; // Pas de preuves sociales disponibles
  }

  return (
    <div className={`${className} relative z-40`}>
      <div className="relative overflow-hidden">
        <ShineEffect />
        <PrimaryProofWidget />
        <LiveMetrics />
        <SecondaryProofs />
        <LocationInfo />
      </div>
      
      {/* Indicateur de confiance du système */}
      {metrics.trustScore > 70 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="absolute -top-2 -right-2 z-10"
        >
          <Badge 
            variant="secondary" 
            className="bg-success text-background text-xs px-2 py-1 rounded-full shadow-lg"
          >
            <Shield className="w-3 h-3 mr-1" />
            {metrics.trustScore}%
          </Badge>
        </motion.div>
      )}
    </div>
  );
};

export default SocialGravityWidget;