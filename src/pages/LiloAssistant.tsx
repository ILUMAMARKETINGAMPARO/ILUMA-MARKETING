import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { useTranslations } from '@/hooks/useTranslations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  MessageSquare, 
  Zap, 
  Target, 
  BarChart3, 
  Lightbulb,
  Sparkles,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Rocket,
  Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LiloAssistant = () => {
  const { t } = useTranslations();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: MessageSquare,
      title: t('liloAssistant.features.guidance.title'),
      description: t('liloAssistant.features.guidance.description'),
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: Brain,
      title: t('liloAssistant.features.analysis.title'), 
      description: t('liloAssistant.features.analysis.description'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: t('liloAssistant.features.recommendations.title'),
      description: t('liloAssistant.features.recommendations.description'),
      color: "from-cyan-500 to-green-500"
    },
    {
      icon: Zap,
      title: t('liloAssistant.features.automation.title'),
      description: t('liloAssistant.features.automation.description'),
      color: "from-green-500 to-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
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
                <span className="text-white font-['Montserrat']">{t('liloAssistant.hero.badge')}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
                {t('liloAssistant.hero.title')}
              </h1>
              
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto font-['Montserrat']">
                {t('liloAssistant.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t('liloAssistant.cta.button')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-effect border-white/10 p-8 mb-12">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-6 font-['Montserrat'] text-center">
                    {t('liloAssistant.features.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-6 rounded-xl glass-effect border-white/10 hover:border-[#8E44FF]/50 transition-all duration-300 cursor-pointer"
                        whileHover={{ y: -5 }}
                        onClick={() => setActiveFeature(index)}
                      >
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                          {feature.title}
                        </h3>
                        <p className="text-white/80 font-['Montserrat']">
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass-effect border-[#8E44FF]/20 p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
                  {t('liloAssistant.cta.title')}
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                    >
                      <Rocket className="w-5 h-5 mr-2" />
                      {t('liloAssistant.cta.button')}
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

export default LiloAssistant;