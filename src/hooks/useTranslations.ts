import { LanguageContext } from '@/contexts/LanguageContext';
import { useContext } from 'react';

// Traductions principales
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.methode': 'Méthode Iluma™',
    'nav.products': 'Produits',
    'nav.all': 'Tout',
    'nav.solutions': 'Solutions',
    'nav.websiteComplete': 'Site Web Complet',
    'nav.landingPages': 'Landing Pages',
    'nav.loyaltyPage': 'Page Fidélisation',
    'nav.tools': 'Outils IA',
    'nav.ilumatch': 'ILUMATCH™',
    'nav.adluma': 'ADLUMA™',
    'nav.blogia': 'BlogIA™',
    'nav.rivalviews': 'RivalViews™',
    'nav.ila': 'Assistant ILA™',
    'nav.services': 'Services Experts',
    'nav.seoGoogle': 'SEO Google',
    'nav.seoBing': 'SEO Bing',
    'nav.googleAds': 'Google Ads',
    'nav.metaAds': 'Meta Ads',
    'nav.contentCreation': 'Création Contenu',
    'nav.partnership': 'Partenariat',
    'nav.howItWorks': 'Comment ça marche',
    'nav.toolsPresentation': 'Présentation Outils',
    'nav.contact': 'Contact & Support',
    'nav.contactForm': 'Formulaire Contact',
    'nav.caseStudies': 'Études de Cas',
    'nav.portfolio': 'Portfolio',
    'nav.faq': 'FAQ',
    'nav.specialOffer': 'Offre Spéciale',
    'nav.consultation': 'Consultation Gratuite',

    // Méthode Iluma
    'methodeiluma.hero.title': 'La Méthode Révolutionnaire ILUMA™',
    'methodeiluma.hero.subtitle': 'Transformez votre entreprise avec l\'intelligence artificielle la plus avancée du marketing digital',
    'methodeiluma.hero.badge': 'Méthode Certifiée IA',
    
    'methodeiluma.steps.title': 'Les 6 Étapes de la Méthode ILUMA™',
    'methodeiluma.steps.subtitle': 'Un processus scientifique qui garantit votre succès digital',
    
    'methodeiluma.steps.diagnostic.title': 'Diagnostic ADLUMA™',
    'methodeiluma.steps.diagnostic.fact': 'Analyse complète en 72h de votre position concurrentielle et opportunités de marché',
    'methodeiluma.steps.diagnostic.action': 'Audit 360° de votre présence digitale, analyse de la concurrence et identification des leviers de croissance',
    'methodeiluma.steps.diagnostic.context': 'Avant toute stratégie, nous analysons votre écosystème pour identifier précisément vos avantages concurrentiels',
    'methodeiluma.steps.diagnostic.deliverables.0': 'Rapport d\'audit complet (40+ pages)',
    'methodeiluma.steps.diagnostic.deliverables.1': 'Cartographie concurrentielle',
    'methodeiluma.steps.diagnostic.deliverables.2': 'Plan d\'action stratégique',
    'methodeiluma.steps.diagnostic.cta': 'Obtenir mon diagnostic gratuit',
    
    'methodeiluma.steps.presence.title': 'Présence SEO Intelligente',
    'methodeiluma.steps.presence.fact': 'Positionnement #1 sur Google en moins de 90 jours avec notre IA propriétaire',
    'methodeiluma.steps.presence.action': 'Optimisation SEO avancée, création de contenu IA et stratégie de visibilité locale',
    'methodeiluma.steps.presence.context': 'Notre technologie SEO SGE assure votre domination sur les recherches de votre secteur',
    'methodeiluma.steps.presence.deliverables.0': 'Site web optimisé SEO + IA',
    'methodeiluma.steps.presence.deliverables.1': 'Stratégie de contenu automatisée',
    'methodeiluma.steps.presence.deliverables.2': 'Suivi de positionnement en temps réel',
    'methodeiluma.steps.presence.deliverables.3': 'Présence Google My Business optimisée',
    'methodeiluma.steps.presence.cta': 'Dominer Google maintenant',
    
    'methodeiluma.steps.pages.title': 'Landing Pages MAGNET™',
    'methodeiluma.steps.pages.fact': '347% d\'augmentation du taux de conversion moyen avec nos pages intelligentes',
    'methodeiluma.steps.pages.action': 'Création de pages de conversion ultra-performantes avec IA comportementale intégrée',
    'methodeiluma.steps.pages.context': 'Chaque page s\'adapte en temps réel au comportement de vos visiteurs pour maximiser les conversions',
    'methodeiluma.steps.pages.deliverables.0': 'Landing pages adaptatifs avec IA',
    'methodeiluma.steps.pages.deliverables.1': 'Système de A/B testing automatique',
    'methodeiluma.steps.pages.deliverables.2': 'CRM intégré pour suivi des leads',
    'methodeiluma.steps.pages.deliverables.3': 'Analytics avancés temps réel',
    'methodeiluma.steps.pages.cta': 'Créer mes pages convertissantes',
    
    'methodeiluma.steps.visibility.title': 'Visibilité RivalViews™',
    'methodeiluma.steps.visibility.fact': 'Surveillance concurrentielle 24/7 et anticipation des tendances de marché',
    'methodeiluma.steps.visibility.action': 'Monitoring intelligent de la concurrence et stratégies d\'anticipation basées sur l\'IA',
    'methodeiluma.steps.visibility.context': 'Restez toujours un pas d\'avance avec notre système de veille concurrentielle automatisée',
    'methodeiluma.steps.visibility.deliverables.0': 'Dashboard de veille concurrentielle',
    'methodeiluma.steps.visibility.deliverables.1': 'Alertes automatiques opportunités',
    'methodeiluma.steps.visibility.deliverables.2': 'Stratégies de contre-attaque IA',
    'methodeiluma.steps.visibility.cta': 'Surveiller mes concurrents',
    
    'methodeiluma.steps.intelligence.title': 'Intelligence Artificielle Active',
    'methodeiluma.steps.intelligence.fact': 'Automatisation complète de votre marketing avec prise de décision IA en temps réel',
    'methodeiluma.steps.intelligence.action': 'Déploiement d\'assistants IA pour automatiser vos processus marketing et ventes',
    'methodeiluma.steps.intelligence.context': 'L\'IA prend en charge vos tâches répétitives et optimise continuellement vos performances',
    'methodeiluma.steps.intelligence.deliverables.0': 'Assistant IA personnalisé (LILO™)',
    'methodeiluma.steps.intelligence.deliverables.1': 'Automatisation workflows marketing',
    'methodeiluma.steps.intelligence.deliverables.2': 'Prédictions et recommandations IA',
    'methodeiluma.steps.intelligence.cta': 'Activer mon IA',
    
    'methodeiluma.steps.scalability.title': 'Évolutivité SCALE™',
    'methodeiluma.steps.scalability.fact': 'Infrastructure qui grandit avec votre entreprise sans limite technique',
    'methodeiluma.steps.scalability.action': 'Mise en place d\'une architecture évolutive pour supporter votre croissance exponentielle',
    'methodeiluma.steps.scalability.context': 'Votre système s\'adapte automatiquement à l\'augmentation de votre volume d\'affaires',
    'methodeiluma.steps.scalability.deliverables.0': 'Architecture cloud évolutive',
    'methodeiluma.steps.scalability.deliverables.1': 'Système de backup automatique',
    'methodeiluma.steps.scalability.deliverables.2': 'Support prioritaire 24/7',
    'methodeiluma.steps.scalability.cta': 'Préparer ma croissance',
    
    'methodeiluma.testimonials.title': 'Ils ont révolutionné leur business avec ILUMA™',
    'methodeiluma.testimonials.text1': 'Depuis qu\'on utilise ILUMA™, nos ventes ont explosé. L\'IA gère tout automatiquement et nos clients sont plus satisfaits que jamais.',
    'methodeiluma.testimonials.text2': 'La méthode ILUMA™ a transformé notre approche marketing. Nous dominons maintenant notre marché local grâce à leur technologie.',
    
    'methodeiluma.benefits.title': 'Pourquoi la Méthode ILUMA™ ?',
    'methodeiluma.benefits.subtitle': 'Une approche scientifique qui garantit vos résultats',
    'methodeiluma.benefits.approach': 'Approche Scientifique',
    'methodeiluma.benefits.approachDesc': 'Méthodologie basée sur l\'analyse de données et l\'IA pour garantir vos résultats',
    'methodeiluma.benefits.guaranteed': 'Résultats Garantis',
    'methodeiluma.benefits.guaranteedDesc': 'Amélioration mesurable de vos performances ou remboursement intégral',
    'methodeiluma.benefits.support': 'Support Expert 24/7',
    'methodeiluma.benefits.supportDesc': 'Équipe dédiée d\'experts IA disponible pour vous accompagner',
    
    'methodeiluma.cta.title': 'Prêt à révolutionner votre entreprise ?',
    'methodeiluma.cta.subtitle': 'Découvrez le potentiel de votre entreprise avec un diagnostic ADLUMA™ gratuit',
    'methodeiluma.cta.simulate': 'Simuler mon ROI',
    'methodeiluma.cta.diagnosis': 'Diagnostic gratuit',
    'methodeiluma.cta.consultation': 'Consultation expert',

    // Footer
    'footer.company.tagline': 'Révolutionner le marketing digital des PME avec l\'intelligence artificielle la plus avancée.',
    'footer.sections.visibility': '🎯 Visibilité & Croissance',
    'footer.sections.conversion': '💡 Conversion & Acquisition',
    'footer.sections.partnerships': '🤝 Partenariats & E-commerce',
    'footer.sections.management': '⚙️ Gestion & Analytics',
    'footer.quickLinks.title': 'Liens Rapides',
    'footer.quickLinks.home': 'Accueil',
    'footer.quickLinks.hub': 'Hub Central',
    'footer.quickLinks.method': 'Méthode Iluma™',
    'footer.quickLinks.contact': 'Contact',
    'footer.newsletter.title': 'Newsletter IA',
    'footer.newsletter.description': 'Recevez les dernières innovations en marketing IA',
    'footer.newsletter.placeholder': 'Votre email',
    'footer.newsletter.submit': 'S\'abonner',
    
    // Footer Tools
    'footer.tools.adluma': 'ADLUMA™',
    'footer.tools.ila': 'Assistant ILA™',
    'footer.tools.seoAi': 'SEO Intelligence IA',
    'footer.tools.localVisibility': 'Visibilité Locale',
    'footer.tools.landingPages': 'Landing Pages IA',
    'footer.tools.fullWebsite': 'Site Web Complet IA',
    'footer.tools.loyaltyPages': 'Fidélisation Intelligente IA',
    'footer.tools.blogAi': 'BlogIA™',
    'footer.tools.lilo': 'Assistant Lilo™',
    'footer.tools.ilumatch': 'ILUMATCH™',
    'footer.tools.ecommerce': 'E-commerce IA',
    'footer.tools.caseStudies': 'Études de Cas',
    'footer.tools.crm': 'CRM Iluma™',
    'footer.tools.analytics': 'Analyses Avancées',
    'footer.tools.dashboard': 'Dashboard Expertise',
    
    // Footer Contact & Offices
    'footer.contact.title': 'Contact',
    'footer.contact.email': 'administracion@ilumamarketing.com',
    'footer.contact.phone': '+1 (514) 882-8910',
    'footer.contact.location': '12090 Bd Sainte-Gertrude, Montréal, QC H1G 5R2',
    'footer.offices.headquarters': 'Montréal (Siège)',
    'footer.offices.other': 'Autres Bureaux',
    'footer.company.direction': 'Direction',
    
    // Hub Central
    'hubCentral.badge': 'Plateforme Centralisée IA',
    'hubCentral.title': 'HUB Central Iluma™',
    'hubCentral.description': 'Votre écosystème marketing IA complet. {productsCount} produits, {toolsCount} outils IA et {servicesCount} services experts connectés en une plateforme unique.',
    'hubCentral.stats.products': 'Produits',
    'hubCentral.stats.tools': 'Outils IA',
    'hubCentral.stats.services': 'Services',
    'hubCentral.stats.support': 'Support',
    
    'hubCentral.features.title': 'Un écosystème intelligent et connecté',
    'hubCentral.features.description': 'Découvrez comment nos outils IA travaillent ensemble pour maximiser votre croissance',
    'hubCentral.features.items': [
      { title: 'Intelligence Unifiée', description: 'Tous vos outils IA communiquent entre eux pour des résultats optimaux' },
      { title: 'Données Centralisées', description: 'Une vue 360° de vos performances marketing en temps réel' },
      { title: 'Automatisation Avancée', description: 'Workflows intelligents qui s\'adaptent à votre secteur d\'activité' },
      { title: 'Évolutivité Garantie', description: 'Votre plateforme grandit avec votre entreprise sans limite' }
    ],
    
    'hubCentral.categories.products.title': 'Produits Iluma™',
    'hubCentral.categories.products.description': 'Solutions complètes prêtes à déployer',
    'hubCentral.categories.products.features': [
      'Sites web complets avec IA intégrée',
      'Landing pages ultra-performantes',
      'Pages de fidélisation intelligentes',
      'E-commerce optimisé pour la conversion'
    ],
    'hubCentral.categories.products.button': 'Voir les Produits',
    
    'hubCentral.categories.solutions.title': 'Outils IA Spécialisés',
    'hubCentral.categories.solutions.description': 'Technologies propriétaires pour dominer votre marché',
    'hubCentral.categories.solutions.features': [
      'ADLUMA™ - Diagnostic & stratégie IA',
      'BlogIA™ - Création de contenu automatisée',
      'ILA™ - Assistant marketing intelligent',
      'RivalViews™ - Surveillance concurrentielle'
    ],
    'hubCentral.categories.solutions.button': 'Découvrir les Outils',
    
    'hubCentral.categories.services.title': 'Services Experts',
    'hubCentral.categories.services.description': 'Accompagnement personnalisé par nos spécialistes',
    'hubCentral.categories.services.features': [
      'SEO intelligent Google & Bing',
      'Publicité Google Ads & Meta optimisée IA',
      'Création de contenu professionnel',
      'Partenariats stratégiques sectoriels'
    ],
    'hubCentral.categories.services.button': 'Consulter les Services',
    
    'hubCentral.faqSection.title': 'Questions Fréquentes',
    'hubCentral.faqSection.description': 'Trouvez rapidement les réponses à vos questions sur notre écosystème IA',
    
    // FAQ Questions
    'faq.google.question': 'Et si votre agence savait exactement ce que pense Google ?',
    'faq.results.question': 'Comment Iluma™ garantit-elle des résultats mesurables ?',
    'faq.difference.question': 'En quoi Iluma™ diffère-t-elle d\'une agence traditionnelle ?',
    'faq.preview.question': 'Puis-je voir des résultats avant d\'investir ?',
    
    // Results section
    'results.title': 'Résultats Garantis'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.methode': 'Iluma™ Method',
    'nav.products': 'Products',
    'nav.all': 'All',
    'nav.solutions': 'Tools',
    'nav.tools': 'AI Tools',
    'nav.services': 'Expert Services',
    'nav.howItWorks': 'How it Works',
    'nav.contact': 'Contact & Support',
    'nav.specialOffer': 'Special Offer',
    'nav.consultation': 'Free Consultation',

    // Méthode Iluma EN
    'methodeiluma.hero.title': 'The Revolutionary ILUMA™ Method',
    'methodeiluma.hero.subtitle': 'Transform your business with the most advanced artificial intelligence in digital marketing',
    'methodeiluma.hero.badge': 'AI Certified Method',
    
    'methodeiluma.steps.title': 'The 6 Steps of the ILUMA™ Method',
    'methodeiluma.steps.subtitle': 'A scientific process that guarantees your digital success',
    
    'methodeiluma.steps.diagnostic.title': 'ADLUMA™ Diagnosis',
    'methodeiluma.steps.diagnostic.fact': 'Complete analysis in 72h of your competitive position and market opportunities',
    'methodeiluma.steps.diagnostic.action': '360° audit of your digital presence, competitor analysis and growth lever identification',
    'methodeiluma.steps.diagnostic.context': 'Before any strategy, we analyze your ecosystem to precisely identify your competitive advantages',
    'methodeiluma.steps.diagnostic.deliverables.0': 'Complete audit report (40+ pages)',
    'methodeiluma.steps.diagnostic.deliverables.1': 'Competitive mapping',
    'methodeiluma.steps.diagnostic.deliverables.2': 'Strategic action plan',
    'methodeiluma.steps.diagnostic.cta': 'Get my free diagnosis',

    // Footer
    'footer.company.tagline': 'Revolutionizing SME digital marketing with the most advanced artificial intelligence.',
    'footer.sections.visibility': '🎯 Visibility & Growth',
    'footer.sections.conversion': '💡 Conversion & Acquisition',
    'footer.sections.partnerships': '🤝 Partnerships & E-commerce',
    'footer.sections.management': '⚙️ Management & Analytics',
    'footer.quickLinks.title': 'Quick Links',
    'footer.quickLinks.home': 'Home',
    'footer.quickLinks.hub': 'Central Hub',
    'footer.quickLinks.method': 'Iluma™ Method',
    'footer.quickLinks.contact': 'Contact',
    'footer.newsletter.title': 'AI Newsletter',
    'footer.newsletter.description': 'Receive the latest innovations in AI marketing',
    'footer.newsletter.placeholder': 'Your email',
    'footer.newsletter.submit': 'Subscribe',
    
    // FAQ Questions
    'faq.google.question': 'What if your agency knew exactly what Google thinks?',
    'faq.results.question': 'How does Iluma™ guarantee measurable results?',
    'faq.difference.question': 'How is Iluma™ different from traditional agencies?',
    'faq.preview.question': 'Can I see results before investing?',
    
    // Results section
    'results.title': 'Guaranteed Results',
    
    // Footer Contact
    'footer.contact.title': 'Contact',
    'footer.contact.email': 'administracion@ilumamarketing.com',
    'footer.contact.phone': '+1 (514) 882-8910',
    'footer.contact.location': '12090 Bd Sainte-Gertrude, Montréal, QC H1G 5R2'
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.methode': 'Método Iluma™',
    'nav.products': 'Productos',
    'nav.all': 'Todo',
    'nav.solutions': 'Soluciones',
    'nav.websiteComplete': 'Sitio Web Completo',
    'nav.landingPages': 'Landing Pages',
    'nav.loyaltyPage': 'Página Fidelización',
    'nav.tools': 'Herramientas IA',
    'nav.ilumatch': 'ILUMATCH™',
    'nav.adluma': 'ADLUMA™',
    'nav.blogia': 'BlogIA™',
    'nav.rivalviews': 'RivalViews™',
    'nav.ila': 'Asistente ILA™',
    'nav.services': 'Servicios Expertos',
    'nav.seoGoogle': 'SEO Google',
    'nav.seoBing': 'SEO Bing',
    'nav.googleAds': 'Google Ads',
    'nav.metaAds': 'Meta Ads',
    'nav.contentCreation': 'Creación Contenido',
    'nav.partnership': 'Asociación',
    'nav.howItWorks': 'Cómo funciona',
    'nav.toolsPresentation': 'Presentación Herramientas',
    'nav.contact': 'Contacto y Soporte',
    'nav.contactForm': 'Formulario Contacto',
    'nav.caseStudies': 'Casos de Estudio',
    'nav.portfolio': 'Portfolio',
    'nav.faq': 'FAQ',
    'nav.specialOffer': 'Oferta Especial',
    'nav.consultation': 'Consulta Gratuita',

    // Footer
    'footer.company.tagline': 'Revolucionar el marketing digital de las PYME con la inteligencia artificial más avanzada.',
    'footer.sections.visibility': '🎯 Visibilidad y Crecimiento',
    'footer.sections.conversion': '💡 Conversión y Adquisición',
    'footer.sections.partnerships': '🤝 Asociaciones y E-commerce',
    'footer.sections.management': '⚙️ Gestión y Analytics',
    'footer.quickLinks.title': 'Enlaces Rápidos',
    'footer.quickLinks.home': 'Inicio',
    'footer.quickLinks.hub': 'Hub Central',
    'footer.quickLinks.method': 'Método Iluma™',
    'footer.quickLinks.contact': 'Contacto',
    'footer.newsletter.title': 'Newsletter IA',
    'footer.newsletter.description': 'Recibe las últimas innovaciones en marketing IA',
    'footer.newsletter.placeholder': 'Tu email',
    'footer.newsletter.submit': 'Suscribirse',
    
    // Footer Tools
    'footer.tools.adluma': 'ADLUMA™',
    'footer.tools.ila': 'Asistente ILA™',
    'footer.tools.seoAi': 'SEO Inteligencia IA',
    'footer.tools.localVisibility': 'Visibilidad Local',
    'footer.tools.landingPages': 'Landing Pages IA',
    'footer.tools.fullWebsite': 'Sitio Web Completo IA',
    'footer.tools.loyaltyPages': 'Fidelización Inteligente IA',
    'footer.tools.blogAi': 'BlogIA™',
    'footer.tools.lilo': 'Asistente Lilo™',
    'footer.tools.ilumatch': 'ILUMATCH™',
    'footer.tools.ecommerce': 'E-commerce IA',
    'footer.tools.caseStudies': 'Casos de Estudio',
    'footer.tools.crm': 'CRM Iluma™',
    'footer.tools.analytics': 'Análisis Avanzados',
    'footer.tools.dashboard': 'Dashboard Expertise',
    
    // Footer Contact & Offices
    'footer.contact.title': 'Contacto',
    'footer.contact.email': 'administracion@ilumamarketing.com',
    'footer.contact.phone': '+1 (514) 882-8910',
    'footer.contact.location': '12090 Bd Sainte-Gertrude, Montréal, QC H1G 5R2',
    'footer.offices.headquarters': 'Montreal (Sede)',
    'footer.offices.other': 'Otras Oficinas',
    'footer.company.direction': 'Dirección',
    
    // FAQ Questions
    'faq.google.question': '¿Y si tu agencia supiera exactamente lo que piensa Google?',
    'faq.results.question': '¿Cómo garantiza Iluma™ resultados medibles?',
    'faq.difference.question': '¿En qué se diferencia Iluma™ de una agencia tradicional?',
    'faq.preview.question': '¿Puedo ver resultados antes de invertir?',
    
    // Results section
    'results.title': 'Resultados Garantizados',
    
    // Hub Central
    'hubCentral.badge': 'Plataforma Centralizada IA',
    'hubCentral.title': 'HUB Central Iluma™',
    'hubCentral.description': 'Tu ecosistema de marketing IA completo. {productsCount} productos, {toolsCount} herramientas IA y {servicesCount} servicios expertos conectados en una plataforma única.',
    'hubCentral.stats.products': 'Productos',
    'hubCentral.stats.tools': 'Herramientas IA',
    'hubCentral.stats.services': 'Servicios',
    'hubCentral.stats.support': 'Soporte',
    
    'hubCentral.features.title': 'Un ecosistema inteligente y conectado',
    'hubCentral.features.description': 'Descubre cómo nuestras herramientas IA trabajan juntas para maximizar tu crecimiento',
    'hubCentral.faqSection.title': 'Preguntas Frecuentes',
    'hubCentral.faqSection.description': 'Encuentra rápidamente las respuestas a tus preguntas sobre nuestro ecosistema IA'
  }
};

// Hook principal de traductions
export const useTranslations = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  const { language, t } = context;

  const getTranslation = (key: string) => {
    // Traductions principales
    const mainTranslation = translations[language as keyof typeof translations]?.[key as keyof typeof translations.fr];
    if (mainTranslation) {
      return mainTranslation;
    }
    
    // Fallback vers useLanguage si rien trouvé
    return t(key);
  };

  return { t: getTranslation, language };
};