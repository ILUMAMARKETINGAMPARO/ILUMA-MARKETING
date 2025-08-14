import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavigationItem } from './NavigationItems';

interface VerticalDropdownProps {
  item: NavigationItem;
  onClose: () => void;
}

const VerticalDropdown: React.FC<VerticalDropdownProps> = ({ item, onClose }) => {
  return (
    <motion.div
      className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-xl border border-[#8E44FF]/40 rounded-xl shadow-2xl py-2 z-[200]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="absolute -top-2 left-6 w-4 h-4 bg-black border-l border-t border-[#8E44FF]/40 transform rotate-45"></div>
      
      {item.dropdownItems?.map((dropdownItem, index) => {
        const IconComponent = dropdownItem.icon;
        
        return (
          <motion.div
            key={dropdownItem.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              to={dropdownItem.path}
              onClick={onClose}
              className="group flex items-center space-x-3 px-4 py-3 text-sm text-white/80 hover:text-[#FFD56B] hover:bg-[#8E44FF]/10 transition-all duration-300 font-['Montserrat'] relative"
            >
              {IconComponent && (
                <div className="w-8 h-8 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-lg flex items-center justify-center group-hover:from-[#8E44FF]/30 group-hover:to-[#FFD56B]/30 transition-all duration-300">
                  <IconComponent className="w-4 h-4 text-[#FFD56B] group-hover:text-[#8E44FF] transition-colors duration-300" />
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium">{dropdownItem.name}</div>
                {dropdownItem.description && (
                  <div className="text-xs text-white/50 mt-0.5 font-light">
                    {dropdownItem.description}
                  </div>
                )}
              </div>
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#FFD56B] to-[#8E44FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default VerticalDropdown;