import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import IlumatchMobile from '@/pages/modules/IlumatchMobile';
import { useTranslations } from '@/hooks/useTranslations';

const ILUMATCH = () => {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen">
      <SEOManager
        seoData={{
          title: t('ilumatch.seo.title') || 'ILUMATCH™ - Matching IA | Trouvez vos Solutions Marketing Parfaites',
          description: t('ilumatch.seo.description') || 'Intelligence artificielle qui analyse vos besoins et vous propose les solutions marketing idéales. Matching précis en 2 minutes.',
          keywords: [t('ilumatch.seo.keywords') || 'ILUMATCH, matching IA, solutions marketing, intelligence artificielle, recommandations personnalisées'],
          openGraph: {
            title: t('ilumatch.seo.ogTitle') || 'ILUMATCH™ - Trouvez vos Solutions Marketing avec l\'IA',
            description: t('ilumatch.seo.ogDescription') || 'Notre IA analyse vos besoins et vous recommande les meilleures solutions marketing pour votre entreprise.',
            type: 'website'
          }
        }}
        path="/ilumatch"
      />
      
      <Navigation />
      
      <main className="pt-20">
        <IlumatchMobile />
      </main>
      
      <Footer />
    </div>
  );
};

export default ILUMATCH;