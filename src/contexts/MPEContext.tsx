import React, { createContext, useContext, useState, useEffect } from 'react';

interface MPEModule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'loading';
  prompts: GPTPrompt[];
  crmConnected: boolean;
  ilaScore?: number;
}

interface GPTPrompt {
  id: string;
  title: string;
  context: string;
  prompt: string;
  category: 'seo' | 'content' | 'analysis' | 'strategy' | 'conversion';
}

interface MPEContextType {
  modules: MPEModule[];
  activeModule: MPEModule | null;
  setActiveModule: (module: MPEModule) => void;
  executePrompt: (promptId: string, context?: any) => Promise<string>;
  updateILAScore: (moduleId: string, score: number) => void;
  connectToCRM: (moduleId: string, data: any) => Promise<boolean>;
}

const MPEContext = createContext<MPEContextType | undefined>(undefined);

export const MPEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<MPEModule[]>([
    {
      id: 'adluma',
      name: 'ADLUMA',
      description: 'Module d\'analyse et recommandations IA',
      status: 'active',
      crmConnected: true,
      ilaScore: 85,
      prompts: [
        {
          id: 'adluma-analysis',
          title: 'Analyse complète du profil client',
          context: 'Analyse des données client pour recommandations personnalisées',
          prompt: 'Analysez ce profil client et proposez 3 recommandations stratégiques prioritaires',
          category: 'analysis'
        }
      ]
    },
    {
      id: 'blogia',
      name: 'BlogIA',
      description: 'Générateur de contenu SEO intelligent',
      status: 'active',
      crmConnected: true,
      ilaScore: 92,
      prompts: [
        {
          id: 'blogia-content',
          title: 'Génération d\'article SEO',
          context: 'Création de contenu optimisé pour le référencement',
          prompt: 'Créez un article de blog SEO de 1500 mots sur le sujet suivant',
          category: 'content'
        }
      ]
    },
    {
      id: 'hub',
      name: 'HUB',
      description: 'Centre de contrôle unifié des services',
      status: 'active',
      crmConnected: true,
      ilaScore: 88,
      prompts: [
        {
          id: 'hub-strategy',
          title: 'Stratégie marketing globale',
          context: 'Vue d\'ensemble et coordination des services',
          prompt: 'Développez une stratégie marketing intégrée pour ce client',
          category: 'strategy'
        }
      ]
    },
    {
      id: 'ila',
      name: 'ILA',
      description: 'Système de scoring et évaluation avancé',
      status: 'active',
      crmConnected: true,
      ilaScore: 95,
      prompts: [
        {
          id: 'ila-scoring',
          title: 'Calcul du score ILA',
          context: 'Évaluation des performances et potentiel',
          prompt: 'Calculez et justifiez le score ILA pour ce projet',
          category: 'analysis'
        }
      ]
    },
    {
      id: 'illumatch',
      name: 'ILLUMATCH',
      description: 'Matching intelligent client-service',
      status: 'active',
      crmConnected: true,
      ilaScore: 90,
      prompts: [
        {
          id: 'illumatch-matching',
          title: 'Matching client-service optimal',
          context: 'Correspondance intelligente besoins-solutions',
          prompt: 'Identifiez le service Iluma le plus adapté à ce profil client',
          category: 'strategy'
        }
      ]
    },
    {
      id: 'landingpage',
      name: 'LandingPage',
      description: 'Générateur de pages de conversion',
      status: 'active',
      crmConnected: true,
      ilaScore: 87,
      prompts: [
        {
          id: 'landing-optimization',
          title: 'Optimisation de conversion',
          context: 'Amélioration des taux de conversion',
          prompt: 'Optimisez cette page de destination pour maximiser les conversions',
          category: 'conversion'
        }
      ]
    }
  ]);

  const [activeModule, setActiveModule] = useState<MPEModule | null>(null);

  const executePrompt = async (promptId: string, context?: any): Promise<string> => {
    console.log(`Exécution du prompt ${promptId} avec contexte:`, context);
    // Simulation d'appel GPT - à connecter avec l'API réelle
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Résultat simulé pour le prompt ${promptId}`);
      }, 1000);
    });
  };

  const updateILAScore = (moduleId: string, score: number) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId ? { ...module, ilaScore: score } : module
    ));
  };

  const connectToCRM = async (moduleId: string, data: any): Promise<boolean> => {
    console.log(`Connexion CRM pour le module ${moduleId}:`, data);
    // Simulation de connexion CRM - à connecter avec Supabase
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };

  return (
    <MPEContext.Provider value={{
      modules,
      activeModule,
      setActiveModule,
      executePrompt,
      updateILAScore,
      connectToCRM
    }}>
      {children}
    </MPEContext.Provider>
  );
};

export const useMPE = () => {
  const context = useContext(MPEContext);
  if (!context) {
    throw new Error('useMPE must be used within a MPEProvider');
  }
  return context;
};