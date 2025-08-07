import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import * as XLSX from 'xlsx';

interface ExcelBusinessImporterProps {
  onImportComplete: () => void;
}

const ExcelBusinessImporter: React.FC<ExcelBusinessImporterProps> = ({ onImportComplete }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [importResults, setImportResults] = useState<{
    total: number;
    successful: number;
    failed: number;
    geocoded: number;
    errors: string[];
  } | null>(null);
  const { toast } = useToast();

  const processFile = async (file: File) => {
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "Erreur de format",
        description: "Veuillez sélectionner un fichier Excel (.xlsx ou .xls)",
        variant: "destructive",
      });
      return;
    }

    await importData(file);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      await processFile(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const importData = async (file: File) => {

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
      setCurrentStep('Lecture du fichier Excel...');
      const fileData = await file.arrayBuffer();
      const workbook = XLSX.read(fileData, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convertir en JSON avec la première ligne comme en-têtes
      const rawData = XLSX.utils.sheet_to_json(worksheet) as any[];
      
      if (rawData.length === 0) {
        throw new Error('Le fichier Excel est vide');
      }

      setCurrentStep('Traitement des données...');
      setProgress(10);

      // Filtrer les données valides - ajout de 'Nom de l'entreprise'
      const validData = rawData.filter(row => 
        row['Nom de l\'entreprise'] || row.Entreprise || row.entreprise || row.Name || row.name || row.Nom
      );

      const total = validData.length;
      let successful = 0;
      let failed = 0;
      let geocoded = 0;
      const errors: string[] = [];

      setCurrentStep('Import et géocodage des entreprises...');

      // Préparer les données pour l'insertion en batch avec géocodage
      const businessesToInsert = [];
      
      for (let i = 0; i < validData.length; i++) {
        const row = validData[i];
        setProgress(10 + ((i + 1) / total) * 80);
        setCurrentStep(`Géocodage ${i + 1}/${total}: ${row.Entreprise || row.entreprise || row.Name || row.name || row.Nom}`);

        let lat = null;
        let lng = null;
        
        // Tentative de géocodage de l'adresse
        const address = row.Adresse || row.adresse || row.Address || row.address;
        const city = row.Ville || row.ville || row.City || row.city;
        const province = row.Province || row.province || row.State || row.state || 'QC';
        const country = row.Pays || row.pays || row.Country || row.country || 'Canada';

        if (address && city) {
          try {
            const fullAddress = `${address}, ${city}, ${province}, ${country}`;
            const response = await fetch(`https://tgtoykxksohyalgifcdi.supabase.co/functions/v1/revalviews-mapbox`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndG95a3hrc29oeWFsZ2lmY2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzA3OTQsImV4cCI6MjA2NzU0Njc5NH0.lZLZ2WRdrrvTEQQWI9uZsWb6qOw2R92B3WZGZKEdlf0`
              },
              body: JSON.stringify({
                action: 'geocode_address',
                data: { address: fullAddress }
              })
            });
            
            if (response.ok) {
              const result = await response.json();
              if (result.success && result.data) {
                lat = result.data.lat;
                lng = result.data.lng;
                geocoded++;
              }
            }
          } catch (error) {
            console.warn(`Erreur géocodage pour ${row.Entreprise || row.entreprise}:`, error);
          }
        }

        // Extraction des données avec toutes les colonnes possibles
        const business = {
          // Informations de base
          name: row['Nom de l\'entreprise'] || row.Entreprise || row.entreprise || row.Name || row.name || row.Nom || 'Nom inconnu',
          address: row['Adresse complète'] || address || null,
          city: city || 'Non spécifiée', 
          province: province,
          country: country,
          phone: row['Téléphone'] || row.Téléphone || row.telephone || row.Phone || row.phone || null,
          website: row['Site web'] || row.Site_web || row.site_web || row.Website || row.website || null,
          sector: row['Industrie'] || row.Secteur || row.secteur || row.Sector || row.sector || 'Non spécifié',
          
          // Email et contact
          contact_person_email: row['Email adress'] || row.Email || row.email || null,
          
          // Position géographique
          lat,
          lng,
          
          // Métriques Google
          google_rating: parseFloat(row['⭐ Étoiles Google'] || row.Note_Google || row.note_google || row.Google_Rating || 0) || null,
          review_count: parseInt(row['Nb d\'avis Google'] || row.Nombre_Avis || row.nombre_avis || row.Review_Count || 0) || 0,
          
          // Métriques réseaux sociaux
          // Ces données seront stockées dans les métadonnées pour analyse future
          
          // Métriques SEO/Ahrefs (si disponibles)
          domain_rating: parseFloat(row['Domain Rating'] || row.domain_rating || row.DR || 0) || null,
          ahrefs_rank: parseInt(row['Ahrefs Rank'] || row.ahrefs_rank || 0) || null,
          total_keywords: parseInt(row['Total Keywords'] || row.total_keywords || row.Keywords || 0) || 0,
          total_traffic: parseInt(row['Total Traffic'] || row.total_traffic || row.Traffic || 0) || 0,
          ref_domains: parseInt(row['Ref Domains'] || row.ref_domains || row.Domains || 0) || 0,
          total_backlinks: parseInt(row['Total Backlinks'] || row.total_backlinks || row.Backlinks || 0) || 0,
          organic_traffic: parseInt(row['Organic Traffic'] || row.organic_traffic || 0) || 0,
          
          // Informations sur la chaîne
          is_chain: parseInt(row['Nb de succursales'] || row.Succursales || 0) > 1,
          
          // Scores calculés (si disponibles)
          ila_score: parseInt(row.Score_ILA || row.score_ila || row.ILA_Score || 0) || 0,
          seo_score: parseInt(row.Score_SEO || row.score_seo || row.SEO_Score || 0) || 0,
          contenu_score: parseInt(row.Score_Contenu || row.score_contenu || row.Content_Score || 0) || 0,
          presence_physique_score: parseInt(row.Score_Présence_Physique || row.score_presence_physique || row.Physical_Presence_Score || 0) || 0,
          reputation_score: parseInt(row.Score_Réputation || row.score_reputation || row.Reputation_Score || 0) || 0,
          position_score: parseInt(row.Score_Position || row.score_position || row.Position_Score || 0) || 0,
          
          // Statut et potentiel
          status: 'prospect' as const,
          potential: (parseFloat(row['⭐ Étoiles Google'] || 0) >= 4.5 && parseInt(row['Nb d\'avis Google'] || 0) > 20) ? 'high' as const : 'medium' as const,
          source: 'excel_import' as const,
          
          // Photos et métadonnées
          has_photos: true, // Assumé pour les entreprises avec présence Google
        };

        businessesToInsert.push(business);

        // Pause pour éviter de surcharger l'API
        if (i % 5 === 0 && i > 0) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      setCurrentStep('Insertion en base de données...');
      setProgress(90);

      // Insertion en batch
      const { data: insertedData, error } = await supabase
        .from('businesses')
        .insert(businessesToInsert)
        .select();

      if (error) {
        throw error;
      }

      successful = insertedData?.length || 0;
      setProgress(100);
      setCurrentStep('Import terminé !');

      setImportResults({ total, successful, failed, geocoded, errors });
      
      toast({
        title: "Import terminé avec succès !",
        description: `${successful} entreprises importées, ${geocoded} adresses géocodées`,
        variant: "default",
      });

      onImportComplete();
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      toast({
        title: "Erreur d'import",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'import du fichier",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      setCurrentStep('');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import Excel Complet
        </CardTitle>
        <CardDescription>
          Importez votre fichier Excel avec géocodage automatique pour affichage sur la carte RivalViews™
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Zone de glisser-déposer */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
            ${isDragOver 
              ? 'border-[#8E44FF] bg-[#8E44FF]/10 scale-105' 
              : 'border-white/20 hover:border-[#8E44FF]/50'
            }
            ${isImporting ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full transition-colors ${isDragOver ? 'bg-[#8E44FF]/20' : 'bg-white/10'}`}>
              <Upload className={`h-8 w-8 transition-colors ${isDragOver ? 'text-[#8E44FF]' : 'text-white/60'}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {isDragOver ? 'Déposez votre fichier Excel ici' : 'Glissez-déposez votre document Excel'}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                ou cliquez pour sélectionner un fichier (.xlsx, .xls)
              </p>
              <Input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={isImporting}
                className="max-w-xs mx-auto"
              />
            </div>
          </div>
        </div>

        {isImporting && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#8E44FF]" />
                {currentStep}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {importResults && (
          <div className="space-y-3 p-4 border rounded-lg bg-gradient-to-br from-black/40 to-[#8E44FF]/10">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              {importResults.successful > 0 ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              Résultats de l'import
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{importResults.total}</div>
                <div className="text-sm text-white/60">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{importResults.successful}</div>
                <div className="text-sm text-white/60">Importées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#8E44FF]">{importResults.geocoded}</div>
                <div className="text-sm text-white/60">Géocodées</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{importResults.failed}</div>
                <div className="text-sm text-white/60">Échecs</div>
              </div>
            </div>

            {importResults.errors.length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-medium text-red-400">
                  Voir les erreurs ({importResults.errors.length})
                </summary>
                <div className="mt-2 text-xs text-red-300 max-h-32 overflow-y-auto">
                  {importResults.errors.map((error, index) => (
                    <div key={index} className="py-1">{error}</div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}

        <div className="text-xs text-white/60 bg-black/20 p-3 rounded border">
          <div className="font-medium text-white mb-2">Colonnes supportées (détection automatique) :</div>
          <div className="grid grid-cols-2 gap-2">
            <div>• Entreprise/Name/Nom</div>
            <div>• Adresse/Address</div>
            <div>• Ville/City</div>
            <div>• Province/State</div>
            <div>• Secteur/Sector</div>
            <div>• Site_web/Website</div>
            <div>• Téléphone/Phone</div>
            <div>• Scores ILA, SEO, etc.</div>
          </div>
          <div className="mt-2 text-[#8E44FF]">
            💡 Les adresses seront automatiquement géocodées pour apparaître sur la carte !
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelBusinessImporter;