import React, { useState, useRef } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, Users, Calendar, ArrowRight, Star, Trophy, BarChart3, Zap, Globe, Heart, Eye, Rocket, Shield, Layers, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from '@/hooks/useTranslations';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SEOManager from '@/components/seo/SEOManager';
import { getMultilingualSEOData } from '@/utils/seoMultilingualEngine';
import { useLanguage } from '@/hooks/useLanguage';

const EtudesDeCas = () => {
  const { t } = useTranslations();
  const { language } = useLanguage();
  const seoData = getMultilingualSEOData('caseStudies', language);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const caseStudies = [
    {
      id: 'katz-sport',
      title: t('caseStudies.katzSport.title'),
      subtitle: t('caseStudies.katzSport.subtitle'),
      category: t('caseStudies.katzSport.category'),
      sector: `🏃‍♂️ ${t('caseStudies.katzSport.sector')}`,
      location: `📍 ${t('caseStudies.katzSport.location')}`,
      duration: `⏱️ ${t('caseStudies.katzSport.duration')}`,
      investment: '💰 25K$',
      services: [t('caseStudies.katzSport.services.seoLocal'), t('caseStudies.katzSport.services.landingPages'), t('caseStudies.katzSport.services.googleMaps'), t('caseStudies.katzSport.services.contentAI')],
      technologies: ['ADLUMA™', 'ILA™', 'LILO™', 'Analytics+'],
      results: [
        { metric: t('caseStudies.katzSport.results.visibility'), value: '+230%', progress: 95, icon: Eye },
        { metric: t('caseStudies.katzSport.results.clicks'), value: '+180%', progress: 85, icon: TrendingUp },
        { metric: t('caseStudies.katzSport.results.conversions'), value: 'x3.2', progress: 100, icon: Target },
        { metric: t('caseStudies.katzSport.results.revenue'), value: '+350%', progress: 100, icon: Trophy }
      ],
      testimonial: {
        text: t('caseStudies.katzSport.testimonial.text'),
        author: "Sergio Ramos",
        role: t('caseStudies.katzSport.testimonial.role'),
        rating: 5
      },
      image: "🏆",
      gradient: 'from-blue-500 via-cyan-400 to-teal-500',
      glowColor: '#00D4FF'
    },
    {
      id: 'clinique-rfs',
      title: t('caseStudies.cliniqueRFS.title'),
      subtitle: t('caseStudies.cliniqueRFS.subtitle'),
      category: t('caseStudies.cliniqueRFS.category'),
      sector: `🏥 ${t('caseStudies.cliniqueRFS.sector')}`,
      location: `📍 ${t('caseStudies.cliniqueRFS.location')}`,
      duration: `⏱️ ${t('caseStudies.cliniqueRFS.duration')}`,
      investment: '💰 35K$',
      services: [t('caseStudies.cliniqueRFS.services.podcasts'), t('caseStudies.cliniqueRFS.services.retargeting'), t('caseStudies.cliniqueRFS.services.loyalty'), t('caseStudies.cliniqueRFS.services.social')],
      technologies: ['ILUMATCH™', 'CRM Iluma™', 'BlogIA™', 'Assistant ILA™'],
      results: [
        { metric: t('caseStudies.cliniqueRFS.results.patients'), value: '+310%', progress: 100, icon: Users },
        { metric: t('caseStudies.cliniqueRFS.results.retention'), value: '95%', progress: 95, icon: Heart },
        { metric: t('caseStudies.cliniqueRFS.results.satisfaction'), value: '98%', progress: 98, icon: Star },
        { metric: t('caseStudies.cliniqueRFS.results.bookings'), value: '+450%', progress: 100, icon: Calendar }
      ],
      testimonial: {
        text: t('caseStudies.cliniqueRFS.testimonial.text'),
        author: "Dr. Amparo Lopez",
        role: t('caseStudies.cliniqueRFS.testimonial.role'),
        rating: 5
      },
      image: "💊",
      gradient: 'from-green-500 via-emerald-400 to-cyan-500',
      glowColor: '#00FF94'
    },
    {
      id: 'concept-m-rustique',
      title: t('caseStudies.conceptMRustique.title'),
      subtitle: t('caseStudies.conceptMRustique.subtitle'),
      category: t('caseStudies.conceptMRustique.category'),
      sector: `🪑 ${t('caseStudies.conceptMRustique.sector')}`,
      location: `📍 ${t('caseStudies.conceptMRustique.location')}`,
      duration: `⏱️ ${t('caseStudies.conceptMRustique.duration')}`,
      investment: '💰 45K$',
      services: [t('caseStudies.conceptMRustique.services.seoAI'), t('caseStudies.conceptMRustique.services.youtubeSEO'), t('caseStudies.conceptMRustique.services.ecommerce'), t('caseStudies.conceptMRustique.services.content')],
      technologies: ['ADLUMA™', 'YouTube AI', 'E-commerce+', 'Analytics Pro'],
      results: [
        { metric: t('caseStudies.conceptMRustique.results.subscribers'), value: 'x5', progress: 100, icon: Users },
        { metric: t('caseStudies.conceptMRustique.results.views'), value: '+400%', progress: 100, icon: Eye },
        { metric: t('caseStudies.conceptMRustique.results.sales'), value: '+280%', progress: 90, icon: TrendingUp },
        { metric: t('caseStudies.conceptMRustique.results.brand'), value: '+500%', progress: 100, icon: Rocket }
      ],
      testimonial: {
        text: t('caseStudies.conceptMRustique.testimonial.text'),
        author: "Marie Dubois",
        role: t('caseStudies.conceptMRustique.testimonial.role'),
        rating: 5
      },
      image: "🎬",
      gradient: 'from-purple-500 via-pink-400 to-rose-500',
      glowColor: '#FF44DD'
    },
    {
      id: 'literie-amitie',
      title: t('caseStudies.literieAmitie.title'),
      subtitle: t('caseStudies.literieAmitie.subtitle'),
      category: t('caseStudies.literieAmitie.category'),
      sector: `🛏️ ${t('caseStudies.literieAmitie.sector')}`,
      location: `📍 ${t('caseStudies.literieAmitie.location')}`,
      duration: `⏱️ ${t('caseStudies.literieAmitie.duration')}`,
      investment: '💰 30K$',
      services: [t('caseStudies.literieAmitie.services.landing'), t('caseStudies.literieAmitie.services.local'), t('caseStudies.literieAmitie.services.blogs'), t('caseStudies.literieAmitie.services.crm')],
      technologies: ['Landing AI', 'CRM Iluma™', 'SEO Local+', 'Analytics 360'],
      results: [
        { metric: t('caseStudies.literieAmitie.results.calls'), value: 'x2.3', progress: 80, icon: Target },
        { metric: t('caseStudies.literieAmitie.results.conversion'), value: '35%', progress: 65, icon: TrendingUp },
        { metric: t('caseStudies.literieAmitie.results.traffic'), value: '+190%', progress: 85, icon: Globe },
        { metric: t('caseStudies.literieAmitie.results.leads'), value: '+275%', progress: 92, icon: Users }
      ],
      testimonial: {
        text: t('caseStudies.literieAmitie.testimonial.text'),
        author: "Jean-Claude Moreau",
        role: t('caseStudies.literieAmitie.testimonial.role'),
        rating: 5
      },
      image: "🚀",
      gradient: 'from-yellow-500 via-orange-400 to-red-500',
      glowColor: '#FFAA00'
    }
  ];

  const totalStats = {
    clients: 150,
    roi: 420,
    projects: 89,
    satisfaction: 98
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black" ref={containerRef}>
      <SEOManager 
        seoData={seoData}
        path="/etudes-de-cas"
      />
      
      {/* Spectacular Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(142,68,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,rgba(255,213,107,0.1)_0%,transparent_50%)]" />
      </div>
      
      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(142, 68, 255, 0.1) 0%, rgba(255, 213, 107, 0.05) 50%, transparent 100%)',
          y: backgroundY
        }}
      />
      
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-20 overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              style={{ y: textY }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-8 font-['Montserrat'] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {t('caseStudies.title')}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-2xl text-white/80 max-w-4xl mx-auto font-['Montserrat'] mb-12"
              >
                {t('caseStudies.subtitle')}
              </motion.div>
              
              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
              >
                {[
                  { label: t('caseStudies.stats.clients'), value: totalStats.clients, icon: Users, color: '#8E44FF' },
                  { label: t('caseStudies.stats.roi'), value: `${totalStats.roi}%`, icon: TrendingUp, color: '#FFD56B' },
                  { label: t('caseStudies.stats.projects'), value: totalStats.projects, icon: Trophy, color: '#00FF94' },
                  { label: t('caseStudies.stats.satisfaction'), value: `${totalStats.satisfaction}%`, icon: Star, color: '#FF44DD' }
                ].map((stat, index) => (
                  <Card key={index} className="glass-effect border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <stat.icon className="w-8 h-8 mx-auto mb-2" style={{ color: stat.color }} />
                      <div className="text-2xl font-bold text-white font-['Montserrat']">{stat.value}</div>
                      <div className="text-sm text-white/70 font-['Montserrat']">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CASE STUDIES GRID */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 100, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    bounce: 0.3
                  }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredCard(study.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedCase(selectedCase === study.id ? null : study.id)}
                  className="cursor-pointer"
                >
                  <Card className={`
                    glass-effect border-2 transition-all duration-500 h-full hover:scale-105
                    ${hoveredCard === study.id 
                      ? 'border-primary/50 shadow-2xl shadow-primary/25' 
                      : 'border-white/10'
                    }
                  `}>
                    <CardHeader className="relative overflow-hidden pb-6">
                      {/* Animated Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-10`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                      </div>
                      
                      <div className="relative z-10">
                        {/* Header with Icon and Rating */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-6xl animate-bounce">{study.image}</div>
                          <div className="flex items-center space-x-1">
                            {[...Array(study.testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                            ))}
                          </div>
                        </div>
                        
                        {/* Title and Subtitle */}
                        <CardTitle className="text-3xl font-bold text-white mb-2 font-['Montserrat']">
                          {study.title}
                        </CardTitle>
                        <div className="text-lg font-semibold mb-3" style={{ color: study.glowColor }}>
                          {study.subtitle}
                        </div>
                        <CardDescription className="text-white/70 mb-6 font-['Montserrat']">
                          {study.sector} • {study.location} • {study.duration}
                        </CardDescription>
                        
                        {/* Investment Badge */}
                        <Badge className={`bg-gradient-to-r ${study.gradient} text-white font-bold px-3 py-1 mb-6`}>
                          {study.investment}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 relative z-10">
                      {/* Performance Metrics */}
                      <div className="space-y-4">
                        <h4 className="text-white font-bold text-lg mb-4 flex items-center font-['Montserrat']">
                          <BarChart3 className="w-5 h-5 mr-2" style={{ color: study.glowColor }} />
                          {t('caseStudies.results.title')}
                        </h4>
                        {study.results.map((result, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <result.icon className="w-4 h-4" style={{ color: study.glowColor }} />
                                <span className="text-white/80 font-['Montserrat']">{result.metric}</span>
                              </div>
                              <span className="text-xl font-bold font-['Montserrat']" style={{ color: study.glowColor }}>
                                {result.value}
                              </span>
                            </div>
                            <div className="relative">
                              <Progress 
                                value={result.progress} 
                                className="h-3 bg-white/10"
                              />
                              <div 
                                className="absolute top-0 left-0 h-3 rounded-full transition-all duration-1000"
                                style={{
                                  width: `${result.progress}%`,
                                  background: `linear-gradient(90deg, ${study.glowColor}, ${study.glowColor}88)`,
                                  boxShadow: `0 0 10px ${study.glowColor}66`
                                }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Technologies Used */}
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center font-['Montserrat']">
                          <Code className="w-4 h-4 mr-2" style={{ color: study.glowColor }} />
                          {t('caseStudies.technologies.title')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map((tech, i) => (
                            <Badge key={i} variant="outline" className="border-white/20 text-white/80">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                              <Star className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div>
                            <blockquote className="text-white/90 italic mb-3 font-['Montserrat']">
                              "{study.testimonial.text}"
                            </blockquote>
                            <cite className="text-white font-semibold">{study.testimonial.author}</cite>
                            <div className="text-white/60 text-sm">{study.testimonial.role}</div>
                          </div>
                        </div>
                      </div>

                      {/* View Case Study Link */}
                      <Link 
                        to={`/etudes-de-cas/${study.id}`}
                        className="inline-flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
                      >
                        <span>Voir l'étude complète</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-5xl font-bold mb-8 font-['Montserrat'] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                {t('caseStudies.cta.title')}
              </motion.h2>
              
              <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-['Montserrat']">
                {t('caseStudies.cta.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <Card className="glass-effect border-primary/20 bg-primary/5 p-6">
                  <CardContent className="p-0 text-center">
                    <h3 className="text-3xl font-bold text-white mb-8 font-['Montserrat']">
                      ✨ {t('caseStudies.cta.button')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-2 text-white/80">
                        <Zap className="w-5 h-5 text-primary" />
                        <span>Audit Gratuit</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-white/80">
                        <Target className="w-5 h-5 text-primary" />
                        <span>Stratégie Personnalisée</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-white/80">
                        <Rocket className="w-5 h-5 text-primary" />
                        <span>ROI Garanti</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-secondary/20 bg-secondary/5 p-6">
                  <CardContent className="p-0 text-center">
                    <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                      🚀 Technologies IA
                    </h3>
                    <div className="space-y-3">
                      <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1">
                        ADLUMA™
                      </Badge>
                      <Badge className="bg-gradient-to-r from-secondary to-accent text-white px-3 py-1">
                        ILUMATCH™
                      </Badge>
                      <Badge className="bg-gradient-to-r from-accent to-primary text-white px-3 py-1">
                        ILA™
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-accent/20 bg-accent/5 p-6">
                  <CardContent className="p-0 text-center">
                    <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
                      📈 Résultats Moyens
                    </h3>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-accent">+420%</div>
                      <div className="text-white/70 text-sm">ROI Moyen</div>
                      <div className="text-2xl font-bold text-secondary">98%</div>
                      <div className="text-white/70 text-sm">Satisfaction</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Button size="lg" className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-secondary hover:via-accent hover:to-primary text-white font-bold py-4 px-8 rounded-full text-xl">
                Commencer Ma Transformation
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EtudesDeCas;