import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageContext } from '@/contexts/LanguageContext';
import { RivalBusiness } from '@/types/rivalviews';
import { Download, MessageSquare, Eye, Copy } from 'lucide-react';

interface ExportActionsProps {
  business: RivalBusiness;
  onExportPDF: () => void;
  onContactIluma: () => void;
  onViewInCRM: () => void;
}

const ExportActions: React.FC<ExportActionsProps> = ({
  business,
  onExportPDF,
  onContactIluma,
  onViewInCRM
}) => {
  const context = React.useContext(LanguageContext);
  const language = context?.language || 'fr';

  const content = {
    fr: {
      title: "Actions disponibles",
      exportPDF: "Exporter PDF",
      exportDesc: "Fiche complète avec Score ILA™",
      contact: "Audit complet Iluma",
      contactDesc: "Demander un audit personnalisé",
      viewCRM: "Vue CRM",
      crmDesc: "Analyse back-office",
      duplicate: "Dupliquer secteur",
      duplicateDesc: "Créer pour d'autres domaines"
    },
    en: {
      title: "Available actions",
      exportPDF: "Export PDF",
      exportDesc: "Complete sheet with ILA™ Score",
      contact: "Complete Iluma Audit",
      contactDesc: "Request personalized audit",
      viewCRM: "CRM View",
      crmDesc: "Back-office analysis",
      duplicate: "Duplicate sector",
      duplicateDesc: "Create for other domains"
    },
    es: {
      title: "Acciones disponibles",
      exportPDF: "Exportar PDF",
      exportDesc: "Ficha completa con Puntuación ILA™",
      contact: "Auditoría Iluma completa",
      contactDesc: "Solicitar auditoría personalizada",
      viewCRM: "Vista CRM",
      crmDesc: "Análisis back-office",
      duplicate: "Duplicar sector",
      duplicateDesc: "Crear para otros dominios"
    }
  };

  const t = content[language as keyof typeof content];

  const generatePDFData = () => {
    const pdfData = {
      business: business.name,
      address: business.address,
      ilaScore: business.ilaScore,
      seo: {
        keywords: business.indexedKeywords,
        topKeywords: business.top10Keywords,
        topKeyword: business.topKeyword,
        backlinks: business.backlinks,
        traffic: business.organicTraffic
      },
      reputation: {
        rating: business.googleRating,
        reviews: business.reviewCount,
        comments: business.totalComments,
        photos: business.hasPhotos
      },
      network: {
        isChain: business.isChain,
        branches: business.chainCount
      }
    };
    
    onExportPDF();
    console.log('PDF Data Generated:', pdfData);
  };

  const actions = [
    {
      icon: Download,
      label: t.exportPDF,
      description: t.exportDesc,
      action: generatePDFData,
      primary: true
    },
    {
      icon: MessageSquare,
      label: t.contact,
      description: t.contactDesc,
      action: onContactIluma,
      primary: false
    },
    {
      icon: Eye,
      label: t.viewCRM,
      description: t.crmDesc,
      action: onViewInCRM,
      primary: false
    },
    {
      icon: Copy,
      label: t.duplicate,
      description: t.duplicateDesc,
      action: () => {
        const currentUrl = window.location.href;
        const newUrl = currentUrl.replace('/rivalviews', `/rivalviews-${business.sector.toLowerCase()}`);
        console.log('Duplicate for sector:', newUrl);
      },
      primary: false
    }
  ];

  return (
    <Card className="glass-effect border-white/20">
      <CardContent className="p-4">
        <h3 className="text-white font-bold mb-4 font-['Montserrat']">
          {t.title}
        </h3>
        
        <div className="space-y-3">
          {actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  size={action.primary ? "lg" : "default"}
                  className={action.primary ? 
                    "w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-['Montserrat']" :
                    "w-full bg-white/10 text-white hover:bg-white/20 border-white/20 font-['Montserrat']"
                  }
                  onClick={action.action}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  <div className="text-left flex-1">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-xs opacity-80">{action.description}</div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportActions;