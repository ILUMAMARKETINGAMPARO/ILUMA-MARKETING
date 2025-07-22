import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SEOModuleLink = () => {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to="/comprendre-le-seo"
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl text-white/90 hover:text-white hover:border-purple-400 transition-all duration-300 group backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Comprendre le SEO</span>
        </div>
        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
      </Link>
      
      {/* Halo Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </motion.div>
  );
};

export default SEOModuleLink;