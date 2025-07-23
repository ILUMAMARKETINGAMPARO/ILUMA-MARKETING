import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExport } from '@/contexts/ExportContext';
import { useToast } from '@/hooks/use-toast.ts';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Mail,
  Share2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { RivalBusiness, RivalExportData } from '@/types/rivalviews.ts';

interface ExportModuleProps {
  businesses: RivalBusiness[];
  selectedBusiness?: RivalBusiness | null;
  isVisible: boolean;
  onClose: () => void;
}

const ExportModule: React.FC<ExportModuleProps> = ({
  businesses,
  selectedBusiness,
  isVisible,
  onClose
}) => {
  const { createExport, generatePDF, generateSlides, exports } = useExport();
  const { toast } = useToast();
  const [exportType, setExportType] = useState<'pdf' | 'csv' | 'slides' | 'email'>('pdf');
  const [exportScope, setExportScope] = useState<'selected' | 'filtered' | 'all'>('selected');
  const [reportTitle, setReportTitle] = useState('');
  const [reportNotes, setReportNotes] = useState('');
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Préparer les données d'export
  const prepareExportData = (): RivalExportData => {
    let dataToExport: RivalBusiness[] = [];
    
    switch (exportScope) {
      case 'selected':
        dataToExport = selectedBusiness ? [selectedBusiness] : [];
        break;
      case 'filtered':
        dataToExport = businesses.slice(0, 10); // Les 10 premiers filtrés
        break;
      case 'all':
        dataToExport = businesses;
        break;
    }

    return {
      businesses: dataToExport,
      stats: {
        totalBusinesses: dataToExport.length,
        averageILAScore: dataToExport.reduce((acc, b) => acc + b.ilaScore, 0) / dataToExport.length,
        topSector: 'Restaurant', // À calculer dynamiquement
        conversionRate: 0.15,
        prospectsByStatus: {
          prospect: dataToExport.filter(b => b.status === 'prospect').length,
          contacted: dataToExport.filter(b => b.status === 'contacted').length,
          client: dataToExport.filter(b => b.status === 'client').length,
          lost: dataToExport.filter(b => b.status === 'lost').length,
        },
        scoreDistribution: {
          high: dataToExport.filter(b => b.ilaScore >= 80).length,
          medium: dataToExport.filter(b => b.ilaScore >= 60 && b.ilaScore < 80).length,
          low: dataToExport.filter(b => b.ilaScore < 60).length,
        }
      },
      filters: {},
      generatedAt: new Date().toISOString(),
      context: reportNotes || 'Export RivalViews™'
    };
  };

  const handleExport = async () => {
    if (!reportTitle.trim()) {
      toast({
        title: "Titre requis",
        description: "Veuillez saisir un titre pour votre rapport",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    const exportData = prepareExportData();

    try {
      let exportId: string;
      
      switch (exportType) {
        case 'pdf':
          exportId = await generatePDF(exportData, 'iluma_report');
          break;
        case 'slides':
          exportId = await generateSlides(exportData, 'iluma_presentation');
          break;
        case 'csv':
          exportId = await createExport('csv', reportTitle, exportData);
          break;
        case 'email':
          // Simuler l'envoi d'email
          await new Promise(resolve => setTimeout(resolve, 2000));
          toast({
            title: "Email envoyé",
            description: `Rapport envoyé à ${emailRecipient}`,
          });
          setIsExporting(false);
          onClose();
          return;
      }

      toast({
        title: "Export créé",
        description: "Votre export est en cours de génération",
      });
      
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportTypes = [
    {
      id: 'pdf' as const,
      name: 'Rapport PDF',
      description: 'Rapport détaillé avec graphiques et analyses',
      icon: FileText,
      color: 'text-red-400'
    },
    {
      id: 'csv' as const,
      name: 'Données CSV',
      description: 'Export tabulaire pour Excel/Google Sheets',
      icon: FileSpreadsheet,
      color: 'text-green-400'
    },
    {
      id: 'slides' as const,
      name: 'Présentation',
      description: 'Slides PowerPoint pour présentation client',
      icon: Presentation,
      color: 'text-blue-400'
    },
    {
      id: 'email' as const,
      name: 'Envoi Email',
      description: 'Envoyer le rapport directement par email',
      icon: Mail,
      color: 'text-purple-400'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black/90 border border-[#8E44FF]/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Module d'Export
                  </CardTitle>
                  <p className="text-white/60 text-sm mt-1">
                    Exportez vos analyses RivalViews™
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Configuration de l'export */}
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Titre du rapport</label>
                  <Input
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="ex: Analyse Concurrentielle - Montréal"
                    className="bg-black/50 border-[#8E44FF]/30 text-white"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Portée de l'export</label>
                  <Select value={exportScope} onValueChange={(value: any) => setExportScope(value)}>
                    <SelectTrigger className="bg-black/50 border-[#8E44FF]/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#8E44FF]/30">
                      <SelectItem value="selected" className="text-white">
                        Entreprise sélectionnée ({selectedBusiness ? '1' : '0'})
                      </SelectItem>
                      <SelectItem value="filtered" className="text-white">
                        Résultats filtrés (max 10)
                      </SelectItem>
                      <SelectItem value="all" className="text-white">
                        Toutes les entreprises ({businesses.length})
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Notes et contexte</label>
                  <Textarea
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="Ajoutez des notes contextuelles pour ce rapport..."
                    className="bg-black/50 border-[#8E44FF]/30 text-white"
                    rows={3}
                  />
                </div>
              </div>

              {/* Types d'export */}
              <div>
                <label className="text-white font-medium mb-3 block">Format d'export</label>
                <div className="grid grid-cols-2 gap-3">
                  {exportTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Card
                        key={type.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          exportType === type.id
                            ? 'bg-[#8E44FF]/20 border-[#8E44FF] shadow-lg'
                            : 'bg-black/50 border-white/10 hover:border-[#8E44FF]/50'
                        }`}
                        onClick={() => setExportType(type.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Icon className={`w-5 h-5 ${type.color} flex-shrink-0 mt-0.5`} />
                            <div>
                              <h4 className="text-white font-medium text-sm">{type.name}</h4>
                              <p className="text-white/60 text-xs mt-1">{type.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Configuration email si sélectionné */}
              {exportType === 'email' && (
                <div>
                  <label className="text-white font-medium mb-2 block">Email du destinataire</label>
                  <Input
                    type="email"
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    placeholder="client@entreprise.com"
                    className="bg-black/50 border-[#8E44FF]/30 text-white"
                  />
                </div>
              )}

              {/* Historique des exports récents */}
              {exports.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-3">Exports récents</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {exports.slice(0, 3).map((exportItem) => (
                      <div
                        key={exportItem.id}
                        className="flex items-center justify-between p-2 bg-black/30 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(exportItem.status)}
                          <span className="text-white text-sm">{exportItem.name}</span>
                          <Badge className="bg-white/10 text-white/70">
                            {exportItem.type.toUpperCase()}
                          </Badge>
                        </div>
                        {exportItem.status === 'completed' && exportItem.downloadUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-[#8E44FF] hover:bg-[#8E44FF]/20"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleExport}
                  disabled={isExporting || (!reportTitle.trim()) || (exportType === 'email' && !emailRecipient.trim())}
                  className="flex-1 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-white"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Export en cours...
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 mr-2" />
                      Lancer l'export
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExportModule;