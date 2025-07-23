import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { BarChart3, Star, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TemoignagesDashboards = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      company: "Katz Sport",
      rating: 5,
      text: "Iluma™ a transformé notre visibilité. +214% de trafic en 3 mois !",
      metrics: "+214% trafic"
    },
    {
      name: "Jean Tremblay",
      company: "Force Santé",
      rating: 5,
      text: "L'IA d'Iluma™ génère des leads qualifiés 24/7. Impressionnant.",
      metrics: "+156% leads"
    },
    {
      name: "Sophie Martin",
      company: "Concept M",
      rating: 5,
      text: "Dashboard intuitif et résultats concrets. Exactement ce qu'il nous fallait.",
      metrics: "+89% conversion"
    }
  ];

  const dashboardFeatures = [
    {
      icon: BarChart3,
      title: "Métriques en Temps Réel",
      description: "Suivi instantané de vos performances"
    },
    {
      icon: TrendingUp,
      title: "Analyses Prédictives",
      description: "Anticipez les tendances avec l'IA"
    },
    {
      icon: Users,
      title: "Segmentation Avancée",
      description: "Comprenez vos audiences en profondeur"
    },
    {
      icon: Star,
      title: "Scores de Performance",
      description: "Évaluations automatisées et recommandations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B0E] via-[#1a1a2e] to-[#16213e]">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-8 h-8 text-[#FFD56B]" />
              <span className="text-[#FFD56B] font-medium text-lg font-['Montserrat']">TÉMOIGNAGES & DASHBOARDS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
              Preuves Sociales
              <br />
              <span className="text-3xl md:text-5xl">& Analytics Avancés</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
              Dashboards intelligents et témoignages authentiques 
              pour prouver l'efficacité de vos campagnes Iluma™.
            </p>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12 font-['Montserrat']">
              Ce que disent nos clients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="glass-effect border-[#8E44FF]/20 p-6 h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#FFD56B] fill-current" />
                      ))}
                    </div>
                    <p className="text-white/90 mb-4 font-['Montserrat'] italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-semibold font-['Montserrat']">{testimonial.name}</p>
                        <p className="text-white/60 text-sm font-['Montserrat']">{testimonial.company}</p>
                      </div>
                      <div className="text-[#FFD56B] font-bold font-['Montserrat']">
                        {testimonial.metrics}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12 font-['Montserrat']">
              Dashboards Intelligents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dashboardFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass-effect border-[#8E44FF]/20 p-6 h-full text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed font-['Montserrat']">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat'] group">
                <BarChart3 className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Voir votre dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemoignagesDashboards;