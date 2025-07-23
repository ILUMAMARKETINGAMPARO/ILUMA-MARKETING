import React from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface EnhancedInputProps extends InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  glowEffect?: boolean;
}

export const EnhancedInput = React.forwardRef<
  HTMLInputElement,
  EnhancedInputProps
>(({ className, label, error, helperText, glowEffect = false, id, ...props }, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const glowClass = glowEffect ? 'focus:iluma-glow transition-all duration-300' : '';

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={inputId} className="text-text-primary font-medium">
          {label}
        </Label>
      )}
      <Input
        ref={ref}
        id={inputId}
        className={cn(
          'glass-effect border-white/20 text-text-primary placeholder:text-text-muted',
          'focus:border-primary focus:ring-primary/20',
          'transition-all duration-300',
          glowClass,
          error && 'border-destructive focus:border-destructive',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive font-medium" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-text-muted">
          {helperText}
        </p>
      )}
    </div>
  );
});

EnhancedInput.displayName = 'EnhancedInput';