import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Search, Play, Target, FileText, Globe, Users, ShoppingCart, Mic, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const Services = () => {
  const { t } = useLanguage();
  const services = [
    {
      id: 'seo-ia',
      icon: Search,
      title: t('servicesPage.list.seoIa.title'),
      description: t('servicesPage.list.seoIa.description'),
      color: "from-iluma-blue-500 to-iluma-blue-600",
      href: "/services/seo-ia"
    },
    {
      id: 'youtube-seo',
      icon: Play,
      title: t('servicesPage.list.youtubeSeo.title'),
      description: t('servicesPage.list.youtubeSeo.description'),
      color: "from-red-500 to-red-600",
      href: "/services/youtube-seo"
    },
    {
      id: 'landing-aimant',
      icon: Target,
      title: t('servicesPage.list.landingAimant.title'),
      description: t('servicesPage.list.landingAimant.description'),
      color: "from-iluma-purple-500 to-iluma-purple-600",
      href: "/services/landing-aimant"
    },
    {
      id: 'fidelisation-diamant',
      icon: FileText,
      title: t('servicesPage.list.fidelisationDiamant.title'),
      description: t('servicesPage.list.fidelisationDiamant.description'),
      color: "from-iluma-gold-500 to-iluma-gold-600",
      href: "/services/fidelisation-diamant"
    },
    {
      id: 'blogs-intersites',
      icon: Globe,
      title: t('servicesPage.list.blogsIntersites.title'),
      description: t('servicesPage.list.blogsIntersites.description'),
      color: "from-iluma-blue-400 to-iluma-purple-500",
      href: "/services/blogs-intersites"
    },
    {
      id: 'visibilite-locale',
      icon: Users,
      title: t('servicesPage.list.visibiliteLocale.title'),
      description: t('servicesPage.list.visibiliteLocale.description'),
      color: "from-iluma-purple-400 to-iluma-blue-500",
      href: "/services/visibilite-locale"
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: t('servicesPage.list.ecommerce.title'),
      description: t('servicesPage.list.ecommerce.description'),
      color: "from-green-500 to-emerald-600",
      href: "/services/ecommerce"
    },
    {
      id: 'podcasts',
      icon: Mic,
      title: t('servicesPage.list.podcasts.title'),
      description: t('servicesPage.list.podcasts.description'),
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
                <span className="text-gradient">{t('servicesPage.title')}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {t('servicesPage.subtitle')}
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
                        {t('servicesPage.learnMore')}
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