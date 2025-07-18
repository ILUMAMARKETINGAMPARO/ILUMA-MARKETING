import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit3, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface DynamicCardProps {
  id: string;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  badges?: Array<{ label: string; color: string; variant?: 'default' | 'secondary' | 'destructive' | 'outline' }>;
  actions?: Array<{ label: string; icon?: React.ReactNode; onClick: () => void; variant?: 'default' | 'destructive' }>;
  isDraggable?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  status?: 'active' | 'inactive' | 'pending' | 'completed';
  assignedTo?: string;
  roleColor?: string;
  className?: string;
}

const DynamicCard: React.FC<DynamicCardProps> = ({
  id,
  title,
  subtitle,
  content,
  badges = [],
  actions = [],
  isDraggable = false,
  onClick,
  onEdit,
  onDelete,
  status = 'active',
  assignedTo,
  roleColor = '#8E44FF',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'border-green-500/30 bg-green-500/5';
      case 'inactive': return 'border-gray-500/30 bg-gray-500/5';
      case 'pending': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'completed': return 'border-blue-500/30 bg-blue-500/5';
      default: return 'border-white/20 bg-white/5';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable={isDraggable}
    >
      <Card className={`glass-effect ${getStatusColor()} border transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20`}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1" onClick={onClick} role={onClick ? "button" : undefined}>
              <h3 className="text-white font-semibold text-lg font-['Montserrat'] cursor-pointer hover:text-[#FFD56B] transition-colors">
                {title}
              </h3>
              {subtitle && (
                <p className="text-white/60 text-sm font-['Montserrat'] mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            
            {/* Actions Menu */}
            {(onEdit || onDelete || actions.length > 0) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/60 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black/80 border-white/20">
                  {onEdit && (
                    <DropdownMenuItem onClick={onEdit} className="text-white hover:bg-white/10">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                  )}
                  {actions.map((action, index) => (
                    <DropdownMenuItem key={index} onClick={action.onClick} className="text-white hover:bg-white/10">
                      {action.icon && <span className="mr-2">{action.icon}</span>}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                  {onDelete && (
                    <DropdownMenuItem onClick={onDelete} className="text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Content */}
          {content && (
            <div className="mb-3 text-white/80">
              {content}
            </div>
          )}

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge.variant || 'default'}
                  className={`${badge.color} text-xs font-['Montserrat']`}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}

          {/* Footer */}
          {assignedTo && (
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>Assigné à: <span className="text-white/70 font-medium">{assignedTo}</span></span>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: roleColor }}
              />
            </div>
          )}

          {/* Hover Animation Border */}
          {isHovered && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] origin-left"
              style={{ width: '100%' }}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default DynamicCard;