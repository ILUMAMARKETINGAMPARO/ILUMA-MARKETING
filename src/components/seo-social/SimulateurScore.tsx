import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Zap, Mail, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SimulateurScore = () => {
  const [formData, setFormData] = useState({
    secteur: '',
    ville: '',
    site: ''
  });
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const secteurs = [
    'Restaurant/Bar', 'Coiffure/Beauté', 'Sport/Fitness', 'Santé/Médical',
    'Immobilier', 'Auto/Moto', 'Mode/Textile', 'Technologie', 'Autre'
  ];

  const calculateScore = () => {
    // Simulation d'un calcul de score SEO
    const baseScore = Math.floor(Math.random() * 40) + 20; // 20-60
    const bonus = formData.secteur ? 15 : 0;
    const cityBonus = formData.ville ? 10 : 0;
    const siteBonus = formData.site.includes('https') ? 15 : 5;
    
    const finalScore = Math.min(baseScore + bonus + cityBonus + siteBonus, 100);
    setScore(finalScore);
    setShowResults(true);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) {
      return {
        level: "Influenceur SEO 🌟",
        message: "Tu es comme un compte Instagram avec 100K+ followers ! Ton SEO est au top.",
        color: "from-green-500 to-emerald-500"
      };
    } else if (score >= 60) {
      return {
        level: "Créateur en devenir 📈",
        message: "Tu as 10K followers sur Insta mais pas assez de posts optimisés. On y travaille !",
        color: "from-blue-500 to-cyan-500"
      };
    } else if (score >= 40) {
      return {
        level: "Débutant motivé 💪",
        message: "Tu es comme un profil avec 1K followers mais aucune stratégie. Potentiel énorme !",
        color: "from-orange-500 to-yellow-500"
      };
    } else {
      return {
        level: "Compte fantôme 👻",
        message: "0 followers, 0 posts... Il est temps de commencer ton aventure SEO !",
        color: "from-red-500 to-pink-500"
      };
    }
  };

  const getAdvice = (score: number) => {
    if (score >= 80) {
      return ["Maintiens ton excellence", "Explore de nouveaux mots-clés", "Crée du contenu premium"];
    } else if (score >= 60) {
      return ["Optimise tes titres H1/H2", "Améliore la vitesse de ton site", "Crée plus de contenu local"];
    } else if (score >= 40) {
      return ["Commence par tes titres de pages", "Ajoute des descriptions attrayantes", "Inscris-toi sur Google My Business"];
    } else {
      return ["Restructure complètement ton site", "Apprends les bases du SEO", "Contacte un expert"];
    }
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
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
          Simulateur "Score SEO Social"
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Découvre ton niveau SEO à travers une logique réseaux sociaux
        </p>
      </motion.div>

      <Card className="glass-effect border-white/20 p-8 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Évalue ton potentiel SEO
                </h3>
                <p className="text-white/70">
                  3 questions pour connaître ton "niveau Instagram SEO"
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">Ton secteur d'activité</label>
                  <Select onValueChange={(value) => setFormData({...formData, secteur: value})}>
                    <SelectTrigger className="bg-black/20 border-white/20 text-white">
                      <SelectValue placeholder="Choisis ton secteur..." />
                    </SelectTrigger>
                    <SelectContent>
                      {secteurs.map((secteur) => (
                        <SelectItem key={secteur} value={secteur}>
                          {secteur}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Ta ville</label>
                  <Input
                    placeholder="Ex: Paris, Lyon, Marseille..."
                    className="bg-black/20 border-white/20 text-white placeholder-white/50"
                    value={formData.ville}
                    onChange={(e) => setFormData({...formData, ville: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Ton site web</label>
                  <Input
                    placeholder="https://monsite.fr"
                    className="bg-black/20 border-white/20 text-white placeholder-white/50"
                    value={formData.site}
                    onChange={(e) => setFormData({...formData, site: e.target.value})}
                  />
                </div>
              </div>

              <Button
                onClick={calculateScore}
                disabled={!formData.secteur || !formData.ville || !formData.site}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-full text-lg font-semibold group"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Calculer mon Score SEO
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Score Display */}
              <div className="text-center">
                <motion.div
                  className="relative inline-block mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative">
                    <span className="text-4xl font-bold text-white">{score}</span>
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse" />
                  </div>
                </motion.div>

                {score && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${getScoreMessage(score).color} bg-clip-text text-transparent`}>
                      {getScoreMessage(score).level}
                    </h3>
                    <p className="text-white/80 text-lg mb-6">
                      {getScoreMessage(score).message}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Conseils */}
              {score && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-4"
                >
                  <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Tes prochaines étapes :
                  </h4>
                  <ul className="space-y-2">
                    {getAdvice(score).map((conseil, index) => (
                      <motion.li
                        key={conseil}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.2 }}
                        className="flex items-center gap-3 text-white/80"
                      >
                        <ArrowRight className="w-4 h-4 text-purple-400" />
                        {conseil}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Email CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="border-t border-white/20 pt-6"
              >
                {!showEmailForm ? (
                  <Button
                    onClick={() => setShowEmailForm(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-full font-semibold group"
                  >
                    <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Recevoir mon plan d'action détaillé
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Input
                      placeholder="ton@email.fr"
                      className="bg-black/20 border-white/20 text-white placeholder-white/50"
                    />
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                      Envoyer mon plan personnalisé
                    </Button>
                  </div>
                )}
              </motion.div>

              {/* Reset Button */}
              <Button
                onClick={() => {
                  setShowResults(false);
                  setScore(null);
                  setShowEmailForm(false);
                  setFormData({ secteur: '', ville: '', site: '' });
                }}
                variant="ghost"
                className="w-full text-white/60 hover:text-white hover:bg-white/10"
              >
                Recommencer le test
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default SimulateurScore;