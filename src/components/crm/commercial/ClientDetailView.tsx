import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
  Target,
  MessageSquare,
  Instagram,
  Facebook,
  Hash,
  ExternalLink,
  Save,
  Edit3,
  Building2,
  DollarSign
} from 'lucide-react';
import { ClientFiche } from '@/types/crm';
import { useCRM } from '@/contexts/CRMContext';
import { toast } from 'sonner';

interface ClientDetailViewProps {
  client: ClientFiche;
  onBack: () => void;
  onUpdate: (updates: Partial<ClientFiche>) => void;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ client, onBack, onUpdate }) => {
  const { updateClient } = useCRM();
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(client.notes || '');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: client.name,
    sector: client.sector,
    address: client.address,
    phone: client.contact?.phone || '',
    email: client.contact?.email || '',
    website: client.contact?.website || ''
  });

  const handleSaveNotes = async () => {
    try {
      await updateClient(client.id, { notes });
      onUpdate({ notes });
      setEditingNotes(false);
      toast.success('Notes sauvegardées avec succès');
    } catch (error) {
      console.error('Erreur sauvegarde notes:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updates = {
        name: editForm.name,
        sector: editForm.sector,
        address: editForm.address,
        contact: {
          ...client.contact,
          phone: editForm.phone,
          email: editForm.email,
          website: editForm.website
        }
      };
      await updateClient(client.id, updates);
      onUpdate(updates);
      setIsEditing(false);
      toast.success('Client mis à jour avec succès');
    } catch (error) {
      console.error('Erreur mise à jour client:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'prospect': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'inactive': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black"
    >
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-10">
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
              <div className="w-12 h-12 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl font-['Montserrat']">
                  {client.name?.charAt(0) || 'N'}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-['Montserrat']">
                  {client.name}
                </h1>
                <p className="text-white/60 text-sm">{client.sector}</p>
              </div>
              <Badge className={`${getStatusColor(client.status)} border ml-4`}>
                {client.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {isEditing ? 'Annuler' : 'Modifier'}
              </Button>
              {isEditing && (
                <Button
                  onClick={handleSaveEdit}
                  size="sm"
                  className="bg-gradient-to-r from-green-600 to-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <Card className="glass-effect border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 font-['Montserrat']">
                Informations générales
              </h2>
              
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/70">Nom de l'entreprise</Label>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Secteur</Label>
                    <Input
                      value={editForm.sector}
                      onChange={(e) => setEditForm({...editForm, sector: e.target.value})}
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-white/70">Adresse</Label>
                    <Input
                      value={editForm.address}
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Téléphone</Label>
                    <Input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Email</Label>
                    <Input
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-white/70">Site Web</Label>
                    <Input
                      value={editForm.website}
                      onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                      className="bg-black/20 border-white/20 text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-white/70">
                    <Building2 className="w-5 h-5 text-[#8E44FF]" />
                    <div>
                      <p className="text-xs text-white/50">Secteur</p>
                      <p className="text-white">{client.sector}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin className="w-5 h-5 text-[#FFD56B]" />
                    <div>
                      <p className="text-xs text-white/50">Adresse</p>
                      <p className="text-white">{client.address || 'Non renseignée'}</p>
                    </div>
                  </div>
                  
                  {client.contact?.phone && (
                    <div className="flex items-center gap-3 text-white/70">
                      <Phone className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-xs text-white/50">Téléphone</p>
                        <p className="text-white">{client.contact.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.contact?.email && (
                    <div className="flex items-center gap-3 text-white/70">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-xs text-white/50">Email</p>
                        <p className="text-white">{client.contact.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.contact?.website && (
                    <div className="flex items-center gap-3 text-white/70 md:col-span-2">
                      <Globe className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-xs text-white/50">Site Web</p>
                        <a 
                          href={client.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          {client.contact.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Données Excel complètes */}
            <Card className="glass-effect border-white/20 p-6">
              <h2 className="text-xl font-bold text-white mb-4 font-['Montserrat']">
                Données de Visibilité & Performance
              </h2>
              
              <Tabs defaultValue="visibility" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6 bg-black/20 border border-white/10">
                  <TabsTrigger value="visibility" className="data-[state=active]:bg-[#8E44FF]/20">
                    Visibilité
                  </TabsTrigger>
                  <TabsTrigger value="social" className="data-[state=active]:bg-[#FFD56B]/20">
                    Social
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="data-[state=active]:bg-blue-500/20">
                    SEO
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-green-500/20">
                    Analytics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="visibility" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <Star className="w-6 h-6 text-yellow-400 mb-2" />
                      <p className="text-2xl font-bold text-yellow-400">
                        {client.excelData?.googleRating || 0}
                      </p>
                      <p className="text-xs text-white/60">Note Google</p>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <MessageSquare className="w-6 h-6 text-blue-400 mb-2" />
                      <p className="text-2xl font-bold text-blue-400">
                        {client.excelData?.reviewCount || 0}
                      </p>
                      <p className="text-xs text-white/60">Avis Google</p>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <Building2 className="w-6 h-6 text-purple-400 mb-2" />
                      <p className="text-2xl font-bold text-purple-400">
                        {client.excelData?.nbSuccursales || 1}
                      </p>
                      <p className="text-xs text-white/60">Succursales</p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <Target className="w-6 h-6 text-green-400 mb-2" />
                      <p className="text-2xl font-bold text-green-400">
                        {client.ilaScore.current}
                      </p>
                      <p className="text-xs text-white/60">Score ILA™</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                      <Instagram className="w-6 h-6 text-pink-400 mb-2" />
                      <p className="text-2xl font-bold text-pink-400">
                        {client.excelData?.followersInstagram?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-white/60">Followers Instagram</p>
                    </div>
                    
                    <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                      <Facebook className="w-6 h-6 text-blue-500 mb-2" />
                      <p className="text-2xl font-bold text-blue-500">
                        {client.excelData?.followersFacebook?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-white/60">Followers Facebook</p>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <Hash className="w-6 h-6 text-red-400 mb-2" />
                      <p className="text-2xl font-bold text-red-400">
                        {client.excelData?.followersTikTok?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-white/60">Followers TikTok</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                      <BarChart3 className="w-6 h-6 text-orange-400 mb-2" />
                      <p className="text-2xl font-bold text-orange-400">
                        {client.excelData?.domainRating || 0}
                      </p>
                      <p className="text-xs text-white/60">Domain Rating</p>
                    </div>
                    
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                      <TrendingUp className="w-6 h-6 text-cyan-400 mb-2" />
                      <p className="text-2xl font-bold text-cyan-400">
                        {client.excelData?.totalKeywords?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-white/60">Mots-clés</p>
                    </div>
                    
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                      <Hash className="w-6 h-6 text-indigo-400 mb-2" />
                      <p className="text-2xl font-bold text-indigo-400">
                        {client.excelData?.backlinks?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-white/60">Backlinks</p>
                    </div>
                    
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                      <Globe className="w-6 h-6 text-emerald-400 mb-2" />
                      <p className="text-2xl font-bold text-emerald-400">
                        {client.excelData?.refDomains?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-white/60">Domaines Référents</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4">
                      <Users className="w-6 h-6 text-violet-400 mb-2" />
                      <p className="text-2xl font-bold text-violet-400">
                        {client.excelData?.totalTraffic?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-white/60">Trafic Total</p>
                    </div>
                    
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
                      <DollarSign className="w-6 h-6 text-rose-400 mb-2" />
                      <p className="text-2xl font-bold text-rose-400">
                        {client.excelData?.industrySpecific.cpcMoyen || 0}€
                      </p>
                      <p className="text-xs text-white/60">CPC Moyen</p>
                    </div>
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                      <BarChart3 className="w-6 h-6 text-amber-400 mb-2" />
                      <p className="text-2xl font-bold text-amber-400">
                        {client.excelData?.industrySpecific.pagesIndexees || 0}
                      </p>
                      <p className="text-xs text-white/60">Pages Indexées</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Notes */}
            <Card className="glass-effect border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white font-['Montserrat']">
                  Notes CRM
                </h2>
                <Button
                  onClick={() => editingNotes ? handleSaveNotes() : setEditingNotes(true)}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600"
                >
                  {editingNotes ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                  {editingNotes ? 'Sauvegarder' : 'Modifier'}
                </Button>
              </div>
              
              {editingNotes ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez vos notes sur ce client..."
                  className="min-h-[150px] bg-black/20 border-white/20 text-white resize-none"
                />
              ) : (
                <div className="bg-black/20 border border-white/10 rounded-lg p-4 min-h-[150px]">
                  {notes ? (
                    <p className="text-white/80 whitespace-pre-wrap">{notes}</p>
                  ) : (
                    <p className="text-white/40 italic">Aucune note ajoutée. Cliquez sur Modifier pour commencer.</p>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Score ILA */}
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
                Score ILA™
              </h3>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(client.ilaScore.current)}`}>
                  {client.ilaScore.current}/100
                </div>
                <div className="flex items-center justify-center gap-2 text-white/60">
                  <TrendingUp className={`w-4 h-4 ${client.ilaScore.trend === 'up' ? 'text-green-400' : 'text-yellow-400'}`} />
                  <span className="text-sm">
                    {client.ilaScore.trend === 'up' ? 'En progression' : 'Stable'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Services */}
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
                Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {client.services.map((service, index) => (
                  <Badge key={index} variant="outline" className="border-white/20 text-white/70">
                    {service}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Métadonnées */}
            <Card className="glass-effect border-white/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
                Informations
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <Calendar className="w-4 h-4" />
                  <span>Créé le {client.createdAt.toLocaleDateString()}</span>
                </div>
                {client.lastContact && (
                  <div className="flex items-center gap-2 text-white/60">
                    <MessageSquare className="w-4 h-4" />
                    <span>Dernier contact: {client.lastContact.toLocaleDateString()}</span>
                  </div>
                )}
                {client.assignedTo && (
                  <div className="flex items-center gap-2 text-white/60">
                    <Users className="w-4 h-4" />
                    <span>Assigné à: {client.assignedTo}</span>
                  </div>
                )}
                {client.potentialValue && (
                  <div className="flex items-center gap-2 text-white/60">
                    <DollarSign className="w-4 h-4" />
                    <span>Valeur potentielle: {client.potentialValue.toLocaleString()}€</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientDetailView;