export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  structuredData?: any;
  openGraph?: {
    title: string;
    description: string;
    image?: string;
    type: string;
  };
}

export interface PageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  sections: {
    title: string;
    content: string;
  }[];
}

const ILUMA_KEYWORDS = [
  'IA marketing', 'SEO intelligent', 'automatisation', 'landing page',
  'conversion', 'CRM intelligent', 'Iluma', 'marketing digital',
  'intelligence artificielle', 'optimisation', 'performance'
];

const PAGE_TEMPLATES = {
  home: {
    titleTemplate: "Iluma™ - IA Marketing & SEO Intelligent | Automatisation Complète",
    descriptionTemplate: "Transformez votre marketing avec l'IA Iluma™. SEO intelligent, landing pages automatisées, CRM intégré. Résultats garantis en 30 jours.",
    keywords: [...ILUMA_KEYWORDS, 'accueil', 'marketing automation', 'transformation digitale']
  },
  module: {
    titleTemplate: "{moduleName} - Module Iluma™ | IA Marketing Avancée",
    descriptionTemplate: "Découvrez {moduleName}, le module IA Iluma™ pour {benefit}. Automatisation complète, résultats mesurables, interface intuitive.",
    keywords: [...ILUMA_KEYWORDS, 'module IA', 'fonctionnalité avancée']
  },
  service: {
    titleTemplate: "{serviceName} - Service Iluma™ | Expertise IA Marketing",
    descriptionTemplate: "Service {serviceName} Iluma™ : {benefit}. Accompagnement expert, stratégie personnalisée, ROI optimisé.",
    keywords: [...ILUMA_KEYWORDS, 'service professionnel', 'expertise marketing']
  },
  blog: {
    titleTemplate: "Blog Iluma™ - Insights IA Marketing | Stratégies Avancées",
    descriptionTemplate: "Blog Iluma™ : analyses, stratégies et tendances IA marketing. Conseils d'experts, cas d'usage, optimisation continue.",
    keywords: [...ILUMA_KEYWORDS, 'blog', 'insights', 'stratégies', 'tendances']
  }
};

export class SEOEngine {
  static generatePageSEO(pageType: keyof typeof PAGE_TEMPLATES, params: Record<string, string> = {}): SEOData {
    const template = PAGE_TEMPLATES[pageType];
    
    const title = this.interpolateTemplate(template.titleTemplate, params);
    const description = this.interpolateTemplate(template.descriptionTemplate, params);
    
    return {
      title,
      description,
      keywords: template.keywords,
      openGraph: {
        title,
        description,
        type: 'website',
        image: '/iluma-og-image.jpg'
      },
      structuredData: this.generateStructuredData(pageType, { title, description, ...params })
    };
  }

  static getPageContent(pageKey: string): { seoData: SEOData; content?: PageContent } | null {
    // Return static content immediately to prevent loading issues
    if (pageKey in ILUMA_CONTENT.modules) {
      const moduleData = ILUMA_CONTENT.modules[pageKey as keyof typeof ILUMA_CONTENT.modules];
      return {
        seoData: this.generatePageSEO('module', { moduleName: pageKey, benefit: moduleData.benefit }),
        content: this.generateModuleContent(pageKey, moduleData.description, moduleData.features)
      };
    }
    
    if (pageKey in ILUMA_CONTENT.services) {
      const serviceData = ILUMA_CONTENT.services[pageKey as keyof typeof ILUMA_CONTENT.services];
      return {
        seoData: this.generatePageSEO('service', { serviceName: pageKey, benefit: serviceData.description }),
        content: this.generateServiceContent(pageKey, serviceData.description, serviceData.benefits)
      };
    }
    
    return null;
  }

  static generateModuleContent(moduleName: string, description: string, features: string[]): PageContent {
    return {
      hero: {
        title: `${moduleName} - Intelligence Artificielle Iluma™`,
        subtitle: `${description} Automatisation complète, résultats mesurables, interface galactique intuitive.`,
        cta: `Activer ${moduleName} maintenant`
      },
      sections: [
        {
          title: `Pourquoi ${moduleName} ?`,
          content: `${moduleName} révolutionne votre approche grâce à l'IA avancée d'Iluma™. Optimisation continue, personnalisation intelligente, performance maximale.`
        },
        {
          title: 'Fonctionnalités Intelligentes',
          content: features.join(' • ') + ' • Interface galactique intuitive • Automatisation complète'
        },
        {
          title: 'Résultats Garantis',
          content: 'Performance mesurable dès les premiers jours. Analytics en temps réel, optimisation continue, ROI transparent.'
        }
      ]
    };
  }

  static generateServiceContent(serviceName: string, description: string, benefits: string[]): PageContent {
    return {
      hero: {
        title: `${serviceName} - Service Expert Iluma™`,
        subtitle: `${description} Accompagnement personnalisé, stratégie sur mesure, résultats garantis.`,
        cta: `Démarrer avec ${serviceName}`
      },
      sections: [
        {
          title: 'Expertise Reconnue',
          content: `Notre équipe d'experts ${serviceName} vous accompagne avec une méthodologie éprouvée et des outils IA de pointe.`
        },
        {
          title: 'Bénéfices Concrets',
          content: benefits.join(' • ') + ' • Suivi personnalisé • Support expert'
        },
        {
          title: 'Garantie Résultats',
          content: 'Engagement sur les résultats, méthodologie transparente, accompagnement jusqu\'au succès.'
        }
      ]
    };
  }

  private static interpolateTemplate(template: string, params: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => params[key] || match);
  }

  private static generateStructuredData(pageType: string, data: any) {
    const baseStructure = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Iluma™",
      "description": "Intelligence Artificielle Marketing & SEO",
      "url": "https://ilumamarketing.com",
      "logo": "https://ilumamarketing.com/logo.png"
    };

    if (pageType === 'module' || pageType === 'service') {
      return {
        ...baseStructure,
        "@type": "Service",
        "name": data.title,
        "description": data.description,
        "provider": baseStructure
      };
    }

    return baseStructure;
  }
}

// Contenu prédéfini pour les pages principales
export const ILUMA_CONTENT = {
  modules: {
    'ADLUMA': {
      description: 'Simulateur intelligent de campagnes publicitaires avec IA prédictive',
      features: ['Prédiction ROI intelligent', 'Optimisation automatique', 'Analytics avancées', 'Ciblage IA'],
      benefit: 'maximiser votre ROI publicitaire'
    },
    'ILA': {
      description: 'Intelligence de Localisation Avancée pour dominer votre marché local',
      features: ['SEO local intelligent', 'Analyse concurrentielle', 'Optimisation géographique', 'Suivi performance'],
      benefit: 'dominer votre marché local'
    },
    'HUB': {
      description: 'Centre de contrôle centralisé pour tous vos outils marketing IA',
      features: ['Dashboard unifié', 'Gestion multi-projets', 'Analytics globales', 'Automatisation workflow'],
      benefit: 'centraliser votre marketing digital'
    },
    'CRM': {
      description: 'CRM intelligent avec automatisation et scoring IA des prospects',
      features: ['Scoring IA prospects', 'Automatisation emails', 'Pipeline intelligent', 'Prédiction conversion'],
      benefit: 'convertir plus de prospects'
    },
    'BlogIA': {
      description: 'Génération automatique de contenu SEO avec intelligence artificielle',
      features: ['Rédaction IA', 'Optimisation SEO', 'Publication automatique', 'Analytics contenu'],
      benefit: 'automatiser votre content marketing'
    },
    'ILUMATCH': {
      description: 'Mise en relation intelligente entreprises-prospects avec IA avancée',
      features: ['Matching IA', 'Score compatibilité', 'Recommandations smart', 'CRM intégré'],
      benefit: 'connecter avec vos clients idéaux'
    }
  },
  services: {
    'SEO IA': {
      description: 'Référencement naturel boosté par intelligence artificielle',
      benefits: ['Positionnement #1 Google', 'Trafic organique +300%', 'Contenu optimisé IA', 'Suivi temps réel']
    },
    'Landing Pages AIMANT': {
      description: 'Pages de conversion ultra-performantes générées par IA',
      benefits: ['Conversion +250%', 'Optimisation continue', 'A/B testing automatique', 'Design galactique']
    },
    'YouTube SEO': {
      description: 'Optimisation vidéo YouTube avec stratégie IA avancée',
      benefits: ['Visibilité maximale', 'Engagement +400%', 'Monétisation optimisée', 'Analytics poussées']
    },
    'Visibilité Locale': {
      description: 'Domination locale avec géo-ciblage IA et optimisation GMB',
      benefits: ['Top 3 local garanti', 'Avis clients +500%', 'Visibilité géographique', 'Trafic local qualifié']
    }
  }
};