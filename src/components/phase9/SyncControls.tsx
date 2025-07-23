import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Activity, GitBranch } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage.ts';

const SyncControls = () => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="glass-effect border-emerald-500/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300 font-medium">{t('sync.team.manual')}</span>
        </div>
        <p className="text-white/70 text-sm mb-3">
          {t('sync.team.force')}
        </p>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          {t('sync.team.now')}
        </Button>
      </Card>

      <Card className="glass-effect border-blue-500/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-blue-400" />
          <span className="text-blue-300 font-medium">{t('sync.team.monitoring')}</span>
        </div>
        <p className="text-white/70 text-sm mb-3">
          {t('sync.team.analytics')}
        </p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          {t('sync.team.open')}
        </Button>
      </Card>

      <Card className="glass-effect border-purple-500/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-5 h-5 text-purple-400" />
          <span className="text-purple-300 font-medium">{t('sync.team.config')}</span>
        </div>
        <p className="text-white/70 text-sm mb-3">
          {t('sync.team.rules')}
        </p>
        <Button className="w-full bg-purple-600 hover:bg-purple-700">
          {t('sync.team.configure')}
        </Button>
      </Card>
    </div>
  );
};

export default SyncControls;