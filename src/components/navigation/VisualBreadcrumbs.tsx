import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const VisualBreadcrumbs: React.FC = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', href: '/' }
    ];
    
    const routeLabels: Record<string, string> = {
      'adluma': 'ADLUMA™ Simulator',
      'ila': 'ILA™ Score',
      'services': 'Services',
      'contact': 'Contact',
      'blog': 'Blog',
      'ilumatch': 'ILUMATCH™',
      'crm': 'CRM Iluma™',
      'team': 'Équipe',
      'about': 'À propos',
      'legal': 'Mentions légales',
      'privacy': 'Confidentialité'
    };
    
    let currentPath = '';
    pathnames.forEach((pathname) => {
      currentPath += `/${pathname}`;
      const label = routeLabels[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
      breadcrumbs.push({ label, href: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  // Ne pas afficher si on est sur la page d'accueil
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav 
      aria-label="Fil d'Ariane" 
      className="bg-black/20 backdrop-blur-sm border-b border-[#8E44FF]/20 py-3 px-4 sticky top-0 z-40"
    >
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight 
                  className="w-4 h-4 text-white/40 mx-2" 
                  aria-hidden="true"
                />
              )}
              
              {index === 0 ? (
                <Link
                  to={breadcrumb.href}
                  className="flex items-center text-white/60 hover:text-[#F5D06F] transition-colors duration-200"
                  aria-label="Retour à l'accueil"
                >
                  <Home className="w-4 h-4 mr-1" />
                  <span className="sr-only md:not-sr-only">{breadcrumb.label}</span>
                </Link>
              ) : index === breadcrumbs.length - 1 ? (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[#F5D06F] font-medium font-['Montserrat']"
                  aria-current="page"
                >
                  {breadcrumb.label}
                </motion.span>
              ) : (
                <Link
                  to={breadcrumb.href}
                  className="text-white/60 hover:text-[#8E44FF] transition-colors duration-200 font-['Montserrat']"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default VisualBreadcrumbs;