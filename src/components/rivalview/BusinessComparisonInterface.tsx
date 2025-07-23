import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RivalBusiness } from '@/types/rivalviews.ts';
import { 
  Star, 
  MessageCircle, 
  Camera, 
  Search, 
  TrendingUp, 
  Globe, 
  MapPin, 
  Link, 
  Phone,
  ArrowUp,
  ArrowDown,
  Minus,
  Download,
  Plus,
  Radar
} from 'lucide-react';
import { LanguageContext } from '@/contexts/LanguageContext';

interface BusinessComparisonInterfaceProps {
  userBusiness: RivalBusiness;
  competitorBusiness: RivalBusiness;
  onClose: () => void;
  onExport: () => void;
  onAddDynamicView: () => void;
}

const BusinessComparisonInterface: React.FC<BusinessComparisonInterfaceProps> = ({
  userBusiness,
  competitorBusiness,
  onClose,
  onExport,
  onAddDynamicView
}) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';
  const [showRadarChart, setShowRadarChart] = useState(false);

  const content = {
    fr: {
      title: "Comparaison Détaillée 1-à-1",
      yourBusiness: "Votre entreprise",
      competitor: "Concurrent",
      difference: "Écart",
      criteria: "Critères Score ILA™",
      dynamicViews: "Vues Dynamiques",
      closestCompetitors: "Concurrents les plus proches",
      bestInCity: "Meilleurs dans ma ville",
      addView: "Ajouter une vue",
      export: "Exporter (PDF/CSV)",
      radarView: "Vue Radar",
      recommendations: "Recommandations IA",
      exportPassword: "Mot de passe: ILUMA"
    },
    en: {
      title: "Detailed 1-to-1 Comparison",
      yourBusiness: "Your business",
      competitor: "Competitor", 
      difference: "Gap",
      criteria: "ILA™ Score Criteria",
      dynamicViews: "Dynamic Views",
      closestCompetitors: "Closest competitors",
      bestInCity: "Best in my city",
      addView: "Add view",
      export: "Export (PDF/CSV)",
      radarView: "Radar View",
      recommendations: "AI Recommendations",
      exportPassword: "Password: ILUMA"
    },
    es: {
      title: "Comparación Detallada 1-a-1",
      yourBusiness: "Tu empresa",
      competitor: "Competidor",
      difference: "Diferencia", 
      criteria: "Criterios Puntuación ILA™",
      dynamicViews: "Vistas Dinámicas",
      closestCompetitors: "Competidores más cercanos",
      bestInCity: "Mejores en mi ciudad",
      addView: "Añadir vista",
      export: "Exportar (PDF/CSV)",
      radarView: "Vista Radar",
      recommendations: "Recomendaciones IA",
      exportPassword: "Contraseña: ILUMA"
    }
  };

  const t = content[language as keyof typeof content];

  // Critères de comparaison avec pondération selon le document
  const comparisonCriteria = [
    {
      icon: Star,
      label: "Nombre moyen d'étoiles Google",
      weight: "20%",
      user: userBusiness.googleRating,
      competitor: competitorBusiness.googleRating,
      format: (val: number) => `${val.toFixed(1)}⭐`,
      type: 'rating'
    },
    {
      icon: MessageCircle,
      label: "Nombre total d'avis Google",
      weight: "15%",
      user: userBusiness.reviewCount,
      competitor: competitorBusiness.reviewCount,
      format: (val: number) => val.toLocaleString(),
      type: 'count'
    },
    {
      icon: Camera,
      label: "Présence et qualité des photos",
      weight: "10%",
      user: userBusiness.hasPhotos ? 1 : 0,
      competitor: competitorBusiness.hasPhotos ? 1 : 0,
      format: (val: number) => val ? '✅ Oui' : '❌ Non',
      type: 'boolean'
    },
    {
      icon: Search,
      label: "Mots-clés SEO indexés",
      weight: "15%",
      user: userBusiness.indexedKeywords,
      competitor: competitorBusiness.indexedKeywords,
      format: (val: number) => val.toLocaleString(),
      type: 'count'
    },
    {
      icon: TrendingUp,
      label: "Mots-clés dans le top 10",
      weight: "10%",
      user: userBusiness.top10Keywords,
      competitor: competitorBusiness.top10Keywords,
      format: (val: number) => val.toLocaleString(),
      type: 'count'
    },
    {
      icon: Globe,
      label: "Volume mensuel estimé (trafic)",
      weight: "10%",
      user: userBusiness.organicTraffic,
      competitor: competitorBusiness.organicTraffic,
      format: (val: number) => val.toLocaleString(),
      type: 'count'
    },
    {
      icon: Link,
      label: "Présence site web + performance",
      weight: "10%",
      user: userBusiness.website ? 1 : 0,
      competitor: competitorBusiness.website ? 1 : 0,
      format: (val: number) => val ? '✅ Oui' : '❌ Non',
      type: 'boolean'
    },
    {
      icon: MapPin,
      label: "Adresse confirmée + horaires",
      weight: "5%",
      user: 1, // Assumé présent
      competitor: 1,
      format: (val: number) => val ? '✅ Confirmé' : '❌ Manquant',
      type: 'boolean'
    },
    {
      icon: Link,
      label: "Backlinks locaux / citations",
      weight: "3%",
      user: userBusiness.backlinks,
      competitor: competitorBusiness.backlinks,
      format: (val: number) => val.toLocaleString(),
      type: 'count'
    },
    {
      icon: Phone,
      label: "Cohérence NAP",
      weight: "2%",
      user: 1, // Assumé cohérent
      competitor: 1,
      format: (val: number) => val ? '✅ Cohérent' : '❌ Incohérent',
      type: 'boolean'
    }
  ];

  // Calculer la différence et la direction
  const getDifference = (userVal: number, competitorVal: number, type: string) => {
    if (type === 'boolean') {
      if (userVal === competitorVal) return { value: 0, direction: 'equal', display: '-' };
      return userVal > competitorVal 
        ? { value: 1, direction: 'positive', display: '+1' }
        : { value: -1, direction: 'negative', display: '-1' };
    }
    
    const diff = userVal - competitorVal;
    return {
      value: diff,
      direction: diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'equal',
      display: diff > 0 ? `+${diff.toLocaleString()}` : diff.toLocaleString()
    };
  };

  // Recommandations IA basées sur les écarts
  const generateRecommendations = () => {
    const recommendations = [];
    
    comparisonCriteria.forEach(criterion => {
      const diff = getDifference(criterion.user, criterion.competitor, criterion.type);
      if (diff.direction === 'negative') {
        switch (criterion.label) {
          case "Nombre total d'avis Google":
            recommendations.push("Activez une campagne de collecte d'avis Google");
            break;
          case "Présence et qualité des photos":
            recommendations.push("Ajoutez des photos professionnelles à votre fiche Google");
            break;
          case "Mots-clés SEO indexés":
            recommendations.push("Développez votre contenu SEO avec plus de mots-clés ciblés");
            break;
          case "Volume mensuel estimé (trafic)":
            recommendations.push("Optimisez votre stratégie de contenu pour augmenter le trafic");
            break;
        }
      }
    });

    return recommendations.slice(0, 3); // Limiter à 3 recommandations principales
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-start justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-7xl"
        >
          <Card className="glass-effect border-primary/30">
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold text-foreground font-['Montserrat']">
                    {t.title}
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    {userBusiness.name} vs {competitorBusiness.name}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Vues Dynamiques */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground font-['Montserrat']">
                    {t.dynamicViews}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onAddDynamicView}
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t.addView}
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="glass-effect border-primary/20 p-4 cursor-pointer hover:border-primary/40 transition-colors">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold text-foreground mb-1">{t.closestCompetitors}</h4>
                      <p className="text-sm text-muted-foreground">3 entreprises à proximité</p>
                    </div>
                  </Card>
                  
                  <Card className="glass-effect border-primary/20 p-4 cursor-pointer hover:border-primary/40 transition-colors">
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
                      <h4 className="font-semibold text-foreground mb-1">{t.bestInCity}</h4>
                      <p className="text-sm text-muted-foreground">Top 5 dans {userBusiness.city}</p>
                    </div>
                  </Card>
                  
                  <Card className="glass-effect border-primary/20 p-4 cursor-pointer hover:border-primary/40 transition-colors">
                    <div className="text-center">
                      <Radar className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <h4 className="font-semibold text-foreground mb-1">{t.radarView}</h4>
                      <p className="text-sm text-muted-foreground">Graphique comparatif</p>
                    </div>
                  </Card>
                </div>
              </section>

              <Separator className="bg-border/50" />

              {/* Tableau de Comparaison Détaillé */}
              <section>
                <h3 className="text-xl font-bold text-foreground mb-6 font-['Montserrat']">
                  {t.criteria}
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-4 px-2 text-foreground font-['Montserrat'] w-2/5">
                          Critère observé
                        </th>
                        <th className="text-center py-4 px-2 text-foreground font-['Montserrat'] w-1/5">
                          {t.yourBusiness}
                        </th>
                        <th className="text-center py-4 px-2 text-foreground font-['Montserrat'] w-1/5">
                          {t.competitor}
                        </th>
                        <th className="text-center py-4 px-2 text-foreground font-['Montserrat'] w-1/5">
                          {t.difference}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonCriteria.map((criterion, index) => {
                        const diff = getDifference(criterion.user, criterion.competitor, criterion.type);
                        const IconComponent = criterion.icon;
                        
                        return (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-border/20 hover:bg-muted/5 transition-colors"
                          >
                            <td className="py-4 px-2">
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5 text-primary" />
                                <div>
                                  <span className="text-foreground font-['Montserrat']">
                                    {criterion.label}
                                  </span>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {criterion.weight}
                                  </Badge>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2 text-center">
                              <span className="text-foreground font-medium">
                                {criterion.format(criterion.user)}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-center">
                              <span className="text-foreground font-medium">
                                {criterion.format(criterion.competitor)}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-center">
                              <div className="flex items-center justify-center gap-2">
                                {diff.direction === 'positive' && (
                                  <ArrowUp className="w-4 h-4 text-green-500" />
                                )}
                                {diff.direction === 'negative' && (
                                  <ArrowDown className="w-4 h-4 text-red-500" />
                                )}
                                {diff.direction === 'equal' && (
                                  <Minus className="w-4 h-4 text-muted-foreground" />
                                )}
                                <span className={`font-medium ${
                                  diff.direction === 'positive' ? 'text-green-500' :
                                  diff.direction === 'negative' ? 'text-red-500' :
                                  'text-muted-foreground'
                                }`}>
                                  {diff.display}
                                </span>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                      
                      {/* Score Final ILA™ */}
                      <tr className="border-b-2 border-primary/30 bg-primary/5">
                        <td className="py-6 px-2">
                          <div className="flex items-center gap-3">
                            <Star className="w-6 h-6 text-accent" />
                            <span className="text-xl font-bold text-foreground font-['Montserrat']">
                              SCORE ILA™ FINAL
                            </span>
                          </div>
                        </td>
                        <td className="py-6 px-2 text-center">
                          <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                            {userBusiness.ilaScore}
                          </Badge>
                        </td>
                        <td className="py-6 px-2 text-center">
                          <Badge className="bg-muted text-muted-foreground text-lg px-4 py-2">
                            {competitorBusiness.ilaScore}
                          </Badge>
                        </td>
                        <td className="py-6 px-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {userBusiness.ilaScore > competitorBusiness.ilaScore ? (
                              <ArrowUp className="w-5 h-5 text-green-500" />
                            ) : userBusiness.ilaScore < competitorBusiness.ilaScore ? (
                              <ArrowDown className="w-5 h-5 text-red-500" />
                            ) : (
                              <Minus className="w-5 h-5 text-muted-foreground" />
                            )}
                            <span className={`text-xl font-bold ${
                              userBusiness.ilaScore > competitorBusiness.ilaScore ? 'text-green-500' :
                              userBusiness.ilaScore < competitorBusiness.ilaScore ? 'text-red-500' :
                              'text-muted-foreground'
                            }`}>
                              {userBusiness.ilaScore > competitorBusiness.ilaScore ? '+' : ''}
                              {userBusiness.ilaScore - competitorBusiness.ilaScore}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Recommandations IA */}
              <section>
                <h3 className="text-xl font-bold text-foreground mb-4 font-['Montserrat']">
                  {t.recommendations}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {generateRecommendations().map((recommendation, index) => (
                    <Card key={index} className="glass-effect border-orange-500/30 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-foreground font-['Montserrat'] text-sm">
                          {recommendation}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Actions */}
              <div className="flex justify-between pt-6 border-t border-border/50">
                <div className="text-sm text-muted-foreground">
                  {t.exportPassword}
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={onExport}
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t.export}
                  </Button>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessComparisonInterface;