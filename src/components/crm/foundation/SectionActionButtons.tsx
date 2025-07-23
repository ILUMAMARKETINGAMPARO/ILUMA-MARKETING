import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface SectionActionButtonsProps {
  onAdd: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
  addLabel?: string;
  editLabel?: string;
  removeLabel?: string;
  disabled?: boolean;
  selectedItems?: number;
  compact?: boolean;
}

const SectionActionButtons: React.FC<SectionActionButtonsProps> = ({
  onAdd,
  onEdit,
  onRemove,
  addLabel = "Ajouter",
  editLabel = "Modifier",
  removeLabel = "Retirer",
  disabled = false,
  selectedItems = 0,
  compact = false
}) => {
  return (
    <div className={`flex gap-2 ${compact ? 'flex-col sm:flex-row' : ''}`}>
      {/* Bouton Ajouter - toujours disponible */}
      <Button
        onClick={onAdd}
        disabled={disabled}
        className="bg-gradient-to-r from-[#8E44FF] to-[#8E44FF]/80 hover:from-[#8E44FF]/90 hover:to-[#8E44FF]/70 text-white font-['Montserrat'] transition-all duration-200"
        size={compact ? "sm" : "default"}
      >
        <Plus className="w-4 h-4 mr-2" />
        {addLabel}
      </Button>

      {/* Bouton Modifier - disponible si onEdit fourni et items sélectionnés */}
      {onEdit && (
        <Button
          onClick={onEdit}
          disabled={disabled || selectedItems === 0}
          variant="outline"
          className="border-[#FFD56B] text-[#FFD56B] hover:bg-[#FFD56B]/10 font-['Montserrat'] transition-all duration-200"
          size={compact ? "sm" : "default"}
        >
          <Edit className="w-4 h-4 mr-2" />
          {editLabel}
          {selectedItems > 0 && !compact && (
            <span className="ml-2 px-2 py-1 bg-[#FFD56B]/20 rounded-full text-xs">
              {selectedItems}
            </span>
          )}
        </Button>
      )}

      {/* Bouton Retirer - disponible si onRemove fourni et items sélectionnés */}
      {onRemove && (
        <Button
          onClick={onRemove}
          disabled={disabled || selectedItems === 0}
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-500/10 font-['Montserrat'] transition-all duration-200"
          size={compact ? "sm" : "default"}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {removeLabel}
          {selectedItems > 0 && !compact && (
            <span className="ml-2 px-2 py-1 bg-red-500/20 rounded-full text-xs">
              {selectedItems}
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export default SectionActionButtons;