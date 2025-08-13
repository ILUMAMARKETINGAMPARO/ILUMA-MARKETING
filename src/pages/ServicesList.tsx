import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { translations } from '@/data/translations-clean';
import { Target, Star, Zap, BarChart3, Rocket, CheckCircle } from 'lucide-react';

type Language = 'fr' | 'en' | 'es';

interface ServicesListProps {
  lang: Language;
}

export default function ServicesList({ lang }: ServicesListProps) {
  const t = translations[lang];
  
  const services = [
    {
      key: 'seoGoogle',
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      key: 'seoBing',
      icon: Star,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      key: 'googleAds',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      key: 'metaAds',
      icon: BarChart3,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      key: 'contentCreation',
      icon: Rocket,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      key: 'partnership',
      icon: CheckCircle,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    }
  ];

  const getServiceSlug = (key: string) => {
    const slugs: Record<string, string> = {
      seoGoogle: 'seo-google',
      seoBing: 'seo-bing',
      googleAds: 'google-ads',
      metaAds: 'meta-ads',
      contentCreation: 'content-creation',
      partnership: 'partnership'
    };
    return slugs[key] || key;
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Services Experts
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos solutions IA marketing pour transformer votre business
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const serviceData = t?.services?.[service.key as keyof typeof t.services];
            const Icon = service.icon;
            
            if (!serviceData || typeof serviceData === 'string') return null;

            return (
              <Card key={service.key} className={`${service.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                <CardHeader>
                  <div className={`p-3 rounded-lg ${service.bgColor} w-fit`}>
                    <Icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{serviceData.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {serviceData.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/${lang}/services/${getServiceSlug(service.key)}`}>
                    <Button className="w-full">
                      Découvrir
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}