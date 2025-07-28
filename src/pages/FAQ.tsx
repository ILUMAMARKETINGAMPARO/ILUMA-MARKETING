import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import FAQSection from '@/components/faq/FAQSection';
import SEOManager from '@/components/seo/SEOManager';
import { SEOEngine } from '@/utils/seoEngine';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const FAQ = () => {
  const { t } = useLanguage();
  const pageData = SEOEngine.getPageContent('faq');
  const seoData = pageData?.seoData || SEOEngine.generatePageSEO('service', { 
    serviceName: 'FAQ', 
    benefit: 'réponses expertes à vos questions' 
  });

  return (
    <>
      <SEOManager seoData={seoData} path="/faq" />
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
        
        <main className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Montserrat']">
                 <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                   {t('faqMeta.title')}
                 </span>
               </h1>
               <p className="text-xl text-white/80 max-w-4xl mx-auto font-['Montserrat']">
                 {t('faqMeta.description')}
              </p>
            </motion.div>

            {/* FAQ Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FAQSection />
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <Card className="glass-effect border-white/20 p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
                  Vous avez d'autres questions ?
                </h3>
                <p className="text-white/70 mb-6 font-['Montserrat']">
                  Écrivez-nous via le formulaire de contact ou laissez-vous guider par Lilo™ ✨
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 font-['Montserrat']"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Nous contacter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;