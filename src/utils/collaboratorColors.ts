// Système de couleurs par collaborateur pour le CRM Iluma™

export interface CollaboratorColor {
  primary: string;
  secondary: string;
  bg: string;
  border: string;
  text: string;
}

export const collaboratorColors: Record<string, CollaboratorColor> = {
  'sergio': {
    primary: '#8E44FF',
    secondary: '#A855F7', 
    bg: '#8E44FF/10',
    border: '#8E44FF/30',
    text: '#8E44FF'
  },
  'amparo': {
    primary: '#FFD56B',
    secondary: '#FBD85D',
    bg: '#FFD56B/10', 
    border: '#FFD56B/30',
    text: '#FFD56B'
  },
  'andrea': {
    primary: '#00FF88',
    secondary: '#34D399',
    bg: '#00FF88/10',
    border: '#00FF88/30', 
    text: '#00FF88'
  },
  'alex': {
    primary: '#00BFFF',
    secondary: '#3B82F6',
    bg: '#00BFFF/10',
    border: '#00BFFF/30',
    text: '#00BFFF'
  },
  'juan': {
    primary: '#FF8C42',
    secondary: '#F97316',
    bg: '#FF8C42/10',
    border: '#FF8C42/30',
    text: '#FF8C42'  
  },
  'belen': {
    primary: '#00FF88',
    secondary: '#34D399',
    bg: '#00FF88/10',
    border: '#00FF88/30',
    text: '#00FF88'
  },
  'assistant': {
    primary: '#FF6B6B',
    secondary: '#EF4444',
    bg: '#FF6B6B/10',
    border: '#FF6B6B/30',
    text: '#FF6B6B'
  }
};

// Couleurs spécifiques pour les rôles Iluma™
export const ilumaRoleColors: Record<string, CollaboratorColor> = {
  'ceo': {
    primary: '#8E44FF', // Violeta
    secondary: '#A855F7',
    bg: '#8E44FF/10',
    border: '#8E44FF/30',
    text: '#8E44FF'
  },
  'coo': {
    primary: '#FFD56B', // Amarillo
    secondary: '#FBD85D',
    bg: '#FFD56B/10',
    border: '#FFD56B/30',
    text: '#FFD56B'
  },
  'developer': {
    primary: '#00BFFF', // Azul
    secondary: '#3B82F6',
    bg: '#00BFFF/10',
    border: '#00BFFF/30',
    text: '#00BFFF'
  },
  'social_media': {
    primary: '#00FF88', // Verde
    secondary: '#34D399',
    bg: '#00FF88/10',
    border: '#00FF88/30',
    text: '#00FF88'
  },
  'partnerships': {
    primary: '#6B7280', // Gris oscuro
    secondary: '#9CA3AF',
    bg: '#6B7280/10',
    border: '#6B7280/30',
    text: '#6B7280'
  },
  'technical_support': {
    primary: '#FF8C42', // Naranja
    secondary: '#F97316',
    bg: '#FF8C42/10',
    border: '#FF8C42/30',
    text: '#FF8C42'
  },
  'creative_design': {
    primary: '#EC4899', // Rosado
    secondary: '#F472B6',
    bg: '#EC4899/10',
    border: '#EC4899/30',
    text: '#EC4899'
  },
  'digital_tools': {
    primary: '#9CA3AF', // Gris claro
    secondary: '#D1D5DB',
    bg: '#9CA3AF/10',
    border: '#9CA3AF/30',
    text: '#9CA3AF'
  },
  'fixed_costs': {
    primary: '#000000', // Negro
    secondary: '#374151',
    bg: '#000000/10',
    border: '#000000/30',
    text: '#FFFFFF'
  },
  'strategic_reserve': {
    primary: '#F59E0B', // Dorado
    secondary: '#FCD34D',
    bg: '#F59E0B/10',
    border: '#F59E0B/30',
    text: '#F59E0B'
  }
};

export const getCollaboratorColor = (collaboratorName: string | undefined | null): CollaboratorColor => {
  // Sécurité : vérifier que le nom existe et n'est pas vide
  if (!collaboratorName || typeof collaboratorName !== 'string' || collaboratorName.trim() === '') {
    console.warn('getCollaboratorColor: nom de collaborateur invalide:', collaboratorName);
    return collaboratorColors['assistant'];
  }
  
  try {
    const normalizedName = collaboratorName.toLowerCase().split(' ')[0];
    return collaboratorColors[normalizedName] || collaboratorColors['assistant'];
  } catch (error) {
    console.error('Erreur dans getCollaboratorColor:', error, 'pour le nom:', collaboratorName);
    return collaboratorColors['assistant'];
  }
};

export const getIlumaRoleColor = (role: string): CollaboratorColor => {
  return ilumaRoleColors[role] || ilumaRoleColors['strategic_reserve'];
};

export const getAllCollaboratorColors = () => Object.values(collaboratorColors);

export const getAllIlumaRoleColors = () => Object.values(ilumaRoleColors);