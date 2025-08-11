import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { ExternalLink, Zap, Brain, ArrowRight, Sparkles, Target, Users, TrendingUp, Star, CheckCircle, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/useTranslations';

const LandingPage = () => {
  const { t } = useTranslations();
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
      title: t('landingPageIntelligente.features.adaptive.title'),
      description: t('landingPageIntelligente.features.adaptive.description'),
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Target,
      title: t('landingPageIntelligente.features.targeting.title'),
      description: t('landingPageIntelligente.features.targeting.description'),
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Users,
      title: t('landingPageIntelligente.features.ux.title'),
      description: t('landingPageIntelligente.features.ux.description'),
      color: "from-emerald-400 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: t('landingPageIntelligente.features.conversion.title'),
      description: t('landingPageIntelligente.features.conversion.description'),
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
              <span className="text-purple-300 font-medium text-lg">{t('landingPageIntelligente.hero.badge')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
              {t('landingPageIntelligente.hero.title1')}
              <br />
              <span className="text-4xl md:text-6xl">{t('landingPageIntelligente.hero.title2')}</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              {t('landingPageIntelligente.hero.subtitle')}
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
                  {t('landingPageIntelligente.tabs.generator')}
                </TabsTrigger>
                <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('landingPageIntelligente.tabs.templates')}
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t('landingPageIntelligente.tabs.analytics')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generator">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Form */}
                  <Card className="glass-effect border-white/20 p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">{t('landingPageIntelligente.form.title')}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 mb-2">{t('landingPageIntelligente.form.industry.label')}</label>
                        <Input
                          placeholder={t('landingPageIntelligente.form.industry.placeholder')}
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="bg-black/20 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2">{t('landingPageIntelligente.form.target.label')}</label>
                        <Input
                          placeholder={t('landingPageIntelligente.form.target.placeholder')}
                          value={formData.target}
                          onChange={(e) => handleInputChange('target', e.target.value)}
                          className="bg-black/20 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2">{t('landingPageIntelligente.form.goal.label')}</label>
                        <Textarea
                          placeholder={t('landingPageIntelligente.form.goal.placeholder')}
                          value={formData.goal}
                          onChange={(e) => handleInputChange('goal', e.target.value)}
                          className="bg-black/20 border-white/20 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/80 mb-2">{t('landingPageIntelligente.form.budget.label')}</label>
                          <Input
                            placeholder={t('landingPageIntelligente.form.budget.placeholder')}
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                            className="bg-black/20 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 mb-2">{t('landingPageIntelligente.form.timeline.label')}</label>
                          <Input
                            placeholder={t('landingPageIntelligente.form.timeline.placeholder')}
                            value={formData.timeline}
                            onChange={(e) => handleInputChange('timeline', e.target.value)}
                            className="bg-black/20 border-white/20 text-white"
                          />
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        <Brain className="w-4 h-4 mr-2" />
                        {t('landingPageIntelligente.form.generate')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>

                  {/* Preview */}
                  <Card className="glass-effect border-white/20 p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">{t('landingPageIntelligente.preview.title')}</h3>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-white/10 min-h-[400px]">
                      <div className="text-center mb-6">
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {formData.industry ? `${t('landingPageIntelligente.preview.solutions')} ${formData.industry}` : t('landingPageIntelligente.preview.defaultTitle')}
                        </h4>
                        <p className="text-white/70">
                          {formData.target ? `${t('landingPageIntelligente.preview.designed')} ${formData.target}` : t('landingPageIntelligente.preview.defaultSubtitle')}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-cyan-400" />
                            <span className="text-white font-medium">{t('landingPageIntelligente.preview.heroSection')}</span>
                          </div>
                          <p className="text-white/60 text-sm">
                            {formData.goal || t('landingPageIntelligente.preview.defaultContent')}
                          </p>
                        </div>
                        
                        <div className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-purple-400" />
                            <span className="text-white font-medium">{t('landingPageIntelligente.preview.ctaOptimized')}</span>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500">
                            {t('landingPageIntelligente.preview.mainAction')}
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
                      <h4 className="text-white font-semibold mb-2">{t('landingPageIntelligente.templates.template')} {template}</h4>
                      <p className="text-white/60 text-sm mb-3">{t('landingPageIntelligente.templates.optimized')}</p>
                      <Button size="sm" variant="outline" className="w-full border-purple-500/30 text-purple-300">
                        {t('landingPageIntelligente.templates.use')}
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: t('landingPageIntelligente.analytics.conversionRate'), value: "12.4%", trend: "+23%" },
                    { label: t('landingPageIntelligente.analytics.uniqueVisitors'), value: "3,247", trend: "+45%" },
                    { label: t('landingPageIntelligente.analytics.timeOnPage'), value: "2m 34s", trend: "+12%" },
                    { label: t('landingPageIntelligente.analytics.leadsGenerated'), value: "403", trend: "+67%" }
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

          {/* AI Comportementale Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-20"
          >
            <Card className="glass-effect border-white/20 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{t('landingPageIntelligente.ai.title')}</h2>
              <p className="text-white/70 text-lg mb-8">{t('landingPageIntelligente.ai.subtitle')}</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{t('landingPageIntelligente.ai.features.personalization')}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{t('landingPageIntelligente.ai.features.scoring')}</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{t('landingPageIntelligente.ai.features.recommendations')}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Iluma Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">{t('landingPageIntelligente.process.title')}</h2>
              <p className="text-white/70 text-lg">{t('landingPageIntelligente.process.subtitle')}</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  number: "01",
                  title: t('landingPageIntelligente.process.step1.title'),
                  description: t('landingPageIntelligente.process.step1.description'),
                  duration: t('landingPageIntelligente.process.duration1')
                },
                {
                  number: "02",
                  title: t('landingPageIntelligente.process.step2.title'),
                  description: t('landingPageIntelligente.process.step2.description'),
                  duration: t('landingPageIntelligente.process.duration2')
                },
                {
                  number: "03",
                  title: t('landingPageIntelligente.process.step3.title'),
                  description: t('landingPageIntelligente.process.step3.description'),
                  duration: t('landingPageIntelligente.process.duration3')
                },
                {
                  number: "04",
                  title: t('landingPageIntelligente.process.step4.title'),
                  description: t('landingPageIntelligente.process.step4.description'),
                  duration: t('landingPageIntelligente.process.duration4')
                }
              ].map((step) => (
                <Card key={step.number} className="glass-effect border-white/20 p-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        <span className="text-white/60 text-sm">{step.duration}</span>
                      </div>
                      <p className="text-white/70">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Packages Section (without prices) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">{t('landingPageIntelligente.solutions.title')}</h2>
              <p className="text-white/70 text-lg">{t('landingPageIntelligente.solutions.subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Package */}
              <Card className="glass-effect border-white/20 p-8 relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">{t('landingPageIntelligente.packages.starter.title')}</h3>
                <p className="text-white/60 text-center mb-6">{t('landingPageIntelligente.packages.starter.subtitle')}</p>
                
                <div className="space-y-4 mb-8">
                  {[
                    t('landingPageIntelligente.packages.starter.feature1'),
                    t('landingPageIntelligente.packages.starter.feature2'),
                    t('landingPageIntelligente.packages.starter.feature3'),
                    t('landingPageIntelligente.packages.starter.feature4'),
                    t('landingPageIntelligente.packages.starter.feature5')
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                  {t('landingPageIntelligente.packages.starter.cta')}
                </Button>
              </Card>

              {/* Complete Package */}
              <Card className="glass-effect border-purple-500/50 p-8 relative scale-105 z-10">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {t('landingPageIntelligente.packages.popular')}
                  </span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">{t('landingPageIntelligente.packages.complete.title')}</h3>
                <p className="text-white/60 text-center mb-6">{t('landingPageIntelligente.packages.complete.subtitle')}</p>
                
                <div className="space-y-4 mb-8">
                  {[
                    t('landingPageIntelligente.packages.complete.feature1'),
                    t('landingPageIntelligente.packages.complete.feature2'),
                    t('landingPageIntelligente.packages.complete.feature3'),
                    t('landingPageIntelligente.packages.complete.feature4'),
                    t('landingPageIntelligente.packages.complete.feature5'),
                    t('landingPageIntelligente.packages.complete.feature6'),
                    t('landingPageIntelligente.packages.complete.feature7')
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  {t('landingPageIntelligente.packages.complete.cta')}
                </Button>
              </Card>

              {/* Enterprise Package */}
              <Card className="glass-effect border-white/20 p-8 relative">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-2">{t('landingPageIntelligente.packages.enterprise.title')}</h3>
                <p className="text-white/60 text-center mb-6">{t('landingPageIntelligente.packages.enterprise.subtitle')}</p>
                
                <div className="space-y-4 mb-8">
                  {[
                    t('landingPageIntelligente.packages.enterprise.feature1'),
                    t('landingPageIntelligente.packages.enterprise.feature2'),
                    t('landingPageIntelligente.packages.enterprise.feature3'),
                    t('landingPageIntelligente.packages.enterprise.feature4'),
                    t('landingPageIntelligente.packages.enterprise.feature5'),
                    t('landingPageIntelligente.packages.enterprise.feature6')
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  {t('landingPageIntelligente.packages.enterprise.cta')}
                </Button>
              </Card>
            </div>
          </motion.div>

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mb-20"
          >
            <Card className="glass-effect border-purple-500/50 p-12 text-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
              <span className="inline-block text-purple-300 text-sm font-medium mb-4">
                {t('landingPageIntelligente.transform.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('landingPageIntelligente.transform.title1')}
                <br />
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  {t('landingPageIntelligente.transform.title2')}
                </span>
              </h2>
              <p className="text-white/70 text-lg mb-6 max-w-3xl mx-auto">
                {t('landingPageIntelligente.transform.features')}
              </p>
              <p className="text-white font-medium mb-8">
                {t('landingPageIntelligente.transform.guarantee')}
              </p>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold mb-6"
              >
                <Rocket className="w-5 h-5 mr-2" />
                {t('landingPageIntelligente.transform.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="grid md:grid-cols-2 gap-6 max-w-md mx-auto">
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{t('landingPageIntelligente.transform.consultation')}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{t('landingPageIntelligente.transform.delivery')}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
