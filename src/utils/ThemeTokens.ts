// Iluma™ Design System - Theme Tokens
// Système de tokens pour la navigation et l'interface galactique

export const IlumaTheme = {
  // Couleurs principales (HSL format pour compatibilité CSS)
  colors: {
    // Fond galactique
    background: {
      primary: 'hsl(223, 47%, 7%)',      // #0A0F24 - Noir galactique profond
      secondary: 'hsl(240, 10%, 4%)',    // #0B0B0E - Noir absolu
      muted: 'hsl(223, 47%, 12%)',       // Variante plus claire
    },
    
    // Violet néon Iluma
    primary: {
      base: 'hsl(270, 84%, 60%)',        // #C084FC - Violet principal
      light: 'hsl(270, 84%, 75%)',       // Version claire
      dark: 'hsl(270, 84%, 45%)',        // Version foncée
    },
    
    // Halo or
    accent: {
      base: 'hsl(51, 100%, 50%)',        // #FFD700 - Or lumineux
      light: 'hsl(51, 100%, 70%)',       // Version claire
      dark: 'hsl(51, 100%, 35%)',        // Version foncée
    },
    
    // Couleurs fonctionnelles
    success: 'hsl(142, 76%, 36%)',       // Vert
    warning: 'hsl(38, 92%, 50%)',        // Orange
    error: 'hsl(0, 84%, 60%)',           // Rouge
    
    // Texte
    foreground: {
      primary: 'hsl(0, 0%, 98%)',        // Blanc presque pur
      secondary: 'hsl(0, 0%, 80%)',      // Gris clair
      muted: 'hsl(0, 0%, 60%)',          // Gris moyen
    },
    
    // Bordures
    border: {
      primary: 'hsl(270, 84%, 60%, 0.2)', // Violet transparent
      secondary: 'hsl(0, 0%, 100%, 0.1)', // Blanc transparent
      accent: 'hsl(51, 100%, 50%, 0.3)',  // Or transparent
    }
  },

  // Effets visuels
  effects: {
    // Halos et glows
    glow: {
      primary: '0 0 20px hsl(270, 84%, 60%, 0.4)',
      accent: '0 0 20px hsl(51, 100%, 50%, 0.4)',
      soft: '0 0 10px hsl(270, 84%, 60%, 0.2)',
    },
    
    // Ombres
    shadow: {
      small: '0 2px 8px hsl(0, 0%, 0%, 0.1)',
      medium: '0 4px 16px hsl(0, 0%, 0%, 0.15)',
      large: '0 8px 32px hsl(0, 0%, 0%, 0.2)',
      colored: '0 4px 16px hsl(270, 84%, 60%, 0.15)',
    },
    
    // Backdrop blur
    blur: {
      light: 'backdrop-blur-sm',
      medium: 'backdrop-blur-md',
      heavy: 'backdrop-blur-xl',
    }
  },

  // Animation timings
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    
    // Easing curves
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
  },

  // Espacement
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // Rayons de bordure
  radius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',  // Complètement rond
  },

  // Typographie
  typography: {
    fontFamily: {
      primary: ['Montserrat', 'sans-serif'],
      secondary: ['Inter', 'sans-serif'],
    },
    
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '2rem',   // 32px
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    navbar: 70,
    max: 999,
  }
};

// Helper functions pour utiliser les tokens
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let current: any = IlumaTheme.colors;
  
  for (const key of keys) {
    current = current?.[key];
  }
  
  return current || path;
};

export const getEffect = (type: 'glow' | 'shadow', variant: string): string => {
  return IlumaTheme.effects[type][variant as keyof typeof IlumaTheme.effects.glow] || '';
};

// CSS Custom Properties Generator
export const generateCSSVariables = (): Record<string, string> => {
  const cssVars: Record<string, string> = {};
  
  // Colors
  Object.entries(IlumaTheme.colors).forEach(([category, colors]) => {
    if (typeof colors === 'object') {
      Object.entries(colors).forEach(([variant, value]) => {
        cssVars[`--iluma-${category}-${variant}`] = value as string;
      });
    } else {
      cssVars[`--iluma-${category}`] = colors;
    }
  });
  
  // Spacing
  Object.entries(IlumaTheme.spacing).forEach(([size, value]) => {
    cssVars[`--iluma-spacing-${size}`] = value;
  });
  
  return cssVars;
};

export default IlumaTheme;