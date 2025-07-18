import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, 
  FileText, 
  Image, 
  BarChart3, 
  FileSpreadsheet,
  Share2,
  Mail,
  Printer,
  Zap,
  Sparkles,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportConfig {
  format: 'pdf' | 'excel' | 'png' | 'csv' | 'json';
  sections: string[];
  branding: boolean;
  analytics: boolean;
  interactive: boolean;
  language: 'fr' | 'en' | 'es';
}

interface ExportData {
  adluma?: any;
  ila?: any;
  crm?: any;
  analytics?: any;
  user?: any;
  modules?: any[];
  performance?: any;
  interests?: any[];
  description?: string;
  location?: string;
  radius?: number;
  cities?: any[];
}

const SmartExportSystem: React.FC<{ data: ExportData; moduleType: string }> = ({ data, moduleType }) => {
  const { toast } = useToast();
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    format: 'pdf',
    sections: ['summary', 'results', 'recommendations'],
    branding: true,
    analytics: false,
    interactive: false,
    language: 'fr'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState<any[]>([]);

  const availableSections = {
    adluma: [
      { id: 'summary', label: 'Résumé Exécutif', icon: <FileText className="w-4 h-4" /> },
      { id: 'results', label: 'Résultats de Simulation', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'recommendations', label: 'Recommandations IA', icon: <Sparkles className="w-4 h-4" /> },
      { id: 'budget', label: 'Analyse Budgétaire', icon: <Zap className="w-4 h-4" /> },
      { id: 'timeline', label: 'Calendrier Proposé', icon: <FileText className="w-4 h-4" /> }
    ],
    ila: [
      { id: 'summary', label: 'Score ILA™ Global', icon: <Crown className="w-4 h-4" /> },
      { id: 'breakdown', label: 'Détail par Composant', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'recommendations', label: 'Plan d\'Action', icon: <Sparkles className="w-4 h-4" /> },
      { id: 'competitor', label: 'Analyse Concurrentielle', icon: <Zap className="w-4 h-4" /> },
      { id: 'roadmap', label: 'Feuille de Route', icon: <FileText className="w-4 h-4" /> }
    ],
    crm: [
      { id: 'summary', label: 'Tableau de Bord', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'clients', label: 'Liste Clients', icon: <FileText className="w-4 h-4" /> },
      { id: 'analytics', label: 'Analytics Avancées', icon: <Sparkles className="w-4 h-4" /> },
      { id: 'revenue', label: 'Rapport Revenus', icon: <Zap className="w-4 h-4" /> }
    ]
  };

  const formatOptions = [
    { value: 'pdf', label: 'PDF Professionnel', icon: <FileText className="w-4 h-4" />, premium: false },
    { value: 'excel', label: 'Excel Interactif', icon: <FileSpreadsheet className="w-4 h-4" />, premium: false },
    { value: 'png', label: 'Image HD', icon: <Image className="w-4 h-4" />, premium: false },
    { value: 'csv', label: 'Données CSV', icon: <FileSpreadsheet className="w-4 h-4" />, premium: false },
    { value: 'json', label: 'API JSON', icon: <FileText className="w-4 h-4" />, premium: true }
  ];

  const handleSectionToggle = (sectionId: string) => {
    setExportConfig(prev => ({
      ...prev,
      sections: prev.sections.includes(sectionId)
        ? prev.sections.filter(s => s !== sectionId)
        : [...prev.sections, sectionId]
    }));
  };

  const generateExport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        config: exportConfig,
        data: data,
        moduleType: moduleType,
        timestamp: new Date().toISOString(),
        metadata: {
          version: '1.0',
          generator: 'Iluma Smart Export',
          language: exportConfig.language
        }
      };

      // Generate different formats
      switch (exportConfig.format) {
        case 'pdf':
          await generatePDF(exportData);
          break;
        case 'excel':
          await generateExcel(exportData);
          break;
        case 'png':
          await generateImage(exportData);
          break;
        case 'csv':
          await generateCSV(exportData);
          break;
        case 'json':
          await generateJSON(exportData);
          break;
      }

      // Add to history
      const historyEntry = {
        id: Date.now().toString(),
        format: exportConfig.format,
        moduleType: moduleType,
        sections: exportConfig.sections,
        timestamp: new Date(),
        size: Math.floor(Math.random() * 2000) + 500 // KB
      };
      
      setExportHistory(prev => [historyEntry, ...prev.slice(0, 4)]);

      toast({
        title: "Export Réussi!",
        description: `Votre rapport ${exportConfig.format.toUpperCase()} a été généré avec succès.`,
      });

    } catch (error) {
      toast({
        title: "Erreur d'Export",
        description: "Une erreur est survenue lors de la génération du rapport.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generatePDF = async (exportData: any) => {
    // Simulate PDF generation
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rapport ${moduleType.toUpperCase()} - Iluma™</title>
          <style>
            body { font-family: 'Montserrat', sans-serif; margin: 40px; }
            .header { background: linear-gradient(135deg, #8E44FF, #FFD56B); color: white; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
            .section { margin-bottom: 30px; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
            .metric { display: inline-block; margin: 10px; padding: 15px; background: #f8f9fa; border-radius: 5px; text-align: center; }
            .chart-placeholder { height: 200px; background: #e9ecef; border-radius: 5px; display: flex; align-items: center; justify-content: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Rapport ${moduleType.toUpperCase()}</h1>
            <p>Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          ${exportConfig.sections.map(section => `
            <div class="section">
              <h2>${availableSections[moduleType as keyof typeof availableSections]?.find(s => s.id === section)?.label}</h2>
              <p>Contenu de la section ${section}...</p>
              ${section === 'results' ? '<div class="chart-placeholder">Graphique des résultats</div>' : ''}
            </div>
          `).join('')}
          ${exportConfig.branding ? `
            <div style="margin-top: 50px; text-align: center; color: #666;">
              <p>Rapport généré par Iluma™ - Intelligence Artificielle Marketing</p>
            </div>
          ` : ''}
        </body>
      </html>
    `;

    // Create and download PDF
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iluma-${moduleType}-rapport-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateExcel = async (exportData: any) => {
    const csvContent = [
      ['Rapport Iluma™', moduleType.toUpperCase()],
      ['Date', new Date().toLocaleDateString('fr-FR')],
      [''],
      ['Section', 'Valeur', 'Commentaire'],
      ...exportConfig.sections.map(section => [
        section,
        Math.floor(Math.random() * 100),
        `Analyse de ${section}`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iluma-${moduleType}-data-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateImage = async (exportData: any) => {
    // Create a canvas for image generation
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#8E44FF');
      gradient.addColorStop(1, '#FFD56B');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw content
      ctx.fillStyle = 'white';
      ctx.font = '48px Montserrat';
      ctx.fillText(`Rapport ${moduleType.toUpperCase()}`, 50, 100);
      
      ctx.font = '24px Montserrat';
      ctx.fillText(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 50, 150);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `iluma-${moduleType}-visual-${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  const generateCSV = async (exportData: any) => {
    const csvData = [
      ['Type', 'Valeur', 'Date'],
      ...exportConfig.sections.map(section => [
        section,
        Math.floor(Math.random() * 100),
        new Date().toISOString()
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iluma-${moduleType}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateJSON = async (exportData: any) => {
    const jsonData = {
      module: moduleType,
      config: exportConfig,
      data: data,
      exported_at: new Date().toISOString(),
      sections: exportConfig.sections.map(section => ({
        id: section,
        data: { value: Math.floor(Math.random() * 100) }
      }))
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iluma-${moduleType}-api-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareReport = () => {
    if (navigator.share) {
      navigator.share({
        title: `Rapport ${moduleType.toUpperCase()} - Iluma™`,
        text: 'Découvrez mon analyse Iluma™',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié!",
        description: "Le lien du rapport a été copié dans le presse-papier.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-white font-['Montserrat'] flex items-center">
            <Download className="w-5 h-5 mr-2 text-primary" />
            Configuration d'Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="text-white font-['Montserrat'] mb-3 block">Format de Sortie</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {formatOptions.map((format) => (
                <div
                  key={format.value}
                  onClick={() => setExportConfig(prev => ({ ...prev, format: format.value as any }))}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    exportConfig.format === format.value
                      ? 'border-primary bg-primary/20'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {format.icon}
                    <span className="text-white text-sm">{format.label}</span>
                    {format.premium && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                        Pro
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sections Selection */}
          <div>
            <label className="text-white font-['Montserrat'] mb-3 block">Sections à Inclure</label>
            <div className="space-y-2">
              {availableSections[moduleType as keyof typeof availableSections]?.map((section) => (
                <div key={section.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={section.id}
                    checked={exportConfig.sections.includes(section.id)}
                    onCheckedChange={() => handleSectionToggle(section.id)}
                  />
                  <label
                    htmlFor={section.id}
                    className="text-white text-sm flex items-center space-x-2 cursor-pointer"
                  >
                    {section.icon}
                    <span>{section.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="branding"
                checked={exportConfig.branding}
                onCheckedChange={(checked) => setExportConfig(prev => ({ ...prev, branding: !!checked }))}
              />
              <label htmlFor="branding" className="text-white text-sm cursor-pointer">
                Inclure le branding Iluma™
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="analytics"
                checked={exportConfig.analytics}
                onCheckedChange={(checked) => setExportConfig(prev => ({ ...prev, analytics: !!checked }))}
              />
              <label htmlFor="analytics" className="text-white text-sm cursor-pointer">
                Données analytiques détaillées
              </label>
            </div>

            <Select value={exportConfig.language} onValueChange={(value) => setExportConfig(prev => ({ ...prev, language: value as any }))}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card className="glass-effect border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              onClick={generateExport}
              disabled={isExporting || exportConfig.sections.length === 0}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground flex-1"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Générer le Rapport
                </>
              )}
            </Button>

            <Button
              onClick={shareReport}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>

            <Button
              variant="outline"
              className="border-accent/30 text-accent hover:bg-accent/10"
            >
              <Mail className="w-4 h-4 mr-2" />
              Envoyer par Email
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export History */}
      {exportHistory.length > 0 && (
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-white font-['Montserrat']">Historique d'Export</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exportHistory.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-primary">
                      {entry.format === 'pdf' && <FileText className="w-5 h-5" />}
                      {entry.format === 'excel' && <FileSpreadsheet className="w-5 h-5" />}
                      {entry.format === 'png' && <Image className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {entry.moduleType.toUpperCase()} - {entry.format.toUpperCase()}
                      </div>
                      <div className="text-white/60 text-sm">
                        {entry.timestamp.toLocaleDateString('fr-FR')} • {entry.size} KB
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-primary/30 text-primary">
                    <Download className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartExportSystem;