import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCRM } from '@/contexts/CRMContext';

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientForm: {
    name: string;
    sector: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    revenue: number;
  };
  setClientForm: React.Dispatch<React.SetStateAction<{
    name: string;
    sector: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    revenue: number;
  }>>;
  onAddClient: () => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  open,
  onOpenChange,
  clientForm,
  setClientForm,
  onAddClient
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border-white/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#FFD56B] font-['Montserrat']">Ajouter un nouveau client</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client-name" className="text-white/80">Nom du client *</Label>
              <Input
                id="client-name"
                value={clientForm.name}
                onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
                placeholder="Nom de l'entreprise"
              />
            </div>
            <div>
              <Label htmlFor="client-sector" className="text-white/80">Secteur *</Label>
              <Select value={clientForm.sector} onValueChange={(value) => setClientForm({...clientForm, sector: value})}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue placeholder="Choisir un secteur" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="restauration">Restauration</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="santé">Santé</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="technologie">Technologie</SelectItem>
                  <SelectItem value="immobilier">Immobilier</SelectItem>
                  <SelectItem value="sport">Sport & Loisirs</SelectItem>
                  <SelectItem value="beaute">Beauté & Bien-être</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="client-address" className="text-white/80">Adresse</Label>
            <Input
              id="client-address"
              value={clientForm.address}
              onChange={(e) => setClientForm({...clientForm, address: e.target.value})}
              className="bg-black/20 border-white/20 text-white"
              placeholder="Adresse complète"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client-email" className="text-white/80">Email</Label>
              <Input
                id="client-email"
                type="email"
                value={clientForm.email}
                onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
                placeholder="contact@entreprise.com"
              />
            </div>
            <div>
              <Label htmlFor="client-phone" className="text-white/80">Téléphone</Label>
              <Input
                id="client-phone"
                value={clientForm.phone}
                onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
                placeholder="(514) 123-4567"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client-website" className="text-white/80">Site web</Label>
              <Input
                id="client-website"
                value={clientForm.website}
                onChange={(e) => setClientForm({...clientForm, website: e.target.value})}
                className="bg-black/20 border-white/20 text-white"
                placeholder="https://entreprise.com"
              />
            </div>
            <div>
              <Label htmlFor="client-revenue" className="text-white/80">Revenus estimés (€)</Label>
              <Input
                id="client-revenue"
                type="number"
                value={clientForm.revenue}
                onChange={(e) => setClientForm({...clientForm, revenue: parseInt(e.target.value) || 0})}
                className="bg-black/20 border-white/20 text-white"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={onAddClient} className="flex-1 bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black">
              Ajouter Client
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-white/20 text-white">
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;