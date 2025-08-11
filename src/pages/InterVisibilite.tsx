import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { useTranslations } from '@/hooks/useTranslations';
import InterVisibiliteHero from '@/components/inter-visibilite/InterVisibiliteHero';
import NetworkBenefits from '@/components/inter-visibilite/NetworkBenefits';
import SuccessMetrics from '@/components/inter-visibilite/SuccessMetrics';
import InterVisibiliteInterface from '@/components/inter-visibilite/InterVisibiliteInterface';
import InterVisibiliteCTA from '@/components/inter-visibilite/InterVisibiliteCTA';

const InterVisibilite = () => {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <InterVisibiliteHero />

          {/* Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <SuccessMetrics />
          </motion.div>

          {/* Network Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <NetworkBenefits />
          </motion.div>

          {/* Main Interface */}
          <InterVisibiliteInterface />

          {/* CTA Section */}
          <InterVisibiliteCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InterVisibilite;
