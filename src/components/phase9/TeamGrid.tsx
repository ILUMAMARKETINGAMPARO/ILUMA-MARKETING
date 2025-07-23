import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage.ts';

interface Team {
  name: string;
  members: number;
  syncRate: number;
  status: string;
  lastSync: string;
  activities: number;
  color: string;
}

interface TeamGridProps {
  teams: Team[];
}

const TeamGrid = ({ teams }: TeamGridProps) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {teams.map((team, index) => (
        <Card key={index} className="glass-effect border-white/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <Users className={`w-5 h-5 ${team.color}`} />
            {team.status === 'synchronized' ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : team.status === 'syncing' ? (
              <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <h4 className="font-semibold text-white mb-2">{team.name}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/70">
              <span>{t('sync.team.members')}:</span>
              <span>{team.members}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{t('sync.team.rate')}:</span>
              <span className="text-emerald-300">{team.syncRate}%</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>{t('sync.team.activities')}:</span>
              <span>{team.activities}</span>
            </div>
            <div className="text-xs text-white/50">
              {t('sync.team.last')}: {team.lastSync}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TeamGrid;