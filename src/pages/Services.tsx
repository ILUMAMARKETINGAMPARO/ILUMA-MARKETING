import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Search, Play, Target, FileText, Globe, Users, ShoppingCart, Mic, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';
const Services = () => {
  const { t } = useTranslations();
  const services = [
    {
      id: 'seo-ia',
      icon: Search,
      title: 'SEO Intelligence Artificielle',
      description: 'Référencement automatisé et intelligent pour dominer Google',
      color: "from-iluma-blue-500 to-iluma-blue-600",
      href: "/services/seo-ia"
    },
    {
      id: 'youtube-seo',
      icon: Play,
      title: 'YouTube SEO Avancé',
      description: 'Optimisation YouTube avec IA pour maximiser vos vues et engagement',
      color: "from-red-500 to-red-600",
      href: "/services/youtube-seo"
    },
    {
      id: 'landing-aimant',
      icon: Target,
      title: 'Landing Pages Aimant',
      description: 'Pages de conversion haute performance qui transforment les visiteurs en clients',
      color: "from-iluma-purple-500 to-iluma-purple-600",
      href: "/services/landing-aimant"
    },
    {
      id: 'fidelisation-diamant',
      icon: FileText,
      title: 'Fidélisation Diamant',
      description: 'Stratégies de rétention client avancées pour maximiser la valeur vie',
      color: "from-iluma-gold-500 to-iluma-gold-600",
      href: "/services/fidelisation-diamant"
    },
    {
      id: 'blogs-intersites',
      icon: Globe,
      title: 'Blogs Inter-sites',
      description: 'Réseau de blogs interconnectés pour amplifier votre autorité sectorielle',
      color: "from-iluma-blue-400 to-iluma-purple-500",
      href: "/services/blogs-intersites"
    },
    {
      id: 'visibilite-locale',
      icon: Users,
      title: 'Visibilité Locale',
      description: 'Domination locale avec SEO géolocalisé et Google Business optimisé',
      color: "from-iluma-purple-400 to-iluma-blue-500",
      href: "/services/visibilite-locale"
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: 'E-commerce Iluma™',
      description: 'Solutions e-commerce complètes avec IA pour maximiser les ventes',
      color: "from-green-500 to-emerald-600",
      href: "/services/ecommerce"
    },
    {
      id: 'podcasts',
      icon: Mic,
      title: 'Podcasts Marketing',
      description: 'Stratégies podcast pour établir votre autorité et attirer des clients qualifiés',
      color: "from-iluma-gold-400 to-iluma-purple-500",
      href: "/services/podcasts"
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
                <span className="text-gradient">{t('services.hero.title')}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {t('services.hero.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={service.id}
                  className="glass-effect border-white/20 hover:border-white/30 transition-all duration-500 hover-glow group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-gradient transition-all duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                    <Link to={service.href}>
                      <Button 
                        className="bg-gradient-to-r from-iluma-blue-500 to-iluma-purple-500 hover:from-iluma-blue-600 hover:to-iluma-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover-glow w-full"
                      >
                        En savoir plus
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;