import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavigationItem } from './NavigationItems';

interface GridDropdownProps {
  item: NavigationItem;
  onClose: () => void;
}

const GridDropdown: React.FC<GridDropdownProps> = ({ item, onClose }) => {
  return (
    <motion.div
      className="absolute top-full left-0 mt-2 w-96 bg-[#0B0B0E]/98 backdrop-blur-xl border border-[#8E44FF]/30 rounded-2xl shadow-2xl py-4 z-50"
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="absolute -top-2 left-6 w-4 h-4 bg-[#0B0B0E] border-l border-t border-[#8E44FF]/30 transform rotate-45"></div>
      
      <div className="grid grid-cols-2 gap-2 px-4">
        {item.dropdownItems?.map((dropdownItem, index) => {
          const IconComponent = dropdownItem.icon;
          
          return (
            <motion.div
              key={dropdownItem.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to={dropdownItem.path}
                onClick={onClose}
                className="group relative block p-3 rounded-xl hover:bg-[#8E44FF]/10 transition-all duration-300 border border-transparent hover:border-[#8E44FF]/20"
              >
                <div className="flex items-start space-x-3">
                  {IconComponent && (
                    <div className="w-8 h-8 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-lg flex items-center justify-center group-hover:from-[#8E44FF]/30 group-hover:to-[#FFD56B]/30 transition-all duration-300">
                      <IconComponent className="w-4 h-4 text-[#FFD56B] group-hover:text-[#8E44FF] transition-colors duration-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-white/90 group-hover:text-[#FFD56B] transition-colors duration-300 font-['Montserrat']">
                        {dropdownItem.name}
                      </h4>
                      {dropdownItem.isNew && (
                        <span className="px-1.5 py-0.5 text-xs bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] text-white rounded-full font-medium">
                          NEW
                        </span>
                      )}
                    </div>
                    {dropdownItem.description && (
                      <p className="text-xs text-white/60 mt-1 font-['Montserrat'] font-light">
                        {dropdownItem.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#8E44FF]/0 via-[#8E44FF]/5 to-[#FFD56B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default GridDropdown;