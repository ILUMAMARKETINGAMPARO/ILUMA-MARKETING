import React, { createContext, useState, useEffect } from 'react';
import { Language, LanguageContextType } from '@/types/language';
import { ensureLanguageNamespaces, getDictionary } from '@/i18n/translationManager';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check for manual language selection first
    const manualLanguage = localStorage.getItem('iluma-language-manual');
    if (manualLanguage && ['fr', 'en', 'es'].includes(manualLanguage)) {
      return manualLanguage as Language;
    }
    
    // Then check general saved language
    const saved = localStorage.getItem('iluma-language');
    if (saved && ['fr', 'en', 'es'].includes(saved)) {
      return saved as Language;
    }
    
    // Auto-detect from browser
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('es')) return 'es';
    return 'fr'; // Default to French for Quebec market
  });
  const [dict, setDict] = useState<Record<string, any>>({});
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await ensureLanguageNamespaces(language, ['common']);
        if (!cancelled) {
          setDict(getDictionary(language));
        }
      } catch (e) {
        console.error('[i18n] ensure namespaces failed', e);
      }
    })();

    localStorage.setItem('iluma-language', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.style.fontFamily = '';

    return () => {
      cancelled = true;
    };
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = dict;

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
