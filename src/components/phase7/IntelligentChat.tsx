import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Bot, 
  User, 
  Send, 
  Brain, 
  Shield,
  Zap,
  Settings,
  Search,
  Filter,
  Star,
  AlertCircle
} from 'lucide-react';

const IntelligentChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Bonjour Sergio ! Je suis l\'assistant IA d\'Iluma™. Comment puis-je vous aider avec votre CRM aujourd\'hui ?',
      timestamp: new Date(Date.now() - 300000),
      confidence: 98,
      category: 'greeting'
    },
    {
      id: 2,
      type: 'user',
      content: 'Peux-tu analyser les performances de nos dernières campagnes ADLUMA™ ?',
      timestamp: new Date(Date.now() - 240000),
      category: 'analysis'
    },
    {
      id: 3,
      type: 'ai',
      content: 'Analyse des campagnes ADLUMA™ en cours... J\'ai identifié 3 campagnes actives avec un ROI moyen de 340%. Voici le détail :\n\n• Campagne "Visibilité Locale": +89% de clics\n• Campagne "SEO Premium": +156% d\'impressions\n• Campagne "ILUMATCH™": +67% de conversions\n\nSouhaitez-vous un rapport détaillé ?',
      timestamp: new Date(Date.now() - 180000),
      confidence: 94,
      category: 'analysis',
      actions: ['generate_report', 'view_details', 'optimize_campaign']
    },
    {
      id: 4,
      type: 'user',
      content: 'Génère le rapport détaillé et propose des optimisations',
      timestamp: new Date(Date.now() - 120000),
      category: 'request'
    },
    {
      id: 5,
      type: 'ai',
      content: '📊 Rapport généré ! J\'ai créé un document complet avec 12 métriques clés et 5 recommandations d\'optimisation. Le rapport est disponible dans votre tableau de bord.\n\n🎯 Recommandations prioritaires :\n1. Augmenter le budget ADLUMA™ de 15% pour maximiser la portée\n2. Cibler les mots-clés "SEO local" (+23% de potentiel)\n3. Optimiser les heures de diffusion (16h-19h = +34% CTR)',
      timestamp: new Date(Date.now() - 60000),
      confidence: 96,
      category: 'report',
      actions: ['apply_recommendations', 'schedule_optimization', 'export_report']
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiCapabilities = [
    {
      name: 'Analyse Prédictive',
      description: 'Prévisions basées sur vos données CRM',
      confidence: 94,
      status: 'active'
    },
    {
      name: 'Optimisation Automatique',
      description: 'Suggestions d\'amélioration temps réel',
      confidence: 91,
      status: 'active'
    },
    {
      name: 'Détection d\'Anomalies',
      description: 'Identification proactive des problèmes',
      confidence: 87,
      status: 'monitoring'
    },
    {
      name: 'Recommandations Contextuelles',
      description: 'Conseils adaptés à votre situation',
      confidence: 93,
      status: 'active'
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: newMessage,
      timestamp: new Date(),
      category: 'user_input'
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simuler une réponse IA
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Je traite votre demande... Analysing your CRM data and generating intelligent insights.',
        timestamp: new Date(),
        confidence: 92,
        category: 'processing'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const executeAction = (action: string) => {
    console.log(`Executing action: ${action}`);
    // Ici on déclencherait la vraie action
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Capabilities Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {aiCapabilities.map((capability, index) => (
          <motion.div
            key={capability.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <Brain className="w-6 h-6 text-purple-400" />
                <Badge className={
                  capability.status === 'active' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                }>
                  {capability.confidence}%
                </Badge>
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">{capability.name}</h4>
              <p className="text-xs text-white/60">{capability.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages Area */}
        <div className="lg:col-span-2">
          <Card className="glass-effect border-white/20 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Assistant IA Iluma™</h3>
                  <p className="text-sm text-green-400">En ligne • Intelligent Mode</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-[#8E44FF] text-white' 
                      : 'bg-white/10 text-white border border-white/20'
                  } rounded-lg p-3`}>
                    <div className="flex items-start gap-2 mb-2">
                      {message.type === 'ai' && (
                        <Bot className="w-4 h-4 text-purple-400 mt-0.5" />
                      )}
                      {message.type === 'user' && (
                        <User className="w-4 h-4 text-white mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        
                        {/* AI Confidence & Actions */}
                        {message.type === 'ai' && (
                          <div className="mt-2 space-y-2">
                            {message.confidence && (
                              <div className="flex items-center gap-2">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span className="text-xs text-white/60">
                                  Confiance: {message.confidence}%
                                </span>
                              </div>
                            )}
                            
                            {message.actions && (
                              <div className="flex flex-wrap gap-1">
                                {message.actions.map((action) => (
                                  <Button
                                    key={action}
                                    size="sm"
                                    onClick={() => executeAction(action)}
                                    className="text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20"
                                  >
                                    {action.replace('_', ' ')}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-white/50">
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Posez votre question à l'IA Iluma™..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-[#8E44FF] hover:bg-[#8E44FF]/80"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-4">
          <Card className="glass-effect border-white/20 p-4">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Insights Temps Réel
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-300">Opportunité Détectée</span>
                </div>
                <p className="text-xs text-white/70">
                  3 nouveaux prospects qualifiés dans votre pipeline ILUMATCH™
                </p>
              </div>
              
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Performance</span>
                </div>
                <p className="text-xs text-white/70">
                  Vos campagnes ADLUMA™ sont 23% au-dessus de la moyenne
                </p>
              </div>

              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">Prédiction</span>
                </div>
                <p className="text-xs text-white/70">
                  Croissance prévue de 34% ce trimestre basée sur vos données
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-effect border-white/20 p-4">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Sécurité Chat
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Chiffrement</span>
                <span className="text-green-400">AES-256</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Données</span>
                <span className="text-green-400">Sécurisées</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Conformité</span>
                <span className="text-green-400">RGPD ✓</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntelligentChat;