import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast.ts";
import { supabase } from "@/integrations/supabase/client.ts";
import * as XLSX from 'xlsx';

interface AhrefsDataImporterProps {
  onImportComplete: () => void;
}

interface AhrefsRecord {
  target: string;
  domain_rating: number;
  ahrefs_rank: number;
  ref_domains: number;
  total_keywords: number;
  total_traffic: number;
  ref_domains_dofollow?: number;
  total_backlinks?: number;
  score_batch?: number;
}

const AhrefsDataImporter: React.FC<AhrefsDataImporterProps> = ({ onImportComplete }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importResults, setImportResults] = useState<{
    total: number;
    successful: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "Erreur de format",
        description: "Veuillez sélectionner un fichier Excel (.xlsx ou .xls)",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    setProgress(0);
    setImportResults(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Skip header row and process data
      const records = jsonData.slice(1) as any[][];
      const total = records.length;
      let successful = 0;
      let failed = 0;
      const errors: string[] = [];

      for (let i = 0; i < records.length; i++) {
        const row = records[i];
        setProgress(((i + 1) / total) * 100);

        try {
          const ahrefsData = parseAhrefsRow(row);
          if (ahrefsData) {
            await upsertBusinessData(ahrefsData);
            successful++;
          } else {
            failed++;
            errors.push(`Ligne ${i + 2}: Données invalides`);
          }
        } catch (error) {
          failed++;
          errors.push(`Ligne ${i + 2}: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
      }

      setImportResults({ total, successful, failed, errors });
      
      toast({
        title: "Import terminé",
        description: `${successful}/${total} entreprises importées avec succès`,
        variant: successful > 0 ? "default" : "destructive",
      });

      if (successful > 0) {
        onImportComplete();
      }
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      toast({
        title: "Erreur d'import",
        description: "Une erreur est survenue lors de l'import du fichier",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const parseAhrefsRow = (row: any[]): AhrefsRecord | null => {
    if (!row || row.length < 6) return null;

    const target = row[1]?.toString().replace(/\/$/, ''); // Remove trailing slash
    const domain_rating = parseFloat(row[4]) || 0;
    const ahrefs_rank = parseInt(row[5]) || 0;
    const ref_domains = parseInt(row[7]) || 0;
    const total_keywords = parseInt(row[22]) || 0;
    const total_traffic = parseInt(row[23]) || 0;

    if (!target || target === 'NaN') return null;

    return {
      target,
      domain_rating,
      ahrefs_rank,
      ref_domains,
      total_keywords,
      total_traffic,
      ref_domains_dofollow: parseInt(row[8]) || 0,
      total_backlinks: parseInt(row[15]) || 0,
      score_batch: parseInt(row[29]) || 0,
    };
  };

  const upsertBusinessData = async (ahrefsData: AhrefsRecord) => {
    // Extract domain name from target
    const domain = ahrefsData.target.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    
    // Try to find existing business by website domain
    const { data: existingBusiness } = await supabase
      .from('businesses')
      .select('id, name, website')
      .or(`website.ilike.%${domain}%,name.ilike.%${domain.split('.')[0]}%`)
      .single();

    const updateData = {
      domain_rating: ahrefsData.domain_rating,
      ahrefs_rank: ahrefsData.ahrefs_rank,
      ref_domains: ahrefsData.ref_domains,
      total_keywords: ahrefsData.total_keywords,
      total_traffic: ahrefsData.total_traffic,
      ref_domains_dofollow: ahrefsData.ref_domains_dofollow,
      total_backlinks: ahrefsData.total_backlinks,
      score_batch: ahrefsData.score_batch,
      last_analyzed_at: new Date().toISOString(),
    };

    if (existingBusiness) {
      // Update existing business
      const { error } = await supabase
        .from('businesses')
        .update(updateData)
        .eq('id', existingBusiness.id);

      if (error) throw error;
    } else {
      // Create new business
      const businessName = domain.split('.')[0]
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      const { error } = await supabase
        .from('businesses')
        .insert({
          name: businessName,
          website: `https://${domain}`,
          city: 'Non spécifié',
          sector: 'À déterminer',
          ...updateData,
        });

      if (error) throw error;
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      ['#', 'Target', 'Mode', 'IP', 'URL Rating', 'Domain Rating', 'Ahrefs Rank', 'Domains', 'Ref domains Dofollow', 'Ref domains Governmental', 'Ref domains Educational', 'Ref IPs', 'Ref SubNets', 'Linked Domains', 'Total Backlinks', 'Backlinks Text', 'Backlinks NoFollow', 'Backlinks Redirect', 'Backlinks Image', 'Backlinks Frame', 'Backlinks Form', 'Backlinks Governmental', 'Backlinks Educational', 'Total Keywords', 'Total Traffic'],
      ['1', 'exemple.com/', 'subdomains', '127.0.0.1', '45', '34.0', '3394867', '609', '362', '0', '2', '534', '469', '107', '20411', '20040', '5613', '344', '1511', '0', '0', '0', '39', '14708', '40142']
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Ahrefs');
    XLSX.writeFile(wb, 'template_ahrefs_iluma.xlsx');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import de données Ahrefs
        </CardTitle>
        <CardDescription>
          Importez vos données d'analyse Ahrefs pour enrichir automatiquement votre base d'entreprises
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            disabled={isImporting}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Template
          </Button>
        </div>

        {isImporting && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Import en cours...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {importResults && (
          <div className="space-y-3 p-4 border rounded-lg">
            <div className="flex items-center gap-2 text-lg font-semibold">
              {importResults.successful > 0 ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              Résultats de l'import
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{importResults.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{importResults.successful}</div>
                <div className="text-sm text-muted-foreground">Réussis</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{importResults.failed}</div>
                <div className="text-sm text-muted-foreground">Échecs</div>
              </div>
            </div>

            {importResults.errors.length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-medium text-red-600">
                  Voir les erreurs ({importResults.errors.length})
                </summary>
                <div className="mt-2 text-xs text-red-500 max-h-32 overflow-y-auto">
                  {importResults.errors.map((error, index) => (
                    <div key={index} className="py-1">{error}</div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <strong>Format supporté:</strong> Fichiers Excel (.xlsx, .xls) avec la structure Ahrefs standard.
          Les données seront automatiquement associées aux entreprises existantes ou créeront de nouvelles entrées.
        </div>
      </CardContent>
    </Card>
  );
};

export default AhrefsDataImporter;