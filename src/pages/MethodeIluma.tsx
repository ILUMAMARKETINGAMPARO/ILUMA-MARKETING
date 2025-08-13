import React, { useState } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { useTranslations } from '@/hooks/useTranslations';

import SEOManager from '@/components/seo/SEOManager';
import FAQSection from '@/components/faq/FAQSection';
import { useLiloUX } from '@/hooks/useLiloUX';
import { SEOEngine } from '@/utils/seoEngine';
import MPEContainer from '@/components/mpe/MPEContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Eye, 
  Users, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle,
  Target,
  Lightbulb,
  Calculator,
  Globe,
  PenTool,
  Rocket,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MethodeIluma = () => {
  const { liloMood, liloMessage, handleCTAHighlight } = useLiloUX();
  const { t } = useTranslations();
  const [activeStep, setActiveStep] = useState(0);
  
  const seoData = SEOEngine.generatePageSEO('service', { 
    serviceName: 'Méthode Iluma™', 
    benefit: 'transformer votre entreprise avec notre méthode IA propriétaire en 6 étapes' 
  });

  const methodSteps = [
    {
      id: 'diagnostic',
      title: t('methodeiluma.steps.diagnostic.title'),
      fact: t('methodeiluma.steps.diagnostic.fact'),
      action: t('methodeiluma.steps.diagnostic.action'),
      context: t('methodeiluma.steps.diagnostic.context'),
      icon: Brain,
      color: 'from-purple-500 to-blue-500',
      module: 'ADLUMA™',
      path: '/adluma',
      deliverables: [
        t('methodeiluma.steps.diagnostic.deliverables.0'),
        t('methodeiluma.steps.diagnostic.deliverables.1'),
        t('methodeiluma.steps.diagnostic.deliverables.2')
      ],
      cta: t('methodeiluma.steps.diagnostic.cta')
    },
    {
      id: 'presence',
      title: t('methodeiluma.steps.presence.title'),
      fact: t('methodeiluma.steps.presence.fact'),
      action: t('methodeiluma.steps.presence.action'),
      context: t('methodeiluma.steps.presence.context'),
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      module: 'SEO SGE',
      path: '/seo-social',
      deliverables: [
        t('methodeiluma.steps.presence.deliverables.0'),
        t('methodeiluma.steps.presence.deliverables.1'),
        t('methodeiluma.steps.presence.deliverables.2'),
        t('methodeiluma.steps.presence.deliverables.3')
      ],
      cta: t('methodeiluma.steps.presence.cta')
    },
    {
      id: 'pages',
      title: t('methodeiluma.steps.pages.title'),
      fact: t('methodeiluma.steps.pages.fact'),
      action: t('methodeiluma.steps.pages.action'),
      context: t('methodeiluma.steps.pages.context'),
      icon: PenTool,
      color: 'from-yellow-500 to-orange-500',
      module: 'LANDING™',
      path: '/landing-page-intelligente',
      deliverables: [
        t('methodeiluma.steps.pages.deliverables.0'),
        t('methodeiluma.steps.pages.deliverables.1'),
        t('methodeiluma.steps.pages.deliverables.2'),
        t('methodeiluma.steps.pages.deliverables.3')
      ],
      cta: t('methodeiluma.steps.pages.cta')
    },
    {
      id: 'visibility',
      title: t('methodeiluma.steps.visibility.title'),
      fact: t('methodeiluma.steps.visibility.fact'),
      action: t('methodeiluma.steps.visibility.action'),
      context: t('methodeiluma.steps.visibility.context'),
      icon: Globe,
      color: 'from-green-500 to-teal-500',
      module: 'RivalViews™',
      path: '/rivalviews',
      deliverables: [
        t('methodeiluma.steps.visibility.deliverables.0'),
        t('methodeiluma.steps.visibility.deliverables.1'),
        t('methodeiluma.steps.visibility.deliverables.2')
      ],
      cta: t('methodeiluma.steps.visibility.cta')
    },
    {
      id: 'intelligence',
      title: t('methodeiluma.steps.intelligence.title'),
      fact: t('methodeiluma.steps.intelligence.fact'),
      action: t('methodeiluma.steps.intelligence.action'),
      context: t('methodeiluma.steps.intelligence.context'),
      icon: Zap,
      color: 'from-pink-500 to-purple-500',
      module: 'IA ACTIVE',
      path: '/hub',
      deliverables: [
        t('methodeiluma.steps.intelligence.deliverables.0'),
        t('methodeiluma.steps.intelligence.deliverables.1'),
        t('methodeiluma.steps.intelligence.deliverables.2')
      ],
      cta: t('methodeiluma.steps.intelligence.cta')
    },
    {
      id: 'scalability',
      title: t('methodeiluma.steps.scalability.title'),
      fact: t('methodeiluma.steps.scalability.fact'),
      action: t('methodeiluma.steps.scalability.action'),
      context: t('methodeiluma.steps.scalability.context'),
      icon: Rocket,
      color: 'from-red-500 to-pink-500',
      module: 'SCALE™',
      path: '/hub',
      deliverables: [
        t('methodeiluma.steps.scalability.deliverables.0'),
        t('methodeiluma.steps.scalability.deliverables.1'),
        t('methodeiluma.steps.scalability.deliverables.2')
      ],
      cta: t('methodeiluma.steps.scalability.cta')
    }
  ];

  const testimonials = [
    {
      name: 'Ulysse Tremblay',
      company: 'Literie d\'Amitié',
      text: t('methodeiluma.testimonials.text1') || 'En moins de deux mois, notre visibilité a explosé.',
      rating: 5
    },
    {
      name: 'Clara Doulis',
      company: 'Réseau Santé',
      text: t('methodeiluma.testimonials.text2') || 'Ils ont su allier l\'humain et l\'IA dans une même méthode.',
      rating: 5
    }
  ];

  const benefits = [
    {
      title: t('methodeiluma.benefits.approach') || 'Approche IA-First',
      description: t('methodeiluma.benefits.approachDesc') || 'Méthode propriétaire basée sur l\'intelligence artificielle'
    },
    {
      title: t('methodeiluma.benefits.guaranteed') || 'Résultats Garantis',
      description: t('methodeiluma.benefits.guaranteedDesc') || '+214% de trafic organique en moyenne chez nos clients'
    },
    {
      title: t('methodeiluma.benefits.support') || 'Accompagnement Expert',
      description: t('methodeiluma.benefits.supportDesc') || 'Équipe dédiée avec Lilo, votre assistant IA personnel'
    }
  ];

  return (
    <>
      <SEOManager seoData={seoData} path="/methode-iluma" />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <MPEContainer animation="fade-in">
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Montserrat'] leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {t('methodeiluma.hero.title') || 'La Méthode Révolutionnaire'}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto font-['Montserrat']">
                {t('methodeiluma.hero.subtitle')}
              </p>
              <div className="flex items-center justify-center gap-4 text-white/60 mb-8">
                <Brain className="w-8 h-8" />
                <span className="text-2xl">+</span>
                <Eye className="w-8 h-8" />
                <span className="text-2xl">=</span>
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <Badge className="bg-[#8E44FF]/20 text-[#FFD56B] text-lg px-6 py-2 font-['Montserrat']">
                {t('methodeiluma.hero.badge')}
              </Badge>
            </div>
          </MPEContainer>
        </div>
      </section>

      {/* Interactive 6-Step Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white font-['Montserrat']">
            {t('methodeiluma.steps.title')}
          </h2>
          <p className="text-xl text-white/70 text-center mb-16 font-['Montserrat']">
            {t('methodeiluma.steps.subtitle')}
          </p>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 opacity-30"></div>
            
            {/* Timeline Steps */}
            <div className="space-y-20">
              {methodSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <motion.div 
                    key={step.id}
                    className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8`}
                    onMouseEnter={() => setActiveStep(index)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <Card className={`glass-effect border-white/20 p-6 hover:scale-105 transition-all duration-300 ${
                        activeStep === index ? 'border-purple-500/50 shadow-2xl shadow-[#8E44FF]/25' : ''
                      }`}>
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white font-['Montserrat']">{step.title}</h3>
                            <Badge className="bg-[#8E44FF]/20 text-[#FFD56B] font-['Montserrat']">
                              {step.module}
                            </Badge>
                          </div>
                          
                          {/* Structure FAC */}
                          <div className="space-y-3 mb-4">
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                              <p className="text-sm font-semibold text-red-400 mb-1">FAIT</p>
                              <p className="text-white/90 font-['Montserrat']">{step.fact}</p>
                            </div>
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                              <p className="text-sm font-semibold text-blue-400 mb-1">ACTION</p>
                              <p className="text-white/90 font-['Montserrat']">{step.action}</p>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                              <p className="text-sm font-semibold text-green-400 mb-1">CONTEXTE</p>
                              <p className="text-white/90 font-['Montserrat']">{step.context}</p>
                            </div>
                          </div>

                          {/* Deliverables */}
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-[#FFD56B] mb-2">Livrables</p>
                            <div className="space-y-1">
                              {step.deliverables.map((deliverable, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-white/70">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="font-['Montserrat']">{deliverable}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Link to={step.path}>
                            <Button size="sm" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-['Montserrat']">
                              📍 {step.cta}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline Node */}
                    <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer`}>
                      <IconComponent className="w-8 h-8 text-white" />
                      <div className="absolute inset-0 rounded-full animate-ping bg-white/20"></div>
                    </div>
                    
                    {/* Spacer */}
                    <div className="flex-1"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white font-['Montserrat']">
            {t('methodeiluma.testimonials.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <MPEContainer key={index} animation="scale-in" className="h-full">
                <Card className="glass-effect border-[#8E44FF]/20 p-6 text-center h-full hover:border-[#FFD56B]/40 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-white/90 mb-6 italic font-['Montserrat']">
                      "{testimonial.text}"
                    </blockquote>
                    <div>
                      <div className="font-bold text-white font-['Montserrat']">{testimonial.name}</div>
                      <div className="text-white/70 font-['Montserrat']">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </MPEContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white font-['Montserrat']">
            {t('methodeiluma.benefits.title')}
          </h2>
          <p className="text-xl text-white/70 text-center mb-16 font-['Montserrat']">
            {t('methodeiluma.benefits.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <MPEContainer key={index} animation="scale-in">
                <Card className="glass-effect border-[#8E44FF]/20 p-6 h-full hover:border-[#FFD56B]/40 transition-all duration-300">
                  <CardContent className="p-0 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat']">
                      {benefit.title}
                    </h3>
                    <p className="text-white/80 font-['Montserrat']">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </MPEContainer>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <MPEContainer animation="fade-in">
            <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
              {t('methodeiluma.cta.title') || 'Prêt à transformer votre entreprise ?'}
            </h2>
            <p className="text-xl text-white/80 mb-12 font-['Montserrat']">
              {t('methodeiluma.cta.subtitle') || 'Commencez votre transformation dès aujourd\'hui'}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Link to="/adluma">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  onClick={handleCTAHighlight}
                >
                  {t('methodeiluma.cta.simulate') || '🎯 Simuler votre croissance'}
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-6 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  onClick={handleCTAHighlight}
                >
                  {t('methodeiluma.cta.diagnosis') || '📊 Diagnostic gratuit'}
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  onClick={handleCTAHighlight}
                >
                  {t('methodeiluma.cta.consultation') || '📞 Consultation stratégique'}
                </Button>
              </Link>
            </div>
          </MPEContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
              {t('methodeIluma.faq.title')}
            </h2>
            <p className="text-white/70 font-['Montserrat']">
              {t('methodeIluma.faq.description')}
            </p>
          </motion.div>
          <FAQSection />
        </div>
      </section>


      <Footer />

      {/* JSON-LD Schema - Enhanced for SGE */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["EducationalOrganization", "HowTo"],
          "name": "Méthode Iluma™ - Transformation digitale IA",
          "description": "Méthode propriétaire en 6 phases pour transformer votre entreprise avec l'IA marketing guidée par Lilo. Diagnostic ADLUMA™, présence Google SGE, pages intelligentes, visibilité croisée QRVISIBILITÉ™, IA active et scalabilité.",
          "url": "https://ilumamarketing.com/methode-iluma",
          "image": "https://ilumamarketing.com/assets/methode-iluma-cover.jpg",
          "provider": {
            "@type": "Organization",
            "name": "Iluma Marketing",
            "url": "https://ilumamarketing.com",
            "logo": "https://ilumamarketing.com/assets/logo-iluma.png"
          },
          "teaches": "Marketing digital avec intelligence artificielle",
          "educationalCredentialAwarded": "Transformation digitale complète",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Diagnostic IA - ADLUMA™",
              "text": "Analyse complète de votre visibilité actuelle avec notre simulateur ADLUMA™ pour identifier les opportunités d'amélioration.",
              "image": "https://ilumamarketing.com/assets/step1-diagnostic.jpg"
            },
            {
              "@type": "HowToStep", 
              "name": "Structuration - HUB™",
              "text": "Organisation de votre écosystème digital avec notre plateforme HUB™ centralisée.",
              "image": "https://ilumamarketing.com/assets/step2-structure.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Contenu IA - BlogIA™", 
              "text": "Création de contenu optimisé SEO avec notre système BlogIA™ alimenté par l'intelligence artificielle.",
              "image": "https://ilumamarketing.com/assets/step3-content.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Déploiement - Landing Pages",
              "text": "Mise en ligne de pages de conversion optimisées avec nos Landing Pages intelligentes.",
              "image": "https://ilumamarketing.com/assets/step4-deploy.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Visibilité - ILUMATCH™",
              "text": "Amplification de votre portée avec notre réseau ILUMATCH™ d'inter-visibilité stratégique.",
              "image": "https://ilumamarketing.com/assets/step5-visibility.jpg"
            }
          ],
          "totalTime": "PT90D",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "CAD",
            "value": "2500"
          }
        })}
      </script>

      {/* FAQ Schema for SGE */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Qu'est-ce que la Méthode Iluma™ ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "La Méthode Iluma™ est notre approche propriétaire en 5 étapes pour transformer votre entreprise avec l'IA marketing : Diagnostic ADLUMA™, Structuration HUB™, Contenu BlogIA™, Déploiement Landing et Visibilité ILUMATCH™."
              }
            },
            {
              "@type": "Question",
              "name": "Combien de temps prend la Méthode Iluma™ ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "La Méthode Iluma™ se déploie sur 90 jours en moyenne, avec des résultats visibles dès les premières semaines grâce à notre approche IA-first."
              }
            },
            {
              "@type": "Question",
              "name": "Quels sont les résultats garantis avec la Méthode Iluma™ ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nos clients observent en moyenne +214% de trafic organique, +300% de leads qualifiés et une amélioration de 4.8/5 de leur score de satisfaction client."
              }
            },
            {
              "@type": "Question", 
              "name": "La Méthode Iluma™ fonctionne-t-elle pour tous les secteurs ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui, notre méthode s'adapte à tous les secteurs : santé, technologie, commerce local, services professionnels. Nous personnalisons chaque étape selon votre industrie."
              }
            },
            {
              "@type": "Question",
              "name": "Comment commencer avec la Méthode Iluma™ ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Commencez par notre consultation gratuite où nous analysons votre situation actuelle et établissons votre plan personnalisé Méthode Iluma™."
              }
            }
          ]
        })}
      </script>
    </div>
    </>
  );
};

export default MethodeIluma;