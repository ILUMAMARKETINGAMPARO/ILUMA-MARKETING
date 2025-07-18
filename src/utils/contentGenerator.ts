import { ILUMATCHResult } from '@/types/ilumatch';

export const generateMatchContent = async (match: ILUMATCHResult): Promise<Partial<ILUMATCHResult>> => {
  // Simulation de l'appel GPT-4 pour générer le contenu
  const prompts = {
    fr: `Génère un pitch de partenariat entre ${match.business1.name} (${match.business1.sector}) et ${match.business2.name} (${match.business2.sector}). 
         Score ILA respectif: ${match.business1.ilaScore.overallScore} et ${match.business2.ilaScore.overallScore}.
         Compatibilité: ${match.compatibility}%.
         Synergies identifiées: ${match.synergies.join(', ')}.
         Ton: professionnel et persuasif. Maximum 150 mots.`,
    
    en: `Generate a partnership pitch between ${match.business1.name} (${match.business1.sector}) and ${match.business2.name} (${match.business2.sector}). 
         ILA Score respectively: ${match.business1.ilaScore.overallScore} and ${match.business2.ilaScore.overallScore}.
         Compatibility: ${match.compatibility}%.
         Identified synergies: ${match.synergies.join(', ')}.
         Tone: professional and persuasive. Maximum 150 words.`,
    
    es: `Genera un pitch de asociación entre ${match.business1.name} (${match.business1.sector}) y ${match.business2.name} (${match.business2.sector}). 
         Puntuación ILA respectiva: ${match.business1.ilaScore.overallScore} y ${match.business2.ilaScore.overallScore}.
         Compatibilidad: ${match.compatibility}%.
         Sinergias identificadas: ${match.synergies.join(', ')}.
         Tono: profesional y persuasivo. Máximo 150 palabras.`
  };

  // Génération des pitchs (simulation)
  const generatedPitch = {
    fr: await generateGPTContent(prompts.fr),
    en: await generateGPTContent(prompts.en),
    es: await generateGPTContent(prompts.es)
  };

  // Génération des CTAs
  const generatedCTA = {
    fr: generateCTA('fr', match),
    en: generateCTA('en', match),
    es: generateCTA('es', match)
  };

  return {
    generatedPitch,
    generatedCTA
  };
};

const generateGPTContent = async (prompt: string): Promise<string> => {
  // Simulation d'appel GPT-4
  // En production, intégration avec OpenAI API via Supabase Edge Function
  
  const mockResponses = [
    "Ce partenariat stratégique unit deux acteurs complémentaires pour maximiser leur visibilité locale. Grâce à vos scores ILA élevés et votre proximité géographique, cette collaboration peut générer +25% de trafic croisé. Nos analyses prédisent une augmentation mutuelle de 15 points ILA en 3 mois.",
    
    "This strategic partnership combines two complementary players to maximize their local visibility. Thanks to your high ILA scores and geographic proximity, this collaboration can generate +25% cross-traffic. Our analysis predicts a mutual increase of 15 ILA points in 3 months.",
    
    "Esta asociación estratégica une dos actores complementarios para maximizar su visibilidad local. Gracias a sus altas puntuaciones ILA y proximidad geográfica, esta colaboración puede generar +25% de tráfico cruzado. Nuestros análisis predicen un aumento mutuo de 15 puntos ILA en 3 meses."
  ];

  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

const generateCTA = (language: 'fr' | 'en' | 'es', match: ILUMATCHResult): string => {
  const ctas = {
    fr: [
      "🤝 Activer ce partenariat ILUMATCH™",
      "🚀 Démarrer la collaboration",
      "✨ Connecter nos entreprises",
      "📈 Booster ensemble nos scores ILA"
    ],
    en: [
      "🤝 Activate this ILUMATCH™ partnership",
      "🚀 Start the collaboration",
      "✨ Connect our businesses",
      "📈 Boost our ILA scores together"
    ],
    es: [
      "🤝 Activar esta asociación ILUMATCH™",
      "🚀 Iniciar la colaboración",
      "✨ Conectar nuestros negocios",
      "📈 Impulsar juntos nuestros puntajes ILA"
    ]
  };

  return ctas[language][Math.floor(Math.random() * ctas[language].length)];
};