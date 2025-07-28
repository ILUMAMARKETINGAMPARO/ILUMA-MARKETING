import React, { useState, useEffect } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import BusinessContextWizard from '@/components/simulator/BusinessContextWizard';
import TargetMindset from '@/components/simulator/TargetMindset';
import BudgetSlider from '@/components/simulator/BudgetSlider';
import NetworkSelector from '@/components/simulator/NetworkSelector';
import PersonaViewer from '@/components/simulator/PersonaViewer';
import CampaignTimeline from '@/components/simulator/CampaignTimeline';
import MagnetPulse from '@/components/simulator/MagnetPulse';
import InsightSummary from '@/components/simulator/InsightSummary';
import GalacticBreadcrumbs from '@/components/simulator/GalacticBreadcrumbs';
import FloatingLilo from '@/components/common/FloatingLilo';
import IntelligentLandingReveal from '@/components/simulator/IntelligentLandingReveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BusinessContext {
  industry: string;
  city: string;
  goal: string;
}

interface SimulatorData {
  selectedInterests: string[];
  budget: number;
  networks: string[];
  impressions: number;
  targetingStrength: number;
}

const SimulateurPage = () => {
  const [step, setStep] = useState(0);
  const [businessContext, setBusinessContext] = useState<BusinessContext | null>(null);
  const [simulatorData, setSimulatorData] = useState<SimulatorData>({
    selectedInterests: [],
    budget: 500,
    networks: ['Search'],
    impressions: 0,
    targetingStrength: 0
  });
  const [showResults, setShowResults] = useState(false);
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);

  const steps = [
    'Contexte Business',
    'Ciblage d\'Audience',
    'Budget & Réseaux',
    'Révision',
    'Résultats'
  ];

  useEffect(() => {
    // Calculate impressions based on budget and networks
    if (simulatorData.budget > 0) {
      const baseImpressions = simulatorData.budget * 10;
      const networkMultiplier = simulatorData.networks.length * 0.8;
      const targetingMultiplier = Math.max(0.5, simulatorData.targetingStrength);
      
      const estimatedImpressions = Math.round(baseImpressions * networkMultiplier * targetingMultiplier);
      setSimulatorData(prev => ({ ...prev, impressions: estimatedImpressions }));
    }
  }, [simulatorData.budget, simulatorData.networks, simulatorData.targetingStrength]);

  const handleBusinessContextComplete = (context: BusinessContext) => {
    setBusinessContext(context);
    setStep(1);
  };

  const handleInterestsChange = (interests: string[]) => {
    const strength = Math.min(1, interests.length / 10);
    setSimulatorData(prev => ({ 
      ...prev, 
      selectedInterests: interests,
      targetingStrength: strength
    }));
  };

  const handleBudgetChange = (budget: number) => {
    setSimulatorData(prev => ({ ...prev, budget }));
  };

  const handleNetworksChange = (networks: string[]) => {
    setSimulatorData(prev => ({ ...prev, networks }));
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="text-gradient bg-gradient-to-r from-cyan-400 to-purple-500">
                Simulateur Galactique
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Découvrez la puissance de vos campagnes publicitaires avec notre technologie IA
            </p>
            
            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="glass-effect rounded-full p-1">
                <Button
                  onClick={() => setIsBeginnerMode(true)}
                  variant={isBeginnerMode ? "default" : "ghost"}
                  className="rounded-full px-6"
                >
                  Mode Débutant
                </Button>
                <Button
                  onClick={() => setIsBeginnerMode(false)}
                  variant={!isBeginnerMode ? "default" : "ghost"}
                  className="rounded-full px-6"
                >
                  Mode Expert
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            {!showResults ? (
              <>
                {/* Breadcrumbs */}
                <GalacticBreadcrumbs steps={steps} currentStep={step} />

                {/* Step Content */}
                <Card className="glass-effect border-white/20 p-8 mb-8">
                  {step === 0 && (
                    <BusinessContextWizard
                      onComplete={handleBusinessContextComplete}
                      isBeginnerMode={isBeginnerMode}
                    />
                  )}

                  {step === 1 && businessContext && (
                    <TargetMindset
                      businessContext={businessContext}
                      selectedInterests={simulatorData.selectedInterests}
                      onInterestsChange={handleInterestsChange}
                      isBeginnerMode={isBeginnerMode}
                    />
                  )}

                  {step === 2 && (
                    <div className="space-y-8">
                      <BudgetSlider
                        budget={simulatorData.budget}
                        onBudgetChange={handleBudgetChange}
                        impressions={simulatorData.impressions}
                      />
                      <NetworkSelector
                        selectedNetworks={simulatorData.networks}
                        onNetworksChange={handleNetworksChange}
                        businessContext={businessContext}
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid lg:grid-cols-2 gap-8">
                      <PersonaViewer
                        interests={simulatorData.selectedInterests}
                        businessContext={businessContext}
                      />
                      <InsightSummary
                        data={simulatorData}
                        businessContext={businessContext}
                        isBeginnerMode={isBeginnerMode}
                      />
                    </div>
                  )}
                </Card>

                {/* Magnet Pulse Visualization */}
                {step > 0 && (
                  <div className="mb-8">
                    <MagnetPulse
                      targetingStrength={simulatorData.targetingStrength}
                      budget={simulatorData.budget}
                      impressions={simulatorData.impressions}
                    />
                  </div>
                )}

                {/* Campaign Timeline */}
                {step > 1 && (
                  <div className="mb-8">
                    <CampaignTimeline
                      budget={simulatorData.budget}
                      networks={simulatorData.networks}
                      duration={30}
                    />
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    onClick={prevStep}
                    disabled={step === 0}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  >
                    {step === steps.length - 1 ? 'Voir les Résultats' : 'Suivant'}
                  </Button>
                </div>
              </>
            ) : (
              <IntelligentLandingReveal
                simulatorData={simulatorData}
                businessContext={businessContext}
                onReset={() => {
                  setStep(0);
                  setShowResults(false);
                  setBusinessContext(null);
                  setSimulatorData({
                    selectedInterests: [],
                    budget: 500,
                    networks: ['Search'],
                    impressions: 0,
                    targetingStrength: 0
                  });
                }}
              />
            )}
          </div>
        </section>

        {/* LILO™ Assistant Intégré */}
        <FloatingLilo 
          currentPage="simulator"
          module="simulator"
          context={{
            page: 'simulator',
            userLevel: isBeginnerMode ? 'beginner' : 'advanced',
            recentActivity: [`step_${step}`, businessContext ? 'context_set' : 'context_pending'],
            industryContext: businessContext?.industry,
            currentGoals: businessContext ? [businessContext.goal] : []
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SimulateurPage;