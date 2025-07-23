import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  CheckCircle,
  Clock,
  Brain,
  Users,
  Calendar,
  Target,
  Network,
  Map,
  Star,
  Sparkles,
  ArrowRight,
  BarChart3,
  Globe,
  Phone,
  Mail
} from 'lucide-react';
import LiloCharacter from '@/components/lilo/LiloCharacter';
import { useLanguage } from '@/hooks/useLanguage.ts';
import { Link } from 'react-router-dom';

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

interface ILAConfirmationProps {
  data: FormData;
  onStartOver: () => void;
}

const ILAConfirmation: React.FC<ILAConfirmationProps> = ({ data, onStartOver }) => {
  const { language } = useLanguage();
  const [currentDate] = useState(new Date());

  const confirmationContent = {
    fr: {
      title: "Merci ! On s'occupe de tout.",
      subtitle: "Votre analyse ILA™ est en cours.",
      tagline: "Notre IA calcule votre score à partir de plus de 37 indicateurs locaux.",
      liloMessage: "J'ai bien reçu toutes tes informations. L'équipe Iluma est déjà en train de calculer ton score ILA™.",
      analysisSteps: [
        "Analyser ta présence locale sur le web",
        "Comparer ton entreprise à d'autres acteurs de ton secteur", 
        "Préparer un plan stratégique basé sur ton score ILA™"
      ],
      contactMessage: "Tu seras contacté dans les 24 à 72h ouvrables pour recevoir ton score + recommandations personnalisées."
    },
    en: {
      title: "Thank you! We'll take care of everything.",
      subtitle: "Your ILA™ analysis is in progress.",
      tagline: "Our AI is calculating your score from over 37 local indicators.",
      liloMessage: "I've received all your information. The Iluma team is already calculating your ILA™ score.",
      analysisSteps: [
        "Analyze your local web presence",
        "Compare your business to other players in your sector",
        "Prepare a strategic plan based on your ILA™ score"
      ],
      contactMessage: "You will be contacted within 24 to 72 business hours to receive your score + personalized recommendations."
    },
    es: {
      title: "¡Gracias! Nos encargamos de todo.",
      subtitle: "Tu análisis ILA™ está en progreso.",
      tagline: "Nuestra IA está calculando tu puntuación a partir de más de 37 indicadores locales.",
      liloMessage: "He recibido toda tu información. El equipo Iluma ya está calculando tu puntuación ILA™.",
      analysisSteps: [
        "Analizar tu presencia web local",
        "Comparar tu negocio con otros actores de tu sector",
        "Preparar un plan estratégico basado en tu puntuación ILA™"
      ],
      contactMessage: "Serás contactado dentro de 24 a 72 horas hábiles para recibir tu puntuación + recomendaciones personalizadas."
    }
  };

  const content = confirmationContent[language as keyof typeof confirmationContent] || confirmationContent.fr;

  const faqData = [
    {
      question: "Ce score est-il fiable ?",
      answer: "Oui. Il est basé sur des données vérifiables (avis, positions, accessibilité) et sur plus de 200 entreprises analysées."
    },
    {
      question: "Est-ce réservé aux clients Iluma ?",
      answer: "Non. Toute entreprise locale peut utiliser l'ILA™ gratuitement."
    },
    {
      question: "Vais-je recevoir un rapport détaillé ?",
      answer: "Oui. Chaque score génère un rapport clair + plan IA d'amélioration."
    },
    {
      question: "Comment vous choisissez les recommandations ?",
      answer: "Grâce au Score ILA™, à vos réponses, et à notre IA. On s'assure que les actions proposées soient prioritaires et réalisables."
    },
    {
      question: "Puis-je refuser les recommandations ?",
      answer: "Oui bien sûr. Vous restez maître de vos choix. Le diagnostic est informatif, les actions restent optionnelles."
    },
    {
      question: "Et si mon score est très bas ?",
      answer: "C'est une excellente nouvelle ! Cela signifie qu'il y a énormément de potentiel d'amélioration rapide avec les bonnes actions."
    },
    {
      question: "Que se passe-t-il après avoir reçu mon score ?",
      answer: "Vous pourrez utiliser ILUMATCH™ pour trouver des partenaires, ou QRVisibilité™ pour analyser vos concurrents."
    },
    {
      question: "Mon score peut-il changer ?",
      answer: "Oui ! Votre score ILA™ évolue avec vos actions. C'est un baromètre vivant de votre croissance locale."
    },
    {
      question: "Combien coûte le suivi ?",
      answer: "Le score initial est gratuit. Les services d'accompagnement sont proposés selon vos besoins et votre score."
    }
  ];

  const lexique = [
    { terme: "Score ILA™", definition: "Indice Local d'Activation (0 à 100) basé sur 4 dimensions pondérées" },
    { terme: "Diagnostic local", definition: "Analyse complète de votre visibilité dans votre zone géographique" },
    { terme: "ILUMATCH™", definition: "Outil de matching pour trouver des partenaires stratégiques compatibles" },
    { terme: "QRVisibilité™", definition: "Carte interactive pour analyser la concurrence locale" },
    { terme: "LILO™", definition: "Intelligence artificielle émotionnelle intégrée à tous nos outils" },
    { terme: "Plan IA", definition: "Recommandations personnalisées générées par notre système intelligent" }
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
          {content.title}
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
                <Brain className="w-5 h-5 text-[#8E44FF]" />
                Bonjour, c'est moi LILO™ 🌟
              </h2>
              <p className="text-white/90 font-['Montserrat'] text-lg leading-relaxed mb-4">
                {content.liloMessage}
              </p>
              
              <div className="space-y-3">
                <p className="text-[#FFD56B] font-medium font-['Montserrat']">
                  Nous allons maintenant prendre le temps de :
                </p>
                <ul className="space-y-2">
                  {content.analysisSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/80 font-['Montserrat']">
                      <BarChart3 className="w-4 h-4 text-[#00FF88] mt-1 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
                <p className="text-white/90 font-['Montserrat'] mt-4">
                  {content.contactMessage}
                </p>
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
              <p className="text-white/60 text-sm font-['Montserrat']">Données reçues le</p>
              <p className="text-white font-medium font-['Montserrat']">
                {currentDate.toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="text-center">
              <Brain className="w-8 h-8 text-[#8E44FF] mx-auto mb-2" />
              <p className="text-white/60 text-sm font-['Montserrat']">Traitement automatique</p>
              <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                En cours
              </Badge>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-[#FFD56B] mx-auto mb-2" />
              <p className="text-white/60 text-sm font-['Montserrat']">Contact attribué à</p>
              <p className="text-white font-medium font-['Montserrat']">Équipe ILUMA™</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-[#FF8C42] mx-auto mb-2" />
              <p className="text-white/60 text-sm font-['Montserrat'] leading-tight">
                Délai de rappel : 24-72h
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="glass-effect border-[#FFD56B]/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 font-['Montserrat'] text-center">
            🚀 Et après ?
          </h2>
          <p className="text-white/80 text-center mb-8 font-['Montserrat']">
            Ton score ILA™ te donne accès à deux outils puissants pour aller encore plus loin :
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 rounded-xl bg-black/20">
              <Network className="w-12 h-12 text-[#8E44FF] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3 font-['Montserrat']">
                1. ILUMATCH™ — Trouve ton partenaire idéal
              </h3>
              <p className="text-white/70 font-['Montserrat'] mb-4">
                Tu veux collaborer avec une entreprise complémentaire à la tienne ? ILUMATCH™ te propose des partenaires locaux qui partagent ton public cible, mais ne te concurrencent pas.
              </p>
              <Link to="/ilumatch">
                <Button className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black font-['Montserrat']">
                  Je découvre ILUMATCH™
                </Button>
              </Link>
            </div>

            <div className="text-center p-6 rounded-xl bg-black/20">
              <Map className="w-12 h-12 text-[#00FF88] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3 font-['Montserrat']">
                2. QRVisibilité™ — Compare-toi aux autres
              </h3>
              <p className="text-white/70 font-['Montserrat'] mb-4">
                Grâce à notre carte interactive, vois le nombre de concurrents dans ton secteur, leur niveau de visibilité, et comment tu te situes par rapport à eux.
              </p>
              <Link to="/rival-views">
                <Button className="bg-gradient-to-r from-[#00FF88] to-[#00BFFF] hover:from-[#00BFFF] hover:to-[#00FF88] text-black font-['Montserrat']">
                  J'explore RivalViews™
                </Button>
              </Link>
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
            FAQ Complète ILA™
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
            🧠 En attendant ton score, explore nos autres outils
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/adluma">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-black px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
              >
                <Target className="w-5 h-5 mr-2" />
                Simulateur ADLUMA™
              </Button>
            </Link>
            
            <Link to="/">
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
              >
                <Globe className="w-5 h-5 mr-2" />
                Retour à l'accueil Iluma
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button 
                variant="outline"
                size="lg"
                className="border-[#FFD56B]/40 text-[#FFD56B] hover:bg-[#FFD56B]/10 px-8 py-4 font-['Montserrat'] hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact immédiat
              </Button>
            </Link>
          </div>
        </Card>

        <Button 
          onClick={onStartOver}
          variant="ghost"
          className="text-white/60 hover:text-white font-['Montserrat']"
        >
          Recommencer l'évaluation
        </Button>
      </motion.div>
    </div>
  );
};

export default ILAConfirmation;