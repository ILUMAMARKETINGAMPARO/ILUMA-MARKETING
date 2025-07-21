import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Handshake, 
  TrendingUp, 
  Radio, 
  Users, 
  BarChart3, 
  Calendar,
  MapPin,
  Star,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';

const PartnershipHub = () => {
  const { language } = useLanguage();
  const [selectedPartnership, setSelectedPartnership] = useState('lpb');

  const partnerships = {
    lpb: {
      name: 'La Poche Bleue',
      type: 'Média Sportif',
      logo: '🎙️',
      audience: '350K+',
      reach: '8M vues/mois',
      demographics: 'Hommes 25-54 ans, Québec',
      status: 'Active',
      description: {
        fr: 'Partenariat stratégique avec le média sportif #1 au Québec pour propulser les PME locales',
        en: 'Strategic partnership with Quebec\'s #1 sports media to boost local SMEs',
        es: 'Asociación estratégica con el medio deportivo #1 de Quebec para impulsar las PYME locales'
      },
      benefits: {
        fr: [
          'Visibilité croisée IA + média + terrain',
          'Tunnel de conversion + attraction + crédibilité',
          'Recommandations par Guillaume & Maxim',
          'Commission récurrente sur leads qualifiés'
        ],
        en: [
          'Cross visibility AI + media + field',
          'Conversion tunnel + attraction + credibility',
          'Recommendations by Guillaume & Maxim',
          'Recurring commission on qualified leads'
        ],
        es: [
          'Visibilidad cruzada IA + medios + campo',
          'Túnel conversión + atracción + credibilidad',
          'Recomendaciones de Guillaume & Maxim',
          'Comisión recurrente en leads calificados'
        ]
      },
      formats: {
        fr: [
          'Landing Page Intelligente + Distribution LPB',
          'Études de cas clients filmées',
          'Infolettre mensuelle commune',
          'Matching IA commanditaires/créateurs',
          'Capsules éducatives SEO/Ads'
        ],
        en: [
          'Smart Landing Page + LPB Distribution',
          'Filmed client case studies',
          'Joint monthly newsletter',
          'AI matching sponsors/creators',
          'Educational SEO/Ads capsules'
        ],
        es: [
          'Landing Page Inteligente + Distribución LPB',
          'Casos cliente filmados',
          'Newsletter mensual conjunto',
          'Matching IA patrocinadores/creadores',
          'Cápsulas educativas SEO/Ads'
        ]
      }
    }
  };

  const partnershipData = [
    {
      metric: 'Podcast LPB',
      value: '6.1M',
      unit: 'écoutes',
      source: 'Spotify / Apple',
      color: 'text-[#FFD56B]'
    },
    {
      metric: 'Vidéo / Réseaux',
      value: '8M',
      unit: 'vues/mois',
      source: 'Instagram, Facebook, TikTok',
      color: 'text-[#8E44FF]'
    },
    {
      metric: 'Rétention pub',
      value: '2.5x',
      unit: 'supérieure',
      source: 'Études podcast Canada',
      color: 'text-[#FFD56B]'
    },
    {
      metric: 'Conversion IA',
      value: '+214%',
      unit: 'en 90 jours',
      source: 'Études Iluma SEO',
      color: 'text-[#8E44FF]'
    }
  ];

  const currentPartnership = partnerships[selectedPartnership as keyof typeof partnerships];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Handshake className="w-8 h-8 text-[#8E44FF]" />
          <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">
            Partenariats Stratégiques
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Montserrat']">
          {language === 'fr' && 'IA × Média × Terrain'}
          {language === 'en' && 'AI × Media × Field'}
          {language === 'es' && 'IA × Medios × Campo'}
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-['Montserrat']">
          {language === 'fr' && 'Synergie unique entre intelligence artificielle, influence médiatique et action terrain pour maximiser votre visibilité et vos conversions'}
          {language === 'en' && 'Unique synergy between artificial intelligence, media influence and field action to maximize your visibility and conversions'}
          {language === 'es' && 'Sinergia única entre inteligencia artificial, influencia mediática y acción de campo para maximizar tu visibilidad y conversiones'}
        </p>
      </div>

      {/* Partnership Overview */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Partnership Card */}
        <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{currentPartnership.logo}</div>
              <div>
                <h3 className="text-xl font-bold text-white font-['Montserrat']">
                  {currentPartnership.name}
                </h3>
                <p className="text-white/60 font-['Montserrat']">
                  {currentPartnership.type}
                </p>
              </div>
            </div>
            <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
              {currentPartnership.status}
            </Badge>
          </div>

          <p className="text-white/80 mb-4 font-['Montserrat']">
            {currentPartnership.description[language]}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-black/20 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-[#FFD56B] font-['Montserrat']">
                {currentPartnership.audience}
              </div>
              <p className="text-white/60 text-sm font-['Montserrat']">Audience</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-[#8E44FF] font-['Montserrat']">
                {currentPartnership.reach}
              </div>
              <p className="text-white/60 text-sm font-['Montserrat']">Portée</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Users className="w-4 h-4" />
            {currentPartnership.demographics}
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white font-['Montserrat'] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#8E44FF]" />
            Données Clés du Partenariat
          </h3>
          {partnershipData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium font-['Montserrat']">
                      {data.metric}
                    </p>
                    <p className="text-white/50 text-xs font-['Montserrat']">
                      {data.source}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${data.color} font-['Montserrat']`}>
                      {data.value}
                    </div>
                    <p className="text-white/60 text-sm font-['Montserrat']">
                      {data.unit}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partnership Details */}
      <Card className="glass-effect border-white/20 p-6">
        <Tabs defaultValue="benefits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
            <TabsTrigger value="benefits" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
              <Star className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Bénéfices' : language === 'en' ? 'Benefits' : 'Beneficios'}
            </TabsTrigger>
            <TabsTrigger value="formats" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
              <Zap className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Formats' : language === 'en' ? 'Formats' : 'Formatos'}
            </TabsTrigger>
            <TabsTrigger value="implementation" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
              <Target className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Mise en œuvre' : language === 'en' ? 'Implementation' : 'Implementación'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="benefits" className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
              {language === 'fr' ? 'Avantages du Partenariat' : language === 'en' ? 'Partnership Benefits' : 'Beneficios de la Asociación'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentPartnership.benefits[language].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-black/20 rounded-lg p-4">
                  <div className="w-2 h-2 bg-[#FFD56B] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-white/80 font-['Montserrat']">{benefit}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="formats" className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
              {language === 'fr' ? 'Formats de Collaboration' : language === 'en' ? 'Collaboration Formats' : 'Formatos de Colaboración'}
            </h3>
            <div className="space-y-3">
              {currentPartnership.formats[language].map((format, index) => (
                <div key={index} className="flex items-center gap-3 bg-black/20 rounded-lg p-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-white font-['Montserrat']">{format}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
              {language === 'fr' ? 'Plan d\'Implémentation' : language === 'en' ? 'Implementation Plan' : 'Plan de Implementación'}
            </h3>
            <div className="space-y-4">
              {[
                { phase: '1', action: 'Création landing IA La Poche Bleue', timeline: '7 jours' },
                { phase: '2', action: 'Formulaire matching IA entreprises', timeline: '10 jours' },
                { phase: '3', action: 'Pilotage premier test terrain PME', timeline: '21 jours' },
                { phase: '4', action: 'Dashboard automatisé + rapport', timeline: '30 jours' }
              ].map((step, index) => (
                <div key={index} className="flex items-center justify-between bg-black/20 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-[#8E44FF]/20 border-[#8E44FF]/30 text-[#8E44FF]">
                      Phase {step.phase}
                    </Badge>
                    <p className="text-white font-['Montserrat']">{step.action}</p>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Calendar className="w-4 h-4" />
                    <span className="font-['Montserrat']">{step.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* CTA Section */}
      <Card className="glass-effect border-white/20 p-8 text-center bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10">
        <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
          {language === 'fr' && 'Créons Ensemble un Écosystème Gagnant'}
          {language === 'en' && 'Let\'s Create a Winning Ecosystem Together'}
          {language === 'es' && 'Creemos Juntos un Ecosistema Ganador'}
        </h3>
        <p className="text-white/80 mb-6 font-['Montserrat']">
          {language === 'fr' && 'Transformez la visibilité en résultats mesurables avec notre approche IA × Média × Terrain'}
          {language === 'en' && 'Transform visibility into measurable results with our AI × Media × Field approach'}
          {language === 'es' && 'Transforma la visibilidad en resultados medibles con nuestro enfoque IA × Medios × Campo'}
        </p>
        <Button className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-3 font-['Montserrat']">
          <Handshake className="w-5 h-5 mr-2" />
          {language === 'fr' ? 'Démarrer un Partenariat' : language === 'en' ? 'Start a Partnership' : 'Iniciar una Asociación'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Card>
    </div>
  );
};

export default PartnershipHub;