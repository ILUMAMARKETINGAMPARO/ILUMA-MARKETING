import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  TrendingUp, 
  Users, 
  Globe, 
  MapPin, 
  Clock,
  ArrowRight,
  Filter,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';


const projectsData = [
  {
    id: 1,
    title: "Katz Sport - Révolution SEO",
    category: "Sport",
    client: "Katz Sport",
    description: "Transformation complète de la visibilité SEO pour une boutique spécialisée en équipements de crosse.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format",
    results: {
      traffic: "+214%",
      keywords: "45 mots-clés",
      conversion: "+52%",
      timeframe: "6 mois"
    },
    scoreILA: 89,
    status: "Terminé",
    tags: ["SEO Local", "E-commerce", "Analytics"],
    story: "Katz Sport n'avait aucune présence SEO. En 6 mois, nous avons créé un écosystème digital complet qui génère maintenant un flux constant de clients qualifiés."
  },
  {
    id: 2,
    title: "Clinique Force Santé - Digital Santé",
    category: "Santé",
    client: "Réseau Force Santé",
    description: "Modernisation digitale complète avec prise de RDV IA et scoring patient automatique.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&auto=format",
    results: {
      traffic: "+187%",
      keywords: "67 mots-clés",
      conversion: "+73%",
      timeframe: "4 mois"
    },
    scoreILA: 94,
    status: "Terminé",
    tags: ["Santé", "IA", "Booking", "CRM"],
    story: "Automatisation de la prise de RDV avec intelligence prédictive pour optimiser les créneaux et réduire les no-shows de 60%."
  },
  {
    id: 3,
    title: "La Poche Bleue - Média Sportif",
    category: "Média",
    client: "La Poche Bleue",
    description: "Stratégie de partenariat et écosystème publicitaire pour média sportif +350k abonnés.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format",
    results: {
      traffic: "+156%",
      keywords: "89 mots-clés",
      conversion: "+41%",
      timeframe: "8 mois"
    },
    scoreILA: 92,
    status: "En cours",
    tags: ["Média", "Partenariat", "Influence"],
    story: "Création d'un hub de partenariats intelligents reliant marques locales et influence sportive authentique."
  },
  {
    id: 4,
    title: "Concept M Rustique - Restaurant",
    category: "Restauration",
    client: "Concept M Rustique",
    description: "Écosystème digital gastronomique avec réservation IA et gestion de réputation.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    results: {
      traffic: "+198%",
      keywords: "34 mots-clés",
      conversion: "+68%",
      timeframe: "5 mois"
    },
    scoreILA: 87,
    status: "Terminé",
    tags: ["Restaurant", "Réservation", "Local SEO"],
    story: "Transformation d'un restaurant familial en destination culinaire incontournable grâce à l'IA et au SEO local."
  }
];

const Portfolio = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = ['Tous', 'Sport', 'Santé', 'Média', 'Restauration'];
  
  const filteredProjects = activeFilter === 'Tous' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  const ProjectCard = ({ project }: { project: typeof projectsData[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
      onClick={() => setSelectedProject(project.id)}
    >
      <Card className="glass-effect border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <Badge className={`
              ${project.status === 'Terminé' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}
              border-none
            `}>
              {project.status}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-bold text-white">{project.scoreILA}</span>
            </div>
          </div>
          <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="text-white/70">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{project.results.traffic}</div>
              <div className="text-xs text-white/60">Trafic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{project.results.keywords}</div>
              <div className="text-xs text-white/60">Mots-clés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{project.results.conversion}</div>
              <div className="text-xs text-white/60">Conversion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{project.results.timeframe}</div>
              <div className="text-xs text-white/60">Durée</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                {tag}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-white/80 italic">
            "{project.story}"
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-purple-400" />
              <span className="text-purple-300 font-medium text-lg">PORTFOLIO ILUMA™</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
              Notre intelligence
              <br />
              <span className="text-4xl md:text-6xl">en action</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Chaque projet est une mission. Chaque mission, une transformation.
              Découvrez nos réalisations les plus transformatrices.
            </p>
            
            {/* Smart Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  onClick={() => setActiveFilter(category)}
                  className={`
                    ${activeFilter === category 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'border-purple-500/30 text-white hover:bg-purple-500/20'
                    }
                  `}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              ))}
            </motion.div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          {/* Metrics Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <Card className="glass-effect border-purple-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-white mb-4">
                  Impact Cumulé Iluma™
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  Résultats mesurables de notre approche IA-first
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-400">+189%</div>
                    <div className="text-sm text-white/60">Trafic moyen</div>
                  </div>
                  <div className="text-center">
                    <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-blue-400">235</div>
                    <div className="text-sm text-white/60">Mots-clés indexés</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-purple-400">+58%</div>
                    <div className="text-sm text-white/60">Conversion moyenne</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-cyan-400">4.2</div>
                    <div className="text-sm text-white/60">Mois moyens</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Card className="glass-effect border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-cyan-600/10">
              <CardContent className="py-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Vous aimeriez voir votre marque ici ?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Créez votre propre mission avec Iluma. Ensemble, révélons votre puissance invisible.
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                  onClick={() => window.location.href = '/contact'}
                >
                  Démarrer ma transformation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
      
    </div>
  );
};

export default Portfolio;