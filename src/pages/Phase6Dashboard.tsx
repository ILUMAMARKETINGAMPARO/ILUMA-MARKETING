import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Zap, Settings, Link, Bell, Workflow, Cloud } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IntegrationHub from '@/components/phase6/IntegrationHub';
import WorkflowAutomation from '@/components/phase6/WorkflowAutomation';
import NotificationCenter from '@/components/phase6/NotificationCenter';
import APIConnectors from '@/components/phase6/APIConnectors';
import { ILAProvider } from '@/contexts/ILAContext';
import { InterconnectionProvider } from '@/contexts/InterconnectionContext';
import { useTranslations } from '@/hooks/useTranslations';

const Phase6Dashboard = () => {
  const { t } = useTranslations();

  return (
    <ILAProvider>
      <InterconnectionProvider>
        <div className="min-h-screen bg-gradient-to-b from-black via-indigo-900/20 to-black">
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
                <Zap className="w-8 h-8 text-indigo-400" />
                <span className="text-indigo-300 font-medium text-lg">PHASE 6</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-indigo-100 to-cyan-100 bg-clip-text text-transparent mb-6">
                Interconnexion
                <br />
                <span className="text-4xl md:text-6xl">Complète</span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Écosystème IA unifié avec synchronisation temps réel entre CRM, RivalViews™, 
                ADLUMA™, ILUMATCH™ et BlogIA pour une expérience totalement intégrée.
              </p>
            </motion.div>

            {/* Advanced Integration Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="integrations" className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
                  <TabsTrigger value="integrations" className="data-[state=active]:bg-[#8E44FF]/30">
                    <Link className="w-4 h-4 mr-2" />
                    Hub Intégration
                  </TabsTrigger>
                  <TabsTrigger value="automation" className="data-[state=active]:bg-[#8E44FF]/30">
                    <Workflow className="w-4 h-4 mr-2" />
                    Workflows IA
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:bg-[#8E44FF]/30">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="api" className="data-[state=active]:bg-[#8E44FF]/30">
                    <Cloud className="w-4 h-4 mr-2" />
                    Connecteurs API
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="integrations">
                  <IntegrationHub />
                </TabsContent>

                <TabsContent value="automation">
                  <WorkflowAutomation />
                </TabsContent>

                <TabsContent value="notifications">
                  <NotificationCenter />
                </TabsContent>

                <TabsContent value="api">
                  <APIConnectors />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>

        <Footer />
        </div>
      </InterconnectionProvider>
    </ILAProvider>
  );
};

export default Phase6Dashboard;