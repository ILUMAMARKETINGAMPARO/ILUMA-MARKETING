export interface ILAMetrics {
  seoScore: number;
  contentScore: number;
  conversionScore: number;
  engagementScore: number;
  technicalScore: number;
}

export interface ILAAnalysis {
  overallScore: number;
  metrics: ILAMetrics;
  trends: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
  recommendations: string[];
  riskFactors: string[];
  opportunities: string[];
}

export interface ILAProject {
  id: string;
  name: string;
  clientId: string;
  moduleScores: Record<string, number>;
  analysis: ILAAnalysis;
  lastUpdated: Date;
  assignedTeamMember?: string;
}

export interface ILAContextType {
  projects: ILAProject[];
  currentProject: ILAProject | null;
  setCurrentProject: (project: ILAProject) => void;
  calculateILAScore: (metrics: Partial<ILAMetrics>) => Promise<ILAAnalysis>;
  updateProjectScore: (projectId: string, moduleId: string, score: number) => void;
  getProjectRecommendations: (projectId: string) => string[];
  interconnectModules: (projectId: string) => Promise<void>;
}