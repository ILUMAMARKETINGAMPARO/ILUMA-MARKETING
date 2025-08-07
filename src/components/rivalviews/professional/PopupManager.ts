import mapboxgl from 'mapbox-gl';
import { RivalBusiness } from '@/types/rivalviews';

export class PopupManager {
  private map: mapboxgl.Map;
  private activePopup: mapboxgl.Popup | null = null;

  constructor(map: mapboxgl.Map) {
    this.map = map;
  }

  private getScoreColor(score: number): string {
    if (score >= 80) return '#10b981'; // emerald-500
    if (score >= 60) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  }

  private getScoreLabel(score: number): { text: string; color: string } {
    if (score >= 80) return { text: 'Excellent', color: 'text-emerald-600' };
    if (score >= 60) return { text: 'Correct', color: 'text-amber-600' };
    return { text: 'Faible', color: 'text-red-600' };
  }

  createBusinessPopup(business: RivalBusiness): mapboxgl.Popup {
    const scoreColor = this.getScoreColor(business.ilaScore);
    const scoreLabel = this.getScoreLabel(business.ilaScore);

    const popup = new mapboxgl.Popup({
      offset: 35,
      className: 'professional-business-popup',
      closeButton: true,
      closeOnClick: false,
      maxWidth: '420px',
      anchor: 'bottom'
    });

    const popupHTML = `
      <div class="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
        <!-- Header with gradient -->
        <div class="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-5">
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-3 h-3 rounded-full animate-pulse" style="background: ${scoreColor}"></div>
                <h3 class="text-white font-bold text-lg leading-tight truncate">${business.name}</h3>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-slate-300 text-sm">Score ILA™</span>
                <div class="flex items-center gap-2">
                  <div class="px-3 py-1 rounded-full text-sm font-bold text-white shadow-lg" style="background: ${scoreColor}">
                    ${business.ilaScore}
                  </div>
                  <span class="text-xs ${scoreLabel.color} bg-white px-2 py-1 rounded-full font-medium">
                    ${scoreLabel.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content -->
        <div class="p-5 space-y-4">
          <!-- Location -->
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 text-slate-400 flex-shrink-0 mt-1">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-slate-900 font-medium leading-tight">${business.address}</div>
              <div class="text-slate-600 text-sm font-medium">${business.city}, QC</div>
            </div>
          </div>

          <!-- Business info -->
          <div class="grid grid-cols-1 gap-3">
            <!-- Sector -->
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 text-slate-400 flex-shrink-0">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                  <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-slate-700 font-medium capitalize">${business.sector}</span>
            </div>

            <!-- Google Rating -->
            ${business.googleRating ? `
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 text-yellow-500 flex-shrink-0">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-slate-900 font-semibold">${business.googleRating.toFixed(1)}</span>
                  <span class="text-slate-600">•</span>
                  <span class="text-slate-600">${business.reviewCount} avis</span>
                </div>
              </div>
            ` : ''}

            <!-- Contact info -->
            ${business.phone ? `
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 text-slate-400 flex-shrink-0">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <span class="text-slate-700 font-mono text-sm">${business.phone}</span>
              </div>
            ` : ''}

            <!-- Website -->
            ${business.website ? `
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 text-slate-400 flex-shrink-0">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-blue-600 text-sm truncate">${business.website.replace(/^https?:\/\//, '')}</span>
              </div>
            ` : ''}
          </div>

          <!-- SEO Metrics -->
          ${business.backlinks > 0 || business.indexedKeywords > 0 ? `
            <div class="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-4 h-4 text-blue-600">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                  </svg>
                </div>
                <span class="text-slate-700 font-semibold text-sm">Métriques SEO</span>
              </div>
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="text-center p-2 bg-white rounded border">
                  <div class="text-lg font-bold text-slate-900">${business.backlinks}</div>
                  <div class="text-xs text-slate-600">Backlinks</div>
                </div>
                <div class="text-center p-2 bg-white rounded border">
                  <div class="text-lg font-bold text-slate-900">${business.indexedKeywords}</div>
                  <div class="text-xs text-slate-600">Mots-clés</div>
                </div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Action buttons -->
        <div class="p-5 bg-slate-50 border-t border-slate-200">
          <div class="flex gap-3">
            <button 
              onclick="window.popupSelectBusiness('${business.id}')" 
              class="flex-1 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div class="flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                <span>Analyser en détail</span>
              </div>
            </button>
            <button 
              onclick="window.popupCompareBusiness('${business.id}')" 
              class="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div class="flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
                <span>Comparer</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;

    popup.setHTML(popupHTML);
    return popup;
  }

  showBusinessPopup(
    business: RivalBusiness, 
    coordinates: [number, number],
    onSelect?: (business: RivalBusiness) => void,
    onCompare?: (business: RivalBusiness) => void
  ): void {
    // Fermer le popup actuel s'il existe
    this.closeActivePopup();

    const popup = this.createBusinessPopup(business);
    popup.setLngLat(coordinates);
    popup.addTo(this.map);

    this.activePopup = popup;

    // Setup global handlers
    (window as any).popupSelectBusiness = (businessId: string) => {
      if (businessId === business.id && onSelect) {
        onSelect(business);
      }
      this.closeActivePopup();
    };

    (window as any).popupCompareBusiness = (businessId: string) => {
      if (businessId === business.id && onCompare) {
        onCompare(business);
      }
    };

    // Auto-close après 30 secondes
    setTimeout(() => {
      this.closeActivePopup();
    }, 30000);
  }

  closeActivePopup(): void {
    if (this.activePopup) {
      this.activePopup.remove();
      this.activePopup = null;
    }
  }

  isPopupOpen(): boolean {
    return this.activePopup !== null;
  }
}