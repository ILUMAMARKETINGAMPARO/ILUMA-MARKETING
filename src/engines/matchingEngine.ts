import { RivalBusiness } from '@/types/rivalviews';

export interface MatchCriteria {
  sector?: string[];
  location?: string[];
  ilaScoreRange?: [number, number];
  budgetRange?: [number, number];
  businessSize?: 'small' | 'medium' | 'large';
  priorities?: string[];
  timeframe?: 'immediate' | 'short' | 'medium' | 'long';
}

export interface MatchResult {
  business: RivalBusiness;
  score: number; // 0-100
  reasons: string[];
  recommendations: string[];
  estimatedValue: number;
  confidenceLevel: number;
}

export interface ServiceMatch {
  serviceType: 'ADLUMA' | 'ILA' | 'CRM' | 'Landing' | 'SEO' | 'Full';
  suitability: number; // 0-100
  reasoning: string[];
  estimatedROI: number;
  timeline: string;
  price: number;
}

export class MatchingEngine {
  /**
   * Trouve les meilleures correspondances pour des critères donnés
   */
  static findMatches(
    businesses: RivalBusiness[], 
    criteria: MatchCriteria, 
    limit: number = 10
  ): MatchResult[] {
    const matches = businesses
      .map(business => this.calculateMatch(business, criteria))
      .filter(match => match.score >= 60) // Seuil minimum
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return matches;
  }

  /**
   * Calcule la compatibilité d'une entreprise avec des critères
   */
  private static calculateMatch(business: RivalBusiness, criteria: MatchCriteria): MatchResult {
    let score = 0;
    const reasons: string[] = [];
    const recommendations: string[] = [];
    let weights = 0;

    // Correspondance secteur (25%)
    if (criteria.sector?.length) {
      const sectorMatch = criteria.sector.includes(business.sector);
      if (sectorMatch) {
        score += 25;
        reasons.push(`Secteur ${business.sector} correspond aux critères`);
      }
      weights += 25;
    }

    // Correspondance localisation (20%)
    if (criteria.location?.length) {
      const locationMatch = criteria.location.includes(business.city);
      if (locationMatch) {
        score += 20;
        reasons.push(`Localisation ${business.city} ciblée`);
      }
      weights += 20;
    }

    // Score ILA dans la fourchette (30%)
    if (criteria.ilaScoreRange) {
      const [min, max] = criteria.ilaScoreRange;
      if (business.ilaScore >= min && business.ilaScore <= max) {
        score += 30;
        reasons.push(`Score ILA ${business.ilaScore} dans la fourchette cible`);
      } else if (business.ilaScore < min) {
        const potential = min - business.ilaScore;
        score += Math.max(0, 30 - potential);
        recommendations.push(`Potentiel d'amélioration de ${potential} points ILA`);
      }
      weights += 30;
    }

    // Statut prospect (15%)
    if (business.status === 'prospect') {
      score += 15;
      reasons.push('Prospect disponible pour prospection');
    } else if (business.status === 'contacted') {
      score += 10;
      reasons.push('Déjà contacté, suivi possible');
    }
    weights += 15;

    // Potentiel élevé (10%)
    if (business.potential === 'high') {
      score += 10;
      reasons.push('Potentiel commercial élevé');
    } else if (business.potential === 'medium') {
      score += 5;
    }
    weights += 10;

    // Normalisation du score
    const finalScore = weights > 0 ? Math.round((score / weights) * 100) : 0;

    return {
      business,
      score: finalScore,
      reasons,
      recommendations,
      estimatedValue: this.calculateEstimatedValue(business),
      confidenceLevel: this.calculateConfidence(business, criteria)
    };
  }

  /**
   * Recommande le meilleur service Iluma pour une entreprise
   */
  static recommendService(business: RivalBusiness): ServiceMatch[] {
    const services: ServiceMatch[] = [];

    // ADLUMA™ - Simulateur publicitaire
    if (business.ilaScore < 70 || !business.website) {
      services.push({
        serviceType: 'ADLUMA',
        suitability: 85,
        reasoning: [
          'Score ILA faible nécessite visibilité payante',
          'Opportunité de tester différentes approches',
          'ROI mesurable rapidement'
        ],
        estimatedROI: 300,
        timeline: '2-4 semaines',
        price: 2500
      });
    }

    // ILA™ - Optimisation locale
    if (business.googleRating < 4.0 || business.reviewCount < 50) {
      services.push({
        serviceType: 'ILA',
        suitability: 90,
        reasoning: [
          'Réputation en ligne à améliorer',
          'Potentiel de croissance local important',
          'Base solide pour autres services'
        ],
        estimatedROI: 250,
        timeline: '4-8 semaines',
        price: 3500
      });
    }

    // Landing Page Intelligente
    if (!business.website || business.serpRank > 10) {
      services.push({
        serviceType: 'Landing',
        suitability: 80,
        reasoning: [
          'Conversion des visiteurs à optimiser',
          'Manque de présence web structurée',
          'Potentiel immédiat de génération de leads'
        ],
        estimatedROI: 400,
        timeline: '1-2 semaines',
        price: 1500
      });
    }

    // CRM Iluma
    if (business.potential === 'high' && business.status === 'prospect') {
      services.push({
        serviceType: 'CRM',
        suitability: 75,
        reasoning: [
          'Gestion de prospects à optimiser',
          'Suivi commercial à automatiser',
          'Potentiel de croissance important'
        ],
        estimatedROI: 200,
        timeline: '2-3 semaines',
        price: 2000
      });
    }

    // SEO Complet
    if (business.ilaScore >= 70 && business.website) {
      services.push({
        serviceType: 'SEO',
        suitability: 95,
        reasoning: [
          'Base solide pour optimisation avancée',
          'Potentiel de domination locale',
          'ROI long terme excellent'
        ],
        estimatedROI: 500,
        timeline: '8-12 semaines',
        price: 4500
      });
    }

    // Package Complet
    if (business.potential === 'high' && business.ilaScore < 80) {
      services.push({
        serviceType: 'Full',
        suitability: 100,
        reasoning: [
          'Transformation digitale complète nécessaire',
          'Potentiel maximum avec approche globale',
          'Synergie entre tous les modules'
        ],
        estimatedROI: 800,
        timeline: '12-16 semaines',
        price: 8500
      });
    }

    return services.sort((a, b) => b.suitability - a.suitability);
  }

  /**
   * Trouve des entreprises similaires pour analyse concurrentielle
   */
  static findSimilarBusinesses(
    target: RivalBusiness, 
    businesses: RivalBusiness[], 
    limit: number = 5
  ): RivalBusiness[] {
    return businesses
      .filter(b => b.id !== target.id)
      .map(business => ({
        business,
        similarity: this.calculateSimilarity(target, business)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(item => item.business);
  }

  /**
   * Calcule la similarité entre deux entreprises
   */
  private static calculateSimilarity(business1: RivalBusiness, business2: RivalBusiness): number {
    let similarity = 0;

    // Même secteur (40%)
    if (business1.sector === business2.sector) similarity += 40;

    // Même ville (30%)
    if (business1.city === business2.city) similarity += 30;

    // Scores ILA similaires (20%)
    const scoreDiff = Math.abs(business1.ilaScore - business2.ilaScore);
    similarity += Math.max(0, 20 - scoreDiff / 5);

    // Taille similaire (10%)
    const ratingDiff = Math.abs(business1.googleRating - business2.googleRating);
    similarity += Math.max(0, 10 - ratingDiff * 2);

    return similarity;
  }

  /**
   * Calcule la valeur estimée d'un prospect
   */
  private static calculateEstimatedValue(business: RivalBusiness): number {
    let baseValue = 1000; // Valeur de base

    // Multiplicateur selon le secteur
    const sectorMultipliers = {
      'Restaurant': 1.5,
      'Santé': 2.0,
      'Immobilier': 2.5,
      'Services': 1.2,
      'Commerce': 1.3,
      'Beauté': 1.4
    };

    baseValue *= sectorMultipliers[business.sector as keyof typeof sectorMultipliers] || 1.0;

    // Bonus selon le potentiel
    if (business.potential === 'high') baseValue *= 1.5;
    else if (business.potential === 'medium') baseValue *= 1.2;

    // Bonus selon le score ILA (inversement proportionnel)
    const ilaBonus = (100 - business.ilaScore) / 100 * 0.5 + 1;
    baseValue *= ilaBonus;

    return Math.round(baseValue);
  }

  /**
   * Calcule le niveau de confiance d'un match
   */
  private static calculateConfidence(business: RivalBusiness, criteria: MatchCriteria): number {
    let confidence = 50; // Base

    // Données complètes augmentent la confiance
    if (business.phone) confidence += 10;
    if (business.website) confidence += 10;
    if (business.email) confidence += 5;

    // Avis récents et nombreux
    if (business.reviewCount > 50) confidence += 15;
    if (business.googleRating > 4.0) confidence += 10;

    return Math.min(100, confidence);
  }

  /**
   * Génère des insights pour améliorer le matching
   */
  static generateMatchingInsights(
    matches: MatchResult[], 
    criteria: MatchCriteria
  ): {
    totalMatches: number;
    averageScore: number;
    topReasons: string[];
    recommendations: string[];
  } {
    const totalMatches = matches.length;
    const averageScore = matches.reduce((sum, m) => sum + m.score, 0) / totalMatches || 0;

    // Analyse des raisons les plus fréquentes
    const reasonCounts: Record<string, number> = {};
    matches.forEach(match => {
      match.reasons.forEach(reason => {
        reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
      });
    });

    const topReasons = Object.entries(reasonCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([reason]) => reason);

    // Recommandations d'optimisation
    const recommendations: string[] = [];
    
    if (totalMatches < 5) {
      recommendations.push("Élargir les critères de recherche pour plus de résultats");
    }
    
    if (averageScore < 75) {
      recommendations.push("Affiner les critères pour améliorer la qualité des matches");
    }

    if (matches.filter(m => m.business.status === 'client').length > 0) {
      recommendations.push("Exclure les clients existants de la recherche");
    }

    return {
      totalMatches,
      averageScore: Math.round(averageScore),
      topReasons,
      recommendations
    };
  }
}