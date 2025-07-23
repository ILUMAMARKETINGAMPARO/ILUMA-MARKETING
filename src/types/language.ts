export type Language = 'fr' | 'en' | 'es' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}