import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageContext } from '@/contexts/LanguageContext';
import { RivalBusiness } from '@/types/rivalviews';
import ScoreILAChart from './ScoreILAChart';
import { 
  MapPin, 
  Star, 
  TrendingUp, 
  Globe, 
  Camera, 
  Users,
  Search,
  Download,
  X,
  Building,
  Target
} from 'lucide-react';
import ExportActions from './ExportActions';

interface BusinessAnalysisPanelProps {
  business: RivalBusiness | null;
  onClose: () => void;
  onCompare: (business: RivalBusiness) => void;
}

const BusinessAnalysisPanel: React.FC<BusinessAnalysisPanelProps> = ({ 
  business, 
  onClose, 
  onCompare 
}) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';

  const content = {
    fr: {
      title: "Fiche d'Analyse Détaillée",
      location: "Localisation & Réseau",
      seoData: "Visibilité SEO",
      reputation: "Réputation Locale",
      distance: "Distance",
      isChain: "Type d'entreprise",
      branches: "Succursales locales",
      keywords: "Mots-clés indexés",
      topKeywords: "Top 10 Google",
      bestKeyword: "Meilleur mot-clé",
      backlinks: "Backlinks",
      traffic: "Trafic organique/mois",
      rating: "Note Google",
      reviews: "Avis",
      comments: "Commentaires",
      photos: "Photos",
      actions: {
        compare: "Comparer",
        export: "Exporter PDF",
        analyze: "Analyse ADLUMA™",
        close: "Fermer"
      },
      chain: "Réseau",
      independent: "Indépendant",
      yes: "Oui",
      no: "Non"
    },
    en: {
      title: "Detailed Analysis Sheet",
      location: "Location & Network",
      seoData: "SEO Visibility",
      reputation: "Local Reputation",
      distance: "Distance",
      isChain: "Business type",
      branches: "Local branches",
      keywords: "Indexed keywords",
      topKeywords: "Google Top 10",
      bestKeyword: "Best keyword",
      backlinks: "Backlinks",
      traffic: "Organic traffic/month",
      rating: "Google rating",
      reviews: "Reviews",
      comments: "Comments",
      photos: "Photos",
      actions: {
        compare: "Compare",
        export: "Export PDF",
        analyze: "ADLUMA™ Analysis",
        close: "Close"
      },
      chain: "Chain",
      independent: "Independent",
      yes: "Yes",
      no: "No"
    },
    es: {
      title: "Ficha de Análisis Detallado",
      location: "Ubicación y Red",
      seoData: "Visibilidad SEO",
      reputation: "Reputación Local",
      distance: "Distancia",
      isChain: "Tipo de empresa",
      branches: "Sucursales locales",
      keywords: "Palabras clave indexadas",
      topKeywords: "Google Top 10",
      bestKeyword: "Mejor palabra clave",
      backlinks: "Backlinks",
      traffic: "Tráfico orgánico/mes",
      rating: "Calificación Google",
      reviews: "Reseñas",
      comments: "Comentarios",
      photos: "Fotos",
      actions: {
        compare: "Comparar",
        export: "Exportar PDF",
        analyze: "Análisis ADLUMA™",
        close: "Cerrar"
      },
      chain: "Cadena",
      independent: "Independiente",
      yes: "Sí",
      no: "No"
    }
  };

  const t = content[language as keyof typeof content];

  if (!business) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed right-0 top-0 h-full w-96 z-50 bg-black/90 backdrop-blur-md border-l border-white/20 overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-['Montserrat']">
            {t.title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Business Header */}
        <Card className="glass-effect border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-white font-['Montserrat'] flex items-center justify-between">
              <span className="truncate">{business.name}</span>
              <Badge className={`${getScoreColor(business.ilaScore)} bg-transparent border-current`}>
                {business.ilaScore}/100
              </Badge>
            </CardTitle>
            <div className="flex items-center text-white/60 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {business.address}
            </div>
          </CardHeader>
        </Card>

        {/* Location & Network */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white font-['Montserrat'] text-lg flex items-center">
              <Building className="w-5 h-5 mr-2 text-[hsl(var(--accent))]" />
              {t.location}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.distance}</span>
              <span className="text-white font-medium">{business.distanceFromUser}km</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.isChain}</span>
              <span className="text-white font-medium">
                {business.isChain ? t.chain : t.independent}
              </span>
            </div>
            
            {business.isChain && business.chainCount && (
              <div className="flex justify-between">
                <span className="text-white/80 font-['Montserrat']">{t.branches}</span>
                <span className="text-emerald-400 font-medium">{business.chainCount}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SEO Data */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white font-['Montserrat'] text-lg flex items-center">
              <Search className="w-5 h-5 mr-2 text-[hsl(var(--accent))]" />
              {t.seoData}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.keywords}</span>
              <span className="text-white font-medium">{business.indexedKeywords}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.topKeywords}</span>
              <span className="text-emerald-400 font-medium">{business.top10Keywords}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.bestKeyword}</span>
              <span className="text-white font-medium text-xs">{business.topKeyword}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.backlinks}</span>
              <span className="text-white font-medium">{business.backlinks}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.traffic}</span>
              <span className="text-white font-medium">{business.organicTraffic.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Reputation */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white font-['Montserrat'] text-lg flex items-center">
              <Star className="w-5 h-5 mr-2 text-[hsl(var(--accent))]" />
              {t.reputation}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.rating}</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-white font-medium">{business.googleRating}/5</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.reviews}</span>
              <span className="text-white font-medium">{business.reviewCount}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.comments}</span>
              <span className="text-white font-medium">{business.totalComments}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/80 font-['Montserrat']">{t.photos}</span>
              <div className="flex items-center">
                <Camera className="w-4 h-4 mr-1 text-emerald-400" />
                <span className={`font-medium ${business.hasPhotos ? 'text-emerald-400' : 'text-red-400'}`}>
                  {business.hasPhotos ? t.yes : t.no}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score ILA Chart */}
        <ScoreILAChart business={business} />

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-['Montserrat']"
            onClick={() => onCompare(business)}
          >
            <Target className="w-5 h-5 mr-2" />
            {t.actions.compare}
          </Button>
        </div>

        {/* Export Actions */}
        <ExportActions
          business={business}
          onExportPDF={() => console.log('Export PDF:', business.name)}
          onContactIluma={() => console.log('Contact Iluma for:', business.name)}
          onViewInCRM={() => console.log('View in CRM:', business.id)}
        />

        {/* Last Review Preview */}
        {business.lastReview && (
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4">
              <div className="text-white/80 text-sm mb-2 font-['Montserrat']">Dernier avis:</div>
              <div className="text-white/60 text-xs italic">"{business.lastReview}"</div>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default BusinessAnalysisPanel;