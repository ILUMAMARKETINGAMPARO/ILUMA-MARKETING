import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, X, Menu, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import SecretShipButton from '@/components/common/SecretShipButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/hooks/useTranslations';

const NavbarIlumaUltimate: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, profile, signOut } = useAuth();
  const { t } = useTranslations();
  
  // Référence pour gérer les timeouts des dropdowns
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const DROPDOWN_DELAY = 300; // 300ms de délai avant fermeture

  // Navbar toujours stable - pas de changement selon la page
  useEffect(() => {
    setIsCollapsed(false); // Toujours en mode normal par défaut
  }, []);

  // Données des menus avec liens fonctionnels et traductions
  const menuItems = [
    { 
      label: t('nav.methode'), 
      path: '/methode-iluma'
    },
    { 
      label: t('nav.products'), 
      path: '/services',
      subItems: [
        { label: t('nav.websiteComplete'), path: '/site-web-complet' },
        { label: t('nav.landingPages'), path: '/landing-page-intelligente' },
        { label: t('nav.loyaltyPage'), path: '/page-fidelisation-intelligente' }
      ]
    },
    { 
      label: t('nav.solutions'), 
      path: '/presentation-outils',
      subItems: [
        { label: t('nav.ilumatch'), path: '/ilumatch' },
        { label: t('nav.adluma'), path: '/adluma' },
        { label: t('nav.blogia'), path: '/blogia' },
        { label: t('nav.rivalviews'), path: '/rival-views' },
        { label: t('nav.ila'), path: '/ila' }
      ]
    },
    { 
      label: t('nav.services'), 
      path: '/services',
      subItems: [
        { label: t('nav.seoGoogle'), path: '/services/seo-ia' },
        { label: t('nav.seoBing'), path: '/services/bing-seo' },
        { label: t('nav.googleAds'), path: '/services/google-ads' },
        { label: t('nav.metaAds'), path: '/services/meta-ads' },
        { label: t('nav.contentCreation'), path: '/services/blogs-intersites' },
        { label: t('nav.partnership'), path: '/services/partenariat-poche-bleue' }
      ]
    },
    { 
      label: t('nav.howItWorks'), 
      path: '/presentation-outils',
      subItems: [
        { label: t('nav.toolsPresentation'), path: '/hub' }
      ]
    },
    { 
      label: t('nav.contact'), 
      path: '/contact',
      subItems: [
        { label: t('nav.contactForm'), path: '/contact' },
        { label: t('nav.caseStudies'), path: '/etudes-de-cas' },
        { label: t('nav.portfolio'), path: '/portfolio' },
        { label: t('nav.faq'), path: '/faq' }
      ]
    }
  ];

  // Fonctions pour gérer les dropdowns avec délai
  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, DROPDOWN_DELAY);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, DROPDOWN_DELAY);
  };

  // Nettoyer le timeout lors du démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Version Mobile
  if (isMobile) {
    return (
      <>
        {/* Header Mobile Compact */}
        <div className="fixed top-4 left-4 right-4 z-50 animate-fade-in">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-iluma-purple-500/30 to-iluma-gold-500/30 blur-lg animate-pulse rounded-xl"></div>
            <div className="relative bg-black/95 backdrop-blur-xl border border-iluma-purple-500/50 rounded-xl p-4 flex items-center justify-between">
              {/* Logo Mobile */}
              <Link to="/" className="flex items-center space-x-2">
                <Rocket className="w-6 h-6 text-iluma-gold-500" />
                <h1 className="text-lg font-bold bg-gradient-to-r from-iluma-gold-500 to-iluma-purple-500 bg-clip-text text-transparent font-['Montserrat']">
                  Iluma™
                </h1>
              </Link>
              
              {/* Menu Burger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-iluma-purple-500/20 border border-iluma-purple-500/30 text-white hover:bg-iluma-purple-500/30 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Full Screen */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl animate-fade-in">
            <div className="pt-20 pb-8 px-4 h-full overflow-y-auto">
              <div className="max-w-sm mx-auto space-y-6">
                {menuItems.map((item) => (
                  <div key={item.label} className="space-y-3">
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-xl font-semibold transition-all duration-300 font-['Montserrat'] ${
                        location.pathname === item.path ? 'text-iluma-gold-500' : 'text-white hover:text-iluma-gold-500'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.subItems && (
                      <div className="ml-4 space-y-2">
                        {item.subItems.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-sm text-white/70 hover:text-iluma-gold-400 transition-all duration-300 font-['Montserrat']"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* CTA Mobile */}
                <div className="pt-8 space-y-4">
                  <LanguageSelector />
                  <Link to="/contact">
                    <Button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full bg-gradient-to-r from-iluma-gold-500 to-iluma-purple-500 hover:from-iluma-purple-500 hover:to-iluma-gold-500 text-white py-3 text-lg font-semibold font-['Montserrat']"
                    >
                      Réserver Démo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <SecretShipButton />
      </>
    );
  }

  // Version Desktop avec collapse complet
  return (
    <>
      <div className="fixed top-6 left-6 z-50 animate-fade-in-right">
        <div className="relative">
          {/* Halo galactique moderne */}
          <div className="absolute -inset-2 bg-gradient-to-r from-iluma-purple-500/30 to-iluma-gold-500/30 blur-xl animate-pulse rounded-2xl"></div>
          
          {isCollapsed ? (
            /* Rectangle réduit cliquable */
            <button
              onClick={() => setIsCollapsed(false)}
              className="relative bg-black/90 backdrop-blur-xl shadow-2xl border border-iluma-purple-500/50 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ease-in-out hover:border-iluma-gold-500/70 group"
              title="Agrandir la navigation"
            >
              <div className="relative">
                <Rocket className="w-6 h-6 text-iluma-gold-500 group-hover:text-iluma-purple-500 transition-all duration-500" />
                <div className="absolute inset-0 w-6 h-6 bg-iluma-gold-500/20 rounded-full blur-sm group-hover:bg-iluma-purple-500/30 transition-all duration-300 animate-pulse"></div>
              </div>
            </button>
          ) : (
            /* Navigation complète */
            <div className="relative bg-black/90 backdrop-blur-xl shadow-2xl border border-iluma-purple-500/50 w-[280px] rounded-2xl p-6 space-y-4 transition-all duration-500 ease-in-out hover:border-iluma-gold-500/70 group">
              {/* Bouton Réduire en haut à droite */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-lg bg-iluma-purple-500/20 border border-iluma-purple-500/30 text-white/70 hover:text-white hover:bg-iluma-purple-500/30 transition-all duration-300 text-xs font-bold"
                title="Réduire la navigation"
              >
                −
              </button>
              
              {/* 🚀 Logo Iluma */}
              <Link 
                to="/" 
                className="flex items-center space-x-3 cursor-pointer group"
              > 
                <div className="relative">
                  <Rocket className="w-8 h-8 text-iluma-gold-500 group-hover:text-iluma-purple-500 transition-all duration-500" />
                  <div className="absolute inset-0 w-8 h-8 bg-iluma-gold-500/20 rounded-full blur-sm group-hover:bg-iluma-purple-500/30 transition-all duration-300 animate-pulse"></div>
                </div>
                <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-iluma-gold-500 to-iluma-purple-500 tracking-wide font-['Montserrat'] hover:animate-pulse">
                  Iluma™
                </h1>
              </Link>

              {/* 🌌 Navigation principale */}
              <nav className="flex flex-col space-y-3 text-sm font-semibold text-white">
                {menuItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link 
                      to={item.path}
                      className={`hover:text-iluma-gold-500 transition-all duration-300 tracking-wide uppercase font-['Montserrat'] text-xs flex items-center justify-between ${
                        location.pathname === item.path ? 'text-iluma-gold-500' : ''
                      }`}
                    >
                      {item.label}
                      {item.subItems && <span className="text-xs opacity-60">▶</span>}
                    </Link>

                    {/* Sous-menu dynamique avec liens fonctionnels - FOND SOLIDE GARANTI */}
                    {activeMenu === item.label && item.subItems && (
                      <div 
                        className="absolute left-full top-0 ml-4 bg-black/98 backdrop-blur-xl rounded-xl p-4 w-[320px] shadow-2xl border border-iluma-purple-500/50 transition-all duration-300 ease-out animate-zoom-in z-50"
                        style={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.98)',
                          backdropFilter: 'blur(20px)',
                          zIndex: 9999
                        }}
                          onMouseEnter={handleDropdownMouseEnter}
                          onMouseLeave={handleDropdownMouseLeave}
                        >
                        {/* Gradient overlay pour plus de solidité */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-purple-900/20 to-black/95 rounded-xl"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs text-iluma-purple-400 font-semibold font-['Montserrat'] uppercase tracking-wider">
                              {item.label}
                            </h3>
                            <button 
                              onClick={() => setActiveMenu(null)}
                              className="text-white/50 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <ul className="space-y-3">
                            {item.subItems.map((subItem, index) => (
                              <li key={index}>
                                <Link
                                  to={subItem.path}
                                  className={`block text-sm text-gray-200 hover:text-iluma-gold-400 hover:translate-x-2 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-iluma-purple-500/20 hover:to-iluma-gold-500/10 font-['Montserrat'] border border-transparent hover:border-iluma-purple-500/30 ${
                                    location.pathname === subItem.path ? 'text-iluma-gold-400 bg-gradient-to-r from-iluma-gold-500/10 to-iluma-purple-500/10 border-iluma-gold-500/30' : ''
                                  }`}
                                  onClick={() => setActiveMenu(null)}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gradient-to-r from-iluma-purple-400 to-iluma-gold-400 rounded-full opacity-60"></div>
                                    {subItem.label}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* 🌐 Auth Status */}
              {user && profile && (
                <div className="py-3 px-3 rounded-lg bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-[hsl(var(--primary))]" />
                    <span className="text-xs text-white font-['Montserrat']">
                      {profile.display_name || profile.first_name}
                    </span>
                    <span className="text-xs text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/20 px-2 py-1 rounded-full">
                      {profile.role}
                    </span>
                  </div>
                  <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <LogOut className="w-3 h-3 mr-1" />
                    Déconnexion
                  </Button>
                </div>
              )}

              {/* 🌐 Langues + CTA */}
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-iluma-purple-500/30">
                <LanguageSelector />
                {user ? (
                  <Link to="/crm-iluma">
                    <Button className="bg-gradient-to-r from-iluma-gold-500 to-iluma-purple-500 hover:from-iluma-purple-500 hover:to-iluma-gold-500 text-white px-3 py-2 rounded-full font-semibold text-xs hover:scale-105 transition-all duration-300 font-['Montserrat'] shadow-lg">
                      CRM Iluma
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-iluma-gold-500 to-iluma-purple-500 hover:from-iluma-purple-500 hover:to-iluma-gold-500 text-white px-3 py-2 rounded-full font-semibold text-xs hover:scale-105 transition-all duration-300 font-['Montserrat'] shadow-lg">
                      Connexion
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Secret Ship Button Integration */}
      <SecretShipButton />
    </>
  );
};

export default NavbarIlumaUltimate;