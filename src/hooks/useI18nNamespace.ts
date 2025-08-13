import { useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { ensureLanguageNamespaces } from '@/i18n/translationManager';

export function useI18nNamespace(namespaces: string | string[]) {
  const { language } = useLanguage();
  useEffect(() => {
    const arr = Array.isArray(namespaces) ? namespaces : [namespaces];
    ensureLanguageNamespaces(language, arr);
    // We intentionally don't await; dictionary merges asynchronously
    // and t() will return keys until loaded, then re-render will pick values
  }, [language, Array.isArray(namespaces) ? namespaces.join('|') : namespaces]);
}