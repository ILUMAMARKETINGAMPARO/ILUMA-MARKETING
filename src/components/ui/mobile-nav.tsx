import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage.ts';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  navigationItems: Array<{
    name: string;
    href: string;
    children?: Array<{ name: string; href: string; }>;
  }>;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onToggle, navigationItems }) => {
  const { t } = useLanguage();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (itemName: string) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="md:hidden text-white hover:bg-white/10 p-2"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={onToggle}
              aria-hidden="true"
            />
            
            {/* Navigation panel */}
            <motion.nav
              id="mobile-navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0B0B0E]/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden"
              role="navigation"
              aria-label="Navigation mobile"
            >
              <div className="p-6 pt-20 h-full overflow-y-auto">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="absolute top-4 right-4 text-white hover:bg-white/10 p-2"
                  aria-label="Fermer le menu de navigation"
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Navigation items */}
                <ul className="space-y-4" role="list">
                  {navigationItems.map((item) => (
                    <li key={item.name} role="listitem">
                      {item.children ? (
                        // Item with submenu
                        <div>
                          <button
                            onClick={() => handleSubmenuToggle(item.name)}
                            className="flex items-center justify-between w-full text-left text-white hover:text-primary transition-colors py-2 font-['Montserrat']"
                            aria-expanded={openSubmenu === item.name}
                            aria-controls={`submenu-${item.name}`}
                          >
                            <span>{item.name}</span>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${
                                openSubmenu === item.name ? 'rotate-180' : ''
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                          
                          <AnimatePresence>
                            {openSubmenu === item.name && (
                              <motion.ul
                                id={`submenu-${item.name}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 mt-2 space-y-2 overflow-hidden"
                                role="list"
                              >
                                {item.children.map((child) => (
                                  <li key={child.name} role="listitem">
                                    <a
                                      href={child.href}
                                      onClick={onToggle}
                                      className="block text-white/80 hover:text-primary transition-colors py-1 font-['Montserrat'] text-sm"
                                    >
                                      {child.name}
                                    </a>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        // Simple item
                        <a
                          href={item.href}
                          onClick={onToggle}
                          className="block text-white hover:text-primary transition-colors py-2 font-['Montserrat']"
                        >
                          {item.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                {/* CTA Button in mobile */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent text-black font-semibold hover-glow font-['Montserrat']"
                    onClick={onToggle}
                    asChild
                  >
                    <a href="/contact">
                      Consultation Gratuite
                    </a>
                  </Button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;