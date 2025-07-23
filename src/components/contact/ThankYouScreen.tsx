import React from 'react';
import MPEContainer from '@/components/mpe/MPEContainer';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MessageCircle, Clock } from 'lucide-react';

interface FormData {
  nom: string;
  email: string;
  entreprise: string;
  secteur: string;
  budget: string;
  objectif: string;
  message: string;
  priorite: string;
}

interface ThankYouScreenProps {
  formData: FormData;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ formData }) => {
  const getRecommendedServices = () => {
    const services = [];
    if (formData.objectif.includes('trafic')) {
      services.push('SEO IA™', 'Content Marketing');
    }
    if (formData.objectif.includes('leads')) {
      services.push('Landing AIMANT™', 'Marketing Automation');
    }
    if (formData.objectif.includes('conversions')) {
      services.push('Optimisation CRO', 'A/B Testing');
    }
    return services.length > 0 ? services : ['Audit Marketing Complet'];
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <MPEContainer className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Merci <span className="text-gradient">{formData.nom}</span> !
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Votre demande a été reçue. Notre équipe d'experts vous contactera dans les 24h.
          </p>
          
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Services recommandés pour vous</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {getRecommendedServices().map(service => (
                <Badge key={service} className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-effect rounded-xl p-6">
              <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Réponse rapide</h4>
              <p className="text-white/70 text-sm">Nous vous recontactons sous 24h</p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <MessageCircle className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Consultation gratuite</h4>
              <p className="text-white/70 text-sm">Premier audit offert</p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Sur mesure</h4>
              <p className="text-white/70 text-sm">Solution adaptée à vos besoins</p>
            </div>
          </div>
        </MPEContainer>
      </div>
    </section>
  );
};

export default ThankYouScreen;