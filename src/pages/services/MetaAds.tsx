import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  Megaphone,
  Eye,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const MetaAds = () => {
  const { t } = useLanguage();
  
  const seoData = {
    title: t('services.metaAds.title') + ' | Iluma™',
    description: t('services.metaAds.description'),
    keywords: ['meta ads', 'facebook ads', 'instagram ads', 'publicité sociale', 'retargeting', 'lookalike audiences']
  };

  const features = [
    {
      icon: Users,
      title: t('services.metaAds.features.multiPlatform.title'),
      description: t('services.metaAds.features.multiPlatform.description')
    },
    {
      icon: Target,
      title: t('services.metaAds.features.lookalike.title'),
      description: t('services.metaAds.features.lookalike.description')
    },
    {
      icon: Eye,
      title: t('services.metaAds.features.retargeting.title'),
      description: t('services.metaAds.features.retargeting.description')
    },
    {
      icon: BarChart3,
      title: t('services.metaAds.features.attribution.title'),
      description: t('services.metaAds.features.attribution.description')
    }
  ];

  return (
    <>
      <SEOManager seoData={seoData} path="/services/meta-ads" />
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
              <Badge className="mb-6 bg-gradient-to-r from-[#B88EFF] to-[#FFD56B] text-black">
                <Megaphone className="w-4 h-4 mr-2" />
                Meta Marketing
              </Badge>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('services.metaAds.title')}
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl">
                {t('services.metaAds.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                {t('services.metaAds.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-[#B88EFF] to-[#FFD56B] text-black hover:shadow-lg hover:shadow-[#B88EFF]/25">
                <Link to="/contact">
                  Lancer ma Campagne
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/modules/adluma">
                  Tester ADLUMA™
                  <Eye className="ml-2 h-5 w-5" />
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
                Excellence Meta Publicitaire
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Maîtrise complète de l'écosystème publicitaire Meta pour maximiser votre retour sur investissement
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
                      <feature.icon className="w-10 h-10 text-[#B88EFF] mb-4" />
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
        <section className="py-20 px-4 bg-gradient-to-r from-[#B88EFF]/10 to-[#FFD56B]/10">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Pourquoi Choisir Meta Ads ?
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                La puissance combinée de Facebook et Instagram pour une portée maximale
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "3.8 Milliards d'Utilisateurs",
                  description: "Accès à la plus grande audience mondiale",
                  icon: Users
                },
                {
                  title: "Ciblage Ultra-Précis",
                  description: "600+ options de ciblage démographique et comportemental",
                  icon: Target
                },
                {
                  title: "ROI Exceptionnel",
                  description: "Retour sur investissement moyen de 520% pour nos clients",
                  icon: BarChart3
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
                      <benefit.icon className="w-12 h-12 text-[#FFD56B] mx-auto mb-4" />
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
                Prêt à Dominer Meta ?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Lancez vos premières campagnes Meta Ads optimisées IA dès aujourd'hui
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-[#B88EFF] to-[#FFD56B] text-black hover:shadow-xl hover:shadow-[#B88EFF]/30 text-lg px-8">
                <Link to="/contact">
                  <Heart className="mr-2 h-5 w-5" />
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

export default MetaAds;