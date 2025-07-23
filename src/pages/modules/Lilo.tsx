import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Bot, MessageCircle, Zap, Globe, Brain, Heart, Send, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';

const LILO = () => {
  const { t } = useLanguage();
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'LILO',
      message: t('LILO.hero.title'),
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      sender: 'user',
      message: inputMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate LILO response
    setTimeout(() => {
      const responses = [
        "👽 Excellente question ! Je peux vous aider avec ça.",
        "🚀 Laissez-moi analyser vos besoins avec mon IA avancée...",
        "⭐ Je recommande de commencer par notre simulateur ADLUMA™ !",
        "🔍 Votre score ILA™ pourrait être amélioré. Voulez-vous que je vous guide ?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatMessages(prev => [...prev, {
        sender: 'LILO',
        message: randomResponse,
        timestamp: new Date()
      }]);
    }, 1000);
    
    setInputMessage('');
  };

  const features = [
    {
      icon: Brain,
      title: t('LILO.features.intelligent.title'),
      description: t('LILO.features.intelligent.description')
    },
    {
      icon: Globe,
      title: t('LILO.features.multilingual.title'),
      description: t('LILO.features.multilingual.description')
    },
    {
      icon: Zap,
      title: t('LILO.features.interactive.title'),
      description: t('LILO.features.interactive.description')
    },
    {
      icon: Heart,
      title: t('LILO.features.memory.title'),
      description: t('LILO.features.memory.description')
    }
  ];

  const exampleQuestions = [
    t('LILO.demo.examples.0'),
    t('LILO.demo.examples.1'),
    t('LILO.demo.examples.2')
  ];

  // Safely handle personality traits - ensure it's always an array
  const getPersonalityTraits = (): string[] => {
    const traits = t('LILO.personality.traits');
    if (Array.isArray(traits)) {
      return traits;
    }
    // Fallback if translation returns a string instead of array
    return [traits];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="w-8 h-8 text-purple-400" />
              <span className="text-purple-300 font-medium text-lg font-['Montserrat']">{t('LILO.title')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6 font-['Montserrat'] leading-tight">
              {t('LILO.subtitle')}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-['Montserrat']">
              {t('LILO.hero.description')}
            </p>
          </motion.div>

          {/* LILO Character Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center relative overflow-hidden">
                <Bot className="w-16 h-16 text-white animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-400/20 to-transparent animate-pulse"></div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" />
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12 font-['Montserrat']">
              {t('LILO.features.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="glass-effect border-white/20 p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">{feature.title}</h3>
                    <p className="text-white/70 font-['Montserrat']">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Personality Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <Card className="glass-effect border-white/20 p-8">
              <h2 className="text-3xl font-bold text-white text-center mb-8 font-['Montserrat']">
                {t('LILO.personality.title')}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getPersonalityTraits().map((trait, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-black/20">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-white font-['Montserrat']">{trait}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8 font-['Montserrat']">
              {t('LILO.demo.title')}
            </h2>
            <Card className="glass-effect border-white/20 p-6 max-w-2xl mx-auto">
              <div className="h-64 overflow-y-auto mb-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-xl ${
                      msg.sender === 'user' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-black/40 text-white border border-purple-400/30'
                    }`}>
                      <p className="font-['Montserrat']">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder={t('LILO.demo.chat_placeholder')}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="bg-black/20 border-white/20 text-white"
                />
                <Button onClick={sendMessage} className="bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {exampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(question)}
                    className="border-purple-400/30 text-purple-300 hover:bg-purple-600/20 font-['Montserrat']"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center"
          >
            <Card className="glass-effect border-white/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                {t('LILO.cta.title')}
              </h2>
              <p className="text-white/80 mb-6 font-['Montserrat']">
                {t('LILO.cta.description')}
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 font-['Montserrat']">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('LILO.cta.button')}
              </Button>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LILO;