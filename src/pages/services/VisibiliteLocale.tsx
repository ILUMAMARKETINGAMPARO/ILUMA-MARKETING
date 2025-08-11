import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { MapPin, Star, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';

const VisibiliteLocale = () => {
  const { t } = useTranslations();
  const benefits = [
    "Optimisation Google My Business complète",
    "Gestion et réponse aux avis clients",
    "Citations locales dans annuaires",
    "SEO local géo-ciblé",
    "Campagnes publicitaires locales",
    "Suivi position maps en temps réel"
  ];

  const features = [
    {
      icon: MapPin,
      title: "Google My Business",
      description: "Optimisation complète de votre fiche GMB pour dominer les recherches locales"
    },
    {
      icon: Star,
      title: "Gestion d'Avis",
      description: "Stratégie de génération et gestion professionnelle des avis clients"
    },
    {
      icon: Users,
      title: "Citations Locales",
      description: "Référencement dans les annuaires locaux pour renforcer votre autorité"
    },
    {
      icon: TrendingUp,
      title: "SEO Géolocalisé",
      description: "Optimisation de votre site pour les recherches géolocalisées"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Visibilité Locale - SEO Local & Google My Business"
        description="Dominez les recherches locales avec notre expertise SEO local. Optimisation Google My Business, gestion d'avis et citations locales."
        keywords="SEO local, visibilité locale, Google My Business, avis clients, citations locales"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up font-['Montserrat']">
                <span className="text-gradient">Visibilité Locale - SEO Local</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up font-['Montserrat']" style={{ animationDelay: '0.2s' }}>
                Dominez les recherches locales dans votre région. Optimisation Google My Business, gestion d'avis et stratégies SEO géolocalisées.
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-4">
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
                  Pourquoi notre <span className="text-gradient">SEO Local</span> ?
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={benefit}
                      className="flex items-center space-x-3 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-effect rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {t('services.visibiliteLocale.cta')}
                </h3>
                <div className="text-center space-y-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold hover-glow w-full"
                  >
                    {t('services.seoIA.consultation')}
                  </Button>
                  <p className="text-white/60 text-sm">
                    Audit SEO local complet offert
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

export default VisibiliteLocale;