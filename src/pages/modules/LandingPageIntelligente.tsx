import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Zap, Target, BarChart3, Sparkles, Play, Settings, TrendingUp, Users, Clock, ArrowRight, ExternalLink, Brain, CheckCircle, Rocket, Star, Shield, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SEOManager from '@/components/seo/SEOManager';
import DynamicSEO from '@/components/seo/DynamicSEO';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';
import { useTranslations } from '@/hooks/useTranslations';

const LandingPageIntelligente = () => {
  const [builderStep, setBuilderStep] = useState(1);
  const [activeDemo, setActiveDemo] = useState('preview');
  const { t } = useTranslations();

  const features = [
    {
      icon: Brain,
      title: 'IA Adaptative Avancée',
      description: 'Intelligence artificielle qui personnalise le contenu en temps réel selon le profil visiteur'
    },
    {
      icon: Target,
      title: 'Tests A/B Précis',
      description: 'Optimisation continue basée sur des données de performance en temps réel'
    },
    {
      icon: Users,
      title: 'UX Optimisée',
      description: 'Interface utilisateur conçue pour maximiser les conversions et l\'engagement'
    },
    {
      icon: TrendingUp,
      title: 'Conversion Maximale',
      description: 'Chaque élément est optimisé pour transformer vos visiteurs en clients'
    }
  ];

  const builderSteps = [
    t('landingPageIntelligente.builder.step1'),
    t('landingPageIntelligente.builder.step2'),
    t('landingPageIntelligente.builder.step3'),
    t('landingPageIntelligente.builder.step4')
  ];

  const nextStep = () => {
    if (builderStep < 4) {
      setBuilderStep(builderStep + 1);
    }
  };

  const seoData = {
    title: "Landing Page Intelligente IA | Site Web Complet Optimisé - Iluma™",
    description: "Découvrez comment créer une landing page intelligente avec l'IA d'Iluma™. Conversion optimisée, SEO avancé, interface adaptative. Site web complet et optimisé.",
    keywords: "landing page intelligente, IA conversion, site web complet, optimisation SEO, page d'atterrissage, marketing digital, Iluma, intelligence artificielle",
    image: "https://ilumamarketing.com/images/landing-page-ia-iluma.jpg",
    canonical: "https://ilumamarketing.com/landing-page-intelligente"
  };

  return (
    <>
      <PerformanceOptimizer />
      <DynamicSEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.image}
        canonical={seoData.canonical}
      />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
        
        {/* Hero Section SEO Optimisé */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <span className="text-violet-300 font-medium text-lg tracking-wider">{t('landingPageIntelligente.hero.badge')}</span>
              </div>
              
               <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {t('landingPageIntelligente.hero.title1')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  {t('landingPageIntelligente.hero.title2')}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                {t('landingPageIntelligente.hero.subtitle')}
              </p>
              
              {/* Stats rapides */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                <div className="glass-effect border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">+300%</div>
                  <div className="text-white/80">{t('landingPageIntelligente.stats.conversion')}</div>
                </div>
                <div className="glass-effect border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-violet-400 mb-2">48h</div>
                  <div className="text-white/80">{t('landingPageIntelligente.stats.delivery')}</div>
                </div>
                <div className="glass-effect border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
                  <div className="text-white/80">{t('landingPageIntelligente.stats.mobile')}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-10 py-6 text-xl font-bold shadow-2xl shadow-violet-500/25"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  {t('landingPageIntelligente.cta.demo')}
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-violet-400/50 text-white hover:bg-violet-500/10 px-10 py-6 text-xl font-bold"
                >
                  <Brain className="w-6 h-6 mr-3" />
                  {t('landingPageIntelligente.cta.create')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Fonctionnalités Complètes */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                {t('landingPageIntelligente.features.title')}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
                {t('landingPageIntelligente.features.subtitle')}
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Brain,
                    title: "IA Adaptative",
                    description: "Contenu qui s'adapte à chaque visiteur en temps réel",
                    gradient: "from-violet-500 to-purple-600"
                  },
                  {
                    icon: Target,
                    title: "SEO Avancé", 
                    description: "Optimisation complète pour Google et moteurs de recherche",
                    gradient: "from-blue-500 to-cyan-600"
                  },
                  {
                    icon: Users,
                    title: "CRM Intégré",
                    description: "Gestion automatique des leads et suivi client",
                    gradient: "from-green-500 to-emerald-600"
                  },
                  {
                    icon: TrendingUp,
                    title: "Analytics Pro",
                    description: "Tableaux de bord temps réel et rapports avancés",
                    gradient: "from-orange-500 to-red-600"
                  },
                  {
                    icon: Shield,
                    title: "Sécurité RGPD",
                    description: "Conformité légale et protection des données",
                    gradient: "from-indigo-500 to-blue-600"
                  },
                  {
                    icon: Globe,
                    title: "Multilingue",
                    description: "Support FR/EN/ES avec adaptation culturelle",
                    gradient: "from-pink-500 to-rose-600"
                  },
                  {
                    icon: Rocket,
                    title: "Performance",
                    description: "Chargement ultra-rapide et optimisation mobile",
                    gradient: "from-yellow-500 to-orange-600"
                  },
                  {
                    icon: Star,
                    title: "Support 24/7",
                    description: "Équipe dédiée et maintenance continue",
                    gradient: "from-purple-500 to-violet-600"
                  }
                ].map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="glass-effect border-white/20 p-8 text-center h-full hover:border-violet-400/50 transition-all duration-300 group">
                        <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {feature.description}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Processus Complet */}
        <section className="py-20 px-4 bg-gradient-to-b from-purple-900/10 to-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Processus <span className="text-violet-400">Iluma™</span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
                De l'analyse à la mise en ligne, nous gérons tout pour vous
              </p>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Analyse & Stratégie",
                      description: "Audit complet de votre marché et définition de la stratégie digitale optimale",
                      color: "violet"
                    },
                    {
                      step: "02", 
                      title: "Design & Développement",
                      description: "Création de votre site avec IA intégrée, responsive et optimisé SEO",
                      color: "blue"
                    },
                    {
                      step: "03",
                      title: "Intégration & Tests",
                      description: "Configuration CRM, analytics et tests complets de performance",
                      color: "green"
                    },
                    {
                      step: "04",
                      title: "Lancement & Suivi",
                      description: "Mise en ligne, formation équipe et monitoring continu des résultats",
                      color: "orange"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-black text-xl">{item.step}</span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-white/70 leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center">
                  <Card className="glass-effect border-violet-400/30 p-10 w-full max-w-md">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Rocket className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Prêt à décoller ?
                      </h3>
                      <p className="text-white/70 mb-8 leading-relaxed">
                        Obtenez votre site web complet et optimisé en moins de 48h
                      </p>
                      <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 py-4 text-lg font-bold">
                        Démarrer maintenant
                      </Button>
                      <p className="text-sm text-white/50 mt-4">
                        Consultation gratuite incluse
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Smart Builder */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-['Montserrat']">
                Créer Votre Landing Page IA
              </h2>
              <Card className="glass-effect border-white/20 p-8">
                <div className="flex items-center justify-between mb-8">
                  {builderSteps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === builderStep;
                    const isCompleted = stepNumber < builderStep;
                    
                    return (
                      <div key={step} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCompleted ? 'bg-green-500 border-green-500' :
                          isActive ? 'bg-yellow-500 border-yellow-500' :
                          'bg-black/40 border-white/20'
                        }`}>
                          <span className="text-white font-bold font-['Montserrat']">{stepNumber}</span>
                        </div>
                        <span className={`text-sm mt-2 text-center font-['Montserrat'] ${isActive ? 'text-white' : 'text-white/60'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Progress value={(builderStep / 4) * 100} className="mb-6" />
                <div className="text-center">
                  <Button 
                    onClick={nextStep}
                    disabled={builderStep >= 4}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 font-['Montserrat']"
                  >
                    {builderStep < 4 ? (
                      <>
                        Étape suivante
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      'Processus terminé'
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-black to-purple-900/10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center font-['Montserrat']">
                FAQ - Questions Fréquentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    question: "Combien de temps pour créer ma landing page ?",
                    answer: "Votre landing page complète est livrée en 48h maximum. Cela inclut le design, l'intégration IA, le SEO et la configuration CRM."
                  },
                  {
                    question: "Qu'est-ce qui est inclus dans l'offre ?",
                    answer: "Tout est inclus : design personnalisé, IA comportementale, SEO avancé, CRM intégré, analytics, support 6 mois et formation équipe."
                  },
                  {
                    question: "Comment fonctionne l'IA comportementale ?",
                    answer: "Notre IA analyse le comportement de chaque visiteur en temps réel et adapte le contenu pour maximiser les conversions selon leur profil."
                  },
                  {
                    question: "Y a-t-il une garantie de résultats ?",
                    answer: "Oui, nous garantissons une amélioration de vos conversions ou nous vous remboursons. Notre taux de satisfaction client est de 98%."
                  }
                ].map((faq: any, index: number) => (
                  <Card key={index} className="glass-effect border-white/20 p-6">
                    <h3 className="text-lg font-bold text-white mb-3 font-['Montserrat']">
                      {faq.question}
                    </h3>
                    <p className="text-white/80 font-['Montserrat']">
                      {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Final Premium */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl p-12 border border-violet-400/30">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
                
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
                    <span className="text-violet-300 text-sm font-medium tracking-widest uppercase">
                      Solution Premium
                    </span>
                    <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                    Votre Site Web Complet
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                      Prêt en 48h
                    </span>
                  </h3>
                  
                  <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Landing page + SEO + CRM + IA + Analytics + Support. 
                    <br />
                    <strong className="text-violet-300">Tout inclus, optimisation garantie.</strong>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-black shadow-2xl shadow-violet-500/25 hover:scale-105 transition-all duration-300"
                    >
                      <Rocket className="w-6 h-6 mr-3" />
                      Commencer maintenant
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                    
                    <div className="text-center">
                      <div className="text-2xl font-black text-white mb-1">Consultation gratuite</div>
                      <div className="text-sm text-white/60">Découvrez votre potentiel</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-8 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Livraison 48h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Support illimité</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Garantie résultats</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LandingPageIntelligente;