import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Zap, Gauge, Shield, Search, Palette, Code, Database, Users, Rocket, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SiteWebComplet: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Monitor,
      title: t('siteWebComplet.features.responsive.title'),
      description: t('siteWebComplet.features.responsive.description'),
      color: 'text-purple-400'
    },
    {
      icon: Zap,
      title: t('siteWebComplet.features.performance.title'),
      description: t('siteWebComplet.features.performance.description'),
      color: 'text-yellow-400'
    },
    {
      icon: Search,
      title: t('siteWebComplet.features.seo.title'),
      description: t('siteWebComplet.features.seo.description'),
      color: 'text-green-400'
    },
    {
      icon: Shield,
      title: t('siteWebComplet.features.security.title'),
      description: t('siteWebComplet.features.security.description'),
      color: 'text-blue-400'
    },
    {
      icon: Database,
      title: t('siteWebComplet.features.cms.title'),
      description: t('siteWebComplet.features.cms.description'),
      color: 'text-indigo-400'
    },
    {
      icon: Users,
      title: t('siteWebComplet.features.analytics.title'),
      description: t('siteWebComplet.features.analytics.description'),
      color: 'text-pink-400'
    }
  ];

  const packages = [
    {
      name: t('siteWebComplet.packages.starter.name'),
      price: t('siteWebComplet.packages.starter.price'),
      description: t('siteWebComplet.packages.starter.description'),
      features: [
        t('siteWebComplet.packages.starter.features.0'),
        t('siteWebComplet.packages.starter.features.1'),
        t('siteWebComplet.packages.starter.features.2'),
        t('siteWebComplet.packages.starter.features.3'),
        t('siteWebComplet.packages.starter.features.4')
      ],
      popular: false
    },
    {
      name: t('siteWebComplet.packages.professional.name'),
      price: t('siteWebComplet.packages.professional.price'),
      description: t('siteWebComplet.packages.professional.description'),
      features: [
        t('siteWebComplet.packages.professional.features.0'),
        t('siteWebComplet.packages.professional.features.1'),
        t('siteWebComplet.packages.professional.features.2'),
        t('siteWebComplet.packages.professional.features.3'),
        t('siteWebComplet.packages.professional.features.4'),
        t('siteWebComplet.packages.professional.features.5'),
        t('siteWebComplet.packages.professional.features.6')
      ],
      popular: true
    },
    {
      name: t('siteWebComplet.packages.enterprise.name'),
      price: t('siteWebComplet.packages.enterprise.price'),
      description: t('siteWebComplet.packages.enterprise.description'),
      features: [
        t('siteWebComplet.packages.enterprise.features.0'),
        t('siteWebComplet.packages.enterprise.features.1'),
        t('siteWebComplet.packages.enterprise.features.2'),
        t('siteWebComplet.packages.enterprise.features.3'),
        t('siteWebComplet.packages.enterprise.features.4'),
        t('siteWebComplet.packages.enterprise.features.5'),
        t('siteWebComplet.packages.enterprise.features.6'),
        t('siteWebComplet.packages.enterprise.features.7')
      ],
      popular: false
    }
  ];

  const process = [
    {
      step: 1,
      title: t('siteWebComplet.process.consultation.title'),
      description: t('siteWebComplet.process.consultation.description'),
      icon: Users
    },
    {
      step: 2,
      title: t('siteWebComplet.process.design.title'),
      description: t('siteWebComplet.process.design.description'),
      icon: Palette
    },
    {
      step: 3,
      title: t('siteWebComplet.process.development.title'),
      description: t('siteWebComplet.process.development.description'),
      icon: Code
    },
    {
      step: 4,
      title: t('siteWebComplet.process.launch.title'),
      description: t('siteWebComplet.process.launch.description'),
      icon: Rocket
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('siteWebComplet.meta.title')}</title>
        <meta name="description" content={t('siteWebComplet.meta.description')} />
        <meta name="keywords" content={t('siteWebComplet.meta.keywords')} />
        <link rel="canonical" href={`https://ilumamarketing.com${language !== 'fr' ? `/${language}` : ''}/site-web-complet`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-6 text-primary border-primary/30">
                {t('siteWebComplet.hero.badge')}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t('siteWebComplet.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {t('siteWebComplet.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  {t('siteWebComplet.hero.cta.primary')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">
                  {t('siteWebComplet.hero.cta.secondary')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('siteWebComplet.features.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('siteWebComplet.features.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-primary/20">
                    <CardHeader>
                      <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('siteWebComplet.process.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('siteWebComplet.process.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('siteWebComplet.packages.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('siteWebComplet.packages.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className={`h-full ${pkg.popular ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-border'} hover:shadow-lg transition-all duration-300`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          {t('siteWebComplet.packages.popular')}
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                      <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                      <CardDescription>{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {pkg.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                        {t('siteWebComplet.packages.cta')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('siteWebComplet.cta.title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('siteWebComplet.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  {t('siteWebComplet.cta.primary')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">
                  {t('siteWebComplet.cta.secondary')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SiteWebComplet;