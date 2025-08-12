import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Settings, Monitor, AlertTriangle, TrendingUp, Gauge, Wrench, Zap, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/hooks/useTranslations';

const Phase4Dashboard = () => {
  const { t } = useTranslations();

  const optimizationMetrics = [
    { label: 'Performance SEO', value: 92, color: 'bg-green-500' },
    { label: 'Conversion Rate', value: 78, color: 'bg-blue-500' },
    { label: 'User Experience', value: 85, color: 'bg-purple-500' },
    { label: 'Technical Score', value: 96, color: 'bg-cyan-500' }
  ];

  const monitoringAlerts = [
    { type: 'success', message: 'Trafic organique +15% cette semaine', time: '2 min' },
    { type: 'warning', message: 'Vitesse de chargement ralentie sur mobile', time: '1h' },
    { type: 'info', message: 'Nouveau mot-clé dans le top 3', time: '3h' },
    { type: 'success', message: 'Taux de conversion amélioré de 8%', time: '1 jour' }
  ];

  const aiOptimizations = [
    {
      title: 'Optimisation automatique des balises',
      description: 'IA a mis à jour 12 meta descriptions',
      impact: '+5% CTR',
      confidence: 94
    },
    {
      title: 'Ajustement des enchères publicitaires',
      description: 'Redistribution intelligente du budget',
      impact: '-12% CPC',
      confidence: 87
    },
    {
      title: 'Optimisation du contenu',
      description: 'Suggestions de mots-clés implémentées',
      impact: '+8 positions',
      confidence: 91
    }
  ];

  const performanceData = [
    { period: 'Cette semaine', traffic: '+18%', conversions: '+12%', revenue: '+24%' },
    { period: 'Ce mois', traffic: '+32%', conversions: '+28%', revenue: '+45%' },
    { period: 'Ce trimestre', traffic: '+67%', conversions: '+52%', revenue: '+89%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900/20 to-black">
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
              <Settings className="w-8 h-8 text-blue-400 animate-pulse" />
              <span className="text-blue-300 font-medium text-lg">PHASE 4</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6">
              Optimisation
              <br />
              <span className="text-4xl md:text-6xl">Continue</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Surveillance intelligente et amélioration permanente de vos performances 
              grâce à l'IA et aux analyses prédictives.
            </p>
          </motion.div>

          {/* Dashboard Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="monitoring" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
                <TabsTrigger value="monitoring" className="data-[state=active]:bg-blue-600">
                  <Monitor className="w-4 h-4 mr-2" />
                  Surveillance
                </TabsTrigger>
                <TabsTrigger value="optimization" className="data-[state=active]:bg-blue-600">
                  <Wrench className="w-4 h-4 mr-2" />
                  Optimisations
                </TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance
                </TabsTrigger>
                <TabsTrigger value="ai-engine" className="data-[state=active]:bg-blue-600">
                  <Bot className="w-4 h-4 mr-2" />
                  IA Engine
                </TabsTrigger>
              </TabsList>

              <TabsContent value="monitoring" className="space-y-6">
                {/* Real-time Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {optimizationMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="bg-black/40 border-white/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm text-white/70">{metric.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-white mb-2">{metric.value}%</div>
                          <Progress value={metric.value} className="h-2" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Monitoring Alerts */}
                <Card className="bg-black/40 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Alertes et Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {monitoringAlerts.map((alert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            alert.type === 'success' ? 'bg-green-400' :
                            alert.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                          }`} />
                          <span className="text-white">{alert.message}</span>
                        </div>
                        <span className="text-white/60 text-sm">il y a {alert.time}</span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="optimization" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {aiOptimizations.map((optimization, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-black/40 border-white/20">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-white">{optimization.title}</CardTitle>
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              {optimization.impact}
                            </Badge>
                          </div>
                          <CardDescription className="text-white/70">
                            {optimization.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-white/60">Confiance IA</span>
                            <span className="text-white font-medium">{optimization.confidence}%</span>
                          </div>
                          <Progress value={optimization.confidence} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {performanceData.map((period, index) => (
                    <motion.div
                      key={period.period}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-black/40 border-white/20">
                        <CardHeader>
                          <CardTitle className="text-white">{period.period}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-white/70">Trafic</span>
                            <span className="text-green-400 font-medium">{period.traffic}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Conversions</span>
                            <span className="text-blue-400 font-medium">{period.conversions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Revenus</span>
                            <span className="text-purple-400 font-medium">{period.revenue}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ai-engine" className="space-y-6">
                <Card className="bg-black/40 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Moteur d'Optimisation IA
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Intelligence artificielle en action continue pour améliorer vos performances
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="text-center p-4 rounded-lg bg-white/5">
                        <Gauge className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">24/7</div>
                        <div className="text-white/70 text-sm">Surveillance active</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-white/5">
                        <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">127</div>
                        <div className="text-white/70 text-sm">Optimisations automatiques</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-white/5">
                        <Bot className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">95%</div>
                        <div className="text-white/70 text-sm">Précision prédictive</div>
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
    </div>
  );
};

export default Phase4Dashboard;