import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  taskForm: {
    title: string;
    description: string;
    priority: string;
    assignedTo: string;
    dueDate: string;
    status: string;
  };
  setTaskForm: (form: any) => void;
  editingItem: any;
  team: any[];
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  taskForm,
  setTaskForm,
  editingItem,
  team
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#8E44FF] font-['Montserrat']">
            Modifier la tâche
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Modifiez les informations de la tâche "{editingItem?.title}"
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-task-title" className="text-white/80">Titre de la tâche *</Label>
            <Input
              id="edit-task-title"
              value={taskForm.title}
              onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Description courte de la tâche"
            />
          </div>
          <div>
            <Label htmlFor="edit-task-description" className="text-white/80">Description</Label>
            <Textarea
              id="edit-task-description"
              value={taskForm.description}
              onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Détails de la tâche..."
            />
          </div>
          <div>
            <Label htmlFor="edit-task-priority" className="text-white/80">Priorité</Label>
            <Select value={taskForm.priority} onValueChange={(value) => setTaskForm({...taskForm, priority: value})}>
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
          <div>
            <Label htmlFor="edit-task-status" className="text-white/80">Statut</Label>
            <Select value={taskForm.status} onValueChange={(value) => setTaskForm({...taskForm, status: value})}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="progress">En cours</SelectItem>
                <SelectItem value="review">En révision</SelectItem>
                <SelectItem value="done">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="edit-task-assigned" className="text-white/80">Assigné à</Label>
            <Select value={taskForm.assignedTo} onValueChange={(value) => setTaskForm({...taskForm, assignedTo: value})}>
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
          <div>
            <Label htmlFor="edit-task-due" className="text-white/80">Échéance</Label>
            <Input
              id="edit-task-due"
              type="date"
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
            />
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

export default EditTaskModal;