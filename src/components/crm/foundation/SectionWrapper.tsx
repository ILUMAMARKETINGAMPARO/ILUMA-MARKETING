import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import SectionActionButtons from './SectionActionButtons';
import { LucideIcon } from 'lucide-react';

interface SectionWrapperProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  onAdd: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
  addLabel?: string;
  editLabel?: string;
  removeLabel?: string;
  selectedItems?: number;
  disabled?: boolean;
  className?: string;
  headerActions?: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  icon: Icon,
  children,
  onAdd,
  onEdit,
  onRemove,
  addLabel,
  editLabel,
  removeLabel,
  selectedItems = 0,
  disabled = false,
  className = "",
  headerActions
}) => {
  return (
    <Card className={`glass-effect border-white/20 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className="w-6 h-6 text-[#8E44FF]" />}
            <h3 className="text-xl font-bold text-white font-['Montserrat']">
              {title}
            </h3>
            {selectedItems > 0 && (
              <div className="px-3 py-1 bg-[#8E44FF]/20 rounded-full">
                <span className="text-sm text-[#8E44FF] font-medium">
                  {selectedItems} sélectionné{selectedItems > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {headerActions}
            <SectionActionButtons
              onAdd={onAdd}
              onEdit={onEdit}
              onRemove={onRemove}
              addLabel={addLabel}
              editLabel={editLabel}
              removeLabel={removeLabel}
              selectedItems={selectedItems}
              disabled={disabled}
              compact
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default SectionWrapper;