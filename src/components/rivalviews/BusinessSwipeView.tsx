import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RivalBusiness } from '@/types/rivalviews.ts';
import { 
  ChevronUp, 
  ChevronDown, 
  Star, 
  TrendingUp, 
  MapPin, 
  Eye,
  X,
  BarChart3,
  Zap
} from 'lucide-react';

interface BusinessSwipeViewProps {
  businesses: RivalBusiness[];
  currentBusiness?: RivalBusiness;
  onBusinessSelect: (business: RivalBusiness) => void;
  onCompare: (business: RivalBusiness) => void;
  onClose: () => void;
  isVisible: boolean;
}

export const BusinessSwipeView: React.FC<BusinessSwipeViewProps> = ({
  businesses,
  currentBusiness,
  onBusinessSelect,
  onCompare,
  onClose,
  isVisible
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);

  // Filter out current business and sort by ILA score
  const availableBusinesses = businesses
    .filter(b => b.id !== currentBusiness?.id)
    .sort((a, b) => b.ilaScore - a.ilaScore)
    .slice(0, 10); // Show top 10 competitors

  const currentCard = availableBusinesses[currentIndex];

  const handleSwipeUp = () => {
    if (currentIndex < availableBusinesses.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleSwipeDown = () => {
    if (currentIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diff = startY.current - currentY.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleSwipeUp();
      } else {
        handleSwipeDown();
      }
    }
  };

  if (!isVisible || !currentCard) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-white">
            <h3 className="font-['Montserrat'] text-lg">Explorer les concurrents</h3>
            <p className="text-white/60 text-sm">{currentIndex + 1} / {availableBusinesses.length}</p>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Swipe Container */}
        <div 
          ref={containerRef}
          className="relative h-[600px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Card 
            className={`absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black border-[#8E44FF]/30 transition-all duration-300 ${
              isAnimating ? 'transform scale-95 opacity-80' : 'transform scale-100 opacity-100'
            }`}
          >
            <CardContent className="p-6 h-full flex flex-col">
              {/* Business Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-['Montserrat'] text-white mb-2">{currentCard.name}</h2>
                <p className="text-white/60 flex items-center justify-center gap-1 mb-4">
                  <MapPin className="w-4 h-4" />
                  {currentCard.address || currentCard.city}
                </p>
                
                {/* ILA Score */}
                <div className="inline-flex items-center gap-2 bg-[#8E44FF]/20 px-4 py-2 rounded-full border border-[#8E44FF]/30">
                  <Zap className="w-5 h-5 text-[#F5D06F]" />
                  <span className="text-[#8E44FF] font-bold text-lg">{currentCard.ilaScore}</span>
                  <span className="text-white/60 text-sm">/100</span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-white/60 text-sm">Trafic mensuel</span>
                  </div>
                  <div className="text-white font-bold">{currentCard.organicTraffic?.toLocaleString() || 'N/A'}</div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                    <span className="text-white/60 text-sm">Mots-clés</span>
                  </div>
                  <div className="text-white font-bold">{currentCard.indexedKeywords || 0}</div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white/60 text-sm">Note Google</span>
                  </div>
                  <div className="text-white font-bold">{currentCard.googleRating?.toFixed(1)} ★</div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <span className="text-white/60 text-sm">Position</span>
                  </div>
                  <div className="text-white font-bold">#{currentCard.serpRank || 'N/A'}</div>
                </div>
              </div>

              {/* Top Keyword */}
              {currentCard.topKeyword && (
                <div className="bg-gradient-to-r from-[#8E44FF]/10 to-purple-500/10 rounded-lg p-4 mb-6 border border-[#8E44FF]/20">
                  <div className="text-white/60 text-sm mb-1">Top mot-clé</div>
                  <div className="text-white font-bold">"{currentCard.topKeyword}"</div>
                  <div className="text-[#8E44FF] text-sm">{currentCard.topKeywordVolume?.toLocaleString()} recherches/mois</div>
                </div>
              )}

              {/* Status Badge */}
              <div className="flex justify-center mb-6">
                <Badge 
                  variant="outline" 
                  className={`${
                    currentCard.potential === 'high' ? 'border-red-400/30 text-red-400' :
                    currentCard.potential === 'medium' ? 'border-yellow-400/30 text-yellow-400' :
                    'border-green-400/30 text-green-400'
                  }`}
                >
                  Potentiel {currentCard.potential === 'high' ? 'Élevé' : currentCard.potential === 'medium' ? 'Moyen' : 'Faible'}
                </Badge>
              </div>

              {/* Actions */}
              <div className="mt-auto space-y-3">
                <Button 
                  onClick={() => onCompare(currentCard)}
                  className="w-full bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                >
                  Comparer avec cette entreprise
                </Button>
                <Button 
                  onClick={() => onBusinessSelect(currentCard)}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Voir sur la carte
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex flex-col gap-2">
            <Button
              onClick={handleSwipeDown}
              disabled={currentIndex === 0}
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-black/50 border border-white/20 disabled:opacity-30"
            >
              <ChevronUp className="w-5 h-5 text-white" />
            </Button>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex flex-col gap-2">
            <Button
              onClick={handleSwipeUp}
              disabled={currentIndex === availableBusinesses.length - 1}
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-black/50 border border-white/20 disabled:opacity-30"
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-1 mt-4">
          {availableBusinesses.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#8E44FF]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessSwipeView;