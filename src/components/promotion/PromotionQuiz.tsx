import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Brain, Zap, Target } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  answers: {
    text: string;
    value: number;
    category: string;
  }[];
  icon: React.ReactNode;
}

interface PromotionQuizProps {
  onComplete: (results: any) => void;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quel est votre principal défi en marketing digital ?",
    icon: <Brain className="w-8 h-8 text-primary" />,
    answers: [
      { text: "❌ Manque de visibilité sur Google", value: 10, category: "SEO" },
      { text: "💰 Coût trop élevé des publicités", value: 15, category: "Ads" },
      { text: "⏰ Pas assez de temps pour tout gérer", value: 20, category: "Automation" },
      { text: "🎯 Difficultés à convertir les visiteurs", value: 25, category: "Conversion" }
    ]
  },
  {
    id: 2,
    question: "À combien estimez-vous votre CA mensuel actuel ?",
    icon: <Target className="w-8 h-8 text-secondary" />,
    answers: [
      { text: "🚀 Moins de 5 000€", value: 30, category: "Startup" },
      { text: "📈 5 000€ - 20 000€", value: 25, category: "Growth" },
      { text: "🏢 20 000€ - 50 000€", value: 20, category: "Scale" },
      { text: "🏆 Plus de 50 000€", value: 15, category: "Enterprise" }
    ]
  },
  {
    id: 3,
    question: "Combien seriez-vous prêt à investir pour TRANSFORMER votre business ?",
    icon: <Zap className="w-8 h-8 text-green-500" />,
    answers: [
      { text: "💡 Moins de 1 000€", value: 10, category: "Conservative" },
      { text: "🔥 1 000€ - 3 000€", value: 20, category: "Balanced" },
      { text: "⚡ 3 000€ - 5 000€", value: 30, category: "Aggressive" },
      { text: "🚀 Plus de 5 000€ pour les VRAIS résultats", value: 40, category: "Premium" }
    ]
  }
];

const PromotionQuiz: React.FC<PromotionQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setTimeout(() => {
      const newAnswers = [...answers, quizQuestions[currentQuestion].answers[answerIndex]];
      setAnswers(newAnswers);
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setIsCompleted(true);
        calculateResults(newAnswers);
      }
    }, 500);
  };

  const calculateResults = (allAnswers: any[]) => {
    const totalScore = allAnswers.reduce((sum, answer) => sum + answer.value, 0);
    const categories = allAnswers.map(answer => answer.category);
    
    let recommendedPackage = "STARTER";
    let discount = 30;
    let urgencyLevel = "NORMALE";
    
    // Logique de personnalisation avancée
    if (totalScore >= 70) {
      recommendedPackage = "PREMIUM TRANSFORMATION";
      discount = 50;
      urgencyLevel = "ULTRA LIMITÉE";
    } else if (totalScore >= 50) {
      recommendedPackage = "CROISSANCE ACCÉLÉRÉE";
      discount = 40;
      urgencyLevel = "LIMITÉE";
    } else if (totalScore >= 30) {
      recommendedPackage = "DÉVELOPPEMENT CIBLÉ";
      discount = 35;
      urgencyLevel = "SPÉCIALE";
    }

    const results = {
      totalScore,
      categories,
      recommendedPackage,
      discount,
      urgencyLevel,
      personalizedMessage: generatePersonalizedMessage(categories, totalScore)
    };

    setTimeout(() => {
      onComplete(results);
    }, 2000);
  };

  const generatePersonalizedMessage = (categories: string[], score: number) => {
    if (score >= 70) {
      return "🎯 Votre profil révèle un ÉNORME potentiel ! Vous êtes prêt pour une transformation COMPLÈTE qui va révolutionner votre business.";
    } else if (score >= 50) {
      return "🚀 Excellent ! Votre business a les bases pour une croissance EXPLOSIVE avec les bons outils.";
    } else if (score >= 30) {
      return "💡 Parfait ! Quelques optimisations ciblées vont faire décoller vos résultats.";
    }
    return "🌟 Génial ! Nous avons identifié exactement ce dont vous avez besoin pour commencer.";
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🧠
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Analyse IA en cours...
        </h3>
        <div className="space-y-3">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
          <p className="text-muted-foreground">
            Notre IA analyse vos réponses pour créer votre offre personnalisée...
          </p>
        </div>
      </motion.div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white">
            Question {currentQuestion + 1} sur {quizQuestions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {question.icon}
                <h3 className="text-xl font-bold text-white">
                  {question.question}
                </h3>
              </div>

              <div className="space-y-3">
                {question.answers.map((answer, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedAnswer === index ? "default" : "outline"}
                      size="lg"
                      onClick={() => handleAnswer(index)}
                      className={`w-full text-left justify-start p-4 h-auto transition-all duration-300 ${
                        selectedAnswer === index 
                          ? "bg-gradient-to-r from-primary to-secondary text-white border-primary" 
                          : "bg-background/50 hover:bg-primary/20 border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {selectedAnswer === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </motion.div>
                        )}
                        <span className="text-base font-medium">
                          {answer.text}
                        </span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          ⚡ Choisissez la réponse qui vous correspond le mieux
        </p>
      </div>
    </motion.div>
  );
};

export default PromotionQuiz;