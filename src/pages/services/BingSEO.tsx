import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Search, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';
import { useI18nNamespace } from '@/hooks/useI18nNamespace';
const BingSEO = () => {
  const { t } = useTranslations();
  useI18nNamespace('bing-seo');
  const benefits = [
    t('services.bingSEO.benefits.specialized'),
    t('services.bingSEO.benefits.competition'),
    t('services.bingSEO.benefits.audience'),
    t('services.bingSEO.benefits.integration'),
    t('services.bingSEO.benefits.places'),
    t('services.bingSEO.benefits.multiEngine')
  ];

  const features = [
    {
      icon: Search,
      title: t('services.bingSEO.features.bingOptimization.title'),
      description: t('services.bingSEO.features.bingOptimization.description')
    },
    {
      icon: Users,
      title: t('services.bingSEO.features.qualifiedAudience.title'),
      description: t('services.bingSEO.features.qualifiedAudience.description')
    },
    {
      icon: TrendingUp,
      title: t('services.bingSEO.features.lessCompetition.title'),
      description: t('services.bingSEO.features.lessCompetition.description')
    },
    {
      icon: Award,
      title: t('services.bingSEO.features.highROI.title'),
      description: t('services.bingSEO.features.highROI.description')
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title={t('services.bingSEO.title')}
        description={t('services.bingSEO.description')}
        keywords="Bing SEO, référencement Bing, Yahoo SEO, Microsoft search, Bing Places"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up font-['Montserrat']">
                <span className="text-gradient">{t('services.bingSEO.title')}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up font-['Montserrat']" style={{ animationDelay: '0.2s' }}>
                {t('services.bingSEO.description')}
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center mb-4">
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
                  {t('services.bingSEO.whyChoose')}
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={benefit}
                      className="flex items-center space-x-3 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-effect rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {t('services.bingSEO.cta')}
                </h3>
                <div className="text-center space-y-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold hover-glow w-full"
                  >
                    {t('services.seoIA.consultation')}
                  </Button>
                  <p className="text-white/60 text-sm">
                    {t('services.bingSEO.audit')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Méthode Iluma™ */}
        <section className="py-20" id="methode-iluma">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10">{t('services.bingSEO.method.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {([0,1,2,3] as const).map((i) => (
                <Card key={i} className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{t(`services.bingSEO.method.steps.${i}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70">{t(`services.bingSEO.method.steps.${i}.desc`)}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Produits */}
        <section className="py-20" id="produits">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10">{t('services.bingSEO.products.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {([0,1,2] as const).map((i) => (
                <Card key={i} className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{t(`services.bingSEO.products.plans.${i}.name`)}</CardTitle>
                    <CardDescription className="text-white/70">{t(`services.bingSEO.products.plans.${i}.desc`)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc list-inside text-white/80">
                      {([0,1,2] as const).map((j) => (
                        <li key={j}>{t(`services.bingSEO.products.plans.${i}.points.${j}`)}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20" id="solutions">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10">{t('services.bingSEO.solutions.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {([0,1,2,3] as const).map((i) => (
                <Card key={i} className="glass-effect border-white/20 p-6">
                  <span className="text-white/90">{t(`services.bingSEO.solutions.items.${i}`)}</span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Experts */}
        <section className="py-20" id="services-experts">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10">{t('services.bingSEO.experts.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {([0,1,2,3] as const).map((i) => (
                <Card key={i} className="glass-effect border-white/20 p-6">
                  <span className="text-white/90">{t(`services.bingSEO.experts.items.${i}`)}</span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="py-20" id="comment-ca-marche">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-10">{t('services.bingSEO.how.title')}</h2>
            <ol className="space-y-4 text-white/80 list-decimal list-inside">
              {([0,1,2] as const).map((i) => (
                <li key={i}>{t(`services.bingSEO.how.steps.${i}`)}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact & Support */}
        <section className="py-20" id="contact-support">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">{t('services.bingSEO.support.title')}</h2>
            <p className="text-white/70 mb-6">{t('services.bingSEO.support.subtitle')}</p>
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold hover-glow">
              {t('services.bingSEO.support.cta')}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BingSEO;