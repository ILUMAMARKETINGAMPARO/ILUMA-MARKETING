import React from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import JsonLd from '@/components/seo/JsonLd';
import SkipToContent from '@/components/accessibility/SkipToContent';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';
import FloatingLilo from '@/components/common/FloatingLilo';
import { useLanguage } from '@/hooks/useLanguage';
import { Zap, Gauge, Smartphone, Globe } from 'lucide-react';

const Performance = () => {
  const { language, t } = useLanguage();

  const seoData = {
    title: `Performance & Optimisation Iluma™ | Score Lighthouse 95+ | ${language === 'fr' ? 'Montréal' : language === 'en' ? 'Montreal' : 'Montreal'}`,
    description: language === 'fr' 
      ? "Performance web maximale avec Iluma™. Core Web Vitals optimisés, LCP < 2.5s, Score Lighthouse 95+. Mobile-first, PWA, optimisations avancées."
      : language === 'en'
      ? "Maximum web performance with Iluma™. Optimized Core Web Vitals, LCP < 2.5s, Lighthouse Score 95+. Mobile-first, PWA, advanced optimizations."
      : "Rendimiento web máximo con Iluma™. Core Web Vitals optimizados, LCP < 2.5s, Puntuación Lighthouse 95+. Mobile-first, PWA, optimizaciones avanzadas.",
    keywords: [
      'Performance web',
      'Core Web Vitals',
      'Lighthouse Score',
      'LCP CLS FID',
      'Mobile-first',
      'PWA',
      'Optimisation',
      'Iluma',
      'Montréal'
    ],
    image: '/og-performance.jpg',
    url: '/performance'
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Optimisation Performance Web Iluma™",
    "description": seoData.description,
    "provider": {
      "@type": "Organization",
      "name": "Iluma Marketing",
      "url": "https://ilumamarketing.com"
    },
    "serviceType": "Performance Web Optimization",
    "areaServed": {
      "@type": "Place",
      "name": "Montréal, Quebec, Canada"
    },
    "offers": {
      "@type": "Offer",
      "description": "Audit performance complet et optimisations avancées"
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SkipToContent />
      <SEOManager seoData={seoData} />
      <JsonLd data={jsonLdData} />
      
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent font-['Montserrat']">
                Performance
                <span className="block text-4xl md:text-6xl mt-2">
                  Galactique ⚡
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                {language === 'fr' && "Score Lighthouse 95+, Core Web Vitals optimisés, performance mobile-first révolutionnaire"}
                {language === 'en' && "Lighthouse Score 95+, optimized Core Web Vitals, revolutionary mobile-first performance"}
                {language === 'es' && "Puntuación Lighthouse 95+, Core Web Vitals optimizados, rendimiento mobile-first revolucionario"}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#8E44FF]">2.1s</div>
                  <div className="text-sm text-white/60">LCP</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#FFD56B]">0.08</div>
                  <div className="text-sm text-white/60">CLS</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#00FF88]">85ms</div>
                  <div className="text-sm text-white/60">FID</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-white">95+</div>
                  <div className="text-sm text-white/60">Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Background effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8E44FF]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFD56B]/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Performance Dashboard */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Montserrat']">
                  {language === 'fr' && "Tableau de Bord Performance"}
                  {language === 'en' && "Performance Dashboard"}
                  {language === 'es' && "Panel de Rendimiento"}
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                  {language === 'fr' && "Monitoring en temps réel des métriques de performance et optimisations continues"}
                  {language === 'en' && "Real-time performance metrics monitoring and continuous optimizations"}
                  {language === 'es' && "Monitoreo en tiempo real de métricas de rendimiento y optimizaciones continuas"}
                </p>
              </div>

              <PerformanceOptimizer />
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="py-16 bg-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 font-['Montserrat']">
                {language === 'fr' && "Technologies de Performance"}
                {language === 'en' && "Performance Technologies"}
                {language === 'es' && "Tecnologías de Rendimiento"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4 p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] flex items-center justify-center mx-auto">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Mobile-First</h3>
                  <p className="text-white/70">
                    {language === 'fr' && "Design et optimisations prioritaires pour mobile avec performance 90+ garantie"}
                    {language === 'en' && "Mobile-priority design and optimizations with guaranteed 90+ performance"}
                    {language === 'es' && "Diseño y optimizaciones prioritarias para móvil con rendimiento 90+ garantizado"}
                  </p>
                </div>

                <div className="text-center space-y-4 p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] flex items-center justify-center mx-auto">
                    <Gauge className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Core Web Vitals</h3>
                  <p className="text-white/70">
                    {language === 'fr' && "LCP < 2.5s, CLS < 0.1, FID < 100ms pour une expérience utilisateur optimale"}
                    {language === 'en' && "LCP < 2.5s, CLS < 0.1, FID < 100ms for optimal user experience"}
                    {language === 'es' && "LCP < 2.5s, CLS < 0.1, FID < 100ms para una experiencia de usuario óptima"}
                  </p>
                </div>

                <div className="text-center space-y-4 p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] flex items-center justify-center mx-auto">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">PWA Ready</h3>
                  <p className="text-white/70">
                    {language === 'fr' && "Application web progressive avec cache intelligent et fonctionnement hors-ligne"}
                    {language === 'en' && "Progressive web app with intelligent cache and offline functionality"}
                    {language === 'es' && "Aplicación web progresiva con caché inteligente y funcionalidad offline"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* LILO™ Assistant */}
      <FloatingLilo 
        currentPage="performance"
        context={{
          page: 'performance',
          userLevel: 'advanced',
          recentActivity: ['performance_view', 'metrics_analysis'],
          emotion: 'focused',
          industryContext: 'tech',
          currentGoals: ['optimize_performance', 'improve_metrics']
        }}
        userId="performance_visitor"
      />
    </div>
  );
};

export default Performance;