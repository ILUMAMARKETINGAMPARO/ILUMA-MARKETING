import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Zap } from 'lucide-react';

interface CampaignTimelineProps {
  budget: number;
  networks: string[];
  duration: number;
}

const CampaignTimeline: React.FC<CampaignTimelineProps> = ({ budget, networks, duration }) => {
  const weeks = Math.ceil(duration / 7);
  const weeklyBudget = budget / (duration / 7);

  const generateWeeklyData = () => {
    return Array.from({ length: weeks }, (_, index) => {
      const week = index + 1;
      const basePerformance = 70 + Math.random() * 30;
      const networkBonus = networks.length * 5;
      const timeBonus = Math.min(week * 2, 20); // Performance improves over time
      
      return {
        week,
        performance: Math.min(100, basePerformance + networkBonus + timeBonus),
        impressions: Math.round(weeklyBudget * 10 * (1 + week * 0.1)),
        clicks: Math.round(weeklyBudget * 0.8 * (1 + week * 0.15)),
        conversions: Math.round(weeklyBudget * 0.05 * (1 + week * 0.2))
      };
    });
  };

  const weeklyData = generateWeeklyData();

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Timeline de Campagne - {duration} jours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Timeline Visualization */}
          <div className="relative">
            <div className="flex items-end justify-between h-32 mb-4">
              {weeklyData.map((data, index) => (
                <div key={data.week} className="flex flex-col items-center space-y-2">
                  <div
                    className="w-8 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-t-md relative glow-effect"
                    style={{ height: `${data.performance}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold">
                      {Math.round(data.performance)}%
                    </div>
                  </div>
                  <div className="text-white/60 text-xs">S{data.week}</div>
                </div>
              ))}
            </div>
            
            {/* Performance Line */}
            <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none">
              <svg className="w-full h-full">
                <path
                  d={`M ${weeklyData.map((data, index) => 
                    `${(index / (weeklyData.length - 1)) * 100}% ${100 - data.performance}%`
                  ).join(' L ')}`}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  className="drop-shadow-lg"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Weekly Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weeklyData.slice(0, 4).map((data) => (
              <div key={data.week} className="glass-effect rounded-xl p-3 text-center">
                <div className="text-cyan-400 font-bold text-lg">{data.impressions.toLocaleString()}</div>
                <div className="text-white/60 text-xs">Impressions S{data.week}</div>
                <div className="text-green-400 text-sm">{data.clicks} clics</div>
              </div>
            ))}
          </div>

          {/* Growth Indicator */}
          <div className="flex items-center justify-center gap-2 glass-effect rounded-full px-4 py-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-white text-sm">
              Performance optimisée par IA - Croissance +{Math.round((weeklyData[weeklyData.length - 1]?.performance || 70) - 70)}%
            </span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignTimeline;