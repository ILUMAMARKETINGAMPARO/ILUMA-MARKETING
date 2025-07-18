import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Building2, MapPin, Globe, Phone, Mail } from 'lucide-react';
import { useILUMATCH } from '@/contexts/ILUMATCHContext';
import { BusinessProfile } from '@/types/ilumatch';

const BusinessRegistrationForm = () => {
  const { addBusiness, isCalculating } = useILUMATCH();
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    address: '',
    website: '',
    phone: '',
    email: '',
    gmbUrl: '',
    languages: ['fr'] as ('fr' | 'en' | 'es')[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Geocoding simulation (in production, use Google Maps Geocoding API)
    const coordinates = {
      lat: 45.5017 + (Math.random() - 0.5) * 0.1, // Montreal area
      lng: -73.5673 + (Math.random() - 0.5) * 0.1
    };

    const businessData: Omit<BusinessProfile, 'id' | 'ilaScore'> = {
      ...formData,
      coordinates
    };

    await addBusiness(businessData);
    
    // Reset form
    setFormData({
      name: '',
      sector: '',
      address: '',
      website: '',
      phone: '',
      email: '',
      gmbUrl: '',
      languages: ['fr']
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-effect border-[#8E44FF]/20 p-8">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="w-8 h-8 text-[#8E44FF]" />
          <h2 className="text-2xl font-bold text-white font-['Montserrat']">
            Ajouter une Entreprise
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-['Montserrat']">
                Nom de l'entreprise *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Restaurant Le Gourmet"
                required
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sector" className="text-white font-['Montserrat']">
                Secteur d'activité *
              </Label>
              <Select
                value={formData.sector}
                onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}
                required
              >
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue placeholder="Sélectionnez un secteur" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/20">
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="commerce">Commerce de détail</SelectItem>
                  <SelectItem value="services">Services professionnels</SelectItem>
                  <SelectItem value="sante">Santé et bien-être</SelectItem>
                  <SelectItem value="immobilier">Immobilier</SelectItem>
                  <SelectItem value="automobile">Automobile</SelectItem>
                  <SelectItem value="beaute">Beauté et esthétique</SelectItem>
                  <SelectItem value="fitness">Sport et fitness</SelectItem>
                  <SelectItem value="technologie">Technologie</SelectItem>
                  <SelectItem value="education">Éducation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-white font-['Montserrat'] flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Adresse complète *
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="123 Rue Saint-Denis, Montréal, QC H2X 3K8, Canada"
              required
              className="bg-black/20 border-white/20 text-white placeholder-white/50"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="website" className="text-white font-['Montserrat'] flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Site web
              </Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://monentreprise.com"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white font-['Montserrat'] flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(514) 123-4567"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-['Montserrat'] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="contact@monentreprise.com"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gmb" className="text-white font-['Montserrat']">
                URL Google My Business
              </Label>
              <Input
                id="gmb"
                type="url"
                value={formData.gmbUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, gmbUrl: e.target.value }))}
                placeholder="https://g.page/monentreprise"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isCalculating}
            className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] font-['Montserrat'] h-12"
          >
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Calcul du Score ILA™...
              </>
            ) : (
              <>
                <Building2 className="w-5 h-5 mr-2" />
                Analyser cette entreprise
              </>
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default BusinessRegistrationForm;