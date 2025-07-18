import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  TrendingUp,
  Target,
  Network
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';

const ClientsModule = () => {
  const { clients, calculateILA, findMatches, isLoading } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.sector.toLowerCase().includes(searchTerm.toLowerCase());
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
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[#8E44FF]" />
            <h2 className="text-2xl font-bold text-white font-['Montserrat']">
              Fiches Clients Enrichies
            </h2>
          </div>
          <Button className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] font-['Montserrat']">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Client
          </Button>
        </div>

        {/* Search and Filters */}
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
          <div className="flex gap-2">
            {['all', 'active', 'prospect', 'inactive'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={selectedFilter === filter 
                  ? 'bg-[#8E44FF] text-white' 
                  : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                {filter === 'all' ? 'Tous' : filter}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-['Montserrat']">
                    {client.name.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white font-['Montserrat']">
                      {client.name}
                    </h3>
                    <Badge className={`${getStatusColor(client.status)} border`}>
                      {client.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/60 text-sm font-['Montserrat']">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{client.address.split(',')[0]}</span>
                    </div>
                    <span>•</span>
                    <span>Secteur: {client.sector}</span>
                    <span>•</span>
                    <span>CA: {client.revenue.toLocaleString()}€</span>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#FFD56B]" />
                      <span className={`font-bold ${getScoreColor(client.ilaScore.current)} font-['Montserrat']`}>
                        Score ILA™: {client.ilaScore.current}/100
                      </span>
                      <TrendingUp className={`w-4 h-4 ${client.ilaScore.trend === 'up' ? 'text-green-400' : 'text-yellow-400'}`} />
                    </div>
                    
                    <div className="flex gap-1">
                      {client.services.map((service) => (
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
                
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
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
    </motion.div>
  );
};

export default ClientsModule;
