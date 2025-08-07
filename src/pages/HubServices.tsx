import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import HubHero from '@/components/hub/HubHero';
import ServicesGrid from '@/components/hub/ServicesGrid';
import HubCTA from '@/components/hub/HubCTA';
import SEOHubCard from '@/components/seo-social/SEOHubCard';
import SEOManager from '@/components/seo/SEOManager';
import DynamicSEO from '@/components/seo/DynamicSEO';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';
import FAQSection from '@/components/faq/FAQSection';
import { motion } from 'framer-motion';
import { products, solutions, services, categories, ecosystemStats } from '@/data/ecosystem';
import { useTranslations } from '@/hooks/useTranslations';
import { SEOEngine } from '@/utils/seoEngine';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Brain, 
  Target, 
  Users, 
  BarChart3, 
  Settings, 
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Rocket,
  Shield,
  Search,
  Filter,
  ExternalLink
} from 'lucide-react';

const HubServices = () => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSection, setActiveSection] = useState<'products' | 'solutions' | 'services'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const seoData = {
    title: "HUB Services Iluma™ | Écosystème Complet Solutions IA Marketing",
    description: "Découvrez notre écosystème complet de solutions IA marketing : 12+ produits, solutions et services intégrés. ADLUMA™, ILA™, CRM Intelligent, SEO IA, Landing Pages et plus.",
    keywords: "hub services, écosystème marketing, solutions IA, ADLUMA, ILA, CRM intelligent, SEO IA, landing pages, visibilité locale, e-commerce, Iluma",
    image: "https://ilumamarketing.com/images/hub-services-ecosystem.jpg",
    canonical: "https://ilumamarketing.com/services"
  };

  // Fonction de navigation optimisée
  const handleNavigateToService = async (path: string) => {
    setIsLoading(true);
    try {
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to window.location if navigate fails
      window.location.href = path;
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  // Obtenir la liste active selon la section
  const getActiveList = () => {
    switch (activeSection) {
      case 'products': return products;
      case 'solutions': return solutions;
      case 'services': return services;
      default: return products;
    }
  };

  const getActiveCategories = () => {
    return categories[activeSection] || [];
  };

  const filteredItems = getActiveList().filter(item => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const mainFeatures = [
    {
      icon: Brain,
      title: t('hubServices.features.modules'),
      description: t('hubServices.features.modulesDesc'),
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Target,
      title: t('hubServices.features.navigation'),
      description: t('hubServices.features.navigationDesc'),
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: t('hubServices.features.analytics'),
      description: t('hubServices.features.analyticsDesc'),
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Settings,
      title: t('hubServices.features.automation'),
      description: t('hubServices.features.automationDesc'),
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    { value: `${ecosystemStats.products.count}`, label: t('hubServices.stats.products'), color: "text-blue-400" },
    { value: `${ecosystemStats.solutions.count}`, label: t('hubServices.stats.solutions'), color: "text-purple-400" },
    { value: `${ecosystemStats.services.count}`, label: t('hubServices.stats.services'), color: "text-orange-400" },
    { value: "24/7", label: t('hubServices.stats.support'), color: "text-green-400" }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      company: "TechnoSolution Inc.",
      text: "Le HUB Services Iluma™ a révolutionné notre approche marketing. Tout est centralisé et intelligent.",
      rating: 5,
      avatar: "MD"
    },
    {
      name: "Pierre Leblanc", 
      company: "Clinique Moderne",
      text: "Grâce aux services Iluma™, notre visibilité locale a augmenté de 250% en 3 mois.",
      rating: 5,
      avatar: "PL"
    }
  ];

  return (
    <>
      <PerformanceOptimizer />
      <DynamicSEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.image}
        canonical={seoData.canonical}
      />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
        
        <main className="pt-32 pb-20">
          {/* Hero Section */}
          <section className="relative overflow-hidden mb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <Badge className="bg-[#8E44FF]/20 text-[#FFD56B] text-sm px-4 py-1 font-['Montserrat'] mb-1">
                      HUB SERVICES ILUMA™
                    </Badge>
                    <div className="text-white/60 text-xs">Écosystème Marketing IA</div>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Écosystème
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Marketing IA Complet
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
                  Plus de <strong className="text-violet-400">12 solutions intégrées</strong> pour transformer votre présence digitale
                  <br />
                  <span className="text-white/70">Produits • Solutions IA • Services Premium</span>
                </p>
                
                {/* Navigation par sections */}
                <div className="flex justify-center gap-4 mb-8">
                  {[
                    { key: 'products', label: t('hubServices.products'), count: ecosystemStats.products.count, color: 'from-blue-500 to-cyan-500' },
                    { key: 'solutions', label: t('hubServices.solutions'), count: ecosystemStats.solutions.count, color: 'from-purple-500 to-pink-500' },
                    { key: 'services', label: t('hubServices.services'), count: ecosystemStats.services.count, color: 'from-orange-500 to-yellow-500' }
                  ].map((section) => (
                    <Button
                      key={section.key}
                      onClick={() => {
                        setActiveSection(section.key as any);
                        setActiveFilter('all');
                      }}
                      className={`font-['Montserrat'] transition-all duration-300 ${
                        activeSection === section.key 
                          ? `bg-gradient-to-r ${section.color} text-white shadow-lg` 
                          : 'bg-black/40 border border-white/20 text-white hover:bg-white/10'
                      }`}
                      size="lg"
                    >
                      {section.label} ({section.count})
                    </Button>
                  ))}
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
              >
                {stats.map((stat, index) => (
                  <Card key={index} className="glass-effect border-white/20 text-center p-6 hover:border-purple-500/50 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className={`text-3xl font-bold mb-2 font-['Montserrat'] ${stat.color || 'text-[#FFD56B]'}`}>{stat.value}</div>
                      <div className="text-white/70 font-['Montserrat']">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Main Features */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Montserrat']">
                  {t('hubServices.whyChoose')}
                </h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto font-['Montserrat']">
                  {t('hubServices.whyChooseSubtitle')}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {mainFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="glass-effect border-white/20 p-6 text-center hover:border-[#8E44FF]/50 transition-all duration-300 h-full">
                        <CardContent className="p-0">
                          <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3 font-['Montserrat']">{feature.title}</h3>
                          <p className="text-white/70 font-['Montserrat']">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Filtres et recherche optimisés */}
          <section className="py-16 bg-gradient-to-b from-black to-purple-900/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Explorez Notre <span className="text-violet-400">Écosystème</span>
                </h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  Filtrez et découvrez les solutions parfaites pour votre entreprise
                </p>
              </motion.div>

              <div className="flex flex-col lg:flex-row gap-6 mb-12">
                {/* Barre de recherche améliorée */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    placeholder={t('hubServices.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/60 border-2 border-white/20 text-white pl-12 pr-4 py-4 rounded-xl font-['Montserrat'] focus:border-violet-400 focus:outline-none transition-all duration-300 placeholder-white/50"
                  />
                </div>
                
                {/* Bouton Tout afficher */}
                <Button
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchTerm('');
                  }}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 font-['Montserrat']"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Tout afficher
                </Button>
              </div>

              {/* Filtres par catégorie */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <Button
                  onClick={() => setActiveFilter('all')}
                  variant={activeFilter === 'all' ? "default" : "outline"}
                  size="sm"
                  className={`font-['Montserrat'] transition-all duration-300 ${
                    activeFilter === 'all' 
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' 
                      : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  Toutes les catégories
                </Button>
                {getActiveCategories().map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    variant={activeFilter === category.id ? "default" : "outline"}
                    size="sm"
                    className={`font-['Montserrat'] transition-all duration-300 ${
                      activeFilter === category.id 
                        ? 'bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-white shadow-lg' 
                        : 'border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>

              {/* Résultats de recherche */}
              {searchTerm && (
                <div className="text-center mb-6">
                  <p className="text-white/70 font-['Montserrat']">
                    {filteredItems.length} résultat{filteredItems.length > 1 ? 's' : ''} pour "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          </section>
          
          {/* Items Grid */}
          <section className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Card className="h-full glass-effect border-white/20 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-right">
                              <Badge className={`${
                                item.status === 'Actif' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                item.status === 'Nouveau' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                item.status === 'Exclusif' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                                'bg-gray-500/20 text-gray-400 border-gray-500/30'
                              } font-['Montserrat'] mb-2`}>
                                {item.status}
                              </Badge>
                              <div className="text-[#FFD56B] text-sm font-['Montserrat']">{item.pricing}</div>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                              {item.name}
                            </h3>
                            <h4 className="text-sm text-purple-300 mb-3 font-['Montserrat']">
                              {item.title}
                            </h4>
                            <p className="text-white/70 text-sm mb-4 font-['Montserrat']">
                              {item.description}
                            </p>
                            <div className="space-y-1">
                              {item.features?.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="w-3 h-3 text-[#FFD56B]" />
                                  <span className="text-white/60 text-xs font-['Montserrat']">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              className="flex-1 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-['Montserrat'] transition-all duration-300"
                              size="sm"
                              onClick={() => handleNavigateToService(item.path)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                              ) : (
                                <>
                                  {activeSection === 'products' ? t('hubServices.actions.order') : 
                                   activeSection === 'solutions' ? t('hubServices.actions.use') : t('hubServices.actions.discover')}
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/20 text-white hover:bg-white/10 p-2"
                              title="Ouvrir dans un nouvel onglet"
                              onClick={() => window.open(item.path, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              
              {filteredItems.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-white/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-white/70 mb-4 font-['Montserrat']">
                    {t('hubServices.noResults')}
                  </h3>
                  <p className="text-white/50 font-['Montserrat'] mb-6">
                    {t('hubServices.noResultsDescription')}
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveFilter('all');
                    }}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-['Montserrat']"
                  >
                    Voir toutes les solutions
                  </Button>
                </motion.div>
              )}
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
                  {t('hubServices.testimonials')}
                </h2>
                <p className="text-white/70 font-['Montserrat']">
                  {t('hubServices.testimonialsSubtitle')}
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-effect border-white/20 p-6 h-full">
                      <CardContent className="p-0">
                        <div className="flex justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-lg text-white/90 mb-6 italic font-['Montserrat']">
                          "{testimonial.text}"
                        </blockquote>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                          </div>
                          <div>
                            <div className="font-bold text-white font-['Montserrat']">{testimonial.name}</div>
                            <div className="text-white/70 font-['Montserrat']">{testimonial.company}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
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
                <h2 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
                  Questions fréquentes sur nos <span className="text-gradient">Services</span>
                </h2>
                <p className="text-white/70 font-['Montserrat']">
                  Tout ce que vous devez savoir sur notre écosystème de services IA
                </p>
              </motion.div>
              <FAQSection />
            </div>
          </section>

          {/* CTA Final Optimisé */}
          <section className="py-24 px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl p-12 border border-violet-400/30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
                      <span className="text-violet-300 text-sm font-medium tracking-widest uppercase">
                        Prêt à transformer votre business ?
                      </span>
                      <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                      Découvrez Notre Écosystème
                      <br />
                      <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                        Marketing IA Complet
                      </span>
                    </h3>
                    
                    <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                      Plus de 12 solutions intégrées • IA avancée • Support 24/7
                      <br />
                      <strong className="text-violet-300">Consultation gratuite et personnalisée.</strong>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                      <Link to="/contact">
                        <Button 
                          size="lg"
                          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-black shadow-2xl shadow-violet-500/25 hover:scale-105 transition-all duration-300"
                        >
                          <Rocket className="w-6 h-6 mr-3" />
                          Démarrer maintenant
                          <ArrowRight className="w-6 h-6 ml-3" />
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/70 mt-8">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Consultation gratuite</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Solutions sur mesure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Support 24/7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Résultats garantis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "HUB Services Iluma™",
            "description": "Écosystème complet de solutions IA marketing. Plus de 12 modules intégrés pour transformer votre entreprise.",
            "url": "https://ilumamarketing.com/services",
            "provider": {
              "@type": "Organization",
              "name": "Iluma Marketing",
              "url": "https://ilumamarketing.com"
            },
            "serviceType": "Marketing Technology",
            "areaServed": {
              "@type": "Country",
              "name": "Canada"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services IA Marketing",
              "itemListElement": [
                {
                  "@type": "OfferCatalog",
                  "name": "ADLUMA™ - Simulateur publicitaire IA"
                },
                {
                  "@type": "OfferCatalog",
                  "name": "ILA™ - Intelligence de localisation avancée"
                },
                {
                  "@type": "OfferCatalog",
                  "name": "CRM Iluma™ - Gestion clients intelligente"
                },
                {
                  "@type": "OfferCatalog",
                  "name": "BlogIA - Génération de contenu automatisée"
                }
              ]
            }
          })}
        </script>
      </div>
    </>
  );
};

export default HubServices;