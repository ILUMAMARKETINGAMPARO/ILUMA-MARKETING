import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  MapPin, 
  TrendingUp,
  Target,
  Network,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import SectionWrapper from '../foundation/SectionWrapper';
import { Button } from '@/components/ui/button';

interface ClientsSectionProps {
  selectedClients: string[];
  setSelectedClients: (selected: string[]) => void;
  onAdd: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

const ClientsSection: React.FC<ClientsSectionProps> = ({
  selectedClients,
  setSelectedClients,
  onAdd,
  onEdit,
  onRemove
}) => {
  const { clients, calculateILA, findMatches, isLoading } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = (client.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (client.sector?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || client.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'prospect': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'inactive': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <SectionWrapper
        title="Gestion des Clients"
        icon={Users}
        selectedItems={selectedClients.length}
        onAdd={onAdd}
        onEdit={onEdit}
        onRemove={onRemove}
        addLabel="Nouveau Client"
        editLabel="Modifier"
        removeLabel="Supprimer"
        headerActions={
          <div className="text-right">
            <div className="text-lg font-bold text-[#8E44FF]">
              {filteredClients.length}
            </div>
            <div className="text-xs text-white/60">Clients</div>
          </div>
        }
      >
        {/* Search and Filters */}
        <Card className="glass-effect border-white/20 p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
              <Input
                placeholder="Rechercher par nom ou secteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20 border-white/20 text-white"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-[140px] bg-black/20 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="prospect">Prospects</SelectItem>
                <SelectItem value="inactive">Inactifs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Clients List */}
        <div className="space-y-4">
          {filteredClients.map((client) => (
            <motion.div key={client.id} layout>
              <Card className={`glass-effect border-white/20 p-6 hover:border-[#8E44FF]/40 transition-colors ${
                selectedClients.includes(client.id) ? 'ring-2 ring-[#8E44FF]/50 bg-[#8E44FF]/10' : ''
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedClients.includes(client.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedClients([...selectedClients, client.id]);
                        } else {
                          setSelectedClients(selectedClients.filter(id => id !== client.id));
                        }
                      }}
                    />
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl font-['Montserrat']">
                        {(client.name || 'N').charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-white font-['Montserrat']">
                          {client.name || 'Nom non défini'}
                        </h3>
                        <Badge className={`${getStatusColor(client.status || 'inactive')} border`}>
                          {client.status || 'inactive'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-white/60 text-sm font-['Montserrat']">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{(client.address || '').split(',')[0] || 'Adresse non définie'}</span>
                        </div>
                        <span>•</span>
                        <span>Secteur: {client.sector || 'Non défini'}</span>
                        <span>•</span>
                        <span>CA: {(client.revenue || 0).toLocaleString()}€</span>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-[#FFD56B]" />
                          <span className={`font-bold ${getScoreColor(client.ilaScore?.current || 0)} font-['Montserrat']`}>
                            Score ILA™: {client.ilaScore?.current || 0}/100
                          </span>
                          <TrendingUp className={`w-4 h-4 ${(client.ilaScore?.trend || 'stable') === 'up' ? 'text-green-400' : 'text-yellow-400'}`} />
                        </div>
                        
                        <div className="flex gap-1">
                          {(client.services || []).map((service) => (
                            <Badge key={service} variant="outline" className="border-white/20 text-white/70 text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => calculateILA(client.id)}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 font-['Montserrat']"
                    >
                      <Target className="w-4 h-4 mr-1" />
                      Recalculer ILA™
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => findMatches(client.id)}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 font-['Montserrat']"
                    >
                      <Network className="w-4 h-4 mr-1" />
                      ILUMATCH™
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <Card className="glass-effect border-white/20 p-12 text-center">
            <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
              Aucun client trouvé
            </h3>
            <p className="text-white/60 font-['Montserrat']">
              Ajustez vos critères de recherche ou ajoutez un nouveau client
            </p>
          </Card>
        )}
      </SectionWrapper>
    </motion.div>
  );
};

export default ClientsSection;