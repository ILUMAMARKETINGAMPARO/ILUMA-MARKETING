import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Users, 
  TrendingUp, 
  Target,
  DollarSign,
  ArrowLeft,
  Plus,
  MapPin,
  FileText,
  BarChart3,
  Calculator,
  Eye
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { useSave } from '@/contexts/SaveContext';
import CommercialStats from './commercial/CommercialStats';
import AddClientModal from './commercial/AddClientModal';
import ClientViewKanban from './commercial/ClientViewKanban';
import RevenueSection from './commercial/RevenueSection';
import RevenueDistributionModule from './revenue/RevenueDistributionModule';
import ClientsModule from './modules/ClientsModule';
import SalesPipelineView from './views/SalesPipelineView';
import ActionMenuButton from './foundation/ActionMenuButton';
import SectionWrapper from './foundation/SectionWrapper';
import DocumentManager from './commercial/DocumentManager';
import GeographicView from './commercial/GeographicView';
import CommissionView from './commercial/CommissionView';
import ImportExportManager from './commercial/ImportExportManager';
import RevolveViewerLayout from './commercial/RevolveViewerLayout';
import ImportBusinessModal from './modals/ImportBusinessModal';
import ExportBusinessModal from './modals/ExportBusinessModal';
import ClientsSection from './commercial/ClientsSection';
import EditClientModal from './modals/EditClientModal';
import LiloIntegration from '../lilo/LiloIntegration';
import SaveButton from '@/components/ui/save-button';
import SaveHistoryPanel from './components/SaveHistoryPanel';
import useAutoSave from '@/hooks/useAutoSave';
import SaveIndicator from '@/components/ui/save-indicator';

interface CRMCommercialDashboardProps {
  onBack: () => void;
}

const CRMCommercialDashboard: React.FC<CRMCommercialDashboardProps> = ({ onBack }) => {
  const { user, clients, addClient } = useCRM();
  const { saveClient, saveCommercial } = useSave();
  const [activeTab, setActiveTab] = useState('clients');
  
  // Auto-sauvegarde pour les clients
  const clientsAutoSave = useAutoSave({
    data: clients,
    type: 'client',
    context: 'clients_data',
    description: 'Données clients',
    interval: 3 * 60 * 1000, // 3 minutes
    dependencies: [clients]
  });
  const [clientView, setClientView] = useState('kanban');
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showAddOpportunityModal, setShowAddOpportunityModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Selection states
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  
  // RevolveViewer data
  const [businesses, setBusinesses] = useState<any[]>([]);

  // Form states
  const [clientForm, setClientForm] = useState({
    name: '',
    sector: '',
    address: '',
    email: '',
    phone: '',
    website: '',
    revenue: 0,
    status: 'prospect',
    notes: ''
  });

  const handleAddClient = async () => {
    if (!clientForm.name || !clientForm.sector) return;
    
    const newClient = {
      name: clientForm.name,
      sector: clientForm.sector,
      address: clientForm.address,
      coordinates: { lat: 45.5017, lng: -73.5673 },
      contact: {
        email: clientForm.email,
        phone: clientForm.phone,
        website: clientForm.website
      },
      ilaScore: {
        current: Math.floor(Math.random() * 40) + 30,
        history: [],
        lastUpdated: new Date(),
        trend: 'stable' as 'stable' | 'up' | 'down'
      },
      status: 'prospect' as 'prospect' | 'active' | 'inactive' | 'archived',
      assignedTo: user?.name || 'system',
      services: [],
      revenue: clientForm.revenue,
      notes: '',
      documents: []
    };

    await addClient(newClient);
    
    // Sauvegarde intelligente
    try {
      await saveClient(newClient, `client_${Date.now()}`);
    } catch (error) {
      console.error('Erreur sauvegarde client:', error);
    }
    
    setClientForm({ name: '', sector: '', address: '', email: '', phone: '', website: '', revenue: 0, status: 'prospect', notes: '' });
    setShowAddClientModal(false);
  };

  const modules = [
    { id: 'clients', label: 'Gestion Clients', icon: Users, count: clients.length },
    { id: 'pipeline', label: 'Pipeline de Vente', icon: TrendingUp, count: 0 },
    { id: 'revolveviewer', label: 'RevolveViewer™', icon: MapPin, count: 0 },
    { id: 'revenus', label: 'Revenus & Commissions', icon: DollarSign, count: 0 }
  ];

  const clientViews = [
    { id: 'kanban', label: 'Vue Kanban' },
    { id: 'map', label: 'Vue Géographique' },
    { id: 'table', label: 'Vue Tableau' },
    { id: 'commissions', label: 'Vue Commissions' }
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
                <DollarSign className="w-8 h-8 text-[#FFD56B]" />
                <span className="text-xl font-bold text-white font-['Montserrat']">💰 Section Commercial</span>
              </div>
              <div className="h-6 w-px bg-white/20"></div>
              <div className="text-sm text-white/60 font-['Montserrat']">
                {user?.name} ({user?.role})
              </div>
              <div className="h-6 w-px bg-white/20 mx-3"></div>
              <SaveIndicator
                hasChanges={clientsAutoSave.hasChanges}
                isSaving={clientsAutoSave.isSaving}
                lastSaved={clientsAutoSave.lastSaved}
                onSaveNow={clientsAutoSave.saveNow}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowHistoryPanel(true)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                Historique
              </Button>
              <ActionMenuButton
                currentSection={activeTab}
                onAction={(action) => {
                  switch(action) {
                    case 'add_client':
                      setShowAddClientModal(true);
                      break;
                    case 'add_opportunity':
                      setShowAddOpportunityModal(true);
                      break;
                    case 'import':
                      setShowImportModal(true);
                      break;
                    case 'export':
                      setShowExportModal(true);
                      break;
                    case 'ai_suggest':
                      console.log('AI suggestions');
                      break;
                    default:
                      console.log('Action:', action);
                  }
                }}
                position="top-right"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CommercialStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/20 border border-white/10">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <TabsTrigger 
                  key={module.id} 
                  value={module.id}
                  className="data-[state=active]:bg-[#FFD56B]/20 data-[state=active]:text-[#FFD56B] text-white/60"
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

          {/* Gestion Clients */}
          <TabsContent value="clients">
            <ClientsSection
              selectedClients={selectedClients}
              setSelectedClients={setSelectedClients}
              onAdd={() => setShowAddClientModal(true)}
              onEdit={() => {
                if (selectedClients.length === 1) {
                  const client = clients.find(c => c.id === selectedClients[0]);
                  setEditingItem(client);
                  setClientForm({
                    name: client?.name || '',
                    sector: client?.sector || '',
                    address: client?.address || '',
                    email: client?.contact?.email || '',
                    phone: client?.contact?.phone || '',
                    website: client?.contact?.website || '',
                    revenue: client?.revenue || 0,
                    status: client?.status || 'prospect',
                    notes: client?.notes || ''
                  });
                  setShowEditClientModal(true);
                }
              }}
              onRemove={() => {
                if (selectedClients.length > 0) {
                  console.log('Remove clients:', selectedClients);
                  setSelectedClients([]);
                }
              }}
            />
          </TabsContent>

          {/* Pipeline de Vente */}
          <TabsContent value="pipeline">
            <SalesPipelineView />
          </TabsContent>

          {/* RevolveViewer */}
          <TabsContent value="revolveviewer">
            <div className="space-y-6">
              {/* Connexions Modules Externes */}
              <Card className="glass-effect border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white font-['Montserrat']">
                    🔗 Connexions Modules Iluma™
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => window.open('/rival-views', '_blank')}
                      className="bg-[#8E44FF] hover:bg-[#8E44FF]/80"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      QRVISIBILITÉ™
                    </Button>
                    <Button
                      onClick={() => window.open('/simulateur', '_blank')}
                      className="bg-[#FFD56B] hover:bg-[#FFD56B]/80 text-black"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      ADLUMA™
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#8E44FF]/10 border border-[#8E44FF]/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">QRVISIBILITÉ™</h4>
                    <p className="text-white/60 text-sm">Import automatique des businesses détectés</p>
                  </div>
                  <div className="bg-[#FFD56B]/10 border border-[#FFD56B]/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">ADLUMA™</h4>
                    <p className="text-white/60 text-sm">Création de prospects depuis les simulations</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">ILUMATCH™</h4>
                    <p className="text-white/60 text-sm">Matching intelligent entreprises-partenaires</p>
                  </div>
                </div>
              </Card>

              <RevolveViewerLayout
                selectedBusinesses={selectedOpportunities}
                setSelectedBusinesses={setSelectedOpportunities}
                onImport={() => setShowImportModal(true)}
                onExport={() => setShowExportModal(true)}
                importedBusinesses={businesses}
              />
            </div>
          </TabsContent>

          {/* Revenus & Commissions */}
          <TabsContent value="revenus">
            <RevenueDistributionModule />
          </TabsContent>
        </Tabs>
        

        <AddClientModal
          open={showAddClientModal}
          onOpenChange={setShowAddClientModal}
          clientForm={clientForm}
          setClientForm={setClientForm}
          onAddClient={handleAddClient}
        />

        <EditClientModal
          isOpen={showEditClientModal}
          onClose={() => setShowEditClientModal(false)}
          onSave={() => {
            // Client update logic implemented
            console.log('Save client:', clientForm);
            setShowEditClientModal(false);
            setEditingItem(null);
            setClientForm({ name: '', sector: '', address: '', email: '', phone: '', website: '', revenue: 0, status: 'prospect', notes: '' });
          }}
          clientForm={clientForm}
          setClientForm={setClientForm}
          editingItem={editingItem}
        />

        {/* Import Modal */}
        <ImportBusinessModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={(importedData) => {
            setBusinesses(prev => [...prev, ...importedData]);
            console.log('Données importées:', importedData);
          }}
        />

        {/* Export Modal */}
        <ExportBusinessModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          businesses={businesses}
          selectedBusinesses={selectedOpportunities}
        />

        <LiloIntegration
          context="commercial"
          currentSection={activeTab}
          onSuggestion={(suggestion) => {
            console.log('LILO Suggestion:', suggestion);
            // Handle AI suggestions
          }}
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

export default CRMCommercialDashboard;