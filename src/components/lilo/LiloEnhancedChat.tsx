import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Volume2, VolumeX, Sparkles, Zap, Brain, Settings } from 'lucide-react';
import { LiloModule, LiloMood } from '@/types/lilo';
import { useLiloAI } from '@/hooks/useLiloAI.ts';

interface LiloEnhancedChatProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  module: LiloModule;
  context: {
    page: string;
    userLevel: string;
    recentActivity: string[];
    emotion?: string;
    industryContext?: string;
  };
  language?: string;
  onEmotionChange?: (emotion: LiloMood) => void;
}

const LiloEnhancedChat: React.FC<LiloEnhancedChatProps> = ({
  isOpen,
  onClose,
  userId,
  module,
  context,
  language = 'fr',
  onEmotionChange
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    isThinking,
    currentEmotion,
    sendMessage,
    clearConversation,
    executeAction,
    generateSuggestions,
    isConnected
  } = useLiloAI(userId, module, context, language);

  // Notifier le changement d'émotion au parent
  useEffect(() => {
    onEmotionChange?.(currentEmotion);
  }, [currentEmotion, onEmotionChange]);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus sur l'input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isThinking) return;
    
    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // TODO: Implémenter la reconnaissance vocale
  };

  const handleSpeakToggle = () => {
    setVoiceEnabled(!voiceEnabled);
    // TODO: Implémenter la synthèse vocale
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodIcon = (emotion: LiloMood) => {
    switch (emotion) {
      case 'thinking': return Brain;
      case 'excited': return Zap;
      case 'helper': return Sparkles;
      default: return Sparkles;
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Chat Container */}
      <motion.div
        className="relative w-full max-w-md h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(139, 92, 246, 0.5)',
                    '0 0 30px rgba(139, 92, 246, 0.8)',
                    '0 0 20px rgba(139, 92, 246, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {React.createElement(getMoodIcon(currentEmotion), {
                  className: "w-5 h-5 text-white"
                })}
              </motion.div>
              <div>
                <h3 className="text-white font-semibold">LILO™ Assistant IA</h3>
                <div className="flex items-center gap-2">
                  <motion.div
                    className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs text-gray-400">
                    {isConnected ? 'En ligne' : 'Hors ligne'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleSpeakToggle}
                className={`p-2 rounded-full ${voiceEnabled ? 'bg-purple-500/30 text-purple-300' : 'bg-gray-700/30 text-gray-400'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </motion.button>
              
              <motion.button
                onClick={() => clearConversation()}
                className="p-2 rounded-full bg-gray-700/30 text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full bg-red-500/20 text-red-400 hover:text-red-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Sparkles className="w-12 h-12 mx-auto text-purple-400 mb-4" />
              <h4 className="text-white font-medium mb-2">Bonjour ! Je suis LILO™</h4>
              <p className="text-gray-400 text-sm">Comment puis-je vous aider aujourd'hui ?</p>
              
              {/* Suggestions initiales */}
              <div className="mt-4 space-y-2">
                {generateSuggestions().map((suggestion, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setInputValue(suggestion)}
                    className="block w-full text-left p-3 rounded-lg bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-colors text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {/* Actions pour messages LILO */}
                  {message.sender === 'lilo' && message.actions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.actions.map((action, index) => (
                        <motion.button
                          key={index}
                          onClick={() => executeAction(action.action)}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs hover:bg-purple-500/30 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {action.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                  
                  {/* Suggestions pour messages LILO */}
                  {message.sender === 'lilo' && message.suggestions && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setInputValue(suggestion)}
                          className="block w-full text-left p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors text-xs"
                          whileHover={{ scale: 1.02 }}
                        >
                          💡 {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{formatTime(message.timestamp)}</span>
                  {message.emotion && (
                    <span className="capitalize">• {message.emotion}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Indicateur de frappe */}
          {isThinking && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-gray-800 p-3 rounded-2xl max-w-[80%]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">LILO réfléchit...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-purple-500/20">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleVoiceToggle}
              className={`p-3 rounded-full ${isListening ? 'bg-red-500/30 text-red-400' : 'bg-purple-500/30 text-purple-400'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isThinking}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </motion.button>
            
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isThinking ? "LILO réfléchit..." : "Tapez votre message..."}
                disabled={isThinking}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 disabled:opacity-50"
              />
              
              {inputValue.length > 100 && (
                <div className="absolute -top-6 right-0 text-xs text-gray-400">
                  {inputValue.length}/500
                </div>
              )}
            </div>
            
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isThinking}
              className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LiloEnhancedChat;