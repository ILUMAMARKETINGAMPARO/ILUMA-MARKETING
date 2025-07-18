import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  PieChart, 
  TrendingUp, 
  Gift,
  Settings,
  FileText,
  DollarSign
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import ProjectRevenueCalculator from './ProjectRevenueCalculator';
import StrategicReserveManager from './StrategicReserveManager';
import RevenueDistributionChart from './RevenueDistributionChart';
import QuarterlyBonusManager from './QuarterlyBonusManager';
import { defaultIlumaDistribution } from '@/utils/revenueDistributionConfig';

const RevenueDistributionModule: React.FC = () => {
  const { projects, clients } = useCRM();
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const totalProjectsRevenue = projects.reduce((total, project) => total + (project.budget || 0), 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;

  const tabs = [
    { id: 'calculator', label: 'Calculador', icon: Calculator },
    { id: 'distribution', label: 'Distribución', icon: PieChart },
    { id: 'reserve', label: 'Reserva Estratégica', icon: Gift },
    { id: 'bonuses', label: 'Bonificaciones', icon: TrendingUp },
    { id: 'reports', label: 'Reportes', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Header con métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FFD56B]/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#FFD56B]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Ingresos Totales</p>
              <p className="text-2xl font-bold text-white">${totalProjectsRevenue.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#8E44FF]/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#8E44FF]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Proyectos Activos</p>
              <p className="text-2xl font-bold text-white">{activeProjects}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
              <Gift className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Reserva Estratégica</p>
              <p className="text-2xl font-bold text-white">{((totalProjectsRevenue * 10) / 100).toLocaleString()}$</p>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
              <PieChart className="w-6 h-6 text-[#00FF88]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Roles Asignados</p>
              <p className="text-2xl font-bold text-white">{defaultIlumaDistribution.filter(r => r.assignedTo !== '—' && r.assignedTo !== 'system').length}/10</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8 bg-black/20 border border-white/10">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="data-[state=active]:bg-[#FFD56B]/20 data-[state=active]:text-[#FFD56B] text-white/60"
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden lg:inline">{tab.label}</span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Calculador de Proyectos */}
        <TabsContent value="calculator">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <ProjectRevenueCalculator
              projects={projects}
              clients={clients}
              onProjectSelect={setSelectedProject}
            />
          </motion.div>
        </TabsContent>

        {/* Gráfico de Distribución */}
        <TabsContent value="distribution">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <RevenueDistributionChart 
              distribution={defaultIlumaDistribution}
              totalRevenue={totalProjectsRevenue}
            />
          </motion.div>
        </TabsContent>

        {/* Gestión de Reserva Estratégica */}
        <TabsContent value="reserve">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <StrategicReserveManager 
              totalReserve={(totalProjectsRevenue * 10) / 100}
            />
          </motion.div>
        </TabsContent>

        {/* Bonificaciones Trimestrales */}
        <TabsContent value="bonuses">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <QuarterlyBonusManager />
          </motion.div>
        </TabsContent>

        {/* Reportes */}
        <TabsContent value="reports">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat']">
                📊 Reportes de Distribución
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <FileText className="w-4 h-4 mr-2" />
                  Reporte Mensual
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <PieChart className="w-4 h-4 mr-2" />
                  Análisis Trimestral
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Tendencias Anuales
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Estado de Pagos
                </Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueDistributionModule;