export interface CRMUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'CEO' | 'COO' | 'PM' | 'SEO' | 'Dev' | 'Assistant' | 'readonly';
  avatar?: string;
  lastLogin: Date;
  permissions: string[];
}

export interface ClientFiche {
  id: string;
  name: string;
  sector: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    email?: string;
    phone?: string;
    website?: string;
    gmbUrl?: string;
  };
  ilaScore: {
    current: number;
    history: Array<{ date: Date; score: number }>;
    lastUpdated: Date;
    trend: 'up' | 'down' | 'stable';
  };
  status: 'prospect' | 'active' | 'inactive' | 'archived';
  assignedTo: string;
  services: string[];
  revenue: number;
  notes: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectFiche {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  startDate: Date;
  endDate: Date;
  assignedTeam: string[];
  modules: string[];
  progress: number;
  tasks: Task[];
  deliverables: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: Date;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalEntry {
  id: string;
  type: 'decision' | 'update' | 'issue' | 'success' | 'ai_analysis';
  title: string;
  content: string;
  relatedTo: {
    type: 'client' | 'project' | 'task';
    id: string;
  };
  author: string;
  timestamp: Date;
  aiGenerated: boolean;
}

export interface ProspectionQuery {
  ville: string;
  secteur: string;
  motsCles: string[];
  ilaScoreMin: number;
  rayonKm: number;
  statusIlumatch: 'all' | 'perfect' | 'compensatory' | 'none';
}

export interface ProspectionResult {
  businesses: ClientFiche[];
  matches: Array<{
    business1: ClientFiche;
    business2: ClientFiche;
    compatibility: number;
    pitch: string;
    cta: string;
  }>;
  mapData: {
    center: { lat: number; lng: number };
    zoom: number;
    markers: Array<{
      id: string;
      position: { lat: number; lng: number };
      score: number;
      name: string;
    }>;
  };
}

// Revenue Distribution Types
export type IlumaRole = 
  | 'ceo' 
  | 'coo' 
  | 'developer' 
  | 'social_media' 
  | 'partnerships' 
  | 'technical_support' 
  | 'creative_design' 
  | 'digital_tools' 
  | 'strategic_reserve' 
  | 'fixed_costs';

export interface RoleAssignment {
  role: IlumaRole;
  assignedTo: string; // nom du collaborateur ou "system" pour les rôles automatiques
  percentage: number;
  description: string;
  color: string;
}

export interface ProjectRevenueDistribution {
  projectId: string;
  totalRevenue: number;
  assignments: RoleAssignment[];
  strategicReserve: {
    amount: number;
    allocated: {
      tools: number;
      bonuses: number;
      remaining: number;
    };
    history: Array<{
      date: Date;
      type: 'tools' | 'bonus' | 'allocation';
      amount: number;
      description: string;
    }>;
  };
  calculatedAt: Date;
  status: 'draft' | 'approved' | 'paid';
}

export interface QuarterlyBonus {
  id: string;
  quarter: string; // "2024-Q1"
  year: number;
  totalAmount: number;
  distributions: Array<{
    collaboratorName: string;
    amount: number;
    merit: number; // score de 1-100
    involvement: number; // score de 1-100
  }>;
  createdAt: Date;
  paidAt?: Date;
}

export interface CRMContextType {
  user: CRMUser | null;
  clients: ClientFiche[];
  projects: ProjectFiche[];
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  team: CRMUser[];
  setTeam: React.Dispatch<React.SetStateAction<CRMUser[]>>;
  journal: JournalEntry[];
  isLoading: boolean;
  
  // Auth simulation
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Client management
  addClient: (client: Omit<ClientFiche, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateClient: (id: string, updates: Partial<ClientFiche>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  
  // Project management
  addProject: (project: Omit<ProjectFiche, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (id: string, updates: Partial<ProjectFiche>) => Promise<void>;
  
  // Task management
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  
  // Team management
  addTeamMember: (member: Omit<CRMUser, 'id' | 'lastLogin'>) => Promise<CRMUser>;
  updateTeamMember: (id: string, updates: Partial<CRMUser>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  
  // Journal
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => Promise<void>;
  
  // AI Features
  calculateILA: (clientId: string) => Promise<void>;
  findMatches: (clientId: string) => Promise<void>;
  performProspection: (query: ProspectionQuery) => Promise<ProspectionResult>;
  
  // Client selection
  selectedClient: ClientFiche | null;
  setSelectedClient: (client: ClientFiche | null) => void;
  
  // Export
  exportData: (format: 'pdf' | 'csv' | 'md', type: 'clients' | 'projects' | 'tasks') => Promise<void>;
}