import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';

interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Article' | 'FAQPage' | 'WebSite';
  data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data = {} }) => {
  const { language } = useLanguage();

  const baseData = {
    Organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Iluma Marketing LLC",
      "url": "https://ilumamarketing.com",
      "logo": "https://ilumamarketing.com/logo.png",
      "description": {
        fr: "Votre visibilité locale transformée par l'intelligence artificielle. SEO, publicités et sites web qui convertissent.",
        en: "Your local visibility transformed by artificial intelligence. SEO, ads and websites that convert.",
        es: "Tu visibilidad local transformada por inteligencia artificial. SEO, publicidad y sitios web que convierten."
      }[language],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3512 Boulevard Industriel",
        "addressLocality": "Montréal",
        "addressRegion": "QC",
        "postalCode": "H1H 2Y4",
        "addressCountry": "CA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-514-882-8910",
        "contactType": "customer service",
        "email": "iluma.marketing@gmail.com"
      },
      "founder": [
        {
          "@type": "Person",
          "name": "Sergio David Ortega-Ramos",
          "jobTitle": "CEO"
        },
        {
          "@type": "Person", 
          "name": "Amparo Lopez",
          "jobTitle": "COO"
        }
      ],
      "sameAs": [
        "https://facebook.com/ilumamarketing",
        "https://instagram.com/ilumamarketing",
        "https://linkedin.com/company/iluma-marketing"
      ]
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
      "name": "Iluma Marketing",
      "url": "https://ilumamarketing.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ilumamarketing.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["fr-CA", "en-CA", "es"],
      "publisher": {
        "@type": "Organization",
        "name": "Iluma Marketing LLC"
      }
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