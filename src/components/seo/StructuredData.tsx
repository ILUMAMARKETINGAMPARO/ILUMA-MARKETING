import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';

interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Article' | 'FAQPage' | 'WebSite';
  data?: any;
}

const faqData = [
  {
    question: "Comment Iluma™ garantit-elle des résultats mesurables ?",
    answer: "Grâce à notre écosystème de modules IA interconnectés : ADLUMA™ prédit, ILA™ mesure, ILUMATCH™ connecte, et LILO™ optimise continuellement vos performances marketing."
  },
  {
    question: "En quoi Iluma™ diffère-t-elle d'une agence traditionnelle ?",
    answer: "Nous sommes une agence qui pense comme une IA. Chaque décision est basée sur des données en temps réel, chaque action est optimisée par l'intelligence artificielle pour maximiser votre ROI."
  },
  {
    question: "Puis-je voir des résultats avant d'investir ?",
    answer: "Absolument ! Notre simulateur ADLUMA™ vous montre vos résultats projetés gratuitement. Diagnostic complet, projections de ROI, stratégie personnalisée - sans engagement."
  }
];

const StructuredData: React.FC<StructuredDataProps> = ({ type, data = {} }) => {
  const { language } = useLanguage();

  const baseData = {
    Organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Iluma™ Marketing Intelligence",
      "alternateName": ["Iluma Marketing", "Iluma IA", "Iluma™"],
      "url": "https://ilumamarketing.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ilumamarketing.com/images/iluma-logo.png",
        "width": 300,
        "height": 300
      },
      "image": "https://ilumamarketing.com/images/iluma-og-image.jpg",
      "description": {
        fr: "🚀 Agence marketing révolutionnaire alimentée par l'IA. Modules ADLUMA™, ILA™, ILUMATCH™, LILO™ : SEO intelligent, landing pages aimants, automation complète. +300% visibilité garantie.",
        en: "🚀 Revolutionary AI-powered marketing agency. ADLUMA™, ILA™, ILUMATCH™, LILO™ modules: intelligent SEO, magnet landing pages, complete automation. +300% visibility guaranteed.",
        es: "🚀 Agencia de marketing revolucionaria impulsada por IA. Módulos ADLUMA™, ILA™, ILUMATCH™, LILO™: SEO inteligente, landing pages imán, automatización completa. +300% visibilidad garantizada."
      }[language],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1001 Square-Victoria",
        "addressLocality": "Montréal",
        "addressRegion": "QC",
        "postalCode": "H3B 4W8",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 45.5017,
        "longitude": -73.5673
      },
      "areaServed": ["Canada", "Quebec", "Montreal", "Laval", "Longueuil", "Gatineau"],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 45.5017,
          "longitude": -73.5673
        },
        "geoRadius": "50000"
      },
      "contactPoint": [{
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "telephone": "+1-514-XXX-XXXX",
        "email": "contact@ilumamarketing.com",
        "availableLanguage": ["French", "English"],
        "areaServed": "CA",
        "hoursAvailable": "Mo-Fr 09:00-17:00"
      }],
      "founder": [
        {
          "@type": "Person",
          "name": "Sergio David Ortega-Ramos",
          "jobTitle": "CEO & Fondateur",
          "description": "Expert en intelligence artificielle marketing et transformation digitale"
        },
        {
          "@type": "Person", 
          "name": "Amparo Lopez",
          "jobTitle": "COO & Co-fondatrice",
          "description": "Spécialiste en stratégie marketing automation et performance"
        }
      ],
      "sameAs": [
        "https://linkedin.com/company/ilumamarketing",
        "https://twitter.com/ilumamarketing",
        "https://facebook.com/ilumamarketing",
        "https://instagram.com/ilumamarketing"
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "SEO Intelligent IA",
          "description": "Référencement naturel optimisé par intelligence artificielle",
          "category": "Digital Marketing Service"
        },
        {
          "@type": "Offer", 
          "name": "Landing Pages AIMANT™",
          "description": "Pages de conversion ultra-performantes générées par IA",
          "category": "Web Development Service"
        },
        {
          "@type": "Offer",
          "name": "Automatisation Marketing IA",
          "description": "Workflows marketing automatisés par intelligence artificielle",
          "category": "Marketing Automation Service"
        }
      ],
      "award": [
        "Agence IA Marketing #1 Québec 2024",
        "Innovation Marketing Intelligence Artificielle 2024"
      ],
      "numberOfEmployees": "10-50",
      "foundingDate": "2024",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    LocalBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Iluma Marketing LLC",
      "image": "https://ilumamarketing.com/logo.png",
      "description": {
        fr: "Agence marketing IA spécialisée en SEO local, publicités intelligentes et sites web qui convertissent.",
        en: "AI marketing agency specialized in local SEO, smart ads and converting websites.",
        es: "Agencia de marketing IA especializada en SEO local, publicidad inteligente y sitios web que convierten."
      }[language],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3512 Boulevard Industriel",
        "addressLocality": "Montréal",
        "addressRegion": "QC",
        "postalCode": "H1H 2Y4",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 45.5017,
        "longitude": -73.5673
      },
      "telephone": "+1-514-882-8910",
      "email": "iluma.marketing@gmail.com",
      "url": "https://ilumamarketing.com",
      "openingHours": "Mo-Fr 09:00-17:00",
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47"
      }
    },
    WebSite: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Iluma™ Marketing Intelligence",
      "url": "https://ilumamarketing.com",
      "description": "Plateforme marketing révolutionnaire alimentée par intelligence artificielle",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ilumamarketing.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["fr-CA", "en-CA", "es"],
      "publisher": {
        "@type": "Organization",
        "name": "Iluma™ Marketing Intelligence"
      }
    },
    FAQPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  };

  const structuredData = { ...baseData[type], ...data };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;