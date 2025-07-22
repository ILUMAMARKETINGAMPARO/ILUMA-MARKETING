import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Search, Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SEOHubCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <Card className="glass-effect border-purple-500/30 p-6 group hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4">
            <Instagram className="w-8 h-8 text-purple-400" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Search className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-100 transition-colors">
                  Module SEO x Réseaux
                </h3>
                <p className="text-purple-300 text-sm">Formation interactive</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-xs font-medium">
              Gratuit
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 mb-6 leading-relaxed">
            Comprends le SEO comme si tu étais sur Instagram ! Module pédagogique qui explique 
            le référencement avec des comparaisons réseaux sociaux simples et efficaces.
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {[
              "4 comparaisons visuelles SEO/Social",
              "Étude de cas réelle (+47% trafic)",
              "Simulateur de score interactif",
              "Guide SEO téléchargeable"
            ].map((feature, index) => (
              <div key={feature} className="flex items-center gap-2 text-white/70 text-sm">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link to="/comprendre-le-seo">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group/btn">
              <Sparkles className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
              Commencer le module
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </Card>
    </motion.div>
  );
};

export default SEOHubCard;