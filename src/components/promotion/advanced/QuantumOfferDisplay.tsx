import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuantumPersonalization } from '@/hooks/useQuantumPersonalization.ts';
import { Sparkles, Clock, TrendingUp, Shield, Star, Zap } from 'lucide-react';

interface QuantumOfferDisplayProps {
  onAccept: (offer: any) => void;
  onDecline: () => void;
  className?: string;
}

const QuantumOfferDisplay: React.FC<QuantumOfferDisplayProps> = ({
  onAccept,
  onDecline,
  className = ""
}) => {
  const { getCurrentOffer, getConfidenceLevel, quantumState } = useQuantumPersonalization();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [priceAnimation, setPriceAnimation] = useState(false);
  
  const offer = getCurrentOffer();
  const confidence = getConfidenceLevel();

  // Gestion du compte à rebours
  useEffect(() => {
    if (!offer?.urgency.timeRemaining) return;

    setTimeRemaining(offer.urgency.timeRemaining);
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Mise à jour chaque minute

    return () => clearInterval(interval);
  }, [offer?.urgency.timeRemaining]);

  // Animation du prix lors des changements
  useEffect(() => {
    if (offer) {
      setPriceAnimation(true);
      const timer = setTimeout(() => setPriceAnimation(false), 600);
      return () => clearTimeout(timer);
    }
  }, [offer?.price]);

  if (!offer) {
    return (
      <Card className={`${className} animate-pulse`}>
        <CardContent className="p-6">
          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </CardContent>
      </Card>
    );
  }

  // Formatage du temps restant
  const formatTimeRemaining = (minutes: number) => {
    if (minutes <= 0) return "Expiré";
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  // Couleur d'urgence
  const getUrgencyColor = () => {
    switch (offer.urgency.level) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'primary';
      case 'low': return 'secondary';
      default: return 'primary';
    }
  };

  // Animation des économies
  const SavingsHighlight = () => {
    if (offer.discount <= 0) return null;

    return (
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
        className="absolute -top-3 -right-3 z-10"
      >
        <Badge 
          variant="secondary"
          className="bg-success text-background px-3 py-1 text-sm font-bold shadow-lg"
        >
          -{offer.discount}%
        </Badge>
      </motion.div>
    );
  };

  // Indicateur de confiance quantique
  const QuantumConfidence = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mb-4"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">
          Match personnalisé: {offer.personalization.profileMatch}%
        </span>
        <Progress 
          value={offer.personalization.profileMatch} 
          className="flex-1 h-2"
        />
      </motion.div>
    );
  };

  // Affichage du prix avec animation
  const PriceDisplay = () => {
    return (
      <div className="text-center mb-6">
        <motion.div
          animate={priceAnimation ? { scale: [1, 1.1, 1], color: ["#current", "#10b981", "#current"] } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-primary mb-2"
        >
          {offer.price.toLocaleString()}€
        </motion.div>
        
        {offer.discount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-lg line-through text-muted-foreground">
              {offer.originalPrice.toLocaleString()}€
            </span>
            <Badge variant="secondary" className="bg-success text-background">
              Économie: {(offer.originalPrice - offer.price).toLocaleString()}€
            </Badge>
          </motion.div>
        )}
      </div>
    );
  };

  // Bénéfices avec animations séquentielles
  const BenefitsList = () => {
    return (
      <div className="space-y-3 mb-6">
        {offer.benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
          >
            <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0">
              <Star className="w-3 h-3 text-background" />
            </div>
            <span className="text-sm font-medium">{benefit}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  // Fonctionnalités adaptées
  const AdaptedFeatures = () => {
    if (offer.personalization.adaptedFeatures.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          Spécialement pour vous
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {offer.personalization.adaptedFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + 0.1 * index }}
              className="text-xs bg-primary/10 text-primary px-3 py-2 rounded-lg border border-primary/20"
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Urgence avec compte à rebours
  const UrgencyDisplay = () => {
    const urgencyColor = getUrgencyColor();
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center justify-between p-3 rounded-lg bg-${urgencyColor}/10 border border-${urgencyColor}/20 mb-6`}
      >
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 text-${urgencyColor}`} />
          <span className={`text-sm font-medium text-${urgencyColor}`}>
            {offer.urgency.reason}
          </span>
        </div>
        
        {timeRemaining > 0 && (
          <motion.div
            animate={{ scale: offer.urgency.level === 'critical' ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: offer.urgency.level === 'critical' ? Infinity : 0 }}
            className={`text-sm font-bold text-${urgencyColor}`}
          >
            {formatTimeRemaining(timeRemaining)}
          </motion.div>
        )}
      </motion.div>
    );
  };

  // Probabilités de succès
  const SuccessProbabilities = () => {
    return (
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Conversion', value: offer.probability.conversion, icon: TrendingUp },
          { label: 'Engagement', value: offer.probability.engagement, icon: Sparkles },
          { label: 'Satisfaction', value: offer.probability.satisfaction, icon: Shield }
        ].map((prob, index) => (
          <motion.div
            key={prob.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + 0.1 * index }}
            className="text-center p-3 rounded-lg bg-muted/20"
          >
            <prob.icon className="w-4 h-4 mx-auto mb-1 text-primary" />
            <div className="text-sm font-bold text-primary">{prob.value}%</div>
            <div className="text-xs text-muted-foreground">{prob.label}</div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden border-2 border-primary/20 shadow-xl">
        <SavingsHighlight />
        
        {/* Effet de brillance au hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 300, opacity: [0, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>

        <CardHeader className="text-center pb-4">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-primary mb-2"
          >
            Offre Quantique Personnalisée
          </motion.h3>
          
          <div className="text-sm text-muted-foreground">
            {offer.personalization.customMessage}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <QuantumConfidence />
          <PriceDisplay />
          <UrgencyDisplay />
          <BenefitsList />
          <AdaptedFeatures />
          <SuccessProbabilities />

          {/* Boutons d'action */}
          <div className="flex gap-3">
            <Button
              onClick={() => onAccept(offer)}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <motion.span
                animate={offer.urgency.level === 'critical' ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 1, repeat: offer.urgency.level === 'critical' ? Infinity : 0 }}
              >
                Réclamer Cette Offre
              </motion.span>
            </Button>
            
            <Button
              onClick={onDecline}
              variant="outline"
              size="lg"
              className="px-4"
            >
              Plus tard
            </Button>
          </div>

          {/* Indicateur d'optimisations */}
          {quantumState.adaptationCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center"
            >
              <Badge variant="outline" className="text-xs">
                ✨ Offre optimisée {quantumState.adaptationCount} fois pour vous
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuantumOfferDisplay;