import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Target } from 'lucide-react';
import { BusinessProfile, ILUMATCHResult } from '@/types/ilumatch';

interface MatchesMapProps {
  businesses: BusinessProfile[];
  matches: ILUMATCHResult[];
}

const MatchesMap: React.FC<MatchesMapProps> = ({ businesses, matches }) => {
  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case 'perfecto':
        return 'bg-green-500';
      case 'compensatorio':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-[#8E44FF]/20 p-8">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-8 h-8 text-[#8E44FF]" />
          <h2 className="text-2xl font-bold text-white font-['Montserrat']">
            Carte Interactive ILUMATCH™
          </h2>
        </div>

        {/* Map Placeholder - In production, integrate with Mapbox or Google Maps */}
        <div className="relative bg-gradient-to-br from-black/40 to-purple-900/20 rounded-xl p-8 min-h-[500px] border border-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                Carte Interactive
              </h3>
              <p className="text-white/60 font-['Montserrat']">
                Intégration Mapbox/Google Maps à venir
              </p>
            </div>
          </div>

          {/* Business Markers Simulation */}
          {businesses.map((business, index) => (
            <div
              key={business.id}
              className="absolute w-4 h-4 bg-[#8E44FF] rounded-full border-2 border-white shadow-lg animate-pulse"
              style={{
                left: `${20 + (index * 15) % 60}%`,
                top: `${30 + (index * 10) % 40}%`
              }}
              title={business.name}
            />
          ))}

          {/* Match Connections Simulation */}
          {matches.slice(0, 3).map((match, index) => (
            <svg
              key={match.id}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <line
                x1={`${25 + (index * 20)}%`}
                y1={`${35 + (index * 15)}%`}
                x2={`${45 + (index * 15)}%`}
                y2={`${55 + (index * 10)}%`}
                stroke={match.matchType === 'perfecto' ? '#10B981' : '#F59E0B'}
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.7"
              />
            </svg>
          ))}
        </div>

        {/* Map Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#8E44FF] rounded-full"></div>
            <span className="text-white/80 text-sm font-['Montserrat']">Entreprises analysées</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-green-500"></div>
            <span className="text-white/80 text-sm font-['Montserrat']">Match Parfait</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-yellow-500"></div>
            <span className="text-white/80 text-sm font-['Montserrat']">Match Compensatoire</span>
          </div>
        </div>
      </Card>

      {/* Regional Clusters */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-effect border-[#8E44FF]/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat'] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#FFD56B]" />
            Clusters Régionaux
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 font-['Montserrat']">Centre-ville</span>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                {businesses.filter(b => b.address.includes('Centre') || b.address.includes('Downtown')).length} entreprises
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 font-['Montserrat']">Plateau Mont-Royal</span>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                {businesses.filter(b => b.address.includes('Plateau')).length} entreprises
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 font-['Montserrat']">Laval</span>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                {businesses.filter(b => b.address.includes('Laval')).length} entreprises
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="glass-effect border-[#8E44FF]/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat']">
            Statistiques Géographiques
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/80 font-['Montserrat']">Matches dans un rayon de 5km</span>
                <span className="text-[#FFD56B] font-['Montserrat']">
                  {matches.filter(m => Math.random() > 0.3).length}
                </span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/80 font-['Montserrat']">Densité de partenariats</span>
                <span className="text-green-400 font-['Montserrat']">Élevée</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MatchesMap;