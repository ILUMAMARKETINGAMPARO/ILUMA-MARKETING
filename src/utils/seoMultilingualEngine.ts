import { Language } from '@/types/language';

interface MultilingualSEOData {
  [key: string]: {
    title: string;
    description: string;
    keywords: string[];
    h1?: string;
  };
}

export const getMultilingualSEOData = (page: string, language: Language): MultilingualSEOData[string] => {
  const seoDatabase: { [key: string]: MultilingualSEOData } = {
    home: {
      fr: {
        title: "Iluma™ Marketing IA - Visibilité Locale Intelligente | Montréal",
        description: "Transformez votre visibilité avec l'IA. SEO local, landing pages intelligentes, publicités Google/Meta optimisées. Consultation gratuite à Montréal.",
        keywords: ["marketing IA", "SEO Montréal", "visibilité locale", "intelligence artificielle", "publicité Google", "landing page"],
        h1: "Votre Visibilité Locale Transformée par l'IA"
      },
      en: {
        title: "Iluma™ AI Marketing - Smart Local Visibility | Montreal", 
        description: "Transform your visibility with AI. Local SEO, smart landing pages, optimized Google/Meta ads. Free consultation in Montreal.",
        keywords: ["AI marketing", "SEO Montreal", "local visibility", "artificial intelligence", "Google ads", "landing page"],
        h1: "Your Local Visibility Transformed by AI"
      },
      es: {
        title: "Iluma™ Marketing IA - Visibilidad Local Inteligente | Montreal",
        description: "Transforma tu visibilidad con IA. SEO local, landing pages inteligentes, anuncios Google/Meta optimizados. Consulta gratis en Montreal.",
        keywords: ["marketing IA", "SEO Montreal", "visibilidad local", "inteligencia artificial", "anuncios Google", "landing page"],
        h1: "Tu Visibilidad Local Transformada por IA"
      }
    },
    contact: {
      fr: {
        title: "Contact Iluma™ - Consultation Gratuite IA Marketing | Montréal",
        description: "Contactez notre équipe IA marketing. Assistant LILO disponible 24/7. Montréal, Québec. Consultation gratuite. +1 (514) 882-8910",
        keywords: ["contact Iluma", "consultation gratuite", "IA marketing", "Montréal", "assistant IA", "LILO"],
        h1: "Contactez Notre Équipe IA Marketing"
      },
      en: {
        title: "Contact Iluma™ - Free AI Marketing Consultation | Montreal",
        description: "Contact our AI marketing team. LILO assistant available 24/7. Montreal, Quebec. Free consultation. +1 (514) 882-8910",
        keywords: ["contact Iluma", "free consultation", "AI marketing", "Montreal", "AI assistant", "LILO"],
        h1: "Contact Our AI Marketing Team"
      },
      es: {
        title: "Contacto Iluma™ - Consulta Gratis Marketing IA | Montreal",
        description: "Contacta nuestro equipo de marketing IA. Asistente LILO disponible 24/7. Montreal, Quebec. Consulta gratis. +1 (514) 882-8910",
        keywords: ["contacto Iluma", "consulta gratis", "marketing IA", "Montreal", "asistente IA", "LILO"],
        h1: "Contacta Nuestro Equipo de Marketing IA"
      }
    },
    adluma: {
      fr: {
        title: "ADLUMA™ - Simulateur Publicité IA | Budget Google Ads Intelligent",
        description: "Simulez vos campagnes Google Ads avec l'IA. Prédictions budgétaires, ciblage intelligent, ROI optimisé. Outil ADLUMA™ gratuit.",
        keywords: ["ADLUMA", "simulateur publicité", "Google Ads", "budget IA", "prédiction ROI", "campagne intelligente"],
        h1: "Simulateur de Publicité Intelligent ADLUMA™"
      },
      en: {
        title: "ADLUMA™ - AI Ad Simulator | Smart Google Ads Budget",
        description: "Simulate your Google Ads campaigns with AI. Budget predictions, smart targeting, optimized ROI. Free ADLUMA™ tool.",
        keywords: ["ADLUMA", "ad simulator", "Google Ads", "AI budget", "ROI prediction", "smart campaign"],
        h1: "ADLUMA™ Smart Advertising Simulator"
      },
      es: {
        title: "ADLUMA™ - Simulador Publicidad IA | Presupuesto Google Ads Inteligente",
        description: "Simula tus campañas Google Ads con IA. Predicciones presupuestarias, targeting inteligente, ROI optimizado. Herramienta ADLUMA™ gratis.",
        keywords: ["ADLUMA", "simulador publicidad", "Google Ads", "presupuesto IA", "predicción ROI", "campaña inteligente"],
        h1: "Simulador de Publicidad Inteligente ADLUMA™"
      }
    },
    ila: {
      fr: {
        title: "Score ILA™ - Analyse Visibilité Locale IA | Audit SEO Gratuit",
        description: "Analysez votre visibilité locale avec le score ILA™. Audit SEO IA, recommandations personnalisées, amélioration garantie.",
        keywords: ["score ILA", "analyse visibilité", "audit SEO", "visibilité locale", "recommandations IA", "amélioration SEO"],
        h1: "Score ILA™ - Votre Visibilité Analysée par l'IA"
      },
      en: {
        title: "ILA™ Score - AI Local Visibility Analysis | Free SEO Audit",
        description: "Analyze your local visibility with ILA™ score. AI SEO audit, personalized recommendations, guaranteed improvement.",
        keywords: ["ILA score", "visibility analysis", "SEO audit", "local visibility", "AI recommendations", "SEO improvement"],
        h1: "ILA™ Score - Your Visibility Analyzed by AI"
      },
      es: {
        title: "Puntuación ILA™ - Análisis Visibilidad Local IA | Auditoría SEO Gratis",
        description: "Analiza tu visibilidad local con la puntuación ILA™. Auditoría SEO IA, recomendaciones personalizadas, mejora garantizada.",
        keywords: ["puntuación ILA", "análisis visibilidad", "auditoría SEO", "visibilidad local", "recomendaciones IA", "mejora SEO"],
        h1: "Puntuación ILA™ - Tu Visibilidad Analizada por IA"
      }
    }
  };

  return seoDatabase[page]?.[language] || seoDatabase[page]?.fr || {
    title: "Iluma™ Marketing IA",
    description: "Marketing intelligent avec l'intelligence artificielle",
    keywords: ["marketing", "IA", "intelligence artificielle"],
    h1: "Marketing IA"
  };
};

export const generateHreflangLinks = (currentPath: string) => {
  const cleanPath = currentPath.replace(/^\/(en|es)/, '');
  const baseUrl = 'https://ilumamarketing.com';
  
  return [
    { lang: 'fr', url: `${baseUrl}${cleanPath}` },
    { lang: 'fr-CA', url: `${baseUrl}${cleanPath}` },
    { lang: 'en', url: `${baseUrl}/en${cleanPath}` },
    { lang: 'en-US', url: `${baseUrl}/en${cleanPath}` },
    { lang: 'en-CA', url: `${baseUrl}/en${cleanPath}` },
    { lang: 'es', url: `${baseUrl}/es${cleanPath}` },
    { lang: 'es-ES', url: `${baseUrl}/es${cleanPath}` },
    { lang: 'es-MX', url: `${baseUrl}/es${cleanPath}` },
    { lang: 'x-default', url: `${baseUrl}${cleanPath}` }
  ];
};

export const getSGEOptimizedContent = (page: string, language: Language) => {
  const faqData: { [key: string]: { [key in Language]: Array<{question: string, answer: string}> } } = {
    home: {
      fr: [
        {
          question: "Qu'est-ce que le marketing IA d'Iluma?",
          answer: "Le marketing IA d'Iluma combine l'intelligence artificielle avec des stratégies marketing locales pour optimiser votre visibilité, vos campagnes publicitaires et votre retour sur investissement."
        },
        {
          question: "Comment fonctionne l'assistant IA LILO?",
          answer: "LILO est notre assistant IA qui vous guide dans vos stratégies marketing, analyse vos besoins et propose des solutions personnalisées 24/7."
        }
      ],
      en: [
        {
          question: "What is Iluma's AI marketing?",
          answer: "Iluma's AI marketing combines artificial intelligence with local marketing strategies to optimize your visibility, advertising campaigns, and return on investment."
        },
        {
          question: "How does the LILO AI assistant work?",
          answer: "LILO is our AI assistant that guides you through your marketing strategies, analyzes your needs, and proposes personalized solutions 24/7."
        }
      ],
      es: [
        {
          question: "¿Qué es el marketing IA de Iluma?",
          answer: "El marketing IA de Iluma combina inteligencia artificial con estrategias de marketing local para optimizar tu visibilidad, campañas publicitarias y retorno de inversión."
        },
        {
          question: "¿Cómo funciona el asistente IA LILO?",
          answer: "LILO es nuestro asistente IA que te guía en tus estrategias de marketing, analiza tus necesidades y propone soluciones personalizadas 24/7."
        }
      ]
    }
  };

  return faqData[page]?.[language] || [];
};