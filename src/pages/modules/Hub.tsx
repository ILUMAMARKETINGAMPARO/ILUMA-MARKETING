import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Zap, Settings, BarChart, Users, Bell, Link, ArrowRight, Activity, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
import HubMetrics from '@/components/hub/HubMetrics';
import HubServices from '@/components/hub/HubServices';
import HubActivity from '@/components/hub/HubActivity';
import HubSettings from '@/components/hub/HubSettings';
import HubOverview from '@/components/hub/HubOverview';

const Hub = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      name: 'SEO-IA',
      status: 'active' as const,
      performance: 94,
      leads: 127,
      trend: '+23%',
      color: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Landing Pages',
      status: 'active' as const, 
      performance: 87,
      leads: 89,
      trend: '+15%',
      color: 'from-purple-400 to-pink-500'
    },
    {
      name: 'BlogIA',
      status: 'active' as const,
      performance: 76,
      leads: 54,
      trend: '+8%',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'ADLUMA',
      status: 'pending' as const,
      performance: 0,
      leads: 0,
      trend: 'N/A',
      color: 'from-gray-400 to-gray-600'
    }
  ];

  const metrics = [
    { label: 'Leads Totaux', value: '1,247', change: '+34%', icon: Users },
    { label: 'Taux Conversion', value: '12.4%', change: '+2.1%', icon: TrendingUp },
    { label: 'Services Actifs', value: '6', change: '+2', icon: Zap },
    { label: 'Score ILA Moyen', value: '89', change: '+5', icon: BarChart }
  ];

  const recentActivities = [
    { action: 'Nouveau lead généré', service: 'SEO-IA', time: '2 min', type: 'success' as const },
    { action: 'Campagne terminée', service: 'Landing Pages', time: '15 min', type: 'info' as const },
    { action: 'Optimisation automatique', service: 'BlogIA', time: '1h', type: 'update' as const },
    { action: 'Rapport généré', service: 'Analytics', time: '2h', type: 'info' as const }
  ];

  return (
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
              <Zap className="w-8 h-8 text-purple-400" />
              <span className="text-purple-300 font-medium text-lg">HUB CENTRAL</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
              Centre de Contrôle
              <br />
              <span className="text-4xl md:text-6xl">Iluma™</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Gérez tous vos services Iluma™ depuis une interface unifiée. 
              Surveillez les performances, optimisez les résultats.
            </p>
          </motion.div>

          {/* Metrics Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <HubMetrics metrics={metrics} />
          </motion.div>

          {/* Main Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
                <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
                  <BarChart className="w-4 h-4 mr-2" />
                  Vue d'ensemble
                </TabsTrigger>
                <TabsTrigger value="services" className="data-[state=active]:bg-purple-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">
                  <Activity className="w-4 h-4 mr-2" />
                  Activité
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <HubOverview />
              </TabsContent>

              <TabsContent value="services">
                <HubServices services={services} />
              </TabsContent>

              <TabsContent value="activity">
                <HubActivity activities={recentActivities} />
              </TabsContent>

              <TabsContent value="settings">
                <HubSettings />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hub;