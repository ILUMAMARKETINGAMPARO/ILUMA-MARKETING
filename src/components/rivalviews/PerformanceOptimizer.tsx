import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Globe, 
  Smartphone, 
  Clock, 
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Search,
  Eye,
  Mouse,
  Wifi,
  Image,
  Code,
  Database,
  Settings,
  Download
} from 'lucide-react';

interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  speedIndex: number;
  mobileScore: number;
  desktopScore: number;
  seoScore: number;
  accessibilityScore: number;
}

interface SEOAdvanced {
  coreWebVitals: 'good' | 'needs-improvement' | 'poor';
  structuredData: boolean;
  metaTags: number;
  hreflang: boolean;
  sitemap: boolean;
  robotsTxt: boolean;
  canonicals: boolean;
  openGraph: boolean;
  schemaMarkup: string[];
  internalLinks: number;
  imageOptimization: number; // %
  compressionEnabled: boolean;
}

interface PerformanceOptimizerProps {
  isVisible: boolean;
  onClose: () => void;
  targetUrl?: string;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ 
  isVisible, 
  onClose, 
  targetUrl = 'https://ilumamarketing.com/rivalviews' 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [seoData, setSeoData] = useState<SEOAdvanced | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'performance' | 'seo' | 'optimization'>('performance');

  // Simulation d'analyse de performance
  useEffect(() => {
    if (isVisible) {
      setIsAnalyzing(true);
      
      setTimeout(() => {
        // Génération de métriques réalistes
        setMetrics({
          lcp: 1.8 + Math.random() * 1.5, // 1.8-3.3s
          cls: 0.05 + Math.random() * 0.2, // 0.05-0.25
          fid: 50 + Math.random() * 200, // 50-250ms
          fcp: 1.2 + Math.random() * 1.0, // 1.2-2.2s
          ttfb: 0.3 + Math.random() * 0.5, // 0.3-0.8s
          speedIndex: 2.1 + Math.random() * 1.8, // 2.1-3.9s
          mobileScore: 75 + Math.random() * 20, // 75-95
          desktopScore: 85 + Math.random() * 10, // 85-95
          seoScore: 80 + Math.random() * 15, // 80-95
          accessibilityScore: 85 + Math.random() * 10 // 85-95
        });

        setSeoData({
          coreWebVitals: Math.random() > 0.7 ? 'good' : Math.random() > 0.4 ? 'needs-improvement' : 'poor',
          structuredData: Math.random() > 0.3,
          metaTags: Math.floor(Math.random() * 20) + 15,
          hreflang: Math.random() > 0.6,
          sitemap: Math.random() > 0.2,
          robotsTxt: Math.random() > 0.1,
          canonicals: Math.random() > 0.4,
          openGraph: Math.random() > 0.3,
          schemaMarkup: ['Organization', 'WebSite', 'BreadcrumbList'],
          internalLinks: Math.floor(Math.random() * 150) + 50,
          imageOptimization: Math.floor(Math.random() * 40) + 60,
          compressionEnabled: Math.random() > 0.3
        });

        setIsAnalyzing(false);
      }, 3000);
    }
  }, [isVisible]);

  const getScoreColor = (score: number, isTime = false) => {
    if (isTime) {
      if (score <= 2.5) return 'text-green-400';
      if (score <= 4.0) return 'text-yellow-400';
      return 'text-red-400';
    }
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getCoreWebVitalsColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'needs-improvement': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const recommendations = [
    {
      category: 'Images',
      title: 'Optimiser les images',
      description: 'Convertir en WebP et implémenter le lazy loading',
      impact: 'high',
      effort: 'medium',
      improvement: '15-25% LCP'
    },
    {
      category: 'JavaScript',
      title: 'Minifier et différer le JS',
      description: 'Réduire la taille des bundles et optimiser le chargement',
      impact: 'high',
      effort: 'low',
      improvement: '20-30% FID'
    },
    {
      category: 'CSS',
      title: 'CSS critique inline',
      description: 'Inliner le CSS critique et différer le reste',
      impact: 'medium',
      effort: 'medium',
      improvement: '10-15% FCP'
    },
    {
      category: 'Serveur',
      title: 'Activer la compression',
      description: 'Gzip/Brotli pour réduire la taille des réponses',
      impact: 'medium',
      effort: 'low',
      improvement: '25-40% TTFB'
    },
    {
      category: 'SEO',
      title: 'Données structurées',
      description: 'Ajouter Schema.org pour améliorer les rich snippets',
      impact: 'high',
      effort: 'medium',
      improvement: 'Visibilité SERP'
    },
    {
      category: 'Mobile',
      title: 'Optimisation mobile',
      description: 'Améliorer l\'expérience tactile et la vitesse mobile',
      impact: 'high',
      effort: 'high',
      improvement: 'Score mobile +15'
    }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-br from-[#0B0B0E] via-[#1a1a2e] to-[#16213e] border border-[#8E44FF]/30 rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Zap className="w-8 h-8 text-[#FFD56B]" />
                Performance & SEO Avancé
              </h2>
              <p className="text-white/60">Analyse complète et optimisations</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-white/60 hover:text-white"
            >
              ✕
            </Button>
          </div>

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="text-center py-12">
              <motion.div className="relative mx-auto w-32 h-32 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-transparent border-t-[#8E44FF] border-r-[#FFD56B] rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-2 border-transparent border-b-[#8E44FF]/50 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-[#FFD56B]" />
                </div>
              </motion.div>
              <p className="text-white text-xl mb-2">🔍 Analyse en cours...</p>
              <p className="text-white/60">Core Web Vitals • SEO Technique • Performance</p>
            </div>
          )}

          {!isAnalyzing && metrics && seoData && (
            <>
              {/* Navigation Tabs */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => setSelectedTab('performance')}
                  className={`${
                    selectedTab === 'performance' 
                      ? 'bg-[#8E44FF] text-white' 
                      : 'bg-black/40 text-white/60 hover:text-white'
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Performance
                </Button>
                <Button
                  onClick={() => setSelectedTab('seo')}
                  className={`${
                    selectedTab === 'seo' 
                      ? 'bg-[#8E44FF] text-white' 
                      : 'bg-black/40 text-white/60 hover:text-white'
                  }`}
                >
                  <Search className="w-4 h-4 mr-2" />
                  SEO Technique
                </Button>
                <Button
                  onClick={() => setSelectedTab('optimization')}
                  className={`${
                    selectedTab === 'optimization' 
                      ? 'bg-[#8E44FF] text-white' 
                      : 'bg-black/40 text-white/60 hover:text-white'
                  }`}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Optimisations
                </Button>
              </div>

              {/* Performance Tab */}
              {selectedTab === 'performance' && (
                <div className="space-y-6">
                  {/* Core Web Vitals */}
                  <Card className="bg-black/40 border-[#8E44FF]/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#FFD56B]" />
                        Core Web Vitals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className={`text-4xl font-bold mb-2 ${getScoreColor(metrics.lcp, true)}`}>
                            {metrics.lcp.toFixed(1)}s
                          </div>
                          <p className="text-white/60 text-sm">LCP (Largest Contentful Paint)</p>
                          <p className="text-xs text-white/40 mt-1">Objectif: ≤ 2.5s</p>
                        </div>
                        <div className="text-center">
                          <div className={`text-4xl font-bold mb-2 ${getScoreColor(metrics.cls * 1000, true)}`}>
                            {metrics.cls.toFixed(3)}
                          </div>
                          <p className="text-white/60 text-sm">CLS (Cumulative Layout Shift)</p>
                          <p className="text-xs text-white/40 mt-1">Objectif: ≤ 0.1</p>
                        </div>
                        <div className="text-center">
                          <div className={`text-4xl font-bold mb-2 ${getScoreColor(300 - metrics.fid, false)}`}>
                            {Math.round(metrics.fid)}ms
                          </div>
                          <p className="text-white/60 text-sm">FID (First Input Delay)</p>
                          <p className="text-xs text-white/40 mt-1">Objectif: ≤ 100ms</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-yellow-500/10">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getCoreWebVitalsColor(seoData.coreWebVitals)}`} />
                          <span className="text-white font-semibold">
                            Core Web Vitals: {seoData.coreWebVitals === 'good' ? 'Bon' : seoData.coreWebVitals === 'needs-improvement' ? 'À améliorer' : 'Faible'}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm">
                          {seoData.coreWebVitals === 'good' 
                            ? 'Excellent ! Vos métriques respectent les standards Google.'
                            : seoData.coreWebVitals === 'needs-improvement'
                            ? 'Quelques optimisations peuvent améliorer l\'expérience utilisateur.'
                            : 'Optimisations urgentes requises pour améliorer le référencement.'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scores Lighthouse */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-black/40 border-[#8E44FF]/30">
                      <CardContent className="p-4 text-center">
                        <Smartphone className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <div className={`text-2xl font-bold ${getScoreColor(metrics.mobileScore)}`}>
                          {Math.round(metrics.mobileScore)}
                        </div>
                        <p className="text-white/60 text-sm">Score Mobile</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-[#8E44FF]/30">
                      <CardContent className="p-4 text-center">
                        <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <div className={`text-2xl font-bold ${getScoreColor(metrics.desktopScore)}`}>
                          {Math.round(metrics.desktopScore)}
                        </div>
                        <p className="text-white/60 text-sm">Score Desktop</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-[#8E44FF]/30">
                      <CardContent className="p-4 text-center">
                        <Search className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <div className={`text-2xl font-bold ${getScoreColor(metrics.seoScore)}`}>
                          {Math.round(metrics.seoScore)}
                        </div>
                        <p className="text-white/60 text-sm">Score SEO</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-[#8E44FF]/30">
                      <CardContent className="p-4 text-center">
                        <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <div className={`text-2xl font-bold ${getScoreColor(metrics.accessibilityScore)}`}>
                          {Math.round(metrics.accessibilityScore)}
                        </div>
                        <p className="text-white/60 text-sm">Accessibilité</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {selectedTab === 'seo' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-black/40 border-[#8E44FF]/30">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Éléments Techniques</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Données structurées</span>
                          {seoData.structuredData ? 
                            <CheckCircle className="w-5 h-5 text-green-400" /> : 
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                          }
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Sitemap XML</span>
                          {seoData.sitemap ? 
                            <CheckCircle className="w-5 h-5 text-green-400" /> : 
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                          }
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Robots.txt</span>
                          {seoData.robotsTxt ? 
                            <CheckCircle className="w-5 h-5 text-green-400" /> : 
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                          }
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">URLs canoniques</span>
                          {seoData.canonicals ? 
                            <CheckCircle className="w-5 h-5 text-green-400" /> : 
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                          }
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Hreflang</span>
                          {seoData.hreflang ? 
                            <CheckCircle className="w-5 h-5 text-green-400" /> : 
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                          }
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-[#8E44FF]/30">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Métriques SEO</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-white/70">Meta tags optimisés</span>
                            <span className="text-white">{seoData.metaTags}/35</span>
                          </div>
                          <Progress value={(seoData.metaTags / 35) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-white/70">Images optimisées</span>
                            <span className="text-white">{seoData.imageOptimization}%</span>
                          </div>
                          <Progress value={seoData.imageOptimization} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-white/70">Liens internes</span>
                            <span className="text-white">{seoData.internalLinks}</span>
                          </div>
                          <Progress value={Math.min((seoData.internalLinks / 200) * 100, 100)} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-black/40 border-[#8E44FF]/30">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Schema Markup détecté</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {seoData.schemaMarkup.map((schema, index) => (
                          <Badge key={index} className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                            {schema}
                          </Badge>
                        ))}
                        {seoData.schemaMarkup.length === 0 && (
                          <p className="text-white/60">Aucune donnée structurée détectée</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Optimization Tab */}
              {selectedTab === 'optimization' && (
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="bg-black/40 border-[#8E44FF]/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                                {rec.category}
                              </Badge>
                              <Badge 
                                className={`${
                                  rec.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                                  rec.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}
                              >
                                Impact {rec.impact}
                              </Badge>
                              <Badge 
                                className={`${
                                  rec.effort === 'high' ? 'bg-red-500/20 text-red-400' :
                                  rec.effort === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}
                              >
                                Effort {rec.effort}
                              </Badge>
                            </div>
                            <h3 className="text-white text-lg font-semibold mb-2">{rec.title}</h3>
                            <p className="text-white/70 mb-3">{rec.description}</p>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 text-sm font-semibold">{rec.improvement}</span>
                            </div>
                          </div>
                          <Button className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white ml-4">
                            <Settings className="w-4 h-4 mr-2" />
                            Appliquer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-[#8E44FF]/20">
                <Button className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger Rapport
                </Button>
                <Button variant="outline" className="border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/10">
                  <Target className="w-4 h-4 mr-2" />
                  Planifier Optimisations
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceOptimizer;