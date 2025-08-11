import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import BlogIASEO from '@/components/seo/BlogIASEO';
import { useLiloUX } from '@/hooks/useLiloUX';
import { useTranslations } from '@/hooks/useTranslations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  PenTool, 
  Zap, 
  Target, 
  TrendingUp, 
  Lightbulb,
  Sparkles,
  Users,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogIA = () => {
  const { t } = useTranslations();
  const { liloMood, liloMessage, handleCTAHighlight } = useLiloUX();
  const [activeTab, setActiveTab] = useState('features');

  const aiFeatures = [
    {
      icon: Brain,
      title: t('blogIA.features.generation.title'),
      description: t('blogIA.features.generation.description'),
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: Target,
      title: t('blogIA.features.targeting.title'), 
      description: t('blogIA.features.targeting.description'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: t('blogIA.features.optimization.title'),
      description: t('blogIA.features.optimization.description'),
      color: "from-cyan-500 to-green-500"
    },
    {
      icon: Lightbulb,
      title: t('blogIA.features.creativity.title'),
      description: t('blogIA.features.creativity.description'),
      color: "from-green-500 to-yellow-500"
    }
  ];

  const benefits = [
    t('blogIA.benefits.time'),
    t('blogIA.benefits.seo'),
    t('blogIA.benefits.personalized'),
    t('blogIA.benefits.automatic'),
    t('blogIA.benefits.analytics'),
    t('blogIA.benefits.multiformat')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <BlogIASEO />
      <Navigation />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 border-[#8E44FF]/30 text-white px-6 py-2 mb-6">
                <PenTool className="w-5 h-5 text-[#FFD56B] mr-2" />
                {t('blogIA.hero.badge')}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#FFD56B] to-[#8E44FF] bg-clip-text text-transparent mb-6 font-['Montserrat']">
                {t('blogIA.hero.title')}
              </h1>
              
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto font-['Montserrat']">
                {t('blogIA.hero.subtitle')}
              </p>
              
              <Card className="glass-effect border-[#8E44FF]/20 p-6 mb-8 max-w-4xl mx-auto">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-white font-['Montserrat'] flex items-center justify-center gap-2">
                    <Brain className="w-5 h-5 text-[#FFD56B]" />
                    {t('blogIA.hero.liloSummary')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 font-['Montserrat']">
                    {t('blogIA.hero.liloMessage')}
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 text-lg font-semibold font-['Montserrat'] hover:scale-105 transition-all duration-300 rounded-xl shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t('blogIA.hero.startButton')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/10 hover:border-[#8E44FF] px-8 py-4 text-lg font-semibold font-['Montserrat'] hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  <Users className="w-5 h-5 mr-2" />
                  {t('blogIA.demo.button')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 mb-12">
                <TabsTrigger value="features" className="font-['Montserrat']">
                  <Brain className="w-4 h-4 mr-2" />
                  {t('blogIA.tabs.features')}
                </TabsTrigger>
                <TabsTrigger value="benefits" className="font-['Montserrat']">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t('blogIA.tabs.benefits')}
                </TabsTrigger>
                <TabsTrigger value="workflow" className="font-['Montserrat']">
                  <Zap className="w-4 h-4 mr-2" />
                  {t('blogIA.tabs.process')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {aiFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/40 transition-all duration-300 hover:scale-105">
                          <CardContent className="p-0">
                            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-['Montserrat']">{feature.title}</h3>
                            <p className="text-white/80 font-['Montserrat']">{feature.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="mt-6">
                <Card className="glass-effect border-white/20 p-8">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white mb-6 font-['Montserrat'] text-center">
                      {t('blogIA.features.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-white/90 font-['Montserrat']">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="workflow" className="mt-6">
                <Card className="glass-effect border-white/20 p-8">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white mb-6 font-['Montserrat'] text-center">
                      {t('blogIA.process.title') || 'Processus de création automatisé'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { 
                          step: "1", 
                          title: t('blogIA.process.step1.title') || "Analyse de votre secteur", 
                          desc: t('blogIA.process.step1.description') || "L'IA étudie votre domaine d'activité et vos concurrents" 
                        },
                        { 
                          step: "2", 
                          title: t('blogIA.process.step2.title') || "Génération de contenu", 
                          desc: t('blogIA.process.step2.description') || "Création d'articles optimisés pour votre audience" 
                        },
                        { 
                          step: "3", 
                          title: t('blogIA.process.step3.title') || "Optimisation SEO", 
                          desc: t('blogIA.process.step3.description') || "Intégration automatique des mots-clés et balises" 
                        },
                        { 
                          step: "4", 
                          title: t('blogIA.process.step4.title') || "Publication & suivi", 
                          desc: t('blogIA.process.step4.description') || "Mise en ligne et analyse des performances" 
                        }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-white/5 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-bold text-white mb-1 font-['Montserrat']">{item.title}</h4>
                            <p className="text-white/80 font-['Montserrat']">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Section Comparative */}
        <section className="py-16 px-4 bg-gradient-to-r from-black/40 to-purple-900/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
                {t('blogIA.comparison.title')}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto font-['Montserrat']">
                {t('blogIA.comparison.subtitle') || 'Découvrez pourquoi l\'intelligence artificielle révolutionne la création de contenu'}
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-effect border-red-500/20 p-8">
                <h3 className="text-xl font-bold text-red-400 mb-6 font-['Montserrat']">❌ {t('blogIA.comparison.traditional')}</h3>
                <ul className="space-y-3">
                  {[
                    "5-8h pour un article de qualité",
                    "Recherche manuelle des mots-clés",
                    "Optimisation SEO complexe",
                    "Publication et promotion manuelles",
                    "Suivi des performances dispersé",
                    "Créativité limitée par le temps"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/80 font-['Montserrat']">
                      <span className="text-red-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              
              <Card className="glass-effect border-green-500/20 p-8">
                <h3 className="text-xl font-bold text-green-400 mb-6 font-['Montserrat']">{t('blogIA.comparison.blogia')}</h3>
                <ul className="space-y-3">
                  {[
                    "1h pour un article optimisé complet",
                    "Recherche IA des mots-clés tendances",
                    "Optimisation SEO automatique",
                    "Publication programmée intelligente",
                    "Analytics intégrés en temps réel",
                    "Créativité illimitée par l'IA"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/80 font-['Montserrat']">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
                {t('blogIA.faq.title')}
              </h2>
            </motion.div>
            
            <div className="space-y-6">
              {[
                {
                  question: "Comment l'IA génère-t-elle du contenu SEO de qualité ?",
                  answer: "BlogIA™ analyse votre secteur, vos concurrents et les tendances de recherche pour créer du contenu original, pertinent et optimisé pour les moteurs de recherche."
                },
                {
                  question: "Le contenu généré par IA est-il unique ?",
                  answer: "Oui, chaque article est unique et personnalisé selon votre marque, votre ton et vos objectifs. L'IA ne copie jamais, elle crée du contenu original basé sur votre stratégie."
                },
                {
                  question: "Puis-je modifier le contenu après génération ?",
                  answer: "Absolument ! Vous gardez le contrôle total. Modifiez, ajustez ou personnalisez le contenu selon vos besoins avant publication."
                },
                {
                  question: "BlogIA™ fonctionne-t-il dans tous les secteurs ?",
                  answer: "Oui, l'IA s'adapte à tous les domaines : e-commerce, santé, finance, technologie, services locaux, etc. Plus elle apprend votre secteur, plus elle devient précise."
                }
              ].map((faq, index) => (
                <Card key={index} className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/40 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-3 font-['Montserrat']">{faq.question}</h3>
                  <p className="text-white/80 font-['Montserrat']">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cas d'usage */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-900/20 to-black/40">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
                Exemple concret : Katz Sport
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto font-['Montserrat']">
                Comment BlogIA™ a transformé la stratégie de contenu de cette boutique spécialisée
              </p>
            </motion.div>
            
            <Card className="glass-effect border-white/20 p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#FFD56B] mb-2 font-['Montserrat']">+214%</div>
                  <p className="text-white/80 font-['Montserrat']">Trafic organique en 6 mois</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FFD56B] mb-2 font-['Montserrat']">45</div>
                  <p className="text-white/80 font-['Montserrat']">Mots-clés en 1ère page Google</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FFD56B] mb-2 font-['Montserrat']">20+</div>
                  <p className="text-white/80 font-['Montserrat']">Articles SEO générés/mois</p>
                </div>
              </div>
              <div className="mt-8 p-6 bg-white/5 rounded-lg">
                <p className="text-white/90 italic font-['Montserrat'] text-center">
                  "Avec BlogIA™, nous créons du contenu expert en crosse qui attire nos clients cibles. 
                  L'IA comprend notre secteur et génère des articles qui nous positionnent comme référence."
                </p>
                <p className="text-white/60 text-center mt-2 font-['Montserrat']">- Équipe Katz Sport</p>
              </div>
            </Card>
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
                  {t('blogIA.cta.title')}
                </h2>
                <p className="text-white/80 mb-6 font-['Montserrat']">
                  Lancez-vous dès aujourd'hui et transformez votre stratégie de contenu avec l'intelligence artificielle
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
                    >
                      <Clock className="w-5 h-5 mr-2" />
                      Réserver une consultation
                    </Button>
                  </Link>
                  <Link to="/adluma">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
                    >
                      <Target className="w-5 h-5 mr-2" />
                      Simuler votre projet
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

export default BlogIA;