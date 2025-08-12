import React, { forwardRef } from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { sanitizeUserInput } from '@/utils/security';

interface SecureInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
  sanitize?: boolean;
}

/**
 * Secure input component that automatically sanitizes user input
 * to prevent XSS attacks and other security issues
 */
export const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(
  ({ onChange, sanitize = true, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const sanitizedValue = sanitize ? sanitizeUserInput(value) : value;
      
      if (onChange) {
        onChange(sanitizedValue);
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        onChange={handleChange}
      />
    );
  }
);

SecureInput.displayName = 'SecureInput';