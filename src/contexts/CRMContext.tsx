import React, { createContext, useContext, useState, useEffect } from 'react';
import { CRMContextType, CRMUser, ClientFiche, ProjectFiche, Task, JournalEntry, ProspectionQuery, ProspectionResult } from '@/types/crm';

const CRMContext = createContext<CRMContextType | undefined>(undefined);

// Mock data
const mockUser: CRMUser = {
  id: '1',
  email: 'sergio@ilumamarketing.com',
  name: 'Sergio David Ortega-Ramos',
  role: 'CEO',
  permissions: ['all'],
  lastLogin: new Date()
};

const mockClients: ClientFiche[] = [
  {
    id: '1',
    name: 'Katz Sport',
    sector: 'Sport et Équipements',
    address: '6020 Jean-Talon E, Saint-Léonard, QC H1S 3A1',
    coordinates: { lat: 45.5879, lng: -73.5891 },
    contact: {
      email: 'info@katzsport.com',
      phone: '(514) 256-9051',
      website: 'https://katzsport.com',
      gmbUrl: 'https://www.google.com/maps/place/Katz+Sport/'
    },
    ilaScore: {
      current: 87,
      history: [
        { date: new Date('2024-01-01'), score: 72 },
        { date: new Date('2024-02-01'), score: 79 },
        { date: new Date('2024-03-01'), score: 87 }
      ],
      lastUpdated: new Date(),
      trend: 'up'
    },
    status: 'active',
    assignedTo: 'Sergio David Ortega-Ramos',
    services: ['SEO Local', 'Google Ads', 'Optimisation GMB'],
    revenue: 3200,
    notes: 'Spécialiste équipements de crosse - Excellent ROI SEO local',
    documents: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Literie d\'Amitié',
    sector: 'Literie et Matelas',
    address: '2055 Boul. de Maisonneuve O, Montréal, QC H3H 1K4',
    coordinates: { lat: 45.4940, lng: -73.5837 },
    contact: {
      email: 'info@literiedamitie.ca',
      phone: '(514) 932-1515',
      website: 'https://literiedamitie.ca',
      gmbUrl: 'https://www.google.com/maps/place/Literie+d\'Amitié/'
    },
    ilaScore: {
      current: 93,
      history: [
        { date: new Date('2024-01-01'), score: 85 },
        { date: new Date('2024-02-01'), score: 89 },
        { date: new Date('2024-03-01'), score: 93 }
      ],
      lastUpdated: new Date(),
      trend: 'up'
    },
    status: 'active',
    assignedTo: 'Amparo Lopez',
    services: ['CRM Iluma', 'Landing Page Intelligente', 'ILUMATCH', 'BlogIA'],
    revenue: 5800,
    notes: 'Leader literie Montréal - Croissance exceptionnelle avec nos solutions IA',
    documents: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Matelas Repentigny',
    sector: 'Literie et Matelas',
    address: '401 Rue Notre-Dame, Repentigny, QC J6A 2T1',
    coordinates: { lat: 45.7372, lng: -73.4497 },
    contact: {
      email: 'info@matelasrepentigny.ca',
      phone: '(450) 582-7777',
      website: 'https://matelasrepentigny.ca',
      gmbUrl: 'https://www.google.com/maps/place/Matelas+Repentigny/'
    },
    ilaScore: {
      current: 78,
      history: [
        { date: new Date('2024-01-01'), score: 68 },
        { date: new Date('2024-02-01'), score: 73 },
        { date: new Date('2024-03-01'), score: 78 }
      ],
      lastUpdated: new Date(),
      trend: 'up'
    },
    status: 'prospect',
    assignedTo: 'J-C Beaumont',
    services: ['Évaluation ILA', 'SEO Local'],
    revenue: 1850,
    notes: 'Prospect prometteur - Spécialiste matelas Repentigny - Potentiel élevé',
    documents: [],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date()
  }
];

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CRMUser | null>(null);
  const [clients, setClients] = useState<ClientFiche[]>(() => {
    // Charger les clients sauvegardés
    const saved = localStorage.getItem('iluma_client_clients_data');
    return saved ? JSON.parse(saved) : mockClients;
  });
  const [projects, setProjects] = useState<ProjectFiche[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientFiche | null>(null);
  const [team, setTeam] = useState<CRMUser[]>(() => {
    // Équipe Iluma réelle
    const realTeam = [
      {
        id: 'sergio',
        email: 'sergio.ramos@ilumamarketing.com',
        name: 'Sergio David Ortega-Ramos',
        role: 'CEO' as const,
        permissions: ['all'],
        lastLogin: new Date()
      },
      {
        id: 'amparo',
        email: 'amparo.lopez@ilumamarketing.com',
        name: 'Amparo Lopez',
        role: 'COO' as const,
        permissions: ['all'],
        lastLogin: new Date()
      },
      {
        id: 'jc',
        email: 'jc.beaumont@ilumamarketing.com',
        name: 'J-C Beaumont',
        role: 'Dev' as const,
        permissions: ['clients', 'projects'],
        lastLogin: new Date()
      },
      {
        id: 'belen',
        email: 'belen.assistant@ilumamarketing.com',
        name: 'Belén Assistant',
        role: 'Assistant' as const,
        permissions: ['clients'],
        lastLogin: new Date()
      }
    ];

    // Charger et valider les données sauvegardées
    const saved = localStorage.getItem('iluma_collaborateur_team_data');
    if (saved) {
      try {
        const parsedTeam = JSON.parse(saved);
        // Valider et nettoyer les données corrompues
        const validTeam = parsedTeam.filter((member: any) => 
          member && 
          typeof member.name === 'string' && 
          member.name.trim() !== '' &&
          typeof member.email === 'string' &&
          member.email.trim() !== ''
        );
        
        if (validTeam.length !== parsedTeam.length) {
          console.warn('Données de collaborateurs corrompues détectées et nettoyées:', 
            parsedTeam.length - validTeam.length, 'entrées supprimées');
        }
        
        return validTeam.length > 0 ? validTeam : realTeam;
      } catch (error) {
        console.error('Erreur lors du chargement des données collaborateurs:', error);
        return realTeam;
      }
    }
    return realTeam;
  });

  // Synchronisation automatique des données team vers localStorage
  useEffect(() => {
    try {
      localStorage.setItem('iluma_collaborateur_team_data', JSON.stringify(team));
    } catch (error) {
      console.error('Erreur sauvegarde équipe:', error);
    }
  }, [team]);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulation d'authentification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'sergio.ramos@ilumamarketing.com' && password === '1I2l3u4m5a6G7u8a9temalaAlyssa1!') {
      setUser(mockUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addClient = async (clientData: Omit<ClientFiche, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newClient: ClientFiche = {
      ...clientData,
      id: `client_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setClients(prev => [...prev, newClient]);
    
    // Add journal entry
    await addJournalEntry({
      type: 'success',
      title: 'Nouveau client ajouté',
      content: `${newClient.name} a été ajouté au CRM`,
      relatedTo: { type: 'client', id: newClient.id },
      author: user?.name || 'System',
      aiGenerated: false
    });
  };

  const updateClient = async (id: string, updates: Partial<ClientFiche>) => {
    setClients(prev => prev.map(client => 
      client.id === id 
        ? { ...client, ...updates, updatedAt: new Date() }
        : client
    ));
  };

  const deleteClient = async (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  const addProject = async (projectData: Omit<ProjectFiche, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: ProjectFiche = {
      ...projectData,
      id: `project_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = async (id: string, updates: Partial<ProjectFiche>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date() }
        : project
    ));
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const addJournalEntry = async (entryData: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: `journal_${Date.now()}`,
      timestamp: new Date()
    };
    
    setJournal(prev => [newEntry, ...prev]);
  };

  const calculateILA = async (clientId: string) => {
    setIsLoading(true);
    
    // Simulation du calcul ILA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newScore = Math.floor(Math.random() * 30) + 70;
    
    await updateClient(clientId, {
      ilaScore: {
        current: newScore,
        history: clients.find(c => c.id === clientId)?.ilaScore.history || [],
        lastUpdated: new Date(),
        trend: newScore > 80 ? 'up' : 'stable'
      }
    });
    
    await addJournalEntry({
      type: 'ai_analysis',
      title: 'Score ILA™ mis à jour',
      content: `Nouveau score calculé: ${newScore}/100`,
      relatedTo: { type: 'client', id: clientId },
      author: 'IA ILUMA™',
      aiGenerated: true
    });
    
    setIsLoading(false);
  };

  const findMatches = async (clientId: string) => {
    setIsLoading(true);
    
    // Simulation ILUMATCH
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    await addJournalEntry({
      type: 'ai_analysis',
      title: 'Analyse ILUMATCH™ terminée',
      content: '3 partenaires potentiels identifiés',
      relatedTo: { type: 'client', id: clientId },
      author: 'IA ILUMATCH™',
      aiGenerated: true
    });
    
    setIsLoading(false);
  };

  const performProspection = async (query: ProspectionQuery): Promise<ProspectionResult> => {
    setIsLoading(true);
    
    // Simulation de prospection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults: ProspectionResult = {
      businesses: clients.slice(0, 3),
      matches: [
        {
          business1: clients[0],
          business2: clients[1],
          compatibility: 87,
          pitch: 'Partenariat stratégique restaurant-santé pour clientèle wellness',
          cta: 'Activer ce partenariat ILUMATCH™'
        }
      ],
      mapData: {
        center: { lat: 45.5017, lng: -73.5673 },
        zoom: 12,
        markers: clients.map(client => ({
          id: client.id,
          position: client.coordinates,
          score: client.ilaScore.current,
          name: client.name
        }))
      }
    };
    
    setIsLoading(false);
    return mockResults;
  };

  const addTeamMember = async (memberData: Omit<CRMUser, 'id' | 'lastLogin'>) => {
    const newMember: CRMUser = {
      ...memberData,
      id: `member_${Date.now()}`,
      lastLogin: new Date()
    };
    
    const updatedTeam = [...team, newMember];
    setTeam(updatedTeam);
    
    // Vérification immédiate de la persistance
    try {
      localStorage.setItem('iluma_collaborateur_team_data', JSON.stringify(updatedTeam));
      const verification = localStorage.getItem('iluma_collaborateur_team_data');
      if (!verification || !JSON.parse(verification).find((m: any) => m.id === newMember.id)) {
        throw new Error('Échec de la vérification de persistance');
      }
      
      await addJournalEntry({
        type: 'success',
        title: 'Nouveau collaborateur ajouté',
        content: `${newMember.name} a été ajouté à l'équipe avec succès`,
        relatedTo: { type: 'client', id: newMember.id },
        author: user?.name || 'System',
        aiGenerated: false
      });
      
      return newMember;
    } catch (error) {
      // Rollback en cas d'erreur
      setTeam(team);
      throw new Error('Erreur lors de la sauvegarde du collaborateur');
    }
  };

  const updateTeamMember = async (id: string, updates: Partial<CRMUser>) => {
    const updatedTeam = team.map(member => 
      member.id === id 
        ? { ...member, ...updates, lastLogin: new Date() }
        : member
    );
    
    setTeam(updatedTeam);
    
    // Vérification de la persistance
    try {
      localStorage.setItem('iluma_collaborateur_team_data', JSON.stringify(updatedTeam));
      const verification = localStorage.getItem('iluma_collaborateur_team_data');
      if (!verification) {
        throw new Error('Échec de la vérification de persistance');
      }
    } catch (error) {
      setTeam(team); // Rollback
      throw error;
    }
  };

  const deleteTeamMember = async (id: string) => {
    const updatedTeam = team.filter(member => member.id !== id);
    setTeam(updatedTeam);
    
    try {
      localStorage.setItem('iluma_collaborateur_team_data', JSON.stringify(updatedTeam));
    } catch (error) {
      setTeam(team); // Rollback
      throw error;
    }
  };

  const exportData = async (format: 'pdf' | 'csv' | 'md', type: 'clients' | 'projects' | 'tasks') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulation d'export
    console.log(`Exporting ${type} as ${format}`);
    
    await addJournalEntry({
      type: 'update',
      title: `Export ${format.toUpperCase()} généré`,
      content: `Données ${type} exportées avec succès`,
      relatedTo: { type: 'client', id: 'system' },
      author: user?.name || 'System',
      aiGenerated: false
    });
    
    setIsLoading(false);
  };

  return (
    <CRMContext.Provider value={{
      user,
      clients,
      projects,
      tasks,
      setTasks,
      team,
      setTeam,
      journal,
      selectedClient,
      setSelectedClient,
      isLoading,
      login,
      logout,
      addClient,
      updateClient,
      deleteClient,
      addProject,
      updateProject,
      addTask,
      updateTask,
      addJournalEntry,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      calculateILA,
      findMatches,
      performProspection,
      exportData
    }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};