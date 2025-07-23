import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ExportData {
  id: string;
  type: 'pdf' | 'csv' | 'slides' | 'report';
  name: string;
  data: any;
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
}

interface ExportContextType {
  exports: ExportData[];
  createExport: (type: ExportData['type'], name: string, data: any) => Promise<string>;
  getExport: (id: string) => ExportData | undefined;
  deleteExport: (id: string) => void;
  generatePDF: (data: any, template: string) => Promise<string>;
  generateSlides: (data: any, theme: string) => Promise<string>;
  generateReport: (data: any, type: string) => Promise<string>;
}

const ExportContext = createContext<ExportContextType | undefined>(undefined);

export const ExportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [exports, setExports] = useState<ExportData[]>([]);

  const createExport = async (type: ExportData['type'], name: string, data: any): Promise<string> => {
    const exportId = Date.now().toString();
    const newExport: ExportData = {
      id: exportId,
      type,
      name,
      data,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    setExports(prev => [...prev, newExport]);

    // Simulation du processus d'export
    setTimeout(() => {
      setExports(prev => prev.map(exp => 
        exp.id === exportId 
          ? { ...exp, status: 'processing' } 
          : exp
      ));
    }, 1000);

    setTimeout(() => {
      setExports(prev => prev.map(exp => 
        exp.id === exportId 
          ? { ...exp, status: 'completed', downloadUrl: `/downloads/${exportId}.${type}` } 
          : exp
      ));
    }, 3000);

    return exportId;
  };

  const getExport = (id: string) => {
    return exports.find(exp => exp.id === id);
  };

  const deleteExport = (id: string) => {
    setExports(prev => prev.filter(exp => exp.id !== id));
  };

  const generatePDF = async (data: any, template: string): Promise<string> => {
    return createExport('pdf', `Rapport_${template}_${Date.now()}`, { data, template });
  };

  const generateSlides = async (data: any, theme: string): Promise<string> => {
    return createExport('slides', `Presentation_${theme}_${Date.now()}`, { data, theme });
  };

  const generateReport = async (data: any, type: string): Promise<string> => {
    return createExport('report', `Analyse_${type}_${Date.now()}`, { data, type });
  };

  return (
    <ExportContext.Provider value={{
      exports,
      createExport,
      getExport,
      deleteExport,
      generatePDF,
      generateSlides,
      generateReport,
    }}>
      {children}
    </ExportContext.Provider>
  );
};

export const useExport = () => {
  const context = useContext(ExportContext);
  if (context === undefined) {
    throw new Error('useExport must be used within an ExportProvider');
  }
  return context;
};