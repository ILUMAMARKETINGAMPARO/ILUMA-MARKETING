import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Filter, 
  Search, 
  TrendingUp, 
  Users, 
  Target,
  Zap,
  MapPin,
  BarChart3,
  ArrowUpDown,
  Eye,
  Play,
  Sparkles
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { ClientFiche } from '@/types/crm';
import EnhancedClientCard from './intelligent/EnhancedClientCard';
import AIInsightsSidebar from './intelligent/AIInsightsSidebar';
import LiloIntegration from '../lilo/LiloIntegration';

interface IntelligentCRMDashboardProps {
  onBack: () => void;
}

const IntelligentCRMDashboard: React.FC<IntelligentCRMDashboardProps> = ({ onBack }) => {
  const { clients, user, calculateILA, findMatches } = useCRM();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedResponsible, setSelectedResponsible] = useState<string>('all');
  const [ilaScoreRange, setIlaScoreRange] = useState<[number, number]>([0, 100]);
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'cards' | 'kanban' | 'map'>('cards');
  const [sortBy, setSortBy] = useState<'name' | 'ila_score' | 'revenue' | 'date'>('ila_score');
  const [draggedClient, setDraggedClient] = useState<string | null>(null);

  // Filtrage intelligent des clients
  const filteredClients = clients.filter(client => {
    if (searchQuery && !client.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !client.sector.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedStatus !== 'all' && client.status !== selectedStatus) return false;
    if (selectedResponsible !== 'all' && client.assignedTo !== selectedResponsible) return false;
    if ((client.ilaScore?.current ?? 0) < ilaScoreRange[0] || (client.ilaScore?.current ?? 0) > ilaScoreRange[1]) return false;
    return true;
  });

  // Tri intelligent
  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'ila_score':
        return (b.ilaScore?.current ?? 0) - (a.ilaScore?.current ?? 0);
      case 'revenue':
        return b.revenue - a.revenue;
      case 'date':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      default:
        return 0;
    }
  });

  // Actions groupées intelligentes
  const handleBulkAction = async (action: string) => {
    if (selectedClients.length === 0) return;

    switch (action) {
      case 'calculate_ila':
        for (const clientId of selectedClients) {
          await calculateILA(clientId);
        }
        break;
      case 'find_matches':
        for (const clientId of selectedClients) {
          await findMatches(clientId);
        }
        break;
      case 'export':
        // Logique d'export des clients sélectionnés
        console.log('Export clients:', selectedClients);
        break;
    }
  };

  // Drag & Drop pour réorganisation
  const handleDragStart = (clientId: string) => {
    setDraggedClient(clientId);
  };

  const handleDragEnd = () => {
    setDraggedClient(null);
  };

  // Colonnes Kanban pour le drag & drop
  const kanbanColumns = [
    { id: 'prospect', title: 'Prospects', color: '#FFD56B', clients: sortedClients.filter(c => c.status === 'prospect') },
    { id: 'active', title: 'Actifs', color: '#00FF88', clients: sortedClients.filter(c => c.status === 'active') },
    { id: 'inactive', title: 'Inactifs', color: '#FF6B6B', clients: sortedClients.filter(c => c.status === 'inactive') },
    { id: 'archived', title: 'Archivés', color: '#8E44FF', clients: sortedClients.filter(c => c.status === 'archived') }
  ];

  // Responsables uniques pour les filtres
  const uniqueResponsibles = [...new Set(clients.map(c => c.assignedTo))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      {/* Header Enhanced */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="border-white/20 text-white hover:bg-white/10"
              >
                ← Retour
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-[#8E44FF] animate-pulse" />
                <span className="text-xl font-bold text-white font-['Montserrat']">
                  🧠 CRM Visuel Intelligent
                </span>
              </div>
              <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30">
                Phase 5 Active
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-white/60">
                {filteredClients.length} / {clients.length} clients
              </div>
              <Switch
                checked={showAIInsights}
                onCheckedChange={setShowAIInsights}
                className="data-[state=checked]:bg-[#8E44FF]"
              />
              <span className="text-sm text-white/80">IA Insights</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Panneau Principal */}
          <div className={`flex-1 space-y-6 transition-all duration-300 ${showAIInsights ? 'mr-80' : ''}`}>
            
            {/* Barre d'outils et filtres */}
            <Card className="glass-effect border-white/20 p-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {/* Recherche intelligente */}
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    placeholder="Rechercher par nom, secteur, ou IA..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/20 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                {/* Filtres dynamiques */}
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40 bg-black/20 border-white/20 text-white">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="prospect">Prospects</SelectItem>
                    <SelectItem value="active">Actifs</SelectItem>
                    <SelectItem value="inactive">Inactifs</SelectItem>
                    <SelectItem value="archived">Archivés</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedResponsible} onValueChange={setSelectedResponsible}>
                  <SelectTrigger className="w-40 bg-black/20 border-white/20 text-white">
                    <SelectValue placeholder="Responsable" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    <SelectItem value="all">Tous</SelectItem>
                    {uniqueResponsibles.map(responsible => (
                      <SelectItem key={responsible} value={responsible}>
                        {responsible}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40 bg-black/20 border-white/20 text-white">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    <SelectItem value="ila_score">Score ILA™</SelectItem>
                    <SelectItem value="name">Nom</SelectItem>
                    <SelectItem value="revenue">Revenus</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions groupées */}
              {selectedClients.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex gap-2 p-3 bg-[#8E44FF]/10 rounded-lg border border-[#8E44FF]/20"
                >
                  <span className="text-sm text-white/80 mr-4">
                    {selectedClients.length} client(s) sélectionné(s)
                  </span>
                  <Button size="sm" onClick={() => handleBulkAction('calculate_ila')} 
                          className="bg-[#8E44FF] hover:bg-[#8E44FF]/80">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Calculer ILA™
                  </Button>
                  <Button size="sm" onClick={() => handleBulkAction('find_matches')}
                          className="bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black">
                    <Target className="w-4 h-4 mr-1" />
                    ILUMATCH™
                  </Button>
                  <Button size="sm" onClick={() => handleBulkAction('export')}
                          variant="outline" className="border-white/20 text-white">
                    Export
                  </Button>
                </motion.div>
              )}
            </Card>

            {/* Modes de visualisation */}
            <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
              <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-white/10">
                <TabsTrigger value="cards" className="data-[state=active]:bg-[#8E44FF]/20">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Cartes
                </TabsTrigger>
                <TabsTrigger value="kanban" className="data-[state=active]:bg-[#8E44FF]/20">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Kanban
                </TabsTrigger>
                <TabsTrigger value="map" className="data-[state=active]:bg-[#8E44FF]/20">
                  <MapPin className="w-4 h-4 mr-2" />
                  Carte
                </TabsTrigger>
              </TabsList>

              {/* Vue Cartes */}
              <TabsContent value="cards" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {sortedClients.map((client) => (
                      <motion.div
                        key={client.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <EnhancedClientCard
                          client={client}
                          isSelected={selectedClients.includes(client.id)}
                          onSelect={(selected) => {
                            if (selected) {
                              setSelectedClients(prev => [...prev, client.id]);
                            } else {
                              setSelectedClients(prev => prev.filter(id => id !== client.id));
                            }
                          }}
                          onActionTrigger={(action) => {
                            console.log(`Action ${action} on client ${client.id}`);
                          }}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>

              {/* Vue Kanban avec Drag & Drop */}
              <TabsContent value="kanban" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {kanbanColumns.map((column) => (
                    <Card key={column.id} className="glass-effect border-white/20 p-4 min-h-[600px]">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: column.color }}
                        />
                        <h3 className="font-semibold text-white font-['Montserrat']">
                          {column.title}
                        </h3>
                        <Badge variant="outline" className="ml-auto text-white/60">
                          {column.clients.length}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        {column.clients.map((client) => (
                          <motion.div
                            key={client.id}
                            layout
                            draggable
                            onDragStart={() => handleDragStart(client.id)}
                            onDragEnd={handleDragEnd}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <EnhancedClientCard
                              client={client}
                              isSelected={selectedClients.includes(client.id)}
                              onSelect={(selected) => {
                                if (selected) {
                                  setSelectedClients(prev => [...prev, client.id]);
                                } else {
                                  setSelectedClients(prev => prev.filter(id => id !== client.id));
                                }
                              }}
                              onActionTrigger={(action) => {
                                console.log(`Action ${action} on client ${client.id}`);
                              }}
                              compact
                            />
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Vue Carte - Intégration avec RivalViews™ */}
              <TabsContent value="map" className="mt-6">
                <Card className="glass-effect border-white/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white font-['Montserrat']">
                      Vue Géographique - Synchronisé avec RivalViews™
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => window.open('/rival-views', '_blank')}
                        className="bg-[#8E44FF] hover:bg-[#8E44FF]/80"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        RivalViews™
                      </Button>
                      <Button
                        onClick={() => window.open('/rival-views?mode=analysis', '_blank')}
                        className="bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Analyse Terrain
                      </Button>
                    </div>
                  </div>
                  <div className="h-96 bg-black/20 rounded-lg border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-[#8E44FF] mx-auto mb-4" />
                      <p className="text-white/80 mb-4">
                        Vue carte interactive avec {filteredClients.length} clients
                      </p>
                      <p className="text-sm text-white/60">
                        Synchronisation bidirectionnelle avec RivalViews™ Intelligence
                      </p>
                      <div className="mt-4 flex justify-center gap-4">
                        <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border border-[#8E44FF]/30">
                          RivalViews™ Sync Active
                        </Badge>
                        <Badge className="bg-[#FFD56B]/20 text-[#FFD56B] border border-[#FFD56B]/30">
                          Données Temps Réel
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar IA Insights */}
          <AnimatePresence>
            {showAIInsights && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="fixed right-0 top-16 bottom-0 w-80 z-20"
              >
                <AIInsightsSidebar
                  clients={filteredClients}
                  selectedClients={selectedClients}
                  onClose={() => setShowAIInsights(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Intégration LILO™ Contextuelle */}
        <LiloIntegration
          context="crm"
          currentSection={viewMode}
          onSuggestion={(suggestion) => {
            console.log('LILO™ Suggestion:', suggestion);
          }}
        />
      </div>
    </div>
  );
};

export default IntelligentCRMDashboard;