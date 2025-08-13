import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Heart, ArrowRight, Zap, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/useTranslations';
import FidelityMetrics from '@/components/fidelisation/FidelityMetrics';
import FidelityFeatures from '@/components/fidelisation/FidelityFeatures';
import NurturingInterface from '@/components/fidelisation/NurturingInterface';
import FidelityAnalytics from '@/components/fidelisation/FidelityAnalytics';
import FidelisationSEO from '@/components/seo/FidelisationSEO';

const PageFidelisationIntelligente = () => {
  const { t } = useTranslations();

  return (
    <>
      <FidelisationSEO />
      
      <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
        <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-pink-400" />
              <span className="text-pink-300 font-medium text-lg">{t('pageFidelisation.hero.badge')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-6 font-['Montserrat']">
              {t('pageFidelisation.hero.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
              {t('pageFidelisation.hero.subtitle')}
            </p>
          </motion.div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <FidelityMetrics />
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <FidelityFeatures />
          </motion.div>

          {/* Main Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Tabs defaultValue="nurturing" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
                <TabsTrigger value="nurturing" className="data-[state=active]:bg-pink-600">
                  <Heart className="w-4 h-4 mr-2" />
                  {t('pageFidelisation.tabs.nurturing')}
                </TabsTrigger>
                <TabsTrigger value="segmentation" className="data-[state=active]:bg-pink-600">
                  <Shield className="w-4 h-4 mr-2" />
                  {t('pageFidelisation.tabs.segmentation')}
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-600">
                  <Zap className="w-4 h-4 mr-2" />
                  {t('pageFidelisation.tabs.analytics')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="nurturing">
                <NurturingInterface />
              </TabsContent>

              <TabsContent value="segmentation">
                <FidelityAnalytics />
              </TabsContent>

              <TabsContent value="analytics">
                <FidelityAnalytics />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="flex justify-center">
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-2xl shadow-pink-500/25 hover:shadow-pink-500/40 transform hover:scale-105 transition-all duration-300 px-12 py-6 text-lg font-bold">
                <Zap className="w-6 h-6 mr-3" />
                {t('pageFidelisation.cta.button')}
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
};

export default PageFidelisationIntelligente;