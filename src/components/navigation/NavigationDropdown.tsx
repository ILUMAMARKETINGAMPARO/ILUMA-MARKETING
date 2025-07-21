import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationItem } from './NavigationItems';

interface NavigationDropdownProps {
  item: NavigationItem;
  isActive: boolean;
  onClose: () => void;
}

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({ item, isActive, onClose }) => {
  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-[#0B0B0E]/98 backdrop-blur-xl border border-[#8E44FF]/30 rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
      <div className="absolute -top-2 left-6 w-4 h-4 bg-[#0B0B0E] border-l border-t border-[#8E44FF]/30 transform rotate-45"></div>
      {item.dropdownItems?.map((dropdownItem, index) => (
        <Link
          key={dropdownItem.name}
          to={dropdownItem.path}
          className="flex items-center space-x-3 px-4 py-3 text-sm text-white/80 hover:text-[#8E44FF] hover:bg-[#8E44FF]/10 transition-all duration-300 ease-in-out font-['Montserrat'] relative group"
          onClick={onClose}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {dropdownItem.icon && <dropdownItem.icon className="w-4 h-4" />}
          <div className="w-2 h-2 bg-[#FFD56B]/60 rounded-full group-hover:bg-[#8E44FF] transition-colors duration-300"></div>
          <span>{dropdownItem.name}</span>
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#FFD56B] to-[#8E44FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      ))}
    </div>
  );
};

export default NavigationDropdown;