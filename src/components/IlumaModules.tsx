import React from 'react';
import { Calculator, Brain, Zap, Star, Settings, Globe, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslations } from '@/hooks/useTranslations';

const IlumaModules = () => {
  const { t } = useTranslations();

  const modules = [
    {
      id: 'adluma',
      name: "AdLuma™",
      description: "Simulateur prédictif de campagnes publicitaires",
      icon: Calculator,
      path: '/adluma',
      color: 'from-[#8E44FF] to-[#B88EFF]',
      delay: 0
    },
    {
      id: 'ila',
      name: "ILA™",
      description: "Intelligence Locale Adaptative",
      icon: Brain,
      path: '/ila',
      color: 'from-[#FFD56B] to-[#F5D06F]',
      delay: 100
    },
    {
      id: 'blogia',
      name: "BlogIA™",
      description: "Générateur de contenu IA avancé",
      icon: Zap,
      path: '/blogia',
      color: 'from-[#8E44FF] to-[#FFD56B]',
      delay: 200
    },
    {
      id: 'ilumatch',
      name: "ILUMATCH™",
      description: "IA de matching client-prospect",
      icon: Star,
      path: '/ilumatch',
      color: 'from-[#B88EFF] to-[#8E44FF]',
      delay: 300
    },
    {
      id: 'hub',
      name: "Hub Central",
      description: "Centre de contrôle IA intégré",
      icon: Settings,
      path: '/hub',
      color: 'from-[#F5D06F] to-[#FFD56B]',
      delay: 400
    },
    {
      id: 'landing',
      name: "Landing Pages IA",
      description: "Pages de conversion intelligentes",
      icon: Globe,
      path: '/landing-page-intelligente',
      color: 'from-[#8E44FF] to-[#F5D06F]',
      delay: 500
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0B0B0E] to-[#1a1a2e] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#8E44FF]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FFD56B]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6">
            <span className="bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] bg-clip-text text-transparent">
              Modules Iluma™
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-['Montserrat']">
            Découvrez notre écosystème d'intelligence artificielle galactique
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const IconComponent = module.icon;
            
            return (
              <Card
                key={module.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#8E44FF]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#8E44FF]/25 animate-fade-in-up"
                style={{ animationDelay: `${module.delay}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center group-hover:animate-pulse`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-white font-['Montserrat'] group-hover:text-[#FFD56B] transition-colors">
                    {module.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-white/70 font-['Montserrat'] text-sm leading-relaxed">
                    {module.description}
                  </CardDescription>
                  
                  <Link to={module.path}>
                    <Button 
                      variant="ghost" 
                      className="w-full text-[#8E44FF] hover:bg-[#8E44FF]/10 hover:text-[#FFD56B] transition-all duration-300 font-['Montserrat'] group-hover:shadow-lg"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Découvrir
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <Link to="/hub">
            <Button className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#8E44FF]/25 font-['Montserrat']">
              <Settings className="w-5 h-5 mr-2" />
              Voir Tous les Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IlumaModules;