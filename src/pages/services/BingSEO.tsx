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
  Users,
  Zap,
  Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const BingSEO = () => {
  const { t } = useLanguage();
  
  const seoData = {
    title: t('services.bingSeo.title') + ' | Iluma™',
    description: t('services.bingSeo.description'),
    keywords: ['bing seo', 'yahoo seo', 'référencement bing', 'microsoft ads', 'concurrence réduite']
  };

  const features = [
    {
      icon: Users,
      title: t('services.bingSeo.features.reducedCompetition.title'),
      description: t('services.bingSeo.features.reducedCompetition.description')
    },
    {
      icon: Target,
      title: t('services.bingSeo.features.qualifiedTraffic.title'),
      description: t('services.bingSeo.features.qualifiedTraffic.description')
    },
    {
      icon: BarChart3,
      title: t('services.bingSeo.features.microsoftAds.title'),
      description: t('services.bingSeo.features.microsoftAds.description')
    },
    {
      icon: MapPin,
      title: t('services.bingSeo.features.localOptimization.title'),
      description: t('services.bingSeo.features.localOptimization.description')
    }
  ];

  return (
    <>
      <SEOManager seoData={seoData} path="/services/bing-seo" />
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0B0B0E] via-[#2A1A0E] to-[#1A1A2E]">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30">
                <Crown className="w-4 h-4 mr-2" />
                Stratégie Alternative
              </Badge>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                  {t('services.bingSeo.title')}
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                {t('services.bingSeo.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-4xl mx-auto">
                {t('services.bingSeo.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white">
                <Link to="/contact">
                  <Search className="mr-2 h-5 w-5" />
                  Analyser mon Site
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/modules/ila">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Score ILA™
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
                Avantages Bing & Yahoo SEO
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Profitez d'une stratégie alternative souvent négligée par vos concurrents
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
                      <feature.icon className="w-10 h-10 text-orange-400 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                      <p className="text-white/70">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-500/10 to-red-500/10">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Statistiques Bing & Yahoo
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Des chiffres qui parlent d'eux-mêmes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "33% des Recherches Desktop",
                  description: "Part de marché significative souvent ignorée",
                  icon: Search
                },
                {
                  title: "70% moins de Concurrence",
                  description: "Opportunités SEO plus accessibles",
                  icon: Target
                },
                {
                  title: "Audience Premium",
                  description: "Utilisateurs avec pouvoir d'achat élevé",
                  icon: Crown
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center p-6 h-full">
                    <CardContent className="p-0">
                      <stat.icon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-3">{stat.title}</h3>
                      <p className="text-white/70">{stat.description}</p>
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
                Explorez cette Opportunité
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Lancez votre stratégie SEO Bing & Yahoo dès maintenant
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-xl hover:shadow-orange-500/30 text-lg px-8">
                <Link to="/contact">
                  <Zap className="mr-2 h-5 w-5" />
                  Commencer l'Analyse
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

export default BingSEO;