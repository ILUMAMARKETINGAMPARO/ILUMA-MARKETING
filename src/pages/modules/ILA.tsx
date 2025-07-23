import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import EvaluationILA from '@/components/EvaluationILA';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import { useLanguage } from '@/hooks/useLanguage';

const ILA = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <SEOManager
        seoData={{
          title: t('ila.seo.title'),
          description: t('ila.seo.description'),
          keywords: [t('ila.seo.keywords')],
          openGraph: {
            title: t('ila.seo.ogTitle'),
            description: t('ila.seo.ogDescription'),
            type: 'website'
          }
        }}
        path="/ila"
      />
      
      <Navigation />
      
      <main className="pt-20">
        <EvaluationILA />
      </main>
      
      <Footer />
    </div>
  );
};

export default ILA;