import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Sparkles, 
  Brain,
  TrendingUp,
  Users,
  Target,
  Calendar,
  FileText,
  Zap
} from 'lucide-react';

interface SmartIntegrationButtonProps {
  context: 'tasks' | 'meetings' | 'clients' | 'revenue';
  onIntegrate: (suggestion: any) => void;
}

const SmartIntegrationButton: React.FC<SmartIntegrationButtonProps> = ({ 
  context, 
  onIntegrate 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const getContextConfig = () => {
    switch (context) {
      case 'tasks':
        return {
          title: 'Intégrer Intelligemment les Tâches',
          icon: FileText,
          color: '#8E44FF',
          description: 'Optimise la priorisation et l\'attribution automatique des tâches'
        };
      case 'meetings':
        return {
          title: 'Optimiser les Réunions avec IA',
          icon: Calendar,
          color: '#FFD56B',
          description: 'Planification intelligente et suggestions de participants'
        };
      case 'clients':
        return {
          title: 'Intelligence Client Avancée',
          icon: Users,
          color: '#00FF88',
          description: 'Analyse comportementale et prédictions de conversion'
        };
      case 'revenue':
        return {
          title: 'Prédictions Revenus IA',
          icon: TrendingUp,
          color: '#FF8C42',
          description: 'Forecasting intelligent et optimisation tarifaire'
        };
    }
  };

  const config = getContextConfig();
  const IconComponent = config.icon;

  const generateSuggestions = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const contextSuggestions = {
      tasks: [
        {
          type: 'prioritization',
          title: 'Réorganisation par Impact',
          description: 'Déplacer 3 tâches haute priorité vers Andrea (disponibilité optimale)',
          confidence: 89,
          action: 'reorder_tasks'
        },
        {
          type: 'automation',
          title: 'Automatisation Détectée',
          description: 'Tâches répétitives (reports) peuvent être automatisées',
          confidence: 94,
          action: 'automate_recurring'
        }
      ],
      meetings: [
        {
          type: 'optimization',
          title: 'Créneaux Optimaux',
          description: 'Mardis 14h-16h = 85% participation moyenne équipe',
          confidence: 92,
          action: 'optimize_schedule'
        },
        {
          type: 'participants',
          title: 'Suggestions Participants',
          description: 'Ajouter Alex aux réunions techniques (expertise requise)',
          confidence: 87,
          action: 'suggest_attendees'
        }
      ],
      clients: [
        {
          type: 'upsell',
          title: 'Opportunité Upsell',
          description: 'Restaurant La Belle Époque: +40% revenus avec BlogIA',
          confidence: 91,
          action: 'suggest_upsell'
        },
        {
          type: 'retention',
          title: 'Risque de Churn',
          description: 'Clinique Santé Plus: activité faible, relance recommandée',
          confidence: 78,
          action: 'prevent_churn'
        }
      ],
      revenue: [
        {
          type: 'forecast',
          title: 'Prévision Q2',
          description: 'Croissance 23% prévue avec pipeline actuel',
          confidence: 85,
          action: 'update_forecast'
        },
        {
          type: 'pricing',
          title: 'Optimisation Prix',
          description: 'Service SEO: +15% marge possible (analyse concurrentielle)',
          confidence: 88,
          action: 'optimize_pricing'
        }
      ]
    };

    setSuggestions(contextSuggestions[context] || []);
    setIsAnalyzing(false);
  };

  const handleAnalyze = () => {
    setShowModal(true);
    generateSuggestions();
  };

  const handleApply = (suggestion: any) => {
    onIntegrate(suggestion);
    setShowModal(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleAnalyze}
          className="relative overflow-hidden group"
          style={{ 
            backgroundColor: `${config.color}20`,
            borderColor: `${config.color}40`,
            color: config.color
          }}
          variant="outline"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity"
            style={{
              background: `linear-gradient(90deg, ${config.color}00, ${config.color}40, ${config.color}00)`
            }}
            animate={{
              x: [-100, 300]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <Sparkles className="w-4 h-4 mr-2" />
          Intégrer Intelligemment
          
          {/* Pulsing dot */}
          <motion.div
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: config.color }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Button>
      </motion.div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl font-['Montserrat']">
              <IconComponent 
                className="w-6 h-6" 
                style={{ color: config.color }}
              />
              {config.title}
            </DialogTitle>
            <p className="text-white/60 text-sm">{config.description}</p>
          </DialogHeader>

          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#8E44FF] mx-auto"
                  />
                  <div>
                    <h4 className="text-white font-semibold">Analyse IA en cours...</h4>
                    <p className="text-white/60 text-sm">Traitement des données et génération de suggestions</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-[#8E44FF]" />
                  <span className="text-white font-semibold">Suggestions Intelligentes</span>
                </div>

                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-effect border-white/20 p-4 hover:border-white/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-semibold text-white">{suggestion.title}</h5>
                            <div 
                              className="px-2 py-1 rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: `${config.color}20`,
                                color: config.color
                              }}
                            >
                              {suggestion.confidence}% sûr
                            </div>
                          </div>
                          <p className="text-white/70 text-sm mb-3">
                            {suggestion.description}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApply(suggestion)}
                              className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              Appliquer
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              Voir Détails
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {suggestions.length === 0 && (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-white/40 mx-auto mb-3" />
                    <p className="text-white/60">Aucune suggestion disponible pour le moment</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SmartIntegrationButton;