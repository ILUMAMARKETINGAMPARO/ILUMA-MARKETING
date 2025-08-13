import { Language } from '@/types/language.ts';

// Simple deep merge for translation dictionaries
function deepMerge<T extends Record<string, any>>(
  target: T,
  source: T
): T {
  for (const key of Object.keys(source)) {
    const srcVal = (source as any)[key];
    const tgtVal = (target as any)[key];
    if (
      srcVal &&
      typeof srcVal === 'object' &&
      !Array.isArray(srcVal) &&
      tgtVal &&
      typeof tgtVal === 'object' &&
      !Array.isArray(tgtVal)
    ) {
      (target as any)[key] = deepMerge({ ...(tgtVal as object) } as T, srcVal);
    } else {
      (target as any)[key] = srcVal;
    }
  }
  return target;
}

// Cache dictionaries and loaded namespaces per language
const dictionaries: Record<Language, Record<string, any>> = {
  fr: {},
  en: {},
  es: {},
};

const loadedNamespaces: Record<Language, Set<string>> = {
  fr: new Set(),
  en: new Set(),
  es: new Set(),
};

// Track in-flight loads to avoid duplicate work
const inFlight: Record<string, Promise<Record<string, any>>> = {};

// Discover JSON namespaces if present (progressive migration support)
// Pattern: /src/i18n/<lang>/<namespace>.json
const jsonLoaders = import.meta.glob<Record<string, any>>('/src/i18n/*/*.json');

function getInFlightKey(lang: Language, ns: string) {
  return `${lang}:${ns}`;
}

async function loadJsonNamespace(lang: Language, ns: string) {
  const path = `/src/i18n/${lang}/${ns}.json`;
  const loader = jsonLoaders[path];
  if (!loader) return null;
  const mod = await loader();
  // Vite JSON imports return the parsed object as default export
  return (mod as any).default ?? mod;
}

async function loadLegacyAllFromSingleFile(lang: Language) {
  try {
    // Fallback to the existing monolithic file — ensures we keep all current content
    const mod = await import('@/data/translations-clean');
    const full = (mod as any).translations?.[lang] ?? {};
    return full as Record<string, any>;
  } catch (e) {
    console.error('[i18n] Failed loading legacy translations:', e);
    return {};
  }
}

async function loadNamespace(lang: Language, ns: string) {
  const key = getInFlightKey(lang, ns);
  if (inFlight[key]) return inFlight[key];

  inFlight[key] = (async () => {
    // 1) Try JSON namespace first (future-proof modular files)
    const jsonNs = await loadJsonNamespace(lang, ns);
    if (jsonNs) return jsonNs;

    // 2) Fallback strategy: if "common" is requested and JSON missing, load from legacy
    if (ns === 'common') {
      return await loadLegacyAllFromSingleFile(lang);
    }

    // 3) As a last resort, empty object
    return {};
  })();

  const result = await inFlight[key];
  delete inFlight[key];
  return result;
}

export async function ensureLanguageNamespaces(
  lang: Language,
  namespaces: string[]
) {
  const toLoad = namespaces.filter((ns) => !loadedNamespaces[lang].has(ns));
  if (toLoad.length === 0) return;

  const loaded = await Promise.all(toLoad.map((ns) => loadNamespace(lang, ns)));
  for (let i = 0; i < toLoad.length; i++) {
    const ns = toLoad[i];
    const data = loaded[i];
    dictionaries[lang] = deepMerge({ ...dictionaries[lang] }, data);
    loadedNamespaces[lang].add(ns);
  }
}

export function getDictionary(lang: Language) {
  return dictionaries[lang];
}

export function resetI18nCaches() {
  (['fr', 'en', 'es'] as Language[]).forEach((l) => {
    dictionaries[l] = {};
    loadedNamespaces[l].clear();
  });
}
