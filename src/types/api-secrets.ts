export interface APISecret {
  id: string;
  service_name: string;
  key_name: string;
  key_value?: string | null;
  is_configured: boolean;
  expires_at?: string | null;
  last_tested_at?: string | null;
  test_status: string;
  metadata: any;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
}

export interface ServiceConfig {
  name: string;
  displayName: string;
  icon: string;
  description: string;
  keys: {
    name: string;
    displayName: string;
    type: 'text' | 'password' | 'select' | 'boolean';
    required: boolean;
    placeholder?: string;
    options?: string[];
    helpText?: string;
  }[];
}

export interface APITestResult {
  service: string;
  status: 'success' | 'failed' | 'unknown';
  tested_at: string;
  message: string;
  details?: Record<string, any>;
}

// Configuration des services supportés
export const SERVICE_CONFIGS: ServiceConfig[] = [
  {
    name: 'google_ads',
    displayName: 'Google Ads',
    icon: '🔍',
    description: 'API Google Ads pour la gestion des campagnes publicitaires',
    keys: [
      {
        name: 'client_id',
        displayName: 'Client ID',
        type: 'text',
        required: true,
        placeholder: 'xxxxx.apps.googleusercontent.com',
        helpText: 'ID client OAuth 2.0 de Google Cloud Console'
      },
      {
        name: 'client_secret',
        displayName: 'Client Secret',
        type: 'password',
        required: true,
        placeholder: 'GOCSPx-xxxxx',
        helpText: 'Secret client OAuth 2.0'
      },
      {
        name: 'refresh_token',
        displayName: 'Refresh Token',
        type: 'password',
        required: true,
        placeholder: '1//xxxxx',
        helpText: 'Token de rafraîchissement pour l\'accès permanent'
      }
    ]
  },
  {
    name: 'google_analytics',
    displayName: 'Google Analytics',
    icon: '📊',
    description: 'API Google Analytics pour les données de trafic web',
    keys: [
      {
        name: 'client_id',
        displayName: 'Client ID',
        type: 'text',
        required: true,
        placeholder: 'xxxxx.apps.googleusercontent.com'
      },
      {
        name: 'client_secret',
        displayName: 'Client Secret',
        type: 'password',
        required: true,
        placeholder: 'GOCSPx-xxxxx'
      },
      {
        name: 'refresh_token',
        displayName: 'Refresh Token',
        type: 'password',
        required: true,
        placeholder: '1//xxxxx'
      }
    ]
  },
  {
    name: 'google_search_console',
    displayName: 'Google Search Console',
    icon: '🔎',
    description: 'API Search Console pour les données SEO',
    keys: [
      {
        name: 'site_url',
        displayName: 'Site URL validé',
        type: 'text',
        required: true,
        placeholder: 'https://ilumamarketing.com',
        helpText: 'URL du site validé dans Search Console'
      },
      {
        name: 'verification_token',
        displayName: 'Token de vérification',
        type: 'text',
        required: false,
        placeholder: 'google-site-verification=xxxxx',
        helpText: 'Token DNS TXT pour la vérification (optionnel)'
      }
    ]
  },
  {
    name: 'google_my_business',
    displayName: 'Google My Business',
    icon: '📍',
    description: 'API Google My Business pour la gestion des fiches locales',
    keys: [
      {
        name: 'has_owner_access',
        displayName: 'Accès propriétaire',
        type: 'boolean',
        required: true,
        helpText: 'Avez-vous accès propriétaire à la fiche GMB ?'
      },
      {
        name: 'account_id',
        displayName: 'Account ID',
        type: 'text',
        required: false,
        placeholder: 'accounts/xxxxx',
        helpText: 'ID du compte GMB (si accès propriétaire)'
      },
      {
        name: 'location_id',
        displayName: 'Location ID',
        type: 'text',
        required: false,
        placeholder: 'locations/xxxxx',
        helpText: 'ID de la localisation GMB'
      }
    ]
  },
  {
    name: 'google_maps',
    displayName: 'Google Maps Platform',
    icon: '🗺️',
    description: 'API Google Maps pour la géolocalisation',
    keys: [
      {
        name: 'api_key',
        displayName: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'AIzaSxxxxx',
        helpText: 'Clé API Google Maps Platform'
      }
    ]
  },
  {
    name: 'meta_ads',
    displayName: 'Meta Ads',
    icon: '📱',
    description: 'API Meta Ads (Facebook/Instagram) pour les campagnes publicitaires',
    keys: [
      {
        name: 'app_id',
        displayName: 'App ID',
        type: 'text',
        required: true,
        placeholder: '123456789012345',
        helpText: 'ID de l\'application Facebook'
      },
      {
        name: 'app_secret',
        displayName: 'App Secret',
        type: 'password',
        required: true,
        placeholder: 'xxxxxxxxxxxxxxxxxxxxx',
        helpText: 'Secret de l\'application Facebook'
      },
      {
        name: 'access_token',
        displayName: 'Access Token',
        type: 'password',
        required: true,
        placeholder: 'EAAxxxxx',
        helpText: 'Token d\'accès à long terme'
      }
    ]
  },
  {
    name: 'instagram_business',
    displayName: 'Instagram Business',
    icon: '📸',
    description: 'API Instagram Business pour le contenu et les insights',
    keys: [
      {
        name: 'business_id',
        displayName: 'Business ID',
        type: 'text',
        required: true,
        placeholder: '123456789012345',
        helpText: 'ID du compte Instagram Business'
      }
    ]
  },
  {
    name: 'serpapi',
    displayName: 'SerpAPI',
    icon: '🐍',
    description: 'API SerpAPI pour les données SERP et maps',
    keys: [
      {
        name: 'api_key',
        displayName: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'xxxxxxxxxxxxxxxxxxxxx',
        helpText: 'Clé API SerpAPI'
      },
      {
        name: 'mode',
        displayName: 'Mode',
        type: 'select',
        required: true,
        options: ['google_maps', 'google_local', 'google_search'],
        helpText: 'Mode d\'utilisation principal de SerpAPI'
      }
    ]
  },
  {
    name: 'youtube',
    displayName: 'YouTube Data API',
    icon: '▶️',
    description: 'API YouTube pour les données de chaîne et vidéos',
    keys: [
      {
        name: 'api_key',
        displayName: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'AIzaSxxxxx',
        helpText: 'Clé API YouTube Data'
      },
      {
        name: 'channel_id',
        displayName: 'Channel ID',
        type: 'text',
        required: false,
        placeholder: 'UCxxxxxxxxxxxxxxxxxxxxx',
        helpText: 'ID de la chaîne YouTube principale'
      }
    ]
  },
  {
    name: 'gmail',
    displayName: 'Gmail / Google Workspace',
    icon: '📧',
    description: 'OAuth Gmail pour l\'accès aux emails',
    keys: [
      {
        name: 'oauth_client_id',
        displayName: 'OAuth Client ID',
        type: 'text',
        required: true,
        placeholder: 'xxxxx.apps.googleusercontent.com'
      },
      {
        name: 'oauth_client_secret',
        displayName: 'OAuth Client Secret',
        type: 'password',
        required: true,
        placeholder: 'GOCSPx-xxxxx'
      }
    ]
  },
  {
    name: 'resend',
    displayName: 'Resend',
    icon: '✉️',
    description: 'API Resend pour l\'emailing transactionnel',
    keys: [
      {
        name: 'api_key',
        displayName: 'API Key',
        type: 'password',
        required: true,
        placeholder: 're_xxxxxxxxxx',
        helpText: 'Clé API Resend'
      }
    ]
  },
  {
    name: 'make_integromat',
    displayName: 'Make (ex-Integromat)',
    icon: '🔗',
    description: 'API Make pour l\'automation des workflows',
    keys: [
      {
        name: 'api_token',
        displayName: 'API Token',
        type: 'password',
        required: true,
        placeholder: 'xxxxxxxxxxxxxxxxxxxxx',
        helpText: 'Token API Make'
      }
    ]
  },
  {
    name: 'lovable',
    displayName: 'Lovable™',
    icon: '💜',
    description: 'Configuration Lovable™ pour les webhooks et sync',
    keys: [
      {
        name: 'webhook_url',
        displayName: 'Webhook URL',
        type: 'text',
        required: false,
        placeholder: 'https://webhook.lovable.app/xxxxx',
        helpText: 'URL de webhook pour la synchronisation CRM'
      },
      {
        name: 'project_id',
        displayName: 'Project ID',
        type: 'text',
        required: true,
        placeholder: '31b7160b-333e-4cb8-8634-f70368bba4b2',
        helpText: 'ID du projet Lovable™'
      }
    ]
  },
  {
    name: 'iluma_crm',
    displayName: 'Iluma CRM Internal',
    icon: '🧠',
    description: 'Configuration interne CRM Iluma™',
    keys: [
      {
        name: 'secret_key',
        displayName: 'Secret Key',
        type: 'password',
        required: true,
        placeholder: 'iluma_xxxxxxxxxxxxxxxxxxxxx',
        helpText: 'Clé secrète interne CRM Iluma™'
      }
    ]
  }
];