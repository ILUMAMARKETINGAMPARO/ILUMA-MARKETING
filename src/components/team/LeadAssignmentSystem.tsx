import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useTeam } from '@/contexts/TeamContext';
import TeamMemberCard from './TeamMemberCard';

const LeadAssignmentSystem = () => {
  const { leads, team, assignLead, getAvailableExpert } = useTeam();
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 border-blue-500/30 text-blue-300';
      case 'assigned': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'contacted': return 'bg-purple-500/20 border-purple-500/30 text-purple-300';
      case 'converted': return 'bg-green-500/20 border-green-500/30 text-green-300';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 border-red-500/30 text-red-300';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      case 'low': return 'bg-green-500/20 border-green-500/30 text-green-300';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
    }
  };

  const handleAssignment = (leadId: string, memberId: string) => {
    assignLead(leadId, memberId);
    setSelectedLead(null);
  };

  const getAssignedMember = (memberId: string) => {
    return team.find(member => member.id === memberId);
  };

  if (leads.length === 0) {
    return (
      <Card className="glass-effect border-white/20 p-8 text-center">
        <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Aucun lead en attente</h3>
        <p className="text-white/70">Les nouveaux leads apparaîtront ici pour attribution automatique.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-purple-400" />
        <h3 className="text-2xl font-bold text-white">Attribution des Leads</h3>
        <Badge className="ml-auto bg-purple-500/20 border-purple-500/30 text-purple-300">
          {leads.length} leads
        </Badge>
      </div>

      <div className="grid gap-4">
        {leads.map((lead) => {
          const assignedMember = lead.assignedTo ? getAssignedMember(lead.assignedTo) : null;
          const suggestedExpert = getAvailableExpert(lead.service);

          return (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-effect border-white/20 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-white">{lead.name}</h4>
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                      <Badge className={getPriorityColor(lead.priority)}>
                        {lead.priority}
                      </Badge>
                    </div>
                    <p className="text-white/70 mb-1">{lead.email}</p>
                    <p className="text-purple-300 text-sm">Service: {lead.service}</p>
                  </div>
                  <div className="text-right text-white/60 text-sm">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {lead.createdAt.toLocaleDateString()}
                  </div>
                </div>

                {assignedMember ? (
                  <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Assigné à {assignedMember.name}</p>
                      <p className="text-white/60 text-sm">{assignedMember.role}</p>
                    </div>
                    <TeamMemberCard memberId={assignedMember.id} compact />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {suggestedExpert ? (
                      <div className="flex items-center gap-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <AlertCircle className="w-5 h-5 text-blue-400" />
                        <div className="flex-1">
                          <p className="text-white font-medium">Expert suggéré: {suggestedExpert.name}</p>
                          <p className="text-white/60 text-sm">Spécialité correspondante</p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={() => handleAssignment(lead.id, suggestedExpert.id)}
                        >
                          Assigner
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                        <p className="text-yellow-300 font-medium mb-2">Aucun expert disponible</p>
                        <p className="text-white/60 text-sm">Attribution manuelle requise</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {team.filter(member => member.status === 'available').map((member) => (
                        <Button
                          key={member.id}
                          variant="outline"
                          size="sm"
                          className="border-purple-500/30 text-white hover:bg-purple-600/20"
                          onClick={() => handleAssignment(lead.id, member.id)}
                        >
                          {member.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadAssignmentSystem;