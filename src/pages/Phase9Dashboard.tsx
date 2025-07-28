import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Users, Network, Brain, Share2, Lightbulb, GitBranch, Globe, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CollectiveIntelligence from '@/components/phase9/CollectiveIntelligence';
import TeamSynchronization from '@/components/phase9/TeamSynchronization';
import KnowledgeNetwork from '@/components/phase9/KnowledgeNetwork';
import CollaborativeWorkspace from '@/components/phase9/CollaborativeWorkspace';
import { ILAProvider } from '@/contexts/ILAContext';

const Phase9Dashboard = () => {
  return (
    <ILAProvider>
      <div className="min-h-screen bg-gradient-to-b from-black via-emerald-900/20 to-black">
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
                <Network className="w-8 h-8 text-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-medium text-lg">PHASE 9</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-emerald-100 to-green-100 bg-clip-text text-transparent mb-6">
                Intelligence Collective
                <br />
                <span className="text-4xl md:text-6xl">Écosystème Collaboratif</span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Révolutionnez la collaboration avec une intelligence collective avancée, 
                des réseaux de connaissances partagées et une synchronisation d'équipes en temps réel.
              </p>
            </motion.div>

            {/* Collaborative Intelligence Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="collective" className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
                  <TabsTrigger value="collective" className="data-[state=active]:bg-emerald-600">
                    <Brain className="w-4 h-4 mr-2" />
                    Intelligence
                  </TabsTrigger>
                  <TabsTrigger value="sync" className="data-[state=active]:bg-emerald-600">
                    <GitBranch className="w-4 h-4 mr-2" />
                    Synchronisation
                  </TabsTrigger>
                  <TabsTrigger value="knowledge" className="data-[state=active]:bg-emerald-600">
                    <Globe className="w-4 h-4 mr-2" />
                    Réseau Savoirs
                  </TabsTrigger>
                  <TabsTrigger value="workspace" className="data-[state=active]:bg-emerald-600">
                    <Share2 className="w-4 h-4 mr-2" />
                    Espace Collaboratif
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="collective">
                  <CollectiveIntelligence />
                </TabsContent>

                <TabsContent value="sync">
                  <TeamSynchronization />
                </TabsContent>

                <TabsContent value="knowledge">
                  <KnowledgeNetwork />
                </TabsContent>

                <TabsContent value="workspace">
                  <CollaborativeWorkspace />
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

export default Phase9Dashboard;