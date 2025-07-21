import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  FileText, 
  Plus, 
  Bot, 
  User, 
  Calendar,
  Hash,
  Target,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Note {
  id: string;
  title: string;
  content: string;
  author: string;
  authorName: string;
  businessId?: string;
  businessName?: string;
  tags: string[];
  aiSuggestions?: string[];
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
}

const CollaborativeNotes: React.FC = () => {
  const { user, profile } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: '',
    priority: 'medium' as const
  });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Mock data pour démonstration
  useEffect(() => {
    const mockNotes: Note[] = [
      {
        id: '1',
        title: 'Opportunité Restaurant Le Gourmet',
        content: 'Excellent potentiel pour amélioration SEO. Pas de site web optimisé, seulement 45 avis Google. Concurrent principal: Chez Marie (Score ILA 78). Recommandation: Focus sur GMB et création contenu local.',
        author: user?.id || 'user1',
        authorName: profile?.first_name || 'Employé',
        businessId: 'rest-001',
        businessName: 'Restaurant Le Gourmet',
        tags: ['restaurant', 'seo', 'opportunité'],
        aiSuggestions: [
          'Proposer audit SEO complet',
          'Créer stratégie Google My Business',
          'Développer contenu culinaire local'
        ],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        priority: 'high'
      },
      {
        id: '2',
        title: 'Suivi Salon Beauté Éclat',
        content: 'Première approche positive. Propriétaire intéressée par package complet (site + SEO + pub). Budget estimé: 8-12k. RDV programmé jeudi 14h.',
        author: user?.id || 'user2',
        authorName: 'Collègue',
        businessId: 'salon-002',
        businessName: 'Salon Beauté Éclat',
        tags: ['beauté', 'rdv-programmé', 'budget-élevé'],
        aiSuggestions: [
          'Préparer présentation cas similaires',
          'Calculer ROI personnalisé',
          'Proposer phase test 3 mois'
        ],
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-14'),
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Analyse Concurrence Secteur Automobile',
        content: 'Mappage complet des concessionnaires Laval. Top performer: Honda Laval (Score ILA 89). Opportunités identifiées: 3 concessions avec scores <50. Focus sur Hyundai Centropolis.',
        author: user?.id || 'user1',
        authorName: profile?.first_name || 'Employé',
        businessId: 'auto-003',
        businessName: 'Secteur Automobile Laval',
        tags: ['automobile', 'analyse-marché', 'laval'],
        aiSuggestions: [
          'Créer rapport détaillé par concessionnaire',
          'Analyser stratégies digitales des leaders',
          'Identifier angles d\'approche par marque'
        ],
        createdAt: new Date('2024-01-13'),
        updatedAt: new Date('2024-01-13'),
        priority: 'low'
      }
    ];
    setNotes(mockNotes);
  }, [user, profile]);

  const handleCreateNote = () => {
    if (!newNote.title || !newNote.content) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      author: user?.id || 'unknown',
      authorName: profile?.first_name || user?.email?.split('@')[0] || 'Employé',
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      aiSuggestions: [
        'Analyser le potentiel de conversion',
        'Identifier les points de contact optimaux',
        'Créer un plan d\'action personnalisé'
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: newNote.priority
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '', tags: '', priority: 'medium' });
    setIsCreating(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return 'Moyenne';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header avec bouton création */}
      <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#8E44FF]" />
              Notes Collaboratives IA
            </CardTitle>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Note
            </Button>
          </div>
          <p className="text-white/60">
            Partagez vos observations et recevez des suggestions IA personnalisées
          </p>
        </CardHeader>
      </Card>

      {/* Formulaire de création */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Créer une nouvelle note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Titre de la note..."
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Détails, observations, recommandations..."
                  value={newNote.content}
                  onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Tags (séparés par virgules)"
                  value={newNote.tags}
                  onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
                
                <select
                  value={newNote.priority}
                  onChange={(e) => setNewNote(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="bg-white/5 border border-white/20 text-white rounded-md px-3 py-2"
                >
                  <option value="low">Priorité Basse</option>
                  <option value="medium">Priorité Moyenne</option>
                  <option value="high">Priorité Haute</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleCreateNote} className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white">
                  Créer la note
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreating(false)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Liste des notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setSelectedNote(note)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2">{note.title}</CardTitle>
                    {note.businessName && (
                      <p className="text-[#8E44FF] text-sm">🏢 {note.businessName}</p>
                    )}
                  </div>
                  <Badge className={getPriorityColor(note.priority)}>
                    {getPriorityLabel(note.priority)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-white/80 text-sm line-clamp-3">{note.content}</p>
                
                {/* Tags */}
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 text-xs">
                        <Hash className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {/* Suggestions IA */}
                {note.aiSuggestions && note.aiSuggestions.length > 0 && (
                  <div className="bg-[#8E44FF]/10 border border-[#8E44FF]/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-[#8E44FF]" />
                      <span className="text-[#8E44FF] text-xs font-medium">Suggestions IA</span>
                    </div>
                    <ul className="space-y-1">
                      {note.aiSuggestions.slice(0, 2).map((suggestion, idx) => (
                        <li key={idx} className="text-white/70 text-xs flex items-start gap-2">
                          <Target className="w-3 h-3 mt-0.5 text-[#FFD56B]" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-[#8E44FF] text-white text-xs">
                        {note.authorName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white/60 text-xs">{note.authorName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Calendar className="w-3 h-3" />
                    {note.createdAt.toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {notes.length === 0 && (
        <Card className="bg-black/40 border-[#8E44FF]/30 backdrop-blur-xl">
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">
              Aucune note collaborative pour le moment.
            </p>
            <p className="text-white/40 text-sm mt-2">
              Créez votre première note pour commencer à collaborer !
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CollaborativeNotes;