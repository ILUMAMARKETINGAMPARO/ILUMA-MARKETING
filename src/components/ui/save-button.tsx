import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Save, Check, X, Loader2, Download } from 'lucide-react';
import { useSave } from '@/contexts/SaveContext';
import { SaveButtonProps } from '@/types/save';
import { cn } from '@/lib/utils';

export const SaveButton: React.FC<SaveButtonProps> = ({
  data,
  type,
  context,
  description,
  variant = 'default',
  autoSave = false,
  onSaveSuccess,
  onSaveError,
  className
}) => {
  const { saveData, getSaveState } = useSave();
  const [isLoading, setIsLoading] = useState(false);
  
  const saveState = getSaveState(context || `${type}_default`);

  const handleSave = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await saveData(type, data, context, description);
      onSaveSuccess?.(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur de sauvegarde';
      onSaveError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading || saveState.status === 'saving') {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {variant !== 'icon' && <span className="ml-2">Sauvegarde...</span>}
        </>
      );
    }

    if (saveState.status === 'saved') {
      return (
        <>
          <Check className="w-4 h-4 text-green-400" />
          {variant !== 'icon' && <span className="ml-2">Sauvegardé</span>}
        </>
      );
    }

    if (saveState.status === 'error') {
      return (
        <>
          <X className="w-4 h-4 text-red-400" />
          {variant !== 'icon' && <span className="ml-2">Erreur</span>}
        </>
      );
    }

    return (
      <>
        <Save className="w-4 h-4" />
        {variant !== 'icon' && <span className="ml-2">Sauvegarder</span>}
      </>
    );
  };

  const getButtonVariant = () => {
    if (saveState.status === 'saved') return 'outline';
    if (saveState.status === 'error') return 'destructive';
    return 'default';
  };

  const getTooltipContent = () => {
    if (saveState.lastSaved) {
      return `Dernière sauvegarde: ${saveState.lastSaved.toLocaleString('fr-FR')}`;
    }
    return description || `Sauvegarder ${type}`;
  };

  if (variant === 'compact') {
    return (
      <Button
        size="sm"
        variant={getButtonVariant()}
        onClick={handleSave}
        disabled={isLoading || saveState.status === 'saving'}
        className={cn(
          'h-8 px-3 text-xs',
          saveState.status === 'saved' && 'bg-green-500/20 text-green-300 border-green-500/30',
          saveState.status === 'error' && 'bg-red-500/20 text-red-300 border-red-500/30',
          className
        )}
        title={getTooltipContent()}
      >
        {getButtonContent()}
      </Button>
    );
  }

  if (variant === 'icon') {
    return (
      <Button
        size="sm"
        variant={getButtonVariant()}
        onClick={handleSave}
        disabled={isLoading || saveState.status === 'saving'}
        className={cn(
          'h-8 w-8 p-0',
          saveState.status === 'saved' && 'bg-green-500/20 text-green-300 border-green-500/30',
          saveState.status === 'error' && 'bg-red-500/20 text-red-300 border-red-500/30',
          className
        )}
        title={getTooltipContent()}
      >
        {getButtonContent()}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={getButtonVariant()}
        onClick={handleSave}
        disabled={isLoading || saveState.status === 'saving'}
        className={cn(
          'bg-gradient-to-r from-[#8E44FF] to-[#8E44FF]/80 hover:from-[#8E44FF]/90 hover:to-[#8E44FF]/70 text-white',
          saveState.status === 'saved' && 'bg-green-500/20 text-green-300 border-green-500/30',
          saveState.status === 'error' && 'bg-red-500/20 text-red-300 border-red-500/30',
          className
        )}
      >
        {getButtonContent()}
      </Button>
      
      {autoSave && (
        <Badge variant="outline" className="text-xs text-white/60 border-white/20">
          Auto
        </Badge>
      )}
      
      {saveState.lastSaved && (
        <span className="text-xs text-white/50">
          {saveState.lastSaved.toLocaleTimeString('fr-FR')}
        </span>
      )}
    </div>
  );
};

export default SaveButton;