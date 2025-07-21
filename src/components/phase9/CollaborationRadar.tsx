import React from 'react';
import { Card } from '@/components/ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const CollaborationRadar = () => {
  const collaborationRadar = [
    { subject: 'Communication', A: 85, B: 90, fullMark: 100 },
    { subject: 'Créativité', A: 92, B: 88, fullMark: 100 },
    { subject: 'Résolution', A: 78, B: 95, fullMark: 100 },
    { subject: 'Innovation', A: 88, B: 85, fullMark: 100 },
    { subject: 'Efficacité', A: 95, B: 82, fullMark: 100 },
    { subject: 'Adaptation', A: 83, B: 91, fullMark: 100 }
  ];

  return (
    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-lg font-bold text-white mb-4">Profil de Collaboration</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={collaborationRadar}>
            <PolarGrid stroke="#ffffff20" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff60', fontSize: 12 }} />
            <PolarRadiusAxis tick={{ fill: '#ffffff40', fontSize: 10 }} />
            <Radar
              name="Équipe A"
              dataKey="A"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.3}
            />
            <Radar
              name="Équipe B"
              dataKey="B"
              stroke="#06D6A0"
              fill="#06D6A0"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CollaborationRadar;