import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import Illumatch from '@/pages/modules/Illumatch';
import { useLanguage } from '@/hooks/useLanguage';

const ILUMATCH = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <SEOManager
        seoData={{
          title: t('ilumatch.seo.title'),
          description: t('ilumatch.seo.description'),
          keywords: [t('ilumatch.seo.keywords')],
          openGraph: {
            title: t('ilumatch.seo.ogTitle'),
            description: t('ilumatch.seo.ogDescription'),
            type: 'website'
          }
        }}
        path="/ilumatch"
      />
      
      <Navigation />
      
      <main className="pt-20">
        <Illumatch />
      </main>
      
      <Footer />
    </div>
  );
};

export default ILUMATCH;