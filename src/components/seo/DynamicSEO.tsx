import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { getMultilingualSEOData, getSGEOptimizedContent } from '@/utils/seoMultilingualEngine';
import SGEOptimizedSEO from './SGEOptimizedSEO';

interface DynamicSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
}

const DynamicSEO: React.FC<DynamicSEOProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.webp',
  canonical
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  
  // Déterminer le contenu SEO selon la route et la langue
  const getPageSpecificSEO = () => {
    const cleanPath = location.pathname.replace(/^\/(en|es)/, '');
    
    // Déterminer la page à partir du chemin
    let page = 'home';
    if (cleanPath === '/contact') page = 'contact';
    else if (cleanPath === '/adluma') page = 'adluma';
    else if (cleanPath === '/ila') page = 'ila';
    else if (cleanPath === '/crm-iluma') page = 'crm-iluma';
    else if (cleanPath === '/ilumatch') page = 'ilumatch';
    else if (cleanPath.startsWith('/services')) page = 'services';
    
    return getMultilingualSEOData(page, language);
  };

  const seoData = getPageSpecificSEO();
  const finalTitle = title || seoData.title;
  const finalDescription = description || seoData.description;
  const finalKeywords = keywords ? keywords.split(',').map(k => k.trim()) : seoData.keywords;
  
  // Get SGE-optimized content
  const cleanPath = location.pathname.replace(/^\/(en|es)/, '');
  const pageName = cleanPath === '/' ? 'home' : cleanPath.split('/')[1] || 'home';
  const faqData = getSGEOptimizedContent(pageName, language);
  
  const finalCanonical = canonical || `https://ilumamarketing.com${location.pathname}`;

  // Schema.org Organization complet
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Iluma Marketing",
    "description": "Solutions de marketing digital propulsées par l'intelligence artificielle",
    "url": "https://ilumamarketing.com",
    "logo": "https://ilumamarketing.com/logo.webp",
    "sameAs": [
      "https://linkedin.com/company/iluma-marketing",
      "https://twitter.com/ilumamarketing"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-514-882-8910",
      "contactType": "Customer Service",
      "email": "hola@ilumamarketing.com",
      "availableLanguage": ["French", "English", "Spanish"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "651 N Broad St. Suite 206",
      "addressLocality": "Middletown",
      "addressRegion": "DE",
      "postalCode": "19709",
      "addressCountry": "US"
    },
    "founder": {
      "@type": "Person",
      "name": "Sergio David Ortega-Ramos"
    },
    "services": [
      "Marketing Digital",
      "Intelligence Artificielle",
      "SEO",
      "Publicité en ligne",
      "Content Marketing",
      "CRM Intelligent"
    ]
  };

  return (
    <>
      <SGEOptimizedSEO
        title={finalTitle}
        description={finalDescription}
        keywords={finalKeywords}
        faqData={faqData}
        localBusiness={{
          name: "Iluma Marketing",
          address: "Montréal, QC, Canada",
          phone: "+15148828910",
          email: "administracion@ilumamarketing.com",
          geo: {
            latitude: 45.5017,
            longitude: -73.5673
          }
        }}
      />
      
      <Helmet>
        {/* Performance et pré-chargement */}
        <link rel="preload" href="/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//api.mapbox.com" />
        <link rel="preconnect" href="https://tgtoykxksohyalgifcdi.supabase.co" />
        
        {/* Icônes et manifeste */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#8E44FF" />
      </Helmet>
    </>
  );
};

export default DynamicSEO;