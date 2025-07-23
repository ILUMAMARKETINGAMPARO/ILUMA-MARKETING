import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Sparkles, X, Send, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useScrollDirection } from '@/hooks/useScrollDirection.ts';
import { useLiloUX } from '@/hooks/useLiloUX.ts';
import Lilo3DCharacter from './Lilo3DCharacter';
import LiloErrorBoundary from './LiloErrorBoundary';
import LiloFallback2D from './LiloFallback2D';
import { 
  getContextualResponse, 
  getPageSuggestions, 
  searchKnowledge, 
  getQuickStats,
  ilumaInfo
} from '@/utils/LiloKnowledgeBase';
import { LiloMood } from '@/hooks/useLiloUX.ts';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'LILO';
  timestamp: Date;
  suggestions?: string[];
  actions?: { label: string; action: string }[];
}

interface LiloIntelligent3DProps {
  isOpen?: boolean;
  onToggle?: () => void;
  currentPage?: string;
  floating?: boolean;
  followCursor?: boolean;
  reactionOnIdle?: boolean;
  glow?: boolean;
}

const LiloIntelligent3D: React.FC<LiloIntelligent3DProps> = ({
  isOpen = false,
  onToggle,
  currentPage = '/',
  floating = true,
  followCursor = false,
  reactionOnIdle = true,
  glow = true
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(isOpen);
  const [useFallback, setUseFallback] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  
  // Hooks
  const { liloMood, updateMood } = useLiloUX();
  const mood = liloMood;
  const [conversations, setConversations] = useState<Array<{question: string, answer: string}>>([]);
  const scrollDirection = useScrollDirection();

  // Vérification WebGL au montage
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported, using 2D fallback');
        setUseFallback(true);
        setWebGLSupported(false);
      }
    } catch (error) {
      console.warn('WebGL check failed:', error);
      setUseFallback(true);
      setWebGLSupported(false);
    }
  }, []);

  // Message d'accueil contextuel
  useEffect(() => {
    if (showChat && messages.length === 0) {
      const welcomeMessage = getContextualResponse(currentPage, 'welcome');
      setMessages([{
        id: '1',
        content: welcomeMessage.content,
        sender: 'LILO',
        timestamp: new Date(),
        suggestions: welcomeMessage.suggestions,
        actions: welcomeMessage.actions
      }]);
    }
  }, [showChat, currentPage, messages.length]);

  // Gestion sécurisée des erreurs WebGL
  const handleWebGLError = useCallback((error: any) => {
    console.warn('WebGL Error detected, switching to 2D fallback:', error);
    setUseFallback(true);
    setWebGLSupported(false);
  }, []);

  // Canvas sécurisé avec fallback automatique
  const SafeCanvas = useCallback(({ children }: { children: React.ReactNode }) => {
    if (!webGLSupported || useFallback) {
      return <LiloFallback2D mood={mood} onClick={() => setShowChat(!showChat)} />;
    }

    try {
      return (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ 
            background: 'transparent',
            pointerEvents: floating ? 'none' : 'auto'
          }}
          onCreated={(state) => {
            // Safe initialization with error handling
            try {
              if (state && state.gl && typeof state.gl.setClearColor === 'function') {
                state.gl.setClearColor(0x000000, 0); // Transparent background
              }
            } catch (error) {
              console.warn('Canvas setup warning:', error);
            }
          }}
          onError={handleWebGLError}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'default',
            failIfMajorPerformanceCaveat: false
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            {children}
          </Suspense>
        </Canvas>
      );
    } catch (error) {
      console.warn('Canvas creation failed, using 2D fallback:', error);
      setUseFallback(true);
      return <LiloFallback2D mood={mood} onClick={() => setShowChat(!showChat)} />;
    }
  }, [mood, floating, webGLSupported, useFallback, handleWebGLError, showChat]);

  // Envoyer un message
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    updateMood('thinking');

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = getContextualResponse(currentPage, 'help');
      
      const liloMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'LILO',
        timestamp: new Date(),
        suggestions: response.suggestions,
        actions: response.actions
      };

      setMessages(prev => [...prev, liloMessage]);
      setConversations(prev => [...prev, { question: inputValue, answer: response.content }]);
      updateMood('happy');
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: "Désolé, j'ai rencontré un problème technique. Pouvez-vous reformuler votre question ?",
        sender: 'LILO',
        timestamp: new Date()
      }]);
      updateMood('dormant');
    }

    setIsTyping(false);
  }, [inputValue, currentPage, conversations, updateMood]);

  // Gérer les suggestions
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  }, [handleSendMessage]);

  // Gérer les actions
  const handleActionClick = useCallback((action: string) => {
    if (action.startsWith('/')) {
      window.location.href = action;
    } else if (action.startsWith('http')) {
      window.open(action, '_blank');
    }
  }, []);

  // Afficher stats rapides
  const showQuickStats = useCallback(() => {
    const stats = getQuickStats();
    const statsMessage: Message = {
      id: Date.now().toString(),
      content: `📊 **Stats Iluma™**\n${stats}`,
      sender: 'LILO',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, statsMessage]);
  }, []);

  // Effect pour gérer l'ouverture/fermeture
  useEffect(() => {
    setShowChat(isOpen);
  }, [isOpen]);

  // Rendu avec protection d'erreur complète
  if (useFallback || !webGLSupported) {
    return (
      <LiloErrorBoundary
        onError={(error) => {
          console.warn('LILO fallback error:', error.message);
        }}
      >
        <div className={`${floating ? 'fixed bottom-6 right-6 z-40' : 'relative'}`}>
          <motion.div
            className="w-24 h-24 cursor-pointer"
            onClick={() => setShowChat(!showChat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LiloFallback2D 
              mood={mood} 
              onClick={() => setShowChat(!showChat)}
            />
          </motion.div>

          {/* Chat Interface */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-full right-0 mb-4"
              >
                <Card className="w-96 max-w-[90vw] bg-background/95 backdrop-blur-lg border border-border/50 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground font-['Montserrat']">
                          LILO™ 2D
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Assistant IA (Mode Sécurisé)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={showQuickStats}
                        className="h-8 w-8 p-0"
                        title="Stats rapides"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowChat(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="h-80 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg font-['Montserrat'] ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground ml-2'
                              : 'bg-muted text-foreground mr-2'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          
                          {/* Suggestions */}
                          {message.suggestions && (
                            <div className="mt-2 space-y-1">
                              {message.suggestions.map((suggestion, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start text-xs"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}

                          {/* Actions */}
                          {message.actions && (
                            <div className="mt-2 flex gap-2 flex-wrap">
                              {message.actions.map((action, idx) => (
                                <Button
                                  key={idx}
                                  size="sm"
                                  className="text-xs bg-gradient-to-r from-primary to-accent"
                                  onClick={() => handleActionClick(action.action)}
                                >
                                  {action.label}
                                  <ArrowRight className="w-3 h-3 ml-1" />
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-foreground p-3 rounded-lg mr-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-border/20">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Posez votre question à LILO..."
                        className="flex-1 font-['Montserrat']"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        size="sm"
                        className="bg-gradient-to-r from-primary to-accent"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LiloErrorBoundary>
    );
  }

  return (
    <LiloErrorBoundary
      onError={(error) => {
        console.warn('LILO 3D failed, switching to 2D fallback:', error.message);
        setUseFallback(true);
      }}
    >
      <div className={`${floating ? 'fixed bottom-6 right-6 z-40' : 'relative'}`}>
        {/* 3D LILO Character */}
        <motion.div
          className="w-24 h-24 cursor-pointer"
          onClick={() => setShowChat(!showChat)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SafeCanvas>
            <Lilo3DCharacter 
              mood={mood} 
              scale={1.2} 
              isIdle={!showChat}
            />
          </SafeCanvas>
        </motion.div>

        {/* Glow effect */}
        {glow && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl -z-10 animate-pulse" />
        )}

        {/* Chat Interface */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-full right-0 mb-4"
            >
              <Card className="w-96 max-w-[90vw] bg-background/95 backdrop-blur-lg border border-border/50 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Rocket className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground font-['Montserrat']">
                        LILO™ 3D
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Assistant IA Intelligent
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={showQuickStats}
                      className="h-8 w-8 p-0"
                      title="Stats rapides"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowChat(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg font-['Montserrat'] ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground ml-2'
                            : 'bg-muted text-foreground mr-2'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        
                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="mt-2 space-y-1">
                            {message.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-xs"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        {message.actions && (
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {message.actions.map((action, idx) => (
                              <Button
                                key={idx}
                                size="sm"
                                className="text-xs bg-gradient-to-r from-primary to-accent"
                                onClick={() => handleActionClick(action.action)}
                              >
                                {action.label}
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground p-3 rounded-lg mr-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/20">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Posez votre question à LILO..."
                      className="flex-1 font-['Montserrat']"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      size="sm"
                      className="bg-gradient-to-r from-primary to-accent"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LiloErrorBoundary>
  );
};

export default LiloIntelligent3D;