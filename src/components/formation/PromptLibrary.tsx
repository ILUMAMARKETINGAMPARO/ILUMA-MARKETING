import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Search, Filter, Star, BookOpen, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage.ts';
import { toast } from 'sonner';

interface PromptItem {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  category: 'seo' | 'crm' | 'landing' | 'ads' | 'content' | 'analytics';
  difficulty: 'beginner' | 'intermediate' | 'expert';
  prompt: Record<string, string>;
  tags: string[];
  rating: number;
  usageCount: number;
}

const promptsData: PromptItem[] = [
  {
    id: 'seo-local-audit',
    title: {
      fr: 'Audit SEO Local Complet',
      en: 'Complete Local SEO Audit',
      es: 'Auditoría SEO Local Completa'
    },
    description: {
      fr: 'Analyse complète de la visibilité locale d\'une entreprise',
      en: 'Complete analysis of a business local visibility',
      es: 'Análisis completo de la visibilidad local de una empresa'
    },
    category: 'seo',
    difficulty: 'intermediate',
    prompt: {
      fr: 'Effectue un audit SEO local complet pour [NOM_ENTREPRISE] dans [VILLE]. Analyse : 1) Présence Google My Business 2) Citations locales 3) Mots-clés géolocalisés 4) Concurrence locale 5) Recommandations d\'amélioration prioritaires.',
      en: 'Perform a complete local SEO audit for [BUSINESS_NAME] in [CITY]. Analyze: 1) Google My Business presence 2) Local citations 3) Geo-targeted keywords 4) Local competition 5) Priority improvement recommendations.',
      es: 'Realiza una auditoría SEO local completa para [NOMBRE_EMPRESA] en [CIUDAD]. Analiza: 1) Presencia Google My Business 2) Citas locales 3) Palabras clave geolocalizadas 4) Competencia local 5) Recomendaciones de mejora prioritarias.'
    },
    tags: ['audit', 'local', 'gmb', 'citations'],
    rating: 4.8,
    usageCount: 247
  },
  {
    id: 'landing-conversion',
    title: {
      fr: 'Landing Page Ultra-Convertissante',
      en: 'Ultra-Converting Landing Page',
      es: 'Página de Aterrizaje Ultra-Convertidora'
    },
    description: {
      fr: 'Création d\'une page d\'atterrissage optimisée pour la conversion',
      en: 'Creating a conversion-optimized landing page',
      es: 'Creación de una página de aterrizaje optimizada para conversión'
    },
    category: 'landing',
    difficulty: 'expert',
    prompt: {
      fr: 'Crée le wireframe et le copywriting d\'une landing page pour [PRODUIT/SERVICE] ciblant [AUDIENCE]. Inclus : 1) Titre accrocheur + sous-titre 2) Bénéfices clairs (pas de features) 3) Preuve sociale crédible 4) CTA irrésistible 5) Objections levées 6) Structure F-Pattern.',
      en: 'Create wireframe and copywriting for a landing page for [PRODUCT/SERVICE] targeting [AUDIENCE]. Include: 1) Catchy headline + subtitle 2) Clear benefits (not features) 3) Credible social proof 4) Irresistible CTA 5) Objections addressed 6) F-Pattern structure.',
      es: 'Crea el wireframe y copywriting de una landing page para [PRODUCTO/SERVICIO] dirigida a [AUDIENCIA]. Incluye: 1) Titular atractivo + subtítulo 2) Beneficios claros (no características) 3) Prueba social creíble 4) CTA irresistible 5) Objeciones respondidas 6) Estructura F-Pattern.'
    },
    tags: ['conversion', 'copywriting', 'wireframe', 'cta'],
    rating: 4.9,
    usageCount: 189
  },
  {
    id: 'crm-lead-scoring',
    title: {
      fr: 'Scoring Intelligent de Prospects',
      en: 'Intelligent Lead Scoring',
      es: 'Puntuación Inteligente de Prospectos'
    },
    description: {
      fr: 'Système de notation automatique des prospects entrants',
      en: 'Automatic scoring system for incoming prospects',
      es: 'Sistema de puntuación automática para prospectos entrantes'
    },
    category: 'crm',
    difficulty: 'intermediate',
    prompt: {
      fr: 'Développe un système de scoring pour les prospects de [SECTEUR]. Critères : 1) Données démographiques (30%) 2) Comportement digital (25%) 3) Engagement commercial (20%) 4) Timing d\'achat (15%) 5) Budget estimé (10%). Crée les règles et seuils d\'action.',
      en: 'Develop a scoring system for [INDUSTRY] prospects. Criteria: 1) Demographics (30%) 2) Digital behavior (25%) 3) Commercial engagement (20%) 4) Purchase timing (15%) 5) Estimated budget (10%). Create rules and action thresholds.',
      es: 'Desarrolla un sistema de puntuación para prospectos de [SECTOR]. Criterios: 1) Datos demográficos (30%) 2) Comportamiento digital (25%) 3) Compromiso comercial (20%) 4) Timing de compra (15%) 5) Presupuesto estimado (10%). Crea reglas y umbrales de acción.'
    },
    tags: ['scoring', 'automation', 'qualification', 'crm'],
    rating: 4.6,
    usageCount: 156
  }
];

interface PromptLibraryProps {
  onPromptSelect?: (prompt: PromptItem) => void;
}

const PromptLibrary: React.FC<PromptLibraryProps> = ({ onPromptSelect }) => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'seo', label: 'SEO' },
    { value: 'crm', label: 'CRM' },
    { value: 'landing', label: 'Landing Pages' },
    { value: 'ads', label: 'Publicité' },
    { value: 'content', label: 'Contenu' },
    { value: 'analytics', label: 'Analytics' }
  ];

  const difficulties = [
    { value: 'all', label: 'Tous niveaux' },
    { value: 'beginner', label: '🌱 Débutant' },
    { value: 'intermediate', label: '⚡ Intermédiaire' },
    { value: 'expert', label: '🚀 Expert' }
  ];

  const filteredPrompts = promptsData.filter(prompt => {
    const matchesSearch = prompt.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || prompt.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const copyPrompt = async (prompt: PromptItem) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt[language]);
      toast.success('Prompt copié !');
    } catch (err) {
      toast.error('Erreur lors de la copie');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'expert': return 'bg-red-500/20 text-red-300 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      seo: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      crm: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
      landing: 'bg-green-500/20 text-green-300 border-green-500/50',
      ads: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
      content: 'bg-pink-500/20 text-pink-300 border-pink-500/50',
      analytics: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-white">{t('formation.modules.prompt_library.title')}</h2>
        </div>
        <p className="text-white/80 max-w-2xl mx-auto">
          {t('formation.modules.prompt_library.content')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Rechercher un prompt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map((diff) => (
              <SelectItem key={diff.value} value={diff.value}>
                {diff.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 hover:border-primary/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(prompt.category)}>
                      {prompt.category.toUpperCase()}
                    </Badge>
                    <Badge className={getDifficultyColor(prompt.difficulty)}>
                      {difficulties.find(d => d.value === prompt.difficulty)?.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-white/80">{prompt.rating}</span>
                  </div>
                </div>
                
                <CardTitle className="text-white text-lg">
                  {prompt.title[language]}
                </CardTitle>
                
                <CardDescription className="text-white/70">
                  {prompt.description[language]}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Preview du prompt */}
                <div className="bg-black/30 rounded-lg p-3 border border-white/10">
                  <p className="text-sm text-white/80 line-clamp-3 font-mono">
                    {prompt.prompt[language]}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-white/20 text-white/60">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => copyPrompt(prompt)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => onPromptSelect?.(prompt)}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-black"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Utiliser
                  </Button>
                </div>

                {/* Usage stats */}
                <div className="text-xs text-white/50 text-center">
                  Utilisé {prompt.usageCount} fois
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Aucun prompt trouvé</h3>
          <p className="text-white/60">Essayez de modifier vos filtres de recherche.</p>
        </div>
      )}
    </div>
  );
};

export default PromptLibrary;