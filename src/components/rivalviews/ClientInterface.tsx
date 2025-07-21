import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, Eye, Search, Filter, Star, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevolveViewsClient from './RevolveViewsClient';

const ClientInterface = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Données d'exemple pour l'interface client
  const quickStats = [
    { label: 'Entreprises analysées', value: '2,847', icon: Users },
    { label: 'Score ILA moyen', value: '73', icon: TrendingUp },
    { label: 'Zones couvertes', value: '15', icon: MapPin },
    { label: 'Mise à jour', value: 'Temps réel', icon: Star }
  ];

  const topOpportunities = [
    {
      name: 'Restaurant Le Gourmet',
      city: 'Montréal',
      score: 45,
      potential: 'high',
      reason: 'Forte visibilité mais faible conversion'
    },
    {
      name: 'Café Central',
      city: 'Laval',
      score: 38,
      potential: 'medium',
      reason: 'Excellentes reviews, SEO à améliorer'
    },
    {
      name: 'Boulangerie Artisan',
      city: 'Longueuil',
      score: 52,
      potential: 'high',
      reason: 'Position Google Maps perfectible'
    }
  ];

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'low': return 'text-green-400 bg-green-400/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  if (showMap) {
    return <RevolveViewsClient />;
  }

  return (
    <motion.section
      className="py-20 px-6 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Client */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center animate-pulse">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="bg-black/50 backdrop-blur-xl rounded-2xl p-3 border border-[#8E44FF]/30"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-[#FFD56B] font-['Montserrat'] text-sm">
                🎯 <strong>Découvrez</strong> qui sont vos vrais concurrents
              </p>
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
            Votre <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">Concurrence</span> en Temps Réel
          </h2>
          
          <p className="text-xl text-white/80 max-w-4xl mx-auto font-['Montserrat'] mb-8">
            Analysez votre marché local, identifiez les opportunités et prenez l'avantage sur vos concurrents.
          </p>

          {/* Stats Rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10"
                >
                  <IconComponent className="w-6 h-6 text-[#8E44FF] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Bouton Principal */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              onClick={() => setShowMap(true)}
              size="lg"
              className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-black px-12 py-6 text-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#8E44FF]/30 font-['Montserrat'] group mr-4"
            >
              <MapPin className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              🗺️ Voir la Carte Interactive
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <Link to="/rival-views">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl font-['Montserrat']"
              >
                <Search className="w-5 h-5 mr-2" />
                Analyse Complète
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Top Opportunités */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat'] flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#8E44FF]" />
              Top Opportunités Détectées
            </h3>
            <div className="space-y-4">
              {topOpportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#8E44FF]/30 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{opportunity.name}</h4>
                        <Badge variant="outline" className={getPotentialColor(opportunity.potential)}>
                          Score: {opportunity.score}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                        <MapPin className="w-3 h-3" />
                        {opportunity.city}
                      </div>
                      <p className="text-white/80 text-sm">{opportunity.reason}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat'] flex items-center gap-2">
              <Filter className="w-6 h-6 text-[#8E44FF]" />
              Analyse Rapide
            </h3>
            <Card className="bg-gradient-to-br from-[#8E44FF]/10 to-[#FFD56B]/10 border border-[#8E44FF]/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-[#FFD56B] mb-2">73/100</div>
                  <div className="text-white/80">Score ILA™ Moyen Zone</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Concurrence forte</span>
                    <Badge className="bg-red-500/20 text-red-400">23 entreprises</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Opportunités SEO</span>
                    <Badge className="bg-green-500/20 text-green-400">67% disponibles</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Zones sous-exploitées</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">5 détectées</Badge>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-[#8E44FF] hover:bg-[#8E44FF]/80"
                  onClick={() => setShowMap(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir le Détail
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ClientInterface;