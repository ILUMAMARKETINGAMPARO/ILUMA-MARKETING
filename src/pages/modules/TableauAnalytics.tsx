import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { BarChart3, TrendingUp, Eye, Users, Clock, Target, Zap, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from '@/hooks/useTranslations';
import { AnimatedSection } from '@/components/animations/IlumaAnimations';

const TableauAnalytics = () => {
  const { t } = useTranslations();

  const metrics = [
    {
      title: 'Trafic Total',
      value: '24,847',
      change: '+12.5%',
      icon: Eye,
      color: 'text-[#FFD56B]'
    },
    {
      title: 'Conversions',
      value: '1,240',
      change: '+8.2%',
      icon: Target,
      color: 'text-[#8E44FF]'
    },
    {
      title: 'Score ILA™ Moyen',
      value: '78.5',
      change: '+5.3%',
      icon: TrendingUp,
      color: 'text-[#FFD56B]'
    },
    {
      title: 'Temps Moyen',
      value: '3m 42s',
      change: '+1.8%',
      icon: Clock,
      color: 'text-[#8E44FF]'
    }
  ];

  const campaigns = [
    {
      name: 'Landing Page Restaurant',
      impressions: 15420,
      clicks: 892,
      conversions: 47,
      ctr: 5.8,
      status: 'active'
    },
    {
      name: 'ADLUMA™ E-commerce',
      impressions: 9830,
      clicks: 654,
      conversions: 32,
      ctr: 6.7,
      status: 'active'
    },
    {
      name: 'SEO Local Clinique',
      impressions: 7240,
      clicks: 298,
      conversions: 18,
      ctr: 4.1,
      status: 'paused'
    }
  ];

  const topPages = [
    { page: '/adluma', visits: 4520, bounce: 32.1 },
    { page: '/ila', visits: 3890, bounce: 28.5 },
    { page: '/landing-page-intelligente', visits: 3240, bounce: 25.3 },
    { page: '/lilo', visits: 2870, bounce: 35.8 },
    { page: '/crm', visits: 2450, bounce: 41.2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0E] via-[#1a1a2e] to-[#16213e]">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section - M1 */}
          <AnimatedSection animation="galacticFadeIn" className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BarChart3 className="w-8 h-8 text-[#8E44FF]" />
              <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">Analytics Iluma™</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat'] leading-tight">
              {t('analytics.title') || 'Tableau de Bord Intelligent'}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-['Montserrat']">
              {t('analytics.hero.description') || 'Pilotez vos performances avec une intelligence artificielle avancée et des analyses prédictives en temps réel'}
            </p>
          </AnimatedSection>

          {/* Key Metrics - M2 */}
          <AnimatedSection animation="staggerContainer" className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.8 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.6, delay: index * 0.1 }
                      }
                    }}
                  >
                    <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-sm font-medium ${metric.color}`}>
                          {metric.change}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1 font-['Montserrat']">
                        {metric.value}
                      </h3>
                      <p className="text-white/60 text-sm font-['Montserrat']">
                        {metric.title}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Analytics Tabs - M8 */}
          <AnimatedSection animation="slideInUp" className="mb-16">
            <Tabs defaultValue="campaigns" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
                <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                  <Zap className="w-4 h-4 mr-2" />
                  Campagnes
                </TabsTrigger>
                <TabsTrigger value="traffic" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                  <Globe className="w-4 h-4 mr-2" />
                  Trafic
                </TabsTrigger>
                <TabsTrigger value="conversion" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                  <Target className="w-4 h-4 mr-2" />
                  Conversions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="campaigns">
                <Card className="glass-effect border-white/20 p-6">
                  <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat']">
                    Performance des Campagnes
                  </h3>
                  <div className="space-y-4">
                    {campaigns.map((campaign, index) => (
                      <div key={index} className="bg-black/20 rounded-xl p-4 border border-white/10 hover:border-[#8E44FF]/30 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-medium font-['Montserrat']">
                            {campaign.name}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'active' 
                              ? 'text-[#FFD56B] bg-[#FFD56B]/10' 
                              : 'text-[#8E44FF] bg-[#8E44FF]/10'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-white/60">Impressions</span>
                            <p className="text-white font-medium font-['Montserrat']">
                              {campaign.impressions.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-white/60">Clics</span>
                            <p className="text-white font-medium font-['Montserrat']">
                              {campaign.clicks}
                            </p>
                          </div>
                          <div>
                            <span className="text-white/60">Conversions</span>
                            <p className="text-white font-medium font-['Montserrat']">
                              {campaign.conversions}
                            </p>
                          </div>
                          <div>
                            <span className="text-white/60">CTR</span>
                            <p className="text-[#8E44FF] font-medium font-['Montserrat']">
                              {campaign.ctr}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="traffic">
                <Card className="glass-effect border-white/20 p-6">
                  <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat']">
                    Pages les Plus Visitées
                  </h3>
                  <div className="space-y-4">
                    {topPages.map((page, index) => (
                      <div key={index} className="bg-black/20 rounded-xl p-4 border border-white/10 hover:border-[#8E44FF]/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium font-['Montserrat']">
                            {page.page}
                          </span>
                          <span className="text-[#FFD56B] font-medium font-['Montserrat']">
                            {page.visits} visites
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white/60">Taux de rebond</span>
                              <span className="text-white/80">{page.bounce}%</span>
                            </div>
                            <Progress value={page.bounce} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="conversion">
                <Card className="glass-effect border-white/20 p-6">
                  <h3 className="text-xl font-bold text-white mb-6 font-['Montserrat']">
                    Entonnoir de Conversion
                  </h3>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-white/80 font-['Montserrat']">
                        Analyse IA des parcours de conversion en temps réel
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </AnimatedSection>

          {/* CTA Section - M5 */}
          <AnimatedSection animation="scaleIn" className="text-center">
            <Card className="glass-effect border-white/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                {t('analytics.cta.title') || 'Optimisez Vos Performances'}
              </h2>
              <p className="text-white/80 mb-6 font-['Montserrat']">
                {t('analytics.cta.description') || 'Accédez à des insights avancés et des recommandations personnalisées'}
              </p>
              <Button className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-3 font-['Montserrat'] transition-all duration-300 transform hover:scale-105">
                <BarChart3 className="w-5 h-5 mr-2" />
                {t('analytics.cta.button') || 'Découvrir Plus'}
              </Button>
            </Card>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TableauAnalytics;