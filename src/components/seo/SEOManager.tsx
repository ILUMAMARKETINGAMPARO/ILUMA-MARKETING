import { Helmet } from 'react-helmet-async';
import { SEOData } from '@/utils/seoEngine';

interface SEOManagerProps {
  seoData: SEOData;
  path?: string;
}

const SEOManager: React.FC<SEOManagerProps> = ({ seoData, path = '' }) => {
  const canonicalUrl = `https://ilumamarketing.com${path}`;

  return (
    <Helmet>
      {/* Titre SEO optimisé (60 caractères max) */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      
      {/* Mots-clés stratégiques longue traîne */}
      <meta name="keywords" content={Array.isArray(seoData.keywords) ? seoData.keywords.join(', ') : seoData.keywords} />
      
      {/* Meta robots avancées pour SGE */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* URLs Canoniques anti-duplicate */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph optimisé pour engagement */}
      <meta property="og:title" content={seoData.openGraph?.title || seoData.title} />
      <meta property="og:description" content={seoData.openGraph?.description || seoData.description} />
      <meta property="og:type" content={seoData.openGraph?.type || 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Iluma™ - Intelligence Artificielle Marketing" />
      <meta property="og:locale" content="fr_CA" />
      <meta property="og:locale:alternate" content="en_CA" />
      {seoData.openGraph?.image && (
        <>
          <meta property="og:image" content={seoData.openGraph.image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Iluma™ - IA Marketing & SEO Intelligent" />
        </>
      )}
      
      {/* Twitter Cards optimisé CTR */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@IlumaMarketing" />
      <meta name="twitter:creator" content="@IlumaMarketing" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      {seoData.openGraph?.image && (
        <>
          <meta name="twitter:image" content={seoData.openGraph.image} />
          <meta name="twitter:image:alt" content="Iluma™ - IA Marketing Revolution" />
        </>
      )}
      
      {/* Métadonnées spécialisées */}
      <meta name="author" content="Iluma™ Marketing Intelligence" />
      <meta name="language" content="fr-CA" />
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Québec, Montréal, Laval, Longueuil" />
      <meta name="geo.position" content="45.5017;-73.5673" />
      <meta name="ICBM" content="45.5017, -73.5673" />
      
      {/* App mobile optimisé */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Iluma™" />
      <meta name="application-name" content="Iluma™ Marketing" />
      <meta name="theme-color" content="#8E44FF" />
      <meta name="msapplication-TileColor" content="#8E44FF" />
      
      {/* Données Structurées */}
      {seoData.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData)}
        </script>
      )}
      
      {/* Preconnections pour Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon et Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Hreflang pour Multilingue */}
      <link rel="alternate" hrefLang="fr" href={`https://ilumamarketing.com${path}`} />
      <link rel="alternate" hrefLang="fr-CA" href={`https://ilumamarketing.com${path}`} />
      <link rel="alternate" hrefLang="en" href={`https://ilumamarketing.com/en${path}`} />
      <link rel="alternate" hrefLang="en-US" href={`https://ilumamarketing.com/en${path}`} />
      <link rel="alternate" hrefLang="en-CA" href={`https://ilumamarketing.com/en${path}`} />
      <link rel="alternate" hrefLang="es" href={`https://ilumamarketing.com/es${path}`} />
      <link rel="alternate" hrefLang="es-ES" href={`https://ilumamarketing.com/es${path}`} />
      <link rel="alternate" hrefLang="es-MX" href={`https://ilumamarketing.com/es${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://ilumamarketing.com${path}`} />
      
      {/* Schema.org Breadcrumbs si applicable */}
      {path !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://ilumamarketing.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": seoData.title.split(' - ')[0],
                "item": canonicalUrl
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOManager;