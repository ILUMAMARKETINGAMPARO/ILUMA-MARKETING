import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageContext } from '@/contexts/LanguageContext';
import { 
  Brain, 
  Search, 
  Star, 
  Camera, 
  Link, 
  TrendingUp, 
  MapPin, 
  Building,
  Users,
  Globe,
  BarChart3,
  Target
} from 'lucide-react';

const DataMethodology: React.FC = () => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';

  const content = {
    fr: {
      title: "🧠 Méthodologie des Données",
      subtitle: "Comment nous calculons le Score ILA™ et d'où viennent les données",
      scoreTitle: "Les 12 Critères du Score ILA™",
      dataTitle: "Sources des Données",
      criteria: [
        { icon: Search, name: "Mots-clés indexés", description: "Nombre total de mots-clés référencés", weight: "15%" },
        { icon: Target, name: "Top 10 Google", description: "Mots-clés positionnés dans les 10 premiers résultats", weight: "20%" },
        { icon: TrendingUp, name: "Trafic organique", description: "Visiteurs mensuels depuis Google", weight: "15%" },
        { icon: Link, name: "Backlinks", description: "Liens entrants de qualité", weight: "10%" },
        { icon: Star, name: "Note Google", description: "Réputation moyenne sur Google My Business", weight: "10%" },
        { icon: Users, name: "Avis clients", description: "Nombre total de commentaires", weight: "8%" },
        { icon: Camera, name: "Photos GMB", description: "Présence de photos sur la fiche Google", weight: "5%" },
        { icon: MapPin, name: "Géolocalisation", description: "Précision de l'adresse et coordonnées", weight: "5%" },
        { icon: Building, name: "Type d'entreprise", description: "Réseau, franchise ou indépendant", weight: "4%" },
        { icon: Globe, name: "Site web", description: "Présence et qualité du site internet", weight: "3%" },
        { icon: BarChart3, name: "Activité récente", description: "Mises à jour et interactions récentes", weight: "3%" },
        { icon: Brain, name: "Score IA", description: "Évaluation algorithmique globale", weight: "2%" }
      ],
      sources: [
        { name: "Ahrefs", description: "Données SEO, mots-clés, backlinks, trafic organique", type: "API" },
        { name: "Google My Business", description: "Avis, notes, photos, informations locales", type: "Scraping" },
        { name: "CRM Iluma™", description: "Données clients, historique, potentiel commercial", type: "Interne" },
        { name: "Géolocalisation", description: "Coordonnées GPS précises, distances calculées", type: "MapLibre" }
      ],
      updateFreq: "Les données sont mises à jour en temps réel toutes les 24h",
      precision: "Précision des données : 95% vérifiée"
    },
    en: {
      title: "🧠 Data Methodology",
      subtitle: "How we calculate the ILA™ Score and where the data comes from",
      scoreTitle: "The 12 ILA™ Score Criteria",
      dataTitle: "Data Sources",
      criteria: [
        { icon: Search, name: "Indexed keywords", description: "Total number of referenced keywords", weight: "15%" },
        { icon: Target, name: "Google Top 10", description: "Keywords ranked in top 10 results", weight: "20%" },
        { icon: TrendingUp, name: "Organic traffic", description: "Monthly visitors from Google", weight: "15%" },
        { icon: Link, name: "Backlinks", description: "Quality inbound links", weight: "10%" },
        { icon: Star, name: "Google rating", description: "Average reputation on Google My Business", weight: "10%" },
        { icon: Users, name: "Customer reviews", description: "Total number of comments", weight: "8%" },
        { icon: Camera, name: "GMB photos", description: "Presence of photos on Google listing", weight: "5%" },
        { icon: MapPin, name: "Geolocation", description: "Address accuracy and coordinates", weight: "5%" },
        { icon: Building, name: "Business type", description: "Chain, franchise or independent", weight: "4%" },
        { icon: Globe, name: "Website", description: "Presence and quality of website", weight: "3%" },
        { icon: BarChart3, name: "Recent activity", description: "Recent updates and interactions", weight: "3%" },
        { icon: Brain, name: "AI Score", description: "Global algorithmic evaluation", weight: "2%" }
      ],
      sources: [
        { name: "Ahrefs", description: "SEO data, keywords, backlinks, organic traffic", type: "API" },
        { name: "Google My Business", description: "Reviews, ratings, photos, local information", type: "Scraping" },
        { name: "Iluma™ CRM", description: "Client data, history, commercial potential", type: "Internal" },
        { name: "Geolocation", description: "Precise GPS coordinates, calculated distances", type: "MapLibre" }
      ],
      updateFreq: "Data is updated in real-time every 24h",
      precision: "Data accuracy: 95% verified"
    },
    es: {
      title: "🧠 Metodología de Datos",
      subtitle: "Cómo calculamos la Puntuación ILA™ y de dónde vienen los datos",
      scoreTitle: "Los 12 Criterios de Puntuación ILA™",
      dataTitle: "Fuentes de Datos",
      criteria: [
        { icon: Search, name: "Palabras clave indexadas", description: "Número total de palabras clave referenciadas", weight: "15%" },
        { icon: Target, name: "Google Top 10", description: "Palabras clave posicionadas en los 10 primeros resultados", weight: "20%" },
        { icon: TrendingUp, name: "Tráfico orgánico", description: "Visitantes mensuales desde Google", weight: "15%" },
        { icon: Link, name: "Backlinks", description: "Enlaces entrantes de calidad", weight: "10%" },
        { icon: Star, name: "Calificación Google", description: "Reputación promedio en Google My Business", weight: "10%" },
        { icon: Users, name: "Reseñas de clientes", description: "Número total de comentarios", weight: "8%" },
        { icon: Camera, name: "Fotos GMB", description: "Presencia de fotos en la ficha de Google", weight: "5%" },
        { icon: MapPin, name: "Geolocalización", description: "Precisión de dirección y coordenadas", weight: "5%" },
        { icon: Building, name: "Tipo de empresa", description: "Cadena, franquicia o independiente", weight: "4%" },
        { icon: Globe, name: "Sitio web", description: "Presencia y calidad del sitio web", weight: "3%" },
        { icon: BarChart3, name: "Actividad reciente", description: "Actualizaciones e interacciones recientes", weight: "3%" },
        { icon: Brain, name: "Puntuación IA", description: "Evaluación algorítmica global", weight: "2%" }
      ],
      sources: [
        { name: "Ahrefs", description: "Datos SEO, palabras clave, backlinks, tráfico orgánico", type: "API" },
        { name: "Google My Business", description: "Reseñas, calificaciones, fotos, información local", type: "Scraping" },
        { name: "CRM Iluma™", description: "Datos de clientes, historial, potencial comercial", type: "Interno" },
        { name: "Geolocalización", description: "Coordenadas GPS precisas, distancias calculadas", type: "MapLibre" }
      ],
      updateFreq: "Los datos se actualizan en tiempo real cada 24h",
      precision: "Precisión de datos: 95% verificada"
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Montserrat']">
            {t.title}
          </h2>
          <p className="text-xl text-white/80 max-w-4xl mx-auto font-['Montserrat']">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Score Criteria */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect border-white/20 h-full">
              <CardHeader>
                <CardTitle className="text-white font-['Montserrat'] text-2xl flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-[hsl(var(--accent))]" />
                  {t.scoreTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {t.criteria.map((criterion, index) => {
                  const IconComponent = criterion.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <IconComponent className="w-5 h-5 text-[hsl(var(--accent))] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium font-['Montserrat']">
                            {criterion.name}
                          </span>
                          <Badge className="bg-[hsl(var(--primary))]/20 text-[hsl(var(--accent))] text-xs">
                            {criterion.weight}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm font-['Montserrat']">
                          {criterion.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Sources */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white font-['Montserrat'] text-2xl flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-[hsl(var(--accent))]" />
                  {t.dataTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {t.sources.map((source, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold font-['Montserrat']">
                        {source.name}
                      </span>
                      <Badge className="bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))]">
                        {source.type}
                      </Badge>
                    </div>
                    <p className="text-white/70 text-sm font-['Montserrat']">
                      {source.description}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Update Info */}
            <Card className="glass-effect border-[hsl(var(--accent))]/30">
              <CardContent className="p-6 text-center">
                <div className="text-[hsl(var(--accent))] font-bold mb-2 font-['Montserrat']">
                  {t.updateFreq}
                </div>
                <div className="text-white/80 font-['Montserrat']">
                  {t.precision}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DataMethodology;