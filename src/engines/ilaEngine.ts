import { RivalBusiness } from '@/types/rivalviews';

export interface ILAFactors {
  googleMyBusiness: number;      // 0-100
  localSEO: number;             // 0-100
  onlineReviews: number;        // 0-100
  websiteOptimization: number;  // 0-100
  localCitations: number;       // 0-100
  competitivePosition: number;  // 0-100
}

export interface ILACalculationResult {
  overallScore: number;
  factors: ILAFactors;
  recommendations: string[];
  competitiveAnalysis: {
    position: number;
    totalCompetitors: number;
    advantages: string[];
    weaknesses: string[];
  };
}

export class ILAEngine {
  /**
   * Calcule le score ILA™ d'une entreprise
   */
  static calculateILAScore(business: RivalBusiness, competitors: RivalBusiness[] = []): ILACalculationResult {
    const factors = this.analyzeFactors(business, competitors);
    const overallScore = this.computeOverallScore(factors);
    const recommendations = this.generateRecommendations(factors, business);
    const competitiveAnalysis = this.analyzeCompetition(business, competitors);

    return {
      overallScore,
      factors,
      recommendations,
      competitiveAnalysis
    };
  }

  /**
   * Analyse les facteurs individuels ILA™
   */
  private static analyzeFactors(business: RivalBusiness, competitors: RivalBusiness[]): ILAFactors {
    return {
      googleMyBusiness: this.calculateGMBScore(business),
      localSEO: this.calculateLocalSEOScore(business),
      onlineReviews: this.calculateReviewsScore(business),
      websiteOptimization: this.calculateWebsiteScore(business),
      localCitations: this.calculateCitationsScore(business),
      competitivePosition: this.calculateCompetitiveScore(business, competitors)
    };
  }

  /**
   * Score Google My Business (30% du score total)
   */
  private static calculateGMBScore(business: RivalBusiness): number {
    let score = 50; // Base score

    // Présence GMB détectée
    if (business.source === 'GMB') score += 20;

    // Qualité des avis
    if (business.googleRating >= 4.5) score += 20;
    else if (business.googleRating >= 4.0) score += 15;
    else if (business.googleRating >= 3.5) score += 10;

    // Nombre d'avis
    if (business.reviewCount >= 100) score += 15;
    else if (business.reviewCount >= 50) score += 10;
    else if (business.reviewCount >= 20) score += 5;

    // Informations complètes
    if (business.phone) score += 5;
    if (business.website) score += 5;
    if (business.address) score += 5;

    return Math.min(100, score);
  }

  /**
   * Score SEO Local (25% du score total)
   */
  private static calculateLocalSEOScore(business: RivalBusiness): number {
    let score = 40; // Base score

    // Position SERP
    if (business.serpRank <= 3) score += 30;
    else if (business.serpRank <= 10) score += 20;
    else if (business.serpRank <= 20) score += 10;

    // Présence organique vs payante
    if (!business.isSponsored && business.serpRank <= 10) score += 15;

    // Site web optimisé
    if (business.website) {
      score += 15;
      // Simulation: analyse du domaine
      if (business.website.includes(business.city.toLowerCase())) score += 5;
    }

    return Math.min(100, score);
  }

  /**
   * Score Avis en ligne (20% du score total)
   */
  private static calculateReviewsScore(business: RivalBusiness): number {
    let score = 30; // Base score

    // Note moyenne
    if (business.googleRating >= 4.8) score += 35;
    else if (business.googleRating >= 4.5) score += 30;
    else if (business.googleRating >= 4.0) score += 25;
    else if (business.googleRating >= 3.5) score += 15;

    // Volume d'avis
    if (business.reviewCount >= 200) score += 25;
    else if (business.reviewCount >= 100) score += 20;
    else if (business.reviewCount >= 50) score += 15;
    else if (business.reviewCount >= 20) score += 10;

    // Régularité (simulation)
    score += 10; // Suppose des avis réguliers

    return Math.min(100, score);
  }

  /**
   * Score Site Web (15% du score total)
   */
  private static calculateWebsiteScore(business: RivalBusiness): number {
    if (!business.website) return 0;

    let score = 50; // Base pour avoir un site

    // Simulation d'analyse technique
    // En production, ceci ferait appel à des APIs d'analyse
    score += 25; // Suppose un site responsive
    score += 15; // Suppose des métadonnées correctes
    score += 10; // Suppose une vitesse correcte

    return Math.min(100, score);
  }

  /**
   * Score Citations Locales (10% du score total)
   */
  private static calculateCitationsScore(business: RivalBusiness): number {
    let score = 60; // Score de base

    // Simulation basée sur les données disponibles
    if (business.phone) score += 10;
    if (business.address) score += 10;
    if (business.sector === 'Services') score += 10; // Secteur avec plus de citations
    if (business.googleRating > 4.0) score += 10; // Corrélation qualité/citations

    return Math.min(100, score);
  }

  /**
   * Score Position Concurrentielle
   */
  private static calculateCompetitiveScore(business: RivalBusiness, competitors: RivalBusiness[]): number {
    if (competitors.length === 0) return 70; // Score neutre sans concurrence

    const sameCity = competitors.filter(c => c.city === business.city);
    const sameSector = competitors.filter(c => c.sector === business.sector);

    let score = 50;

    // Position vs concurrents même ville
    const cityRank = this.getBusinessRank(business, sameCity);
    const cityPercent = sameCity.length > 0 ? (1 - cityRank / sameCity.length) * 100 : 50;
    score += cityPercent * 0.3;

    // Position vs concurrents même secteur
    const sectorRank = this.getBusinessRank(business, sameSector);
    const sectorPercent = sameSector.length > 0 ? (1 - sectorRank / sameSector.length) * 100 : 50;
    score += sectorPercent * 0.2;

    return Math.min(100, score);
  }

  /**
   * Calcule le score global ILA™
   */
  private static computeOverallScore(factors: ILAFactors): number {
    const weights = {
      googleMyBusiness: 0.30,
      localSEO: 0.25,
      onlineReviews: 0.20,
      websiteOptimization: 0.15,
      localCitations: 0.10,
      competitivePosition: 0.00 // Informatif, pas dans le calcul principal
    };

    return Math.round(
      factors.googleMyBusiness * weights.googleMyBusiness +
      factors.localSEO * weights.localSEO +
      factors.onlineReviews * weights.onlineReviews +
      factors.websiteOptimization * weights.websiteOptimization +
      factors.localCitations * weights.localCitations
    );
  }

  /**
   * Génère des recommandations personnalisées
   */
  private static generateRecommendations(factors: ILAFactors, business: RivalBusiness): string[] {
    const recommendations: string[] = [];

    if (factors.googleMyBusiness < 80) {
      recommendations.push("Optimiser votre fiche Google My Business avec photos et informations complètes");
    }
    
    if (factors.onlineReviews < 75) {
      recommendations.push("Mettre en place une stratégie d'acquisition d'avis clients");
    }
    
    if (factors.localSEO < 70) {
      recommendations.push("Améliorer le SEO local avec des mots-clés géolocalisés");
    }
    
    if (factors.websiteOptimization < 60) {
      if (!business.website) {
        recommendations.push("Créer un site web optimisé pour le référencement local");
      } else {
        recommendations.push("Optimiser votre site web pour mobile et vitesse de chargement");
      }
    }
    
    if (factors.localCitations < 80) {
      recommendations.push("Inscrire votre entreprise dans les annuaires locaux pertinents");
    }

    // Recommandations spécifiques au secteur
    if (business.sector === 'Restaurant') {
      recommendations.push("Optimiser votre présence sur les plateformes de livraison");
    } else if (business.sector === 'Commerce') {
      recommendations.push("Intégrer Google Shopping et les avis produits");
    }

    return recommendations.slice(0, 5); // Maximum 5 recommandations
  }

  /**
   * Analyse de la position concurrentielle
   */
  private static analyzeCompetition(business: RivalBusiness, competitors: RivalBusiness[]) {
    const sameCity = competitors.filter(c => c.city === business.city && c.sector === business.sector);
    
    const rank = this.getBusinessRank(business, sameCity);
    const advantages: string[] = [];
    const weaknesses: string[] = [];

    // Analyse des avantages
    if (business.googleRating > 4.5) advantages.push("Excellente réputation en ligne");
    if (business.reviewCount > 100) advantages.push("Forte base d'avis clients");
    if (business.website) advantages.push("Présence web établie");
    if (!business.isSponsored && business.serpRank <= 5) advantages.push("Référencement naturel fort");

    // Analyse des faiblesses
    if (business.googleRating < 4.0) weaknesses.push("Note Google à améliorer");
    if (business.reviewCount < 20) weaknesses.push("Manque d'avis clients");
    if (!business.website) weaknesses.push("Absence de site web");
    if (business.serpRank > 10) weaknesses.push("Visibilité de recherche faible");

    return {
      position: rank,
      totalCompetitors: sameCity.length,
      advantages,
      weaknesses
    };
  }

  /**
   * Calcule le rang d'une entreprise par rapport à ses concurrents
   */
  private static getBusinessRank(business: RivalBusiness, competitors: RivalBusiness[]): number {
    const sorted = [...competitors, business].sort((a, b) => {
      // Critères de classement: note Google, nombre d'avis, position SERP
      const scoreA = a.googleRating * 100 + a.reviewCount - a.serpRank;
      const scoreB = b.googleRating * 100 + b.reviewCount - b.serpRank;
      return scoreB - scoreA;
    });

    return sorted.findIndex(c => c.id === business.id) + 1;
  }

  /**
   * Calcule le potentiel d'amélioration
   */
  static calculateImprovementPotential(current: ILAFactors): { factor: keyof ILAFactors; potential: number; impact: number }[] {
    const improvements = Object.entries(current).map(([key, value]) => ({
      factor: key as keyof ILAFactors,
      potential: 100 - value,
      impact: this.getImpactWeight(key as keyof ILAFactors) * (100 - value)
    }));

    return improvements.sort((a, b) => b.impact - a.impact);
  }

  private static getImpactWeight(factor: keyof ILAFactors): number {
    const weights = {
      googleMyBusiness: 0.30,
      localSEO: 0.25,
      onlineReviews: 0.20,
      websiteOptimization: 0.15,
      localCitations: 0.10,
      competitivePosition: 0.05
    };
    return weights[factor];
  }
}