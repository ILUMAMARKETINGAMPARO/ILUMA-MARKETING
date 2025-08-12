import React, { createContext, useContext, useEffect, ReactNode, useCallback } from 'react';
import { initializeSecurityListeners, logSecurityEvent } from '@/utils/security';

interface SecurityContextType {
  logFailedAuth: (reason: string) => void;
  logSuspiciousNavigation: (path: string, reason: string) => void;
  logDataAccess: (resource: string, action: string) => void;
  logRateLimitViolation: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize global security listeners
    initializeSecurityListeners();
    
    // Log application start
    logSecurityEvent('DATA_ACCESS', {
      resource: 'application',
      action: 'start',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  }, []);

  // Log failed authentication attempts
  const logFailedAuth = useCallback((reason: string) => {
    logSecurityEvent('FAILED_AUTHENTICATION', {
      reason,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }, []);

  // Log suspicious navigation patterns
  const logSuspiciousNavigation = useCallback((path: string, reason: string) => {
    logSecurityEvent('SUSPICIOUS_NAVIGATION', {
      path,
      reason,
      timestamp: new Date().toISOString(),
      referrer: document.referrer
    });
  }, []);

  // Log potential data exfiltration attempts
  const logDataAccess = useCallback((resource: string, action: string) => {
    logSecurityEvent('DATA_ACCESS', {
      resource,
      action,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  }, []);

  // Monitor for rapid-fire requests (potential DoS)
  const requestTimes: number[] = [];
  const logRateLimitViolation = useCallback(() => {
    const now = Date.now();
    requestTimes.push(now);
    
    // Keep only requests from the last 60 seconds
    const cutoff = now - 60000;
    const recentRequests = requestTimes.filter(time => time > cutoff);
    
    // If more than 100 requests in 60 seconds, log as suspicious
    if (recentRequests.length > 100) {
      logSecurityEvent('RATE_LIMIT_VIOLATION', {
        requestCount: recentRequests.length,
        timeWindow: '60s',
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  const securityMonitor = {
    logFailedAuth,
    logSuspiciousNavigation,
    logDataAccess,
    logRateLimitViolation
  };

  return (
    <SecurityContext.Provider value={securityMonitor}>
      {children}
    </SecurityContext.Provider>
  );
};