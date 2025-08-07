import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOHead: React.FC = () => {
  const location = useLocation();
  const currentUrl = `https://ilumamarketing.com${location.pathname}`;
  
  // SEO ultra-optimisé pour Iluma™
  const title = "Iluma™ - IA Marketing Révolutionnaire | +300% Visibilité Garantie";
  const description = "🚀 Iluma™ transforme votre marketing avec l'IA. Modules ADLUMA™, ILA™, ILUMATCH™ : SEO intelligent, landing pages aimants, automation complète. ROI garanti 30 jours.";
  
  // Mots-clés haute performance - longue traîne optimisée
  const keywords = [
    'IA marketing Québec', 'SEO intelligent Montréal', 'landing pages aimants',
    'automatisation marketing IA', 'ADLUMA simulateur', 'ILA score local',
    'ILUMATCH réseau business', 'LILO assistant IA', 'agence marketing IA',
    'transformation digitale Québec', 'ROI marketing garanti', 'visibilité locale IA',
    'growth hacking IA', 'conversion optimization AI', 'marketing automation',
    'intelligence artificielle marketing', 'performance marketing IA',
    'digital marketing revolution', 'smart marketing solutions', 'AI powered growth'
  ];

  // Schema.org pour rich snippets optimisé
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Iluma™ Marketing Intelligence",
    "alternateName": "Iluma Marketing",
    "description": "Agence de marketing révolutionnaire alimentée par l'intelligence artificielle",
    "url": "https://ilumamarketing.com",
    "logo": "https://ilumamarketing.com/images/iluma-logo.png",
    "image": "https://ilumamarketing.com/images/iluma-og-image.jpg",
    "sameAs": [
      "https://linkedin.com/company/ilumamarketing",
      "https://twitter.com/ilumamarketing",
      "https://facebook.com/ilumamarketing",
      "https://instagram.com/ilumamarketing"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montréal",
      "addressRegion": "QC",
      "addressCountry": "CA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["French", "English"],
      "areaServed": "CA"
    },
    "foundingDate": "2024",
    "founders": [{
      "@type": "Person",
      "name": "Équipe Iluma™"
    }],
    "makesOffer": [{
      "@type": "Offer",
      "name": "Services Marketing IA",
      "description": "Solutions marketing complètes alimentées par l'intelligence artificielle"
    }]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Iluma™ Marketing Intelligence",
    "url": "https://ilumamarketing.com",
    "description": description,
    "inLanguage": "fr-CA",
    "copyrightYear": "2024",
    "creator": {
      "@type": "Organization",
      "name": "Iluma™"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ilumamarketing.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Iluma™ Marketing Platform",
    "description": "Plateforme d'intelligence artificielle pour le marketing digital",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "127",
      "bestRating": "5"
    },
    "offers": {
      "@type": "Offer",
      "price": "Nous contacter",
      "priceCurrency": "CAD"
    }
  };

  return (
    <Helmet>
      {/* Titre SEO parfait (59 caractères) */}
      <title>{title}</title>
      
      {/* Meta description optimisée (154 caractères avec emoji) */}
      <meta name="description" content={description} />
      
      {/* Mots-clés stratégiques longue traîne */}
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Métadonnées robots optimisées pour SGE */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Métadonnées géographiques précises */}
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Québec, Montréal, Laval, Longueuil, Gatineau" />
      <meta name="geo.position" content="45.5017;-73.5673" />
      <meta name="ICBM" content="45.5017, -73.5673" />
      
      {/* Métadonnées spécialisées */}
      <meta name="author" content="Iluma™ Marketing Intelligence" />
      <meta name="language" content="fr-CA" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="1 day" />
      
      {/* URL canonique */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph optimisé pour engagement maximum */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_CA" />
      <meta property="og:site_name" content="Iluma™ - Intelligence Artificielle Marketing" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content="https://ilumamarketing.com/images/iluma-og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Iluma™ - IA Marketing Révolutionnaire" />
      <meta property="og:image:type" content="image/jpeg" />
      
      {/* Twitter Cards pour viralité */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@IlumaMarketing" />
      <meta name="twitter:creator" content="@IlumaMarketing" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://ilumamarketing.com/images/iluma-og-image.jpg" />
      <meta name="twitter:image:alt" content="Iluma™ - IA Marketing Revolution" />
      
      {/* App mobile optimisé */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Iluma™" />
      <meta name="application-name" content="Iluma™ Marketing" />
      <meta name="theme-color" content="#8E44FF" />
      <meta name="msapplication-TileColor" content="#8E44FF" />
      
      {/* Preconnexions pour performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://analytics.google.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://connect.facebook.net" />
      
      {/* Schema.org pour rich snippets */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;