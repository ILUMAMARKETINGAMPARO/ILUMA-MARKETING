import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, MapPin, Eye, Target, BarChart3, Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';
interface ProfessionalLegendProps {
  totalBusinesses: number;
  filteredCount: number;
  scoreDistribution: {
    excellent: number; // 80-100
    good: number; // 60-79
    poor: number; // 0-59
  };
  onScoreFilterClick?: (minScore: number, maxScore: number) => void;
  isCompact?: boolean;
}
export const ProfessionalLegend: React.FC<ProfessionalLegendProps> = ({
  totalBusinesses,
  filteredCount,
  scoreDistribution,
  onScoreFilterClick,
  isCompact = false
}) => {
  const scoreCategories = [{
    label: 'Excellent',
    range: '80-100',
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    count: scoreDistribution.excellent,
    minScore: 80,
    maxScore: 100,
    description: 'Leaders du marché'
  }, {
    label: 'Correct',
    range: '60-79',
    color: 'bg-amber-500',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    count: scoreDistribution.good,
    minScore: 60,
    maxScore: 79,
    description: 'Potentiel modéré'
  }, {
    label: 'Faible',
    range: '0-59',
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    count: scoreDistribution.poor,
    minScore: 0,
    maxScore: 59,
    description: 'Opportunités fortes'
  }];
  if (isCompact) {
    return <Card className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-slate-900">Score ILA™</span>
            </div>
            
            <div className="space-y-2">
              {scoreCategories.map(category => <button key={category.label} onClick={() => onScoreFilterClick?.(category.minScore, category.maxScore)} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group">
                  <div className={`w-4 h-4 rounded-full ${category.color} border-2 border-white shadow-sm`} />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900">{category.label}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500">{category.range}</div>
                  </div>
                </button>)}
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Total visible</span>
                <span className="font-semibold">{filteredCount} / {totalBusinesses}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>;
  }
  return <Card className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg">
      
      
      
    </Card>;
};
export default ProfessionalLegend;