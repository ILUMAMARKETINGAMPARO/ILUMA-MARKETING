import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOSocialHero from '@/components/seo-social/SEOSocialHero';
import ScrollNarratif from '@/components/seo-social/ScrollNarratif';
import EtudeCasKatz from '@/components/seo-social/EtudeCasKatz';
import SimulateurScore from '@/components/seo-social/SimulateurScore';
import SEOCallToAction from '@/components/seo-social/SEOCallToAction';
import MPEContainer from '@/components/mpe/MPEContainer';

const ModuleSEOReseaux = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <Navigation />
      
      {/* Hero Section - Bloc 1 */}
      <SEOSocialHero />
      
      {/* Scroll Narratif - Bloc 2 */}
      <section className="py-20">
        <MPEContainer className="max-w-6xl mx-auto px-4">
          <ScrollNarratif />
        </MPEContainer>
      </section>
      
      {/* Étude de Cas - Bloc 3 */}
      <section className="py-20 bg-black/20">
        <MPEContainer className="max-w-6xl mx-auto px-4">
          <EtudeCasKatz />
        </MPEContainer>
      </section>
      
      {/* Simulateur - Bloc 4 */}
      <section className="py-20">
        <MPEContainer className="max-w-4xl mx-auto px-4">
          <SimulateurScore />
        </MPEContainer>
      </section>
      
      {/* Call to Action - Bloc 5 */}
      <SEOCallToAction />
      
      <Footer />
    </div>
  );
};

export default ModuleSEOReseaux;
