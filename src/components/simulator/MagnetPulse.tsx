import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Magnet, Zap, Target } from 'lucide-react';

interface MagnetPulseProps {
  targetingStrength: number;
  budget: number;
  impressions: number;
}

const MagnetPulse: React.FC<MagnetPulseProps> = ({ targetingStrength, budget, impressions }) => {
  const magnetStrength = Math.max(0.1, targetingStrength);
  const pulseIntensity = Math.min(100, magnetStrength * 100);

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Magnet className="w-5 h-5 text-purple-400" />
          Attraction Magnétique
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative flex items-center justify-center min-h-[300px]">
          {/* Central Magnet */}
          <div 
            className="relative w-32 h-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center glow-effect"
            style={{
              animation: `pulse ${2 - magnetStrength}s infinite`,
              boxShadow: `0 0 ${20 + pulseIntensity}px rgba(34, 211, 238, 0.5)`
            }}
          >
            <Magnet className="w-16 h-16 text-white" />
          </div>

          {/* Attraction Rings */}
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute border-2 border-cyan-400/30 rounded-full"
              style={{
                width: `${120 + ring * 60}px`,
                height: `${120 + ring * 60}px`,
                animation: `ripple ${3 + ring}s infinite`,
                animationDelay: `${ring * 0.5}s`
              }}
            />
          ))}

          {/* Floating Leads */}
          {Array.from({ length: Math.floor(magnetStrength * 12) }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-80"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}

          {/* Magnetic Field Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <path
                  key={i}
                  d={`M 50% 50% Q ${50 + Math.cos(angle * Math.PI / 180) * 30}% ${50 + Math.sin(angle * Math.PI / 180) * 30}% ${50 + Math.cos(angle * Math.PI / 180) * 45}% ${50 + Math.sin(angle * Math.PI / 180) * 45}%`}
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.3)"
                  strokeWidth="1"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="glass-effect rounded-xl p-4 text-center">
            <Target className="w-6 h-6 mx-auto text-cyan-400 mb-2" />
            <div className="text-2xl font-bold text-gradient">
              {Math.round(pulseIntensity)}%
            </div>
            <div className="text-white/60 text-sm">Force</div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 text-center">
            <Zap className="w-6 h-6 mx-auto text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-gradient">
              {impressions.toLocaleString()}
            </div>
            <div className="text-white/60 text-sm">Portée</div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 text-center">
            <Magnet className="w-6 h-6 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-gradient">
              {Math.round(budget * magnetStrength * 0.08)}
            </div>
            <div className="text-white/60 text-sm">Leads/mois</div>
          </div>
        </div>

        {/* Attraction Status */}
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            magnetStrength > 0.7 ? 'bg-green-500/20 text-green-400' :
            magnetStrength > 0.4 ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              magnetStrength > 0.7 ? 'bg-green-400' :
              magnetStrength > 0.4 ? 'bg-yellow-400' :
              'bg-red-400'
            } animate-pulse`} />
            <span className="text-sm font-medium">
              {magnetStrength > 0.7 ? 'Attraction Optimale' :
               magnetStrength > 0.4 ? 'Attraction Modérée' :
               'Affinage Nécessaire'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MagnetPulse;