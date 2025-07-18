import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  clientForm: {
    name: string;
    sector: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    revenue: number;
    status: string;
    notes: string;
  };
  setClientForm: (form: any) => void;
  editingItem: any;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  clientForm,
  setClientForm,
  editingItem
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-white/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#8E44FF] font-['Montserrat']">
            Modifier le client
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Modifiez les informations du client "{editingItem?.name}"
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <Label htmlFor="edit-client-name" className="text-white/80">Nom du client *</Label>
            <Input
              id="edit-client-name"
              value={clientForm.name}
              onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Nom de l'entreprise"
            />
          </div>
          <div>
            <Label htmlFor="edit-client-sector" className="text-white/80">Secteur d'activité *</Label>
            <Input
              id="edit-client-sector"
              value={clientForm.sector}
              onChange={(e) => setClientForm({...clientForm, sector: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Restaurant, E-commerce, Services..."
            />
          </div>
          <div>
            <Label htmlFor="edit-client-address" className="text-white/80">Adresse</Label>
            <Textarea
              id="edit-client-address"
              value={clientForm.address}
              onChange={(e) => setClientForm({...clientForm, address: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Adresse complète..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-client-email" className="text-white/80">Email</Label>
              <Input
                id="edit-client-email"
                type="email"
                value={clientForm.email}
                onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
                placeholder="contact@entreprise.com"
              />
            </div>
            <div>
              <Label htmlFor="edit-client-phone" className="text-white/80">Téléphone</Label>
              <Input
                id="edit-client-phone"
                value={clientForm.phone}
                onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
                placeholder="+33 1 23 45 67 89"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-client-website" className="text-white/80">Site web</Label>
            <Input
              id="edit-client-website"
              value={clientForm.website}
              onChange={(e) => setClientForm({...clientForm, website: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="https://www.entreprise.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-client-revenue" className="text-white/80">Chiffre d'affaires (€)</Label>
              <Input
                id="edit-client-revenue"
                type="number"
                min="0"
                value={clientForm.revenue}
                onChange={(e) => setClientForm({...clientForm, revenue: parseInt(e.target.value) || 0})}
                className="bg-black/20 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-client-status" className="text-white/80">Statut</Label>
              <Select value={clientForm.status} onValueChange={(value) => setClientForm({...clientForm, status: value})}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="edit-client-notes" className="text-white/80">Notes</Label>
            <Textarea
              id="edit-client-notes"
              value={clientForm.notes}
              onChange={(e) => setClientForm({...clientForm, notes: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Notes internes sur le client..."
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

export default EditClientModal;