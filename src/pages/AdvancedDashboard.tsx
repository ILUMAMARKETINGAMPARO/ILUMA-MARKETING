import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import AdvancedAnalytics from '@/components/analytics/AdvancedAnalytics';
import GamificationSystem from '@/components/gamification/GamificationSystem';
import SmartExportSystem from '@/components/exports/SmartExportSystem';
import ModuleMetricsDashboard from '@/components/analytics/ModuleMetricsDashboard';
import SmartWorkflowEngine from '@/components/automation/SmartWorkflowEngine';
import RealTimeSyncIndicator from '@/components/sync/RealTimeSyncIndicator';
import SEOHead from '@/components/seo/SEOHead';
import { useTranslations } from '@/hooks/useTranslations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Trophy, 
  Download, 
  Settings, 
  Users,
  Zap,
  TrendingUp,
  Target,
  Brain
} from 'lucide-react';

const AdvancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const { t } = useTranslations();

  const dashboardStats = {
    totalUsers: 2847,
    activeProjects: 42,
    conversionRate: 23.5,
    aiScore: 89
  };

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-primary/10 to-black">
        <Navigation />
        
        <main className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white font-['Montserrat'] mb-4">
                {t('advanceddashboard.title')}
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                {t('dashboard.subtitle')}
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <Card className="glass-effect border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">{t('dashboard.totalUsers')}</p>
                      <p className="text-2xl font-bold text-white">{dashboardStats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">{t('dashboard.activeProjects')}</p>
                      <p className="text-2xl font-bold text-white">{dashboardStats.activeProjects}</p>
                    </div>
                    <Target className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">{t('dashboard.conversionRate')}</p>
                      <p className="text-2xl font-bold text-white">{dashboardStats.conversionRate}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">{t('dashboard.aiScore')}</p>
                      <p className="text-2xl font-bold text-white">{dashboardStats.aiScore}</p>
                    </div>
                    <Brain className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Dashboard Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-white/10 border border-white/20">
                  <TabsTrigger 
                    value="analytics" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    {t('dashboard.analytics')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="automation"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {t('dashboard.automation')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gamification"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    {t('dashboard.gamification')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="exports"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('dashboard.exports')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {t('dashboard.settings')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analytics" className="mt-6">
                  <div className="space-y-8">
                    <ModuleMetricsDashboard />
                    <AdvancedAnalytics />
                  </div>
                </TabsContent>

                <TabsContent value="automation" className="mt-6">
                  <SmartWorkflowEngine />
                </TabsContent>

                <TabsContent value="gamification" className="mt-6">
                  <GamificationSystem />
                </TabsContent>

                <TabsContent value="exports" className="mt-6">
                  <SmartExportSystem 
                    data={{
                      analytics: dashboardStats,
                      modules: ['adluma', 'ila', 'crm'],
                      performance: { score: 95, metrics: [] }
                    }} 
                    moduleType="dashboard" 
                  />
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <Card className="glass-effect border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-white font-['Montserrat'] flex items-center">
                        <Settings className="w-5 h-5 mr-2 text-primary" />
                        {t('dashboard.advancedSettings')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-white font-['Montserrat'] font-semibold">{t('dashboard.analytics')}</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <span className="text-white">{t('dashboard.realTimeData')}</span>
                              <Button size="sm" className="bg-green-500 text-white">{t('dashboard.active')}</Button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <span className="text-white">{t('dashboard.predictiveAi')}</span>
                              <Button size="sm" className="bg-green-500 text-white">{t('dashboard.active')}</Button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <span className="text-white">{t('dashboard.autoReports')}</span>
                              <Button size="sm" variant="outline" className="border-yellow-400 text-yellow-400">{t('dashboard.configure')}</Button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-white font-['Montserrat'] font-semibold">Notifications</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <span className="text-white">{t('dashboard.criticalAlerts')}</span>
                              <Button size="sm" className="bg-green-500 text-white">{t('dashboard.active')}</Button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <span className="text-white">{t('dashboard.weeklyReports')}</span>
                              <Button size="sm" className="bg-green-500 text-white">{t('dashboard.active')}</Button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <span className="text-white">{t('dashboard.personalizedInsights')}</span>
                              <Button size="sm" variant="outline" className="border-primary text-primary">{t('dashboard.beta')}</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>

        <Footer />
        <RealTimeSyncIndicator />
      </div>
    </>
  );
};

export default AdvancedDashboard;