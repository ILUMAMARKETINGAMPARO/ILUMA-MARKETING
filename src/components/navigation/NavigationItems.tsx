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
    name: t('nav.methode'), 
    path: ROUTES.METHODE_ILUMA, 
    icon: Lightbulb,
    priority: 'high'
  },
  { 
    name: '🚀 ' + t('nav.services'), 
    path: '/services', 
    icon: Star,
    hasDropdown: true,
    priority: 'high',
    style: 'grid',
    dropdownItems: [
      { 
        name: t('nav.seoAI'), 
        path: ROUTES.SERVICES.SEO_IA, 
        icon: Zap,
        description: t('nav.seoAIDesc')
      },
      { 
        name: t('nav.localVisibility'), 
        path: ROUTES.SERVICES.VISIBILITE_LOCALE, 
        icon: Target,
        description: t('nav.localVisibilityDesc')
      },
      { 
        name: t('nav.youtubeSEO'), 
        path: ROUTES.SERVICES.YOUTUBE_SEO, 
        icon: PenTool,
        description: t('nav.youtubeSEODesc')
      },
      { 
        name: t('nav.ecommerce'), 
        path: ROUTES.SERVICES.ECOMMERCE, 
        icon: Globe,
        description: t('nav.ecommerceDesc')
      },
      { 
        name: t('nav.seoGoogle'), 
        path: '/services/seo-google', 
        icon: Globe,
        description: t('nav.seoGoogleDesc')
      },
      { 
        name: t('nav.seoBing'), 
        path: '/services/bing-seo', 
        icon: Globe,
        description: t('nav.seoBingDesc')
      },
      { 
        name: t('nav.googleAds'), 
        path: '/services/google-ads', 
        icon: Target,
        description: t('nav.googleAdsDesc')
      },
      { 
        name: t('nav.metaAds'), 
        path: '/services/meta-ads', 
        icon: Target,
        description: t('nav.metaAdsDesc')
      },
      { 
        name: t('nav.contentCreation'), 
        path: '/services/content-creation', 
        icon: PenTool,
        description: t('nav.contentCreationDesc')
      },
      { 
        name: t('nav.partnership'), 
        path: '/services/partnership', 
        icon: Network,
        description: t('nav.partnershipDesc')
      }
    ]
  },
  { 
    name: '🎯 ' + t('nav.visibility'), 
    path: ROUTES.VISIBILITE, 
    icon: Zap,
    hasDropdown: true,
    priority: 'high',
    style: 'grid',
    dropdownItems: [
      { 
        name: t('nav.adluma'), 
        path: ROUTES.ADLUMA, 
        icon: Calculator,
        description: t('nav.adlumaDesc')
      },
      { 
        name: t('nav.ila'), 
        path: ROUTES.ILA, 
        icon: Brain,
        description: t('nav.ilaDesc')
      }
    ]
  },
  { 
    name: '💡 ' + t('nav.conversion'), 
    path: ROUTES.CONVERSION, 
    icon: Target,
    hasDropdown: true,
    priority: 'high',
    style: 'grid',
    dropdownItems: [
      { 
        name: t('nav.landingPage'), 
        path: ROUTES.LANDING_PAGE_INTELLIGENTE, 
        icon: Globe,
        description: t('nav.landingPageDesc')
      },
      { 
        name: t('nav.fidelization'), 
        path: ROUTES.PAGE_FIDELISATION_INTELLIGENTE, 
        icon: Star,
        description: t('nav.fidelizationDesc')
      },
      { 
        name: t('nav.blogIA'), 
        path: ROUTES.BLOGIA, 
        icon: PenTool,
        description: t('nav.blogIADesc')
      },
      { 
        name: t('nav.lilo'), 
        path: ROUTES.LILO,
        icon: Bot,
        description: t('nav.liloDesc')
      },
      { 
        name: t('nav.liloAdvanced'), 
        path: '/lilo-advanced',
        icon: Brain,
        description: t('nav.liloAdvancedDesc')
      }
    ]
  },
  { 
    name: '🤝 ' + t('nav.partnerships'), 
    path: ROUTES.PARTENARIATS, 
    icon: Network,
    hasDropdown: true,
    priority: 'high',
    style: 'vertical',
    dropdownItems: [
      { 
        name: t('nav.ilumatch'), 
        path: ROUTES.ILUMATCH, 
        icon: Target,
        description: t('nav.ilumatchDesc')
      },
      { 
        name: t('nav.ecommerce'), 
        path: ROUTES.SERVICES.ECOMMERCE, 
        icon: Globe,
        description: t('nav.ecommerceDesc')
      },
      { 
        name: t('nav.caseStudies'), 
        path: ROUTES.ETUDES_DE_CAS, 
        icon: Award,
        description: t('nav.caseStudiesDesc')
      }
    ]
  },
  { 
    name: '⚙️ ' + t('nav.management'), 
    path: ROUTES.GESTION, 
    icon: Settings,
    hasDropdown: true,
    priority: 'high',
    style: 'vertical',
    dropdownItems: [
      { 
        name: t('nav.crm'), 
        path: ROUTES.CRM_ILUMA, 
        icon: Users,
        description: t('nav.crmDesc')
      },
      { 
        name: t('nav.rivalviews'), 
        path: ROUTES.RIVALVIEWS, 
        icon: Globe,
        description: t('nav.rivalviewsDesc'),
        isNew: true
      },
      { 
        name: t('nav.analytics'), 
        path: ROUTES.TABLEAU_ANALYTICS, 
        icon: BarChart3,
        description: t('nav.analyticsDesc')
      },
      { 
        name: t('nav.dashboard'), 
        path: ROUTES.DASHBOARD_AVANCE, 
        icon: Shield,
        description: t('nav.dashboardDesc')
      },
      { 
        name: t('nav.formation'), 
        path: ROUTES.FORMATION_ILUMA, 
        icon: GraduationCap,
        description: t('nav.formationDesc'),
        isNew: true
      }
    ]
  },
  { 
    name: t('nav.hub') + ' 🪐', 
    path: ROUTES.HUB_CENTRAL, 
    icon: Rocket,
    priority: 'high'
  },
  { 
    name: t('nav.blog'), 
    path: ROUTES.BLOG, 
    icon: PenTool,
    priority: 'medium'
  },
  { 
    name: t('nav.contact'), 
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