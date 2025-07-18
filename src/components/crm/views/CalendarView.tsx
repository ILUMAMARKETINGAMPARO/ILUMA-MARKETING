import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Filter, Brain } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCollaboratorColor } from '@/utils/collaboratorColors';
import { useCRM } from '@/contexts/CRMContext';
import LiloUniversalReplacer from '@/components/lilo/LiloUniversalReplacer';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  client: string;
  type: 'meeting' | 'deadline' | 'follow-up' | 'delivery';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
}

const CalendarView: React.FC = () => {
  const { clients, tasks } = useCRM();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month' | 'type' | 'collaborator'>('week');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCollaborator, setSelectedCollaborator] = useState('all');

  // Mock events based on tasks and clients
  const generateEvents = (): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    
    // Generate events from tasks
    tasks.forEach(task => {
      events.push({
        id: task.id,
        title: task.title,
        date: task.dueDate,
        time: '10:00',
        client: clients.find(c => c.assignedTo === task.assignedTo)?.name || 'N/A',
        type: 'deadline',
        assignedTo: task.assignedTo,
        priority: task.priority as 'low' | 'medium' | 'high'
      });
    });

    // Generate follow-up events for clients
    clients.forEach(client => {
      const followUpDate = new Date();
      followUpDate.setDate(followUpDate.getDate() + Math.floor(Math.random() * 30));
      
      events.push({
        id: `followup-${client.id}`,
        title: `Suivi client - ${client.name}`,
        date: followUpDate,
        time: '14:00',
        client: client.name,
        type: 'follow-up',
        assignedTo: client.assignedTo,
        priority: 'medium'
      });
    });

    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const events = generateEvents();

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'meeting': return '#00BFFF';
      case 'deadline': return '#FF6B6B';
      case 'follow-up': return '#FFD56B';
      case 'delivery': return '#00FF88';
      default: return '#8E44FF';
    }
  };

  const getPriorityColor = (priority: CalendarEvent['priority']) => {
    switch (priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFD56B';
      case 'low': return '#00FF88';
      default: return '#8E44FF';
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const weekDays = getWeekDays();

  return (
    <div className="h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white font-['Montserrat']">
          Vue Calendrier & Réunions
        </h2>
        <div className="flex items-center gap-4">
          <LiloUniversalReplacer
            context="meetings"
            module="crm-iluma"
            variant="button"
            onIntegrate={(suggestion) => {
              console.log('LILO™ meetings integration:', suggestion);
            }}
          />
          <div className="flex gap-2">
            {['week', 'type', 'collaborator', 'echeance'].map((viewType) => (
              <Button
                key={viewType}
                variant={view === viewType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView(viewType as any)}
                className="capitalize"
              >
                {viewType === 'week' ? 'Semaine' : 
                 viewType === 'type' ? 'Par Type' :
                 viewType === 'collaborator' ? 'Par Collaborateur' :
                 'Échéances'}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-white font-medium min-w-[200px] text-center">
              {currentDate.toLocaleDateString('fr-FR', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
            <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters for Type and Collaborator views */}
      {(view === 'type' || view === 'collaborator') && (
        <Card className="glass-effect border-white/20 p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/60" />
              <span className="text-white/60 font-['Montserrat']">Filtres:</span>
            </div>
            
            {view === 'type' && (
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px] bg-black/20 border-white/20 text-white">
                  <SelectValue placeholder="Type de réunion" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="meeting">Réunions client</SelectItem>
                  <SelectItem value="deadline">Échéances</SelectItem>
                  <SelectItem value="follow-up">Suivis</SelectItem>
                  <SelectItem value="delivery">Livraisons</SelectItem>
                </SelectContent>
              </Select>
            )}
            
            {view === 'collaborator' && (
              <Select value={selectedCollaborator} onValueChange={setSelectedCollaborator}>
                <SelectTrigger className="w-[180px] bg-black/20 border-white/20 text-white">
                  <SelectValue placeholder="Collaborateur" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20">
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="sergio">Sergio</SelectItem>
                  <SelectItem value="amparo">Amparo</SelectItem>
                  <SelectItem value="andrea">Andrea</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </Card>
      )}

      {/* Week View */}
      {view === 'week' && (
        <div className="grid grid-cols-7 gap-4 h-full">
          {weekDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <Card
                key={index}
                className={`glass-effect border-white/20 p-4 ${
                  isToday ? 'ring-2 ring-[#8E44FF]/50' : ''
                }`}
              >
                <div className="text-center mb-4">
                  <div className="text-white/60 text-sm">
                    {day.toLocaleDateString('fr-FR', { weekday: 'short' })}
                  </div>
                  <div className={`text-xl font-bold ${
                    isToday ? 'text-[#8E44FF]' : 'text-white'
                  }`}>
                    {day.getDate()}
                  </div>
                </div>

                <div className="space-y-2">
                  {dayEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-effect border-white/10 p-2 rounded text-xs"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getEventColor(event.type) }}
                        />
                        <Clock className="h-3 w-3 text-white/60" />
                        <span className="text-white/80">{event.time}</span>
                      </div>
                      
                      <div className="text-white font-medium leading-tight mb-1">
                        {event.title}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">{event.client}</span>
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: getPriorityColor(event.priority) }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {dayEvents.length === 0 && (
                  <div className="text-center text-white/40 text-sm mt-8">
                    Aucun événement
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Today's Events Sidebar */}
      <Card className="glass-effect border-white/20 p-4 mt-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Événements du jour
        </h3>
        
        <div className="space-y-3">
          {getEventsForDate(new Date()).map((event) => (
            <div key={event.id} className="flex items-center gap-3 p-3 glass-effect rounded-lg">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: getEventColor(event.type) }}
              />
              <div className="flex-1">
                <div className="text-white font-medium">{event.title}</div>
                <div className="text-white/60 text-sm flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {event.time}
                  <User className="h-3 w-3 ml-2" />
                  {event.assignedTo}
                </div>
              </div>
              <Badge
                style={{ 
                  backgroundColor: getPriorityColor(event.priority) + '20',
                  color: getPriorityColor(event.priority),
                  borderColor: getPriorityColor(event.priority) + '30'
                }}
              >
                {event.priority}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CalendarView;