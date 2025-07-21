import React from 'react';
import { Card } from '@/components/ui/card';
import { Lightbulb, Users, Target } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const RecommendedActions = () => {
  const { t } = useLanguage();

  return (
    <Card className="glass-effect border-emerald-500/30 p-6">
      <h3 className="text-lg font-bold text-white mb-4">{t('intelligence.collective.recommendations')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 font-medium">{t('intelligence.collective.optimize')}</span>
          </div>
          <p className="text-white/80 text-sm">
            {t('intelligence.collective.reorganize')}
          </p>
        </div>
        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 font-medium">{t('intelligence.collective.strengthen')}</span>
          </div>
          <p className="text-white/80 text-sm">
            {t('intelligence.collective.implement')}
          </p>
        </div>
        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 font-medium">{t('intelligence.collective.eliminate')}</span>
          </div>
          <p className="text-white/80 text-sm">
            {t('intelligence.collective.automate')}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RecommendedActions;