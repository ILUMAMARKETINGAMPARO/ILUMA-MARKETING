import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  CheckCircle,
  Heart,
  Users,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Sparkles,
  Target,
  Network,
  Brain,
  Shield,
  Globe,
  Calendar
} from 'lucide-react';
import LiloCharacter from '@/components/lilo/LiloCharacter';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';

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

interface ILUMATCHConfirmationProps {
  data: QuestionnaireData;
  onStartOver: () => void;
}

const ILUMATCHConfirmation: React.FC<ILUMATCHConfirmationProps> = ({ data, onStartOver }) => {
  const { language } = useLanguage();
  const [currentDate] = useState(new Date());

  const confirmationContent = {
    fr: {
      title: "Merci d'avoir illuminé votre potentiel local.",
      subtitle: "Votre parcours ILUMATCH™ est terminé.",
      tagline: "Place maintenant à la magie des connexions humaines.",
      liloMessage: "Je te remercie d'avoir répondu avec sincérité et vision. Toutes tes réponses ont été envoyées à l'équipe ILUMA™.",
      contactMessage: "Un membre de notre équipe te contactera personnellement dans les prochains jours pour :",
      contactPoints: [
        "Te présenter les partenaires compatibles",
        "Évaluer ensemble le meilleur moment pour activer une collaboration", 
        "Et t'expliquer comment ça fonctionne concrètement"
      ],
      technicalInfo: {
        received: "Données reçues le",
        processing: "Traitement automatique dans le CRM Iluma",
        assigned: "Contact attribué à",
        delay: "Délai de rappel prévu : sous 72 heures ouvrables"
      }
    },
    en: {
      title: "Thank you for lighting up your local potential.",
      subtitle: "Your ILUMATCH™ journey is complete.",
      tagline: "Now it's time for the magic of human connections.",
      liloMessage: "Thank you for answering with sincerity and vision. All your responses have been sent to the ILUMA™ team.",
      contactMessage: "A member of our team will contact you personally in the coming days to:",
      contactPoints: [
        "Present compatible partners",
        "Evaluate together the best time to activate a collaboration",
        "And explain how it works in practice"
      ],
      technicalInfo: {
        received: "Data received on",
        processing: "Automatic processing in Iluma CRM",
        assigned: "Contact assigned to",
        delay: "Expected callback time: within 72 business hours"
      }
    },
    es: {
      title: "Gracias por iluminar tu potencial local.",
      subtitle: "Tu viaje ILUMATCH™ está completo.",
      tagline: "Ahora es tiempo para la magia de las conexiones humanas.",
      liloMessage: "Gracias por responder con sinceridad y visión. Todas tus respuestas han sido enviadas al equipo ILUMA™.",
      contactMessage: "Un miembro de nuestro equipo te contactará personalmente en los próximos días para:",
      contactPoints: [
        "Presentarte socios compatibles",
        "Evaluar juntos el mejor momento para activar una colaboración",
        "Y explicarte cómo funciona en la práctica"
      ],
      technicalInfo: {
        received: "Datos recibidos el",
        processing: "Procesamiento automático en CRM Iluma",
        assigned: "Contacto asignado a",
        delay: "Tiempo de respuesta esperado: dentro de 72 horas hábiles"
      }
    }
  };

  const content = confirmationContent[language as keyof typeof confirmationContent] || confirmationContent.fr;

  const faqData = [
    {
      question: "Qu'est-ce que ILUMATCH™ exactement?",
      answer: "ILUMATCH™ est un outil développé par ILUMA™ pour connecter les entreprises locales entre elles, de façon stratégique, équitable et mesurée."
    },
    {
      question: "Est-ce que je dois payer quelque chose?",
      answer: "Non. Le processus de match est gratuit. Si un partenariat vous intéresse, on vous propose alors des options d'activation concrètes (co-marketing, visibilités croisées, landing page conjointe, etc.)."
    },
    {
      question: "Comment vous choisissez les partenaires proposés?",
      answer: "Grâce au Score ILA™ (Indice Local d'Activation), à vos réponses, et à notre IA. On s'assure que les partenaires soient : Complémentaires (et non concurrents), De même calibre en visibilité (trafic, SEO, réseaux), Ouverts à la même énergie de collaboration."
    },
    {
      question: "Puis-je refuser un match proposé?",
      answer: "Oui bien sûr. Vous restez maître de vos choix. Vous pouvez aussi en demander d'autres."
    },
    {
      question: "Et si j'ai déjà un partenaire en tête?",
      answer: "Parfait! Vous pouvez aussi nous soumettre le nom d'une entreprise et nous vérifierons le niveau de compatibilité stratégique via notre IA."
    },
    {
      question: "Est-ce que ça fonctionne aussi pour les entreprises en ligne?",
      answer: "Oui! ILUMATCH™ s'adapte aux réalités locales et numériques. Même une boutique 100% e-commerce peut recevoir des propositions de partenariat."
    },
    {
      question: "Qui est LILO™?",
      answer: "C'est notre intelligence émotionnelle embarquée 🧠💜. Elle vous guide, vous observe, apprend et adapte l'expérience à vos besoins."
    },
    {
      question: "Quelle est la différence entre un match parfait et compensatoire?",
      answer: "Un match parfait unit deux entreprises avec des scores ILA™ similaires (écart ≤ 10 points) dans un rayon proche. Un match compensatoire peut avoir un écart plus grand mais offre des synergies intéressantes."
    },
    {
      question: "Combien de temps prend l'analyse?",
      answer: "L'analyse automatique est instantanée. La présentation personnalisée par notre équipe se fait sous 72h ouvrables maximum."
    },
    {
      question: "Puis-je modifier mes réponses après soumission?",
      answer: "Oui, lors de l'appel avec notre conseiller, vous pourrez affiner vos préférences et critères de matching."
    }
  ];

  const lexique = [
    { terme: "ILUMATCH™", definition: "Outil de matching local entre entreprises" },
    { terme: "Score ILA™", definition: "Indice Local d'Activation (0 à 100) basé sur SEO, avis, réseaux" },
    { terme: "QRVisibilité™", definition: "Carte interactive pour explorer les entreprises compatibles" },
    { terme: "LILO™", definition: "IA émotionnelle intégrée à chaque page du site" },
    { terme: "CRM Iluma™", definition: "Système de gestion centralisé qui traite vos réponses" },
    { terme: "Match stratégique", definition: "Partenariat entre entreprises compatibles et complémentaires" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Confirmation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <CheckCircle className="w-12 h-12 text-[#00FF88]" />
          <Sparkles className="w-8 h-8 text-[#FFD56B] animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent mb-4 font-['Montserrat'] leading-tight">
          ILUMATCH™ : Votre Profile Partenariat Montréal Créé avec Succès
        </h1>
        
        <p className="text-xl text-[#FFD56B] font-semibold mb-2 font-['Montserrat']">
          {content.subtitle}
        </p>
        
        <p className="text-lg text-white/80 font-['Montserrat']">
          {content.tagline}
        </p>
      </motion.div>

      {/* LILO Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <LiloCharacter mood="excited" scale={1.2} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white mb-2 font-['Montserrat'] flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-400" />
                Bonjour, c'est moi LILO™ 🌟
              </h2>
              <p className="text-white/90 font-['Montserrat'] text-lg leading-relaxed mb-4">
                {content.liloMessage}
              </p>
              
              <div className="space-y-3">
                <p className="text-[#FFD56B] font-medium font-['Montserrat']">
                  {content.contactMessage}
                </p>
                <ul className="space-y-2">
                  {content.contactPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/80 font-['Montserrat']">
                      <CheckCircle className="w-4 h-4 text-[#00FF88] mt-1 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Technical Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="glass-effect border-[#00FF88]/20 p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-[#00FF88] mx-auto mb-2" />
              <p className="text-white/60 text-sm font-['Montserrat']">{content.technicalInfo.received}</p>
              <p className="text-white font-medium font-['Montserrat']">
                {currentDate.toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="text-center">
              <Brain className="w-8 h-8 text-[#8E44FF] mx-auto mb-2" />
              <p className="text-white/60 text-sm font-['Montserrat']">{content.technicalInfo.processing}</p>
              <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                Actif
              </Badge>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-[#FFD56B] mx-auto mb-2" />
              <p className="text-white/60 text-sm font-['Montserrat']">{content.technicalInfo.assigned}</p>
              <p className="text-white font-medium font-['Montserrat']">Équipe ILUMA™</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-[#FF8C42] mx-auto mb-2" />
              <p className="text-white/60 text-sm font-['Montserrat'] leading-tight">
                {content.technicalInfo.delay}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Summary of Responses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="glass-effect border-[#FFD56B]/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-['Montserrat'] flex items-center gap-2">
            <Star className="w-6 h-6 text-[#FFD56B]" />
            Récapitulatif de votre profil
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 font-['Montserrat']">
                  Entreprise
                </h3>
                <div className="space-y-1 text-white/80 font-['Montserrat']">
                  <p><strong>{data.businessInfo.name}</strong></p>
                  <p>{data.businessInfo.sector}</p>
                  <p>{data.businessInfo.location}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 font-['Montserrat']">
                  Profil énergétique
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.energyProfile.map((energy) => (
                    <Badge key={energy} className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                      {energy}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 font-['Montserrat']">
                  Synergies recherchées
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.synergies.map((synergy) => (
                    <Badge key={synergy} className="bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/30">
                      {synergy}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 font-['Montserrat']">
                  Valeurs importantes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.values.map((value) => (
                    <Badge key={value} className="bg-[#FFD56B]/20 text-[#FFD56B] border-[#FFD56B]/30">
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 font-['Montserrat']">
                  Clientèle cible
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.clientele.map((client) => (
                    <Badge key={client} className="bg-[#FF8C42]/20 text-[#FF8C42] border-[#FF8C42]/30">
                      {client}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 font-['Montserrat']">
                  Niveau d'activation
                </h3>
                <Badge className="bg-[#00BFFF]/20 text-[#00BFFF] border-[#00BFFF]/30">
                  {data.activationLevel}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
          <h2 className="text-3xl font-bold text-white mb-8 font-['Montserrat'] text-center">
            FAQ Ultra-Complète ILUMATCH™
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/20">
                <AccordionTrigger className="text-white font-['Montserrat'] text-left hover:text-[#8E44FF] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/80 font-['Montserrat'] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </motion.div>

      {/* Lexique */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <Card className="glass-effect border-[#FFD56B]/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-['Montserrat'] text-center">
            📖 Lexique Rapide
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lexique.map((item, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg">
                <h3 className="text-[#FFD56B] font-bold font-['Montserrat'] mb-2">
                  {item.terme}
                </h3>
                <p className="text-white/80 text-sm font-['Montserrat']">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* CTA Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-center space-y-6"
      >
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-['Montserrat']">
            🧠 Tu veux voir comment ton score ILA™ se compare aux autres?
          </h2>
          
          <div className="flex flex-col items-center gap-6">
            <Link to="/contact" className="w-full max-w-md">
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2" />
                Parler à un Conseiller ILUMATCH™
              </Button>
            </Link>
            
            <details className="w-full max-w-md">
              <summary className="cursor-pointer text-white/80 hover:text-white font-['Montserrat'] text-center py-2">
                Autres options ↓
              </summary>
              <div className="mt-4 space-y-3">
                <Link to="/adluma" className="block">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full border-white/20 text-white hover:bg-white/10 px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Voir mon Score ILA™
                  </Button>
                </Link>
                
                <Link to="/" className="block">
                  <Button 
                    variant="ghost"
                    size="lg"
                    className="w-full text-white/60 hover:text-white px-8 py-4 font-['Montserrat']"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </details>
          </div>
        </Card>

        <Button 
          onClick={onStartOver}
          variant="ghost"
          className="text-white/60 hover:text-white font-['Montserrat']"
        >
          Recommencer le questionnaire
        </Button>
      </motion.div>
    </div>
  );
};

export default ILUMATCHConfirmation;