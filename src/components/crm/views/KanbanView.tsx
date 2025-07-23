import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ClientFiche } from '@/types/crm.ts';
import { useCRM } from '@/contexts/CRMContext';
import DynamicCard from '../foundation/DynamicCard';
import FloatingAddButton from '../foundation/FloatingAddButton';
import { Badge } from '@/components/ui/badge';

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  clients: ClientFiche[];
}

const KanbanView: React.FC = () => {
  const { clients, updateClient } = useCRM();
  const [draggedClient, setDraggedClient] = useState<string | null>(null);

  const columns: KanbanColumn[] = [
    {
      id: 'prospect',
      title: 'Prospects',
      color: '#FFD56B',
      clients: clients.filter(c => c.status === 'prospect')
    },
    {
      id: 'active',
      title: 'Clients Actifs',
      color: '#00FF88',
      clients: clients.filter(c => c.status === 'active')
    },
    {
      id: 'inactive',
      title: 'Inactifs',
      color: '#FF6B6B',
      clients: clients.filter(c => c.status === 'inactive')
    },
    {
      id: 'archived',
      title: 'Archivés',
      color: '#8E44FF',
      clients: clients.filter(c => c.status === 'archived')
    }
  ];

  const handleDragStart = (clientId: string) => {
    setDraggedClient(clientId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: ClientFiche['status']) => {
    e.preventDefault();
    if (draggedClient) {
      updateClient(draggedClient, { status: newStatus });
      setDraggedClient(null);
    }
  };

  const getRoleColor = (assignedTo: string) => {
    const roleColors: Record<string, string> = {
      'sergio': '#8E44FF',
      'amparo': '#FFD56B',
      'juan': '#00BFFF',
      'belen': '#00FF88',
      'andrea': '#FF8C42',
      'alex': '#FF6B6B'
    };
    return roleColors[assignedTo.toLowerCase()] || '#8E44FF';
  };

  return (
    <div className="h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white font-['Montserrat']">
          Vue Kanban - Pipeline Clients
        </h2>
        <div className="flex gap-2">
          {columns.map((column) => (
            <Badge key={column.id} style={{ backgroundColor: column.color, color: '#000' }}>
              {column.clients.length} {column.title}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
        {columns.map((column) => (
          <Card
            key={column.id}
            className="glass-effect border-white/20 p-4 h-fit min-h-[600px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id as ClientFiche['status'])}
          >
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
                  className="cursor-grab active:cursor-grabbing"
                >
                  <DynamicCard
                    id={client.id}
                    title={client.name}
                    subtitle={client.sector}
                    content={
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Score ILA™</span>
                          <span className="text-[#FFD56B] font-bold">
                            {client.ilaScore.current}/100
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Revenus</span>
                          <span className="text-green-400 font-bold">
                            {client.revenue.toLocaleString()}€
                          </span>
                        </div>
                      </div>
                    }
                    badges={client.services.map(service => ({
                      label: service,
                      color: 'bg-[#8E44FF]/20 text-[#8E44FF]'
                    }))}
                    assignedTo={client.assignedTo}
                    roleColor={getRoleColor(client.assignedTo)}
                    status={client.status === 'prospect' ? 'pending' : client.status === 'archived' ? 'completed' : client.status}
                    isDraggable
                  />
                </motion.div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <FloatingAddButton
        onClick={() => console.log('Add new client')}
        label="Ajouter un client"
        color="#8E44FF"
      />
    </div>
  );
};

export default KanbanView;