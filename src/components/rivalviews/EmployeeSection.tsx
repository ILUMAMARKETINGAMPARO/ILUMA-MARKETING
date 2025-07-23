import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LogOut, 
  Search, 
  MapPin, 
  Users2, 
  BarChart3, 
  FileText, 
  Target,
  TrendingUp,
  Bot,
  Crown
} from 'lucide-react';
import ProspectionModule from './ProspectionModule';
import BusinessTable from './BusinessTable';
import { RivalBusiness } from '@/types/rivalviews.ts';
import BusinessComparison from './BusinessComparison';
import CollaborativeNotes from './CollaborativeNotes';
import MapListToggle from './MapListToggle';

interface EmployeeSectionProps {
  onLogout: () => void;
}

const EmployeeSection: React.FC<EmployeeSectionProps> = ({ onLogout }) => {
  const { user, signOut, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('prospection');
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);

  // Mock data pour la demo
  const mockBusinesses: RivalBusiness[] = [
    {
      id: '1',
      name: 'Restaurant Le Gourmet',
      city: 'Montréal',
      sector: 'Restaurant',
      address: '123 rue Sainte-Catherine, Montréal',
      lat: 45.5017,
      lng: -73.5673,
      ilaScore: 85,
      organicTraffic: 15420,
      indexedKeywords: 245,
      reviewCount: 128,
      googleRating: 4.6,
      serpRank: 3,
      isSponsored: false,
      source: 'GMB' as const,
      phone: '(514) 123-4567',
      website: 'https://legourmet.ca',
      status: 'prospect' as const,
      potential: 'high' as const,
      isChain: false,
      top10Keywords: 45,
      backlinks: 1250,
      totalComments: 45,
      hasPhotos: true
    },
    {
      id: '2', 
      name: 'Meubles Design Plus',
      city: 'Laval',
      sector: 'Meubles',
      address: '456 boul. des Laurentides, Laval',
      lat: 45.6066,
      lng: -73.7124,
      ilaScore: 72,
      organicTraffic: 8930,
      indexedKeywords: 156,
      reviewCount: 89,
      googleRating: 4.3,
      serpRank: 7,
      isSponsored: true,
      source: 'SEO' as const,
      phone: '(450) 987-6543',
      website: 'https://meublesdesignplus.ca',
      status: 'contacted' as const,
      potential: 'medium' as const,
      isChain: false,
      top10Keywords: 23,
      backlinks: 890,
      totalComments: 23,
      hasPhotos: false
    }
  ];

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const tabs = [
    {
      id: 'prospection',
      label: 'Prospection IA',
      icon: Bot,
      description: 'Module de prospection intelligent'
    },
    {
      id: 'table',
      label: 'Tableau Entreprises',
      icon: BarChart3,
      description: 'Liste et filtres des prospects'
    },
    {
      id: 'map',
      label: 'Carte Interactive',
      icon: MapPin,
      description: 'Visualisation géographique'
    },
    {
      id: 'comparison',
      label: 'Comparatif A-à-1',
      icon: Target,
      description: 'Analyse comparative détaillée'
    },
    {
      id: 'notes',
      label: 'Notes Collaboratives',
      icon: FileText,
      description: 'Annotations et suivi équipe'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0E] via-[#1a1a2e] to-[#16213e]">
      {/* Header Employé */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-[#8E44FF]/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  RevolveViews™ Employé
                </h1>
                <p className="text-white/60 text-sm">
                  Prospection intelligente • {profile?.role || 'Employé'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">
                  {profile?.first_name || user?.email?.split('@')[0] || 'Employé'}
                </p>
                <Badge variant="secondary" className="bg-[#8E44FF]/20 text-[#8E44FF]">
                  {profile?.role || 'Employé'}
                </Badge>
              </div>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Navigation Onglets */}
            <TabsList className="grid w-full grid-cols-5 bg-black/40 backdrop-blur-xl">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-[#8E44FF]/20 data-[state=active]:text-[#8E44FF]"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Contenu des Onglets */}
            <AnimatePresence mode="wait">
              <TabsContent value="prospection" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl mb-4">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Bot className="w-5 h-5 text-[#8E44FF]" />
                        Module de Prospection IA
                      </CardTitle>
                      <p className="text-white/60">
                        Recherche géosectorielle intelligent avec scoring ILA™
                      </p>
                    </CardHeader>
                  </Card>
                  <ProspectionModule />
                </motion.div>
              </TabsContent>

              <TabsContent value="table" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl mb-4">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#8E44FF]" />
                        Tableau de Prospection
                      </CardTitle>
                      <p className="text-white/60">
                        Liste triable et filtrable des entreprises prospects
                      </p>
                    </CardHeader>
                  </Card>
                  <BusinessTable />
                </motion.div>
              </TabsContent>

              <TabsContent value="map" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapListToggle
                    businesses={mockBusinesses}
                    selectedBusiness={selectedBusiness}
                    onBusinessClick={setSelectedBusiness}
                    onCompareClick={(business) => console.log('Compare:', business)}
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl mb-4">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#8E44FF]" />
                        Comparatif A-à-1
                      </CardTitle>
                      <p className="text-white/60">
                        Analyse comparative détaillée avec 12 variables
                      </p>
                    </CardHeader>
                  </Card>
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-[#8E44FF] mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Comparatif A-à-1</h3>
                    <p className="text-white/60">
                      Module de comparaison détaillée en développement
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl mb-4">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#8E44FF]" />
                        Notes Collaboratives IA
                      </CardTitle>
                      <p className="text-white/60">
                        Annotations partagées et suivi équipe avec suggestions IA
                      </p>
                    </CardHeader>
                  </Card>
                  <CollaborativeNotes />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeSection;