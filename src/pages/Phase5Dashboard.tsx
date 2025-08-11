import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { BarChart3, Brain, TrendingUp, Zap, Eye, Target, Activity, Layers } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdvancedAnalytics from '@/components/phase5/AdvancedAnalytics';
import PredictiveInsights from '@/components/phase5/PredictiveInsights';
import RealTimeMonitoring from '@/components/phase5/RealTimeMonitoring';
import MPEControlCenter from '@/components/phase5/MPEControlCenter';
import { ILAProvider } from '@/contexts/ILAContext';
import { useTranslations } from '@/hooks/useTranslations';

const Phase5Dashboard = () => {
  const { t } = useTranslations();

  return (
    <ILAProvider>
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
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
                <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
                <span className="text-purple-300 font-medium text-lg">PHASE 5</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
                {t('phase5.title')}
                <br />
                <span className="text-4xl md:text-6xl">{t('phase5.predictions.title')}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Explorez l'avenir du marketing digital avec des analyses prédictives, 
                du monitoring en temps réel et des insights d'intelligence artificielle.
              </p>
            </motion.div>

            {/* Advanced Dashboard Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="analytics" className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    {t('phase5.analytics.title')}
                  </TabsTrigger>
                  <TabsTrigger value="predictions" className="data-[state=active]:bg-purple-600">
                    <Brain className="w-4 h-4 mr-2" />
                    {t('phase5.predictions.title')}
                  </TabsTrigger>
                  <TabsTrigger value="monitoring" className="data-[state=active]:bg-purple-600">
                    <Activity className="w-4 h-4 mr-2" />
                    {t('phase5.monitoring.title')}
                  </TabsTrigger>
                  <TabsTrigger value="control" className="data-[state=active]:bg-purple-600">
                    <Layers className="w-4 h-4 mr-2" />
                    {t('phase5.control.title')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analytics">
                  <AdvancedAnalytics />
                </TabsContent>

                <TabsContent value="predictions">
                  <PredictiveInsights />
                </TabsContent>

                <TabsContent value="monitoring">
                  <RealTimeMonitoring />
                </TabsContent>

                <TabsContent value="control">
                  <MPEControlCenter />
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

export default Phase5Dashboard;
