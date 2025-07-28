import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import SEOManager from '@/components/seo/SEOManager';
import InteractiveMapEnhance from '@/components/carte-enhance/InteractiveMapEnhance';

import { HeatmapProvider, useHeatmap } from '@/contexts/HeatmapContext';
import { parseBusinessData } from '@/utils/heatmapDataParser';
import { BusinessData } from '@/types/heatmap';
import { SEOEngine } from '@/utils/seoEngine';

// Mock CSV data
const exampleCSV = `id,name,city,address,phone,googleRating,reviewCount,serpRank,isSponsored,source,sector,lat,lng,ilaScore,status,hasWebsite,potential
1,Restaurant Bella Vista,Montréal,1234 Rue Saint-Laurent,(514) 555-0101,4.6,184,2,false,SEO,restaurant,45.5017,-73.5673,85,prospect,true,high
2,Clinique Dentaire Plus,Montréal,5678 Boulevard René-Lévesque,(514) 555-0202,3.8,67,8,false,GMB,santé,45.5088,-73.5878,58,prospect,false,medium
3,Boutique Mode Élégante,Montréal,910 Avenue Mont-Royal,(514) 555-0303,4.2,134,5,true,SEO,retail,45.5247,-73.5848,72,contacted,true,high`;

const HeatmapILAContent = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get('id');

  const {
    businesses,
    loadBusinessData,
    selectBusiness,
    selectedBusiness
  } = useHeatmap();

  // Chargement automatique du CSV simulé
  useEffect(() => {
    loadBusinessData(exampleCSV);

    // Si un ID est présent via QR code, auto-sélection
    if (businessId && businesses.length > 0) {
      const found = businesses.find((b) => b.id === businessId);
      if (found) selectBusiness(found);
    }
  }, [businessId, loadBusinessData, businesses, selectBusiness]);

  // Sélection manuelle
  const handleBusinessSelect = (business: BusinessData) => {
    selectBusiness(business);
    console.log(`Entreprise sélectionnée : ${business?.name}`);
  };

  // Analyse IA d'une zone autour d'un point
  const handleZoneAnalysis = (zone: { center: [number, number], radius: number }) => {
    console.log('Analyse de zone demandée :', zone);
    // → appel IA, affichage dashboard, heatmap dynamique, etc.
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <main className="pt-20">
        <InteractiveMapEnhance
          onBusinessSelect={handleBusinessSelect}
          onZoneAnalysis={handleZoneAnalysis}
        />
      </main>
    </div>
  );
};

const HeatmapILA = () => {
  const seoData = SEOEngine.generatePageSEO('service', {
    serviceName: 'Carte ENHANCE – Prospection Locale IA',
    benefit: 'Découvrez les meilleures opportunités de prospection locale avec notre carte interactive.',
  });

  return (
    <HeatmapProvider>
      <Helmet>
        <title>Heatmap ILA™ – Analyse Géospatiale Intelligente | ILUMA</title>
        <meta name="description" content="Module de visualisation géospatiale des scores ILA™ avec analyse de données, clustering intelligent et actions CRM intégrées." />
        <meta name="keywords" content="heatmap, ILA, géospatial, prospection, Montréal, Laval, analyse" />
      </Helmet>

      <SEOManager seoData={seoData} path="/heatmap-ila" />

      <HeatmapILAContent />
    </HeatmapProvider>
  );
};

export default HeatmapILA;