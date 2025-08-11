import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import HubIntelligentNavigation from '@/components/hub/HubIntelligentNavigation';
import SEOManager from '@/components/seo/SEOManager';
import FAQSection from '@/components/faq/FAQSection';
import { motion } from 'framer-motion';
import SecretShipButton from '@/components/common/SecretShipButton';
import { useLiloUX } from '@/hooks/useLiloUX';
import { SEOEngine } from '@/utils/seoEngine';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ecosystemStats, getAllOfferings } from '@/data/ecosystem';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  BarChart3, 
  Settings, 
  ArrowRight,
  CheckCircle,
  Zap,
  Rocket,
  Package,
  Lightbulb,
  Wrench
} from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

const HubCentral = () => {
  const { t } = useTranslations();
  const { liloMood, liloMessage, handleCTAHighlight } = useLiloUX();
  const seoData = SEOEngine.generatePageSEO('module', { 
    moduleName: 'HUB Central', 
    benefit: 'centraliser tous vos outils marketing IA' 
  });

  const features = t('hubCentral.features.items').map((item: any, index: number) => ({
    icon: [Brain, Target, BarChart3, Settings][index],
    title: item.title,
    description: item.description
  }));

  const stats = [
    { value: `${ecosystemStats.products.count}`, label: t('hubCentral.stats.products'), color: "text-blue-400" },
    { value: `${ecosystemStats.tools.count}`, label: t('hubCentral.stats.tools'), color: "text-purple-400" },
    { value: `${ecosystemStats.services.count}`, label: t('hubCentral.stats.services'), color: "text-orange-400" },
    { value: "24/7", label: t('hubCentral.stats.support'), color: "text-green-400" }
  ];

  const benefits = [
    "Interface unique pour tous vos outils marketing",
    "Synchronisation automatique entre modules",
    "Dashboards personnalisés par secteur",
    "Workflows d'automatisation avancés",
    "Intégrations natives avec 50+ plateformes",
    "Monitoring temps réel et alertes intelligentes"
  ];

  return (
    <>
      <SEOManager seoData={seoData} path="/hub" />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
        
        <main className="pt-32 pb-20">
          {/* Hero Section */}
          <section className="relative overflow-hidden mb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8E44FF]/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FFD56B]/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </div>

              {/* Hero Content */}
              <div className="relative z-10 text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge className="mb-6 bg-[#8E44FF]/20 text-[#FFD56B] text-lg px-6 py-2 font-['Montserrat']">
                    {t('hubCentral.badge')}
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 font-['Montserrat']">
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {t('hubCentral.title')}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-8 font-['Montserrat']">
                    {t('hubCentral.description').replace('{productsCount}', ecosystemStats.products.count).replace('{toolsCount}', ecosystemStats.tools.count).replace('{servicesCount}', ecosystemStats.services.count)}
                  </p>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
              >
                {stats.map((stat, index) => (
                  <Card key={index} className="glass-effect border-white/20 text-center p-6 hover:border-purple-500/50 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className={`text-3xl font-bold mb-2 font-['Montserrat'] ${stat.color || 'text-[#FFD56B]'}`}>{stat.value}</div>
                      <div className="text-white/70 font-['Montserrat']">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {/* Hub Navigation */}
              <HubIntelligentNavigation />
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Montserrat']">
                  {t('hubCentral.features.title')}
                </h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
                  {t('hubCentral.features.description')}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="glass-effect border-white/20 p-6 text-center hover:border-[#8E44FF]/50 transition-all duration-300 h-full">
                        <CardContent className="p-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3 font-['Montserrat']">{feature.title}</h3>
                          <p className="text-white/70 font-['Montserrat']">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Benefits List */}
              {/* Nouvelles sections catégories */}
              <div className="space-y-12">
                {/* Section Produits */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="glass-effect border-blue-500/30 p-8">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white font-['Montserrat']">{t('hubCentral.categories.products.title')}</h3>
                          <p className="text-blue-400 font-['Montserrat']">{t('hubCentral.categories.products.description')}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {t('hubCentral.categories.products.features').map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-blue-400" />
                            <span className="text-white/80 font-['Montserrat']">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Link to="/services">
                        <Button className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white">
                          {t('hubCentral.categories.products.button')} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Section Solutions */}
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card className="glass-effect border-purple-500/30 p-8">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white font-['Montserrat']">{t('hubCentral.categories.solutions.title')}</h3>
                          <p className="text-purple-400 font-['Montserrat']">{t('hubCentral.categories.solutions.description')}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {t('hubCentral.categories.solutions.features').map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-purple-400" />
                            <span className="text-white/80 font-['Montserrat']">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Link to="/presentation-outils">
                        <Button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white">
                          {t('hubCentral.categories.solutions.button')} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Section Services */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass-effect border-orange-500/30 p-8">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                          <Wrench className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white font-['Montserrat']">{t('hubCentral.categories.services.title')}</h3>
                          <p className="text-orange-400 font-['Montserrat']">{t('hubCentral.categories.services.description')}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {t('hubCentral.categories.services.features').map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-orange-400" />
                            <span className="text-white/80 font-['Montserrat']">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Link to="/services">
                        <Button className="mt-6 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-white">
                          {t('hubCentral.categories.services.button')} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
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
                  {t('hubCentral.faqSection.title')}
                </h2>
                <p className="text-white/70 font-['Montserrat']">
                  {t('hubCentral.faqSection.description')}
                </p>
              </motion.div>
              <FAQSection />
            </div>
          </section>
        </main>

        <SecretShipButton />

        <Footer />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "HUB Central Iluma™",
            "description": "Plateforme centralisée pour tous vos outils marketing IA. Connecte ADLUMA™, ILA™, CRM, BlogIA en un écosystème intelligent.",
            "url": "https://ilumamarketing.com/hub",
            "creator": {
              "@type": "Organization",
              "name": "Iluma Marketing",
              "url": "https://ilumamarketing.com"
            },
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "category": "Marketing Technology",
              "businessFunction": "Marketing Automation"
            }
          })}
        </script>
      </div>
    </>
  );
};

export default HubCentral;