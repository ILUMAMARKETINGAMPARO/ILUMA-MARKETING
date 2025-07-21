import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationItem } from './NavigationItems';

interface MobileNavigationProps {
  items: NavigationItem[];
  isOpen: boolean;
  activeDropdown: string | null;
  onDropdownToggle: (itemName: string) => void;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  isOpen,
  activeDropdown,
  onDropdownToggle,
  onClose
}) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-t border-[#8E44FF]/20 mt-2">
      <div className="px-2 pt-4 pb-6 space-y-2 bg-[#0B0B0E]/95 backdrop-blur-xl rounded-b-xl animate-slide-in">
        {items.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <div key={item.name}>
              {item.hasDropdown ? (
                <button
                  onClick={() => onDropdownToggle(item.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-base font-medium transition-all duration-300 ease-in-out rounded-xl font-['Montserrat'] ${
                    isActive || activeDropdown === item.name
                      ? 'text-[#FFD56B] bg-[#FFD56B]/10'
                      : 'text-white/80 hover:text-[#8E44FF] hover:bg-[#8E44FF]/10'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-all duration-300 ease-in-out rounded-xl font-['Montserrat'] ${
                    isActive
                      ? 'text-[#FFD56B] bg-[#FFD56B]/10'
                      : 'text-white/80 hover:text-[#8E44FF] hover:bg-[#8E44FF]/10'
                  }`}
                  onClick={onClose}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )}
              
              {item.hasDropdown && activeDropdown === item.name && (
                <div className="ml-6 mt-2 space-y-1 animate-fade-in">
                  {item.dropdownItems?.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.path}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-white/70 hover:text-[#8E44FF] hover:bg-[#8E44FF]/10 transition-all duration-300 ease-in-out rounded-lg font-['Montserrat']"
                      onClick={onClose}
                    >
                      <div className="w-2 h-2 bg-[#FFD56B]/60 rounded-full"></div>
                      <span>{dropdownItem.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;