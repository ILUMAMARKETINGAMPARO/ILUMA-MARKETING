import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EnhancedCardProps extends React.ComponentProps<typeof Card> {
  glowEffect?: boolean;
  hoverEffect?: boolean;
  variant?: 'default' | 'glass' | 'elevated' | 'minimal';
}

export const EnhancedCard = React.forwardRef<
  HTMLDivElement,
  EnhancedCardProps
>(({ className, glowEffect = false, hoverEffect = true, variant = 'default', children, ...props }, ref) => {
  const variantStyles = {
    default: 'bg-card text-card-foreground border',
    glass: 'glass-effect border-white/20 backdrop-blur-xl',
    elevated: 'bg-gradient-to-br from-background/80 to-background/60 border-primary/20 shadow-2xl',
    minimal: 'bg-transparent border-border/50'
  };

  const glowClass = glowEffect ? 'iluma-glow' : '';
  const hoverClass = hoverEffect ? 'hover-glow transition-all duration-300' : '';

  return (
    <Card
      ref={ref}
      className={cn(
        variantStyles[variant],
        glowClass,
        hoverClass,
        'group relative overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
});

EnhancedCard.displayName = 'EnhancedCard';

export { CardContent, CardHeader, CardTitle };