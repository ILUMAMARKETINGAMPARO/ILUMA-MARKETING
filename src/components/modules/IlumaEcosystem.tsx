import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  Brain, 
  Target, 
  Users, 
  TrendingUp, 
  Globe, 
  Zap, 
  Star,
  ArrowRight,
  Play,
  Sparkles,
  Bot,
  BarChart3,
  PenTool,
  Calculator
} from 'lucide-react';
import { Link } from 'react-router-dom';

const IlumaEcosystem = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Import des données depuis ecosystem.ts
  const { tools } = require('@/data/ecosystem');

  const services = [
    {
      name: 'SEO IA',
      description: 'Référencement intelligent',
      icon: TrendingUp,
      path: '/services/seo-ia',
      color: 'from-green-400 to-blue-500'
    },
    {
      name: 'Landing Aimant',
      description: 'Pages de conversion IA',
      icon: Globe,
      path: '/services/landing-aimant',
      color: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Fidélisation Diamant',
      description: 'Rétention client premium',
      icon: Star,
      path: '/services/fidelisation-diamant',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      name: 'E-commerce IA',
      description: 'Boutiques intelligentes',
      icon: Zap,
      path: '/services/ecommerce',
      color: 'from-cyan-400 to-blue-500'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Modules Core */}
      <section>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
              Outils <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">Iluma™</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-['Montserrat']">
              Une suite complète d'outils IA pour ILLUMINER votre présence digitale
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((module, index) => {
            const IconComponent = module.icon;
            const isActive = activeModule === module.id;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveModule(module.id)}
                onHoverEnd={() => setActiveModule(null)}
                whileHover={{ scale: 1.05 }}
              >
                <Card className={`glass-effect border-white/20 p-6 h-full transition-all duration-300 hover:border-[#8E44FF]/50 ${
                  isActive ? 'ring-2 ring-[#8E44FF]/30' : ''
                }`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center mb-6 transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white font-['Montserrat']">
                      {module.name}
                    </h3>
                    <Badge variant="secondary" className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                      {module.status === 'active' ? 'Actif' : 'Beta'}
                    </Badge>
                  </div>
                  
                  <p className="text-white/70 mb-4 font-['Montserrat']">
                    {module.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#FFD56B] rounded-full"></div>
                        <span className="text-white/60 text-sm font-['Montserrat']">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to={module.path}>
                    <Button className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-['Montserrat'] group">
                      <Play className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Découvrir
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Services Spécialisés */}
      <section>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
              Services <span className="bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] bg-clip-text text-transparent">Spécialisés</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto font-['Montserrat']">
              Solutions sur mesure pour chaque besoin business
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass-effect border-white/20 p-8 h-full hover:border-[#FFD56B]/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-['Montserrat']">
                        {service.name}
                      </h3>
                      <p className="text-white/70 font-['Montserrat']">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <Link to={service.path}>
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 font-['Montserrat'] group">
                      <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Final */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Card className="glass-effect border-[#8E44FF]/30 p-12 bg-gradient-to-br from-[#8E44FF]/10 to-[#FFD56B]/10">
          <h3 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
            Prêt à Transformer Votre Business ?
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg font-['Montserrat']">
            Découvrez comment nos outils IA peuvent propulser votre croissance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulateur">
              <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 text-lg font-semibold font-['Montserrat'] group">
                <Calculator className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Tester le Simulateur
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold font-['Montserrat']">
                <Users className="w-5 h-5 mr-2" />
                Parler à un Expert
              </Button>
            </Link>
          </div>
        </Card>
      </motion.section>
    </div>
  );
};

export default IlumaEcosystem;