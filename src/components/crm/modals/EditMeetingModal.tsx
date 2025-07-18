import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  meetingForm: {
    title: string;
    date: string;
    time: string;
    client: string;
    type: string;
    assignedTo: string;
    priority: string;
    description: string;
  };
  setMeetingForm: (form: any) => void;
  editingItem: any;
  clients: any[];
  team: any[];
}

const EditMeetingModal: React.FC<EditMeetingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  meetingForm,
  setMeetingForm,
  editingItem,
  clients,
  team
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#8E44FF] font-['Montserrat']">
            Modifier la réunion
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Modifiez les informations de "{editingItem?.title}"
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-meeting-title" className="text-white/80">Titre de la réunion *</Label>
            <Input
              id="edit-meeting-title"
              value={meetingForm.title}
              onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Titre de la réunion"
            />
          </div>
          <div>
            <Label htmlFor="edit-meeting-description" className="text-white/80">Description</Label>
            <Textarea
              id="edit-meeting-description"
              value={meetingForm.description}
              onChange={(e) => setMeetingForm({...meetingForm, description: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Ordre du jour, objectifs..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-meeting-date" className="text-white/80">Date</Label>
              <Input
                id="edit-meeting-date"
                type="date"
                value={meetingForm.date}
                onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-meeting-time" className="text-white/80">Heure</Label>
              <Input
                id="edit-meeting-time"
                type="time"
                value={meetingForm.time}
                onChange={(e) => setMeetingForm({...meetingForm, time: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-meeting-client" className="text-white/80">Client</Label>
            <Select value={meetingForm.client} onValueChange={(value) => setMeetingForm({...meetingForm, client: value})}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Choisir un client" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.name}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="edit-meeting-type" className="text-white/80">Type de réunion</Label>
            <Select value={meetingForm.type} onValueChange={(value) => setMeetingForm({...meetingForm, type: value})}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="meeting">Réunion client</SelectItem>
                <SelectItem value="deadline">Échéance</SelectItem>
                <SelectItem value="follow-up">Suivi</SelectItem>
                <SelectItem value="delivery">Livraison</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
            <Label htmlFor="edit-meeting-assigned" className="text-white/80">Assigné à</Label>
            <Select value={meetingForm.assignedTo} onValueChange={(value) => setMeetingForm({...meetingForm, assignedTo: value})}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Collaborateur" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                {team.map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            <div>
            <Label htmlFor="edit-meeting-priority" className="text-white/80">Priorité</Label>
            <Select value={meetingForm.priority} onValueChange={(value) => setMeetingForm({...meetingForm, priority: value})}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={onSave} className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80">
              Sauvegarder
            </Button>
            <Button variant="outline" onClick={onClose} className="border-white/20 text-white">
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMeetingModal;