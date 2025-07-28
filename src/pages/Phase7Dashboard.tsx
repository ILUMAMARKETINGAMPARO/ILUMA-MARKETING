import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { MessageCircle, Bell, Users, Bot, Zap, Activity, Radio, Wifi, Shield, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RealTimeNotifications from '@/components/phase7/RealTimeNotifications';
import IntelligentChat from '@/components/phase7/IntelligentChat';
import SmartAlerts from '@/components/phase7/SmartAlerts';
import CommunicationHub from '@/components/phase7/CommunicationHub';
import SecurityMonitor from '@/components/phase7/SecurityMonitor';
import PerformanceOptimizer from '@/components/phase7/PerformanceOptimizer';
import { ILAProvider } from '@/contexts/ILAContext';
import { useLanguage } from '@/hooks/useLanguage';

const Phase7Dashboard = () => {
  const { t } = useLanguage();

  return (
    <ILAProvider>
      <div className="min-h-screen bg-gradient-to-b from-black via-green-900/20 to-black">
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
                <Radio className="w-8 h-8 text-green-400 animate-pulse" />
                <span className="text-green-300 font-medium text-lg">PHASE 7</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-green-100 to-cyan-100 bg-clip-text text-transparent mb-6">
                Sécurité & Performance
                <br />
                <span className="text-4xl md:text-6xl">Production Ready</span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                Système Iluma™ sécurisé, optimisé et prêt pour la production avec monitoring temps réel, 
                protection avancée et performance optimale.
              </p>
            </motion.div>

            {/* Real-Time Communication Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="security" className="space-y-8">
                <TabsList className="grid w-full grid-cols-6 bg-black/40 border border-white/20">
                  <TabsTrigger value="security" className="data-[state=active]:bg-green-600">
                    <Shield className="w-4 h-4 mr-2" />
                    Sécurité
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="data-[state=active]:bg-green-600">
                    <Gauge className="w-4 h-4 mr-2" />
                    Performance
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:bg-green-600">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="data-[state=active]:bg-green-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat IA
                  </TabsTrigger>
                  <TabsTrigger value="alerts" className="data-[state=active]:bg-green-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Alertes
                  </TabsTrigger>
                  <TabsTrigger value="communication" className="data-[state=active]:bg-green-600">
                    <Wifi className="w-4 h-4 mr-2" />
                    Communication
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="security">
                  <SecurityMonitor />
                </TabsContent>

                <TabsContent value="performance">
                  <PerformanceOptimizer />
                </TabsContent>

                <TabsContent value="notifications">
                  <RealTimeNotifications />
                </TabsContent>

                <TabsContent value="chat">
                  <IntelligentChat />
                </TabsContent>

                <TabsContent value="alerts">
                  <SmartAlerts />
                </TabsContent>

                <TabsContent value="communication">
                  <CommunicationHub />
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

export default Phase7Dashboard;
