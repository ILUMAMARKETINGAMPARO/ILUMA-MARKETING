import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Calendar, ExternalLink } from 'lucide-react';

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  type: 'webinar' | 'workshop' | 'networking';
  participants: number;
  status: 'upcoming' | 'live' | 'completed';
}

interface CommunityMember {
  name: string;
  level: string;
  avatar: string;
  points: number;
}

interface CommunitySectionProps {
  events: CommunityEvent[];
  topMembers: CommunityMember[];
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ events, topMembers }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent mb-4">
          Communauté Galactique
        </h2>
        <p className="text-white/70 text-lg">
          Connectez-vous avec d'autres membres et participez aux événements exclusifs
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Events */}
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Événements à venir</h3>
          </div>
          
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{event.title}</span>
                    <Badge className={`text-xs ${
                      event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
                      event.status === 'live' ? 'bg-green-500/20 text-green-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {event.status === 'upcoming' ? 'À venir' : 
                       event.status === 'live' ? 'En direct' : 'Terminé'}
                    </Badge>
                  </div>
                  <div className="text-white/60 text-sm">{event.date} • {event.participants} participants</div>
                </div>
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Members */}
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Top Membres</h3>
          </div>
          
          <div className="space-y-4">
            {topMembers.map((member, index) => (
              <div key={member.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{member.name}</div>
                  <div className="text-white/60 text-sm">{member.level} • {member.points.toLocaleString()} points</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default CommunitySection;