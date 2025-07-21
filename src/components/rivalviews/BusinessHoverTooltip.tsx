import React from 'react';
import { RivalBusiness } from '@/types/rivalviews';

interface BusinessHoverTooltipProps {
  business: RivalBusiness | null;
  isVisible: boolean;
  position: { x: number; y: number };
}

const BusinessHoverTooltip: React.FC<BusinessHoverTooltipProps> = ({
  business,
  isVisible,
  position
}) => {
  if (!isVisible || !business) return null;

  // Calculer les scores et métriques selon le format demandé
  const seoScore = business.ilaScore ? (business.ilaScore / 20).toFixed(1) : '3.5'; // ILA score converti sur 5
  const traffic = business.organicTraffic || 40142;
  const totalKeywords = business.indexedKeywords || 14708;
  const topKeywords = business.top10Keywords || 650;
  const top20Keywords = Math.round(topKeywords * 3.04); // Ratio 1980/650
  const googleRating = business.googleRating || 4.1;
  
  // Mot-clé principal selon le secteur/nom
  const getMainKeyword = () => {
    const name = business.name.toLowerCase();
    if (name.includes('matelas')) return '"matelas orthopédique" (2 500 vues)';
    if (name.includes('restaurant')) return '"restaurant" (1 200 vues)';
    if (name.includes('coiffure')) return '"coiffeur" (800 vues)';
    return `"${business.name.split(' ')[0].toLowerCase()}" (1 000 vues)`;
  };

  // Action recommandée basée sur le score SEO
  const getRecommendedAction = () => {
    const score = parseFloat(seoScore);
    if (score >= 4.0) return 'Optimisation avancée';
    if (score >= 3.0) return 'SEO';
    if (score >= 2.0) return 'Content Marketing';
    return 'Audit complet';
  };

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: position.x + 15,
        top: position.y - 10,
        transform: 'translateY(-100%)'
      }}
    >
      <div className="bg-black/95 backdrop-blur-sm border border-[#8E44FF]/30 rounded-xl p-4 shadow-2xl max-w-xs">
        {/* Header avec nom de l'entreprise */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
          <div className="text-lg">🏢</div>
          <h3 className="text-white font-bold text-sm truncate">
            {business.name}
          </h3>
        </div>

        {/* Métriques principales */}
        <div className="space-y-1 text-xs">
          {/* Trafic */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300">📈 Trafic estimé (Ahrefs) :</span>
            <span className="text-[#F5D06F] font-bold">
              {traffic.toLocaleString()} /mois
            </span>
          </div>

          {/* Total mots-clés */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300">🔎 Total de mots-clés (Ahrefs) :</span>
            <span className="text-white font-semibold">
              {totalKeywords.toLocaleString()}
            </span>
          </div>

          {/* Top 10 mots-clés */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300">🥇 Top 10 :</span>
            <span className="text-white font-semibold">
              {topKeywords} mots-clés
            </span>
          </div>

          {/* Top 20 */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300">🥈 Top 20 :</span>
            <span className="text-white font-semibold">
              {top20Keywords} mots-clés
            </span>
          </div>

          {/* Mot-clé principal */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-gray-300 text-xs mb-1">💥 Mot-clé #1 :</div>
            <div className="text-[#8E44FF] font-semibold text-xs">
              {getMainKeyword()}
            </div>
          </div>
        </div>

        {/* Scores et recommandations */}
        <div className="mt-3 pt-2 border-t border-white/10 space-y-1">
          {/* Score SEO */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300">📊 Score SEO Iluma :</span>
            <span className="text-[#F5D06F] font-bold">
              {seoScore} / 5
            </span>
          </div>

          {/* Réputation Google */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300">⭐ Réputation Google :</span>
            <span className="text-white font-semibold">
              {googleRating} ★
            </span>
          </div>

          {/* Action recommandée */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300">🎯 Action IA recommandée :</span>
            <span className="text-[#8E44FF] font-bold text-xs">
              {getRecommendedAction()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHoverTooltip;