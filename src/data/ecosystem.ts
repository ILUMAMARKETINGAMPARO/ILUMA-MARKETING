import { 
  Globe, 
  Rocket, 
  Heart, 
  Target, 
  Calculator, 
  Users, 
  PenTool, 
  Brain, 
  BarChart3,
  Search,
  ShoppingCart,
  MapPin,
  Megaphone,
  Youtube,
  Instagram,
  Mic,
  Handshake,
  Zap,
  Star,
  TrendingUp,
  Eye
} from 'lucide-react';

// ============= NOUVELLE STRUCTURE ILUMA™ =============

// 🏢 PRODUITS - Solutions finies prêtes à utiliser
export const products = [
  {
    id: 'site-web',
    name: 'Site Web Complet',
    title: 'Site web professionnel et optimisé',
    description: 'Site web complet avec SEO, responsivité et intégration IA pour votre entreprise',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    path: '/landing-page-intelligente',
    category: 'web',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['Design responsive', 'SEO optimisé', 'Integration IA', 'Maintenance incluse']
  },
  {
    id: 'landing-page-intelligente',
    name: 'Landing Page Intelligente',
    title: 'Page de conversion haute performance',
    description: 'Landing page conçue avec IA pour maximiser vos conversions et capturer des leads qualifiés',
    icon: Rocket,
    color: 'from-purple-500 to-pink-500',
    path: '/landing-page-intelligente',
    category: 'conversion',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['Conversion optimisée', 'A/B testing', 'Analytics intégrées', 'Mobile-first']
  },
  {
    id: 'page-fidelisation-intelligente',
    name: 'Page de Fidélisation Intelligente',
    title: 'Espace client exclusif et personnalisé',
    description: 'Page dédiée à la rétention client avec offres personnalisées et suivi intelligent',
    icon: Heart,
    color: 'from-pink-500 to-red-500',
    path: '/page-fidelisation-intelligente',
    category: 'retention',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['Personnalisation IA', 'Programmes fidélité', 'Offres exclusives', 'Dashboard client']
  }
];

// 🛠️ OUTILS - Outils IA intelligents
export const tools = [
  {
    id: 'ilumatch',
    name: 'ILUMATCH™',
    title: 'Matching intelligent entre partenaires locaux',
    description: 'Trouvez vos partenaires d\'affaires idéaux grâce à notre IA de mise en relation stratégique',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    path: '/ilumatch',
    category: 'partnership',
    status: 'Actif',
    pricing: 'Contactez-nous',
    features: ['Score ILA™', 'Matching IA', 'Partenariats équitables', 'Suivi collaborations']
  },
  {
    id: 'adluma',
    name: 'ADLUMA™',
    title: 'Simulateur publicitaire IA pour campagnes locales',
    description: 'Prédisez l\'impact de vos campagnes avant de les lancer avec notre simulateur intelligent',
    icon: Target,
    color: 'from-orange-500 to-red-500',
    path: '/adluma',
    category: 'simulation',
    status: 'Actif',
    pricing: 'Contactez-nous',
    features: ['Simulation précise', 'ROI prédictif', 'Ciblage local', 'Multi-plateformes']
  },
  {
    id: 'blog-ia',
    name: 'BLOG IA™',
    title: 'Génération automatique de contenu SEO',
    description: 'Créez du contenu optimisé et engageant automatiquement avec notre IA de rédaction',
    icon: PenTool,
    color: 'from-blue-500 to-indigo-500',
    path: '/blogia',
    category: 'content',
    status: 'Actif',
    pricing: 'Contactez-nous',
    features: ['Rédaction IA', 'SEO automatique', 'Planning éditorial', 'Multi-langues']
  },
  {
    id: 'rivalviews',
    name: 'RivalViews™',
    title: 'Cartographie interactive des entreprises locales',
    description: 'Visualisez et analysez la performance web de vos concurrents sur une carte interactive',
    icon: Eye,
    color: 'from-indigo-500 to-purple-500',
    path: '/rivalviews',
    category: 'analytics',
    status: 'Actif',
    pricing: 'Contactez-nous',
    features: ['Carte interactive', 'Analyse concurrence', 'Scores visibilité', 'Insights stratégiques']
  },
  {
    id: 'ila',
    name: 'ILA™',
    title: 'Score de visibilité locale intelligent',
    description: 'Mesurez et optimisez votre présence numérique locale avec notre indice propriétaire',
    icon: BarChart3,
    color: 'from-cyan-500 to-blue-500',
    path: '/ila',
    category: 'analytics',
    status: 'Actif',
    pricing: 'Contactez-nous',
    features: ['Score 0-100', 'Analyse multifacteurs', 'Recommandations IA', 'Suivi évolution']
  }
];

// 🛠️ SERVICES - Prestations sur-mesure
export const services = [
  // SEO Services
  {
    id: 'google-seo',
    name: 'Google SEO',
    title: 'Référencement naturel Google optimisé par IA',
    description: 'Dominez les résultats Google avec notre approche SEO intelligente et personnalisée',
    icon: Search,
    color: 'from-green-500 to-teal-500',
    path: '/services/seo-ia',
    category: 'seo',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['Audit complet', 'Optimisation technique', 'Contenu SEO', 'Suivi positions']
  },
  {
    id: 'bing-seo',
    name: 'Bing SEO',
    title: 'Référencement Bing pour diversifier votre trafic',
    description: 'Exploitez le potentiel inexploité de Bing avec notre expertise SEO dédiée',
    icon: Search,
    color: 'from-blue-500 to-indigo-500',
    path: '/services/bing-seo',
    category: 'seo',
    status: 'Nouveau',
    pricing: 'Contactez-nous',
    features: ['Optimisation Bing', 'Trafic additionnel', 'Moins de concurrence', 'ROI élevé']
  },
  {
    id: 'ecommerce-seo',
    name: 'E-commerce SEO',
    title: 'SEO spécialisé pour boutiques en ligne',
    description: 'Optimisez votre boutique e-commerce pour générer plus de ventes organiques',
    icon: ShoppingCart,
    color: 'from-purple-500 to-pink-500',
    path: '/services/ecommerce',
    category: 'seo',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['SEO produits', 'Rich snippets', 'Structure technique', 'Conversion optimisée']
  },
  {
    id: 'google-geo',
    name: 'Google GEO',
    title: 'Référencement géolocalisé et Google My Business',
    description: 'Dominez les recherches locales avec notre expertise en référencement géographique',
    icon: MapPin,
    color: 'from-green-500 to-emerald-500',
    path: '/services/visibilite-locale',
    category: 'geo',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['Google My Business', 'Citations locales', 'Avis clients', 'Pack local']
  },
  
  // ADS Services
  {
    id: 'google-ads',
    name: 'Google ADS',
    title: 'Campagnes Google Ads optimisées par IA',
    description: 'Maximisez votre ROI publicitaire avec nos campagnes Google Ads intelligentes',
    icon: Target,
    color: 'from-yellow-500 to-orange-500',
    path: '/services/google-ads',
    category: 'ads',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['Ciblage précis', 'Optimisation IA', 'ROI garanti', 'Rapports détaillés']
  },
  {
    id: 'instagram-ads',
    name: 'Instagram ADS',
    title: 'Publicité Instagram créative et performante',
    description: 'Touchez votre audience sur Instagram avec des campagnes visuelles impactantes',
    icon: Instagram,
    color: 'from-pink-500 to-purple-500',
    path: '/services/instagram-ads',
    category: 'ads',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['Contenu créatif', 'Stories & Reels', 'Ciblage avancé', 'Engagement élevé']
  },
  {
    id: 'meta-ads',
    name: 'Meta ADS',
    title: 'Publicité Facebook et Instagram unifiée',
    description: 'Campagnes publicitaires Facebook/Instagram avec ciblage comportemental avancé',
    icon: Megaphone,
    color: 'from-blue-500 to-purple-500',
    path: '/services/meta-ads',
    category: 'ads',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['Multi-plateformes', 'Lookalike audiences', 'Retargeting', 'Attribution avancée']
  },
  {
    id: 'tinder-ads',
    name: 'Tinder ADS',
    title: 'Publicité Tinder pour marques lifestyle',
    description: 'Atteignez une audience engagée avec des campagnes publicitaires Tinder créatives',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    path: '/services/tinder-ads',
    category: 'ads',
    status: 'Nouveau',
    pricing: 'Contactez-nous',
    features: ['Audience jeune', 'Engagement élevé', 'Formats natifs', 'Branding lifestyle']
  },
  {
    id: 'spotify-ads',
    name: 'Spotify ADS',
    title: 'Publicité audio sur Spotify et podcasts',
    description: 'Touchez votre audience avec des publicités audio ciblées sur Spotify',
    icon: Mic,
    color: 'from-green-500 to-teal-500',
    path: '/services/spotify-ads',
    category: 'ads',
    status: 'Nouveau',
    pricing: 'Contactez-nous',
    features: ['Audio ciblé', 'Podcasts populaires', 'Engagement auditif', 'Mémorisation élevée']
  },
  {
    id: 'amazon-ads',
    name: 'Amazon ADS',
    title: 'Publicité Amazon pour e-commerce',
    description: 'Boostez vos ventes Amazon avec nos campagnes publicitaires optimisées',
    icon: ShoppingCart,
    color: 'from-orange-500 to-yellow-500',
    path: '/services/amazon-ads',
    category: 'ads',
    status: 'Nouveau',
    pricing: 'Contactez-nous',
    features: ['Sponsored Products', 'Brand Store', 'DSP Amazon', 'Conversion directe']
  },
  
  // Content & Partnership
  {
    id: 'creation-contenu',
    name: 'Création de Contenu',
    title: 'Production de contenu marketing IA-assisté',
    description: 'Créez du contenu engageant et performant avec notre équipe créative et notre IA',
    icon: PenTool,
    color: 'from-indigo-500 to-purple-500',
    path: '/services/blogs-intersites',
    category: 'content',
    status: 'Disponible',
    pricing: 'Contactez-nous',
    features: ['Stratégie éditoriale', 'Contenu multiformat', 'SEO intégré', 'Distribution optimisée']
  },
  {
    id: 'partenariat-poche-bleue',
    name: 'Partenariat ILUMA/LA POCHE BLEUE',
    title: 'Collaboration exclusive média-marketing',
    description: 'Bénéficiez de notre partenariat unique avec La Poche Bleue pour amplifier votre impact',
    icon: Handshake,
    color: 'from-blue-500 to-cyan-500',
    path: '/services/partenariat-poche-bleue',
    category: 'partnership',
    status: 'Exclusif',
    pricing: 'Contactez-nous',
    features: ['Visibilité média', 'Audience qualifiée', 'Content collab', 'Impact amplifié']
  }
];

// Catégories pour filtrage
export const categories = {
  products: [
    { id: 'all', label: 'Tous les produits', count: products.length },
    { id: 'web', label: 'Sites Web', count: products.filter(p => p.category === 'web').length },
    { id: 'conversion', label: 'Conversion', count: products.filter(p => p.category === 'conversion').length },
    { id: 'retention', label: 'Fidélisation', count: products.filter(p => p.category === 'retention').length }
  ],
  tools: [
    { id: 'all', label: 'Tous les outils', count: tools.length },
    { id: 'partnership', label: 'Partenariats', count: tools.filter(s => s.category === 'partnership').length },
    { id: 'simulation', label: 'Simulation', count: tools.filter(s => s.category === 'simulation').length },
    { id: 'content', label: 'Contenu IA', count: tools.filter(s => s.category === 'content').length },
    { id: 'analytics', label: 'Analytics', count: tools.filter(s => s.category === 'analytics').length }
  ],
  services: [
    { id: 'all', label: 'Tous les services', count: services.length },
    { id: 'seo', label: 'SEO', count: services.filter(s => s.category === 'seo').length },
    { id: 'geo', label: 'Géolocalisation', count: services.filter(s => s.category === 'geo').length },
    { id: 'ads', label: 'Publicité', count: services.filter(s => s.category === 'ads').length },
    { id: 'content', label: 'Contenu', count: services.filter(s => s.category === 'content').length },
    { id: 'partnership', label: 'Partenariats', count: services.filter(s => s.category === 'partnership').length }
  ]
};

// Stats globaux
export const ecosystemStats = {
  products: { count: products.length, label: 'Produits Finis' },
  tools: { count: tools.length, label: 'Outils IA' },
  services: { count: services.length, label: 'Services Sur-Mesure' },
  total: { count: products.length + tools.length + services.length, label: 'Total Offres' }
};

// Fonction utilitaire pour obtenir tous les éléments
export const getAllOfferings = () => [
  ...products.map(p => ({ ...p, type: 'product' as const })),
  ...tools.map(t => ({ ...t, type: 'tool' as const })),
  ...services.map(s => ({ ...s, type: 'service' as const }))
];

// Fonction de recherche unifiée
export const searchOfferings = (query: string, type?: 'product' | 'tool' | 'service') => {
  const allOfferings = getAllOfferings();
  const filtered = type ? allOfferings.filter(item => item.type === type) : allOfferings;
  
  if (!query.trim()) return filtered;
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return filtered.filter(item => {
    const searchableText = `${item.name} ${item.title} ${item.description} ${item.features?.join(' ') || ''}`.toLowerCase();
    return searchTerms.every(term => searchableText.includes(term));
  });
};

export default { products, tools, services, categories, ecosystemStats };

// Pour rétrocompatibilité
export const solutions = tools;