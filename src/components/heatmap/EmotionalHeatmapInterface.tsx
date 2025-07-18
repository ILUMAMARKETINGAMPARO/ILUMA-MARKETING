import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, Star, TrendingUp, Eye, Zap, Heart, 
  ArrowRight, ArrowLeft, Target, Sparkles,
  Users, Phone, Globe, Clock, Download, Calendar,
  Timer, AlertCircle, CheckCircle, Mail
} from 'lucide-react';
import { BusinessData } from '@/types/heatmap';

import SpectateurIA from './SpectateurIA';
import FlowAnalyticsAI from './FlowAnalyticsAI';
import IAMiroir from './IAMiroir';
import RealTimeILAScoring from './RealTimeILAScoring';

interface EmotionalHeatmapProps {
  businesses: BusinessData[];
  userBusiness?: BusinessData;
  onContactRequest: () => void;
  onLiloInteraction: () => void;
}

const EmotionalHeatmapInterface: React.FC<EmotionalHeatmapProps> = ({
  businesses,
  userBusiness,
  onContactRequest,
  onLiloInteraction
}) => {
  const [currentScreen, setCurrentScreen] = useState(0); // Start with intro tutorial
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [userEmotion, setUserEmotion] = useState<'pride' | 'frustration' | 'curiosity' | null>(null);
  const [showLilo, setShowLilo] = useState(true); // Lilo active by default
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [urgencyTimer, setUrgencyTimer] = useState(30); // 30 seconds countdown
  const [userSkepticism, setUserSkepticism] = useState(0.5); // 0-1 scale
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [emailForm, setEmailForm] = useState({ name: '', email: '', phone: '' });
  const [simulatorScore, setSimulatorScore] = useState(0);

  // URL Parameters for QR code personalization
  const [urlParams, setUrlParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      business: params.get('business') || 'Votre commerce',
      city: params.get('city') || 'Montréal',
      sector: params.get('sector') || 'commerce local',
      referrer: params.get('ref') || 'qr'
    };
  });

  // Enhanced geolocation with IP detection
  const [userLocation, setUserLocation] = useState({ 
    city: urlParams.city, 
    zone: 'Plateau Mont-Royal',
    ip: '',
    detected: false
  });

  // Progressive urgency system
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // IP Geolocation detection
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserLocation(prev => ({
          ...prev,
          city: data.city || prev.city,
          zone: data.region || prev.zone,
          ip: data.ip || '',
          detected: true
        }));
      } catch (error) {
        console.log('Geolocation detection failed, using defaults');
      }
    };
    detectLocation();
  }, []);

  // Skepticism detection based on behavior
  useEffect(() => {
    const detectSkepticism = () => {
      let skepticismLevel = 0.5;
      
      // Fast scroll = skeptical
      if (currentScreen > 1 && Date.now() - screenStartTime < 5000) {
        skepticismLevel += 0.3;
      }
      
      // No clicks = skeptical
      if (currentScreen > 0 && totalClicks === 0) {
        skepticismLevel += 0.2;
      }
      
      // Long time on tutorial = curious
      if (currentScreen === 0 && Date.now() - screenStartTime > 15000) {
        skepticismLevel -= 0.2;
      }
      
      setUserSkepticism(Math.max(0, Math.min(1, skepticismLevel)));
    };
    
    const timer = setTimeout(detectSkepticism, 3000);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const [screenStartTime] = useState(Date.now());
  const [totalClicks, setTotalClicks] = useState(0);

  // Données émotionnelles calculées
  const emotionalData = React.useMemo(() => {
    const userScore = userBusiness?.ilaScore?.overall || 45;
    const cityBusinesses = businesses.filter(b => b.city === userLocation.city);
    const userRank = cityBusinesses
      .sort((a, b) => b.ilaScore.overall - a.ilaScore.overall)
      .findIndex(b => b.id === userBusiness?.id) + 1;
    
    const topCompetitors = cityBusinesses
      .filter(b => b.id !== userBusiness?.id)
      .sort((a, b) => b.ilaScore.overall - a.ilaScore.overall)
      .slice(0, 5);

    const potentialGain = Math.max(0, topCompetitors[2]?.ilaScore?.overall - userScore);

    // Déterminer l'émotion automatiquement
    let emotion: 'pride' | 'frustration' | 'curiosity' = 'curiosity';
    if (userScore >= 75) emotion = 'pride';
    else if (userScore < 50) emotion = 'frustration';

    return {
      userScore,
      userRank,
      totalBusinesses: cityBusinesses.length,
      topCompetitors,
      potentialGain,
      emotion,
      zones: ['Plateau Mont-Royal', 'Ville-Marie', 'Rosemont', 'Hochelaga'],
      heatZones: {
        'Plateau Mont-Royal': { intensity: 85, businesses: 12 },
        'Ville-Marie': { intensity: 92, businesses: 18 },
        'Rosemont': { intensity: 68, businesses: 8 },
        'Hochelaga': { intensity: 45, businesses: 6 }
      }
    };
  }, [businesses, userBusiness, userLocation]);

  useEffect(() => {
    setUserEmotion(emotionalData.emotion);
  }, [emotionalData.emotion]);

  const getEmotionalMessage = () => {
    const messages = {
      pride: [
        "Votre présence digitale rayonne dans le quartier 🌟",
        "Vous êtes dans le top 25% de votre zone !",
        "Vos concurrents vous regardent passer..."
      ],
      frustration: [
        "Votre présence digitale dort pendant que vos voisins brillent 😴",
        "Vous êtes invisible là où ça compte...",
        "Cette zone est chaude. Vous y êtes ?"
      ],
      curiosity: [
        "Votre potentiel de visibilité sommeille 🔮",
        "Découvrez comment vos voisins capturent l'attention",
        "Vous pourriez briller plus fort que vous ne le pensez"
      ]
    };
    return messages[userEmotion || 'curiosity'][Math.floor(Math.random() * 3)];
  };

  const getScoreHalo = (score: number) => {
    if (score >= 80) return 'shadow-[0_0_40px_#8E44FF] bg-gradient-to-r from-purple-500/30 to-violet-400/30';
    if (score >= 60) return 'shadow-[0_0_30px_#FFD56B] bg-gradient-to-r from-yellow-500/30 to-amber-400/30';
    if (score >= 40) return 'shadow-[0_0_20px_#FF6B6B] bg-gradient-to-r from-orange-500/30 to-red-400/30';
    return 'bg-gray-500/10 border border-gray-500/20';
  };

  // Auto-advance tutorial every 3 seconds
  useEffect(() => {
    if (currentScreen === 0 && tutorialStep < 2) {
      const timer = setTimeout(() => {
        setTutorialStep(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, tutorialStep]);

  // Dynamic personalized messages based on user behavior
  const getPersonalizedMessage = () => {
    if (userSkepticism > 0.7) {
      return "Sceptique ? Normal. Regardez d'abord votre position réelle...";
    }
    if (urlParams.referrer === 'qr') {
      return `${urlParams.business} - Découvrez où vous êtes vraiment positionnés`;
    }
    return getEmotionalMessage();
  };

  // Enhanced Lilo responses based on context
  const getLiloMessage = () => {
    const messages = {
      intro: "Salut ! 👋 Je suis Lilo, votre guide IA local. Cette carte vous montre exactement où vous vous situez par rapport à vos concurrents.",
      skeptical: "Je sens du scepticisme... Normal ! Mais regardez ces données réelles. Elles parlent d'elles-mêmes.",
      engaged: "Parfait ! Vous comprenez l'importance de votre positionnement. Laissez-moi vous expliquer comment progresser.",
      concerned: "Je vois que votre score vous inquiète. Bonne nouvelle : on peut le changer rapidement avec les bonnes actions."
    };
    
    if (userSkepticism > 0.7) return messages.skeptical;
    if (emotionalData.userScore < 50) return messages.concerned;
    if (currentScreen > 1) return messages.engaged;
    return messages.intro;
  };

  // PDF Export functionality
  const handlePDFExport = () => {
    const pdfData = {
      business: urlParams.business,
      score: emotionalData.userScore,
      rank: emotionalData.userRank,
      totalBusinesses: emotionalData.totalBusinesses,
      recommendations: [
        "Ajoutez 4 photos de qualité à votre profil Google",
        "Optimisez votre titre avec des mots-clés locaux",
        "Demandez 5 nouveaux avis clients cette semaine",
        "Mettez à jour vos horaires et informations de contact"
      ]
    };
    
    // Simulate PDF generation
    console.log('Generating PDF with data:', pdfData);
    alert('PDF diagnostic envoyé ! Vérifiez votre email dans 2 minutes.');
    setShowPDFModal(false);
  };

  // Simulator functionality
  const calculateSimulatorScore = (improvements: { photos: number, reviews: number, website: boolean }) => {
    let newScore = emotionalData.userScore;
    if (improvements.photos > 0) newScore += improvements.photos * 3;
    if (improvements.reviews > 0) newScore += improvements.reviews * 2;
    if (improvements.website) newScore += 15;
    
    setSimulatorScore(Math.min(100, newScore));
    return Math.min(100, newScore);
  };

  const renderPDFModal = () => (
    <AnimatePresence>
      {showPDFModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <Card className="glass-effect border-[#8E44FF]/30 p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat'] text-center">
                📧 Recevoir mon diagnostic
              </h3>
              <div className="space-y-4">
                <Input
                  placeholder="Nom de votre entreprise"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-black/20 border-white/20 text-white"
                />
                <Input
                  placeholder="Email professionnel"
                  type="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-black/20 border-white/20 text-white"
                />
                <Input
                  placeholder="Téléphone (optionnel)"
                  value={emailForm.phone}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-black/20 border-white/20 text-white"
                />
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handlePDFExport}
                    className="flex-1 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black font-['Montserrat']"
                    disabled={!emailForm.name || !emailForm.email}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Envoyer PDF
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPDFModal(false)}
                    className="border-white/20 text-white"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderSimulator = () => (
    <AnimatePresence>
      {showSimulator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <Card className="glass-effect border-[#8E44FF]/30 p-8 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat'] text-center">
                🚀 Simulateur d'Amélioration
              </h3>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-white/80 mb-4">Si j'améliore ces éléments...</p>
                  <div className="text-4xl font-bold text-white mb-2">
                    {simulatorScore || emotionalData.userScore}
                    <span className="text-2xl">/100</span>
                  </div>
                  {simulatorScore > emotionalData.userScore && (
                    <Badge className="bg-green-500/20 text-green-400">
                      +{simulatorScore - emotionalData.userScore} points
                    </Badge>
                  )}
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={() => calculateSimulatorScore({ photos: 4, reviews: 0, website: false })}
                    className="w-full text-left border-white/20 text-white hover:bg-white/10"
                    variant="outline"
                  >
                    📸 Ajouter 4 photos (+12 pts)
                  </Button>
                  <Button
                    onClick={() => calculateSimulatorScore({ photos: 4, reviews: 10, website: false })}
                    className="w-full text-left border-white/20 text-white hover:bg-white/10"
                    variant="outline"
                  >
                    ⭐ Obtenir 10 nouveaux avis (+20 pts)
                  </Button>
                  <Button
                    onClick={() => calculateSimulatorScore({ photos: 4, reviews: 10, website: true })}
                    className="w-full text-left border-white/20 text-white hover:bg-white/10"
                    variant="outline"
                  >
                    🌐 Optimiser le site web (+15 pts)
                  </Button>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => { setShowSimulator(false); setShowPDFModal(true); }}
                    className="flex-1 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black font-['Montserrat']"
                  >
                    Obtenir le plan détaillé
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSimulator(false)}
                    className="border-white/20 text-white"
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderUrgencyBanner = () => (
    urgencyTimer > 0 && urgencyTimer < 25 && (
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40"
      >
        <Card className="glass-effect border-red-500/30 bg-gradient-to-r from-red-500/20 to-orange-500/20 px-6 py-3">
          <div className="flex items-center gap-3 text-white">
            <Timer className="w-5 h-5 text-red-400" />
            <span className="font-bold">
              ⏰ {urgencyTimer}s restantes pour voir l'analyse complète
            </span>
          </div>
        </Card>
      </motion.div>
    )
  );

  const renderIntroTutorial = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 text-center"
    >
      {/* Phrase d'accroche */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Montserrat']">
          Votre commerce est visible.
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text mb-6">
          Mais est-il trouvé ?
        </h2>
        <p className="text-xl text-white/80 mb-8 font-['Montserrat']">
          Découvrez-le en un clin d'œil.
        </p>
      </motion.div>

      {/* Mini-scénario narratif */}
      <Card className="glass-effect border-white/20 p-8 max-w-2xl mx-auto bg-gradient-to-b from-black/40 to-purple-900/20">
        <div className="text-left space-y-4">
          <h3 className="text-2xl font-bold text-white mb-6 font-['Montserrat'] text-center">
            📱 Vous êtes...
          </h3>
          <div className="space-y-3 text-white/90 font-['Montserrat']">
            <p>🏪 Propriétaire d'un commerce local à Montréal</p>
            <p>📧 Vous recevez une petite carte avec un QR</p>
            <p>📱 Vous la scannez... et en moins de 5 secondes, vous voyez :</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 p-4 rounded-lg mt-6">
            <div className="space-y-2 text-white font-['Montserrat']">
              <p>✅ Où vous vous situez dans votre quartier</p>
              <p>✅ Comment vous vous comparez à vos voisins</p>
              <p>✅ Et ce que vous pourriez améliorer</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Badge className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-black text-lg px-4 py-2">
              👉 C'est votre Portrait Numérique Local™
            </Badge>
          </div>
        </div>
      </Card>

      {/* Mini-tutoriel animé (3 étapes) */}
      <Card className="glass-effect border-white/20 p-6 max-w-xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="flex gap-2">
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  tutorialStep >= step ? 'bg-[#8E44FF]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tutorialStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                1. Vous êtes ici
              </h3>
              <p className="text-white/70 font-['Montserrat']">
                Votre position actuelle dans le paysage numérique local
              </p>
            </motion.div>
          )}
          
          {tutorialStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                2. Voici vos voisins
              </h3>
              <p className="text-white/70 font-['Montserrat']">
                Comment vous vous comparez à vos concurrents directs
              </p>
            </motion.div>
          )}
          
          {tutorialStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                3. Voici comment vous améliorer
              </h3>
              <p className="text-white/70 font-['Montserrat']">
                Recommandations IA personnalisées pour votre croissance
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Résumé en 3 bullets */}
      <Card className="glass-effect border-[#8E44FF]/30 p-6 max-w-md mx-auto bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10">
        <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat'] text-center">
          📊 Votre Résumé Express
        </h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
            <span className="text-white font-['Montserrat']">
              🟣 Mon score ILA™ : {emotionalData.userScore}/100
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-white font-['Montserrat']">
              🟥 Position locale : {emotionalData.userRank}e sur {emotionalData.totalBusinesses} dans mon quartier
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-white font-['Montserrat']">
              💡 Recommandation IA : Ajoutez 4 photos Google et une offre dans le titre de votre site
            </span>
          </div>
        </div>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button 
          size="lg"
          onClick={() => setCurrentScreen(1)}
          className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 text-lg font-['Montserrat']"
        >
          <Eye className="w-5 h-5 mr-2" />
          Explorer ma carte
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  const renderScreen1 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="space-y-8"
    >
      {/* Header émotionnel */}
      <div className="text-center mb-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Montserrat']"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          🗺️ Carte de Quartier — Visibilité Locale
        </motion.h1>
        <motion.p 
          className="text-xl text-white/80 mb-6 font-['Montserrat']"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {getEmotionalMessage()}
        </motion.p>
      </div>

      {/* Carte thermique premium */}
      <div className="relative">
        <Card className="glass-effect border-white/20 p-8 bg-gradient-to-b from-black/40 to-purple-900/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(emotionalData.heatZones).map(([zone, data]) => (
              <motion.div
                key={zone}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: Math.random() * 0.5 }}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                  data.intensity >= 80 ? getScoreHalo(85) :
                  data.intensity >= 60 ? getScoreHalo(65) :
                  getScoreHalo(45)
                } ${selectedZone === zone ? 'scale-105 ring-2 ring-white/30' : ''}`}
                onClick={() => setSelectedZone(zone)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {data.intensity >= 80 ? '🔥' : data.intensity >= 60 ? '⚡' : '💤'}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                    {zone}
                  </h3>
                  <div className="text-3xl font-bold text-white mb-1">
                    {data.intensity}%
                  </div>
                  <p className="text-white/60 text-sm font-['Montserrat']">
                    {data.businesses} entreprises actives
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Position utilisateur */}
          {userBusiness && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="text-center"
            >
              <div className={`inline-block p-6 rounded-2xl ${getScoreHalo(emotionalData.userScore)} relative`}>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full p-2 animate-pulse">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
                <div className="text-2xl mb-2">📍</div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                  VOUS ÊTES ICI
                </h3>
                <div className="text-3xl font-bold text-white mb-1">
                  {emotionalData.userScore}/100
                </div>
                <p className="text-white/80 font-['Montserrat']">
                  Position #{emotionalData.userRank} sur {emotionalData.totalBusinesses}
                </p>
              </div>
            </motion.div>
          )}
        </Card>
      </div>

      {/* Navigation */}
      <div className="text-center">
        <Button 
          size="lg"
          onClick={() => setCurrentScreen(2)}
          className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 text-lg font-['Montserrat']"
        >
          <Eye className="w-5 h-5 mr-2" />
          Découvrir mon positionnement
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  const renderScreen2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
          🏆 Comparatif Local — Vous vs Vos Concurrents
        </h1>
        <p className="text-xl text-white/80 font-['Montserrat']">
          Voici qui capture l'attention dans votre zone
        </p>
      </div>

      <div className="space-y-4">
        {/* Votre position */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative"
        >
          <Card className={`glass-effect border-2 border-[#8E44FF] p-6 ${getScoreHalo(emotionalData.userScore)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">👑</div>
                <div>
                  <h3 className="text-xl font-bold text-white font-['Montserrat']">
                    VOTRE ENTREPRISE
                  </h3>
                  <p className="text-white/60">Position #{emotionalData.userRank}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white mb-1">
                  {emotionalData.userScore}
                </div>
                <Badge className="bg-[#8E44FF]/20 text-[#8E44FF]">
                  Score ILA™
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Top concurrents */}
        {emotionalData.topCompetitors.slice(0, 3).map((competitor, index) => (
          <motion.div
            key={competitor.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`glass-effect border-white/20 p-6 ${getScoreHalo(competitor.ilaScore.overall)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Montserrat']">
                      {competitor.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/60">
                      <MapPin className="w-4 h-4" />
                      <span>{competitor.address}</span>
                      {competitor.googleRating && (
                        <>
                          <Star className="w-4 h-4 text-yellow-400 ml-2" />
                          <span>{competitor.googleRating} ({competitor.reviewCount} avis)</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-1">
                    {competitor.ilaScore.overall}
                  </div>
                  <Badge className={competitor.ilaScore.overall > emotionalData.userScore ? 
                    "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}>
                    {competitor.ilaScore.overall > emotionalData.userScore ? 
                      `+${competitor.ilaScore.overall - emotionalData.userScore}` : 
                      `${competitor.ilaScore.overall - emotionalData.userScore}`}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline"
          onClick={() => setCurrentScreen(1)}
          className="border-white/20 text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour carte
        </Button>
        <Button 
          size="lg"
          onClick={() => setCurrentScreen(3)}
          className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 font-['Montserrat']"
        >
          Analyser mes faiblesses
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  const renderScreen3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
          🔍 Diagnostic Résumé — Ce Que Nous Avons Détecté
        </h1>
        <motion.p 
          className="text-xl text-white/80 font-['Montserrat']"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Analyse IA en cours...
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Points forts */}
        <Card className="glass-effect border-green-500/30 p-6 bg-gradient-to-b from-green-500/10 to-transparent">
          <h3 className="text-xl font-bold text-green-400 mb-4 font-['Montserrat'] flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Points Forts Détectés
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Présence Google Maps', score: 7, status: 'good' },
              { label: 'Avis clients', score: userBusiness?.googleRating || 4.2, status: 'good' },
              { label: 'Informations complètes', score: 8, status: 'good' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white font-['Montserrat']">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-black/20 rounded-full">
                    <motion.div 
                      className="h-full bg-green-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.score / 10) * 100}%` }}
                      transition={{ delay: index * 0.2 }}
                    />
                  </div>
                  <span className="text-green-400 font-bold">{item.score}/10</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Points à améliorer */}
        <Card className="glass-effect border-orange-500/30 p-6 bg-gradient-to-b from-orange-500/10 to-transparent">
          <h3 className="text-xl font-bold text-orange-400 mb-4 font-['Montserrat'] flex items-center gap-2">
            <Target className="w-5 h-5" />
            Opportunités Immédiates
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Site web mobile-friendly', score: 3, improvement: '+25 points' },
              { label: 'Temps de chargement', score: 2, improvement: '+15 points' },
              { label: 'Mots-clés locaux', score: 1, improvement: '+30 points' },
              { label: 'Présence réseaux sociaux', score: 2, improvement: '+20 points' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white font-['Montserrat']">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-black/20 rounded-full">
                    <motion.div 
                      className="h-full bg-orange-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.score / 10) * 100}%` }}
                      transition={{ delay: index * 0.2 }}
                    />
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                    {item.improvement}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Potentiel calculé */}
      <Card className="glass-effect border-[#8E44FF]/30 p-8 bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
            🚀 Potentiel de Progression
          </h3>
          <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] bg-clip-text mb-4">
            +{emotionalData.potentialGain}
          </div>
          <p className="text-xl text-white/80 font-['Montserrat']">
            Vous pourriez passer de la <strong>#{emotionalData.userRank}e</strong> à la <strong>3e position locale</strong>
          </p>
        </motion.div>
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline"
          onClick={() => setCurrentScreen(2)}
          className="border-white/20 text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voir comparatif
        </Button>
        <Button 
          size="lg"
          onClick={() => setCurrentScreen(4)}
          className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 font-['Montserrat']"
        >
          Obtenir mon plan
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  const renderScreen4 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
          ✨ Prêt pour la Transformation ?
        </h1>
        <p className="text-xl text-white/80 font-['Montserrat']">
          Votre chemin vers la visibilité locale optimale
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          {
            icon: <Heart className="w-8 h-8 text-pink-400" />,
            title: "Plan de visibilité gratuit",
            description: "Stratégie personnalisée 100% adaptée à votre secteur",
            action: "Recevoir maintenant",
            primary: true
          },
          {
            icon: <Users className="w-8 h-8 text-cyan-400" />,
            title: "Parler à Lilo (IA locale)",
            description: "Assistant IA spécialisé dans votre quartier",
            action: "Démarrer conversation",
            primary: false
          },
          {
            icon: <Star className="w-8 h-8 text-yellow-400" />,
            title: "Témoignages locaux",
            description: "Voir comment vos voisins ont réussi",
            action: "Découvrir",
            primary: false
          }
        ].map((option, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className={`glass-effect p-6 h-full ${
              option.primary ? 'border-[#8E44FF] bg-gradient-to-b from-[#8E44FF]/20 to-transparent' : 'border-white/20'
            }`}>
              <div className="text-center space-y-4">
                <div className="flex justify-center">{option.icon}</div>
                <h3 className="text-lg font-bold text-white font-['Montserrat']">
                  {option.title}
                </h3>
                <p className="text-white/70 font-['Montserrat'] text-sm">
                  {option.description}
                </p>
                <Button 
                  className={option.primary ? 
                    "w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-['Montserrat']" :
                    "w-full border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
                  }
                  variant={option.primary ? "default" : "outline"}
                  onClick={() => {
                    if (option.title.includes('gratuit')) setShowPDFModal(true);
                    else if (option.title.includes('Lilo')) setShowLilo(true);
                    else onContactRequest();
                  }}
                >
                  {option.action}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Urgence émotionnelle */}
      <motion.div
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(142, 68, 255, 0.3)',
            '0 0 40px rgba(142, 68, 255, 0.6)',
            '0 0 20px rgba(142, 68, 255, 0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Card className="glass-effect border-yellow-500/30 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
              Pendant que vous lisez, vos concurrents avancent
            </h3>
            <p className="text-white/80 font-['Montserrat']">
              Chaque jour d'attente = -150 vues potentielles perdues
            </p>
          </div>
        </Card>
      </motion.div>

      <div className="flex justify-between">
        <Button 
          variant="outline"
          onClick={() => setCurrentScreen(3)}
          className="border-white/20 text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Revoir diagnostic
        </Button>
        <Button 
          size="lg"
          onClick={() => setCurrentScreen(1)}
          className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
        >
          <Eye className="w-5 h-5 mr-2" />
          Revoir la carte
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black relative overflow-hidden">
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#8E44FF]/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Progress indicator */}
        {currentScreen > 0 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <motion.div
                    className={`w-3 h-3 rounded-full ${
                      step <= currentScreen ? 'bg-[#8E44FF]' : 'bg-white/20'
                    }`}
                    animate={step === currentScreen ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  {step < 4 && <div className="w-8 h-px bg-white/20 mx-2" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screen content */}
        <AnimatePresence mode="wait">
          {currentScreen === 0 && <div key="intro">{renderIntroTutorial()}</div>}
          {currentScreen === 1 && <div key="screen1">{renderScreen1()}</div>}
          {currentScreen === 2 && <div key="screen2">{renderScreen2()}</div>}
          {currentScreen === 3 && <div key="screen3">{renderScreen3()}</div>}
          {currentScreen === 4 && <div key="screen4">{renderScreen4()}</div>}
        </AnimatePresence>
      </div>

      {/* Intelligence AI Modules */}
      <SpectateurIA 
        mouseMovements={[]} 
        scrollBehavior={{ speed: 500, direction: 'down', pauses: 2 }}
        timeOnSection={currentScreen * 10}
        clicks={[]}
      />
      
      <FlowAnalyticsAI 
        metrics={{
          conversionRate: emotionalData.userScore / 20,
          bounceRate: 100 - emotionalData.userScore,
          avgTimeOnPage: 120,
          clickThroughRate: emotionalData.userScore / 25,
          scrollDepth: 60,
          formCompletionRate: 45
        }}
      />

      <RealTimeILAScoring 
        sectionMetrics={{
          sectionId: `screen-${currentScreen}`,
          sectionName: `Écran ${currentScreen}`,
          scrollTime: currentScreen * 8,
          clickCount: 3,
          hoverTime: 5,
          bounceRate: 100 - emotionalData.userScore,
          conversionRate: emotionalData.userScore / 20,
          viewportVisibility: 85
        }}
        position="floating"
        compact={true}
      />

      <IAMiroir 
        userContext={{
          currentSection: `screen-${currentScreen}`,
          timeOnSection: currentScreen * 15,
          previousSections: [`screen-${Math.max(1, currentScreen - 1)}`],
          behaviorPattern: 'explorer',
          engagementLevel: 0.7,
          lastInteraction: 'click'
        }}
      />

      {/* Urgency Banner */}
      {renderUrgencyBanner()}

      {/* PDF Modal */}
      {renderPDFModal()}

      {/* Simulator Modal */}
      {renderSimulator()}

      {/* Et si j'améliorais floating button */}
      {currentScreen > 1 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 left-6 z-40"
        >
          <Button
            onClick={() => setShowSimulator(true)}
            className="bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] text-black px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform font-['Montserrat'] font-bold"
          >
            💡 Et si j'améliorais...
          </Button>
        </motion.div>
      )}

      {/* Enhanced Lilo Assistant */}
      <AnimatePresence>
        {showLilo && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="glass-effect border-[#8E44FF]/30 p-4 w-80">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 text-white">🤖</div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 font-['Montserrat']">
                    Lilo IA - Guide Local
                  </h4>
                  <p className="text-white/80 text-sm font-['Montserrat'] mb-3">
                    {getLiloMessage()}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-[#8E44FF] text-white" onClick={onLiloInteraction}>
                      Oui, aide-moi
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => setShowLilo(false)}>
                      Plus tard
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmotionalHeatmapInterface;