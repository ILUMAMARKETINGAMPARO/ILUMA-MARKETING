import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Zap } from 'lucide-react';

interface BudgetSliderProps {
  budget: number;
  onBudgetChange: (budget: number) => void;
  impressions: number;
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({ budget, onBudgetChange, impressions }) => {
  const handleBudgetChange = (value: number[]) => {
    onBudgetChange(value[0]);
  };

  // Cascade effect particles (simplified representation)
  const particleCount = Math.min(20, Math.floor(budget / 50));

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          Budget Publicitaire Mensuel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Slider */}
        <div className="space-y-4">
          <div className="flex justify-between text-white/80">
            <span>Minimal</span>
            <span className="text-2xl font-bold text-gradient">Budget</span>
            <span>Optimal</span>
          </div>
          
          <div className="relative">
            <Slider
              value={[budget]}
              onValueChange={handleBudgetChange}
              max={2000}
              min={300}
              step={50}
              className="w-full"
            />
            
            {/* Glow effect on slider */}
            <div 
              className="absolute top-1/2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-50 blur-sm pointer-events-none"
              style={{ 
                left: 0,
                width: `${((budget - 300) / (2000 - 300)) * 100}%`,
                transform: 'translateY(-50%)'
              }}
            />
          </div>
        </div>

        {/* Cascade Galactique Visualization */}
        <div className="relative bg-gradient-to-b from-transparent to-cyan-900/20 rounded-2xl p-8 min-h-[200px] overflow-hidden">
          <div className="text-center mb-4">
            <h3 className="text-white/80 mb-2">Cascade Galactique</h3>
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse glow-effect">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Falling Particles */}
          {Array.from({ length: particleCount }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-70"
              style={{
                left: `${10 + (i * 4)}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}

          {/* Impressions Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="glass-effect rounded-2xl px-6 py-3 glow-effect">
              <div className="text-3xl font-bold text-gradient mb-1">
                {impressions.toLocaleString()}
              </div>
              <div className="text-white/80 text-sm">Impressions estimées</div>
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-cyan-400 font-bold">70%</div>
            <div className="text-white/60 text-xs">Publicité</div>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-purple-400 font-bold">20%</div>
            <div className="text-white/60 text-xs">Optimisation</div>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-green-400 font-bold">10%</div>
            <div className="text-white/60 text-xs">Analytics</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetSlider;