import React, { useState } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import StructuredData from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, MapPin, Target, Zap, BarChart3, Play, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';

// Import des étapes du simulateur
import StepOne from '@/components/simulator/ADLUMASteps/StepOne';
import StepTwo from '@/components/simulator/ADLUMASteps/StepTwo';
import StepThree from '@/components/simulator/ADLUMASteps/StepThree';
import StepFour from '@/components/simulator/ADLUMASteps/StepFour';

const ADLUMA = () => {
  const { t, language } = useLanguage();
  const [showSimulator, setShowSimulator] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [simulatorData, setSimulatorData] = useState<any>({});

  const handleStartSimulator = () => {
    setShowSimulator(true);
    setCurrentStep(1);
  };

  const handleStepOneNext = () => {
    setCurrentStep(2);
  };

  const handleStepTwoNext = (data: { interests: string[], description?: string }) => {
    setSimulatorData({ ...simulatorData, ...data });
    setCurrentStep(3);
  };

  const handleStepThreeNext = (data: { location: string, radius: number, cities: string[] }) => {
    setSimulatorData({ ...simulatorData, ...data });
    setCurrentStep(4);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowSimulator(false);
    }
  };

  if (showSimulator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <SEOHead />
        <StructuredData type="WebSite" />
        
        <Navigation />
        
        <main className="pt-20 min-h-screen" id="main-content">
          <Breadcrumbs />
          <div className="container mx-auto px-4 py-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                  {t('adlumaContent.step')} {currentStep} {t('adlumaContent.of')} 4
                </Badge>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: "25%" }}
                  animate={{ width: `${(currentStep / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Étapes du simulateur */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <StepOne
                  key="step1"
                  onNext={handleStepOneNext}
                  language={language as 'fr' | 'en' | 'es'}
                />
              )}
              {currentStep === 2 && (
                <StepTwo
                  key="step2"
                  onNext={handleStepTwoNext}
                  onBack={handleBack}
                  language={language as 'fr' | 'en' | 'es'}
                />
              )}
              {currentStep === 3 && (
                <StepThree
                  key="step3"
                  onNext={handleStepThreeNext}
                  onBack={handleBack}
                  language={language as 'fr' | 'en' | 'es'}
                />
              )}
              {currentStep === 4 && (
                <StepFour
                  key="step4"
                  onBack={handleBack}
                  language={language as 'fr' | 'en' | 'es'}
                  data={simulatorData}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <SEOHead />
      <StructuredData type="WebSite" />
      
      <Navigation />
      
      <main className="pt-20" id="main-content">
        <Breadcrumbs />
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden" aria-labelledby="adluma-hero">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 border-purple-400/30 text-purple-300">
                <Zap className="w-4 h-4 mr-2" />
                {t('adlumaContent.badge')}
              </Badge>
              <h1 id="adluma-hero" className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-gradient">ADLUMA™</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {t('adlumaContent.hero.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  onClick={handleStartSimulator}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t('adlumaContent.cta.start')}
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  <Info className="w-5 h-5 mr-2" />
                  {t('adlumaContent.cta.howItWorks')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20" aria-labelledby="features-title">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('adlumaContent.features.title')}
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                {t('adlumaContent.features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="glass-effect border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{t('adlumaContent.features.step1.title')}</CardTitle>
                  <CardDescription className="text-white/70">
                    {t('adlumaContent.features.step1.description')}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="glass-effect border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{t('adlumaContent.features.step2.title')}</CardTitle>
                  <CardDescription className="text-white/70">
                    {t('adlumaContent.features.step2.description')}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="glass-effect border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{t('adlumaContent.features.step3.title')}</CardTitle>
                  <CardDescription className="text-white/70">
                    {t('adlumaContent.features.step3.description')}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="glass-effect border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{t('adlumaContent.features.step4.title')}</CardTitle>
                  <CardDescription className="text-white/70">
                    {t('adlumaContent.features.step4.description')}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Demo Preview Section */}
        <section className="py-20" aria-labelledby="demo-section">
          <div className="container mx-auto px-4">
            <Card className="glass-effect border-purple-500/30 max-w-4xl mx-auto">
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h3 id="demo-section" className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t('adlumaContent.final.title')}
                </h3>
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                  {t('adlumaContent.final.description')}
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8"
                  onClick={handleStartSimulator}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t('adlumaContent.final.cta')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ADLUMA;