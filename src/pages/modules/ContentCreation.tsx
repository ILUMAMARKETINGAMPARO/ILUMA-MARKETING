import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { PenTool, Search, FileText, BarChart3, Zap, CheckCircle, ArrowRight, Globe, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTranslations } from '@/hooks/useTranslations';
import SEOManager from '@/components/seo/SEOManager';
import { getMultilingualSEOData } from '@/utils/seoMultilingualEngine';
import { useLanguage } from '@/hooks/useLanguage';

const ContentCreation = () => {
  const { t } = useTranslations();
  const { language } = useLanguage();
  const seoData = getMultilingualSEOData('contentCreation', language);

  const features = [
    {
      icon: Zap,
      title: t('modules.contentCreation.features.aiGeneration.title'),
      description: t('modules.contentCreation.features.aiGeneration.description')
    },
    {
      icon: Search,
      title: t('modules.contentCreation.features.seoOptimized.title'),
      description: t('modules.contentCreation.features.seoOptimized.description')
    },
    {
      icon: FileText,
      title: t('modules.contentCreation.features.multiFormat.title'),
      description: t('modules.contentCreation.features.multiFormat.description')
    },
    {
      icon: BarChart3,
      title: t('modules.contentCreation.features.contentStrategy.title'),
      description: t('modules.contentCreation.features.contentStrategy.description')
    }
  ];

  const stats = [
    {
      number: "500+",
      label: t('modules.contentCreation.stats.content.label'),
      description: t('modules.contentCreation.stats.content.description')
    },
    {
      number: "+280%",
      label: t('modules.contentCreation.stats.engagement.label'),
      description: t('modules.contentCreation.stats.engagement.description')
    },
    {
      number: "+150%",
      label: t('modules.contentCreation.stats.seo.label'),
      description: t('modules.contentCreation.stats.seo.description')
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: t('modules.contentCreation.process.step1.title'),
      description: t('modules.contentCreation.process.step1.description'),
      icon: Target
    },
    {
      number: "02", 
      title: t('modules.contentCreation.process.step2.title'),
      description: t('modules.contentCreation.process.step2.description'),
      icon: BarChart3
    },
    {
      number: "03",
      title: t('modules.contentCreation.process.step3.title'),
      description: t('modules.contentCreation.process.step3.description'),
      icon: PenTool
    },
    {
      number: "04",
      title: t('modules.contentCreation.process.step4.title'),
      description: t('modules.contentCreation.process.step4.description'),
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      quote: t('modules.contentCreation.testimonials.client1.quote'),
      author: t('modules.contentCreation.testimonials.client1.author'),
      company: t('modules.contentCreation.testimonials.client1.company')
    },
    {
      quote: t('modules.contentCreation.testimonials.client2.quote'),
      author: t('modules.contentCreation.testimonials.client2.author'),
      company: t('modules.contentCreation.testimonials.client2.company')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <SEOManager
        seoData={{
          title: seoData.title,
          description: seoData.description,
          keywords: Array.isArray(seoData.keywords) ? seoData.keywords : [seoData.keywords || ''],
          openGraph: {
            title: seoData.title,
            description: seoData.description,
            type: 'website'
          }
        }}
        path="/content-creation"
      />
      
      <Navigation />
      
      <main className="pt-20" id="main-content">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden" aria-labelledby="content-hero">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 border-purple-400/30 text-purple-300">
                <PenTool className="w-4 h-4 mr-2" />
                {t('modules.contentCreation.subtitle')}
              </Badge>
              <h1 id="content-hero" className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-gradient">{t('modules.contentCreation.title')}</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {t('modules.contentCreation.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  asChild
                >
                  <Link to="/contact">
                    <PenTool className="w-5 h-5 mr-2" />
                    {t('modules.contentCreation.cta.button')}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  <FileText className="w-5 h-5 mr-2" />
                  {t('modules.contentCreation.cta.contact')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20" aria-labelledby="features-title">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('modules.contentCreation.features.title')}
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                {t('modules.contentCreation.features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white">{feature.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20" aria-labelledby="stats-title">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="stats-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('modules.contentCreation.benefits.title')}
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                {t('modules.contentCreation.benefits.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-purple-500/30 text-center p-8">
                    <CardContent className="p-0">
                      <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                        {stat.number}
                      </div>
                      <div className="text-xl font-semibold text-white mb-2">
                        {stat.label}
                      </div>
                      <div className="text-white/70">
                        {stat.description}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20" aria-labelledby="process-title">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="process-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('modules.contentCreation.process.title')}
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                {t('modules.contentCreation.process.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <Badge variant="outline" className="border-purple-400/30 text-purple-300 mx-auto mb-2">
                        {step.number}
                      </Badge>
                      <CardTitle className="text-white">{step.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20" aria-labelledby="testimonials-title">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="testimonials-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('modules.contentCreation.testimonials.title')}
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                {t('modules.contentCreation.testimonials.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-purple-500/30 p-6">
                    <CardContent className="p-0">
                      <div className="text-white/80 mb-4 italic">
                        "{testimonial.quote}"
                      </div>
                      <div className="text-white font-semibold">
                        {testimonial.author}
                      </div>
                      <div className="text-purple-300 text-sm">
                        {testimonial.company}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" aria-labelledby="cta-section">
          <div className="container mx-auto px-4">
            <Card className="glass-effect border-purple-500/30 max-w-4xl mx-auto">
              <CardContent className="p-12 text-center">
                <Globe className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h3 id="cta-section" className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Prêt à révolutionner votre contenu ?
                </h3>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                  Découvrez comment notre IA peut transformer votre stratégie de contenu et booster votre visibilité
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    asChild
                  >
                    <Link to="/contact">
                      <PenTool className="w-5 h-5 mr-2" />
                      {t('modules.contentCreation.cta.button')}
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/20 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/contact">
                      <FileText className="w-5 h-5 mr-2" />
                      {t('modules.contentCreation.cta.contact')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContentCreation;