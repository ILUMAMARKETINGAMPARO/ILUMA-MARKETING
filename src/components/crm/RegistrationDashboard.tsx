import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, UserPlus, Users, TrendingUp } from 'lucide-react';
import RegistrationForm from './registration/RegistrationForm';
import RegistrationList from './registration/RegistrationList';

interface RegistrationDashboardProps {
  onBack: () => void;
}

const RegistrationDashboard: React.FC<RegistrationDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      {/* Header */}
      <div className="bg-black/20 border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour au menu
            </Button>
            
            <div className="h-8 w-px bg-white/20" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-['Montserrat']">
                  Gestion des Inscriptions
                </h1>
                <p className="text-white/60 text-sm font-['Montserrat']">
                  Créer et gérer les inscriptions clients
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setActiveTab('form')}
            className="bg-green-500 hover:bg-green-600 text-white font-['Montserrat']"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Nouvelle inscription
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/20">
              <TabsTrigger 
                value="list" 
                className="flex items-center gap-2 data-[state=active]:bg-white/10 text-white"
              >
                <Users className="w-4 h-4" />
                Registre des inscriptions
              </TabsTrigger>
              <TabsTrigger 
                value="form" 
                className="flex items-center gap-2 data-[state=active]:bg-white/10 text-white"
              >
                <UserPlus className="w-4 h-4" />
                Nouvelle inscription
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              <RegistrationList />
            </TabsContent>

            <TabsContent value="form" className="space-y-6">
              <RegistrationForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDashboard;