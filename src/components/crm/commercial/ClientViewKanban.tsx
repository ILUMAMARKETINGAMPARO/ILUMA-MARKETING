import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  Target,
  MapPin,
  Phone,
  Mail,
  Star
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { getCollaboratorColor } from '@/utils/collaboratorColors';

const ClientViewKanban: React.FC = () => {
  const { clients, updateClient } = useCRM();
  const [draggedClient, setDraggedClient] = useState<string | null>(null);

  const columns = [
    { id: 'prospect', label: 'Prospects', color: '#FFD56B', icon: Target },
    { id: 'qualified', label: 'Qualifiés', color: '#00BFFF', icon: Users },
    { id: 'proposal', label: 'Proposition', color: '#FF8C42', icon: TrendingUp },
    { id: 'won', label: 'Gagnés', color: '#00FF88', icon: Star }
  ];

  const getClientsForStatus = (status: string) => {
    return clients.filter(client => client.status === status);
  };

  const handleDragStart = (clientId: string) => {
    setDraggedClient(clientId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedClient) {
      await updateClient(draggedClient, { status: newStatus as any });
      setDraggedClient(null);
    }
  };

  const formatRevenue = (revenue: number) => {
    return new Intl.NumberFormat('fr-CA', { 
      style: 'currency', 
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(revenue);
  };

  return (
    <div className="grid grid-cols-4 gap-4 min-h-screen">
      {columns.map(column => {
        const columnClients = getClientsForStatus(column.id);
        const IconComponent = column.icon;
        
        return (
          <div
            key={column.id}
            className="space-y-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <Card 
              className="glass-effect border-white/20 p-4 text-center"
              style={{ borderTopColor: column.color, borderTopWidth: '3px' }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <IconComponent 
                  className="w-5 h-5" 
                  style={{ color: column.color }}
                />
                <h3 className="font-bold text-white font-['Montserrat']">
                  {column.label}
                </h3>
              </div>
              <Badge 
                style={{
                  backgroundColor: `${column.color}20`,
                  color: column.color,
                  border: `1px solid ${column.color}40`
                }}
              >
                {columnClients.length} client{columnClients.length > 1 ? 's' : ''}
              </Badge>
            </Card>

            <div className="space-y-3">
              {columnClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  layout
                  draggable
                  onDragStart={() => handleDragStart(client.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <Card className="glass-effect border-white/20 p-4 hover:border-white/30 transition-all hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-white font-['Montserrat'] text-sm mb-1">
                          {client.name}
                        </h4>
                        <p className="text-white/60 text-xs">{client.sector}</p>
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: client.ilaScore.current >= 70 ? '#00FF88' : '#FFD56B' }}
                        title={`Score ILA: ${client.ilaScore.current}`}
                      />
                    </div>

                    <div className="space-y-2 mb-3">
                      {client.contact.email && (
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{client.contact.email}</span>
                        </div>
                      )}
                      
                      {client.contact.phone && (
                        <div className="flex items-center gap-2 text-xs text-white/70">
                          <Phone className="w-3 h-3" />
                          <span>{client.contact.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs">
                        <span className="text-white/60">Revenus:</span>
                        <div className="font-bold text-[#FFD56B]">
                          {formatRevenue(client.revenue)}
                        </div>
                      </div>
                      <div className="text-xs text-center">
                        <span className="text-white/60">ILA Score:</span>
                        <div className="font-bold text-[#00FF88]">
                          {client.ilaScore.current}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: `${getCollaboratorColor(client.assignedTo).primary}20`,
                          color: getCollaboratorColor(client.assignedTo).primary,
                          border: `1px solid ${getCollaboratorColor(client.assignedTo).primary}40`
                        }}
                      >
                        {client.assignedTo}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {columnClients.length === 0 && (
                <Card className="glass-effect border-white/10 border-dashed p-6 text-center">
                  <IconComponent 
                    className="w-8 h-8 mx-auto mb-2 opacity-40"
                    style={{ color: column.color }}
                  />
                  <p className="text-white/40 text-sm">
                    Aucun client
                  </p>
                </Card>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClientViewKanban;