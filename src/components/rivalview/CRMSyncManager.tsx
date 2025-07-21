import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Database, RefreshCw, CheckCircle, AlertCircle, Clock, Users, TrendingUp, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews';
import { supabase } from '@/integrations/supabase/client';
interface CRMSyncManagerProps {
  businesses: RivalBusiness[];
  onSyncComplete: (syncedCount: number) => void;
  isVisible: boolean;
}
const CRMSyncManager: React.FC<CRMSyncManagerProps> = ({
  businesses,
  onSyncComplete,
  isVisible
}) => {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed' | 'error'>('idle');
  const [syncedCount, setSyncedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Vérifier la dernière synchronisation
    const checkLastSync = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('enrichissement_history').select('created_at').eq('processed_by', 'revalviews_sync').order('created_at', {
          ascending: false
        }).limit(1).single();
        if (data && !error) {
          setLastSync(new Date(data.created_at));
        }
      } catch (error) {
        console.log('Aucune synchronisation précédente trouvée');
      }
    };
    if (isVisible) {
      checkLastSync();
    }
  }, [isVisible]);
  const syncBusinessesToCRM = async () => {
    setSyncStatus('syncing');
    setSyncedCount(0);
    setTotalCount(businesses.length);
    try {
      let successCount = 0;
      for (const business of businesses) {
        try {
          // Vérifier si l'entreprise existe déjà
          const {
            data: existingBusiness
          } = await supabase.from('businesses').select('id').eq('name', business.name).eq('city', business.city).single();
          if (!existingBusiness) {
            // Créer nouvelle entreprise
            const {
              data: newBusiness,
              error: insertError
            } = await supabase.from('businesses').insert({
              name: business.name,
              city: business.city,
              sector: business.sector,
              address: business.address || '',
              phone: business.phone || null,
              website: business.website || null,
              google_rating: business.googleRating || null,
              review_count: business.reviewCount || 0,
              ila_score: business.ilaScore,
              seo_score: Math.round(business.ilaScore * 0.8),
              position_score: Math.round(business.ilaScore * 0.9),
              reputation_score: business.googleRating ? Math.round(business.googleRating * 20) : 50,
              presence_physique_score: business.reviewCount > 10 ? 80 : 40,
              contenu_score: Math.round(business.ilaScore * 0.7),
              lat: business.lat,
              lng: business.lng,
              status: business.potential === 'high' ? 'prospect' : 'prospect',
              potential: business.potential,
              source: 'revalviews',
              ai_summary: business.notes || `Entreprise ${business.sector} avec un score ILA™ de ${business.ilaScore}`,
              last_analyzed_at: new Date().toISOString()
            }).select().single();
            if (insertError) {
              console.error('Erreur insertion:', insertError);
              continue;
            }

            // Enregistrer l'historique de synchronisation
            await supabase.from('enrichissement_history').insert({
              business_id: newBusiness.id,
              enrichment_type: 'revalviews_sync',
              data_after: {
                source: 'RivalViews™',
                sync_date: new Date().toISOString(),
                business_name: business.name,
                ila_score: business.ilaScore
              } as any,
              ai_confidence_score: 95,
              processed_by: 'revalviews_sync'
            });
            successCount++;
          } else {
            // Mettre à jour l'entreprise existante
            await supabase.from('businesses').update({
              ila_score: business.ilaScore,
              google_rating: business.googleRating || null,
              review_count: business.reviewCount || 0,
              last_analyzed_at: new Date().toISOString(),
              ai_summary: business.notes || `Score ILA™ mis à jour: ${business.ilaScore}`
            }).eq('id', existingBusiness.id);
            successCount++;
          }
          setSyncedCount(successCount);

          // Petite pause pour éviter de surcharger la base
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error('Erreur sync business:', error);
        }
      }
      setSyncStatus('completed');
      setLastSync(new Date());
      onSyncComplete(successCount);
      toast({
        title: "Synchronisation terminée",
        description: `${successCount} entreprises synchronisées avec le CRM`
      });
    } catch (error) {
      console.error('Erreur synchronisation globale:', error);
      setSyncStatus('error');
      toast({
        title: "Erreur de synchronisation",
        description: "Une erreur s'est produite lors de la synchronisation",
        variant: "destructive"
      });
    }
  };
  const getStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <RefreshCw className="w-5 h-5 text-[#8E44FF] animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#00FF88]" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Database className="w-5 h-5 text-white/60" />;
    }
  };
  const getStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return `Synchronisation... ${syncedCount}/${totalCount}`;
      case 'completed':
        return `${syncedCount} entreprises synchronisées`;
      case 'error':
        return 'Erreur de synchronisation';
      default:
        return 'Prêt à synchroniser';
    }
  };
  if (!isVisible) return null;
  return;
};
export default CRMSyncManager;