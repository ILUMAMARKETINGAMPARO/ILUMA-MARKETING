import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import EvaluationILA from '@/components/EvaluationILA';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import { useTranslations } from '@/hooks/useTranslations';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Target, Eye, CheckCircle, Zap } from 'lucide-react';
import { getMultilingualSEOData } from '@/utils/seoMultilingualEngine';
import { useLanguage } from '@/hooks/useLanguage';

const ILA = () => {
  const { t } = useTranslations();
  const { language } = useLanguage();
  const seoData = getMultilingualSEOData('ila', language);

  const features = [
    {
      icon: BarChart3,
      title: t('modules.ila.features.realTimeAnalysis.title'),
      description: t('modules.ila.features.realTimeAnalysis.description')
    },
    {
      icon: Target,
      title: t('modules.ila.features.competitorBenchmark.title'),
      description: t('modules.ila.features.competitorBenchmark.description')
    },
    {
      icon: CheckCircle,
      title: t('modules.ila.features.actionableTips.title'),
      description: t('modules.ila.features.actionableTips.description')
    },
    {
      icon: TrendingUp,
      title: t('modules.ila.features.progressTracking.title'),
      description: t('modules.ila.features.progressTracking.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
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
        path="/ila"
      />
      
      <Navigation />
      
      <main className="pt-20" id="main-content">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden" aria-labelledby="ila-hero">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <Badge variant="outline" className="mb-6 border-blue-400/30 text-blue-300">
                <Eye className="w-4 h-4 mr-2" />
                {t('modules.ila.subtitle')}
              </Badge>
              <h1 id="ila-hero" className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-gradient">{t('modules.ila.title')}</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {t('modules.ila.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {t('modules.ila.cta.start')}
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  <Eye className="w-5 h-5 mr-2" />
                  {t('modules.ila.cta.getScore')}
                </Button>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/20 hover:border-blue-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
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

            {/* Info Section */}
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t('modules.ila.howItWorks.title')}
              </div>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                {t('modules.ila.howItWorks.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Evaluation Section */}
        <EvaluationILA />
      </main>
      
      <Footer />
    </div>
  );
};

export default ILA;