import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMPE } from './MPEContext';
import { useILA } from './ILAContext';
import { useTeam } from './TeamContext';

interface DataFlow {
  id: string;
  sourceModule: string;
  targetModule: string;
  dataType: 'score' | 'insight' | 'recommendation' | 'alert';
  data: any;
  timestamp: Date;
  processed: boolean;
}

interface InterconnectionRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  active: boolean;
}

interface InterconnectionContextType {
  dataFlows: DataFlow[];
  rules: InterconnectionRule[];
  isConnected: boolean;
  toggleConnection: () => void;
  addDataFlow: (flow: Omit<DataFlow, 'id' | 'timestamp' | 'processed'>) => void;
  processDataFlow: (flowId: string) => Promise<void>;
  createRule: (rule: Omit<InterconnectionRule, 'id'>) => void;
  toggleRule: (ruleId: string) => void;
  syncAllModules: () => Promise<void>;
}

const InterconnectionContext = createContext<InterconnectionContextType | undefined>(undefined);

export const InterconnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataFlows, setDataFlows] = useState<DataFlow[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [rules, setRules] = useState<InterconnectionRule[]>([
    {
      id: 'rule-1',
      name: 'Score Sync',
      condition: 'module_score_updated',
      action: 'update_ila_calculation',
      active: true
    },
    {
      id: 'rule-2',
      name: 'Team Assignment',
      condition: 'low_score_detected',
      action: 'assign_specialist',
      active: true
    }
  ]);

  const toggleConnection = () => {
    setIsConnected(prev => !prev);
    console.log('Interconnection status:', !isConnected ? 'Connected' : 'Disconnected');
  };

  const addDataFlow = (flow: Omit<DataFlow, 'id' | 'timestamp' | 'processed'>) => {
    const newFlow: DataFlow = {
      ...flow,
      id: `flow-${Date.now()}`,
      timestamp: new Date(),
      processed: false
    };
    
    setDataFlows(prev => [newFlow, ...prev.slice(0, 99)]); // Keep last 100 flows
    
    // Auto-process if connected
    if (isConnected) {
      setTimeout(() => processDataFlow(newFlow.id), 1000);
    }
  };

  const processDataFlow = async (flowId: string): Promise<void> => {
    setDataFlows(prev => prev.map(flow => 
      flow.id === flowId ? { ...flow, processed: true } : flow
    ));
    
    console.log(`Processing data flow: ${flowId}`);
    
    // Simulation du traitement des données
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const createRule = (rule: Omit<InterconnectionRule, 'id'>) => {
    const newRule: InterconnectionRule = {
      ...rule,
      id: `rule-${Date.now()}`
    };
    setRules(prev => [...prev, newRule]);
  };

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, active: !rule.active } : rule
    ));
  };

  const syncAllModules = async (): Promise<void> => {
    console.log('Synchronizing all modules...');
    
    // Simulation de synchronisation complète
    const syncFlow: DataFlow = {
      id: `sync-${Date.now()}`,
      sourceModule: 'system',
      targetModule: 'all',
      dataType: 'insight',
      data: { type: 'full_sync', timestamp: new Date() },
      timestamp: new Date(),
      processed: false
    };
    
    setDataFlows(prev => [syncFlow, ...prev]);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    await processDataFlow(syncFlow.id);
  };

  // Simulation de flux de données automatiques
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      const modules = ['adluma', 'blogia', 'hub', 'ila', 'illumatch', 'landingpage'];
      const randomSource = modules[Math.floor(Math.random() * modules.length)];
      const randomTarget = modules.filter(m => m !== randomSource)[Math.floor(Math.random() * (modules.length - 1))];
      
      addDataFlow({
        sourceModule: randomSource,
        targetModule: randomTarget,
        dataType: 'score',
        data: { score: Math.floor(Math.random() * 20) + 80 }
      });
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <InterconnectionContext.Provider value={{
      dataFlows,
      rules,
      isConnected,
      toggleConnection,
      addDataFlow,
      processDataFlow,
      createRule,
      toggleRule,
      syncAllModules
    }}>
      {children}
    </InterconnectionContext.Provider>
  );
};

export const useInterconnection = () => {
  const context = useContext(InterconnectionContext);
  if (!context) {
    throw new Error('useInterconnection must be used within an InterconnectionProvider');
  }
  return context;
};