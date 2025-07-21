import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Network, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const NetworkActions = () => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="glass-effect border-emerald-500/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300 font-medium">{t('knowledge.network.share')}</span>
        </div>
        <p className="text-white/70 text-sm mb-3">
          Ajouter une nouvelle connaissance au réseau collectif
        </p>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          {t('knowledge.network.contribute')}
        </Button>
      </Card>

      <Card className="glass-effect border-blue-500/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Network className="w-5 h-5 text-blue-400" />
          <span className="text-blue-300 font-medium">{t('knowledge.network.explore')}</span>
        </div>
        <p className="text-white/70 text-sm mb-3">
          Naviguer dans la carte interactive des connaissances
        </p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          {t('knowledge.network.explore')}
        </Button>
      </Card>

      <Card className="glass-effect border-purple-500/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-purple-400" />
          <span className="text-purple-300 font-medium">{t('knowledge.network.ai.recommendations')}</span>
        </div>
        <p className="text-white/70 text-sm mb-3">
          Découvrir des connexions suggérées par l'IA
        </p>
        <Button className="w-full bg-purple-600 hover:bg-purple-700">
          {t('knowledge.network.ai.suggestions')}
        </Button>
      </Card>
    </div>
  );
};

export default NetworkActions;