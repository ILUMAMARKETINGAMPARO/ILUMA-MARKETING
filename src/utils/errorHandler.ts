export class IlumaErrorHandler {
    private static instance: IlumaErrorHandler;
    private errorQueue: Array<{ error: Error; timestamp: Date; context?: string }> = [];
    private maxErrors = 50;

    private constructor() {
        this.setupGlobalErrorHandler();
    }

      public static getInstance(): IlumaErrorHandler {
    if (!IlumaErrorHandler.instance) {
      IlumaErrorHandler.instance = new IlumaErrorHandler();
    }
    return IlumaErrorHandler.instance;
  }

  private setupGlobalErrorHandlers() {
    // Gestionnaire d'erreurs JavaScript global
    window.addEventListener('error', (event) => {
      this.handleError(new Error(event.message), 'Global Error Handler');
    });

    // Gestionnaire d'erreurs pour les promesses non catchées
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(new Error(event.reason), 'Unhandled Promise Rejection');
    });

    // Gestionnaire spécialisé pour Three.js/WebGL
    this.setupWebGLErrorHandler();
  }

  private setupWebGLErrorHandler() {
    // Intercepter les erreurs spécifiques à WebGL/Three.js
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type: string, options?: any) {
      try {
        const context = originalGetContext.call(this, type, options);
        if (type.includes('webgl') && !context) {
          IlumaErrorHandler.getInstance().handleError(
            new Error('WebGL context creation failed'),
            'WebGL Error Handler'
          );
        }
        return context;
      } catch (error) {
        IlumaErrorHandler.getInstance().handleError(
          error as Error,
          'WebGL Context Error'
        );
        return null;
      }
    };
  }

  public handleError(error: Error, context?: string) {
    // Filtrer les erreurs liées à 'lov' property
    if (error.message.includes("Cannot read properties of undefined (reading 'lov')")) {
      console.warn('Three.js lov property error detected - using fallback rendering');
      this.triggerWebGLFallback();
      return;
    }

    // Ajouter l'erreur à la queue
    this.errorQueue.push({
      error,
      timestamp: new Date(),
      context
    });

    // Maintenir la taille de la queue
    if (this.errorQueue.length > this.maxErrors) {
      this.errorQueue.shift();
    }

    // Log pour debug en développement
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Iluma Error Handler] ${context || 'Unknown'}:`, error);
    }

    // Envoyer les erreurs critiques à un service de monitoring (si configuré)
    if (this.isCriticalError(error)) {
      this.reportCriticalError(error, context);
    }
  }

  private triggerWebGLFallback() {
    // Émettre un événement pour déclencher le fallback 2D
    const event = new CustomEvent('webgl-fallback-required', {
      detail: { reason: 'lov property error in Three.js' }
    });
    window.dispatchEvent(event);
  }

  private isCriticalError(error: Error): boolean {
    const criticalPatterns = [
      'chunk load error',
      'script error',
      'network error',
      'out of memory'
    ];
    
    return criticalPatterns.some(pattern => 
      error.message.toLowerCase().includes(pattern)
    );
  }

  private reportCriticalError(error: Error, context?: string) {
    // Ici, on pourrait envoyer l'erreur à Sentry, LogRocket, etc.
    console.error('[Critical Error]', { error, context, timestamp: new Date() });
  }

  public getRecentErrors(): Array<{ error: Error; timestamp: Date; context?: string }> {
    return [...this.errorQueue].reverse().slice(0, 10);
  }

  public clearErrors() {
    this.errorQueue = [];
  }

  public getErrorStats() {
    const now = new Date();
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);
    
    const recentErrors = this.errorQueue.filter(
      errorInfo => errorInfo.timestamp > lastHour
    );

    return {
      total: this.errorQueue.length,
      lastHour: recentErrors.length,
      contexts: [...new Set(this.errorQueue.map(e => e.context).filter(Boolean))]
    };
  }
}

// Instance singleton globale
export const errorHandler = IlumaErrorHandler.getInstance();

// Hook React pour utiliser l'error handler
export const useErrorHandler = () => {
  const handleError = (error: Error, context?: string) => {
    errorHandler.handleError(error, context);
  };

  return { handleError, getRecentErrors: () => errorHandler.getRecentErrors() };
}
