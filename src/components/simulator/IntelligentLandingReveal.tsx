import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Download, RotateCcw, Brain, Zap, Users, ArrowRight } from 'lucide-react';

interface IntelligentLandingRevealProps {
  simulatorData: {
    selectedInterests: string[];
    budget: number;
    networks: string[];
    impressions: number;
    targetingStrength: number;
  };
  businessContext: { industry: string; city: string; goal: string } | null;
  onReset: () => void;
}

const IntelligentLandingReveal: React.FC<IntelligentLandingRevealProps> = ({
  simulatorData,
  businessContext,
  onReset
}) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [visibleLeads, setVisibleLeads] = useState<Array<{ id: number; category: string; color: string }>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animationStep < 3) {
        setAnimationStep(animationStep + 1);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [animationStep]);

  useEffect(() => {
    if (animationStep >= 2) {
      const interval = setInterval(() => {
        const categories = [
          { category: 'Intéressé', color: 'from-blue-400 to-cyan-400' },
          { category: 'À suivre', color: 'from-yellow-400 to-orange-400' },
          { category: 'Prêt à acheter', color: 'from-green-400 to-emerald-400' }
        ];
        
        const newLead = {
          id: Date.now() + Math.random(),
          ...categories[Math.floor(Math.random() * categories.length)]
        };
        
        setVisibleLeads(prev => [...prev.slice(-8), newLead]);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [animationStep]);

  const landingPageFeatures = [
    {
      title: "Chatbot Contextuel",
      description: "S'adapte au profil de chaque visiteur",
      icon: Brain,
      active: animationStep >= 1
    },
    {
      title: "Questions Adaptatives",
      description: "Formulaire évolutif basé sur les réponses",
      icon: Zap,
      active: animationStep >= 2
    },
    {
      title: "Sync CRM Intelligente",
      description: "Catégorisation automatique des leads",
      icon: Users,
      active: animationStep >= 3
    }
  ];

  const generateProjections = () => {
    const monthlyLeads = Math.round(simulatorData.budget * simulatorData.targetingStrength * 0.08);
    const qualifiedRate = 0.6;
    const qualifiedLeads = Math.round(monthlyLeads * qualifiedRate);
    
    return {
      totalLeads: monthlyLeads,
      qualifiedLeads,
      conversionRate: (qualifiedLeads / Math.max(1, monthlyLeads) * 100).toFixed(1)
    };
  };

  const projections = generateProjections();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          <span className="text-gradient">Landing Page Intelligente</span>
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Découvrez comment votre page convertit et segmente automatiquement vos visiteurs
        </p>
      </div>

      {/* Main Visualization */}
      <Card className="glass-effect border-white/20 p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Landing Page Preview */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-white/20 min-h-[400px]">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {businessContext?.industry === 'automobile' ? 'Trouvez Votre Véhicule Idéal' :
                   businessContext?.industry === 'mattress' ? 'Votre Sommeil Parfait Vous Attend' :
                   'Créez Votre Espace de Rêve'}
                </h3>
                <p className="text-white/70">Spécialement conçu pour vous à {businessContext?.city}</p>
              </div>

              {/* Adaptive Features */}
              <div className="space-y-4">
                {landingPageFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-1000 ${
                        feature.active 
                          ? 'bg-gradient-to-r from-cyan-400/20 to-purple-400/20 glow-effect' 
                          : 'bg-white/5'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 ${feature.active ? 'text-cyan-400' : 'text-white/40'}`} />
                      <div>
                        <div className={`font-medium ${feature.active ? 'text-white' : 'text-white/40'}`}>
                          {feature.title}
                        </div>
                        <div className={`text-sm ${feature.active ? 'text-white/70' : 'text-white/30'}`}>
                          {feature.description}
                        </div>
                      </div>
                      {feature.active && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Lead Beam Animation */}
              {animationStep >= 2 && (
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-16 bg-gradient-to-r from-cyan-400 to-transparent animate-pulse opacity-60"
                      style={{
                        animationDelay: `${i * 0.3}s`,
                        transform: `rotate(${15 + i * 10}deg) translateX(${i * 20}px)`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CRM Segmentation */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              Segmentation Intelligente
            </h3>

            <div className="space-y-4">
              {['Intéressé', 'À suivre', 'Prêt à acheter'].map((category, index) => (
                <div key={category} className="glass-effect rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">{category}</span>
                    <div className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${
                      index === 0 ? 'from-blue-400 to-cyan-400' :
                      index === 1 ? 'from-yellow-400 to-orange-400' :
                      'from-green-400 to-emerald-400'
                    } text-white`}>
                      {Math.round(projections.totalLeads * (index === 0 ? 0.4 : index === 1 ? 0.35 : 0.25))} leads/mois
                    </div>
                  </div>
                  
                  {/* Animated Lead Capsules */}
                  <div className="flex flex-wrap gap-2">
                    {visibleLeads
                      .filter(lead => lead.category === category)
                      .slice(-3)
                      .map((lead) => (
                        <div
                          key={lead.id}
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${lead.color} flex items-center justify-center text-white text-xs font-bold animate-bounce glow-effect`}
                        >
                          ✓
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Projections */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Leads Totaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient mb-2">
              {projections.totalLeads}/mois
            </div>
            <div className="text-white/60 text-sm">
              Basé sur votre configuration actuelle
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Leads Qualifiés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient mb-2">
              {projections.qualifiedLeads}/mois
            </div>
            <div className="text-white/60 text-sm">
              Segmentation IA automatique
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Taux de Qualification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gradient mb-2">
              {projections.conversionRate}%
            </div>
            <div className="text-white/60 text-sm">
              Optimisé par apprentissage automatique
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Preview */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Évolution Prédictive sur 6 Mois</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32 mb-4">
            {Array.from({ length: 6 }).map((_, month) => {
              const growth = 1 + (month * 0.15); // 15% growth per month
              const height = Math.min(100, 40 + (month * 12));
              
              return (
                <div key={month} className="flex flex-col items-center space-y-2">
                  <div
                    className="w-12 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-t-md relative glow-effect"
                    style={{ height: `${height}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold">
                      {Math.round(projections.totalLeads * growth)}
                    </div>
                  </div>
                  <div className="text-white/60 text-xs">M{month + 1}</div>
                </div>
              );
            })}
          </div>
          <div className="text-center text-white/70">
            <ArrowRight className="w-4 h-4 inline mr-2" />
            Performance optimisée automatiquement par l'IA
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={onReset}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Nouvelle Simulation
        </Button>
        <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
          <Download className="w-4 h-4 mr-2" />
          Télécharger le Rapport
        </Button>
      </div>
    </div>
  );
};

export default IntelligentLandingReveal;