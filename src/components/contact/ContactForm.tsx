import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from '@/hooks/useTranslations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
interface FormData {
  nom: string;
  email: string;
  entreprise: string;
  secteur: string;
  budget: string;
  objectif: string;
  message: string;
  priorite: string;
}

interface ContactFormProps {
  onSubmit: (data: FormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const { t } = useTranslations();
 
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    email: '',
    entreprise: '',
    secteur: '',
    budget: '',
    objectif: '',
    message: '',
    priorite: 'normale'
  });
  const [step, setStep] = useState(1);

  const secteurs = [
    'E-commerce',
    'Services B2B',
    'Santé & Bien-être',
    'Technologie',
    'Immobilier',
    'Éducation',
    'Finance',
    'Autre'
  ];

  const budgets = [
    'Startup',
    'Petite entreprise',
    'Moyenne entreprise',
    'Grande entreprise',
    'Enterprise'
  ];

  const objectifs = [
    'Augmenter le trafic web',
    'Générer plus de leads',
    'Améliorer les conversions',
    'Développer la notoriété',
    'Optimiser le ROI marketing',
    'Digitaliser les processus'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="glass-effect rounded-3xl p-8 border border-white/20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">{t('contact.badge')}</h2>
        <div className="flex gap-2">
          {[1, 2, 3].map(stepNum => (
            <div 
              key={stepNum}
              className={`w-3 h-3 rounded-full ${
                stepNum <= step ? 'bg-cyan-400' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 mb-2">{t('contact.form.name')}</label>
                <Input
                  required
                  value={formData.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  className="glass-effect border-white/20 text-white"
                  placeholder={t('contact.form.name.placeholder')}
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2">Email professionnel *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="glass-effect border-white/20 text-white"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/80 mb-2">Entreprise</label>
              <Input
                value={formData.entreprise}
                onChange={(e) => handleInputChange('entreprise', e.target.value)}
                className="glass-effect border-white/20 text-white"
                placeholder="Nom de votre entreprise"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Secteur d'activité</label>
              <Select onValueChange={(value) => handleInputChange('secteur', value)}>
                <SelectTrigger className="glass-effect border-white/20 text-white">
                  <SelectValue placeholder="Choisissez votre secteur" />
                </SelectTrigger>
                <SelectContent>
                  {secteurs.map(secteur => (
                    <SelectItem key={secteur} value={secteur}>{secteur}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-white/80 mb-2">Budget marketing mensuel</label>
              <Select onValueChange={(value) => handleInputChange('budget', value)}>
                <SelectTrigger className="glass-effect border-white/20 text-white">
                  <SelectValue placeholder="Votre budget approximatif" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.map(budget => (
                    <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-white/80 mb-2">Objectif principal</label>
              <Select onValueChange={(value) => handleInputChange('objectif', value)}>
                <SelectTrigger className="glass-effect border-white/20 text-white">
                  <SelectValue placeholder="Que souhaitez-vous accomplir ?" />
                </SelectTrigger>
                <SelectContent>
                  {objectifs.map(objectif => (
                    <SelectItem key={objectif} value={objectif}>{objectif}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Décrivez votre projet</label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="glass-effect border-white/20 text-white min-h-32"
                placeholder="Parlez-nous de vos défis, objectifs et attentes..."
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2">Priorité</label>
              <Select onValueChange={(value) => handleInputChange('priorite', value)} defaultValue="normale">
                <SelectTrigger className="glass-effect border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="faible">Faible - Projet exploratoire</SelectItem>
                  <SelectItem value="normale">Normale - Dans les 3 mois</SelectItem>
                  <SelectItem value="haute">Haute - Urgent, dans le mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Précédent
            </Button>
          )}
          
          {step < 3 ? (
            <Button
              type="button"
              onClick={() => setStep(step + 1)}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white ml-auto"
              disabled={step === 1 && (!formData.nom || !formData.email)}
            >
              Suivant
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white ml-auto"
            >
              Envoyer ma demande
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;