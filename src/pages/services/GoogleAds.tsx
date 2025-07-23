import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Target,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const GoogleAds = () => {
  const { t } = useLanguage();
  
  const seoData = {
    title: t('services.googleAds.title') + ' | Iluma™',
    description: t('services.googleAds.description'),
    keywords: ['google ads', 'publicité google', 'adwords', 'campagnes intelligentes', 'ROI']
  };

  const features = [
    {
      icon: Search,
      title: t('services.googleAds.features.keywordResearch.title'),
      description: t('services.googleAds.features.keywordResearch.description')
    },
    {
      icon: MapPin,
      title: t('services.googleAds.features.geoTargeting.title'),
      description: t('services.googleAds.features.geoTargeting.description')
    },
    {
      icon: BarChart3,
      title: t('services.googleAds.features.realTimeOptimization.title'),
      description: t('services.googleAds.features.realTimeOptimization.description')
    },
    {
      icon: Zap,
      title: t('services.googleAds.features.performanceMax.title'),
      description: t('services.googleAds.features.performanceMax.description')
    }
  ];

  return (
    <>
      <SEOManager seoData={seoData} path="/services/google-ads" />
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0B0B0E] via-[#1A1A2E] to-[#16213E]">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-400 border-blue-500/30">
                <Target className="w-4 h-4 mr-2" />
                Expert Google Certifié
              </Badge>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 bg-clip-text text-transparent">
                  {t('services.googleAds.title')}
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                {t('services.googleAds.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-4xl mx-auto">
                {t('services.googleAds.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white">
                <Link to="/contact">
                  <Search className="mr-2 h-5 w-5" />
                  Lancer une Campagne
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/modules/adluma">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Calculer mon ROI
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Excellence Google Ads IA
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Expertise technique combinée à l'intelligence artificielle pour des campagnes Google Ads performantes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                      <p className="text-white/70">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-500/10 to-green-500/10">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Pourquoi Google Ads ?
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                La plateforme publicitaire la plus puissante au monde
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "8.5 Milliards de Recherches/Jour",
                  description: "Accès à l'intention d'achat la plus forte",
                  icon: Search
                },
                {
                  title: "Ciblage Ultra-Précis",
                  description: "Mots-clés, localisation, audiences personnalisées",
                  icon: Target
                },
                {
                  title: "ROI Mesurable",
                  description: "Tracking précis et attribution multi-canal",
                  icon: TrendingUp
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center p-6 h-full">
                    <CardContent className="p-0">
                      <benefit.icon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                      <p className="text-white/70">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Prêt à Dominer Google ?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Lancez vos premières campagnes Google Ads optimisées IA dès aujourd'hui
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:shadow-xl hover:shadow-blue-500/30 text-lg px-8">
                <Link to="/contact">
                  <Zap className="mr-2 h-5 w-5" />
                  Démarrer Maintenant
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default GoogleAds;