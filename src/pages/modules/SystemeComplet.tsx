import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import FAQSection from '@/components/faq/FAQSection';
import CaseStudyDetailCard from '@/components/case-studies/CaseStudyDetailCard';
import AdminControlPanel from '@/components/admin/AdminControlPanel';
import PartnershipHub from '@/components/partnerships/PartnershipHub';
import { 
  Rocket, 
  Brain, 
  Zap, 
  Settings, 
  HelpCircle, 
  Award,
  Handshake,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/hooks/useTranslations';
import { AnimatedSection } from '@/components/animations/IlumaAnimations';
import { katzSportCase } from '@/data/caseStudiesData';

const SystemeComplet = () => {
  const { language } = useTranslations();
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const systemModules = [
    {
      id: 'faq',
      title: { fr: 'FAQ Trilingue', en: 'Trilingual FAQ', es: 'FAQ Trilingüe' },
      description: { 
        fr: 'Base de connaissances complète avec recherche et filtres intelligents',
        en: 'Complete knowledge base with smart search and filters',
        es: 'Base de conocimientos completa con búsqueda y filtros inteligentes'
      },
      icon: HelpCircle,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'case-studies',
      title: { fr: 'Études de Cas', en: 'Case Studies', es: 'Casos de Estudio' },
      description: { 
        fr: 'Résultats détaillés et témoignages clients avec métriques complètes',
        en: 'Detailed results and client testimonials with complete metrics',
        es: 'Resultados detallados y testimonios de clientes con métricas completas'
      },
      icon: Award,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30'
    },
    {
      id: 'partnerships',
      title: { fr: 'Partenariats', en: 'Partnerships', es: 'Asociaciones' },
      description: { 
        fr: 'Hub de collaboration média et stratégies cross-platform',
        en: 'Media collaboration hub and cross-platform strategies',
        es: 'Hub de colaboración mediática y estrategias multiplataforma'
      },
      icon: Handshake,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 'admin',
      title: { fr: 'Administration', en: 'Administration', es: 'Administración' },
      description: { 
        fr: 'Panneau de contrôle galactique pour la gestion complète du système',
        en: 'Galactic control panel for complete system management',
        es: 'Panel de control galáctico para gestión completa del sistema'
      },
      icon: Settings,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0E] via-[#1a1a2e] to-[#16213e]">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <AnimatedSection animation="galacticFadeIn" className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="w-8 h-8 text-[#8E44FF]" />
              <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">
                Système Iluma™ Complet
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-[#8E44FF] to-[#FFD56B] bg-clip-text text-transparent mb-6 font-['Montserrat'] leading-tight">
              {language === 'fr' && 'Écosystème IA Intégré'}
              {language === 'en' && 'Integrated AI Ecosystem'}
              {language === 'es' && 'Ecosistema IA Integrado'}
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8 font-['Montserrat']">
              {language === 'fr' && 'L\'implémentation la plus complète d\'Iluma™ : FAQ intelligente, études de cas détaillées, partenariats médiatiques et administration galactique'}
              {language === 'en' && 'The most complete Iluma™ implementation: smart FAQ, detailed case studies, media partnerships and galactic administration'}
              {language === 'es' && 'La implementación más completa de Iluma™: FAQ inteligente, casos de estudio detallados, asociaciones mediáticas y administración galáctica'}
            </p>
            
            {/* System Overview Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {systemModules.map((module, index) => {
                const IconComponent = module.icon;
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className={`glass-effect ${module.borderColor} p-6 hover:border-opacity-50 transition-all duration-300 group`}>
                      <div className={`w-12 h-12 ${module.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`w-6 h-6 ${module.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">
                        {module.title[language]}
                      </h3>
                      <p className="text-white/70 text-sm font-['Montserrat']">
                        {module.description[language]}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Main System Interface */}
          <AnimatedSection animation="slideInUp" className="mb-16">
            <Tabs defaultValue="faq" className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-4 bg-black/40 border border-white/20 max-w-2xl">
                  <TabsTrigger value="faq" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger value="cases" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                    <Award className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Cas' : language === 'en' ? 'Cases' : 'Casos'}
                  </TabsTrigger>
                  <TabsTrigger value="partnerships" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                    <Handshake className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Partenaires' : language === 'en' ? 'Partners' : 'Socios'}
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-[#8E44FF] font-['Montserrat']">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="faq" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                    {language === 'fr' && 'Base de Connaissances Intelligente'}
                    {language === 'en' && 'Intelligent Knowledge Base'}
                    {language === 'es' && 'Base de Conocimientos Inteligente'}
                  </h2>
                  <p className="text-white/70 font-['Montserrat']">
                    {language === 'fr' && 'Système de FAQ trilingue avec recherche avancée et catégorisation automatique'}
                    {language === 'en' && 'Trilingual FAQ system with advanced search and automatic categorization'}
                    {language === 'es' && 'Sistema FAQ trilingüe con búsqueda avanzada y categorización automática'}
                  </p>
                </div>
                <FAQSection showSearch={true} showFilters={true} />
              </TabsContent>

              <TabsContent value="cases" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                    {language === 'fr' && 'Preuves de Succès Documentées'}
                    {language === 'en' && 'Documented Success Proofs'}
                    {language === 'es' && 'Pruebas de Éxito Documentadas'}
                  </h2>
                  <p className="text-white/70 font-['Montserrat']">
                    {language === 'fr' && 'Études de cas détaillées avec métriques, témoignages et recommandations'}
                    {language === 'en' && 'Detailed case studies with metrics, testimonials and recommendations'}
                    {language === 'es' && 'Casos de estudio detallados con métricas, testimonios y recomendaciones'}
                  </p>
                </div>
                <CaseStudyDetailCard caseStudy={katzSportCase} isExpanded={true} />
              </TabsContent>

              <TabsContent value="partnerships" className="space-y-8">
                <PartnershipHub />
              </TabsContent>

              <TabsContent value="admin" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                    {language === 'fr' && 'Centre de Contrôle Galactique'}
                    {language === 'en' && 'Galactic Control Center'}
                    {language === 'es' && 'Centro de Control Galáctico'}
                  </h2>
                  <p className="text-white/70 mb-8 font-['Montserrat']">
                    {language === 'fr' && 'Interface d\'administration complète pour la gestion de l\'écosystème Iluma™'}
                    {language === 'en' && 'Complete administration interface for Iluma™ ecosystem management'}
                    {language === 'es' && 'Interfaz de administración completa para la gestión del ecosistema Iluma™'}
                  </p>
                </div>
                
                <Card className="glass-effect border-white/20 p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Settings className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-['Montserrat']">
                    {language === 'fr' && 'Accès Administrateur Requis'}
                    {language === 'en' && 'Administrator Access Required'}
                    {language === 'es' && 'Acceso de Administrador Requerido'}
                  </h3>
                  <p className="text-white/70 mb-6 font-['Montserrat']">
                    {language === 'fr' && 'Cette interface est réservée aux administrateurs Iluma™ (Sergio & Amparo)'}
                    {language === 'en' && 'This interface is reserved for Iluma™ administrators (Sergio & Amparo)'}
                    {language === 'es' && 'Esta interfaz está reservada para administradores Iluma™ (Sergio & Amparo)'}
                  </p>
                  <Button
                    onClick={() => setShowAdminPanel(true)}
                    className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-8 py-3 font-['Montserrat']"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {language === 'fr' ? 'Ouvrir le Cockpit' : language === 'en' ? 'Open Cockpit' : 'Abrir Cabina'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </AnimatedSection>

          {/* Integration Status */}
          <AnimatedSection animation="scaleIn" className="text-center">
            <Card className="glass-effect border-white/20 p-8 bg-gradient-to-r from-[#8E44FF]/10 to-[#FFD56B]/10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="w-8 h-8 text-[#8E44FF]" />
                <Badge className="bg-green-500/20 border-green-500/30 text-green-300 text-lg px-3 py-1">
                  {language === 'fr' ? 'Système Opérationnel' : language === 'en' ? 'System Operational' : 'Sistema Operacional'}
                </Badge>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                {language === 'fr' && 'Écosystème Iluma™ Pleinement Intégré'}
                {language === 'en' && 'Fully Integrated Iluma™ Ecosystem'}
                {language === 'es' && 'Ecosistema Iluma™ Completamente Integrado'}
              </h2>
              <p className="text-white/80 max-w-3xl mx-auto mb-8 font-['Montserrat']">
                {language === 'fr' && 'Tous les composants sont interconnectés et fonctionnent en synergie pour offrir une expérience utilisateur optimale et des résultats mesurables'}
                {language === 'en' && 'All components are interconnected and work in synergy to provide optimal user experience and measurable results'}
                {language === 'es' && 'Todos los componentes están interconectados y trabajan en sinergia para brindar una experiencia de usuario óptima y resultados medibles'}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { 
                    metric: '+214%', 
                    label: language === 'fr' ? 'Conversion Moyenne' : language === 'en' ? 'Average Conversion' : 'Conversión Promedio',
                    icon: TrendingUp 
                  },
                  { 
                    metric: '100%', 
                    label: language === 'fr' ? 'IA-First' : language === 'en' ? 'AI-First' : 'IA-Primero',
                    icon: Brain 
                  },
                  { 
                    metric: '3', 
                    label: language === 'fr' ? 'Langues Supportées' : language === 'en' ? 'Supported Languages' : 'Idiomas Soportados',
                    icon: Zap 
                  }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white font-['Montserrat']">
                        {stat.metric}
                      </div>
                      <p className="text-white/60 font-['Montserrat']">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </main>

      <Footer />

      {/* Admin Panel */}
      <AdminControlPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)} 
      />
    </div>
  );
};

export default SystemeComplet;
