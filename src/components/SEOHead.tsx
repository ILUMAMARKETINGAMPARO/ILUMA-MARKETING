import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';
import { useSEOData } from '@/hooks/useSEOData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: any;
  hreflang?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = "https://ilumamarketing.com/og-image.jpg",
  twitterTitle,
  twitterDescription,
  twitterImage,
  noindex = false,
  nofollow = false,
  structuredData,
  hreflang = true
}) => {
  const { language } = useLanguage();
  const autoSEOData = useSEOData();

  // Use provided props or fallback to automatic SEO data
  const seoData = {
    title: title || autoSEOData.title,
    description: description || autoSEOData.description,
    keywords: keywords || autoSEOData.keywords,
    canonical: canonical || autoSEOData.canonical,
    ogTitle: ogTitle || autoSEOData.ogTitle,
    ogDescription: ogDescription || autoSEOData.ogDescription,
    twitterTitle: twitterTitle || autoSEOData.twitterTitle,
    twitterDescription: twitterDescription || autoSEOData.twitterDescription
  };

  const robotsContent = noindex || nofollow 
    ? `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`
    : 'index,follow';

  const baseUrl = 'https://ilumamarketing.com';
  const currentUrl = window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Title and Description */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      
      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      
      {/* Canonical */}
      <link rel="canonical" href={seoData.canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoData.ogTitle} />
      <meta property="og:description" content={seoData.ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Iluma™ Marketing" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_CA' : language === 'es' ? 'es_ES' : 'en_US'} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.twitterTitle} />
      <meta name="twitter:description" content={seoData.twitterDescription} />
      <meta name="twitter:image" content={twitterImage || ogImage} />
      <meta name="twitter:site" content="@IlumaMarketing" />
      <meta name="twitter:creator" content="@IlumaMarketing" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Iluma Marketing" />
      <meta name="publisher" content="Iluma Marketing" />
      <meta name="copyright" content="© 2024 Iluma Marketing LLC" />
      <meta name="theme-color" content="#8E44FF" />
      <meta name="msapplication-TileColor" content="#8E44FF" />
      
      {/* Geo Location Tags */}
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Montreal, Quebec" />
      <meta name="geo.position" content="45.5017;-73.5673" />
      <meta name="ICBM" content="45.5017, -73.5673" />
      
      {/* Language alternates (hreflang) */}
      {hreflang && (
        <>
          <link rel="alternate" hrefLang="fr" href={`${baseUrl}/`} />
          <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
          <link rel="alternate" hrefLang="es" href={`${baseUrl}/es`} />
          <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />
        </>
      )}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://tgtoykxksohyalgifcdi.supabase.co" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};