import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, Share2, Check, Star, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BadgeSystemProps {
  isCompleted: boolean;
  progress: number;
  earnedBadges: string[];
  onDownload?: () => void;
  onShare?: () => void;
}

const BadgeSystem: React.FC<BadgeSystemProps> = ({
  isCompleted,
  progress,
  earnedBadges,
  onDownload,
  onShare
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const badges = [
    { id: 'architecture', name: 'Médaille Architecture', icon: '🏗️', description: 'Maîtrise de l\'arborescence' },
    { id: 'logique', name: 'Médaille Logique Modulaire', icon: '🧩', description: 'Compréhension des modules' },
    { id: 'technique', name: 'Médaille Technique', icon: '⚙️', description: 'Connaissances techniques' },
    { id: 'service', name: 'Médaille Service', icon: '🎯', description: 'Expertise services' },
    { id: 'partenaire', name: 'Médaille Impact Partenaire', icon: '🤝', description: 'Vision partenariale' },
    { id: 'complete', name: 'Iluma Formé(e)', icon: '🏆', description: 'Formation complète réussie' }
  ];

  useEffect(() => {
    if (isCompleted && !showCelebration) {
      setShowCelebration(true);
      
      // Animation séquencée
      const sequence = [
        () => setAnimationStep(1), // Halo
        () => setAnimationStep(2), // Badge
        () => setAnimationStep(3), // Confetti
        () => setAnimationStep(4)  // Final
      ];

      sequence.forEach((step, index) => {
        setTimeout(step, index * 1000);
      });
    }
  }, [isCompleted]);

  const getProgressColor = () => {
    if (progress < 30) return 'from-red-500 to-orange-500';
    if (progress < 70) return 'from-orange-500 to-yellow-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      {/* Progress Bar */}
      <Card className="glass-effect border-white/20 p-4 mb-4 min-w-[280px]">
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="w-5 h-5 text-[#FFD56B]" />
          <h3 className="text-white font-bold font-['Montserrat']">Progression Formation</h3>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Avancement</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full relative`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        {/* Earned Badges */}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge
              key={badge.id}
              variant={earnedBadges.includes(badge.id) ? "default" : "outline"}
              className={`text-xs ${
                earnedBadges.includes(badge.id) 
                  ? 'bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black' 
                  : 'text-white/60 border-white/20'
              }`}
            >
              {badge.icon} {badge.name.split(' ')[1]}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <Card className="glass-effect border-white/20 p-8 max-w-md text-center relative overflow-hidden">
              {/* Halo Effect */}
              {animationStep >= 1 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 3, opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-full"
                />
              )}

              {/* Main Badge */}
              {animationStep >= 2 && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  className="mb-6"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-12 h-12 text-black" />
                  </div>
                  <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-2">
                    🏆 Iluma Formé(e) !
                  </h2>
                  <p className="text-white/80 font-['Montserrat']">
                    Félicitations ! Tu maîtrises maintenant l'univers Iluma™
                  </p>
                </motion.div>
              )}

              {/* Confetti */}
              {animationStep >= 3 && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        y: -100, 
                        x: Math.random() * 400,
                        rotate: Math.random() * 360 
                      }}
                      animate={{ 
                        y: 600, 
                        rotate: Math.random() * 720 
                      }}
                      transition={{ 
                        duration: 3, 
                        delay: Math.random() * 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      className="absolute w-2 h-2 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded"
                    />
                  ))}
                </div>
              )}

              {/* Actions */}
              {animationStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-center mt-6"
                >
                  <Button
                    onClick={onDownload}
                    className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger Badge
                  </Button>
                  <Button
                    onClick={onShare}
                    variant="outline"
                    className="border-white/20 text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Button
                    onClick={() => setShowCelebration(false)}
                    variant="ghost"
                    className="text-white/60"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Fermer
                  </Button>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BadgeSystem;