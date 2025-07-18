import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditableDropdownProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: string[];
  onAddOption: (newOption: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

const EditableDropdown: React.FC<EditableDropdownProps> = ({
  value,
  onValueChange,
  options,
  onAddOption,
  placeholder = "Sélectionner...",
  label,
  className = ''
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      onAddOption(newOption.trim());
      onValueChange(newOption.trim());
      setNewOption('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setNewOption('');
    setIsAdding(false);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-white font-['Montserrat']">
          {label}
        </label>
      )}
      
      <div className="flex gap-2">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="bg-black/20 border-white/20 text-white">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-white/20">
            {options.map((option) => (
              <SelectItem key={option} value={option} className="text-white hover:bg-white/10">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <AnimatePresence>
          {!isAdding ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsAdding(true)}
                className="border-[#8E44FF]/30 text-[#8E44FF] hover:bg-[#8E44FF]/10 hover:border-[#8E44FF]/50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex gap-1"
            >
              <Input
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Nouveau..."
                className="w-32 bg-black/20 border-white/20 text-white text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddOption();
                  if (e.key === 'Escape') handleCancel();
                }}
                autoFocus
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddOption}
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 h-8 w-8"
              >
                <Check className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCancel}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 h-8 w-8"
              >
                <X className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EditableDropdown;