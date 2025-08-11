import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import FAQSection from '@/components/faq/FAQSection';
import SEOManager from '@/components/seo/SEOManager';
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
  Target,
  Lightbulb,
  Calculator,
  Globe,
  PenTool,
  Rocket,
  TrendingUp,
  Search,
  MessageSquare,
  BarChart3,
  Heart,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SEOEngine } from '@/utils/seoEngine';
import { useTranslations } from '@/hooks/useTranslations';

const Modules = () => {
  const { t } = useTranslations();
  
  const seoData = SEOEngine.generatePageSEO('module', { 
    moduleName: t('modules.hero.title'), 
    benefit: 'transformer votre marketing avec notre écosystème IA complet' 
  });

  const modules = [
    {
      id: 'adluma',
      name: t('modules.adluma.name'),
      title: t('modules.adluma.title'),
      description: t('modules.adluma.description'),
      icon: Calculator,
      color: 'from-cyan-400 to-blue-500',
      path: '/adluma',
      status: t('modules.status.active'),
      features: [t('modules.adluma.features.simulation'), t('modules.adluma.features.analysis'), t('modules.adluma.features.roi')]
    },
    {
      id: 'ila',
      name: t('modules.ila.name'),
      title: t('modules.ila.title'),
      description: t('modules.ila.description'),
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      path: '/ila',
      status: t('modules.status.active'),
      features: [t('modules.ila.features.score'), t('modules.ila.features.benchmark'), t('modules.ila.features.recommendations')]
    },
    {
      id: 'landing',
      name: t('modules.landing.name'),
      title: t('modules.landing.title'),
      description: t('modules.landing.description'),
      icon: Rocket,
      color: 'from-yellow-500 to-orange-500',
      path: '/landing-page-intelligente',
      status: t('modules.status.active'),
      features: [t('modules.landing.features.templates'), t('modules.landing.features.testing'), t('modules.landing.features.optimization')]
    },
    {
      id: 'fidelisation',
      name: t('modules.fidelisation.name'),
      title: t('modules.fidelisation.title'),
      description: t('modules.fidelisation.description'),
      icon: Heart,
      color: 'from-pink-500 to-red-500',
      path: '/page-fidelisation-intelligente',
      status: t('modules.status.active'),
      features: [t('modules.fidelisation.features.personalized'), t('modules.fidelisation.features.gamification'), t('modules.fidelisation.features.rewards')]
    },
    {
      id: 'ilumatch',
      name: t('modules.ilumatch.name'),
      title: t('modules.ilumatch.title'),
      description: t('modules.ilumatch.description'),
      icon: Users,
      color: 'from-green-500 to-teal-500',
      path: '/ilumatch',
      status: t('modules.status.active'),
      features: [t('modules.ilumatch.features.matching'), t('modules.ilumatch.features.network'), t('modules.ilumatch.features.growth')]
    },
    {
      id: 'blogia',
      name: t('modules.blogia.name'),
      title: t('modules.blogia.title'),
      description: t('modules.blogia.description'),
      icon: PenTool,
      color: 'from-indigo-500 to-purple-500',
      path: '/blogia',
      status: t('modules.status.active'),
      features: [t('modules.blogia.features.content'), t('modules.blogia.features.seo'), t('modules.blogia.features.publication')]
    },
    {
      id: 'lilo',
      name: t('modules.lilo.name'),
      title: t('modules.lilo.title'),
      description: t('modules.lilo.description'),
      icon: MessageSquare,
      color: 'from-violet-500 to-purple-600',
      path: '/lilo',
      status: t('modules.status.active'),
      features: [t('modules.lilo.features.chat'), t('modules.lilo.features.support'), t('modules.lilo.features.learning')]
    },
    {
      id: 'crm',
      name: t('modules.crm.name'),
      title: t('modules.crm.title'),
      description: t('modules.crm.description'),
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      path: '/crm-iluma',
      status: t('modules.status.active'),
      features: [t('modules.crm.features.tracking'), t('modules.crm.features.automation'), t('modules.crm.features.analytics')]
    },
    {
      id: 'hub',
      name: t('modules.hub.name'),
      title: t('modules.hub.title'),
      description: t('modules.hub.description'),
      icon: Globe,
      color: 'from-emerald-500 to-green-500',
      path: '/hub',
      status: t('modules.status.active'),
      features: [t('modules.hub.features.overview'), t('modules.hub.features.control'), t('modules.hub.features.dashboard')]
    }
  ];

  return (
    <>
      <SEOManager seoData={seoData} path="/modules" />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
        
        {/* Hero Section avec structure FAC */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Lilo Guide Message */}
              <motion.div 
                className="mb-8 flex items-center justify-center gap-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center animate-pulse">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <motion.div 
                  className="bg-black/50 backdrop-blur-xl rounded-2xl p-3 border border-[#8E44FF]/30"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-[#FFD56B] font-['Montserrat'] text-sm">
                    {t('modules.lilo.intro')}
                  </p>
                </motion.div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-['Montserrat']">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {t('modules.hero.title')}
                </span>
              </h1>
              
              {/* Structure FAC */}
              <div className="max-w-4xl mx-auto mb-8 space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-400 mb-2">{t('modules.fact.title')}</p>
                  <p className="text-white/90 font-['Montserrat'] text-lg">
                    {t('modules.fact.description')}
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-400 mb-2">{t('modules.action.title')}</p>
                  <p className="text-white/90 font-['Montserrat'] text-lg">
                    {t('modules.action.description')}
                  </p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-400 mb-2">{t('modules.context.title')}</p>
                  <p className="text-white/90 font-['Montserrat'] text-lg">
                    {t('modules.context.description')}
                  </p>
                </div>
              </div>

              <Badge className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 text-[#FFD56B] text-lg px-6 py-2 border border-[#8E44FF]/30 font-['Montserrat']">
                {t('modules.badge')}
              </Badge>
            </motion.div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module, index) => {
                const IconComponent = module.icon;
                
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <Badge 
                            variant="outline"
                            className="border-green-500/50 text-green-400 bg-green-500/10 font-['Montserrat']"
                          >
                            {module.status}
                          </Badge>
                        </div>

                        {/* Content */}
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                            {module.name}
                          </h3>
                          <h4 className="text-lg text-purple-300 mb-3 font-['Montserrat']">
                            {module.title}
                          </h4>
                          <p className="text-white/70 mb-4 font-['Montserrat']">
                            {module.description}
                          </p>
                          
                          {/* Features */}
                          <div className="space-y-2 mb-6">
                            {module.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span className="font-['Montserrat']">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <Link to={module.path}>
                          <Button 
                            className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-['Montserrat'] group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300"
                          >
                            {t('modules.discover')} {module.name}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-12 border border-[#8E44FF]/30"
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
                {t('modules.cta.title')}
              </h2>
              <p className="text-xl text-white/80 mb-8 font-['Montserrat']">
                {t('modules.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/adluma">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    {t('modules.cta.diagnostic')}
                  </Button>
                </Link>
                <Link to="/hub">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    {t('modules.cta.hub')}
                  </Button>
                </Link>
              </div>
            </motion.div>
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
              <HelpCircle className="w-12 h-12 text-iluma-gold-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
                {t('modules.faq.title')}
              </h2>
              <p className="text-white/70 font-['Montserrat']">
                {t('modules.faq.subtitle')}
              </p>
            </motion.div>
            <FAQSection />
          </div>
        </section>

        <Footer />

        {/* Structured Data for SGE */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Modules Iluma™ - Écosystème IA Marketing",
            "description": "Suite complète de 9 modules IA propriétaires pour transformer votre marketing digital : ADLUMA™, ILA™, Landing Pages, Fidélisation, ILUMATCH™, BlogIA™, LILO™, CRM et HUB™.",
            "url": "https://ilumamarketing.com/modules",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "CAD",
              "description": "Diagnostic gratuit inclus"
            },
            "provider": {
              "@type": "Organization", 
              "name": "Iluma Marketing",
              "url": "https://ilumamarketing.com"
            },
            "featureList": [
              "ADLUMA™ - Simulateur IA de visibilité",
              "ILA™ - Indice Local d'Attraction", 
              "Landing Pages intelligentes",
              "Pages de Fidélisation Diamant",
              "ILUMATCH™ - Réseau d'inter-visibilité",
              "BlogIA™ - Contenu SEO automatisé",
              "LILO™ - Assistant IA galactique",
              "CRM Iluma - Gestion client avancée",
              "HUB™ - Centre de contrôle centralisé"
            ]
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
                "name": "Combien de modules IA propose Iluma™ ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Iluma™ propose 9 modules IA propriétaires : ADLUMA™ (simulateur), ILA™ (scoring local), Landing Pages, Fidélisation, ILUMATCH™ (réseau), BlogIA™ (contenu), LILO™ (assistant), CRM et HUB™ (contrôle)."
                }
              },
              {
                "@type": "Question",
                "name": "Les modules Iluma™ sont-ils tous inclus ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tous nos modules sont disponibles selon vos besoins. Commencez par notre diagnostic gratuit ADLUMA™ pour déterminer les modules optimaux pour votre entreprise."
                }
              },
              {
                "@type": "Question",
                "name": "Comment commencer avec les modules Iluma™ ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Démarrez par notre diagnostic gratuit ADLUMA™ qui analyse votre visibilité actuelle et recommande les modules les plus adaptés à vos objectifs."
                }
              },
              {
                "@type": "Question",
                "name": "Les modules Iluma™ fonctionnent-ils ensemble ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, tous nos modules s'intègrent parfaitement via notre HUB™ centralisé. Données partagées, workflow automatisé, performance maximisée."
                }
              },
              {
                "@type": "Question",
                "name": "Quelle est la différence entre les modules Iluma™ et d'autres outils ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nos modules sont propriétaires, alimentés par IA avancée, interconnectés et optimisés pour les entreprises francophones. Interface galactique unique, résultats garantis."
                }
              }
            ]
          })}
        </script>
      </div>
    </>
  );
};

export default Modules;