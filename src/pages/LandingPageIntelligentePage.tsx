import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { useTranslations } from '@/hooks/useTranslations';
import { 
  Zap, Target, BarChart3, Sparkles, Play, Settings, TrendingUp, Users, Clock, 
  ArrowRight, ExternalLink, Brain, CheckCircle, Rocket, Star, Shield, Globe,
  Monitor, Smartphone, Tablet, Code, Database, Search, MessageSquare, 
  BarChart, Lock, Wifi, ChevronDown, ChevronUp
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SEOManager from '@/components/seo/SEOManager';
import DynamicSEO from '@/components/seo/DynamicSEO';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';

const LandingPageIntelligentePage = () => {
  const { t } = useTranslations();
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const seoData = {
    title: "Landing Page Intelligente IA Personnalisée | Site Web Complet Optimisé - Iluma™",
    description: "Créez votre landing page intelligente personnalisée avec l'IA d'Iluma™. Solution complète : Design, SEO, CRM, Analytics. Conversion garantie, livraison 48h.",
    keywords: "landing page personnalisée, IA conversion, site web sur mesure, optimisation SEO, page d'atterrissage intelligente, marketing digital, Iluma, intelligence artificielle, CRM intégré",
    image: "https://ilumamarketing.com/images/landing-page-ia-personnalisee.jpg",
    canonical: "https://ilumamarketing.com/landing-page-intelligente"
  };

  const features = [
    {
      icon: Brain,
      title: t('landingPageIntelligente.ai.title'),
      description: t('landingPageIntelligente.ai.subtitle'),
      details: [
        t('landingPageIntelligente.ai.features.personalization'),
        t('landingPageIntelligente.ai.features.scoring'),
        t('landingPageIntelligente.ai.features.recommendations')
      ],
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: Target,
      title: t('landingPageIntelligente.seo.title'), 
      description: t('landingPageIntelligente.seo.subtitle'),
      details: [
        t('landingPageIntelligente.seo.features.personalization'), 
        t('landingPageIntelligente.seo.features.scoring'), 
        t('landingPageIntelligente.seo.features.recommendations')
      ],
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      title: t('landingPageIntelligente.crm.title'), 
      description: t('landingPageIntelligente.crm.subtitle'),
      details: [
        t('landingPageIntelligente.crm.features.personalization'), 
        t('landingPageIntelligente.crm.features.scoring'), 
        t('landingPageIntelligente.crm.features.recommendations')
      ],
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: BarChart,
      title: t('landingPageIntelligente.analytics.title'), 
      description: t('landingPageIntelligente.analytics.subtitle'),
      details: [
        t('landingPageIntelligente.analytics.features.personalization'), 
        t('landingPageIntelligente.analytics.features.scoring'), 
        t('landingPageIntelligente.analytics.features.recommendations')
      ],
      gradient: "from-orange-500 to-red-600"
    }
  ];

  const plans = [
    {
      id: 'starter',
      name: t('landingPageIntelligente.packages.starter.title'),
      description: t('landingPageIntelligente.packages.starter.subtitle'),
      features: [
        t('landingPageIntelligente.packages.starter.feature1'),
        t('landingPageIntelligente.packages.starter.feature2'),
        t('landingPageIntelligente.packages.starter.feature3'),
        t('landingPageIntelligente.packages.starter.feature4'),
        t('landingPageIntelligente.packages.starter.feature5')
      ],
      gradient: 'from-blue-500 to-cyan-600',
      popular: false
    },
    {
      id: 'premium',
      name: t('landingPageIntelligente.packages.complete.title'),
      description: t('landingPageIntelligente.packages.complete.subtitle'),
      features: [
        t('landingPageIntelligente.packages.complete.feature1'),
        t('landingPageIntelligente.packages.complete.feature2'),
        t('landingPageIntelligente.packages.complete.feature3'),
        t('landingPageIntelligente.packages.complete.feature4'),
        t('landingPageIntelligente.packages.complete.feature5'),
        t('landingPageIntelligente.packages.complete.feature6'),
        t('landingPageIntelligente.packages.complete.feature7')
      ],
      gradient: 'from-violet-500 to-purple-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: t('landingPageIntelligente.packages.enterprise.title'),
      description: t('landingPageIntelligente.packages.enterprise.subtitle'),
      features: [
        t('landingPageIntelligente.packages.enterprise.feature1'),
        t('landingPageIntelligente.packages.enterprise.feature2'),
        t('landingPageIntelligente.packages.enterprise.feature3'),
        t('landingPageIntelligente.packages.enterprise.feature4'),
        t('landingPageIntelligente.packages.enterprise.feature5'),
        t('landingPageIntelligente.packages.enterprise.feature6')
      ],
      gradient: 'from-yellow-500 to-orange-600',
      popular: false
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: t('landingPageIntelligente.process.step1.title'),
      description: t('landingPageIntelligente.process.step1.description'),
      duration: t('landingPageIntelligente.process.duration1'),
      deliverables: ["Audit concurrentiel", "Personas définis", "Stratégie SEO", "Plan de conversion"]
    },
    {
      step: "02", 
      title: t('landingPageIntelligente.process.step2.title'),
      description: t('landingPageIntelligente.process.step2.description'),
      duration: t('landingPageIntelligente.process.duration2'),
      deliverables: ["Maquettes validées", "Développement responsive", "Intégration IA", "Tests complets"]
    },
    {
      step: "03",
      title: t('landingPageIntelligente.process.step3.title'),
      description: t('landingPageIntelligente.process.step3.description'),
      duration: t('landingPageIntelligente.process.duration3'),
      deliverables: ["CRM configuré", "Analytics connectés", "Tests A/B setup", "Monitoring actif"]
    },
    {
      step: "04",
      title: t('landingPageIntelligente.process.step4.title'),
      description: t('landingPageIntelligente.process.step4.description'),
      duration: t('landingPageIntelligente.process.duration4'),
      deliverables: ["Site en production", "Formation équipe", "Documentation", "Support continu"]
    }
  ];

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
        
        {/* Hero Section Premium */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-violet-300 font-medium text-sm tracking-wider uppercase">Landing Page Intelligente</div>
                  <div className="text-white/60 text-xs">Personnalisée & Optimisée IA</div>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t('landingPageIA.hero.title')}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                {t('landingPageIA.hero.subtitle')}
              </p>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="glass-effect border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-violet-400 mb-2">48h</div>
                  <div className="text-white/80 text-sm">{t('landingPageIA.hero.delivery')}</div>
                </div>
                <div className="glass-effect border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">+350%</div>
                  <div className="text-white/80 text-sm">{t('landingPageIA.hero.conversion')}</div>
                </div>
                <div className="glass-effect border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
                  <div className="text-white/80 text-sm">{t('landingPageIA.hero.responsive')}</div>
                </div>
                <div className="glass-effect border-white/20 rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-white/80 text-sm">{t('landingPageIA.hero.support')}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-10 py-6 text-xl font-bold shadow-2xl shadow-violet-500/25"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  {t('landingPageIA.hero.viewWork')}
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-violet-400/50 text-white hover:bg-violet-500/10 px-10 py-6 text-xl font-bold"
                >
                  <Brain className="w-6 h-6 mr-3" />
                  {t('landingPageIA.hero.consultation')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Fonctionnalités Interactives */}
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
                {t('landingPageIA.technologies.title')}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
                {t('landingPageIA.technologies.subtitle')}
              </p>
              
              <Tabs value={features[activeFeature].title} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-black/50">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <TabsTrigger 
                        key={index}
                        value={feature.title}
                        onClick={() => setActiveFeature(index)}
                        className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-violet-600/20 data-[state=active]:text-violet-400"
                      >
                        <IconComponent className="w-6 h-6" />
                        <span className="text-sm font-medium">{feature.title.split(' ')[0]}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <TabsContent key={index} value={feature.title} className="mt-8">
                      <Card className="glass-effect border-violet-400/30 p-8">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                          <div className="text-left">
                            <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-white/70 text-lg mb-6">{feature.description}</p>
                            <ul className="space-y-3">
                              {feature.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-white/80">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className={`w-64 h-64 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center relative overflow-hidden`}>
                              <IconComponent className="w-32 h-32 text-white/20" />
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* Section Processus Détaillé */}
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
                {t('landingPageIA.process.title')}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
                {t('landingPageIA.process.subtitle')}
              </p>
              
              <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                {processSteps.map((step, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`step-${index}`}
                    className="border-violet-400/20 mb-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-6 w-full text-left">
                        <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-black text-xl">{step.step}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                          <p className="text-white/60 text-sm">Durée: {step.duration}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-22 p-6 bg-violet-500/5 rounded-xl border border-violet-400/20">
                        <p className="text-white/80 mb-4">{step.description}</p>
                        <div>
                          <h4 className="text-white font-semibold mb-3">Livrables :</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {step.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-white/70">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Section Tarifs Transparents */}
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
                {t('landingPageIA.packages.title')}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
                {t('landingPageIA.packages.subtitle')}
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative ${plan.popular ? 'scale-105' : ''}`}
                  >
                    {/* {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                        {t('landingPageIntelligente.packages.popular')}
                      </div>
                    )} */}
                    
                    <Card className={`glass-effect border-violet-400/30 p-8 h-full ${plan.popular ? 'border-violet-400/50' : ''}`}>
                      <div className="text-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                          <Star className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                      </div>
                      
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-white/80">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full py-3 ${plan.popular ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700' : 'bg-white/10 hover:bg-white/20'} text-white font-bold`}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        {plan.id === 'enterprise' ? t('landingPageIntelligente.packages.enterprise.cta') : t('landingPageIntelligente.packages.starter.cta')}
                      </Button>
                    </Card>
                  </motion.div>
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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
                
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
                    <span className="text-violet-300 text-sm font-medium tracking-widest uppercase">
                      {t('landingPageIA.cta.title')}
                    </span>
                    <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                    {t('landingPageIA.cta.subtitle')}
                  </h3>
                  
                  <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Livraison garantie 48h · Support illimité · Formation incluse · Résultats mesurables
                    <br />
                    <strong className="text-violet-300">{t('landingPageIA.cta.guarantee')}</strong>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-black shadow-2xl shadow-violet-500/25 hover:scale-105 transition-all duration-300"
                    >
                      <Rocket className="w-6 h-6 mr-3" />
                      {t('landingPageIA.cta.startProject')}
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{t('landingPageIA.cta.check1')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{t('landingPageIA.cta.check2')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{t('landingPageIA.cta.check3')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{t('landingPageIA.cta.check4')}</span>
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

export default LandingPageIntelligentePage;