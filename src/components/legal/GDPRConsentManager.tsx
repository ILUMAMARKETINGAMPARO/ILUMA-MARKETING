import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Shield, Cookie, Settings, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface ConsentSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  functional: boolean;
}

interface ConsentData {
  settings: ConsentSettings;
  timestamp: string;
  version: string;
  ip?: string;
  userAgent?: string;
}

const GDPRConsentManager = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    functional: false
  });

  const { language } = useLanguage();

  useEffect(() => {
    const savedConsent = localStorage.getItem('iluma-gdpr-consent');
    if (!savedConsent) {
      // Delay showing banner for better UX
      setTimeout(() => setIsVisible(true), 2000);
    } else {
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed.settings);
    }
  }, []);

  const saveConsent = (settings: ConsentSettings) => {
    const consentData: ConsentData = {
      settings,
      timestamp: new Date().toISOString(),
      version: '1.0',
      userAgent: navigator.userAgent
    };
    
    localStorage.setItem('iluma-gdpr-consent', JSON.stringify(consentData));
    setConsent(settings);
    setIsVisible(false);
    
    // Trigger consent event for analytics
    window.dispatchEvent(new CustomEvent('consentUpdated', { detail: consentData }));
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      functional: true
    });
  };

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      functional: false
    });
  };

  const acceptCustom = () => {
    saveConsent(consent);
  };

  const content = {
    fr: {
      title: "Protection de vos données personnelles",
      subtitle: "Conformité RGPD & Loi 25 - Votre confidentialité, notre priorité",
      description: "Nous utilisons des cookies et technologies similaires pour améliorer votre expérience, analyser notre trafic et personnaliser le contenu. Conformément au RGPD et à la Loi 25 du Québec, vous avez le contrôle total sur vos données.",
      dataController: "Responsable du traitement : Iluma Marketing LLC",
      rights: "Vos droits : accès, rectification, effacement, portabilité, opposition",
      contact: "Contact DPO : protection@ilumamarketing.com",
      cookieTypes: {
        necessary: {
          name: "Cookies nécessaires",
          description: "Essentiels au fonctionnement du site (navigation, sécurité, préférences linguistiques)"
        },
        analytics: {
          name: "Cookies d'analyse",
          description: "Nous aident à comprendre comment vous utilisez notre site (Google Analytics anonymisé)"
        },
        marketing: {
          name: "Cookies marketing",
          description: "Personnalisent les publicités et mesurent l'efficacité des campagnes"
        },
        preferences: {
          name: "Cookies de préférences",
          description: "Mémorisent vos choix et préférences d'utilisation"
        },
        functional: {
          name: "Cookies fonctionnels",
          description: "Améliorent les fonctionnalités (chatbot, formulaires, partage social)"
        }
      },
      buttons: {
        acceptAll: "Tout accepter",
        acceptNecessary: "Nécessaires seulement",
        customize: "Personnaliser",
        save: "Enregistrer mes choix",
        close: "Fermer"
      },
      links: {
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
        cookies: "Gestion des cookies"
      },
      status: {
        required: "Obligatoire",
        optional: "Optionnel",
        enabled: "Activé",
        disabled: "Désactivé"
      }
    },
    en: {
      title: "Personal Data Protection",
      subtitle: "GDPR & Loi 25 Compliance - Your privacy, our priority",
      description: "We use cookies and similar technologies to improve your experience, analyze our traffic, and personalize content. In accordance with GDPR and Quebec's Loi 25, you have full control over your data.",
      dataController: "Data Controller: Iluma Marketing LLC",
      rights: "Your rights: access, rectification, erasure, portability, opposition",
      contact: "DPO Contact: protection@ilumamarketing.com",
      cookieTypes: {
        necessary: {
          name: "Necessary Cookies",
          description: "Essential for site functionality (navigation, security, language preferences)"
        },
        analytics: {
          name: "Analytics Cookies",
          description: "Help us understand how you use our site (anonymized Google Analytics)"
        },
        marketing: {
          name: "Marketing Cookies",
          description: "Personalize ads and measure campaign effectiveness"
        },
        preferences: {
          name: "Preference Cookies",
          description: "Remember your choices and usage preferences"
        },
        functional: {
          name: "Functional Cookies",
          description: "Enhance functionality (chatbot, forms, social sharing)"
        }
      },
      buttons: {
        acceptAll: "Accept All",
        acceptNecessary: "Necessary Only",
        customize: "Customize",
        save: "Save My Choices",
        close: "Close"
      },
      links: {
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        cookies: "Cookie Management"
      },
      status: {
        required: "Required",
        optional: "Optional",
        enabled: "Enabled",
        disabled: "Disabled"
      }
    },
    es: {
      title: "Protección de Datos Personales",
      subtitle: "Cumplimiento RGPD y Ley 25 - Tu privacidad, nuestra prioridad",
      description: "Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar nuestro tráfico y personalizar el contenido. De acuerdo con el RGPD y la Ley 25 de Quebec, tienes control total sobre tus datos.",
      dataController: "Responsable del tratamiento: Iluma Marketing LLC",
      rights: "Tus derechos: acceso, rectificación, eliminación, portabilidad, oposición",
      contact: "Contacto DPO: protection@ilumamarketing.com",
      cookieTypes: {
        necessary: {
          name: "Cookies Necesarias",
          description: "Esenciales para el funcionamiento del sitio (navegación, seguridad, idioma)"
        },
        analytics: {
          name: "Cookies de Análisis",
          description: "Nos ayudan a entender cómo usas nuestro sitio (Google Analytics anonimizado)"
        },
        marketing: {
          name: "Cookies de Marketing",
          description: "Personalizan anuncios y miden la efectividad de campañas"
        },
        preferences: {
          name: "Cookies de Preferencias",
          description: "Recuerdan tus elecciones y preferencias de uso"
        },
        functional: {
          name: "Cookies Funcionales",
          description: "Mejoran la funcionalidad (chatbot, formularios, compartir social)"
        }
      },
      buttons: {
        acceptAll: "Aceptar Todo",
        acceptNecessary: "Solo Necesarias",
        customize: "Personalizar",
        save: "Guardar Mis Opciones",
        close: "Cerrar"
      },
      links: {
        privacy: "Política de Privacidad",
        terms: "Términos de Uso",
        cookies: "Gestión de Cookies"
      },
      status: {
        required: "Obligatorio",
        optional: "Opcional",
        enabled: "Activado",
        disabled: "Desactivado"
      }
    }
  };

  const currentContent = content[language];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <Card className="glass-effect border-white/20 bg-black/95 text-white max-w-6xl mx-auto">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-white">{currentContent.title}</h3>
                  <Badge className="bg-green-500/20 border-green-500/30 text-green-300 text-xs">
                    RGPD • Loi 25
                  </Badge>
                </div>
                
                <p className="text-[#FFD56B] text-sm font-medium mb-2">
                  {currentContent.subtitle}
                </p>
                
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  {currentContent.description}
                </p>

                <div className="text-xs text-white/60 space-y-1 mb-4">
                  <p>{currentContent.dataController}</p>
                  <p>{currentContent.rights}</p>
                  <p>{currentContent.contact}</p>
                </div>

                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/5 rounded-lg p-4 mb-4"
                  >
                    <div className="grid gap-4">
                      {Object.entries(currentContent.cookieTypes).map(([key, type]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Cookie className="w-4 h-4 text-[#FFD56B]" />
                              <span className="font-medium text-white">{type.name}</span>
                              <Badge 
                                className={key === 'necessary' ? 
                                  "bg-red-500/20 border-red-500/30 text-red-300" : 
                                  "bg-blue-500/20 border-blue-500/30 text-blue-300"
                                }
                                variant="outline"
                              >
                                {key === 'necessary' ? currentContent.status.required : currentContent.status.optional}
                              </Badge>
                            </div>
                            <p className="text-white/70 text-xs">{type.description}</p>
                          </div>
                          <Switch
                            checked={consent[key as keyof ConsentSettings]}
                            onCheckedChange={(checked) => 
                              setConsent(prev => ({ ...prev, [key]: checked }))
                            }
                            disabled={key === 'necessary'}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-wrap gap-3 items-center">
                  <Button 
                    onClick={acceptAll}
                    className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#7a3de6] hover:to-[#e6c063] text-white font-medium"
                  >
                    {currentContent.buttons.acceptAll}
                  </Button>

                  <Button 
                    onClick={acceptNecessary}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {currentContent.buttons.acceptNecessary}
                  </Button>

                  <Button 
                    onClick={() => setShowDetails(!showDetails)}
                    variant="ghost"
                    className="text-white/80 hover:bg-white/10"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {currentContent.buttons.customize}
                  </Button>

                  {showDetails && (
                    <Button 
                      onClick={acceptCustom}
                      className="bg-white/10 hover:bg-white/20 text-white"
                    >
                      {currentContent.buttons.save}
                    </Button>
                  )}

                  <div className="flex items-center gap-2 text-xs">
                    <a href="/privacy-policy" className="text-[#8E44FF] hover:text-[#FFD56B] flex items-center gap-1">
                      {currentContent.links.privacy}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-white/40">•</span>
                    <a href="/cookie-policy" className="text-[#8E44FF] hover:text-[#FFD56B] flex items-center gap-1">
                      {currentContent.links.cookies}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:bg-white/10 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default GDPRConsentManager;