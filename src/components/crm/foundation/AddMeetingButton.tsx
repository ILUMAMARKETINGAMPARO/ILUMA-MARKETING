import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Calendar, Clock, User, Target } from 'lucide-react';
import { useMeeting } from '@/contexts/MeetingContext';
import { useCRM } from '@/contexts/CRMContext';
import { useToast } from '@/hooks/use-toast.ts';

interface AddMeetingButtonProps {
  compact?: boolean;
  className?: string;
}

const AddMeetingButton: React.FC<AddMeetingButtonProps> = ({ 
  compact = false, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createMeeting } = useMeeting();
  const { clients, team } = useCRM();
  const { toast } = useToast();

  const [meetingForm, setMeetingForm] = useState({
    clientId: '',
    clientName: '',
    date: '',
    time: '',
    type: 'consultation' as 'consultation' | 'presentation' | 'follow-up',
    status: 'scheduled' as 'scheduled' | 'completed' | 'cancelled',
    notes: '',
    assignedTo: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    title: '',
    description: ''
  });

  const resetForm = () => {
    setMeetingForm({
      clientId: '',
      clientName: '',
      date: '',
      time: '',
      type: 'consultation',
      status: 'scheduled',
      notes: '',
      assignedTo: '',
      priority: 'medium',
      title: '',
      description: ''
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!meetingForm.title || !meetingForm.date || !meetingForm.time || !meetingForm.clientName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Créer la réunion
      createMeeting({
        clientId: meetingForm.clientId || Date.now().toString(),
        clientName: meetingForm.clientName,
        date: meetingForm.date,
        time: meetingForm.time,
        type: meetingForm.type,
        status: meetingForm.status,
        notes: meetingForm.notes || meetingForm.description,
        aiSuggestions: [
          `Préparer présentation ${meetingForm.type} pour ${meetingForm.clientName}`,
          `Réviser historique client avant la réunion`,
          `Préparer matériel de démonstration approprié`
        ]
      });

      toast({
        title: "Réunion créée",
        description: `Réunion "${meetingForm.title}" programmée pour le ${meetingForm.date} à ${meetingForm.time}`,
        variant: "default"
      });

      resetForm();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la réunion",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClientChange = (clientName: string) => {
    const selectedClient = clients.find(c => c.name === clientName);
    setMeetingForm({
      ...meetingForm,
      clientName,
      clientId: selectedClient?.id || ''
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`bg-gradient-to-r from-[#8E44FF] to-[#8E44FF]/80 hover:from-[#8E44FF]/90 hover:to-[#8E44FF]/70 text-white font-['Montserrat'] transition-all duration-200 ${className}`}
        size={compact ? "sm" : "default"}
      >
        <Plus className="w-4 h-4 mr-2" />
        Nouvelle Réunion
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#8E44FF] font-['Montserrat'] text-xl flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Planifier une nouvelle réunion
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Créez une réunion complète avec tous les détails nécessaires
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informations de base */}
            <div className="space-y-4">
              <h3 className="text-[#FFD56B] font-semibold">Informations de base</h3>
              
              <div>
                <Label htmlFor="meeting-title" className="text-white/80 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Titre de la réunion *
                </Label>
                <Input
                  id="meeting-title"
                  value={meetingForm.title}
                  onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
                  className="bg-black/20 border-white/20 text-white"
                  placeholder="Ex: Présentation ADLUMA™ - Restaurant La Table"
                />
              </div>

              <div>
                <Label htmlFor="meeting-description" className="text-white/80">Description / Ordre du jour</Label>
                <Textarea
                  id="meeting-description"
                  value={meetingForm.description}
                  onChange={(e) => setMeetingForm({...meetingForm, description: e.target.value})}
                  className="bg-black/20 border-white/20 text-white h-20"
                  placeholder="Objectifs, sujets à aborder, matériel nécessaire..."
                />
              </div>
            </div>

            {/* Date et heure */}
            <div className="space-y-4">
              <h3 className="text-[#FFD56B] font-semibold">Planification</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meeting-date" className="text-white/80 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date *
                  </Label>
                  <Input
                    id="meeting-date"
                    type="date"
                    value={meetingForm.date}
                    onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                    className="bg-black/20 border-white/20 text-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="meeting-time" className="text-white/80 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Heure *
                  </Label>
                  <Input
                    id="meeting-time"
                    type="time"
                    value={meetingForm.time}
                    onChange={(e) => setMeetingForm({...meetingForm, time: e.target.value})}
                    className="bg-black/20 border-white/20 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-4">
              <h3 className="text-[#FFD56B] font-semibold">Participants</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meeting-client" className="text-white/80 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Client *
                  </Label>
                  <Select value={meetingForm.clientName} onValueChange={handleClientChange}>
                    <SelectTrigger className="bg-black/20 border-white/20 text-white">
                      <SelectValue placeholder="Choisir un client" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 z-50">
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.name} className="text-white hover:bg-white/10">
                          {client.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="__new__" className="text-[#8E44FF] hover:bg-white/10">
                        + Nouveau client
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {meetingForm.clientName === '__new__' && (
                    <Input
                      className="mt-2 bg-black/20 border-white/20 text-white"
                      placeholder="Nom du nouveau client"
                      onChange={(e) => setMeetingForm({...meetingForm, clientName: e.target.value, clientId: ''})}
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="meeting-assigned" className="text-white/80">Assigné à</Label>
                  <Select value={meetingForm.assignedTo} onValueChange={(value) => setMeetingForm({...meetingForm, assignedTo: value})}>
                    <SelectTrigger className="bg-black/20 border-white/20 text-white">
                      <SelectValue placeholder="Collaborateur responsable" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 z-50">
                      {team.map((member) => (
                        <SelectItem key={member.id} value={member.name} className="text-white hover:bg-white/10">
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Détails supplémentaires */}
            <div className="space-y-4">
              <h3 className="text-[#FFD56B] font-semibold">Détails</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meeting-type" className="text-white/80">Type de réunion</Label>
                  <Select value={meetingForm.type} onValueChange={(value: any) => setMeetingForm({...meetingForm, type: value})}>
                    <SelectTrigger className="bg-black/20 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 z-50">
                      <SelectItem value="consultation" className="text-white hover:bg-white/10">Consultation initiale</SelectItem>
                      <SelectItem value="presentation" className="text-white hover:bg-white/10">Présentation service</SelectItem>
                      <SelectItem value="follow-up" className="text-white hover:bg-white/10">Suivi / Point d'étape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="meeting-priority" className="text-white/80">Priorité</Label>
                  <Select value={meetingForm.priority} onValueChange={(value: any) => setMeetingForm({...meetingForm, priority: value})}>
                    <SelectTrigger className="bg-black/20 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 z-50">
                      <SelectItem value="low" className="text-white hover:bg-white/10">🟢 Faible</SelectItem>
                      <SelectItem value="medium" className="text-white hover:bg-white/10">🟡 Moyenne</SelectItem>
                      <SelectItem value="high" className="text-white hover:bg-white/10">🔴 Élevée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="meeting-notes" className="text-white/80">Notes préparatoires</Label>
                <Textarea
                  id="meeting-notes"
                  value={meetingForm.notes}
                  onChange={(e) => setMeetingForm({...meetingForm, notes: e.target.value})}
                  className="bg-black/20 border-white/20 text-white h-20"
                  placeholder="Informations importantes, préparation nécessaire, documents à apporter..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
              >
                {isSubmitting ? "Création..." : "Créer la réunion"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)} 
                className="border-white/20 text-white hover:bg-white/10"
              >
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddMeetingButton;