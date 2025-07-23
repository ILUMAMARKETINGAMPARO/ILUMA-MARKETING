import { useLocation } from 'react-router-dom';
import { useLanguage } from './useLanguage';

// Mapping des routes vers les clés de traduction SEO
const routeToSEOKey: Record<string, string> = {
  '/': 'home',
  '/contact': 'contact',
  '/adluma': 'adluma',
  '/ila': 'ila',
  '/blog': 'blog',
  '/ilumatch': 'ilumatch',
  '/landing-page-intelligente': 'landingPageIntelligente',
  '/crm-iluma': 'crmIluma',
  '/hub': 'hubCentral',
  '/services/seo-ia': 'seoIA',
  '/services/visibilite-locale': 'visibiliteLocale',
  '/services/youtube-seo': 'youtubeSeo',
  '/formation-iluma': 'formationIluma',
  '/methode-iluma': 'methodeIluma',
  '/etudes-de-cas': 'etudesDeCas',
  '/faq': 'faq',
  '/portfolio': 'portfolio',
  '/rival-views': 'rivalviews',
  '/services/google-ads': 'googleAds',
  '/services/meta-ads': 'metaAds',
  '/services/instagram-ads': 'instagramAds',
  '/services/bing-seo': 'bingSeo',
  '/services/ecommerce': 'ecommerce',
  '/blogia': 'blogia',
  '/lilo': 'lilo',
  '/page-fidelisation-intelligente': 'pageFidelisation',
  '/analytics': 'tableauAnalytics',
  '/dashboard-avance': 'dashboardAvance',
  '/presentation-outils': 'presentationOutils',
  '/modules': 'modules',
  '/hub-services': 'hubServices',
  '/auth': 'auth',
  '/auth-callback': 'authCallback',
  '/404': 'notFound'
};

export const useSEOData = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  // Nettoyer le pathname pour enlever les préfixes de langue
  const cleanPath = location.pathname.replace(/^\/(en|es)/, '') || '/';
  
  // Trouver la clé SEO correspondante
  const seoKey = routeToSEOKey[cleanPath] || 'home';
  
  // Retourner les données SEO traduites
  return {
    title: t(`seo.${seoKey}.title`),
    description: t(`seo.${seoKey}.description`),
    keywords: t(`seo.${seoKey}.keywords`),
    canonical: t(`seo.${seoKey}.canonical`),
    ogTitle: t(`seo.${seoKey}.ogTitle`),
    ogDescription: t(`seo.${seoKey}.ogDescription`),
    twitterTitle: t(`seo.${seoKey}.twitterTitle`),
    twitterDescription: t(`seo.${seoKey}.twitterDescription`),
    currentSEOKey: seoKey
  };
};