import React from 'react';
import MPEContainer from '@/components/mpe/MPEContainer';
import { Button } from '@/components/ui/button';

const HubCTA: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <MPEContainer className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Besoin d'un service <span className="text-gradient">sur mesure</span> ?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Notre équipe d'experts peut créer une solution personnalisée pour vos besoins spécifiques
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover-glow"
            onClick={() => window.location.href = '/contact'}
          >
            Demander un devis personnalisé
          </Button>
        </MPEContainer>
      </div>
    </section>
  );
};

export default HubCTA;
