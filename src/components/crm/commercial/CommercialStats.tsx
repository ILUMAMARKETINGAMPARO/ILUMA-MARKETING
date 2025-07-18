import React from 'react';
import { Card } from '@/components/ui/card';
import { useCRM } from '@/contexts/CRMContext';

const CommercialStats = () => {
  const { clients } = useCRM();

  // Quick stats calculations
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRevenue = clients.reduce((acc, c) => acc + (c.revenue || 0), 0);
  const avgILAScore = clients.length > 0 
    ? Math.round(clients.reduce((acc, c) => acc + (c.ilaScore?.current || 0), 0) / clients.length) 
    : 0;
  const prospects = clients.filter(c => c.status === 'prospect').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="glass-effect border-white/20 p-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 font-['Montserrat']">
            {activeClients}
          </div>
          <div className="text-white/60 text-sm font-['Montserrat']">
            Clients Actifs
          </div>
        </div>
      </Card>
      <Card className="glass-effect border-white/20 p-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#FFD56B] font-['Montserrat']">
            {totalRevenue.toLocaleString()}€
          </div>
          <div className="text-white/60 text-sm font-['Montserrat']">
            Revenus Totaux
          </div>
        </div>
      </Card>
      <Card className="glass-effect border-white/20 p-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#8E44FF] font-['Montserrat']">
            {avgILAScore}/100
          </div>
          <div className="text-white/60 text-sm font-['Montserrat']">
            Score ILA™ Moyen
          </div>
        </div>
      </Card>
      <Card className="glass-effect border-white/20 p-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400 font-['Montserrat']">
            {prospects}
          </div>
          <div className="text-white/60 text-sm font-['Montserrat']">
            Nouveaux Prospects
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommercialStats;