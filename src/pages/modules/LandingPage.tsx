import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { ExternalLink, Zap, Brain, ArrowRight, Sparkles, Target, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';

const LandingPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    industry: '',
    target: '',
    goal: '',
    budget: '',
    timeline: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const features = [
    {
      icon: Brain,
      title: "IA Adaptive",
      description: "Contenu personnalisé selon le profil visiteur",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Target,
      title: "Ciblage Précis",
      description: "Segmentation automatique des prospects",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Users,
      title: "UX Optimisée",
      description: "Interface adaptée à chaque persona",
      color: "from-emerald-400 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Conversion Max",
      description: "Taux de conversion jusqu'à +340%",
      color: "from-orange-400 to-red-500"
    }
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
              <ExternalLink className="w-8 h-8 text-purple-400" />
              <span className="text-purple-300 font-medium text-lg">LANDING PAGE INTELLIGENTE</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
              Créez des Pages
              <br />
              <span className="text-4xl md:text-6xl">qui Convertissent</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Générez des landing pages intelligentes qui s'adaptent automatiquement 
              à chaque visiteur pour maximiser vos conversions.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={feature.title} className="glass-effect border-white/20 p-6 group hover:border-purple-500/50 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </Card>
              );
            })}
          </motion.div>

          {/* Main Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs defaultValue="generator" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
                <TabsTrigger value="generator" className="data-[state=active]:bg-purple-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Générateur
                </TabsTrigger>
                <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generator">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Form */}
                  <Card className="glass-effect border-white/20 p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Configurez votre Landing Page</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 mb-2">Secteur d'activité</label>
                        <Input
                          placeholder="Ex: E-commerce, SaaS, Services..."
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="bg-black/20 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2">Cible principale</label>
                        <Input
                          placeholder="Ex: Entrepreneurs, PME, Particuliers..."
                          value={formData.target}
                          onChange={(e) => handleInputChange('target', e.target.value)}
                          className="bg-black/20 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2">Objectif principal</label>
                        <Textarea
                          placeholder="Ex: Générer des leads qualifiés, Vendre un produit..."
                          value={formData.goal}
                          onChange={(e) => handleInputChange('goal', e.target.value)}
                          className="bg-black/20 border-white/20 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/80 mb-2">Budget mensuel</label>
                          <Input
                            placeholder="Ex: 2000€"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                            className="bg-black/20 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 mb-2">Timeline</label>
                          <Input
                            placeholder="Ex: 2 semaines"
                            value={formData.timeline}
                            onChange={(e) => handleInputChange('timeline', e.target.value)}
                            className="bg-black/20 border-white/20 text-white"
                          />
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        <Brain className="w-4 h-4 mr-2" />
                        Générer ma Landing Page IA
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>

                  {/* Preview */}
                  <Card className="glass-effect border-white/20 p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Aperçu Temps Réel</h3>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-white/10 min-h-[400px]">
                      <div className="text-center mb-6">
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {formData.industry ? `Solutions ${formData.industry}` : 'Votre Titre Principal'}
                        </h4>
                        <p className="text-white/70">
                          {formData.target ? `Spécialement conçu pour ${formData.target}` : 'Votre sous-titre personnalisé'}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-cyan-400" />
                            <span className="text-white font-medium">Section Hero Adaptative</span>
                          </div>
                          <p className="text-white/60 text-sm">
                            {formData.goal || 'Contenu personnalisé selon votre objectif'}
                          </p>
                        </div>
                        
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-purple-400" />
                            <span className="text-white font-medium">CTA Optimisé</span>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500">
                            Action Principale
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="templates">
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((template) => (
                    <Card key={template} className="glass-effect border-white/20 p-4 group hover:border-purple-500/50 transition-all duration-300">
                      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg h-32 mb-4 flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white/40" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Template {template}</h4>
                      <p className="text-white/60 text-sm mb-3">Optimisé pour conversion</p>
                      <Button size="sm" variant="outline" className="w-full border-purple-500/30 text-purple-300">
                        Utiliser ce template
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Taux de Conversion", value: "12.4%", trend: "+23%" },
                    { label: "Visiteurs Uniques", value: "3,247", trend: "+45%" },
                    { label: "Temps sur Page", value: "2m 34s", trend: "+12%" },
                    { label: "Leads Générés", value: "403", trend: "+67%" }
                  ].map((metric) => (
                    <Card key={metric.label} className="glass-effect border-white/20 p-6">
                      <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
                      <div className="text-white/60 text-sm mb-2">{metric.label}</div>
                      <div className="text-green-400 text-sm font-medium">{metric.trend}</div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;