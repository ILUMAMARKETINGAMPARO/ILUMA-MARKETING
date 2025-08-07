import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';

import ILUMATCHSEO from '@/components/seo/ILUMATCHSEO';
import { useLiloUX } from '@/hooks/useLiloUX';
import { useTranslations } from '@/hooks/useTranslations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Target, Zap, ArrowRight, CheckCircle, Users, TrendingUp, Star, MapPin, Lightbulb, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Illumatch = () => {
  const { t } = useTranslations();
  const { liloMood, liloMessage, handleCTAHighlight } = useLiloUX();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    size: '',
    budget: '',
    goals: [],
    timeline: '',
    challenges: '',
    experience: ''
  });

  const [matchResult, setMatchResult] = useState(null);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Process matching
      processMatching();
    }
  };

  const processMatching = () => {
    // Simulate AI matching process
    setTimeout(() => {
      setMatchResult({
        score: 94,
        services: [
          { name: 'SEO-IA', compatibility: 96, priority: t('ilumatch.results.priority.high') },
          { name: 'Landing Page Intelligente', compatibility: 89, priority: t('ilumatch.results.priority.medium') },
          { name: 'BlogIA', compatibility: 82, priority: t('ilumatch.results.priority.medium') }
        ],
        recommendations: [
          'Commencez par le SEO-IA pour une base solide',
          'Intégrez ensuite les Landing Pages pour maximiser les conversions',
          'Complétez avec BlogIA pour le contenu long-terme'
        ]
      });
      setCurrentStep(5);
    }, 2000);
  };

  const steps = [
    { title: t('ilumatch.steps.company') || 'Votre Entreprise', icon: Users },
    { title: t('ilumatch.steps.goals') || 'Vos Objectifs', icon: Target },
    { title: t('ilumatch.form.challenges.title') || 'Vos Défis', icon: TrendingUp },
    { title: t('ilumatch.form.strategy.title') || 'Stratégie IA', icon: Brain },
    { title: t('ilumatch.results.title') || 'Résultats', icon: Star }
  ];

  const goalsList = [
    t('ilumatch.goals.traffic'),
    t('ilumatch.goals.leads'),
    t('ilumatch.goals.conversions'),
    t('ilumatch.goals.brand'),
    t('ilumatch.goals.seo'),
    t('ilumatch.goals.automation'),
    t('ilumatch.goals.retention'),
    t('ilumatch.goals.international')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-900/20 to-black">
      <ILUMATCHSEO />
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-indigo-400" />
              <span className="text-indigo-300 font-medium text-lg font-['Montserrat']">{t('ilumatch.hero.badge') || 'ILUMATCH™ - Matching IA'}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-indigo-100 to-cyan-100 bg-clip-text text-transparent mb-6 font-['Montserrat'] leading-tight">
              {t('ilumatch.subtitle') || 'Trouvez votre client idéal avec l\'intelligence artificielle'}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-['Montserrat']">
              {t('ilumatch.description') || 'Notre IA analyse et met en relation les entreprises avec leurs prospects parfaits'}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                
                return (
                  <div key={step.title} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted ? 'bg-green-500 border-green-500' :
                      isActive ? 'bg-indigo-600 border-indigo-600' :
                      'bg-black/40 border-white/20'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/40'}`} />
                      )}
                    </div>
                    <span className={`text-sm mt-2 font-['Montserrat'] ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <Progress value={(currentStep / 5) * 100} className="h-2" />
          </motion.div>

          {/* Form Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-effect border-white/20 p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-6 font-['Montserrat']">{t('ilumatch.form.company.title') || 'Informations Entreprise'}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 mb-2 font-['Montserrat']">{t('ilumatch.form.company.name') || 'Nom de l\'entreprise'}</label>
                      <Input
                        placeholder={t('ilumatch.form.company.name') || 'Ex: Mon Entreprise'}
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="bg-black/20 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2 font-['Montserrat']">{t('ilumatch.form.company.industry') || 'Secteur d\'activité'}</label>
                      <Select onValueChange={(value) => setFormData({...formData, industry: value})}>
                        <SelectTrigger className="bg-black/20 border-white/20 text-white">
                          <SelectValue placeholder={t('ilumatch.form.company.industry') || 'Sélectionnez votre secteur'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="saas">SaaS / Logiciel</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="retail">Commerce de détail</SelectItem>
                          <SelectItem value="healthcare">Santé</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Éducation</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2 font-['Montserrat']">{t('ilumatch.form.company.size') || 'Taille de l\'entreprise'}</label>
                      <Select onValueChange={(value) => setFormData({...formData, size: value})}>
                        <SelectTrigger className="bg-black/20 border-white/20 text-white">
                          <SelectValue placeholder={t('ilumatch.form.company.size') || 'Nombre d\'employés'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solo">Solo (1 personne)</SelectItem>
                          <SelectItem value="small">Petite (2-10)</SelectItem>
                          <SelectItem value="medium">Moyenne (11-50)</SelectItem>
                          <SelectItem value="large">Grande (51-200)</SelectItem>
                          <SelectItem value="enterprise">Entreprise (200+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2 font-['Montserrat']">{t('ilumatch.form.company.budget') || 'Budget marketing mensuel'}</label>
                      <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
                        <SelectTrigger className="bg-black/20 border-white/20 text-white">
                          <SelectValue placeholder={t('ilumatch.form.company.budget') || 'Sélectionnez votre budget'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under1k">Moins de 1 000€</SelectItem>
                          <SelectItem value="1k-5k">1 000€ - 5 000€</SelectItem>
                          <SelectItem value="5k-10k">5 000€ - 10 000€</SelectItem>
                          <SelectItem value="10k-25k">10 000€ - 25 000€</SelectItem>
                          <SelectItem value="over25k">Plus de 25 000€</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-6 font-['Montserrat']">{t('ilumatch.form.goals.title')}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {goalsList.map((goal) => (
                      <div key={goal} className="flex items-center space-x-3 p-3 rounded-lg border border-white/20 hover:border-indigo-500/50 transition-colors cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                        <span className="text-white font-['Montserrat']">{goal}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 font-['Montserrat']">{t('ilumatch.form.goals.timeline')}</label>
                    <Select onValueChange={(value) => setFormData({...formData, timeline: value})}>
                      <SelectTrigger className="bg-black/20 border-white/20 text-white">
                        <SelectValue placeholder={t('ilumatch.form.goals.timeline_placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">{t('ilumatch.options.timeline.asap')}</SelectItem>
                        <SelectItem value="1month">{t('ilumatch.options.timeline.1month')}</SelectItem>
                        <SelectItem value="3months">{t('ilumatch.options.timeline.3months')}</SelectItem>
                        <SelectItem value="6months">{t('ilumatch.options.timeline.6months')}</SelectItem>
                        <SelectItem value="flexible">{t('ilumatch.options.timeline.flexible')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-6 font-['Montserrat']">{t('ilumatch.form.challenges.title')}</h2>
                  <div>
                    <label className="block text-white/80 mb-2 font-['Montserrat']">{t('ilumatch.form.challenges.description')}</label>
                    <Textarea
                      placeholder={t('ilumatch.form.challenges.description_placeholder')}
                      value={formData.challenges}
                      onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                      className="bg-black/20 border-white/20 text-white min-h-32"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 font-['Montserrat']">{t('ilumatch.form.challenges.experience')}</label>
                    <Select onValueChange={(value) => setFormData({...formData, experience: value})}>
                      <SelectTrigger className="bg-black/20 border-white/20 text-white">
                        <SelectValue placeholder={t('ilumatch.form.challenges.experience_placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">{t('ilumatch.options.experience.beginner')}</SelectItem>
                        <SelectItem value="intermediate">{t('ilumatch.options.experience.intermediate')}</SelectItem>
                        <SelectItem value="advanced">{t('ilumatch.options.experience.advanced')}</SelectItem>
                        <SelectItem value="expert">{t('ilumatch.options.experience.expert')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-6 font-['Montserrat']">{t('ilumatch.form.strategy.title')}</h2>
                  <div className="bg-black/20 rounded-xl p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-white/60 font-['Montserrat']">{t('ilumatch.form.company.name')}:</span>
                        <div className="text-white font-medium font-['Montserrat']">{formData.company || t('ilumatch.form.strategy.not_specified')}</div>
                      </div>
                      <div>
                        <span className="text-white/60 font-['Montserrat']">{t('ilumatch.form.company.industry')}:</span>
                        <div className="text-white font-medium font-['Montserrat']">{formData.industry || t('ilumatch.form.strategy.not_specified')}</div>
                      </div>
                      <div>
                        <span className="text-white/60 font-['Montserrat']">{t('ilumatch.form.company.size')}:</span>
                        <div className="text-white font-medium font-['Montserrat']">{formData.size || t('ilumatch.form.strategy.not_specified')}</div>
                      </div>
                      <div>
                        <span className="text-white/60 font-['Montserrat']">{t('ilumatch.form.company.budget')}:</span>
                        <div className="text-white font-medium font-['Montserrat']">{formData.budget || t('ilumatch.form.strategy.not_specified')}</div>
                      </div>
                    </div>
                    {formData.challenges && (
                      <div>
                        <span className="text-white/60 font-['Montserrat']">{t('ilumatch.form.strategy.main_challenges')}:</span>
                        <div className="text-white/80 mt-1 font-['Montserrat']">{formData.challenges}</div>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 mb-4 font-['Montserrat']">{t('ilumatch.form.strategy.ai_analysis')}</p>
                  </div>
                </div>
              )}

              {currentStep === 5 && matchResult && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">{t('ilumatch.results.title')}</h2>
                    <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2 font-['Montserrat']">
                      {matchResult.score}%
                    </div>
                    <p className="text-white/80 font-['Montserrat']">{t('ilumatch.results.compatibility')}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {matchResult.services.map((service, index) => (
                      <Card key={service.name} className="glass-effect border-white/20 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-white font-['Montserrat']">{service.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-['Montserrat'] ${
                            service.priority === t('ilumatch.results.priority.high') ? 'bg-red-500/20 text-red-300' : 
                            'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {service.priority}
                          </span>
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/60 font-['Montserrat']">{t('ilumatch.results.compatibility')}</span>
                            <span className="text-white font-['Montserrat']">{service.compatibility}%</span>
                          </div>
                          <Progress value={service.compatibility} className="h-2" />
                        </div>
                        <Button size="sm" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 font-['Montserrat']">
                          {t('ilumatch.results.learn_more')}
                        </Button>
                      </Card>
                    ))}
                  </div>

                  <Card className="glass-effect border-white/20 p-6">
                    <h3 className="text-xl font-bold text-white mb-4 font-['Montserrat']">{t('ilumatch.results.recommendations')}</h3>
                    <div className="space-y-3">
                      {matchResult.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 font-['Montserrat']">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && currentStep < 5 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
                  >
                    {t('ilumatch.navigation.previous')}
                  </Button>
                )}
                {currentStep < 5 && (
                  <Button 
                    onClick={handleNext}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white ml-auto font-['Montserrat']"
                  >
                    {currentStep === 4 ? (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        {t('ilumatch.navigation.launch_analysis')}
                      </>
                    ) : (
                      <>
                        {t('ilumatch.navigation.next')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* CTA Section */}
      {currentStep === 5 && (
        <section className="py-20 px-4 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-cyan-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Montserrat']">
                {t('ilumatch.cta.title')}
              </h2>
              <p className="text-xl text-white/80 mb-8 font-['Montserrat']">
                {t('ilumatch.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-['Montserrat']">
                  {t('ilumatch.results.contact')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']">
                  {t('ilumatch.cta.secondary')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Illumatch;
