import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Brain, Cpu, TrendingUp, Sparkles, Activity, BarChart3, Zap, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIAnalyticsEngine from '@/components/phase8/AIAnalyticsEngine';
import PredictiveModeling from '@/components/phase8/PredictiveModeling';
import MLInsightsDashboard from '@/components/phase8/MLInsightsDashboard';
import AdvancedReporting from '@/components/phase8/AdvancedReporting';
import { ILAProvider } from '@/contexts/ILAContext';
import { useTranslations } from '@/hooks/useTranslations';

const Phase8Dashboard = () => {
  const { t } = useTranslations();

  return (
    <ILAProvider>
      <div className="min-h-screen bg-gradient-to-b from-black via-cyan-900/20 to-black">
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
                <Brain className="w-8 h-8 text-cyan-400 animate-pulse" />
                <span className="text-cyan-300 font-medium text-lg">PHASE 8</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent mb-6">
                {t('phase8.title')}
                <br />
                <span className="text-4xl md:text-6xl">{t('phase8.predictive.title')}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Explorez l'avenir du marketing avec des analyses IA de pointe, 
                des modèles prédictifs avancés et des insights basés sur l'apprentissage automatique.
              </p>
            </motion.div>

            {/* AI Analytics Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="analytics" className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-600">
                    <Brain className="w-4 h-4 mr-2" />
                    {t('phase8.engine.title')}
                  </TabsTrigger>
                  <TabsTrigger value="predictive" className="data-[state=active]:bg-cyan-600">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {t('phase8.predictive.title')}
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="data-[state=active]:bg-cyan-600">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t('phase8.insights.title')}
                  </TabsTrigger>
                  <TabsTrigger value="reporting" className="data-[state=active]:bg-cyan-600">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    {t('phase8.reporting.title')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analytics">
                  <AIAnalyticsEngine />
                </TabsContent>

                <TabsContent value="predictive">
                  <PredictiveModeling />
                </TabsContent>

                <TabsContent value="insights">
                  <MLInsightsDashboard />
                </TabsContent>

                <TabsContent value="reporting">
                  <AdvancedReporting />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </ILAProvider>
  );
};

export default Phase8Dashboard;