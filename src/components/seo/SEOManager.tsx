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
      {/* Titre et Meta Description */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      
      {/* Keywords */}
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      
      {/* URLs Canoniques */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoData.openGraph?.title || seoData.title} />
      <meta property="og:description" content={seoData.openGraph?.description || seoData.description} />
      <meta property="og:type" content={seoData.openGraph?.type || 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Iluma™ - IA Marketing" />
      <meta property="og:locale" content="fr_CA" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="es_ES" />
      {seoData.openGraph?.image && (
        <meta property="og:image" content={seoData.openGraph.image} />
      )}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      {seoData.openGraph?.image && (
        <meta name="twitter:image" content={seoData.openGraph.image} />
      )}
      
      {/* Autres Meta */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Iluma Marketing" />
      <meta name="language" content="French" />
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Montréal" />
      
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