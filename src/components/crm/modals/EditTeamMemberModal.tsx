import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  teamForm: {
    name: string;
    email: string;
    role: string;
    permissions: string[];
  };
  setTeamForm: (form: any) => void;
  editingItem: any;
}

const EditTeamMemberModal: React.FC<EditTeamMemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  teamForm,
  setTeamForm,
  editingItem
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#8E44FF] font-['Montserrat']">
            Modifier le collaborateur
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Modifiez les informations de {editingItem?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-member-name" className="text-white/80">Nom complet *</Label>
            <Input
              id="edit-member-name"
              value={teamForm.name}
              onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Prénom Nom"
            />
          </div>
          <div>
            <Label htmlFor="edit-member-email" className="text-white/80">Email *</Label>
            <Input
              id="edit-member-email"
              type="email"
              value={teamForm.email}
              onChange={(e) => setTeamForm({...teamForm, email: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="email@iluma.com"
            />
          </div>
          <div>
            <Label htmlFor="edit-member-role" className="text-white/80">Rôle</Label>
            <Select value={teamForm.role} onValueChange={(value: any) => setTeamForm({...teamForm, role: value})}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="CEO">CEO</SelectItem>
                <SelectItem value="COO">COO</SelectItem>
                <SelectItem value="PM">Chef de Projet</SelectItem>
                <SelectItem value="SEO">Spécialiste SEO</SelectItem>
                <SelectItem value="Dev">Développeur</SelectItem>
                <SelectItem value="Assistant">Assistant</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
              </SelectContent>
            </Select>
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

export default EditTeamMemberModal;