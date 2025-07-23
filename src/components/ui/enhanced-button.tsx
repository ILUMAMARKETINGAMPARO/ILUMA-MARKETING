import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  glowEffect?: boolean;
  galacticStyle?: boolean;
}

export const EnhancedButton = React.forwardRef<
  HTMLButtonElement,
  EnhancedButtonProps
>(({ className, glowEffect = false, galacticStyle = false, variant = 'default', children, ...props }, ref) => {
  const galacticClass = galacticStyle ? 'galactic-cta' : '';
  const glowClass = glowEffect ? 'glow-effect' : '';

  const enhancedVariants = {
    iluma: 'btn-primary-iluma text-primary-foreground hover:opacity-90',
    'iluma-outline': 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground',
    'iluma-ghost': 'bg-transparent text-primary hover:bg-primary/10'
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      className={cn(
        'micro-interaction font-montserrat font-semibold tracking-wide',
        galacticClass,
        glowClass,
        // @ts-ignore
        enhancedVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
});

EnhancedButton.displayName = 'EnhancedButton';