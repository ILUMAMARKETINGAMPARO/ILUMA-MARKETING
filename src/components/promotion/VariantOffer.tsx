import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Clock, Star, Target } from 'lucide-react';

interface VariantOfferProps {
  config: {
    discount: number;
    urgency: 'high' | 'medium' | 'low';
    ctaText: string;
    benefits: string[];
  };
  variantId: string;
  onConversion: () => void;
  roiData?: {
    projectedROI: number;
    confidence: number;
  };
}

const VariantOffer: React.FC<VariantOfferProps> = ({ 
  config, 
  variantId, 
  onConversion,
  roiData 
}) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Gestion du countdown pour variant urgence
  useEffect(() => {
    if (config.urgency === 'high') {
      const updateCountdown = () => {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const diff = endOfDay.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${hours}h ${minutes}min`);
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [config.urgency]);

  const getOfferStyle = () => {
    switch (variantId) {
      case 'urgency_high':
        return {
          badgeClass: 'text-xl px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse shadow-lg shadow-red-500/30',
          ctaClass: 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105',
          discountIcon: '🔥',
          benefits: [
            '⚡ Configuration premium immédiate',
            '🎯 Support VIP prioritaire 24h',
            '💎 Outils IA exclusifs inclus',
            '🚀 Résultats garantis ou remboursé'
          ]
        };
      
      case 'minimal_clean':
        return {
          badgeClass: 'text-lg px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-500 text-white border border-slate-400/30',
          ctaClass: 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 text-white font-semibold py-4 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300',
          discountIcon: '📊',
          benefits: [
            '📈 Analyse détaillée de vos métriques',
            '🔍 Rapport personnalisé complet',
            '📋 Recommandations stratégiques',
            '💡 Consultation d\'expert incluse'
          ]
        };
      
      default:
        return {
          badgeClass: 'text-lg px-4 py-2 bg-gradient-to-r from-primary to-accent text-white',
          ctaClass: 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
          discountIcon: '✨',
          benefits: [
            '🎯 Solution personnalisée',
            '🤖 IA avancée intégrée',
            '📞 Support dédié',
            '🔄 Mise à jour continue'
          ]
        };
    }
  };

  const { badgeClass, ctaClass, discountIcon, benefits } = getOfferStyle();

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
          <Gift className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {variantId === 'urgency_high' ? 'Offre Limitée Activée!' : 
         variantId === 'minimal_clean' ? 'Votre Analyse Personnalisée' : 
         'Votre Offre Personnalisée'}
      </h3>

      {/* ROI Display avec style variant */}
      {roiData && (
        <motion.div 
          className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {roiData.projectedROI.toLocaleString()}€
              </div>
              <div className="text-sm text-muted-foreground">
                {variantId === 'minimal_clean' ? 'Valeur Estimée' : 'ROI Projeté'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">
                {roiData.confidence}%
              </div>
              <div className="text-sm text-muted-foreground">
                {variantId === 'urgency_high' ? 'Garantie' : 'Confiance'}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Discount et urgence */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Badge className={badgeClass}>
              {discountIcon} -{config.discount}% Exclusif
            </Badge>
          </motion.div>
        </div>
        
        {/* Countdown pour urgence */}
        {config.urgency === 'high' && timeLeft && (
          <div className="flex items-center justify-center gap-2 text-red-400">
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="font-mono font-bold">
              Expire dans {timeLeft}
            </span>
          </div>
        )}
      </div>

      {/* Benefits adaptés au variant */}
      <div className="space-y-2">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index} 
            className="flex items-center gap-2 justify-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <span className="text-sm">{benefit}</span>
          </motion.div>
        ))}
      </div>

      {/* CTA adapté au variant */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          size="lg" 
          className={`w-full ${ctaClass}`}
          onClick={onConversion}
        >
          <span className="flex items-center gap-2">
            {variantId === 'urgency_high' ? (
              <>
                <Target className="h-5 w-5" />
                {config.ctaText}
              </>
            ) : variantId === 'minimal_clean' ? (
              <>
                <Star className="h-5 w-5" />
                {config.ctaText}
              </>
            ) : (
              <>
                <Gift className="h-5 w-5" />
                {config.ctaText}
              </>
            )}
          </span>
        </Button>
        
        <p className="text-xs text-muted-foreground mt-2">
          {config.urgency === 'high' ? 
            'Offre limitée • Places limitées • Action immédiate requise' :
          config.urgency === 'low' ?
            'Sans engagement • Analyse gratuite • Support inclus' :
            'Offre valable 48h • Satisfaction garantie • Support prioritaire inclus'
          }
        </p>
      </motion.div>
    </div>
  );
};

export default VariantOffer;