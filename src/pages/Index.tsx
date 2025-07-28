import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
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
const Index = () => {
  const {
    t,
    language
  } = useLanguage();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [liloMood, setLiloMood] = useState('curious');
  const [currentStory, setCurrentStory] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const {
    scrollY
  } = useScroll();

  // Parallax effects avec scroll storytelling
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
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
    title: t('home.paths.discovery.title') || 'Exploration Guidée',
    subtitle: t('home.paths.discovery.subtitle') || 'Je découvre Iluma™',
    description: t('home.paths.discovery.description') || 'Parcours scénarisé étape par étape, Lilo actif, pédagogie FAC',
    icon: Brain,
    color: 'from-cyan-500 to-blue-500',
    path: '/methode-iluma',
    persona: 'curious'
  }, {
    id: 'objectives',
    title: t('home.paths.objectives.title') || 'Choix Précis',
    subtitle: t('home.paths.objectives.subtitle') || 'J\'ai un projet spécifique',
    description: t('home.paths.objectives.description') || 'Accès direct à tous les modules intelligents Iluma™',
    icon: Target,
    color: 'from-purple-500 to-pink-500',
    path: '/modules',
    persona: 'focused'
  }, {
    id: 'exploration',
    title: t('home.paths.exploration.title') || 'Visite Libre',
    subtitle: t('home.paths.exploration.subtitle') || 'Je veux tout explorer',
    description: t('home.paths.exploration.description') || 'Navigation libre dans tous les outils et services (filtrables + IA)',
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

  // FAQ data for SGE optimization (Rand Fishkin approach)
  const faqData = [
    {
      question: t('home.faq.items.0.question') || "Et si votre agence savait exactement ce que pense Google ?",
      answer: t('home.faq.items.0.answer') || "C'est exactement ce que fait Iluma™. Notre IA analyse en temps réel les algorithmes Google et adapte votre stratégie pour maximiser votre visibilité locale."
    },
    {
      question: t('home.faq.items.1.question') || "Comment Iluma™ garantit-elle des résultats mesurables ?",
      answer: t('home.faq.items.1.answer') || "Grâce à notre écosystème de 9 modules IA interconnectés : ADLUMA™ prédit, ILA™ mesure, ILUMATCH™ connecte, et LILO™ optimise continuellement vos performances."
    },
    {
      question: t('home.faq.items.2.question') || "En quoi Iluma™ diffère-t-elle d'une agence traditionnelle ?",
      answer: t('home.faq.items.2.answer') || "Nous sommes une agence qui pense comme une IA. Chaque décision est basée sur des données en temps réel, chaque action est optimisée par l'intelligence artificielle."
    },
    {
      question: t('home.faq.items.3.question') || "Puis-je voir des résultats avant d'investir ?",
      answer: t('home.faq.items.3.answer') || "Absolument ! Notre simulateur ADLUMA™ vous montre vos résultats projetés gratuitement. Aucun engagement, juste de la transparence."
    }
  ];
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
              opacity: [0.2, 0.4, 0.2],
              x: mousePosition.x * 50,
              y: mousePosition.y * 30
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

            {/* Hero Section with Lilo Welcome */}
            <motion.section className="relative min-h-screen flex items-center justify-center px-6" style={{
            scale: heroScale,
            opacity: heroOpacity
          }}>
              <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div initial={{
                opacity: 0,
                y: 50
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 1
              }}>
                  {/* Lilo AI Greeting */}
                  <motion.div className="mb-8 flex items-center justify-center gap-4" initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100
                }}>
                    
                    
                  </motion.div>

                  {/* Main Title */}
                  <motion.h1 className="text-6xl md:text-8xl font-extrabold font-['Montserrat'] mb-6" initial={{
                  y: 50,
                  opacity: 0
                }} animate={{
                  y: 0,
                  opacity: 1
                }} transition={{
                  duration: 1,
                  delay: 0.2
                }}>
                    <motion.span className="block bg-gradient-to-r from-[#8E44FF] via-[#FFD56B] to-[#8E44FF] bg-clip-text text-transparent bg-[length:200%_100%]" animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }} transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}>
                      {t('home.hero.title') || "Iluma™"}
                    </motion.span>
                    <span className="block text-white/90 text-4xl md:text-6xl mt-4">
                      {t('home.hero.subtitle') || "L'IA qui ILLUMINE"}
                    </span>
                    <span className="block text-white/90 text-4xl md:text-6xl">
                      {t('home.hero.subtitle2') || "votre visibilité"}
                    </span>
                  </motion.h1>

                  {/* Enhanced Description */}
                  <motion.p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed font-['Montserrat']" initial={{
                  y: 30,
                  opacity: 0
                }} animate={{
                  y: 0,
                  opacity: 1
                }} transition={{
                  duration: 0.8,
                  delay: 0.4
                }}>
                    {t('home.hero.description') || "Être visible au bon moment, au bon endroit. Notre écosystème IA complet génère des résultats mesurables pour votre entreprise."}
                  </motion.p>

                  {/* Interactive Path Selection */}
                  <motion.div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12" initial={{
                  y: 30,
                  opacity: 0
                }} animate={{
                  y: 0,
                  opacity: 1
                }} transition={{
                  duration: 0.8,
                  delay: 0.6
                }}>
                    {userPaths.map((path, index) => {
                    const IconComponent = path.icon;
                    return <motion.div key={path.id} whileHover={{
                      scale: 1.05,
                      y: -10
                    }} whileTap={{
                      scale: 0.95
                    }} initial={{
                      y: 50,
                      opacity: 0
                    }} animate={{
                      y: 0,
                      opacity: 1
                    }} transition={{
                      delay: 0.2 * index
                    }}>
                          <Link to={path.path}>
                            <Card className="h-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#8E44FF]/50 transition-all duration-500 cursor-pointer group">
                              <CardContent className="p-6 text-center">
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                  <IconComponent className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                                  {path.title}
                                </h3>
                                <p className="text-[#FFD56B] mb-3 font-['Montserrat'] font-semibold">
                                  {path.subtitle}
                                </p>
                                <p className="text-white/70 text-sm font-['Montserrat']">
                                  {path.description}
                                </p>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>;
                  })}
                  </motion.div>

                  {/* Main CTA */}
                  <motion.div initial={{
                  y: 30,
                  opacity: 0
                }} animate={{
                  y: 0,
                  opacity: 1
                }} transition={{
                  duration: 0.8,
                  delay: 0.8
                }} className="mb-16 space-y-6">
                    <Link to="/adluma">
                      <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-black px-12 py-6 text-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#8E44FF]/30 font-['Montserrat'] group">
                        <Sparkles className="w-6 h-6 mr-3 group-hover:animate-spin" />
                        🚀 {t('home.hero.primaryCTA') || 'Diagnostic Gratuit avec Lilo'}
                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                      </Button>
                    </Link>
                    
                    {/* Bouton Promotion Spectaculaire - Ouvre la popup */}
                    <motion.div className="relative group cursor-pointer" whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }} onClick={() => {
                    const promoEvent = new CustomEvent('openPromotionPopup');
                    window.dispatchEvent(promoEvent);
                  }}>
                      {/* Effets de fond galactique */}
                      <motion.div className="absolute -inset-4 bg-gradient-to-r from-[#8E44FF] via-[#FFD56B] to-[#8E44FF] rounded-2xl blur-xl opacity-60" animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }} transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }} />
                      
                      {/* Bouton principal */}
                      <motion.div className="relative bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] p-1 rounded-2xl" animate={{
                      boxShadow: ['0 0 30px rgba(142, 68, 255, 0.6)', '0 0 60px rgba(255, 213, 107, 0.8)', '0 0 30px rgba(142, 68, 255, 0.6)']
                    }} transition={{
                      duration: 3,
                      repeat: Infinity
                    }}>
                        <div className="bg-[#0A0A10] rounded-xl px-8 py-6 flex items-center gap-4">
                          {/* Icône animée */}
                          <motion.div className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center" animate={{
                          rotate: [0, 360]
                        }} transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}>
                            <Sparkles className="w-6 h-6 text-white" />
                          </motion.div>
                          
                          {/* Texte */}
                          <div className="text-left">
                            <motion.h3 className="text-2xl font-black text-transparent bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text" animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                          }} transition={{
                            duration: 3,
                            repeat: Infinity
                          }} style={{
                            backgroundSize: '200% 100%'
                          }}>
                              ⚡ OFFRE TRANSFORMATION TOTALE ⚡
                            </motion.h3>
                            <p className="text-white/80 text-lg font-semibold">
                              L'offre qui RÉVOLUTIONNE votre visibilité
                            </p>
                          </div>
                          
                          {/* Flèche animée */}
                          <motion.div animate={{
                          x: [0, 10, 0]
                        }} transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}>
                            <Zap className="w-8 h-8 text-[#FFD56B]" />
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      {/* Particules flottantes */}
                      {Array.from({
                      length: 6
                    }).map((_, i) => <motion.div key={i} className="absolute w-2 h-2 bg-[#FFD56B] rounded-full" style={{
                      top: '50%',
                      left: '50%'
                    }} animate={{
                      x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                      y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }} />)}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* Interface Client Intégrée */}
            <ClientInterface />

            {/* Section Présentation Complète - Nouveau */}
            <motion.section className="py-20 px-6 relative z-10" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 1
          }}>
              <div className="max-w-6xl mx-auto">
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
                  <motion.div className="mb-8 flex items-center justify-center gap-4" initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100
                }}>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center animate-pulse">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <motion.div className="bg-black/50 backdrop-blur-xl rounded-2xl p-3 border border-[#8E44FF]/30" animate={{
                    y: [0, -3, 0]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity
                  }}>
                      <p className="text-[#FFD56B] font-['Montserrat'] text-sm">
                        🤖 <strong>Lilo, votre guide IA</strong>, vous explique tout ce qu'on fait
                      </p>
                    </motion.div>
                  </motion.div>

                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
                    🤖 <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">{t('home.wonder.question') || "Et si votre agence savait exactement ce que pense Google ?"}</span><br />
                    <span className="text-3xl md:text-4xl text-white/90">{t('home.wonder.answer') || "Nous sommes une agence qui pense comme une IA."}</span>
                  </h2>
                  
                  <p className="text-xl text-white/80 max-w-4xl mx-auto font-['Montserrat'] mb-8">
                    {t('home.wonder.description') || "Iluma, c'est plus qu'une agence. C'est une méthode, des outils, des services IA et une mission : faire rayonner votre entreprise."}
                  </p>

                  {/* Liste des découvertes */}
                  <motion.div className="bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10 rounded-3xl p-8 border border-[#8E44FF]/30 backdrop-blur-xl mb-12" initial={{
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
                     <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                       🎯 {t('home.features.subtitle') || "Ce que vous allez découvrir"} :
                     </h3>
                     
                     <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
                       {[{
                       icon: Rocket,
                       text: t('home.features.items.tools') || "Nos outils IA (Landing Page Intelligente, Simulateur ADLUMA™, QRVISIBILITÉ™, etc.)"
                     }, {
                       icon: Brain,
                       text: t('home.features.items.services') || "Nos services stratégiques (SEO SGE, design UX, contenu IA, etc.)"
                     }, {
                       icon: Heart,
                       text: t('home.features.items.lilo') || "Le rôle de Lilo, notre IA émotionnelle"
                     }, {
                       icon: Target,
                       text: t('home.features.items.logic') || "La logique concrète derrière chaque action"
                     }].map((item, index) => {
                      const IconComponent = item.icon;
                      return <motion.div key={index} initial={{
                        x: -20,
                        opacity: 0
                      }} whileInView={{
                        x: 0,
                        opacity: 1
                      }} viewport={{
                        once: true
                      }} transition={{
                        duration: 0.6,
                        delay: index * 0.1
                      }} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                            <IconComponent className="w-6 h-6 text-[#FFD56B] flex-shrink-0 mt-1" />
                            <p className="text-white/90 font-['Montserrat']">{item.text}</p>
                          </motion.div>;
                    })}
                    </div>
                  </motion.div>

                  {/* CTA Principal avec animation */}
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
                  delay: 0.4
                }}>
                    <Link to="/presentation-outils">
                      <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-black px-12 py-6 text-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#8E44FF]/30 font-['Montserrat'] group">
                        <Eye className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                        📍 {t('home.features.exploreAll') || "Explorer tout ce qu'on fait (et pourquoi)"}
                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* Wow Moment Section - Nancy Duarte approach */}
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

            {/* How-To Section for SEO/SGE - Brian Dean approach */}
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
                   <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
                     {t('home.howTo.title') || "Comment fonctionne"} <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">Iluma™</span> ?
                   </h2>
                   <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
                     {t('home.howTo.subtitle') || "Votre parcours vers la visibilité maximale en 4 étapes"}
                   </p>
                </motion.div>

                 <div className="space-y-12">
                   {[{
                   step: t('home.howTo.steps.diagnostic.step') || "01",
                   title: t('home.howTo.steps.diagnostic.title') || "Diagnostic IA Gratuit",
                   description: t('home.howTo.steps.diagnostic.description') || "ADLUMA™ analyse votre visibilité actuelle et identifie vos opportunités",
                   action: t('home.howTo.steps.diagnostic.action') || "Obtenez votre score ILA™ en 2 minutes",
                   icon: Brain,
                   color: "from-cyan-500 to-blue-500"
                 }, {
                   step: t('home.howTo.steps.strategy.step') || "02",
                   title: t('home.howTo.steps.strategy.title') || "Stratégie Personnalisée",
                   description: t('home.howTo.steps.strategy.description') || "Notre IA crée un plan d'action sur mesure basé sur vos objectifs",
                   action: t('home.howTo.steps.strategy.action') || "Recevez votre roadmap détaillée",
                   icon: Target,
                   color: "from-purple-500 to-pink-500"
                 }, {
                   step: t('home.howTo.steps.deployment.step') || "03",
                   title: t('home.howTo.steps.deployment.title') || "Déploiement des Modules",
                   description: t('home.howTo.steps.deployment.description') || "Activation progressive de votre écosystème Iluma™",
                   action: t('home.howTo.steps.deployment.action') || "Modules actifs selon vos priorités",
                   icon: Rocket,
                   color: "from-orange-500 to-red-500"
                 }, {
                   step: t('home.howTo.steps.optimization.step') || "04",
                   title: t('home.howTo.steps.optimization.title') || "Optimisation Continue",
                   description: t('home.howTo.steps.optimization.description') || "LILO™ surveille et optimise vos performances 24/7",
                   action: t('home.howTo.steps.optimization.action') || "Croissance automatisée et mesurable",
                   icon: TrendingUp,
                   color: "from-green-500 to-emerald-500"
                 }].map((howTo, index) => {
                  const IconComponent = howTo.icon;
                  return <motion.div key={index} initial={{
                    x: index % 2 === 0 ? -50 : 50,
                    opacity: 0
                  }} whileInView={{
                    x: 0,
                    opacity: 1
                  }} viewport={{
                    once: true
                  }} transition={{
                    duration: 0.8,
                    delay: index * 0.2
                  }} className="flex items-center gap-8">
                        <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${howTo.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-[#FFD56B] font-bold text-2xl font-['Montserrat']">{howTo.step}</span>
                            <h3 className="text-2xl font-bold text-white font-['Montserrat']">{howTo.title}</h3>
                          </div>
                          <p className="text-white/80 font-['Montserrat'] mb-2">{howTo.description}</p>
                          <p className="text-[#8E44FF] font-semibold font-['Montserrat']">→ {howTo.action}</p>
                        </div>
                      </motion.div>;
                })}
                </div>
              </div>
            </motion.section>

            {/* FAQ Section - Rand Fishkin SGE approach */}
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
                     {t('home.faq.title') || "Questions"} <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">Fréquentes</span>
                   </h2>
                   <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
                     {t('home.faq.subtitle') || "Tout ce que vous devez savoir sur Iluma™"}
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

            {/* Results Section */}
            <motion.section className="py-20 px-6 relative z-10" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 1
          }}>
              <div className="max-w-6xl mx-auto">
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
                   <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
                     {t('home.results.title') || "Résultats"} <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">Garantis</span>
                   </h2>
                </motion.div>

                 <div className="grid md:grid-cols-4 gap-6">
                   {[{
                   value: t('home.results.stats.visitors.value') || "+410%",
                   label: t('home.results.stats.visitors.label') || "Visiteurs en 30 jours",
                   icon: TrendingUp
                 }, {
                   value: t('home.results.stats.reviews.value') || "+8",
                   label: t('home.results.stats.reviews.label') || "Avis Google générés",
                   icon: Star
                 }, {
                   value: t('home.results.stats.clicks.value') || "+260%",
                   label: t('home.results.stats.clicks.label') || "Clics Google Maps",
                   icon: Target
                 }, {
                   value: t('home.results.stats.followers.value') || "+140%",
                   label: t('home.results.stats.followers.label') || "Followers organiques",
                   icon: Users
                 }].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return <motion.div key={index} initial={{
                    y: 50,
                    opacity: 0
                  }} whileInView={{
                    y: 0,
                    opacity: 1
                  }} viewport={{
                    once: true
                  }} transition={{
                    duration: 0.6,
                    delay: index * 0.1
                  }} whileHover={{
                    scale: 1.05
                  }}>
                        <Card className="bg-gradient-to-br from-[#8E44FF]/20 to-[#FFD56B]/20 border border-[#8E44FF]/30 backdrop-blur-xl">
                          <CardContent className="p-6 text-center">
                            <IconComponent className="w-8 h-8 text-[#FFD56B] mx-auto mb-4" />
                            <div className="text-3xl font-bold text-[#FFD56B] mb-2 font-['Montserrat']">
                              {stat.value}
                            </div>
                            <div className="text-white/80 text-sm font-['Montserrat']">
                              {stat.label}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>;
                })}
                </div>
              </div>
            </motion.section>

            <Footer />


            {/* Popup Lilo Promo */}
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