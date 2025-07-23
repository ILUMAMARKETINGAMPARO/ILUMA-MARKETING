import { useState, useEffect, useCallback, useMemo } from 'react';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export const useIsMobile = () => {
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  }));

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    // Throttle resize events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    window.addEventListener('resize', throttledUpdate, { passive: true });
    window.addEventListener('orientationchange', throttledUpdate, { passive: true });

    return () => {
      window.removeEventListener('resize', throttledUpdate);
      window.removeEventListener('orientationchange', throttledUpdate);
      clearTimeout(timeoutId);
    };
  }, [updateDimensions]);

  return useMemo(() => dimensions.width < MOBILE_BREAKPOINT, [dimensions.width]);
};

export const useDeviceInfo = () => {
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  }));

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const throttledUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    window.addEventListener('resize', throttledUpdate, { passive: true });
    window.addEventListener('orientationchange', throttledUpdate, { passive: true });

    return () => {
      window.removeEventListener('resize', throttledUpdate);
      window.removeEventListener('orientationchange', throttledUpdate);
      clearTimeout(timeoutId);
    };
  }, [updateDimensions]);

  return useMemo(() => {
    const { width, height } = dimensions;
    return {
      isMobile: width < MOBILE_BREAKPOINT,
      isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
      isDesktop: width >= TABLET_BREAKPOINT,
      width,
      height,
      orientation: width > height ? 'landscape' as const : 'portrait' as const
    };
  }, [dimensions]);
};