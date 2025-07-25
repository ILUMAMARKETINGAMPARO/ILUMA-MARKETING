import React from 'react';
import { Search, FileText, Play, Mic, Target, Users, ArrowRight, ShoppingCart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage.ts';

const ServicesPreview = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Search,
      title: t('services.types.seoAi'),
      description: t('services.types.seoAiDesc'),
      color: "from-iluma-blue-500 to-iluma-blue-600",
      delay: "0s"
    },
    {
      icon: Play,
      title: t('services.types.youtubeSeo'),
      description: t('services.types.youtubeSeoDesc'),
      color: "from-red-500 to-red-600",
      delay: "0.1s"
    },
    {
      icon: Target,
      title: t('services.types.landingPages'),
      description: t('services.types.landingPagesDesc'),
      color: "from-iluma-purple-500 to-iluma-purple-600",
      delay: "0.2s"
    },
    {
      icon: FileText,
      title: t('services.types.loyaltyPages'),
      description: t('services.types.loyaltyPagesDesc'),
      color: "from-iluma-gold-500 to-iluma-gold-600",
      delay: "0.3s"
    },
    {
      icon: Globe,
      title: t('services.types.interSiteBlogs'),
      description: t('services.types.interSiteBlogsDesc'),
      color: "from-iluma-blue-400 to-iluma-purple-500",
      delay: "0.4s"
    },
    {
      icon: Users,
      title: t('services.types.localVisibility'),
      description: t('services.types.localVisibilityDesc'),
      color: "from-iluma-purple-400 to-iluma-blue-500",
      delay: "0.5s"
    },
    {
      icon: ShoppingCart,
      title: t('services.types.ecommerce'),
      description: t('services.types.ecommerceDesc'),
      color: "from-green-500 to-emerald-600",
      delay: "0.6s"
    },
    {
      icon: Mic,
      title: t('services.types.podcasts'),
      description: t('services.types.podcastsDesc'),
      color: "from-iluma-gold-400 to-iluma-purple-500",
      delay: "0.7s"
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            <span className="text-gradient">{t('services.title')}</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="glass-effect border-white/20 hover:border-white/30 transition-all duration-500 hover-glow group animate-slide-up"
              style={{ animationDelay: service.delay }}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-lg text-white group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300 text-sm">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-iluma-blue-500 to-iluma-purple-500 hover:from-iluma-blue-600 hover:to-iluma-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover-glow shadow-xl"
          >
            {t('services.discoverAll')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;