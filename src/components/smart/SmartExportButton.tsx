import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Presentation, BarChart3, Camera, Loader2 } from 'lucide-react';
import { useExport } from '@/contexts/ExportContext';
import { toast } from 'sonner';

interface SmartExportButtonProps {
  data: any;
  context: string;
  className?: string;
}

const SmartExportButton: React.FC<SmartExportButtonProps> = ({
  data,
  context,
  className
}) => {
  const { generatePDF, generateSlides, generateReport } = useExport();
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<string | null>(null);

  const handleExport = async (type: 'pdf' | 'slides' | 'report', template: string) => {
    setIsExporting(true);
    setExportType(type);
    
    try {
      let exportId: string;
      
      switch (type) {
        case 'pdf':
          exportId = await generatePDF(data, template);
          toast.success('Génération PDF lancée');
          break;
        case 'slides':
          exportId = await generateSlides(data, template);
          toast.success('Génération slides lancée');
          break;
        case 'report':
          exportId = await generateReport(data, template);
          toast.success('Génération rapport lancée');
          break;
      }
      
      // Notification de fin après délai simulé
      setTimeout(() => {
        toast.success(`Export ${type.toUpperCase()} prêt au téléchargement`);
        setIsExporting(false);
        setExportType(null);
      }, 3000);
      
    } catch (error) {
      toast.error(`Erreur lors de l'export ${type}`);
      setIsExporting(false);
      setExportType(null);
    }
  };

  const exportOptions = [
    {
      id: 'pdf-report',
      type: 'pdf' as const,
      template: 'iluma-report',
      icon: FileText,
      label: 'Rapport PDF Iluma™',
      description: 'Rapport détaillé avec branding Iluma™'
    },
    {
      id: 'slides-presentation',
      type: 'slides' as const,
      template: 'galactic-theme',
      icon: Presentation,
      label: 'Présentation Slides',
      description: 'Slides interactives thème galactique'
    },
    {
      id: 'analytics-report',
      type: 'report' as const,
      template: 'analytics-dashboard',
      icon: BarChart3,
      label: 'Analyse Détaillée',
      description: 'Dashboard analytics exportable'
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`bg-black/30 border-white/20 text-white hover:bg-white/10 ${className}`}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Export {exportType}...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Intelligent
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80 bg-black/90 border-white/20 text-white">
        <div className="p-2">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Exports IA disponibles</span>
            <Badge className="bg-primary/20 text-primary text-xs">
              {context}
            </Badge>
          </div>
          
          {exportOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <DropdownMenuItem
                key={option.id}
                onClick={() => handleExport(option.type, option.template)}
                className="flex flex-col items-start p-3 hover:bg-white/10 cursor-pointer"
                disabled={isExporting}
              >
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent className="w-4 h-4 text-primary" />
                  <span className="font-medium">{option.label}</span>
                </div>
                <span className="text-xs text-white/60">
                  {option.description}
                </span>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SmartExportButton;