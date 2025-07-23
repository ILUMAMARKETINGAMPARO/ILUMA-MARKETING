import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, X, Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const GDPRBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('iluma-gdpr-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('iluma-gdpr-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('iluma-gdpr-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="glass-effect border-white/20 bg-black/90 text-white max-w-4xl mx-auto">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-2">Protection de vos données</h3>
              <p className="text-white/80 mb-4">
                Nous utilisons des cookies et technologies similaires pour améliorer votre expérience, 
                analyser notre trafic et personnaliser le contenu. Conformément au RGPD et à la Loi 25, 
                vous avez le contrôle total sur vos données.
              </p>
              
              {showDetails && (
                <div className="bg-white/5 rounded-lg p-4 mb-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Cookies nécessaires</span>
                    <span className="text-green-400">Requis</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cookies d'analyse</span>
                    <span className="text-blue-400">Optionnel</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cookies marketing</span>
                    <span className="text-purple-400">Optionnel</span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleAcceptAll}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  Accepter tout
                </Button>
                <Button 
                  onClick={handleAcceptNecessary}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Nécessaires seulement
                </Button>
                <Button 
                  onClick={() => setShowDetails(!showDetails)}
                  variant="ghost"
                  className="text-white/80 hover:bg-white/10"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Personnaliser
                </Button>
              </div>
            </div>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="text-white/60 hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GDPRBanner;