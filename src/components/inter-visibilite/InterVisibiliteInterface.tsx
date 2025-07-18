import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Users, Network } from 'lucide-react';
import NetworkAnalysis from './NetworkAnalysis';
import PartnerTypes from './PartnerTypes';
import NetworkDashboard from './NetworkDashboard';

const InterVisibiliteInterface: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Tabs defaultValue="strategy" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
          <TabsTrigger value="strategy" className="data-[state=active]:bg-cyan-600">
            <Sparkles className="w-4 h-4 mr-2" />
            Stratégie
          </TabsTrigger>
          <TabsTrigger value="partners" className="data-[state=active]:bg-cyan-600">
            <Users className="w-4 h-4 mr-2" />
            Partenaires
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-cyan-600">
            <Network className="w-4 h-4 mr-2" />
            Réseau
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strategy">
          <NetworkAnalysis />
        </TabsContent>

        <TabsContent value="partners">
          <PartnerTypes />
        </TabsContent>

        <TabsContent value="network">
          <NetworkDashboard />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default InterVisibiliteInterface;