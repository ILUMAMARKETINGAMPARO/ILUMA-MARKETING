import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CheckSquare, Clock, User, AlertCircle, Search, Filter } from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { getCollaboratorColor } from '@/utils/collaboratorColors';
import LiloUniversalReplacer from '@/components/lilo/LiloUniversalReplacer';

const TasksModule = () => {
  const { tasks, updateTask, team } = useCRM();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-500/20 text-gray-300';
      case 'progress': return 'bg-blue-500/20 text-blue-300';
      case 'review': return 'bg-yellow-500/20 text-yellow-300';
      case 'done': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-500/20 text-green-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'high': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    await updateTask(taskId, { status: newStatus as any });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white font-['Montserrat']">
          Gestion des Tâches
        </h2>
        <div className="flex items-center gap-4">
          <LiloUniversalReplacer
            context="tasks"
            module="crm-iluma"
            variant="button"
            onIntegrate={(suggestion) => {
              console.log('LILO™ task integration:', suggestion);
            }}
          />
          <div className="text-sm text-white/60">
            {filteredTasks.length} tâche{filteredTasks.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="glass-effect border-white/20 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <Input
              placeholder="Rechercher une tâche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-white/20 text-white"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px] bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="all">Tous statuts</SelectItem>
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="progress">En cours</SelectItem>
                <SelectItem value="review">En révision</SelectItem>
                <SelectItem value="done">Terminé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[140px] bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="all">Toutes priorités</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Tasks Grid */}
      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <Card className="glass-effect border-white/20 p-8 text-center">
            <CheckSquare className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 font-['Montserrat']">
              Aucune tâche trouvée. Utilisez le bouton + pour créer une nouvelle tâche.
            </p>
          </Card>
        ) : (
          filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 p-6 hover:border-[#8E44FF]/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white font-['Montserrat']">
                        {task.title}
                      </h3>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === 'low' ? 'Faible' : 
                         task.priority === 'medium' ? 'Moyenne' : 'Élevée'}
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
                      {task.estimatedHours && (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{task.estimatedHours}h estimées</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4 flex flex-col gap-2">
                    <Select 
                      value={task.status} 
                      onValueChange={(value) => handleStatusChange(task.id, value)}
                    >
                      <SelectTrigger className={`w-[120px] ${getStatusColor(task.status)} border-white/20`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/20">
                        <SelectItem value="todo">À faire</SelectItem>
                        <SelectItem value="progress">En cours</SelectItem>
                        <SelectItem value="review">En révision</SelectItem>
                        <SelectItem value="done">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-effect border-white/20 p-4 text-center">
          <div className="text-2xl font-bold text-gray-300 font-['Montserrat']">
            {tasks.filter(t => t.status === 'todo').length}
          </div>
          <div className="text-white/60 text-sm">À faire</div>
        </Card>
        <Card className="glass-effect border-white/20 p-4 text-center">
          <div className="text-2xl font-bold text-blue-300 font-['Montserrat']">
            {tasks.filter(t => t.status === 'progress').length}
          </div>
          <div className="text-white/60 text-sm">En cours</div>
        </Card>
        <Card className="glass-effect border-white/20 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-300 font-['Montserrat']">
            {tasks.filter(t => t.status === 'review').length}
          </div>
          <div className="text-white/60 text-sm">En révision</div>
        </Card>
        <Card className="glass-effect border-white/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-300 font-['Montserrat']">
            {tasks.filter(t => t.status === 'done').length}
          </div>
          <div className="text-white/60 text-sm">Terminées</div>
        </Card>
      </div>
    </motion.div>
  );
};

export default TasksModule;