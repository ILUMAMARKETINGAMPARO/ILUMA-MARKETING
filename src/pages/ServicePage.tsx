import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { translations } from '@/data/translations-clean';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap, Target, BarChart3, Rocket } from 'lucide-react';

type Language = 'fr' | 'en' | 'es';
type ServiceKey = 'seoGoogle' | 'seoBing' | 'googleAds' | 'metaAds' | 'contentCreation' | 'partnership';

export default function ServicePage() {
  const { '*': fullPath } = useParams();
  const navigate = useNavigate();
  
  // Extract language and service from the full path
  const pathParts = fullPath?.split('/').filter(Boolean) || [];
  let lang = 'fr';
  let service = '';
  
  if (pathParts.length >= 2 && ['en', 'es'].includes(pathParts[0])) {
    lang = pathParts[0];
    service = pathParts[2]; // services/service-name
  } else {
    service = pathParts[1]; // services/service-name (French default)
  }

  const [currentLang] = useState<Language>(lang as Language);

  useEffect(() => {
    if (!['fr', 'en', 'es'].includes(lang || '')) {
      navigate('/fr/services/seo-google');
    }
  }, [lang, navigate]);

  // Map URL slugs to service keys
  const getServiceKey = (slug: string): ServiceKey | null => {
    const mapping: Record<string, ServiceKey> = {
      'seo-google': 'seoGoogle',
      'bing-seo': 'seoBing', 
      'google-ads': 'googleAds',
      'meta-ads': 'metaAds',
      'content-creation': 'contentCreation',
      'partnership': 'partnership'
    };
    return mapping[slug] || null;
  };

  const serviceKey = getServiceKey(service);
  const t = serviceKey ? (translations[currentLang]?.modules?.[serviceKey] || translations[currentLang]?.services?.[serviceKey]) : null;

  if (!t) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Service non trouvé</h1>
          <Button onClick={() => navigate(`/${currentLang}/services/seo-google`)} className="mt-4">
            Retour aux services
          </Button>
        </div>
      </div>
    );
  }

  const getServiceIcon = (key: ServiceKey) => {
    const icons = {
      seoGoogle: Target,
      seoBing: Star,
      googleAds: Zap,
      metaAds: BarChart3,
      contentCreation: Rocket,
      partnership: CheckCircle
    };
    return icons[key] || Target;
  };

  const ServiceIcon = serviceKey ? getServiceIcon(serviceKey) : Target;

  return (
    <>
      <Helmet>
        <title>{t.title} | Iluma™</title>
        <meta name="description" content={t.description} />
        <meta property="og:title" content={`${t.title} | Iluma™`} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://ilumamarketing.com/${currentLang}/services/${service}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
                <ServiceIcon className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {typeof t.cta === 'string' ? t.cta : t.cta?.title || 'Commencer maintenant'}
              </Button>
              <Button size="lg" variant="outline">
                {t.audit || 'Audit gratuit'}
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {t.features && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t.whyChoose || 'Fonctionnalités'}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(t.features).map(([key, feature]) => (
                  <Card key={key} className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{(feature as any)?.title || feature}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground">
                        {(feature as any)?.description || ''}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {t.benefits && (
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Avantages Concrets
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(t.benefits).map(([key, benefit]) => (
                  <div key={key} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">{benefit as string}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {typeof t.cta === 'string' ? 'Prêt à commencer ?' : t.cta?.title || 'Prêt à commencer ?'}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {'consultation' in t ? t.consultation : t.audit || 'Consultation gratuite disponible'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Démarrer maintenant
                </Button>
                <Button size="lg" variant="outline">
                  Planifier un appel
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}