import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Star, Trophy, Clock, Rocket, Zap, Target, Crown, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/hooks/useTranslations';
interface PopupLiloPromoProps {
  isOpen?: boolean;
  onClose?: () => void;
}
const PopupLiloPromo = ({
  isOpen = false,
  onClose
}: PopupLiloPromoProps) => {
  const { t } = useTranslations();
  const [isVisible, setIsVisible] = useState(isOpen);
  const [showSpaceshipButton, setShowSpaceshipButton] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 47
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    // Écouteur pour l'événement d'ouverture de promotion
    const handleOpenPromotion = () => {
      setIsVisible(true);
      setShowSpaceshipButton(false);
    };
    window.addEventListener('openPromotionPopup', handleOpenPromotion);

    // Vérifier si l'utilisateur a déjà fermé la promotion (localStorage)
    const hasClosedPromo = localStorage.getItem('iluma-promo-closed');
    
    // Timer pour afficher le popup après 3 secondes (seulement si pas fermé auparavant)
    if (!hasClosedPromo && !showSpaceshipButton) {
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      // Gestionnaire de scroll pour réafficher à mi-page (seulement si pas fermé par l'utilisateur)
      const handleScroll = () => {
        if (window.scrollY > 300 && !isVisible && !hasClosedPromo) {
          setIsVisible(true);
        }
      };
      window.addEventListener('scroll', handleScroll);

      // Countdown timer fictif pour l'urgence
      const countdownTimer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev.minutes > 0) {
            return {
              ...prev,
              minutes: prev.minutes - 1
            };
          } else if (prev.hours > 0) {
            return {
              ...prev,
              hours: prev.hours - 1,
              minutes: 59
            };
          } else if (prev.days > 0) {
            return {
              ...prev,
              days: prev.days - 1,
              hours: 23,
              minutes: 59
            };
          }
          return prev;
        });
      }, 60000); // Update every minute

      return () => {
        clearTimeout(showTimer);
        clearInterval(countdownTimer);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('openPromotionPopup', handleOpenPromotion);
      };
    }

    return () => {
      window.removeEventListener('openPromotionPopup', handleOpenPromotion);
    };
  }, [isVisible, showSpaceshipButton]);

  // useEffect pour gérer le scroll lock
  useEffect(() => {
    document.body.classList.toggle('popup-open', isVisible);
    return () => document.body.classList.remove('popup-open');
  }, [isVisible]);
  
  const handleClose = (permanent = false) => {
    setIsVisible(false);
    if (permanent) {
      localStorage.setItem('iluma-promo-closed', 'true');
    }
    if (onClose) {
      onClose();
    }
  };

  return <AnimatePresence>
      {isVisible && <motion.div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/60 backdrop-blur-md p-4" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} transition={{
      duration: 0.3
    }} onClick={() => handleClose()}>
          <div className="w-full max-w-5xl rounded-2xl border border-[#ffffff22] bg-gradient-to-b from-[#1d1325cc] to-[#0f0a18e6] shadow-xl text-white popup-iluma-scrollbar max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <Card className="bg-gradient-to-br from-background via-secondary/20 to-background border-4 border-primary/40 shadow-2xl shadow-primary/30 overflow-hidden relative backdrop-blur-md">
              
              {/* Effets lumineux améliorés */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              <motion.div 
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  boxShadow: [
                    "0 0 20px hsl(var(--primary) / 0.5)",
                    "0 0 30px hsl(var(--primary) / 0.8)",
                    "0 0 20px hsl(var(--primary) / 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              
              <CardContent className="p-0 relative">
                {/* Bouton fermer stylé */}
                <Button variant="ghost" size="sm" onClick={() => handleClose(true)} className="absolute top-4 right-4 z-10 text-white/60 hover:text-white hover:bg-red-500/20 w-12 h-12 p-0 rounded-full border border-white/20 hover:border-red-500/50 transition-all duration-300">
                  <X className="w-6 h-6" />
                </Button>

                {/* Layout principal responsive */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 max-h-[75vh] sm:max-h-[80vh] lg:max-h-[85vh] overflow-y-auto">
                  
                  {/* COLONNE GAUCHE - LILO GÉANT */}
                  <div className="bg-gradient-to-br from-[#8E44FF]/20 to-[#FFD56B]/20 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
                    
                    {/* LILO GÉANT SPECTACULAIRE */}
                    <motion.div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 mx-auto mb-4 sm:mb-8" animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }} transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}>
                      {/* Corps de Lilo GÉANT */}
                      <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto bg-gradient-to-br from-[#8E44FF] via-[#6B46C1] to-[#8E44FF] rounded-full flex items-center justify-center border-4 border-[#FFD56B]/70 shadow-2xl">
                        <motion.div className="flex gap-4" animate={{
                      scaleY: [1, 0.1, 1]
                    }} transition={{
                      duration: 0.2,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut"
                    }}>
                          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#FFD56B] rounded-full shadow-lg" />
                          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#FFD56B] rounded-full shadow-lg" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Message de Lilo géant */}
                    <motion.div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border-2 border-[#FFD56B]/30 max-w-md mx-auto" initial={{
                  scale: 0,
                  y: 50
                }} animate={{
                  scale: 1,
                  y: 0
                }} transition={{
                  delay: 1,
                  type: "spring",
                  stiffness: 200
                }}>
                      <div className="flex items-center gap-3 mb-3">
                        <Heart className="w-6 h-6 text-[#FFD56B] animate-pulse" />
                        <span className="text-[#FFD56B] font-bold font-['Montserrat'] text-lg">Lilo :</span>
                      </div>
                      <p className="text-white font-['Montserrat'] text-lg italic text-center">
                        "Découvrez une offre exclusive que j'ai spécialement négociée pour vous!"
                      </p>
                    </motion.div>
                  </div>

                  {/* COLONNE DROITE - CONTENU DE L'OFFRE */}
                  <div className="p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#0A0A10] to-[#1a1a2e]">
                    
                    {/* En-tête spectaculaire */}
                    <motion.div className="text-center mb-8" initial={{
                  y: 30,
                  opacity: 0
                }} animate={{
                  y: 0,
                  opacity: 1
                }} transition={{
                  delay: 0.3
                }}>
                      <motion.h2 className="text-3xl lg:text-4xl font-black text-white mb-4 font-['Montserrat']">
                        <span className="bg-gradient-to-r from-[#8E44FF] via-[#FFD56B] to-[#8E44FF] bg-clip-text text-transparent">
                          MÉGA PROMO ILUMA™
                        </span>
                      </motion.h2>

                      <motion.div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 rounded-full mb-6 inline-block">
                        <span className="text-white font-bold text-lg">JUSQU'À 3 PRODUITS OFFERTS</span>
                      </motion.div>

                      <div className="text-[#FFD56B] font-semibold text-lg">
                        Offre valable jusqu'au 31 janvier 2025
                      </div>
                    </motion.div>

                    {/* Offre Cadeaux */}
                    <motion.div className="space-y-6 mb-8" initial={{
                  x: 50,
                  opacity: 0
                }} animate={{
                  x: 0,
                  opacity: 1
                }} transition={{
                  delay: 0.6
                }}>
                      <h3 className="text-2xl font-bold text-[#FFD56B] mb-4 font-['Montserrat'] text-center">
                        🎁 Offre Cadeaux Galactique
                      </h3>

                      {/* Tableau des services et produits offerts */}
                      <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-6 border-2 border-[#8E44FF]/30 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-center text-white font-semibold mb-4">
                          <div className="text-[#FFD56B]">Services Achetés</div>
                          <div className="text-[#FFD56B]">Cadeaux Offerts</div>
                        </div>
                        {[{
                      services: '2 Services',
                      gifts: '1 Produit offert'
                    }, {
                      services: '3 Services',
                      gifts: '2 Produits offerts'
                    }, {
                      services: '4 Services',
                      gifts: '3 Produits offerts'
                    }].map((tier, index) => <div key={index} className="grid grid-cols-2 gap-4 text-center p-3 bg-black/30 rounded-lg mb-2">
                            <div className="text-white font-semibold">{tier.services}</div>
                            <div className="text-[#FFD56B] font-bold">{tier.gifts}</div>
                          </div>)}
                      </div>
                    </motion.div>

                    {/* Boutons CTA */}
                    <motion.div className="space-y-4" initial={{
                  y: 50,
                  opacity: 0
                }} animate={{
                  y: 0,
                  opacity: 1
                }} transition={{
                  delay: 1.5
                }}>
                      <Button onClick={() => handleClose(true)} className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white text-lg font-bold py-4 px-8 rounded-xl transform transition-all duration-300 hover:scale-105 font-['Montserrat'] shadow-2xl hover:shadow-[#8E44FF]/50">
                        <Trophy className="w-6 h-6 mr-3 animate-bounce" />
                        <span className="font-black tracking-wide">🚀 Découvrir l'Offre</span>
                      </Button>

                      <Button onClick={() => handleClose()} variant="ghost" className="w-full text-white/60 hover:text-white hover:bg-white/10 transition-colors font-['Montserrat']">
                        Plus tard
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>}
    </AnimatePresence>;
};
export default PopupLiloPromo;