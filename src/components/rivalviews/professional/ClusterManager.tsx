import mapboxgl from 'mapbox-gl';
import { RivalBusiness } from '@/types/rivalviews';

export class ClusterManager {
  private map: mapboxgl.Map;
  private sourceId = 'businesses-cluster';
  private clustersLayerId = 'clusters';
  private clusterCountLayerId = 'cluster-count';
  private unclusteredPointLayerId = 'unclustered-point';

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  updateClusters(businesses: RivalBusiness[], onBusinessClick?: (business: RivalBusiness) => void) {
    console.log('🌐 ClusterManager: Mise à jour des clusters pour', businesses.length, 'entreprises');
    
    // Nettoyer les layers existants
    this.clearClusters();

    // Préparer les données GeoJSON
    const geojsonData = {
      type: 'FeatureCollection' as const,
      features: businesses
        .filter(business => 
          business.lat && business.lng && 
          business.lat !== 0 && business.lng !== 0 &&
          !isNaN(Number(business.lat)) && !isNaN(Number(business.lng))
        )
        .map(business => ({
          type: 'Feature' as const,
          properties: {
            id: business.id,
            name: business.name,
            city: business.city,
            sector: business.sector,
            ilaScore: business.ilaScore,
            phone: business.phone,
            email: business.email,
            website: business.website
          },
          geometry: {
            type: 'Point' as const,
            coordinates: [Number(business.lng), Number(business.lat)]
          }
        }))
    };

    console.log('📊 ClusterManager: GeoJSON préparé avec', geojsonData.features.length, 'points');

    // Ajouter la source avec clustering
    this.map.addSource(this.sourceId, {
      type: 'geojson',
      data: geojsonData,
      cluster: true,
      clusterMaxZoom: 14, // Niveau de zoom max pour clustering
      clusterRadius: 50 // Rayon en pixels
    });

    // Layer pour les clusters
    this.map.addLayer({
      id: this.clustersLayerId,
      type: 'circle',
      source: this.sourceId,
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#8b5cf6', // violet-500 pour petits clusters
          10,
          '#7c3aed', // violet-600 pour moyens clusters
          30,
          '#6d28d9'  // violet-700 pour gros clusters
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20, // rayon pour petits clusters
          10,
          25, // rayon pour moyens clusters
          30,
          30  // rayon pour gros clusters
        ],
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });

    // Layer pour le texte des clusters
    this.map.addLayer({
      id: this.clusterCountLayerId,
      type: 'symbol',
      source: this.sourceId,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      },
      paint: {
        'text-color': '#ffffff'
      }
    });

    // Layer pour les points individuels (non clustered)
    this.map.addLayer({
      id: this.unclusteredPointLayerId,
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
        'circle-radius': 8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });

    // Événements de clic
    this.map.on('click', this.clustersLayerId, (e) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: [this.clustersLayerId]
      });
      
      if (features.length > 0) {
        const clusterId = features[0].properties!.cluster_id;
        const source = this.map.getSource(this.sourceId) as mapboxgl.GeoJSONSource;
        
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (!err && zoom) {
            this.map.easeTo({
              center: (features[0].geometry as any).coordinates,
              zoom: zoom
            });
          }
        });
      }
    });

    // Clic sur points individuels
    this.map.on('click', this.unclusteredPointLayerId, (e) => {
      if (e.features && e.features.length > 0 && onBusinessClick) {
        const feature = e.features[0];
        const props = feature.properties!;
        
        // Reconstruire l'objet business
        const business: RivalBusiness = {
          id: props.id,
          name: props.name,
          city: props.city,
          sector: props.sector,
          ilaScore: props.ilaScore,
          phone: props.phone,
          email: props.email,
          website: props.website,
          lat: (feature.geometry as any).coordinates[1],
          lng: (feature.geometry as any).coordinates[0],
          address: '',
          potential: 'medium'
        };
        
        onBusinessClick(business);
      }
    });

    // Curseur pointer sur hover
    this.map.on('mouseenter', this.clustersLayerId, () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    
    this.map.on('mouseleave', this.clustersLayerId, () => {
      this.map.getCanvas().style.cursor = '';
    });

    this.map.on('mouseenter', this.unclusteredPointLayerId, () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    
    this.map.on('mouseleave', this.unclusteredPointLayerId, () => {
      this.map.getCanvas().style.cursor = '';
    });

    console.log('✅ ClusterManager: Clusters configurés avec succès');
  }

  clearClusters() {
    // Supprimer les layers s'ils existent
    if (this.map.getLayer(this.unclusteredPointLayerId)) {
      this.map.removeLayer(this.unclusteredPointLayerId);
    }
    if (this.map.getLayer(this.clusterCountLayerId)) {
      this.map.removeLayer(this.clusterCountLayerId);
    }
    if (this.map.getLayer(this.clustersLayerId)) {
      this.map.removeLayer(this.clustersLayerId);
    }
    
    // Supprimer la source si elle existe
    if (this.map.getSource(this.sourceId)) {
      this.map.removeSource(this.sourceId);
    }
  }
}