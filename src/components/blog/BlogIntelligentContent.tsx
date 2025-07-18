import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Search, 
  User, 
  Calendar, 
  ArrowRight, 
  PenTool,
  Target,
  Globe,
  Zap,
  Brain,
  Heart,
  TrendingUp,
  Users,
  Play,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogIntelligentContent: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProfile, setSelectedProfile] = useState('');

  const content = {
    fr: {
      title: "Blog Iluma™",
      subtitle: "Méthode testée. Résultats prouvés.",
      description: "Découvrez comment nos services fonctionnent (vraiment).",
      searchPlaceholder: "Rechercher un article...",
      filterBy: "Filtrer par",
      category: "Catégorie",
      profile: "Profil",
      featured: "Article en vedette",
      readMore: "Lire l'article",
      readTime: "min de lecture",
      author: "Équipe Iluma",
      finalCta: "Prêt à transformer ce savoir en résultats ? Passez à l'action avec Iluma™.",
      categories: [
        { id: 'all', label: 'Tous les articles' },
        { id: 'google-ads', label: 'Google Ads' },
        { id: 'seo', label: 'SEO' },
        { id: 'landing', label: 'Landing Pages' },
        { id: 'fidelisation', label: 'Fidélisation' },
        { id: 'ia', label: 'Intelligence Artificielle' },
        { id: 'crm', label: 'CRM' }
      ],
      profiles: [
        'Startup', 'Commerce Local', 'SaaS', 'E-commerce', 'Services B2B', 'Restauration'
      ]
    },
    en: {
      title: "Iluma™ Blog",
      subtitle: "Tested method. Proven results.",
      description: "Discover how our services work (really).",
      searchPlaceholder: "Search for an article...",
      filterBy: "Filter by",
      category: "Category",
      profile: "Profile",
      featured: "Featured article",
      readMore: "Read article",
      readTime: "min read",
      author: "Iluma Team",
      finalCta: "Ready to turn this knowledge into results? Take action with Iluma™.",
      categories: [
        { id: 'all', label: 'All articles' },
        { id: 'google-ads', label: 'Google Ads' },
        { id: 'seo', label: 'SEO' },
        { id: 'landing', label: 'Landing Pages' },
        { id: 'fidelisation', label: 'Loyalty' },
        { id: 'ia', label: 'Artificial Intelligence' },
        { id: 'crm', label: 'CRM' }
      ],
      profiles: [
        'Startup', 'Local Business', 'SaaS', 'E-commerce', 'B2B Services', 'Restaurant'
      ]
    },
    es: {
      title: "Blog Iluma™",
      subtitle: "Método probado. Resultados reales.",
      description: "Descubre cómo funcionan nuestros servicios (realmente).",
      searchPlaceholder: "Buscar un artículo...",
      filterBy: "Filtrar por",
      category: "Categoría",
      profile: "Perfil",
      featured: "Artículo destacado",
      readMore: "Leer artículo",
      readTime: "min de lectura",
      author: "Equipo Iluma",
      finalCta: "¿Listo para convertir este conocimiento en resultados? Actúa con Iluma™.",
      categories: [
        { id: 'all', label: 'Todos los artículos' },
        { id: 'google-ads', label: 'Google Ads' },
        { id: 'seo', label: 'SEO' },
        { id: 'landing', label: 'Landing Pages' },
        { id: 'fidelisation', label: 'Fidelización' },
        { id: 'ia', label: 'Inteligencia Artificial' },
        { id: 'crm', label: 'CRM' }
      ],
      profiles: [
        'Startup', 'Comercio Local', 'SaaS', 'E-commerce', 'Servicios B2B', 'Restauración'
      ]
    }
  };

  const currentContent = content[language];

  const articles = [
    {
      id: 1,
      title: language === 'fr' ? "Google Ads = Uber : Quand cliquer coûte, mais peut rapporter" :
             language === 'en' ? "Google Ads = Uber: When clicks cost, but can pay off" :
             "Google Ads = Uber: Cuando hacer clic cuesta, pero puede rendir",
      excerpt: language === 'fr' ? "Vous êtes dans une ville. Vous êtes visible si vous payez plus à certaines heures. Bienvenue dans l'univers des enchères publicitaires." :
               language === 'en' ? "You're in a city. You're visible if you pay more at peak hours. Welcome to ad auctions." :
               "Estás en una ciudad. Tu visibilidad depende de cuánto pagas y cuándo. Bienvenido a las subastas publicitarias.",
      category: "google-ads",
      author: currentContent.author,
      date: "2024-01-15",
      readTime: "8",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&auto=format",
      featured: true,
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: language === 'fr' ? "SEO = Instagram : Plus t'es mentionné, plus t'es vu" :
             language === 'en' ? "SEO = Instagram: The more you're mentioned, the more you're seen" :
             "SEO = Instagram: Cuanto más te mencionan, más te ven",
      excerpt: language === 'fr' ? "Le référencement naturel fonctionne comme les réseaux sociaux : autorité, mentions, et algorithme." :
               language === 'en' ? "Natural SEO works like social media: authority, mentions, and algorithm." :
               "El SEO natural funciona como las redes sociales: autoridad, menciones y algoritmo.",
      category: "seo",
      author: currentContent.author,
      date: "2024-01-12",
      readTime: "6",
      image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=800&h=600&fit=crop&auto=format",
      featured: false,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: language === 'fr' ? "Landing Page = McDo : C'est l'entrée qui déclenche la commande" :
             language === 'en' ? "Landing Page = McDonald's: It's the entrance that triggers the order" :
             "Landing Page = McDonald's: Es la entrada lo que activa el pedido",
      excerpt: language === 'fr' ? "Une landing page efficace guide le visiteur comme un menu McDo : simple, clair, et une seule action." :
               language === 'en' ? "An effective landing page guides visitors like a McDonald's menu: simple, clear, and one action." :
               "Una landing page efectiva guía al visitante como un menú de McDonald's: simple, claro y una sola acción.",
      category: "landing",
      author: currentContent.author,
      date: "2024-01-10",
      readTime: "5",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&auto=format",
      featured: false,
      icon: Globe,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: language === 'fr' ? "Fidélisation = Netflix : Ce n'est pas l'abonnement, c'est l'habitude" :
             language === 'en' ? "Loyalty = Netflix: It's not the subscription, it's the habit" :
             "Fidelización = Netflix: No es la suscripción, es el hábito",
      excerpt: language === 'fr' ? "Netflix vous garde avec du contenu personnalisé. Votre business doit faire pareil avec vos clients." :
               language === 'en' ? "Netflix keeps you with personalized content. Your business should do the same with clients." :
               "Netflix te mantiene con contenido personalizado. Tu negocio debe hacer lo mismo con los clientes.",
      category: "fidelisation",
      author: currentContent.author,
      date: "2024-01-08",
      readTime: "7",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format",
      featured: false,
      icon: Heart,
      color: "from-rose-500 to-red-500"
    },
    {
      id: 5,
      title: language === 'fr' ? "IA = Tesla Autopilot : Vous donnez la direction, on gère le reste" :
             language === 'en' ? "AI = Tesla Autopilot: You give the direction, we handle the rest" :
             "IA = Tesla Autopilot: Tú das la dirección, nosotros manejamos el resto",
      excerpt: language === 'fr' ? "L'intelligence artificielle en marketing fonctionne comme un pilote automatique intelligent." :
               language === 'en' ? "Artificial intelligence in marketing works like an intelligent autopilot." :
               "La inteligencia artificial en marketing funciona como un piloto automático inteligente.",
      category: "ia",
      author: currentContent.author,
      date: "2024-01-05",
      readTime: "9",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&auto=format",
      featured: false,
      icon: Brain,
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: language === 'fr' ? "CRM = AirBnB : Chaque profil compte" :
             language === 'en' ? "CRM = AirBnB: Every profile matters" :
             "CRM = AirBnB: Cada perfil cuenta",
      excerpt: language === 'fr' ? "Comme AirBnB personnalise chaque séjour, votre CRM doit personnaliser chaque relation client." :
               language === 'en' ? "Like AirBnB personalizes every stay, your CRM should personalize every client relationship." :
               "Como AirBnB personaliza cada estancia, tu CRM debe personalizar cada relación con el cliente.",
      category: "crm",
      author: currentContent.author,
      date: "2024-01-03",
      readTime: "6",
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&auto=format",
      featured: false,
      icon: Users,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <PenTool className="w-8 h-8 text-[#8E44FF]" />
          <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">BLOG ILUMA™</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
          {currentContent.title}
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-2 font-['Montserrat']">
          {currentContent.subtitle}
        </p>
        <p className="text-lg text-white/60 max-w-2xl mx-auto font-['Montserrat']">
          {currentContent.description}
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <Input
                type="text"
                placeholder={currentContent.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-black/40 border-white/20 text-white placeholder:text-white/60 font-['Montserrat']"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2 font-['Montserrat']">
                  {currentContent.category}
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-black/40 border-white/20 text-white font-['Montserrat']">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/20">
                    {currentContent.categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="text-white font-['Montserrat']">
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2 font-['Montserrat']">
                  {currentContent.profile}
                </label>
                <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                  <SelectTrigger className="bg-black/40 border-white/20 text-white font-['Montserrat']">
                    <SelectValue placeholder={`${currentContent.filterBy} ${currentContent.profile.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/20">
                    {currentContent.profiles.map((profile) => (
                      <SelectItem key={profile} value={profile.toLowerCase()} className="text-white font-['Montserrat']">
                        {profile}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Featured Article */}
      {featuredArticle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-effect border-[#8E44FF]/20 p-8 hover:border-[#FFD56B]/40 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Badge className="bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] text-white font-['Montserrat']">
                    {currentContent.featured}
                  </Badge>
                  <div className={`w-12 h-12 bg-gradient-to-br ${featuredArticle.color} rounded-xl flex items-center justify-center`}>
                    <featuredArticle.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white font-['Montserrat']">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-white/70 text-lg leading-relaxed font-['Montserrat']">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex items-center gap-6 text-white/60">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-['Montserrat']">{featuredArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-['Montserrat']">{featuredArticle.date}</span>
                  </div>
                  <Badge className="bg-white/10 text-white/80 font-['Montserrat']">
                    {featuredArticle.readTime} {currentContent.readTime}
                  </Badge>
                </div>
                
                <Button className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-['Montserrat'] group">
                  <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  {currentContent.readMore}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <div className="relative">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Card className="glass-effect border-[#8E44FF]/20 p-6 h-full hover:border-[#FFD56B]/40 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[#8E44FF]/25">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-br ${article.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <article.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-white/10 text-white/80 text-xs font-['Montserrat']">
                    {currentContent.categories.find(cat => cat.id === article.category)?.label}
                  </Badge>
                </div>
                
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white font-['Montserrat'] group-hover:text-[#FFD56B] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-['Montserrat'] line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-white/60 text-xs">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="font-['Montserrat']">{article.author}</span>
                    </div>
                    <Badge className="bg-white/10 text-white/80 font-['Montserrat']">
                      {article.readTime} {currentContent.readTime}
                    </Badge>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#FFD56B] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Search className="w-10 h-10 text-white/40" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
            {language === 'fr' ? 'Aucun article trouvé' :
             language === 'en' ? 'No articles found' :
             'No se encontraron artículos'}
          </h3>
          <p className="text-white/60 font-['Montserrat']">
            {language === 'fr' ? 'Essayez de modifier vos filtres ou votre recherche' :
             language === 'en' ? 'Try modifying your filters or search' :
             'Intenta modificar tus filtros o búsqueda'}
          </p>
        </div>
      )}

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-['Montserrat']">
            {currentContent.finalCta}
          </h2>
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat'] group">
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              {language === 'fr' ? 'Passer à l\'action maintenant' :
               language === 'en' ? 'Take action now' :
               'Actuar ahora'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
};

export default BlogIntelligentContent;