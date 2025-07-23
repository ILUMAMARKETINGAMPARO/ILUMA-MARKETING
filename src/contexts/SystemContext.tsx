import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface SystemState {
  errors: string[];
  warnings: string[];
  performance: {
    loadTime: number;
    renderCount: number;
    lastUpdate: Date;
  };
  features: {
    chatbotEnabled: boolean;
    animationsEnabled: boolean;
    trilingualMode: boolean;
    debugMode: boolean;
  };
  analytics: {
    pageViews: number;
    userInteractions: number;
    conversionEvents: number;
  };
}

type SystemAction = 
  | { type: 'ADD_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'ADD_WARNING'; payload: string }
  | { type: 'CLEAR_WARNINGS' }
  | { type: 'UPDATE_PERFORMANCE'; payload: Partial<SystemState['performance']> }
  | { type: 'TOGGLE_FEATURE'; payload: keyof SystemState['features'] }
  | { type: 'UPDATE_ANALYTICS'; payload: Partial<SystemState['analytics']> }
  | { type: 'RESET_SYSTEM' };

const initialState: SystemState = {
  errors: [],
  warnings: [],
  performance: {
    loadTime: 0,
    renderCount: 0,
    lastUpdate: new Date()
  },
  features: {
    chatbotEnabled: true,
    animationsEnabled: true,
    trilingualMode: true,
    debugMode: false
  },
  analytics: {
    pageViews: 0,
    userInteractions: 0,
    conversionEvents: 0
  }
};

function systemReducer(state: SystemState, action: SystemAction): SystemState {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        errors: [...state.errors, action.payload]
      };
    
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: []
      };
    
    case 'ADD_WARNING':
      return {
        ...state,
        warnings: [...state.warnings, action.payload]
      };
    
    case 'CLEAR_WARNINGS':
      return {
        ...state,
        warnings: []
      };
    
    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        performance: {
          ...state.performance,
          ...action.payload,
          lastUpdate: new Date()
        }
      };
    
    case 'TOGGLE_FEATURE':
      return {
        ...state,
        features: {
          ...state.features,
          [action.payload]: !state.features[action.payload]
        }
      };
    
    case 'UPDATE_ANALYTICS':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          ...action.payload
        }
      };
    
    case 'RESET_SYSTEM':
      return initialState;
    
    default:
      return state;
  }
}

const SystemContext = createContext<{
  state: SystemState;
  dispatch: React.Dispatch<SystemAction>;
  addError: (error: string) => void;
  addWarning: (warning: string) => void;
  clearErrors: () => void;
  clearWarnings: () => void;
  updatePerformance: (metrics: Partial<SystemState['performance']>) => void;
  toggleFeature: (feature: keyof SystemState['features']) => void;
  trackAnalytics: (event: Partial<SystemState['analytics']>) => void;
} | undefined>(undefined);

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(systemReducer, initialState);

  const addError = (error: string) => {
    dispatch({ type: 'ADD_ERROR', payload: error });
  };

  const addWarning = (warning: string) => {
    dispatch({ type: 'ADD_WARNING', payload: warning });
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const clearWarnings = () => {
    dispatch({ type: 'CLEAR_WARNINGS' });
  };

  const updatePerformance = (metrics: Partial<SystemState['performance']>) => {
    dispatch({ type: 'UPDATE_PERFORMANCE', payload: metrics });
  };

  const toggleFeature = (feature: keyof SystemState['features']) => {
    dispatch({ type: 'TOGGLE_FEATURE', payload: feature });
  };

  const trackAnalytics = (event: Partial<SystemState['analytics']>) => {
    dispatch({ type: 'UPDATE_ANALYTICS', payload: event });
  };

  return (
    <SystemContext.Provider value={{
      state,
      dispatch,
      addError,
      addWarning,
      clearErrors,
      clearWarnings,
      updatePerformance,
      toggleFeature,
      trackAnalytics
    }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};

export default SystemContext;