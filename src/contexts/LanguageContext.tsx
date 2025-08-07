import React, { createContext, useState, useEffect } from 'react';
import { Language, LanguageContextType } from '@/types/language';
import { translations } from '@/data/translations';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check for manual language selection first
    const manualLanguage = localStorage.getItem('iluma-language-manual');
    if (manualLanguage && ['fr', 'en', 'es', 'ar'].includes(manualLanguage)) {
      return manualLanguage as Language;
    }
    
    // Then check general saved language
    const saved = localStorage.getItem('iluma-language');
    if (saved && ['fr', 'en', 'es', 'ar'].includes(saved)) {
      return saved as Language;
    }
    
    // Auto-detect from browser
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('ar')) return 'ar';
    return 'fr'; // Default to French for Quebec market
  });

  useEffect(() => {
    localStorage.setItem('iluma-language', language);
    document.documentElement.setAttribute('lang', language);
    
    // Support RTL pour l'arabe
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.style.fontFamily = 'Arial, sans-serif'; // Police qui supporte bien l'arabe
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.style.fontFamily = ''; // Reset à la police par défaut
    }
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return typeof current === 'string' ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
