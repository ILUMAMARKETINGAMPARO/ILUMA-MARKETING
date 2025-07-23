import React, { createContext, useContext, useState } from 'react';
import { ILUMATCHContextType, BusinessProfile, ILUMATCHResult, ILACalculation } from '@/types/ilumatch';
import { calculateILAScore } from '@/utils/ilaEngine';
import { generateMatchContent } from '@/utils/contentGenerator';
import { findBusinessMatches } from '@/utils/matchingEngine';

const ILUMATCHContext = createContext<ILUMATCHContextType | undefined>(undefined);

export const ILUMATCHProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);
  const [matches, setMatches] = useState<ILUMATCHResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const addBusiness = async (businessData: Omit<BusinessProfile, 'id' | 'ilaScore'>) => {
    setIsCalculating(true);
    try {
      const id = `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const ilaScore = await calculateILAScore(businessData);
      
      const newBusiness: BusinessProfile = {
        ...businessData,
        id,
        ilaScore
      };

      setBusinesses(prev => [...prev, newBusiness]);
      
      // Auto-find matches for new business
      const newMatches = await findBusinessMatches(newBusiness, businesses);
      setMatches(prev => [...prev, ...newMatches]);
      
    } catch (error) {
      console.error('Error adding business:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const calculateILA = async (businessId: string): Promise<ILACalculation> => {
    const business = businesses.find(b => b.id === businessId);
    if (!business) throw new Error('Business not found');
    
    return await calculateILAScore(business);
  };

  const findMatches = async (businessId: string): Promise<ILUMATCHResult[]> => {
    const business = businesses.find(b => b.id === businessId);
    if (!business) return [];
    
    const otherBusinesses = businesses.filter(b => b.id !== businessId);
    return await findBusinessMatches(business, otherBusinesses);
  };

  const generateContent = async (match: ILUMATCHResult): Promise<void> => {
    const content = await generateMatchContent(match);
    
    setMatches(prev => prev.map(m => 
      m.id === match.id ? { ...m, ...content } : m
    ));
  };

  return (
    <ILUMATCHContext.Provider value={{
      businesses,
      matches,
      isCalculating,
      addBusiness,
      calculateILA,
      findMatches,
      generateContent
    }}>
      {children}
    </ILUMATCHContext.Provider>
  );
};

export const useILUMATCH = () => {
  const context = useContext(ILUMATCHContext);
  if (!context) {
    throw new Error('useILUMATCH must be used within an ILUMATCHProvider');
  }
  return context;
};