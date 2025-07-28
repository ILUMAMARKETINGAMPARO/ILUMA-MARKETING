import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { BarChart3, Users, Target, Zap, TrendingUp, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ILADashboard from '@/components/ila/ILADashboard';
import ILACalculator from '@/components/ila/ILACalculator';
import { ILAProvider } from '@/contexts/ILAContext';

const TableauDeBord = () => {
  return (
    <ILAProvider>
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
                <BarChart3 className="w-8 h-8 text-purple-400" />
                <span className="text-purple-300 font-medium text-lg">ILUMA Dashboard</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
                Tableau de Bord
                <br />
                <span className="text-4xl md:text-6xl">Intelligence Avancée</span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Pilotez vos projets avec une intelligence artificielle avancée et des analyses 
                prédictives en temps réel.
              </p>
            </motion.div>

            {/* Dashboard Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="dashboard" className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
                  <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="calculator" className="data-[state=active]:bg-purple-600">
                    <Target className="w-4 h-4 mr-2" />
                    Calculateur
                  </TabsTrigger>
                  <TabsTrigger value="team" className="data-[state=active]:bg-purple-600">
                    <Users className="w-4 h-4 mr-2" />
                    Équipe
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                  <ILADashboard />
                </TabsContent>

                <TabsContent value="calculator">
                  <ILACalculator />
                </TabsContent>

                <TabsContent value="team">
                  <Card className="glass-effect border-white/20 p-8 text-center">
                    <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">Gestion d'Équipe</h3>
                    <p className="text-white/70 mb-6">
                      Fonctionnalité de gestion d'équipe avancée à venir.
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Bientôt Disponible
                    </Button>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card className="glass-effect border-white/20 p-8 text-center">
                    <Settings className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">Paramètres Avancés</h3>
                    <p className="text-white/70 mb-6">
                      Configuration des algorithmes ILA et des interconnexions.
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <Zap className="w-4 h-4 mr-2" />
                      Configuration
                    </Button>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </ILAProvider>
  );
};

export default TableauDeBord;