// Security utility functions for XSS protection and data sanitization

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html - Raw HTML string
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (html: string): string => {
  // Create a temporary div element
  const tempDiv = document.createElement('div');
  
  // Set the text content (automatically escapes HTML)
  tempDiv.textContent = html;
  
  // Return the escaped content
  return tempDiv.innerHTML;
};

/**
 * Sanitizes user input for safe display
 * @param input - User input string
 * @returns Sanitized string
 */
export const sanitizeUserInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validates and sanitizes email addresses
 * @param email - Email string
 * @returns Sanitized email or empty string if invalid
 */
export const sanitizeEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = sanitizeUserInput(email);
  
  return emailRegex.test(sanitized) ? sanitized : '';
};

/**
 * Validates and sanitizes phone numbers
 * @param phone - Phone number string
 * @returns Sanitized phone number
 */
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d\s\+\-\(\)]/g, '').trim();
};

/**
 * Validates role changes for security
 * @param currentUserRole - Current user's role
 * @param targetRole - Target role to assign
 * @param targetUserId - ID of user being modified
 * @param currentUserId - ID of current user
 * @returns Whether the role change is allowed
 */
export const validateRoleChange = (
  currentUserRole: string,
  targetRole: string,
  targetUserId: string,
  currentUserId: string
): boolean => {
  // Only admins can change roles
  if (currentUserRole !== 'admin') {
    return false;
  }
  
  // Valid roles
  const validRoles = ['user', 'admin', 'manager'];
  if (!validRoles.includes(targetRole)) {
    return false;
  }
  
  // Cannot change own role to prevent lockout
  if (targetUserId === currentUserId && targetRole !== 'admin') {
    return false;
  }
  
  return true;
};

/**
 * Logs security events for audit purposes
 * @param event - Security event type
 * @param details - Event details
 */
export const logSecurityEvent = (event: string, details: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[SECURITY EVENT] ${event}:`, details);
  }
  
  // In production, this would send to a security monitoring service
  // For now, we'll just log to console in development
};

/**
 * Content Security Policy violation handler
 */
export const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
  logSecurityEvent('CSP_VIOLATION', {
    violatedDirective: event.violatedDirective,
    blockedURI: event.blockedURI,
    documentURI: event.documentURI,
    timestamp: new Date().toISOString()
  });
};

/**
 * Initialize security event listeners
 */
export const initializeSecurityListeners = () => {
  // Listen for CSP violations
  document.addEventListener('securitypolicyviolation', handleCSPViolation);
  
  // Listen for potential XSS attempts
  window.addEventListener('error', (event) => {
    if (event.message.includes('Script error') || event.filename.includes('data:')) {
      logSecurityEvent('POTENTIAL_XSS', {
        message: event.message,
        filename: event.filename,
        timestamp: new Date().toISOString()
      });
    }
  });
};