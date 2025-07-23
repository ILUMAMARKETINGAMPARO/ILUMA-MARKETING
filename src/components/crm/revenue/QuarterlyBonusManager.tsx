import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrendingUp, Plus, Users, Calculator, Gift } from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { QuarterlyBonus } from '@/types/crm.ts';
import { getCollaboratorColor } from '@/utils/collaboratorColors';

const QuarterlyBonusManager: React.FC = () => {
  const { team } = useCRM();
  const [bonusHistory, setBonusHistory] = useState<QuarterlyBonus[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBonus, setNewBonus] = useState({
    quarter: '',
    year: new Date().getFullYear(),
    totalAmount: 0,
    distributions: team.map(member => ({
      collaboratorName: member.name,
      amount: 0,
      merit: 75,
      involvement: 75
    }))
  });

  const getCurrentQuarter = () => {
    const month = new Date().getMonth();
    const quarter = Math.floor(month / 3) + 1;
    return `Q${quarter}`;
  };

  const calculateTotalDistribution = () => {
    return newBonus.distributions.reduce((sum, dist) => sum + dist.amount, 0);
  };

  const calculateSuggestedAmount = (merit: number, involvement: number, totalPool: number) => {
    const score = (merit + involvement) / 2;
    const weight = score / 100;
    const baseAmount = totalPool / team.length;
    return Math.round(baseAmount * weight);
  };

  const handleAutoCalculate = () => {
    const totalPool = newBonus.totalAmount;
    const totalScore = newBonus.distributions.reduce((sum, dist) => sum + ((dist.merit + dist.involvement) / 2), 0);
    
    const updatedDistributions = newBonus.distributions.map(dist => {
      const individualScore = (dist.merit + dist.involvement) / 2;
      const percentage = individualScore / totalScore;
      const amount = Math.round(totalPool * percentage);
      
      return { ...dist, amount };
    });

    setNewBonus(prev => ({ ...prev, distributions: updatedDistributions }));
  };

  const handleCreateBonus = () => {
    const bonus: QuarterlyBonus = {
      id: `bonus_${Date.now()}`,
      quarter: `${newBonus.year}-${newBonus.quarter}`,
      year: newBonus.year,
      totalAmount: newBonus.totalAmount,
      distributions: newBonus.distributions,
      createdAt: new Date()
    };

    setBonusHistory(prev => [bonus, ...prev]);
    setShowCreateModal(false);
    setNewBonus({
      quarter: '',
      year: new Date().getFullYear(),
      totalAmount: 0,
      distributions: team.map(member => ({
        collaboratorName: member.name,
        amount: 0,
        merit: 75,
        involvement: 75
      }))
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-[#F59E0B]" />
            <h3 className="text-xl font-bold text-white font-['Montserrat']">
              Bonificaciones Trimestrales
            </h3>
          </div>
          <Button 
            onClick={() => {
              setNewBonus(prev => ({ ...prev, quarter: getCurrentQuarter() }));
              setShowCreateModal(true);
            }}
            className="bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Bonificación
          </Button>
        </div>
      </Card>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-[#F59E0B]" />
            <div>
              <p className="text-sm text-white/60">Total Distribuido</p>
              <p className="text-2xl font-bold text-white">
                ${bonusHistory.reduce((sum, bonus) => sum + bonus.totalAmount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-[#8E44FF]" />
            <div>
              <p className="text-sm text-white/60">Trimestres</p>
              <p className="text-2xl font-bold text-white">{bonusHistory.length}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[#00FF88]" />
            <div>
              <p className="text-sm text-white/60">Colaboradores</p>
              <p className="text-2xl font-bold text-white">{team.length}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-[#FFD56B]" />
            <div>
              <p className="text-sm text-white/60">Promedio/Trimestre</p>
              <p className="text-2xl font-bold text-white">
                ${bonusHistory.length > 0 ? 
                  Math.round(bonusHistory.reduce((sum, bonus) => sum + bonus.totalAmount, 0) / bonusHistory.length).toLocaleString() : 
                  '0'
                }
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Historial de bonificaciones */}
      <Card className="glass-effect border-white/20 p-6">
        <h4 className="text-lg font-semibold text-white mb-6 font-['Montserrat']">
          Historial de Bonificaciones
        </h4>

        {bonusHistory.length === 0 ? (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No hay bonificaciones registradas</p>
            <p className="text-sm text-white/40">Crea la primera bonificación trimestral</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bonusHistory.map((bonus) => (
              <Card key={bonus.id} className="bg-black/10 border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h5 className="text-lg font-semibold text-white">
                      {bonus.quarter} - {bonus.year}
                    </h5>
                    <p className="text-sm text-white/60">
                      Creado: {bonus.createdAt.toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#F59E0B]">
                      ${bonus.totalAmount.toLocaleString()}
                    </p>
                    <Badge className={bonus.paidAt ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}>
                      {bonus.paidAt ? 'Pagado' : 'Pendiente'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bonus.distributions.map((dist, index) => {
                    const memberColor = getCollaboratorColor(dist.collaboratorName);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: memberColor.primary }}
                          >
                            {dist.collaboratorName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{dist.collaboratorName}</p>
                            <p className="text-xs text-white/60">
                              Mérito: {dist.merit}% | Implicación: {dist.involvement}%
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-[#F59E0B]">
                          ${dist.amount.toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Modal de creación */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#F59E0B] font-['Montserrat']">
              Nueva Bonificación Trimestral
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Configuración general */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white/80">Trimestre</Label>
                <select
                  value={newBonus.quarter}
                  onChange={(e) => setNewBonus(prev => ({ ...prev, quarter: e.target.value }))}
                  className="w-full p-2 bg-black/20 border border-white/20 rounded text-white"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Q1">Q1 - Enero-Marzo</option>
                  <option value="Q2">Q2 - Abril-Junio</option>
                  <option value="Q3">Q3 - Julio-Septiembre</option>
                  <option value="Q4">Q4 - Octubre-Diciembre</option>
                </select>
              </div>

              <div>
                <Label className="text-white/80">Año</Label>
                <Input
                  type="number"
                  value={newBonus.year}
                  onChange={(e) => setNewBonus(prev => ({ ...prev, year: Number(e.target.value) }))}
                  className="bg-black/20 border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white/80">Monto Total</Label>
                <Input
                  type="number"
                  value={newBonus.totalAmount}
                  onChange={(e) => setNewBonus(prev => ({ ...prev, totalAmount: Number(e.target.value) }))}
                  className="bg-black/20 border-white/20 text-white"
                  placeholder="Monto disponible para bonificaciones"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleAutoCalculate}
                disabled={!newBonus.totalAmount}
                className="bg-[#8E44FF] hover:bg-[#8E44FF]/80"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Auto-Calcular Distribución
              </Button>
            </div>

            {/* Distribución por colaborador */}
            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-white">Distribución por Colaborador</h5>
              
              {newBonus.distributions.map((dist, index) => {
                const memberColor = getCollaboratorColor(dist.collaboratorName);
                return (
                  <Card key={index} className="bg-black/10 border-white/10 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: memberColor.primary }}
                        >
                          {dist.collaboratorName.charAt(0)}
                        </div>
                        <span className="font-semibold text-white">{dist.collaboratorName}</span>
                      </div>

                      <div>
                        <Label className="text-white/80 text-sm">Mérito: {dist.merit}%</Label>
                        <Slider
                          value={[dist.merit]}
                          onValueChange={([value]) => {
                            const updated = [...newBonus.distributions];
                            updated[index].merit = value;
                            setNewBonus(prev => ({ ...prev, distributions: updated }));
                          }}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label className="text-white/80 text-sm">Implicación: {dist.involvement}%</Label>
                        <Slider
                          value={[dist.involvement]}
                          onValueChange={([value]) => {
                            const updated = [...newBonus.distributions];
                            updated[index].involvement = value;
                            setNewBonus(prev => ({ ...prev, distributions: updated }));
                          }}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <Label className="text-white/80 text-sm">Monto</Label>
                        <Input
                          type="number"
                          value={dist.amount}
                          onChange={(e) => {
                            const updated = [...newBonus.distributions];
                            updated[index].amount = Number(e.target.value);
                            setNewBonus(prev => ({ ...prev, distributions: updated }));
                          }}
                          className="bg-black/20 border-white/20 text-white"
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Resumen */}
            <Card className="bg-[#F59E0B]/10 border-[#F59E0B]/20 p-4">
              <div className="flex justify-between items-center">
                <span className="text-white">Total Distribuido:</span>
                <span className="text-2xl font-bold text-[#F59E0B]">
                  ${calculateTotalDistribution().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-white/60">Restante:</span>
                <span className={`font-semibold ${
                  newBonus.totalAmount - calculateTotalDistribution() >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${(newBonus.totalAmount - calculateTotalDistribution()).toLocaleString()}
                </span>
              </div>
            </Card>

            {/* Botones */}
            <div className="flex gap-2">
              <Button 
                onClick={handleCreateBonus}
                disabled={!newBonus.quarter || !newBonus.totalAmount || calculateTotalDistribution() > newBonus.totalAmount}
                className="flex-1 bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black"
              >
                Crear Bonificación
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateModal(false)}
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

export default QuarterlyBonusManager;