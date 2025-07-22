import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useGeoLanguageDetection } from '@/hooks/useGeoLanguageDetection';
import { Language } from '@/types/language';

// Import all page components
import Index from '@/pages/Index';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import LazyLoadWrapper from '@/components/performance/LazyLoadWrapper';

// Lazy imports for better performance
import { Suspense, lazy } from 'react';

const ADLUMA = lazy(() => import('@/pages/modules/ADLUMA'));
const ILA = lazy(() => import('@/pages/modules/ILA'));
const CRMIlumaComplet = lazy(() => import('@/pages/CRMIlumaComplet'));
const HubCentral = lazy(() => import('@/pages/HubCentral'));
const HubServices = lazy(() => import('@/pages/HubServices'));
const ILUMATCH = lazy(() => import('@/pages/modules/ILUMATCH'));
const MethodeIluma = lazy(() => import('@/pages/MethodeIluma'));
const EtudesDeCas = lazy(() => import('@/pages/EtudesDeCas'));
const Blog = lazy(() => import('@/pages/Blog'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const FormationIluma = lazy(() => import('@/pages/FormationIluma'));
const LandingPageIntelligente = lazy(() => import('@/pages/LandingPageIntelligentePage'));
const PageFidelisationIntelligente = lazy(() => import('@/pages/PageFidelisationIntelligente'));
const SiteWebComplet = lazy(() => import('@/pages/SiteWebComplet'));
const BlogIA = lazy(() => import('@/pages/BlogIA'));
const Lilo = lazy(() => import('@/pages/Lilo'));
const TableauAnalytics = lazy(() => import('@/pages/TableauAnalytics'));
const RivalViews = lazy(() => import('@/pages/RivalViews'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Modules = lazy(() => import('@/pages/Modules'));
const PresentationOutils = lazy(() => import('@/pages/PresentationOutils'));
const AdvancedDashboard = lazy(() => import('@/pages/AdvancedDashboard'));

// Services
const SeoIA = lazy(() => import('@/pages/services/SeoIA'));
const Ecommerce = lazy(() => import('@/pages/services/Ecommerce'));
const VisibiliteLocale = lazy(() => import('@/pages/services/VisibiliteLocale'));
const YouTubeSEO = lazy(() => import('@/pages/services/YouTubeSEO'));
const MetaAds = lazy(() => import('@/pages/services/MetaAds'));
const GoogleAds = lazy(() => import('@/pages/services/GoogleAds'));
const InstagramAds = lazy(() => import('@/pages/services/InstagramAds'));
const BingSEO = lazy(() => import('@/pages/services/BingSEO'));

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  exact?: boolean;
}

const ROUTES_CONFIG: RouteConfig[] = [
  { path: '/', element: <Index />, exact: true },
  { path: '/contact', element: <LazyLoadWrapper><Contact /></LazyLoadWrapper> },
  { path: '/adluma', element: <LazyLoadWrapper><ADLUMA /></LazyLoadWrapper> },
  { path: '/ila', element: <LazyLoadWrapper><ILA /></LazyLoadWrapper> },
  { path: '/crm-iluma', element: <LazyLoadWrapper><CRMIlumaComplet /></LazyLoadWrapper> },
  { path: '/hub', element: <LazyLoadWrapper><HubCentral /></LazyLoadWrapper> },
  { path: '/services', element: <LazyLoadWrapper><HubServices /></LazyLoadWrapper> },
  { path: '/methode-iluma', element: <LazyLoadWrapper><MethodeIluma /></LazyLoadWrapper> },
  { path: '/ilumatch', element: <LazyLoadWrapper><ILUMATCH /></LazyLoadWrapper> },
  { path: '/etudes-de-cas', element: <LazyLoadWrapper><EtudesDeCas /></LazyLoadWrapper> },
  { path: '/blog', element: <LazyLoadWrapper><Blog /></LazyLoadWrapper> },
  { path: '/faq', element: <LazyLoadWrapper><FAQ /></LazyLoadWrapper> },
  { path: '/formation-iluma', element: <LazyLoadWrapper><FormationIluma /></LazyLoadWrapper> },
  { path: '/landing-page-intelligente', element: <LazyLoadWrapper><LandingPageIntelligente /></LazyLoadWrapper> },
  { path: '/page-fidelisation-intelligente', element: <LazyLoadWrapper><PageFidelisationIntelligente /></LazyLoadWrapper> },
  { path: '/site-web-complet', element: <LazyLoadWrapper><SiteWebComplet /></LazyLoadWrapper> },
  { path: '/blogia', element: <LazyLoadWrapper><BlogIA /></LazyLoadWrapper> },
  { path: '/lilo', element: <LazyLoadWrapper><Lilo /></LazyLoadWrapper> },
  { path: '/analytics', element: <LazyLoadWrapper><TableauAnalytics /></LazyLoadWrapper> },
  { path: '/rival-views', element: <LazyLoadWrapper><RivalViews /></LazyLoadWrapper> },
  { path: '/portfolio', element: <LazyLoadWrapper><Portfolio /></LazyLoadWrapper> },
  { path: '/modules', element: <LazyLoadWrapper><Modules /></LazyLoadWrapper> },
  { path: '/presentation-outils', element: <LazyLoadWrapper><PresentationOutils /></LazyLoadWrapper> },
  { path: '/dashboard', element: <LazyLoadWrapper><AdvancedDashboard /></LazyLoadWrapper> },
  { path: '/dashboard-avance', element: <LazyLoadWrapper><AdvancedDashboard /></LazyLoadWrapper> },
  
  // Pages de sections principales (redirections vers HUB)
  { path: '/visibilite', element: <Navigate to="/hub" replace /> },
  { path: '/conversion', element: <Navigate to="/hub" replace /> },
  { path: '/partenariats', element: <Navigate to="/hub" replace /> },
  { path: '/gestion', element: <Navigate to="/hub" replace /> },
  { path: '/services/seo-ia', element: <LazyLoadWrapper><SeoIA /></LazyLoadWrapper> },
  { path: '/services/ecommerce', element: <LazyLoadWrapper><Ecommerce /></LazyLoadWrapper> },
  { path: '/services/visibilite-locale', element: <LazyLoadWrapper><VisibiliteLocale /></LazyLoadWrapper> },
  { path: '/services/youtube-seo', element: <LazyLoadWrapper><YouTubeSEO /></LazyLoadWrapper> },
  { path: '/services/meta-ads', element: <LazyLoadWrapper><MetaAds /></LazyLoadWrapper> },
  { path: '/services/google-ads', element: <LazyLoadWrapper><GoogleAds /></LazyLoadWrapper> },
  { path: '/services/instagram-ads', element: <LazyLoadWrapper><InstagramAds /></LazyLoadWrapper> },
  { path: '/services/bing-seo', element: <LazyLoadWrapper><BingSEO /></LazyLoadWrapper> },
];

const MultilingualRouter: React.FC = () => {
  const location = useLocation();
  const { extractLangFromPath } = useGeoLanguageDetection({ autoRedirect: true });

  // Extract language and clean path
  const { lang: currentLang, cleanPath } = extractLangFromPath(location.pathname);

  // Generate routes for all languages
  const generateLanguageRoutes = (lang: Language | null) => {
    const prefix = lang && lang !== 'fr' ? `/${lang}` : '';
    
    return ROUTES_CONFIG.map((route, index) => (
      <Route
        key={`${lang || 'default'}-${index}`}
        path={`${prefix}${route.path}`}
        element={route.element}
      />
    ));
  };

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    }>
      <Routes>
        {/* Default routes (French - no prefix) */}
        {generateLanguageRoutes(null)}
        
        {/* English routes */}
        {generateLanguageRoutes('en')}
        
        {/* Spanish routes */}
        {generateLanguageRoutes('es')}
        
        {/* Redirects for legacy URLs */}
        <Route path="/fr/*" element={<Navigate to={location.pathname.replace('/fr', '')} replace />} />
        
        {/* 404 for all languages */}
        <Route path="/en/404" element={<NotFound />} />
        <Route path="/es/404" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MultilingualRouter;