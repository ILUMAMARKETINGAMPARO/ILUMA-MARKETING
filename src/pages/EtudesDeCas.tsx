import React, { useState } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, Users, Calendar, ArrowRight, Star, Trophy, BarChart3, Zap, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';

const EtudesDeCas = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const caseStudies = [
    {
      id: 'katz-sport',
      title: 'Katz Sport',
      sectorKey: 'sectors.sports',
      locationKey: 'common.location',
      durationKey: 'common.duration',
      servicesKeys: ['services.seo.local', 'services.landing.magnet', 'services.google.maps'],
      results: [
        { metricKey: 'metrics.visibility', value: '+230%', progress: 95 },
        { metricKey: 'metrics.clicks', value: '+180%', progress: 85 },
        { metricKey: 'metrics.conversions', value: 'x3.2', progress: 100 }
      ],
      testimonial: {
        textKey: 'testimonials.katz.text',
        author: "Sergio Ramos",
        roleKey: 'roles.owner'
      },
      image: "🏪",
      color: 'from-blue-500 to-cyan-500',
      href: '/etudes-de-cas/katz-sport'
    },
    {
      id: 'clinique-rfs',
      title: 'Clinique RFS',
      sectorKey: 'sectors.healthcare',
      locationKey: 'common.location',
      durationKey: 'common.duration',
      servicesKeys: ['services.podcasts', 'services.retargeting', 'services.loyalty.diamond'],
      results: [
        { metricKey: 'metrics.conversions', value: '+310%', progress: 100 },
        { metricKey: 'metrics.patients', value: '+125%', progress: 75 },
        { metricKey: 'metrics.retention', value: '95%', progress: 95 }
      ],
      testimonial: {
        textKey: 'testimonials.clinique.text',
        author: "Dr. Amparo Lopez",
        roleKey: 'roles.medical.director'
      },
      image: "🏥",
      color: 'from-green-500 to-teal-500',
      href: '/etudes-de-cas/clinique-rfs'
    },
    {
      id: 'concept-m-rustique',
      title: 'Concept M Rustique',
      sectorKey: 'sectors.furniture',
      locationKey: 'common.location',
      durationKey: 'common.duration',
      servicesKeys: ['services.seo.ai', 'services.youtube.seo', 'services.ecommerce.local'],
      results: [
        { metricKey: 'metrics.subscribers', value: 'x5', progress: 100 },
        { metricKey: 'metrics.views', value: '+400%', progress: 100 },
        { metricKey: 'metrics.sales', value: '+280%', progress: 90 }
      ],
      testimonial: {
        textKey: 'testimonials.concept.text',
        author: "Marie Dubois",
        roleKey: 'roles.owner'
      },
      image: "🪑",
      color: 'from-purple-500 to-pink-500',
      href: '/etudes-de-cas/concept-m-rustique'
    },
    {
      id: 'literie-amitie',
      title: 'Literie Amitié',
      sectorKey: 'sectors.bedding',
      locationKey: 'common.location',
      durationKey: 'common.duration',
      servicesKeys: ['services.landing.magnet', 'services.local.visibility', 'services.inter.blogs'],
      results: [
        { metricKey: 'metrics.calls', value: 'x2.3', progress: 80 },
        { metricKey: 'metrics.return.rate', value: '35%', progress: 65 },
        { metricKey: 'metrics.traffic', value: '+190%', progress: 85 }
      ],
      testimonial: {
        textKey: 'testimonials.literie.text',
        author: "Jean-Claude Moreau",
        roleKey: 'roles.manager'
      },
      image: "🛏️",
      color: 'from-yellow-500 to-orange-500',
      href: '/etudes-de-cas/literie-amitie'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('cases.title').split(' ').map((word, index) => (
                  <span key={index}>
                    {index === t('cases.title').split(' ').length - 1 ? (
                      <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">
                        {word}
                      </span>
                    ) : (
                      word + ' '
                    )}
                  </span>
                ))}
              </motion.h1>
              <motion.p 
                className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t('cases.subtitle')}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Hockey Card Style Case Studies */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(study.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Card className={`glass-effect border-[#8E44FF]/20 hover:border-[#FFD56B]/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#8E44FF]/25 ${
                    hoveredCard === study.id ? 'shadow-2xl shadow-[#8E44FF]/25' : ''
                  }`}>
                    <CardHeader className="relative overflow-hidden">
                      {/* Animated Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-10`}></div>
                      
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="text-4xl">{study.image}</div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <CardTitle className="text-2xl text-white mb-2 font-['Montserrat']">{study.title}</CardTitle>
                      <CardDescription className="text-white/70 mb-4 font-['Montserrat']">
                        {t(study.sectorKey)} • {t(study.locationKey)} • 6 {t(study.durationKey)}
                      </CardDescription>
                      
                      {/* Performance Bars */}
                      <div className="space-y-3 mb-4">
                        {study.results.map((result, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-white/80 font-['Montserrat']">{t(result.metricKey)}</span>
                              <span className="text-[#FFD56B] font-bold font-['Montserrat']">{result.value}</span>
                            </div>
                            <Progress 
                              value={result.progress} 
                              className="h-2 bg-white/10"
                            />
                          </div>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Services utilisés */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 font-['Montserrat']">{t('cases.services.used')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.servicesKeys.map((serviceKey, i) => (
                            <Badge 
                              key={i}
                              className="bg-[#8E44FF]/20 text-[#FFD56B] text-xs font-['Montserrat']"
                            >
                              {t(serviceKey)}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Témoignage */}
                      <div className="bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10 rounded-xl p-4 border border-[#8E44FF]/20">
                        <p className="text-white/90 italic mb-3 font-['Montserrat']">"{t(study.testimonial.textKey)}"</p>
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${study.color} flex items-center justify-center`}>
                            <span className="text-white font-bold text-sm font-['Montserrat']">
                              {study.testimonial.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm font-['Montserrat']">{study.testimonial.author}</div>
                            <div className="text-white/60 text-xs font-['Montserrat']">{t(study.testimonial.roleKey)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Link to={study.href}>
                          <Button 
                            className={`w-full bg-gradient-to-r ${study.color} hover:scale-105 transition-all duration-300 text-white font-semibold font-['Montserrat']`}
                          >
                            {t('cases.read.complete')}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Link to="/adluma">
                            <Button 
                              size="sm"
                              variant="outline"
                              className="w-full border-[#8E44FF]/30 text-[#8E44FF] hover:bg-[#8E44FF]/10 text-xs font-['Montserrat']"
                            >
                              <Target className="w-3 h-3 mr-1" />
                              {t('cases.same.results')}
                            </Button>
                          </Link>
                          <Link to="/ilumatch">
                            <Button 
                              size="sm"
                              variant="outline"
                              className="w-full border-[#FFD56B]/30 text-[#FFD56B] hover:bg-[#FFD56B]/10 text-xs font-['Montserrat']"
                            >
                              <Heart className="w-3 h-3 mr-1" />
                              {t('cases.collaborate')}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 font-['Montserrat']">
                {t('cases.cta.title')}
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto font-['Montserrat']">
                {t('cases.cta.desc')}
              </p>
              
              <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-8 border border-[#8E44FF]/30 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                  ✨ {t('cases.final.message')}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/ila">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat']"
                    >
                      {t('cases.cta1')}
                      <Target className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat']"
                    >
                      {t('cases.cta2')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EtudesDeCas;