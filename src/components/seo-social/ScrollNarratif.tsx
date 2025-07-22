import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hash, Heart, Share2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ScrollNarratif = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const slides = [
    {
      icon: FileText,
      title: "Publier = Créer du contenu",
      subtitle: "Une vidéo TikTok = Une page web",
      description: "Comme tu structures tes posts avec du bon contenu, ton site doit avoir des pages bien organisées avec titres, textes et images.",
      color: "from-blue-500 to-cyan-500",
      socialExample: "📱 Post Instagram bien fait",
      seoExample: "🌐 Page web bien structurée"
    },
    {
      icon: Hash,
      title: "Hashtag = Mot-clé SEO",
      subtitle: "#fitness = 'coach sportif Paris'",
      description: "Tes hashtags aident à être trouvé sur Insta. Les mots-clés dans tes titres H1/H2 aident Google à te trouver.",
      color: "from-purple-500 to-pink-500",
      socialExample: "#fitness #motivation #sport",
      seoExample: "Coach sportif à Paris | Fitness"
    },
    {
      icon: Heart,
      title: "Likes = Clics sur Google",
      subtitle: "Plus de likes = Plus de clics",
      description: "Un post qui reçoit beaucoup de likes est populaire. Une page qui reçoit beaucoup de clics remonte dans Google.",
      color: "from-pink-500 to-red-500",
      socialExample: "❤️ 1,2K likes sur ton post",
      seoExample: "🖱️ 1,2K clics depuis Google"
    },
    {
      icon: Share2,
      title: "Partages = Backlinks",
      subtitle: "Être mentionné = Être recommandé",
      description: "Quand d'autres comptes partagent ton contenu, tu gagnes en crédibilité. Pareil pour les liens vers ton site !",
      color: "from-green-500 to-emerald-500",
      socialExample: "↗️ Story partagée 50 fois",
      seoExample: "🔗 50 sites qui parlent de toi"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div id="scroll-narratif" ref={containerRef} className="py-20">
      <motion.div
        style={{ y }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
          4 comparaisons qui vont tout changer
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Découvre comment le SEO fonctionne exactement comme tes réseaux sociaux préférés
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Mobile-style container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-2 border border-white/10">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
            
            {/* Slide Content */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="p-8"
            >
              <Card className="glass-effect border-white/20 p-8 text-center">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${slides[currentSlide].color} flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {React.createElement(slides[currentSlide].icon, { className: "w-8 h-8 text-white" })}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-lg text-purple-300 mb-6">
                  {slides[currentSlide].subtitle}
                </p>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  {slides[currentSlide].description}
                </p>

                {/* Comparison Examples */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
                    <h4 className="text-purple-300 font-semibold mb-2">Réseaux Sociaux</h4>
                    <p className="text-white/90">{slides[currentSlide].socialExample}</p>
                  </div>
                  <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                    <h4 className="text-green-300 font-semibold mb-2">SEO</h4>
                    <p className="text-white/90">{slides[currentSlide].seoExample}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                className="text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-purple-400 w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                className="text-white hover:bg-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollNarratif;