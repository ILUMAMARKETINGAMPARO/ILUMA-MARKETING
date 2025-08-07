import mapboxgl from 'mapbox-gl';

export class MapStyleManager {
  private map: mapboxgl.Map;
  private currentStyle: 'light' | 'dark' | 'satellite' = 'light';

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  setStyle(style: 'light' | 'dark' | 'satellite') {
    if (style === this.currentStyle) return;

    console.log('🎨 MapStyleManager: Changement de style vers', style);

    const styleUrls = {
      light: 'mapbox://styles/mapbox/light-v11',
      dark: 'mapbox://styles/mapbox/dark-v11',
      satellite: 'mapbox://styles/mapbox/satellite-streets-v12'
    };

    // Sauvegarder l'état actuel avant le changement
    const currentCenter = this.map.getCenter();
    const currentZoom = this.map.getZoom();
    const currentBearing = this.map.getBearing();
    const currentPitch = this.map.getPitch();

    this.map.setStyle(styleUrls[style]);

    // Attendre que le nouveau style soit chargé
    this.map.once('styledata', () => {
      // Restaurer la position
      this.map.easeTo({
        center: currentCenter,
        zoom: currentZoom,
        bearing: currentBearing,
        pitch: currentPitch,
        duration: 300
      });

      // Appliquer des personnalisations selon le style
      this.applyStyleCustomizations(style);
    });

    this.currentStyle = style;
  }

  private applyStyleCustomizations(style: 'light' | 'dark' | 'satellite') {
    // Attendre que le style soit complètement chargé
    setTimeout(() => {
      try {
        switch (style) {
          case 'dark':
            this.applyDarkModeCustomizations();
            break;
          case 'satellite':
            this.applySatelliteCustomizations();
            break;
          case 'light':
          default:
            this.applyLightModeCustomizations();
            break;
        }
      } catch (error) {
        console.warn('MapStyleManager: Erreur lors de l\'application des personnalisations:', error);
      }
    }, 500);
  }

  private applyLightModeCustomizations() {
    // Personnalisations pour le mode clair
    if (this.map.getSource('mapbox-dem')) return;

    // Ajouter de la profondeur avec l'élévation
    this.map.addSource('mapbox-dem', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      tileSize: 512,
      maxzoom: 14
    });

    if (!this.map.getLayer('sky')) {
      this.map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });
    }
  }

  private applyDarkModeCustomizations() {
    // Personnalisations pour le mode sombre
    if (this.map.getLayer('sky')) {
      this.map.removeLayer('sky');
    }

    // Ajouter un effet de brouillard sombre
    this.map.setFog({
      'range': [1, 20],
      'color': '#1a1a2e',
      'horizon-blend': 0.1
    });
  }

  private applySatelliteCustomizations() {
    // Personnalisations pour le mode satellite
    if (this.map.getLayer('sky')) {
      this.map.removeLayer('sky');
    }

    // Réduire le brouillard pour une meilleure visibilité satellite
    this.map.setFog({
      'range': [2, 30],
      'color': 'rgba(255, 255, 255, 0.1)',
      'horizon-blend': 0.05
    });
  }

  getCurrentStyle() {
    return this.currentStyle;
  }

  // Méthode pour appliquer des effets spéciaux
  applySpecialEffects(enabled: boolean) {
    if (enabled) {
      // Activer les effets 3D
      this.map.easeTo({
        pitch: 45,
        duration: 1000
      });
    } else {
      // Désactiver les effets 3D
      this.map.easeTo({
        pitch: 0,
        duration: 1000
      });
    }
  }

  // Méthode pour ajuster la luminosité selon l'heure
  adjustForTimeOfDay() {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 18) {
      // Jour - mode clair
      this.setStyle('light');
    } else {
      // Nuit - mode sombre
      this.setStyle('dark');
    }
  }
}