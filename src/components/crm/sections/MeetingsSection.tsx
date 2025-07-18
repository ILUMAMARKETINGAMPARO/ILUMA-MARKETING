import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Calendar, User, DollarSign, TrendingUp, Clock, Target, ChevronRight, History, Save } from 'lucide-react';
import { useMeeting } from '@/contexts/MeetingContext';
import { useCRM } from '@/contexts/CRMContext';
import { useSave } from '@/contexts/SaveContext';
import AddMeetingButton from '../foundation/AddMeetingButton';
import SaveButton from '@/components/ui/save-button';
import SaveHistoryPanel from '../components/SaveHistoryPanel';

interface MeetingsSectionProps {
  selectedMeetings: string[];
  setSelectedMeetings: (selected: string[]) => void;
}

const MeetingsSection: React.FC<MeetingsSectionProps> = ({
  selectedMeetings,
  setSelectedMeetings
}) => {
  const { meetings, updateMeeting, deleteMeeting, getUpcomingMeetings } = useMeeting();
  const { clients, team } = useCRM();
  const { saveReunion } = useSave();
  const [viewMode, setViewMode] = useState<'list' | 'upcoming' | 'calendar'>('list');
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return '🎯';
      case 'presentation': return '📊';
      case 'follow-up': return '🔄';
      default: return '📅';
    }
  };

  const upcomingMeetings = getUpcomingMeetings();

  const handleToggleSelection = (meetingId: string) => {
    if (selectedMeetings.includes(meetingId)) {
      setSelectedMeetings(selectedMeetings.filter(id => id !== meetingId));
    } else {
      setSelectedMeetings([...selectedMeetings, meetingId]);
    }
  };

  const handleUpdateStatus = (meetingId: string, newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    updateMeeting(meetingId, { status: newStatus });
  };

  const handleDeleteSelected = () => {
    selectedMeetings.forEach(id => deleteMeeting(id));
    setSelectedMeetings([]);
  };

  if (meetings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Aucune réunion planifiée</h3>
        <p className="text-white/60 mb-6">Commencez par créer votre première réunion</p>
        <AddMeetingButton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-white">
            Réunions ({meetings.length})
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white'}
            >
              Toutes
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'upcoming' ? 'default' : 'outline'}
              onClick={() => setViewMode('upcoming')}
              className={viewMode === 'upcoming' ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white'}
            >
              À venir ({upcomingMeetings.length})
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowHistoryPanel(true)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <History className="w-4 h-4 mr-2" />
            Historique
          </Button>
          {selectedMeetings.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleDeleteSelected}
              className="border-red-500 text-red-500 hover:bg-red-500/10"
            >
              Supprimer ({selectedMeetings.length})
            </Button>
          )}
          <AddMeetingButton />
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{upcomingMeetings.length}</div>
              <div className="text-xs text-white/60">À venir</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {meetings.filter(m => m.status === 'completed').length}
              </div>
              <div className="text-xs text-white/60">Terminées</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {meetings.filter(m => m.type === 'consultation').length}
              </div>
              <div className="text-xs text-white/60">Consultations</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {meetings.filter(m => m.type === 'presentation').length}
              </div>
              <div className="text-xs text-white/60">Présentations</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Liste des réunions */}
      <div className="space-y-4">
        {(viewMode === 'upcoming' ? upcomingMeetings : meetings).map((meeting) => (
          <motion.div
            key={meeting.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-all ${
              selectedMeetings.includes(meeting.id) ? 'ring-2 ring-[#8E44FF]/50 bg-[#8E44FF]/10' : ''
            }`}>
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedMeetings.includes(meeting.id)}
                  onCheckedChange={() => handleToggleSelection(meeting.id)}
                  className="mt-1"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(meeting.type)}</span>
                        <h4 className="text-lg font-semibold text-white">
                          Réunion avec {meeting.clientName}
                        </h4>
                        <Badge className={getStatusColor(meeting.status)}>
                          {meeting.status === 'scheduled' ? 'Planifiée' :
                           meeting.status === 'completed' ? 'Terminée' : 'Annulée'}
                        </Badge>
                      </div>
                      <p className="text-white/70 mb-3">{meeting.notes}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <SaveButton
                        data={meeting}
                        type="reunion"
                        context={`meeting_${meeting.id}`}
                        description={`Réunion avec ${meeting.clientName}`}
                        variant="compact"
                      />
                      {meeting.status === 'scheduled' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(meeting.id, 'completed')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Marquer terminée
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(meeting.id, 'cancelled')}
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            Annuler
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(meeting.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <User className="w-4 h-4" />
                      <span>{meeting.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Target className="w-4 h-4" />
                      <span>
                        {meeting.type === 'consultation' ? 'Consultation' :
                         meeting.type === 'presentation' ? 'Présentation' : 'Suivi'}
                      </span>
                    </div>
                  </div>
                  
                  {meeting.aiSuggestions && meeting.aiSuggestions.length > 0 && (
                    <div className="mt-4 p-3 bg-[#8E44FF]/10 rounded-lg border border-[#8E44FF]/20">
                      <div className="text-[#8E44FF] text-sm font-semibold mb-2">🤖 Suggestions IA</div>
                      <div className="space-y-1">
                        {meeting.aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="text-white/70 text-sm flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Panneau d'historique */}
      <SaveHistoryPanel
        isOpen={showHistoryPanel}
        onClose={() => setShowHistoryPanel(false)}
      />
    </div>
  );
};

export default MeetingsSection;