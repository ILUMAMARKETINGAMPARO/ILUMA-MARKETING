import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { Instagram, Search, Users, Heart, MessageCircle, Hash, MousePointer, Star, MapPin, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const ComprenderGoogle = () => {
  const { t } = useLanguage();

  const socialComparison = [
    {
      platform: "instagram",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      metrics: [
        { icon: Users, label: t('seo.social.instagram.followers'), value: "10K" },
        { icon: Heart, label: t('seo.social.instagram.likes'), value: "500" },
        { icon: MessageCircle, label: t('seo.social.instagram.comments'), value: "50" },
        { icon: Hash, label: t('seo.social.instagram.hashtags'), value: "#sport" }
      ]
    },
    {
      platform: "google",
      icon: Search,
      color: "from-blue-500 to-green-500",
      metrics: [
        { icon: Users, label: t('seo.social.google.followers'), value: "10K" },
        { icon: MousePointer, label: t('seo.social.google.likes'), value: "500" },
        { icon: Star, label: t('seo.social.google.comments'), value: "4.8" },
        { icon: Hash, label: t('seo.social.google.hashtags'), value: "sport" }
      ]
    }
  ];

  const seoSteps = [
    {
      number: "01",
      title: t('seo.steps.step1.title'),
      desc: t('seo.steps.step1.desc'),
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "02",
      title: t('seo.steps.step2.title'),
      desc: t('seo.steps.step2.desc'),
      icon: MessageCircle,
      color: "from-blue-500 to-purple-500"
    },
    {
      number: "03",
      title: t('seo.steps.step3.title'),
      desc: t('seo.steps.step3.desc'),
      icon: TrendingUp,
      color: "from-green-500 to-blue-500"
    },
    {
      number: "04",
      title: t('seo.steps.step4.title'),
      desc: t('seo.steps.step4.desc'),
      icon: MapPin,
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30 mb-6 px-4 py-2 text-sm font-['Montserrat']">
              {t('seo.subtitle')}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-6 font-['Montserrat'] leading-tight">
              {t('seo.hero.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8 font-['Montserrat']">
              {t('seo.hero.subtitle')}
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat']"
            >
              {t('seo.hero.cta')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </section>

        {/* Social Media Comparison */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
              {t('seo.analogy.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {socialComparison.map((platform, index) => {
              const IconComponent = platform.icon;
              return (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  <Card className="glass-effect border-[#8E44FF]/20 p-6 h-full">
                    <CardHeader className="text-center pb-6">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white font-['Montserrat']">
                        {t(`seo.social.${platform.platform}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {platform.metrics.map((metric, metricIndex) => {
                          const MetricIcon = metric.icon;
                          return (
                            <div key={metricIndex} className="text-center p-3 bg-white/5 rounded-lg">
                              <MetricIcon className="w-6 h-6 mx-auto mb-2 text-[#FFD56B]" />
                              <div className="text-sm text-white/70 font-['Montserrat']">{metric.label}</div>
                              <div className="text-lg font-bold text-white font-['Montserrat']">{metric.value}</div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-8 border border-[#8E44FF]/30">
              <p className="text-white/80 mb-4 font-['Montserrat']">{t('seo.analogy.instagram_desc')}</p>
              <p className="text-white/80 mb-4 font-['Montserrat']">{t('seo.analogy.google_desc')}</p>
              <p className="text-2xl font-bold text-[#FFD56B] font-['Montserrat']">{t('seo.analogy.both')}</p>
            </div>
          </motion.div>
        </section>

        {/* SEO Process Steps */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
              {t('seo.steps.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seoSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <Card className="glass-effect border-[#8E44FF]/20 p-6 text-center h-full hover:border-[#8E44FF]/40 transition-all duration-300">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                      <StepIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[#FFD56B] mb-2 font-['Montserrat']">{step.number}</div>
                    <h3 className="text-xl font-bold text-white mb-3 font-['Montserrat']">{step.title}</h3>
                    <p className="text-white/70 text-sm font-['Montserrat']">{step.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Katz Sport Case Study */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <Card className="glass-effect border-[#8E44FF]/20 p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-white font-['Montserrat']">
                  {t('seo.katz.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center p-6 bg-red-500/10 rounded-lg border border-red-500/20">
                    <h4 className="text-xl font-bold text-red-400 mb-4 font-['Montserrat']">{t('seo.katz.before')}</h4>
                    <ul className="space-y-2 text-white/70 font-['Montserrat']">
                      <li>0 mot-clé en 1ère page</li>
                      <li>Aucune fiche Google</li>
                      <li>Site non optimisé</li>
                    </ul>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                    <h4 className="text-xl font-bold text-green-400 mb-4 font-['Montserrat']">{t('seo.katz.after')}</h4>
                    <ul className="space-y-2 text-green-300 font-['Montserrat']">
                      <li>{t('seo.katz.results.visibility')}</li>
                      <li>{t('seo.katz.results.keywords')}</li>
                      <li>{t('seo.katz.results.rating')}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* SEO Score Simulator */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-center"
          >
            <Card className="glass-effect border-[#8E44FF]/20 p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Target className="w-10 h-10 text-[#8E44FF]" />
                <span className="text-[#FFD56B] font-bold text-2xl font-['Montserrat']">ILA™</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                {t('seo.simulator.title')}
              </h3>
              <p className="text-white/80 mb-8 font-['Montserrat']">
                {t('seo.simulator.subtitle')}
              </p>
              <Link to="/ila">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat']"
                >
                  <Target className="w-5 h-5 mr-2" />
                  {t('seo.simulator.cta')}
                </Button>
              </Link>
            </Card>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-8 border border-[#8E44FF]/30">
              <h3 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                {t('seo.cta.title')}
              </h3>
              <p className="text-white/80 mb-8 font-['Montserrat']">
                {t('seo.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat']"
                  >
                    {t('seo.cta.consultation')}
                  </Button>
                </Link>
                <Link to="/ila">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat']"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    {t('seo.cta.score')}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ComprenderGoogle;