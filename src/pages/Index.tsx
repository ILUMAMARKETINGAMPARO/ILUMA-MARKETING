import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslations } from '@/hooks/useTranslations';
import { useDeviceInfo } from '@/hooks/use-mobile';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import PopupLiloPromo from '@/components/PopupLiloPromo';
import { MPEProvider } from '@/contexts/MPEContext';
import { TeamProvider } from '@/contexts/TeamContext';
import SEOManager from '@/components/seo/SEOManager';
import SEOHead from '@/components/seo/SEOHead';
import StructuredData from '@/components/seo/StructuredData';
import { SEOEngine } from '@/utils/seoEngine';
import { useLiloUX } from '@/hooks/useLiloUX';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sparkles, ArrowRight, Brain, Target, Rocket, Users, Star, TrendingUp, Zap, Heart, Globe, MessageSquare, CheckCircle, PlayCircle, HelpCircle, Eye, Lightbulb, Coffee, Smile, ThumbsUp, Wand2, Search, BarChart3, Award, Clock, Shield, MapPin } from 'lucide-react';
import ClientInterface from '@/components/rivalviews/ClientInterface';

// New hero components
import ParticleSystem from '@/components/hero/ParticleSystem';
import FloatingElements from '@/components/hero/FloatingElements';
import HolographicTitle from '@/components/hero/HolographicTitle';
import AIInitializationSequence from '@/components/hero/AIInitializationSequence';
const Index = () => {
  const {
    t,
    language
  } = useTranslations();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [liloMood, setLiloMood] = useState('curious');
  const [currentStory, setCurrentStory] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  // Hook de détection mobile
  const {
    isMobile,
    isTablet,
    orientation
  } = useDeviceInfo();
  const {
    scrollY
  } = useScroll();

  // Parallax effects avec scroll storytelling - adaptatif mobile
  const backgroundY = useTransform(scrollY, [0, 500], [0, isMobile ? 75 : 150]);
  const heroScale = useTransform(scrollY, [0, 300], [1, isMobile ? 1.05 : 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const storyProgress = useTransform(scrollY, [0, 2000], [0, 100]);

  // Lilo emotional states
  const liloStates = {
    curious: {
      icon: Eye,
      color: 'from-cyan-500 to-blue-500',
      message: t('home.lilo.states.curious') || "Explorons ensemble !"
    },
    excited: {
      icon: Sparkles,
      color: 'from-yellow-500 to-orange-500',
      message: t('home.lilo.states.excited') || "C'est parti !"
    },
    helping: {
      icon: Heart,
      color: 'from-pink-500 to-purple-500',
      message: t('home.lilo.states.helping') || "Je vous guide..."
    },
    celebrating: {
      icon: ThumbsUp,
      color: 'from-green-500 to-emerald-500',
      message: t('home.lilo.states.celebrating') || "Bravo !"
    },
    thinking: {
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      message: t('home.lilo.states.thinking') || "Analysons..."
    }
  };

  // Scroll-based Lilo mood changes
  useMotionValueEvent(scrollY, "change", latest => {
    const progress = latest / 2000;
    setScrollProgress(progress);
    if (progress < 0.2) setLiloMood('curious');else if (progress < 0.4) setLiloMood('excited');else if (progress < 0.6) setLiloMood('helping');else if (progress < 0.8) setLiloMood('thinking');else setLiloMood('celebrating');
  });

  // Mouse tracking for galactic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth * 2 - 1,
        y: e.clientY / window.innerHeight * 2 - 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // SEO optimized content
  const pageData = SEOEngine.getPageContent('home');
  const seoData = pageData?.seoData || SEOEngine.generatePageSEO('home');

  // User paths - Tim Brown narrative approach
  const userPaths = [{
    id: 'discovery',
    title: t('home.userPaths.discovery.title'),
    subtitle: t('home.userPaths.discovery.subtitle'),
    description: t('home.userPaths.discovery.description'),
    icon: Brain,
    color: 'from-cyan-500 to-blue-500',
    path: '/methode-iluma',
    persona: 'curious'
  }, {
    id: 'objectives',
    title: t('home.userPaths.objectives.title'),
    subtitle: t('home.userPaths.objectives.subtitle'),
    description: t('home.userPaths.objectives.description'),
    icon: Target,
    color: 'from-purple-500 to-pink-500',
    path: '/modules',
    persona: 'focused'
  }, {
    id: 'exploration',
    title: t('home.userPaths.exploration.title'),
    subtitle: t('home.userPaths.exploration.subtitle'),
    description: t('home.userPaths.exploration.description'),
    icon: Rocket,
    color: 'from-orange-500 to-red-500',
    path: '/presentation-outils',
    persona: 'explorer'
  }];

  // Featured modules with storytelling
  const featuredModules = [{
    name: 'ADLUMA™',
    description: 'Simulateur IA de visibilité',
    story: 'Prédisez votre succès avant d\'investir',
    icon: Target,
    path: '/adluma',
    gradient: 'from-cyan-400 to-purple-500',
    benefit: '+410% de visibilité'
  }, {
    name: 'ILA™',
    description: 'Scoring local intelligent',
    story: 'Mesurez votre attraction locale en temps réel',
    icon: TrendingUp,
    path: '/ila',
    gradient: 'from-purple-500 to-pink-500',
    benefit: 'Top 3 Google Maps'
  }, {
    name: 'ILUMATCH™',
    description: 'Réseau d\'inter-visibilité',
    story: 'Connectez-vous à un écosystème puissant',
    icon: Users,
    path: '/ilumatch',
    gradient: 'from-green-500 to-teal-500',
    benefit: 'Réseau qualifié'
  }, {
    name: 'LILO™',
    description: 'Assistant IA galactique',
    story: 'Votre copilote IA disponible 24/7',
    icon: MessageSquare,
    path: '/lilo',
    gradient: 'from-violet-500 to-purple-600',
    benefit: 'Support intelligent'
  }];
  const faqData = [{
    question: t('faq.google.question') || "Et si votre agence savait exactement ce que pense Google ?",
    answer: "C'est exactement ce que fait Iluma™. Notre IA analyse en temps réel les algorithmes Google et adapte votre stratégie pour maximiser votre visibilité locale."
  }, {
    question: t('faq.results.question') || "Comment Iluma™ garantit-elle des résultats mesurables ?",
    answer: "Grâce à notre écosystème de 9 modules IA interconnectés : ADLUMA™ prédit, ILA™ mesure, ILUMATCH™ connecte, et LILO™ optimise continuellement vos performances."
  }, {
    question: t('faq.difference.question') || "En quoi Iluma™ diffère-t-elle d'une agence traditionnelle ?",
    answer: "Nous sommes une agence qui pense comme une IA. Chaque décision est basée sur des données en temps réel, chaque action est optimisée par l'intelligence artificielle."
  }, {
    question: t('faq.preview.question') || "Puis-je voir des résultats avant d'investir ?",
    answer: "Absolument ! Notre simulateur ADLUMA™ vous montre vos résultats projetés gratuitement. Aucun engagement, juste de la transparence."
  }];
  return <>
      <SEOHead />
      <StructuredData type="Organization" />
      <StructuredData type="LocalBusiness" />
      <StructuredData type="FAQPage" />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A10] via-[#1a1a2e] to-[#0A0A10] overflow-hidden">
        <MPEProvider>
          <TeamProvider>
            <Navigation />
            
            {/* Animated Galactic Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8E44FF]/20 rounded-full blur-3xl" style={{
              y: backgroundY
            }} animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: mousePosition.x * 30,
              y: mousePosition.y * 20
            }} transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }} />
              <motion.div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FFD56B]/20 rounded-full blur-3xl" animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              x: mousePosition.x * -30,
              y: mousePosition.y * -20
            }} transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }} />
            </div>

            {/* Revolutionary Hero Section */}
            <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
            scale: heroScale,
            opacity: heroOpacity
          }}>
              {/* AI Initialization Sequence */}
              <AIInitializationSequence />

              {/* Particle System Background */}
              <ParticleSystem />

              {/* Floating 3D Elements */}
              <FloatingElements />

              {/* Advanced Background Effects */}
              <div className="absolute inset-0">
                {/* Neural network pattern */}
                <motion.div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, rgba(142, 68, 255, 0.1) 0%, transparent 50%),
                                     radial-gradient(circle at 80% 20%, rgba(255, 213, 107, 0.1) 0%, transparent 50%),
                                     radial-gradient(circle at 40% 40%, rgba(142, 68, 255, 0.05) 0%, transparent 50%)`
              }} animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }} transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }} />

                {/* Dynamic gradient orbs */}
                <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-3xl" animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
                x: [0, 100, -50, 0],
                y: [0, -50, 50, 0]
              }} transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }} />
                
                <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl" animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.6, 0.3],
                x: [0, -80, 60, 0],
                y: [0, 60, -40, 0]
              }} transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }} />

                {/* Rotating energy field */}
                <motion.div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] transform -translate-x-1/2 -translate-y-1/2" animate={{
                rotate: [0, 360],
                scale: [0.8, 1.1, 0.8]
              }} transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}>
                  <div className="w-full h-full border border-primary/20 rounded-full blur-sm opacity-60" />
                  <div className="absolute inset-8 border border-accent/20 rounded-full blur-sm opacity-40" />
                  <div className="absolute inset-16 border border-primary/10 rounded-full blur-sm opacity-30" />
                </motion.div>
              </div>

              {/* Main Content */}
              <div className="max-w-7xl mx-auto text-center relative z-20 px-6">
                <motion.div initial={{
                opacity: 0,
                y: 100
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 1.5,
                delay: 6
              }} className="space-y-12">
                  {/* Holographic Brand Badge */}
                  <motion.div initial={{
                  scale: 0,
                  opacity: 0
                }} animate={{
                  scale: 1,
                  opacity: 1
                }} transition={{
                  delay: 6.5,
                  type: "spring",
                  stiffness: 200
                }} className="inline-block">
                    
                  </motion.div>

                  {/* Holographic Title */}
                  <HolographicTitle title="Iluma™" subtitle={t('home.hero.subtitle')} subtitle2={t('home.hero.subtitle2')} isMobile={isMobile} />

                  {/* Enhanced Description with glassmorphism */}
                  <motion.div initial={{
                  opacity: 0,
                  y: 30
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 1,
                  delay: 7
                }} className="relative">
                    <motion.div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl" animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }} transition={{
                    duration: 4,
                    repeat: Infinity
                  }} />
                    <div className="relative bg-card/30 backdrop-blur-xl rounded-2xl p-8 border border-primary/20">
                      <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-white/90 max-w-4xl mx-auto leading-relaxed font-['Montserrat']`}>
                        {t('home.hero.description')}
                      </p>
                    </div>
                  </motion.div>

                  {/* Interactive Path Selection with 3D cards */}
                  <motion.div className={`grid ${isMobile ? 'grid-cols-1 gap-6 max-w-sm' : 'md:grid-cols-3 gap-8 max-w-6xl'} mx-auto`} initial={{
                  opacity: 0,
                  y: 50
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 1,
                  delay: 7.5
                }}>
                    {userPaths.map((path, index) => {
                    const IconComponent = path.icon;
                    return <motion.div key={path.id} initial={{
                      opacity: 0,
                      rotateX: -15,
                      y: 50
                    }} animate={{
                      opacity: 1,
                      rotateX: 0,
                      y: 0
                    }} transition={{
                      delay: 8 + index * 0.2,
                      duration: 0.8
                    }} whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      z: 50
                    }} whileTap={{
                      scale: 0.95
                    }} style={{
                      transformStyle: 'preserve-3d'
                    }}>
                          <Link to={path.path}>
                            <motion.div className="relative h-full group cursor-pointer" whileHover="hover">
                              {/* 3D shadow */}
                              <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl" variants={{
                            hover: {
                              scale: 1.1,
                              opacity: 0.8,
                              y: 10
                            }
                          }} transition={{
                            duration: 0.3
                          }} />

                              {/* Main card */}
                              <Card className="relative h-full bg-card/40 backdrop-blur-xl border border-primary/30 hover:border-primary/60 transition-all duration-500 overflow-hidden">
                                {/* Animated background gradient */}
                                <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100" initial={false} variants={{
                              hover: {
                                opacity: 1
                              }
                            }} transition={{
                              duration: 0.3
                            }} />

                                <CardContent className="relative p-8 text-center h-full flex flex-col">
                                  {/* Floating icon */}
                                  <motion.div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${path.color} flex items-center justify-center mx-auto mb-6 shadow-2xl`} variants={{
                                hover: {
                                  rotateY: 360,
                                  scale: 1.1
                                }
                              }} transition={{
                                duration: 0.6
                              }}>
                                    <IconComponent className="w-10 h-10 text-white" />
                                  </motion.div>

                                  <h3 className="text-2xl font-bold text-white mb-3 font-['Montserrat']">
                                    {path.title}
                                  </h3>
                                  <p className="text-accent mb-4 font-['Montserrat'] font-semibold text-lg">
                                    {path.subtitle}
                                  </p>
                                  <p className="text-white/70 font-['Montserrat'] flex-grow">
                                    {path.description}
                                  </p>

                                  {/* Hover arrow */}
                                  <motion.div className="mt-6" variants={{
                                hover: {
                                  x: 5
                                }
                              }}>
                                    <ArrowRight className="w-6 h-6 text-accent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  </motion.div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          </Link>
                        </motion.div>;
                  })}
                  </motion.div>

                  {/* Revolutionary CTA Section */}
                  <motion.div initial={{
                  opacity: 0,
                  scale: 0.8
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  duration: 1,
                  delay: 9
                }} className="space-y-8">
                    {/* Primary CTA with 3D effect */}
                    <motion.div whileHover={{
                    scale: 1.05,
                    rotateX: 5
                  }} whileTap={{
                    scale: 0.95
                  }} style={{
                    transformStyle: 'preserve-3d'
                  }}>
                      <Link to="/adluma">
                        <motion.div className="relative group" animate={{
                        rotateY: [0, 1, -1, 0]
                      }} transition={{
                        duration: 8,
                        repeat: Infinity
                      }}>
                          {/* 3D shadow */}
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-60" animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.6, 0.8, 0.6]
                        }} transition={{
                          duration: 3,
                          repeat: Infinity
                        }} style={{
                          transform: 'translateZ(-20px)'
                        }} />

                          <Button size="lg" className="relative bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-black px-16 py-8 text-2xl rounded-3xl transition-all duration-500 shadow-2xl border-2 border-white/20 font-['Montserrat'] group overflow-hidden">
                            {/* Animated background */}
                            <motion.div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100" initial={false} transition={{
                            duration: 0.3
                          }} />

                            <motion.div className="relative flex items-center gap-4" animate={{
                            x: [0, 2, 0]
                          }} transition={{
                            duration: 2,
                            repeat: Infinity
                          }}>
                              <motion.div animate={{
                              rotate: [0, 360]
                            }} transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}>
                                <Sparkles className="w-8 h-8" />
                              </motion.div>
                              <span>🚀 {t('home.hero.primaryCTA')}</span>
                              <motion.div animate={{
                              x: [0, 5, 0]
                            }} transition={{
                              duration: 1.5,
                              repeat: Infinity
                            }}>
                                <ArrowRight className="w-8 h-8" />
                              </motion.div>
                            </motion.div>
                          </Button>
                        </motion.div>
                      </Link>
                    </motion.div>

                    {/* Spectacular Promotion Button */}
                    <motion.div className="relative group cursor-pointer" whileHover={{
                    scale: 1.05,
                    rotateX: 5
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={() => {
                    const promoEvent = new CustomEvent('openPromotionPopup');
                    window.dispatchEvent(promoEvent);
                  }} style={{
                    transformStyle: 'preserve-3d'
                  }}>
                      {/* Galactic background effects */}
                      <motion.div className="absolute -inset-6 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-2xl opacity-70" animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }} transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }} style={{
                      transform: 'translateZ(-30px)'
                    }} />

                      {/* Main button container */}
                      <motion.div className="relative bg-gradient-to-r from-primary to-accent p-1 rounded-3xl" animate={{
                      boxShadow: ['0 0 30px rgba(142, 68, 255, 0.6)', '0 0 60px rgba(255, 213, 107, 0.8)', '0 0 30px rgba(142, 68, 255, 0.6)']
                    }} transition={{
                      duration: 3,
                      repeat: Infinity
                    }}>
                        <div className="bg-background/90 backdrop-blur-xl rounded-[22px] px-10 py-8 flex items-center gap-6">
                          {/* Animated icon */}
                          <motion.div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-2xl" animate={{
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }} transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}>
                            <Sparkles className="w-8 h-8 text-white" />
                          </motion.div>

                          {/* Enhanced text */}
                          <div className="text-left">
                            <motion.h3 className="text-3xl font-black text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text font-['Montserrat']" animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                          }} transition={{
                            duration: 3,
                            repeat: Infinity
                          }} style={{
                            backgroundSize: '200% 100%'
                          }}>
                              {t('home.promotion.title')}
                            </motion.h3>
                            <p className="text-white/80 text-xl font-semibold font-['Montserrat']">
                              {t('home.promotion.subtitle')}
                            </p>
                          </div>

                          {/* Animated arrow */}
                          <motion.div animate={{
                          x: [0, 10, 0],
                          rotate: [0, 5, -5, 0]
                        }} transition={{
                          duration: 2,
                          repeat: Infinity
                        }}>
                            <Zap className="w-10 h-10 text-accent" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Scroll indicator with enhanced design */}
                  <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" animate={{
                  y: [0, 15, 0],
                  opacity: [0.6, 1, 0.6]
                }} transition={{
                  duration: 2,
                  repeat: Infinity
                }}>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-white/60 text-sm font-['Montserrat']">Découvrir</span>
                      <motion.div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center" animate={{
                      borderColor: ['rgba(255,255,255,0.3)', 'rgba(142,68,255,0.8)', 'rgba(255,255,255,0.3)']
                    }} transition={{
                      duration: 3,
                      repeat: Infinity
                    }}>
                        <motion.div className="w-1 h-3 bg-white/60 rounded-full mt-2" animate={{
                        y: [0, 8, 0]
                      }} transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* Interface Client Intégrée */}
            <ClientInterface />

            {/* Section Wow Moment */}
            <motion.section className="py-32 px-6 relative z-10" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 1
          }}>
              <div className="max-w-6xl mx-auto">
                <motion.div className="text-center mb-20" initial={{
                y: 50,
                opacity: 0
              }} whileInView={{
                y: 0,
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8
              }}>
                  <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 font-['Montserrat'] leading-tight">
                    {t('home.wonder.question') || "Et si votre agence savait"} <br />
                    <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">
                      {t('home.wonder.what') || "exactement ce que pense Google ?"}
                    </span>
                  </h2>
                  <p className="text-2xl text-white/80 max-w-4xl mx-auto font-['Montserrat'] mb-12">
                    {t('home.wonder.answer') || "Nous sommes une agence qui pense comme une IA."}
                  </p>
                  
                  {/* Timeline of client transformation */}
                  <motion.div className="bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10 rounded-3xl p-12 border border-[#8E44FF]/30 backdrop-blur-xl" initial={{
                  scale: 0.9,
                  opacity: 0
                }} whileInView={{
                  scale: 1,
                  opacity: 1
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.8,
                  delay: 0.2
                }}>
                    <h3 className="text-3xl font-bold text-white mb-8 font-['Montserrat']">
                      🚀 {t('home.transformation.title') || "La transformation d'un client en 30 jours"}
                    </h3>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                      {[{
                      day: t('home.transformation.steps.day1.day') || "Jour 1",
                      action: t('home.transformation.steps.day1.action') || "Diagnostic ADLUMA™",
                      result: t('home.transformation.steps.day1.result') || "Analyse complète",
                      icon: Search
                    }, {
                      day: t('home.transformation.steps.day7.day') || "Jour 7",
                      action: t('home.transformation.steps.day7.action') || "Déploiement ILA™",
                      result: t('home.transformation.steps.day7.result') || "Score +40%",
                      icon: TrendingUp
                    }, {
                      day: t('home.transformation.steps.day15.day') || "Jour 15",
                      action: t('home.transformation.steps.day15.action') || "Activation ILUMATCH™",
                      result: t('home.transformation.steps.day15.result') || "5 partenaires",
                      icon: Users
                    }, {
                      day: t('home.transformation.steps.day30.day') || "Jour 30",
                      action: t('home.transformation.steps.day30.action') || "Résultats mesurés",
                      result: t('home.transformation.steps.day30.result') || "+410% visibilité",
                      icon: Award
                    }].map((step, index) => {
                      const IconComponent = step.icon;
                      return <motion.div key={index} initial={{
                        y: 30,
                        opacity: 0
                      }} whileInView={{
                        y: 0,
                        opacity: 1
                      }} viewport={{
                        once: true
                      }} transition={{
                        duration: 0.6,
                        delay: index * 0.1
                      }} className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center mx-auto mb-4">
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-[#FFD56B] font-bold font-['Montserrat'] mb-2">{step.day}</h4>
                            <p className="text-white font-['Montserrat'] text-sm mb-1">{step.action}</p>
                            <p className="text-[#8E44FF] font-bold font-['Montserrat'] text-lg">{step.result}</p>
                          </motion.div>;
                    })}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section className="py-20 px-6 relative z-10" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 1
          }}>
              <div className="max-w-4xl mx-auto">
                <motion.div className="text-center mb-16" initial={{
                y: 50,
                opacity: 0
              }} whileInView={{
                y: 0,
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8
              }}>
                  <HelpCircle className="w-12 h-12 text-[#FFD56B] mx-auto mb-4" />
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
                    Questions <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">Fréquentes</span>
                  </h2>
                  <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
                    Toutes les réponses à vos questions sur Iluma™
                  </p>
                </motion.div>

                <motion.div initial={{
                y: 30,
                opacity: 0
              }} whileInView={{
                y: 0,
                opacity: 1
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: 0.2
              }}>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqData.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-6 data-[state=open]:border-[#8E44FF]/50 transition-all duration-300">
                        <AccordionTrigger className="text-left text-white hover:text-[#FFD56B] font-['Montserrat'] font-semibold text-lg py-6 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-white/80 font-['Montserrat'] pb-6 text-base leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>)}
                  </Accordion>
                </motion.div>
              </div>
            </motion.section>

            <Footer />
            <PopupLiloPromo />

          </TeamProvider>
        </MPEProvider>

        {/* SEO Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Iluma Marketing",
          "url": "https://ilumamarketing.com",
          "logo": "https://ilumamarketing.com/logo.png",
          "description": "Spécialistes en IA marketing et visibilité locale. Notre écosystème de 9 modules propriétaires transforme votre présence digitale avec des résultats garantis.",
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CA",
            "addressRegion": "QC"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-514-882-8910",
            "contactType": "customer service",
            "availableLanguage": ["French", "English", "Spanish"]
          },
          "sameAs": ["https://linkedin.com/company/ilumamarketing"]
        })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Écosystème Iluma™ - 9 Modules IA Marketing",
          "description": "Suite complète de modules IA pour transformer votre visibilité : ADLUMA™, ILA™, ILUMATCH™, LILO™, BlogIA™ et plus.",
          "url": "https://ilumamarketing.com",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CAD",
            "description": "Diagnostic gratuit avec Lilo inclus"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127"
          },
          "featureList": ["ADLUMA™ - Simulateur IA de visibilité", "ILA™ - Indice Local d'Attraction", "ILUMATCH™ - Réseau d'inter-visibilité", "LILO™ - Assistant IA galactique", "BlogIA™ - Contenu SEO automatisé", "Landing Pages intelligentes", "CRM Iluma avancé", "HUB™ centralisé", "Pages de Fidélisation Diamant"]
        })}
        </script>
      </div>
    </>;
};
export default Index;