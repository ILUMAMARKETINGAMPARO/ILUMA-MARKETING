import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Award,
  Gift,
  TrendingUp,
  Users,
  Sparkles,
  Crown,
  Medal,
  Rocket
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: 'explorer' | 'expert' | 'social' | 'master';
}

interface UserProgress {
  level: number;
  totalPoints: number;
  currentXP: number;
  nextLevelXP: number;
  streak: number;
  achievements: Achievement[];
  badges: string[];
  rank: string;
}

const GamificationSystem: React.FC = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    totalPoints: 0,
    currentXP: 0,
    nextLevelXP: 100,
    streak: 0,
    achievements: [],
    badges: [],
    rank: 'Novice'
  });

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    loadUserProgress();
    initializeAchievements();
  }, []);

  const loadUserProgress = () => {
    // Simulate loading user progress from API
    const mockProgress: UserProgress = {
      level: 5,
      totalPoints: 1250,
      currentXP: 320,
      nextLevelXP: 500,
      streak: 7,
      achievements: [],
      badges: ['early-adopter', 'social-butterfly', 'expert-explorer'],
      rank: 'Expert'
    };
    
    setUserProgress(mockProgress);
  };

  const initializeAchievements = () => {
    const achievements: Achievement[] = [
      {
        id: 'first-simulation',
        title: 'Premier Pas',
        description: 'Complétez votre première simulation ADLUMA™',
        icon: <Rocket className="w-6 h-6" />,
        points: 50,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        category: 'explorer'
      },
      {
        id: 'ila-master',
        title: 'Maître ILA™',
        description: 'Obtenez un score ILA™ supérieur à 85',
        icon: <Crown className="w-6 h-6" />,
        points: 150,
        unlocked: false,
        progress: 72,
        maxProgress: 85,
        category: 'expert'
      },
      {
        id: 'social-sharer',
        title: 'Ambassadeur Social',
        description: 'Partagez 5 résultats sur les réseaux sociaux',
        icon: <Users className="w-6 h-6" />,
        points: 100,
        unlocked: false,
        progress: 3,
        maxProgress: 5,
        category: 'social'
      },
      {
        id: 'streak-warrior',
        title: 'Guerrier de la Régularité',
        description: 'Maintenez une série de 10 jours consécutifs',
        icon: <Zap className="w-6 h-6" />,
        points: 200,
        unlocked: false,
        progress: 7,
        maxProgress: 10,
        category: 'master'
      },
      {
        id: 'module-explorer',
        title: 'Explorateur Complet',
        description: 'Testez tous les modules Iluma™',
        icon: <Star className="w-6 h-6" />,
        points: 300,
        unlocked: false,
        progress: 3,
        maxProgress: 6,
        category: 'explorer'
      },
      {
        id: 'feedback-hero',
        title: 'Héros du Feedback',
        description: 'Laissez 10 commentaires constructifs',
        icon: <Award className="w-6 h-6" />,
        points: 120,
        unlocked: false,
        progress: 6,
        maxProgress: 10,
        category: 'social'
      }
    ];

    setUserProgress(prev => ({ ...prev, achievements }));
  };

  const calculateLevelProgress = () => {
    return (userProgress.currentXP / userProgress.nextLevelXP) * 100;
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Novice': return 'text-gray-400';
      case 'Apprenti': return 'text-green-400';
      case 'Expert': return 'text-blue-400';
      case 'Maître': return 'text-purple-400';
      case 'Légende': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'explorer': return 'from-blue-500 to-cyan-500';
      case 'expert': return 'from-purple-500 to-pink-500';
      case 'social': return 'from-green-500 to-emerald-500';
      case 'master': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const simulateEarnXP = (points: number) => {
    const newXP = userProgress.currentXP + points;
    const newTotalPoints = userProgress.totalPoints + points;
    
    if (newXP >= userProgress.nextLevelXP) {
      // Level up!
      setShowLevelUp(true);
      setUserProgress(prev => ({
        ...prev,
        level: prev.level + 1,
        currentXP: newXP - prev.nextLevelXP,
        nextLevelXP: prev.nextLevelXP + 100,
        totalPoints: newTotalPoints
      }));
      setTimeout(() => setShowLevelUp(false), 3000);
    } else {
      setUserProgress(prev => ({
        ...prev,
        currentXP: newXP,
        totalPoints: newTotalPoints
      }));
    }
  };

  const unlockAchievement = (achievementId: string) => {
    setUserProgress(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement =>
        achievement.id === achievementId
          ? { ...achievement, unlocked: true, progress: achievement.maxProgress }
          : achievement
      )
    }));

    const achievement = userProgress.achievements.find(a => a.id === achievementId);
    if (achievement) {
      setNewAchievement(achievement);
      setTimeout(() => setNewAchievement(null), 4000);
      simulateEarnXP(achievement.points);
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          >
            <Card className="glass-effect border-yellow-400/50 p-8 text-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: 2 }}
              >
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Niveau Supérieur !</h2>
              <p className="text-yellow-400 text-xl">Niveau {userProgress.level}</p>
              <div className="mt-4">
                <Sparkles className="w-8 h-8 text-yellow-400 mx-auto animate-pulse" />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Achievement Animation */}
      <AnimatePresence>
        {newAchievement && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 z-40"
          >
            <Card className="glass-effect border-primary/50 p-4 min-w-80">
              <div className="flex items-center space-x-3">
                <div className="text-primary">{newAchievement.icon}</div>
                <div>
                  <h4 className="text-white font-bold">Succès Débloqué !</h4>
                  <p className="text-white/80 text-sm">{newAchievement.title}</p>
                  <Badge className="mt-1 bg-primary text-primary-foreground">
                    +{newAchievement.points} XP
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Progress Overview */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-white font-['Montserrat'] flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            Votre Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Level & XP */}
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                Niveau {userProgress.level}
              </div>
              <div className={`text-lg font-semibold mb-3 ${getRankColor(userProgress.rank)}`}>
                {userProgress.rank}
              </div>
              <Progress value={calculateLevelProgress()} className="h-2 mb-2" />
              <div className="text-white/60 text-sm">
                {userProgress.currentXP} / {userProgress.nextLevelXP} XP
              </div>
            </div>

            {/* Total Points */}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {userProgress.totalPoints.toLocaleString()}
              </div>
              <div className="text-white/80">Points Total</div>
              <div className="mt-2">
                <Star className="w-6 h-6 text-yellow-400 mx-auto" />
              </div>
            </div>

            {/* Streak */}
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {userProgress.streak}
              </div>
              <div className="text-white/80">Jours Consécutifs</div>
              <div className="mt-2">
                <Zap className="w-6 h-6 text-orange-400 mx-auto" />
              </div>
            </div>

            {/* Achievements */}
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {userProgress.achievements.filter(a => a.unlocked).length}
              </div>
              <div className="text-white/80">Succès Débloqués</div>
              <div className="mt-2">
                <Medal className="w-6 h-6 text-green-400 mx-auto" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-white font-['Montserrat'] flex items-center">
            <Award className="w-5 h-5 mr-2 text-primary" />
            Succès à Débloquer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProgress.achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(achievement.category)}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-white/60'}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${achievement.unlocked ? 'text-white/80' : 'text-white/40'}`}>
                      {achievement.description}
                    </p>
                    
                    {!achievement.unlocked && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-white/60 mb-1">
                          <span>Progression</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1.5" />
                      </div>
                    )}
                    
                    <div className="mt-2 flex items-center justify-between">
                      <Badge 
                        variant={achievement.unlocked ? "default" : "outline"}
                        className={achievement.unlocked ? "bg-primary text-primary-foreground" : "border-white/20"}
                      >
                        {achievement.points} XP
                      </Badge>
                      {achievement.unlocked && (
                        <Badge className="bg-green-500 text-white">
                          Débloqué
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-white font-['Montserrat'] flex items-center">
            <Gift className="w-5 h-5 mr-2 text-accent" />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              onClick={() => simulateEarnXP(25)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Test Module (+25 XP)
            </Button>
            
            <Button 
              onClick={() => simulateEarnXP(50)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Partage Social (+50 XP)
            </Button>
            
            <Button 
              onClick={() => unlockAchievement('first-simulation')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              <Target className="w-4 h-4 mr-2" />
              Simuler Succès
            </Button>
            
            <Button 
              onClick={() => simulateEarnXP(100)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Bonus Journalier (+100 XP)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationSystem;