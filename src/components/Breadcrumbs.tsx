import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { StructuredData } from './StructuredData';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": t('breadcrumbs.home'),
      "item": "https://ilumamarketing.com/"
    },
    ...pathnames.map((pathname, index) => ({
      "@type": "ListItem",
      "position": index + 2,
      "name": t(`breadcrumbs.${pathname}`) || pathname.charAt(0).toUpperCase() + pathname.slice(1),
      "item": `https://ilumamarketing.com/${pathnames.slice(0, index + 1).join('/')}`
    }))
  ];

  return (
    <>
      <StructuredData type="BreadcrumbList" data={breadcrumbItems} />
      <nav aria-label="Breadcrumb" className="py-4 px-6">
        <ol className="flex items-center space-x-2 text-sm text-white/70">
          <li>
            <Link 
              to="/" 
              className="flex items-center hover:text-[#8E44FF] transition-colors"
              aria-label={t('breadcrumbs.home')}
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">{t('breadcrumbs.home')}</span>
            </Link>
          </li>
          
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const breadcrumbName = t(`breadcrumbs.${pathname}`) || pathname.charAt(0).toUpperCase() + pathname.slice(1);
            
            return (
              <li key={pathname} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-2 text-white/40" />
                {isLast ? (
                  <span 
                    className="text-[#FFD56B] font-medium"
                    aria-current="page"
                  >
                    {breadcrumbName}
                  </span>
                ) : (
                  <Link 
                    to={routeTo}
                    className="hover:text-[#8E44FF] transition-colors"
                  >
                    {breadcrumbName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};