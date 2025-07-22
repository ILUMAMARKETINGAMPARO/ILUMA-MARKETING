import React from 'react';
import { motion } from 'framer-motion';
import { Users, Brain, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TeamMemberCard from './TeamMemberCard';
import { useTeam } from '@/contexts/TeamContext';

const TeamSection = () => {
  const { team } = useTeam();

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900/20 to-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-purple-400" />
            <span className="text-purple-300 font-medium">Équipe Iluma</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-6">
            Experts en Intelligence Artificielle
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Notre équipe d'experts combine créativité humaine et intelligence artificielle 
            pour propulser votre entreprise vers de nouveaux sommets digitaux.
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="text-center glass-effect border-white/20 rounded-xl p-6">
            <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">15+</div>
            <div className="text-white/70">Années d'expérience</div>
          </div>
          <div className="text-center glass-effect border-white/20 rounded-xl p-6">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-white/70">Projets réalisés</div>
          </div>
          <div className="text-center glass-effect border-white/20 rounded-xl p-6">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">3</div>
            <div className="text-white/70">Langues parlées</div>
          </div>
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TeamMemberCard memberId={member.id} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg group">
              <Users className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Rencontrer l'équipe
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;