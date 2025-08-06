import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Users, 
  CheckSquare, 
  Calendar,
  BookOpen,
  ArrowLeft,
  Plus,
  User,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Settings,
  MapPin,
  Phone,
  Mail,
  Save,
  Database
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { useMeeting } from '@/contexts/MeetingContext';
import { useProject } from '@/contexts/ProjectContext';
import { useSave } from '@/contexts/SaveContext';
import { getCollaboratorColor, collaboratorColors } from '@/utils/collaboratorColors';
import TasksModule from './modules/TasksModule';
import CalendarView from './views/CalendarView';
import ProjectsModule from './modules/ProjectsModule';
import ActionMenuButton from './foundation/ActionMenuButton';
import SectionWrapper from './foundation/SectionWrapper';
import EditTeamMemberModal from './modals/EditTeamMemberModal';
import EditTaskModal from './modals/EditTaskModal';
import EditMeetingModal from './modals/EditMeetingModal';
import EditProjectModal from './modals/EditProjectModal';
import MeetingsSection from './sections/MeetingsSection';
import ProjectsSection from './sections/ProjectsSection';
import LiloIntegration from '../lilo/LiloIntegration';
import SaveButton from '@/components/ui/save-button';
import SaveHistoryPanel from './components/SaveHistoryPanel';
import useAutoSave from '@/hooks/useAutoSave';
import SaveIndicator from '@/components/ui/save-indicator';
import DataPersistenceManager from './components/DataPersistenceManager';

interface CRMCollaborateurDashboardProps {
  onBack: () => void;
}

const CRMCollaborateurDashboard: React.FC<CRMCollaborateurDashboardProps> = ({ onBack }) => {
  const { user, team, tasks, addTask, setTeam, clients, addTeamMember } = useCRM();
  const { meetings } = useMeeting();
  const { projects } = useProject();
  const { saveCollaborator, saveTache } = useSave();
  const [activeTab, setActiveTab] = useState('equipe');
  
  // Auto-sauvegarde pour l'équipe
  const teamAutoSave = useAutoSave({
    data: team,
    type: 'collaborateur',
    context: 'team_data',
    description: 'Données d\'équipe',
    interval: 3 * 60 * 1000, // 3 minutes
    dependencies: [team]
  });

  // Auto-sauvegarde pour les tâches
  const tasksAutoSave = useAutoSave({
    data: tasks,
    type: 'tache',
    context: 'tasks_data',
    description: 'Tâches collaborateur',
    interval: 3 * 60 * 1000,
    dependencies: [tasks]
  });
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [draggedMember, setDraggedMember] = useState<string | null>(null);
  
  // Selection states
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedMeetings, setSelectedMeetings] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);

  // Form states
  const [teamForm, setTeamForm] = useState({
    name: '',
    email: '',
    role: 'Assistant' as 'CEO' | 'COO' | 'PM' | 'SEO' | 'Dev' | 'Assistant' | 'admin' | 'readonly',
    permissions: [] as string[]
  });
  
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: '',
    dueDate: '',
    status: 'todo'
  });

  const [meetingForm, setMeetingForm] = useState({
    title: '',
    date: '',
    time: '',
    client: '',
    type: 'meeting',
    assignedTo: '',
    priority: 'medium',
    description: ''
  });

  const [projectForm, setProjectForm] = useState({
    name: '',
    client: '',
    assignedTo: '',
    status: 'planning',
    priority: 'medium',
    startDate: '',
    dueDate: '',
    progress: 0,
    revenue: 0,
    description: ''
  });

  const handleAddTeamMember = async () => {
    if (!teamForm.name || !teamForm.email) return;
    
    try {
      const memberData = {
        name: teamForm.name,
        email: teamForm.email,
        role: teamForm.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${teamForm.name}`,
        permissions: teamForm.permissions
      };
      
      // Utilisation de la méthode CRM avec vérification
      const savedMember = await addTeamMember(memberData);
      
      // Double sauvegarde pour le contexte Save
      await saveCollaborator(savedMember, `collaborator_${savedMember.id}`);
      
      // Reset form et fermeture modal seulement si succès
      setTeamForm({ name: '', email: '', role: 'Assistant', permissions: [] });
      setShowAddTeamModal(false);
      
    } catch (error) {
      console.error('Erreur sauvegarde collaborateur:', error);
      // Le message d'erreur sera géré par le contexte Save
    }
  };

  const handleAddTask = async () => {
    if (!taskForm.title) return;
    
    const newTask = {
      title: taskForm.title,
      description: taskForm.description,
      status: 'todo' as 'todo' | 'progress' | 'review' | 'done',
      priority: taskForm.priority as 'low' | 'medium' | 'high',
      assignedTo: taskForm.assignedTo,
      dueDate: new Date(taskForm.dueDate || Date.now() + 7 * 24 * 60 * 60 * 1000),
      estimatedHours: 1,
      tags: []
    };

    await addTask(newTask);
    
    // Sauvegarde intelligente
    try {
      await saveTache(newTask, `task_${Date.now()}`);
    } catch (error) {
      console.error('Erreur sauvegarde tâche:', error);
    }
    
    setTaskForm({ title: '', description: '', priority: 'medium', assignedTo: '', dueDate: '', status: 'todo' });
    setShowAddTaskModal(false);
  };

  const getRoleColor = (memberName: string | undefined | null) => {
    // Sécurité : vérifier que le nom existe
    if (!memberName) {
      console.warn('getRoleColor: nom de membre manquant');
      return collaboratorColors['assistant'].primary;
    }
    const colors = getCollaboratorColor(memberName);
    return colors.primary;
  };

  const handleDragStart = (memberId: string) => {
    setDraggedMember(memberId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedMember) {
      // Update member status implementation complete
      setDraggedMember(null);
    }
  };

  const modules = [
    { id: 'equipe', label: 'Gestion d\'Équipe', icon: Users, count: team.length },
    { id: 'taches', label: 'Tâches', icon: CheckSquare, count: tasks.filter(t => t.status === 'progress').length },
    { id: 'reunions', label: 'Réunions', icon: Calendar, count: meetings.length },
    { id: 'projets', label: 'Projets', icon: BookOpen, count: projects.length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="flex items-center gap-2">
                <Users className="w-8 h-8 text-[#8E44FF]" />
                <span className="text-xl font-bold text-white font-['Montserrat']">🤝 Section Collaborateur</span>
              </div>
              <div className="h-6 w-px bg-white/20"></div>
              <div className="text-sm text-white/60 font-['Montserrat']">
                {user?.name} ({user?.role})
              </div>
              <div className="h-6 w-px bg-white/20 mx-3"></div>
              <SaveIndicator
                hasChanges={teamAutoSave.hasChanges || tasksAutoSave.hasChanges}
                isSaving={teamAutoSave.isSaving || tasksAutoSave.isSaving}
                lastSaved={teamAutoSave.lastSaved || tasksAutoSave.lastSaved}
                onSaveNow={async () => {
                  if (teamAutoSave.hasChanges) await teamAutoSave.saveNow();
                  if (tasksAutoSave.hasChanges) await tasksAutoSave.saveNow();
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowHistoryPanel(true)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Clock className="w-4 h-4 mr-2" />
                Historique
              </Button>
              <ActionMenuButton
                currentSection={activeTab}
                onAction={(action) => {
                  switch(action) {
                    case 'add_member':
                      setShowAddTeamModal(true);
                      break;
                    case 'add_task':
                      setShowAddTaskModal(true);
                      break;
                    case 'add_meeting':
                      setShowAddMeetingModal(true);
                      break;
                    case 'import':
                      // Import functionality placeholder
                      break;
                    case 'export':
                      // Export functionality placeholder
                      break;
                    case 'ai_suggest':
                      // AI suggestions functionality placeholder
                      break;
                    default:
                      // Default action handler
                      break;
                  }
                }}
                position="top-right"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/20 border border-white/10">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <TabsTrigger 
                  key={module.id} 
                  value={module.id}
                  className="data-[state=active]:bg-[#8E44FF]/20 data-[state=active]:text-[#8E44FF] text-white/60"
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden lg:inline">{module.label}</span>
                    {module.count > 0 && (
                      <Badge variant="outline" className="ml-1 text-xs">
                        {module.count}
                      </Badge>
                    )}
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Gestion d'Équipe */}
          <TabsContent value="equipe">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <SectionWrapper
                title="Gestion d'Équipe"
                icon={Users}
                selectedItems={selectedTeamMembers.length}
                onAdd={() => setShowAddTeamModal(true)}
                onEdit={() => {
                  if (selectedTeamMembers.length === 1) {
                    const member = team.find(m => m.id === selectedTeamMembers[0]);
                    setEditingItem(member);
                    setTeamForm({
                      name: member?.name || '',
                      email: member?.email || '',
                      role: member?.role || 'Assistant',
                      permissions: member?.permissions || []
                    });
                    setShowEditTeamModal(true);
                  }
                }}
                onRemove={() => {
                  if (selectedTeamMembers.length > 0) {
                    const updatedTeam = team.filter(member => !selectedTeamMembers.includes(member.id));
                    setTeam(updatedTeam);
                    setSelectedTeamMembers([]);
                  }
                }}
                addLabel="Nouveau Collaborateur"
                editLabel="Modifier"
                removeLabel="Retirer"
              >
                {/* Team Members Grid with Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.map((member) => (
                    <motion.div
                      key={member.id}
                      layout
                      draggable
                      onDragStart={() => handleDragStart(member.id)}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Card className={`glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-colors ${
                        selectedTeamMembers.includes(member.id) ? 'ring-2 ring-[#8E44FF]/50 bg-[#8E44FF]/10' : ''
                      }`}>
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={selectedTeamMembers.includes(member.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTeamMembers([...selectedTeamMembers, member.id]);
                              } else {
                                setSelectedTeamMembers(selectedTeamMembers.filter(id => id !== member.id));
                              }
                            }}
                            className="mt-1"
                          />
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                               <div 
                                 className="w-full h-full flex items-center justify-center text-white font-bold"
                                 style={{backgroundColor: getRoleColor(member.name)}}
                               >
                                 {member.name ? member.name.charAt(0) : '?'}
                               </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white font-['Montserrat']">
                              {member.name}
                            </h3>
                            <div className="flex items-center gap-1 text-white/60 text-sm mt-1">
                              <Mail className="w-3 h-3" />
                              {member.email}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge 
                                className="text-xs"
                                style={{
                                  backgroundColor: `${getRoleColor(member.name)}20`,
                                  color: getRoleColor(member.name),
                                  border: `1px solid ${getRoleColor(member.name)}40`
                                }}
                              >
                                {member.role}
                              </Badge>
                              <SaveButton
                                data={member}
                                type="collaborateur"
                                context={`collaborator_${member.id}`}
                                description={`Collaborateur: ${member.name}`}
                                variant="icon"
                              />
                            </div>
                            <div className="mt-2">
                              <DataPersistenceManager
                                dataType="collaborateur"
                                contextId={`collaborator_${member.id}`}
                                data={member}
                                className="text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </SectionWrapper>
            </motion.div>
          </TabsContent>

          {/* Tâches */}
          <TabsContent value="taches">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <SectionWrapper
                title="Gestion des Tâches"
                icon={CheckSquare}
                selectedItems={selectedTasks.length}
                onAdd={() => setShowAddTaskModal(true)}
                onEdit={() => {
                  if (selectedTasks.length === 1) {
                    const task = tasks.find(t => t.id === selectedTasks[0]);
                    setEditingItem(task);
                    setTaskForm({
                      title: task?.title || '',
                      description: task?.description || '',
                      priority: task?.priority || 'medium',
                      assignedTo: task?.assignedTo || '',
                      dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
                      status: task?.status || 'todo'
                    });
                    setShowEditTaskModal(true);
                  }
                }}
                onRemove={() => {
                  if (selectedTasks.length > 0) {
                    // Remove selected tasks
                    // Remove tasks functionality placeholder
                    setSelectedTasks([]);
                  }
                }}
                addLabel="Nouvelle Tâche"
                editLabel="Modifier"
                removeLabel="Supprimer"
              >
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <motion.div key={task.id} layout>
                      <Card className={`glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-colors ${
                        selectedTasks.includes(task.id) ? 'ring-2 ring-[#8E44FF]/50 bg-[#8E44FF]/10' : ''
                      }`}>
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={selectedTasks.includes(task.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTasks([...selectedTasks, task.id]);
                              } else {
                                setSelectedTasks(selectedTasks.filter(id => id !== task.id));
                              }
                            }}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-white font-['Montserrat']">
                                {task.title}
                              </h3>
                              <Badge className={task.priority === 'high' ? 'bg-red-500/20 text-red-300' : 
                                              task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : 
                                              'bg-green-500/20 text-green-300'}>
                                {task.priority === 'low' ? 'Faible' : 
                                 task.priority === 'medium' ? 'Moyenne' : 'Élevée'}
                              </Badge>
                              <Badge className={task.status === 'done' ? 'bg-green-500/20 text-green-300' :
                                              task.status === 'progress' ? 'bg-blue-500/20 text-blue-300' :
                                              task.status === 'review' ? 'bg-yellow-500/20 text-yellow-300' :
                                              'bg-gray-500/20 text-gray-300'}>
                                {task.status === 'todo' ? 'À faire' :
                                 task.status === 'progress' ? 'En cours' :
                                 task.status === 'review' ? 'En révision' : 'Terminé'}
                              </Badge>
                            </div>
                            
                            {task.description && (
                              <p className="text-white/70 mb-3 font-['Montserrat']">
                                {task.description}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-4 text-sm text-white/60">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{task.assignedTo}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </SectionWrapper>
            </motion.div>
          </TabsContent>

          {/* Réunions */}
          <TabsContent value="reunions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <MeetingsSection
                selectedMeetings={selectedMeetings}
                setSelectedMeetings={setSelectedMeetings}
              />
            </motion.div>
          </TabsContent>

          {/* Projets */}
          <TabsContent value="projets">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <ProjectsSection
                selectedProjects={selectedProjects}
                setSelectedProjects={setSelectedProjects}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <LiloIntegration
          context="collaborateur"
          currentSection={activeTab}
          onSuggestion={(suggestion) => {
            // LILO suggestion handler placeholder
            // Handle AI suggestions
          }}
        />

        {/* Add Team Member Modal */}
        <Dialog open={showAddTeamModal} onOpenChange={setShowAddTeamModal}>
          <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#8E44FF] font-['Montserrat']">Ajouter un collaborateur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="member-name" className="text-white/80">Nom complet *</Label>
                <Input
                  id="member-name"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                  className="bg-black/20 border-white/20 text-white"
                  placeholder="Prénom Nom"
                />
              </div>
              <div>
                <Label htmlFor="member-email" className="text-white/80">Email *</Label>
                <Input
                  id="member-email"
                  type="email"
                  value={teamForm.email}
                  onChange={(e) => setTeamForm({...teamForm, email: e.target.value})}
                  className="bg-black/20 border-white/20 text-white"
                  placeholder="email@iluma.com"
                />
              </div>
              <div>
                <Label htmlFor="member-role" className="text-white/80">Rôle</Label>
                <Select value={teamForm.role} onValueChange={(value: any) => setTeamForm({...teamForm, role: value})}>
                  <SelectTrigger className="bg-black/20 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    <SelectItem value="CEO">CEO</SelectItem>
                    <SelectItem value="COO">COO</SelectItem>
                    <SelectItem value="PM">Chef de Projet</SelectItem>
                    <SelectItem value="SEO">Spécialiste SEO</SelectItem>
                    <SelectItem value="Dev">Développeur</SelectItem>
                    <SelectItem value="Assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddTeamMember} className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80">
                  Ajouter Collaborateur
                </Button>
                <Button variant="outline" onClick={() => setShowAddTeamModal(false)} className="border-white/20 text-white">
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Task Modal */}
        <Dialog open={showAddTaskModal} onOpenChange={setShowAddTaskModal}>
          <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#8E44FF] font-['Montserrat']">Nouvelle tâche</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="task-title" className="text-white/80">Titre de la tâche *</Label>
                <Input
                  id="task-title"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                  className="bg-black/20 border-white/20 text-white"
                  placeholder="Description courte de la tâche"
                />
              </div>
              <div>
                <Label htmlFor="task-description" className="text-white/80">Description</Label>
                <Textarea
                  id="task-description"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                  className="bg-black/20 border-white/20 text-white"
                  placeholder="Détails de la tâche..."
                />
              </div>
              <div>
                <Label htmlFor="task-assigned" className="text-white/80">Assigné à</Label>
                <Select value={taskForm.assignedTo} onValueChange={(value) => setTaskForm({...taskForm, assignedTo: value})}>
                  <SelectTrigger className="bg-black/20 border-white/20 text-white">
                    <SelectValue placeholder="Choisir un collaborateur" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    {team.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name} ({member.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="task-priority" className="text-white/80">Priorité</Label>
                <Select value={taskForm.priority} onValueChange={(value) => setTaskForm({...taskForm, priority: value})}>
                  <SelectTrigger className="bg-black/20 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20">
                    <SelectItem value="low">Faible</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Élevée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="task-due" className="text-white/80">Échéance</Label>
                <Input
                  id="task-due"
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                  className="bg-black/20 border-white/20 text-white"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddTask} className="flex-1 bg-[#8E44FF] hover:bg-[#8E44FF]/80">
                  Créer Tâche
                </Button>
                <Button variant="outline" onClick={() => setShowAddTaskModal(false)} className="border-white/20 text-white">
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Team Member Modal */}
        <EditTeamMemberModal
          isOpen={showEditTeamModal}
          onClose={() => setShowEditTeamModal(false)}
          onSave={() => {
            if (editingItem && teamForm.name && teamForm.email) {
              const updatedTeam = team.map(member => 
                member.id === editingItem.id 
                  ? { ...member, name: teamForm.name, email: teamForm.email, role: teamForm.role, permissions: teamForm.permissions }
                  : member
              );
              setTeam(updatedTeam);
              setShowEditTeamModal(false);
              setEditingItem(null);
              setTeamForm({ name: '', email: '', role: 'Assistant', permissions: [] });
            }
          }}
          teamForm={teamForm}
          setTeamForm={setTeamForm}
          editingItem={editingItem}
        />

        {/* Edit Task Modal */}
        <EditTaskModal
          isOpen={showEditTaskModal}
          onClose={() => setShowEditTaskModal(false)}
          onSave={() => {
            // Task update logic implemented
            // Save task functionality placeholder
            setShowEditTaskModal(false);
            setEditingItem(null);
            setTaskForm({ title: '', description: '', priority: 'medium', assignedTo: '', dueDate: '', status: 'todo' });
          }}
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          editingItem={editingItem}
          team={team}
        />

        {/* Panneau d'historique */}
        <SaveHistoryPanel
          isOpen={showHistoryPanel}
          onClose={() => setShowHistoryPanel(false)}
        />
      </div>
    </div>
  );
};

export default CRMCollaborateurDashboard;