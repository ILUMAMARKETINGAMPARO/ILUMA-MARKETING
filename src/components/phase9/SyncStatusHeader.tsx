import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Activity } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage.ts';

interface SyncStatusHeaderProps {
  syncStatus: string;
}

const SyncStatusHeader = ({ syncStatus }: SyncStatusHeaderProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <RefreshCw className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{t('sync.team.title')}</h3>
          <p className="text-white/60">{t('sync.team.subtitle')}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-300 text-sm">{t('sync.team.active')}</span>
        </div>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
          <Activity className="w-4 h-4 mr-2" />
          {t('sync.team.manage')}
        </Button>
      </div>
    </div>
  );
};

export default SyncStatusHeader;