import React, { useState, useCallback, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Download,
  Trash2,
  File,
  FileSpreadsheet,
  FileImage,
  Archive
} from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import mammoth from 'mammoth';

interface ImportBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

interface ImportedRow {
  id: string;
  data: Record<string, any>;
  isValid: boolean;
  errors: string[];
}

const ImportBusinessModal: React.FC<ImportBusinessModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importedData, setImportedData] = useState<ImportedRow[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview'>('upload');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = {
    'name': 'Nom de l\'entreprise',
    'address': 'Adresse',
    'city': 'Ville',
    'sector': 'Secteur d\'activité'
  };

  const optionalFields = {
    'phone': 'Téléphone',
    'email': 'Email',
    'website': 'Site web',
    'googleRating': 'Note Google',
    'reviewCount': 'Nombre d\'avis',
    'ilaScore': 'Score ILA™'
  };

  const allFields = { ...requiredFields, ...optionalFields };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      processFile(uploadedFile);
    }
  }, []);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    try {
      let data: any[] = [];
      let headers: string[] = [];
      
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      switch (fileExtension) {
        case 'csv':
          const csvText = await file.text();
          const csvResult = Papa.parse(csvText, { 
            header: true, 
            skipEmptyLines: true,
            encoding: 'UTF-8'
          });
          data = csvResult.data;
          headers = csvResult.meta.fields || [];
          break;
          
        case 'xlsx':
        case 'xls':
          const arrayBuffer = await file.arrayBuffer();
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          if (jsonData.length > 0) {
            headers = (jsonData[0] as string[]).map(h => String(h || ''));
            data = jsonData.slice(1).map((row: any, index) => {
              const rowData: Record<string, any> = {};
              headers.forEach((header, i) => {
                rowData[header] = row[i] || '';
              });
              return rowData;
            });
          }
          break;
          
        case 'json':
          const jsonText = await file.text();
          const parsedJsonData = JSON.parse(jsonText);
          if (Array.isArray(parsedJsonData) && parsedJsonData.length > 0) {
            data = parsedJsonData;
            headers = Object.keys(parsedJsonData[0]);
          }
          break;
          
        case 'docx':
          const docArrayBuffer = await file.arrayBuffer();
          const docResult = await mammoth.extractRawText({ arrayBuffer: docArrayBuffer });
          const lines = docResult.value.split('\n').filter(line => line.trim());
          if (lines.length > 1) {
            headers = ['text', 'line_number'];
            data = lines.map((line, index) => ({
              text: line.trim(),
              line_number: index + 1
            }));
          }
          break;
          
        case 'txt':
        case 'md':
          const textContent = await file.text();
          const textLines = textContent.split('\n').filter(line => line.trim());
          headers = ['text', 'line_number'];
          data = textLines.map((line, index) => ({
            text: line.trim(),
            line_number: index + 1
          }));
          break;
          
        default:
          throw new Error(`Format de fichier non supporté: ${fileExtension}`);
      }

      if (data.length === 0) {
        throw new Error('Aucune donnée trouvée dans le fichier');
      }

      const rawData = data.map((rowData, index) => ({
        id: `row-${index}`,
        data: rowData,
        isValid: true,
        errors: []
      }));

      setImportedData(rawData);
      
      // Auto-map columns based on similarity
      const autoMapping: Record<string, string> = {};
      Object.keys(allFields).forEach(fieldKey => {
        const fieldName = allFields[fieldKey].toLowerCase();
        const matchingHeader = headers.find(header => 
          header.toLowerCase().includes(fieldName.toLowerCase()) ||
          fieldName.includes(header.toLowerCase())
        );
        if (matchingHeader) {
          autoMapping[fieldKey] = matchingHeader;
        }
      });
      
      setColumnMapping(autoMapping);
      setStep('mapping');
    } catch (error) {
      console.error('Erreur lors du traitement du fichier:', error);
    }
    
    setIsProcessing(false);
  };

  const validateData = () => {
    const validatedData = importedData.map(row => {
      const errors: string[] = [];
      
      // Check required fields
      Object.keys(requiredFields).forEach(field => {
        const mappedColumn = columnMapping[field];
        if (!mappedColumn || mappedColumn === 'none' || !row.data[mappedColumn]?.trim()) {
          errors.push(`${requiredFields[field]} est requis`);
        }
      });

      return {
        ...row,
        isValid: errors.length === 0,
        errors
      };
    });

    setImportedData(validatedData);
    setStep('preview');
  };

  const handleImport = () => {
    const validRows = importedData.filter(row => row.isValid);
    const processedData = validRows.map(row => {
      const business: any = {};
      
      Object.keys(columnMapping).forEach(field => {
        const column = columnMapping[field];
        if (column && column !== 'none' && row.data[column]) {
          let value = row.data[column];
          
          // Convert specific fields
          if (field === 'googleRating' || field === 'ilaScore') {
            value = parseFloat(value) || 0;
          } else if (field === 'reviewCount') {
            value = parseInt(value) || 0;
          }
          
          business[field] = value;
        }
      });

      // Set defaults
      business.id = `imported-${Date.now()}-${Math.random()}`;
      business.status = 'prospect';
      business.potential = 'medium';
      business.source = 'import';
      business.lat = 45.5017 + (Math.random() - 0.5) * 0.1;
      business.lng = -73.5673 + (Math.random() - 0.5) * 0.1;
      
      return business;
    });

    onImport(processedData);
    handleClose();
  };

  const handleClose = () => {
    setFile(null);
    setImportedData([]);
    setColumnMapping({});
    setStep('upload');
    setIsDragOver(false);
    onClose();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      setFile(file);
      processFile(file);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'xlsx':
      case 'xls':
      case 'csv':
        return <FileSpreadsheet className="w-8 h-8 text-green-400" />;
      case 'pdf':
        return <File className="w-8 h-8 text-red-400" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-8 h-8 text-blue-400" />;
      case 'json':
        return <Archive className="w-8 h-8 text-yellow-400" />;
      default:
        return <FileText className="w-8 h-8 text-white/60" />;
    }
  };

  const validRows = importedData.filter(row => row.isValid).length;
  const invalidRows = importedData.length - validRows;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-black/90 border-white/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#8E44FF] font-['Montserrat'] text-xl">
            Importer des entreprises
          </DialogTitle>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                isDragOver 
                  ? 'border-[#8E44FF] bg-[#8E44ff]/10 scale-105' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileClick}
            >
              {file ? (
                <div className="space-y-4">
                  {getFileIcon(file.name)}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {file.name}
                    </h3>
                    <p className="text-white/60">
                      {(file.size / 1024).toFixed(1)} KB - Cliquez pour changer
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-white/40 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Glissez-déposez vos fichiers ici
                    </h3>
                    <p className="text-white/60 mb-4">
                      ou cliquez pour sélectionner
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-white/50">
                      <Badge variant="outline" className="border-green-400/50 text-green-400">CSV</Badge>
                      <Badge variant="outline" className="border-blue-400/50 text-blue-400">Excel</Badge>
                      <Badge variant="outline" className="border-yellow-400/50 text-yellow-400">JSON</Badge>
                      <Badge variant="outline" className="border-red-400/50 text-red-400">PDF</Badge>
                      <Badge variant="outline" className="border-purple-400/50 text-purple-400">Word</Badge>
                      <Badge variant="outline" className="border-gray-400/50 text-gray-400">TXT/MD</Badge>
                    </div>
                  </div>
                </div>
              )}
              
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls,.json,.docx,.txt,.md,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <Card className="glass-effect border-white/20 p-4">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Formats supportés et données attendues
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="text-green-400 font-medium mb-2">Formats de fichiers:</h5>
                  <ul className="space-y-1 text-white/70">
                    <li>• CSV (virgule/point-virgule)</li>
                    <li>• Excel (.xlsx, .xls)</li>
                    <li>• JSON structuré</li>
                    <li>• Word (.docx)</li>
                    <li>• Texte (.txt, .md)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-red-400 font-medium mb-2">Colonnes requises:</h5>
                  <ul className="space-y-1 text-white/70">
                    {Object.values(requiredFields).map(field => (
                      <li key={field}>• {field}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-blue-400 font-medium mb-2">Colonnes optionnelles:</h5>
                  <ul className="space-y-1 text-white/70">
                    {Object.values(optionalFields).map(field => (
                      <li key={field}>• {field}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-[#8E44FF] border-t-transparent rounded-full mx-auto"></div>
                <p className="text-white/60 mt-2">Traitement du fichier...</p>
              </div>
            )}
          </div>
        )}

        {step === 'mapping' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Mappage des colonnes
              </h3>
              <Badge variant="outline" className="border-[#8E44FF]/50 text-[#8E44FF]">
                {importedData.length} lignes détectées
              </Badge>
            </div>

            <div className="grid gap-4">
              {Object.entries(allFields).map(([fieldKey, fieldLabel]) => {
                const isRequired = Object.keys(requiredFields).includes(fieldKey);
                const headers = importedData.length > 0 ? Object.keys(importedData[0].data) : [];
                
                return (
                  <div key={fieldKey} className="flex items-center gap-4">
                    <div className="w-1/3">
                      <Label className={`text-white ${isRequired ? 'text-red-400' : 'text-blue-400'}`}>
                        {fieldLabel} {isRequired && '*'}
                      </Label>
                    </div>
                    <div className="w-2/3">
                      <Select
                        value={columnMapping[fieldKey] || ''}
                        onValueChange={(value) => 
                          setColumnMapping(prev => ({ ...prev, [fieldKey]: value }))
                        }
                      >
                        <SelectTrigger className="bg-black/20 border-white/20 text-white">
                          <SelectValue placeholder="Sélectionner une colonne" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-white/20">
                          <SelectItem value="none">Aucune</SelectItem>
                          {headers.map(header => (
                            <SelectItem key={header} value={header}>
                              {header}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setStep('upload')} variant="outline" className="border-white/20">
                Retour
              </Button>
              <Button onClick={validateData} className="bg-[#8E44FF] hover:bg-[#8E44FF]/80">
                Valider le mappage
              </Button>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Aperçu des données
              </h3>
              <div className="flex gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {validRows} valides
                </Badge>
                {invalidRows > 0 && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {invalidRows} erreurs
                  </Badge>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {importedData.map((row, index) => (
                <Card key={row.id} className={`glass-effect p-3 ${
                  row.isValid ? 'border-green-500/30' : 'border-red-500/30'
                }`}>
                  <div className="flex items-center gap-3">
                    {row.isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    
                    <div className="flex-1">
                      <div className="text-white font-medium">
                        {row.data[columnMapping['name']] || `Ligne ${index + 1}`}
                      </div>
                      {!row.isValid && (
                        <div className="text-red-400 text-sm mt-1">
                          {row.errors.join(', ')}
                        </div>
                      )}
                    </div>
                    
                    <Badge className={row.isValid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {row.isValid ? 'Valide' : 'Erreur'}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setStep('mapping')} variant="outline" className="border-white/20">
                Retour
              </Button>
              <Button 
                onClick={handleImport} 
                className="bg-green-600 hover:bg-green-700"
                disabled={validRows === 0}
              >
                Importer {validRows} entreprise{validRows !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImportBusinessModal;