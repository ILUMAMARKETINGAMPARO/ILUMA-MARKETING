import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  assignedTo: string[];
  status: 'planning' | 'active' | 'review' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  dueDate: string;
  progress: number;
  revenue: number;
  estimatedRevenue: number;
  description: string;
  tasks: string[];
  meetings: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectContextType {
  projects: Project[];
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectsByClient: (clientId: string) => Project[];
  getProjectsByStatus: (status: Project['status']) => Project[];
  getProjectsByAssignee: (assignee: string) => Project[];
  generateProjectSuggestions: (clientId: string) => string[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj_1',
      name: 'Site Web Restaurant La Table',
      clientId: 'client_1',
      clientName: 'Restaurant La Table',
      assignedTo: ['Andrea Martinez', 'Alex Thompson'],
      status: 'active',
      priority: 'high',
      startDate: '2024-01-15',
      dueDate: '2024-02-28',
      progress: 75,
      revenue: 3500,
      estimatedRevenue: 4000,
      description: 'Création complète du site web avec réservation en ligne et menu interactif',
      tasks: ['task_1', 'task_2'],
      meetings: ['meeting_1'],
      tags: ['web', 'restaurant', 'ecommerce'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date()
    },
    {
      id: 'proj_2',
      name: 'Campagne SEO Clinique Santé',
      clientId: 'client_2',
      clientName: 'Clinique Santé Plus',
      assignedTo: ['Sergio Ramos'],
      status: 'planning',
      priority: 'medium',
      startDate: '2024-02-01',
      dueDate: '2024-05-01',
      progress: 25,
      revenue: 0,
      estimatedRevenue: 2800,
      description: 'Optimisation SEO locale et création de contenu spécialisé santé',
      tasks: [],
      meetings: [],
      tags: ['seo', 'santé', 'local'],
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date()
    }
  ]);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates, updatedAt: new Date() } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const getProjectsByClient = (clientId: string) => {
    return projects.filter(project => project.clientId === clientId);
  };

  const getProjectsByStatus = (status: Project['status']) => {
    return projects.filter(project => project.status === status);
  };

  const getProjectsByAssignee = (assignee: string) => {
    return projects.filter(project => project.assignedTo.includes(assignee));
  };

  const generateProjectSuggestions = (clientId: string): string[] => {
    return [
      "Ajouter module BlogIA pour améliorer le SEO",
      "Proposer landing page intelligente pour conversion",
      "Intégrer ADLUMA™ pour optimiser les campagnes pub",
    ];
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      createProject,
      updateProject,
      deleteProject,
      getProjectsByClient,
      getProjectsByStatus,
      getProjectsByAssignee,
      generateProjectSuggestions,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};