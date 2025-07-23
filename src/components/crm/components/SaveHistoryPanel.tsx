import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  History, 
  Undo2, 
  Download, 
  Search, 
  Filter, 
  Trash2, 
  Clock,
  User,
  FileText,
  Users,
  Calendar,
  BookOpen,
  StickyNote,
  Briefcase,
  CheckSquare
} from 'lucide-react';
import { useSave } from '@/contexts/SaveContext';
import { SaveAction } from '@/types/save.ts';

interface SaveHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SaveHistoryPanel: React.FC<SaveHistoryPanelProps> = ({ isOpen, onClose }) => {
  const { history, getHistory, undoAction, clearHistory, exportData } = useSave();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterAuthor, setFilterAuthor] = useState<string>('all');

  // Filtrage des actions
  const filteredHistory = getHistory().filter(action => {
    const matchesSearch = action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || action.type === filterType;
    const matchesAuthor = filterAuthor === 'all' || action.author === filterAuthor;
    
    return matchesSearch && matchesType && matchesAuthor;
  });

  // Liste des auteurs uniques
  const authors = [...new Set(history.map(action => action.author))];

  const getTypeIcon = (type: SaveAction['type']) => {
    switch (type) {
      case 'collaborateur': return <Users className="w-4 h-4" />;
      case 'commercial': return <Briefcase className="w-4 h-4" />;
      case 'reunion': return <Calendar className="w-4 h-4" />;
      case 'projet': return <BookOpen className="w-4 h-4" />;
      case 'note': return <StickyNote className="w-4 h-4" />;
      case 'client': return <User className="w-4 h-4" />;
      case 'tache': return <CheckSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: SaveAction['action']) => {
    switch (action) {
      case 'create': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'update': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'delete': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleExport = async () => {
    try {
      const exportedData = await exportData(
        filterType !== 'all' ? filterType as SaveAction['type'] : undefined
      );
      
      const blob = new Blob([exportedData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `save-history-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur d\'export:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl max-h-[90vh] bg-black/90 border border-white/20 rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <History className="w-6 h-6 text-[#8E44FF]" />
                <h2 className="text-xl font-bold text-white font-['Montserrat']">
                  Historique des Sauvegardes
                </h2>
                <Badge variant="outline" className="text-white/60">
                  {filteredHistory.length} action(s)
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleExport}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearHistory}
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Effacer tout
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onClose}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Fermer
                </Button>
              </div>
            </div>

            {/* Filtres */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/20 border-white/20 text-white"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="collaborateur">Collaborateurs</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="reunion">Réunions</SelectItem>
                  <SelectItem value="projet">Projets</SelectItem>
                  <SelectItem value="note">Notes</SelectItem>
                  <SelectItem value="client">Clients</SelectItem>
                  <SelectItem value="tache">Tâches</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAuthor} onValueChange={setFilterAuthor}>
                <SelectTrigger className="bg-black/20 border-white/20 text-white">
                  <SelectValue placeholder="Filtrer par auteur" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="all">Tous les auteurs</SelectItem>
                  {authors.map(author => (
                    <SelectItem key={author} value={author}>{author}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Liste des actions */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Aucune action trouvée</h3>
                <p className="text-white/60">Ajustez vos filtres ou effectuez des sauvegardes</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredHistory.map((action) => (
                  <motion.div
                    key={action.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="glass-effect border-white/20 p-4 hover:border-[#8E44FF]/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#8E44FF]/20 flex items-center justify-center">
                            {getTypeIcon(action.type)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-semibold font-['Montserrat']">
                                {action.description}
                              </h4>
                              <Badge className={getActionColor(action.action)}>
                                {action.action === 'create' ? 'Créé' :
                                 action.action === 'update' ? 'Modifié' : 'Supprimé'}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-white/60">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{action.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{action.timestamp.toLocaleString('fr-FR')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {action.action !== 'delete' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => undoAction(action.id)}
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            <Undo2 className="w-4 h-4 mr-1" />
                            Annuler
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SaveHistoryPanel;