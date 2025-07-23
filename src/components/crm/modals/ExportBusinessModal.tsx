import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileSpreadsheet, 
  FileText,
  CheckCircle
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';

interface ExportBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  businesses: RivalBusiness[];
  selectedBusinesses: string[];
}

const ExportBusinessModal: React.FC<ExportBusinessModalProps> = ({
  isOpen,
  onClose,
  businesses,
  selectedBusinesses
}) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel'>('excel');
  const [exportType, setExportType] = useState<'selected' | 'all'>('selected');
  const [includeFields, setIncludeFields] = useState({
    basic: true,
    contact: true,
    seo: true,
    analytics: false,
    internal: false
  });

  const fieldGroups = {
    basic: {
      label: 'Informations de base',
      fields: ['name', 'sector', 'address', 'city', 'status', 'potential'],
      count: 6
    },
    contact: {
      label: 'Informations de contact',
      fields: ['phone', 'email', 'website'],
      count: 3
    },
    seo: {
      label: 'Données SEO',
      fields: ['ilaScore', 'serpRank', 'backlinks', 'indexedKeywords', 'organicTraffic'],
      count: 5
    },
    analytics: {
      label: 'Analytics Google',
      fields: ['googleRating', 'reviewCount', 'hasPhotos', 'totalComments'],
      count: 4
    },
    internal: {
      label: 'Données internes',
      fields: ['assignedTo', 'lastContact', 'notes', 'tags'],
      count: 4
    }
  };

  const getExportData = () => {
    const dataToExport = exportType === 'selected' 
      ? businesses.filter(b => selectedBusinesses.includes(b.id))
      : businesses;

    const selectedFields: string[] = [];
    Object.entries(includeFields).forEach(([group, included]) => {
      if (included) {
        selectedFields.push(...fieldGroups[group as keyof typeof fieldGroups].fields);
      }
    });

    return dataToExport.map(business => {
      const exportRow: Record<string, any> = {};
      
      selectedFields.forEach(field => {
        switch (field) {
          case 'name':
            exportRow['Nom'] = business.name;
            break;
          case 'sector':
            exportRow['Secteur'] = business.sector;
            break;
          case 'address':
            exportRow['Adresse'] = business.address;
            break;
          case 'city':
            exportRow['Ville'] = business.city;
            break;
          case 'status':
            exportRow['Statut'] = business.status;
            break;
          case 'potential':
            exportRow['Potentiel'] = business.potential;
            break;
          case 'phone':
            exportRow['Téléphone'] = business.phone || '';
            break;
          case 'email':
            exportRow['Email'] = business.email || '';
            break;
          case 'website':
            exportRow['Site web'] = business.website || '';
            break;
          case 'ilaScore':
            exportRow['Score ILA™'] = business.ilaScore;
            break;
          case 'serpRank':
            exportRow['Position SEO'] = business.serpRank;
            break;
          case 'backlinks':
            exportRow['Backlinks'] = business.backlinks;
            break;
          case 'indexedKeywords':
            exportRow['Mots-clés indexés'] = business.indexedKeywords;
            break;
          case 'organicTraffic':
            exportRow['Trafic organique'] = business.organicTraffic;
            break;
          case 'googleRating':
            exportRow['Note Google'] = business.googleRating;
            break;
          case 'reviewCount':
            exportRow['Nombre d\'avis'] = business.reviewCount;
            break;
          case 'hasPhotos':
            exportRow['Photos'] = business.hasPhotos ? 'Oui' : 'Non';
            break;
          case 'totalComments':
            exportRow['Commentaires'] = business.totalComments;
            break;
          case 'assignedTo':
            exportRow['Assigné à'] = business.assignedTo || '';
            break;
          case 'lastContact':
            exportRow['Dernier contact'] = business.lastContact || '';
            break;
          case 'notes':
            exportRow['Notes'] = business.notes || '';
            break;
          case 'tags':
            exportRow['Tags'] = business.tags?.join(', ') || '';
            break;
        }
      });

      return exportRow;
    });
  };

  const handleExport = () => {
    const data = getExportData();
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', '_').replace(':', 'h');
    const filename = `revolveviewer_export_${timestamp}`;

    if (exportFormat === 'csv') {
      // Export CSV
      const headers = Object.keys(data[0] || {});
      const csvContent = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => `"${row[header] || ''}"`).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.csv`;
      link.click();
    } else {
      // For Excel export, we'll use CSV format but with .xlsx extension
      // In a real implementation, you'd use a library like SheetJS
      const headers = Object.keys(data[0] || {});
      const csvContent = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => `"${row[header] || ''}"`).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.xlsx`;
      link.click();
    }

    onClose();
  };

  const exportCount = exportType === 'selected' ? selectedBusinesses.length : businesses.length;
  const totalFields = Object.entries(includeFields).reduce((total, [group, included]) => {
    return total + (included ? fieldGroups[group as keyof typeof fieldGroups].count : 0);
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#8E44FF] font-['Montserrat'] text-xl flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exporter les données
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Type d'export */}
          <Card className="glass-effect border-white/20 p-4">
            <Label className="text-white font-medium mb-3 block">
              Données à exporter
            </Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="export-selected"
                  checked={exportType === 'selected'}
                  onCheckedChange={() => setExportType('selected')}
                />
                <Label htmlFor="export-selected" className="text-white/80">
                  Entreprises sélectionnées ({selectedBusinesses.length})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="export-all"
                  checked={exportType === 'all'}
                  onCheckedChange={() => setExportType('all')}
                />
                <Label htmlFor="export-all" className="text-white/80">
                  Toutes les entreprises ({businesses.length})
                </Label>
              </div>
            </div>
          </Card>

          {/* Format d'export */}
          <Card className="glass-effect border-white/20 p-4">
            <Label className="text-white font-medium mb-3 block">
              Format d'export
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={exportFormat === 'excel' ? 'default' : 'outline'}
                onClick={() => setExportFormat('excel')}
                className={`justify-start ${exportFormat === 'excel' ? 'bg-[#8E44FF]' : 'border-white/20'}`}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Excel (.xlsx)
              </Button>
              <Button
                variant={exportFormat === 'csv' ? 'default' : 'outline'}
                onClick={() => setExportFormat('csv')}
                className={`justify-start ${exportFormat === 'csv' ? 'bg-[#8E44FF]' : 'border-white/20'}`}
              >
                <FileText className="w-4 h-4 mr-2" />
                CSV (.csv)
              </Button>
            </div>
          </Card>

          {/* Champs à inclure */}
          <Card className="glass-effect border-white/20 p-4">
            <Label className="text-white font-medium mb-3 block">
              Champs à inclure
            </Label>
            <div className="space-y-3">
              {Object.entries(fieldGroups).map(([groupKey, group]) => (
                <div key={groupKey} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`fields-${groupKey}`}
                      checked={includeFields[groupKey as keyof typeof includeFields]}
                      onCheckedChange={(checked) => 
                        setIncludeFields(prev => ({ ...prev, [groupKey]: checked }))
                      }
                    />
                    <Label htmlFor={`fields-${groupKey}`} className="text-white/80">
                      {group.label}
                    </Label>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-white/60">
                    {group.count} champ{group.count > 1 ? 's' : ''}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Résumé */}
          <Card className="glass-effect border-green-500/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <Label className="text-green-400 font-medium">
                Résumé de l'export
              </Label>
            </div>
            <div className="text-white/70 space-y-1">
              <p>• {exportCount} entreprise{exportCount > 1 ? 's' : ''} à exporter</p>
              <p>• {totalFields} champ{totalFields > 1 ? 's' : ''} inclus</p>
              <p>• Format: {exportFormat.toUpperCase()}</p>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" className="border-white/20 flex-1">
              Annuler
            </Button>
            <Button 
              onClick={handleExport} 
              className="bg-green-600 hover:bg-green-700 flex-1"
              disabled={exportCount === 0 || totalFields === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportBusinessModal;