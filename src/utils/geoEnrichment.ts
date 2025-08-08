import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProspectionBusiness {
  id: string;
  'Nom de l\'entreprise': string;
  'Adresse complète': string;
  'Industrie'?: string;
  'Téléphone'?: string;
  'Site web'?: string;
  '⭐ Étoiles Google'?: string;
  'Nb d\'avis Google'?: number;
  'Followers Facebook'?: number;
  'Followers Instagram'?: string;
  'Followers Tik Tok'?: string;
  'Nb de succursales'?: number;
  'Email adress'?: string;
  nom_domaine?: string;
}

interface MapboxResponse {
  features: Array<{
    center: [number, number]; // [lng, lat]
    place_name: string;
    properties: {
      accuracy?: string;
    };
  }>;
}

interface EnrichmentResult {
  success: boolean;
  total: number;
  enriched: number;
  failed: number;
  details: Array<{
    name: string;
    success: boolean;
    coordinates?: { lat: number; lng: number };
    error?: string;
  }>;
}

export class GeoEnrichmentService {
  private mapboxToken: string | null = null;

  constructor() {
    this.initializeMapboxToken();
  }

  private async initializeMapboxToken() {
    try {
      // Récupérer le token depuis Supabase Edge Function
      const { data } = await supabase.functions.invoke('mapbox-geocoding', {
        body: { action: 'get_token' }
      });
      
      if (data?.success && data?.token) {
        this.mapboxToken = data.token;
        console.log('✅ Token Mapbox récupéré avec succès');
      } else {
        console.error('❌ Erreur récupération token:', data);
      }
    } catch (error) {
      console.error('❌ Erreur récupération token Mapbox:', error);
    }
  }

  /**
   * Géocode une adresse en utilisant l'API Mapbox
   */
  private async geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    if (!this.mapboxToken) {
      throw new Error('Token Mapbox non configuré');
    }

    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${this.mapboxToken}&limit=1&country=CA`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur API Mapbox: ${response.status}`);
      }

      const data: MapboxResponse = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        return { lat, lng };
      }

      return null;
    } catch (error) {
      console.error('Erreur géocodage:', error);
      throw error;
    }
  }

  /**
   * Récupère les entreprises depuis prospection_iluma qui ne sont pas encore dans businesses
   */
  private async getBusinessesWithoutCoordinates(): Promise<any[]> {
    // D'abord, récupérer les noms des entreprises déjà dans businesses
    const { data: existingBusinesses } = await supabase
      .from('businesses')
      .select('name');
    
    const existingNames = existingBusinesses?.map(b => b.name.toLowerCase()) || [];
    
    // Ensuite, récupérer toutes les entreprises de prospection_iluma
    const { data, error } = await supabase
      .from('prospection_iluma')
      .select('*')
      .not('"Nom de l\'entreprise"', 'is', null)
      .not('"Adresse complète"', 'is', null);

    if (error) {
      throw new Error(`Erreur lecture base de données: ${error.message}`);
    }

    // Filtrer les entreprises qui ne sont pas encore dans businesses
    const filteredData = data?.filter((business: any) => {
      const businessName = business['Nom de l\'entreprise']?.toLowerCase();
      return businessName && !existingNames.includes(businessName);
    }) || [];

    console.log(`📊 Entreprises trouvées dans prospection_iluma: ${data?.length || 0}`);
    console.log(`📊 Entreprises déjà dans businesses: ${existingNames.length}`);
    console.log(`📊 Nouvelles entreprises à enrichir: ${filteredData.length}`);

    return filteredData;
  }

  /**
   * Met à jour les coordonnées d'une entreprise dans businesses
   */
  private async updateBusinessCoordinates(
    name: string, 
    address: string, 
    coordinates: { lat: number; lng: number },
    originalData: any
  ): Promise<boolean> {
    try {
      // Créer ou mettre à jour dans la table businesses
      const { error } = await supabase
        .from('businesses')
        .insert({
          name: name,
          address: address,
          city: this.extractCityFromAddress(address),
          province: 'QC',
          country: 'Canada',
          sector: originalData['Industrie'] || 'Non spécifié',
          phone: originalData['Téléphone'],
          website: originalData['Site web'],
          google_rating: this.parseGoogleRating(originalData['⭐ Étoiles Google']),
          review_count: originalData['Nb d\'avis Google'] || 0,
          lat: coordinates.lat,
          lng: coordinates.lng,
          ila_score: this.calculateILAScore(originalData),
          status: 'prospect',
          potential: this.calculatePotential(originalData),
          source: 'manual'
        });

      if (error) {
        console.error('Erreur mise à jour coordonnées:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur mise à jour business:', error);
      return false;
    }
  }

  /**
   * Extrait la ville depuis l'adresse complète
   */
  private extractCityFromAddress(address: string): string {
    const parts = address.split(',');
    if (parts.length >= 2) {
      const cityPart = parts[parts.length - 2].trim();
      return cityPart || 'Non spécifié';
    }
    return 'Non spécifié';
  }

  /**
   * Parse le rating Google depuis le format texte
   */
  private parseGoogleRating(rating?: string): number | null {
    if (!rating) return null;
    const parsed = parseFloat(rating.replace(',', '.'));
    return isNaN(parsed) ? null : parsed;
  }

  /**
   * Calcule un score ILA basique
   */
  private calculateILAScore(data: any): number {
    let score = 50; // Score de base

    // Bonus pour site web
    if (data['Site web']) score += 10;

    // Bonus pour rating Google
    const rating = this.parseGoogleRating(data['⭐ Étoiles Google']);
    if (rating && rating >= 4.5) score += 15;
    else if (rating && rating >= 4.0) score += 10;

    // Bonus pour nombre d'avis
    if (data['Nb d\'avis Google'] && data['Nb d\'avis Google'] > 50) score += 10;

    // Bonus pour présence sociale
    if (data['Followers Facebook'] && data['Followers Facebook'] > 100) score += 5;
    if (data['Followers Instagram']) score += 5;

    return Math.min(score, 100);
  }

  /**
   * Calcule le potentiel de l'entreprise
   */
  private calculatePotential(data: any): 'low' | 'medium' | 'high' {
    const rating = this.parseGoogleRating(data['⭐ Étoiles Google']);
    const reviews = data['Nb d\'avis Google'] || 0;
    const hasWebsite = !!data['Site web'];

    if (rating && rating >= 4.5 && reviews >= 50 && hasWebsite) {
      return 'high';
    } else if (rating && rating >= 4.0 && reviews >= 20) {
      return 'medium';
    }
    return 'low';
  }

  /**
   * Lance l'enrichissement complet des coordonnées GPS
   */
  async enrichAllBusinessesWithGPS(
    onProgress?: (current: number, total: number, currentBusiness: string) => void
  ): Promise<EnrichmentResult> {
    console.log('🌍 ENRICHISSEMENT GPS: Début du processus...');
    
    const result: EnrichmentResult = {
      success: false,
      total: 0,
      enriched: 0,
      failed: 0,
      details: []
    };

    try {
      // 1. Récupérer les entreprises
      const businesses = await this.getBusinessesWithoutCoordinates();
      result.total = businesses.length;

      console.log(`📊 ${businesses.length} entreprises à traiter`);

      if (businesses.length === 0) {
        toast.info('Aucune entreprise à enrichir trouvée');
        result.success = true;
        return result;
      }

      // 2. Traitement par batch pour éviter les limites API
      const batchSize = 5;
      const delay = 1000; // 1 seconde entre les requêtes

      for (let i = 0; i < businesses.length; i += batchSize) {
        const batch = businesses.slice(i, i + batchSize);
        
        for (const business of batch) {
          const businessName = business['Nom de l\'entreprise'];
          const address = business['Adresse complète'];

          console.log(`🎯 Traitement: ${businessName}`);
          
          onProgress?.(result.enriched + result.failed + 1, result.total, businessName);

          try {
            // Géocoder l'adresse
            const coordinates = await this.geocodeAddress(address);

            if (coordinates) {
              // Mettre à jour la base de données
              const updateSuccess = await this.updateBusinessCoordinates(
                businessName,
                address,
                coordinates,
                business
              );

              if (updateSuccess) {
                result.enriched++;
                result.details.push({
                  name: businessName,
                  success: true,
                  coordinates
                });
                console.log(`✅ ${businessName}: ${coordinates.lat}, ${coordinates.lng}`);
              } else {
                result.failed++;
                result.details.push({
                  name: businessName,
                  success: false,
                  error: 'Erreur mise à jour base de données'
                });
              }
            } else {
              result.failed++;
              result.details.push({
                name: businessName,
                success: false,
                error: 'Coordonnées non trouvées'
              });
              console.log(`❌ ${businessName}: Coordonnées non trouvées`);
            }
          } catch (error) {
            result.failed++;
            result.details.push({
              name: businessName,
              success: false,
              error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
            console.error(`💥 Erreur ${businessName}:`, error);
          }

          // Délai entre les requêtes pour respecter les limites API
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        // Toast de progression
        toast.info(`📍 Progression: ${result.enriched + result.failed}/${result.total} entreprises traitées`);
      }

      result.success = true;
      
      // Toast final
      if (result.enriched > 0) {
        toast.success(`🎉 Enrichissement terminé: ${result.enriched} entreprises géolocalisées !`);
      } else {
        toast.warning(`⚠️ Enrichissement terminé: Aucune nouvelle entreprise géolocalisée`);
      }

      console.log(`🏁 ENRICHISSEMENT TERMINÉ:`, result);
      
    } catch (error) {
      console.error('💥 Erreur enrichissement GPS:', error);
      toast.error('Erreur lors de l\'enrichissement GPS');
      result.success = false;
    }

    return result;
  }

  /**
   * Test rapide de géocodage pour une adresse
   */
  async testGeocode(address: string): Promise<{ lat: number; lng: number } | null> {
    try {
      return await this.geocodeAddress(address);
    } catch (error) {
      console.error('Test géocodage échoué:', error);
      return null;
    }
  }
}

// Instance singleton
export const geoEnrichmentService = new GeoEnrichmentService();