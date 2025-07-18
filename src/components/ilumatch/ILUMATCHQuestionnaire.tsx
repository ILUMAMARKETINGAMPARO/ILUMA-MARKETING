import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Heart,
  Zap,
  Target,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Globe
} from 'lucide-react';
import LiloCharacter from '@/components/lilo/LiloCharacter';

interface QuestionnaireData {
  businessInfo: {
    name: string;
    sector: string;
    location: string;
    website: string;
  };
  energyProfile: string[];
  synergies: string[];
  clientele: string[];
  values: string[];
  activationLevel: string;
  idealPeriod: string;
  partnerPersonality: string;
}

interface ILUMATCHQuestionnaireProps {
  onNext: (data: QuestionnaireData) => void;
  onBack: () => void;
}

const ILUMATCHQuestionnaire: React.FC<ILUMATCHQuestionnaireProps> = ({ onNext, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<QuestionnaireData>({
    businessInfo: { name: '', sector: '', location: '', website: '' },
    energyProfile: [],
    synergies: [],
    clientele: [],
    values: [],
    activationLevel: '',
    idealPeriod: '',
    partnerPersonality: ''
  });

  const totalSteps = 9;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const steps = [
    {
      id: 'info',
      title: 'Parlez-nous de votre entreprise',
      subtitle: 'Les bases pour mieux vous connaître',
      icon: Users
    },
    {
      id: 'energy',
      title: 'Quelle est votre énergie ?',
      subtitle: 'Votre personnalité de marque',
      icon: Sparkles
    },
    {
      id: 'synergies',
      title: 'Quel type de synergie recherchez-vous ?',
      subtitle: 'Vos objectifs de collaboration',
      icon: Target
    },
    {
      id: 'zone',
      title: 'Dans quelle zone voulez-vous rayonner ?',
      subtitle: 'Votre territoire de visibilité',
      icon: MapPin
    },
    {
      id: 'values',
      title: 'Vos valeurs importantes',
      subtitle: 'Ce qui vous unit profondément',
      icon: Heart
    },
    {
      id: 'clientele',
      title: 'Qui sont vos clients ?',
      subtitle: 'Pour éviter la cannibalisation',
      icon: Users
    },
    {
      id: 'activation',
      title: 'À quelle fréquence collaborer ?',
      subtitle: 'Votre niveau d\'engagement',
      icon: Zap
    },
    {
      id: 'calendar',
      title: 'Quand préférez-vous être contacté ?',
      subtitle: 'Votre disponibilité pour discuter',
      icon: Calendar
    },
    {
      id: 'personality',
      title: 'Votre partenaire idéal',
      subtitle: 'Le profil qui vous inspire',
      icon: CheckCircle
    }
  ];

  const isStepValid = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case 'info':
        return data.businessInfo.name && data.businessInfo.sector && data.businessInfo.location;
      case 'energy':
        return data.energyProfile.length > 0;
      case 'synergies':
        return data.synergies.length > 0;
      case 'zone':
        return data.businessInfo.location;
      case 'values':
        return data.values.length > 0;
      case 'clientele':
        return data.clientele.length > 0;
      case 'activation':
        return data.activationLevel;
      case 'calendar':
        return data.idealPeriod;
      case 'personality':
        return data.partnerPersonality;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    
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

  const updateData = (key: keyof QuestionnaireData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key: keyof QuestionnaireData, value: string) => {
    setData(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter(item => item !== value)
        : [...(prev[key] as string[]), value]
    }));
  };

  const renderStep = () => {
    const step = steps[currentStep];
    const StepIcon = step.icon;

    switch (step.id) {
      case 'info':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white font-['Montserrat']">Nom de votre entreprise *</Label>
                <Input
                  value={data.businessInfo.name}
                  onChange={(e) => updateData('businessInfo', { ...data.businessInfo, name: e.target.value })}
                  placeholder="Ex: Restaurant Le Gourmet"
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white font-['Montserrat']">Secteur d'activité *</Label>
                <Input
                  value={data.businessInfo.sector}
                  onChange={(e) => updateData('businessInfo', { ...data.businessInfo, sector: e.target.value })}
                  placeholder="Ex: Restauration, Services, Commerce..."
                  className="bg-black/20 border-white/20 text-white placeholder-white/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white font-['Montserrat']">Localisation *</Label>
              <Input
                value={data.businessInfo.location}
                onChange={(e) => updateData('businessInfo', { ...data.businessInfo, location: e.target.value })}
                placeholder="Ex: Montréal, Quartier Plateau, En ligne..."
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-['Montserrat']">Site web (optionnel)</Label>
              <Input
                value={data.businessInfo.website}
                onChange={(e) => updateData('businessInfo', { ...data.businessInfo, website: e.target.value })}
                placeholder="https://monsite.com"
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
              />
            </div>
          </div>
        );

      case 'energy':
        const energyOptions = [
          { value: 'chaleureux', label: '🤗 Chaleureux & humain', color: '#FF6B6B' },
          { value: 'dynamique', label: '⚡ Énergique & dynamique', color: '#FFD56B' },
          { value: 'luxe', label: '💎 Luxe & confidentiel', color: '#8E44FF' },
          { value: 'minimal', label: '✨ Minimaliste & clair', color: '#00BFFF' },
          { value: 'coloré', label: '🌈 Coloré & joyeux', color: '#00FF88' },
          { value: 'spirituel', label: '🧘 Spirituel & connecté', color: '#FF8C42' }
        ];

        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              Mon entreprise est plutôt... (plusieurs choix possibles)
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {energyOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      data.energyProfile.includes(option.value)
                        ? 'border-2 glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    style={{
                      borderColor: data.energyProfile.includes(option.value) ? option.color : undefined
                    }}
                    onClick={() => toggleArrayValue('energyProfile', option.value)}
                  >
                    <div className="text-center">
                      <div className="text-lg font-medium text-white font-['Montserrat']">
                        {option.label}
                      </div>
                      {data.energyProfile.includes(option.value) && (
                        <CheckCircle className="w-5 h-5 mx-auto mt-2" style={{ color: option.color }} />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'synergies':
        const synergyOptions = [
          'Gagner en visibilité croisée',
          'Partager des clients',
          'Co-créer un événement',
          'Faire du contenu ensemble',
          'Offrir un avantage conjoint',
          'Référencement mutuel'
        ];

        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              Ce que je cherche avant tout :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {synergyOptions.map((option) => (
                <motion.div
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      data.synergies.includes(option)
                        ? 'border-2 border-[#8E44FF] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => toggleArrayValue('synergies', option)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-['Montserrat']">{option}</span>
                      {data.synergies.includes(option) && (
                        <CheckCircle className="w-5 h-5 text-[#8E44FF]" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'zone':
        const zoneOptions = [
          { value: 'plateau-mont-royal', label: 'Plateau-Mont-Royal', desc: 'Quartier créatif et culturel' },
          { value: 'mile-end', label: 'Mile-End', desc: 'Hub technologique et artistique' },
          { value: 'vieux-montreal', label: 'Vieux-Montréal', desc: 'Secteur touristique et affaires' },
          { value: 'centre-ville', label: 'Centre-ville', desc: 'District financier et commercial' },
          { value: 'rosemont', label: 'Rosemont–La Petite-Patrie', desc: 'Quartier familial et local' },
          { value: 'villeray', label: 'Villeray–Saint-Michel', desc: 'Communauté diverse et dynamique' },
          { value: 'laval', label: 'Laval', desc: 'Banlieue nord de Montréal' },
          { value: 'longueuil', label: 'Longueuil', desc: 'Rive-Sud de Montréal' },
          { value: 'quebec-online', label: 'Partout au Québec (en ligne)', desc: 'Commerce électronique ou services numériques' }
        ];

        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              Dans quelle zone géographique souhaitez-vous développer vos partenariats ?
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {zoneOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      data.businessInfo.location === option.value
                        ? 'border-2 border-[#00FF88] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => updateData('businessInfo', { ...data.businessInfo, location: option.value })}
                  >
                    <div className="text-center">
                      <MapPin className="w-6 h-6 text-[#00FF88] mx-auto mb-2" />
                      <h3 className="text-white font-['Montserrat'] font-medium mb-1">{option.label}</h3>
                      <p className="text-white/60 text-sm font-['Montserrat']">{option.desc}</p>
                      {data.businessInfo.location === option.value && (
                        <CheckCircle className="w-5 h-5 text-[#00FF88] mx-auto mt-2" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'values':
        const valueOptions = [
          { value: 'authenticité', emoji: '✨' },
          { value: 'écologie', emoji: '🌱' },
          { value: 'inclusion', emoji: '🤝' },
          { value: 'innovation', emoji: '🚀' },
          { value: 'local', emoji: '🏠' },
          { value: 'famille', emoji: '👨‍👩‍👧‍👦' },
          { value: 'éducation', emoji: '📚' },
          { value: 'qualité', emoji: '⭐' }
        ];

        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              Les valeurs les plus importantes pour moi :
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {valueOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all text-center ${
                      data.values.includes(option.value)
                        ? 'border-2 border-[#FFD56B] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => toggleArrayValue('values', option.value)}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="text-white font-['Montserrat'] capitalize">{option.value}</div>
                    {data.values.includes(option.value) && (
                      <CheckCircle className="w-4 h-4 mx-auto mt-2 text-[#FFD56B]" />
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'clientele':
        const clienteleOptions = [
          'Jeunes familles',
          'Entrepreneurs',
          'Personnes âgées',
          'Étudiants',
          'Amateurs de design',
          'Amoureux des animaux',
          'Foodies',
          'Sportifs'
        ];

        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              Mes clients sont surtout :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {clienteleOptions.map((option) => (
                <motion.div
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      data.clientele.includes(option)
                        ? 'border-2 border-[#00FF88] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => toggleArrayValue('clientele', option)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-['Montserrat']">{option}</span>
                      {data.clientele.includes(option) && (
                        <CheckCircle className="w-5 h-5 text-[#00FF88]" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'activation':
        const activationOptions = [
          { value: 'annuel', label: 'Une fois par année', desc: 'Collaboration ponctuelle' },
          { value: 'trimestriel', label: 'Une promo par trimestre', desc: 'Activations régulières' },
          { value: 'majeur', label: '1 à 2 campagnes majeures par an', desc: 'Projets ambitieux' },
          { value: 'continu', label: 'Collaboration continue', desc: 'Partenariat stratégique' }
        ];

        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              À quelle fréquence seriez-vous prêt à activer ce partenariat ?
            </p>
            <div className="space-y-4">
              {activationOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      data.activationLevel === option.value
                        ? 'border-2 border-[#FF8C42] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => updateData('activationLevel', option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-['Montserrat'] font-medium">{option.label}</div>
                        <div className="text-white/60 text-sm font-['Montserrat']">{option.desc}</div>
                      </div>
                      {data.activationLevel === option.value && (
                        <CheckCircle className="w-5 h-5 text-[#FF8C42]" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'calendar':
        const calendarOptions = [
          { value: 'matin', label: 'Matin (8h-11h)', desc: 'Je préfère recevoir l\'appel le matin' },
          { value: 'midi', label: 'Midi (11h-14h)', desc: 'Pause déjeuner idéale pour discuter' },
          { value: 'apres-midi', label: 'Après-midi (14h-17h)', desc: 'Fin d\'après-midi me convient' },
          { value: 'soir', label: 'Début de soirée (17h-19h)', desc: 'Après les heures d\'ouverture' }
        ];

        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              À quel moment préférez-vous qu'on vous contacte pour discuter ?
            </p>
            <div className="space-y-4">
              {calendarOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      data.idealPeriod === option.value
                        ? 'border-2 border-[#00BFFF] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => updateData('idealPeriod', option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-['Montserrat'] font-medium">{option.label}</div>
                        <div className="text-white/60 text-sm font-['Montserrat']">{option.desc}</div>
                      </div>
                      {data.idealPeriod === option.value && (
                        <CheckCircle className="w-5 h-5 text-[#00BFFF]" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'personality':
        const personalityOptions = [
          { value: 'créatif', label: 'Un créatif qui booste ta notoriété', emoji: '🎨' },
          { value: 'rigoureux', label: 'Un entrepreneur rigoureux qui attire ta clientèle cible', emoji: '📊' },
          { value: 'confiance', label: 'Une marque de confiance qui renforce ta crédibilité', emoji: '🏆' },
          { value: 'nouveau', label: 'Une marque nouvelle qui attire les curieux', emoji: '✨' },
          { value: 'complémentaire', label: 'Une structure complémentaire à ton produit', emoji: '🔗' }
        ];

        return (
          <div className="space-y-6">
            <p className="text-white/80 font-['Montserrat'] text-center">
              Ton partenaire idéal est plutôt...
            </p>
            <div className="space-y-4">
              {personalityOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      data.partnerPersonality === option.value
                        ? 'border-2 border-[#8E44FF] glass-effect-strong'
                        : 'glass-effect border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => updateData('partnerPersonality', option.value)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{option.emoji}</div>
                      <div className="flex-1">
                        <div className="text-white font-['Montserrat']">{option.label}</div>
                      </div>
                      {data.partnerPersonality === option.value && (
                        <CheckCircle className="w-5 h-5 text-[#8E44FF]" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
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

      {/* LILO Character with dynamic mood */}
      <div className="flex justify-center">
        <LiloCharacter 
          mood={currentStep < 3 ? "curious" : currentStep < 6 ? "thinking" : "excited"} 
          scale={1.1} 
        />
      </div>

      {/* Question Content */}
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
          disabled={!isStepValid()}
          className={`bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-['Montserrat'] hover:scale-105 transition-all duration-300 ${
            !isStepValid() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {currentStep === totalSteps - 1 ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Analyser mes affinités
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

export default ILUMATCHQuestionnaire;