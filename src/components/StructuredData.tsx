import { Helmet } from 'react-helmet-async';
import { useTranslations } from '@/hooks/useTranslations';

interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'FAQPage' | 'Article' | 'HowTo' | 'Review' | 'BreadcrumbList';
  data?: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const { t } = useTranslations();

  const getStructuredData = () => {
    const baseUrl = 'https://ilumamarketing.com';
    
    switch (type) {
      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Iluma Marketing",
          "legalName": "Iluma Marketing LLC",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "description": "Iluma Marketing révolutionne le marketing digital des PME avec l'intelligence artificielle la plus avancée. Solutions IA complètes pour transformer votre visibilité en ligne.",
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "651 N Broad St. Suite 206",
            "addressLocality": "Middletown",
            "addressRegion": "DE",
            "postalCode": "19709",
            "addressCountry": "US"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-514-882-8910",
            "contactType": "customer service",
            "email": "hola@ilumamarketing.com",
            "availableLanguage": ["French", "English", "Spanish"]
          },
          "sameAs": [
            "https://www.linkedin.com/company/iluma-marketing",
            "https://twitter.com/IlumaMarketing",
            "https://www.facebook.com/IlumaMarketing"
          ],
          "services": [
            "Digital Marketing",
            "SEO Services",
            "AI Marketing Solutions",
            "Local SEO",
            "Google Ads Management",
            "Social Media Marketing"
          ]
        };

      case 'LocalBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Iluma Marketing",
          "image": `${baseUrl}/logo.png`,
          "description": "Iluma Marketing révolutionne le marketing digital des PME avec l'intelligence artificielle la plus avancée. Solutions IA complètes pour transformer votre visibilité en ligne.",
          "url": baseUrl,
          "telephone": "+1-514-882-8910",
          "email": "hola@ilumamarketing.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "651 N Broad St. Suite 206",
            "addressLocality": "Middletown",
            "addressRegion": "DE",
            "postalCode": "19709",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.5017,
            "longitude": -73.5673
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday", 
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
          },
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "127"
          }
        };

      case 'FAQPage':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Et si votre agence savait exactement ce que pense Google ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "C'est exactement ce que fait Iluma™. Notre IA analyse en temps réel les algorithmes Google et adapte votre stratégie pour maximiser votre visibilité locale."
              }
            },
            {
              "@type": "Question", 
              "name": "Comment Iluma™ garantit-elle des résultats mesurables ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Grâce à notre écosystème de 9 modules IA interconnectés : ADLUMA™ prédit, ILA™ mesure, ILUMATCH™ connecte, et LILO™ optimise continuellement vos performances."
              }
            },
            {
              "@type": "Question",
              "name": "En quoi Iluma™ diffère-t-elle d'une agence traditionnelle ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nous sommes une agence qui pense comme une IA. Chaque décision est basée sur des données en temps réel, chaque action est optimisée par l'intelligence artificielle."
              }
            },
            {
              "@type": "Question",
              "name": "Puis-je voir des résultats avant d'investir ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolument ! Notre simulateur ADLUMA™ vous montre vos résultats projetés gratuitement. Aucun engagement, juste de la transparence."
              }
            }
          ]
        };

      case 'Article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Iluma™ - L'IA qui ILLUMINE votre visibilité",
          "description": "Révolutionnez votre marketing digital avec l'intelligence artificielle la plus avancée. Solutions IA complètes pour transformer votre visibilité en ligne.",
          "image": `${baseUrl}/og-image.jpg`,
          "author": {
            "@type": "Organization",
            "name": "Iluma Marketing",
            "url": baseUrl
          },
          "publisher": {
            "@type": "Organization",
            "name": "Iluma Marketing",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "datePublished": "2024-01-01",
          "dateModified": new Date().toISOString().split('T')[0],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": baseUrl
          }
        };

      case 'HowTo':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Comment améliorer sa visibilité locale avec l'IA",
          "description": "Guide étape par étape pour transformer votre visibilité en ligne avec les outils IA d'Iluma",
          "image": `${baseUrl}/how-to-image.jpg`,
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "CAD",
            "value": "Contact us"
          },
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Site web existant ou nouveau"
            },
            {
              "@type": "HowToSupply", 
              "name": "Compte Google Business"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "ADLUMA™ Simulator"
            },
            {
              "@type": "HowToTool",
              "name": "ILA™ Score"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Diagnostic gratuit",
              "text": "Utilisez notre simulateur ADLUMA™ pour analyser votre visibilité actuelle",
              "url": `${baseUrl}/adluma`
            },
            {
              "@type": "HowToStep",
              "name": "Stratégie personnalisée",
              "text": "Notre IA crée un plan d'action sur mesure basé sur vos objectifs",
              "url": `${baseUrl}/strategy`
            },
            {
              "@type": "HowToStep",
              "name": "Déploiement des modules",
              "text": "Activation progressive de votre écosystème Iluma™",
              "url": `${baseUrl}/deployment`
            },
            {
              "@type": "HowToStep",
              "name": "Optimisation continue",
              "text": "LILO™ surveille et optimise vos performances 24/7",
              "url": `${baseUrl}/optimization`
            }
          ]
        };

      case 'BreadcrumbList':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data || [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": baseUrl
            }
          ]
        };

      default:
        return data;
    }
  };

  const structuredData = getStructuredData();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};