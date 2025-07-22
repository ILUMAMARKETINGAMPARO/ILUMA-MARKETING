import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Search, Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const EtudeCasKatz = () => {
  const [activeView, setActiveView] = useState<'avant' | 'apres'>('avant');

  const stats = {
    avant: {
      clics: 1250,
      position: 15,
      mots_cles: 2,
      trafic: 100
    },
    apres: {
      clics: 1838,
      position: 1,
      mots_cles: 5,
      trafic: 147
    }
  };

  const currentStats = stats[activeView];
  const improvement = {
    clics: '+47%',
    position: '1ère position',
    mots_cles: '+150%',
    trafic: '+47%'
  };

  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
          Exemple concret : Katz Sport
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Comment nous avons propulsé cette entreprise locale au sommet de Google
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Slider Comparatif */}
        <div className="space-y-8">
          {/* Toggle Buttons */}
          <div className="flex bg-black/40 rounded-full p-2 backdrop-blur-xl border border-white/10">
            <Button
              variant={activeView === 'avant' ? 'default' : 'ghost'}
              onClick={() => setActiveView('avant')}
              className={`flex-1 rounded-full transition-all duration-300 ${
                activeView === 'avant' 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Avant SEO
            </Button>
            <Button
              variant={activeView === 'apres' ? 'default' : 'ghost'}
              onClick={() => setActiveView('apres')}
              className={`flex-1 rounded-full transition-all duration-300 ${
                activeView === 'apres' 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Après SEO
            </Button>
          </div>

          {/* Stats Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: activeView === 'avant' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeView === 'avant' ? 50 : -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className={`p-6 border ${
                activeView === 'avant' 
                  ? 'border-red-500/30 bg-red-500/10' 
                  : 'border-green-500/30 bg-green-500/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <Search className="w-5 h-5 text-blue-400" />
                  <span className="text-white/70">Clics mensuels</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {currentStats.clics.toLocaleString()}
                  {activeView === 'apres' && (
                    <span className="text-green-400 text-sm ml-2">
                      {improvement.clics}
                    </span>
                  )}
                </div>
              </Card>

              <Card className={`p-6 border ${
                activeView === 'avant' 
                  ? 'border-red-500/30 bg-red-500/10' 
                  : 'border-green-500/30 bg-green-500/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span className="text-white/70">Position Google</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {activeView === 'avant' ? `${currentStats.position}ème` : '1ère'}
                  {activeView === 'apres' && (
                    <span className="text-green-400 text-sm ml-2">
                      🏆 Top 1
                    </span>
                  )}
                </div>
              </Card>

              <Card className={`p-6 border ${
                activeView === 'avant' 
                  ? 'border-red-500/30 bg-red-500/10' 
                  : 'border-green-500/30 bg-green-500/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span className="text-white/70">Mots-clés Top 3</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {currentStats.mots_cles}
                  {activeView === 'apres' && (
                    <span className="text-green-400 text-sm ml-2">
                      {improvement.mots_cles}
                    </span>
                  )}
                </div>
              </Card>

              <Card className={`p-6 border ${
                activeView === 'avant' 
                  ? 'border-red-500/30 bg-red-500/10' 
                  : 'border-green-500/30 bg-green-500/10'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  <span className="text-white/70">Trafic organique</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {currentStats.trafic}%
                  {activeView === 'apres' && (
                    <span className="text-green-400 text-sm ml-2">
                      {improvement.trafic}
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Témoignage et Graphique */}
        <div className="space-y-8">
          {/* Témoignage Client */}
          <Card className="glass-effect border-white/20 p-8">
            <Quote className="w-8 h-8 text-purple-400 mb-4" />
            <motion.blockquote 
              className="text-lg text-white/90 italic mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              "Avant Iluma, on était invisibles sur Google. Maintenant, les clients nous trouvent 
              naturellement. C'est comme si on avait multiplié notre force de vente par 3 !"
            </motion.blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <div>
                <p className="text-white font-semibold">Marc Katzenberg</p>
                <p className="text-white/60 text-sm">Directeur, Katz Sport</p>
              </div>
            </div>
          </Card>

          {/* Graphique d'évolution */}
          <Card className="glass-effect border-white/20 p-6">
            <h3 className="text-white font-semibold mb-4">Évolution du trafic organique</h3>
            <div className="space-y-3">
              {[
                { mois: 'Janvier', avant: 30, apres: 30 },
                { mois: 'Février', avant: 32, apres: 35 },
                { mois: 'Mars', avant: 28, apres: 45 },
                { mois: 'Avril', avant: 35, apres: 65 },
                { mois: 'Mai', avant: 33, apres: 85 },
                { mois: 'Juin', avant: 30, apres: 100 }
              ].map((data, index) => (
                <div key={data.mois} className="flex items-center gap-4">
                  <span className="text-white/70 text-sm w-16">{data.mois}</span>
                  <div className="flex-1 flex gap-2">
                    <motion.div
                      className="bg-red-500/30 h-4 rounded"
                      style={{ width: `${data.avant}%` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.avant}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                    <motion.div
                      className="bg-green-500/50 h-4 rounded"
                      style={{ width: `${data.apres - data.avant}%` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.apres - data.avant}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                  <span className="text-white text-sm w-12">{data.apres}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EtudeCasKatz;