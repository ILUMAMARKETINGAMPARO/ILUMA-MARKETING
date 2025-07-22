import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Mail, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const SEOCallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -50]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const benefits = [
    "Guide SEO visuel de 20 pages",
    "Checklist d'optimisation complète",
    "Templates de titres accrocheurs",
    "Audit SEO gratuit personnalisé"
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-4xl mx-auto px-4"
      >
        <Card className="glass-effect border-white/20 p-12 text-center relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Download className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                Prêt à dominer Google comme un pro des réseaux ?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Reçois notre guide complet pour appliquer la logique des réseaux sociaux à ton SEO
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-4 mb-12"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-left bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Email Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="ton@email.fr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-black/20 border-white/20 text-white placeholder-white/50 focus:border-purple-400"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 group"
                    >
                      <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Recevoir
                    </Button>
                  </div>
                  <p className="text-white/60 text-sm">
                    Pas de spam, juste du contenu de qualité. Désabonnement en 1 clic.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-500/20 border border-green-500/30 rounded-lg p-6"
                >
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-300 font-semibold">
                    Parfait ! Vérifie ta boîte mail 📧
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    Ton guide SEO arrive dans quelques minutes
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-white/20"
            >
              <p className="text-white/70 mb-4">
                Besoin d'aide personnalisée ?
              </p>
              <Button
                variant="ghost"
                className="text-purple-300 hover:text-white hover:bg-purple-500/20 group"
                onClick={() => {
                  // Navigate to contact page
                  window.location.href = '/contact-adaptatif';
                }}
              >
                Parler à un expert SEO
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Floating CTA (Sticky) */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => {
            document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6 py-3 shadow-lg hover:shadow-purple-500/25 group"
        >
          <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
          Guide gratuit
        </Button>
      </motion.div>
    </section>
  );
};

export default SEOCallToAction;