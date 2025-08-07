import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import TeamSection from '@/components/team/TeamSection';
import LeadAssignmentSystem from '@/components/team/LeadAssignmentSystem';
import { Users, Brain, Target, Award } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

const Equipe = () => {
  const { t } = useTranslations();
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="w-8 h-8 text-purple-400" />
                <span className="text-purple-300 font-medium text-lg">{t('nav.team')}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
                {t('teamPage.title')}
                <br />
                <span className="text-4xl md:text-6xl">{t('teamPage.subtitle')}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                {t('teamPage.description')}
              </p>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
              <div className="text-center glass-effect border-white/20 rounded-xl p-8">
                <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{t('teamPage.mission.innovation.title')}</h3>
                <p className="text-white/70">
                  {t('teamPage.mission.innovation.description')}
                </p>
              </div>
              <div className="text-center glass-effect border-white/20 rounded-xl p-8">
                <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{t('teamPage.mission.impact.title')}</h3>
                <p className="text-white/70">
                  {t('teamPage.mission.impact.description')}
                </p>
              </div>
              <div className="text-center glass-effect border-white/20 rounded-xl p-8">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{t('teamPage.mission.excellence.title')}</h3>
                <p className="text-white/70">
                  {t('teamPage.mission.excellence.description')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection />

        {/* Lead Assignment System (Admin View) */}
        <section className="py-20 bg-gradient-to-b from-black/40 to-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6 text-center">
                {t('teamPage.leadSystem.title')}
              </h2>
              <p className="text-white/70 text-lg text-center max-w-3xl mx-auto">
                {t('teamPage.leadSystem.description')}
              </p>
            </motion.div>
            
            <LeadAssignmentSystem />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Equipe;