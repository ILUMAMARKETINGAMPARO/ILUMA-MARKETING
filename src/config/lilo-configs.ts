import { LiloConfig, LiloModule } from '@/types/lilo.ts';

// Configuration LILO™ pour chaque module Iluma™
export const liloConfigs: Record<LiloModule, LiloConfig> = {
  'adluma': {
    module: 'adluma',
    capabilities: ['targeting', 'budget-optimization', 'network-selection', 'roi-prediction'],
    welcomeMessage: "Bonjour ! Je suis LILO™, votre guide pour optimiser vos campagnes publicitaires. Laissez-moi vous aider à cibler parfaitement votre audience !",
    contextualHelp: [
      "Pour le ciblage, pensez aux passions de vos clients idéaux",
      "Votre budget influence directement la portée de votre campagne",
      "Chaque réseau publicitaire a ses spécificités et audiences",
      "Je peux prédire votre ROI en fonction de vos paramètres"
    ],
    shortcuts: [
      { label: "Aide au ciblage", action: "help_targeting", description: "Conseils pour choisir vos centres d'intérêt" },
      { label: "Optimiser budget", action: "optimize_budget", description: "Recommandations d'allocation budgétaire" },
      { label: "Choisir réseaux", action: "select_networks", description: "Aide au choix des plateformes publicitaires" },
      { label: "Voir prédictions", action: "show_predictions", description: "Afficher les projections de performance" }
    ],
    mood: 'helper',
    animations: {
      idle: 'floating-glow',
      thinking: 'analyzing-data',
      helping: 'guiding-light'
    }
  },

  'ila': {
    module: 'ila',
    capabilities: ['score-analysis', 'recommendations', 'improvement-suggestions', 'competitor-analysis'],
    welcomeMessage: "Analysons ensemble votre score ILA™ ! Je vais vous expliquer chaque composante et proposer des améliorations concrètes.",
    contextualHelp: [
      "Votre score ILA™ mesure votre visibilité locale sur 5 axes",
      "Le SEO représente 30% de votre score total",
      "La présence physique compte énormément pour les commerces locaux",
      "Je peux identifier vos points faibles et forces"
    ],
    shortcuts: [
      { label: "Expliquer score", action: "explain_score", description: "Détail de chaque composante ILA™" },
      { label: "Top recommandations", action: "top_recommendations", description: "Actions prioritaires à entreprendre" },
      { label: "Analyser concurrents", action: "competitor_analysis", description: "Comparer avec vos concurrents" },
      { label: "Plan d'amélioration", action: "improvement_plan", description: "Feuille de route personnalisée" }
    ],
    mood: 'thinking',
    animations: {
      idle: 'calculating-score',
      thinking: 'deep-analysis',
      helping: 'insight-revelation'
    }
  },

  'crm-iluma': {
    module: 'crm-iluma',
    capabilities: ['client-insights', 'task-management', 'revenue-tracking', 'smart-reminders'],
    welcomeMessage: "Gérons efficacement votre CRM ! Je peux vous donner des insights sur vos clients et optimiser vos processus commerciaux.",
    contextualHelp: [
      "Vos clients à fort potentiel méritent une attention particulière",
      "Les tâches en retard peuvent impacter vos revenus",
      "Je détecte les opportunités de suivi commercial",
      "Vos métriques révèlent des tendances importantes"
    ],
    shortcuts: [
      { label: "Insights clients", action: "client_insights", description: "Analyses comportementales et potentiel" },
      { label: "Tâches urgentes", action: "urgent_tasks", description: "Prioriser vos actions commerciales" },
      { label: "Opportunités", action: "opportunities", description: "Clients à recontacter ou prospects chauds" },
      { label: "Métriques clés", action: "key_metrics", description: "Tableaux de bord et KPIs importants" }
    ],
    mood: 'alert',
    animations: {
      idle: 'monitoring-data',
      thinking: 'processing-insights',
      helping: 'presenting-data'
    }
  },

  'hub-iluma': {
    module: 'hub-iluma',
    capabilities: ['navigation', 'search', 'recommendations', 'quick-access'],
    welcomeMessage: "Bienvenue dans votre Hub Iluma™ ! Je suis votre moteur de recherche intelligent et guide interactif.",
    contextualHelp: [
      "Utilisez-moi pour naviguer rapidement entre les outils",
      "Je peux rechercher dans toute votre data Iluma™",
      "Je vous recommande les actions prioritaires du jour",
      "Accès rapide à tous vos modules favoris"
    ],
    shortcuts: [
      { label: "Recherche globale", action: "global_search", description: "Chercher dans tous vos outils Iluma™" },
      { label: "Actions du jour", action: "daily_actions", description: "Vos priorités et tâches importantes" },
      { label: "Accès rapide", action: "quick_access", description: "Raccourcis vers vos outils préférés" },
      { label: "Résumé activité", action: "activity_summary", description: "Vue d'ensemble de votre activité" }
    ],
    mood: 'curious',
    animations: {
      idle: 'scanning-hub',
      thinking: 'searching-data',
      helping: 'navigating-tools'
    }
  },

  'contact': {
    module: 'contact',
    capabilities: ['appointment-booking', 'form-assistance', 'contact-info', 'support'],
    welcomeMessage: "Parfait ! Vous souhaitez nous contacter. Je vais vous accompagner dans votre prise de rendez-vous ou répondre à vos questions.",
    contextualHelp: [
      "Choisissez le type de rendez-vous qui correspond à vos besoins",
      "Je peux pré-remplir le formulaire avec vos informations",
      "Nos créneaux intelligents s'adaptent à votre fuseau horaire",
      "Une question ? Je peux vous orienter vers la bonne personne"
    ],
    shortcuts: [
      { label: "RDV Demo", action: "book_demo", description: "Réserver une démo personnalisée" },
      { label: "RDV Conseil", action: "book_consultation", description: "Consultation stratégique gratuite" },
      { label: "Support urgent", action: "urgent_support", description: "Aide technique immédiate" },
      { label: "Devis rapide", action: "quick_quote", description: "Estimation de projet express" }
    ],
    mood: 'happy',
    animations: {
      idle: 'welcoming-gesture',
      thinking: 'checking-calendar',
      helping: 'guiding-form'
    }
  },

  'simulator': {
    module: 'simulator',
    capabilities: ['context-guidance', 'step-by-step', 'optimization-tips', 'result-explanation'],
    welcomeMessage: "Créons ensemble votre stratégie marketing ! Je vais vous guider étape par étape pour optimiser vos campagnes.",
    contextualHelp: [
      "Définissons d'abord votre contexte business",
      "Le ciblage d'audience est crucial pour le succès",
      "Votre budget détermine votre reach potentiel",
      "Je calcule en temps réel vos projections de performance"
    ],
    shortcuts: [
      { label: "Aide contexte", action: "help_context", description: "Définir votre secteur et objectifs" },
      { label: "Guide ciblage", action: "guide_targeting", description: "Optimiser votre audience cible" },
      { label: "Conseils budget", action: "budget_advice", description: "Répartition optimale de vos investissements" },
      { label: "Expliquer résultats", action: "explain_results", description: "Comprendre vos projections" }
    ],
    mood: 'helper',
    animations: {
      idle: 'guiding-steps',
      thinking: 'calculating-strategy',
      helping: 'demonstrating-options'
    }
  },

  'performance': {
    module: 'performance',
    capabilities: ['speed-analysis', 'optimization-tips', 'monitoring', 'reporting'],
    welcomeMessage: "Analysons les performances de votre site ! Je vais identifier les optimisations prioritaires pour améliorer votre vitesse.",
    contextualHelp: [
      "La vitesse de chargement impacte directement vos conversions",
      "Je surveille vos Core Web Vitals en temps réel",
      "Chaque optimisation a un impact mesurable sur vos résultats",
      "Je priorise les améliorations selon leur impact ROI"
    ],
    shortcuts: [
      { label: "Audit complet", action: "full_audit", description: "Analyse approfondie de performance" },
      { label: "Quick wins", action: "quick_wins", description: "Optimisations rapides à implémenter" },
      { label: "Monitoring temps réel", action: "real_time_monitoring", description: "Surveillance continue des métriques" },
      { label: "Rapport détaillé", action: "detailed_report", description: "Export des analyses de performance" }
    ],
    mood: 'alert',
    animations: {
      idle: 'monitoring-performance',
      thinking: 'analyzing-metrics',
      helping: 'optimizing-speed'
    }
  },

  'home': {
    module: 'home',
    capabilities: ['welcome', 'navigation', 'overview', 'getting-started'],
    welcomeMessage: "Bienvenue dans l'univers Iluma™ ! Je suis LILO™, votre assistant IA personnel. Comment puis-je vous aider aujourd'hui ?",
    contextualHelp: [
      "Découvrez toute la puissance de nos outils IA",
      "Je peux vous guider vers le bon outil selon vos besoins",
      "Accès rapide à tous vos projets et campagnes",
      "Votre tableau de bord personnalisé vous attend"
    ],
    shortcuts: [
      { label: "Visite guidée", action: "guided_tour", description: "Découvrir tous les outils Iluma™" },
      { label: "Démarrage rapide", action: "quick_start", description: "Lancer votre premier projet" },
      { label: "Mes projets", action: "my_projects", description: "Accéder à vos campagnes en cours" },
      { label: "Nouveautés", action: "whats_new", description: "Dernières fonctionnalités ajoutées" }
    ],
    mood: 'excited',
    animations: {
      idle: 'welcoming-pulse',
      thinking: 'understanding-needs',
      helping: 'showing-possibilities'
    }
  }
};

// Configuration par défaut pour modules non définis
export const defaultLiloConfig: LiloConfig = {
  module: 'home',
  capabilities: ['general-assistance'],
  welcomeMessage: "Bonjour ! Je suis LILO™, votre assistant IA Iluma™. Comment puis-je vous aider ?",
  contextualHelp: ["Je suis là pour vous accompagner dans l'utilisation de nos outils"],
  shortcuts: [
    { label: "Aide générale", action: "general_help", description: "Assistance et guidance" }
  ],
  mood: 'happy',
  animations: {
    idle: 'gentle-float',
    thinking: 'processing',
    helping: 'assisting'
  }
};