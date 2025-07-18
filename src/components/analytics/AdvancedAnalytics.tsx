import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Target, 
  Brain,
  Zap,
  BarChart3,
  LineChart,
  PieChart,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  pageViews: number;
  uniqueUsers: number;
  avgSessionDuration: number;
  conversionRate: number;
  liloInteractions: number;
  moduleEngagement: {
    adluma: number;
    ila: number;
    crm: number;
    blog: number;
  };
  realTimeMetrics: {
    activeUsers: number;
    currentPage: string;
    loadTime: number;
  };
  aiInsights: {
    userBehaviorScore: number;
    optimizationSuggestions: string[];
    predictedConversion: number;
  };
}

const AdvancedAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueUsers: 0,
    avgSessionDuration: 0,
    conversionRate: 0,
    liloInteractions: 0,
    moduleEngagement: {
      adluma: 0,
      ila: 0,
      crm: 0,
      blog: 0
    },
    realTimeMetrics: {
      activeUsers: 0,
      currentPage: '',
      loadTime: 0
    },
    aiInsights: {
      userBehaviorScore: 0,
      optimizationSuggestions: [],
      predictedConversion: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAnalyticsData();
    
    // Real-time updates every 30 seconds
    const interval = setInterval(loadAnalyticsData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    
    // Simulate API call - replace with actual analytics service
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data with realistic values
    setAnalyticsData({
      pageViews: Math.floor(Math.random() * 10000) + 5000,
      uniqueUsers: Math.floor(Math.random() * 2000) + 1000,
      avgSessionDuration: Math.floor(Math.random() * 300) + 120,
      conversionRate: Math.floor(Math.random() * 15) + 5,
      liloInteractions: Math.floor(Math.random() * 500) + 200,
      moduleEngagement: {
        adluma: Math.floor(Math.random() * 40) + 30,
        ila: Math.floor(Math.random() * 35) + 25,
        crm: Math.floor(Math.random() * 30) + 20,
        blog: Math.floor(Math.random() * 25) + 15
      },
      realTimeMetrics: {
        activeUsers: Math.floor(Math.random() * 50) + 10,
        currentPage: '/',
        loadTime: Math.random() * 2 + 1
      },
      aiInsights: {
        userBehaviorScore: Math.floor(Math.random() * 30) + 70,
        optimizationSuggestions: [
          "Améliorer le CTA principal sur ADLUMA™",
          "Optimiser le formulaire ILA™ pour mobile",
          "Ajouter plus d'interactions LILO™"
        ],
        predictedConversion: Math.floor(Math.random() * 20) + 15
      }
    });
    
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAnalyticsData();
    setRefreshing(false);
  };

  const exportReport = () => {
    const reportData = {
      ...analyticsData,
      generatedAt: new Date().toISOString(),
      reportType: 'Advanced Analytics'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iluma-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-['Montserrat']">Chargement des analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-primary/10 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white font-['Montserrat'] mb-2">
              Analytics Avancées
            </h1>
            <p className="text-white/70">
              Tableau de bord intelligent avec IA prédictive
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button 
              onClick={exportReport}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </motion.div>

        {/* KPI Cards */}
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
                  <p className="text-white/60 text-sm font-['Montserrat']">Vues de page</p>
                  <p className="text-2xl font-bold text-white">{analyticsData.pageViews.toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-['Montserrat']">Utilisateurs uniques</p>
                  <p className="text-2xl font-bold text-white">{analyticsData.uniqueUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
              <div className="mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+8.3%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-['Montserrat']">Durée moyenne</p>
                  <p className="text-2xl font-bold text-white">{Math.floor(analyticsData.avgSessionDuration / 60)}m {analyticsData.avgSessionDuration % 60}s</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+15.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-['Montserrat']">Conversion</p>
                  <p className="text-2xl font-bold text-white">{analyticsData.conversionRate}%</p>
                </div>
                <Target className="w-8 h-8 text-green-400" />
              </div>
              <div className="mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+5.7%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Module Engagement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-effect border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="text-white font-['Montserrat'] flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  Engagement par Module
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData.moduleEngagement).map(([module, value]) => (
                    <div key={module} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white capitalize font-['Montserrat']">
                          {module === 'adluma' ? 'ADLUMA™' : module === 'ila' ? 'ILA™' : module.toUpperCase()}
                        </span>
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          {value}%
                        </Badge>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="text-white font-['Montserrat'] flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-accent" />
                  Insights IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Score Comportement</span>
                    <div className="flex items-center">
                      <div className="w-16 h-16 relative">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-white/20"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={175.9}
                            strokeDashoffset={175.9 - (175.9 * analyticsData.aiInsights.userBehaviorScore) / 100}
                            className="text-accent"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-accent font-bold text-sm">
                            {analyticsData.aiInsights.userBehaviorScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-['Montserrat'] mb-3">Recommandations IA</h4>
                    <div className="space-y-2">
                      {analyticsData.aiInsights.optimizationSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start">
                          <Zap className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Conversion Prédite</span>
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                        +{analyticsData.aiInsights.predictedConversion}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Real-time Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-white font-['Montserrat'] flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-green-400" />
                Métriques Temps Réel
                <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {analyticsData.realTimeMetrics.activeUsers}
                  </div>
                  <div className="text-white/70 text-sm">Utilisateurs actifs</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {analyticsData.liloInteractions}
                  </div>
                  <div className="text-white/70 text-sm">Interactions LILO™</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {analyticsData.realTimeMetrics.loadTime.toFixed(1)}s
                  </div>
                  <div className="text-white/70 text-sm">Temps de chargement</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;