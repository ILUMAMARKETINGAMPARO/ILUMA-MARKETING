import { Youtube, Target, Megaphone, PenTool, MapPin, Globe, ShoppingCart, Mic } from 'lucide-react';

export const services = [
  {
    id: 'youtube-seo',
    icon: Youtube,
    title: 'SEO YouTube',
    description: 'Optimisation complète pour dominer les recherches YouTube',
    category: 'seo',
    features: ['Recherche de mots-clés', 'Optimisation vidéos', 'Analytics avancés'],
    link: '/services/youtube-seo'
  },
  {
    id: 'google-ads',
    icon: Target,
    title: 'Google Ads',
    description: 'Campagnes publicitaires optimisées par intelligence artificielle',
    category: 'ads',
    features: ['Ciblage IA', 'Optimisation continue', 'ROI garanti'],
    link: '/services/seo-ia'
  },
  {
    id: 'meta-ads',
    icon: Megaphone,
    title: 'Meta Ads',
    description: 'Facebook et Instagram Ads avec targeting avancé',
    category: 'ads',
    features: ['Ciblage social', 'Créatives adaptées', 'Conversion tracking'],
    link: '/services/meta-ads'
  },
  {
    id: 'content-creation',
    icon: PenTool,
    title: 'Création de Contenu',
    description: 'Contenu SEO et marketing généré par IA',
    category: 'content',
    features: ['Rédaction IA', 'SEO optimisé', 'Multi-formats'],
    link: '/services/blogs-intersites'
  },
  {
    id: 'local-seo',
    icon: MapPin,
    title: 'SEO Local',
    description: 'Dominez les recherches locales dans votre région',
    category: 'seo',
    features: ['Google My Business', 'Citations locales', 'Avis clients'],
    link: '/services/visibilite-locale'
  },
  {
    id: 'landing-pages',
    icon: Globe,
    title: 'Landing Pages',
    description: 'Pages de conversion haute performance',
    category: 'conversion',
    features: ['Design premium', 'A/B testing', 'Analytics'],
    link: '/services/landing-aimant'
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Boutiques en ligne optimisées par IA',
    category: 'ecommerce',
    features: ['Recommandations IA', 'Checkout optimisé', 'Inventory smart'],
    link: '/services/ecommerce'
  },
  {
    id: 'podcasts',
    icon: Mic,
    title: 'Podcasts Marketing',
    description: 'Stratégie podcast pour votre marque',
    category: 'content',
    features: ['Production complète', 'Distribution multi-plateformes', 'Analytics'],
    link: '/services/podcasts'
  }
];

export const categories = [
  { id: 'all', label: 'Tous les services', count: services.length },
  { id: 'seo', label: 'SEO', count: services.filter(s => s.category === 'seo').length },
  { id: 'ads', label: 'Publicité', count: services.filter(s => s.category === 'ads').length },
  { id: 'content', label: 'Contenu', count: services.filter(s => s.category === 'content').length },
  { id: 'conversion', label: 'Conversion', count: services.filter(s => s.category === 'conversion').length },
  { id: 'ecommerce', label: 'E-commerce', count: services.filter(s => s.category === 'ecommerce').length }
];