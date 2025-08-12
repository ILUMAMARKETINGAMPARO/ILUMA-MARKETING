import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { translations } from '@/data/translations-clean';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Star, Zap, BarChart3, Rocket, CheckCircle, ArrowRight } from 'lucide-react';

type Language = 'fr' | 'en' | 'es';

export default function HubServices() {
  const { '*': fullPath } = useParams();
  
  // Extract language from the full path
  const pathParts = fullPath?.split('/').filter(Boolean) || [];
  let lang = 'fr';
  
  if (pathParts.length >= 1 && ['en', 'es'].includes(pathParts[0])) {
    lang = pathParts[0];
  }

  const [currentLang] = useState<Language>(lang as Language);

  const allServices = [
    // Existing services
    {
      key: 'seoIA',
      slug: 'seo-ia',
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      category: 'SEO'
    },
    {
      key: 'visibiliteLocale',
      slug: 'visibilite-locale',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
      category: 'SEO'
    },
    {
      key: 'youtubeSEO',
      slug: 'youtube-seo',
      icon: Target,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-800',
      category: 'SEO'
    },
    {
      key: 'ecommerce',
      slug: 'ecommerce',
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      category: 'E-commerce'
    },
    // Expert services
    {
      key: 'seoGoogle',
      slug: 'seo-google',
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      category: 'Expert'
    },
    {
      key: 'seoBing',
      slug: 'bing-seo',
      icon: Star,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      category: 'Expert'
    },
    {
      key: 'googleAds',
      slug: 'google-ads',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      category: 'Expert'
    },
    {
      key: 'metaAds',
      slug: 'meta-ads',
      icon: BarChart3,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      category: 'Expert'
    },
    {
      key: 'contentCreation',
      slug: 'content-creation',
      icon: Rocket,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
      category: 'Expert'
    },
    {
      key: 'partnership',
      slug: 'partnership',
      icon: CheckCircle,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      borderColor: 'border-pink-200 dark:border-pink-800',
      category: 'Expert'
    }
  ];

  const t = translations[currentLang];

  const getTitle = () => {
    switch (currentLang) {
      case 'en': return 'All Services';
      case 'es': return 'Todos los Servicios';
      default: return 'Tous nos Services';
    }
  };

  const getSubtitle = () => {
    switch (currentLang) {
      case 'en': return 'Discover our complete range of AI marketing solutions';
      case 'es': return 'Descubre nuestra gama completa de soluciones de marketing IA';
      default: return 'Découvrez notre gamme complète de solutions IA marketing';
    }
  };

  const getDiscoverText = () => {
    switch (currentLang) {
      case 'en': return 'Discover';
      case 'es': return 'Descubrir';
      default: return 'Découvrir';
    }
  };

  const getServiceData = (service: any) => {
    if (service.category === 'Expert') {
      return t?.services?.[service.key as keyof typeof t.services];
    }
    // For non-expert services, return basic info
    return {
      title: service.key,
      description: `Service ${service.key}`
    };
  };

  const groupedServices = allServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <>
      <Helmet>
        <title>{getTitle()} | Iluma™</title>
        <meta name="description" content={getSubtitle()} />
        <meta property="og:title" content={`${getTitle()} | Iluma™`} />
        <meta property="og:description" content={getSubtitle()} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://ilumamarketing.com/${currentLang !== 'fr' ? currentLang + '/' : ''}services`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {getTitle()}
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              {getSubtitle()}
            </p>
          </div>
        </section>

        {/* Services by Category */}
        {Object.entries(groupedServices).map(([category, services]) => (
          <section key={category} className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                {category === 'Expert' ? 'Services Experts' : 
                 category === 'SEO' ? 'SEO & Visibilité' : 
                 category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => {
                  const serviceData = getServiceData(service);
                  const Icon = service.icon;
                  
                  if (!serviceData) return null;

                  const serviceUrl = currentLang === 'fr' 
                    ? `/services/${service.slug}` 
                    : `/${currentLang}/services/${service.slug}`;

                  return (
                    <Card key={service.key} className={`${service.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}>
                      <CardHeader>
                        <div className={`p-3 rounded-lg ${service.bgColor} w-fit group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-8 w-8 ${service.color}`} />
                        </div>
                        <CardTitle className="text-xl">{typeof serviceData === 'object' ? serviceData.title : serviceData}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {typeof serviceData === 'object' ? serviceData.description : ''}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link to={serviceUrl}>
                          <Button className="w-full group">
                            {getDiscoverText()}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {currentLang === 'en' ? 'Ready to get started?' : 
                 currentLang === 'es' ? '¿Listo para comenzar?' : 
                 'Prêt à commencer ?'}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {currentLang === 'en' ? 'Free consultation available' : 
                 currentLang === 'es' ? 'Consulta gratuita disponible' : 
                 'Consultation gratuite disponible'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {currentLang === 'en' ? 'Start now' : 
                   currentLang === 'es' ? 'Empezar ahora' : 
                   'Démarrer maintenant'}
                </Button>
                <Button size="lg" variant="outline">
                  {currentLang === 'en' ? 'Schedule a call' : 
                   currentLang === 'es' ? 'Programar una llamada' : 
                   'Planifier un appel'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
