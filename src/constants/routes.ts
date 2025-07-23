// Constantes centralisées pour toutes les routes de l'application Iluma™
export const ROUTES = {
  // Pages principales
  HOME: '/',
  CONTACT: '/contact',
  BLOG: '/blog',
  
  // Sections principales
  VISIBILITE: '/visibilite',
  CONVERSION: '/conversion',
  PARTENARIATS: '/partenariats',
  GESTION: '/gestion',
  
  // Méthode & Formation
  METHODE_ILUMA: '/methode-iluma',
  FORMATION_ILUMA: '/formation-iluma',
  
  // Modules principaux
  ADLUMA: '/adluma',
  ILA: '/ila',
  CRM_ILUMA: '/crm-iluma',
  RIVALVIEWS: '/rival-views',
  ILUMATCH: '/ilumatch',
  
  // Hub & Tableaux
  HUB_CENTRAL: '/hub',
  TABLEAU_ANALYTICS: '/analytics',
  DASHBOARD_AVANCE: '/dashboard-avance',
  
  // Pages de conversion
  LANDING_PAGE_INTELLIGENTE: '/landing-page-intelligente',
  PAGE_FIDELISATION_INTELLIGENTE: '/page-fidelisation-intelligente',
  SITE_WEB_COMPLET: '/site-web-complet',
  
  // Services
  SERVICES: {
    SEO_IA: '/services/seo-ia',
    BING_SEO: '/services/bing-seo',
    ECOMMERCE: '/services/ecommerce',
    VISIBILITE_LOCALE: '/services/visibilite-locale',
    YOUTUBE_SEO: '/services/youtube-seo',
    GOOGLE_ADS: '/services/google-ads',
    META_ADS: '/services/meta-ads',
    INSTAGRAM_ADS: '/services/instagram-ads',
    TINDER_ADS: '/services/tinder-ads',
    SPOTIFY_ADS: '/services/spotify-ads',
    AMAZON_ADS: '/services/amazon-ads',
    BLOGS_INTERSITES: '/services/blogs-intersites',
    PARTENARIAT_POCHE_BLEUE: '/services/partenariat-poche-bleue',
  },
  
  // Présentation outils
  PRESENTATION_OUTILS: '/presentation-outils',
  
  // Études de cas
  ETUDES_DE_CAS: '/etudes-de-cas',
  
  // BlogIA & Modules secondaires
  BLOGIA: '/blogia',
  LILO: '/lilo',
  
  // Pages d'erreur
  NOT_FOUND: '/404',
} as const;

// Types pour la validation TypeScript
export type RouteKeys = keyof typeof ROUTES;
export type ServiceRouteKeys = keyof typeof ROUTES.SERVICES;

// Fonction utilitaire pour valider si une route existe
export const isValidRoute = (route: string): boolean => {
  const allRoutes: string[] = [
    ROUTES.HOME, ROUTES.CONTACT, ROUTES.BLOG, 
    ROUTES.VISIBILITE, ROUTES.CONVERSION, ROUTES.PARTENARIATS, ROUTES.GESTION,
    ROUTES.METHODE_ILUMA, ROUTES.FORMATION_ILUMA, ROUTES.ADLUMA, ROUTES.ILA, ROUTES.CRM_ILUMA,
    ROUTES.RIVALVIEWS, ROUTES.ILUMATCH, ROUTES.HUB_CENTRAL, ROUTES.TABLEAU_ANALYTICS, ROUTES.DASHBOARD_AVANCE,
    ROUTES.LANDING_PAGE_INTELLIGENTE, ROUTES.PAGE_FIDELISATION_INTELLIGENTE, ROUTES.SITE_WEB_COMPLET,
    ROUTES.ETUDES_DE_CAS, ROUTES.BLOGIA, ROUTES.LILO, ROUTES.NOT_FOUND
  ];
  const serviceRoutes: string[] = Object.values(ROUTES.SERVICES);
  return [...allRoutes, ...serviceRoutes].includes(route);
};

// Liens externes
export const EXTERNAL_LINKS = {
  SOCIAL: {
    FACEBOOK: 'https://www.facebook.com/IlumaMarketing',
    TWITTER: 'https://twitter.com/IlumaMarketing',
    INSTAGRAM: 'https://www.instagram.com/ilumamarketing',
    LINKEDIN: 'https://www.linkedin.com/company/iluma-marketing',
  },
  CONTACT: {
    EMAIL: 'mailto:contact@ilumamarketing.com',
    PHONE: 'tel:+15148828910',
  }
} as const;