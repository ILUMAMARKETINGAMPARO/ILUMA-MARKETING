import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import BlogIntelligentContent from '@/components/blog/BlogIntelligentContent';
import { motion } from 'framer-motion';

const BlogIntelligent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#8E44FF]/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-[#FFD56B]/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            />
          </div>
          
          <BlogIntelligentContent />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIntelligent;