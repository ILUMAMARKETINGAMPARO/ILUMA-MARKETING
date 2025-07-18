import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Gift, Plus, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { getStrategicReservePriorities } from '@/utils/revenueDistributionConfig';

interface StrategicReserveManagerProps {
  totalReserve: number;
}

const StrategicReserveManager: React.FC<StrategicReserveManagerProps> = ({ totalReserve }) => {
  const [allocations, setAllocations] = useState([
    { id: 'tools', allocated: 1500, description: 'Lovable™, Ahrefs, Midjourney Pro' },
    { id: 'additional_coo', allocated: 0, description: 'Pendiente de asignación' },
  ]);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [newAllocation, setNewAllocation] = useState({
    priority: '',
    amount: 0,
    description: ''
  });

  const priorities = getStrategicReservePriorities();
  const totalAllocated = allocations.reduce((sum, alloc) => sum + alloc.allocated, 0);
  const remainingReserve = totalReserve - totalAllocated;
  const allocationPercentage = (totalAllocated / totalReserve) * 100;

  const handleAddAllocation = () => {
    if (newAllocation.priority && newAllocation.amount > 0) {
      setAllocations(prev => [...prev, {
        id: newAllocation.priority,
        allocated: newAllocation.amount,
        description: newAllocation.description
      }]);
      
      setNewAllocation({ priority: '', amount: 0, description: '' });
      setShowAllocationModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-6 h-6 text-[#F59E0B]" />
          <h3 className="text-xl font-bold text-white font-['Montserrat']">
            Gestión de Reserva Estratégica
          </h3>
        </div>

        {/* Overview de la reserva */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#F59E0B]/10 border-[#F59E0B]/20 p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-[#F59E0B]" />
              <div>
                <p className="text-sm text-white/60">Reserva Total</p>
                <p className="text-2xl font-bold text-white">${totalReserve.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20 p-4">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-white/60">Asignado</p>
                <p className="text-2xl font-bold text-white">${totalAllocated.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/20 p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-white/60">Disponible</p>
                <p className="text-2xl font-bold text-white">${remainingReserve.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-white/80">Progreso de Asignación</Label>
            <span className="text-sm text-white/60">{allocationPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={allocationPercentage} className="h-2" />
        </div>

        {/* Botón para nueva asignación */}
        <div className="flex justify-end mb-6">
          <Button 
            onClick={() => setShowAllocationModal(true)}
            className="bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Asignación
          </Button>
        </div>
      </Card>

      {/* Prioridades de asignación */}
      <Card className="glass-effect border-white/20 p-6">
        <h4 className="text-lg font-semibold text-white mb-4 font-['Montserrat']">
          Sistema de Prioridades Iluma™
        </h4>
        
        <div className="space-y-4">
          {priorities.map((priority, index) => {
            const allocation = allocations.find(a => a.id === priority.id);
            const isAllocated = !!allocation;
            
            return (
              <Card 
                key={priority.id} 
                className={`p-4 transition-colors ${
                  isAllocated 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : 'bg-black/10 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                        {priority.priority}
                      </Badge>
                      <span className="text-2xl">{priority.icon}</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{priority.name}</h5>
                      <p className="text-sm text-white/60">{priority.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {isAllocated ? (
                      <div>
                        <p className="text-lg font-bold text-green-400">
                          ${allocation.allocated.toLocaleString()}
                        </p>
                        <p className="text-xs text-white/60">{allocation.description}</p>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-white/60">
                        Pendiente
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Modal para nueva asignación */}
      <Dialog open={showAllocationModal} onOpenChange={setShowAllocationModal}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#F59E0B] font-['Montserrat']">
              Nueva Asignación de Reserva
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">Prioridad</Label>
              <select
                value={newAllocation.priority}
                onChange={(e) => setNewAllocation(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full p-2 bg-black/20 border border-white/20 rounded text-white"
              >
                <option value="">Seleccionar prioridad...</option>
                {priorities.map(priority => (
                  <option key={priority.id} value={priority.id}>
                    {priority.icon} {priority.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-white/80">Monto a Asignar</Label>
              <Input
                type="number"
                value={newAllocation.amount}
                onChange={(e) => setNewAllocation(prev => ({ ...prev, amount: Number(e.target.value) }))}
                className="bg-black/20 border-white/20 text-white"
                placeholder="0"
                max={remainingReserve}
              />
              <p className="text-xs text-white/60 mt-1">
                Disponible: ${remainingReserve.toLocaleString()}
              </p>
            </div>

            <div>
              <Label className="text-white/80">Descripción</Label>
              <Textarea
                value={newAllocation.description}
                onChange={(e) => setNewAllocation(prev => ({ ...prev, description: e.target.value }))}
                className="bg-black/20 border-white/20 text-white"
                placeholder="Detalles de la asignación..."
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleAddAllocation}
                className="flex-1 bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black"
                disabled={!newAllocation.priority || newAllocation.amount <= 0}
              >
                Asignar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAllocationModal(false)}
                className="border-white/20 text-white"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StrategicReserveManager;