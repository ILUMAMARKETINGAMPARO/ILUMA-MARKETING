import React, { useEffect } from 'react';
import { useGeoLanguageDetection } from '@/hooks/useGeoLanguageDetection';
import MultilingualRouter from './MultilingualRouter';

const GeoLanguageRouter: React.FC = () => {
  // Initialize geo-language detection at the root level
  useGeoLanguageDetection({ 
    autoRedirect: true,
    respectUserChoice: true,
    fallbackLanguage: 'fr'
  });

  return <MultilingualRouter />;
};

export default GeoLanguageRouter;