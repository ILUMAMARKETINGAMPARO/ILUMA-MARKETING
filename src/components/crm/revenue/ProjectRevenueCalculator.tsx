import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Save, Eye } from 'lucide-react';
import { ProjectFiche, ClientFiche } from '@/types/crm';
import { defaultIlumaDistribution, calculateDistribution, getRoleIcon } from '@/utils/revenueDistributionConfig';
import { getIlumaRoleColor } from '@/utils/collaboratorColors';

interface ProjectRevenueCalculatorProps {
  projects: ProjectFiche[];
  clients: ClientFiche[];
  onProjectSelect: (projectId: string) => void;
}

const ProjectRevenueCalculator: React.FC<ProjectRevenueCalculatorProps> = ({
  projects,
  clients,
  onProjectSelect
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [customRevenue, setCustomRevenue] = useState<number>(0);
  const [calculation, setCalculation] = useState<any>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectClient = selectedProject ? clients.find(c => c.id === selectedProject.clientId) : null;

  const handleCalculate = () => {
    const revenue = customRevenue || selectedProject?.budget || 0;
    const distributionWithAmounts = calculateDistribution(revenue, defaultIlumaDistribution);
    
    setCalculation({
      projectId: selectedProjectId,
      projectName: selectedProject?.name || 'Proyecto personalizado',
      clientName: projectClient?.name || 'Cliente no especificado',
      totalRevenue: revenue,
      distributions: distributionWithAmounts,
      strategicReserve: (revenue * 10) / 100,
      calculatedAt: new Date()
    });
  };

  const handleSaveDistribution = () => {
    if (calculation) {
      // TODO: Guardar en el contexto CRM
      console.log('Guardando distribución:', calculation);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-[#FFD56B]" />
          <h3 className="text-xl font-bold text-white font-['Montserrat']">
            Calculador de Distribución por Proyecto
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label htmlFor="project-select" className="text-white/80">Proyecto</Label>
            <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Seleccionar proyecto..." />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                {projects.map((project) => {
                  const client = clients.find(c => c.id === project.clientId);
                  return (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name} - {client?.name} (${project.budget?.toLocaleString()})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="custom-revenue" className="text-white/80">Ingreso Personalizado</Label>
            <Input
              id="custom-revenue"
              type="number"
              value={customRevenue}
              onChange={(e) => setCustomRevenue(Number(e.target.value))}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Opcional - sobrescribe el presupuesto"
            />
          </div>

          <div className="flex items-end">
            <Button 
              onClick={handleCalculate}
              disabled={!selectedProjectId && !customRevenue}
              className="w-full bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calcular
            </Button>
          </div>
        </div>

        {selectedProject && (
          <Card className="bg-black/10 border-white/10 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">{selectedProject.name}</h4>
                <p className="text-white/60">{projectClient?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#FFD56B]">
                  ${(customRevenue || selectedProject.budget).toLocaleString()}
                </p>
                <Badge className={
                  selectedProject.status === 'active' ? 'bg-green-500/20 text-green-300' :
                  selectedProject.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-yellow-500/20 text-yellow-300'
                }>
                  {selectedProject.status}
                </Badge>
              </div>
            </div>
          </Card>
        )}
      </Card>

      {calculation && (
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white font-['Montserrat']">
              Distribución Calculada
            </h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                Vista Previa
              </Button>
              <Button 
                onClick={handleSaveDistribution}
                size="sm"
                className="bg-[#8E44FF] hover:bg-[#8E44FF]/80"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-[#FFD56B]/10 rounded-lg border border-[#FFD56B]/20">
              <div>
                <h4 className="font-semibold text-white">{calculation.projectName}</h4>
                <p className="text-white/60">{calculation.clientName}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#FFD56B]">
                  ${calculation.totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-white/60">Total del proyecto</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calculation.distributions.map((dist: any, index: number) => {
              const roleColor = getIlumaRoleColor(dist.role);
              return (
                <Card key={index} className="bg-black/10 border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${roleColor.primary}20` }}
                      >
                        {getRoleIcon(dist.role)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{dist.assignedTo}</p>
                        <p className="text-sm text-white/60">{dist.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold" style={{ color: roleColor.primary }}>
                        ${dist.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-white/60">{dist.percentage}%</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProjectRevenueCalculator;