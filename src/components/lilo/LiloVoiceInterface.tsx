import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff, Zap, Brain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LiloVoiceInterfaceProps {
  onVoiceCommand?: (command: string) => void;
  isListening?: boolean;
  module?: string;
}

const LiloVoiceInterface: React.FC<LiloVoiceInterfaceProps> = ({
  onVoiceCommand,
  isListening = false,
  module = 'lilo'
}) => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<'neutral' | 'happy' | 'thinking' | 'speaking'>('neutral');
  const [voiceMetrics, setVoiceMetrics] = useState({
    confidence: 0,
    clarity: 0,
    responseTime: 0
  });

  // Simuler les métriques vocales
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setVoiceMetrics({
          confidence: Math.random() * 100,
          clarity: 85 + Math.random() * 15,
          responseTime: 200 + Math.random() * 300
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isListening]);

  const handleVoiceToggle = () => {
    setIsConnected(!isConnected);
    setCurrentEmotion(isConnected ? 'neutral' : 'thinking');
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const getEmotionColor = () => {
    switch (currentEmotion) {
      case 'happy': return 'from-green-400 to-emerald-500';
      case 'thinking': return 'from-blue-400 to-cyan-500';
      case 'speaking': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <Card className="glass-effect border-purple-500/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
            <Mic className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">LILO™ Voice</h3>
            <p className="text-white/60 text-sm">Interface vocale intelligente</p>
          </div>
        </div>
        
        <Badge 
          className={`${
            isConnected 
              ? 'bg-green-500/20 border-green-500/30 text-green-300' 
              : 'bg-gray-500/20 border-gray-500/30 text-gray-300'
          }`}
        >
          {isConnected ? 'Connecté' : 'Déconnecté'}
        </Badge>
      </div>

      {/* Avatar vocal animé */}
      <div className="flex justify-center mb-6">
        <motion.div
          className="relative"
          animate={isListening ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${getEmotionColor()} p-1`}>
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <motion.div
                animate={isListening ? { rotate: 360 } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-10 h-10 text-purple-400" />
              </motion.div>
            </div>
          </div>
          
          {/* Ondes sonores */}
          <AnimatePresence>
            {isListening && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-purple-400/30"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Contrôles vocaux */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={isConnected ? "default" : "outline"}
          size="lg"
          onClick={handleVoiceToggle}
          className={`rounded-full w-16 h-16 ${
            isConnected 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'border-white/20 hover:border-green-500/50'
          }`}
        >
          {isConnected ? (
            <PhoneOff className="w-6 h-6" />
          ) : (
            <Phone className="w-6 h-6" />
          )}
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleMuteToggle}
          disabled={!isConnected}
          className="rounded-full w-16 h-16 border-white/20"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </Button>

        <Button
          variant="outline"
          size="lg"
          disabled={!isConnected}
          className="rounded-full w-16 h-16 border-white/20"
        >
          <Zap className="w-6 h-6" />
        </Button>
      </div>

      {/* Métriques vocales */}
      {isConnected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {voiceMetrics.confidence.toFixed(0)}%
              </div>
              <div className="text-xs text-white/60">Confiance</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {voiceMetrics.clarity.toFixed(0)}%
              </div>
              <div className="text-xs text-white/60">Clarté</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {voiceMetrics.responseTime.toFixed(0)}ms
              </div>
              <div className="text-xs text-white/60">Latence</div>
            </div>
          </div>

          {/* Suggestions de commandes vocales */}
          <div className="mt-6 p-4 rounded-lg bg-white/5">
            <h4 className="text-sm font-semibold text-white mb-3">Commandes vocales disponibles</h4>
            <div className="space-y-2">
              {[
                "Analyser les performances",
                "Générer un rapport",
                "Optimiser la stratégie",
                "Prédire les tendances"
              ].map((command, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-xs text-white/70 p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onVoiceCommand?.(command)}
                >
                  <Mic className="w-3 h-3 text-purple-400" />
                  "{command}"
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default LiloVoiceInterface;