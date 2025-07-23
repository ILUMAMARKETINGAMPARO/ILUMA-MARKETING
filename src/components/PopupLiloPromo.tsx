import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Star, Trophy, Clock, Rocket, Zap, Target, Crown, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage.ts';
interface PopupLiloPromoProps {
  isOpen?: boolean;
  onClose?: () => void;
}
const PopupLiloPromo = ({
  isOpen = false,
  onClose
}: PopupLiloPromoProps) => {
  const { t, language, setLanguage } = useLanguage();
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

  // Particules flottantes améliorées
  const particles = Array.from({ length: 15 }, (_, i) => (
    <motion.div 
      key={i} 
      className="absolute w-1.5 h-1.5 bg-accent/70 rounded-full shadow-glow"
      initial={{
        x: Math.random() * 800,
        y: Math.random() * 600,
        opacity: 0
      }} 
      animate={{
        y: [Math.random() * 600, Math.random() * 600 - 120],
        opacity: [0, 0.8, 0],
        scale: [0, 1.2, 0]
      }} 
      transition={{
        duration: Math.random() * 4 + 3,
        repeat: Infinity,
        delay: Math.random() * 3,
        ease: "easeInOut"
      }} 
    />
  ));
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
                {/* Sélecteur de langue en haut à gauche */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex gap-1 bg-black/50 backdrop-blur-sm rounded-full p-1 border border-white/20">
                    {['fr', 'en', 'es', 'ar'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang as 'fr' | 'en' | 'es' | 'ar')}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                          language === lang
                            ? 'bg-accent text-black shadow-glow'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bouton fermer stylé */}
                <Button variant="ghost" size="sm" onClick={() => handleClose(true)} className="absolute top-4 right-4 z-10 text-white/60 hover:text-white hover:bg-red-500/20 w-12 h-12 p-0 rounded-full border border-white/20 hover:border-red-500/50 transition-all duration-300">
                  <X className="w-6 h-6" />
                </Button>

                {/* Layout principal responsive - Dimensions ajustées */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 max-h-[75vh] sm:max-h-[80vh] lg:max-h-[85vh] overflow-y-auto">
                  
                  {/* COLONNE GAUCHE - LILO GÉANT ET IMPACT VISUEL */}
                  <div className="bg-gradient-to-br from-[#8E44FF]/20 to-[#FFD56B]/20 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
                    
                     {/* Effets de fond animés améliorés */}
                    <motion.div 
                      animate={{
                        background: [
                          "radial-gradient(circle at 30% 70%, hsla(var(--primary), 0.15), hsla(var(--accent), 0.15))",
                          "radial-gradient(circle at 70% 30%, hsla(var(--accent), 0.15), hsla(var(--primary), 0.15))",
                          "radial-gradient(circle at 30% 70%, hsla(var(--primary), 0.15), hsla(var(--accent), 0.15))"
                        ]
                      }} 
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }} 
                      className="absolute inset-0 backdrop-blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                    
                    {/* LILO GÉANT SPECTACULAIRE - Responsive */}
                    <motion.div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 mx-auto mb-4 sm:mb-8" animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }} transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}>
                      {/* Halos multiples gigantesques */}
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-[#8E44FF]/40 to-[#FFD56B]/40 rounded-full blur-3xl" animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.8, 0.4],
                    rotate: [0, 180, 360]
                  }} transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }} />
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-[#FFD56B]/30 to-[#8E44FF]/30 rounded-full blur-2xl" animate={{
                    scale: [1.2, 0.8, 1.2],
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [360, 180, 0]
                  }} transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }} />
                      
                      {/* Corps de Lilo GÉANT */}
                      <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto bg-gradient-to-br from-[#8E44FF] via-[#6B46C1] to-[#8E44FF] rounded-full flex items-center justify-center border-4 border-[#FFD56B]/70 shadow-2xl">
                        
                        {/* Yeux animés géants */}
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
                        
                        {/* Reflets dans les yeux */}
                        <motion.div className="absolute top-8 left-12 w-2 h-2 bg-white rounded-full opacity-80" animate={{
                      opacity: [0.8, 0.3, 0.8]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity
                    }} />
                        <motion.div className="absolute top-8 right-12 w-2 h-2 bg-white rounded-full opacity-80" animate={{
                      opacity: [0.3, 0.8, 0.3]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1
                    }} />
                      </div>

                      {/* Antennes géantes animées */}
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-2">
                          <motion.div className="w-1 h-8 lg:h-12 bg-[#FFD56B] rounded-full origin-bottom shadow-glow" animate={{
                        rotate: [-15, 15, -15]
                      }} transition={{
                        duration: 3,
                        repeat: Infinity
                      }} />
                          <motion.div className="w-1 h-8 lg:h-12 bg-[#FFD56B] rounded-full origin-bottom shadow-glow" animate={{
                        rotate: [15, -15, 15]
                      }} transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 0.7
                      }} />
                        </div>
                      </div>
                      
                      {/* Étincelles autour de Lilo */}
                      {Array.from({
                    length: 8
                  }).map((_, i) => <motion.div key={i} className="absolute w-2 h-2 bg-[#FFD56B] rounded-full" style={{
                    top: '50%',
                    left: '50%',
                    originX: 0.5,
                    originY: 0.5
                  }} animate={{
                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 120],
                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 120],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }} />)}
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
                      <motion.p className="text-white font-['Montserrat'] text-lg italic text-center" animate={{
                    opacity: [0.8, 1, 0.8]
                  }} transition={{
                    duration: 3,
                    repeat: Infinity
                  }}>
                        "{t('promotion.liloMessage')}"
                      </motion.p>
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
                      {/* Titre principal */}
                      <motion.h2 className="text-3xl lg:text-4xl font-black text-white mb-4 font-['Montserrat']" animate={{
                    backgroundSize: ['100% 100%', '200% 200%', '100% 100%']
                  }} transition={{
                    duration: 3,
                    repeat: Infinity
                  }}>
                        <span className="bg-gradient-to-r from-[#8E44FF] via-[#FFD56B] to-[#8E44FF] bg-clip-text text-transparent bg-[length:200%_100%]">
                          {t('promotion.title')}
                        </span>
                      </motion.h2>

                      {/* Sous-titre offre spéciale */}
                      <motion.div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 rounded-full mb-6 inline-block" animate={{
                    boxShadow: ['0 0 20px rgba(239, 68, 68, 0.3)', '0 0 30px rgba(239, 68, 68, 0.6)', '0 0 20px rgba(239, 68, 68, 0.3)']
                  }} transition={{
                    duration: 2,
                    repeat: Infinity
                  }}>
                        <span className="text-white font-bold text-lg">{t('promotion.subtitle')}</span>
                      </motion.div>

                      {/* Offre valide jusqu'au */}
                      <div className="text-[#FFD56B] font-semibold text-lg">
                        {t('promotion.validUntil')}
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
                        {t('promotion.giftOffer')}
                      </h3>

                      {/* Tableau des services et produits offerts */}
                      <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-6 border-2 border-[#8E44FF]/30 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-center text-white font-semibold mb-4">
                          <div className="text-[#FFD56B]">{t('promotion.serviceCount')}</div>
                          <div className="text-[#FFD56B]">{t('promotion.giftsOffered')}</div>
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
                    }].map((row, index) => <motion.div key={index} className="grid grid-cols-2 gap-4 py-3 text-center border-b border-white/20 last:border-b-0" initial={{
                      opacity: 0,
                      x: -20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} transition={{
                      delay: 0.8 + index * 0.1
                    }}>
                            <div className="text-white font-semibold">{row.services}</div>
                            <div className="text-[#FFD56B] font-bold">{row.gifts}</div>
                          </motion.div>)}
                      </div>

                      {/* Produits au choix */}
                      <div className="bg-gradient-to-r from-[#FFD56B]/20 to-[#8E44FF]/20 rounded-2xl p-6 border-2 border-[#FFD56B]/30 mb-6">
                        <h4 className="text-[#FFD56B] font-bold text-lg mb-4 text-center">{t('promotion.products')}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[{
                        icon: '🖥️',
                        name: t('promotion.miniWebsite')
                      }, {
                        icon: '🧲',
                        name: t('promotion.smartLanding')
                      }, {
                        icon: '💎',
                        name: t('promotion.loyaltyPage')
                      }, {
                        icon: '📝',
                        name: t('promotion.blogPage')
                      }, {
                        icon: '🤖',
                        name: t('promotion.crmSetup')
                      }, {
                        icon: '📱',
                        name: t('promotion.socialMedia')
                      }].map((product, index) => <motion.div key={index} className="flex items-center gap-3 text-white font-semibold bg-black/20 rounded-lg p-3" initial={{
                        opacity: 0,
                        x: 20
                      }} animate={{
                        opacity: 1,
                        x: 0
                      }} transition={{
                        delay: 1 + index * 0.1
                      }}>
                            <span className="text-2xl">{product.icon}</span>
                            <span className="text-sm">{product.name}</span>
                          </motion.div>)}
                        </div>
                      </div>

                      {/* Services disponibles améliorés */}
                      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-6 border-2 border-primary/30 backdrop-blur-sm">
                        <h4 className="text-accent font-bold text-lg mb-6 text-center font-['Montserrat']">
                          {t('promotion.servicesAvailable')}
                        </h4>
                        
                        <div className="space-y-6">
                          {/* Visibilité & Référencement */}
                          <div className="bg-black/20 rounded-xl p-4">
                            <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                              {t('promotion.visibilityTitle')}
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {[
                                { icon: '🔍', name: 'SEO Local Intelligent' },
                                { icon: '🤖', name: 'SEO propulsé par IA' },
                                { icon: '🎬', name: 'Optimisation YouTube' }
                              ].map((service, index) => (
                                <motion.div 
                                  key={index} 
                                  className="flex items-center gap-2 text-white/90 text-sm font-medium p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.2 + index * 0.1 }}
                                >
                                  <span className="text-base">{service.icon}</span>
                                  <span>{service.name}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Publicité Multicanale */}
                          <div className="bg-black/20 rounded-xl p-4">
                            <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                              {t('promotion.advertisingTitle')}
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {[
                                { icon: '🔎', name: 'Google Ads' },
                                { icon: '📸', name: 'Instagram Ads' },
                                { icon: '💬', name: 'Meta Ads' },
                                { icon: '❤️', name: 'Tinder Ads' },
                                { icon: '🎶', name: 'Spotify Ads' },
                                { icon: '📺', name: 'YouTube Ads' }
                              ].map((service, index) => (
                                <motion.div 
                                  key={index} 
                                  className="flex items-center gap-2 text-white/90 text-sm font-medium p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.4 + index * 0.1 }}
                                >
                                  <span className="text-base">{service.icon}</span>
                                  <span>{service.name}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <motion.div 
                          className="text-center mt-6 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-primary/30"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.8 }}
                        >
                          <p className="text-primary font-semibold text-base font-['Montserrat']">
                            {t('promotion.strategicMessage')}
                          </p>
                          <p className="text-white/80 text-sm mt-2">
                            {t('promotion.strategicSubtitle')}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Section Parrainage Entrepreneur */}
                    <motion.div className="bg-gradient-to-r from-[#FFD56B]/20 to-[#8E44FF]/20 rounded-3xl p-6 border-2 border-[#FFD56B]/50 mb-8" initial={{
                  y: 30,
                  opacity: 0
                }} animate={{
                  y: 0,
                  opacity: 1
                }} transition={{
                  delay: 1.3
                }}>
                      <h4 className="text-[#FFD56B] font-bold text-xl mb-4 font-['Montserrat'] text-center">
                        {t('promotion.referralTitle')}
                      </h4>
                      <div className="text-center space-y-3">
                        <p className="text-white font-['Montserrat'] text-base">
                          {t('promotion.referralQuestion')}
                        </p>
                        <p className="text-white font-['Montserrat'] text-base">
                          <strong className="text-[#FFD56B]">{t('promotion.referralCondition')}</strong>
                        </p>
                        <p className="text-[#8E44FF] font-bold text-lg">
                          {t('promotion.referralReward')}
                        </p>
                        
                        <div className="bg-black/30 rounded-2xl p-4 mt-4">
                          <p className="text-[#FFD56B] font-bold mb-3">{t('promotion.giftChoice')}</p>
                          <div className="space-y-2">
                            {['Site Web (5 pages)', 'Landing Page Intelligente'].map((gift, index) => <motion.div key={index} className="text-white/90 font-semibold" initial={{
                          opacity: 0,
                          x: 20
                        }} animate={{
                          opacity: 1,
                          x: 0
                        }} transition={{
                          delay: 1.5 + index * 0.1
                        }}>
                              • {gift}
                            </motion.div>)}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Détails Techniques & Engagement */}
                    <motion.div className="mb-8" initial={{
                  y: 30,
                  opacity: 0
                }} animate={{
                  y: 0,
                  opacity: 1
                }} transition={{
                  delay: 1.4
                }}>
                      <h4 className="text-[#FFD56B] font-bold text-xl mb-6 font-['Montserrat'] text-center">
                        {t('promotion.technicalTitle')}
                      </h4>
                      
                      {/* Tarification */}
                      <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-6 border-2 border-[#8E44FF]/30 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">{t('promotion.pricingTitle')}</span>
                            <span className="text-[#FFD56B] font-bold">{t('promotion.pricingAmount')}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">{t('promotion.timeTitle')}</span>
                            <span className="text-[#FFD56B] font-bold">{t('promotion.timeAmount')}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">{t('promotion.commitmentTitle')}</span>
                            <span className="text-[#FFD56B] font-bold">{t('promotion.commitmentAmount')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Inclus chaque mois */}
                      <div className="bg-gradient-to-r from-[#FFD56B]/20 to-[#8E44FF]/20 rounded-2xl p-6 border-2 border-[#FFD56B]/30 mb-6">
                        <h5 className="text-[#FFD56B] font-bold text-lg mb-4 text-center">{t('promotion.monthlyIncludes')}</h5>
                        <div className="space-y-2">
                          {[t('promotion.diagnosticHour'), t('promotion.executionHour'), t('promotion.reportHour'), t('promotion.followupHour')].map((item, index) => <motion.div key={index} className="text-white/90 font-semibold" initial={{
                        opacity: 0,
                        x: 20
                      }} animate={{
                        opacity: 1,
                        x: 0
                      }} transition={{
                        delay: 1.6 + index * 0.1
                      }}>
                              • {item}
                            </motion.div>)}
                        </div>
                      </div>

                      {/* Résultats observés */}
                      <div className="bg-gradient-to-r from-[#8E44FF]/30 to-[#FFD56B]/30 rounded-2xl p-6 border-2 border-[#8E44FF]/50">
                        <h5 className="text-[#FFD56B] font-bold text-lg mb-4 text-center">{t('promotion.resultsTitle')}</h5>
                        <div className="grid grid-cols-1 gap-3">
                          {[t('promotion.visibilityIncrease'), t('promotion.entrepreneursPropelled'), t('promotion.satisfaction')].map((stat, index) => {
                        return <motion.div key={index} className="bg-black/30 rounded-xl p-3 text-center" initial={{
                          opacity: 0,
                          scale: 0.8
                        }} animate={{
                          opacity: 1,
                          scale: 1
                        }} transition={{
                          delay: 1.8 + index * 0.1,
                          type: "spring"
                        }} whileHover={{
                          scale: 1.05
                        }}>
                                    <span className="text-white font-bold text-lg">{stat}</span>
                                  </motion.div>;
                      })}
                        </div>
                      </div>
                    </motion.div>

                    {/* Boutons d'action MEGA */}
                    <motion.div className="space-y-4" initial={{
                  y: 50,
                  opacity: 0
                }} animate={{
                  y: 0,
                  opacity: 1
                }} transition={{
                  delay: 1.6
                }}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-black font-black py-6 px-8 text-xl rounded-2xl transition-all duration-500 shadow-2xl shadow-primary/30 font-['Montserrat'] group relative overflow-hidden border-2 border-accent/50"
                          onClick={() => {
                            handleClose(true);
                            window.location.href = '/presentation-outils';
                          }}
                        >
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="relative flex items-center justify-center gap-3">
                            <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                            <span className="font-black tracking-wide">{t('promotion.discoverOffer')}</span>
                            <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                          </div>
                        </Button>
                      </motion.div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-primary/60 text-white hover:bg-primary/20 hover:border-primary py-4 px-6 text-lg rounded-xl font-['Montserrat'] transition-all duration-300 backdrop-blur-sm"
                        onClick={() => handleClose()}
                      >
                        <Clock className="w-5 h-5 mr-2" />
                        {t('promotion.remindLater')}
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