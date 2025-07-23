import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import GalacticVisibilityMap from '@/components/heatmap/GalacticVisibilityMap';
import LocalVisibilitySimulator from '@/components/heatmap/LocalVisibilitySimulator';
import FAQSection from '@/components/faq/FAQSection';
import { motion } from 'framer-motion';
import { SEOEngine } from '@/utils/seoEngine';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BusinessData } from '@/types/heatmap';

const VisibiliteLocale = () => {
  const seoData = SEOEngine.generatePageSEO('service', { 
    serviceName: 'Visibilité Locale IA', 
    benefit: 'dominer votre marché local avec Google Maps et SEO géolocalisé' 
  });

  // Données d'exemple pour la démo
  const sampleBusinesses: BusinessData[] = [
    {
      id: '1',
      name: 'Restaurant Chez Mario',
      city: 'Montréal',
      address: '123 Rue Saint-Laurent',
      phone: '(514) 123-4567',
      googleRating: 4.8,
      reviewCount: 245,
      serpRank: 2,
      isSponsored: false,
      source: 'SEO',
      sector: 'restaurant',
      coordinates: { lat: 45.5017, lng: -73.5673 },
      ilaScore: {
        overall: 87,
        seo: 90,
        visibility: 85,
        reputation: 92,
        technical: 80
      },
      status: 'prospect',
      actions: []
    },
    {
      id: '2',
      name: 'Café Moderne',
      city: 'Montréal', 
      address: '456 Avenue Mont-Royal',
      googleRating: 4.2,
      reviewCount: 156,
      serpRank: 5,
      isSponsored: true,
      source: 'GMB',
      sector: 'restaurant',
      coordinates: { lat: 45.5247, lng: -73.5848 },
      ilaScore: {
        overall: 72,
        seo: 70,
        visibility: 78,
        reputation: 75,
        technical: 65
      },
      status: 'contacted',
      actions: []
    },
    {
      id: '3',
      name: 'Bistro Local',
      city: 'Montréal',
      address: '789 Rue Sherbrooke',
      googleRating: 3.9,
      reviewCount: 89,
      serpRank: 8,
      isSponsored: false,
      source: 'SEO',
      sector: 'restaurant',
      coordinates: { lat: 45.5088, lng: -73.5878 },
      ilaScore: {
        overall: 58,
        seo: 55,
        visibility: 60,
        reputation: 62,
        technical: 56
      },
      status: 'prospect',
      actions: []
    }
  ];

  return (
    <>
      <SEOManager seoData={seoData} path="/services/visibilite-locale" />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
        
        <main className="pt-32 pb-20">
          {/* Hero Section */}
          <section className="relative overflow-hidden mb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <Badge className="mb-6 bg-primary/20 text-accent text-lg px-6 py-2 font-['Montserrat']">
                  VISIBILITÉ LOCALE IA
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-['Montserrat']">
                  <span className="text-gradient">
                    Carte Galactique de Visibilité Locale
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 font-['Montserrat']">
                  Visualisez votre position dans l'univers digital local et découvrez comment dominer vos concurrents sur Google Maps
                </p>
              </motion.div>
            </div>
          </section>

          {/* Carte Galactique Principale */}
          <section className="mb-20">
            <GalacticVisibilityMap businesses={sampleBusinesses} />
          </section>

          {/* Simulateur */}
          <section className="mb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <LocalVisibilitySimulator />
            </div>
          </section>

          {/* Résultats concrets */}
          <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-foreground mb-4 font-['Montserrat']">
                  Résultats <span className="text-gradient">concrets</span> de nos clients
                </h2>
                <p className="text-muted-foreground font-['Montserrat']">
                  Découvrez comment nous avons transformé la visibilité locale de nos clients
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    business: "Restaurant La Dolce Vita",
                    location: "Montréal, QC",
                    improvement: "+420% de visibilité locale",
                    details: "Passage de la page 3 à la position #1 sur Google Maps",
                    timeframe: "En 45 jours",
                    metrics: {
                      avant: { score: 28, position: "#15", avis: 3.2 },
                      apres: { score: 89, position: "#1", avis: 4.7 }
                    }
                  },
                  {
                    business: "Clinique Dentaire Moderne", 
                    location: "Laval, QC",
                    improvement: "+280% d'appels entrants",
                    details: "Optimisation GMB + gestion avis + SEO local",
                    timeframe: "En 60 jours",
                    metrics: {
                      avant: { score: 35, position: "#8", avis: 3.9 },
                      apres: { score: 82, position: "#2", avis: 4.6 }
                    }
                  }
                ].map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-effect border-primary/20 p-6 h-full">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-muted-foreground text-sm font-['Montserrat']">{study.location}</span>
                        <Badge className="bg-green-500/20 text-green-400 ml-auto">
                          {study.timeframe}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 font-['Montserrat']">{study.business}</h3>
                      <div className="text-2xl font-bold text-accent mb-2 font-['Montserrat']">{study.improvement}</div>
                      <p className="text-muted-foreground mb-6 font-['Montserrat']">{study.details}</p>
                      
                      {/* Métriques avant/après */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-muted/10 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">AVANT</div>
                          <div className="text-lg font-bold text-destructive">{study.metrics.avant.score}</div>
                          <div className="text-xs text-muted-foreground">Score ILA™</div>
                        </div>
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <div className="text-xs text-muted-foreground mb-1">APRÈS</div>
                          <div className="text-lg font-bold text-primary">{study.metrics.apres.score}</div>
                          <div className="text-xs text-muted-foreground">Score ILA™</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <div className="text-muted-foreground">Position</div>
                          <div className="font-bold text-foreground">
                            {study.metrics.avant.position} → {study.metrics.apres.position}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Note Google</div>
                          <div className="font-bold text-foreground">
                            {study.metrics.avant.avis} → {study.metrics.apres.avis}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Pack Local</div>
                          <div className="font-bold text-accent">Top 3</div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-foreground mb-4 font-['Montserrat']">
                  Questions fréquentes sur la <span className="text-gradient">Visibilité Locale</span>
                </h2>
                <p className="text-muted-foreground font-['Montserrat']">
                  Tout ce que vous devez savoir sur notre service de domination locale
                </p>
              </motion.div>
              <FAQSection />
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Card className="glass-effect border-primary/30 p-8">
                <h3 className="text-3xl font-bold text-foreground mb-4 font-['Montserrat']">
                  🚀 Prêt à dominer votre marché local ?
                </h3>
                <p className="text-xl text-muted-foreground mb-8 font-['Montserrat']">
                  Rejoignez les entreprises qui ont multiplié leur visibilité locale par 3-5x
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent px-8">
                    Démarrer mon analyse gratuite
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/30">
                    Voir d'autres cas clients
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        </main>

        <Footer />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Carte Galactique de Visibilité Locale",
            "description": "Outil de visualisation avancé pour analyser et améliorer votre position dans l'univers digital local",
            "url": "https://ilumamarketing.com/services/visibilite-locale",
            "provider": {
              "@type": "Organization",
              "name": "Iluma Marketing",
              "url": "https://ilumamarketing.com"
            },
            "serviceType": "Local Visibility Analysis",
            "areaServed": [
              {
                "@type": "City",
                "name": "Montréal"
              },
              {
                "@type": "City", 
                "name": "Laval"
              },
              {
                "@type": "State",
                "name": "Québec"
              }
            ]
          })}
        </script>
      </div>
    </>
  );
};

export default VisibiliteLocale;