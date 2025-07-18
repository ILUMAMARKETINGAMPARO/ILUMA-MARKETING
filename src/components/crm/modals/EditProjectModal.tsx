import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  projectForm: {
    name: string;
    client: string;
    assignedTo: string;
    status: string;
    priority: string;
    startDate: string;
    dueDate: string;
    progress: number;
    revenue: number;
    description: string;
  };
  setProjectForm: (form: any) => void;
  editingItem: any;
  clients: any[];
  team: any[];
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  projectForm,
  setProjectForm,
  editingItem,
  clients,
  team
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-white/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#8E44FF] font-['Montserrat']">
            Modifier le projet
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Modifiez les informations du projet "{editingItem?.name}"
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <Label htmlFor="edit-project-name" className="text-white/80">Nom du projet *</Label>
            <Input
              id="edit-project-name"
              value={projectForm.name}
              onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Nom du projet"
            />
          </div>
          <div>
            <Label htmlFor="edit-project-description" className="text-white/80">Description</Label>
            <Textarea
              id="edit-project-description"
              value={projectForm.description}
              onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Description du projet..."
            />
          </div>
          <div>
            <Label htmlFor="edit-project-client" className="text-white/80">Client</Label>
            <Select value={projectForm.client} onValueChange={(value) => setProjectForm({...projectForm, client: value})}>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-project-status" className="text-white/80">Statut</Label>
              <Select value={projectForm.status} onValueChange={(value) => setProjectForm({...projectForm, status: value})}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="planning">Planification</SelectItem>
                  <SelectItem value="progress">En cours</SelectItem>
                  <SelectItem value="review">En révision</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-project-priority" className="text-white/80">Priorité</Label>
              <Select value={projectForm.priority} onValueChange={(value) => setProjectForm({...projectForm, priority: value})}>
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
          <div>
            <Label htmlFor="edit-project-assigned" className="text-white/80">Assigné à</Label>
            <Select value={projectForm.assignedTo} onValueChange={(value) => setProjectForm({...projectForm, assignedTo: value})}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Choisir un collaborateur" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                {team.map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name} ({member.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-project-start" className="text-white/80">Date de début</Label>
              <Input
                id="edit-project-start"
                type="date"
                value={projectForm.startDate}
                onChange={(e) => setProjectForm({...projectForm, startDate: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-project-due" className="text-white/80">Date de fin</Label>
              <Input
                id="edit-project-due"
                type="date"
                value={projectForm.dueDate}
                onChange={(e) => setProjectForm({...projectForm, dueDate: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-project-progress" className="text-white/80">Progression (%)</Label>
              <Input
                id="edit-project-progress"
                type="number"
                min="0"
                max="100"
                value={projectForm.progress}
                onChange={(e) => setProjectForm({...projectForm, progress: parseInt(e.target.value) || 0})}
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-project-revenue" className="text-white/80">Revenus (€)</Label>
              <Input
                id="edit-project-revenue"
                type="number"
                min="0"
                value={projectForm.revenue}
                onChange={(e) => setProjectForm({...projectForm, revenue: parseInt(e.target.value) || 0})}
                className="bg-black/20 border-white/20 text-white"
              />
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

export default EditProjectModal;