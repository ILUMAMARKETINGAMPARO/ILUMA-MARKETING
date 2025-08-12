import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, Target, Zap, ArrowRight, CheckCircle, Users, TrendingUp, Star, 
  MapPin, Lightbulb, BarChart3, ChevronLeft, ChevronRight, Sparkles,
  Building, DollarSign, Clock, Trophy, Rocket, Heart, Eye
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FormData {
  company: string;
  industry: string;
  size: string;
  budget: string;
  goals: string[];
  timeline: string;
  challenges: string;
  experience: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

const IlumatchMobile = () => {
  const { t } = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    company: '',
    industry: '',
    size: '',
    budget: '',
    goals: [],
    timeline: '',
    challenges: '',
    experience: '',
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const [matchResult, setMatchResult] = useState<any>(null);

  const steps = [
    { 
      id: 'intro', 
      title: 'Bienvenue', 
      icon: Sparkles, 
      color: 'from-purple-500 to-pink-500',
      description: 'Découvrez ILUMATCH™'
    },
    { 
      id: 'company', 
      title: 'Entreprise', 
      icon: Building, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Parlez-nous de votre entreprise'
    },
    { 
      id: 'goals', 
      title: 'Objectifs', 
      icon: Target, 
      color: 'from-green-500 to-emerald-500',
      description: 'Vos objectifs marketing'
    },
    { 
      id: 'budget', 
      title: 'Budget', 
      icon: DollarSign, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Investissement prévu'
    },
    { 
      id: 'timeline', 
      title: 'Planning', 
      icon: Clock, 
      color: 'from-indigo-500 to-purple-500',
      description: 'Calendrier de lancement'
    },
    { 
      id: 'contact', 
      title: 'Contact', 
      icon: Heart, 
      color: 'from-pink-500 to-red-500',
      description: 'Vos coordonnées'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      processMatching();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const processMatching = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setMatchResult({
        score: 96,
        confidence: 'Très élevée',
        services: [
          { 
            name: 'SEO-IA Avancé', 
            compatibility: 98, 
            priority: 'Critique',
            description: 'Référencement intelligent avec IA prédictive',
            roi: '+340%',
            timeline: '2-4 semaines'
          },
          { 
            name: 'Landing Page IA', 
            compatibility: 94, 
            priority: 'Élevée',
            description: 'Pages de conversion optimisées par IA',
            roi: '+270%',
            timeline: '1-2 semaines'
          },
          { 
            name: 'BlogIA Pro', 
            compatibility: 89, 
            priority: 'Importante',
            description: 'Contenu automatisé et optimisé SEO',
            roi: '+180%',
            timeline: '3-5 semaines'
          }
        ],
        recommendations: [
          '🚀 Commencez par le SEO-IA pour une base solide',
          '💎 Ajoutez les Landing Pages pour maximiser les conversions',
          '📝 Intégrez BlogIA pour le contenu long-terme',
          '📊 Activez le monitoring temps réel pour optimiser en continu'
        ],
        nextSteps: [
          'Audit gratuit de votre situation actuelle',
          'Stratégie personnalisée en 48h',
          'Déploiement progressif des modules IA',
          'Formation de votre équipe incluse'
        ]
      });
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const goalsList = [
    { id: 'traffic', label: '🚀 Augmenter le trafic web', icon: TrendingUp },
    { id: 'leads', label: '🎯 Générer plus de leads', icon: Target },
    { id: 'conversions', label: '💰 Améliorer les conversions', icon: DollarSign },
    { id: 'brand', label: '⭐ Renforcer la notoriété', icon: Star },
    { id: 'seo', label: '🔍 Optimiser le SEO', icon: Eye },
    { id: 'automation', label: '🤖 Automatiser le marketing', icon: Zap },
    { id: 'retention', label: '❤️ Fidéliser les clients', icon: Heart },
    { id: 'international', label: '🌍 Expansion internationale', icon: MapPin }
  ];

  if (showResults && matchResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto"
        >
          {/* Header Results */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              Match Parfait !
            </h1>
            
            <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {matchResult.score}%
            </div>
            
            <p className="text-white/80 text-lg">
              Compatibilité {matchResult.confidence.toLowerCase()}
            </p>
          </div>

          {/* Services Recommandés */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              🎯 Solutions Recommandées
            </h2>
            
            {matchResult.services.map((service: any, index: number) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {service.name}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {service.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs border-0 ${
                          service.priority === 'Critique' ? 'bg-red-500/20 text-red-300' :
                          service.priority === 'Élevée' ? 'bg-orange-500/20 text-orange-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {service.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-green-400 font-bold text-sm">
                            {service.roi}
                          </div>
                          <div className="text-white/60 text-xs">ROI</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 font-bold text-sm">
                            {service.timeline}
                          </div>
                          <div className="text-white/60 text-xs">Délai</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">Compatibilité</span>
                        <span className="text-white font-semibold">{service.compatibility}%</span>
                      </div>
                      <Progress value={service.compatibility} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Prochaines Étapes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Prochaines Étapes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {matchResult.nextSteps.map((step: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-white/80 text-sm">{step}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 text-lg"
            >
              🚀 Commencer Mon Transformation
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full border-white/30 text-white hover:bg-white/10 py-4"
            >
              📞 Parler à un Expert
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="w-full text-white/70 hover:text-white hover:bg-white/5"
              onClick={() => {
                setShowResults(false);
                setCurrentStep(0);
                setFormData({
                  company: '',
                  industry: '',
                  size: '',
                  budget: '',
                  goals: [],
                  timeline: '',
                  challenges: '',
                  experience: '',
                  contact: { name: '', email: '', phone: '' }
                });
              }}
            >
              🔄 Refaire l'Analyse
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm mx-auto"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-6"
          >
            <Brain className="w-24 h-24 text-purple-400" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            🧠 IA en Analyse...
          </h2>
          
          <p className="text-white/70 mb-6">
            Notre intelligence artificielle analyse vos besoins pour trouver les solutions parfaites
          </p>
          
          <div className="space-y-3 text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 text-white/80"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              Analyse de votre secteur d'activité
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 text-white/80"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              Évaluation de vos objectifs
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-3 text-white/80"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              Calcul de compatibilité avancé
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex items-center gap-3 text-white/80"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
              </motion.div>
              Génération des recommandations
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-6">
      <div className="max-w-lg mx-auto">
        {/* Header avec progression */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`p-2 rounded-full ${
                currentStep === 0 
                  ? 'bg-white/5 text-white/30' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-colors`}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <div className="text-center flex-1">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${currentStepData.color} flex items-center justify-center`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">
                {currentStepData.title}
              </h1>
              <p className="text-white/70 text-sm">
                {currentStepData.description}
              </p>
            </div>
            
            <div className="w-10 h-10" /> {/* Spacer */}
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-white flex-1'
                    : index < currentStep
                    ? 'bg-green-400 w-8'
                    : 'bg-white/20 w-8'
                }`}
              />
            ))}
          </div>
          
          <div className="text-center">
            <span className="text-white/60 text-sm">
              Étape {currentStep + 1} sur {steps.length}
            </span>
          </div>
        </div>

        {/* Contenu des étapes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur border-white/20 mb-8">
              <CardContent className="p-6">
                {/* Étape Intro */}
                {currentStep === 0 && (
                  <div className="text-center space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-white">
                        Bienvenue sur ILUMATCH™
                      </h2>
                      <p className="text-white/80 text-lg leading-relaxed">
                        Notre IA va analyser vos besoins en quelques questions pour vous proposer les solutions marketing parfaites.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white/80">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span>Analyse intelligente par IA</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <Target className="w-5 h-5 text-blue-400" />
                        <span>Solutions personnalisées</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <Rocket className="w-5 h-5 text-green-400" />
                        <span>Résultats en 2 minutes</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Étape Entreprise */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/80 mb-2 font-medium">
                        Nom de votre entreprise
                      </label>
                      <Input
                        placeholder="Ex: Mon Entreprise"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2 font-medium">
                        Secteur d'activité
                      </label>
                      <Select onValueChange={(value) => setFormData({...formData, industry: value})}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Choisissez votre secteur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecommerce">🛒 E-commerce</SelectItem>
                          <SelectItem value="saas">💻 SaaS / Logiciel</SelectItem>
                          <SelectItem value="services">🔧 Services</SelectItem>
                          <SelectItem value="retail">🏪 Commerce de détail</SelectItem>
                          <SelectItem value="healthcare">🏥 Santé</SelectItem>
                          <SelectItem value="finance">💰 Finance</SelectItem>
                          <SelectItem value="education">🎓 Éducation</SelectItem>
                          <SelectItem value="restaurant">🍽️ Restauration</SelectItem>
                          <SelectItem value="beauty">💄 Beauté</SelectItem>
                          <SelectItem value="fitness">🏋️ Fitness</SelectItem>
                          <SelectItem value="other">🔄 Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-2 font-medium">
                        Taille de l'entreprise
                      </label>
                      <Select onValueChange={(value) => setFormData({...formData, size: value})}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Nombre d'employés" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solo">👤 Solo (1 personne)</SelectItem>
                          <SelectItem value="small">👥 Petite (2-10)</SelectItem>
                          <SelectItem value="medium">🏢 Moyenne (11-50)</SelectItem>
                          <SelectItem value="large">🏭 Grande (51-200)</SelectItem>
                          <SelectItem value="enterprise">🌆 Entreprise (200+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Étape Objectifs */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Quels sont vos objectifs marketing ? (plusieurs choix possibles)
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {goalsList.map((goal) => {
                          const isSelected = formData.goals.includes(goal.id);
                          return (
                            <motion.button
                              key={goal.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleGoal(goal.id)}
                              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                isSelected
                                  ? 'border-purple-400 bg-purple-500/20 text-white'
                                  : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{goal.label}</span>
                                {isSelected && (
                                  <CheckCircle className="w-5 h-5 text-purple-400" />
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Étape Budget */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Quel est votre budget marketing mensuel ?
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: 'under1k', label: '💡 Moins de 1 000€', desc: 'Starter Pack' },
                          { value: '1k-5k', label: '🚀 1 000€ - 5 000€', desc: 'Pack Croissance' },
                          { value: '5k-10k', label: '⭐ 5 000€ - 10 000€', desc: 'Pack Performance' },
                          { value: '10k-25k', label: '💎 10 000€ - 25 000€', desc: 'Pack Premium' },
                          { value: 'over25k', label: '👑 Plus de 25 000€', desc: 'Pack Enterprise' }
                        ].map((budget) => (
                          <motion.button
                            key={budget.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({...formData, budget: budget.value})}
                            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                              formData.budget === budget.value
                                ? 'border-green-400 bg-green-500/20 text-white'
                                : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{budget.label}</div>
                                <div className="text-sm text-white/60">{budget.desc}</div>
                              </div>
                              {formData.budget === budget.value && (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Étape Timeline */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Quand souhaitez-vous démarrer ?
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: 'asap', label: '🚀 Dès que possible', desc: 'Lancement immédiat' },
                          { value: '1month', label: '📅 Dans 1 mois', desc: 'Préparation optimale' },
                          { value: '3months', label: '🎯 Dans 3 mois', desc: 'Planification détaillée' },
                          { value: '6months', label: '📊 Dans 6 mois', desc: 'Stratégie long terme' },
                          { value: 'flexible', label: '🤔 Je ne sais pas encore', desc: 'Besoin de conseils' }
                        ].map((timeline) => (
                          <motion.button
                            key={timeline.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({...formData, timeline: timeline.value})}
                            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                              formData.timeline === timeline.value
                                ? 'border-blue-400 bg-blue-500/20 text-white'
                                : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{timeline.label}</div>
                                <div className="text-sm text-white/60">{timeline.desc}</div>
                              </div>
                              {formData.timeline === timeline.value && (
                                <CheckCircle className="w-5 h-5 text-blue-400" />
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Étape Contact */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Dernière étape ! 🎉
                      </h3>
                      <p className="text-white/70">
                        Comment pouvons-nous vous recontacter avec vos résultats ?
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 mb-2 font-medium">
                          Votre nom
                        </label>
                        <Input
                          placeholder="Ex: Jean Dupont"
                          value={formData.contact.name}
                          onChange={(e) => setFormData({
                            ...formData, 
                            contact: {...formData.contact, name: e.target.value}
                          })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/80 mb-2 font-medium">
                          Email professionnel
                        </label>
                        <Input
                          type="email"
                          placeholder="jean@monentreprise.com"
                          value={formData.contact.email}
                          onChange={(e) => setFormData({
                            ...formData, 
                            contact: {...formData.contact, email: e.target.value}
                          })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/80 mb-2 font-medium">
                          Téléphone (optionnel)
                        </label>
                        <Input
                          type="tel"
                          placeholder="+33 6 12 34 56 78"
                          value={formData.contact.phone}
                          onChange={(e) => setFormData({
                            ...formData, 
                            contact: {...formData.contact, phone: e.target.value}
                          })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Boutons de navigation */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1 border-white/30 text-white hover:bg-white/10 py-3"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!formData.company || !formData.industry || !formData.size)) ||
              (currentStep === 2 && formData.goals.length === 0) ||
              (currentStep === 3 && !formData.budget) ||
              (currentStep === 4 && !formData.timeline) ||
              (currentStep === 5 && (!formData.contact.name || !formData.contact.email))
            }
            className={`${currentStep === 0 ? 'w-full' : 'flex-1'} bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Lancer l'Analyse IA
              </>
            ) : (
              <>
                {currentStep === 0 ? 'Commencer' : 'Suivant'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IlumatchMobile;