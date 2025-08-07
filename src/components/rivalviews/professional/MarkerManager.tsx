import mapboxgl from 'mapbox-gl';
import { RivalBusiness } from '@/types/rivalviews';

export class MarkerManager {
  private map: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  private getIndustryEmoji(sector: string): string {
    const originalSector = sector;
    const sectorLower = sector.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    console.log(`🔍 Analyse secteur: "${originalSector}" → "${sectorLower}"`);
    
    // École de conduite (73 entreprises)
    if (sectorLower.includes('ecole') && sectorLower.includes('conduite')) {
      console.log('✅ Trouvé: École de conduite → 🚗');
      return '🚗';
    }
    if (sectorLower.includes('conduite') || sectorLower.includes('driving')) {
      console.log('✅ Trouvé: Conduite → 🚗');
      return '🚗';
    }
    
    // Lunetterie (60 entreprises)  
    if (sectorLower.includes('lunetterie') || sectorLower.includes('optique') || sectorLower.includes('opticien')) {
      console.log('✅ Trouvé: Lunetterie → 👓');
      return '👓';
    }
    if (sectorLower.includes('optometri') || sectorLower.includes('vision')) {
      console.log('✅ Trouvé: Vision → 👓');
      return '👓';
    }
    
    // Magasin de meubles (32 entreprises)
    if (sectorLower.includes('meubles') || sectorLower.includes('meuble')) {
      console.log('✅ Trouvé: Meubles → 🪑');
      return '🪑';
    }
    if (sectorLower.includes('furniture')) {
      console.log('✅ Trouvé: Furniture → 🪑');
      return '🪑';
    }
    
    // Esthétique (29 entreprises)
    if (sectorLower.includes('esthetique') || sectorLower.includes('beaute')) {
      console.log('✅ Trouvé: Esthétique → 💅');
      return '💅';
    }
    if (sectorLower.includes('beauty') || sectorLower.includes('spa')) {
      console.log('✅ Trouvé: Beauty → 💅');
      return '💅';
    }
    
    // Vente automobile (20 entreprises)
    if (sectorLower.includes('automobile') || sectorLower.includes('auto')) {
      console.log('✅ Trouvé: Automobile → 🏎️');
      return '🏎️';
    }
    if (sectorLower.includes('vente') && sectorLower.includes('auto')) {
      console.log('✅ Trouvé: Vente auto → 🏎️');
      return '🏎️';
    }
    
    // Avocats (14 entreprises)
    if (sectorLower.includes('avocat') || sectorLower.includes('notaire')) {
      console.log('✅ Trouvé: Avocat → ⚖️');
      return '⚖️';
    }
    if (sectorLower.includes('lawyer') || sectorLower.includes('legal')) {
      console.log('✅ Trouvé: Legal → ⚖️');
      return '⚖️';
    }
    
    // Comptable (7 entreprises)
    if (sectorLower.includes('comptable') || sectorLower.includes('impot')) {
      console.log('✅ Trouvé: Comptable → 📊');
      return '📊';
    }
    if (sectorLower.includes('accounting') || sectorLower.includes('tax')) {
      console.log('✅ Trouvé: Tax → 📊');
      return '📊';
    }
    
    console.log(`❌ Aucune correspondance trouvée pour: "${originalSector}" → Défaut 🏢`);
    return '🏢'; // Défaut pour autres industries
  }

  updateMarkers(businesses: RivalBusiness[], onBusinessClick?: (business: RivalBusiness) => void) {
    console.log('🔥 MarkerManager: Mise à jour des marqueurs pour', businesses.length, 'entreprises');
    
    // Créer une clé unique pour identifier si les données ont changé
    const currentBusinessIds = businesses.map(b => b.id).sort().join(',');
    const lastBusinessIds = this.markers.map((_, index) => businesses[index]?.id || '').sort().join(',');
    
    // Vérifier si nous devons vraiment recréer les marqueurs
    if (this.markers.length === businesses.length && currentBusinessIds === lastBusinessIds) {
      console.log('⚡ Marqueurs identiques détectés, pas de mise à jour nécessaire');
      return;
    }
    
    // Nettoyer les marqueurs existants seulement si nécessaire
    this.clearMarkers();

    businesses.forEach((business, index) => {
      console.log(`🔍 Business ${index + 1}:`, {
        name: business.name,
        lat: business.lat,
        lng: business.lng,
        hasValidCoords: !(!business.lat || !business.lng || business.lat === 0 || business.lng === 0)
      });

      if (!business.lat || !business.lng || business.lat === 0 || business.lng === 0) {
        console.log(`❌ Skipping ${business.name}: coordonnées invalides`);
        return;
      }

      console.log(`✅ Creating marker for ${business.name}`);

      // Créer un élément DOM pour le marqueur personnalisé
      const el = document.createElement('div');
      el.className = 'custom-marker';
      
      // Obtenir l'émoji pour l'industrie
      const industryEmoji = this.getIndustryEmoji(business.sector);
      console.log(`🎯 Secteur: "${business.sector}" → Émoji: "${industryEmoji}"`);
      
      
      // Style du marqueur basé sur le score ILA
      const getMarkerColor = (score: number) => {
        if (score >= 80) return '#10b981'; // emerald-500
        if (score >= 60) return '#f59e0b'; // amber-500
        return '#ef4444'; // red-500
      };

      const color = getMarkerColor(business.ilaScore);
      
      el.innerHTML = `
        <div class="marker-container" style="
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div class="marker-pin" style="
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 4px 15px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            position: relative;
            backdrop-filter: blur(10px);
          ">
            ${industryEmoji}
          </div>
          <div class="score-badge" style="
            position: absolute;
            bottom: -2px;
            right: -2px;
            background: white;
            color: ${color};
            border: 2px solid ${color};
            border-radius: 12px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 9px;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          ">
            ${business.ilaScore}
          </div>
        </div>
      `;

      // Effets hover SANS déplacement - juste une légère glow
      el.addEventListener('mouseenter', () => {
        const pin = el.querySelector('.marker-pin') as HTMLElement;
        if (pin) {
          pin.style.boxShadow = `0 6px 20px rgba(0,0,0,0.3), 0 0 20px ${color}40`;
          pin.style.zIndex = '1000';
        }
      });

      el.addEventListener('mouseleave', () => {
        const pin = el.querySelector('.marker-pin') as HTMLElement;
        if (pin) {
          pin.style.boxShadow = '0 4px 15px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)';
          pin.style.zIndex = '1';
        }
      });

      // Créer le marqueur
      const marker = new mapboxgl.Marker(el)
        .setLngLat([Number(business.lng), Number(business.lat)])
        .addTo(this.map);

      // Popup au clic
      if (onBusinessClick) {
        el.addEventListener('click', () => {
          onBusinessClick(business);
        });
      }

      // Popup hover simple
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25
      }).setHTML(`
        <div class="text-sm">
          <div class="font-semibold text-gray-900">${business.name}</div>
          <div class="text-gray-600">${business.city}</div>
          <div class="text-xs mt-1">
            <span class="inline-block px-2 py-1 rounded" style="background: ${color}20; color: ${color}">
              Score: ${business.ilaScore}/100
            </span>
          </div>
        </div>
      `);

      el.addEventListener('mouseenter', () => {
        popup.setLngLat([Number(business.lng), Number(business.lat)]).addTo(this.map);
      });

      el.addEventListener('mouseleave', () => {
        popup.remove();
      });

      this.markers.push(marker);
    });

    console.log('✅ MarkerManager:', this.markers.length, 'marqueurs créés');
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  getMarkers() {
    return this.markers;
  }
}