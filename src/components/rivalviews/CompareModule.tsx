import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageContext } from '@/contexts/LanguageContext';
import { RivalBusiness } from '@/types/rivalviews';
import { generateRivalMockData } from '@/utils/rivalviewsDataParser';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Star, 
  MapPin, 
  Search,
  Zap,
  Target,
  Globe
} from 'lucide-react';

interface CompareModuleProps {
  preSelectedBusinesses?: RivalBusiness[];
}

const CompareModule: React.FC<CompareModuleProps> = ({ preSelectedBusinesses = [] }) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';
  const [businesses] = useState<RivalBusiness[]>(generateRivalMockData(130));
  const [businessA, setBusinessA] = useState<RivalBusiness | null>(
    preSelectedBusinesses[0] || businesses[0]
  );
  const [businessB, setBusinessB] = useState<RivalBusiness | null>(
    preSelectedBusinesses[1] || businesses[1]
  );

  const content = {
    fr: {
      title: "Comparaison Intelligente",
      subtitle: "Analysez côte à côte les performances de deux commerces",
      selectA: "Sélectionner Commerce A",
      selectB: "Sélectionner Commerce B",
      vs: "VS",
      score: "Score ILA™",
      keywords: "Mots-clés indexés",
      topKeywords: "Top 10 Google",
      reviews: "Avis Google",
      rating: "Note moyenne",
      potential: "Potentiel",
      sector: "Secteur",
      analysis: "Analyse Comparative",
      recommendation: "Recommandation IA",
      winner: "Performance supérieure",
      similar: "Performance similaire",
      actionPlan: "Plan d'action suggéré"
    },
    en: {
      title: "Smart Comparison",
      subtitle: "Analyze side-by-side performance of two businesses",
      selectA: "Select Business A",
      selectB: "Select Business B",
      vs: "VS",
      score: "ILA™ Score",
      keywords: "Indexed keywords",
      topKeywords: "Top 10 Google",
      reviews: "Google reviews",
      rating: "Average rating",
      potential: "Potential",
      sector: "Sector",
      analysis: "Comparative Analysis",
      recommendation: "AI Recommendation",
      winner: "Superior performance",
      similar: "Similar performance",
      actionPlan: "Suggested action plan"
    },
    es: {
      title: "Comparación Inteligente",
      subtitle: "Analiza lado a lado el rendimiento de dos negocios",
      selectA: "Seleccionar Negocio A",
      selectB: "Seleccionar Negocio B",
      vs: "VS",
      score: "Puntuación ILA™",
      keywords: "Palabras clave indexadas",
      topKeywords: "Top 10 Google",
      reviews: "Reseñas Google",
      rating: "Calificación promedio",
      potential: "Potencial",
      sector: "Sector",
      analysis: "Análisis Comparativo",
      recommendation: "Recomendación IA",
      winner: "Rendimiento superior",
      similar: "Rendimiento similar",
      actionPlan: "Plan de acción sugerido"
    }
  };

  const t = content[language as keyof typeof content];

  const getComparisonIcon = (scoreA: number, scoreB: number) => {
    const diff = scoreA - scoreB;
    if (Math.abs(diff) < 5) return <Minus className="w-5 h-5 text-gray-400" />;
    return diff > 0 ? 
      <TrendingUp className="w-5 h-5 text-emerald-400" /> : 
      <TrendingDown className="w-5 h-5 text-red-400" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const generateMockData = (business: RivalBusiness) => ({
    indexedKeywords: Math.floor(Math.random() * 50) + 20,
    top10Keywords: Math.floor(Math.random() * 15) + 5,
    avgPosition: Math.floor(Math.random() * 20) + 5
  });

  const generateComparison = () => {
    if (!businessA || !businessB) return null;

    const dataA = generateMockData(businessA);
    const dataB = generateMockData(businessB);
    const scoreDiff = businessA.ilaScore - businessB.ilaScore;

    return {
      winner: Math.abs(scoreDiff) < 5 ? 'similar' : (scoreDiff > 0 ? 'A' : 'B'),
      recommendations: [
        scoreDiff > 10 ? `${businessB.name} devrait améliorer son SEO local` : 
        scoreDiff < -10 ? `${businessA.name} devrait améliorer son SEO local` :
        "Les deux commerces ont des performances similaires",
        dataA.top10Keywords > dataB.top10Keywords ? 
          `${businessA.name} excelle dans le positionnement top 10` :
          `${businessB.name} excelle dans le positionnement top 10`,
        "Optimiser la vitesse mobile pour améliorer le score ILA™"
      ]
    };
  };

  const comparison = generateComparison();

  const metrics = [
    { key: 'score', labelKey: 'score', icon: BarChart3 },
    { key: 'googleRating', labelKey: 'rating', icon: Star },
    { key: 'reviewCount', labelKey: 'reviews', icon: Star }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Montserrat']">
            {t.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Business Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {/* Business A Selector */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-center text-white font-['Montserrat']">
                {t.selectA}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {businesses.slice(0, 10).map((business) => (
                  <Button
                    key={business.id}
                    variant={businessA?.id === business.id ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start text-left font-['Montserrat']"
                    onClick={() => setBusinessA(business)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="truncate">{business.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* VS Section */}
          <div className="flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-white font-bold text-2xl font-['Montserrat']">{t.vs}</span>
            </motion.div>
          </div>

          {/* Business B Selector */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-center text-white font-['Montserrat']">
                {t.selectB}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {businesses.slice(10, 20).map((business) => (
                  <Button
                    key={business.id}
                    variant={businessB?.id === business.id ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start text-left font-['Montserrat']"
                    onClick={() => setBusinessB(business)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="truncate">{business.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comparison Results */}
        {businessA && businessB && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Business Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Business A */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white font-['Montserrat'] flex items-center justify-between">
                    <span className="truncate">{businessA.name}</span>
                    <Badge className={`${getScoreColor(businessA.ilaScore)} bg-transparent border-current`}>
                      {businessA.ilaScore}/100
                    </Badge>
                  </CardTitle>
                  <div className="text-white/60 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {businessA.city} • {businessA.sector}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {metrics.map((metric) => {
                    const IconComponent = metric.icon;
                    const value = businessA[metric.key as keyof RivalBusiness];
                    return (
                      <div key={metric.key} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IconComponent className="w-4 h-4 mr-2 text-[hsl(var(--accent))]" />
                          <span className="text-white/80 font-['Montserrat']">
                            {t[metric.labelKey as keyof typeof t]}
                          </span>
                        </div>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Business B */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-white font-['Montserrat'] flex items-center justify-between">
                    <span className="truncate">{businessB.name}</span>
                    <Badge className={`${getScoreColor(businessB.ilaScore)} bg-transparent border-current`}>
                      {businessB.ilaScore}/100
                    </Badge>
                  </CardTitle>
                  <div className="text-white/60 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {businessB.city} • {businessB.sector}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {metrics.map((metric) => {
                    const IconComponent = metric.icon;
                    const value = businessB[metric.key as keyof RivalBusiness];
                    return (
                      <div key={metric.key} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IconComponent className="w-4 h-4 mr-2 text-[hsl(var(--accent))]" />
                          <span className="text-white/80 font-['Montserrat']">
                            {t[metric.labelKey as keyof typeof t]}
                          </span>
                        </div>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* AI Analysis */}
            {comparison && (
              <Card className="glass-effect border-[hsl(var(--primary))]/30">
                <CardHeader>
                  <CardTitle className="text-white font-['Montserrat'] flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
                    {t.analysis}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Target className="w-5 h-5 text-[hsl(var(--primary))]" />
                    <span className="text-white font-['Montserrat']">
                      {comparison.winner === 'A' ? `${businessA.name} ${t.winner}` :
                       comparison.winner === 'B' ? `${businessB.name} ${t.winner}` :
                       t.similar}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold font-['Montserrat']">{t.recommendation}:</h4>
                    {comparison.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-white/80 font-['Montserrat']">{rec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-['Montserrat']">
                      <Search className="w-4 h-4 mr-2" />
                      Analyse détaillée
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']">
                      <Globe className="w-4 h-4 mr-2" />
                      Exporter résultats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CompareModule;