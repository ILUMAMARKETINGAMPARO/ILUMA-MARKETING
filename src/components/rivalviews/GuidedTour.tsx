import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RivalBusiness } from '@/types/rivalviews';
import { 
  MapPin, 
  Navigation, 
  Eye, 
  TrendingUp, 
  Star, 
  Zap,
  ChevronRight,
  ChevronLeft,
  X,
  Lightbulb,
  Target
} from 'lucide-react';

interface GuidedTourProps {
  businesses: RivalBusiness[];
  currentBusiness?: RivalBusiness;
  onBusinessSelect: (business: RivalBusiness) => void;
  onClose: () => void;
  isVisible: boolean;
}

interface TourStep {
  business: RivalBusiness;
  insight: string;
  opportunity: string;
  focusArea: 'traffic' | 'keywords' | 'rating' | 'position' | 'overall';
}

export const GuidedTour: React.FC<GuidedTourProps> = ({
  businesses,
  currentBusiness,
  onBusinessSelect,
  onClose,
  isVisible
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tourSteps, setTourSteps] = useState<TourStep[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Generate tour steps when component mounts
  useEffect(() => {
    if (businesses.length > 0) {
      generateTourSteps();
    }
  }, [businesses, currentBusiness]);

  const generateTourSteps = () => {
    // Select 5 interesting businesses for the tour
    const filtered = businesses
      .filter(b => b.id !== currentBusiness?.id)
      .sort((a, b) => b.ilaScore - a.ilaScore);

    const topPerformer = filtered[0];
    const highTraffic = filtered.find(b => b.organicTraffic > 2000) || filtered[1];
    const highRating = filtered.find(b => b.googleRating >= 4.5) || filtered[2];
    const competitor = filtered.find(b => b.sector === currentBusiness?.sector) || filtered[3];
    const opportunity = filtered.find(b => b.ilaScore < 60) || filtered[4];

    const steps: TourStep[] = [
      {
        business: topPerformer,
        insight: `${topPerformer.name} domine le marché local avec un score ILA™ de ${topPerformer.ilaScore}. Leur secret ? Une stratégie SEO optimale et une forte présence en ligne.`,
        opportunity: `Analysez leurs mots-clés principaux et leur stratégie de contenu pour identifier des opportunités dans votre secteur.`,
        focusArea: 'overall' as const
      },
      {
        business: highTraffic,
        insight: `${highTraffic.name} génère ${highTraffic.organicTraffic?.toLocaleString()} visiteurs mensuels grâce à une stratégie de contenu ciblée et des mots-clés très performants.`,
        opportunity: `Explorez leurs pages les plus visitées et reproduisez leur approche pour augmenter votre trafic organique.`,
        focusArea: 'traffic' as const
      },
      {
        business: highRating,
        insight: `${highRating.name} maintient une excellente réputation avec ${highRating.googleRating}/5 étoiles et ${highRating.reviewCount} avis clients positifs.`,
        opportunity: `Améliorez votre service client et développez une stratégie d'avis pour rivaliser avec leur réputation.`,
        focusArea: 'rating' as const
      },
      {
        business: competitor,
        insight: `${competitor.name} est votre concurrent direct dans le secteur ${competitor.sector}. Leur position actuelle vous donne des indices sur le marché local.`,
        opportunity: `Identifiez leurs points faibles et développez une stratégie pour vous démarquer dans votre niche.`,
        focusArea: 'position' as const
      },
      {
        business: opportunity,
        insight: `${opportunity.name} présente des lacunes importantes (Score ILA™: ${opportunity.ilaScore}). C'est une opportunité de marché à saisir.`,
        opportunity: `Ciblez leur clientèle avec une offre supérieure et une meilleure visibilité en ligne pour gagner des parts de marché.`,
        focusArea: 'overall' as const
      }
    ].filter(step => step.business);

    setTourSteps(steps);
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      onBusinessSelect(tourSteps[currentStep + 1].business);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      onBusinessSelect(tourSteps[currentStep - 1].business);
    }
  };

  const handleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && currentStep < tourSteps.length - 1) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentStep, tourSteps.length]);

  if (!isVisible || tourSteps.length === 0) return null;

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  const getFocusIcon = (focusArea: string) => {
    switch (focusArea) {
      case 'traffic':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'keywords':
        return <Target className="w-5 h-5 text-blue-400" />;
      case 'rating':
        return <Star className="w-5 h-5 text-yellow-400" />;
      case 'position':
        return <Eye className="w-5 h-5 text-purple-400" />;
      default:
        return <Zap className="w-5 h-5 text-[#F5D06F]" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-black/90 border-[#8E44FF]/30">
        <CardHeader className="border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Navigation className="w-6 h-6 text-[#8E44FF]" />
              <div>
                <CardTitle className="text-white text-xl font-['Montserrat']">
                  Tour Guidé IA du Marché Local
                </CardTitle>
                <p className="text-white/60 text-sm">
                  Étape {currentStep + 1} sur {tourSteps.length}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAutoPlay}
                variant="outline"
                size="sm"
                className={`border-[#8E44FF]/30 ${isAutoPlaying ? 'bg-[#8E44FF]/20 text-[#8E44FF]' : 'text-white/60'}`}
              >
                {isAutoPlaying ? 'Pause' : 'Auto'}
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-3 h-2" />
        </CardHeader>

        <CardContent className="p-6">
          {/* Current Business Highlight */}
          <Card className="mb-6 bg-gradient-to-br from-[#8E44FF]/10 to-purple-500/10 border-[#8E44FF]/30">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-['Montserrat'] text-white mb-1">
                    {currentTourStep.business.name}
                  </h3>
                  <p className="text-white/60 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {currentTourStep.business.city}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#8E44FF]">
                    {currentTourStep.business.ilaScore}
                  </div>
                  <div className="text-sm text-white/60">Score ILA™</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-sm text-white/60">Trafic</div>
                  <div className="text-white font-semibold">
                    {currentTourStep.business.organicTraffic?.toLocaleString() || 'N/A'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-white/60">Mots-clés</div>
                  <div className="text-white font-semibold">
                    {currentTourStep.business.indexedKeywords || 0}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-white/60">Note</div>
                  <div className="text-white font-semibold">
                    {currentTourStep.business.googleRating?.toFixed(1)} ★
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insight */}
          <Card className="mb-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {getFocusIcon(currentTourStep.focusArea)}
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    Analyse IA
                    <Badge variant="outline" className="text-blue-400 border-blue-400/30 text-xs">
                      Insight
                    </Badge>
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {currentTourStep.insight}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opportunity */}
          <Card className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400" />
                <div>
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    Opportunité pour vous
                    <Badge variant="outline" className="text-green-400 border-green-400/30 text-xs">
                      Action
                    </Badge>
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {currentTourStep.opportunity}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            <div className="text-center">
              <Button
                onClick={() => onBusinessSelect(currentTourStep.business)}
                variant="outline"
                size="sm"
                className="border-[#8E44FF]/30 text-[#8E44FF] hover:bg-[#8E44FF]/10"
              >
                Voir sur la carte
              </Button>
            </div>

            <Button
              onClick={handleNext}
              disabled={currentStep === tourSteps.length - 1}
              className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white disabled:opacity-30"
            >
              Suivant
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Tour completion */}
          {currentStep === tourSteps.length - 1 && (
            <div className="mt-4 text-center">
              <p className="text-white/60 text-sm mb-3">
                🎉 Félicitations ! Vous avez terminé le tour guidé du marché local.
              </p>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-[#8E44FF] to-purple-600 hover:from-[#8E44FF]/80 hover:to-purple-600/80 text-white"
              >
                Commencer mon analyse personnalisée
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidedTour;