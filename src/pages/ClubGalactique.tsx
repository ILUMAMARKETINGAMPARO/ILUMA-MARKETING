import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MemberDashboard from '@/components/club/MemberDashboard';
import ExclusiveOffers from '@/components/club/ExclusiveOffers';
import CommunitySection from '@/components/club/CommunitySection';
import RewardsPanel from '@/components/club/RewardsPanel';

const ClubGalactique = () => {
  const memberStats = {
    level: "Étoile Dorée",
    points: 12840,
    savings: "2,340€",
    rank: 17
  };

  const exclusiveOffers = [
    {
      id: "1",
      title: "Audit SEO Premium",
      description: "Analyse complète de votre visibilité en ligne",
      discount: "-40%",
      validUntil: "15 jours",
      category: "SEO",
      isNew: true
    },
    {
      id: "2", 
      title: "Landing Page IA",
      description: "Page optimisée avec intelligence artificielle",
      discount: "-30%",
      validUntil: "10 jours",
      category: "Web Design"
    },
    {
      id: "3",
      title: "Formation Marketing Digital",
      description: "Masterclass exclusive avec nos experts",
      discount: "Gratuit",
      validUntil: "5 jours",
      category: "Formation",
      isNew: true
    }
  ];

  const communityEvents = [
    {
      id: "1",
      title: "Webinar SEO 2025",
      date: "15 Jan 2025",
      type: "webinar" as const,
      participants: 234,
      status: "upcoming" as const
    },
    {
      id: "2",
      title: "Workshop IA Marketing",
      date: "22 Jan 2025", 
      type: "workshop" as const,
      participants: 89,
      status: "upcoming" as const
    },
    {
      id: "3",
      title: "Networking Montréal",
      date: "30 Jan 2025",
      type: "networking" as const,
      participants: 156,
      status: "live" as const
    }
  ];

  const topMembers = [
    { name: "Marie Dubois", level: "Constellation", avatar: "", points: 23450 },
    { name: "Jean Tremblay", level: "Galaxie", avatar: "", points: 19870 },
    { name: "Sophie Martin", level: "Étoile Dorée", avatar: "", points: 18230 }
  ];

  const availableRewards = [
    {
      id: "1",
      name: "Consultation SEO Gratuite",
      description: "Analyse personnalisée de votre site web",
      pointsCost: 5000,
      category: "SEO",
      available: true
    },
    {
      id: "2",
      name: "Template Landing Page Premium",
      description: "Modèle professionnel optimisé pour la conversion",
      pointsCost: 8000,
      category: "Design",
      available: true
    },
    {
      id: "3",
      name: "Formation Marketing IA",
      description: "Accès exclusif à notre masterclass",
      pointsCost: 12000,
      category: "Formation",
      available: memberStats.points >= 12000
    },
    {
      id: "4",
      name: "Audit Complet Gratuit",
      description: "Analyse approfondie de votre stratégie digitale",
      pointsCost: 15000,
      category: "Audit",
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <Star className="w-6 h-6 text-yellow-400" />
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
              Club Galactique
              <br />
              <span className="text-4xl md:text-6xl">Iluma™</span>
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Rejoignez une communauté exclusive d'entrepreneurs visionnaires. 
              Accédez à des avantages uniques, des formations premium et un réseau d'élite.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg">
              Devenir Membre Premium
            </Button>
          </motion.div>

          {/* Member Dashboard */}
          <MemberDashboard stats={memberStats} />

          {/* Exclusive Offers */}
          <ExclusiveOffers offers={exclusiveOffers} />

          {/* Community Section */}
          <CommunitySection events={communityEvents} topMembers={topMembers} />

          {/* Rewards Panel */}
          <RewardsPanel 
            currentPoints={memberStats.points}
            nextLevelPoints={20000}
            availableRewards={availableRewards}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClubGalactique;
