import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  BookOpen, 
  User, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Target, 
  ChevronRight, 
  Plus,
  Calendar,
  Users,
  Activity,
  History,
  Save
} from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';
import { useCRM } from '@/contexts/CRMContext';
import { useSave } from '@/contexts/SaveContext';
import { useToast } from '@/hooks/use-toast.ts';
import SaveButton from '@/components/ui/save-button';
import SaveHistoryPanel from '../components/SaveHistoryPanel';

interface ProjectsSectionProps {
  selectedProjects: string[];
  setSelectedProjects: (selected: string[]) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  selectedProjects,
  setSelectedProjects
}) => {
  const { projects, createProject, updateProject, deleteProject, getProjectsByStatus } = useProject();
  const { clients, team } = useCRM();
  const { saveProjet } = useSave();
  const { toast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'active' | 'completed'>('all');
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);

  const [projectForm, setProjectForm] = useState({
    name: '',
    clientId: '',
    clientName: '',
    assignedTo: [] as string[],
    status: 'planning' as 'planning' | 'active' | 'review' | 'completed' | 'paused',
    priority: 'medium' as 'low' | 'medium' | 'high',
    startDate: '',
    dueDate: '',
    progress: 0,
    revenue: 0,
    estimatedRevenue: 0,
    description: '',
    tasks: [] as string[],
    meetings: [] as string[],
    tags: [] as string[]
  });

  const resetForm = () => {
    setProjectForm({
      name: '',
      clientId: '',
      clientName: '',
      assignedTo: [],
      status: 'planning',
      priority: 'medium',
      startDate: '',
      dueDate: '',
      progress: 0,
      revenue: 0,
      estimatedRevenue: 0,
      description: '',
      tasks: [],
      meetings: [],
      tags: []
    });
  };

  const handleSubmit = () => {
    if (!projectForm.name || !projectForm.clientName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    createProject(projectForm);
    
    toast({
      title: "Projet créé",
      description: `Le projet "${projectForm.name}" a été créé avec succès`,
      variant: "default"
    });

    resetForm();
    setShowAddModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'active': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'review': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'paused': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const handleToggleSelection = (projectId: string) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const handleDeleteSelected = () => {
    selectedProjects.forEach(id => deleteProject(id));
    setSelectedProjects([]);
    toast({
      title: "Projets supprimés",
      description: `${selectedProjects.length} projet(s) supprimé(s)`,
      variant: "default"
    });
  };

  const filteredProjects = viewMode === 'all' ? projects :
                          viewMode === 'active' ? getProjectsByStatus('active') :
                          getProjectsByStatus('completed');

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Aucun projet en cours</h3>
        <p className="text-white/60 mb-6">Créez votre premier projet pour commencer</p>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-[#8E44FF] to-[#8E44FF]/80 hover:from-[#8E44FF]/90 hover:to-[#8E44FF]/70 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Projet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-white">
            Projets ({projects.length})
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewMode === 'all' ? 'default' : 'outline'}
              onClick={() => setViewMode('all')}
              className={viewMode === 'all' ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white'}
            >
              Tous
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'active' ? 'default' : 'outline'}
              onClick={() => setViewMode('active')}
              className={viewMode === 'active' ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white'}
            >
              Actifs ({getProjectsByStatus('active').length})
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'completed' ? 'default' : 'outline'}
              onClick={() => setViewMode('completed')}
              className={viewMode === 'completed' ? 'bg-[#8E44FF] text-white' : 'border-white/20 text-white'}
            >
              Terminés ({getProjectsByStatus('completed').length})
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowHistoryPanel(true)}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <History className="w-4 h-4 mr-2" />
            Historique
          </Button>
          {selectedProjects.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleDeleteSelected}
              className="border-red-500 text-red-500 hover:bg-red-500/10"
            >
              Supprimer ({selectedProjects.length})
            </Button>
          )}
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-[#8E44FF] to-[#8E44FF]/80 hover:from-[#8E44FF]/90 hover:to-[#8E44FF]/70 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Projet
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{getProjectsByStatus('active').length}</div>
              <div className="text-xs text-white/60">Actifs</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{getProjectsByStatus('completed').length}</div>
              <div className="text-xs text-white/60">Terminés</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {projects.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}$
              </div>
              <div className="text-xs text-white/60">Revenus</div>
            </div>
          </div>
        </Card>
        
        <Card className="glass-effect border-white/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
              </div>
              <div className="text-xs text-white/60">Progression moy.</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Liste des projets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-all h-full ${
              selectedProjects.includes(project.id) ? 'ring-2 ring-[#8E44FF]/50 bg-[#8E44FF]/10' : ''
            }`}>
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedProjects.includes(project.id)}
                  onCheckedChange={() => handleToggleSelection(project.id)}
                  className="mt-1"
                />
                
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {project.name}
                        </h4>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status === 'planning' ? 'Planification' :
                             project.status === 'active' ? 'En cours' :
                             project.status === 'review' ? 'En révision' :
                             project.status === 'completed' ? 'Terminé' : 'En pause'}
                          </Badge>
                          <Badge className={getPriorityColor(project.priority)}>
                            {project.priority === 'high' ? 'Haute' :
                             project.priority === 'medium' ? 'Moyenne' : 'Faible'}
                          </Badge>
                        </div>
                      </div>
                      <SaveButton
                        data={project}
                        type="projet"
                        context={`project_${project.id}`}
                        description={`Projet: ${project.name}`}
                        variant="compact"
                      />
                    </div>
                  
                  <p className="text-white/70 mb-4 text-sm">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-white/60">Progression</span>
                        <span className="text-white font-semibold">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <User className="w-4 h-4" />
                        <span>{project.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <DollarSign className="w-4 h-4" />
                        <span>{project.revenue.toLocaleString()}$ / {project.estimatedRevenue.toLocaleString()}$</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.dueDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Users className="w-4 h-4" />
                        <span>{project.assignedTo.length} assigné(s)</span>
                      </div>
                    </div>
                    
                    {project.assignedTo.length > 0 && (
                      <div className="flex -space-x-2">
                        {project.assignedTo.slice(0, 3).map((member, index) => (
                          <div 
                            key={index}
                            className="w-8 h-8 rounded-full bg-[#8E44FF]/20 border-2 border-black flex items-center justify-center text-xs font-bold text-[#8E44FF]"
                          >
                            {member.charAt(0)}
                          </div>
                        ))}
                        {project.assignedTo.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-black flex items-center justify-center text-xs font-bold text-white">
                            +{project.assignedTo.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal Ajout Projet */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#8E44FF] font-['Montserrat'] text-xl flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Créer un nouveau projet
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Configurez les détails de votre nouveau projet
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-[#FFD56B] font-semibold">Informations de base</h3>
              
              <div>
                <Label htmlFor="project-name" className="text-white/80">Nom du projet *</Label>
                <Input
                  id="project-name"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                  className="bg-black/20 border-white/20 text-white"
                  placeholder="Ex: Site Web Restaurant La Table"
                />
              </div>

              <div>
                <Label htmlFor="project-description" className="text-white/80">Description</Label>
                <Textarea
                  id="project-description"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  className="bg-black/20 border-white/20 text-white h-20"
                  placeholder="Description détaillée du projet..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#FFD56B] font-semibold">Client et équipe</h3>
              
              <div>
                <Label htmlFor="project-client" className="text-white/80">Client *</Label>
                <Select value={projectForm.clientName} onValueChange={(value) => {
                  const client = clients.find(c => c.name === value);
                  setProjectForm({
                    ...projectForm, 
                    clientName: value,
                    clientId: client?.id || ''
                  });
                }}>
                  <SelectTrigger className="bg-black/20 border-white/20 text-white">
                    <SelectValue placeholder="Choisir un client" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20 z-50">
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.name} className="text-white hover:bg-white/10">
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#FFD56B] font-semibold">Planification</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project-start" className="text-white/80">Date de début</Label>
                  <Input
                    id="project-start"
                    type="date"
                    value={projectForm.startDate}
                    onChange={(e) => setProjectForm({...projectForm, startDate: e.target.value})}
                    className="bg-black/20 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="project-due" className="text-white/80">Date d'échéance</Label>
                  <Input
                    id="project-due"
                    type="date"
                    value={projectForm.dueDate}
                    onChange={(e) => setProjectForm({...projectForm, dueDate: e.target.value})}
                    className="bg-black/20 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project-status" className="text-white/80">Statut</Label>
                  <Select value={projectForm.status} onValueChange={(value: any) => setProjectForm({...projectForm, status: value})}>
                    <SelectTrigger className="bg-black/20 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 z-50">
                      <SelectItem value="planning" className="text-white hover:bg-white/10">Planification</SelectItem>
                      <SelectItem value="active" className="text-white hover:bg-white/10">En cours</SelectItem>
                      <SelectItem value="review" className="text-white hover:bg-white/10">En révision</SelectItem>
                      <SelectItem value="completed" className="text-white hover:bg-white/10">Terminé</SelectItem>
                      <SelectItem value="paused" className="text-white hover:bg-white/10">En pause</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="project-priority" className="text-white/80">Priorité</Label>
                  <Select value={projectForm.priority} onValueChange={(value: any) => setProjectForm({...projectForm, priority: value})}>
                    <SelectTrigger className="bg-black/20 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 z-50">
                      <SelectItem value="low" className="text-white hover:bg-white/10">🟢 Faible</SelectItem>
                      <SelectItem value="medium" className="text-white hover:bg-white/10">🟡 Moyenne</SelectItem>
                      <SelectItem value="high" className="text-white hover:bg-white/10">🔴 Élevée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project-revenue" className="text-white/80">Revenus actuels ($)</Label>
                  <Input
                    id="project-revenue"
                    type="number"
                    value={projectForm.revenue}
                    onChange={(e) => setProjectForm({...projectForm, revenue: parseInt(e.target.value) || 0})}
                    className="bg-black/20 border-white/20 text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="project-estimated" className="text-white/80">Revenus estimés ($)</Label>
                  <Input
                    id="project-estimated"
                    type="number"
                    value={projectForm.estimatedRevenue}
                    onChange={(e) => setProjectForm({...projectForm, estimatedRevenue: parseInt(e.target.value) || 0})}
                    className="bg-black/20 border-white/20 text-white"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <Button onClick={handleSubmit} className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white">
                Créer le projet
              </Button>
              <Button variant="outline" onClick={() => setShowAddModal(false)} className="border-white/20 text-white hover:bg-white/10">
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Panneau d'historique */}
      <SaveHistoryPanel
        isOpen={showHistoryPanel}
        onClose={() => setShowHistoryPanel(false)}
      />
    </div>
  );
};

export default ProjectsSection;