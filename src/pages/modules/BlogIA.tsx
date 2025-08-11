import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { PenTool, Search, Target, ArrowRight, Play, Sparkles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMPE } from '@/contexts/MPEContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslations } from '@/hooks/useTranslations';
import ILAScoreDisplay from '@/components/mpe/ILAScoreDisplay';
import { blogPosts } from '@/data/blogContent';

const BlogIA = () => {
  const { modules, executePrompt } = useMPE();
  const { language } = useTranslations();
  const { t } = useLanguage();
  const blogiaModule = modules.find(m => m.id === 'blogia');
  
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [contentType, setContentType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [result, setResult] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecutePrompt = async () => {
    if (!selectedPrompt || !topic) return;
    
    setIsExecuting(true);
    const context = {
      topic,
      keywords,
      contentType,
      targetAudience,
      timestamp: new Date().toISOString()
    };
    
    try {
      const promptResult = await executePrompt(selectedPrompt, context);
      setResult(promptResult);
    } catch (error) {
      console.error('Erreur lors de l\'exécution du prompt:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const blogiaPrompts = [
    {
      id: 'seo-article',
      title: 'Article SEO optimisé',
      description: 'Génère un article de blog complet optimisé pour le référencement',
      category: 'content'
    },
    {
      id: 'content-plan',
      title: 'Plan de contenu mensuel',
      description: 'Crée un calendrier éditorial stratégique pour votre secteur',
      category: 'strategy'
    },
    {
      id: 'keyword-research',
      title: 'Recherche de mots-clés',
      description: 'Identifie les meilleurs mots-clés pour votre niche',
      category: 'seo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-900/20 to-black">
      <Navigation />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                  {t('modules.blogIA.hero.badge')}
                </Badge>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-green-100 to-cyan-100 bg-clip-text text-transparent mb-6">
                {t('modules.blogIA.hero.title')}
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
                {t('modules.blogIA.hero.subtitle')}
              </p>
               
               {blogiaModule && (
                 <ILAScoreDisplay score={blogiaModule.ilaScore || 92} />
               )}

               <div className="flex gap-4 justify-center mt-8">
                 <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                   {t('modules.blogIA.hero.startButton')}
                 </Button>
                 <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                   <Play className="w-4 h-4 mr-2" />
                   {t('modules.blogIA.demo.button')}
                 </Button>
               </div>
             </motion.div>
           </div>
         </section>

        {/* Articles de Blog Réels */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Articles Récents
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Découvrez nos derniers articles sur le marketing digital, le SEO et l'intelligence artificielle.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-effect border-white/20 p-6 h-full hover:border-green-400/30 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                        {post.category}
                      </Badge>
                      <span className="text-white/50 text-sm">{post.readTime} min</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {post.title[language]}
                    </h3>
                    <p className="text-white/70 mb-4 line-clamp-3">
                      {post.excerpt[language]}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white/50">
                        Par {post.author} • {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                        Lire →
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interface de Génération */}
        <section className="py-20 bg-gradient-to-b from-black/40 to-green-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Configuration */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  <Sparkles className="w-6 h-6 inline mr-2 text-green-400" />
                  Configuration du Contenu
                </h2>
                
                <Card className="glass-effect border-white/20 p-6 space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Type de Prompt
                    </label>
                    <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
                      <SelectTrigger className="bg-black/40 border-white/20 text-white">
                        <SelectValue placeholder="Choisir un type de contenu" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/20">
                        {blogiaPrompts.map((prompt) => (
                          <SelectItem key={prompt.id} value={prompt.id} className="text-white">
                            {prompt.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Sujet Principal
                    </label>
                    <Input
                      placeholder="Ex: Intelligence Artificielle en Marketing"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="bg-black/40 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Mots-clés Cibles
                    </label>
                    <Input
                      placeholder="marketing digital, SEO, conversion..."
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="bg-black/40 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Audience Cible
                    </label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
                      <SelectTrigger className="bg-black/40 border-white/20 text-white">
                        <SelectValue placeholder="Sélectionner l'audience" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/20">
                        <SelectItem value="entrepreneurs" className="text-white">Entrepreneurs</SelectItem>
                        <SelectItem value="pme" className="text-white">PME</SelectItem>
                        <SelectItem value="marketers" className="text-white">Marketeurs</SelectItem>
                        <SelectItem value="ecommerce" className="text-white">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    onClick={handleExecutePrompt}
                    disabled={!selectedPrompt || !topic || isExecuting}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                  >
                    {isExecuting ? (
                      <>
                        <PenTool className="w-4 h-4 mr-2 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Générer le contenu
                      </>
                    )}
                  </Button>
                </Card>
              </motion.div>

              {/* Résultat */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  <Target className="w-6 h-6 inline mr-2 text-blue-400" />
                  Contenu Généré
                </h2>
                
                <Card className="glass-effect border-white/20 p-6">
                  {result ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                          Contenu généré avec succès
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                      <div className="max-h-96 overflow-y-auto p-4 bg-black/40 rounded-lg">
                        <pre className="text-white/80 text-sm whitespace-pre-wrap font-mono">
                          {result}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <PenTool className="w-16 h-16 text-white/20 mx-auto mb-4" />
                      <p className="text-white/50">
                        Configurez vos paramètres et cliquez sur "Générer le contenu" pour commencer.
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex bg-black/40 rounded-lg p-1">
                <Button variant="ghost" className="text-green-400 bg-green-500/20">
                  {t('modules.blogIA.tabs.features')}
                </Button>
                <Button variant="ghost" className="text-white/70">
                  {t('modules.blogIA.tabs.benefits')}
                </Button>
                <Button variant="ghost" className="text-white/70">
                  {t('modules.blogIA.tabs.process')}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: PenTool,
                  title: t('modules.blogIA.features.generation.title'),
                  description: t('modules.blogIA.features.generation.description')
                },
                {
                  icon: Target,
                  title: t('modules.blogIA.features.targeting.title'),
                  description: t('modules.blogIA.features.targeting.description')
                },
                {
                  icon: Search,
                  title: t('modules.blogIA.features.optimization.title'),
                  description: t('modules.blogIA.features.optimization.description')
                },
                {
                  icon: Sparkles,
                  title: t('modules.blogIA.features.creativity.title'),
                  description: t('modules.blogIA.features.creativity.description')
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-effect border-white/20 p-8 text-center group hover:border-green-400/50 transition-all duration-300 h-full">
                    <feature.icon className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-gradient-to-b from-green-900/10 to-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                {t('modules.blogIA.comparison.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Traditional Method */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="glass-effect border-red-500/30 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 font-bold">❌</span>
                    </div>
                    <h3 className="text-2xl font-bold text-red-400">{t('modules.blogIA.comparison.traditional')}</h3>
                  </div>
                  <ul className="space-y-4 text-white/70">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      <span>5-8h pour un article de qualité</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Recherche manuelle des mots-clés</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Optimisation SEO complexe</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Publication et promotion manuelles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Suivi des performances dispersé</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Créativité limitée par le temps</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              {/* BlogIA Method */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="glass-effect border-green-500/30 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-400 font-bold">✓</span>
                    </div>
                    <h3 className="text-2xl font-bold text-green-400">{t('modules.blogIA.comparison.blogia')}</h3>
                  </div>
                  <ul className="space-y-4 text-white/70">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>1h pour un article optimisé complet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Recherche IA des mots-clés tendances</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Optimisation SEO automatique</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Publication programmée intelligente</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Analytics intégrés en temps réel</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Créativité illimitée par l'IA</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                {t('modules.blogIA.faq.title')}
              </h2>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIA;