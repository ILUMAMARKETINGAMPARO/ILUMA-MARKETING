import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Zap, Target, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage.ts';

interface ComparisonItem {
  criterion: Record<string, string>;
  iluma: {
    value: Record<string, string>;
    rating: 'excellent' | 'good' | 'average' | 'poor';
    details?: Record<string, string>;
  };
  competitors: {
    [key: string]: {
      value: Record<string, string>;
      rating: 'excellent' | 'good' | 'average' | 'poor';
    };
  };
}

const comparisonData: ComparisonItem[] = [
  {
    criterion: {
      fr: '🎯 Objectif',
      en: '🎯 Objective', 
      es: '🎯 Objetivo'
    },
    iluma: {
      value: {
        fr: 'Impact & relation long terme',
        en: 'Impact & long-term relationship',
        es: 'Impacto y relación a largo plazo'
      },
      rating: 'excellent',
      details: {
        fr: 'Approche consultative avec vision stratégique',
        en: 'Consultative approach with strategic vision',
        es: 'Enfoque consultivo con visión estratégica'
      }
    },
    competitors: {
      'Pages Jaunes': {
        value: {
          fr: 'Présence minimale',
          en: 'Minimal presence',
          es: 'Presencia mínima'
        },
        rating: 'poor'
      },
      'Ubiweb': {
        value: {
          fr: 'Visibilité rapide (SEA)',
          en: 'Quick visibility (SEA)',
          es: 'Visibilidad rápida (SEA)'
        },
        rating: 'average'
      },
      'My Little Big Web': {
        value: {
          fr: 'SEO progressif',
          en: 'Progressive SEO',
          es: 'SEO progresivo'
        },
        rating: 'good'
      }
    }
  },
  {
    criterion: {
      fr: '🧠 Stratégie',
      en: '🧠 Strategy',
      es: '🧠 Estrategia'
    },
    iluma: {
      value: {
        fr: 'IA + prompts + matching local',
        en: 'AI + prompts + local matching',
        es: 'IA + prompts + matching local'
      },
      rating: 'excellent',
      details: {
        fr: 'Méthodologie unique basée sur l\'IA et la data',
        en: 'Unique AI and data-based methodology',
        es: 'Metodología única basada en IA y datos'
      }
    },
    competitors: {
      'Pages Jaunes': {
        value: {
          fr: 'Répertoire GMB',
          en: 'GMB directory',
          es: 'Directorio GMB'
        },
        rating: 'poor'
      },
      'Ubiweb': {
        value: {
          fr: 'Google Ads + GMB',
          en: 'Google Ads + GMB',
          es: 'Google Ads + GMB'
        },
        rating: 'average'
      },
      'My Little Big Web': {
        value: {
          fr: 'Blog + SEO',
          en: 'Blog + SEO',
          es: 'Blog + SEO'
        },
        rating: 'good'
      }
    }
  },
  {
    criterion: {
      fr: '🔧 Outils',
      en: '🔧 Tools',
      es: '🔧 Herramientas'
    },
    iluma: {
      value: {
        fr: 'HUB™, ILA™, ADLUMA™, CRM Iluma™, Lilo™',
        en: 'HUB™, ILA™, ADLUMA™, CRM Iluma™, Lilo™',
        es: 'HUB™, ILA™, ADLUMA™, CRM Iluma™, Lilo™'
      },
      rating: 'excellent',
      details: {
        fr: 'Écosystème propriétaire intégré et évolutif',
        en: 'Integrated and scalable proprietary ecosystem',
        es: 'Ecosistema propietario integrado y escalable'
      }
    },
    competitors: {
      'Pages Jaunes': {
        value: {
          fr: 'Pages jaunes + site',
          en: 'Yellow pages + website',
          es: 'Páginas amarillas + sitio'
        },
        rating: 'poor'
      },
      'Ubiweb': {
        value: {
          fr: 'Mini-sites landing',
          en: 'Mini landing sites',
          es: 'Mini sitios landing'
        },
        rating: 'average'
      },
      'My Little Big Web': {
        value: {
          fr: 'CMS + blogue',
          en: 'CMS + blog',
          es: 'CMS + blog'
        },
        rating: 'good'
      }
    }
  },
  {
    criterion: {
      fr: '⏱ Suivi',
      en: '⏱ Monitoring',
      es: '⏱ Seguimiento'
    },
    iluma: {
      value: {
        fr: 'Feedback IA + FlowAnalyticsAI™',
        en: 'AI Feedback + FlowAnalyticsAI™',
        es: 'Feedback IA + FlowAnalyticsAI™'
      },
      rating: 'excellent',
      details: {
        fr: 'Monitoring en temps réel avec recommandations IA',
        en: 'Real-time monitoring with AI recommendations',
        es: 'Monitoreo en tiempo real con recomendaciones IA'
      }
    },
    competitors: {
      'Pages Jaunes': {
        value: {
          fr: 'Aucun réel',
          en: 'No real monitoring',
          es: 'Sin seguimiento real'
        },
        rating: 'poor'
      },
      'Ubiweb': {
        value: {
          fr: 'Rapports automatisés',
          en: 'Automated reports',
          es: 'Reportes automatizados'
        },
        rating: 'average'
      },
      'My Little Big Web': {
        value: {
          fr: 'Rapports mensuels',
          en: 'Monthly reports',
          es: 'Reportes mensuales'
        },
        rating: 'good'
      }
    }
  },
  {
    criterion: {
      fr: '🎨 Design',
      en: '🎨 Design',
      es: '🎨 Diseño'
    },
    iluma: {
      value: {
        fr: 'Design galactique, modulaire, UX-first',
        en: 'Galactic design, modular, UX-first',
        es: 'Diseño galáctico, modular, UX-first'
      },
      rating: 'excellent',
      details: {
        fr: 'Identité visuelle unique et expérience immersive',
        en: 'Unique visual identity and immersive experience',
        es: 'Identidad visual única y experiencia inmersiva'
      }
    },
    competitors: {
      'Pages Jaunes': {
        value: {
          fr: 'Gabarits figés',
          en: 'Fixed templates',
          es: 'Plantillas fijas'
        },
        rating: 'poor'
      },
      'Ubiweb': {
        value: {
          fr: 'Pages de vente simples',
          en: 'Simple sales pages',
          es: 'Páginas de venta simples'
        },
        rating: 'average'
      },
      'My Little Big Web': {
        value: {
          fr: 'Design propre mais neutre',
          en: 'Clean but neutral design',
          es: 'Diseño limpio pero neutro'
        },
        rating: 'good'
      }
    }
  },
  {
    criterion: {
      fr: '🤝 Éthique & transparence',
      en: '🤝 Ethics & transparency',
      es: '🤝 Ética y transparencia'
    },
    iluma: {
      value: {
        fr: 'Méthode ouverte + prompts livrés',
        en: 'Open method + delivered prompts',
        es: 'Método abierto + prompts entregados'
      },
      rating: 'excellent',
      details: {
        fr: 'Transparence totale sur les méthodes et outils utilisés',
        en: 'Complete transparency on methods and tools used',
        es: 'Transparencia total sobre métodos y herramientas utilizadas'
      }
    },
    competitors: {
      'Pages Jaunes': {
        value: {
          fr: 'Clauses opaques',
          en: 'Opaque clauses',
          es: 'Cláusulas opacas'
        },
        rating: 'poor'
      },
      'Ubiweb': {
        value: {
          fr: 'Engagements fermes',
          en: 'Firm commitments',
          es: 'Compromisos firmes'
        },
        rating: 'average'
      },
      'My Little Big Web': {
        value: {
          fr: '+ transparent',
          en: 'More transparent',
          es: 'Más transparente'
        },
        rating: 'good'
      }
    }
  }
];

const ComparisonTable: React.FC = () => {
  const { language } = useLanguage();

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'excellent': return <Check className="w-5 h-5 text-green-400" />;
      case 'good': return <Check className="w-5 h-5 text-blue-400" />;
      case 'average': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'poor': return <X className="w-5 h-5 text-red-400" />;
      default: return null;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-500/20 border-green-500/50';
      case 'good': return 'bg-blue-500/20 border-blue-500/50';
      case 'average': return 'bg-yellow-500/20 border-yellow-500/50';
      case 'poor': return 'bg-red-500/20 border-red-500/50';
      default: return 'bg-gray-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Target className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-white">
            {language === 'fr' ? 'Comparaison Directe avec la Concurrence' : 
             language === 'en' ? 'Direct Comparison with Competition' :
             'Comparación Directa con la Competencia'}
          </h2>
        </div>
        <p className="text-white/80 max-w-3xl mx-auto">
          {language === 'fr' ? 'Découvrez ce qui rend Iluma™ unique face aux solutions traditionnelles du marché.' :
           language === 'en' ? 'Discover what makes Iluma™ unique compared to traditional market solutions.' :
           'Descubre qué hace único a Iluma™ frente a las soluciones tradicionales del mercado.'}
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="space-y-6">
        {comparisonData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  {item.criterion[language]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Iluma Column */}
                  <div className={`p-4 rounded-lg border ${getRatingColor(item.iluma.rating)} relative`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <span className="font-bold text-white">Iluma™</span>
                      <Badge className="bg-primary/20 text-primary border-primary/50">
                        {getRatingIcon(item.iluma.rating)}
                      </Badge>
                    </div>
                    <p className="text-white/90 font-medium mb-2">
                      {item.iluma.value[language]}
                    </p>
                    {item.iluma.details && (
                      <p className="text-white/60 text-sm">
                        {item.iluma.details[language]}
                      </p>
                    )}
                    {item.iluma.rating === 'excellent' && (
                      <div className="absolute -top-2 -right-2">
                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Competitors */}
                  {Object.entries(item.competitors).map(([name, data]) => (
                    <div key={name} className={`p-4 rounded-lg border ${getRatingColor(data.rating)}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-white/80">{name}</span>
                        {getRatingIcon(data.rating)}
                      </div>
                      <p className="text-white/70">
                        {data.value[language]}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <Card className="glass-effect border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'fr' ? 'Pourquoi choisir Iluma™ ?' :
               language === 'en' ? 'Why choose Iluma™?' :
               '¿Por qué elegir Iluma™?'}
            </h3>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              {language === 'fr' ? 'Iluma™ ne se contente pas de créer des sites web. Nous révolutionnons votre présence digitale avec une approche IA-first unique, des outils propriétaires avancés et une transparence totale.' :
               language === 'en' ? 'Iluma™ doesn\'t just create websites. We revolutionize your digital presence with a unique AI-first approach, advanced proprietary tools and complete transparency.' :
               'Iluma™ no solo crea sitios web. Revolucionamos tu presencia digital con un enfoque único IA-first, herramientas propietarias avanzadas y transparencia total.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonTable;