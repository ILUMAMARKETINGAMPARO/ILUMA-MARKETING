import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageContext } from '@/contexts/LanguageContext';
import { RivalBusiness } from '@/types/rivalviews';
import { 
  BarChart3, 
  Star, 
  Search, 
  Link, 
  TrendingUp,
  MapPin,
  Camera,
  Users
} from 'lucide-react';

interface ScoreILAChartProps {
  business: RivalBusiness;
}

const ScoreILAChart: React.FC<ScoreILAChartProps> = ({ business }) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';

  const content = {
    fr: {
      title: "Composition du Score ILA™",
      subtitle: "Analyse détaillée des facteurs de visibilité",
      categories: [
        {
          name: "SEO Technique",
          icon: Search,
          weight: 30,
          score: Math.floor(business.ilaScore * 0.8 + Math.random() * 20),
          factors: ["Mots-clés indexés", "Position moyenne", "Optimisation mobile"]
        },
        {
          name: "Réputation",
          icon: Star,
          weight: 25,
          score: Math.floor((business.googleRating / 5) * 100),
          factors: ["Note Google", "Nombre d'avis", "Récence des avis"]
        },
        {
          name: "Autorité",
          icon: Link,
          weight: 20,
          score: Math.floor(Math.min(business.backlinks / 2, 100)),
          factors: ["Backlinks", "Qualité des liens", "Mentions locales"]
        },
        {
          name: "Présence Locale",
          icon: MapPin,
          weight: 15,
          score: business.hasPhotos ? 85 : 45,
          factors: ["Fiche GMB", "Photos", "Informations complètes"]
        },
        {
          name: "Réseau",
          icon: Users,
          weight: 10,
          score: business.isChain ? 90 : 50,
          factors: ["Succursales", "Cohérence marque", "Couverture géographique"]
        }
      ],
      total: "Score Total",
      outOf: "sur 100"
    },
    en: {
      title: "ILA™ Score Composition",
      subtitle: "Detailed analysis of visibility factors",
      categories: [
        {
          name: "Technical SEO",
          icon: Search,
          weight: 30,
          score: Math.floor(business.ilaScore * 0.8 + Math.random() * 20),
          factors: ["Indexed keywords", "Average position", "Mobile optimization"]
        },
        {
          name: "Reputation",
          icon: Star,
          weight: 25,
          score: Math.floor((business.googleRating / 5) * 100),
          factors: ["Google rating", "Review count", "Recent reviews"]
        },
        {
          name: "Authority",
          icon: Link,
          weight: 20,
          score: Math.floor(Math.min(business.backlinks / 2, 100)),
          factors: ["Backlinks", "Link quality", "Local mentions"]
        },
        {
          name: "Local Presence",
          icon: MapPin,
          weight: 15,
          score: business.hasPhotos ? 85 : 45,
          factors: ["GMB listing", "Photos", "Complete information"]
        },
        {
          name: "Network",
          icon: Users,
          weight: 10,
          score: business.isChain ? 90 : 50,
          factors: ["Branches", "Brand consistency", "Geographic coverage"]
        }
      ],
      total: "Total Score",
      outOf: "out of 100"
    },
    es: {
      title: "Composición Puntuación ILA™",
      subtitle: "Análisis detallado de factores de visibilidad",
      categories: [
        {
          name: "SEO Técnico",
          icon: Search,
          weight: 30,
          score: Math.floor(business.ilaScore * 0.8 + Math.random() * 20),
          factors: ["Palabras clave indexadas", "Posición promedio", "Optimización móvil"]
        },
        {
          name: "Reputación",
          icon: Star,
          weight: 25,
          score: Math.floor((business.googleRating / 5) * 100),
          factors: ["Calificación Google", "Número de reseñas", "Reseñas recientes"]
        },
        {
          name: "Autoridad",
          icon: Link,
          weight: 20,
          score: Math.floor(Math.min(business.backlinks / 2, 100)),
          factors: ["Backlinks", "Calidad de enlaces", "Menciones locales"]
        },
        {
          name: "Presencia Local",
          icon: MapPin,
          weight: 15,
          score: business.hasPhotos ? 85 : 45,
          factors: ["Ficha GMB", "Fotos", "Información completa"]
        },
        {
          name: "Red",
          icon: Users,
          weight: 10,
          score: business.isChain ? 90 : 50,
          factors: ["Sucursales", "Consistencia marca", "Cobertura geográfica"]
        }
      ],
      total: "Puntuación Total",
      outOf: "de 100"
    }
  };

  const t = content[language as keyof typeof content];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white font-['Montserrat'] flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
          {t.title}
        </CardTitle>
        <p className="text-white/70 font-['Montserrat']">{t.subtitle}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Score Categories */}
        {t.categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold font-['Montserrat']">
                        {category.name}
                      </h4>
                      <div className="text-xs text-white/60 font-['Montserrat']">
                        Poids: {category.weight}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${getScoreColor(category.score)} font-['Montserrat']`}>
                      {category.score}
                    </span>
                    <span className="text-white/60 text-sm">/{Math.floor(category.weight * 1.2)}</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div 
                    className={`h-2 rounded-full ${getProgressColor(category.score)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(category.score, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
                
                {/* Factors */}
                <div className="flex flex-wrap gap-1 text-xs">
                  {category.factors.map((factor, factorIndex) => (
                    <span 
                      key={factorIndex}
                      className="bg-white/10 text-white/70 px-2 py-1 rounded-full font-['Montserrat']"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Total Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-white/20 pt-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-['Montserrat']">
              {t.total}
            </h3>
            <div className="text-right">
              <span className={`text-3xl font-bold ${getScoreColor(business.ilaScore)} font-['Montserrat']`}>
                {business.ilaScore}
              </span>
              <span className="text-white/60 text-lg ml-1">{t.outOf}</span>
            </div>
          </div>
          
          {/* Total Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-3 mt-2">
            <motion.div 
              className={`h-3 rounded-full ${getProgressColor(business.ilaScore)}`}
              initial={{ width: 0 }}
              animate={{ width: `${business.ilaScore}%` }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ScoreILAChart;