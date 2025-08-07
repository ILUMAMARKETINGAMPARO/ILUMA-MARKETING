import mapboxgl from 'mapbox-gl';
import { RivalBusiness } from '@/types/rivalviews';

export class MarkerManager {
  private map: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  private activePopup: mapboxgl.Popup | null = null;

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  private getScoreColor(score: number): { primary: string; shadow: string; gradient: string } {
    if (score >= 80) {
      return { 
        primary: '#10B981', 
        shadow: '0 0 25px rgba(16, 185, 129, 0.8)',
        gradient: 'linear-gradient(135deg, #10B981, #059669)'
      }; // Emerald - Excellent
    } else if (score >= 60) {
      return { 
        primary: '#F59E0B', 
        shadow: '0 0 25px rgba(245, 158, 11, 0.8)',
        gradient: 'linear-gradient(135deg, #F59E0B, #D97706)'
      }; // Amber - Bon
    } else if (score >= 40) {
      return { 
        primary: '#EF4444', 
        shadow: '0 0 25px rgba(239, 68, 68, 0.8)',
        gradient: 'linear-gradient(135deg, #EF4444, #DC2626)'
      }; // Red - Faible
    } else {
      return { 
        primary: '#6B7280', 
        shadow: '0 0 25px rgba(107, 114, 128, 0.8)',
        gradient: 'linear-gradient(135deg, #6B7280, #4B5563)'
      }; // Gray - Très faible
    }
  }

  private createMarkerElement(business: RivalBusiness): HTMLDivElement {
    const el = document.createElement('div');
    const colors = this.getScoreColor(business.ilaScore);
    
    el.className = 'professional-marker';
    el.style.cssText = `
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: ${colors.gradient};
      border: 3px solid white;
      box-shadow: ${colors.shadow}, 0 4px 15px rgba(0,0,0,0.3);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Score badge - plus grand et plus visible
    const scoreEl = document.createElement('div');
    scoreEl.textContent = business.ilaScore.toString();
    scoreEl.style.cssText = `
      background: rgba(255, 255, 255, 0.95);
      color: ${colors.primary};
      font-size: 11px;
      font-weight: 800;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      border: 2px solid ${colors.primary};
      backdrop-filter: blur(4px);
    `;
    el.appendChild(scoreEl);

    // Pulse animation pour les scores élevés
    if (business.ilaScore >= 80) {
      const pulseEl = document.createElement('div');
      pulseEl.style.cssText = `
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border-radius: 50%;
        border: 2px solid ${colors.primary};
        opacity: 0.6;
        animation: professional-pulse 2s infinite;
      `;
      el.appendChild(pulseEl);
      
      // Ajouter les keyframes pour l'animation
      if (!document.querySelector('#professional-marker-styles')) {
        const style = document.createElement('style');
        style.id = 'professional-marker-styles';
        style.textContent = `
          @keyframes professional-pulse {
            0% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 0.3; }
            100% { transform: scale(1.4); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }
    }

    // Hover effects améliorés
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.4)';
      el.style.zIndex = '1000';
      el.style.boxShadow = `${colors.shadow}, 0 8px 30px rgba(0,0,0,0.4)`;
      scoreEl.style.transform = 'scale(1.1)';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
      el.style.zIndex = '1';
      el.style.boxShadow = `${colors.shadow}, 0 4px 15px rgba(0,0,0,0.3)`;
      scoreEl.style.transform = 'scale(1)';
    });

    return el;
  }

  private createProfessionalPopup(business: RivalBusiness): mapboxgl.Popup {
    const colors = this.getScoreColor(business.ilaScore);
    
    const popupContent = `
      <div class="professional-popup" style="max-width: 320px; min-width: 280px;">
        <div class="popup-header" style="
          background: ${colors.gradient};
          color: white;
          padding: 16px;
          margin: -10px -10px 16px -10px;
          border-radius: 8px 8px 0 0;
          position: relative;
        ">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="flex: 1;">
              <h3 style="margin: 0; font-size: 16px; font-weight: 700; line-height: 1.3;">${business.name}</h3>
              <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 13px;">${business.sector}</p>
            </div>
            <div style="
              background: rgba(255,255,255,0.2);
              padding: 6px 10px;
              border-radius: 20px;
              font-weight: 800;
              font-size: 14px;
              backdrop-filter: blur(4px);
            ">
              ${business.ilaScore}
            </div>
          </div>
        </div>

        <div style="padding: 0 4px;">
          <!-- Localisation -->
          <div style="display: flex; align-items: center; margin-bottom: 12px; font-size: 13px; color: #6B7280;">
            <span style="margin-right: 6px;">📍</span>
            <span>${business.address}, ${business.city}</span>
          </div>

          <!-- Évaluation Google -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; font-size: 13px;">
              <span style="margin-right: 6px;">⭐</span>
              <span><strong>${business.googleRating.toFixed(1)}</strong> (${business.reviewCount} avis)</span>
            </div>
            <div style="font-size: 12px; color: #6B7280;">
              ${business.hasPhotos ? '📸 Photos' : ''}
            </div>
          </div>

          <!-- Contact -->
          <div style="margin-bottom: 16px;">
            ${business.phone ? `
              <div style="display: flex; align-items: center; margin-bottom: 6px; font-size: 13px;">
                <span style="margin-right: 6px;">📞</span>
                <a href="tel:${business.phone}" style="color: ${colors.primary}; text-decoration: none;">
                  ${business.phone}
                </a>
              </div>
            ` : ''}
            ${business.website ? `
              <div style="display: flex; align-items: center; font-size: 13px;">
                <span style="margin-right: 6px;">🌐</span>
                <a href="${business.website}" target="_blank" rel="noopener" style="
                  color: ${colors.primary}; 
                  text-decoration: none;
                  max-width: 200px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  display: inline-block;
                ">
                  ${business.website.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                </a>
              </div>
            ` : ''}
          </div>

          <!-- Métriques SEO -->
          <div style="
            background: #F9FAFB;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 16px;
            border-left: 4px solid ${colors.primary};
          ">
            <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: #374151;">
              📊 Analyse SEO & Digitale
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
              <div>
                <span style="color: #6B7280;">Mots-clés:</span>
                <strong style="color: #111827;"> ${business.indexedKeywords}</strong>
              </div>
              <div>
                <span style="color: #6B7280;">Top 10:</span>
                <strong style="color: #111827;"> ${business.top10Keywords}</strong>
              </div>
              <div>
                <span style="color: #6B7280;">Backlinks:</span>
                <strong style="color: #111827;"> ${business.backlinks}</strong>
              </div>
              <div>
                <span style="color: #6B7280;">Trafic:</span>
                <strong style="color: #111827;"> ${business.organicTraffic}</strong>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; gap: 8px;">
            <button 
              onclick="professionalSelectBusiness('${business.id}')"
              style="
                flex: 1;
                background: ${colors.primary};
                color: white;
                border: none;
                padding: 10px 16px;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
              "
              onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
            >
              📋 Analyser
            </button>
            <button 
              onclick="professionalCompareBusiness('${business.id}')"
              style="
                flex: 1;
                background: white;
                color: ${colors.primary};
                border: 2px solid ${colors.primary};
                padding: 10px 16px;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
              "
              onmouseover="this.style.background='${colors.primary}'; this.style.color='white'"
              onmouseout="this.style.background='white'; this.style.color='${colors.primary}'"
            >
              ⚖️ Comparer
            </button>
          </div>
        </div>
      </div>
    `;

    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      maxWidth: '350px',
      className: 'professional-popup-container'
    });

    popup.setHTML(popupContent);
    return popup;
  }

  updateMarkers(businesses: RivalBusiness[], onBusinessClick?: (business: RivalBusiness) => void): void {
    // Nettoyer les anciens marqueurs
    this.clearMarkers();

    console.log(`🎯 MarkerManager: Création de ${businesses.length} marqueurs professionnels`);

    businesses.forEach((business, index) => {
      const markerEl = this.createMarkerElement(business);
      const popup = this.createProfessionalPopup(business);

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([Number(business.lng), Number(business.lat)])
        .setPopup(popup);

      // Event handlers
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Fermer les autres popups
        if (this.activePopup && this.activePopup !== popup) {
          this.activePopup.remove();
        }
        
        this.activePopup = popup;
        
        if (onBusinessClick) {
          onBusinessClick(business);
        }
      });

      marker.addTo(this.map);
      this.markers.push(marker);

      if (index < 3) {
        console.log(`✅ Marqueur professionnel ${index + 1}:`, {
          name: business.name,
          coords: [business.lng, business.lat],
          score: business.ilaScore
        });
      }
    });

    // Global functions for popup actions
    (window as any).professionalSelectBusiness = (businessId: string) => {
      const business = businesses.find(b => b.id === businessId);
      if (business && onBusinessClick) {
        onBusinessClick(business);
      }
    };

    (window as any).professionalCompareBusiness = (businessId: string) => {
      const business = businesses.find(b => b.id === businessId);
      if (business) {
        window.dispatchEvent(new CustomEvent('professionalStartComparison', { detail: business }));
      }
    };

    console.log(`✅ MarkerManager: ${this.markers.length} marqueurs professionnels créés`);
  }

  clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
    
    if (this.activePopup) {
      this.activePopup.remove();
      this.activePopup = null;
    }
  }

  getMarkerCount(): number {
    return this.markers.length;
  }
}