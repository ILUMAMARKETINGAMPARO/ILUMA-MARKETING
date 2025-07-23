import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Play, Youtube, TrendingUp, Eye, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const YouTubeSEO = () => {
  const benefits = [
    "Titres optimisés pour l'algorithme YouTube",
    "Descriptions riches en mots-clés locaux",
    "Miniatures attractives et performantes",
    "Tags stratégiques pour la visibilité",
    "Optimisation des playlists thématiques",
    "Analytics et reporting détaillé"
  ];

  const features = [
    {
      icon: Youtube,
      title: "Optimisation YouTube",
      description: "Stratégies spécialisées pour maximiser la visibilité de vos vidéos sur la plateforme"
    },
    {
      icon: TrendingUp,
      title: "Croissance organique",
      description: "Techniques éprouvées pour augmenter naturellement vos vues et abonnés"
    },
    {
      icon: Eye,
      title: "Engagement optimisé",
      description: "Amélioration du taux de clic et de rétention pour booster vos performances"
    },
    {
      icon: Play,
      title: "Contenu viral",
      description: "Création de contenus conçus pour générer du partage et de l'engagement"
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
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6">
                <Play className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up font-['Montserrat']">
                <span className="text-gradient">YouTube SEO – Référencement vidéo intelligent</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up font-['Montserrat']" style={{ animationDelay: '0.2s' }}>
                Création, titrage et optimisation SEO pour vidéos YouTube à forte visibilité. Module spécialisé Iluma™ pour transformer vos contenus en machines à vues organiques, avec scripts IA, thumbnails optimisées et stratégie multi-canal.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="glass-effect border-white/20 hover:border-white/30 transition-all duration-500 hover-glow animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Pourquoi choisir notre <span className="text-gradient">YouTube SEO</span> ?
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={benefit}
                      className="flex items-center space-x-3 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-effect rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Prêt à exploser sur YouTube ?
                </h3>
                <div className="text-center space-y-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-semibold hover-glow w-full"
                  >
                    Voir une démo
                  </Button>
                  <p className="text-white/60 text-sm">
                    Démonstration personnalisée en 30 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default YouTubeSEO;