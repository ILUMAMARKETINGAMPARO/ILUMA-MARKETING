import { ILAProject } from '@/types/ila';

export const mockILAProjects: ILAProject[] = [
  {
    id: 'project-1',
    name: 'E-commerce Optimization',
    clientId: 'client-001',
    moduleScores: {
      adluma: 85,
      blogia: 92,
      hub: 88,
      ila: 95,
      illumatch: 90,
      landingpage: 87
    },
    analysis: {
      overallScore: 89,
      metrics: {
        seoScore: 85,
        contentScore: 92,
        conversionScore: 87,
        engagementScore: 90,
        technicalScore: 88
      },
      trends: {
        direction: 'up',
        percentage: 12
      },
      recommendations: [
        'Optimiser les méta-descriptions pour améliorer le CTR',
        'Implémenter des A/B tests sur les landing pages',
        'Renforcer la stratégie de contenu vidéo'
      ],
      riskFactors: [
        'Baisse du trafic organique sur mobile',
        'Taux de rebond élevé sur certaines pages'
      ],
      opportunities: [
        'Expansion vers de nouveaux mots-clés longue traîne',
        'Automatisation des campagnes email'
      ]
    },
    lastUpdated: new Date(),
    assignedTeamMember: 'sergio'
  }
];