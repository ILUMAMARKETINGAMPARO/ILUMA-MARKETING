import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  Building,
  Globe,
  MapPin,
  Star,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Target,
  Clock
} from 'lucide-react';
import LiloCharacter from '@/components/lilo/LiloCharacter';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  businessInfo: {
    name: string;
    sector: string;
    website: string;
    city: string;
    numberOfLocations: string;
  };
  digitalPresence: {
    hasGoogleBusiness: string;
    socialMedia: string[];
    googleReviews: string;
    averageRating: string;
  };
  availability: {
    preferredDay: string;
    preferredTime: string;
  };
  challenge: string;
}

interface ILAFormulaireProps {
  onNext: (data: FormData) => void;
  onBack: () => void;
}

const ILAFormulaire: React.FC<ILAFormulaireProps> = ({ onNext, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<FormData>({
    personalInfo: { firstName: '', lastName: '', phone: '', email: '' },
    businessInfo: { name: '', sector: '', website: '', city: '', numberOfLocations: '' },
    digitalPresence: { hasGoogleBusiness: '', socialMedia: [], googleReviews: '', averageRating: '' },
    availability: { preferredDay: '', preferredTime: '' },
    challenge: ''
  });

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const steps = [
    {
      id: 'personal',
      title: 'Qui êtes-vous ?',
      subtitle: 'Vos informations de contact',
      icon: User
    },
    {
      id: 'business',
      title: 'Votre entreprise',
      subtitle: 'Parlez-nous de votre activité',
      icon: Building
    },
    {
      id: 'digital',
      title: 'Votre présence numérique',
      subtitle: 'Êtes-vous déjà visible en ligne ?',
      icon: Globe
    },
    {
      id: 'availability',
      title: 'Quand vous contacter ?',
      subtitle: 'Pour votre diagnostic ILA™',
      icon: Calendar
    },
    {
      id: 'challenge',
      title: 'Votre défi principal',
      subtitle: 'En quelques mots (facultatif)',
      icon: Target
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePersonalInfo = (key: keyof FormData['personalInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [key]: value }
    }));
  };

  const updateBusinessInfo = (key: keyof FormData['businessInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      businessInfo: { ...prev.businessInfo, [key]: value }
    }));
  };

  const updateDigitalPresence = (key: keyof FormData['digitalPresence'], value: any) => {
    setData(prev => ({
      ...prev,
      digitalPresence: { ...prev.digitalPresence, [key]: value }
    }));
  };

  const updateAvailability = (key: keyof FormData['availability'], value: string) => {
    setData(prev => ({
      ...prev,
      availability: { ...prev.availability, [key]: value }
    }));
  };

  const toggleSocialMedia = (platform: string) => {
    setData(prev => ({
      ...prev,
      digitalPresence: {
        ...prev.digitalPresence,
        socialMedia: prev.digitalPresence.socialMedia.includes(platform)
          ? prev.digitalPresence.socialMedia.filter(p => p !== platform)
          : [...prev.digitalPresence.socialMedia, platform]
      }
    }));
  };

  const renderStep = () => {
    const step = steps[currentStep];
    const StepIcon = step.icon;

    switch (step.id) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white font-['Montserrat']">Prénom *</Label>
                <Input
                  value={data.personalInfo.firstName}
                  onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                  placeholder="Ex: Marie"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white font-['Montserrat']">Nom *</Label>
                <Input
                  value={data.personalInfo.lastName}
                  onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                  placeholder="Ex: Dubois"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white font-['Montserrat']">Téléphone *</Label>
              <Input
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="Ex: +1 (514) 123-4567"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-['Montserrat']">Adresse email *</Label>
              <Input
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="Ex: marie@monentreprise.com"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white font-['Montserrat']">Nom de l'entreprise *</Label>
              <Input
                value={data.businessInfo.name}
                onChange={(e) => updateBusinessInfo('name', e.target.value)}
                placeholder="Ex: Restaurant Le Gourmet"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white font-['Montserrat']">Domaine d'activité *</Label>
                <Input
                  value={data.businessInfo.sector}
                  onChange={(e) => updateBusinessInfo('sector', e.target.value)}
                  placeholder="Ex: Restauration, Services, Commerce..."
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white font-['Montserrat']">Ville principale *</Label>
                <Input
                  value={data.businessInfo.city}
                  onChange={(e) => updateBusinessInfo('city', e.target.value)}
                  placeholder="Ex: Montréal"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white font-['Montserrat']">Site web</Label>
              <Input
                value={data.businessInfo.website}
                onChange={(e) => updateBusinessInfo('website', e.target.value)}
                placeholder="https://monsite.com"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="noWebsite" 
                  className="rounded border-white/20"
                />
                <label htmlFor="noWebsite" className="text-white/70 text-sm font-['Montserrat']">
                  ☐ Je n'ai pas encore de site web
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white font-['Montserrat']">Nombre de points de service</Label>
              <div className="grid grid-cols-4 gap-3">
                {['1', '2-5', '6-10', '+10'].map((option) => (
                  <Card
                    key={option}
                    className={`p-3 cursor-pointer transition-all text-center ${
                      data.businessInfo.numberOfLocations === option
                        ? 'border-2 border-[#8E44FF] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => updateBusinessInfo('numberOfLocations', option)}
                  >
                    <span className="text-white font-['Montserrat']">{option}</span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'digital':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white font-['Montserrat']">As-tu une fiche Google (Maps/Business) ?</Label>
              <div className="grid grid-cols-3 gap-3">
                {['Oui', 'Non', 'Je ne sais pas'].map((option) => (
                  <Card
                    key={option}
                    className={`p-4 cursor-pointer transition-all text-center ${
                      data.digitalPresence.hasGoogleBusiness === option
                        ? 'border-2 border-[#8E44FF] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => updateDigitalPresence('hasGoogleBusiness', option)}
                  >
                    <span className="text-white font-['Montserrat']">{option}</span>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-white font-['Montserrat']">Es-tu actif sur les réseaux sociaux ?</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'instagram', label: 'Instagram' },
                  { key: 'facebook', label: 'Facebook' },
                  { key: 'tiktok', label: 'TikTok' },
                  { key: 'youtube', label: 'YouTube' },
                  { key: 'linkedin', label: 'LinkedIn' },
                  { key: 'aucun', label: 'Aucun' }
                ].map((platform) => (
                  <Card
                    key={platform.key}
                    className={`p-4 cursor-pointer transition-all text-center ${
                      data.digitalPresence.socialMedia.includes(platform.key)
                        ? 'border-2 border-[#00FF88] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => toggleSocialMedia(platform.key)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-['Montserrat']">{platform.label}</span>
                      {data.digitalPresence.socialMedia.includes(platform.key) && (
                        <CheckCircle className="w-4 h-4 text-[#00FF88]" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white font-['Montserrat']">Nombre d'avis Google (approximatif)</Label>
                <Input
                  value={data.digitalPresence.googleReviews}
                  onChange={(e) => updateDigitalPresence('googleReviews', e.target.value)}
                  placeholder="Ex: 25"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white font-['Montserrat']">Note moyenne</Label>
                <Input
                  value={data.digitalPresence.averageRating}
                  onChange={(e) => updateDigitalPresence('averageRating', e.target.value)}
                  placeholder="Ex: 4.5 / 5"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>
          </div>
        );

      case 'availability':
        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              Quand souhaitez-vous qu'on vous contacte pour votre diagnostic ILA™ ?
            </p>

            <div className="space-y-4">
              <Label className="text-white font-['Montserrat']">Jour de préférence</Label>
              <div className="grid grid-cols-3 gap-3">
                {['Lundi-Mercredi', 'Jeudi-Vendredi', 'Samedi'].map((day) => (
                  <Card
                    key={day}
                    className={`p-4 cursor-pointer transition-all text-center ${
                      data.availability.preferredDay === day
                        ? 'border-2 border-[#FFD56B] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => updateAvailability('preferredDay', day)}
                  >
                    <span className="text-white font-['Montserrat']">{day}</span>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-white font-['Montserrat']">Heure préférée</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'matin', label: 'Matin\n(8h-11h)' },
                  { key: 'midi', label: 'Midi\n(11h-13h)' },
                  { key: 'apres-midi', label: 'Après-midi\n(13h-17h)' }
                ].map((time) => (
                  <Card
                    key={time.key}
                    className={`p-4 cursor-pointer transition-all text-center ${
                      data.availability.preferredTime === time.key
                        ? 'border-2 border-[#FFD56B] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => updateAvailability('preferredTime', time.key)}
                  >
                    <span className="text-white font-['Montserrat'] text-sm whitespace-pre-line">
                      {time.label}
                    </span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'challenge':
        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              En une phrase, quel est votre plus grand défi actuel en visibilité ?
            </p>
            <Textarea
              value={data.challenge}
              onChange={(e) => setData(prev => ({ ...prev, challenge: e.target.value }))}
              placeholder="Ex: Mes clients ne me trouvent pas sur Google..."
              className="bg-black/20 border-white/20 text-white placeholder-white/50 min-h-[120px]"
            />
            <p className="text-white/60 text-sm font-['Montserrat'] text-center">
              Cette information nous aide à personnaliser vos recommandations
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <StepIcon className="w-8 h-8 text-[#8E44FF]" />
          <span className="text-[#FFD56B] font-bold text-xl font-['Montserrat']">
            Étape {currentStep + 1} / {totalSteps}
          </span>
        </div>
        
        <h2 className="text-3xl font-bold text-white font-['Montserrat']">
          {step.title}
        </h2>
        <p className="text-white/70 font-['Montserrat']">
          {step.subtitle}
        </p>
        
        <div className="max-w-md mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* LILO Character */}
      <div className="flex justify-center">
        <LiloCharacter 
          mood={currentStep < 2 ? "curious" : currentStep < 4 ? "thinking" : "excited"} 
          scale={1.1} 
        />
      </div>

      {/* Form Content */}
      <Card className="glass-effect border-[#8E44FF]/20 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={currentStep === 0 ? onBack : handlePrevious}
          className="border-white/20 text-white hover:bg-white/10 font-['Montserrat']"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 0 ? 'Retour' : 'Précédent'}
        </Button>

        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-['Montserrat'] hover:scale-105 transition-all duration-300"
        >
          {currentStep === totalSteps - 1 ? (
            <>
              <Target className="w-4 h-4 mr-2" />
              Obtenir mon score ILA™
            </>
          ) : (
            <>
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ILAFormulaire;