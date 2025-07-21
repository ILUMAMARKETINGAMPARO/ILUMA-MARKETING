import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiloAccessibilityToggleProps {
  onToggleLilo: () => void;
  isLiloDisabled: boolean;
}

const LiloAccessibilityToggle: React.FC<LiloAccessibilityToggleProps> = ({
  onToggleLilo,
  isLiloDisabled
}) => {
  const [showPanel, setShowPanel] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Charger les préférences d'accessibilité
    const motion = localStorage.getItem('lilo-reduced-motion') === 'true';
    const sound = localStorage.getItem('lilo-sound-enabled') !== 'false';
    setReducedMotion(motion);
    setSoundEnabled(sound);
  }, []);

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    localStorage.setItem('lilo-reduced-motion', newValue.toString());
    
    // Appliquer la classe CSS globale
    if (newValue) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  };

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('lilo-sound-enabled', newValue.toString());
  };

  return (
    <>
      {/* Bouton d'accessibilité fixe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-4 right-4 z-50"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPanel(!showPanel)}
          className="bg-black/80 border-purple-500/30 text-white hover:bg-purple-500/20 backdrop-blur-sm"
          aria-label="Options d'accessibilité LILO™"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Panneau d'accessibilité */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-16 right-4 z-50 w-80"
          >
            <Card className="bg-black/90 border-purple-500/30 backdrop-blur-xl">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-4 font-['Montserrat']">
                  Accessibilité LILO™
                </h3>
                
                <div className="space-y-4">
                  {/* Toggle LILO™ */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">Assistant LILO™</p>
                      <p className="text-white/60 text-xs">Activer/désactiver l'assistant IA</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onToggleLilo}
                      className={`border-purple-500/30 ${
                        isLiloDisabled 
                          ? 'text-red-400 hover:bg-red-500/10' 
                          : 'text-green-400 hover:bg-green-500/10'
                      }`}
                    >
                      {isLiloDisabled ? (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Désactivé
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Activé
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Réduire les animations */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">Réduire les animations</p>
                      <p className="text-white/60 text-xs">Mode animations simplifiées</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleReducedMotion}
                      className={`border-purple-500/30 ${
                        reducedMotion 
                          ? 'text-green-400 hover:bg-green-500/10' 
                          : 'text-white/60 hover:bg-purple-500/10'
                      }`}
                    >
                      {reducedMotion ? 'Activé' : 'Désactivé'}
                    </Button>
                  </div>

                  {/* Sons et audio */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">Sons d'interface</p>
                      <p className="text-white/60 text-xs">Effets sonores des interactions</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleSound}
                      className={`border-purple-500/30 ${
                        soundEnabled 
                          ? 'text-green-400 hover:bg-green-500/10' 
                          : 'text-red-400 hover:bg-red-500/10'
                      }`}
                    >
                      {soundEnabled ? (
                        <>
                          <Volume2 className="h-3 w-3 mr-1" />
                          Activé
                        </>
                      ) : (
                        <>
                          <VolumeX className="h-3 w-3 mr-1" />
                          Désactivé
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Information conformité */}
                  <div className="mt-6 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <p className="text-white/80 text-xs leading-relaxed">
                      <strong>Conformité WCAG 2.1 AA</strong><br/>
                      Navigation clavier, contraste optimisé, compatibilité lecteurs d'écran.
                    </p>
                  </div>

                  {/* Raccourcis clavier */}
                  <div className="text-white/60 text-xs space-y-1">
                    <p><kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Esc</kbd> Fermer LILO™</p>
                    <p><kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Ctrl+L</kbd> Toggle Assistant</p>
                    <p><kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Tab</kbd> Navigation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiloAccessibilityToggle;