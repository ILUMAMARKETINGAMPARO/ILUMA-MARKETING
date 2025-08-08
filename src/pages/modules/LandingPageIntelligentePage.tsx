import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { useTranslations } from '@/hooks/useTranslations';
import SEOManager from '@/components/seo/SEOManager';
import { SEOEngine } from '@/utils/seoEngine';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Target, 
  BarChart3, 
  Brain, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Shield,
  Smartphone,
  Monitor,
  Palette,
  MousePointer,
  TrendingUp,
  Eye,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPageIntelligentePage = () => {
  const { t } = useTranslations();
  const [activeDemo, setActiveDemo] = useState('conversion');
  
  const seoData = SEOEngine.generatePageSEO('service', { 
    serviceName: 'Landing Pages Intelligentes IA', 
    benefit: 'augmenter vos conversions de 340% avec nos pages de destination optimisées par intelligence artificielle' 
  });

  const features = [
    {
      icon: Brain,
      title: t('landingPage.features.aiOptimization.title') || 'Optimisation IA Continue',
      description: t('landingPage.features.aiOptimization.description') || 'Intelligence artificielle qui apprend et améliore vos conversions en temps réel',
      color: 'text-purple-400'
    },
    {
      icon: Target,
      title: t('landingPage.features.targeting.title') || 'Ciblage Ultra-Précis',
      description: t('landingPage.features.targeting.description') || 'Pages personnalisées selon le profil et le comportement de chaque visiteur',
      color: 'text-blue-400'
    },
    {
      icon: BarChart3,
      title: t('landingPage.features.analytics.title') || 'Analytics Prédictifs',
      description: t('landingPage.features.analytics.description') || 'Prédictions précises des performances et recommandations d\'optimisation automatiques',
      color: 'text-green-400'
    },
    {
      icon: Smartphone,
      title: t('landingPage.features.responsive.title') || 'Mobile-First IA',
      description: t('landingPage.features.responsive.description') || 'Interface adaptative qui s\'optimise automatiquement pour chaque appareil',
      color: 'text-yellow-400'
    }
  ];

  const packages = [
    {
      name: t('landingPage.packages.starter.name') || 'Landing IA Starter',
      price: t('common.quoteOnly') || 'Sur devis',
      duration: '',
      description: t('landingPage.packages.starter.description') || 'Parfait pour débuter avec les conversions IA',
      features: [
        t('landingPage.packages.starter.features.0') || '1 Landing Page IA',
        t('landingPage.packages.starter.features.1') || 'Optimisation conversion',
        t('landingPage.packages.starter.features.2') || 'Analytics de base',
        t('landingPage.packages.starter.features.3') || 'Tests A/B automatiques',
        t('landingPage.packages.starter.features.4') || 'Support 30 jours'
      ],
      cta: t('landingPage.packages.starter.cta') || 'Commencer',
      popular: false
    },
    {
      name: t('landingPage.packages.pro.name') || 'Landing IA Pro',
      price: t('common.quoteOnly') || 'Sur devis',
      duration: '',
      description: t('landingPage.packages.pro.description') || 'Solution complète pour entreprises ambitieuses',
      features: [
        t('landingPage.packages.pro.features.0') || '3 Landing Pages IA',
        t('landingPage.packages.pro.features.1') || 'Personnalisation avancée',
        t('landingPage.packages.pro.features.2') || 'Analytics prédictifs',
        t('landingPage.packages.pro.features.3') || 'CRM intégré',
        t('landingPage.packages.pro.features.4') || 'Formation incluse',
        t('landingPage.packages.pro.features.5') || 'Support 90 jours',
        t('landingPage.packages.pro.features.6') || 'Optimisation continue'
      ],
      cta: t('landingPage.packages.pro.cta') || 'Choisir Pro',
      popular: true
    },
    {
      name: t('landingPage.packages.enterprise.name') || 'Landing IA Enterprise',
      price: t('common.quoteOnly') || 'Sur devis',
      duration: '',
      description: t('landingPage.packages.enterprise.description') || 'Solution sur-mesure pour grandes entreprises',
      features: [
        t('landingPage.packages.enterprise.features.0') || 'Landing Pages illimitées',
        t('landingPage.packages.enterprise.features.1') || 'IA propriétaire intégrée',
        t('landingPage.packages.enterprise.features.2') || 'Dashboard personnalisé',
        t('landingPage.packages.enterprise.features.3') || 'API et intégrations',
        t('landingPage.packages.enterprise.features.4') || 'Support prioritaire 24/7',
        t('landingPage.packages.enterprise.features.5') || 'Account manager dédié',
        t('landingPage.packages.enterprise.features.6') || 'Garantie performance'
      ],
      cta: t('landingPage.packages.enterprise.cta') || 'Demander un Devis',
      popular: false
    }
  ];

  const conversionElements = [
    {
      element: t('landingPage.demo.conversion.elements.headline.name') || 'Headline IA',
      improvement: '+47%',
      description: t('landingPage.demo.conversion.elements.headline.description') || 'Titres générés et optimisés par IA selon votre audience'
    },
    {
      element: t('landingPage.demo.conversion.elements.cta.name') || 'CTA Dynamiques',
      improvement: '+62%',
      description: t('landingPage.demo.conversion.elements.cta.description') || 'Boutons qui s\'adaptent au comportement visiteur'
    },
    {
      element: t('landingPage.demo.conversion.elements.content.name') || 'Contenu Personnalisé',
      improvement: '+89%',
      description: t('landingPage.demo.conversion.elements.content.description') || 'Messages personnalisés selon la source de trafic'
    },
    {
      element: t('landingPage.demo.conversion.elements.design.name') || 'Design Adaptatif',
      improvement: '+34%',
      description: t('landingPage.demo.conversion.elements.design.description') || 'Interface qui s\'optimise automatiquement'
    }
  ];

  const testimonials = [
    {
      name: t('landingPage.testimonials.sophie.name') || 'Sophie Martin',
      company: t('landingPage.testimonials.sophie.company') || 'E-boutique ModeTrend',
      role: t('landingPage.testimonials.sophie.role') || 'CEO',
      content: t('landingPage.testimonials.sophie.content') || 'Nos landing pages Iluma™ convertissent 8x mieux que nos anciennes pages. Le ROI est exceptionnel !',
      rating: 5,
      results: t('landingPage.testimonials.sophie.results') || 'Conversion x8',
      image: '/testimonials/sophie-martin.jpg'
    },
    {
      name: t('landingPage.testimonials.marc.name') || 'Marc Dubois',
      company: t('landingPage.testimonials.marc.company') || 'Formation Pro',
      role: t('landingPage.testimonials.marc.role') || 'Directeur Marketing',
      content: t('landingPage.testimonials.marc.content') || 'L\'IA d\'Iluma™ a transformé nos campagnes. +340% de leads qualifiés en 2 mois.',
      rating: 5,
      results: t('landingPage.testimonials.marc.results') || '+340% leads',
      image: '/testimonials/marc-dubois.jpg'
    }
  ];

  return (
    <>
      <SEOManager seoData={seoData} path="/landing-page-intelligente" />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="bg-[#8E44FF]/20 text-[#FFD56B] text-lg px-6 py-2 mb-6 font-['Montserrat']">
                {t('landingPage.hero.badge') || '🚀 Landing Pages IA - Conversion Garantie'}
              </Badge>
              
              <h1 className="text-4xl md:text-7xl font-bold mb-6 font-['Montserrat'] leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  {t('landingPage.hero.title1') || 'Landing Pages'}
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {t('landingPage.hero.title2') || 'Qui Convertissent'}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto font-['Montserrat']">
                {t('landingPage.hero.description1') || 'Transformez vos visiteurs en clients grâce à nos pages de destination intelligentes'}
                <br />
                <span className="text-[#FFD56B]">
                  {t('landingPage.hero.description2') || 'optimisées par l\'IA pour des résultats exceptionnels'}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all">
                    <Rocket className="w-5 h-5 mr-2" />
                    {t('landingPage.hero.cta.primary') || 'Créer Ma Landing IA'}
                  </Button>
                </Link>
                <Link to="/adluma">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-['Montserrat']">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    {t('landingPage.hero.cta.secondary') || 'Simuler Mes Conversions'}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-white/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-['Montserrat']">{t('landingPage.hero.guarantees.delivery') || 'Livraison 48h'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-['Montserrat']">{t('landingPage.hero.guarantees.performance') || 'Performance garantie'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-['Montserrat']">{t('landingPage.hero.guarantees.conversion') || '+340% conversion'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
                {t('landingPage.features.title') || '🎯 Fonctionnalités IA Exclusives'}
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-['Montserrat']">
                {t('landingPage.features.subtitle') || 'Chaque élément est optimisé par notre intelligence artificielle propriétaire'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 p-6 h-full hover:border-[#8E44FF]/50 transition-all duration-300">
                    <CardContent className="p-0 text-center">
                      <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
                      <h3 className="text-lg font-bold text-white mb-3 font-['Montserrat']">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 font-['Montserrat']">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
                {t('landingPage.demo.title') || '🚀 Voir l\'IA en Action'}
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-['Montserrat']">
                {t('landingPage.demo.subtitle') || 'Découvrez comment nos éléments IA transforment vos conversions'}
              </p>
            </motion.div>

            <Tabs value={activeDemo} onValueChange={setActiveDemo} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
                <TabsTrigger value="conversion" className="data-[state=active]:bg-[#8E44FF]">
                  <Target className="w-4 h-4 mr-2" />
                  {t('landingPage.demo.tabs.conversion') || 'Conversion'}
                </TabsTrigger>
                <TabsTrigger value="personalization" className="data-[state=active]:bg-[#8E44FF]">
                  <Users className="w-4 h-4 mr-2" />
                  {t('landingPage.demo.tabs.personalization') || 'Personnalisation'}
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-[#8E44FF]">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  {t('landingPage.demo.tabs.analytics') || 'Analytics'}
                </TabsTrigger>
                <TabsTrigger value="optimization" className="data-[state=active]:bg-[#8E44FF]">
                  <Brain className="w-4 h-4 mr-2" />
                  {t('landingPage.demo.tabs.optimization') || 'Optimisation'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="conversion">
                <Card className="glass-effect border-white/20 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                    {t('landingPage.demo.conversion.title') || 'Éléments de Conversion IA'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {conversionElements.map((element, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white font-['Montserrat']">{element.element}</h4>
                          <Badge className="bg-green-500/20 text-green-400">
                            {element.improvement}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm font-['Montserrat']">{element.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="personalization">
                <Card className="glass-effect border-white/20 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                    {t('landingPage.demo.personalization.title') || 'Personnalisation Intelligente'}
                  </h3>
                  <p className="text-white/70 mb-6 font-['Montserrat']">
                    {t('landingPage.demo.personalization.description') || 'Notre IA adapte chaque élément selon le profil visiteur :'}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white font-['Montserrat']">Contenu selon la source de trafic</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white font-['Montserrat']">Design adaptatif selon l'appareil</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white font-['Montserrat']">CTA personnalisés selon le comportement</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white font-['Montserrat']">Offres dynamiques selon l'engagement</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card className="glass-effect border-white/20 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                    {t('landingPage.demo.analytics.title') || 'Analytics Prédictifs en Temps Réel'}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#FFD56B] mb-2">89.7%</div>
                      <div className="text-white/70 font-['Montserrat']">Précision prédictions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">+340%</div>
                      <div className="text-white/70 font-['Montserrat']">Amélioration moyenne</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">2.4s</div>
                      <div className="text-white/70 font-['Montserrat']">Temps d'optimisation</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="optimization">
                <Card className="glass-effect border-white/20 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                    {t('landingPage.demo.optimization.title') || 'Optimisation Continue Automatique'}
                  </h3>
                  <p className="text-white/70 mb-6 font-['Montserrat']">
                    {t('landingPage.demo.optimization.description') || 'Notre IA apprend et s\'améliore 24/7 pour maximiser vos conversions :'}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#8E44FF] rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <span className="text-white font-['Montserrat']">Analyse comportementale en temps réel</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#8E44FF] rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <span className="text-white font-['Montserrat']">Tests A/B automatiques et continus</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#8E44FF] rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <span className="text-white font-['Montserrat']">Ajustements automatiques des éléments</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#8E44FF] rounded-full flex items-center justify-center text-white font-bold">4</div>
                      <span className="text-white font-['Montserrat']">Prédictions et recommandations intelligentes</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
                {t('landingPage.testimonials.title') || '🌟 Ils Ont Transformé Leurs Conversions'}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 p-6 h-full">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-white font-['Montserrat']">{testimonial.name}</div>
                          <div className="text-white/70 text-sm font-['Montserrat']">{testimonial.role}</div>
                          <div className="text-[#FFD56B] text-sm font-['Montserrat']">{testimonial.company}</div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 ml-auto">
                          {testimonial.results}
                        </Badge>
                      </div>
                      <blockquote className="text-white/90 italic font-['Montserrat']">
                        "{testimonial.content}"
                      </blockquote>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
                {t('landingPage.packages.title') || '💎 Nos Formules Landing Pages IA'}
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-['Montserrat']">
                {t('landingPage.packages.subtitle') || 'Choisissez la solution parfaite pour vos conversions'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className={`glass-effect h-full p-6 ${
                    pkg.popular 
                      ? 'border-[#8E44FF] ring-2 ring-[#8E44FF]/30 scale-105' 
                      : 'border-white/20'
                  } hover:border-[#FFD56B]/50 transition-all duration-300`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-white">
                          ⭐ Plus Populaire
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-0 text-center">
                      <h3 className="text-2xl font-bold text-white mb-2 font-['Montserrat']">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-[#FFD56B] mb-2">{pkg.price}</div>
                      {pkg.duration && (
                        <div className="text-white/60 mb-4 font-['Montserrat']">{pkg.duration}</div>
                      )}
                      <p className="text-white/70 mb-6 font-['Montserrat']">{pkg.description}</p>
                      
                      <div className="space-y-3 mb-8">
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3 text-left">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <span className="text-white/90 font-['Montserrat']">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link to="/contact">
                        <Button 
                          className={`w-full ${
                            pkg.popular
                              ? 'bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF]'
                              : 'bg-white/10 hover:bg-white/20 border border-white/30'
                          } text-white font-['Montserrat'] hover:scale-105 transition-all`}
                        >
                          {pkg.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-effect border-[#8E44FF]/30 p-8">
                <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
                  {t('landingPage.cta.title') || '🚀 Prêt à Transformer Vos Conversions ?'}
                </h2>
                <p className="text-xl text-white/80 mb-8 font-['Montserrat']">
                  {t('landingPage.cta.subtitle') || 'Rejoignez 2,400+ entreprises qui ont choisi l\'excellence IA pour leurs conversions'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link to="/contact">
                    <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all">
                      <Rocket className="w-5 h-5 mr-2" />
                      {t('landingPage.cta.primary') || 'Créer Ma Landing Page IA'}
                    </Button>
                  </Link>
                  <Link to="/adluma">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-['Montserrat']">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      {t('landingPage.cta.secondary') || 'Simuler Mes Conversions'}
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="font-['Montserrat']">{t('landingPage.cta.guarantee') || 'Satisfaction garantie'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-['Montserrat']">{t('landingPage.cta.delivery') || 'Livraison 48h'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-['Montserrat']">{t('landingPage.cta.performance') || 'Performance mesurée'}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LandingPageIntelligentePage;