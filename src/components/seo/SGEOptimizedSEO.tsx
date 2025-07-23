import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage.ts';
import { useLocation } from 'react-router-dom';

interface SGEOptimizedSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  faqData?: Array<{
    question: string;
    answer: string;
  }>;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  localBusiness?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    geo: {
      latitude: number;
      longitude: number;
    };
  };
}

const SGEOptimizedSEO: React.FC<SGEOptimizedSEOProps> = ({
  title,
  description,
  keywords = [],
  faqData = [],
  breadcrumbs = [],
  localBusiness
}) => {
  const { language, t } = useLanguage();
  const location = useLocation();

  // Generate multilingual URLs
  const generateMultilingualUrls = () => {
    const cleanPath = location.pathname.replace(/^\/(en|es)/, '');
    const baseUrl = 'https://ilumamarketing.com';
    
    return {
      fr: `${baseUrl}${cleanPath}`,
      en: `${baseUrl}/en${cleanPath}`,
      es: `${baseUrl}/es${cleanPath}`
    };
  };

  const urls = generateMultilingualUrls();
  const currentUrl = urls[language];

  // Generate FAQ Schema for SGE
  const generateFAQSchema = () => {
    if (faqData.length === 0) return null;

    return {
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
    };
  };

  // Generate Organization Schema with geo data
  const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Iluma Marketing",
    "alternateName": "Iluma™",
    "url": "https://ilumamarketing.com",
    "logo": "https://ilumamarketing.com/logo.png",
    "description": t('footer.description'),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": localBusiness?.address || "Montréal",
      "addressLocality": "Montréal",
      "addressRegion": "QC",
      "postalCode": "H1Y 2H5",
      "addressCountry": "CA"
    },
    "geo": localBusiness?.geo ? {
      "@type": "GeoCoordinates",
      "latitude": localBusiness.geo.latitude,
      "longitude": localBusiness.geo.longitude
    } : {
      "@type": "GeoCoordinates",
      "latitude": 45.5017,
      "longitude": -73.5673
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": localBusiness?.phone || "+15148828910",
      "contactType": "customer service",
      "areaServed": ["CA", "US", "ES"],
      "availableLanguage": ["French", "English", "Spanish"]
    },
    "sameAs": [
      "https://www.facebook.com/IlumaMarketing",
      "https://www.linkedin.com/company/iluma-marketing",
      "https://www.instagram.com/ilumamarketing"
    ]
  });

  // Generate Breadcrumb Schema
  const generateBreadcrumbSchema = () => {
    if (breadcrumbs.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  };

  // Generate LocalBusiness Schema for SGE
  const generateLocalBusinessSchema = () => {
    if (!localBusiness) return null;

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": localBusiness.name,
      "image": "https://ilumamarketing.com/logo.png",
      "@id": "https://ilumamarketing.com",
      "url": "https://ilumamarketing.com",
      "telephone": localBusiness.phone,
      "email": localBusiness.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": localBusiness.address,
        "addressLocality": "Montréal",
        "addressRegion": "QC",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": localBusiness.geo.latitude,
        "longitude": localBusiness.geo.longitude
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
        "closes": "18:00"
      },
      "priceRange": "$$$"
    };
  };

  return (
    <Helmet>
      {/* Enhanced meta for SGE */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Language and region targeting */}
      <meta name="language" content={language} />
      <meta httpEquiv="content-language" content={language} />
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Montréal" />
      <meta name="geo.position" content="45.5017;-73.5673" />
      <meta name="ICBM" content="45.5017, -73.5673" />

      {/* Enhanced hreflang for SGE */}
      <link rel="alternate" hrefLang="fr" href={urls.fr} />
      <link rel="alternate" hrefLang="fr-CA" href={urls.fr} />
      <link rel="alternate" hrefLang="en" href={urls.en} />
      <link rel="alternate" hrefLang="en-US" href={urls.en} />
      <link rel="alternate" hrefLang="en-CA" href={urls.en} />
      <link rel="alternate" hrefLang="es" href={urls.es} />
      <link rel="alternate" hrefLang="es-ES" href={urls.es} />
      <link rel="alternate" hrefLang="es-MX" href={urls.es} />
      <link rel="alternate" hrefLang="x-default" href={urls.fr} />

      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph with language variants */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content={language === 'fr' ? 'fr_CA' : language === 'en' ? 'en_US' : 'es_ES'} />
      <meta property="og:site_name" content="Iluma™ Marketing" />

      {/* Schema.org JSON-LD for SGE */}
      <script type="application/ld+json">
        {JSON.stringify(generateOrganizationSchema())}
      </script>

      {faqData.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema())}
        </script>
      )}

      {breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema())}
        </script>
      )}

      {localBusiness && (
        <script type="application/ld+json">
          {JSON.stringify(generateLocalBusinessSchema())}
        </script>
      )}

      {/* Additional structured data for SGE */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Iluma™ Marketing",
          "url": "https://ilumamarketing.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://ilumamarketing.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "inLanguage": [
            {
              "@type": "Language",
              "name": "French",
              "alternateName": "fr"
            },
            {
              "@type": "Language", 
              "name": "English",
              "alternateName": "en"
            },
            {
              "@type": "Language",
              "name": "Spanish", 
              "alternateName": "es"
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SGEOptimizedSEO;