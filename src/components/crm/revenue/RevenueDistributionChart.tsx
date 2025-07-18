import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Users, DollarSign } from 'lucide-react';
import { RoleAssignment } from '@/types/crm';
import { getRoleIcon, getRoleDisplayName } from '@/utils/revenueDistributionConfig';
import { getIlumaRoleColor } from '@/utils/collaboratorColors';

interface RevenueDistributionChartProps {
  distribution: RoleAssignment[];
  totalRevenue: number;
}

const RevenueDistributionChart: React.FC<RevenueDistributionChartProps> = ({
  distribution,
  totalRevenue
}) => {
  const assignedRoles = distribution.filter(role => role.assignedTo !== '—' && role.assignedTo !== 'system');
  const systemRoles = distribution.filter(role => role.assignedTo === 'system');
  const unassignedRoles = distribution.filter(role => role.assignedTo === '—');

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[#8E44FF]" />
            <div>
              <p className="text-sm text-white/60">Roles Asignados</p>
              <p className="text-2xl font-bold text-white">{assignedRoles.length}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-[#FFD56B]" />
            <div>
              <p className="text-sm text-white/60">Por Colaborador</p>
              <p className="text-2xl font-bold text-white">
                ${((totalRevenue * 10) / 100).toLocaleString()}
              </p>
              <p className="text-xs text-white/60">Promedio por rol</p>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <PieChart className="w-8 h-8 text-[#00FF88]" />
            <div>
              <p className="text-sm text-white/60">Distribución</p>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-white/60">Equilibrio perfecto</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Distribución Visual */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="w-6 h-6 text-[#FFD56B]" />
          <h3 className="text-xl font-bold text-white font-['Montserrat']">
            Distribución de Ingresos por Rol
          </h3>
        </div>

        {/* Barra de distribución visual */}
        <div className="mb-8">
          <div className="flex h-8 rounded-lg overflow-hidden border border-white/20">
            {distribution.map((role, index) => {
              const roleColor = getIlumaRoleColor(role.role);
              return (
                <div
                  key={index}
                  className="flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    width: `${role.percentage}%`,
                    backgroundColor: roleColor.primary
                  }}
                  title={`${getRoleDisplayName(role.role)}: ${role.percentage}%`}
                >
                  {role.percentage}%
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-2">
            <p className="text-sm text-white/60">
              Distribución equilibrada: 10% por rol estratégico
            </p>
          </div>
        </div>

        {/* Lista detallada de roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {distribution.map((role, index) => {
            const roleColor = getIlumaRoleColor(role.role);
            const amount = (totalRevenue * role.percentage) / 100;
            
            return (
              <Card key={index} className="bg-black/10 border-white/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${roleColor.primary}20` }}
                    >
                      {getRoleIcon(role.role)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {getRoleDisplayName(role.role)}
                      </h4>
                      <p className="text-sm text-white/60">{role.assignedTo}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: roleColor.primary }}>
                      ${amount.toLocaleString()}
                    </p>
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: roleColor.primary,
                        color: roleColor.primary 
                      }}
                    >
                      {role.percentage}%
                    </Badge>
                  </div>
                </div>
                
                <p className="text-xs text-white/60">{role.description}</p>
                
                {role.assignedTo === '—' && (
                  <Badge variant="outline" className="mt-2 text-yellow-400 border-yellow-400">
                    Sin asignar
                  </Badge>
                )}
                
                {role.assignedTo === 'system' && (
                  <Badge variant="outline" className="mt-2 text-blue-400 border-blue-400">
                    Sistema automático
                  </Badge>
                )}
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Resumen por categoría */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect border-green-500/20 p-6">
          <h4 className="text-lg font-semibold text-green-400 mb-4">
            Roles Asignados ({assignedRoles.length})
          </h4>
          <div className="space-y-2">
            {assignedRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/80">{role.assignedTo}</span>
                <span className="text-green-400 font-semibold">
                  ${((totalRevenue * role.percentage) / 100).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-effect border-yellow-500/20 p-6">
          <h4 className="text-lg font-semibold text-yellow-400 mb-4">
            Sin Asignar ({unassignedRoles.length})
          </h4>
          <div className="space-y-2">
            {unassignedRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/80">{getRoleDisplayName(role.role)}</span>
                <span className="text-yellow-400 font-semibold">
                  ${((totalRevenue * role.percentage) / 100).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-effect border-blue-500/20 p-6">
          <h4 className="text-lg font-semibold text-blue-400 mb-4">
            Sistema ({systemRoles.length})
          </h4>
          <div className="space-y-2">
            {systemRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/80">{getRoleDisplayName(role.role)}</span>
                <span className="text-blue-400 font-semibold">
                  ${((totalRevenue * role.percentage) / 100).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RevenueDistributionChart;