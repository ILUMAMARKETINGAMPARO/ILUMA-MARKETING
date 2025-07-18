export type LiloMood = 'happy' | 'thinking' | 'helper' | 'alert' | 'dormant' | 'curious' | 'excited';

interface LiloMemoryData {
  lastPage: string;
  lastScrollDepth: number;
  lastMood: LiloMood;
  lastMessage: string;
  lastVisitTime: number;
  interactionCount: number;
  preferredLanguage: string;
  completedModules: string[];
}

class LiloMemoryManager {
  private readonly STORAGE_KEY = 'lilo_memory';
  private readonly SESSION_KEY = 'lilo_session';

  private getDefaultMemory(): LiloMemoryData {
    return {
      lastPage: '/',
      lastScrollDepth: 0,
      lastMood: 'happy',
      lastMessage: '',
      lastVisitTime: Date.now(),
      interactionCount: 0,
      preferredLanguage: 'fr',
      completedModules: []
    };
  }

  getMemory(): LiloMemoryData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...this.getDefaultMemory(), ...parsed };
      }
    } catch (error) {
      console.warn('Erreur lors de la lecture de la mémoire LILO:', error);
    }
    return this.getDefaultMemory();
  }

  updateMemory(updates: Partial<LiloMemoryData>): void {
    try {
      const currentMemory = this.getMemory();
      const newMemory = { 
        ...currentMemory, 
        ...updates,
        lastVisitTime: Date.now()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newMemory));
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde de la mémoire LILO:', error);
    }
  }

  updateNavigation(page: string): void {
    const memory = this.getMemory();
    this.updateMemory({
      lastPage: page,
      interactionCount: memory.interactionCount + 1
    });
  }

  updateMood(mood: LiloMood, message?: string): void {
    const updates: Partial<LiloMemoryData> = { lastMood: mood };
    if (message) {
      updates.lastMessage = message;
    }
    this.updateMemory(updates);
  }

  updateScroll(depth: number): void {
    this.updateMemory({ lastScrollDepth: depth });
  }

  addCompletedModule(moduleId: string): void {
    const memory = this.getMemory();
    if (!memory.completedModules.includes(moduleId)) {
      this.updateMemory({
        completedModules: [...memory.completedModules, moduleId]
      });
    }
  }

  isReturningUser(): boolean {
    const memory = this.getMemory();
    const daysSinceLastVisit = (Date.now() - memory.lastVisitTime) / (1000 * 60 * 60 * 24);
    return memory.interactionCount > 5 && daysSinceLastVisit < 30;
  }

  getPersonalizedGreeting(): string {
    const memory = this.getMemory();
    
    if (this.isReturningUser()) {
      return `Content de te revoir ! Dernière visite: ${memory.lastPage} 🌟`;
    }
    
    if (memory.interactionCount > 0) {
      return `Bienvenue de retour ! Tu as exploré ${memory.interactionCount} sections 🚀`;
    }
    
    return `Salut ! Je suis LILO, ton guide IA Iluma ✨`;
  }

  getSuggestedNextAction(): string {
    const memory = this.getMemory();
    
    if (memory.completedModules.length === 0) {
      return "Commence par découvrir notre méthode ! 🎯";
    }
    
    if (memory.completedModules.length < 3) {
      return "Tu progresses bien ! Continue l'exploration 🔥";
    }
    
    if (!memory.completedModules.includes('formation')) {
      return "Prêt pour la formation complète ? 🎓";
    }
    
    return "Tu maîtrises ! Peut-être temps de contacter l'équipe ? 📞";
  }

  clearMemory(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      sessionStorage.removeItem(this.SESSION_KEY);
    } catch (error) {
      console.warn('Erreur lors de la suppression de la mémoire LILO:', error);
    }
  }

  // Session-based memory (temporary, cleared when tab closes)
  setSessionData(key: string, value: any): void {
    try {
      sessionStorage.setItem(`${this.SESSION_KEY}_${key}`, JSON.stringify(value));
    } catch (error) {
      console.warn('Erreur session storage:', error);
    }
  }

  getSessionData(key: string): any {
    try {
      const stored = sessionStorage.getItem(`${this.SESSION_KEY}_${key}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Erreur lecture session storage:', error);
      return null;
    }
  }

  // Analytics helpers
  getEngagementLevel(): 'low' | 'medium' | 'high' {
    const memory = this.getMemory();
    
    if (memory.interactionCount < 3) return 'low';
    if (memory.interactionCount < 10) return 'medium';
    return 'high';
  }

  getCompletionRate(): number {
    const memory = this.getMemory();
    const totalModules = 13; // Total modules Iluma
    return (memory.completedModules.length / totalModules) * 100;
  }
}

// Export singleton instance
export const LiloMemory = new LiloMemoryManager();