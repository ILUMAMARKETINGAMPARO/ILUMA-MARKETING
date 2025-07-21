import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, RefreshCw, Zap, CheckCircle } from 'lucide-react';

interface SyncActivity {
  type: string;
  title: string;
  description: string;
  timestamp: string;
  teams: string[];
  impact: string;
}

interface SyncActivityFeedProps {
  activities: SyncActivity[];
}

const SyncActivityFeed = ({ activities }: SyncActivityFeedProps) => {
  return (
    <Card className="glass-effect border-white/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Flux de Synchronisation</h3>
        <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300">
          Temps Réel
        </Badge>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <div className={`p-2 rounded-lg ${
              activity.type === 'knowledge_share' ? 'bg-blue-500/20' :
              activity.type === 'workflow_sync' ? 'bg-purple-500/20' :
              activity.type === 'resource_optimization' ? 'bg-green-500/20' :
              'bg-yellow-500/20'
            }`}>
              {activity.type === 'knowledge_share' && <GitBranch className="w-4 h-4 text-blue-400" />}
              {activity.type === 'workflow_sync' && <RefreshCw className="w-4 h-4 text-purple-400" />}
              {activity.type === 'resource_optimization' && <Zap className="w-4 h-4 text-green-400" />}
              {activity.type === 'conflict_resolution' && <CheckCircle className="w-4 h-4 text-yellow-400" />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-white text-sm">{activity.title}</h4>
                <Badge className={
                  activity.impact === 'high' 
                    ? 'bg-red-500/20 border-red-500/30 text-red-300'
                    : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
                }>
                  {activity.impact}
                </Badge>
              </div>
              <p className="text-white/70 text-xs mb-2">{activity.description}</p>
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>👥 {Array.isArray(activity.teams) ? activity.teams.join(', ') : activity.teams}</span>
                <span>⏰ {activity.timestamp}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default SyncActivityFeed;