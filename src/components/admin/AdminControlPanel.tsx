import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Palette, 
  Globe, 
  Bell, 
  Eye, 
  Brain, 
  Users, 
  Shield,
  Save,
  RotateCcw,
  Sparkles,
  Zap,
  Key
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import APITokenManager from './APITokenManager';
import EnhancedAPISecretsTable from './EnhancedAPISecretsTable';

interface AdminControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminControlPanel: React.FC<AdminControlPanelProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  
  // États pour tous les paramètres
  const [settings, setSettings] = useState({
    chatbot: {
      enabled: true,
      mobileOnly: false,
      desktopOnly: false,
      forceLanguage: 'auto',
      character: 'astronaut'
    },
    languages: {
      fr: true,
      en: true,
      es: true,
      autoDetect: true
    },
    notifications: {
      promoBar: false,
      maintenanceAlert: false,
      subscriptionPopup: false
    },
    modules: {
      adluma: true,
      caseStudies: true,
      blogIA: true,
      faq: true,
      analytics: true,
      crm: true
    },
    ai: {
      contextualSuggestions: true,
      dynamicPersonalization: true,
      smartRecommendations: true
    },
    design: {
      theme: 'galactic',
      animations: true,
      haloEffects: true,
      morphingBackground: true
    },
    team: {
      totalMembers: 4,
      activeMembers: 4
    }
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const resetSettings = () => {
    // Reset to default values
    setSettings({
      chatbot: {
        enabled: true,
        mobileOnly: false,
        desktopOnly: false,
        forceLanguage: 'auto',
        character: 'astronaut'
      },
      languages: {
        fr: true,
        en: true,
        es: true,
        autoDetect: true
      },
      notifications: {
        promoBar: false,
        maintenanceAlert: false,
        subscriptionPopup: false
      },
      modules: {
        adluma: true,
        caseStudies: true,
        blogIA: true,
        faq: true,
        analytics: true,
        crm: true
      },
      ai: {
        contextualSuggestions: true,
        dynamicPersonalization: true,
        smartRecommendations: true
      },
      design: {
        theme: 'galactic',
        animations: true,
        haloEffects: true,
        morphingBackground: true
      },
      team: {
        totalMembers: 4,
        activeMembers: 4
      }
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          <Card className="glass-effect border-[#8E44FF]/30 bg-black/90">
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white font-['Montserrat']">
                      Panneau de Contrôle Iluma™
                    </h2>
                    <p className="text-white/60 font-['Montserrat']">
                      Interface d'administration galactique
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={resetSettings}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <Tabs defaultValue="chatbot" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 bg-black/40 border border-white/20">
                  <TabsTrigger value="chatbot" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                    <Sparkles className="w-4 h-4 mr-2" />
                    LILO™
                  </TabsTrigger>
                  <TabsTrigger value="apis" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                    <Key className="w-4 h-4 mr-2" />
                    APIs
                  </TabsTrigger>
                  <TabsTrigger value="system" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                    <Settings className="w-4 h-4 mr-2" />
                    Système
                  </TabsTrigger>
                  <TabsTrigger value="design" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                    <Palette className="w-4 h-4 mr-2" />
                    Design
                  </TabsTrigger>
                  <TabsTrigger value="team" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                    <Users className="w-4 h-4 mr-2" />
                    Équipe
                  </TabsTrigger>
                </TabsList>

                {/* Chatbot Settings */}
                <TabsContent value="chatbot" className="space-y-6">
                  <Card className="glass-effect border-white/20 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#8E44FF]" />
                      Configuration Chatbot LILO™
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium font-['Montserrat']">Activer LILO™</p>
                          <p className="text-white/60 text-sm font-['Montserrat']">Afficher le chatbot IA sur le site</p>
                        </div>
                        <Switch
                          checked={settings.chatbot.enabled}
                          onCheckedChange={(checked) => updateSetting('chatbot', 'enabled', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium font-['Montserrat']">Mobile uniquement</p>
                          <p className="text-white/60 text-sm font-['Montserrat']">Limiter l'affichage aux appareils mobiles</p>
                        </div>
                        <Switch
                          checked={settings.chatbot.mobileOnly}
                          onCheckedChange={(checked) => updateSetting('chatbot', 'mobileOnly', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium font-['Montserrat']">Desktop uniquement</p>
                          <p className="text-white/60 text-sm font-['Montserrat']">Limiter l'affichage aux ordinateurs</p>
                        </div>
                        <Switch
                          checked={settings.chatbot.desktopOnly}
                          onCheckedChange={(checked) => updateSetting('chatbot', 'desktopOnly', checked)}
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* API & Tokens Management */}
                <TabsContent value="apis" className="space-y-6">
                  <EnhancedAPISecretsTable />
                </TabsContent>

                {/* System Settings */}
                <TabsContent value="system" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Languages */}
                    <Card className="glass-effect border-white/20 p-6">
                      <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[#8E44FF]" />
                        Langues
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(settings.languages).map(([lang, enabled]) => (
                          <div key={lang} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-[#8E44FF]/20 border-[#8E44FF]/30 text-[#8E44FF]">
                                {lang.toUpperCase()}
                              </Badge>
                              <span className="text-white font-['Montserrat']">
                                {lang === 'fr' && 'Français'}
                                {lang === 'en' && 'English'}
                                {lang === 'es' && 'Español'}
                                {lang === 'autoDetect' && 'Détection auto'}
                              </span>
                            </div>
                            <Switch
                              checked={enabled as boolean}
                              onCheckedChange={(checked) => updateSetting('languages', lang, checked)}
                            />
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Modules */}
                    <Card className="glass-effect border-white/20 p-6">
                      <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                        <Zap className="w-5 h-5 text-[#8E44FF]" />
                        Modules Actifs
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(settings.modules).map(([module, enabled]) => (
                          <div key={module} className="flex items-center justify-between">
                            <span className="text-white font-['Montserrat'] capitalize">
                              {module === 'adluma' && 'ADLUMA™'}
                              {module === 'caseStudies' && 'Études de cas'}
                              {module === 'blogIA' && 'BlogIA'}
                              {module === 'faq' && 'FAQ'}
                              {module === 'analytics' && 'Analytics'}
                              {module === 'crm' && 'CRM'}
                            </span>
                            <Switch
                              checked={enabled as boolean}
                              onCheckedChange={(checked) => updateSetting('modules', module, checked)}
                            />
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* AI Features */}
                  <Card className="glass-effect border-white/20 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[#8E44FF]" />
                      Fonctionnalités IA
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.entries(settings.ai).map(([feature, enabled]) => (
                        <div key={feature} className="flex items-center justify-between">
                          <span className="text-white font-['Montserrat'] text-sm">
                            {feature === 'contextualSuggestions' && 'Suggestions contextuelles'}
                            {feature === 'dynamicPersonalization' && 'Personnalisation dynamique'}
                            {feature === 'smartRecommendations' && 'Recommandations intelligentes'}
                          </span>
                          <Switch
                            checked={enabled as boolean}
                            onCheckedChange={(checked) => updateSetting('ai', feature, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {/* Design Settings */}
                <TabsContent value="design" className="space-y-6">
                  <Card className="glass-effect border-white/20 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                      <Palette className="w-5 h-5 text-[#8E44FF]" />
                      Apparence et Animations
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium font-['Montserrat']">Animations activées</p>
                          <p className="text-white/60 text-sm font-['Montserrat']">Effets de transition et animations</p>
                        </div>
                        <Switch
                          checked={settings.design.animations}
                          onCheckedChange={(checked) => updateSetting('design', 'animations', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium font-['Montserrat']">Effets halo</p>
                          <p className="text-white/60 text-sm font-['Montserrat']">Halos galactiques autour des éléments</p>
                        </div>
                        <Switch
                          checked={settings.design.haloEffects}
                          onCheckedChange={(checked) => updateSetting('design', 'haloEffects', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium font-['Montserrat']">Fond morphing</p>
                          <p className="text-white/60 text-sm font-['Montserrat']">Arrière-plan galactique animé</p>
                        </div>
                        <Switch
                          checked={settings.design.morphingBackground}
                          onCheckedChange={(checked) => updateSetting('design', 'morphingBackground', checked)}
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Team Management */}
                <TabsContent value="team" className="space-y-6">
                  <Card className="glass-effect border-white/20 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#8E44FF]" />
                      Gestion d'Équipe
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-white font-medium mb-2 font-['Montserrat']">Membres actifs</p>
                        <div className="text-3xl font-bold text-[#FFD56B] font-['Montserrat']">
                          {settings.team.activeMembers}/{settings.team.totalMembers}
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-2 font-['Montserrat']">Accès administrateur</p>
                        <div className="flex gap-2">
                          <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                            Sergio (CEO)
                          </Badge>
                          <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                            Amparo (COO)
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminControlPanel;