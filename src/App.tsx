import React, { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CRMProvider } from '@/contexts/CRMContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { SaveProvider } from '@/contexts/SaveContext';
import { MPEProvider } from '@/contexts/MPEContext';
import { SystemProvider } from '@/contexts/SystemContext';
import { AppProvider } from '@/contexts/AppContext';
import { MeetingProvider } from '@/contexts/MeetingContext';
import { ExportProvider } from '@/contexts/ExportContext';
import GlobalErrorBoundary from '@/components/lilo/LiloErrorBoundary';
import AppLayout from '@/components/layout/AppLayout';
import LazyLoadWrapper from '@/components/performance/LazyLoadWrapper';
import GeoLanguageRouter from '@/components/routing/GeoLanguageRouter';

// Core pages - loaded immediately
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Lazy loaded pages for better performance
const Iluma = lazy(() => import('@/pages/modules/ILA'));
const Contact = lazy(() => import('@/pages/Contact'));
const EtudesDeCas = lazy(() => import('@/pages/EtudesDeCas'));
const MethodeIluma = lazy(() => import('@/pages/MethodeIluma'));
const LandingPageIntelligente = lazy(() => import('@/pages/modules/LandingPageIntelligente'));
const PageFidelisationIntelligente = lazy(() => import('@/pages/PageFidelisationIntelligente'));
const Blog = lazy(() => import('@/pages/Blog'));
const CRMIlumaComplet = lazy(() => import('@/pages/CRMIlumaComplet'));
const ILUMATCH = lazy(() => import('@/pages/modules/ILUMATCH'));
const HubCentral = lazy(() => import('@/pages/HubCentral'));
const HubServices = lazy(() => import('@/pages/HubServices'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const ADLUMA = lazy(() => import('@/pages/modules/ADLUMA'));
const AdvancedDashboard = lazy(() => import('@/pages/AdvancedDashboard'));

// Services pages
const SeoIA = lazy(() => import('@/pages/services/SeoIA'));
const Ecommerce = lazy(() => import('@/pages/services/Ecommerce'));
const VisibiliteLocale = lazy(() => import('@/pages/services/VisibiliteLocale'));
const YouTubeSEO = lazy(() => import('@/pages/services/YouTubeSEO'));
const MetaAds = lazy(() => import('@/pages/services/MetaAds'));
const GoogleAds = lazy(() => import('@/pages/services/GoogleAds'));
const InstagramAds = lazy(() => import('@/pages/services/InstagramAds'));
const BingSEO = lazy(() => import('@/pages/services/BingSEO'));

// Additional pages
const BlogIA = lazy(() => import('@/pages/BlogIA'));
const Lilo = lazy(() => import('@/pages/Lilo'));
const TableauAnalytics = lazy(() => import('@/pages/TableauAnalytics'));
const RivalViews = lazy(() => import('@/pages/RivalViews'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Modules = lazy(() => import('@/pages/Modules'));
const PresentationOutils = lazy(() => import('@/pages/PresentationOutils'));
const FormationIluma = lazy(() => import('@/pages/FormationIluma'));


function App() {
  const [useSafeMode, setUseSafeMode] = React.useState(false);

  React.useEffect(() => {
    // Initialize error handler
    import('@/utils/errorHandler').then(({ errorHandler }) => {
      errorHandler; // Initialize singleton
    });

    // Check for previous errors
    const lastError = localStorage.getItem('iluma_last_error');
    if (lastError) {
      console.warn('🔄 Previous error detected, enabling safe mode temporarily');
      setUseSafeMode(true);
      
      // Auto-disable safe mode after 30 seconds if no new errors
      setTimeout(() => {
        setUseSafeMode(false);
        localStorage.removeItem('iluma_last_error');
      }, 30000);
    }

    // Listen for WebGL fallback events
    const handleWebGLFallback = () => {
      console.warn('WebGL fallback triggered globally');
      setUseSafeMode(true);
    };

    window.addEventListener('webgl-fallback-required', handleWebGLFallback);
    
    return () => {
      window.removeEventListener('webgl-fallback-required', handleWebGLFallback);
    };
  }, []);

  // Create router with multilingual support
  const multilingualRouter = createBrowserRouter([
    {
      path: "*",
      element: <AppLayout useSafeMode={useSafeMode} />,
      children: [
        {
          path: "*",
          element: <GeoLanguageRouter />,
        }
      ]
    }
  ]);

  return (
    <GlobalErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <CRMProvider>
            <MeetingProvider>
              <ProjectProvider>
                <SaveProvider>
                  <AppProvider>
                    <SystemProvider>
                      <MPEProvider>
                        <ExportProvider>
                          <RouterProvider router={multilingualRouter} />
                        </ExportProvider>
                      </MPEProvider>
                    </SystemProvider>
                  </AppProvider>
                </SaveProvider>
              </ProjectProvider>
            </MeetingProvider>
          </CRMProvider>
        </LanguageProvider>
      </AuthProvider>
    </GlobalErrorBoundary>
  );
}

export default App;

