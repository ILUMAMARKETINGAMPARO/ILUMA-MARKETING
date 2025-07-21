import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Brain, 
  MessageCircle,
  Lightbulb,
  TrendingUp,
  Users,
  Target,
  X
} from 'lucide-react';

interface LiloIntegrationProps {
  context: 'crm' | 'commercial' | 'collaborateur';
  currentSection?: string;
  data?: any;
  onSuggestion?: (suggestion: any) => void;
}

interface AISuggestion {
  id: string;
  type: 'insight' | 'action' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  action?: string;
  icon: React.ComponentType<any>;
  color: string;
}

const LiloIntegration: React.FC<LiloIntegrationProps> = ({ 
  context, 
  currentSection, 
  data,
  onSuggestion 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<AISuggestion | null>(null);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);

  // Generate contextual AI suggestions
  const generateSuggestions = (): AISuggestion[] => {
    const baseSuggestions: AISuggestion[] = [
      {
        id: 'client_follow_up',
        type: 'action',
        title: 'Relance Client Prioritaire',
        description: 'Restaurant La Belle Époque n\'a pas été contacté depuis 10 jours. Score ILA™ élevé.',
        confidence: 92,
        action: 'schedule_followup',
        icon: Users,
        color: '#FFD56B'
      },
      {
        id: 'revenue_optimization',
        type: 'optimization',
        title: 'Optimisation Revenus',
        description: 'Potentiel d\'augmentation de 25% en activant 2 services complémentaires.',
        confidence: 87,
        action: 'optimize_revenue',
        icon: TrendingUp,
        color: '#00FF88'
      },
      {
        id: 'cross_sell',
        type: 'insight',
        title: 'Opportunité Cross-Sell',
        description: 'Clinique Santé Plus est candidate idéale pour BlogIA (score compatibilité 94%).',
        confidence: 94,
        action: 'suggest_service',
        icon: Target,
        color: '#8E44FF'
      },
      {
        id: 'team_rebalance',
        type: 'optimization',
        title: 'Réequilibrage Équipe',
        description: 'Andrea surcharge (12 clients). Redistribution suggérée vers Alex.',
        confidence: 89,
        action: 'rebalance_team',
        icon: Users,
        color: '#FF8C42'
      }
    ];

    // Filter based on context
    switch (context) {
      case 'commercial':
        return baseSuggestions.filter(s => 
          ['client_follow_up', 'revenue_optimization', 'cross_sell'].includes(s.id)
        );
      case 'collaborateur':
        return baseSuggestions.filter(s => 
          ['team_rebalance', 'client_follow_up'].includes(s.id)
        );
      default:
        return baseSuggestions;
    }
  };

  useEffect(() => {
    const suggestions = generateSuggestions();
    setSuggestions(suggestions);
    
    // Auto-show LILO after 3 seconds
    const timer = setTimeout(() => {
      if (suggestions.length > 0) {
        setCurrentSuggestion(suggestions[0]);
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [context, currentSection]);

  const cycleSuggestions = () => {
    if (suggestions.length === 0) return;
    
    const currentIndex = currentSuggestion 
      ? suggestions.findIndex(s => s.id === currentSuggestion.id)
      : -1;
    
    const nextIndex = (currentIndex + 1) % suggestions.length;
    setCurrentSuggestion(suggestions[nextIndex]);
  };

  const handleAcceptSuggestion = () => {
    if (currentSuggestion && onSuggestion) {
      onSuggestion(currentSuggestion);
    }
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && currentSuggestion && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={handleDismiss}
          />

          {/* LILO Assistant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <Card className="glass-effect border-[#8E44FF]/30 bg-black/90 p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] flex items-center justify-center"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-white font-['Montserrat']">LILO™ Assistant</h4>
                    <p className="text-xs text-white/60">Intelligence artificielle</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDismiss}
                  className="border-white/20 text-white/60 hover:bg-white/10 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Suggestion Content */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${currentSuggestion.color}20` }}
                  >
                    <currentSuggestion.icon 
                      className="w-4 h-4" 
                      style={{ color: currentSuggestion.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-semibold text-white text-sm">
                        {currentSuggestion.title}
                      </h5>
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: `${currentSuggestion.color}20`,
                          color: currentSuggestion.color,
                          border: `1px solid ${currentSuggestion.color}40`
                        }}
                      >
                        {currentSuggestion.confidence}% sûr
                      </Badge>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {currentSuggestion.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAcceptSuggestion}
                    className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Appliquer
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cycleSuggestions}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Lightbulb className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDismiss}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>

                {/* Suggestion Counter */}
                {suggestions.length > 1 && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {suggestions.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            suggestions.indexOf(currentSuggestion) === index
                              ? 'bg-[#8E44FF]'
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-white/60 mt-1">
                      {suggestions.indexOf(currentSuggestion) + 1} sur {suggestions.length} suggestions
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LiloIntegration;