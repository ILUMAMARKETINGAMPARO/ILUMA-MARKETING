import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Instagram, Heart, Eye, Share2, TrendingUp, Palette, Camera, ArrowRight } from 'lucide-react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import { ROUTES } from '@/constants/routes';
import { useLanguage } from '@/hooks/useLanguage';

const seoData = {
  title: 'Instagram Ads - Publicité Instagram Créative | Iluma™',
  description: 'Campagnes Instagram Ads créatives et engageantes. Stories, Reels, Feed - maximisez votre impact visuel.',
  keywords: ['instagram ads', 'publicité instagram', 'instagram stories', 'reels publicitaires', 'marketing visuel']
};

const features = [
  {
    icon: Camera,
    title: 'Créatifs Visuels Premium',
    description: 'Design de contenus visuels optimisés pour l\'engagement Instagram.'
  },
  {
    icon: Heart,
    title: 'Engagement Maximisé',
    description: 'Stratégies pour générer likes, commentaires et partages authentiques.'
  },
  {
    icon: Share2,
    title: 'Viralité Contrôlée',
    description: 'Techniques pour augmenter la portée organique de vos contenus sponsorisés.'
  },
  {
    icon: Palette,
    title: 'Identité Visuelle',
    description: 'Cohérence de marque à travers tous vos formats publicitaires Instagram.'
  }
];

const formats = [
  {
    name: 'Stories Ads',
    description: 'Format immersif plein écran'
  },
  {
    name: 'Reels Ads',
    description: 'Vidéos courtes engageantes'
  },
  {
    name: 'Feed Ads',
    description: 'Publications dans le fil d\'actualité'
  },
  {
    name: 'IGTV Ads',
    description: 'Vidéos longues premium'
  },
  {
    name: 'Shopping Ads',
    description: 'Vente directe sur Instagram'
  },
  {
    name: 'Explore Ads',
    description: 'Découverte par nouveaux publics'
  }
];

const InstagramAds: React.FC = () => {
  const { t } = useLanguage();
  
  const dynamicSeoData = {
    title: t('services.instagramAds.title') + ' | Iluma™',
    description: t('services.instagramAds.description'),
    keywords: ['instagram ads', 'publicité instagram', 'stories ads', 'reels ads', 'influenceurs']
  };
  
  return (
    <>
      <SEOManager seoData={dynamicSeoData} path="/services/instagram-ads" />
      <Navigation />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 text-primary-foreground bg-gradient-to-r from-pink-500 to-purple-500">
                <Instagram className="w-4 h-4 mr-2" />
                Instagram Creative Ads
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                {t('services.instagramAds.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {t('services.instagramAds.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <Link to={ROUTES.CONTACT}>
                    Créer ma Campagne
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to={ROUTES.ADLUMA}>
                    Tester ADLUMA™
                    <Eye className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                Excellence Créative Instagram
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Maîtrise complète des codes visuels et culturels d'Instagram
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-gradient">
                    <CardHeader>
                      <feature.icon className="w-10 h-10 text-pink-500 mb-2" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Formats Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                Tous les Formats Instagram
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Expertise sur chaque format publicitaire pour maximiser votre impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formats.map((format, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-6 hover:shadow-lg transition-all hover:scale-105">
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-center mb-3">
                        <Instagram className="w-8 h-8 text-pink-500" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{format.name}</h3>
                      <p className="text-muted-foreground text-sm">{format.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                Impact Mesurable
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Résultats moyens de nos campagnes Instagram Ads
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-pink-500 mb-2">+340%</div>
                <p className="text-muted-foreground">Engagement moyen</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-purple-500 mb-2">-65%</div>
                <p className="text-muted-foreground">Coût par conversion</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-orange-500 mb-2">+280%</div>
                <p className="text-muted-foreground">Portée organique</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                Package Créatif Instagram
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Service complet de création et gestion de campagnes Instagram
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-pink-500 shadow-lg">
                <CardHeader className="text-center">
                  <Badge className="mb-4 mx-auto bg-gradient-to-r from-pink-500 to-purple-500">Créatif Premium</Badge>
                  <CardTitle className="text-2xl">Instagram Ads Créatif+</CardTitle>
                  <CardDescription>
                    Création de contenu + gestion de campagnes Instagram professionnelle
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">18%</div>
                    <p className="text-muted-foreground">du budget publicitaire mensuel</p>
                    <p className="text-sm text-muted-foreground mt-1">+ création de contenu + budget Meta géré</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Création incluse :</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• 12 visuels premium/mois</li>
                        <li>• 6 vidéos courtes/mois</li>
                        <li>• Stories templates</li>
                        <li>• Copywriting adapté</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Gestion avancée :</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Optimisation quotidienne</li>
                        <li>• A/B testing créatifs</li>
                        <li>• Rapports engagement</li>
                        <li>• Stratégie de contenu</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                      <Link to={ROUTES.CONTACT}>Commencer Maintenant</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link to={ROUTES.ADLUMA}>Simuler ma Portée</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default InstagramAds;