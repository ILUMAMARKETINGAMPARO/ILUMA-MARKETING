import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, Users, Wine, Home, DollarSign, Palette, 
  Smartphone, Plane, Heart, Camera, Music, Coffee,
  Sparkles, Target, User
} from 'lucide-react';

interface Persona {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  channels: string[];
  moments: string[];
  emotion: string;
  color: string;
}

interface PersonaSelectorProps {
  onPersonaSelect: (persona: Persona) => void;
  selectedPersona?: Persona;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ onPersonaSelect, selectedPersona }) => {
  const [customPersona, setCustomPersona] = useState('');

  const personas: Persona[] = [
    {
      id: 'ufc-fan',
      title: '🥊 Fan de UFC / Sports extrêmes',
      description: 'Passionné d\'adrénaline et de compétition',
      icon: Zap,
      channels: ['YouTube', 'Instagram', 'TikTok'],
      moments: ['Soirées UFC', 'Week-ends', 'Après-entraînement'],
      emotion: 'Intensité et dépassement',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'parent',
      title: '🧘 Parent de jeunes enfants',
      description: 'Recherche équilibre et solutions pratiques',
      icon: Heart,
      channels: ['Facebook', 'Google Maps', 'Pinterest'],
      moments: ['Matins', 'Siestes enfants', 'Soirées'],
      emotion: 'Bienveillance et efficacité',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'nightlife',
      title: '🍸 Amateur de cocktails / Vie nocturne',
      description: 'Explorateur des tendances et sorties',
      icon: Wine,
      channels: ['Instagram', 'TikTok', 'Google Maps'],
      moments: ['Jeudis-samedis', 'Happy hours', 'Fins de soirée'],
      emotion: 'Découverte et plaisir',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'homeowner',
      title: '🏠 Propriétaire maison/immeuble',
      description: 'Investisseur immobilier averti',
      icon: Home,
      channels: ['Google Search', 'LinkedIn', 'Facebook'],
      moments: ['Week-ends', 'Soirées', 'Périodes fiscales'],
      emotion: 'Sécurité et valorisation',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'first-buyer',
      title: '💼 Premier acheteur immobilier',
      description: 'En quête de son premier chez-soi',
      icon: DollarSign,
      channels: ['Google Search', 'YouTube', 'Instagram'],
      moments: ['Soirées recherche', 'Week-ends visite', 'Pauses déjeuner'],
      emotion: 'Espoir et anxiété',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'finance-enthusiast',
      title: '💰 Passionné finance personnelle',
      description: 'Optimisateur de revenus et placements',
      icon: DollarSign,
      channels: ['LinkedIn', 'YouTube', 'Reddit'],
      moments: ['Matins café', 'Transports', 'Fins de mois'],
      emotion: 'Contrôle et croissance',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'creative-tattoo',
      title: '🎨 Créatif tatoué / Designer',
      description: 'Artiste indépendant et authentique',
      icon: Palette,
      channels: ['Instagram', 'TikTok', 'Pinterest'],
      moments: ['Inspirations nocturnes', 'Week-ends créatifs', 'Pauses artistiques'],
      emotion: 'Expression et originalité',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'tiktok-addict',
      title: '📱 Accro à TikTok',
      description: 'Consommateur de contenu viral',
      icon: Smartphone,
      channels: ['TikTok', 'Instagram', 'YouTube Shorts'],
      moments: ['Transports', 'Pauses', 'Avant sommeil'],
      emotion: 'Divertissement et tendances',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'digital-nomad',
      title: '🧳 Nomade numérique',
      description: 'Travailleur à distance et voyageur',
      icon: Plane,
      channels: ['LinkedIn', 'Instagram', 'Google Maps'],
      moments: ['Matins café', 'Changements de lieu', 'Networking'],
      emotion: 'Liberté et découverte',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-['Montserrat']">
            🎯 Identifiez votre client idéal
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto font-['Montserrat']">
            Choisissez le persona qui correspond le mieux à votre cible. L'IA adaptera automatiquement 
            les canaux, moments et approches émotionnelles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {personas.map((persona, index) => {
            const IconComponent = persona.icon;
            const isSelected = selectedPersona?.id === persona.id;
            
            return (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className={`glass-effect border-white/20 p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected ? 'ring-2 ring-[#8E44FF] border-[#8E44FF]/50' : 'hover:border-[#8E44FF]/40'
                  }`}
                  onClick={() => onPersonaSelect(persona)}
                >
                  <CardContent className="p-0">
                    <div className={`w-12 h-12 bg-gradient-to-r ${persona.color} rounded-xl flex items-center justify-center mb-3`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                      {persona.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-3 font-['Montserrat']">
                      {persona.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {persona.channels.slice(0, 2).map((channel) => (
                          <Badge key={channel} variant="secondary" className="text-xs bg-white/10 text-white/80">
                            {channel}
                          </Badge>
                        ))}
                        {persona.channels.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                            +{persona.channels.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs text-white/60 font-['Montserrat']">
                        💭 {persona.emotion}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Persona personnalisé */}
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-400 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Montserrat']">
                ➕ Créer un persona personnalisé
              </h3>
              <p className="text-white/70 text-sm font-['Montserrat']">
                Décrivez votre client idéal en quelques mots
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <input
              type="text"
              value={customPersona}
              onChange={(e) => setCustomPersona(e.target.value)}
              placeholder="Ex: Entrepreneur tech 25-35 ans, passionné d'innovation..."
              className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 font-['Montserrat']"
            />
            <Button 
              onClick={() => {
                if (customPersona.trim()) {
                  onPersonaSelect({
                    id: 'custom',
                    title: '🎯 Persona personnalisé',
                    description: customPersona,
                    icon: Target,
                    channels: ['Multi-canal'],
                    moments: ['Adaptatif'],
                    emotion: 'Personnalisé',
                    color: 'from-purple-500 to-blue-500'
                  });
                }
              }}
              disabled={!customPersona.trim()}
              className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Valider
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PersonaSelector;