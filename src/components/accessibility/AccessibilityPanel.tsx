import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Accessibility, Eye, Volume2, Type, Contrast, MousePointer, X, Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
interface AccessibilitySettings {
  fontSize: number;
  contrast: 'normal' | 'high' | 'inverted';
  animations: boolean;
  voiceReader: boolean;
  keyboardNav: boolean;
  largeButtons: boolean;
  focusHighlight: boolean;
}
const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('iluma-accessibility-settings');
    return saved ? JSON.parse(saved) : {
      fontSize: 16,
      contrast: 'normal',
      animations: true,
      voiceReader: false,
      keyboardNav: true,
      largeButtons: false,
      focusHighlight: true
    };
  });
  const {
    t,
    language
  } = useLanguage();
  useEffect(() => {
    localStorage.setItem('iluma-accessibility-settings', JSON.stringify(settings));
    applyAccessibilitySettings(settings);
  }, [settings]);
  const applyAccessibilitySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;

    // Font size
    root.style.setProperty('--accessibility-font-size', `${newSettings.fontSize}px`);

    // Contrast
    switch (newSettings.contrast) {
      case 'high':
        root.classList.add('high-contrast');
        root.classList.remove('inverted-contrast');
        break;
      case 'inverted':
        root.classList.add('inverted-contrast');
        root.classList.remove('high-contrast');
        break;
      default:
        root.classList.remove('high-contrast', 'inverted-contrast');
    }

    // Animations
    if (!newSettings.animations) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Large buttons
    if (newSettings.largeButtons) {
      root.classList.add('large-buttons');
    } else {
      root.classList.remove('large-buttons');
    }

    // Focus highlight
    if (newSettings.focusHighlight) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }
  };
  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 16,
      contrast: 'normal',
      animations: true,
      voiceReader: false,
      keyboardNav: true,
      largeButtons: false,
      focusHighlight: true
    };
    setSettings(defaultSettings);
  };
  const content = {
    fr: {
      title: "Panneau d'Accessibilité",
      fontSize: "Taille de Police",
      contrast: "Contraste",
      animations: "Animations",
      voiceReader: "Lecteur Vocal",
      keyboardNav: "Navigation Clavier",
      largeButtons: "Boutons Agrandis",
      focusHighlight: "Surbrillance Focus",
      reset: "Réinitialiser",
      close: "Fermer",
      normal: "Normal",
      high: "Élevé",
      inverted: "Inversé"
    },
    en: {
      title: "Accessibility Panel",
      fontSize: "Font Size",
      contrast: "Contrast",
      animations: "Animations",
      voiceReader: "Voice Reader",
      keyboardNav: "Keyboard Navigation",
      largeButtons: "Large Buttons",
      focusHighlight: "Focus Highlight",
      reset: "Reset",
      close: "Close",
      normal: "Normal",
      high: "High",
      inverted: "Inverted"
    },
    es: {
      title: "Panel de Accesibilidad",
      fontSize: "Tamaño de Fuente",
      contrast: "Contraste",
      animations: "Animaciones",
      voiceReader: "Lector de Voz",
      keyboardNav: "Navegación por Teclado",
      largeButtons: "Botones Grandes",
      focusHighlight: "Resaltado de Foco",
      reset: "Restablecer",
      close: "Cerrar",
      normal: "Normal",
      high: "Alto",
      inverted: "Invertido"
    }
  };
  const currentContent = content[language];
  return <>
      {/* Floating Accessibility Button */}
      <motion.div className="fixed left-4 bottom-4 z-50" whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }}>
        
      </motion.div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="w-full max-w-md">
              <Card className="glass-effect border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#8E44FF]" />
                    {currentContent.title}
                  </h2>
                  <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm" className="text-white/60 hover:bg-white/10">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Font Size */}
                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <Type className="w-4 h-4 text-[#FFD56B]" />
                      {currentContent.fontSize}: {settings.fontSize}px
                    </label>
                    <Slider value={[settings.fontSize]} onValueChange={([value]) => setSettings(prev => ({
                  ...prev,
                  fontSize: value
                }))} min={12} max={24} step={1} className="w-full" />
                  </div>

                  {/* Contrast */}
                  <div>
                    <label className="block text-white font-medium mb-2 flex items-center gap-2">
                      <Contrast className="w-4 h-4 text-[#FFD56B]" />
                      {currentContent.contrast}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['normal', 'high', 'inverted'].map(contrast => <Button key={contrast} onClick={() => setSettings(prev => ({
                    ...prev,
                    contrast: contrast as any
                  }))} variant={settings.contrast === contrast ? "default" : "outline"} size="sm" className={settings.contrast === contrast ? "bg-[#8E44FF] border-[#8E44FF]" : "border-white/20 text-white hover:bg-white/10"}>
                          {currentContent[contrast as keyof typeof currentContent]}
                        </Button>)}
                    </div>
                  </div>

                  {/* Toggle Settings */}
                  <div className="space-y-4">
                    {[{
                  key: 'animations',
                  icon: Eye,
                  label: currentContent.animations
                }, {
                  key: 'voiceReader',
                  icon: Volume2,
                  label: currentContent.voiceReader
                }, {
                  key: 'keyboardNav',
                  icon: MousePointer,
                  label: currentContent.keyboardNav
                }, {
                  key: 'largeButtons',
                  icon: MousePointer,
                  label: currentContent.largeButtons
                }, {
                  key: 'focusHighlight',
                  icon: Eye,
                  label: currentContent.focusHighlight
                }].map(({
                  key,
                  icon: Icon,
                  label
                }) => <div key={key} className="flex items-center justify-between">
                        <label className="text-white font-medium flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#FFD56B]" />
                          {label}
                        </label>
                        <Switch checked={settings[key as keyof AccessibilitySettings] as boolean} onCheckedChange={checked => setSettings(prev => ({
                    ...prev,
                    [key]: checked
                  }))} />
                      </div>)}
                  </div>

                  {/* Reset Button */}
                  <Button onClick={resetSettings} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    {currentContent.reset}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default AccessibilityPanel;