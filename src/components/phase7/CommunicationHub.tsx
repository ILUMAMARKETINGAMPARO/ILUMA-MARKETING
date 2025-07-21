import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Video, 
  Mail, 
  Calendar,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const CommunicationHub = () => {
  const [communicationStats, setCommunicationStats] = useState({
    totalMessages: 1247,
    activeChannels: 8,
    responseTime: 2.3,
    satisfaction: 94,
    securityScore: 98
  });

  const [channels, setChannels] = useState([
    {
      id: 1,
      name: 'CRM Team Channel',
      type: 'team',
      members: 12,
      messages: 156,
      status: 'active',
      security: 'high',
      lastActivity: '2 min ago'
    },
    {
      id: 2,
      name: 'Client Support',
      type: 'support',
      members: 8,
      messages: 89,
      status: 'active',
      security: 'high',
      lastActivity: '5 min ago'
    },
    {
      id: 3,
      name: 'ADLUMA™ Alerts',
      type: 'alerts',
      members: 15,
      messages: 34,
      status: 'monitoring',
      security: 'enterprise',
      lastActivity: '1 min ago'
    },
    {
      id: 4,
      name: 'ILUMATCH™ Updates',
      type: 'updates',
      members: 6,
      messages: 67,
      status: 'active',
      security: 'high',
      lastActivity: '10 min ago'
    }
  ]);

  const securityFeatures = [
    {
      name: 'Chiffrement E2E',
      status: 'active',
      description: 'Messages chiffrés de bout en bout'
    },
    {
      name: 'Audit Trail',
      status: 'active',
      description: 'Traçabilité complète des communications'
    },
    {
      name: 'Access Control',
      status: 'active',
      description: 'Contrôle d\'accès par rôles et permissions'
    },
    {
      name: 'Data Retention',
      status: 'configured',
      description: 'Politique de rétention conforme RGPD'
    }
  ];

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'team': return Users;
      case 'support': return MessageSquare;
      case 'alerts': return AlertTriangle;
      case 'updates': return TrendingUp;
      default: return MessageSquare;
    }
  };

  const getSecurityBadge = (level: string) => {
    switch (level) {
      case 'enterprise':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'high':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Communication Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{communicationStats.totalMessages}</div>
              <div className="text-white/60 text-sm">Messages/Jour</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{communicationStats.activeChannels}</div>
              <div className="text-white/60 text-sm">Canaux Actifs</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">{communicationStats.responseTime}min</div>
              <div className="text-white/60 text-sm">Temps Réponse</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">{communicationStats.satisfaction}%</div>
              <div className="text-white/60 text-sm">Satisfaction</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{communicationStats.securityScore}%</div>
              <div className="text-white/60 text-sm">Sécurité</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Channels */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Canaux de Communication</h3>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            Nouveau Canal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((channel, index) => {
            const IconComponent = getChannelIcon(channel.type);
            return (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{channel.name}</h4>
                      <p className="text-sm text-white/60">{channel.members} membres</p>
                    </div>
                  </div>
                  <Badge className={getSecurityBadge(channel.security)}>
                    {channel.security}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-white/60">Messages</span>
                    <div className="text-white font-bold">{channel.messages}</div>
                  </div>
                  <div>
                    <span className="text-white/60">Dernière activité</span>
                    <div className="text-white font-bold">{channel.lastActivity}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-white/10 hover:bg-white/20 text-white">
                    Rejoindre
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Paramètres
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Security Features */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Sécurité des Communications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <h4 className="font-semibold text-white">{feature.name}</h4>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
              </div>
              <Badge 
                className={
                  feature.status === 'active' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                }
              >
                {feature.status}
              </Badge>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Communication Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 bg-green-600 hover:bg-green-700">
          <Phone className="w-5 h-5 mr-2" />
          Appel d'Équipe
        </Button>
        <Button className="h-16 bg-blue-600 hover:bg-blue-700">
          <Video className="w-5 h-5 mr-2" />
          Visioconférence
        </Button>
        <Button className="h-16 bg-purple-600 hover:bg-purple-700">
          <Calendar className="w-5 h-5 mr-2" />
          Planifier Réunion
        </Button>
      </div>
    </div>
  );
};

export default CommunicationHub;