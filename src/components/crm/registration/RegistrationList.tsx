import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Mail, 
  Phone, 
  Building, 
  MapPin,
  Calendar,
  TrendingUp,
  Star
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';

const RegistrationList: React.FC = () => {
  const { clients } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.sector.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'prospect': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'inactive': return 'bg-red-500/20 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
    }
  };

  const getILAScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white font-['Montserrat'] mb-4">
          Registre des Inscriptions
        </h1>
        <p className="text-white/70 font-['Montserrat']">
          Gérez et consultez toutes les inscriptions clients
        </p>
      </motion.div>

      {/* Filtres et recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
              <Input
                placeholder="Rechercher par nom, email, secteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20 border-white/20 text-white"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                className="font-['Montserrat']"
              >
                Tous
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('active')}
                className="font-['Montserrat']"
              >
                Actifs
              </Button>
              <Button
                variant={statusFilter === 'prospect' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('prospect')}
                className="font-['Montserrat']"
              >
                Prospects
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Statistiques rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-4 gap-6 mb-8"
      >
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8E44FF]/20 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-[#8E44FF]" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-['Montserrat']">Total</p>
              <p className="text-white text-xl font-bold font-['Montserrat']">{clients.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-['Montserrat']">Actifs</p>
              <p className="text-white text-xl font-bold font-['Montserrat']">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-['Montserrat']">Prospects</p>
              <p className="text-white text-xl font-bold font-['Montserrat']">
                {clients.filter(c => c.status === 'prospect').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFD56B]/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#FFD56B]" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-['Montserrat']">Score ILA™ moyen</p>
              <p className="text-white text-xl font-bold font-['Montserrat']">
                {Math.round(clients.reduce((acc, c) => acc + c.ilaScore.current, 0) / clients.length) || 0}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Liste des clients */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        {filteredClients.length === 0 ? (
          <Card className="glass-effect border-white/20 p-8 text-center">
            <p className="text-white/60 font-['Montserrat']">
              Aucune inscription trouvée pour ces critères.
            </p>
          </Card>
        ) : (
          filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center text-white font-bold font-['Montserrat']">
                        {client.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white font-['Montserrat']">
                            {client.name}
                          </h3>
                          <Badge className={`text-xs ${getStatusColor(client.status)}`}>
                            {client.status}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          {client.contact.email && (
                            <div className="flex items-center gap-2 text-white/60">
                              <Mail className="w-4 h-4" />
                              <span className="font-['Montserrat']">{client.contact.email}</span>
                            </div>
                          )}
                          
                          {client.contact.phone && (
                            <div className="flex items-center gap-2 text-white/60">
                              <Phone className="w-4 h-4" />
                              <span className="font-['Montserrat']">{client.contact.phone}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 text-white/60">
                            <Building className="w-4 h-4" />
                            <span className="font-['Montserrat'] capitalize">{client.sector}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-white/60">
                            <MapPin className="w-4 h-4" />
                            <span className="font-['Montserrat']">{client.address.split(',')[1] || 'N/A'}</span>
                          </div>
                        </div>
                        
                        {client.services.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {client.services.slice(0, 3).map((service) => (
                              <Badge key={service} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {client.services.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{client.services.length - 3} autres
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-white/60 text-xs font-['Montserrat'] mb-1">Score ILA™</p>
                      <p className={`text-xl font-bold font-['Montserrat'] ${getILAScoreColor(client.ilaScore.current)}`}>
                        {client.ilaScore.current}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-white/60 text-xs font-['Montserrat'] mb-1">Revenus</p>
                      <p className="text-white text-lg font-bold font-['Montserrat']">
                        {client.revenue.toLocaleString()}€
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white hover:bg-white/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default RegistrationList;