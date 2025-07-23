import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Users, 
  Target, 
  Award,
  ChevronRight,
  Quote,
  Globe,
  BarChart3
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage.ts';
import { CaseStudy } from '@/data/caseStudiesData';

interface CaseStudyDetailCardProps {
  caseStudy: CaseStudy;
  isExpanded?: boolean;
}

const CaseStudyDetailCard: React.FC<CaseStudyDetailCardProps> = ({ 
  caseStudy, 
  isExpanded = false 
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Card className="glass-effect border-white/20 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-[#FFD56B]" />
              <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                {language === 'fr' ? 'Succès Client' : language === 'en' ? 'Client Success' : 'Éxito Cliente'}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-['Montserrat']">
              {caseStudy.title[language]}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {caseStudy.duration}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {caseStudy.location}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {caseStudy.languages.join(' / ')}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#FFD56B] font-['Montserrat']">
              +214%
            </div>
            <p className="text-white/60 text-sm">
              {language === 'fr' ? 'Trafic Organique' : language === 'en' ? 'Organic Traffic' : 'Tráfico Orgánico'}
            </p>
          </div>
        </div>

        {/* Key Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {caseStudy.results.slice(0, 4).map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 rounded-lg p-4 text-center"
            >
              <div className="text-xl font-bold text-[#8E44FF] mb-1 font-['Montserrat']">
                {result.value}
              </div>
              <p className="text-white/70 text-sm font-['Montserrat']">
                {result.metric[language]}
              </p>
            </motion.div>
          ))}
        </div>

        {isExpanded && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Aperçu' : language === 'en' ? 'Overview' : 'Resumen'}
              </TabsTrigger>
              <TabsTrigger 
                value="actions" 
                className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']"
              >
                <Target className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Actions' : language === 'en' ? 'Actions' : 'Acciones'}
              </TabsTrigger>
              <TabsTrigger 
                value="results" 
                className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Résultats' : language === 'en' ? 'Results' : 'Resultados'}
              </TabsTrigger>
              <TabsTrigger 
                value="testimonial" 
                className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']"
              >
                <Quote className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Témoignage' : language === 'en' ? 'Testimonial' : 'Testimonio'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-white mb-3 font-['Montserrat']">
                  {language === 'fr' ? 'Diagnostic Initial' : language === 'en' ? 'Initial Diagnosis' : 'Diagnóstico Inicial'}
                </h4>
                <div className="space-y-2">
                  {caseStudy.initialDiagnosis[language].map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-white/70 font-['Montserrat']">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-4">
              <div className="space-y-4">
                {caseStudy.actions.map((action, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-[#8E44FF]/20 border-[#8E44FF]/30 text-[#8E44FF]">
                        {action.module}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </div>
                    <h5 className="text-white font-semibold mb-1 font-['Montserrat']">
                      {action.action[language]}
                    </h5>
                    <p className="text-white/70 text-sm font-['Montserrat']">
                      {action.detail[language]}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <div className="grid gap-4">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium font-['Montserrat']">
                        {result.metric[language]}
                      </p>
                      <p className="text-white/60 text-sm font-['Montserrat']">
                        {result.improvement}
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-[#FFD56B] font-['Montserrat']">
                      {result.value}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-bold text-white mb-3 font-['Montserrat']">
                  {language === 'fr' ? 'Mots-clés Conquis' : language === 'en' ? 'Conquered Keywords' : 'Palabras Clave Conquistadas'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.keyAchievements[language].map((keyword, index) => (
                    <Badge 
                      key={index}
                      className="bg-green-500/20 border-green-500/30 text-green-300"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="testimonial" className="space-y-4">
              <div className="bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10 rounded-lg p-6 border border-white/10">
                <Quote className="w-8 h-8 text-[#FFD56B] mb-4" />
                <blockquote className="text-white text-lg italic mb-4 font-['Montserrat']">
                  "{caseStudy.testimonial.quote[language]}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold font-['Montserrat']">
                      {caseStudy.testimonial.author}
                    </p>
                    <p className="text-white/60 text-sm font-['Montserrat']">
                      {caseStudy.testimonial.position[language]}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3 font-['Montserrat']">
                  {language === 'fr' ? 'Ce que prouve cette étude' : language === 'en' ? 'What this study proves' : 'Lo que prueba este estudio'}
                </h4>
                <div className="space-y-2">
                  {caseStudy.provenPoints[language].map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#FFD56B] rounded-full mt-2 flex-shrink-0" />
                      <p className="text-white/70 font-['Montserrat']">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {!isExpanded && (
          <Button 
            className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white font-['Montserrat']"
          >
            {language === 'fr' ? 'Voir les détails complets' : language === 'en' ? 'View full details' : 'Ver detalles completos'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CaseStudyDetailCard;
