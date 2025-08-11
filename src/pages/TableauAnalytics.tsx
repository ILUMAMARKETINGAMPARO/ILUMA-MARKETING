import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';

import { useLiloUX } from '@/hooks/useLiloUX';
import { useTranslations } from '@/hooks/useTranslations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Users, 
  Target, 
  Zap,
  Sparkles,
  Clock,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TableauAnalytics = () => {
  const { t } = useTranslations();
  const { liloMood, liloMessage, handleCTAHighlight } = useLiloUX();
  const [activeView, setActiveView] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  const kpis = [
    {
      title: "Visiteurs uniques",
      value: "12,847",
      change: "+23%",
      trend: "up",
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "Taux de conversion",
      value: "4.2%",
      change: "+0.8%",
      trend: "up", 
      icon: Target,
      color: "text-green-400"
    },
    {
      title: "Score SEO moyen",
      value: "87/100",
      change: "+12",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-400"
    },
    {
      title: "Temps de chargement",
      value: "1.2s",
      change: "-0.3s",
      trend: "up",
      icon: Zap,
      color: "text-yellow-400"
    }
  ];

  const channels = [
    { name: "Recherche organique", value: 45, color: "bg-green-500" },
    { name: "Réseaux sociaux", value: 25, color: "bg-blue-500" },
    { name: "Trafic direct", value: 20, color: "bg-purple-500" },
    { name: "Publicité payante", value: 10, color: "bg-yellow-500" }
  ];

  const alerts = [
    {
      type: "success",
      title: "Pic de trafic détecté",
      message: "Augmentation de 340% sur votre article 'SEO IA'",
      time: "Il y a 2h"
    },
    {
      type: "warning", 
      title: "Opportunité d'amélioration",
      message: "Page /services a un taux de rebond élevé (78%)",
      time: "Il y a 4h"
    },
    {
      type: "info",
      title: "Rapport mensuel disponible",
      message: "Vos métriques de novembre sont prêtes",
      time: "Il y a 1j"
    }
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      default: return Lightbulb;
    }
  };

  const getAlertColor = (type: string) => {
    switch(type) {
      case 'success': return 'text-green-400 border-green-400/30';
      case 'warning': return 'text-yellow-400 border-yellow-400/30';
      default: return 'text-blue-400 border-blue-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-full px-6 py-2 mb-6">
                <BarChart3 className="w-5 h-5 text-[#FFD56B]" />
                <span className="text-white font-['Montserrat']">Analytics Iluma™</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
                Tableau de Bord{' '}
                <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">
                  Intelligent
                </span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto font-['Montserrat']">
                Visualisez, analysez et optimisez vos performances en temps réel avec l'intelligence artificielle.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </motion.div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {kpis.map((kpi, index) => {
                const IconComponent = kpi.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/40 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between mb-4">
                          <IconComponent className={`w-8 h-8 ${kpi.color}`} />
                          <Badge className={`${kpi.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {kpi.change}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1 font-['Montserrat']">{kpi.value}</div>
                        <p className="text-white/70 text-sm font-['Montserrat']">{kpi.title}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Dashboard */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-black/40 mb-8">
                <TabsTrigger value="overview" className="font-['Montserrat']">
                  <Eye className="w-4 h-4 mr-2" />
                  Vue d'ensemble
                </TabsTrigger>
                <TabsTrigger value="traffic" className="font-['Montserrat']">
                  <Users className="w-4 h-4 mr-2" />
                  Trafic
                </TabsTrigger>
                <TabsTrigger value="conversions" className="font-['Montserrat']">
                  <Target className="w-4 h-4 mr-2" />
                  Conversions
                </TabsTrigger>
                <TabsTrigger value="alerts" className="font-['Montserrat']">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Alertes IA
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Traffic Sources */}
                  <Card className="glass-effect border-white/20 p-6">
                    <CardHeader>
                      <CardTitle className="text-white font-['Montserrat']">Sources de trafic</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {channels.map((channel, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white/80 font-['Montserrat']">{channel.name}</span>
                              <span className="text-white font-['Montserrat']">{channel.value}%</span>
                            </div>
                            <Progress value={channel.value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Chart Placeholder */}
                  <Card className="glass-effect border-white/20 p-6">
                    <CardHeader>
                      <CardTitle className="text-white font-['Montserrat']">Évolution des performances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white/5 rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="w-12 h-12 text-[#8E44FF] mx-auto mb-4" />
                          <p className="text-white/80 font-['Montserrat']">Graphique interactif des performances</p>
                          <p className="text-white/60 text-sm font-['Montserrat']">Données en temps réel</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="traffic" className="mt-6">
                <Card className="glass-effect border-white/20 p-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-white mb-6 font-['Montserrat']">
                      Analyse du trafic détaillée
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">8,429</div>
                        <p className="text-white/70 text-sm font-['Montserrat']">Sessions aujourd'hui</p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <Clock className="w-8 h-8 text-green-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">2m 34s</div>
                        <p className="text-white/70 text-sm font-['Montserrat']">Durée moyenne</p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <Eye className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">3.2</div>
                        <p className="text-white/70 text-sm font-['Montserrat']">Pages par session</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conversions" className="mt-6">
                <Card className="glass-effect border-white/20 p-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-white mb-6 font-['Montserrat']">
                      Entonnoir de conversion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { step: "Visiteurs", value: 12847, percentage: 100 },
                        { step: "Pages vues", value: 8934, percentage: 69.5 },
                        { step: "Formulaires vus", value: 2156, percentage: 16.8 },
                        { step: "Formulaires remplis", value: 542, percentage: 4.2 },
                        { step: "Conversions finales", value: 147, percentage: 1.1 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="text-white font-['Montserrat']">{item.step}</h4>
                            <p className="text-white/60 text-sm">{item.percentage}% du trafic total</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">{item.value.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="mt-6">
                <div className="space-y-6">
                  {alerts.map((alert, index) => {
                    const IconComponent = getIcon(alert.type);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className={`glass-effect border ${getAlertColor(alert.type)} p-6`}>
                          <CardContent className="p-0">
                            <div className="flex items-start gap-4">
                              <IconComponent className={`w-6 h-6 mt-1 ${alert.type === 'success' ? 'text-green-400' : alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`} />
                              <div className="flex-1">
                                <h3 className="font-bold text-white mb-1 font-['Montserrat']">{alert.title}</h3>
                                <p className="text-white/80 mb-2 font-['Montserrat']">{alert.message}</p>
                                <span className="text-white/60 text-sm font-['Montserrat']">{alert.time}</span>
                              </div>
                              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                Voir détails
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="glass-effect border-white/20 p-8">
                <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                  Optimisez vos performances avec l'IA
                </h2>
                <p className="text-white/80 mb-6 font-['Montserrat']">
                  Découvrez comment notre dashboard peut transformer votre stratégie digitale
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Demander une démo
                    </Button>
                  </Link>
                  <Link to="/hub">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
                    >
                      <Target className="w-5 h-5 mr-2" />
                      Accéder au HUB
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>


      <Footer />
    </div>
  );
};

export default TableauAnalytics;