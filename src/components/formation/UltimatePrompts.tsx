import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Copy, Sparkles, Brain, Target, Zap, Users, TrendingUp, Globe, MessageSquare, Settings, Database, Download, BarChart3, Lock, Eye, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PromptData {
  id: number;
  title: string;
  category: string;
  prompt: string;
  description: string;
  icon: any;
  useCase: string;
}

const UltimatePrompts: React.FC = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const ultimatePrompts: PromptData[] = [
    {
      id: 1,
      title: "Analyse ILA™ Prédictive",
      category: "analyse",
      icon: Brain,
      description: "Génère une analyse complète avec recommandations stratégiques",
      useCase: "Pour analyser le potentiel d'une entreprise",
      prompt: `Analyse cette entreprise selon la méthode ILA™ et génère:

🎯 SCORE ILA™ PRÉDICTIF
- SEO Score: [0-20] avec justification Ahrefs
- Contenu Score: [0-20] basé sur présence blog/qualité 
- Présence Physique: [0-20] selon GMB/avis/photos
- Réputation: [0-20] via avis clients/mentions
- Position Concurrentielle: [0-20] SERP rank/mots-clés

💡 RECOMMANDATIONS ILUMA™
1. Action prioritaire (30 jours)
2. Stratégie SEO local optimale
3. Proposition de valeur unique
4. Budget publicitaire suggéré
5. Timeline de conversion réaliste

🚀 POTENTIEL DE CROISSANCE
- Revenus projetés 6-12-24 mois
- Niveau de difficulté: Débutant/Intermédiaire/Expert
- ROI estimé sur investissement Iluma™

Données entreprise: [COLLER ICI]`
    },
    {
      id: 2,
      title: "Générateur de Pitch Vente",
      category: "vente",
      icon: Target,
      description: "Crée un pitch personnalisé basé sur l'analyse client",
      useCase: "Pour préparer un appel de vente",
      prompt: `Génère un pitch de vente Iluma™ personnalisé:

🔥 ACCROCHE IMPACT (30 sec)
"[Nom], j'ai analysé [secteur] dans [ville]. Vos concurrents génèrent [X]% plus de leads grâce à 3 optimisations que vous n'avez pas encore."

💎 VALEUR UNIQUE ILUMA™
- Votre Score ILA™ actuel: [X]/100
- Potentiel inexploité identifié: [Y] leads/mois
- Solution IA-first vs méthodes traditionnelles

🎯 PREUVE SOCIALE LOCALE
- Cas client similaire: "[Entreprise] +[X]% leads en [Y] mois"
- Expertise locale [ville]: [stats spécifiques]
- Garantie résultats 90 jours

⚡ URGENCE CRÉÉE
- Fenêtre optimale: [raison saisonnière/concurrentielle]
- Places limitées Q1 2025: [scarcité]
- Audit gratuit expire: [deadline]

🤝 DEMANDE D'ENGAGEMENT
"Acceptez-vous 15 min mardi pour que je vous montre les 3 optimisations exactes?"

Contexte client: [INSÉRER DONNÉES]`
    },
    {
      id: 3,
      title: "Audit SEO Express",
      category: "seo",
      icon: TrendingUp,
      description: "Audit SEO complet en 5 minutes",
      useCase: "Pour qualifier rapidement un prospect",
      prompt: `Effectue un audit SEO express selon les standards Iluma™:

🔍 DIAGNOSTIC TECHNIQUE
□ Indexation Google: [pages indexées/total]
□ Vitesse site (Mobile/Desktop): [Core Web Vitals]
□ HTTPS/Sécurité: [SSL/Headers]
□ Structure URL: [SEO-friendly?]
□ Sitemap XML: [présent/optimisé?]

📍 SEO LOCAL
□ Fiche GMB: [complétude %]
□ NAP Consistency: [cohérence nom/adresse/tel]
□ Avis clients: [note/quantité/récence]
□ Mots-clés géolocalisés: [ranking top 10]
□ Citations locales: [quantité/qualité]

📊 AUTORITÉ DOMAINE
□ Domain Rating (Ahrefs): [0-100]
□ Backlinks totaux: [quantité/qualité]
□ Trafic organique: [visiteurs/mois]
□ Mots-clés positionnés: [top 3/10/50]
□ Concurrence directe: [gap analysis]

⚠️ PROBLÈMES CRITIQUES
1. [Problème majeur #1]
2. [Problème majeur #2] 
3. [Problème majeur #3]

💰 IMPACT BUSINESS
- Leads perdus/mois: [estimation]
- CA manqué annuel: [calcul]
- ROI optimisation: [projection]

URL à analyser: [INSÉRER SITE]`
    },
    {
      id: 4,
      title: "Stratégie Contenu IA",
      category: "contenu",
      icon: MessageSquare,
      description: "Plan de contenu SEO pour 3 mois",
      useCase: "Pour créer une stratégie éditoriale",
      prompt: `Crée une stratégie de contenu SEO optimale:

🎯 RECHERCHE MOTS-CLÉS
- 10 mots-clés primaires [volume/difficulté]
- 20 mots-clés longue traîne [local + commercial]
- 15 questions fréquentes clients
- Intentions de recherche: Informationnelle/Commerciale/Transactionnelle

📝 CALENDRIER ÉDITORIAL 90 JOURS
Semaine 1-4: [Thématique + titres articles]
Semaine 5-8: [Thématique + titres articles]
Semaine 9-12: [Thématique + titres articles]

🏗️ STRUCTURE CONTENU TYPE
- Title SEO: [60 caractères max]
- Meta description: [160 caractères]
- H1, H2, H3: [hiérarchie optimisée]
- Mots-clés: [densité 1-2%]
- Internal linking: [strategy]
- CTA: [conversion oriented]

📱 FORMATS DIVERSIFIÉS
- Articles blog: 1500-2000 mots
- FAQ locales: 300-500 mots
- Guides pratiques: 2500+ mots
- Infographies: [concepts visuels]
- Vidéos courtes: [sujets tendance]

🔄 DISTRIBUTION MULTI-CANAL
- Site web + blog
- Réseaux sociaux [adaptations]
- Newsletter [sequences]
- Google Business Posts
- Partenariats locaux

Secteur: [SPÉCIFIER]
Localisation: [VILLE]`
    },
    {
      id: 5,
      title: "Analyse Concurrentielle 360°",
      category: "analyse",
      icon: Eye,
      description: "Étude approfondie de la concurrence locale",
      useCase: "Pour identifier les opportunités de marché",
      prompt: `Analyse concurrentielle complète méthodologie Iluma™:

🔍 IDENTIFICATION CONCURRENTS
- Concurrents directs (5 max): [même service/zone]
- Concurrents indirects (3 max): [services complémentaires]
- Leaders de marché: [références secteur]

📊 ANALYSE DIGITALE
Pour chaque concurrent:
□ Score ILA™ estimé: [/100]
□ Trafic organique: [Ahrefs/SimilarWeb]
□ Top mots-clés: [positions/volumes]
□ Backlinks: [DR/quantité/qualité]
□ Présence sociale: [followers/engagement]
□ Avis clients: [note/nombre/récence]

💡 GAP ANALYSIS
Opportunités identifiées:
1. Mots-clés délaissés: [liste + volumes]
2. Zones géographiques: [secteurs moins concurrentiels]
3. Services non couverts: [niches identifiées]
4. Faiblesses techniques: [problèmes SEO concurrents]
5. Positionnement unique: [angle différenciant]

🎯 STRATÉGIE DIFFÉRENCIATION
- USP recommandée: [proposition unique]
- Messages clés: [communication]
- Prix positionnement: [gamme optimale]
- Canaux d'acquisition: [moins saturés]

🚀 PLAN ACTION 90 JOURS
1. Quick wins: [actions immédiates]
2. Moyen terme: [développement 30-60j]
3. Long terme: [positionnement 60-90j]

Secteur: [PRÉCISER]
Zone: [VILLE/RÉGION]`
    },
    {
      id: 6,
      title: "Calculator ROI Client",
      category: "finance",
      icon: BarChart3,
      description: "Calcule le ROI précis d'une collaboration Iluma™",
      useCase: "Pour justifier l'investissement client",
      prompt: `Calcule le ROI Iluma™ avec précision:

💰 SITUATION ACTUELLE CLIENT
- CA mensuel actuel: [montant]
- Leads générés/mois: [quantité]
- Taux conversion: [%]
- Coût acquisition client: [CAC]
- Valeur vie client: [LTV]
- Budget marketing actuel: [répartition]

🎯 PROJECTION ILUMA™
Mois 1-3 (Phase Setup):
- Leads supplémentaires: +[X] (+Y%)
- Amélioration taux conversion: +[Z%]
- Réduction CAC: -[montant] (-A%)

Mois 4-6 (Phase Croissance):
- Leads supplémentaires: +[X] (+Y%)
- CA additionnel: +[montant]
- Part de marché local: +[%]

Mois 7-12 (Phase Optimisation):
- Leads supplémentaires: +[X] (+Y%)
- CA total projeté: [montant]
- Économies publicitaires: [montant]

📈 CALCUL ROI
Investissement Iluma™: [coût total 12 mois]
Retour généré: [CA additionnel - coûts]
ROI: [ratio] soit [X]% de rentabilité
Breakeven: Mois [nombre]

🔄 COMPARAISON ALTERNATIVES
- Agence traditionnelle: [coût + résultats]
- Freelance marketing: [coût + résultats]  
- Équipe interne: [coût + résultats]
- Ne rien faire: [coût opportunité]

📊 GARANTIES ILUMA™
- Résultats mesurables 90 jours
- Dashboard temps réel
- Support IA 24/7
- Optimisation continue

Données client: [INSÉRER]`
    },
    {
      id: 7,
      title: "Email Séquence Prospect",
      category: "email",
      icon: Users,
      description: "Séquence email automatisée de 7 emails",
      useCase: "Pour nurturing automatique des prospects",
      prompt: `Crée une séquence email de nurturing Iluma™:

📧 EMAIL 1 - WELCOME (J+0)
Objet: "[Prénom], votre audit Iluma™ est prêt ✨"
- Remerciement engagement
- Présentation audit personnalisé
- 3 points clés découverts
- CTA: "Voir l'audit complet"

📧 EMAIL 2 - ÉDUCATION (J+2)
Objet: "Pourquoi [X]% des entreprises [secteur] échouent en ligne"
- Statistiques secteur alarmantes
- Cas client transformation
- Erreurs communes évitées
- CTA: "Éviter ces erreurs"

📧 EMAIL 3 - PREUVE SOCIALE (J+5)
Objet: "[Entreprise locale] +127% leads en 4 mois"
- Success story détaillée
- Avant/après concret
- Témoignage client vidéo
- CTA: "Voir d'autres résultats"

📧 EMAIL 4 - URGENCE (J+8)
Objet: "⚠️ Vos concurrents investissent déjà"
- Analyse concurrentielle
- Risque de retard
- Fenêtre d'opportunité
- CTA: "Prendre rendez-vous"

📧 EMAIL 5 - OBJECTIONS (J+12)
Objet: "\"Je n'ai pas le temps pour le marketing\""
- Adresse objection principale
- Solution clé en main
- ROI temps/argent
- CTA: "15 min découverte"

📧 EMAIL 6 - DERNIÈRE CHANCE (J+18)
Objet: "Dernière place disponible Q1 2025"
- Scarcité authentique
- Bonus limité temps
- Récapitulatif valeur
- CTA: "Réserver maintenant"

📧 EMAIL 7 - GOODWILL (J+25)
Objet: "Même si nous ne travaillons pas ensemble..."
- Contenu gratuit précieux
- 5 conseils actionnables
- Porte ouverte future
- CTA: "Télécharger le guide"

Secteur client: [PRÉCISER]
Pain point principal: [IDENTIFIER]`
    },
    {
      id: 8,
      title: "Landing Page Killer",
      category: "conversion",
      icon: Zap,
      description: "Structure de landing page haute conversion",
      useCase: "Pour créer des pages d'atterrissage efficaces",
      prompt: `Crée une landing page Iluma™ haute conversion:

🎯 HEADLINE MAGNÉTIQUE
Primaire: "[Bénéfice spécifique] pour [cible] à [lieu] en [délai]"
Secondaire: "Sans [objection principale] et avec garantie [type]"
Exemple: "87% de leads en plus pour les dentistes de Montréal en 90 jours - Sans technologie compliquée et avec garantie résultats"

⚡ PROPOSITION VALEUR (3 PILIERS)
1. RÉSULTATS PROUVÉS
- "[X]% augmentation moyenne"
- "[Y] clients satisfaits" 
- "[Z] leads générés"

2. MÉTHODE UNIQUE
- "Système IA-first exclusif"
- "Optimisation continue"
- "Local + Digital"

3. SANS RISQUE
- "Garantie 90 jours"
- "Setup gratuit"
- "Support 24/7"

🏆 PREUVE SOCIALE
- 3 témoignages vidéo (30 sec)
- 5 logos clients locaux
- Screenshots résultats concrets
- Badges certifications

📋 FORMULAIRE OPTIMISÉ
Champs minimum:
□ Prénom [requis]
□ Email [requis] 
□ Téléphone [requis]
□ Entreprise [facultatif]
□ Défi principal [dropdown]

🎁 LEAD MAGNET
"Guide Gratuit: [Titre accrocheur]"
- PDF 15-20 pages
- Checklist actionnable
- Templates prêts à utiliser
- Accès immédiat

🔥 URGENCE/SCARCITÉ
- "15 places disponibles ce mois"
- "Bonus expire dans [countdown]"
- "Prochaine session: [date]"

📱 MOBILE-FIRST
- Temps de chargement < 3 sec
- Boutons CTA visibles
- Formulaire simple
- Navigation fluide

Secteur: [SPÉCIFIER]
Offre: [DÉCRIRE]`
    },
    {
      id: 9,
      title: "Script Appel Découverte",
      category: "vente",
      icon: MessageSquare,
      description: "Framework d'appel de qualification parfait",
      useCase: "Pour structurer les appels prospects",
      prompt: `Script d'appel découverte méthodologie Iluma™:

🎯 OUVERTURE (30 sec)
"Bonjour [Prénom], [Votre nom] d'Iluma Marketing. Vous avez demandé notre audit [secteur] pour [ville]. J'ai 15 minutes pour vous partager 3 découvertes importantes. C'est toujours un bon moment?"

🔍 QUALIFICATION RAPIDE (2 min)
Questions clés:
1. "Actuellement, d'où viennent vos meilleurs clients?"
2. "Combien de nouveaux clients obtenez-vous par mois?"
3. "Quel est votre principal défi pour en obtenir plus?"
4. "Avez-vous déjà investi en marketing digital?"
5. "Si on doublait vos leads qualifiés, quel impact sur votre business?"

💡 PRÉSENTATION DÉCOUVERTES (5 min)
"J'ai analysé votre situation vs vos concurrents locaux:

DÉCOUVERTE 1: [Gap spécifique identifié]
- Votre score: [X]/100
- Concurrents moyens: [Y]/100
- Opportunité: [impact quantifié]

DÉCOUVERTE 2: [Problème technique]
- Problème détecté: [spécifique]
- Leads perdus/mois: [estimation]
- Solution: [teaser]

DÉCOUVERTE 3: [Potentiel inexploité]
- Mots-clés manqués: [exemples]
- Trafic additionnel: [projection]
- CA supplémentaire: [calcul]"

❓ QUESTIONS APPROFONDISSEMENT (3 min)
1. "Lequel de ces 3 points vous surprend le plus?"
2. "Avez-vous conscience de manquer ces opportunités?"
3. "Quelles ont été vos expériences passées?"
4. "Qu'est-ce qui vous empêche d'agir maintenant?"
5. "Si c'était réglé, que changerait dans votre quotidien?"

🤝 TRANSITION VENTE (2 min)
"Basé sur notre échange, je vois exactement comment vous aider. J'ai une solution qui adresse vos 3 défis. Acceptez-vous 30 min la semaine prochaine pour que je vous montre le plan exact?"

⚠️ GESTION OBJECTIONS
"Pas le temps": "Justement, notre système automatise tout. Combien d'heures par semaine consacrez-vous au marketing actuellement?"

"Trop cher": "Je comprends. Combien vous coûte actuellement de manquer [X] leads/mois? Notre solution est en fait un investissement qui se rembourse."

"Réfléchir": "Bien sûr. Spécifiquement, qu'est-ce qui vous ferait dire oui immédiatement?"

🎯 CLOSING
"Parfait. Préférez-vous mardi 14h ou mercredi 10h? Je vous envoie l'invitation avec l'agenda détaillé."

Entreprise: [NOM]
Secteur: [TYPE]
Défis identifiés: [LISTE]`
    },
    {
      id: 10,
      title: "Optimisation Fiche GMB",
      category: "local",
      icon: MapPin,
      description: "Optimisation complète Google My Business",
      useCase: "Pour maximiser la visibilité locale",
      prompt: `Optimise cette fiche Google My Business selon Iluma™:

📋 INFORMATIONS DE BASE
□ Nom entreprise: [exact + mots-clés si possible]
□ Catégorie principale: [la plus précise]
□ Catégories secondaires: [3 max complémentaires]
□ Adresse: [NAP cohérent partout]
□ Téléphone: [local + WhatsApp]
□ Site web: [URL trackée]
□ Horaires: [précis + jours fériés]

🎯 OPTIMISATION DESCRIPTION (750 caractères)
"[Nom] - [Service principal] à [Ville]. [X années] d'expérience, [Y clients] satisfaits. Spécialistes en [spécialités]. 
Services: [liste prioritaires]
Zone d'intervention: [quartiers/villes]
Pourquoi nous choisir: [3 différenciateurs]
Réservation: [CTA] | Devis gratuit: [CTA]
📱 [Téléphone] | 🌐 [Site web]"

📸 STRATÉGIE PHOTOS (25 min)
□ Logo haute qualité (1200x1200)
□ Facade/intérieur (5 photos min)
□ Équipe au travail (3 photos)
□ Avant/après services (5 photos)
□ Produits/services (10 photos)
□ Photos clients satisfaits (avec accord)
□ Vidéo présentation (30-60 sec)

⭐ STRATÉGIE AVIS CLIENTS
Génération:
- Email automatique post-service
- SMS de suivi satisfaction
- QR code sur facture/reçu
- Incitation verbale service

Réponses (sous 24h):
- Avis positifs: Remerciement + invitation partage
- Avis négatifs: Excuse + solution + suivi privé
- Avis neutres: Amélioration proposée

📝 POSTS RÉGULIERS (2/semaine)
- Lundi: Conseil/astuce métier
- Mercredi: Avant/après projet
- Vendredi: Coulisses/équipe
- Formats: Photo + texte 150 mots + CTA

🔗 OPTIMISATION TECHNIQUE
□ URL cohérente partout (site, réseaux, annuaires)
□ Citations locales (Pages Jaunes, Yelp, etc.)
□ Schema markup site web
□ Tracking UTM liens GMB
□ Intégration agenda réservation

📊 SUIVI PERFORMANCE
KPIs hebdomadaires:
- Vues fiche/recherches
- Actions (appels, directions, site)
- Nouvelles photos vues
- Nouveaux avis/note moyenne
- Mots-clés découverte

🎯 MOTS-CLÉS LOCAUX TARGET
Primaires: [service] + [ville]
Secondaires: [service] + [quartier]
Longue traîne: "meilleur [service] [ville]"

Entreprise: [NOM]
Secteur: [TYPE]
Localisation: [VILLE]`
    },
    {
      id: 11,
      title: "Campagne Google Ads Local",
      category: "ads",
      icon: Target,
      description: "Structure de campagne Google Ads optimale",
      useCase: "Pour lancer des campagnes payantes efficaces",
      prompt: `Crée une campagne Google Ads locale performante:

🎯 STRUCTURE CAMPAGNE
CAMPAGNE 1: Recherche - Services Principaux
- Budget: [X]€/jour
- Ciblage: Rayon [Y]km autour [adresse]
- Enchères: CPC automatique (démarrage)

CAMPAGNE 2: Recherche - Concurrents
- Budget: [X]€/jour  
- Mots-clés: "[concurrent] + [ville]"
- Enchères: CPC manuel (agressif)

CAMPAGNE 3: Display Remarketing
- Budget: [X]€/jour
- Audience: Visiteurs site 30 derniers jours
- Formats: Responsive + Image

🔑 GROUPES ANNONCES & MOTS-CLÉS

GROUPE 1: Service Principal
Mots-clés exacts:
- "[service] [ville]" 
- "[service] près de moi"
- "meilleur [service] [ville]"
- "[service] professionnel [ville]"

GROUPE 2: Services Spécialisés  
- "[service spécialisé] [ville]"
- "[problème client] [ville]"
- "[solution] [quartier]"

GROUPE 3: Urgence/Immédiateté
- "[service] urgent [ville]"
- "[service] 24h [ville]"
- "[service] rapide [ville]"

💡 ANNONCES HAUTE PERFORMANCE

ANNONCE TYPE GROUPE 1:
Titre 1: [Service] Professionnel à [Ville]
Titre 2: [X] Ans d'Expérience | Devis Gratuit  
Titre 3: ⭐[Note]/5 - [Y] Avis Clients
Description 1: Spécialiste [service] à [ville]. [Différenciateur unique]. Intervention rapide, devis gratuit sous 24h.
Description 2: [X]% clients satisfaits. Garantie [type]. Zone: [secteurs]. Appelez maintenant: [téléphone]

EXTENSIONS:
□ Liens site: Services, Devis, Contact, Avis
□ Accroche: "Devis gratuit", "24h/7j", "Garantie"  
□ Lieu: Adresse complète + téléphone
□ Prix: À partir de [X]€, Devis gratuit

📊 LANDING PAGES DÉDIÉES
- URL 1: /[service]-[ville] (Groupe 1)
- URL 2: /[service-specialise]-[ville] (Groupe 2)  
- URL 3: /urgence-[service]-[ville] (Groupe 3)

Optimisations:
- H1 = Titre annonce
- Formulaire visible immédiatement
- Téléphone cliquable
- Témoignages locaux
- Temps chargement < 3 sec

🎯 AUDIENCES & CIBLAGE
Démographique:
- Âge: [tranche cible]
- Revenus: [percentile approprié]
- Situation familiale: [pertinent]

Géographique:
- Rayon principal: [X]km
- Zones exclues: [concurrents/non-rentables]
- Ajustements enchères: +[X]% centre-ville

Temporel:
- Heures pointe: [ajustement +X%]
- Jours semaine: [selon activité]
- Saisonnalité: [si applicable]

📈 SUIVI & OPTIMISATION

KPIs Principaux:
- Coût par lead: < [X]€
- Taux conversion: > [Y]%
- Quality Score: > 7/10
- Position moyenne: < 2.5

Actions hebdomadaires:
- Mots-clés négatifs
- Ajustements enchères
- Tests annonces A/B
- Optimisation landing pages
- Analyse termes recherche

Budget total: [MONTANT]
Objectif: [LEADS/MOIS]
Secteur: [TYPE]`
    },
    {
      id: 12,
      title: "Plan Réseaux Sociaux",
      category: "social",
      icon: Users,
      description: "Stratégie social media 3 mois",
      useCase: "Pour développer la présence sociale",
      prompt: `Stratégie réseaux sociaux Iluma™ 90 jours:

🎯 PLATEFORME PRIORITAIRE: [Facebook/LinkedIn/Instagram]
Justification: [audience cible + secteur d'activité]

📊 OBJECTIFS SMART
- Followers: +[X]% en 90 jours
- Engagement: [Y] interactions/post
- Leads générés: [Z]/mois via social
- Trafic site: +[A]% depuis réseaux

📝 LIGNE ÉDITORIALE

PILIER 1 (40%): Expertise & Conseils
- Tips gratuits [fréquence]
- Erreurs à éviter
- Tendances secteur
- FAQ clients

PILIER 2 (30%): Réalisations & Preuves
- Avant/après projets
- Témoignages clients
- Process de travail
- Coulisses équipe

PILIER 3 (20%): Local & Humain  
- Actualités locales
- Équipe & valeurs
- Partenariats locaux
- Engagement communautaire

PILIER 4 (10%): Promotional
- Offres spéciales
- Nouveaux services
- Événements
- Call-to-actions

🗓️ CALENDRIER ÉDITORIAL TYPE

LUNDI - Motivation Monday
Format: Citation + conseil actionnable
Exemple: "Le succès commence par l'action. Voici 3 étapes pour [objectif]..."

MERCREDI - Wisdom Wednesday
Format: Infographie éducative
Exemple: "5 erreurs qui tuent votre [domaine]"

VENDREDI - Feature Friday
Format: Avant/après ou témoignage
Exemple: "Client satisfait: +[X]% résultats en [Y] mois"

📱 FORMATS CONTENUS

POSTS CLASSIQUES (50%)
- Texte + image de qualité
- 3-5 hashtags pertinents
- Question engagement
- CTA soft

CARROUSELS (25%)
- 5-10 slides max
- Storytelling progressif
- Swipe up CTA
- Design cohérent

VIDÉOS COURTES (15%)
- 15-30 secondes
- Sous-titres obligatoires
- Hook première seconde
- Mobile-first

STORIES (10%)
- Coulisses quotidien
- Polls/Questions
- Countdown événements
- Highlights organisées

🎯 HASHTAGS STRATÉGIQUES

LOCAUX (5 max):
#[Ville]Business #[Ville][Secteur] #[Région]

SECTEUR (5 max):  
#[Secteur] #[ServicePrincipal] #[ProblèmeClient]

GÉNÉRIQUES (3 max):
#PetiteEntreprise #EntrepreneurLocal #[Motivation]

🤝 ENGAGEMENT COMMUNAUTÉ

Réponses:
- Sous 2h en heures ouvrables
- Ton professionnel mais humain
- Valeur ajoutée systématique
- Redirection site si pertinent

Proactivité:
- Commenter clients/prospects
- Partager contenu partenaires
- Participer groupes locaux
- Mentionner collaborations

📈 AUTOMATISATION & OUTILS

Programmation:
- 1 semaine à l'avance minimum
- Heures optimales audience
- Répartition 70% planifié / 30% spontané

Analytics:
- Reach et impressions
- Engagement rate
- Clics vers site
- Conversions lead

🔄 INTÉGRATION OMNICANALE
- Cross-promotion email newsletter
- Contenu réutilisé blog site
- Remarketing social → site
- CTA vers landing pages spécifiques

Budget pub: [MONTANT/MOIS]
Plateforme principale: [CHOIX]
Secteur: [TYPE]`
    },
    {
      id: 13,
      title: "Email Marketing Automation",
      category: "email",
      icon: Zap,
      description: "Workflows email automatisés complets",
      useCase: "Pour automatiser le nurturing",
      prompt: `Système email marketing automatisé Iluma™:

🎯 SEGMENTATION INTELLIGENTE

SEGMENT 1: Prospects Chauds
- Critères: Visite pricing + download ressource
- Fréquence: 2-3 emails/semaine
- Objectif: Conversion 7-14 jours

SEGMENT 2: Prospects Tièdes  
- Critères: Engagement moyen newsletter
- Fréquence: 1 email/semaine
- Objectif: Réchauffement progressif

SEGMENT 3: Prospects Froids
- Critères: Ancien lead peu engagé
- Fréquence: 1 email/2 semaines
- Objectif: Réactivation ou nettoyage

SEGMENT 4: Clients Actuels
- Critères: Contrat actif
- Fréquence: 1 email/mois
- Objectif: Upsell + fidélisation

📧 WORKFLOWS AUTOMATISÉS

WORKFLOW 1: Welcome Series (7 emails / 14 jours)
Email 1 (Immédiat): Bienvenue + ressource promise
Email 2 (J+1): Présentation équipe + valeurs
Email 3 (J+3): Success story inspirante
Email 4 (J+5): Contenu éducatif premium
Email 5 (J+7): Preuve sociale + témoignages
Email 6 (J+10): Offre spéciale première collaboration
Email 7 (J+14): Récapitulatif + prochaines étapes

WORKFLOW 2: Abandon Lead Magnet (3 emails / 7 jours)
Email 1 (30 min): "Vous avez oublié quelque chose..."
Email 2 (24h): Valeur + bénéfice manqué
Email 3 (7j): Dernière chance + bonus

WORKFLOW 3: Post-Démonstration (5 emails / 10 jours)
Email 1 (1h): Récapitulatif + ressources partagées
Email 2 (24h): Réponses objections courantes
Email 3 (3j): Autre cas client similaire
Email 4 (7j): Offre limitée temps
Email 5 (10j): Transition vers suivi commercial

WORKFLOW 4: Réactivation Inactifs (4 emails / 21 jours)
Email 1: "On vous a manqué..."
Email 2: Nouveau contenu / service
Email 3: Feedback request + incentive
Email 4: Au revoir propre + réactivation facile

✍️ TEMPLATES HAUTE CONVERSION

STRUCTURE UNIVERSAL:
- Préheader: Complète subject line (30-50 car)
- Header: Logo + navigation simple
- Hero: Image + titre court impactant
- Body: 1 idée = 1 paragraphe (150 mots max)
- CTA: Bouton unique, couleur contrastée
- Footer: Désabonnement + contact

SUBJECT LINES PERFORMANTS:
- Question: "Prêt à doubler vos leads?"
- Bénéfice: "[Prénom], +87% leads en 90 jours"
- Urgence: "Dernières 24h pour..."
- Personnalisé: "Spécialement pour [secteur]"
- Curiosité: "Le secret que vos concurrents cachent"

📊 MÉTRIQUES & OPTIMISATION

KPIs Principaux:
- Taux ouverture: >25%
- Taux clic: >3%
- Taux conversion: >5%
- Désabonnements: <0.5%
- Delivrabilité: >98%

Tests A/B Systématiques:
- Subject lines (50/50 split)
- CTA couleur/position
- Longueur emails
- Horaires envoi
- From name

Optimisations:
- Nettoyage liste mensuel
- Re-engagement campaign
- Authentification domaine
- Monitoring réputation IP

🔄 INTÉGRATION CRM

Triggers automatiques:
- Nouveau lead → Welcome series
- Demo programmée → Workflow démo
- Contrat signé → Onboarding client
- 6 mois inactif → Réactivation

Scoring comportemental:
- Ouverture email: +1 point
- Clic email: +3 points
- Visite pricing: +5 points
- Download ressource: +5 points
- Demo réservée: +10 points

🎯 PERSONNALISATION AVANCÉE

Variables dynamiques:
- {{first_name}} - Prénom
- {{company}} - Entreprise
- {{industry}} - Secteur
- {{city}} - Ville
- {{pain_point}} - Défi principal

Contenu conditionnel:
- Si secteur = X → contenu spécialisé
- Si score > Y → offre premium
- Si région = Z → événement local

Plateforme: [CHOIX]
Liste actuelle: [TAILLE]
Objectif: [CONVERSIONS/MOIS]`
    },
    {
      id: 14,
      title: "Dashboard KPI Business",
      category: "analytics",
      icon: BarChart3,
      description: "Tableau de bord performance complet",
      useCase: "Pour suivre la performance globale",
      prompt: `Crée un dashboard KPI business Iluma™:

📊 MÉTRIQUES ACQUISITION

TRAFIC DIGITAL:
□ Visiteurs uniques: [actuel] vs [objectif]
□ Sources: Organique [%] / Payant [%] / Social [%] / Direct [%]
□ Taux rebond: [%] (objectif <60%)
□ Pages/session: [nombre] (objectif >2.5)
□ Durée session: [temps] (objectif >2min)

SEO PERFORMANCE:
□ Mots-clés top 3: [nombre]
□ Mots-clés top 10: [nombre]  
□ Trafic organique: [croissance %]
□ Positions moyennes: [évolution]
□ Clics Search Console: [variation]

LOCAL SEO:
□ Vues fiche GMB: [mensuel]
□ Actions GMB: Appels [X] / Directions [Y] / Site [Z]
□ Avis Google: [note]/5 ([nouveaux]/mois)
□ Photos vues: [engagement]

💰 MÉTRIQUES CONVERSION

LEADS GÉNÉRATION:
□ Leads totaux: [nombre]/mois
□ Sources leads: Site [%] / Appels [%] / Réseaux [%]
□ Coût par lead: [montant] (objectif <[X]€)
□ Qualité leads: [score 1-10]
□ Taux conversion lead→client: [%]

PERFORMANCE COMMERCIALE:
□ RDV générés: [nombre]/mois
□ Taux show-up: [%] (objectif >80%)
□ Taux closing: [%] (objectif >[X]%)
□ Cycle de vente moyen: [jours]
□ Valeur commande moyenne: [montant]

📈 MÉTRIQUES CROISSANCE

CHIFFRE D'AFFAIRES:
□ CA mensuel: [montant] vs [objectif]
□ Croissance MoM: [%]
□ CA par source acquisition: Répartition
□ Prévisionnel trimestre: [projection]
□ Saisonnalité: [tendances]

CLIENTS:
□ Nouveaux clients: [nombre]/mois
□ Clients récurrents: [%]
□ Churn rate: [%] (objectif <[X]%)
□ Lifetime Value: [montant]
□ NPS Score: [/10]

🎯 MÉTRIQUES MARKETING

EMAIL MARKETING:
□ Liste: [taille] (+[croissance]/mois)
□ Taux ouverture: [%] (objectif >25%)
□ Taux clic: [%] (objectif >3%)
□ Conversions email: [nombre]/mois
□ ROI email: [ratio]

RÉSEAUX SOCIAUX:
□ Followers: [nombre] (+[%] croissance)
□ Engagement rate: [%]
□ Portée mensuelle: [impressions]
□ Leads sociaux: [nombre]/mois
□ Coût par acquisition social: [montant]

PUBLICITÉ PAYANTE:
□ Impressions: [nombre]
□ CTR: [%] (objectif >2%)
□ CPC moyen: [montant]
□ Taux conversion: [%]
□ ROAS: [ratio] (objectif >4:1)

💡 MÉTRIQUES OPÉRATIONNELLES

PRODUCTIVITÉ:
□ Temps réponse prospects: [heures]
□ Suivi leads: [%] contactés <24h
□ Pipeline deals: [valeur totale]
□ Vélocité pipeline: [jours moyens]
□ Taux transformation: [%] par étape

SATISFACTION CLIENT:
□ Délai livraison: [respect %]
□ Réclamations: [nombre]/mois
□ Résolution problèmes: [délai moyen]
□ Recommandations: [score NPS]
□ Avis positifs: [%] >4 étoiles

📋 ALERTES & ACTIONS

ALERTES AUTOMATIQUES:
🔴 Critique: Lead generation <[X]/jour
🟡 Attention: Taux conversion <[Y]%
🟢 Succès: Objectif mensuel dépassé

ACTIONS CORRECTIVES:
- Lead generation faible → Boost pub + SEO
- Conversion faible → Optimiser landing + script
- Satisfaction baisse → Formation équipe + process

📊 FRÉQUENCE REPORTING

DAILY (5 min):
- Leads générés
- Appels reçus
- RDV programmés

WEEKLY (30 min):
- Performance campagnes
- Conversion rates
- Pipeline status

MONTHLY (2h):
- ROI global
- Tendances marché
- Optimisations stratégiques

QUARTERLY (4h):
- Analyse concurrentielle
- Ajustements stratégie
- Budget planning

🎯 OUTILS TRACKING

Analytics: Google Analytics 4
Search: Google Search Console
Local: GMB Insights + BrightLocal
Social: [plateforme native] + Hootsuite
Email: [ESP] analytics
CRM: Pipeline + conversion tracking
Pub: Google Ads + Facebook Ads Manager

Secteur: [TYPE]
Objectifs année: [CHIFFRES]`
    },
    {
      id: 15,
      title: "Plan de Crise & Reputation",
      category: "reputation",
      icon: Lock,
      description: "Gestion de crise et e-réputation",
      useCase: "Pour protéger et restaurer la réputation",
      prompt: `Plan de gestion de crise e-réputation Iluma™:

🚨 SYSTÈME VEILLE RÉPUTATION

MONITORING 24/7:
□ Google Alerts: "[Entreprise]" + "[Dirigeant]"
□ Réseaux sociaux: Mentions + hashtags
□ Avis clients: Google, Facebook, Yelp, sectoriels
□ Forums: Reddit, Facebook groupes locaux
□ Presse: Google News + alertes spécialisées

FRÉQUENCE CHECKS:
- Temps réel: Avis Google/Facebook
- Quotidien: Réseaux sociaux + recherches
- Hebdomadaire: Forums + presse locale
- Mensuel: Audit réputation global

⚡ PROCÉDURE RÉPONSE RAPIDE

NIVEAU 1 - Avis Négatif Simple:
Délai: <2 heures
Action:
1. Remerciement feedback
2. Excuse sincère si légitime
3. Solution proposée
4. Invitation contact privé
5. Suivi résolution

Template:
"Merci [Prénom] pour ce retour. Nous sommes désolés que [situation]. Nous allons [action corrective]. Pourriez-vous nous contacter au [téléphone] pour que nous puissions rectifier cela rapidement?"

NIVEAU 2 - Buzz Négatif Local:
Délai: <4 heures
Action:
1. Évaluation impact
2. Communication interne équipe
3. Réponse publique mesurée
4. Actions correctives concrètes
5. Communication proactive

NIVEAU 3 - Crise Majeure:
Délai: <1 heure
Action:
1. Cellule de crise activée
2. Avocat contacté si nécessaire
3. Communication officielle
4. Plan de redressement
5. Suivi média intensif

🛡️ STRATÉGIE DÉFENSIVE

CONTENU POSITIF MASSIF:
- Articles blog optimisés SEO
- Communiqués presse positifs
- Témoignages clients vidéo
- Success stories détaillées
- Interviews dirigeants

RÉSEAUX SOCIAUX ACTIFS:
- Posts quotidiens positifs
- Engagement communauté
- Partenariats locaux
- Événements communautaires
- Transparence opérationnelle

SEO DÉFENSIF:
- Pages optimisées nom entreprise
- Profils dirigeants LinkedIn
- Annuaires professionnels
- Wikipedia si éligible
- Domaines variations nom

💬 GESTION AVIS CLIENTS

STRATÉGIE PROACTIVE:
1. Email post-service satisfaction
2. Incitation avis positifs
3. QR code reçu/facture
4. Formation équipe demande
5. Incentives avis (légaux)

RÉPONSES AVIS NÉGATIFS:

Avis Légitime:
"Nous vous remercions pour ce retour constructif. Nous prenons vos remarques très au sérieux et avons mis en place [actions] pour éviter que cela se reproduise. N'hésitez pas à nous recontacter."

Avis Injuste/Faux:
"Nous regrettons cette expérience qui ne reflète pas nos standards habituels. Nous n'avons pas trouvé trace de [détails] dans nos dossiers. Pourriez-vous nous contacter directement pour clarifier la situation?"

Avis Concurrent:
"Merci pour ce commentaire. Nous serions ravis d'échanger directement avec vous pour comprendre les détails de cette expérience. Notre équipe reste à votre disposition."

📊 MESURES RESTAURATION

KPIs RÉPUTATION:
□ Note Google: [actuel] → [objectif]
□ Volume avis positifs: +[X]%
□ Sentiment mentions: [%] positif
□ Positions SERP nom: Top 3 positif
□ Trafic site post-crise: [%] récupération

PLAN 90 JOURS:
Mois 1: Stabilisation + réponses
Mois 2: Contenu positif + SEO
Mois 3: Campagne image + partenariats

🚀 COMMUNICATION CRISE

MESSAGES CLÉS:
1. Reconnaissance problème
2. Responsabilité assumée
3. Actions correctives
4. Engagement amélioration
5. Remerciements patience

CANAUX PRIORITAIRES:
- Site web (page dédiée)
- Email clients/prospects
- Réseaux sociaux posts
- Presse locale si nécessaire
- Communication interne équipe

PORTE-PAROLE:
Principal: [Dirigeant/Responsable]
Backup: [Manager/Associé]
Formations: Media training recommandé

📝 TEMPLATES COMMUNICATION

COMMUNIQUÉ TYPE:
"[Entreprise] tient à s'exprimer suite à [situation]. Nous reconnaissons [problème] et présentons nos excuses à [parties concernées]. Nous avons immédiatement mis en place [actions correctives] et nous engageons à [améliorations futures]. Notre priorité reste [valeurs entreprise]."

EMAIL CLIENTS:
Objet: "Message important de [Entreprise]"
"Chers clients, nous souhaitons vous informer directement concernant [situation]. Voici les faits: [résumé objectif]. Voici nos actions: [liste mesures]. Merci pour votre confiance continue."

🔄 PRÉVENTION FUTURE

FORMATION ÉQUIPE:
- Service client excellence
- Gestion conflits
- Communication difficile
- Processus qualité
- Escalade problèmes

SYSTÈMES QUALITÉ:
- Checklist service
- Suivi satisfaction
- Process réclamation
- Amélioration continue
- Documentation procédures

Entreprise: [NOM]
Secteur: [TYPE]
Niveau risque: [ÉVALUATION]`
    }
  ];

  const categories = ['all', 'analyse', 'vente', 'seo', 'contenu', 'local', 'ads', 'social', 'email', 'conversion', 'finance', 'analytics', 'reputation'];

  const filteredPrompts = selectedCategory === 'all' 
    ? ultimatePrompts 
    : ultimatePrompts.filter(prompt => prompt.category === selectedCategory);

  const copyPrompt = async (prompt: string, title: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Prompt copié ! ✨",
        description: `${title} a été copié dans votre presse-papiers`,
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le prompt",
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      analyse: Brain,
      vente: Target,
      seo: TrendingUp,
      contenu: MessageSquare,
      local: MapPin,
      ads: Zap,
      social: Users,
      email: Globe,
      conversion: Settings,
      finance: BarChart3,
      analytics: Database,
      reputation: Lock
    };
    return icons[category] || Sparkles;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8" />
            15 Prompts Ultimes Iluma™
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prompts révolutionnaires qui surpassent les capacités intellectuelles moyennes. 
            Conçus pour maximiser votre efficacité et transformer votre business.
          </p>
        </motion.div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'Tous' : category}
            </Button>
          ))}
        </div>

        {/* Grille des prompts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((promptData, index) => {
            const Icon = getCategoryIcon(promptData.category);
            
            return (
              <motion.div
                key={promptData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="text-xs">
                            {promptData.category}
                          </Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        #{promptData.id}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {promptData.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {promptData.description}
                    </p>
                    
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-primary mb-1">
                        Cas d'usage :
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {promptData.useCase}
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => copyPrompt(promptData.prompt, promptData.title)}
                      className="w-full"
                      size="sm"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copier le prompt
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Instructions d'utilisation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Comment utiliser ces prompts ultimes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">✨ Personnalisation</h4>
              <p>Remplacez les variables entre crochets par vos données spécifiques (secteur, ville, objectifs).</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">🎯 Précision</h4>
              <p>Plus vous fournissez de contexte, plus les résultats seront précis et actionnables.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">🔄 Itération</h4>
              <p>N'hésitez pas à affiner et répéter les prompts pour optimiser les résultats.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">💡 Créativité</h4>
              <p>Combinez plusieurs prompts pour créer des workflows personnalisés ultra-efficaces.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UltimatePrompts;