import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage.ts';
import { Language } from '@/types/language.ts';

interface GeoLanguageConfig {
  autoRedirect?: boolean;
  respectUserChoice?: boolean;
  fallbackLanguage?: Language;
}

export const useGeoLanguageDetection = (config: GeoLanguageConfig = {}) => {
  const {
    autoRedirect = true,
    respectUserChoice = true,
    fallbackLanguage = 'fr'
  } = config;
  
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract language from URL path
  const extractLangFromPath = (pathname: string): { lang: Language | null; cleanPath: string } => {
    const pathParts = pathname.split('/').filter(Boolean);
    const firstPart = pathParts[0];
    
    if (['fr', 'en', 'es'].includes(firstPart)) {
      return {
        lang: firstPart as Language,
        cleanPath: '/' + pathParts.slice(1).join('/')
      };
    }
    
    return { lang: null, cleanPath: pathname };
  };

  // Get user's preferred language based on browser and geo
  const detectPreferredLanguage = (): Language => {
    // Check if user has manually selected language
    const savedLanguage = localStorage.getItem('iluma-language-manual');
    if (savedLanguage && respectUserChoice) {
      return savedLanguage as Language;
    }

    // Browser language detection
    const browserLang = navigator.language.toLowerCase();
    
    // Simple geo-detection based on browser language
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('en')) return 'en';
    
    // Default to French for Canadian/Quebec market
    return fallbackLanguage;
  };

  // Generate new URL with language prefix
  const generateUrlWithLang = (lang: Language, pathname: string): string => {
    const { cleanPath } = extractLangFromPath(pathname);
    
    // For home page
    if (cleanPath === '/' || cleanPath === '') {
      return lang === 'fr' ? '/' : `/${lang}`;
    }
    
    // For other pages
    return lang === 'fr' ? cleanPath : `/${lang}${cleanPath}`;
  };

  useEffect(() => {
    const { lang: urlLang, cleanPath } = extractLangFromPath(location.pathname);
    const preferredLang = detectPreferredLanguage();

    // If URL has language prefix
    if (urlLang) {
      if (urlLang !== language) {
        setLanguage(urlLang);
      }
      return;
    }

    // If no language in URL and auto-redirect is enabled
    if (autoRedirect && !urlLang) {
      const newUrl = generateUrlWithLang(preferredLang, location.pathname);
      setLanguage(preferredLang);
      
      // Only navigate if the URL would actually change
      if (newUrl !== location.pathname) {
        navigate(newUrl, { replace: true });
      }
    }
  }, [location.pathname, language, setLanguage, navigate, autoRedirect, respectUserChoice, fallbackLanguage]);

  // Function to change language programmatically
  const changeLanguage = (newLang: Language, rememberChoice: boolean = true) => {
    const { cleanPath } = extractLangFromPath(location.pathname);
    const newUrl = generateUrlWithLang(newLang, location.pathname);
    
    setLanguage(newLang);
    
    if (rememberChoice) {
      localStorage.setItem('iluma-language-manual', newLang);
    }
    
    navigate(newUrl);
  };

  return {
    currentLanguage: language,
    changeLanguage,
    detectPreferredLanguage,
    extractLangFromPath,
    generateUrlWithLang
  };
};