import React from 'react';
import { TrendingUp, Users, Play, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const CaseStudies = () => {
  const { t } = useLanguage();
  const cases = [
    {
      id: 'katz',
      title: t('caseStudies.cases.katz.title'),
      summary: t('caseStudies.cases.katz.summary'),
      metrics: t('caseStudies.cases.katz.metrics'),
      testimony: t('caseStudies.cases.katz.testimony'),
      quote: t('caseStudies.cases.katz.quote'),
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      color: 'from-iluma-blue-500 to-iluma-blue-600',
      delay: '0s'
    },
    {
      id: 'rfs',
      title: t('caseStudies.cases.rfs.title'),
      summary: t('caseStudies.cases.rfs.summary'),
      metrics: t('caseStudies.cases.rfs.metrics'),
      testimony: t('caseStudies.cases.rfs.testimony'),
      quote: t('caseStudies.cases.rfs.quote'),
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      color: 'from-iluma-purple-500 to-iluma-purple-600',
      delay: '0.2s'
    },
    {
      id: 'rustique',
      title: t('caseStudies.cases.rustique.title'),
      summary: t('caseStudies.cases.rustique.summary'),
      metrics: t('caseStudies.cases.rustique.metrics'),
      testimony: t('caseStudies.cases.rustique.testimony'),
      quote: t('caseStudies.cases.rustique.quote'),
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      color: 'from-iluma-gold-500 to-iluma-gold-600',
      delay: '0.4s'
    },
    {
      id: 'literie',
      title: t('caseStudies.cases.literie.title'),
      summary: t('caseStudies.cases.literie.summary'),
      metrics: t('caseStudies.cases.literie.metrics'),
      testimony: t('caseStudies.cases.literie.testimony'),
      quote: t('caseStudies.cases.literie.quote'),
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      color: 'from-iluma-blue-400 to-iluma-purple-500',
      delay: '0.6s'
    }
  ];

  return (
    <section id="etudes" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            <span className="text-gradient">{t('caseStudies.title')}</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t('caseStudies.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {cases.map((caseStudy, index) => (
            <Card 
              key={caseStudy.id}
              className="glass-effect border-white/20 hover:border-white/30 transition-all duration-500 hover-glow group overflow-hidden animate-slide-up"
              style={{ animationDelay: caseStudy.delay }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${caseStudy.color} opacity-60`}></div>
                <div className="absolute top-4 left-4">
                  <div className="flex space-x-2">
                    {Array.isArray(caseStudy.metrics) ? caseStudy.metrics.map((metric, idx) => (
                      <span key={idx} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                        {metric}
                      </span>
                    )) : (
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                        {caseStudy.metrics}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-white group-hover:text-gradient transition-all duration-300">
                  {caseStudy.title}
                </CardTitle>
                <CardDescription className="text-iluma-blue-300 font-medium">
                  {caseStudy.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <blockquote className="text-white/80 italic border-l-2 border-iluma-blue-400 pl-4">
                  "{caseStudy.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-iluma-gold-400" />
                    <span className="text-white/70 text-sm">
                      {t('caseStudies.testimonyFrom')} <strong className="text-white">{caseStudy.testimony}</strong>
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-iluma-blue-400 hover:text-white hover:bg-white/10 p-2 rounded-full"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-iluma-blue-500 to-iluma-purple-500 hover:from-iluma-blue-600 hover:to-iluma-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover-glow"
          >
            {t('caseStudies.readMore')}
            <Play className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;