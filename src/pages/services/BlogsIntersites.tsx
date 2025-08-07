import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { PenTool, Network, Globe, Zap, CheckCircle, ArrowRight, FileText, Search, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useTranslations } from '@/hooks/useTranslations';
import SEOManager from '@/components/seo/SEOManager';
import { getMultilingualSEOData } from '@/utils/seoMultilingualEngine';
import { useLanguage } from '@/hooks/useLanguage';

const BlogsIntersites = () => {
  const { t } = useTranslations();
  const { language } = useLanguage();
  const seoData = getMultilingualSEOData('contentCreation', language);

  const features = [
    {
      icon: Zap,
      title: t('services.contentCreation.features.aiGeneration.title'),
      description: t('services.contentCreation.features.aiGeneration.description')
    },
    {
      icon: Search,
      title: t('services.contentCreation.features.seoOptimized.title'),
      description: t('services.contentCreation.features.seoOptimized.description')
    },
    {
      icon: FileText,
      title: t('services.contentCreation.features.multiFormat.title'),
      description: t('services.contentCreation.features.multiFormat.description')
    },
    {
      icon: BarChart3,
      title: t('services.contentCreation.features.contentStrategy.title'),
      description: t('services.contentCreation.features.contentStrategy.description')
    }
  ];

  const stats = [
    {
      number: "500+",
      label: t('services.contentCreation.stats.content.label') || "Contenus/Mois",
      description: t('services.contentCreation.stats.content.description') || "Articles, blogs et contenus web générés"
    },
    {
      number: "+280%",
      label: t('services.contentCreation.stats.engagement.label') || "Engagement",
      description: t('services.contentCreation.stats.engagement.description') || "Augmentation moyenne de l'engagement"
    },
    {
      number: "+150%",
      label: t('services.contentCreation.stats.seo.label') || "Ranking SEO",
      description: t('services.contentCreation.stats.seo.description') || "Amélioration du positionnement Google"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B0E] via-[#1a1a2e] to-[#16213e]">
      <SEOManager 
        seoData={seoData}
        path="/services/blogs-intersites"
      />

      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="w-8 h-8 text-[#8E44FF]" />
              <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">
                {t('services.contentCreation.subtitle')}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
              {t('services.contentCreation.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat'] mb-8">
              {t('services.contentCreation.description')}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat']">
                  {t('services.contentCreation.cta.button')}
                </Button>
              </Link>
              <Link to="/adluma">
                <Button size="lg" variant="outline" className="border-[#8E44FF] text-[#8E44FF] hover:bg-[#8E44FF] hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 font-['Montserrat']">
                  {t('common.calculateRoi') || 'Calculer mon ROI'}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                Excellence Création de Contenu IA
              </h2>
              <p className="text-xl text-white/70 font-['Montserrat']">
                Expertise technique combinée à l'intelligence artificielle pour du contenu performant
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="glass-effect border-[#8E44FF]/20 p-8 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-xl flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed font-['Montserrat']">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Content Creation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                {t('services.contentCreation.benefits.title')}
              </h2>
              <p className="text-xl text-white/70 font-['Montserrat']">
                {t('services.contentCreation.benefits.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center"
                >
                  <Card className="glass-effect border-[#8E44FF]/20 p-8">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-2 font-['Montserrat']">
                      {stat.number}
                    </div>
                    <div className="text-xl font-semibold text-white mb-2 font-['Montserrat']">
                      {stat.label}
                    </div>
                    <div className="text-white/70 font-['Montserrat']">
                      {stat.description}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Card className="glass-effect border-[#8E44FF]/20 p-12">
              <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                {t('services.contentCreation.cta.title')}
              </h2>
              <p className="text-xl text-white/70 mb-8 font-['Montserrat']">
                {t('services.contentCreation.cta.description')}
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat'] group">
                  <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  {t('services.contentCreation.cta.button')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogsIntersites;
