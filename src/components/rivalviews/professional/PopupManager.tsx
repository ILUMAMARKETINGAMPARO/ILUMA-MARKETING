import mapboxgl from 'mapbox-gl';
import { RivalBusiness } from '@/types/rivalviews';

export class PopupManager {
  private map: mapboxgl.Map;
  private currentPopup: mapboxgl.Popup | null = null;

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  showBusinessPopup(business: RivalBusiness, coordinates: [number, number]) {
    // Fermer le popup existant
    this.closePopup();

    const getScoreColor = (score: number) => {
      if (score >= 80) return '#10b981'; // emerald-500
      if (score >= 60) return '#f59e0b'; // amber-500
      return '#ef4444'; // red-500
    };

    const scoreColor = getScoreColor(business.ilaScore);

    const popupContent = `
      <div class="business-popup" style="min-width: 280px; font-family: system-ui;">
        <div style="padding: 16px;">
          <!-- En-tête -->
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
            <div style="flex: 1;">
              <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1f2937; line-height: 1.3;">
                ${business.name}
              </h3>
              <div style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style="font-size: 13px; color: #6b7280;">${business.city}</span>
              </div>
            </div>
            <div style="
              background: ${scoreColor}15;
              color: ${scoreColor};
              padding: 4px 8px;
              border-radius: 8px;
              font-size: 12px;
              font-weight: 600;
              border: 1px solid ${scoreColor}30;
            ">
              ${business.ilaScore}/100
            </div>
          </div>

          <!-- Score ILA -->
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 13px; color: #6b7280;">Score ILA™</span>
              <span style="font-size: 14px; font-weight: 600; color: ${scoreColor};">
                ${business.ilaScore}/100
              </span>
            </div>
            <div style="width: 100%; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
              <div style="
                height: 100%; 
                background: ${scoreColor}; 
                width: ${business.ilaScore}%; 
                transition: width 0.3s ease;
                border-radius: 3px;
              "></div>
            </div>
          </div>

          <!-- Secteur -->
          <div style="margin-bottom: 12px;">
            <span style="
              background: #8b5cf620;
              color: #8b5cf6;
              padding: 2px 8px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 500;
              border: 1px solid #8b5cf630;
            ">
              ${business.sector}
            </span>
          </div>

          <!-- Informations contact -->
          <div style="margin-bottom: 12px; space-y: 6px;">
            ${business.phone ? `
              <div style="display: flex; align-items: center; gap: 6px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:${business.phone}" style="font-size: 12px; color: #3b82f6; text-decoration: none;">
                  ${business.phone}
                </a>
              </div>
            ` : ''}
            
            ${business.website ? `
              <div style="display: flex; align-items: center; gap: 6px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <a href="${business.website}" target="_blank" style="font-size: 12px; color: #3b82f6; text-decoration: none;">
                  Site web
                </a>
              </div>
            ` : ''}
          </div>

          <!-- Métriques -->
          ${business.googleStars ? `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0;">
              <div style="display: flex; align-items: center; gap: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
                <span style="font-size: 12px; color: #6b7280;">Google</span>
              </div>
              <span style="font-size: 12px; font-weight: 600; color: #fbbf24;">
                ${business.googleStars} (${business.googleReviews || 0})
              </span>
            </div>
          ` : ''}

          <!-- Action -->
          <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
            <button 
              onclick="window.dispatchEvent(new CustomEvent('businessPopupClick', { detail: ${JSON.stringify(business).replace(/"/g, '&quot;')} }))"
              style="
                width: 100%;
                background: linear-gradient(135deg, #8b5cf6, #7c3aed);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
              "
              onmouseover="this.style.background='linear-gradient(135deg, #7c3aed, #6d28d9)'"
              onmouseout="this.style.background='linear-gradient(135deg, #8b5cf6, #7c3aed)'"
            >
              Voir les détails
            </button>
          </div>
        </div>
      </div>
    `;

    this.currentPopup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      maxWidth: '320px',
      className: 'business-popup-container'
    })
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(this.map);

    return this.currentPopup;
  }

  closePopup() {
    if (this.currentPopup) {
      this.currentPopup.remove();
      this.currentPopup = null;
    }
  }

  getCurrentPopup() {
    return this.currentPopup;
  }
}