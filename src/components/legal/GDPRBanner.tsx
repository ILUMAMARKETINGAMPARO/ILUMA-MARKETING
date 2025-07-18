import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Cookie, Shield, X, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const GDPRBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Always true, required
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem('iluma-cookie-consent');
    if (!savedConsent) {
      // Show banner after 2 seconds
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
      } catch (error) {
        console.error('Error parsing saved consent:', error);
      }
    }
  }, []);

  const saveConsent = (consentData: CookieConsent) => {
    localStorage.setItem('iluma-cookie-consent', JSON.stringify(consentData));
    localStorage.setItem('iluma-consent-date', new Date().toISOString());
    
    // Here you would typically initialize analytics, marketing tools, etc.
    if (consentData.analytics) {
      // Initialize Google Analytics, etc.
      console.log('Analytics cookies enabled');
    }
    
    if (consentData.marketing) {
      // Initialize marketing tools
      console.log('Marketing cookies enabled');
    }
    
    if (consentData.preferences) {
      // Initialize preference cookies
      console.log('Preference cookies enabled');
    }
  };

  const acceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setConsent(allConsent);
    saveConsent(allConsent);
    setShowBanner(false);
  };

  const acceptSelected = () => {
    saveConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setConsent(minimalConsent);
    saveConsent(minimalConsent);
    setShowBanner(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <Card className="glass-effect border-white/20 p-6 mx-auto max-w-4xl">
              <div className="flex items-start gap-4">
                <Cookie className="w-6 h-6 text-[hsl(var(--accent))] flex-shrink-0 mt-1" />
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white font-['Montserrat'] mb-2">
                    🍪 Respect de votre vie privée
                  </h3>
                  <p className="text-white/80 text-sm font-['Montserrat'] mb-4">
                    Nous utilisons des cookies pour améliorer votre expérience sur Iluma™. 
                    Vous pouvez accepter tous les cookies ou personnaliser vos préférences. 
                    Les cookies nécessaires sont toujours activés pour assurer le bon fonctionnement du site.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={acceptAll}
                      className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/80 text-white font-['Montserrat']"
                    >
                      Accepter tout
                    </Button>
                    
                    <Button
                      onClick={() => setShowSettings(true)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Personnaliser
                    </Button>
                    
                    <Button
                      onClick={rejectAll}
                      variant="ghost"
                      className="text-white/70 hover:text-white hover:bg-white/10 font-['Montserrat']"
                    >
                      Refuser tout
                    </Button>
                  </div>
                </div>
                
                <Button
                  onClick={() => setShowBanner(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="glass-effect border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-['Montserrat'] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[hsl(var(--primary))]" />
              Paramètres de confidentialité
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-white/80 text-sm font-['Montserrat']">
              Gérez vos préférences de cookies. Vous pouvez modifier ces paramètres à tout moment.
            </p>
            
            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                <div className="flex-1">
                  <h4 className="font-semibold text-white font-['Montserrat']">Cookies nécessaires</h4>
                  <p className="text-sm text-white/70 font-['Montserrat']">
                    Requis pour le bon fonctionnement du site. Ne peuvent pas être désactivés.
                  </p>
                </div>
                <Switch checked={true} disabled />
              </div>
              
              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                <div className="flex-1">
                  <h4 className="font-semibold text-white font-['Montserrat']">Cookies analytiques</h4>
                  <p className="text-sm text-white/70 font-['Montserrat']">
                    Nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
                  </p>
                </div>
                <Switch 
                  checked={consent.analytics}
                  onCheckedChange={(checked) => setConsent({ ...consent, analytics: checked })}
                />
              </div>
              
              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                <div className="flex-1">
                  <h4 className="font-semibold text-white font-['Montserrat']">Cookies marketing</h4>
                  <p className="text-sm text-white/70 font-['Montserrat']">
                    Utilisés pour vous montrer des publicités pertinentes sur d'autres sites.
                  </p>
                </div>
                <Switch 
                  checked={consent.marketing}
                  onCheckedChange={(checked) => setConsent({ ...consent, marketing: checked })}
                />
              </div>
              
              {/* Preference Cookies */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                <div className="flex-1">
                  <h4 className="font-semibold text-white font-['Montserrat']">Cookies de préférences</h4>
                  <p className="text-sm text-white/70 font-['Montserrat']">
                    Mémorisent vos préférences comme la langue et la région.
                  </p>
                </div>
                <Switch 
                  checked={consent.preferences}
                  onCheckedChange={(checked) => setConsent({ ...consent, preferences: checked })}
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                onClick={acceptSelected}
                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/80 text-white font-['Montserrat']"
              >
                Sauvegarder les préférences
              </Button>
              
              <Button
                onClick={acceptAll}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
              >
                Accepter tout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GDPRBanner;