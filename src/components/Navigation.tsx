import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Rocket, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslations } from '@/hooks/useTranslations';
import MobileNavigation from './navigation/MobileNavigation';
import OrbitalDropdown from './navigation/OrbitalDropdown';
import GridDropdown from './navigation/GridDropdown';
import VerticalDropdown from './navigation/VerticalDropdown';
import { getNavigationItems } from './navigation/NavigationItems';
import PopupLiloPromo from './PopupLiloPromo';
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const { t } = useTranslations();
  const navItems = getNavigationItems(t);
  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };
  const closeDropdowns = () => {
    setActiveDropdown(null);
  };
  const renderDropdown = (item: any) => {
    switch (item.style) {
      case 'orbital':
        return <OrbitalDropdown item={item} onClose={closeDropdowns} />;
      case 'grid':
        return <GridDropdown item={item} onClose={closeDropdowns} />;
      case 'vertical':
        return <VerticalDropdown item={item} onClose={closeDropdowns} />;
      default:
        return <VerticalDropdown item={item} onClose={closeDropdowns} />;
    }
  };
  return <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/30 backdrop-blur-md rounded-full shadow-2xl border border-white/10" role="navigation" aria-label="Menu principal">
      <div className="flex items-center justify-center h-12 px-6">
        {/* Logo centré avec halo doré animé */}
        <Link to="/" className="flex items-center space-x-2 group transition-all duration-200 hover:scale-105" onClick={closeDropdowns}>
          <div className="relative">
            <Rocket className="w-6 h-6 text-[#FFD56B] group-hover:text-[#8E44FF] transition-colors duration-300" />
            <div className="absolute inset-0 w-6 h-6 bg-[#FFD56B]/20 rounded-full blur-sm group-hover:bg-[#8E44FF]/30 transition-all duration-300 animate-pulse"></div>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] bg-clip-text text-transparent font-['Montserrat'] hidden sm:block"> Iluma™</span>
        </Link>

        {/* Navigation desktop - alignée à droite du logo */}
        <div className="hidden lg:flex items-center space-x-5 ml-8">
          {navItems.map(item => {
          const IconComponent = item.icon;
          const isActive = activeDropdown === item.name;
          return <div key={item.name} className="relative">
                {item.hasDropdown ? <button onClick={() => handleDropdownToggle(item.name)} className={`flex items-center space-x-2 text-sm font-medium transition-all duration-200 hover:scale-105 font-['Montserrat'] px-3 py-2 rounded-lg ${isActive ? 'text-[#FFD56B] bg-[#FFD56B]/10' : 'text-white/70 hover:text-white/100 hover:bg-white/5'}`}>
                    <span>{item.name}</span>
                  </button> : <Link to={item.path} className="text-sm font-medium text-white/70 hover:text-white/100 transition-all duration-200 hover:scale-105 font-['Montserrat'] px-3 py-2 rounded-lg hover:bg-white/5" onClick={closeDropdowns}>
                    {item.name}
                  </Link>}
                
                {item.hasDropdown && activeDropdown === item.name && renderDropdown(item)}
              </div>;
        })}
          
          {/* Language Selector */}
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4 text-white/50" />
            <LanguageSelector />
          </div>
          
          {/* Bouton Cadeau Promotion */}
          <Button 
            size="sm" 
            onClick={() => setIsPromoOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white font-semibold px-3 py-2 rounded-full text-xs transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 font-['Montserrat'] group relative overflow-hidden"
          >
            <Rocket className="w-3 h-3 mr-1 group-hover:animate-bounce" />
            Offre Spéciale
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse"></div>
          </Button>
          
          {/* CTA Contact - Capsule avec halo d'impulsion */}
          <Link to="/contact" onClick={closeDropdowns}>
            <Button size="sm" className="bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] hover:from-[#8E44FF] hover:to-[#FFD56B] text-black font-semibold px-4 py-2 rounded-full text-xs transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#FFD56B]/25 font-['Montserrat'] group relative overflow-hidden">
              <Phone className="w-3 h-3 mr-1 group-hover:animate-pulse" />
              Planifier Démo
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse"></div>
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2 ml-4">
          <LanguageSelector />
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-white/10 hover:text-[#8E44FF] transition-all duration-200 rounded-full p-2">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
          <MobileNavigation items={navItems} isOpen={isOpen} activeDropdown={activeDropdown} onDropdownToggle={handleDropdownToggle} onClose={() => setIsOpen(false)} />
        </div>}
      
      {/* Popup de promotion */}
      <PopupLiloPromo isOpen={isPromoOpen} onClose={() => setIsPromoOpen(false)} />
    </nav>;
};
export default Navigation;