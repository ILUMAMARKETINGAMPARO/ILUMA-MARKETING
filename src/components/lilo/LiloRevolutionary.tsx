import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Mic, 
  Camera, 
  MessageCircle, 
  Zap,
  Target,
  TrendingUp,
  Users,
  ChevronRight,
  X,
  Maximize2,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client.ts';

interface LiloRevolutionaryProps {
  currentPage?: string;
  userId?: string;
  industryContext?: string;
  currentGoals?: string[];
}

export const LiloRevolutionary: React.FC<LiloRevolutionaryProps> = ({
  currentPage = '/',
  userId = 'demo-user',
  industryContext = 'général',
  currentGoals = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMode, setCurrentMode] = useState<'text' | 'voice' | 'visual'>('text');
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [behavioralScore, setBehavioralScore] = useState(0);
  const [predictiveInsights, setPredictiveInsights] = useState<any[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 15 Prompts Ultra-Spécialisés
  const ultraPrompts = [
    { id: 'prospection', name: 'Prospection IA-Assistée', icon: Target, color: 'from-blue-500 to-cyan-500' },
    { id: 'behavioral', name: 'Analyse Comportementale', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'marketing', name: 'Marketing Prédictif', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { id: 'competitive', name: 'Stratégie Concurrentielle', icon: Zap, color: 'from-red-500 to-orange-500' },
    { id: 'growth', name: 'Growth Hacking Intelligent', icon: Sparkles, color: 'from-yellow-500 to-amber-500' },
    { id: 'customer', name: 'Customer Success Auto', icon: Users, color: 'from-indigo-500 to-purple-500' },
    { id: 'sales', name: 'Sales Funnel Optimization', icon: Target, color: 'from-pink-500 to-rose-500' },
    { id: 'content', name: 'Content Strategy IA', icon: MessageCircle, color: 'from-teal-500 to-cyan-500' },
    { id: 'lead', name: 'Lead Scoring Avancé', icon: Brain, color: 'from-violet-500 to-purple-500' },
    { id: 'retention', name: 'Retention Analytics', icon: Users, color: 'from-blue-600 to-indigo-600' },
    { id: 'performance', name: 'Performance Marketing', icon: TrendingUp, color: 'from-green-600 to-teal-600' },
    { id: 'social', name: 'Social Selling Strategy', icon: Users, color: 'from-pink-600 to-red-600' },
    { id: 'brand', name: 'Brand Positioning IA', icon: Sparkles, color: 'from-orange-500 to-red-500' },
    { id: 'intelligence', name: 'Market Intelligence', icon: Brain, color: 'from-purple-600 to-indigo-600' },
    { id: 'revenue', name: 'Revenue Optimization', icon: TrendingUp, color: 'from-emerald-500 to-green-600' }
  ];

  // Intelligence comportementale en temps réel
  useEffect(() => {
    if (isOpen) {
      generateBehavioralInsights();
    }
  }, [isOpen, currentPage, responses.length]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [responses]);

  const generateBehavioralInsights = async () => {
    try {
      const context = {
        page: currentPage,
        userLevel: 'expert',
        recentActivity: responses.map(r => r.type || 'interaction'),
        emotion: 'engaged',
        industryContext,
        currentGoals,
        sessionContext: { messageCount: responses.length, timeSpent: Date.now() }
      };

      const response = await supabase.functions.invoke('lilo-ai-assistant', {
        body: {
          message: 'Analyse comportementale et prédictions',
          context,
          userId,
          interactionType: currentMode,
          promptId: 'behavioral'
        }
      });

      if (response.data) {
        setBehavioralScore(response.data.behavioralScore || 0);
        setPredictiveInsights(response.data.predictiveInsights || []);
      }
    } catch (error) {
      console.error('Error generating insights:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessage('');
    setIsLoading(true);

    // Ajouter le message utilisateur
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setResponses(prev => [...prev, newUserMessage]);

    try {
      const context = {
        page: currentPage,
        userLevel: 'expert',
        recentActivity: responses.map(r => r.type || 'interaction'),
        emotion: 'engaged',
        industryContext,
        currentGoals,
        behavioralData: { score: behavioralScore },
        sessionContext: { messageCount: responses.length, mode: currentMode }
      };

      const response = await supabase.functions.invoke('lilo-ai-assistant', {
        body: {
          message: userMessage,
          context,
          userId,
          interactionType: currentMode,
          promptId: selectedPrompt
        }
      });

      if (response.data) {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'lilo',
          content: response.data.response,
          suggestions: response.data.suggestions || [],
          predictiveInsights: response.data.predictiveInsights || [],
          nextBestActions: response.data.nextBestActions || [],
          personalizedTips: response.data.personalizedTips || [],
          timestamp: new Date()
        };
        
        setResponses(prev => [...prev, aiResponse]);
        setBehavioralScore(response.data.behavioralScore || behavioralScore);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        id: Date.now() + 1,
        type: 'lilo',
        content: 'Désolé, j\'ai rencontré une difficulté technique. Mes circuits galactiques se recalibrent ! 🛸',
        timestamp: new Date()
      };
      setResponses(prev => [...prev, errorResponse]);
    }

    setIsLoading(false);
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      setCurrentMode('voice');
      // Simulated voice input - in real implementation, use Web Speech API
      setTimeout(() => {
        setMessage('Message vocal simulé : Analysez ma stratégie marketing');
        setIsListening(false);
      }, 2000);
    }
  };

  const selectPrompt = (promptId: string) => {
    setSelectedPrompt(promptId);
    const prompt = ultraPrompts.find(p => p.id === promptId);
    setMessage(`Activez le mode ${prompt?.name} pour une analyse experte`);
  };

  return (
    <>
      {/* Bouton LILO Revolutionary */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center group ${
            selectedPrompt 
              ? 'bg-gradient-to-br from-accent to-primary' 
              : 'bg-gradient-to-br from-primary to-accent'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(139, 92, 246, 0.4)",
              "0 0 40px rgba(139, 92, 246, 0.6)",
              "0 0 20px rgba(139, 92, 246, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="w-7 h-7 text-white group-hover:rotate-180 transition-transform duration-500" />
          
          {/* Intelligence Indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary-foreground animate-pulse" />
          </div>
          
          {/* Behavioral Score Ring */}
          <svg className="absolute inset-0 w-16 h-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-white/20"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${(behavioralScore / 100) * 176} 176`}
              className="text-accent transition-all duration-1000"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Interface LILO Revolutionary */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              width: isExpanded ? '90vw' : '400px',
              height: isExpanded ? '90vh' : '600px'
            }}
            exit={{ opacity: 0, x: 400, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className={`fixed ${isExpanded ? 'top-5 right-5' : 'bottom-24 right-6'} z-50 max-w-full`}
          >
            <Card className="glass-effect border-primary/30 shadow-2xl h-full flex flex-col bg-background/95 backdrop-blur-xl">
              {/* Header Avancé */}
              <div className="flex items-center justify-between p-4 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center relative">
                    <Brain className="w-5 h-5 text-white" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground font-['Montserrat'] flex items-center gap-2">
                      LILO™ Revolutionary
                      <Badge variant="secondary" className="text-xs">
                        IA {selectedPrompt ? 'Expert' : 'Généraliste'}
                      </Badge>
                    </h3>
                    <div className="flex items-center gap-2">
                      <Progress value={behavioralScore} className="w-16 h-1" />
                      <span className="text-xs text-muted-foreground">
                        Score: {behavioralScore}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-8 w-8 p-0"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Prompts Ultra-Spécialisés */}
              {!isExpanded && (
                <div className="p-3 border-b border-border/10">
                  <div className="grid grid-cols-3 gap-1">
                    {ultraPrompts.slice(0, 6).map((prompt) => (
                      <Button
                        key={prompt.id}
                        variant={selectedPrompt === prompt.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => selectPrompt(prompt.id)}
                        className={`p-1 h-auto flex flex-col gap-1 text-xs ${
                          selectedPrompt === prompt.id 
                            ? `bg-gradient-to-r ${prompt.color} text-white` 
                            : ''
                        }`}
                      >
                        <prompt.icon className="w-3 h-3" />
                        <span className="leading-tight">{prompt.name.split(' ')[0]}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Zone de Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {responses.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                  >
                    <div className="text-4xl mb-2">🚀</div>
                    <h4 className="font-bold text-foreground font-['Montserrat']">
                      Intelligence Révolutionnaire Activée
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Choisissez un prompt spécialisé ou posez directement votre question
                    </p>
                    {predictiveInsights.length > 0 && (
                      <div className="space-y-2">
                        {predictiveInsights.map((insight, index) => (
                          <div key={index} className="bg-primary/10 rounded-lg p-2 text-xs">
                            {insight.description}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {responses.map((response) => (
                  <motion.div
                    key={response.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${response.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      response.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-accent/10 text-foreground'
                    }`}>
                      <p className="text-sm font-['Montserrat']">{response.content}</p>
                      
                      {response.suggestions?.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {response.suggestions.slice(0, 3).map((suggestion: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => setMessage(suggestion)}
                              className="block w-full text-left text-xs bg-primary/20 rounded p-1 hover:bg-primary/30 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      {response.nextBestActions?.length > 0 && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          <strong>Actions recommandées:</strong>
                          <ul className="mt-1 space-y-1">
                            {response.nextBestActions.map((action: string, index: number) => (
                              <li key={index} className="flex items-center gap-1">
                                <ChevronRight className="w-3 h-3" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-accent/10 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Interface d'Input Multimodale */}
              <div className="p-4 border-t border-border/20 space-y-3">
                {/* Mode Selector */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={currentMode === 'text' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentMode('text')}
                    className="h-7 px-2"
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Texte
                  </Button>
                  <Button
                    variant={currentMode === 'voice' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={handleVoiceInput}
                    className={`h-7 px-2 ${isListening ? 'animate-pulse' : ''}`}
                  >
                    <Mic className="w-3 h-3 mr-1" />
                    Vocal
                  </Button>
                  <Button
                    variant={currentMode === 'visual' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentMode('visual')}
                    className="h-7 px-2"
                  >
                    <Camera className="w-3 h-3 mr-1" />
                    Visuel
                  </Button>
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={
                      currentMode === 'voice' 
                        ? '🎤 Mode vocal activé...'
                        : currentMode === 'visual'
                        ? '📸 Décrivez votre analyse visuelle...'
                        : `Posez votre question ${selectedPrompt ? 'experte' : ''}...`
                    }
                    className="flex-1 px-3 py-2 bg-background/50 border border-border/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    disabled={isLoading || isListening}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!message.trim() || isLoading}
                    size="sm"
                    className="bg-gradient-to-r from-primary to-accent text-white"
                  >
                    <Zap className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Industrie: {industryContext}</span>
                  <span>Objectifs: {currentGoals.length}</span>
                  <span>IA: {selectedPrompt || 'Généraliste'}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiloRevolutionary;