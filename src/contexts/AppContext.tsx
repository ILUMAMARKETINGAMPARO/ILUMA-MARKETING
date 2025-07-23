import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  isLoading: boolean;
  theme: 'dark' | 'light';
  notifications: any[];
  activeModule: string | null;
}

interface AppContextType {
  state: AppState;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
  setActiveModule: (module: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    theme: 'dark',
    notifications: [],
    activeModule: null,
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const setTheme = (theme: 'dark' | 'light') => {
    setState(prev => ({ ...prev, theme }));
  };

  const addNotification = (notification: any) => {
    setState(prev => ({ 
      ...prev, 
      notifications: [...prev.notifications, { ...notification, id: Date.now().toString() }] 
    }));
  };

  const removeNotification = (id: string) => {
    setState(prev => ({ 
      ...prev, 
      notifications: prev.notifications.filter(n => n.id !== id) 
    }));
  };

  const setActiveModule = (module: string | null) => {
    setState(prev => ({ ...prev, activeModule: module }));
  };

  return (
    <AppContext.Provider value={{
      state,
      setLoading,
      setTheme,
      addNotification,
      removeNotification,
      setActiveModule,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};