import React from 'react';
import { TrendingUp, Users, Play, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';

const CaseStudies = () => {
  const { t } = useTranslations();
  const cases = [
    {
      id: 'katz',
      title: "Katz Lunetterie - Transformation Digitale",
      summary: "Augmentation de 340% du trafic local en 6 mois avec notre méthode IA exclusive",
      metrics: "+340% trafic local, +125% conversions, ROI 8.7x",
      testimony: "Sarah Katz, Propriétaire",
      quote: "Iluma™ a complètement transformé notre visibilité locale. Nous sommes maintenant la référence dans notre région.",
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      color: 'from-iluma-blue-500 to-iluma-blue-600',
      delay: '0s'
    },
    {
      id: 'rfs',
      title: "RFS Construction - SEO Local Dominé",
      summary: "Position #1 sur Google pour tous les mots-clés stratégiques en 4 mois",
      metrics: "Position #1 maintenue, +280% leads qualifiés, +156% CA",
      testimony: "Marc Riendeau, Directeur",
      quote: "L'approche IA d'Iluma nous a permis de dépasser tous nos concurrents locaux rapidement.",
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      color: 'from-iluma-purple-500 to-iluma-purple-600',
      delay: '0.2s'
    },
    {
      id: 'rustique',
      title: "Restaurant Rustique - Révolution Locale",
      summary: "Devenu le restaurant #1 sur Google Maps avec une stratégie IA personnalisée",
      metrics: "4.9★ Google (500+ avis), +220% réservations, position #1 locale",
      testimony: "Julie Marchand, Gérante",
      quote: "Notre notoriété locale a explosé. Nous refusons maintenant des clients tellement nous sommes populaires.",
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      color: 'from-iluma-gold-500 to-iluma-gold-600',
      delay: '0.4s'
    },
    {
      id: 'literie',
      title: "Literie Confort Plus - E-commerce Optimisé",
      summary: "Croissance de 430% des ventes en ligne grâce à l'IA prédictive d'Iluma™",
      metrics: "+430% ventes en ligne, taux conversion 12.8%, panier moyen +85%",
      testimony: "David Leblanc, PDG",
      quote: "L'IA d'Iluma a révolutionné notre approche e-commerce. Nos résultats dépassent toutes nos prévisions.",
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      color: 'from-iluma-blue-400 to-iluma-purple-500',
      delay: '0.6s'
    }
  ];

  return (
    <section id="etudes" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            <span className="text-gradient">Nos Résultats Concrets</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Découvrez comment nos clients ont transformé leur business avec l'IA Iluma™
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {cases.map((caseStudy, index) => (
            <Card 
              key={caseStudy.id}
              className="glass-effect border-white/20 hover:border-white/30 transition-all duration-500 hover-glow group overflow-hidden animate-slide-up"
              style={{ animationDelay: caseStudy.delay }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${caseStudy.color} opacity-60`}></div>
                <div className="absolute top-4 left-4">
                  <div className="flex space-x-2">
                    {Array.isArray(caseStudy.metrics) ? caseStudy.metrics.map((metric, idx) => (
                      <span key={idx} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                        {metric}
                      </span>
                    )) : (
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                        {caseStudy.metrics}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-white group-hover:text-gradient transition-all duration-300">
                  {caseStudy.title}
                </CardTitle>
                <CardDescription className="text-iluma-blue-300 font-medium">
                  {caseStudy.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <blockquote className="text-white/80 italic border-l-2 border-iluma-blue-400 pl-4">
                  "{caseStudy.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-iluma-gold-400" />
                    <span className="text-white/70 text-sm">
                      Témoignage de <strong className="text-white">{caseStudy.testimony}</strong>
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-iluma-blue-400 hover:text-white hover:bg-white/10 p-2 rounded-full"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-iluma-blue-500 to-iluma-purple-500 hover:from-iluma-blue-600 hover:to-iluma-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover-glow"
          >
            Voir Plus d'Études de Cas
            <Play className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
