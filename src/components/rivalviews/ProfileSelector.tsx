import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Lock, 
  Zap, 
  Eye, 
  BarChart3, 
  MapPin,
  Target,
  Download,
  Database
} from 'lucide-react';

interface ProfileSelectorProps {
  onProfileSelect: (profile: 'entrepreneur' | 'employee') => void;
  currentProfile?: 'entrepreneur' | 'employee' | null;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ 
  onProfileSelect, 
  currentProfile 
}) => {
  const profiles = [
    {
      id: 'entrepreneur' as const,
      title: 'Interface Entrepreneur',
      subtitle: 'Vision simplifiée et actionnable',
      description: 'Explorez votre marché local, analysez la concurrence et obtenez des recommandations IA personnalisées pour votre entreprise.',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Analyse de marché simplifiée',
        'Comparaison concurrentielle',
        'Recommandations IA LILO™',
        'Cartes interactives',
        'Scores ILA™ expliqués'
      ],
      badge: 'Public'
    },
    {
      id: 'employee' as const,
      title: 'Interface Employé Iluma™',
      subtitle: 'Outils professionnels avancés',
      description: 'Accès complet aux données CRM, outils d\'export, analytics avancés et gestion des prospects avec assignation équipe.',
      icon: Lock,
      color: 'from-[#8E44FF] to-[#FFD56B]',
      features: [
        'CRM complet & assignation',
        'Export PDF/Excel avancé',
        'Analytics & métriques',
        'Gestion des prospects',
        'Données temps réel'
      ],
      badge: 'Privé'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {profiles.map((profile, index) => {
        const Icon = profile.icon;
        const isSelected = currentProfile === profile.id;
        
        return (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card 
              className={`h-full bg-black/60 backdrop-blur-xl border-2 transition-all duration-300 cursor-pointer
                ${isSelected 
                  ? 'border-[#8E44FF] shadow-lg shadow-[#8E44FF]/20' 
                  : 'border-white/10 hover:border-[#8E44FF]/50'
                }`}
              onClick={() => onProfileSelect(profile.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge 
                    className={profile.id === 'employee' 
                      ? 'bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30' 
                      : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }
                  >
                    {profile.badge}
                  </Badge>
                </div>
                
                <CardTitle className="text-white text-xl mb-2">
                  {profile.title}
                </CardTitle>
                <p className="text-[#8E44FF] text-sm font-medium">
                  {profile.subtitle}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-white/70 text-sm leading-relaxed">
                  {profile.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold text-sm">Fonctionnalités incluses :</h4>
                  <ul className="space-y-1">
                    {profile.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/60 text-xs">
                        <Zap className="w-3 h-3 text-[#FFD56B]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button
                  className={`w-full mt-4 transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-white shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onProfileSelect(profile.id);
                  }}
                >
                  {isSelected ? 'Interface Active' : `Accéder à l'interface`}
                  {profile.id === 'entrepreneur' ? (
                    <Eye className="w-4 h-4 ml-2" />
                  ) : (
                    <Database className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProfileSelector;