import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const CollaborationRadar: React.FC = () => {
  const collaborationData = [
    {
      metric: 'Communication',
      efficiency: 85,
      teamwork: 78,
      innovation: 92
    },
    {
      metric: 'Créativité',
      efficiency: 92,
      teamwork: 88,
      innovation: 96
    },
    {
      metric: 'Productivité',
      efficiency: 88,
      teamwork: 82,
      innovation: 79
    },
    {
      metric: 'Analyse',
      efficiency: 95,
      teamwork: 74,
      innovation: 87
    },
    {
      metric: 'Stratégie',
      efficiency: 82,
      teamwork: 91,
      innovation: 89
    },
    {
      metric: 'Exécution',
      efficiency: 89,
      teamwork: 85,
      innovation: 76
    }
  ];

  return (
    <Card className="glass-effect border-emerald-500/30 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-2">Radar de Collaboration</h3>
        <p className="text-white/60 text-sm">Analyse multidimensionnelle des performances d'équipe</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={collaborationData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis 
              dataKey="metric" 
              tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
            />
            
            <Radar
              name="Efficacité"
              dataKey="efficiency"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            
            <Radar
              name="Travail d'équipe"
              dataKey="teamwork"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            
            <Radar
              name="Innovation"
              dataKey="innovation"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            
            <Legend 
              wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-xl font-bold text-emerald-400">88%</div>
          <div className="text-xs text-white/60">Efficacité moyenne</div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-xl font-bold text-cyan-400">83%</div>
          <div className="text-xs text-white/60">Collaboration</div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-xl font-bold text-purple-400">87%</div>
          <div className="text-xs text-white/60">Innovation</div>
        </motion.div>
      </div>
    </Card>
  );
};

export default CollaborationRadar;