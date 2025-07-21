import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationItem } from './NavigationItems';
import NavigationDropdown from './NavigationDropdown';

interface DesktopNavigationProps {
  items: NavigationItem[];
  activeDropdown: string | null;
  onDropdownToggle: (itemName: string) => void;
  onCloseDropdowns: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  items,
  activeDropdown,
  onDropdownToggle,
  onCloseDropdowns
}) => {
  const location = useLocation();

  return (
    <div className="hidden lg:flex items-center space-x-2">
      {items.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <div key={item.name} className="relative">
            {item.hasDropdown ? (
              <button
                onClick={() => onDropdownToggle(item.name)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out rounded-xl group relative overflow-hidden font-['Montserrat'] ${
                  isActive || activeDropdown === item.name
                    ? 'text-[#FFD56B] bg-[#FFD56B]/10 shadow-lg'
                    : 'text-white/80 hover:text-[#8E44FF] hover:bg-[#8E44FF]/10'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.name}</span>
                <div className={`absolute inset-0 bg-gradient-to-r from-[#8E44FF]/0 to-[#8E44FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm`}></div>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] transform origin-left transition-transform duration-300 ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </button>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out rounded-xl group relative overflow-hidden font-['Montserrat'] ${
                  isActive
                    ? 'text-[#FFD56B] bg-[#FFD56B]/10 shadow-lg'
                    : 'text-white/80 hover:text-[#8E44FF] hover:bg-[#8E44FF]/10'
                }`}
                onClick={onCloseDropdowns}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.name}</span>
                <div className={`absolute inset-0 bg-gradient-to-r from-[#8E44FF]/0 to-[#8E44FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm`}></div>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FFD56B] to-[#8E44FF] transform origin-left transition-transform duration-300 ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>
            )}
            
            {item.hasDropdown && activeDropdown === item.name && (
              <NavigationDropdown
                item={item}
                isActive={isActive}
                onClose={onCloseDropdowns}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DesktopNavigation;