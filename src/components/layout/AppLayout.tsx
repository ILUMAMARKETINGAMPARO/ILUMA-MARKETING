import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FloatingLilo from '@/components/common/FloatingLilo';
import SecretShipButton from '@/components/common/SecretShipButton';
import GDPRConsentManager from '@/components/legal/GDPRConsentManager';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';
import GDPRBanner from '@/components/legal/GDPRBanner';
import PromotionOrchestrator from '@/components/promotion/PromotionOrchestrator';
import AccessibilityPanel from '@/components/accessibility/AccessibilityPanel';
import VisualBreadcrumbs from '@/components/navigation/VisualBreadcrumbs';
import DynamicSEO from '@/components/seo/DynamicSEO';
import TouchOptimizer from '@/components/responsive/TouchOptimizer';

interface AppLayoutProps {
  useSafeMode?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ useSafeMode = false }) => {
  const location = useLocation();

  return (
    <TouchOptimizer>
      <PromotionOrchestrator>
        {/* SEO dynamique */}
        <DynamicSEO />
        
        {/* Navigation Breadcrumbs */}
        <VisualBreadcrumbs />
        
        {/* Main content rendered by React Router */}
        <Outlet />
      
      {/* LILO™ Robot 3D - Assistant Intelligent Galactique */}
      <FloatingLilo 
        currentPage={location.pathname.replace('/', '') || 'home'}
        onInteraction={() => {
          console.log('LILO™ 3D assistance demandée sur:', location.pathname);
        }}
        userId="anonymous"
        context={{
          page: location.pathname.replace('/', '') || 'home',
          userLevel: 'beginner',
          recentActivity: [],
          emotion: 'curious',
          industryContext: 'marketing',
          currentGoals: ['help_user']
        }}
      />
      
        <SecretShipButton />
        <AccessibilityPanel />
        <GDPRConsentManager />
        <GDPRBanner />
        <PerformanceOptimizer />
      </PromotionOrchestrator>
    </TouchOptimizer>
    );
  };

export default AppLayout;