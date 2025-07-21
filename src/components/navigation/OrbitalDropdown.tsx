import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavigationItem } from './NavigationItems';
interface OrbitalDropdownProps {
  item: NavigationItem;
  onClose: () => void;
}
const OrbitalDropdown: React.FC<OrbitalDropdownProps> = ({
  item,
  onClose
}) => {
  const centerX = 140;
  const centerY = 140;
  const radius = 80;
  const getOrbitalPosition = (index: number, total: number) => {
    const angle = index * 2 * Math.PI / total - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return {
      x,
      y
    };
  };
  return <motion.div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 h-80 z-50" initial={{
    opacity: 0,
    scale: 0.8
  }} animate={{
    opacity: 1,
    scale: 1
  }} exit={{
    opacity: 0,
    scale: 0.8
  }} transition={{
    duration: 0.3,
    ease: "easeOut"
  }}>
      {/* Orbe central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        
      </div>

      {/* Éléments orbitaux */}
      {item.dropdownItems?.map((dropdownItem, index) => {
      const position = getOrbitalPosition(index, item.dropdownItems?.length || 0);
      const IconComponent = dropdownItem.icon;
      return <motion.div key={dropdownItem.name} className="absolute" style={{
        left: position.x - 24,
        top: position.y - 24
      }} initial={{
        opacity: 0,
        scale: 0
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }}>
            <Link to={dropdownItem.path} onClick={onClose} className="group relative">
              <motion.div className="w-12 h-12 bg-[#0B0B0E]/90 backdrop-blur-xl border border-[#8E44FF]/30 rounded-full flex items-center justify-center text-white/80 hover:text-[#FFD56B] hover:border-[#FFD56B]/50 transition-all duration-300" whileHover={{
            scale: 1.2,
            boxShadow: '0 0 20px rgba(255, 213, 107, 0.4)'
          }} whileTap={{
            scale: 0.95
          }}>
                {IconComponent && <IconComponent className="w-56 h-5 rounded-none" />}
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#0B0B0E]/95 backdrop-blur-xl border border-[#8E44FF]/30 rounded-lg text-xs text-white/90 font-['Montserrat'] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {dropdownItem.name}
              </div>
            </Link>
          </motion.div>;
    })}
    </motion.div>;
};
export default OrbitalDropdown;