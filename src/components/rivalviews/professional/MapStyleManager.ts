import mapboxgl from 'mapbox-gl';

export type MapStyle = 'light' | 'dark' | 'satellite';

export class MapStyleManager {
  private map: mapboxgl.Map;
  private currentStyle: MapStyle = 'light';

  private styles: Record<MapStyle, string> = {
    light: 'mapbox://styles/mapbox/light-v11',
    dark: 'mapbox://styles/mapbox/dark-v11',
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12'
  };

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  setStyle(style: MapStyle): void {
    if (this.currentStyle === style) return;

    console.log(`🎨 Changement de style: ${this.currentStyle} → ${style}`);
    
    this.currentStyle = style;
    
    // Sauvegarder l'état actuel de la carte
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();
    const bearing = this.map.getBearing();
    const pitch = this.map.getPitch();

    // Appliquer le nouveau style
    this.map.setStyle(this.styles[style]);

    // Restaurer l'état après le chargement du style
    this.map.once('styledata', () => {
      this.map.jumpTo({
        center,
        zoom,
        bearing,
        pitch
      });

      // Appliquer les customizations selon le style
      this.applyStyleCustomizations(style);
    });
  }

  private applyStyleCustomizations(style: MapStyle): void {
    try {
      switch (style) {
        case 'light':
          this.applyLightStyleCustomizations();
          break;
        case 'dark':
          this.applyDarkStyleCustomizations();
          break;
        case 'satellite':
          this.applySatelliteStyleCustomizations();
          break;
      }
    } catch (error) {
      console.warn('⚠️ Erreur lors de l\'application des customizations:', error);
    }
  }

  private applyLightStyleCustomizations(): void {
    // Personnalisations pour le thème clair
    this.map.setPaintProperty('water', 'fill-color', '#E0F7FA');
    
    // Améliorer la visibilité des routes
    if (this.map.getLayer('road-primary')) {
      this.map.setPaintProperty('road-primary', 'line-color', '#4A90E2');
      this.map.setPaintProperty('road-primary', 'line-width', 2);
    }

    // Zones urbaines plus subtiles
    if (this.map.getLayer('landuse')) {
      this.map.setPaintProperty('landuse', 'fill-opacity', 0.3);
    }
  }

  private applyDarkStyleCustomizations(): void {
    // Personnalisations pour le thème sombre
    this.map.setPaintProperty('water', 'fill-color', '#1a365d');
    
    // Routes plus visibles en mode sombre
    if (this.map.getLayer('road-primary')) {
      this.map.setPaintProperty('road-primary', 'line-color', '#63B3ED');
      this.map.setPaintProperty('road-primary', 'line-width', 2.5);
    }
  }

  private applySatelliteStyleCustomizations(): void {
    // Personnalisations pour le mode satellite
    // Améliorer la lisibilité des labels
    if (this.map.getLayer('settlement-major-label')) {
      this.map.setPaintProperty('settlement-major-label', 'text-color', '#ffffff');
      this.map.setPaintProperty('settlement-major-label', 'text-halo-color', '#000000');
      this.map.setPaintProperty('settlement-major-label', 'text-halo-width', 2);
    }

    // Routes plus contrastées
    if (this.map.getLayer('road-primary')) {
      this.map.setPaintProperty('road-primary', 'line-color', '#FFD700');
      this.map.setPaintProperty('road-primary', 'line-width', 3);
    }
  }

  getCurrentStyle(): MapStyle {
    return this.currentStyle;
  }

  getAvailableStyles(): MapStyle[] {
    return Object.keys(this.styles) as MapStyle[];
  }

  // Animations fluides entre les styles
  animateStyleTransition(targetStyle: MapStyle, duration: number = 1000): void {
    if (this.currentStyle === targetStyle) return;

    // Créer une transition fluide
    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const transition = () => {
      currentStep++;
      const progress = currentStep / steps;
      
      // Appliquer une interpolation d'opacité pour un effet de fondu
      if (currentStep === Math.floor(steps / 2)) {
        this.setStyle(targetStyle);
      }
      
      if (currentStep < steps) {
        setTimeout(transition, stepDuration);
      }
    };

    transition();
  }
}