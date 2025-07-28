import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, ArrowLeft, Sparkles, Search } from 'lucide-react';
import LiloAssistant from '@/components/lilo/LiloAssistant';
import { useLanguage } from '@/hooks/useLanguage';

const NotFound = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black flex items-center justify-center relative">
      {/* LILO avec mood "confused" */}
      <LiloAssistant currentPage="/404" isVisible={true} />
      
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animation galactique */}
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 mx-auto relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-black" />
              </div>
            </motion.div>
          </div>

          <Card className="glass-effect border-white/20 p-8 mb-8">
            <h1 className="text-6xl font-bold text-white mb-4 font-['Montserrat']">
              404
            </h1>
            <h2 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
              {t('notFound.title')}
            </h2>
            <p className="text-white/80 mb-6 font-['Montserrat'] text-lg leading-relaxed">
              🌌 {t('notFound.description')}
              <br />
              {t('notFound.subDescription')}
            </p>

            {/* Actions de navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <Button className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black font-semibold px-6 py-3 font-['Montserrat']">
                  <Home className="w-4 h-4 mr-2" />
                  {t('notFound.actions.home')}
                </Button>
              </Link>
              
              <Link to="/hub">
                <Button variant="outline" className="border-white/20 text-white px-6 py-3 font-['Montserrat']">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t('notFound.actions.hub')}
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-white/60 hover:text-white px-6 py-3 font-['Montserrat']"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('notFound.actions.back')}
              </Button>
            </div>
          </Card>

          {/* Suggestions intelligentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white/80 mb-4 font-['Montserrat']">
              🚀 {t('notFound.suggestions.title')}
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/adluma">
                <Button size="sm" variant="outline" className="border-white/20 text-white/80 hover:text-white">
                  {t('notFound.suggestions.adluma')}
                </Button>
              </Link>
              <Link to="/ila">
                <Button size="sm" variant="outline" className="border-white/20 text-white/80 hover:text-white">
                  {t('notFound.suggestions.ila')}
                </Button>
              </Link>
              <Link to="/crm-iluma">
                <Button size="sm" variant="outline" className="border-white/20 text-white/80 hover:text-white">
                  {t('notFound.suggestions.crm')}
                </Button>
              </Link>
              <Link to="/etudes-de-cas">
                <Button size="sm" variant="outline" className="border-white/20 text-white/80 hover:text-white">
                  {t('notFound.suggestions.cases')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;