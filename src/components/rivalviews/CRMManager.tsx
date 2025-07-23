import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Calendar, Phone, Mail, MapPin, User, Target, DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client.ts';
import { toast } from 'sonner';

interface Business {
  id: string;
  name: string;
  sector: string;
  city: string;
  crm_status: string;
  ila_score: number;
  last_contact_date: string | null;
  next_follow_up: string | null;
  contact_person_name: string | null;
  contact_person_email: string | null;
  contact_person_phone: string | null;
  estimated_deal_value: number;
  conversion_probability: number;
  priority_level: number;
  assigned_to: string | null;
  website: string | null;
  total_traffic: number;
  domain_rating: number;
}

interface CRMAction {
  id: string;
  action_type: string;
  description: string;
  scheduled_date: string | null;
  completed_date: string | null;
  outcome: string | null;
  next_action_suggested: string | null;
  created_at: string;
}

interface ROIPrediction {
  predicted_revenue: number;
  timeline_months: number;
  confidence_score: number;
}

interface CRMManagerProps {
  businesses: Business[];
  onBusinessUpdate: () => void;
}

const statusConfig = {
  prospect: { label: 'Prospect', color: 'bg-slate-500', nextStatus: 'contacted' },
  contacted: { label: 'Contacté', color: 'bg-blue-500', nextStatus: 'meeting_scheduled' },
  meeting_scheduled: { label: 'RDV Prévu', color: 'bg-orange-500', nextStatus: 'meeting_completed' },
  meeting_completed: { label: 'RDV Fait', color: 'bg-purple-500', nextStatus: 'proposal_sent' },
  proposal_sent: { label: 'Proposition', color: 'bg-yellow-500', nextStatus: 'negotiation' },
  negotiation: { label: 'Négociation', color: 'bg-indigo-500', nextStatus: 'client' },
  client: { label: 'Client', color: 'bg-green-500', nextStatus: 'partner' },
  partner: { label: 'Partenaire', color: 'bg-emerald-600', nextStatus: null },
  lost: { label: 'Perdu', color: 'bg-red-500', nextStatus: 'prospect' },
  inactive: { label: 'Inactif', color: 'bg-gray-400', nextStatus: 'prospect' }
};

const actionTypes = [
  { value: 'call', label: 'Appel téléphonique', icon: Phone },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'meeting', label: 'Réunion', icon: Calendar },
  { value: 'note', label: 'Note', icon: AlertCircle },
  { value: 'status_change', label: 'Changement statut', icon: TrendingUp }
];

const CRMManager: React.FC<CRMManagerProps> = ({ businesses, onBusinessUpdate }) => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [actions, setActions] = useState<CRMAction[]>([]);
  const [roiPrediction, setROIPrediction] = useState<ROIPrediction | null>(null);
  const [newAction, setNewAction] = useState({
    action_type: '',
    description: '',
    scheduled_date: '',
    outcome: ''
  });
  const [contactUpdate, setContactUpdate] = useState({
    contact_person_name: '',
    contact_person_email: '',
    contact_person_phone: '',
    estimated_deal_value: 0,
    conversion_probability: 0,
    priority_level: 1
  });

  const fetchBusinessDetails = async (businessId: string) => {
    try {
      // Fetch actions
      const { data: actionsData } = await supabase
        .from('crm_actions')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false });
      
      if (actionsData) setActions(actionsData);

      // Fetch ROI prediction
      const { data: roiData } = await supabase
        .rpc('calculate_predictive_roi', { business_id: businessId });
      
      if (roiData && roiData[0]) {
        setROIPrediction(roiData[0]);
      }
    } catch (error) {
      console.error('Error fetching business details:', error);
    }
  };

  const updateBusinessStatus = async (businessId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ 
          crm_status: newStatus as any,
          last_contact_date: new Date().toISOString()
        })
        .eq('id', businessId);

      if (error) throw error;

      // Log status change action
      await supabase
        .from('crm_actions')
        .insert({
          business_id: businessId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          action_type: 'status_change',
          description: `Statut changé vers: ${statusConfig[newStatus as keyof typeof statusConfig]?.label}`,
          completed_date: new Date().toISOString()
        });

      toast.success('Statut mis à jour avec succès');
      onBusinessUpdate();
      if (selectedBusiness?.id === businessId) {
        fetchBusinessDetails(businessId);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const addAction = async () => {
    if (!selectedBusiness || !newAction.action_type || !newAction.description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      const { error } = await supabase
        .from('crm_actions')
        .insert({
          business_id: selectedBusiness.id,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          ...newAction,
          scheduled_date: newAction.scheduled_date || null,
          completed_date: newAction.outcome ? new Date().toISOString() : null
        });

      if (error) throw error;

      toast.success('Action ajoutée avec succès');
      setNewAction({ action_type: '', description: '', scheduled_date: '', outcome: '' });
      fetchBusinessDetails(selectedBusiness.id);
    } catch (error) {
      console.error('Error adding action:', error);
      toast.error('Erreur lors de l\'ajout de l\'action');
    }
  };

  const updateContactInfo = async () => {
    if (!selectedBusiness) return;

    try {
      const { error } = await supabase
        .from('businesses')
        .update(contactUpdate)
        .eq('id', selectedBusiness.id);

      if (error) throw error;

      toast.success('Informations de contact mises à jour');
      onBusinessUpdate();
    } catch (error) {
      console.error('Error updating contact info:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  useEffect(() => {
    if (selectedBusiness) {
      fetchBusinessDetails(selectedBusiness.id);
      setContactUpdate({
        contact_person_name: selectedBusiness.contact_person_name || '',
        contact_person_email: selectedBusiness.contact_person_email || '',
        contact_person_phone: selectedBusiness.contact_person_phone || '',
        estimated_deal_value: selectedBusiness.estimated_deal_value || 0,
        conversion_probability: selectedBusiness.conversion_probability || 0,
        priority_level: selectedBusiness.priority_level || 1
      });
    }
  }, [selectedBusiness]);

  const getStatusColor = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig]?.color || 'bg-gray-500';
  };

  const getNextStatus = (currentStatus: string) => {
    return statusConfig[currentStatus as keyof typeof statusConfig]?.nextStatus;
  };

  const getDaysUntilFollowUp = (followUpDate: string | null) => {
    if (!followUpDate) return null;
    const days = Math.ceil((new Date(followUpDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      {/* CRM Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Pipeline Commercial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = businesses.filter(b => b.crm_status === status).length;
              return (
                <div key={status} className="text-center">
                  <div className={`w-12 h-12 rounded-full ${config.color} mx-auto mb-2 flex items-center justify-center text-white font-bold`}>
                    {count}
                  </div>
                  <p className="text-sm font-medium">{config.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Business List with CRM Actions */}
      <div className="grid gap-4">
        {businesses.map((business) => {
          const followUpDays = getDaysUntilFollowUp(business.next_follow_up);
          const isOverdue = followUpDays !== null && followUpDays < 0;
          const isDue = followUpDays !== null && followUpDays <= 2;

          return (
            <Card key={business.id} className={`${isOverdue ? 'border-red-500' : isDue ? 'border-yellow-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{business.name}</h3>
                      <Badge className={`${getStatusColor(business.crm_status)} text-white`}>
                        {statusConfig[business.crm_status as keyof typeof statusConfig]?.label}
                      </Badge>
                      <Badge variant="outline">{business.sector}</Badge>
                      <Badge variant="secondary">ILA: {business.ila_score}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {business.city}
                      </span>
                      {business.contact_person_name && (
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {business.contact_person_name}
                        </span>
                      )}
                      {business.estimated_deal_value > 0 && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {business.estimated_deal_value.toLocaleString()}$
                        </span>
                      )}
                    </div>

                    {followUpDays !== null && (
                      <div className={`flex items-center gap-1 text-sm ${isOverdue ? 'text-red-600' : isDue ? 'text-yellow-600' : 'text-green-600'}`}>
                        <Clock className="h-4 w-4" />
                        {isOverdue ? `En retard de ${Math.abs(followUpDays)} jour(s)` : 
                         isDue ? `À suivre dans ${followUpDays} jour(s)` : 
                         `Suivi dans ${followUpDays} jour(s)`}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {getNextStatus(business.crm_status) && (
                      <Button
                        size="sm"
                        onClick={() => updateBusinessStatus(business.id, getNextStatus(business.crm_status)!)}
                        className="h-8"
                      >
                        Avancer
                      </Button>
                    )}
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedBusiness(business)}
                          className="h-8"
                        >
                          Gérer
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>CRM - {business.name}</DialogTitle>
                        </DialogHeader>
                        
                        <Tabs defaultValue="overview" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                            <TabsTrigger value="actions">Actions</TabsTrigger>
                            <TabsTrigger value="roi">ROI Prédictif</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Statut actuel</Label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`${getStatusColor(business.crm_status)} text-white`}>
                                    {statusConfig[business.crm_status as keyof typeof statusConfig]?.label}
                                  </Badge>
                                  {getNextStatus(business.crm_status) && (
                                    <Button
                                      size="sm"
                                      onClick={() => updateBusinessStatus(business.id, getNextStatus(business.crm_status)!)}
                                    >
                                      → {statusConfig[getNextStatus(business.crm_status) as keyof typeof statusConfig]?.label}
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <div>
                                <Label>Score ILA™</Label>
                                <div className="text-2xl font-bold text-primary">{business.ila_score}</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label>Trafic mensuel</Label>
                                <div className="text-lg font-semibold">{business.total_traffic?.toLocaleString() || 'N/A'}</div>
                              </div>
                              <div>
                                <Label>Domain Rating</Label>
                                <div className="text-lg font-semibold">{business.domain_rating || 'N/A'}</div>
                              </div>
                              <div>
                                <Label>Site web</Label>
                                <div className="text-sm">
                                  {business.website ? (
                                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                      {business.website}
                                    </a>
                                  ) : 'N/A'}
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="contact" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="contact_name">Nom du contact</Label>
                                <Input
                                  id="contact_name"
                                  value={contactUpdate.contact_person_name}
                                  onChange={(e) => setContactUpdate({...contactUpdate, contact_person_name: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="contact_email">Email</Label>
                                <Input
                                  id="contact_email"
                                  type="email"
                                  value={contactUpdate.contact_person_email}
                                  onChange={(e) => setContactUpdate({...contactUpdate, contact_person_email: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="contact_phone">Téléphone</Label>
                                <Input
                                  id="contact_phone"
                                  value={contactUpdate.contact_person_phone}
                                  onChange={(e) => setContactUpdate({...contactUpdate, contact_person_phone: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="priority">Niveau de priorité (1-5)</Label>
                                <Select value={contactUpdate.priority_level.toString()} onValueChange={(value) => setContactUpdate({...contactUpdate, priority_level: parseInt(value)})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {[1,2,3,4,5].map(level => (
                                      <SelectItem key={level} value={level.toString()}>
                                        Priorité {level} {level === 5 ? '(Urgent)' : level === 1 ? '(Faible)' : ''}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="deal_value">Valeur estimée du deal ($)</Label>
                                <Input
                                  id="deal_value"
                                  type="number"
                                  value={contactUpdate.estimated_deal_value}
                                  onChange={(e) => setContactUpdate({...contactUpdate, estimated_deal_value: parseFloat(e.target.value) || 0})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="conversion_prob">Probabilité de conversion (%)</Label>
                                <Input
                                  id="conversion_prob"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={contactUpdate.conversion_probability}
                                  onChange={(e) => setContactUpdate({...contactUpdate, conversion_probability: parseInt(e.target.value) || 0})}
                                />
                              </div>
                            </div>
                            <Button onClick={updateContactInfo} className="w-full">
                              Mettre à jour les informations
                            </Button>
                          </TabsContent>
                          
                          <TabsContent value="actions" className="space-y-4">
                            {/* Add new action */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Ajouter une action</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Type d'action</Label>
                                    <Select value={newAction.action_type} onValueChange={(value) => setNewAction({...newAction, action_type: value})}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {actionTypes.map(type => (
                                          <SelectItem key={type.value} value={type.value}>
                                            <div className="flex items-center gap-2">
                                              <type.icon className="h-4 w-4" />
                                              {type.label}
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="scheduled_date">Date prévue (optionnel)</Label>
                                    <Input
                                      id="scheduled_date"
                                      type="datetime-local"
                                      value={newAction.scheduled_date}
                                      onChange={(e) => setNewAction({...newAction, scheduled_date: e.target.value})}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="description">Description</Label>
                                  <Textarea
                                    id="description"
                                    value={newAction.description}
                                    onChange={(e) => setNewAction({...newAction, description: e.target.value})}
                                    placeholder="Décrivez l'action à effectuer..."
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="outcome">Résultat (si action terminée)</Label>
                                  <Textarea
                                    id="outcome"
                                    value={newAction.outcome}
                                    onChange={(e) => setNewAction({...newAction, outcome: e.target.value})}
                                    placeholder="Décrivez le résultat de l'action..."
                                  />
                                </div>
                                <Button onClick={addAction} className="w-full">
                                  Ajouter l'action
                                </Button>
                              </CardContent>
                            </Card>
                            
                            {/* Actions history */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Historique des actions</h4>
                              {actions.length === 0 ? (
                                <p className="text-muted-foreground">Aucune action enregistrée</p>
                              ) : (
                                actions.map((action) => (
                                  <Card key={action.id} className="p-4">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <Badge variant="outline">
                                            {actionTypes.find(t => t.value === action.action_type)?.label || action.action_type}
                                          </Badge>
                                          <span className="text-sm text-muted-foreground">
                                            {new Date(action.created_at).toLocaleDateString('fr-FR')}
                                          </span>
                                        </div>
                                        <p className="text-sm mb-1">{action.description}</p>
                                        {action.outcome && (
                                          <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
                                            <strong>Résultat:</strong> {action.outcome}
                                          </p>
                                        )}
                                        {action.next_action_suggested && (
                                          <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded mt-1">
                                            <strong>Action suggérée:</strong> {action.next_action_suggested}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </Card>
                                ))
                              )}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="roi" className="space-y-4">
                            {roiPrediction ? (
                              <div className="grid grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Revenus prédits</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-3xl font-bold text-green-600">
                                      {roiPrediction.predicted_revenue.toLocaleString()}$
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Timeline</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-3xl font-bold text-blue-600">
                                      {roiPrediction.timeline_months} mois
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Confiance</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-3xl font-bold text-purple-600">
                                      {roiPrediction.confidence_score}%
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            ) : (
                              <p className="text-muted-foreground">Calcul des prédictions ROI en cours...</p>
                            )}
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CRMManager;