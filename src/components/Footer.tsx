import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Calculator, Brain, Zap, Target, Globe, Star, PenTool, Bot, Users, BarChart3, Shield, Settings, Network, Award, Monitor } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import LegalFooter from './LegalFooter';

interface FooterTool {
  name: string;
  path: string;
  icon: any;
}

const Footer = () => {
  const { t } = useTranslations();

  // 4-Cluster Navigation Structure
  const visibilityTools = [
    { name: t('footer.tools.adluma'), path: '/adluma', icon: Calculator },
    { name: t('footer.tools.ila'), path: '/ila', icon: Brain },
    { name: t('footer.tools.seoAi'), path: '/services/seo-ia', icon: Zap },
    { name: t('footer.tools.localVisibility'), path: '/services/visibilite-locale', icon: Target }
  ];

  const conversionTools = [
    { name: t('footer.tools.landingPages'), path: '/landing-page-intelligente', icon: Globe },
    { name: t('footer.tools.fullWebsite'), path: '/site-web-complet', icon: Monitor },
    { name: t('footer.tools.loyaltyPages'), path: '/page-fidelisation-intelligente', icon: Star },
    { name: t('footer.tools.blogAi'), path: '/blogia', icon: PenTool },
    { name: t('footer.tools.lilo'), path: '/lilo', icon: Bot }
  ];

  const partnershipTools = [
    { name: t('footer.tools.ilumatch'), path: '/ilumatch', icon: Target },
    { name: t('footer.tools.ecommerce'), path: '/services/ecommerce', icon: Globe },
    { name: t('footer.tools.caseStudies'), path: '/etudes-de-cas', icon: Award }
  ];

  const managementTools = [
    { name: t('footer.tools.crm'), path: '/crm-iluma', icon: Users },
    { name: t('footer.tools.analytics'), path: '/tableau-analytics', icon: BarChart3 },
    { name: t('footer.tools.dashboard'), path: '/dashboard-avance', icon: Shield }
  ];

  const quickLinks = [
    { name: t('footer.quickLinks.home'), path: '/' },
    { name: t('footer.quickLinks.hub'), path: '/hub' },
    { name: t('nav.methode'), path: '/methode-iluma' },
    { name: t('footer.quickLinks.contact'), path: '/contact' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-primary/5 to-black border-t border-white/10 overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Logo et mission - Amélioré */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 w-12 h-12 bg-accent/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              </div>
              <div>
                <span className="text-3xl font-bold text-gradient font-['Montserrat']">
                  Iluma™
                </span>
                <div className="text-xs text-accent font-semibold tracking-wider">
                  {t('footer.company.tagline')}
                </div>
              </div>
            </Link>
            
            <p className="text-white/80 text-base leading-relaxed font-['Montserrat'] max-w-sm">
              {t('footer.company.description')}
            </p>
            
            <div className="space-y-4">
              <div className="text-sm font-semibold text-accent uppercase tracking-wider">
                {t('footer.company.followUs')}
              </div>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover-glow transition-all duration-300 group">
                  <Facebook className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover-glow transition-all duration-300 group">
                  <Twitter className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover-glow transition-all duration-300 group">
                  <Instagram className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover-glow transition-all duration-300 group">
                  <Linkedin className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* 1. Visibilité - Design amélioré */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg font-['Montserrat']">
                {t('footer.sections.visibility')}
              </h3>
            </div>
            <ul className="space-y-3">
              {visibilityTools.map((tool, index) => (
                <li key={tool.path} className="group">
                  <Link
                    to={tool.path}
                    className="flex items-center text-white/70 hover:text-accent transition-all duration-300 font-['Montserrat'] text-sm p-2 rounded-lg hover:bg-white/5"
                  >
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <tool.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {tool.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Conversion - Design amélioré */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg font-['Montserrat']">
                {t('footer.sections.conversion')}
              </h3>
            </div>
            <ul className="space-y-3">
              {conversionTools.map((tool, index) => (
                <li key={tool.path} className="group">
                  <Link
                    to={tool.path}
                    className="flex items-center text-white/70 hover:text-accent transition-all duration-300 font-['Montserrat'] text-sm p-2 rounded-lg hover:bg-white/5"
                  >
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <tool.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {tool.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Partenariats - Design amélioré */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center">
                <Network className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg font-['Montserrat']">
                {t('footer.sections.partnerships')}
              </h3>
            </div>
            <ul className="space-y-3">
              {partnershipTools.map((tool, index) => (
                <li key={tool.path} className="group">
                  <Link
                    to={tool.path}
                    className="flex items-center text-white/70 hover:text-accent transition-all duration-300 font-['Montserrat'] text-sm p-2 rounded-lg hover:bg-white/5"
                  >
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <tool.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {tool.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Gestion - Design amélioré */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-secondary rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg font-['Montserrat']">
                {t('footer.sections.management')}
              </h3>
            </div>
            <ul className="space-y-3">
              {managementTools.map((tool, index) => (
                <li key={tool.path} className="group">
                  <Link
                    to={tool.path}
                    className="flex items-center text-white/70 hover:text-accent transition-all duration-300 font-['Montserrat'] text-sm p-2 rounded-lg hover:bg-white/5"
                  >
                    <div className="w-6 h-6 mr-3 flex items-center justify-center">
                      <tool.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {tool.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Section de contact et informations supplémentaires */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg font-['Montserrat'] flex items-center">
                <Mail className="w-5 h-5 mr-2 text-accent" />
                {t('footer.contact.title')}
              </h4>
              <div className="space-y-3 text-white/70 text-sm">
                <div className="flex items-start">
                  <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <a 
                      href="mailto:administracion@ilumamarketing.com"
                      className="block text-wrap break-all leading-tight hover:text-primary transition-colors duration-200 underline decoration-1 underline-offset-2"
                    >
                      administracion@ilumamarketing.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
                  <a 
                    href="tel:+15148828910"
                    className="hover:text-primary transition-colors duration-200 underline decoration-1 underline-offset-2"
                  >
                    +1 (514) 882-8910
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <a 
                      href="https://maps.google.com/?q=12090+Bd+Sainte-Gertrude,+Montréal,+QC+H1G+5R2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-wrap break-words leading-tight hover:text-primary transition-colors duration-200 underline decoration-1 underline-offset-2"
                    >
                      12090 Bd Sainte-Gertrude, Montréal, QC H1G 5R2
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg font-['Montserrat']">
                {t('footer.quickLinks.title')}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="text-white/70 hover:text-accent transition-colors text-sm font-['Montserrat']"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg font-['Montserrat']">
                {t('footer.newsletter.title')}
              </h4>
              <p className="text-white/70 text-sm font-['Montserrat']">
                {t('footer.newsletter.description')}
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-accent to-primary rounded-lg text-white text-sm font-semibold hover:scale-105 transition-transform">
                  {t('footer.newsletter.subscribe')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section légale intégrée */}
      <LegalFooter />
    </footer>
  );
};

export default Footer;
