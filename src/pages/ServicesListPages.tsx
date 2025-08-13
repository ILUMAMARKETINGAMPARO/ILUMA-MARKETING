import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { translations } from '@/data/translations-clean';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Star, Zap, BarChart3, Rocket, CheckCircle, ArrowRight } from 'lucide-react';

type Language = 'fr' | 'en' | 'es';

export default function ServicesListPage() {
  const { '*': fullPath } = useParams();
  const navigate = useNavigate();
  
  // Extract language from the full path
  const pathParts = fullPath?.split('/').filter(Boolean) || [];
  let lang = 'fr';
  
  if (pathParts.length >= 1 && ['en', 'es'].includes(pathParts[0])) {
    lang = pathParts[0];
  }

  const [currentLang] = useState<Language>(lang as Language);

  const services = [
    {
      key: 'seoGoogle',
      slug: 'seo-google',
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      key: 'seoBing',
      slug: 'seo-bing',
      icon: Star,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      key: 'googleAds',
      slug: 'google-ads',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      key: 'metaAds',
      slug: 'meta-ads',
      icon: BarChart3,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      key: 'contentCreation',
      slug: 'content-creation',
      icon: Rocket,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      key: 'partnership',
      slug: 'partnership',
      icon: CheckCircle,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    }
  ];

  const t = translations[currentLang];

  const getTitle = () => {
    switch (currentLang) {
      case 'en': return 'Expert Services';
      case 'es': return 'Servicios Expertos';
      default: return 'Services Experts';
    }
  };

  const getSubtitle = () => {
    switch (currentLang) {
      case 'en': return 'Discover our AI marketing solutions to transform your business';
      case 'es': return 'Descubre nuestras soluciones de marketing IA para transformar tu negocio';
      default: return 'Découvrez nos solutions IA marketing pour transformer votre business';
    }
  };

  const getDiscoverText = () => {
    switch (currentLang) {
      case 'en': return 'Discover';
      case 'es': return 'Descubrir';
      default: return 'Découvrir';
    }
  };

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

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const serviceData = t?.services?.[service.key as keyof typeof t.services];
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