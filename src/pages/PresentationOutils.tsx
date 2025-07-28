import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import FAQSection from '@/components/faq/FAQSection';
import SEOManager from '@/components/seo/SEOManager';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Filter,
  ArrowRight,
  Target,
  Globe,
  PenTool,
  Users,
  BarChart3,
  MessageSquare,
  Heart,
  Calculator,
  Rocket,
  Youtube,
  Megaphone,
  MapPin,
  ShoppingCart,
  Mic,
  Brain,
  Eye,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SEOEngine } from '@/utils/seoEngine';
import { products, solutions, services, categories, getAllOfferings, searchOfferings } from '@/data/ecosystem';

const PresentationOutils = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const seoData = SEOEngine.generatePageSEO('service', { 
    serviceName: 'Présentation des Outils Iluma™', 
    benefit: 'découvrir tous nos services et outils IA organisés selon vos besoins' 
  });

  // Solutions Iluma™ (version claire & impactante)
  const Solutions = [
    {
      id: 'lilo', name: 'Lilo™', title: 'Assistant intelligent intégré à tout l\'écosystème Iluma', 
      description: 'Il vous guide, vous explique chaque outil simplement, et vous aide à faire les bons choix au bon moment.', 
      icon: MessageSquare, color: 'from-violet-500 to-purple-600', path: '/lilo', 
      category: 'assistance', status: 'Actif', type: 'module'
    },
    {
      id: 'ila', name: 'ILA™', title: 'Score de visibilité basé sur votre présence en ligne réelle', 
      description: 'Il révèle votre performance sur Google et vous montre exactement quoi améliorer pour attirer plus de monde.', 
      icon: BarChart3, color: 'from-cyan-500 to-blue-600', path: '/ila', 
      category: 'analytics', status: 'Actif', type: 'module'
    },
    {
      id: 'adluma', name: 'ADLUMA™', title: 'Simulateur d\'impressions locales pour vos campagnes', 
      description: 'Il vous montre combien de personnes pourraient voir votre publicité selon votre quartier et votre audience cible.', 
      icon: Target, color: 'from-orange-500 to-red-600', path: '/adluma', 
      category: 'simulation', status: 'Actif', type: 'module'
    },
    {
      id: 'ilumatch', name: 'ILUMATCH™', title: 'Moteur de partenariat stratégique entre entreprises locales', 
      description: 'Il identifie les partenaires idéaux pour créer des collaborations qui vous rendent tous plus visibles.', 
      icon: Users, color: 'from-green-500 to-emerald-600', path: '/ilumatch', 
      category: 'partnership', status: 'Actif', type: 'module'
    },
    {
      id: 'rivalviews', name: 'RivalViews™', title: 'Carte interactive des commerces autour de vous, classés par performance web', 
      description: 'Elle permet de repérer en un clin d\'œil les entreprises influentes et d\'entrer en contact facilement.', 
      icon: MapPin, color: 'from-indigo-500 to-purple-600', path: '/rivalviews', 
      category: 'mapping', status: 'Actif', type: 'module'
    },
    {
      id: 'landing-intelligente', name: 'Landing Page Intelligente', title: 'Page de destination conçue pour attirer, captiver et convertir', 
      description: 'Elle transforme les curieux en clients avec un design clair, rapide et adapté à ce qu\'ils cherchent.', 
      icon: Rocket, color: 'from-pink-500 to-rose-600', path: '/landing-page-intelligente', 
      category: 'conversion', status: 'Actif', type: 'module'
    },
    {
      id: 'fidelisation-intelligente', name: 'Page de Fidélisation Intelligente', title: 'Espace exclusif pour engager vos meilleurs clients', 
      description: 'Elle entretient la relation avec des offres, rappels ou avantages qui donnent envie de revenir.', 
      icon: Heart, color: 'from-teal-500 to-cyan-600', path: '/page-fidelisation-intelligente', 
      category: 'fidelisation', status: 'Actif', type: 'module'
    }
  ];

  // Utilisation de la recherche unifiée
  const filteredTools = searchOfferings(searchTerm).filter(tool => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'products') return tool.type === 'product';
    if (selectedCategory === 'solutions') return tool.type === 'solution';
    if (selectedCategory === 'services') return tool.type === 'service';
    return tool.category === selectedCategory;
  });

  // Nouvelles catégories organisées
  const allOfferings = getAllOfferings();
  const allCategories = [
    { id: 'all', label: 'Tout l\'écosystème', count: allOfferings.length },
    { id: 'products', label: '🏢 Produits', count: products.length },
    { id: 'solutions', label: '🤖 Solutions IA', count: solutions.length },
    { id: 'services', label: '🛠️ Services', count: services.length },
    // Sous-catégories
    { id: 'seo', label: 'SEO', count: allOfferings.filter(t => t.category === 'seo').length },
    { id: 'ads', label: 'Publicité', count: allOfferings.filter(t => t.category === 'ads').length },
    { id: 'analytics', label: 'Analytics', count: allOfferings.filter(t => t.category === 'analytics').length },
    { id: 'partnership', label: 'Partenariats', count: allOfferings.filter(t => t.category === 'partnership').length }
  ];

  return (
    <>
      <SEOManager seoData={seoData} path="/presentation-outils" />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
        
        {/* Hero Section avec structure FAC */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Lilo Guide Message */}
              <motion.div 
                className="mb-8 flex items-center justify-center gap-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center animate-pulse">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <motion.div 
                  className="bg-black/50 backdrop-blur-xl rounded-2xl p-3 border border-[#8E44FF]/30"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-[#FFD56B] font-['Montserrat'] text-sm">
                    🤖 <strong>Lilo, spécialiste IA & SGE</strong>, vous guide à travers nos outils organisés par besoin
                  </p>
                </motion.div>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Montserrat']">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Présentation des Outils Iluma™
                </span>
              </h1>
              
              {/* Structure FAC */}
              <div className="max-w-4xl mx-auto mb-8 space-y-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-red-400 mb-2">📊 FAIT</p>
                  <p className="text-white/90 font-['Montserrat'] text-lg">
                    Les entreprises utilisent des outils sans stratégie globale, perdant 70% de leur potentiel.
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-400 mb-2">⚡ ACTION</p>
                  <p className="text-white/90 font-['Montserrat'] text-lg">
                    Voici nos services organisés par besoin, avec filtres IA et recommandations personnalisées.
                  </p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-400 mb-2">🎯 CONTEXTE</p>
                  <p className="text-white/90 font-['Montserrat'] text-lg">
                    Tous nos outils s'intègrent dans une logique IA + performance + visibilité collective.
                  </p>
                </div>
              </div>

              <Badge className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 text-[#FFD56B] text-lg px-6 py-2 border border-[#8E44FF]/30 font-['Montserrat']">
                {products.length} Produits • {solutions.length} Solutions IA • {services.length} Services • Navigation Libre
              </Badge>
            </motion.div>
          </div>
        </section>

        {/* Filtres et Recherche */}
        <section className="py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Recherche */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher un outil ou service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-black/40 border-white/20 text-white pl-10 py-3 font-['Montserrat'] focus:border-[#8E44FF]"
                />
              </div>
              
              {/* Filtres catégories */}
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className={`font-['Montserrat'] ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-white' 
                        : 'border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Grille des Outils */}
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => {
                const IconComponent = tool.icon;
                
                return (
                  <motion.div
                    key={`${tool.type}-${tool.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="h-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant="outline"
                               className={`border-green-500/50 text-green-400 bg-green-500/10 font-['Montserrat'] mb-1`}
                            >
                              {tool.status}
                            </Badge>
                            <Badge 
                              className={`text-xs font-['Montserrat'] ${
                                tool.type === 'product' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                tool.type === 'solution' ? 'bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30' : 
                                'bg-[#FFD56B]/20 text-[#FFD56B] border-[#FFD56B]/30'
                              }`}
                            >
                              {tool.type === 'product' ? 'Produit' : 
                               tool.type === 'solution' ? 'Solution IA' : 'Service'}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="mb-6">
                          <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                            {tool.name}
                          </h3>
                          <h4 className="text-sm text-purple-300 mb-3 font-['Montserrat']">
                            {tool.title}
                          </h4>
                          <p className="text-white/70 text-sm mb-4 font-['Montserrat']">
                            {tool.description}
                          </p>
                          {tool.pricing && (
                            <div className="text-[#FFD56B] text-sm font-['Montserrat'] mb-2">
                              {tool.pricing}
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <Link to={tool.path}>
                          <Button 
                            className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-['Montserrat'] group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300"
                            size="sm"
                          >
                            {tool.type === 'product' ? 'Commander' : 
                             tool.type === 'solution' ? 'Utiliser' : 'Découvrir'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <Eye className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white/70 mb-2 font-['Montserrat']">
                  Aucun outil trouvé
                </h3>
                <p className="text-white/50 font-['Montserrat']">
                  Essayez de modifier vos critères de recherche
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-12 border border-[#8E44FF]/30"
            >
              <Sparkles className="w-12 h-12 text-[#FFD56B] mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-6 font-['Montserrat']">
                Prêt à choisir vos outils ?
              </h2>
              <p className="text-xl text-white/80 mb-8 font-['Montserrat']">
                Commencez par notre diagnostic gratuit ou explorez notre méthode complète.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/adluma">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Diagnostic Gratuit
                  </Button>
                </Link>
                <Link to="/methode-iluma">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Voir la Méthode
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <HelpCircle className="w-12 h-12 text-[#FFD56B] mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
                Questions fréquentes sur nos <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">Outils</span>
              </h2>
              <p className="text-white/70 font-['Montserrat']">
                Tout ce que vous devez savoir sur notre écosystème complet
              </p>
            </motion.div>
            <FAQSection />
          </div>
        </section>

        <Footer />

        {/* Structured Data for SGE */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Outils et Services Iluma™",
            "description": "Présentation complète de tous nos outils IA et services marketing organisés par besoin : Solutions propriétaires, services SEO, conversion, contenu et plus.",
            "url": "https://ilumamarketing.com/presentation-outils",
            "numberOfItems": allOfferings.length,
            "itemListElement": allOfferings.slice(0, 10).map((tool, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "SoftwareApplication",
                "name": tool.name,
                "description": tool.description,
                "url": `https://ilumamarketing.com${tool.path}`,
                "applicationCategory": "BusinessApplication"
              }
            }))
          })}
        </script>

        {/* FAQ Schema for SGE */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quelle est la différence entre Solutions et services Iluma™ ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Les Solutions sont des outils IA propriétaires intégrés (ADLUMA™, ILA™, LILO™), tandis que les services sont des prestations marketing complètes (SEO, Ads, Contenu). Tous s'intègrent via notre HUB™."
                }
              },
              {
                "@type": "Question",
                "name": "Comment choisir les bons outils pour mon entreprise ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Commencez par notre diagnostic gratuit ADLUMA™ qui analyse vos besoins et recommande les outils optimaux selon votre secteur, objectifs et budget."
                }
              },
              {
                "@type": "Question",
                "name": "Les outils Iluma™ fonctionnent-ils ensemble ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, tous nos outils s'intègrent parfaitement. Données partagées, workflow automatisé, performance maximisée via notre architecture IA centralisée."
                }
              },
              {
                "@type": "Question",
                "name": "Puis-je utiliser seulement certains outils ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolument. Chaque outil fonctionne de manière autonome. Cependant, la synergie complète de l'écosystème Iluma™ maximise vos résultats."
                }
              }
            ]
          })}
        </script>
      </div>
    </>
  );
};

export default PresentationOutils;