import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import { GraduationCap, Users, Clock, Target, BookOpen, Gamepad2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import LiloGuide from '@/components/formation/LiloGuide';
import BadgeSystem from '@/components/formation/BadgeSystem';
import MiniGameWrapper from '@/components/formation/MiniGameWrapper';
import SmartSection from '@/components/formation/SmartSection';
import PromptLibrary from '@/components/formation/PromptLibrary';
import ComparisonTable from '@/components/formation/ComparisonTable';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { useLiloUX } from '@/hooks/useLiloUX';

// Simple mini-game components
const DragDropTree: React.FC<{ onScoreChange?: (score: number) => void; onGameEnd?: (score: number) => void; isActive?: boolean }> = 
  ({ onScoreChange, onGameEnd, isActive }) => {
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    const finalScore = 100;
    setScore(finalScore);
    setCompleted(true);
    onScoreChange?.(finalScore);
    onGameEnd?.(finalScore);
  };

  return (
    <div className="bg-white/5 rounded-lg p-6 text-center">
      <h4 className="text-white font-bold mb-4">🌳 Reconstitue l'arborescence Iluma</h4>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-white/10 rounded border-2 border-dashed border-white/30">
          <span className="text-white/80">📁 Pages</span>
        </div>
        <div className="p-4 bg-white/10 rounded border-2 border-dashed border-white/30">
          <span className="text-white/80">🧩 Modules</span>
        </div>
      </div>
      {!completed && (
        <Button onClick={handleComplete} className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black">
          Terminer l'exercice
        </Button>
      )}
      {completed && <p className="text-green-400">✅ Arborescence reconstituée !</p>}
    </div>
  );
};

const QuizModuleMatch: React.FC<{ onScoreChange?: (score: number) => void; onGameEnd?: (score: number) => void; isActive?: boolean }> = 
  ({ onScoreChange, onGameEnd, isActive }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  
  const questions = [
    { question: "Pour améliorer le SEO local ?", answer: "ILA™", options: ["ADLUMA™", "ILA™", "ILUMATCH™"] },
    { question: "Pour simuler un budget publicitaire ?", answer: "ADLUMA™", options: ["ADLUMA™", "ILA™", "CRM"] },
    { question: "Pour gérer les prospects ?", answer: "CRM", options: ["ADLUMA™", "ILA™", "CRM"] }
  ];

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === questions[currentQuestion].answer;
    const newScore = score + (isCorrect ? 33 : 0);
    setScore(newScore);
    onScoreChange?.(newScore);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onGameEnd?.(newScore);
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h4 className="text-white font-bold mb-4">
        Question {currentQuestion + 1}/{questions.length}
      </h4>
      <p className="text-white/80 mb-4">{questions[currentQuestion].question}</p>
      <div className="grid gap-2">
        {questions[currentQuestion].options.map((option) => (
          <Button
            key={option}
            onClick={() => handleAnswer(option)}
            variant="outline"
            className="border-white/20 text-white hover:bg-[#8E44FF]/20"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

const FormationIluma = () => {
  const { t, language } = useLanguage();
  const { liloMood, liloMessage, handleCTAHighlight } = useLiloUX();
  const [userLevel, setUserLevel] = useState<'débutant' | 'intermédiaire' | 'expert'>('débutant');
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [activeModule, setActiveModule] = useState(1);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const createModuleContent = (moduleKey: string, additionalContent?: React.ReactNode) => (
    <div className="text-white/90 space-y-4">
      <h3 className="text-2xl font-bold text-[#FFD56B]">{t(`formation.modules.${moduleKey}.title`)}</h3>
      <p>{t(`formation.modules.${moduleKey}.content`)}</p>
      {additionalContent}
    </div>
  );

  const modules = [
    {
      id: 1,
      title: t('formation.modules.lilo_intro.title'),
      description: t('formation.modules.lilo_intro.description'),
      content: createModuleContent('lilo_intro'),
      estimatedTime: 8,
      hasGame: false
    },
    {
      id: 2,
      title: t('formation.modules.why_iluma.title'),
      description: t('formation.modules.why_iluma.description'),
      content: createModuleContent('why_iluma'),
      estimatedTime: 10,
      hasGame: false
    },
    {
      id: 3,
      title: t('formation.modules.navigation.title'),
      description: t('formation.modules.navigation.description'),
      content: createModuleContent('navigation'),
      estimatedTime: 12,
      hasGame: false
    },
    {
      id: 4,
      title: t('formation.modules.method.title'),
      description: t('formation.modules.method.description'),
      content: createModuleContent('method'),
      estimatedTime: 18,
      hasGame: true,
      gameComponent: <DragDropTree />
    },
    {
      id: 5,
      title: t('formation.modules.prospection.title'),
      description: t('formation.modules.prospection.description'),
      content: createModuleContent('prospection', <ComparisonTable />),
      estimatedTime: 25,
      hasGame: false
    },
    {
      id: 6,
      title: t('formation.modules.ai_modules.title'),
      description: t('formation.modules.ai_modules.description'),
      content: createModuleContent('ai_modules'),
      estimatedTime: 20,
      hasGame: true,
      gameComponent: <QuizModuleMatch />
    },
    {
      id: 7,
      title: t('formation.modules.prompt_library.title'),
      description: t('formation.modules.prompt_library.description'),
      content: createModuleContent('prompt_library', <PromptLibrary />),
      estimatedTime: 30,
      hasGame: false
    },
    {
      id: 8,
      title: t('formation.modules.seo_basics.title'),
      description: t('formation.modules.seo_basics.description'),
      content: createModuleContent('seo_basics'),
      estimatedTime: 22,
      hasGame: false
    },
    {
      id: 9,
      title: t('formation.modules.ai_sge.title'),
      description: t('formation.modules.ai_sge.description'),
      content: createModuleContent('ai_sge'),
      estimatedTime: 15,
      hasGame: false
    },
    {
      id: 10,
      title: t('formation.modules.toolkit.title'),
      description: t('formation.modules.toolkit.description'),
      content: createModuleContent('toolkit'),
      estimatedTime: 12,
      hasGame: false
    },
    {
      id: 11,
      title: t('formation.modules.faq.title'),
      description: t('formation.modules.faq.description'),
      content: createModuleContent('faq'),
      estimatedTime: 10,
      hasGame: false
    },
    {
      id: 12,
      title: t('formation.modules.feedback.title'),
      description: t('formation.modules.feedback.description'),
      content: createModuleContent('feedback'),
      estimatedTime: 8,
      hasGame: false
    },
    {
      id: 13,
      title: t('formation.modules.updates.title'),
      description: t('formation.modules.updates.description'),
      content: createModuleContent('updates'),
      estimatedTime: 5,
      hasGame: false
    }
  ];

  useEffect(() => {
    const newProgress = (completedModules.length / modules.length) * 100;
    setProgress(newProgress);

    // Attribution des badges
    if (completedModules.includes(3) && !earnedBadges.includes('architecture')) {
      setEarnedBadges(prev => [...prev, 'architecture']);
    }
    if (completedModules.includes(4) && !earnedBadges.includes('logique')) {
      setEarnedBadges(prev => [...prev, 'logique']);
    }
    if (completedModules.length === modules.length && !earnedBadges.includes('complete')) {
      setEarnedBadges(prev => [...prev, 'complete']);
    }
  }, [completedModules, modules.length, earnedBadges]);

  const handleModuleComplete = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
    
    // Activer le module suivant
    if (moduleId < modules.length) {
      setActiveModule(moduleId + 1);
    }
  };

  const handleModuleStart = (moduleId: number) => {
    setActiveModule(moduleId);
  };

  const handleGameComplete = (gameId: string, score: number) => {
    console.log(`Game ${gameId} completed with score: ${score}`);
  };

  const handleDownloadBadge = () => {
    // Logique de téléchargement du badge
    console.log('Téléchargement du badge...');
  };

  const handleShareBadge = () => {
    // Logique de partage
    console.log('Partage du badge...');
  };

  return (
    <>
      <Helmet>
        <title>{language === 'fr' ? 'Formation Iluma™ - Certification Interactive' : 'Iluma™ Training - Interactive Certification'}</title>
        <meta name="description" content={language === 'fr' ? 'Formation complète et interactive à l\'univers Iluma™ avec IA guide, mini-jeux et certification.' : 'Complete interactive training to the Iluma™ universe with AI guide, mini-games and certification.'} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-full px-6 py-2 mb-6">
                <GraduationCap className="w-5 h-5 text-[#FFD56B]" />
                <span className="text-white font-['Montserrat']">Formation Certifiante</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Montserrat']">
                Formation{' '}
                <span className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent">
                  Iluma™
                </span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 font-['Montserrat']">
                {language === 'fr' 
                  ? 'Maîtrisez l\'univers Iluma™ avec votre guide IA LILO' 
                  : 'Master the Iluma™ universe with your AI guide LILO'
                }
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { icon: BookOpen, label: language === 'fr' ? 'Modules' : 'Modules', value: modules.length },
                  { icon: Gamepad2, label: language === 'fr' ? 'Mini-jeux' : 'Mini-games', value: '2' },
                  { icon: Clock, label: language === 'fr' ? 'Durée' : 'Duration', value: '70min' },
                  { icon: Target, label: language === 'fr' ? 'Certification' : 'Certification', value: '✓' }
                ].map((stat, index) => (
                  <Card key={index} className="glass-effect border-white/20 p-4 text-center">
                    <stat.icon className="w-6 h-6 text-[#FFD56B] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </Card>
                ))}
              </div>

              {/* User Level Selector */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <Users className="w-5 h-5 text-white/60" />
                <span className="text-white/80 font-['Montserrat']">Votre niveau :</span>
                <Select value={userLevel} onValueChange={(value: any) => setUserLevel(value)}>
                  <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="débutant">🌱 Débutant</SelectItem>
                    <SelectItem value="intermédiaire">⚡ Intermédiaire</SelectItem>
                    <SelectItem value="expert">🚀 Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Formation Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {modules.map((module) => (
              <SmartSection
                key={module.id}
                moduleId={module.id}
                title={module.title}
                description={module.description}
                content={module.content}
                gameComponent={module.hasGame ? (
                  <MiniGameWrapper
                    gameId={`module-${module.id}`}
                    title={`Défi Module ${module.id}`}
                    description="Testez vos connaissances avec ce mini-jeu interactif"
                    gameComponent={module.gameComponent || <div />}
                    onComplete={(score) => handleGameComplete(`module-${module.id}`, score)}
                    targetScore={80}
                    timeLimit={60}
                    rewardBadge={module.id === 3 ? "Architecture" : module.id === 4 ? "Logique" : undefined}
                  />
                ) : undefined}
                isCompleted={completedModules.includes(module.id)}
                isActive={activeModule === module.id}
                userLevel={userLevel}
                estimatedTime={module.estimatedTime}
                onComplete={() => handleModuleComplete(module.id)}
                onStart={() => handleModuleStart(module.id)}
              />
            ))}
          </div>
        </section>

        {/* LILO Guide */}
        <LiloGuide
          moduleId={activeModule}
          userLevel={userLevel}
          onHelp={() => console.log('Aide demandée')}
        />

        {/* Badge System */}
        <BadgeSystem
          isCompleted={completedModules.length === modules.length}
          progress={progress}
          earnedBadges={earnedBadges}
          onDownload={handleDownloadBadge}
          onShare={handleShareBadge}
        />


        <Footer />
      </div>
    </>
  );
};

export default FormationIluma;