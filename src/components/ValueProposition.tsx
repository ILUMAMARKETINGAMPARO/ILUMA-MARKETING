import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Globe, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const ValueProposition = () => {

  const valueProps = {
    title: "Pourquoi Iluma™ ?",
    subtitle: "IA. Design. Visibilité. Des résultats réels, mesurables, humains.",
    description: "Iluma™ transforme votre présence numérique, sans CMS, sans barrière.",
    features: [
      {
        icon: Brain,
        title: "Intelligence Artificielle",
        description: "Systèmes automatisés et intelligents pour optimiser votre visibilité"
      },
      {
        icon: Zap,
        title: "Performance Galactique",
        description: "Solutions scalables qui grandissent avec votre ambition"
      },
      {
        icon: Globe,
        title: "Expertise Multicanale",
        description: "Web, SEO, Publicité, Social - une approche unifiée et cohérente"
      },
      {
        icon: Users,
        title: "Réseau d'Inter-visibilité",
        description: "Partenaires stratégiques pour amplifier votre portée"
      }
    ],
    cta: "Découvrir la Méthode Iluma™"
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* M2 - Promesse de Valeur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-8 h-8 text-[#FFD56B]" />
            <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">
              {valueProps.title}
            </span>
            <Sparkles className="w-8 h-8 text-[#FFD56B]" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
            {valueProps.subtitle}
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
            {valueProps.description}
          </p>
        </motion.div>

        {/* M3 - Expertise Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {valueProps.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect border-[#8E44FF]/20 p-8 text-center group hover:border-[#FFD56B]/40 transition-all duration-300 h-full">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat']">
                  {feature.title}
                </h3>
                <p className="text-white/70 font-['Montserrat']">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* M4 - Comment ça marche ? CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/methode-iluma">
            <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat'] group">
              <Brain className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              {valueProps.cta}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
