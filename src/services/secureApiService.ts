import { supabase } from '@/integrations/supabase/client';

/**
 * Secure API service for managing sensitive tokens and credentials
 */
export class SecureApiService {
  private static instance: SecureApiService;
  private tokenCache = new Map<string, { token: string; expires: number }>();

  private constructor() {}

  static getInstance(): SecureApiService {
    if (!SecureApiService.instance) {
      SecureApiService.instance = new SecureApiService();
    }
    return SecureApiService.instance;
  }

  /**
   * Get Mapbox token securely from database
   */
  async getMapboxToken(): Promise<string> {
    try {
      // Check cache first (valid for 5 minutes)
      const cached = this.tokenCache.get('mapbox');
      if (cached && Date.now() < cached.expires) {
        return cached.token;
      }

      // Get token from secure database function
      const { data, error } = await supabase.rpc('get_mapbox_token');
      
      if (error) {
        console.error('Error fetching Mapbox token:', error);
        return '';
      }

      const token = data || '';
      
      // Cache for 5 minutes
      this.tokenCache.set('mapbox', {
        token,
        expires: Date.now() + 5 * 60 * 1000
      });

      return token;
    } catch (error) {
      console.error('Error in getMapboxToken:', error);
      return '';
    }
  }

  /**
   * Validate if a service is properly configured
   */
  async validateService(serviceName: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('validate_api_access', {
        required_service: serviceName
      });
      
      if (error) {
        console.error(`Error validating ${serviceName}:`, error);
        return false;
      }

      return data || false;
    } catch (error) {
      console.error(`Error validating ${serviceName}:`, error);
      return false;
    }
  }

  /**
   * Clear token cache
   */
  clearCache(): void {
    this.tokenCache.clear();
  }

  /**
   * Initialize security headers for API calls
   */
  getSecureHeaders(additionalHeaders: Record<string, string> = {}): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...additionalHeaders
    };
  }
}

export const secureApiService = SecureApiService.getInstance();