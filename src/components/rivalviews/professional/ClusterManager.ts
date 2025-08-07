import mapboxgl from 'mapbox-gl';
import { RivalBusiness } from '@/types/rivalviews';

export class ClusterManager {
  private map: mapboxgl.Map;
  private sourceId = 'businesses-cluster-source';
  private isInitialized = false;

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  private initializeClusterLayers(): void {
    if (this.isInitialized) return;

    // Source avec clustering
    this.map.addSource(this.sourceId, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
      clusterMinPoints: 2
    });

    // Layer pour les clusters
    this.map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: this.sourceId,
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#8B5CF6', // purple-500 pour les petits clusters
          10,
          '#7C3AED', // purple-600 pour les moyens
          30,
          '#6D28D9'  // purple-700 pour les gros
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          25, // Rayon pour les petits clusters
          10,
          35, // Rayon pour les moyens
          30,
          45  // Rayon pour les gros
        ],
        'circle-stroke-width': 3,
        'circle-stroke-color': '#ffffff',
        'circle-opacity': 0.9
      }
    });

    // Labels des clusters
    this.map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: this.sourceId,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 14,
        'text-allow-overlap': true
      },
      paint: {
        'text-color': '#ffffff',
        'text-halo-color': 'rgba(0,0,0,0.3)',
        'text-halo-width': 1
      }
    });

    // Layer pour les points individuels
    this.map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: this.sourceId,
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': [
          'case',
          ['>=', ['get', 'ilaScore'], 80], '#10b981', // emerald-500
          ['>=', ['get', 'ilaScore'], 60], '#f59e0b', // amber-500
          '#ef4444' // red-500
        ],
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          8, 8,
          12, 12,
          16, 16
        ],
        'circle-stroke-width': 3,
        'circle-stroke-color': '#ffffff',
        'circle-opacity': 0.9
      }
    });

    // Labels pour les points individuels
    this.map.addLayer({
      id: 'unclustered-point-labels',
      type: 'symbol',
      source: this.sourceId,
      filter: ['!', ['has', 'point_count']],
      layout: {
        'text-field': '{ilaScore}',
        'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
        'text-size': 10,
        'text-allow-overlap': true,
        'text-ignore-placement': true
      },
      paint: {
        'text-color': '#ffffff',
        'text-halo-color': 'rgba(0,0,0,0.8)',
        'text-halo-width': 2
      }
    });

    this.setupClusterInteractions();
    this.isInitialized = true;
    
    console.log('✅ ClusterManager: Layers initialisés');
  }

  private setupClusterInteractions(): void {
    // Click sur cluster - zoom
    this.map.on('click', 'clusters', (e) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      
      if (features.length > 0) {
        const clusterId = features[0].properties?.cluster_id;
        const source = this.map.getSource(this.sourceId) as mapboxgl.GeoJSONSource;
        
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          
          const coordinates = (features[0].geometry as any).coordinates;
          this.map.easeTo({
            center: coordinates,
            zoom: zoom + 1,
            duration: 800
          });
        });
      }
    });

    // Click sur point individuel
    this.map.on('click', 'unclustered-point', (e) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['unclustered-point']
      });
      
      if (features.length > 0) {
        const properties = features[0].properties;
        if (properties?.id) {
          window.dispatchEvent(new CustomEvent('clusterBusinessClick', {
            detail: { businessId: properties.id }
          }));
        }
      }
    });

    // Curseur pointer sur les éléments interactifs
    this.map.on('mouseenter', 'clusters', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    this.map.on('mouseleave', 'clusters', () => {
      this.map.getCanvas().style.cursor = '';
    });

    this.map.on('mouseenter', 'unclustered-point', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    this.map.on('mouseleave', 'unclustered-point', () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

  updateClusters(businesses: RivalBusiness[], onBusinessClick?: (business: RivalBusiness) => void): void {
    if (!this.isInitialized) {
      this.initializeClusterLayers();
    }

    // Convertir les businesses en GeoJSON
    const geojsonData = {
      type: 'FeatureCollection' as const,
      features: businesses.map(business => ({
        type: 'Feature' as const,
        properties: {
          id: business.id,
          name: business.name,
          sector: business.sector,
          city: business.city,
          ilaScore: business.ilaScore,
          googleRating: business.googleRating,
          reviewCount: business.reviewCount
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [Number(business.lng), Number(business.lat)]
        }
      }))
    };

    // Mettre à jour la source
    const source = this.map.getSource(this.sourceId) as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData(geojsonData);
    }

    // Setup event listener pour les clicks
    if (onBusinessClick) {
      const handleBusinessClick = (event: CustomEvent) => {
        const business = businesses.find(b => b.id === event.detail.businessId);
        if (business) {
          onBusinessClick(business);
        }
      };

      // Nettoyer l'ancien listener
      window.removeEventListener('clusterBusinessClick', handleBusinessClick as EventListener);
      // Ajouter le nouveau
      window.addEventListener('clusterBusinessClick', handleBusinessClick as EventListener);
    }

    console.log(`🎯 ClusterManager: ${businesses.length} entreprises ajoutées au clustering`);
  }

  clearClusters(): void {
    if (!this.isInitialized) return;

    const source = this.map.getSource(this.sourceId) as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: []
      });
    }
  }

  destroy(): void {
    if (!this.isInitialized) return;

    try {
      // Supprimer les layers
      ['unclustered-point-labels', 'unclustered-point', 'cluster-count', 'clusters'].forEach(layerId => {
        if (this.map.getLayer(layerId)) {
          this.map.removeLayer(layerId);
        }
      });

      // Supprimer la source
      if (this.map.getSource(this.sourceId)) {
        this.map.removeSource(this.sourceId);
      }
    } catch (error) {
      console.warn('⚠️ Erreur lors de la destruction du ClusterManager:', error);
    }

    this.isInitialized = false;
  }
}