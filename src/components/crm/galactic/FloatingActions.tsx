import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Plus, 
  Users, 
  Target, 
  Brain, 
  Download,
  Upload,
  Settings,
  Sparkles,
  Zap,
  Heart
} from 'lucide-react';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const actions = [
    {
      id: 'add-client',
      icon: Users,
      label: 'Nouveau Client',
      color: 'from-blue-500 to-cyan-500',
      description: 'Ajouter un client avec IA'
    },
    {
      id: 'calculate-ila',
      icon: Target,
      label: 'Calculer ILA™',
      color: 'from-purple-500 to-pink-500',
      description: 'Analyse intelligente'
    },
    {
      id: 'ai-insights',
      icon: Brain,
      label: 'Insights IA',
      color: 'from-green-500 to-emerald-500',
      description: 'Suggestions personnalisées'
    },
    {
      id: 'export-data',
      icon: Download,
      label: 'Exporter',
      color: 'from-yellow-500 to-orange-500',
      description: 'Données et rapports'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Paramètres',
      color: 'from-gray-500 to-slate-500',
      description: 'Configuration CRM'
    }
  ];

  const handleActionClick = (actionId: string) => {
    console.log(`Action triggered: ${actionId}`);
    setIsOpen(false);
    
    // Here you would implement the actual actions
    switch (actionId) {
      case 'add-client':
        // Open add client modal
        break;
      case 'calculate-ila':
        // Trigger ILA calculation
        break;
      case 'ai-insights':
        // Show AI insights
        break;
      case 'export-data':
        // Export data
        break;
      case 'settings':
        // Open settings
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 space-y-3"
          >
            {actions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex items-center"
                  onMouseEnter={() => setHoveredAction(action.id)}
                  onMouseLeave={() => setHoveredAction(null)}
                >
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredAction === action.id && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute right-16 top-1/2 transform -translate-y-1/2"
                      >
                        <Card className="glass-effect border-white/20 p-3 min-w-[160px]">
                          <div className="text-sm font-medium text-white font-['Montserrat']">
                            {action.label}
                          </div>
                          <div className="text-xs text-white/60 font-['Montserrat']">
                            {action.description}
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={() => handleActionClick(action.id)}
                    className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
      >
        {/* Background pulse effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Icon */}
        <motion.div
          animate={isOpen ? { rotate: -45 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <Plus className="w-6 h-6 text-white" />
          ) : (
            <Sparkles className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          )}
        </motion.div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-30" />
        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 delay-75" />
        
        {/* Status indicator */}
        <motion.div 
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.button>
    </div>
  );
};

export default FloatingActions;