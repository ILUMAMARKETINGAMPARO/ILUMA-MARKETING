import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Camera, Eye, Heart, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';

const InstagramAds = () => {
  const { t } = useTranslations();
  const benefits = [
    t('services.instagramAds.benefits.visual'),
    t('services.instagramAds.benefits.stories'),
    t('services.instagramAds.benefits.interests'),
    t('services.instagramAds.benefits.formats'),
    t('services.instagramAds.benefits.influencer'),
    t('services.instagramAds.benefits.shopping')
  ];

  const features = [
    {
      icon: Camera,
      title: t('services.instagramAds.features.visual'),
      description: t('services.instagramAds.features.visual.description')
    },
    {
      icon: Eye,
      title: t('services.instagramAds.features.storiesReels'),
      description: t('services.instagramAds.features.storiesReels.description')
    },
    {
      icon: Heart,
      title: t('services.instagramAds.features.engagement'),
      description: t('services.instagramAds.features.engagement.description')
    },
    {
      icon: TrendingUp,
      title: t('services.instagramAds.features.organic'),
      description: t('services.instagramAds.features.organic.description')
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title={t('services.instagramAds.title')}
        description={t('services.instagramAds.description')}
        keywords="Instagram Ads, publicité Instagram, Stories ads, Reels ads, shopping Instagram"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up font-['Montserrat']">
                <span className="text-gradient">{t('services.instagramAds.title')}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up font-['Montserrat']" style={{ animationDelay: '0.2s' }}>
                {t('services.instagramAds.description')}
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4">
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
                  {t('services.instagramAds.whyChoose')}
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={benefit}
                      className="flex items-center space-x-3 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="w-5 h-5 text-pink-400 flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-effect rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {t('services.instagramAds.cta.title')}
                </h3>
                <div className="text-center space-y-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold hover-glow w-full"
                  >
                    {t('services.instagramAds.consultation')}
                  </Button>
                  <p className="text-white/60 text-sm">
                    {t('services.instagramAds.audit')}
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

export default InstagramAds;