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
import { useTranslations } from '@/hooks/useTranslations';


const projectsData = [
  {
    id: 1,
    title: "GG Montreal Style - Mode & Style",
    category: "Mode",
    client: "GG Montreal",
    description: "Site web moderne pour une boutique de mode montréalaise avec système de gestion de produits.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&auto=format",
    url: "https://preview--gg-montreal-style-57.lovable.app/",
    results: {
      performance: "95/100",
      design: "Interface moderne",
      mobile: "100% responsive",
      timeframe: "3 semaines"
    },
    status: "Terminé",
    tags: ["E-commerce", "Mode", "Responsive Design"],
    story: "Création d'un site vitrine élégant avec catalogue produits pour une boutique de mode montréalaise."
  },
  {
    id: 2,
    title: "Livrerie d'Amitié - Librairie",
    category: "Culture",
    client: "Livrerie d'Amitié",
    description: "Site web chaleureux pour une librairie communautaire avec système de catalogue en ligne.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&auto=format",
    url: "https://preview--literiedamitie.lovable.app/",
    results: {
      performance: "92/100",
      design: "Ambiance chaleureuse",
      mobile: "100% responsive",
      timeframe: "2 semaines"
    },
    status: "Terminé",
    tags: ["Catalogue", "Culture", "Communauté"],
    story: "Développement d'une plateforme digitale qui reflète l'âme d'une librairie de quartier."
  },
  {
    id: 3,
    title: "Dongato Donperro - Landing Page",
    category: "Services",
    client: "Dongato Donperro",
    description: "Landing page percutante avec design moderne et call-to-action optimisés.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&auto=format",
    url: "https://preview--dongato-donperro-landing.lovable.app/",
    results: {
      performance: "98/100",
      design: "Design impactant",
      mobile: "100% responsive",
      timeframe: "1 semaine"
    },
    status: "Terminé",
    tags: ["Landing Page", "Conversion", "Marketing"],
    story: "Création d'une landing page haute conversion avec design moderne et UX optimisée."
  },
  {
    id: 4,
    title: "Imane Barkak Estate - Immobilier",
    category: "Immobilier",
    client: "Imane Barkak",
    description: "Site web professionnel pour agent immobilier avec portfolio de propriétés.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&auto=format",
    url: "https://preview--imane-barkak-estate.lovable.app/",
    results: {
      performance: "94/100",
      design: "Professionnel & moderne",
      mobile: "100% responsive",
      timeframe: "2 semaines"
    },
    status: "Terminé",
    tags: ["Immobilier", "Portfolio", "Professionnel"],
    story: "Développement d'une plateforme immobilière élégante avec showcase de propriétés."
  }
];

const Portfolio = () => {
  const { language } = useTranslations();
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = ['Tous', 'Mode', 'Culture', 'Services', 'Immobilier'];
  
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
      onClick={() => window.open(project.url, '_blank')}
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
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.url, '_blank');
              }}
            >
              Voir le site
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
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
              <div className="text-2xl font-bold text-green-400">{project.results.performance}</div>
              <div className="text-xs text-white/60">Performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{project.results.design}</div>
              <div className="text-xs text-white/60">Design</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{project.results.mobile}</div>
              <div className="text-xs text-white/60">Mobile</div>
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
              Nos réalisations
              <br />
              <span className="text-4xl md:text-6xl">web & landing pages</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Découvrez nos créations web : sites vitrines, e-commerce et landing pages 
              développés avec Lovable pour nos clients.
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
                  Portfolio Web & Landing Pages
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  Sites web et landing pages créés avec Lovable
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-400">4</div>
                    <div className="text-sm text-white/60">Sites créés</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-blue-400">95/100</div>
                    <div className="text-sm text-white/60">Performance moyenne</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-purple-400">100%</div>
                    <div className="text-sm text-white/60">Responsive</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-cyan-400">2</div>
                    <div className="text-sm text-white/60">Semaines moyennes</div>
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
                  Besoin d'un site web ou landing page ?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Créons ensemble votre présence web avec Lovable. Design moderne, performance optimale.
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                  onClick={() => window.location.href = '/contact'}
                >
                  Créer mon site web
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