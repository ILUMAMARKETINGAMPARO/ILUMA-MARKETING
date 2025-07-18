import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Zap,
  Users,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { getCollaboratorColor } from '@/utils/collaboratorColors';

const GeographicView: React.FC = () => {
  const { clients } = useCRM();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'heatmap' | 'clusters' | 'density'>('heatmap');

  // Geographic zones simulation
  const zones = [
    { 
      id: 'montreal', 
      name: 'Montréal Centre',
      clients: clients.filter(c => c.address.includes('Montréal')),
      color: '#8E44FF',
      revenue: 25600,
      potential: 85
    },
    { 
      id: 'laval', 
      name: 'Laval',
      clients: clients.filter(c => c.address.includes('Laval')),
      color: '#FFD56B',
      revenue: 18400,
      potential: 72
    },
    { 
      id: 'longueuil', 
      name: 'Longueuil',
      clients: [],
      color: '#00FF88',
      revenue: 0,
      potential: 90
    }
  ];

  const totalRevenue = zones.reduce((sum, zone) => sum + zone.revenue, 0);
  const averageILA = Math.round(clients.reduce((sum, c) => sum + c.ilaScore.current, 0) / clients.length) || 0;

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white font-['Montserrat']">
          Vue Géographique Interactive
        </h3>
        <div className="flex gap-2">
          {['heatmap', 'clusters', 'density'].map((mode) => (
            <Button
              key={mode}
              size="sm"
              variant={viewMode === mode ? 'default' : 'outline'}
              onClick={() => setViewMode(mode as any)}
              className={viewMode === mode ? 'bg-[#8E44FF] hover:bg-[#8E44FF]/80' : 'border-white/20 text-white'}
            >
              {mode === 'heatmap' ? 'Heatmap' : mode === 'clusters' ? 'Clusters' : 'Densité'}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[#8E44FF]" />
            <div>
              <div className="text-2xl font-bold text-white">{clients.length}</div>
              <div className="text-white/60 text-sm">Clients Total</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-[#FFD56B]" />
            <div>
              <div className="text-2xl font-bold text-white">{totalRevenue.toLocaleString()}€</div>
              <div className="text-white/60 text-sm">CA Géographique</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-[#00FF88]" />
            <div>
              <div className="text-2xl font-bold text-white">{averageILA}/100</div>
              <div className="text-white/60 text-sm">ILA™ Moyen</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-[#FF8C42]" />
            <div>
              <div className="text-2xl font-bold text-white">{zones.length}</div>
              <div className="text-white/60 text-sm">Zones Actives</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Simulation */}
        <div className="lg:col-span-2">
          <Card className="glass-effect border-white/20 p-6 h-96">
            <div className="relative w-full h-full bg-gradient-to-br from-black/40 via-purple-900/20 to-black/40 rounded-lg overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 w-full h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-white/10"></div>
                  ))}
                </div>
              </div>

              {/* Zone Overlays */}
              {zones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className={`absolute rounded-full cursor-pointer transition-all duration-300 ${
                    selectedZone === zone.id ? 'ring-4 ring-white/30' : ''
                  }`}
                  style={{
                    backgroundColor: `${zone.color}40`,
                    border: `2px solid ${zone.color}`,
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`,
                    width: `${Math.max(60, zone.clients.length * 20)}px`,
                    height: `${Math.max(60, zone.clients.length * 20)}px`
                  }}
                  onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white font-bold text-sm">{zone.clients.length}</div>
                      <div className="text-white/80 text-xs">clients</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Individual Client Markers */}
              {clients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="absolute w-4 h-4 rounded-full cursor-pointer hover:scale-125 transition-transform"
                  style={{
                    backgroundColor: getCollaboratorColor(client.assignedTo).primary,
                    left: `${25 + (index % 6) * 12}%`,
                    top: `${35 + Math.floor(index / 6) * 15}%`,
                    boxShadow: `0 0 10px ${getCollaboratorColor(client.assignedTo).primary}40`
                  }}
                  title={`${client.name} - Score ILA™: ${client.ilaScore.current}`}
                />
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
                <div className="text-white text-xs font-bold mb-2">Légende</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8E44FF]"></div>
                    <span className="text-white/80 text-xs">Zones d'activité</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FFD56B]"></div>
                    <span className="text-white/80 text-xs">Clients individuels</span>
                  </div>
                </div>
              </div>

              {/* View Mode Indicator */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                  Mode: {viewMode}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Zone Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white font-['Montserrat']">Zones Géographiques</h4>
          
          {zones.map((zone) => (
            <motion.div
              key={zone.id}
              layout
              className={`cursor-pointer transition-all duration-300 ${
                selectedZone === zone.id ? 'scale-105' : ''
              }`}
              onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
            >
              <Card className={`glass-effect p-4 ${
                selectedZone === zone.id 
                  ? 'border-white/40 bg-white/5' 
                  : 'border-white/20 hover:border-white/30'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                  <h5 className="font-semibold text-white font-['Montserrat']">
                    {zone.name}
                  </h5>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Clients</span>
                    <span className="text-white font-bold">{zone.clients.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Revenus</span>
                    <span className="text-[#FFD56B] font-bold">{zone.revenue.toLocaleString()}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Potentiel</span>
                    <span className="text-[#00FF88] font-bold">{zone.potential}%</span>
                  </div>
                </div>

                {selectedZone === zone.id && zone.clients.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-3 border-t border-white/10"
                  >
                    <div className="space-y-2">
                      <div className="text-xs text-white/60 font-bold">CLIENTS DANS CETTE ZONE</div>
                      {zone.clients.map((client) => (
                        <div key={client.id} className="flex items-center justify-between text-xs">
                          <span className="text-white">{client.name}</span>
                          <Badge 
                            className="text-[10px]"
                            style={{
                              backgroundColor: getCollaboratorColor(client.assignedTo).bg,
                              color: getCollaboratorColor(client.assignedTo).text
                            }}
                          >
                            {client.ilaScore.current}/100
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              className="w-full bg-[#8E44FF] hover:bg-[#8E44FF]/80"
              onClick={() => console.log('Analyzer la zone')}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Analyser Zone Sélectionnée
            </Button>
            <Button 
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
              onClick={() => console.log('Exporter carte')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Exporter Carte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicView;