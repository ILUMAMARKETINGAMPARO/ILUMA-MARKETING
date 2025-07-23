import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Heart, Users, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const IAEthique = () => {
  const principles = [
    {
      icon: Shield,
      title: "Transparence Totale",
      description: "Chaque processus IA est explicable et auditable"
    },
    {
      icon: Lock,
      title: "Protection des Données",
      description: "Sécurité et confidentialité au cœur de nos systèmes"
    },
    {
      icon: Users,
      title: "Impact Humain Positif",
      description: "L'IA au service des équipes, jamais en remplacement"
    },
    {
      icon: Heart,
      title: "Responsabilité Sociale",
      description: "Engagement pour un marketing éthique et durable"
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
              <Shield className="w-8 h-8 text-[#8E44FF]" />
              <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">IA & ÉTHIQUE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
              Intelligence Artificielle
              <br />
              <span className="text-3xl md:text-5xl">Responsable</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
              Notre engagement pour une IA transparente, sécurisée et 
              respectueuse des valeurs humaines dans chaque solution Iluma™.
            </p>
          </motion.div>

          {/* Principles Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass-effect border-[#8E44FF]/20 p-8 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-xl flex items-center justify-center mb-6">
                    <principle.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
                    {principle.title}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed font-['Montserrat']">
                    {principle.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat'] group">
                <Shield className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                En savoir plus
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

export default IAEthique;