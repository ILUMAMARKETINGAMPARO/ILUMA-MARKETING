export interface FAQItem {
  id: string;
  question: {
    fr: string;
    en: string;
    es: string;
  };
  answer: {
    fr: string;
    en: string;
    es: string;
  };
  category: 'general' | 'seo' | 'technical' | 'services';
  tags: string[];
}

export const faqGeneral: FAQItem[] = [
  {
    id: 'existing-website',
    question: {
      fr: 'Est-ce que je dois déjà avoir un site web pour travailler avec Iluma ?',
      en: 'Do I need an existing website to work with Iluma?',
      es: '¿Necesito tener un sitio web para trabajar con Iluma?'
    },
    answer: {
      fr: 'Non. Nous pouvons créer votre site de A à Z, ou optimiser un site existant, selon votre niveau actuel.',
      en: 'No. We can build your site from scratch or enhance your current one, depending on your stage.',
      es: 'No. Podemos construir tu sitio desde cero o mejorar uno ya existente, según tu nivel.'
    },
    category: 'general',
    tags: ['website', 'creation', 'optimization']
  },
  {
    id: 'smart-landing-page',
    question: {
      fr: 'Qu\'est-ce qu\'une landing page intelligente ?',
      en: 'What is a smart landing page?',
      es: '¿Qué es una landing page inteligente?'
    },
    answer: {
      fr: 'C\'est une page IA-first conçue pour convertir vos visiteurs en clients grâce à un tunnel automatisé : SEO, formulaire interactif, CRM connecté, rebonds intelligents, tracking multicanal.',
      en: 'It\'s an AI-first page designed to turn visitors into leads using automation: SEO, CRM connection, interactive form, and intelligent conversion path.',
      es: 'Es una página diseñada con IA para convertir visitantes en clientes, con formulario, CRM, SEO y automatización integrada.'
    },
    category: 'services',
    tags: ['landing-page', 'AI', 'conversion', 'automation']
  },
  {
    id: 'lovable-vs-cms',
    question: {
      fr: 'Est-ce que Lovable™ remplace un CMS comme WordPress ?',
      en: 'Does Lovable™ replace CMS tools like WordPress?',
      es: '¿Lovable™ reemplaza herramientas como WordPress?'
    },
    answer: {
      fr: 'Oui. Lovable™ permet une construction sans CMS, avec des modules .md intelligents, légers, performants, et 100 % personnalisables.',
      en: 'Yes. Lovable™ uses modular .md blocks, fast, lightweight, customizable, and CMS-free.',
      es: 'Sí. Con bloques .md modulares y livianos, Lovable™ funciona sin CMS y permite máxima personalización.'
    },
    category: 'technical',
    tags: ['lovable', 'CMS', 'wordpress', 'technology']
  },
  {
    id: 'advertising-services',
    question: {
      fr: 'Proposez-vous aussi de la publicité (Google Ads, Meta, etc.) ?',
      en: 'Do you offer ads (Google Ads, Meta, etc.)?',
      es: '¿También hacen campañas publicitarias (Google, Meta)?'
    },
    answer: {
      fr: 'Oui, et nos simulateurs (comme ADLUMA™) permettent de visualiser vos impressions avant même d\'investir.',
      en: 'Absolutely. Our simulator (ADLUMA™) lets you preview results before investing.',
      es: 'Sí. Nuestro simulador (ADLUMA™) te permite previsualizar resultados antes de pagar.'
    },
    category: 'services',
    tags: ['advertising', 'google-ads', 'meta', 'adluma']
  },
  {
    id: 'non-technical-users',
    question: {
      fr: 'Et si je ne suis pas bon en technologie ?',
      en: 'I\'m not tech-savvy — is this for me?',
      es: '¿Y si no sé nada de tecnología?'
    },
    answer: {
      fr: 'On s\'occupe de tout. Le but est de rendre votre visibilité accessible et performante, peu importe votre niveau technique.',
      en: 'Yes. Our mission is to simplify your visibility. We manage all the technical parts for you.',
      es: 'No te preocupes. Nosotros nos encargamos de todo, sin complicaciones técnicas.'
    },
    category: 'general',
    tags: ['support', 'non-technical', 'assistance']
  }
];

export const faqSEO: FAQItem[] = [
  {
    id: 'seo-results-time',
    question: {
      fr: 'Combien de temps faut-il pour voir des résultats SEO ?',
      en: 'How long before I see SEO results?',
      es: '¿Cuánto tarda el SEO en mostrar resultados?'
    },
    answer: {
      fr: 'Généralement entre 30 et 90 jours. Avec Iluma™, certains clients voient un impact dès les premières semaines grâce à notre stratégie IA + SEO local.',
      en: 'Typically between 30–90 days. With Iluma™, some clients notice progress within weeks thanks to our AI + local SEO blend.',
      es: 'Entre 30 y 90 días. Con Iluma™, algunos clientes ven resultados en pocas semanas gracias al SEO local + IA.'
    },
    category: 'seo',
    tags: ['timeline', 'results', 'local-seo']
  },
  {
    id: 'local-vs-standard-seo',
    question: {
      fr: 'Quelle est la différence entre SEO local et SEO classique ?',
      en: 'What\'s the difference between local and standard SEO?',
      es: '¿Cuál es la diferencia entre SEO local y tradicional?'
    },
    answer: {
      fr: 'Le SEO local cible votre zone géographique. Il optimise votre présence Google (fiche GMB, carte, mots-clés de quartier), contrairement au SEO global plus générique.',
      en: 'Local SEO focuses on your geographic area (maps, address keywords), while traditional SEO is more global and generic.',
      es: 'El SEO local se enfoca en tu zona (mapas, palabras clave de ciudad). El SEO global es más genérico y competitivo.'
    },
    category: 'seo',
    tags: ['local-seo', 'google-maps', 'geographic']
  },
  {
    id: 'seo-vs-ads',
    question: {
      fr: 'Le SEO est-il compatible avec Google Ads ?',
      en: 'Does SEO conflict with Google Ads?',
      es: '¿El SEO choca con Google Ads?'
    },
    answer: {
      fr: 'Oui ! Ils sont complémentaires. Le SEO génère du trafic naturel à long terme. Les Ads accélèrent la visibilité immédiate. Ensemble, c\'est une stratégie idéale.',
      en: 'Not at all. They\'re complementary. SEO builds long-term visibility. Ads boost immediate presence. Together, they\'re ideal.',
      es: 'No. Son complementarios. Ads da visibilidad rápida. SEO construye una presencia duradera. Lo ideal es combinarlos.'
    },
    category: 'seo',
    tags: ['google-ads', 'complementary', 'strategy']
  },
  {
    id: 'ai-for-seo',
    question: {
      fr: 'Pourquoi utiliser une IA pour le SEO ?',
      en: 'Why use AI for SEO?',
      es: '¿Por qué usar IA para el SEO?'
    },
    answer: {
      fr: 'L\'IA permet d\'analyser, générer et ajuster vos contenus en temps réel. Elle détecte les opportunités et automatise les actions (blog, balises, mots-clés).',
      en: 'AI automates blog creation, keyword optimization, metadata, and real-time adjustments. It accelerates results and improves precision.',
      es: 'La IA genera artículos, ajusta palabras clave, y optimiza tus páginas automáticamente para resultados más rápidos y precisos.'
    },
    category: 'seo',
    tags: ['AI', 'automation', 'content-generation']
  },
  {
    id: 'google-maps-visibility',
    question: {
      fr: 'Est-ce que je peux apparaître sur la carte Google ?',
      en: 'Can I show up on the Google Map pack?',
      es: '¿Puedo salir en el mapa de Google?'
    },
    answer: {
      fr: 'Oui. Grâce à notre module GMB + ILA™, nous optimisons votre visibilité sur Google Maps (Pack local).',
      en: 'Yes. With our GMB + ILA™ module, we increase your local map ranking effectively.',
      es: 'Sí. Con nuestro módulo GMB + ILA™, mejoramos tu ranking en el Pack local.'
    },
    category: 'seo',
    tags: ['google-maps', 'local-pack', 'gmb', 'ila']
  }
];

// FAQ Vulgarisée pour un public non-technique
export const faqSimplified: FAQItem[] = [
  {
    id: 'what-is-seo-simple',
    question: {
      fr: 'C\'est quoi exactement le SEO ?',
      en: 'What is SEO, really?',
      es: '¿Qué es el SEO exactamente?'
    },
    answer: {
      fr: 'Imagine Google comme Instagram. Le SEO, c\'est ce qui vous permet d\'avoir des followers, d\'apparaître dans les recherches, d\'avoir plus de likes (clics).',
      en: 'Think of Google like TikTok or Instagram. SEO helps you get followers, appear in searches, and get more likes (clicks).',
      es: 'Imagina que Google es como Instagram. El SEO te da seguidores, te muestra en búsquedas, y genera más clics.'
    },
    category: 'seo',
    tags: ['simplified', 'analogy', 'social-media']
  },
  {
    id: 'how-google-decides',
    question: {
      fr: 'Comment Google sait à qui montrer mon site ?',
      en: 'How does Google decide who shows up?',
      es: '¿Cómo elige Google a quién mostrar?'
    },
    answer: {
      fr: 'Il lit vos textes, vos images, vos avis, votre fiche Google Business. Il vous scanne comme un code-barres. Si c\'est bien fait, vous ressortez en haut.',
      en: 'It reads your website, reviews, photos, and texts. Think of it as scanning your barcode. If it\'s optimized, you show up first.',
      es: 'Google lee tu sitio, tus textos, tus imágenes, tus reseñas. Es como si te escanease. Si todo está bien, te muestra arriba.'
    },
    category: 'seo',
    tags: ['simplified', 'google-algorithm', 'scanning']
  },
  {
    id: 'business-visibility',
    question: {
      fr: 'Si j\'ouvre un commerce, ça suffit ?',
      en: 'I opened a store — isn\'t that enough?',
      es: 'Ya tengo un local, ¿no es suficiente?'
    },
    answer: {
      fr: 'Non. C\'est comme ouvrir un restaurant sans enseigne. Personne ne passe. Le SEO, c\'est l\'enseigne, les panneaux, le menu en vitrine… tout ce qui vous rend visible.',
      en: 'No. That\'s like opening a café with no sign. SEO is your sign, flyer, and buzz online.',
      es: 'No. Es como abrir una tienda sin cartel. Nadie entra. El SEO es tu cartel, tu anuncio, tu carta visible en Internet.'
    },
    category: 'seo',
    tags: ['simplified', 'business-analogy', 'visibility']
  },
  {
    id: 'ai-role-simple',
    question: {
      fr: 'Et l\'IA là-dedans ?',
      en: 'Where does AI fit in?',
      es: '¿Y la inteligencia artificial?'
    },
    answer: {
      fr: 'L\'IA, c\'est votre employé invisible qui écrit, corrige, analyse et vous propose des améliorations tous les jours, sans congé.',
      en: 'AI is your invisible staff — writing, correcting, improving 24/7.',
      es: 'La IA es tu asistente invisible. Escribe, analiza, corrige y te ayuda sin parar.'
    },
    category: 'technical',
    tags: ['simplified', 'AI', 'automation', 'assistant']
  }
];

export const allFAQs = [...faqGeneral, ...faqSEO, ...faqSimplified];