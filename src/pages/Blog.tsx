import React, { useState } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import MPEContainer from '@/components/mpe/MPEContainer';
import SEOManager from '@/components/seo/SEOManager';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/hooks/useTranslations';

const Blog = () => {
  const { t } = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const seoData = {
    title: t('blog.title'),
    description: t('blog.description'),
    keywords: ['blog marketing', 'intelligence artificielle', 'SEO', 'stratégies digitales']
  };

  const blogPosts = [
    {
      id: 1,
      title: "IA Marketing 2024 : Révolution en cours",
      excerpt: "L'intelligence artificielle transforme radicalement les stratégies marketing. Découvrez les tendances incontournables, les outils émergents et comment Iluma™ vous positionne en leader de cette révolution technologique.",
      category: "IA & Marketing",
      author: "Sergio Ramos",
      date: "2024-01-15",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Méthode Iluma™ : De 0 à leader local en 90 jours",
      excerpt: "Analyse complète du cas Katz Sport : comment notre approche IA-first a généré +230% de visibilité locale et transformé une boutique montréalaise en référence secteur.",
      category: "Études de Cas",
      author: "Équipe Iluma",
      date: "2024-01-12",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "SEO IA : Guide complet 2024",
      excerpt: "Maîtrisez le référencement intelligent. Techniques avancées, outils IA incontournables, stratégies de contenu automatisées. Votre roadmap pour dominer Google avec l'intelligence artificielle.",
      category: "SEO",
      author: "Andrea Martinez",
      date: "2024-01-08",
      readTime: "11 min",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Landing Pages IA : Conversion x3 garantie",
      excerpt: "Notre méthode exclusive pour créer des pages de conversion hypnotiques. Psychologie cognitive, neuromarketing et IA générative pour transformer chaque visiteur en client.",
      category: "Conversion",
      author: "Amparo Lopez",
      date: "2024-01-05",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "YouTube SEO 2024 : Stratégie IA complète",
      excerpt: "Dominez YouTube avec l'IA Iluma™. Optimisation automatique, génération de miniatures, scripts intelligents, analytics prédictives. Votre chaîne devient une machine à engagement.",
      category: "YouTube",
      author: "Expert Vidéo",
      date: "2024-01-02",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: t('blog.categories.all'), count: blogPosts.length },
    { id: 'ia-marketing', label: t('blog.categories.iaMarketing'), count: 1 },
    { id: 'etudes-cas', label: t('blog.categories.etudesCas'), count: 1 },
    { id: 'seo', label: t('blog.categories.seo'), count: 1 },
    { id: 'conversion', label: t('blog.categories.conversion'), count: 1 },
    { id: 'youtube', label: t('blog.categories.youtube'), count: 1 }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen">
      <SEOManager seoData={seoData} path="/blog" />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <MPEContainer className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
                {t('blog.title')}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 font-['Montserrat']">
                {t('blog.description')}
              </p>
              
              {/* Search and Filter */}
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={t('blog.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 glass-effect border-white/20 text-white placeholder:text-white/60 bg-white/5"
                  />
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                          : 'glass-effect border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      {category.label}
                      <Badge variant="secondary" className="ml-2 bg-white/20">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            </MPEContainer>
          </div>
        </section>

        {/* Featured Article */}
        {featuredPost && (
          <section className="py-10">
            <div className="container mx-auto px-4">
              <MPEContainer>
                <div className="glass-effect rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        {t('blog.featured')}
                      </Badge>
                      <h2 className="text-3xl font-bold text-white mb-4">{featuredPost.title}</h2>
                      <p className="text-white/70 mb-6">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-white/60">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{featuredPost.date}</span>
                        </div>
                        <Badge variant="secondary" className="bg-white/10 text-white/80">
                          {featuredPost.readTime}
                        </Badge>
                      </div>
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                        {t('blog.readArticle')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    <div className="relative">
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title}
                        className="w-full h-64 object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </MPEContainer>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <MPEContainer 
                  key={post.id}
                  animation="slide-up"
                  className="glass-effect rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 hover-glow group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <Badge className="mb-3 bg-white/10 text-white/80 hover:bg-white/20">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
                    {post.title}
                  </h3>
                  <p className="text-white/70 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-white/60">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{post.author}</span>
                      </div>
                      <Badge variant="secondary" className="bg-white/10 text-white/80">
                        {post.readTime}
                      </Badge>
                    </div>
                    <span className="text-white/60 text-sm">{post.date}</span>
                  </div>
                </MPEContainer>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-white/40" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t('blog.noResults')}</h3>
                <p className="text-white/60">{t('blog.noResultsDesc')}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
