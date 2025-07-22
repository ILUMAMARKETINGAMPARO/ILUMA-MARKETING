import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&auto=format',
  type = 'website'
}) => {
  const location = useLocation();
  const baseUrl = window.location.origin;
  const canonicalUrl = `${baseUrl}${location.pathname}`;

  const defaultTitle = "Iluma Marketing LLC - IA Marketing & Visibilité Locale";
  const defaultDescription = "Transformez votre visibilité avec nos solutions IA : ADLUMA™, ILA™, CRM intelligent. Marketing local automatisé pour PME, restaurants, commerces.";
  const defaultKeywords = "marketing local, IA marketing, visibilité locale, ADLUMA, ILA score, CRM intelligent, référencement local, Google Ads, Meta Ads";

  const finalTitle = title ? `${title} — Iluma Marketing LLC` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = `${baseUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="Iluma Marketing LLC" />
      <meta property="og:locale" content="fr_CA" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      <meta name="twitter:creator" content="@IlumaMarketing" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Iluma Marketing LLC" />
      <meta name="language" content="fr-CA" />
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Montréal, Québec" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#8E44FF" />
    </Helmet>
  );
};

export default SEOHead;