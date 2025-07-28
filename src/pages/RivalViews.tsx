import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import { SEOEngine } from '@/utils/seoEngine';
import RevolveViewsClient from '@/components/rivalviews/RevolveViewsClient';

const RivalViews = () => {
  const seoData = {
    ...SEOEngine.generatePageSEO('service', { 
      serviceName: 'RevolveViews™ - Intelligence Concurrentielle & Carte Interactive', 
      benefit: 'explorez et analysez vos concurrents avec IA avancée et mapping intelligent' 
    }),
    seoData: {
      title: 'RevolveViews™ - Intelligence Concurrentielle',
      description: 'Explorez et analysez vos concurrents avec IA avancée',
      keywords: ['concurrence', 'analyse', 'IA', 'marketing']
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <SEOManager {...seoData} />
        <Navigation />
        
        {/* Nouveau RevolveViews™ - Interface client professionnelle */}
        <RevolveViewsClient />

        <Footer />
      </div>
    </>
  );
};

export default RivalViews;