export interface CaseStudy {
  id: string;
  title: {
    fr: string;
    en: string;
    es: string;
  };
  client: string;
  sector: string;
  duration: string;
  location: string;
  languages: string[];
  initialDiagnosis: {
    fr: string[];
    en: string[];
    es: string[];
  };
  actions: Array<{
    module: string;
    action: {
      fr: string;
      en: string;
      es: string;
    };
    detail: {
      fr: string;
      en: string;
      es: string;
    };
  }>;
  results: Array<{
    metric: {
      fr: string;
      en: string;
      es: string;
    };
    value: string;
    improvement: string;
  }>;
  keyAchievements: {
    fr: string[];
    en: string[];
    es: string[];
  };
  recommendations: {
    fr: string[];
    en: string[];
    es: string[];
  };
  testimonial: {
    quote: {
      fr: string;
      en: string;
      es: string;
    };
    author: string;
    position: {
      fr: string;
      en: string;
      es: string;
    };
  };
  provenPoints: {
    fr: string[];
    en: string[];
    es: string[];
  };
}

export const katzSportCase: CaseStudy = {
  id: 'katz-sport-seo-success',
  title: {
    fr: 'Katz Sport : +214% de Trafic Organique en 6 Mois',
    en: 'Katz Sport: +214% Organic Traffic in 6 Months',
    es: 'Katz Sport: +214% Tráfico Orgánico en 6 Meses'
  },
  client: 'Katz Sport',
  sector: 'Boutique spécialisée en équipements de crosse et vêtements de sport',
  duration: '6 mois (2024-2025)',
  location: 'Montréal, Laval, Rive-Nord',
  languages: ['FR', 'EN'],
  initialDiagnosis: {
    fr: [
      'Aucune page optimisée pour les mots-clés principaux',
      'Fiches Google Business non revendiquées',
      'Zéro backlink externe',
      'Pages produits non indexées',
      'Aucun article de blog ni contenu de marque',
      'SEO = 100% inexistant en juin 2024'
    ],
    en: [
      'No pages optimized for main keywords',
      'Unclaimed Google Business profiles',
      'Zero external backlinks',
      'Product pages not indexed',
      'No blog articles or brand content',
      'SEO = 100% non-existent in June 2024'
    ],
    es: [
      'Ninguna página optimizada para palabras clave principales',
      'Fichas Google Business sin reclamar',
      'Cero backlinks externos',
      'Páginas de productos no indexadas',
      'Sin artículos de blog ni contenido de marca',
      'SEO = 100% inexistente en junio 2024'
    ]
  },
  actions: [
    {
      module: 'M1',
      action: {
        fr: 'Landing Page SEO locale',
        en: 'Local SEO Landing Page',
        es: 'Landing Page SEO local'
      },
      detail: {
        fr: 'Ciblée « magasin de crosse montréal »',
        en: 'Targeted "lacrosse store montreal"',
        es: 'Dirigida a "tienda lacrosse montreal"'
      }
    },
    {
      module: 'M2',
      action: {
        fr: 'Recherche de mots-clés',
        en: 'Keyword Research',
        es: 'Investigación de palabras clave'
      },
      detail: {
        fr: 'Ahrefs + Google Console',
        en: 'Ahrefs + Google Console',
        es: 'Ahrefs + Google Console'
      }
    },
    {
      module: 'M3',
      action: {
        fr: 'Optimisation GMB',
        en: 'GMB Optimization',
        es: 'Optimización GMB'
      },
      detail: {
        fr: 'Revendication + visuels + horaire + description',
        en: 'Claiming + visuals + schedule + description',
        es: 'Reclamación + visuales + horario + descripción'
      }
    },
    {
      module: 'M4',
      action: {
        fr: 'Création de contenu IA',
        en: 'AI Content Creation',
        es: 'Creación de contenido IA'
      },
      detail: {
        fr: 'Articles : règles de crosse, types d\'équipement, conseils saisonniers',
        en: 'Articles: lacrosse rules, equipment types, seasonal tips',
        es: 'Artículos: reglas lacrosse, tipos equipos, consejos estacionales'
      }
    },
    {
      module: 'M5',
      action: {
        fr: 'Fiches produits SEO',
        en: 'SEO Product Pages',
        es: 'Fichas productos SEO'
      },
      detail: {
        fr: 'Description + titre + balises + rich snippets',
        en: 'Description + title + tags + rich snippets',
        es: 'Descripción + título + etiquetas + rich snippets'
      }
    },
    {
      module: 'M6',
      action: {
        fr: 'Backlinking local',
        en: 'Local Backlinking',
        es: 'Backlinking local'
      },
      detail: {
        fr: 'Blogs sportifs, répertoires jeunesse, clubs de crosse',
        en: 'Sports blogs, youth directories, lacrosse clubs',
        es: 'Blogs deportivos, directorios juveniles, clubs lacrosse'
      }
    },
    {
      module: 'M7',
      action: {
        fr: 'Tableau de bord SEO',
        en: 'SEO Dashboard',
        es: 'Panel SEO'
      },
      detail: {
        fr: 'Connexions à Search Console + rapport mensuel généré dans Noté™',
        en: 'Search Console connections + monthly report generated in Noté™',
        es: 'Conexiones Search Console + reporte mensual en Noté™'
      }
    }
  ],
  results: [
    {
      metric: {
        fr: 'Trafic organique mensuel',
        en: 'Monthly organic traffic',
        es: 'Tráfico orgánico mensual'
      },
      value: '+214%',
      improvement: '+214%'
    },
    {
      metric: {
        fr: 'Mots-clés en 1re page Google',
        en: 'Keywords on Google 1st page',
        es: 'Palabras clave en 1ra página Google'
      },
      value: '45',
      improvement: 'Partant de 0'
    },
    {
      metric: {
        fr: 'Note Google Business',
        en: 'Google Business Rating',
        es: 'Calificación Google Business'
      },
      value: '4.6/5',
      improvement: 'De 0 à 4.6/5 (35 avis)'
    },
    {
      metric: {
        fr: 'Clics mensuels pages produits',
        en: 'Monthly product page clicks',
        es: 'Clics mensuales páginas productos'
      },
      value: '+550',
      improvement: '+550 clics depuis résultats naturels'
    },
    {
      metric: {
        fr: 'Pack Local Google Maps',
        en: 'Google Maps Local Pack',
        es: 'Pack Local Google Maps'
      },
      value: '6 mots-clés',
      improvement: 'Top 3 pour 6 mots-clés stratégiques'
    }
  ],
  keyAchievements: {
    fr: [
      'boutique crosse montréal',
      'équipement de sport laval',
      'casque crosse junior'
    ],
    en: [
      'lacrosse store montreal',
      'sports equipment laval',
      'junior lacrosse helmet'
    ],
    es: [
      'tienda lacrosse montreal',
      'equipo deportivo laval',
      'casco lacrosse junior'
    ]
  },
  recommendations: {
    fr: [
      'Lancer une chaîne YouTube Katz Sport + shorts (FAQ + conseils)',
      'Activer un blog IA multilingue (FR / EN)',
      'Connecter l\'infolettre + CRM Iluma pour conversion post-visite',
      'Ajouter un chatbot IA pour conseiller l\'équipement selon niveau/joueur',
      'Créer une étude interactive de comparatif produits (avec filtres dynamiques)'
    ],
    en: [
      'Launch YouTube channel Katz Sport + shorts (FAQ + tips)',
      'Activate multilingual AI blog (FR / EN)',
      'Connect newsletter + Iluma CRM for post-visit conversion',
      'Add AI chatbot to advise equipment by skill level/player',
      'Create interactive product comparison study (with dynamic filters)'
    ],
    es: [
      'Lanzar canal YouTube Katz Sport + shorts (FAQ + consejos)',
      'Activar blog IA multilingüe (FR / EN)',
      'Conectar newsletter + CRM Iluma para conversión post-visita',
      'Agregar chatbot IA para aconsejar equipo según nivel/jugador',
      'Crear estudio interactivo comparativo productos (con filtros dinámicos)'
    ]
  },
  testimonial: {
    quote: {
      fr: 'Iluma a transformé notre présence en ligne. Les résultats dépassent toutes nos attentes ! Nous sommes maintenant visibles partout où nos clients nous cherchent.',
      en: 'Iluma transformed our online presence. Results exceed all our expectations! We are now visible everywhere our customers look for us.',
      es: 'Iluma transformó nuestra presencia online. ¡Los resultados superan todas nuestras expectativas! Ahora somos visibles donde nuestros clientes nos buscan.'
    },
    author: 'David Katz',
    position: {
      fr: 'Propriétaire, Katz Sport',
      en: 'Owner, Katz Sport',
      es: 'Propietario, Katz Sport'
    }
  },
  provenPoints: {
    fr: [
      'Même sans base SEO initiale, des résultats tangibles sont possibles en 90 jours',
      'Les commerces de niche peuvent sortir du lot avec une structure IA + SEO local',
      'Un contenu cohérent + stratégie Google Business peut générer un flux durable de clients'
    ],
    en: [
      'Even without initial SEO foundation, tangible results are possible in 90 days',
      'Niche businesses can stand out with AI + local SEO structure',
      'Consistent content + Google Business strategy can generate sustainable customer flow'
    ],
    es: [
      'Incluso sin base SEO inicial, resultados tangibles son posibles en 90 días',
      'Comercios de nicho pueden destacar con estructura IA + SEO local',
      'Contenido consistente + estrategia Google Business puede generar flujo sostenible de clientes'
    ]
  }
};

export const allCaseStudies = [katzSportCase];