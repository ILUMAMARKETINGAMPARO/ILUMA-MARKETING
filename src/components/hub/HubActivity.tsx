import React from 'react';
import { Card } from '@/components/ui/card';
import { Bell, TrendingUp, Settings } from 'lucide-react';

interface Activity {
  action: string;
  service: string;
  time: string;
  type: 'success' | 'info' | 'update';
}

interface HubActivityProps {
  activities: Activity[];
}

const HubActivity: React.FC<HubActivityProps> = ({ activities }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <Card className="glass-effect border-white/20 p-6 lg:col-span-2">
        <h3 className="text-xl font-bold text-white mb-6">Activité Récente</h3>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'success' ? 'bg-green-400' :
                activity.type === 'info' ? 'bg-blue-400' :
                'bg-yellow-400'
              }`} />
              <div className="flex-1">
                <div className="text-white font-medium">{activity.action}</div>
                <div className="text-white/60 text-sm">{activity.service}</div>
              </div>
              <div className="text-white/40 text-sm">{activity.time}</div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Bell className="w-4 h-4 text-blue-400" />
            <div className="text-sm text-white">Nouveau lead qualifié</div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <div className="text-sm text-white">Objectif mensuel atteint</div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <Settings className="w-4 h-4 text-yellow-400" />
            <div className="text-sm text-white">Optimisation suggérée</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HubActivity;