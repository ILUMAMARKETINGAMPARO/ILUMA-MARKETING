import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Telescope, 
  Navigation2, 
  Target, 
  Zap, 
  Calendar,
  TrendingUp,
  Users,
  Star,
  MapPin,
  Timer,
  AlertCircle,
  Download,
  Phone,
  ExternalLink,
  Share2,
  Lightbulb
} from 'lucide-react';
import { BusinessData } from '@/types/heatmap';

interface GalacticVisibilityMapProps {
  businesses: BusinessData[];
  userBusiness?: {
    name: string;
    score: number;
    sector: string;
    position: { lat: number; lng: number };
  };
}

const GalacticVisibilityMap: React.FC<GalacticVisibilityMapProps> = ({ 
  businesses, 
  userBusiness = {
    name: "Votre Entreprise",
    score: 42,
    sector: "restaurant",
    position: { lat: 45.5017, lng: -73.5673 }
  }
}) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<BusinessData | null>(null);
  const [activePhase, setActivePhase] = useState<'discover' | 'analyze' | 'project' | 'act'>('discover');
  const [urgencyTimer, setUrgencyTimer] = useState(1440); // 24h en minutes
  const [showComparison, setShowComparison] = useState(false);
  const [liloMessage, setLiloMessage] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);

  // Timer d'urgence
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 60000); // chaque minute
    return () => clearInterval(timer);
  }, []);

  // Messages contextuels de Lilo
  useEffect(() => {
    const messages = [
      `🚀 Votre score de ${userBusiness.score} peut monter à 85+ avec nos optimisations !`,
      `🎯 J'ai détecté ${businesses.filter(b => b.ilaScore.overall > userBusiness.score).length} concurrents plus visibles`,
      `⚡ Simulation : +284% de visibilité possible en 90 jours`,
      `🧠 Analyse en cours... ${Math.floor(Math.random() * 50 + 50)}% terminée`
    ];
    
    const interval = setInterval(() => {
      setLiloMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [userBusiness.score, businesses]);

  // Calculs de comparaison
  const competitors = businesses.filter(b => b.sector === userBusiness.sector);
  const betterCompetitors = competitors.filter(b => b.ilaScore.overall > userBusiness.score);
  const averageScore = competitors.reduce((sum, b) => sum + b.ilaScore.overall, 0) / competitors.length;
  const potential = Math.min(95, Math.max(...competitors.map(b => b.ilaScore.overall)) + 10);

  // Animation des particules galactiques
  const generateParticles = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 10 + Math.random() * 20
    }));
  };

  const particles = generateParticles();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black relative overflow-hidden">
      {/* Fond galactique animé */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec urgence */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground font-['Montserrat'] mb-2">
                🌌 Carte Galactique de Visibilité Locale
              </h1>
              <p className="text-muted-foreground font-['Montserrat']">
                Analysez votre position dans l'univers digital de votre secteur
              </p>
            </div>
            
            {/* Timer d'urgence */}
            <Card className="glass-effect border-primary/30 p-4">
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-accent animate-pulse" />
                <div>
                  <div className="text-sm text-muted-foreground">Analyse expire dans</div>
                  <div className="text-lg font-bold text-accent font-['Montserrat']">
                    {formatTime(urgencyTimer)}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Vue centrale galactique */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Carte galactique principale */}
          <Card className="lg:col-span-2 glass-effect border-primary/30 p-6 relative overflow-hidden">
            <div ref={mapRef} className="h-96 relative">
              {/* Centre - Votre entreprise */}
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  boxShadow: [
                    "0 0 20px hsl(var(--primary))",
                    "0 0 40px hsl(var(--primary))",
                    "0 0 20px hsl(var(--primary))"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center relative">
                  <Target className="w-8 h-8 text-primary-foreground" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-sm font-bold text-foreground">{userBusiness.name}</div>
                    <Badge className="bg-primary/20 text-primary text-xs">
                      Score: {userBusiness.score}
                    </Badge>
                  </div>
                </div>
              </motion.div>

              {/* Concurrents en orbite */}
              {competitors.slice(0, 8).map((competitor, index) => {
                const angle = (index / competitors.length) * 2 * Math.PI;
                const radius = 120 + (competitor.ilaScore.overall - userBusiness.score) * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={competitor.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 30 + index * 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedCompetitor(competitor)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      competitor.ilaScore.overall > userBusiness.score 
                        ? 'bg-red-500/80' 
                        : 'bg-green-500/80'
                    }`}>
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-center">
                      <div className="text-foreground font-medium truncate w-16">
                        {competitor.name}
                      </div>
                      <div className="text-accent text-xs">{competitor.ilaScore.overall}</div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Zones de chaleur */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-500/10 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Légende */}
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Moins visible que vous</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Plus visible que vous</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Votre position</span>
              </div>
            </div>
          </Card>

          {/* Panneau de comparaison */}
          <div className="space-y-6">
            {/* Votre performance */}
            <Card className="glass-effect border-primary/30 p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 font-['Montserrat']">
                📊 Votre Position
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Score ILA™ actuel</span>
                    <span className="text-lg font-bold text-primary">{userBusiness.score}/100</span>
                  </div>
                  <div className="w-full bg-muted/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" 
                      style={{ width: `${userBusiness.score}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-muted-foreground">{competitors.length}</div>
                    <div className="text-xs text-muted-foreground">Concurrents</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-destructive">{betterCompetitors.length}</div>
                    <div className="text-xs text-muted-foreground">Devant vous</div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent"
                  onClick={() => setShowComparison(true)}
                >
                  <Telescope className="w-4 h-4 mr-2" />
                  Analyser mes concurrents
                </Button>
              </div>
            </Card>

            {/* Lilo IA Assistant */}
            <Card className="glass-effect border-accent/30 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h4 className="font-bold text-foreground font-['Montserrat']">LILO</h4>
                  <p className="text-xs text-muted-foreground">Assistant IA Local</p>
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={liloMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-foreground mb-4 font-['Montserrat']"
                >
                  {liloMessage}
                </motion.p>
              </AnimatePresence>

              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Stratégie d'amélioration
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Projection 3-6-12 mois
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  RDV diagnostic complet
                </Button>
              </div>
            </Card>

            {/* Urgence et action */}
            <Card className="glass-effect border-destructive/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-destructive animate-pulse" />
                <h4 className="font-bold text-destructive font-['Montserrat']">Opportunity Loss</h4>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Chaque jour d'attente = <span className="text-destructive font-bold">
                    ~{Math.floor((potential - userBusiness.score) * 1.2)} clients potentiels perdus
                  </span>
                </div>
                
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <div className="text-2xl font-bold text-destructive mb-1">
                    {Math.floor((potential - userBusiness.score) * 30)}%
                  </div>
                  <div className="text-xs text-muted-foreground">d'amélioration possible</div>
                </div>

                <Button className="w-full bg-gradient-to-r from-destructive to-orange-500">
                  <Zap className="w-4 h-4 mr-2" />
                  Agir maintenant
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Comparaison détaillée */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <Card className="glass-effect border-primary/30 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-foreground font-['Montserrat']">
                    🎯 Vous vs Vos Concurrents Directs
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowComparison(false)}
                  >
                    Fermer
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/20">
                        <th className="text-left p-3 text-muted-foreground">Entreprise</th>
                        <th className="text-center p-3 text-muted-foreground">Score ILA™</th>
                        <th className="text-center p-3 text-muted-foreground">Visibilité</th>
                        <th className="text-center p-3 text-muted-foreground">Réputation</th>
                        <th className="text-center p-3 text-muted-foreground">Position Google</th>
                        <th className="text-center p-3 text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Votre entreprise */}
                      <tr className="border-b border-border/10 bg-primary/5">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="font-bold text-foreground">{userBusiness.name}</span>
                            <Badge className="bg-primary/20 text-primary">VOUS</Badge>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <span className="text-lg font-bold text-primary">{userBusiness.score}</span>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="bg-orange-500/20 text-orange-400">Moyenne</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge className="bg-yellow-500/20 text-yellow-400">3.8/5</Badge>
                        </td>
                        <td className="p-3 text-center">
                          <span className="text-muted-foreground">#8</span>
                        </td>
                        <td className="p-3 text-center">
                          <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Améliorer
                          </Button>
                        </td>
                      </tr>

                      {/* Top 3 concurrents */}
                      {competitors
                        .sort((a, b) => b.ilaScore.overall - a.ilaScore.overall)
                        .slice(0, 3)
                        .map((competitor, index) => (
                          <tr key={competitor.id} className="border-b border-border/10 hover:bg-muted/5">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full ${
                                  index === 0 ? 'bg-yellow-500' : 
                                  index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                                }`}></div>
                                <span className="text-foreground">{competitor.name}</span>
                                {competitor.ilaScore.overall > userBusiness.score && (
                                  <Badge className="bg-red-500/20 text-red-400">Devant</Badge>
                                )}
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <span className={`text-lg font-bold ${
                                competitor.ilaScore.overall > userBusiness.score 
                                  ? 'text-red-400' 
                                  : 'text-green-400'
                              }`}>
                                {competitor.ilaScore.overall}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              <Badge className={
                                competitor.ilaScore.visibility > 70 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }>
                                {competitor.ilaScore.visibility > 70 ? 'Forte' : 'Faible'}
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span className="text-foreground">{competitor.googleRating}/5</span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <span className="text-muted-foreground">#{competitor.serpRank || 'N/A'}</span>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Share2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Insights automatiques */}
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-bold text-foreground mb-2 font-['Montserrat']">
                    🧠 Insights IA
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Vos concurrents ont en moyenne <span className="text-primary font-bold">{Math.round(averageScore - userBusiness.score)} points</span> de plus que vous</li>
                    <li>• Le leader a <span className="text-destructive font-bold">{Math.max(...competitors.map(c => c.ilaScore.overall)) - userBusiness.score} points</span> d'avance</li>
                    <li>• Votre potentiel d'amélioration : <span className="text-accent font-bold">+{potential - userBusiness.score} points</span></li>
                    <li>• ROI estimé d'une optimisation : <span className="text-green-400 font-bold">+284% de visibilité locale</span></li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions rapides */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-effect border-primary/30 p-6 text-center">
            <Download className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2 font-['Montserrat']">
              Rapport PDF
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Diagnostic complet de votre visibilité vs concurrents
            </p>
            <Button className="w-full bg-gradient-to-r from-primary to-accent">
              Générer rapport
            </Button>
          </Card>

          <Card className="glass-effect border-accent/30 p-6 text-center">
            <Phone className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2 font-['Montserrat']">
              Appel Stratégique
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              30 min avec un expert pour analyser vos opportunités
            </p>
            <Button className="w-full bg-gradient-to-r from-accent to-secondary">
              Réserver maintenant
            </Button>
          </Card>

          <Card className="glass-effect border-secondary/30 p-6 text-center">
            <Zap className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2 font-['Montserrat']">
              Action Express
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Plan d'amélioration en 7 jours, résultats garantis
            </p>
            <Button className="w-full bg-gradient-to-r from-secondary to-destructive">
              Démarrer maintenant
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GalacticVisibilityMap;