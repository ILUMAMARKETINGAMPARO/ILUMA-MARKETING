import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage.ts';
import { 
  Search, 
  Target, 
  Users, 
  BarChart3, 
  Zap, 
  Globe, 
  Brain, 
  Star,
  Calculator,
  PenTool,
  Heart,
  TrendingUp,
  Settings,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HubIntelligentNavigationProps {
  onRecommendation?: (recommendation: string) => void;
}

const HubIntelligentNavigation: React.FC<HubIntelligentNavigationProps> = ({ onRecommendation }) => {
  const { t, language } = useLanguage();
  const [selectedObjective, setSelectedObjective] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const content = {
    fr: {
      title: "Système Nerveux Central Iluma™",
      subtitle: "Votre tableau de bord universel. Tous les chemins commencent ici.",
      searchPlaceholder: "Rechercher un service ou module...",
      filterBy: "Filtrer par",
      objective: "Objectif",
      sector: "Secteur",
      aiRecommendation: "IA recommande de commencer par",
      exploreStrategies: "Explorez les stratégies qui vous correspondent",
      objectives: [
        { id: 'visibility', label: 'Visibilité', icon: Globe },
        { id: 'acquisition', label: 'Acquisition', icon: Target },
        { id: 'automation', label: 'Automatisation', icon: Zap },
        { id: 'seo', label: 'SEO', icon: TrendingUp },
        { id: 'content', label: 'Contenu', icon: PenTool }
      ],
      sectors: [
        'Santé', 'Restauration', 'Immobilier', 'SaaS', 'Commerce Local', 'E-commerce', 'Services B2B'
      ]
    },
    en: {
      title: "Iluma™ Central Nervous System",
      subtitle: "Your universal dashboard. Every journey starts here.",
      searchPlaceholder: "Search for a service or module...",
      filterBy: "Filter by",
      objective: "Objective",
      sector: "Sector", 
      aiRecommendation: "AI recommends starting with",
      exploreStrategies: "Explore strategies that fit you",
      objectives: [
        { id: 'visibility', label: 'Visibility', icon: Globe },
        { id: 'acquisition', label: 'Acquisition', icon: Target },
        { id: 'automation', label: 'Automation', icon: Zap },
        { id: 'seo', label: 'SEO', icon: TrendingUp },
        { id: 'content', label: 'Content', icon: PenTool }
      ],
      sectors: [
        'Healthcare', 'Restaurant', 'Real Estate', 'SaaS', 'Local Business', 'E-commerce', 'B2B Services'
      ]
    },
    es: {
      title: "Sistema Nervioso Central Iluma™",
      subtitle: "Tu panel universal. Todos los caminos empiezan aquí.",
      searchPlaceholder: "Buscar un servicio o módulo...",
      filterBy: "Filtrar por",
      objective: "Objetivo",
      sector: "Sector",
      aiRecommendation: "IA recomienda empezar con",
      exploreStrategies: "Explora las estrategias que te convienen",
      objectives: [
        { id: 'visibility', label: 'Visibilidad', icon: Globe },
        { id: 'acquisition', label: 'Adquisición', icon: Target },
        { id: 'automation', label: 'Automatización', icon: Zap },
        { id: 'seo', label: 'SEO', icon: TrendingUp },
        { id: 'content', label: 'Contenido', icon: PenTool }
      ],
      sectors: [
        'Salud', 'Restauración', 'Inmobiliaria', 'SaaS', 'Comercio Local', 'E-commerce', 'Servicios B2B'
      ]
    }
  };

  const currentContent = content[language];

  // Données d'écosystème par défaut
  const products = [
    { id: 'adluma', name: 'ADLUMA™', description: 'Simulateur d\'impressions publicitaires multicanal', path: '/adluma', icon: Target, color: 'from-blue-500 to-cyan-500' },
    { id: 'landing', name: 'Landing Page Intelligente', description: 'Pages de conversion optimisées par IA', path: '/landing-page-intelligente', icon: Globe, color: 'from-green-500 to-blue-500' }
  ];

  const solutions = [
    { id: 'ila', name: 'ILA™', description: 'Score de performance et analyse intelligente', path: '/ila', category: 'analytics', icon: BarChart3, color: 'from-purple-500 to-pink-500' },
    { id: 'blogia', name: 'BLOGIA™', description: 'Générateur de contenu SEO intelligent', path: '/blogia', category: 'content', icon: PenTool, color: 'from-orange-500 to-red-500' },
    { id: 'ilumatch', name: 'ILUMATCH™', description: 'Matching intelligent client-solution', path: '/ilumatch', category: 'partnership', icon: Heart, color: 'from-pink-500 to-purple-500' }
  ];

  const services = [
    { id: 'seo', name: 'SEO IA', description: 'Service d\'optimisation SEO avancé', path: '/services/seo-ia', category: 'seo', icon: TrendingUp, color: 'from-orange-500 to-yellow-500' },
    { id: 'ads', name: 'Publicité Intelligente', description: 'Gestion intelligente des campagnes publicitaires', path: '/services/ads-ia', category: 'ads', icon: Zap, color: 'from-yellow-500 to-orange-500' }
  ];
  
  // Créer la liste unifiée avec catégories
  const allOfferings = [
    ...products.map((item: any) => ({ 
      ...item, 
      type: 'product' as const,
      category: ['acquisition', 'visibility'],
      icon: item.icon || Globe,
      color: item.color || 'from-blue-500 to-cyan-500'
    })),
    ...solutions.map((item: any) => ({ 
      ...item, 
      type: 'solution' as const,
      category: item.category === 'simulation' ? ['visibility', 'acquisition'] :
               item.category === 'analytics' ? ['automation', 'seo'] :
               item.category === 'content' ? ['content', 'seo'] :
               item.category === 'partnership' ? ['automation', 'acquisition'] : ['automation'],
      icon: item.icon || Brain,
      color: item.color || 'from-purple-500 to-pink-500'
    })),
    ...services.filter((item: any) => item.category === 'seo' || item.category === 'ads').slice(0, 3).map((item: any) => ({ 
      ...item, 
      type: 'service' as const,
      category: item.category === 'seo' ? ['seo', 'visibility'] :
               item.category === 'ads' ? ['acquisition', 'visibility'] : ['automation'],
      icon: item.icon || Settings,
      color: item.color || 'from-orange-500 to-yellow-500'
    }))
  ];

  // Adapter la description selon la langue
  const getLocalizedDescription = (item: any) => {
    if (language === 'en') {
      if (item.name.includes('ADLUMA')) return 'Multichannel ad impressions simulator';
      if (item.name.includes('ILA')) return 'Performance score and intelligent analysis';
      if (item.name.includes('BLOG')) return 'Intelligent SEO content generator';
      if (item.name.includes('ILUMATCH')) return 'Intelligent client-solution matching';
      if (item.name.includes('Landing')) return 'AI-first optimized conversion pages';
      if (item.name.includes('Fidélisation')) return 'Intelligent retention and nurturing system';
      if (item.name.includes('SEO')) return 'Advanced SEO optimization service';
      if (item.name.includes('ADS')) return 'Smart advertising campaign management';
    } else if (language === 'es') {
      if (item.name.includes('ADLUMA')) return 'Simulador de impresiones publicitarias multicanal';
      if (item.name.includes('ILA')) return 'Puntuación de rendimiento y análisis inteligente';
      if (item.name.includes('BLOG')) return 'Generador de contenido SEO inteligente';
      if (item.name.includes('ILUMATCH')) return 'Emparejamiento inteligente cliente-solución';
      if (item.name.includes('Landing')) return 'Páginas de conversión optimizadas con IA';
      if (item.name.includes('Fidélisation')) return 'Sistema inteligente de retención y nurturing';
      if (item.name.includes('SEO')) return 'Servicio avanzado de optimización SEO';
      if (item.name.includes('ADS')) return 'Gestión inteligente de campañas publicitarias';
    }
    return item.description;
  };

  const getAIRecommendation = () => {
    if (selectedObjective && selectedSector) {
      if (selectedObjective === 'visibility') return 'ADLUMA™';
      if (selectedObjective === 'content') return 'BLOGIA™';
      if (selectedObjective === 'automation') return 'ILA™';
      if (selectedObjective === 'acquisition') return language === 'fr' ? 'Landing Page Intelligente' : language === 'en' ? 'Smart Landing Page' : 'Landing Page Inteligente';
      if (selectedObjective === 'seo') return 'BLOGIA™';
    }
    return 'ADLUMA™';
  };

  const filteredOfferings = allOfferings.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getLocalizedDescription(item).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesObjective = !selectedObjective || item.category.includes(selectedObjective);
    return matchesSearch && matchesObjective;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Settings className="w-8 h-8 text-[#8E44FF]" />
          <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">HUB™ CENTRAL</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat']">
          {currentContent.title}
        </h1>
        <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
          {currentContent.subtitle}
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
          <div className="space-y-6">
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
                  {currentContent.objective}
                </label>
                <Select value={selectedObjective} onValueChange={setSelectedObjective}>
                  <SelectTrigger className="bg-black/40 border-white/20 text-white font-['Montserrat']">
                    <SelectValue placeholder={`${currentContent.filterBy} ${currentContent.objective.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/20">
                    {currentContent.objectives.map((obj) => (
                      <SelectItem key={obj.id} value={obj.id} className="text-white font-['Montserrat']">
                        <div className="flex items-center gap-2">
                          <obj.icon className="w-4 h-4" />
                          {obj.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2 font-['Montserrat']">
                  {currentContent.sector}
                </label>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger className="bg-black/40 border-white/20 text-white font-['Montserrat']">
                    <SelectValue placeholder={`${currentContent.filterBy} ${currentContent.sector.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/20">
                    {currentContent.sectors.map((sector) => (
                      <SelectItem key={sector} value={sector.toLowerCase()} className="text-white font-['Montserrat']">
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* AI Recommendation */}
            {(selectedObjective || selectedSector) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-xl border border-[#8E44FF]/30"
              >
                <Sparkles className="w-5 h-5 text-[#FFD56B]" />
                <span className="text-white font-medium font-['Montserrat']">
                  {currentContent.aiRecommendation}: <strong className="text-[#FFD56B]">{getAIRecommendation()}</strong>
                </span>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Offerings Grid avec distinction visuelle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredOfferings.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={`${item.type}-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Link to={item.path}>
                <Card className="glass-effect border-[#8E44FF]/20 p-6 h-full hover:border-[#FFD56B]/40 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[#8E44FF]/25">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <Badge className={`text-xs font-['Montserrat'] ${
                        item.type === 'product' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        item.type === 'solution' ? 'bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30' : 
                        'bg-[#FFD56B]/20 text-[#FFD56B] border-[#FFD56B]/30'
                      }`}>
                        {item.type === 'product' ? '🏢 Produit' : 
                         item.type === 'solution' ? '🤖 Solution IA' : '🛠️ Service'}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat'] group-hover:text-[#FFD56B] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed font-['Montserrat']">
                        {getLocalizedDescription(item)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {item.category.slice(0, 2).map((cat) => (
                          <Badge 
                            key={cat} 
                            className="bg-white/10 text-white/80 text-xs font-['Montserrat']"
                          >
                            {currentContent.objectives.find(obj => obj.id === cat)?.label || cat}
                          </Badge>
                        ))}
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#FFD56B] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-['Montserrat']">
          {currentContent.exploreStrategies}
        </h2>
        <Link to="/contact">
          <Button size="lg" className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 font-['Montserrat'] group">
            <Target className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            {language === 'fr' ? 'Iluma™ commence ici' :
             language === 'en' ? 'Iluma™ starts here' :
             'Iluma™ comienza aquí'}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HubIntelligentNavigation;