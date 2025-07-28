import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOSocialHero from '@/components/seo-social/SEOSocialHero';
import ScrollNarratif from '@/components/seo-social/ScrollNarratif';
import EtudeCasKatz from '@/components/seo-social/EtudeCasKatz';
import SimulateurScore from '@/components/seo-social/SimulateurScore';
import SEOCallToAction from '@/components/seo-social/SEOCallToAction';
import MPEContainer from '@/components/mpe/MPEContainer';

const ComprenderSEO = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <Navigation />
      
      {/* SEO Meta Tags */}
      <head>
        <title>Comprendre le SEO comme sur les réseaux sociaux | Iluma Marketing</title>
        <meta name="description" content="Découvrez comment le SEO fonctionne exactement comme Instagram, TikTok et LinkedIn. Module pédagogique interactif pour maîtriser le référencement naturel." />
        <meta name="keywords" content="SEO, réseaux sociaux, marketing digital, référencement, Instagram, Google" />
        <link rel="canonical" href="https://ilumamarketing.com/comprendre-le-seo" />
      </head>
      
      {/* Section 1: Accroche Sociale */}
      <section className="accroche-sociale">
        <SEOSocialHero />
      </section>
      
      {/* Section 2: Scroll Narratif */}
      <section className="scroll-narratif py-20">
        <MPEContainer className="max-w-6xl mx-auto px-4">
          <ScrollNarratif />
        </MPEContainer>
      </section>
      
      {/* Section 3: Étude de Cas Katz */}
      <section className="etude-cas-katz py-20 bg-black/20">
        <MPEContainer className="max-w-6xl mx-auto px-4">
          <EtudeCasKatz />
        </MPEContainer>
      </section>
      
      {/* Section 4: Simulateur Social SEO */}
      <section className="simulateur-social-seo py-20">
        <MPEContainer className="max-w-4xl mx-auto px-4">
          <SimulateurScore />
        </MPEContainer>
      </section>
      
      {/* Section 5: CTA Final */}
      <section className="cta-final">
        <SEOCallToAction />
      </section>
      
      <Footer />
    </div>
  );
};

export default ComprenderSEO;