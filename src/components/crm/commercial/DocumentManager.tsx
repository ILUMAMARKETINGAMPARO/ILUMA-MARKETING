import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Upload, 
  Download, 
  FileText, 
  Image, 
  File,
  Trash2,
  Eye,
  X
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';

interface DocumentManagerProps {
  clientId?: string;
  onDocumentUploaded?: (document: any) => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  url?: string;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({ clientId, onDocumentUploaded }) => {
  const { user, addJournalEntry } = useCRM();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Contrat_RestaurantLaBelleEpoque.pdf',
      type: 'application/pdf',
      size: 2456789,
      uploadedAt: new Date('2024-01-15'),
      uploadedBy: 'sergio'
    },
    {
      id: '2',
      name: 'Rapport_SEO_Janvier2024.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: 1234567,
      uploadedAt: new Date('2024-01-20'),
      uploadedBy: 'andrea'
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-5 h-5 text-blue-400" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-400" />;
    return <File className="w-5 h-5 text-white/60" />;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFiles(files);
      setShowUploadModal(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      setShowUploadModal(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const newDoc: Document = {
        id: `doc_${Date.now()}_${i}`,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date(),
        uploadedBy: user?.name || 'system'
      };

      setDocuments(prev => [...prev, newDoc]);
      
      if (onDocumentUploaded) {
        onDocumentUploaded(newDoc);
      }

      // Add journal entry
      await addJournalEntry({
        type: 'success',
        title: 'Document uploadé',
        content: `${file.name} ajouté au dossier client`,
        relatedTo: { type: 'client', id: clientId || 'system' },
        author: user?.name || 'System',
        aiGenerated: false
      });
    }

    setSelectedFiles(null);
    setShowUploadModal(false);
  };

  const handleDownload = (doc: Document) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = doc.name;
    link.click();
  };

  const handleDelete = async (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    setDocuments(prev => prev.filter(d => d.id !== docId));
    
    if (doc) {
      await addJournalEntry({
        type: 'update',
        title: 'Document supprimé',
        content: `${doc.name} retiré du dossier`,
        relatedTo: { type: 'client', id: clientId || 'system' },
        author: user?.name || 'System',
        aiGenerated: false
      });
    }
  };

  const exportAllDocuments = async () => {
    // Simulate export
    await addJournalEntry({
      type: 'success',
      title: 'Export de documents',
      content: `${documents.length} documents exportés en ZIP`,
      relatedTo: { type: 'client', id: clientId || 'system' },
      author: user?.name || 'System',
      aiGenerated: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white font-['Montserrat']">
          Gestionnaire de Documents
        </h3>
        <div className="flex gap-2">
          <Button
            onClick={exportAllDocuments}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter Tout
          </Button>
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black"
          >
            <Upload className="w-4 h-4 mr-2" />
            Importer
          </Button>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass-effect border-2 border-dashed p-8 text-center transition-colors ${
          dragOver ? 'border-[#FFD56B]/50 bg-[#FFD56B]/10' : 'border-white/20'
        }`}
      >
        <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <p className="text-white/80 mb-2">Glissez-déposez vos fichiers ici</p>
        <p className="text-white/60 text-sm mb-4">ou cliquez pour sélectionner</p>
        <Input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <Button
          onClick={() => document.getElementById('file-upload')?.click()}
          variant="outline"
          className="border-white/20 text-white"
        >
          Choisir des fichiers
        </Button>
      </Card>

      {/* Documents List */}
      <div className="grid gap-4">
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-effect border-white/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(doc.type)}
                  <div>
                    <h4 className="font-medium text-white">{doc.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span>{formatFileSize(doc.size)}</span>
                      <span>Par {doc.uploadedBy}</span>
                      <span>{doc.uploadedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {doc.type.split('/')[1]?.toUpperCase() || 'FILE'}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(doc)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(doc)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(doc.id)}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#FFD56B] font-['Montserrat']">
              Confirmer l'upload
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedFiles && (
              <div className="space-y-2">
                <p className="text-white/80">Fichiers sélectionnés :</p>
                {Array.from(selectedFiles).map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded">
                    <span className="text-sm text-white">{file.name}</span>
                    <span className="text-xs text-white/60">{formatFileSize(file.size)}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpload} className="flex-1 bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black">
                Confirmer Upload
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowUploadModal(false)}
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

export default DocumentManager;