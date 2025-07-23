import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Calculator, Brain, Zap, Target, Globe, Star, PenTool, Bot, Users, BarChart3, Shield, Settings, Network, Award, Monitor } from 'lucide-react';
import LegalFooter from './LegalFooter';
import { useLanguage } from '@/hooks/useLanguage.ts';

interface FooterTool {
  name?: string;
  nameKey?: string;
  path: string;
  icon: any;
}

const Footer = () => {
  const { t } = useLanguage();

  // 4-Cluster Navigation Structure with multilingual names
  const visibilityTools = [
    { nameKey: 'hubServices.tools.adluma.name', path: '/adluma', icon: Calculator },
    { nameKey: 'hubServices.tools.ila.name', path: '/ila', icon: Brain },
    { nameKey: 'hubServices.tools.seo.name', path: '/services/seo-ia', icon: Zap },
    { name: t('footer.tools.localVisibility'), path: '/services/visibilite-locale', icon: Target }
  ];

  const conversionTools = [
    { nameKey: 'hubServices.tools.landing.name', path: '/landing-page-intelligente', icon: Globe },
    { name: t('footer.tools.completeWebsite'), path: '/site-web-complet', icon: Monitor },
    { name: t('footer.tools.aiFidelization'), path: '/page-fidelisation-intelligente', icon: Star },
    { nameKey: 'hubServices.tools.blogia.name', path: '/blogia', icon: PenTool },
    { name: t('footer.brandNames.liloAssistant'), path: '/lilo', icon: Bot }
  ];

  const partnershipTools = [
    { name: t('footer.brandNames.ilumatch'), path: '/ilumatch', icon: Target },
    { name: t('footer.tools.ecommerce'), path: '/services/ecommerce', icon: Globe },
    { name: t('footer.tools.caseStudies'), path: '/etudes-de-cas', icon: Award }
  ];

  const managementTools = [
    { nameKey: 'hubServices.tools.crm.name', path: '/crm-iluma', icon: Users },
    { name: t('footer.tools.analytics'), path: '/tableau-analytics', icon: BarChart3 },
    { name: t('footer.tools.advancedDashboard'), path: '/dashboard-avance', icon: Shield }
  ];

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('footer.quickLinks.hubCentral'), path: '/hub' },
    { name: t('footer.quickLinks.ilumaMethod'), path: '/methode-iluma' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <footer className="bg-gradient-to-b from-black via-primary/5 to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo et mission */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Rocket className="w-10 h-10 text-accent group-hover:text-primary transition-colors duration-300" />
                <div className="absolute inset-0 w-10 h-10 bg-accent/20 rounded-full blur-md group-hover:bg-primary/30 transition-all duration-300 animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold text-gradient font-['Montserrat']">
                Iluma™
              </span>
            </Link>
            <p className="text-white/80 text-base leading-relaxed font-['Montserrat']">
              {t('footer.mission')}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover-glow transition-all duration-300">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover-glow transition-all duration-300">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover-glow transition-all duration-300">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover-glow transition-all duration-300">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* 1. Visibilité */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4 font-['Montserrat'] flex items-center">
              <Zap className="w-5 h-5 mr-2 text-accent" />
              🎯 {t('footer.categories.visibility')}
            </h3>
            <ul className="space-y-2">
              {visibilityTools.map((tool) => (
                <li key={tool.path}>
                  <Link
                    to={tool.path}
                    className="flex items-center text-white/70 hover:text-accent transition-all duration-300 font-['Montserrat'] text-sm group"
                  >
                    <tool.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                     {(tool as FooterTool).nameKey ? t((tool as FooterTool).nameKey!) : (tool as FooterTool).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Conversion */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4 font-['Montserrat'] flex items-center">
              <Target className="w-5 h-5 mr-2 text-accent" />
              💡 {t('footer.categories.conversion')}
            </h3>
            <ul className="space-y-2">
              {conversionTools.map((tool) => (
                <li key={tool.path}>
                  <Link
                    to={tool.path}
                    className="flex items-center text-white/70 hover:text-accent transition-all duration-300 font-['Montserrat'] text-sm group"
                  >
                    <tool.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                     {(tool as FooterTool).nameKey ? t((tool as FooterTool).nameKey!) : (tool as FooterTool).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Partenariats */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4 font-['Montserrat'] flex items-center">
              <Network className="w-5 h-5 mr-2 text-accent" />
              🤝 {t('footer.categories.partnerships')}
            </h3>
            <ul className="space-y-2">
              {partnershipTools.map((tool) => (
                <li key={tool.path}>
                  <Link
                    to={tool.path}
                    className="flex items-center text-white/70 hover:text-accent transition-all duration-300 font-['Montserrat'] text-sm group"
                  >
                    <tool.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                     {(tool as FooterTool).nameKey ? t((tool as FooterTool).nameKey!) : (tool as FooterTool).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Gestion */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4 font-['Montserrat'] flex items-center">
              <Settings className="w-5 h-5 mr-2 text-accent" />
              ⚙️ {t('footer.categories.management')}
            </h3>
            <ul className="space-y-2">
              {managementTools.map((tool) => (
                <li key={tool.path}>
                  <Link
                    to={tool.path}
                    className="flex items-center text-white/70 hover:text-accent transition-all duration-300 font-['Montserrat'] text-sm group"
                  >
                    <tool.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    {(tool as FooterTool).nameKey ? t((tool as FooterTool).nameKey!) : (tool as FooterTool).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Section légale intégrée */}
      <LegalFooter />
    </footer>
  );
};

export default Footer;