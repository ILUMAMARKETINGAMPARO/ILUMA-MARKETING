import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, 
  TrendingUp,
  Users,
  Calculator,
  Download,
  Eye,
  Calendar
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { getCollaboratorColor } from '@/utils/collaboratorColors';

const CommissionView: React.FC = () => {
  const { clients, team } = useCRM();
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');
  const [selectedCollaborator, setSelectedCollaborator] = useState<string | null>(null);

  // Commission calculation logic
  const calculateCommissions = () => {
    const commissionRates: Record<string, number> = {
      'sergio': 0.15,    // CEO: 15%
      'amparo': 0.12,    // COO: 12%
      'andrea': 0.10,    // SEO: 10%
      'alex': 0.08,      // Dev: 8%
      'juan': 0.08,      // Assistant: 8%
    };

    return team.map(member => {
      const memberClients = clients.filter(c => 
        c.assignedTo.toLowerCase().includes(member.name.toLowerCase().split(' ')[0])
      );
      
      const totalRevenue = memberClients.reduce((sum, c) => sum + c.revenue, 0);
      const commissionRate = commissionRates[member.name.toLowerCase().split(' ')[0]] || 0.05;
      const commission = totalRevenue * commissionRate;
      
      return {
        ...member,
        clients: memberClients,
        totalRevenue,
        commissionRate,
        commission,
        avgClientValue: memberClients.length > 0 ? totalRevenue / memberClients.length : 0,
        topClient: memberClients.sort((a, b) => b.revenue - a.revenue)[0]
      };
    });
  };

  const commissionsData = calculateCommissions();
  const totalCommissions = commissionsData.reduce((sum, c) => sum + c.commission, 0);
  const totalRevenue = commissionsData.reduce((sum, c) => sum + c.totalRevenue, 0);

  const periods = [
    { id: 'current_month', label: 'Mois Actuel' },
    { id: 'last_month', label: 'Mois Dernier' },
    { id: 'current_quarter', label: 'Trimestre Actuel' },
    { id: 'last_quarter', label: 'Trimestre Dernier' },
    { id: 'current_year', label: 'Année Actuelle' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white font-['Montserrat']">
          Calcul Automatique des Commissions
        </h3>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px] bg-black/20 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20">
              {periods.map((period) => (
                <SelectItem key={period.id} value={period.id}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-[#FFD56B]" />
            <div>
              <div className="text-2xl font-bold text-white">{totalCommissions.toLocaleString()}€</div>
              <div className="text-white/60 text-sm">Commissions Totales</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-[#00FF88]" />
            <div>
              <div className="text-2xl font-bold text-white">{totalRevenue.toLocaleString()}€</div>
              <div className="text-white/60 text-sm">CA Total</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-[#8E44FF]" />
            <div>
              <div className="text-2xl font-bold text-white">
                {((totalCommissions / totalRevenue) * 100).toFixed(1)}%
              </div>
              <div className="text-white/60 text-sm">Taux Moyen</div>
            </div>
          </div>
        </Card>
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[#FF8C42]" />
            <div>
              <div className="text-2xl font-bold text-white">{commissionsData.length}</div>
              <div className="text-white/60 text-sm">Collaborateurs</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Collaborator Commission Cards */}
      <div className="grid gap-4">
        {commissionsData.map((collaborator, index) => {
          const colors = getCollaboratorColor(collaborator.name);
          const isSelected = selectedCollaborator === collaborator.id;
          
          return (
            <motion.div
              key={collaborator.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`glass-effect p-6 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'border-white/40 bg-white/5 scale-105' 
                    : 'border-white/20 hover:border-white/30'
                }`}
                onClick={() => setSelectedCollaborator(isSelected ? null : collaborator.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {collaborator.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white font-['Montserrat'] text-lg">
                        {collaborator.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Badge
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            border: `1px solid ${colors.border}`
                          }}
                        >
                          {collaborator.role}
                        </Badge>
                        <span className="text-white/60 text-sm">
                          {collaborator.clients.length} clients
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#FFD56B]">
                      {collaborator.commission.toLocaleString()}€
                    </div>
                    <div className="text-white/60 text-sm">
                      Commission ({(collaborator.commissionRate * 100).toFixed(0)}%)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {collaborator.totalRevenue.toLocaleString()}€
                    </div>
                    <div className="text-white/60 text-xs">CA Généré</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {collaborator.avgClientValue.toLocaleString()}€
                    </div>
                    <div className="text-white/60 text-xs">Panier Moyen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {collaborator.topClient?.ilaScore.current || 0}/100
                    </div>
                    <div className="text-white/60 text-xs">Top ILA™</div>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-4 border-t border-white/10"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-white mb-3">Clients Assignés</h5>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {collaborator.clients.map((client) => (
                            <div key={client.id} className="flex items-center justify-between text-sm">
                              <span className="text-white">{client.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[#FFD56B]">{client.revenue.toLocaleString()}€</span>
                                <Badge className="text-[10px] bg-[#8E44FF]/20 text-[#8E44FF]">
                                  {client.ilaScore.current}/100
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-3">Performance</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/60">Taux de conversion</span>
                            <span className="text-[#00FF88]">
                              {(Math.random() * 20 + 60).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Score ILA™ moyen</span>
                            <span className="text-[#8E44FF]">
                              {Math.round(collaborator.clients.reduce((sum, c) => sum + c.ilaScore.current, 0) / collaborator.clients.length) || 0}/100
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Meilleur client</span>
                            <span className="text-white text-sm">
                              {collaborator.topClient?.name.substring(0, 20) || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Détails Complets
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Historique
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CommissionView;