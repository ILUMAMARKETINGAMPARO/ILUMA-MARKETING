import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Calendar, Star, Globe, Clock } from 'lucide-react';
import { useTeam } from '@/contexts/TeamContext';

interface TeamMemberCardProps {
  memberId: string;
  compact?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ memberId, compact = false }) => {
  const { team } = useTeam();
  const member = team.find(m => m.id === memberId);
  const [isHovered, setIsHovered] = useState(false);

  if (!member) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'busy': return 'Occupé(e)';
      case 'offline': return 'Hors ligne';
      default: return 'Indisponible';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 glass-effect rounded-lg border border-white/20">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`} />
        </div>
        <div className="flex-1">
          <p className="text-white font-medium text-sm">{member.name}</p>
          <p className="text-white/60 text-xs">{member.role}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="glass-effect border-purple-500/30 p-6 group hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4">
            <Star className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <motion.div 
                className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(member.status)} rounded-full border-2 border-white flex items-center justify-center`}
                animate={member.status === 'available' ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {member.status === 'available' && <div className="w-2 h-2 bg-white rounded-full" />}
              </motion.div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-purple-300 font-medium mb-2">{member.role}</p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-white/60" />
                <span className="text-white/70">{getStatusText(member.status)}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 mb-4 leading-relaxed">{member.description}</p>

          {/* Experience & Languages */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Expérience</p>
              <p className="text-white font-medium">{member.experience}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Langues</p>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-white/60" />
                <p className="text-white text-sm">{member.languages.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <p className="text-white/60 text-sm mb-2">Spécialités</p>
            <div className="flex flex-wrap gap-2">
              {member.specialties.map((specialty, index) => (
                <Badge 
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 text-purple-200 text-xs"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contacter
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-purple-500/30 text-white hover:bg-purple-600/20"
              size="sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Rendez-vous
            </Button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div 
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 -z-10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

export default TeamMemberCard;