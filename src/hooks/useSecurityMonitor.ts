import { useEffect, useCallback } from 'react';
import { initializeSecurityListeners, logSecurityEvent } from '@/utils/security';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to monitor security events and suspicious activities
 */
export const useSecurityMonitor = () => {
  const { user } = useAuth();

  // Initialize security listeners on component mount
  useEffect(() => {
    initializeSecurityListeners();
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
      userId: user?.id,
      timestamp: new Date().toISOString(),
      referrer: document.referrer
    });
  }, [user?.id]);

  // Log potential data exfiltration attempts
  const logDataAccess = useCallback((resource: string, action: string) => {
    logSecurityEvent('DATA_ACCESS', {
      resource,
      action,
      userId: user?.id,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  }, [user?.id]);

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
        userId: user?.id,
        timestamp: new Date().toISOString()
      });
    }
  }, [user?.id]);

  return {
    logFailedAuth,
    logSuspiciousNavigation,
    logDataAccess,
    logRateLimitViolation
  };
};
