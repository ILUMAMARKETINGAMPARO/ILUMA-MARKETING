import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  MessageSquare, 
  Phone, 
  Mail, 
  Target, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Save,
  Send,
  User
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';

interface CRMIntegrationProps {
  business: RivalBusiness;
  isVisible: boolean;
  onClose: () => void;
  onUpdate?: (updatedBusiness: RivalBusiness) => void;
}

interface CRMAction {
  id: string;
  type: string;
  description: string;
  scheduledDate?: string;
  completedDate?: string;
  outcome?: string;
  action_type: string;
}

const CRMIntegration: React.FC<CRMIntegrationProps> = ({
  business,
  isVisible,
  onClose,
  onUpdate
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'actions' | 'notes'>('overview');
  
  // États pour la gestion CRM
  const [status, setStatus] = useState(business.status || 'prospect');
  const [potential, setPotential] = useState(business.potential || 'medium');
  const [assignedTo, setAssignedTo] = useState(business.assignedTo || '');
  const [notes, setNotes] = useState(business.notes || '');
  const [newActionType, setNewActionType] = useState('');
  const [newActionDescription, setNewActionDescription] = useState('');
  const [newActionDate, setNewActionDate] = useState('');
  const [actions, setActions] = useState<CRMAction[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Charger les données CRM au montage
  useEffect(() => {
    if (isVisible) {
      loadCRMData();
      loadTeamMembers();
    }
  }, [isVisible, business.id]);

  const loadCRMData = async () => {
    try {
      const { data, error } = await supabase
        .from('crm_actions')
        .select('*')
        .eq('business_id', business.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      const formattedActions = data?.map(action => ({
        id: action.id,
        type: action.action_type,
        description: action.description || '',
        scheduledDate: action.scheduled_date,
        completedDate: action.completed_date,
        outcome: action.outcome,
        action_type: action.action_type
      })) || [];
      setActions(formattedActions);
    } catch (error) {
      console.error('Erreur lors du chargement CRM:', error);
    }
  };

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('actif', true)
        .order('prenom');

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement équipe:', error);
    }
  };

  const updateBusinessStatus = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('businesses')
        .update({
          crm_status: status,
          potential: potential,
          assigned_to: assignedTo || null,
          ai_summary: notes,
          last_contact_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', business.id);

      if (error) throw error;

      // Créer une action CRM pour le changement de statut
      await supabase
        .from('crm_actions')
        .insert({
          business_id: business.id,
          action_type: 'status_update',
          description: `Statut mis à jour: ${status}, Potentiel: ${potential}`,
          outcome: 'completed',
          completed_date: new Date().toISOString()
        });

      const updatedBusiness = {
        ...business,
        status,
        potential,
        assignedTo,
        notes,
        lastContact: new Date().toISOString()
      };

      onUpdate?.(updatedBusiness);

      toast({
        title: "CRM mis à jour",
        description: "Les informations ont été sauvegardées avec succès",
      });

      loadCRMData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le CRM",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createCRMAction = async () => {
    if (!newActionType || !newActionDescription) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir le type et la description",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('crm_actions')
        .insert({
          business_id: business.id,
          action_type: newActionType,
          description: newActionDescription,
          scheduled_date: newActionDate || null,
        });

      if (error) throw error;

      setNewActionType('');
      setNewActionDescription('');
      setNewActionDate('');
      
      toast({
        title: "Action créée",
        description: "Nouvelle action ajoutée au CRM",
      });

      loadCRMData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'action",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospect': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'client': return 'bg-green-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getActionTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Calendar;
      case 'status_update': return TrendingUp;
      default: return MessageSquare;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black/90 border border-[#8E44FF]/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
          >
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    CRM - {business.name}
                  </CardTitle>
                  <p className="text-white/60 text-sm mt-1">
                    {business.city} • {business.sector}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Navigation des onglets */}
              <div className="flex gap-2 mb-6 border-b border-white/10">
                {[
                  { id: 'overview', label: 'Vue d\'ensemble', icon: Target },
                  { id: 'actions', label: 'Actions', icon: Calendar },
                  { id: 'notes', label: 'Notes', icon: MessageSquare }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'default' : 'ghost'}
                      className={`${activeTab === tab.id 
                        ? 'bg-[#8E44FF] text-white' 
                        : 'text-white/60 hover:text-white'
                      }`}
                      onClick={() => setActiveTab(tab.id as any)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>

              {/* Contenu des onglets */}
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Statut et assignation */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="bg-black/50 border-white/10">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white text-lg">Gestion CRM</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-white font-medium mb-2 block">Statut</label>
                            <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                              <SelectTrigger className="bg-black/50 border-[#8E44FF]/30 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-[#8E44FF]/30">
                                <SelectItem value="prospect" className="text-white">Prospect</SelectItem>
                                <SelectItem value="contacted" className="text-white">Contacté</SelectItem>
                                <SelectItem value="client" className="text-white">Client</SelectItem>
                                <SelectItem value="lost" className="text-white">Perdu</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-white font-medium mb-2 block">Potentiel</label>
                            <Select value={potential} onValueChange={(value: any) => setPotential(value)}>
                              <SelectTrigger className="bg-black/50 border-[#8E44FF]/30 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-[#8E44FF]/30">
                                <SelectItem value="high" className="text-white">Élevé</SelectItem>
                                <SelectItem value="medium" className="text-white">Moyen</SelectItem>
                                <SelectItem value="low" className="text-white">Faible</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-white font-medium mb-2 block">Assigné à</label>
                            <Select value={assignedTo} onValueChange={setAssignedTo}>
                              <SelectTrigger className="bg-black/50 border-[#8E44FF]/30 text-white">
                                <SelectValue placeholder="Sélectionner un membre" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-[#8E44FF]/30">
                                <SelectItem value="" className="text-white">Non assigné</SelectItem>
                                {teamMembers.map(member => (
                                  <SelectItem key={member.id} value={member.id} className="text-white">
                                    {member.prenom} {member.nom}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Métriques clés */}
                      <Card className="bg-black/50 border-white/10">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white text-lg">Métriques Clés</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-[#8E44FF]/20 rounded-lg">
                              <div className="text-2xl font-bold text-white">{business.ilaScore}</div>
                              <div className="text-white/60 text-sm">Score ILA™</div>
                            </div>
                            <div className="p-3 bg-green-500/20 rounded-lg">
                              <div className="text-2xl font-bold text-white">{business.googleRating.toFixed(1)}</div>
                              <div className="text-white/60 text-sm">Google Rating</div>
                            </div>
                            <div className="p-3 bg-blue-500/20 rounded-lg">
                              <div className="text-2xl font-bold text-white">{business.organicTraffic.toLocaleString()}</div>
                              <div className="text-white/60 text-sm">Trafic/mois</div>
                            </div>
                            <div className="p-3 bg-yellow-500/20 rounded-lg">
                              <div className="text-2xl font-bold text-white">{business.top10Keywords}</div>
                              <div className="text-white/60 text-sm">Top 10 KW</div>
                            </div>
                          </div>

                          <div className="flex gap-2 justify-center">
                            <Badge className={`${getStatusColor(status)} text-white`}>
                              {status}
                            </Badge>
                            <Badge className={`${getPotentialColor(potential)} text-white`}>
                              {potential}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Actions rapides */}
                    <div className="flex gap-3">
                      <Button
                        onClick={updateBusinessStatus}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/20"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Appeler
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/20"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'actions' && (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Nouvelle action */}
                    <Card className="bg-black/50 border-white/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg">Nouvelle Action</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <Select value={newActionType} onValueChange={setNewActionType}>
                            <SelectTrigger className="bg-black/50 border-[#8E44FF]/30 text-white">
                              <SelectValue placeholder="Type d'action" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-[#8E44FF]/30">
                              <SelectItem value="call" className="text-white">Appel</SelectItem>
                              <SelectItem value="email" className="text-white">Email</SelectItem>
                              <SelectItem value="meeting" className="text-white">Rendez-vous</SelectItem>
                              <SelectItem value="follow_up" className="text-white">Suivi</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Input
                            type="datetime-local"
                            value={newActionDate}
                            onChange={(e) => setNewActionDate(e.target.value)}
                            className="bg-black/50 border-[#8E44FF]/30 text-white"
                          />
                          
                          <Button
                            onClick={createCRMAction}
                            className="bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Ajouter
                          </Button>
                        </div>
                        
                        <Textarea
                          value={newActionDescription}
                          onChange={(e) => setNewActionDescription(e.target.value)}
                          placeholder="Description de l'action..."
                          className="bg-black/50 border-[#8E44FF]/30 text-white"
                        />
                      </CardContent>
                    </Card>

                    {/* Historique des actions */}
                    <Card className="bg-black/50 border-white/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg">Historique des Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {actions.map((action) => {
                            const ActionIcon = getActionTypeIcon(action.type);
                            return (
                              <div
                                key={action.id}
                                className="flex items-start gap-3 p-3 bg-black/30 rounded-lg"
                              >
                                <ActionIcon className="w-4 h-4 text-[#8E44FF] mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="text-white font-medium">{action.description}</div>
                                  <div className="text-white/60 text-sm">
                                    {action.scheduledDate && new Date(action.scheduledDate).toLocaleDateString()}
                                  </div>
                                </div>
                                {action.outcome && (
                                  <Badge className="bg-green-500/20 text-green-400">
                                    {action.outcome}
                                  </Badge>
                                )}
                              </div>
                            );
                          })}
                          {actions.length === 0 && (
                            <div className="text-center text-white/60 py-8">
                              Aucune action enregistrée
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <Card className="bg-black/50 border-white/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg">Notes & Commentaires</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Ajoutez vos notes sur cette entreprise..."
                          className="bg-black/50 border-[#8E44FF]/30 text-white min-h-[200px]"
                        />
                        <Button
                          onClick={updateBusinessStatus}
                          className="mt-4 bg-[#8E44FF] hover:bg-[#8E44FF]/80 text-white"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Sauvegarder les notes
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CRMIntegration;