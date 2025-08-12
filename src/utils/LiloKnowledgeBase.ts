// ============= BASE DE CONNAISSANCES COMPLÈTE LILO™ =============
// Toutes les informations qu'ILUMA™ et LILO doivent connaître

import { products, solutions, services } from '@/data/ecosystem';

// ============= INFORMATIONS ENTREPRISE =============
export const ilumaInfo = {
  name: 'Iluma™ Marketing Intelligence',
  slogan: 'Marketing digital IA-first pour PME locales',
  founders: ['Sergio David Ortega-Ramos', 'Amparo Lopez'],
  contact: {
    phone: '+1 (514) 882-8910',
    email: 'administracion@ilumamarketing.com',
    website: 'https://ilumamarketing.com'
  },
  mission: 'Démocratiser le marketing digital intelligent pour les PME locales',
  expertise: [
    'Marketing digital IA-first',
    'SEO local et géolocalisé', 
    'Campagnes publicitaires intelligentes',
    'Outils IA propriétaires',
    'Transformation digitale PME'
  ]
};

// ============= ÉCOSYSTÈME COMPLET ENRICHI =============
export const ecosystemKnowledge = {
  products: {
    count: products.length,
    description: 'Solutions finies prêtes à utiliser',
    items: products,
    emoji: '🏢',
    details: products.map(p => ({
      name: p.name,
      description: p.description,
      pricing: p.pricing,
      features: p.features,
      path: p.path
    }))
  },
  solutions: {
    count: solutions.length,
    description: 'Outils IA intelligents propriétaires',
    items: solutions,
    emoji: '🤖',
    details: solutions.map(s => ({
      name: s.name,
      description: s.description,
      pricing: s.pricing,
      features: s.features,
      path: s.path
    }))
  },
  services: {
    count: services.length,
    description: 'Prestations sur-mesure expertes',
    items: services,
    emoji: '🛠️',
    details: services.map(s => ({
      name: s.name,
      description: s.description,
      pricing: s.pricing,
      features: s.features,
      path: s.path
    }))
  }
};

// ============= RÉPONSES CONTEXTUELLES PAR PAGE =============
export const contextualResponses = {
  // Page d'accueil
  '/': {
    welcome: [
      "👋 Bienvenue chez Iluma™ ! Je suis LILO, votre guide IA. Prêt à découvrir notre écosystème intelligent ?",
      "🚀 Salut ! LILO ici. Iluma™ transforme les PME avec l'IA. Par où commencer votre transformation ?",
      "✨ Hello ! Je suis LILO™. Découvrons ensemble comment Iluma peut booster votre visibilité locale !"
    ],
    suggestions: [
      "🎯 Faire mon diagnostic ADLUMA™",
      "📊 Calculer mon score ILA™", 
      "🔍 Explorer nos outils IA",
      "📞 Réserver une démo gratuite"
    ]
  },

  // Outils IA
  '/adluma': {
    welcome: [
      "🎯 ADLUMA™ - notre simulateur publicitaire intelligent ! Prêt à prédire l'impact de vos campagnes ?",
      "⚡ Simulons vos campagnes avant de les lancer. ADLUMA™ vous évite les mauvaises surprises !",
      "🔮 ADLUMA™ prédit vos résultats publicitaires avec une précision de 90%. Impressionnant non ?"
    ],
    help: [
      "💡 Sélectionnez votre secteur et votre budget pour une simulation précise",
      "📈 ADLUMA™ analyse 50+ variables pour prédire votre ROI",
      "🎨 Testez différents budgets et plateformes en temps réel"
    ]
  },

  '/ila': {
    welcome: [
      "📊 ILA™ - notre indice de visibilité locale ! Découvrons votre score actuel...",
      "🎯 Le score ILA™ mesure votre performance sur 12 critères. Prêt pour l'analyse ?",
      "⭐ ILA™ de 0 à 100 : où se situe votre entreprise ? Analysons ensemble !"
    ],
    help: [
      "🔍 Renseignez votre entreprise pour un calcul précis",
      "📈 Le score ILA™ combine SEO, visibilité locale et présence digitale", 
      "💪 Recevez des recommandations personnalisées pour améliorer votre score"
    ]
  },

  '/ilumatch': {
    welcome: [
      "🤝 ILUMATCH™ - notre IA de matching partenaires ! Trouvons vos collaborateurs idéaux...",
      "🔗 ILUMATCH™ connecte les bonnes entreprises. Prêt à découvrir vos futurs partenaires ?",
      "⚡ Notre IA analyse la compatibilité business. ILUMATCH™ crée des synergies magiques !"
    ],
    help: [
      "🎯 Décrivez votre entreprise et vos objectifs de partenariat",
      "🧠 Notre IA analyse 25+ critères de compatibilité",
      "🌟 Recevez des suggestions de partenaires avec score de matching"
    ]
  },

  '/blogia': {
    welcome: [
      "✍️ BLOG IA™ - notre générateur de contenu SEO ! Créons du contenu qui convertit...",
      "🎨 BLOG IA™ rédige pour vous du contenu optimisé. Prêt à booster votre SEO ?",
      "📝 Notre IA maîtrise votre secteur. BLOG IA™ crée du contenu qui engage et convertit !"
    ],
    help: [
      "🎯 Choisissez vos mots-clés et votre ton de voix",
      "🧠 L'IA génère des articles optimisés pour votre audience",
      "📈 Intégration automatique des meilleures pratiques SEO"
    ]
  },

  '/rivalviews': {
    welcome: [
      "🗺️ RivalViews™ - votre carte de la concurrence locale ! Analysons votre secteur...",
      "👀 QRVISIBILITÉ™ révèle les secrets de vos concurrents. Prêt pour l'espionnage légal ?",
      "🎯 Visualisez qui domine votre zone. QRVISIBILITÉ™ vous donne l'avantage stratégique !"
    ],
    help: [
      "📍 Entrez votre zone géographique et secteur d'activité",
      "🔍 Analysez les performances de vos concurrents locaux",
      "💡 Identifiez les opportunités cachées de votre marché"
    ]
  },

  // Services
  '/services': {
    welcome: [
      "🛠️ Nos services premium ! SEO, publicité, contenu... Que puis-je vous présenter ?",
      "⚡ 12 services experts disponibles. Quel défi marketing voulez-vous relever ?",
      "🎯 Services sur-mesure avec expertise IA. Parlons de vos objectifs !"
    ],
    suggestions: [
      "🔍 Google SEO (1,997$/mois)",
      "📱 Meta ADS (997$/mois)", 
      "🛒 E-commerce SEO (2,497$/mois)",
      "📞 Consultation gratuite"
    ]
  },

  // Contact
  '/contact': {
    welcome: [
      "📞 Prêt à parler avec notre équipe ? Je peux vous préparer pour l'appel !",
      "🎯 Contactez Sergio & Amparo directement. Que souhaitez-vous discuter ?",
      "⚡ +1 (514) 882-8910 - L'équipe Iluma vous attend ! Besoin d'aide avant l'appel ?"
    ],
    help: [
      "💡 Préparez votre brief : secteur, objectifs, budget approximatif",
      "📊 Faites votre diagnostic ADLUMA™ avant l'appel",
      "🎯 L'équipe vous rappelle sous 24h maximum"
    ]
  }
};

// ============= QUESTIONS FRÉQUENTES & RÉPONSES ENRICHIES =============
export const faqKnowledge = {
  "prix": {
    question: ["prix", "coût", "tarif", "budget"],
    response: "💰 Nos tarifs : Gratuit (ADLUMA™, ILA™) | Landing Page 1,497$ | Google SEO 1,997$/mois | E-commerce SEO 2,497$/mois | Diagnostic gratuit !"
  },
  "différence": {
    question: ["différence", "comparaison", "vs", "concurrence"],
    response: "🚀 Iluma™ = IA-first ! Nos solutions propriétaires (ADLUMA™, ILA™, ILUMATCH™) n'existent nulle part ailleurs. Résultats mesurables garantis."
  },
  "délais": {
    question: ["délai", "temps", "durée", "rapidité"],
    response: "⚡ Site web: 2-4 semaines | SEO: premiers résultats en 30-90 jours | Outils IA: activation immédiate | Diagnostic gratuit en 24h !"
  },
  "contact": {
    question: ["contact", "appel", "téléphone", "email"],
    response: "📞 +1 (514) 882-8910 | 📧 administracion@ilumamarketing.com | Sergio & Amparo vous répondent personnellement !"
  },
  "services": {
    question: ["service", "offre", "que faites", "proposez"],
    response: `🛠️ ${services.length} services : Google SEO, Bing SEO, E-commerce, Google GEO, ADS (Google, Meta, Instagram, Tinder, Spotify, Amazon), Contenu, Partenariats`
  },
  "solutions": {
    question: ["solution", "outil", "ia", "intelligence"],
    response: `🤖 ${solutions.length} outils IA : ILUMATCH™ (matching), ADLUMA™ (simulation), BLOG IA™ (contenu), QRVISIBILITÉ™ (analyse), ILA™ (scoring)`
  },
  "produits": {
    question: ["produit", "site", "landing", "web"],
    response: `🏢 ${products.length} produits : Site Web Complet, Landing Page Intelligente (1,497$), Page Fidélisation (997$)`
  }
};

// ============= FONCTIONS UTILITAIRES =============

// Recherche intelligente dans la base de connaissances
export const searchKnowledge = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  // Recherche dans les FAQ
  for (const [key, faq] of Object.entries(faqKnowledge)) {
    if (faq.question.some(keyword => lowerQuery.includes(keyword))) {
      return faq.response;
    }
  }
  
  // Recherche dans l'écosystème
  const allItems = [...products, ...solutions, ...services];
  const matchingItems = allItems.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery)
  );
  
  if (matchingItems.length > 0) {
    const item = matchingItems[0];
    return `✨ ${item.name} - ${item.description}. Prix: ${item.pricing}. Plus d'infos sur ${item.path}`;
  }
  
  return null;
};

// Réponse contextuelle selon la page
export const getContextualResponse = (currentPage: string, type: 'welcome' | 'help' = 'welcome') => {
  const pageResponses = contextualResponses[currentPage as keyof typeof contextualResponses];
  if (pageResponses && pageResponses[type]) {
    const responses = pageResponses[type];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Réponse par défaut
  const defaultResponses = contextualResponses['/'][type];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Suggestions d'actions selon la page
export const getPageSuggestions = (currentPage: string) => {
  const pageResponses = contextualResponses[currentPage as keyof typeof contextualResponses];
  if (pageResponses && 'suggestions' in pageResponses) {
    return pageResponses.suggestions;
  }
  return contextualResponses['/'].suggestions;
};

// Stats rapides enrichis
export const getQuickStats = () => {
  return `📊 Écosystème Iluma™: ${products.length} produits • ${solutions.length} outils IA • ${services.length} services premium = ${products.length + solutions.length + services.length} offres total !`;
};

// Obtenir les détails d'une offre spécifique
export const getOfferingDetails = (name: string) => {
  const allOfferings = [...products, ...solutions, ...services];
  const offering = allOfferings.find(item => 
    item.name.toLowerCase().includes(name.toLowerCase())
  );
  
  if (offering) {
    return `✨ ${offering.name}: ${offering.description} | Prix: ${offering.pricing} | Fonctionnalités: ${offering.features?.join(', ')}`;
  }
  return null;
};

export default {
  ilumaInfo,
  ecosystemKnowledge,
  contextualResponses,
  faqKnowledge,
  searchKnowledge,
  getContextualResponse,
  getPageSuggestions,
  getQuickStats,
  getOfferingDetails
};