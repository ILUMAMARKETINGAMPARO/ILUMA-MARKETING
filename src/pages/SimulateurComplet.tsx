import React, { useState, useEffect } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';
import { Calculator, Brain, TrendingUp, Zap, Play, RotateCcw, Download, ArrowRight, Sparkles, Target, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useADLUMACalculator, ADLUMAInputs } from '@/hooks/useADLUMACalculator';

const SimulateurComplet = () => {
  const { isCalculating, results, calculateResults } = useADLUMACalculator();
  const [activeTab, setActiveTab] = useState<'ads' | 'seo' | 'landing'>('ads');
  const { t } = useTranslations();
  const [formData, setFormData] = useState<ADLUMAInputs>({
    budget: 1500,
    sector: 'restaurant',
    location: 'montreal',
    targetAudience: 'local',
    campaignType: 'google-ads',
    duration: 30
  });

  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleCalculate = async () => {
    await calculateResults(formData);
  };

  const tabs = [
    { id: 'ads', name: 'Publicité IA', icon: Target, color: 'from-purple-500 to-pink-500' },
    { id: 'seo', name: 'SEO Intelligent', icon: TrendingUp, color: 'from-green-500 to-blue-500' },
    { id: 'landing', name: 'Landing Page', icon: Globe, color: 'from-orange-500 to-red-500' }
  ];

  const exportResults = () => {
    if (!results) return;
    
    const data = `
RAPPORT ILUMA™ - SIMULATION COMPLÈTE
==================================

CONFIGURATION:
- Budget: ${formData.budget}$ CAD
- Secteur: ${formData.sector}
- Région: ${formData.location}
- Audience: ${formData.targetAudience}
- Plateforme: ${formData.campaignType}
- Durée: ${formData.duration} jours

PRÉDICTIONS IA:
- Impressions estimées: ${results.estimatedImpressions.toLocaleString()}
- Clics prévus: ${results.estimatedClicks.toLocaleString()}
- CPM moyen: ${results.estimatedCPM}$ CAD
- CPC moyen: ${results.estimatedCPC}$ CAD
- Conversions attendues: ${results.estimatedConversions}
- ROI projeté: ${results.roi}%

RECOMMANDATIONS PERSONNALISÉES:
${results.recommendations.map(r => `• ${r}`).join('\n')}

---
Généré par Iluma™ ADLUMA - ${new Date().toLocaleDateString('fr-CA')}
Votre partenaire IA pour la croissance digitale
    `;
    
    const blob = new Blob([data], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Simulation-Iluma-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B0E] via-[#1a1a2e] to-[#16213e]">
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
              <Calculator className="w-8 h-8 text-[#8E44FF]" />
              <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">SIMULATEUR ILUMA™</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
              {t('simulator.title').split(' ')[0]}
              <br />
              <span className="text-3xl md:text-5xl">{t('simulator.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
              {t('simulator.subtitle')}
            </p>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="flex justify-center mb-12">
            <div className="glass-effect rounded-2xl p-2 border border-white/20">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 font-['Montserrat'] ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Simulator Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Configuration Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-effect border-white/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 font-['Montserrat']">
                  <Sparkles className="w-6 h-6 text-[#8E44FF]" />
                  {t('simulator.configuration')}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2 font-['Montserrat']">
                      {t('simulator.budget')}
                    </label>
                    <Input
                      type="number"
                      min="500"
                      max="100000"
                      step="100"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value) || 0})}
                      className="bg-black/40 border-white/20 text-white font-['Montserrat']"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2 font-['Montserrat']">
                      Secteur d'Activité
                    </label>
                    <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                      <SelectTrigger className="bg-black/40 border-white/20 text-white font-['Montserrat']">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/20">
                        <SelectItem value="restaurant" className="text-white font-['Montserrat']">Restaurant / Alimentation</SelectItem>
                        <SelectItem value="retail" className="text-white font-['Montserrat']">Commerce de détail</SelectItem>
                        <SelectItem value="services" className="text-white font-['Montserrat']">Services professionnels</SelectItem>
                        <SelectItem value="healthcare" className="text-white font-['Montserrat']">Santé / Bien-être</SelectItem>
                        <SelectItem value="real-estate" className="text-white font-['Montserrat']">Immobilier</SelectItem>
                        <SelectItem value="tech" className="text-white font-['Montserrat']">Technologie</SelectItem>
                        <SelectItem value="other" className="text-white font-['Montserrat']">Autre secteur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2 font-['Montserrat']">
                      Zone Géographique
                    </label>
                    <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                      <SelectTrigger className="bg-black/40 border-white/20 text-white font-['Montserrat']">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/20">
                        <SelectItem value="montreal" className="text-white font-['Montserrat']">Grand Montréal</SelectItem>
                        <SelectItem value="quebec" className="text-white font-['Montserrat']">Ville de Québec</SelectItem>
                        <SelectItem value="toronto" className="text-white font-['Montserrat']">Toronto (ON)</SelectItem>
                        <SelectItem value="vancouver" className="text-white font-['Montserrat']">Vancouver (BC)</SelectItem>
                        <SelectItem value="canada" className="text-white font-['Montserrat']">Tout le Canada</SelectItem>
                        <SelectItem value="usa" className="text-white font-['Montserrat']">États-Unis</SelectItem>
                        <SelectItem value="other" className="text-white font-['Montserrat']">Autre région</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2 font-['Montserrat']">
                      Plateforme Publicitaire
                    </label>
                    <Select value={formData.campaignType} onValueChange={(value) => setFormData({...formData, campaignType: value})}>
                      <SelectTrigger className="bg-black/40 border-white/20 text-white font-['Montserrat']">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/20">
                        <SelectItem value="google-ads" className="text-white font-['Montserrat']">Google Ads (Recherche + Display)</SelectItem>
                        <SelectItem value="facebook-ads" className="text-white font-['Montserrat']">Facebook Ads</SelectItem>
                        <SelectItem value="instagram-ads" className="text-white font-['Montserrat']">Instagram Ads</SelectItem>
                        <SelectItem value="linkedin-ads" className="text-white font-['Montserrat']">LinkedIn Ads (B2B)</SelectItem>
                        <SelectItem value="tiktok-ads" className="text-white font-['Montserrat']">TikTok Ads</SelectItem>
                        <SelectItem value="youtube-ads" className="text-white font-['Montserrat']">YouTube Ads</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2 font-['Montserrat']">
                      Durée de la Campagne (jours)
                    </label>
                    <Input
                      type="number"
                      min="7"
                      max="365"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 30})}
                      className="bg-black/40 border-white/20 text-white font-['Montserrat']"
                    />
                  </div>
                  
                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white py-4 text-lg font-semibold font-['Montserrat']"
                  >
                    {isCalculating ? (
                      <>
                        <Brain className="w-5 h-5 mr-2 animate-spin" />
                        Analyse IA en cours...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Lancer la Simulation
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-effect border-white/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 font-['Montserrat']">
                  <TrendingUp className="w-6 h-6 text-[#FFD56B]" />
                  Prédictions IA
                </h2>
                
                {results ? (
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-400/30">
                        <h4 className="text-purple-300 font-medium text-sm font-['Montserrat']">Impressions</h4>
                        <p className="text-white text-2xl font-bold font-['Montserrat']">
                          {results.estimatedImpressions.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-400/30">
                        <h4 className="text-blue-300 font-medium text-sm font-['Montserrat']">Clics</h4>
                        <p className="text-white text-2xl font-bold font-['Montserrat']">
                          {results.estimatedClicks.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-xl border border-yellow-400/30">
                        <h4 className="text-yellow-300 font-medium text-sm font-['Montserrat']">CPC Moyen</h4>
                        <p className="text-white text-2xl font-bold font-['Montserrat']">
                          ${results.estimatedCPC} CAD
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-400/30">
                        <h4 className="text-green-300 font-medium text-sm font-['Montserrat']">Conversions</h4>
                        <p className="text-white text-2xl font-bold font-['Montserrat']">
                          {results.estimatedConversions}
                        </p>
                      </div>
                    </div>
                    
                    {/* ROI Highlight */}
                    <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 p-6 rounded-xl border border-[#8E44FF]/30">
                      <h4 className="text-[#FFD56B] font-medium mb-2 text-lg font-['Montserrat']">ROI Estimé</h4>
                      <p className="text-white text-4xl font-bold font-['Montserrat']">
                        {results.roi}%
                      </p>
                      <p className="text-white/70 text-sm mt-2 font-['Montserrat']">
                        Retour sur investissement projeté
                      </p>
                    </div>
                    
                    {/* AI Recommendations */}
                    <div>
                      <h4 className="text-white font-medium mb-3 font-['Montserrat']">Recommandations IA</h4>
                      <div className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-[#8E44FF] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-white/80 text-sm font-['Montserrat']">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={exportResults}
                        variant="outline"
                        className="flex-1 border-white/30 text-white hover:bg-white/10 font-['Montserrat']"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Exporter
                      </Button>
                      <Button
                        onClick={() => window.location.href = '/contact'}
                        className="flex-1 bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] hover:from-[#8E44FF] hover:to-[#FFD56B] font-['Montserrat']"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Démarrer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Brain className="w-20 h-20 text-[#8E44FF]/40 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 font-['Montserrat']">
                      IA Prête à Analyser
                    </h3>
                    <p className="text-white/60 font-['Montserrat']">
                      Configurez vos paramètres et lancez la simulation pour obtenir
                      des prédictions personnalisées basées sur votre secteur.
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Features Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
              Pourquoi Utiliser Notre Simulateur ?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-['Montserrat']">
              Notre intelligence artificielle analyse plus de 50 variables pour vous fournir
              les prédictions les plus précises du marché.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'IA Prédictive Avancée',
                description: 'Algorithmes d\'apprentissage automatique entraînés sur des millions de campagnes réelles',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Target,
                title: 'Ciblage Optimisé',
                description: 'Identification automatique des audiences les plus rentables pour votre secteur',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Users,
                title: 'ROI Maximisé',
                description: 'Recommandations personnalisées pour optimiser chaque dollar investi',
                color: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass-effect border-white/20 p-8 text-center h-full group hover:border-[#8E44FF]/50 transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat']">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed font-['Montserrat']">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SimulateurComplet;
