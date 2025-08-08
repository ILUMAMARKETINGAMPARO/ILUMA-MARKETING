import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import EvaluationILA from '@/components/EvaluationILA';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import { useTranslations } from '@/hooks/useTranslations';

const ILA = () => {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <SEOManager
        seoData={{
          title: t('ila.title'),
          description: t('ila.description'),
          keywords: t('ila.keywords'),
          openGraph: {
            title: t('ila.title'),
            description: t('ila.description'),
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