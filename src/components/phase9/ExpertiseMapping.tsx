import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage.ts';

const ExpertiseMapping = () => {
  const { t } = useLanguage();
  
  const expertiseMap = [
    { expert: 'Marie Chen', domain: 'IA & Machine Learning', connections: 45, influence: 94 },
    { expert: 'Alex Rivera', domain: 'Design UX/UI', connections: 38, influence: 87 },
    { expert: 'Sam Johnson', domain: 'Data Science', connections: 52, influence: 91 },
    { expert: 'Elena Rossi', domain: 'Marketing Strategy', connections: 41, influence: 89 }
  ];

  return (
    <Card className="glass-effect border-white/20 p-6">
      <h3 className="text-lg font-bold text-white mb-4">{t('knowledge.network.expertise')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {expertiseMap.map((expert, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white">{expert.expert}</span>
              </div>
              <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300">
                {expert.influence}% {t('knowledge.network.influence')}
              </Badge>
            </div>
            <p className="text-white/70 text-sm mb-2">{expert.domain}</p>
            <div className="text-xs text-white/50">
              {expert.connections} {t('knowledge.network.connections')}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExpertiseMapping;
