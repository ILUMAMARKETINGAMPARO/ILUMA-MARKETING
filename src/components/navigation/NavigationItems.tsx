import { Home, Settings, Calculator, Brain, Rocket, Phone, Zap, Globe, Star, PenTool, Bot, Users, BarChart3, Sparkles, Target, Award, Lightbulb, Network, Shield, GraduationCap } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export interface NavigationItem {
  name: string;
  path: string;
  icon: any;
  hasDropdown?: boolean;
  isNew?: boolean;
  priority?: 'high' | 'medium' | 'low';
  dropdownItems?: {
    name: string;
    path: string;
    icon?: any;
    isNew?: boolean;
    description?: string;
  }[];
  style?: 'orbital' | 'grid' | 'vertical' | 'default';
}

export const getNavigationItems = (t: (key: string) => string): NavigationItem[] => [
  { 
    name: 'Méthode', 
    path: ROUTES.METHODE_ILUMA, 
    icon: Lightbulb,
    priority: 'high'
  },
  { 
    name: '🎯 Visibilité', 
    path: ROUTES.VISIBILITE, 
    icon: Zap,
    hasDropdown: true,
    priority: 'high',
    style: 'grid',
    dropdownItems: [
      { 
        name: 'Simulateur ADLUMA™', 
        path: ROUTES.ADLUMA, 
        icon: Calculator,
        description: 'Estimation publicitaire IA'
      },
      { 
        name: 'Score ILA™', 
        path: ROUTES.ILA, 
        icon: Brain,
        description: 'Analyse visibilité locale'
      },
      { 
        name: 'SEO IA', 
        path: ROUTES.SERVICES.SEO_IA, 
        icon: Zap,
        description: 'Référencement intelligent'
      },
      { 
        name: 'Visibilité Locale', 
        path: ROUTES.SERVICES.VISIBILITE_LOCALE, 
        icon: Target,
        description: 'Présence géographique'
      },
      { 
        name: 'YouTube SEO', 
        path: ROUTES.SERVICES.YOUTUBE_SEO, 
        icon: PenTool,
        description: 'Optimisation vidéo'
      }
    ]
  },
  { 
    name: '💡 Conversion', 
    path: ROUTES.CONVERSION, 
    icon: Target,
    hasDropdown: true,
    priority: 'high',
    style: 'grid',
    dropdownItems: [
      { 
        name: 'Landing Page IA', 
        path: ROUTES.LANDING_PAGE_INTELLIGENTE, 
        icon: Globe,
        description: 'Pages de conversion'
      },
      { 
        name: 'Fidélisation IA', 
        path: ROUTES.PAGE_FIDELISATION_INTELLIGENTE, 
        icon: Star,
        description: 'Rétention client'
      },
      { 
        name: 'BlogIA™', 
        path: ROUTES.BLOGIA, 
        icon: PenTool,
        description: 'Contenu intelligent'
      },
      { 
        name: 'LILO™ Assistant', 
        path: ROUTES.LILO,
        icon: Bot,
        description: 'Chatbot conversationnel'
      }
    ]
  },
  { 
    name: '🤝 Partenariats', 
    path: ROUTES.PARTENARIATS, 
    icon: Network,
    hasDropdown: true,
    priority: 'high',
    style: 'vertical',
    dropdownItems: [
      { 
        name: 'ILUMATCH™', 
        path: ROUTES.ILUMATCH, 
        icon: Target,
        description: 'Mise en relation IA'
      },
      { 
        name: 'E-commerce', 
        path: ROUTES.SERVICES.ECOMMERCE, 
        icon: Globe,
        description: 'Solutions boutiques'
      },
      { 
        name: 'Cas d\'études', 
        path: ROUTES.ETUDES_DE_CAS, 
        icon: Award,
        description: 'Résultats clients'
      }
    ]
  },
  { 
    name: '⚙️ Gestion', 
    path: ROUTES.GESTION, 
    icon: Settings,
    hasDropdown: true,
    priority: 'high',
    style: 'vertical',
    dropdownItems: [
      { 
        name: 'CRM Iluma™', 
        path: ROUTES.CRM_ILUMA, 
        icon: Users,
        description: 'Gestion clients IA'
      },
      { 
        name: 'RivalViews™', 
        path: ROUTES.RIVALVIEWS, 
        icon: Globe,
        description: 'Intelligence concurrentielle',
        isNew: true
      },
      { 
        name: 'Analytics', 
        path: ROUTES.TABLEAU_ANALYTICS, 
        icon: BarChart3,
        description: 'Métriques avancées'
      },
      { 
        name: 'Dashboard Pro', 
        path: ROUTES.DASHBOARD_AVANCE, 
        icon: Shield,
        description: 'Tableau de bord'
      },
      { 
        name: 'Formation', 
        path: ROUTES.FORMATION_ILUMA, 
        icon: GraduationCap,
        description: 'Apprentissage IA',
        isNew: true
      }
    ]
  },
  { 
    name: 'HUB 🪐', 
    path: ROUTES.HUB_CENTRAL, 
    icon: Rocket,
    priority: 'high'
  },
  { 
    name: 'Blog', 
    path: ROUTES.BLOG, 
    icon: PenTool,
    priority: 'medium'
  },
  { 
    name: 'Contact', 
    path: ROUTES.CONTACT, 
    icon: Phone,
    priority: 'high'
  }
];

// Fonction utilitaire pour valider les routes
export const validateNavigationRoutes = (items: NavigationItem[]): string[] => {
  const errors: string[] = [];
  
  items.forEach(item => {
    if (!item.name || !item.path || !item.icon) {
      errors.push(`Navigation item incomplete: ${JSON.stringify(item)}`);
    }
    
    if (item.hasDropdown && (!item.dropdownItems || item.dropdownItems.length === 0)) {
      errors.push(`Navigation item ${item.name} has dropdown but no dropdown items`);
    }
    
    if (item.dropdownItems) {
      item.dropdownItems.forEach(dropdownItem => {
        if (!dropdownItem.name || !dropdownItem.path) {
          errors.push(`Dropdown item incomplete in ${item.name}: ${JSON.stringify(dropdownItem)}`);
        }
      });
    }
  });
  
  return errors;
};

export default getNavigationItems;