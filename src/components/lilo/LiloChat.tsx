import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  MessageCircle, 
  Send, 
  Sparkles, 
  Mic, 
  MicOff,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Bot,
  User,
  Zap,
  Brain,
  X
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
  metadata?: {
    emotion?: string;
    confidence?: number;
    actionSuggestions?: string[];
  };
}

interface LiloChatProps {
  isOpen: boolean;
  onClose: () => void;
  context?: {
    page: string;
    userLevel: string;
    recentActivity: string[];
    emotion?: string;
    industryContext?: string;
    currentGoals?: string[];
  };
  userId?: string;
  size?: 'compact' | 'expanded';
}

const LiloChat: React.FC<LiloChatProps> = ({
  isOpen,
  onClose,
  context = {
    page: '/',
    userLevel: 'beginner',
    recentActivity: []
  },
  userId = 'anonymous',
  size = 'compact'
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: `🚀 Salut ! Je suis LILO™, votre assistant IA galactique d'Iluma™. Je suis là pour vous aider à maximiser votre potentiel digital. Comment puis-je vous accompagner aujourd'hui ?`,
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          '🎯 Analyser mon potentiel SEO',
          '📊 Optimiser ma stratégie marketing',
          '🚀 Découvrir ADLUMA™',
          '💡 Conseils personnalisés'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (content: string, promptId?: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('lilo-ai-assistant', {
        body: {
          message: content,
          context,
          userId,
          sessionId,
          interactionType: 'text',
          promptId,
          userBehavior: {
            timeOnSite: Date.now() - (parseInt(sessionStorage.getItem('session_start_time') || '0') || Date.now()),
            pagesVisited: 1,
            scrollDepth: window.scrollY / document.body.scrollHeight,
            previousVisits: parseInt(localStorage.getItem('visit_count') || '0'),
            deviceType: window.innerWidth > 768 ? 'desktop' : 'mobile',
            referralSource: document.referrer ? 'referral' : 'direct',
            interactions: []
          },
          interaction: {
            type: 'chat_message',
            timestamp: Date.now(),
            element: 'lilo_chat',
            value: { message: content, promptId }
          },
          prompts: [
            'Intelligence conversationnelle avancée',
            'Personnalisation contextuelle',
            'Expertise sectorielle',
            'Recommandations prédictives',
            'Analyse comportementale',
            'Optimisation continue',
            'Support multimodal',
            'Engagement émotionnel'
          ]
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "Je rencontre une difficulté technique. Peux-tu réessayer ?",
        isUser: false,
        timestamp: new Date(),
        suggestions: data.suggestions?.slice(0, 4),
        metadata: {
          emotion: data.emotion,
          confidence: data.behavioralScore,
          actionSuggestions: data.nextBestActions
        }
      };

      setMessages(prev => [...prev, aiMessage]);

      // Text-to-speech for AI responses
      if (isSpeaking && synthRef.current && data.response) {
        const utterance = new SpeechSynthesisUtterance(
          data.response.replace(/[🚀✨🧠🎯💫🌟🔥💡📊🎨⚡]/g, '')
        );
        utterance.lang = 'fr-FR';
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        synthRef.current.speak(utterance);
      }

    } catch (error) {
      console.error('Error calling LILO:', error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de contacter LILO™. Vérifiez votre connexion.",
        variant: "destructive"
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "🛸 Oops ! Mon circuit galactique a eu un petit pépin. Peux-tu réessayer dans un moment ? ✨",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Fonctionnalité non supportée",
        description: "Votre navigateur ne supporte pas la reconnaissance vocale.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.lang = 'fr-FR';
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      sendMessage(transcript, 'voice_input');
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast({
        title: "Erreur de reconnaissance vocale",
        description: "Impossible de comprendre votre message vocal.",
        variant: "destructive"
      });
    };

    recognitionRef.current.start();
  };

  const toggleSpeaker = () => {
    setIsSpeaking(!isSpeaking);
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const cleanSuggestion = suggestion.replace(/[🚀✨🧠🎯💫🌟🔥💡📊🎨⚡]/g, '').trim();
    sendMessage(cleanSuggestion, 'suggestion_click');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  if (!isOpen) return null;

  const chatHeight = isMinimized ? 'h-16' : size === 'expanded' ? 'h-[600px]' : 'h-[500px]';
  const chatWidth = size === 'expanded' ? 'w-[450px]' : 'w-[380px]';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className={`fixed bottom-6 right-6 z-50 ${chatWidth} ${chatHeight} transition-all duration-300`}
      >
        <Card className="glass-effect border-[#8E44FF]/30 bg-black/95 shadow-2xl h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white font-['Montserrat'] text-lg">LILO™</h3>
                <p className="text-xs text-white/60">Assistant IA Galactique</p>
              </div>
              {isLoading && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  <Brain className="w-4 h-4 text-[#8E44FF]" />
                </motion.div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={toggleSpeaker}
                className="border-white/20 text-white/60 hover:bg-white/10 h-8 w-8 p-0"
              >
                {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsMinimized(!isMinimized)}
                className="border-white/20 text-white/60 hover:bg-white/10 h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onClose}
                className="border-white/20 text-white/60 hover:bg-white/10 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${message.isUser ? 'order-first' : ''}`}>
                      <div
                        className={`p-3 rounded-2xl ${
                          message.isUser
                            ? 'bg-[#8E44FF] text-white ml-auto'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap font-['Montserrat']">
                          {message.content}
                        </p>
                        {message.metadata?.confidence && (
                          <Badge
                            variant="outline"
                            className="mt-2 text-xs border-white/20 text-white/70"
                          >
                            Confiance: {message.metadata.confidence}%
                          </Badge>
                        )}
                      </div>
                      {message.suggestions && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs border-[#8E44FF]/30 text-white/80 hover:bg-[#8E44FF]/20"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Tapez votre message..."
                      disabled={isLoading}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 pr-12"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleVoiceInput}
                      disabled={isLoading}
                      className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 border-white/20 ${
                        isListening ? 'bg-[#8E44FF] text-white' : 'text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white h-10 w-10 p-0"
                  >
                    {isLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <Zap className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default LiloChat;