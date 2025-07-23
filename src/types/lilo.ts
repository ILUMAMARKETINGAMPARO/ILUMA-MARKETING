// Types pour le système LILO™ universel
export type LiloMood = 'happy' | 'thinking' | 'helper' | 'alert' | 'dormant' | 'curious' | 'excited' | 'confused';

export type LiloModule = 
  | 'adluma' 
  | 'ila' 
  | 'crm-iluma' 
  | 'hub-iluma' 
  | 'contact' 
  | 'simulator' 
  | 'performance'
  | 'home';

export interface LiloContext {
  page: string;
  userLevel: string;
  recentActivity: string[];
  emotion?: string;
  industryContext?: string;
  currentGoals?: string[];
}

export interface LiloConfig {
  module: LiloModule;
  capabilities: string[];
  welcomeMessage: string;
  contextualHelp: string[];
  shortcuts: Array<{
    label: string;
    action: string;
    description: string;
  }>;
  mood: LiloMood;
  animations: {
    idle: string;
    thinking: string;
    helping: string;
  };
}

export interface LiloMemory {
  userId: string;
  preferences: {
    language: string;
    level: string;
    disabledFeatures: string[];
  };
  history: Array<{
    timestamp: string;
    module: LiloModule;
    action: string;
    context: any;
  }>;
  currentSession: {
    startTime: string;
    interactions: number;
    lastModule: LiloModule;
  };
}