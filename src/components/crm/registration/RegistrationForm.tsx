import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, MapPin, Phone, Mail, Building, Calendar, Sparkles } from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { toast } from 'sonner';

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  address: string;
  city: string;
  services: string[];
  notes: string;
  status: 'prospect' | 'active' | 'inactive';
  source: string;
}

const RegistrationForm: React.FC = () => {
  const { addClient, addJournalEntry } = useCRM();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    sector: '',
    address: '',
    city: '',
    services: [],
    notes: '',
    status: 'prospect',
    source: 'inscription_manuelle'
  });

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Nom et email sont requis');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create client data
      const clientData = {
        name: formData.company || formData.name,
        sector: formData.sector || 'non_specifie',
        address: `${formData.address}, ${formData.city}`,
        coordinates: { lat: 45.5017, lng: -73.5673 }, // Default Montreal coordinates
        contact: {
          email: formData.email,
          phone: formData.phone,
          website: ''
        },
        ilaScore: {
          current: Math.floor(Math.random() * 30) + 50, // Random score 50-80
          history: [],
          lastUpdated: new Date(),
          trend: 'stable' as const
        },
        status: formData.status,
        assignedTo: 'sergio',
        services: formData.services,
        revenue: 0,
        notes: formData.notes,
        documents: []
      };

      await addClient(clientData);
      
      await addJournalEntry({
        type: 'success',
        title: 'Nouvelle inscription créée',
        content: `${formData.name} (${formData.company || 'Particulier'}) a été ajouté via le formulaire d'inscription`,
        relatedTo: { type: 'client', id: 'new' },
        author: 'Système d\'inscription',
        aiGenerated: false
      });

      toast.success('Inscription créée avec succès!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        sector: '',
        address: '',
        city: '',
        services: [],
        notes: '',
        status: 'prospect',
        source: 'inscription_manuelle'
      });
      
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast.error('Erreur lors de la création de l\'inscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableServices = [
    'SEO Local', 'Landing Page', 'Google Ads', 'ADLUMA™', 'ILA™', 
    'ILUMATCH™', 'BlogIA', 'CRM', 'Formation', 'Audit'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#8E44FF]/20 rounded-full flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-[#8E44FF]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-['Montserrat']">
              Nouvelle Inscription
            </h1>
            <p className="text-white/70 font-['Montserrat']">
              Enregistrer un nouveau prospect ou client
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass-effect border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations personnelles */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-['Montserrat'] flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Nom complet *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Jean Dupont"
                  required
                  className="bg-black/20 border-white/20 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-['Montserrat'] flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="jean@exemple.com"
                  required
                  className="bg-black/20 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-['Montserrat'] flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(514) 123-4567"
                  className="bg-black/20 border-white/20 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white font-['Montserrat'] flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Entreprise
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Nom de l'entreprise"
                  className="bg-black/20 border-white/20 text-white"
                />
              </div>
            </div>

            {/* Informations d'entreprise */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sector" className="text-white font-['Montserrat']">
                  Secteur d'activité
                </Label>
                <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                  <SelectTrigger className="bg-black/20 border-white/20 text-white">
                    <SelectValue placeholder="Sélectionner un secteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restauration">Restauration</SelectItem>
                    <SelectItem value="sante">Santé</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="technologie">Technologie</SelectItem>
                    <SelectItem value="immobilier">Immobilier</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status" className="text-white font-['Montserrat']">
                  Statut
                </Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="bg-black/20 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="active">Client actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Adresse */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-white font-['Montserrat'] flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Adresse
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Rue Exemple"
                  className="bg-black/20 border-white/20 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white font-['Montserrat']">
                  Ville
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Montréal, QC"
                  className="bg-black/20 border-white/20 text-white"
                />
              </div>
            </div>

            {/* Services d'intérêt */}
            <div className="space-y-4">
              <Label className="text-white font-['Montserrat'] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Services d'intérêt
              </Label>
              <div className="grid md:grid-cols-3 gap-3">
                {availableServices.map((service) => (
                  <motion.div
                    key={service}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.services.includes(service)
                        ? 'bg-[#8E44FF]/20 border-[#8E44FF]/50 text-white'
                        : 'bg-black/20 border-white/20 text-white/70 hover:border-white/40'
                    }`}
                    onClick={() => handleServiceToggle(service)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm font-['Montserrat']">{service}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-white font-['Montserrat']">
                Notes complémentaires
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Informations supplémentaires, besoins spécifiques..."
                className="bg-black/20 border-white/20 text-white min-h-20"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-3 font-['Montserrat']"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Création...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Créer l'inscription
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;