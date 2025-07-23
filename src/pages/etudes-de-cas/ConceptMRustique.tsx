import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { TrendingUp, Target, Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ConceptMRustique = () => {
  const results = [
    {
      metric: "x5",
      label: "Augmentation des abonnés YouTube",
      icon: TrendingUp,
      color: "text-red-400"
    },
    {
      metric: "+400%",
      label: "Vues mensuelles",
      icon: Target,
      color: "text-blue-400"
    },
    {
      metric: "+280%",
      label: "Ventes en ligne",
      icon: Users,
      color: "text-green-400"
    },
    {
      metric: "8 mois",
      label: "Temps pour obtenir ces résultats",
      icon: Calendar,
      color: "text-yellow-400"
    }
  ];

  const strategies = [
    {
      title: "SEO IA",
      description: "Optimisation complète du site web pour les recherches d'ameublement rustique local"
    },
    {
      title: "YouTube SEO",
      description: "Création de vidéos courtes montrant la fabrication artisanale des meubles"
    },
    {
      title: "E-commerce localisé",
      description: "Boutique en ligne avec options de livraison locale et showroom virtuel"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                Étude de cas : <span className="text-gradient">Concept M Rustique</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Comment nous avons transformé un atelier d'ameublement en succès YouTube et e-commerce
              </p>
            </div>
          </div>
        </section>

        {/* Client Info Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="glass-effect border-white/20 mb-12">
              <CardHeader>
                <CardTitle className="text-2xl text-white">À propos de Concept M Rustique</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Secteur d'activité</h3>
                    <p className="text-white/70">Ameublement rustique et décoration artisanale</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Localisation</h3>
                    <p className="text-white/70">Sherbrooke, Canada</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Problématique initiale</h3>
                    <p className="text-white/70">Atelier artisanal peu connu, ventes limitées au bouche-à-oreille local</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Objectif</h3>
                    <p className="text-white/70">Développer une présence en ligne forte et diversifier les canaux de vente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Résultats <span className="text-gradient">Exceptionnels</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <Card 
                  key={result.label}
                  className="glass-effect border-white/20 text-center hover-glow animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <result.icon className={`w-8 h-8 mx-auto mb-4 ${result.color}`} />
                    <div className={`text-3xl font-bold mb-2 ${result.color}`}>
                      {result.metric}
                    </div>
                    <p className="text-white/70 text-sm">{result.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Stratégies <span className="text-gradient">Mises en Place</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {strategies.map((strategy, index) => (
                <Card 
                  key={strategy.title}
                  className="glass-effect border-white/20 hover:border-white/30 transition-all duration-500 hover-glow animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{strategy.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70">
                      {strategy.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="glass-effect border-white/20 max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-iluma-blue-500 to-iluma-purple-500 flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">MD</span>
                </div>
                <blockquote className="text-xl text-white/90 mb-6 italic">
                  "Nos vidéos YouTube génèrent maintenant plus de clients que notre publicité traditionnelle. Les gens adorent voir comment nous créons leurs meubles sur mesure."
                </blockquote>
                <div>
                  <div className="font-semibold text-white">Marie Dubois</div>
                  <div className="text-white/60">Propriétaire, Concept M Rustique</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Prêt à faire briller votre savoir-faire ?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Découvrez comment YouTube et le e-commerce peuvent transformer votre artisanat en succès numérique
            </p>
            <div className="space-x-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-iluma-blue-500 to-iluma-purple-500 hover:from-iluma-blue-600 hover:to-iluma-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover-glow"
              >
                Planifier une consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConceptMRustique;