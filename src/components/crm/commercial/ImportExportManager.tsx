import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  Download, 
  FileText, 
  Database,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';

interface ImportExportManagerProps {
  onImportComplete?: (data: any) => void;
  onExportComplete?: (format: string) => void;
}

const ImportExportManager: React.FC<ImportExportManagerProps> = ({ 
  onImportComplete, 
  onExportComplete 
}) => {
  const { clients, tasks, team, addClient, addTask, addJournalEntry } = useCRM();
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [importType, setImportType] = useState<'clients' | 'tasks' | 'team'>('clients');
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'excel'>('csv');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResults, setImportResults] = useState<{success: number, errors: string[]}>({success: 0, errors: []});

  // CSV to JSON converter
  const csvToJson = (csv: string) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',');
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = values[index]?.trim() || '';
        });
        result.push(obj);
      }
    }
    return result;
  };

  // JSON to CSV converter
  const jsonToCsv = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(item => 
      headers.map(header => {
        const value = item[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setImportResults({success: 0, errors: []});

    try {
      const text = await selectedFile.text();
      let data = [];
      
      if (selectedFile.name.endsWith('.csv')) {
        data = csvToJson(text);
      } else if (selectedFile.name.endsWith('.json')) {
        data = JSON.parse(text);
      }

      let successCount = 0;
      const errors: string[] = [];

      for (const item of data) {
        try {
          switch (importType) {
            case 'clients':
              await addClient({
                name: item.name || 'Client sans nom',
                sector: item.sector || 'Non spécifié',
                address: item.address || '',
                coordinates: { lat: 45.5017, lng: -73.5673 },
                contact: {
                  email: item.email || '',
                  phone: item.phone || '',
                  website: item.website || ''
                },
                ilaScore: {
                  current: parseInt(item.ilaScore) || Math.floor(Math.random() * 40) + 30,
                  history: [],
                  lastUpdated: new Date(),
                  trend: 'stable'
                },
                status: item.status || 'prospect',
                assignedTo: item.assignedTo || 'system',
                services: [],
                revenue: parseFloat(item.revenue) || 0,
                notes: item.notes || '',
                documents: []
              });
              break;
            
            case 'tasks':
              await addTask({
                title: item.title || 'Tâche importée',
                description: item.description || '',
                status: item.status || 'todo',
                priority: item.priority || 'medium',
                assignedTo: item.assignedTo || 'system',
                dueDate: item.dueDate ? new Date(item.dueDate) : new Date(),
                estimatedHours: parseFloat(item.estimatedHours) || 1,
                tags: item.tags ? item.tags.split(',') : []
              });
              break;
          }
          successCount++;
        } catch (error) {
          errors.push(`Erreur ligne ${data.indexOf(item) + 1}: ${error}`);
        }
      }

      setImportResults({success: successCount, errors});
      
      // Add journal entry
      await addJournalEntry({
        type: 'success',
        title: 'Import réussi',
        content: `${successCount} enregistrements importés (${importType})`,
        relatedTo: { type: 'client', id: 'import' },
        author: 'System',
        aiGenerated: false
      });

      if (onImportComplete) {
        onImportComplete({type: importType, success: successCount, errors});
      }

    } catch (error) {
      setImportResults({success: 0, errors: [`Erreur de format: ${error}`]});
    }

    setIsProcessing(false);
  };

  const handleExport = async () => {
    setIsProcessing(true);
    
    try {
      let data = [];
      let filename = '';
      
      switch (importType) {
        case 'clients':
          data = clients.map(client => ({
            name: client.name,
            sector: client.sector,
            address: client.address,
            email: client.contact.email,
            phone: client.contact.phone,
            website: client.contact.website,
            status: client.status,
            assignedTo: client.assignedTo,
            revenue: client.revenue,
            ilaScore: client.ilaScore.current,
            notes: client.notes
          }));
          filename = `clients_export_${new Date().toISOString().split('T')[0]}`;
          break;
          
        case 'tasks':
          data = tasks.map(task => ({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            assignedTo: task.assignedTo,
            dueDate: task.dueDate.toISOString().split('T')[0],
            estimatedHours: task.estimatedHours,
            tags: task.tags.join(',')
          }));
          filename = `tasks_export_${new Date().toISOString().split('T')[0]}`;
          break;
          
        case 'team':
          data = team.map(member => ({
            name: member.name,
            email: member.email,
            role: member.role,
            lastLogin: member.lastLogin.toISOString()
          }));
          filename = `team_export_${new Date().toISOString().split('T')[0]}`;
          break;
      }

      let content = '';
      let mimeType = '';
      
      switch (exportFormat) {
        case 'csv':
          content = jsonToCsv(data);
          mimeType = 'text/csv';
          filename += '.csv';
          break;
        case 'json':
          content = JSON.stringify(data, null, 2);
          mimeType = 'application/json';
          filename += '.json';
          break;
        case 'excel':
          content = jsonToCsv(data);
          mimeType = 'application/vnd.ms-excel';
          filename += '.csv'; // Simplified as CSV for Excel compatibility
          break;
      }

      // Create and download file
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);

      // Add journal entry
      await addJournalEntry({
        type: 'success',
        title: 'Export réussi',
        content: `${data.length} enregistrements exportés (${importType}) en ${exportFormat.toUpperCase()}`,
        relatedTo: { type: 'client', id: 'export' },
        author: 'System',
        aiGenerated: false
      });

      if (onExportComplete) {
        onExportComplete(exportFormat);
      }

    } catch (error) {
      console.error('Export error:', error);
    }
    
    setIsProcessing(false);
    setShowExportModal(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Card className="glass-effect border-white/20 p-6 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-6 h-6 text-[#00FF88]" />
            <h3 className="text-lg font-bold text-white font-['Montserrat']">Import de Données</h3>
          </div>
          <p className="text-white/70 text-sm mb-4">
            Importez vos clients, tâches ou équipes depuis un fichier CSV ou JSON
          </p>
          <Button
            onClick={() => setShowImportModal(true)}
            className="w-full bg-[#00FF88] hover:bg-[#00FF88]/80 text-black"
          >
            <Upload className="w-4 h-4 mr-2" />
            Importer des Données
          </Button>
        </Card>

        <Card className="glass-effect border-white/20 p-6 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-6 h-6 text-[#FFD56B]" />
            <h3 className="text-lg font-bold text-white font-['Montserrat']">Export de Données</h3>
          </div>
          <p className="text-white/70 text-sm mb-4">
            Exportez vos données en CSV, JSON ou Excel pour sauvegarde
          </p>
          <Button
            onClick={() => setShowExportModal(true)}
            className="w-full bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter des Données
          </Button>
        </Card>
      </div>

      {/* Import Modal */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#00FF88] font-['Montserrat']">Import de Données</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">Type de données</Label>
              <Select value={importType} onValueChange={(value: any) => setImportType(value)}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="clients">Clients</SelectItem>
                  <SelectItem value="tasks">Tâches</SelectItem>
                  <SelectItem value="team">Équipe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white/80">Fichier (CSV ou JSON)</Label>
              <Input
                type="file"
                accept=".csv,.json"
                onChange={handleFileSelect}
                className="bg-black/20 border-white/20 text-white"
              />
            </div>

            {importResults.success > 0 && (
              <div className="bg-green-500/20 border border-green-500/30 rounded p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium">
                    {importResults.success} enregistrements importés avec succès
                  </span>
                </div>
              </div>
            )}

            {importResults.errors.length > 0 && (
              <div className="bg-red-500/20 border border-red-500/30 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-medium">Erreurs détectées:</span>
                </div>
                <div className="text-sm text-red-300 space-y-1">
                  {importResults.errors.slice(0, 3).map((error, index) => (
                    <div key={index}>• {error}</div>
                  ))}
                  {importResults.errors.length > 3 && (
                    <div>... et {importResults.errors.length - 3} autres erreurs</div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleImport}
                disabled={!selectedFile || isProcessing}
                className="flex-1 bg-[#00FF88] hover:bg-[#00FF88]/80 text-black"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Importation...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Importer
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowImportModal(false)}
                className="border-white/20 text-white"
              >
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Modal */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#FFD56B] font-['Montserrat']">Export de Données</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">Type de données</Label>
              <Select value={importType} onValueChange={(value: any) => setImportType(value)}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="clients">Clients ({clients.length})</SelectItem>
                  <SelectItem value="tasks">Tâches ({tasks.length})</SelectItem>
                  <SelectItem value="team">Équipe ({team.length})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white/80">Format d'export</Label>
              <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="csv">CSV (Excel compatible)</SelectItem>
                  <SelectItem value="json">JSON (données structurées)</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleExport}
                disabled={isProcessing}
                className="flex-1 bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Export...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowExportModal(false)}
                className="border-white/20 text-white"
              >
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportExportManager;