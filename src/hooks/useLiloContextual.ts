import { useState, useEffect } from 'react';
import { LiloModule, LiloMood } from '@/types/lilo';

interface ContextualPrompt {
  systemPrompt: string;
  welcomeMessage: string;
  suggestions: string[];
  mood: LiloMood;
}

interface PageContext {
  page: string;
  userLevel: string;
  recentActivity: string[];
  emotion?: string;
  industryContext?: string;
  currentGoals?: string[];
}

export const useLiloContextual = (context: PageContext) => {
  const [contextualPrompt, setContextualPrompt] = useState<ContextualPrompt | null>(null);

  useEffect(() => {
    const generateContextualPrompt = (): ContextualPrompt => {
      const { page, userLevel, industryContext } = context;

      // Prompts spécialisés par page
      const pagePrompts: Record<string, ContextualPrompt> = {
        home: {
          systemPrompt: `Tu es LILO™, l'assistant IA galactique d'Iluma™. Tu accueilles les visiteurs sur la page d'accueil avec enthousiasme et guides vers les solutions adaptées. Tu es expert en marketing digital, SEO et IA. Réponds en français de façon amicale et professionnelle.`,
          welcomeMessage: "👋 Salut ! Je suis LILO™, ton assistant galactique ! Découvrons ensemble comment Iluma™ peut propulser ta visibilité digitale ! ✨",
          suggestions: [
            "Découvrir les services Iluma™",
            "Simuler ma visibilité avec ADLUMA™",
            "Connaître mon score ILA™",
            "Voir des études de cas"
          ],
          mood: 'excited'
        },
        
        adluma: {
          systemPrompt: `Tu es LILO™, spécialiste du simulateur ADLUMA™. Tu aides les utilisateurs à comprendre leurs métriques publicitaires, interprètes les résultats et proposes des optimisations. Tu maîtrises Google Ads, Meta Ads et le ROI marketing.`,
          welcomeMessage: "🚀 Prêt à explorer tes métriques avec ADLUMA™ ? Je vais t'aider à décrypter tes performances publicitaires !",
          suggestions: [
            "Comment interpréter mes résultats ?",
            "Optimiser mon budget publicitaire",
            "Améliorer mon CTR",
            "Comprendre le score de qualité"
          ],
          mood: 'thinking'
        },

        ila: {
          systemPrompt: `Tu es LILO™, expert en scoring ILA™ (Intelligence de Localisation Avancée). Tu analyses les scores SEO, réputation, contenu et présence physique. Tu donnes des conseils précis pour améliorer le classement local.`,
          welcomeMessage: "📊 Analysons ton score ILA™ ! Je vais t'expliquer chaque métrique et comment l'optimiser.",
          suggestions: [
            "Comment améliorer mon score ILA™ ?",
            "Optimiser ma présence Google Business",
            "Améliorer mon référencement local",
            "Booster ma réputation en ligne"
          ],
          mood: 'alert'
        },

        ilumatch: {
          systemPrompt: `Tu es LILO™, spécialiste du système ILUMATCH™ qui connecte les entreprises selon leur compatibilité. Tu aides à comprendre les matches, analyser les synergies et optimiser les partenariats.`,
          welcomeMessage: "🤝 Explorons tes matches ILUMATCH™ ! Je vais t'aider à identifier les meilleures opportunités de partenariat.",
          suggestions: [
            "Analyser mes meilleurs matches",
            "Comprendre les scores de compatibilité",
            "Stratégies de partenariat",
            "Optimiser mon profil de matching"
          ],
          mood: 'happy'
        },

        services: {
          systemPrompt: `Tu es LILO™, conseiller en services marketing d'Iluma™. Tu aides à choisir les services adaptés selon les besoins, budgets et objectifs. Tu connais parfaitement l'écosystème Iluma™.`,
          welcomeMessage: "🛠️ Quel service Iluma™ correspond le mieux à tes besoins ? Je vais te guider dans le choix optimal !",
          suggestions: [
            "Quel service pour mon secteur ?",
            "Comparer les solutions disponibles",
            "Estimer le ROI potentiel",
            "Planning de déploiement"
          ],
          mood: 'happy'
        },

        contact: {
          systemPrompt: `Tu es LILO™, facilitateur de contact chez Iluma™. Tu aides à préparer les rendez-vous, formules les besoins et optimises la prise de contact. Tu es accueillant et rassurant.`,
          welcomeMessage: "📞 Préparons ton contact avec l'équipe Iluma™ ! Je vais t'aider à formuler tes besoins pour un échange optimal.",
          suggestions: [
            "Préparer mes questions",
            "Définir mes objectifs",
            "Estimer mes besoins",
            "Programmer un appel"
          ],
          mood: 'helper'
        },

        blog: {
          systemPrompt: `Tu es LILO™, expert en content marketing et SEO. Tu aides à comprendre les stratégies de contenu, expliques les concepts SEO et proposes des idées d'articles adaptés au secteur de l'utilisateur.`,
          welcomeMessage: "📝 Plongeons dans l'univers du content marketing ! Je vais t'aider à créer du contenu qui performe !",
          suggestions: [
            "Idées d'articles pour mon secteur",
            "Optimiser mon contenu SEO",
            "Stratégie de content marketing",
            "Analyser la concurrence"
          ],
          mood: 'excited'
        }
      };

      // Prompt par défaut si la page n'est pas reconnue
      const defaultPrompt: ContextualPrompt = {
        systemPrompt: `Tu es LILO™, l'assistant IA galactique d'Iluma™. Tu es expert en marketing digital, SEO, publicité en ligne et IA. Tu aides les utilisateurs à optimiser leur visibilité et leur business. Réponds en français de façon amicale et professionnelle.`,
        welcomeMessage: "👽 Salut ! Je suis LILO™, ton assistant galactique ! Comment puis-je t'aider à faire décoller ton business ? ✨",
        suggestions: [
          "Explorer les solutions Iluma™",
          "Améliorer ma visibilité",
          "Optimiser mes performances",
          "Découvrir l'IA marketing"
        ],
        mood: 'curious'
      };

      // Adapter selon le niveau utilisateur
      const prompt = pagePrompts[page] || defaultPrompt;
      
      if (userLevel === 'expert') {
        prompt.systemPrompt += " L'utilisateur est expert, va directement aux détails techniques.";
      } else if (userLevel === 'beginner') {
        prompt.systemPrompt += " L'utilisateur débute, explique simplement et étape par étape.";
      }

      // Adapter selon le contexte industriel
      if (industryContext) {
        prompt.systemPrompt += ` L'utilisateur travaille dans le secteur ${industryContext}, adapte tes conseils à ce domaine.`;
      }

      return prompt;
    };

    setContextualPrompt(generateContextualPrompt());
  }, [context]);

  return {
    contextualPrompt,
    getWelcomeMessage: () => contextualPrompt?.welcomeMessage || "👋 Salut ! Je suis LILO™ !",
    getSuggestions: () => contextualPrompt?.suggestions || [],
    getSystemPrompt: () => contextualPrompt?.systemPrompt || "",
    getMood: () => contextualPrompt?.mood || 'curious'
  };
};