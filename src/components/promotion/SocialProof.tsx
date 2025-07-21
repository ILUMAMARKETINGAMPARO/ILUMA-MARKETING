import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Users, Trophy, Zap, Globe } from 'lucide-react';

const testimonials = [
  {
    name: "Marie-Claude Dubois",
    business: "Clinique Santé Plus",
    location: "Montréal, QC",
    result: "+180% de nouveaux patients",
    rating: 5,
    text: "En 3 mois avec Iluma™, notre clinique est passée de 50 à 140 nouveaux patients par mois. L'IA a révolutionné notre approche !",
    avatar: "👩‍⚕️"
  },
  {
    name: "Jean-François Lapointe", 
    business: "Garage Elite",
    location: "Laval, QC",
    result: "+300% de visibilité Google",
    rating: 5,
    text: "Incroyable ! Nous sommes maintenant #1 sur Google pour 'garage Laval'. Le ROI est fou : 8x notre investissement !",
    avatar: "👨‍🔧"
  },
  {
    name: "Sarah Chen",
    business: "Restaurant Fusion",
    location: "Québec, QC", 
    result: "+250% de réservations",
    rating: 5,
    text: "LILO™ gère maintenant 70% de nos réservations automatiquement. Plus de temps pour cuisiner, plus de clients satisfaits !",
    avatar: "👩‍🍳"
  }
];

const certifications = [
  { name: "Google Partner", icon: "🏆", verified: true },
  { name: "IA Certifié", icon: "🤖", verified: true },
  { name: "Microsoft Partner", icon: "⚡", verified: true },
  { name: "Meta Business", icon: "📱", verified: true }
];

const liveStats = [
  { icon: Users, count: "1,247", label: "Entreprises transformées", pulse: true },
  { icon: Globe, count: "23", label: "Villes conquises", pulse: false },
  { icon: Trophy, count: "98%", label: "Taux de satisfaction", pulse: true },
  { icon: Zap, count: "24h", label: "Délai d'activation", pulse: false }
];

const SocialProof: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Live Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {liveStats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 ${
              stat.pulse ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex justify-center mb-2">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {stat.count}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Certifications */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-blue-300">Certifications & Partenariats</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <Badge 
                key={index}
                className="bg-blue-500/20 text-blue-200 border-blue-500/30"
              >
                {cert.icon} {cert.name} {cert.verified && "✓"}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Carousel */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white text-center mb-4">
          🌟 Ce que disent nos clients transformés
        </h4>
        
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-white text-sm">
                          {testimonial.name}
                        </span>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-xs text-green-200 mb-2">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {testimonial.business} • {testimonial.location}
                        </span>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                          {testimonial.result}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Activity */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardContent className="p-4">
          <div className="space-y-2">
            <motion.div 
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white">
                <strong>Sophie L.</strong> de Sherbrooke vient de réserver (il y a 3 min)
              </span>
            </motion.div>
            
            <motion.div 
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-white">
                <strong>Marc D.</strong> de Trois-Rivières a activé son pack (il y a 8 min)
              </span>
            </motion.div>
            
            <motion.div 
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-white">
                <strong>Lisa M.</strong> de Gatineau a confirmé sa transformation (il y a 12 min)
              </span>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Urgency Indicator */}
      <motion.div
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(255, 107, 107, 0.4)', 
            '0 0 40px rgba(255, 107, 107, 0.8)', 
            '0 0 20px rgba(255, 107, 107, 0.4)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-center p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl"
      >
        <div className="text-red-300 font-bold text-lg mb-1">
          ⚠️ PLACES LIMITÉES
        </div>
        <div className="text-red-200 text-sm">
          Plus que <span className="font-bold text-red-300">7 places</span> disponibles ce mois-ci
        </div>
      </motion.div>
    </div>
  );
};

export default SocialProof;