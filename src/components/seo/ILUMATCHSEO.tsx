import React from 'react';
import { Helmet } from 'react-helmet-async';

const ILUMATCHSEO = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Qu'est-ce que le Score ILA™ exactement ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Le Score ILA™ (Intelligence de Localisation Avancée) évalue votre visibilité locale sur 100 points en analysant votre présence Google, SEO local, avis clients, et positionnement concurrentiel."
            }
          },
          {
            "@type": "Question", 
            "name": "Comment ILUMATCH™ trouve-t-il les bonnes solutions pour mon entreprise ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Notre IA analyse votre secteur, votre zone géographique, vos concurrents et votre Score ILA™ pour recommander les actions prioritaires qui maximiseront votre visibilité locale."
            }
          },
          {
            "@type": "Question",
            "name": "Combien de temps faut-il pour améliorer mon Score ILA™ ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Les premières améliorations sont visibles en 30 jours. Un gain significatif (15-25 points) se réalise généralement en 90 jours avec les actions recommandées."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Comment maximiser votre visibilité locale avec le Score ILA™",
        "description": "Guide complet pour dominer votre marché local avec ILUMATCH™",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Calcul du Score ILA™",
            "text": "Évaluation de votre visibilité locale actuelle sur 100 points"
          },
          {
            "@type": "HowToStep", 
            "name": "Analyse concurrentielle",
            "text": "Comparaison avec vos concurrents locaux et identification des opportunités"
          },
          {
            "@type": "HowToStep",
            "name": "Recommandations personnalisées",
            "text": "Plan d'action IA pour améliorer votre positionnement local"
          },
          {
            "@type": "HowToStep",
            "name": "Optimisation continue",
            "text": "Suivi et ajustements pour maintenir votre domination locale"
          }
        ]
      },
      {
        "@type": "Product",
        "name": "ILUMATCH™",
        "description": "Système intelligent de matching et optimisation de visibilité locale",
        "brand": {
          "@type": "Brand",
          "name": "Iluma™"
        },
        "category": "Logiciel de Marketing Local",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "CAD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "89"
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Clinique Force Santé - Cas d'usage ILUMATCH™",
        "description": "Exemple de réussite avec Score ILA™ 89 et domination top 3 Google Maps",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Montréal",
          "addressRegion": "QC",
          "addressCountry": "CA"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "156"
        }
      },
      {
        "@type": "Organization",
        "name": "Iluma™",
        "url": "https://ilumamarketing.com",
        "logo": "https://ilumamarketing.com/logo.png",
        "description": "Intelligence artificielle marketing et visibilité locale"
      }
    ]
  };

  return (
    <Helmet>
      <title>Comment maximiser votre visibilité locale avec le Score ILA™ ? | ILUMATCH™ Iluma</title>
      <meta name="description" content="ILUMATCH™ analyse votre potentiel local et vous connecte aux meilleures solutions pour dominer votre marché. Score ILA™ de 0 à 100 pour mesurer votre visibilité." />
      <meta name="keywords" content="ILUMATCH, Score ILA, visibilité locale, SEO local, Google My Business, marketing local, Iluma, intelligence artificielle locale" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Comment maximiser votre visibilité locale avec le Score ILA™ ? | ILUMATCH™" />
      <meta property="og:description" content="Score ILA™ de 0 à 100 pour mesurer et optimiser votre visibilité locale. Dominez votre marché avec ILUMATCH™." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ilumamarketing.com/ilumatch" />
      <meta property="og:image" content="https://ilumamarketing.com/ilumatch-preview.jpg" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Comment maximiser votre visibilité locale avec le Score ILA™ ?" />
      <meta name="twitter:description" content="ILUMATCH™ : Score ILA™ et matching intelligent pour dominer votre marché local" />
      
      {/* Données structurées */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Canonical */}
      <link rel="canonical" href="https://ilumamarketing.com/ilumatch" />
      
      {/* Hreflang */}
      <link rel="alternate" hrefLang="fr" href="https://ilumamarketing.com/ilumatch" />
      <link rel="alternate" hrefLang="en" href="https://ilumamarketing.com/en/ilumatch" />
      <link rel="alternate" hrefLang="x-default" href="https://ilumamarketing.com/ilumatch" />
    </Helmet>
  );
};

export default ILUMATCHSEO;