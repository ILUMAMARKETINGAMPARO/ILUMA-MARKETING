import React, { createContext, useContext, useState } from 'react';
import { ILAContextType, ILAProject } from '@/types/ila';
import { calculateILAScore } from '@/utils/ilaCalculations';
import { mockILAProjects } from '@/data/mockILAProjects';

const ILAContext = createContext<ILAContextType | undefined>(undefined);

export const ILAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ILAProject[]>(mockILAProjects);
  const [currentProject, setCurrentProject] = useState<ILAProject | null>(projects[0]);

  const updateProjectScore = (projectId: string, moduleId: string, score: number) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedModuleScores = { ...project.moduleScores, [moduleId]: score };
        const avgScore = Object.values(updatedModuleScores).reduce((a, b) => a + b, 0) / Object.values(updatedModuleScores).length;
        
        return {
          ...project,
          moduleScores: updatedModuleScores,
          analysis: {
            ...project.analysis,
            overallScore: Math.round(avgScore)
          },
          lastUpdated: new Date()
        };
      }
      return project;
    }));
  };

  const getProjectRecommendations = (projectId: string): string[] => {
    const project = projects.find(p => p.id === projectId);
    return project?.analysis.recommendations || [];
  };

  const interconnectModules = async (projectId: string): Promise<void> => {
    // Simulation d'interconnexion des modules
    console.log(`Interconnecting modules for project ${projectId}`);
    
    // Synchronisation des données entre modules
    const project = projects.find(p => p.id === projectId);
    if (project) {
      // Mise à jour des scores des modules MPE
      Object.entries(project.moduleScores).forEach(([moduleId, score]) => {
        // Logique d'interconnexion simulée
        console.log(`Module ${moduleId} synchronized with score ${score}`);
      });
    }
  };

  return (
    <ILAContext.Provider value={{
      projects,
      currentProject,
      setCurrentProject,
      calculateILAScore,
      updateProjectScore,
      getProjectRecommendations,
      interconnectModules
    }}>
      {children}
    </ILAContext.Provider>
  );
};

export const useILA = () => {
  const context = useContext(ILAContext);
  if (!context) {
    throw new Error('useILA must be used within an ILAProvider');
  }
  return context;
};