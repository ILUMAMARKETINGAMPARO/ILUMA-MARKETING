import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Heart, ArrowRight, Zap, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
import FidelityMetrics from '@/components/fidelisation/FidelityMetrics';
import FidelityFeatures from '@/components/fidelisation/FidelityFeatures';
import NurturingInterface from '@/components/fidelisation/NurturingInterface';
import FidelityAnalytics from '@/components/fidelisation/FidelityAnalytics';

const PageFidelisationIntelligente = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-pink-400" />
              <span className="text-pink-300 font-medium text-lg">PAGE DE FIDÉLISATION INTELLIGENTE</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-6 font-['Montserrat']">
              Transformez vos visiteurs en ambassadeurs avec l'IA Iluma™
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-['Montserrat']">
              Après la conversion, il faut fidéliser. Notre Page de Fidélisation Intelligente transforme les achats ponctuels en relations durables grâce à l'IA comportementale, l'engagement personnalisé et l'automatisation éthique du nurturing.
            </p>
          </motion.div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <FidelityMetrics />
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <FidelityFeatures />
          </motion.div>

          {/* Main Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Tabs defaultValue="nurturing" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
                <TabsTrigger value="nurturing" className="data-[state=active]:bg-pink-600">
                  <Heart className="w-4 h-4 mr-2" />
                  Nurturing IA
                </TabsTrigger>
                <TabsTrigger value="segmentation" className="data-[state=active]:bg-pink-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Segmentation
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="nurturing">
                <NurturingInterface />
              </TabsContent>

              <TabsContent value="segmentation">
                <FidelityAnalytics />
              </TabsContent>

              <TabsContent value="analytics">
                <FidelityAnalytics />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Card className="glass-effect border-pink-500/30 p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-pink-400" />
                <span className="text-pink-300 font-medium">GARANTIE RÉSULTATS</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                +67% de fidélisation en 90 jours ou remboursé
              </h3>
              <p className="text-white/70 mb-6">
                Rejoignez 2,400+ entreprises qui ont transformé leurs visiteurs en clients fidèles
              </p>
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                <Zap className="w-5 h-5 mr-2" />
                Commencer la Transformation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PageFidelisationIntelligente;