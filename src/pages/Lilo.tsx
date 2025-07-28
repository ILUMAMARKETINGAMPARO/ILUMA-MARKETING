import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import LiloSEO from '@/components/seo/LiloSEO';
import { useLiloUX } from '@/hooks/useLiloUX';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  MessageCircle, 
  Zap, 
  Brain, 
  Users, 
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LILO = () => {
  const { t } = useLanguage();
  const { liloMood, liloMessage, handleCTAHighlight } = useLiloUX();
  const [activeDemo, setActiveDemo] = useState('conversation');

  const chatbotFeatures = [
    {
      icon: Brain,
      title: "Intelligence avancée",
      description: "Compréhension contextuelle et réponses personnalisées grâce à l'IA",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Support 24/7", 
      description: "Assistance automatisée disponible en permanence pour vos clients",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Qualification leads",
      description: "Identification et qualification automatique des prospects qualifiés",
      color: "from-cyan-500 to-green-500"
    },
    {
      icon: Settings,
      title: "Personnalisation totale",
      description: "Adaptation complète à votre marque, ton et processus métier",
      color: "from-green-500 to-yellow-500"
    }
  ];

  const conversationExamples = [
    {
      user: "Bonjour, j'aimerais en savoir plus sur vos services SEO",
      bot: "Bonjour ! Je suis ravi de vous aider. Nos services SEO IA permettent d'améliorer votre visibilité en ligne. Dans quel secteur d'activité évoluez-vous ?",
      type: "qualification"
    },
    {
      user: "Je suis dans la restauration à Montréal",
      bot: "Parfait ! Pour les restaurants à Montréal, nous avons des solutions spécialisées en référencement local. Souhaiteriez-vous que je programme un appel avec notre expert pour une analyse gratuite de votre présence en ligne ?",
      type: "conversion"
    },
    {
      user: "Quels sont vos tarifs ?",
      bot: "Nos tarifs varient selon vos besoins spécifiques. Je peux vous proposer une simulation personnalisée. Combien de visiteurs mensuels recevez-vous actuellement sur votre site ?",
      type: "pricing"
    }
  ];

  const integrations = [
    "WordPress & Sites web",
    "Facebook Messenger", 
    "WhatsApp Business",
    "Instagram Direct",
    "CRM Iluma™",
    "Email Marketing",
    "Google Analytics",
    "Calendly/RDV"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <LiloSEO />
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-full px-6 py-2 mb-6">
                <Bot className="w-5 h-5 text-[#FFD56B]" />
                <span className="text-white font-['Montserrat']">LILO™ ChatBot</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
                Comment l'IA comportementale{' '}
                <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">
                  améliore la navigation
                </span>{' '}
                utilisateur ?
              </h1>
              
              <p className="text-xl text-white/80 mb-4 max-w-3xl mx-auto font-['Montserrat']">
                LILO™ analyse le comportement des visiteurs en temps réel pour optimiser automatiquement l'expérience utilisateur et maximiser les conversions.
              </p>
              
              <div className="bg-white/10 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
                <h2 className="text-lg font-semibold text-white mb-2 font-['Montserrat']">
                  🤖 Lilo vous résume cette page
                </h2>
                <p className="text-white/90 font-['Montserrat']">
                  LILO™ observe comment vos visiteurs naviguent, identifie les points de friction, 
                  et ajuste automatiquement l'interface pour améliorer l'expérience et les conversions 24h/24.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Installer LILO™
                  </Button>
                </Link>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  onClick={() => setActiveDemo('conversation')}
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Voir la démo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12 font-['Montserrat']">
              Pourquoi choisir LILO™ ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chatbotFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/40 transition-all duration-300 hover:scale-105 text-center">
                      <CardContent className="p-0">
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3 font-['Montserrat']">{feature.title}</h3>
                        <p className="text-white/80 font-['Montserrat'] text-sm">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12 font-['Montserrat']">
              LILO™ en action
            </h2>
            <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 mb-8">
                <TabsTrigger value="conversation" className="font-['Montserrat']">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Conversation
                </TabsTrigger>
                <TabsTrigger value="integrations" className="font-['Montserrat']">
                  <Settings className="w-4 h-4 mr-2" />
                  Intégrations
                </TabsTrigger>
                <TabsTrigger value="analytics" className="font-['Montserrat']">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="conversation" className="mt-6">
                <Card className="glass-effect border-white/20 p-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-white mb-6 font-['Montserrat']">
                      Exemple de conversation intelligente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-w-2xl mx-auto">
                      {conversationExamples.map((example, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.3 }}
                          className="space-y-3"
                        >
                          {/* Message utilisateur */}
                          <div className="flex justify-end">
                            <div className="bg-[#8E44FF]/20 rounded-2xl rounded-br-sm p-4 max-w-xs">
                              <p className="text-white font-['Montserrat'] text-sm">{example.user}</p>
                            </div>
                          </div>
                          
                          {/* Réponse LILO */}
                          <div className="flex justify-start items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-black" />
                            </div>
                            <div className="bg-white/10 rounded-2xl rounded-bl-sm p-4 max-w-md">
                              <p className="text-white/90 font-['Montserrat'] text-sm">{example.bot}</p>
                              <Badge className="mt-2 bg-[#FFD56B]/20 text-[#FFD56B] text-xs">
                                {example.type}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="mt-6">
                <Card className="glass-effect border-white/20 p-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-white mb-6 font-['Montserrat'] text-center">
                      Intégrations disponibles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {integrations.map((integration, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-white/90 font-['Montserrat'] text-sm">{integration}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card className="glass-effect border-white/20 p-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-white mb-6 font-['Montserrat'] text-center">
                      Métriques et performances
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">+85%</div>
                        <p className="text-white/70 text-sm font-['Montserrat']">Taux de conversion</p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">&lt; 30s</div>
                        <p className="text-white/70 text-sm font-['Montserrat']">Temps de réponse</p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">24h/24</div>
                        <p className="text-white/70 text-sm font-['Montserrat']">Disponibilité</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                  Prêt à automatiser vos conversations ?
                </h2>
                <p className="text-white/80 mb-6 font-['Montserrat']">
                  Rejoignez les entreprises qui convertissent déjà plus de prospects avec LILO™
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
                    >
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Configuration gratuite
                    </Button>
                  </Link>
                  <Link to="/adluma">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
                    >
                      <Target className="w-5 h-5 mr-2" />
                      Estimer le ROI
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

export default LILO;