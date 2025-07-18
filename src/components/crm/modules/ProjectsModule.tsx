import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  FolderOpen, 
  User, 
  Calendar, 
  Target, 
  TrendingUp,
  Search,
  Filter,
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { getCollaboratorColor } from '@/utils/collaboratorColors';

const ProjectsModule = () => {
  const { clients, tasks, team } = useCRM();
  const [viewBy, setViewBy] = useState<'collaborator' | 'status' | 'priority' | 'timeline'>('collaborator');
  const [selectedCollaborator, setSelectedCollaborator] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate projects from clients and tasks
  const generateProjects = () => {
    const projects = clients.map(client => ({
      id: `project-${client.id}`,
      name: `Projet ${client.name}`,
      client: client.name,
      assignedTo: client.assignedTo,
      status: client.status === 'active' ? 'progress' : client.status === 'prospect' ? 'planning' : 'completed',
      priority: client.revenue > 3000 ? 'high' : client.revenue > 1500 ? 'medium' : 'low',
      services: client.services,
      revenue: client.revenue,
      startDate: client.createdAt,
      dueDate: new Date(client.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000), // +30 days
      progress: Math.floor(Math.random() * 100),
      tasks: tasks.filter(task => task.assignedTo === client.assignedTo).length
    }));

    return projects.filter(project => {
      const matchesCollaborator = selectedCollaborator === 'all' || project.assignedTo.toLowerCase().includes(selectedCollaborator);
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCollaborator && matchesSearch;
    });
  };

  const projects = generateProjects();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Clock className="w-4 h-4" />;
      case 'progress': return <Target className="w-4 h-4" />;
      case 'review': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'review': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const renderProjectsByCollaborator = () => {
    const collaborators = [...team, { id: 'unassigned', name: 'Non assigné', role: '', email: '' }];
    
    return (
      <div className="space-y-6">
        {collaborators.map(collaborator => {
          const collaboratorProjects = projects.filter(project => 
            project.assignedTo.toLowerCase().includes(collaborator.name.toLowerCase()) ||
            (collaborator.name === 'Non assigné' && !project.assignedTo)
          );
          
          if (collaboratorProjects.length === 0) return null;
          
          const colors = getCollaboratorColor(collaborator.name);
          
          return (
            <div key={collaborator.id}>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-3 h-8 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
                <h3 className="text-xl font-bold text-white font-['Montserrat']">
                  {collaborator.name}
                </h3>
                <Badge 
                  className="border"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.text,
                    borderColor: colors.border
                  }}
                >
                  {collaboratorProjects.length} projet{collaboratorProjects.length > 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collaboratorProjects.map(project => (
                  <ProjectCard key={project.id} project={project} collaboratorColors={colors} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const ProjectCard = ({ project, collaboratorColors }: any) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cursor-pointer"
    >
      <Card className="glass-effect border-white/20 p-6 hover:border-opacity-50 transition-colors h-full"
            style={{ borderColor: collaboratorColors.border }}>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-white font-['Montserrat'] mb-1">
                {project.name}
              </h4>
              <p className="text-white/60 text-sm">{project.client}</p>
            </div>
            <Badge className={`${getStatusColor(project.status)} text-xs border`}>
              {getStatusIcon(project.status)}
              <span className="ml-1 capitalize">{project.status}</span>
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Progression</span>
              <span className="text-white font-medium">{project.progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${project.progress}%`,
                  backgroundColor: collaboratorColors.primary 
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-white/60">
              <Calendar className="w-4 h-4" />
              <span>{project.dueDate.toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center gap-1 text-white/60">
              <Target className="w-4 h-4" />
              <span>{project.tasks} tâches</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-white/60">
              Revenus: <span className="text-white font-medium">{project.revenue.toLocaleString()}€</span>
            </div>
            <div className="flex gap-1">
              {project.services.slice(0, 2).map((service: string, idx: number) => (
                <Badge key={idx} variant="outline" className="text-xs border-white/20 text-white/60">
                  {service}
                </Badge>
              ))}
              {project.services.length > 2 && (
                <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                  +{project.services.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderOpen className="w-8 h-8 text-[#8E44FF]" />
          <h2 className="text-2xl font-bold text-white font-['Montserrat']">
            Projets par Collaborateur
          </h2>
        </div>
        <div className="text-sm text-white/60">
          {projects.length} projet{projects.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Filters */}
      <Card className="glass-effect border-white/20 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <Input
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-white/20 text-white"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={viewBy} onValueChange={(value: any) => setViewBy(value)}>
              <SelectTrigger className="w-[160px] bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Vue par" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="collaborator">Par Collaborateur</SelectItem>
                <SelectItem value="status">Par Statut</SelectItem>
                <SelectItem value="priority">Par Priorité</SelectItem>
                <SelectItem value="timeline">Par Échéance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCollaborator} onValueChange={setSelectedCollaborator}>
              <SelectTrigger className="w-[150px] bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Collaborateur" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="all">Tous</SelectItem>
                {team.map(member => (
                  <SelectItem key={member.id} value={member.name.toLowerCase()}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Projects Content */}
      {viewBy === 'collaborator' && renderProjectsByCollaborator()}

      {projects.length === 0 && (
        <Card className="glass-effect border-white/20 p-8 text-center">
          <FolderOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 font-['Montserrat']">
            Aucun projet trouvé. Les projets sont générés automatiquement à partir des clients.
          </p>
        </Card>
      )}
    </motion.div>
  );
};

export default ProjectsModule;