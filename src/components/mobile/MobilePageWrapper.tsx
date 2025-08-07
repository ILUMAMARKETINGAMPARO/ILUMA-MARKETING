import React from 'react';
import { useDeviceInfo } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MobilePageWrapperProps {
  children: React.ReactNode;
  className?: string;
  enablePadding?: boolean;
  fullHeight?: boolean;
}

const MobilePageWrapper: React.FC<MobilePageWrapperProps> = ({ 
  children, 
  className,
  enablePadding = true,
  fullHeight = true
}) => {
  const { isMobile, isTablet, orientation } = useDeviceInfo();
  
  return (
    <div 
      className={cn(
        // Base responsive layout
        'w-full mx-auto',
        
        // Height management
        fullHeight && 'min-h-screen',
        
        // Responsive padding
        enablePadding && {
          'px-4 py-2': isMobile,
          'px-6 py-4': isTablet,
          'px-8 py-6': !isMobile && !isTablet
        },
        
        // Orientation adjustments
        isMobile && orientation === 'landscape' && 'py-2',
        
        // Custom classes
        className
      )}
      style={{
        // Safe area handling for mobile devices
        paddingTop: isMobile ? 'env(safe-area-inset-top, 0px)' : undefined,
        paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 0px)' : undefined,
        paddingLeft: isMobile ? 'env(safe-area-inset-left, 1rem)' : undefined,
        paddingRight: isMobile ? 'env(safe-area-inset-right, 1rem)' : undefined,
        
        // Prevent zooming on mobile
        touchAction: isMobile ? 'manipulation' : undefined,
        WebkitTouchCallout: isMobile ? 'none' : undefined,
        WebkitUserSelect: isMobile ? 'none' : undefined,
        userSelect: isMobile ? 'none' : undefined
      }}
    >
      {children}
    </div>
  );
};

export default MobilePageWrapper;