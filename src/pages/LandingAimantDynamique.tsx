import React, { useState, useEffect } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import MPEContainer from '@/components/mpe/MPEContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Magnet, Target, Zap, TrendingUp, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const LandingAimantDynamique = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      icon: Target,
      title: "Ciblage Intelligent",
      description: "L'IA analyse votre audience et identifie les segments à fort potentiel",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Magnet,
      title: "Génération AIMANT™",
      description: "Création automatique de contenus irrésistibles adaptés à chaque profil",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Optimisation Continue",
      description: "Machine learning en temps réel pour maximiser les conversions",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Résultats Exponentiels",
      description: "Croissance mesurable et ROI optimisé grâce à l'intelligence artificielle",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { label: "Taux de conversion moyen", value: "347%", icon: TrendingUp },
    { label: "Leads qualifiés générés", value: "12K+", icon: Users },
    { label: "Temps de mise en œuvre", value: "48h", icon: Clock },
    { label: "Satisfaction client", value: "98%", icon: CheckCircle }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
      setProgress((prev) => (prev + 25) % 100);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section Dynamique */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <MPEContainer className="text-center">
              <Badge className="mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 text-lg">
                Landing Page AIMANT™ - Nouvelle Génération
              </Badge>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
                Créez des <span className="text-gradient">Landing Pages</span>
                <br />qui <span className="text-gradient">Convertissent</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Notre technologie AIMANT™ utilise l'IA pour générer automatiquement des pages de conversion 
                ultra-performantes adaptées à votre audience
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover-glow"
                >
                  Créer ma Landing Page IA
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="glass-effect border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-2xl"
                >
                  Voir la démo interactive
                </Button>
              </div>

              {/* Stats dynamiques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="glass-effect rounded-xl p-4 border border-white/20">
                    <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </MPEContainer>
          </div>
        </section>

        {/* Processus Animé */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <MPEContainer className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Processus <span className="text-gradient">AIMANT™</span> en Action
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Découvrez comment notre IA transforme vos visiteurs en clients
              </p>
            </MPEContainer>

            <div className="max-w-6xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-12">
                <Progress value={progress} className="h-2 bg-white/10" />
                <div className="flex justify-between mt-4">
                  {steps.map((step, index) => (
                    <div 
                      key={step.title}
                      className={`flex flex-col items-center transition-all duration-500 ${
                        index === currentStep ? 'scale-110' : 'opacity-60'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-2 ${
                        isAnimating && index === currentStep ? 'animate-pulse' : ''
                      }`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white/80 text-sm text-center max-w-24">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Étape Active */}
              <div className="glass-effect rounded-3xl p-8 border border-white/20 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${steps[currentStep].color} flex items-center justify-center mb-6`}>
                      {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{steps[currentStep].title}</h3>
                    <p className="text-xl text-white/70 mb-6">{steps[currentStep].description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white/80">Intelligence artificielle avancée</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white/80">Personnalisation en temps réel</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white/80">Optimisation continue</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className={`aspect-video bg-gradient-to-br ${steps[currentStep].color} rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isAnimating ? 'scale-105' : ''
                    }`}>
                      {React.createElement(steps[currentStep].icon, { className: "w-20 h-20 text-white opacity-50" })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <MPEContainer className="text-center">
              <div className="glass-effect rounded-3xl p-12 border border-white/20 max-w-4xl mx-auto">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 glow-effect">
                  <Magnet className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Prêt à <span className="text-gradient">Magnétiser</span> vos Visiteurs ?
                </h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                  Lancez votre première Landing Page AIMANT™ dès aujourd'hui et multipliez vos conversions
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover-glow"
                  >
                    Commencer maintenant - Gratuit
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="glass-effect border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-2xl"
                  >
                    Parler à un expert
                  </Button>
                </div>
              </div>
            </MPEContainer>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingAimantDynamique;