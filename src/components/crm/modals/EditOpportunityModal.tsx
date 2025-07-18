import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  opportunityForm: {
    title: string;
    client: string;
    assignedTo: string;
    stage: string;
    value: number;
    probability: number;
    closeDate: string;
    description: string;
    services: string[];
  };
  setOpportunityForm: (form: any) => void;
  editingItem: any;
  clients: any[];
  team: any[];
}

const EditOpportunityModal: React.FC<EditOpportunityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  opportunityForm,
  setOpportunityForm,
  editingItem,
  clients,
  team
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-white/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#8E44FF] font-['Montserrat']">
            Modifier l'opportunité
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Modifiez les informations de l'opportunité "{editingItem?.title}"
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <Label htmlFor="edit-opportunity-title" className="text-white/80">Titre de l'opportunité *</Label>
            <Input
              id="edit-opportunity-title"
              value={opportunityForm.title}
              onChange={(e) => setOpportunityForm({...opportunityForm, title: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Titre de l'opportunité"
            />
          </div>
          <div>
            <Label htmlFor="edit-opportunity-description" className="text-white/80">Description</Label>
            <Textarea
              id="edit-opportunity-description"
              value={opportunityForm.description}
              onChange={(e) => setOpportunityForm({...opportunityForm, description: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Description de l'opportunité..."
            />
          </div>
          <div>
            <Label htmlFor="edit-opportunity-client" className="text-white/80">Client</Label>
            <Select value={opportunityForm.client} onValueChange={(value) => setOpportunityForm({...opportunityForm, client: value})}>
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
              <Label htmlFor="edit-opportunity-stage" className="text-white/80">Étape du pipeline</Label>
              <Select value={opportunityForm.stage} onValueChange={(value) => setOpportunityForm({...opportunityForm, stage: value})}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="proposal">Proposition</SelectItem>
                  <SelectItem value="negotiation">Négociation</SelectItem>
                  <SelectItem value="contract">Contrat</SelectItem>
                  <SelectItem value="delivery">Livraison</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-opportunity-assigned" className="text-white/80">Assigné à</Label>
              <Select value={opportunityForm.assignedTo} onValueChange={(value) => setOpportunityForm({...opportunityForm, assignedTo: value})}>
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-opportunity-value" className="text-white/80">Valeur estimée (€)</Label>
              <Input
                id="edit-opportunity-value"
                type="number"
                min="0"
                value={opportunityForm.value}
                onChange={(e) => setOpportunityForm({...opportunityForm, value: parseInt(e.target.value) || 0})}
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-opportunity-probability" className="text-white/80">Probabilité (%)</Label>
              <Input
                id="edit-opportunity-probability"
                type="number"
                min="0"
                max="100"
                value={opportunityForm.probability}
                onChange={(e) => setOpportunityForm({...opportunityForm, probability: parseInt(e.target.value) || 0})}
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-opportunity-close" className="text-white/80">Date de clôture estimée</Label>
            <Input
              id="edit-opportunity-close"
              type="date"
              value={opportunityForm.closeDate}
              onChange={(e) => setOpportunityForm({...opportunityForm, closeDate: e.target.value})}
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

export default EditOpportunityModal;