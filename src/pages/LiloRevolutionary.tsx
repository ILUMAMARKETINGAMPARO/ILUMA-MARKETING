import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp,
  Users,
  MessageCircle,
  BarChart,
  Network,
  Settings,
  Mic,
  Camera,
  Eye,
  Heart,
  Lightbulb
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import LiloRevolutionary from '@/components/lilo/LiloRevolutionary';
import LiloOrchestrator from '@/components/lilo/LiloOrchestrator';
import { useLiloAdvanced } from '@/hooks/useLiloAdvanced';

const LiloRevolutionaryPage: React.FC = () => {
  const [showOrchestrator, setShowOrchestrator] = useState(false);
  const [demoUserId] = useState('demo-revolutionary-user');
  
  const {
    behavioralData,
    predictiveInsights,
    isAnalyzing,
    emotion,
    adaptivePersonality,
    currentExpertise,
    learningScore
  } = useLiloAdvanced(demoUserId, {
    page: '/lilo-revolutionary',
    industryContext: 'marketing-tech',
    currentGoals: ['growth', 'automation', 'intelligence']
  });

  const revolutionaryFeatures = [
    {
      icon: Brain,
      title: 'Intelligence Prédictive Avancée',
      description: 'Algorithmes ML pour anticiper les besoins et optimiser les performances',
      color: 'from-purple-500 to-pink-500',
      metrics: { score: 94, trend: '+12%' }
    },
    {
      icon: Eye,
      title: 'Vision par Ordinateur',
      description: 'Analyse de documents, screenshots et contenu visuel en temps réel',
      color: 'from-blue-500 to-cyan-500',
      metrics: { score: 87, trend: '+8%' }
    },
    {
      icon: Mic,
      title: 'Interaction Vocale Naturelle',
      description: 'Reconnaissance vocale avancée et synthèse vocale émotionnelle',
      color: 'from-green-500 to-emerald-500',
      metrics: { score: 91, trend: '+15%' }
    },
    {
      icon: Network,
      title: 'Orchestration Galactique',
      description: 'Synchronisation intelligente entre tous les modules Iluma™',
      color: 'from-orange-500 to-red-500',
      metrics: { score: 96, trend: '+20%' }
    },
    {
      icon: TrendingUp,
      title: 'Analytics Comportementaux',
      description: 'Analyse prédictive des patterns utilisateur et optimisation continue',
      color: 'from-indigo-500 to-purple-500',
      metrics: { score: 89, trend: '+10%' }
    },
    {
      icon: Lightbulb,
      title: 'Apprentissage Adaptatif',
      description: 'IA qui évolue et s\'améliore en continu selon vos préférences',
      color: 'from-yellow-500 to-orange-500',
      metrics: { score: 92, trend: '+18%' }
    }
  ];

  const expertiseAreas = [
    { id: 'prospection', name: 'Prospection IA-Assistée', level: 95, color: 'bg-blue-500' },
    { id: 'behavioral', name: 'Analyse Comportementale', level: 92, color: 'bg-purple-500' },
    { id: 'marketing', name: 'Marketing Prédictif', level: 88, color: 'bg-green-500' },
    { id: 'competitive', name: 'Intelligence Concurrentielle', level: 90, color: 'bg-red-500' },
    { id: 'growth', name: 'Growth Hacking Intelligent', level: 93, color: 'bg-yellow-500' },
    { id: 'automation', name: 'Automation Workflows', level: 97, color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl"
              >
                <Brain className="w-12 h-12 text-white" />
              </motion.div>
            </div>

            <div>
              <h1 className="text-6xl font-bold text-foreground font-['Montserrat'] mb-4">
                LILO™ <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Revolutionary
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                L'assistant IA le plus avancé jamais créé. Intelligence prédictive, apprentissage adaptatif, 
                interactions multimodales et orchestration galactique pour transformer votre expérience Iluma™.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white">
                <Zap className="w-4 h-4 mr-2" />
                IA GPT-4.1 Turbo
              </Badge>
              <Badge className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Target className="w-4 h-4 mr-2" />
                15 Expertises Spécialisées
              </Badge>
              <Badge className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <Network className="w-4 h-4 mr-2" />
                Orchestration Complète
              </Badge>
            </div>

            {/* Métriques en temps réel */}
            {behavioralData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
              >
                <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {behavioralData.engagementScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                    <Progress value={behavioralData.engagementScore} className="mt-2" />
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {behavioralData.conversionProbability}%
                    </div>
                    <div className="text-sm text-muted-foreground">Conversion</div>
                    <Progress value={behavioralData.conversionProbability} className="mt-2" />
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {learningScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Apprentissage</div>
                    <Progress value={learningScore} className="mt-2" />
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Features Révolutionnaires */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground font-['Montserrat'] mb-4">
            Capacités Révolutionnaires
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des technologies de pointe qui redéfinissent l'interaction homme-machine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {revolutionaryFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full p-6 glass-effect border-border/20 hover:border-primary/30 transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground font-['Montserrat'] mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Progress value={feature.metrics.score} className="w-16" />
                    <span className="text-sm font-medium">{feature.metrics.score}%</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-600">
                    {feature.metrics.trend}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expertise Areas */}
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground font-['Montserrat'] mb-4">
              15 Domaines d'Expertise Spécialisés
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chaque interaction est optimisée par une intelligence sectorielle avancée
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 bg-background/80 backdrop-blur-sm border-border/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">
                      {area.name}
                    </h3>
                    <div className={`w-3 h-3 ${area.color} rounded-full`}></div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Progress value={area.level} className="flex-1" />
                    <span className="text-sm font-medium text-foreground">
                      {area.level}%
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Prédictifs */}
      {predictiveInsights.length > 0 && (
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground font-['Montserrat'] mb-4">
              Insights Prédictifs en Temps Réel
            </h2>
            <p className="text-xl text-muted-foreground">
              L'IA analyse votre comportement et prédit vos besoins futurs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictiveInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 border-l-4 ${
                  insight.impact === 'Très Élevé' ? 'border-l-red-500 bg-red-500/5' :
                  insight.impact === 'Élevé' ? 'border-l-orange-500 bg-orange-500/5' :
                  insight.impact === 'Moyen' ? 'border-l-yellow-500 bg-yellow-500/5' :
                  'border-l-green-500 bg-green-500/5'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-foreground text-lg">
                      {insight.title}
                    </h3>
                    <Badge className={`${
                      insight.impact === 'Très Élevé' ? 'bg-red-500' :
                      insight.impact === 'Élevé' ? 'bg-orange-500' :
                      insight.impact === 'Moyen' ? 'bg-yellow-500' :
                      'bg-green-500'
                    } text-white`}>
                      {insight.impact}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {insight.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Confiance:</span>
                      <Progress value={insight.confidence} className="w-20" />
                      <span className="text-sm font-medium">{insight.confidence}%</span>
                    </div>
                    
                    {insight.actionRequired && (
                      <Badge variant="destructive" className="animate-pulse">
                        Action Requise
                      </Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-foreground font-['Montserrat']">
              Expérimentez l'Intelligence Révolutionnaire
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment LILO™ Revolutionary transforme votre interaction 
              avec l'écosystème Iluma™ grâce à l'IA la plus avancée.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3"
                onClick={() => setShowOrchestrator(true)}
              >
                <Network className="w-5 h-5 mr-2" />
                Ouvrir l'Orchestrateur
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 px-8 py-3"
              >
                <Brain className="w-5 h-5 mr-2" />
                Démarrer l'Analyse
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* LILO Revolutionary Component */}
      <LiloRevolutionary
        currentPage="/lilo-revolutionary"
        userId={demoUserId}
        industryContext="marketing-tech"
        currentGoals={['growth', 'automation', 'intelligence']}
      />

      {/* Orchestrator Modal */}
      <LiloOrchestrator
        isVisible={showOrchestrator}
        onClose={() => setShowOrchestrator(false)}
      />
    </div>
  );
};

export default LiloRevolutionaryPage;