import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/hooks/useTranslations';

const FidelityAnalytics = () => {
  const { t } = useTranslations();

  const segments = [
    { segment: t('pageFidelisation.fidelityAnalytics.segments.box1.segment'), count: "1,247", engagement: "87%" },
    { segment: t('pageFidelisation.fidelityAnalytics.segments.box2.segment'), count: "892", engagement: "94%" },
    { segment: t('pageFidelisation.fidelityAnalytics.segments.box3.segment'), count: "234", engagement: "98%" }
  ];

  const metrics = [
    { label: t('pageFidelisation.fidelityAnalytics.metrics.box1.label'), value: t('pageFidelisation.fidelityAnalytics.metrics.box1.velue'), trend: "+45%" },
    { label: t('pageFidelisation.fidelityAnalytics.metrics.box2.label'), value: "89.3%", trend: "+12%" },
    { label: t('pageFidelisation.fidelityAnalytics.metrics.box3.label'), value: "3.2x/mois", trend: "+67%" },
    { label: t('pageFidelisation.fidelityAnalytics.metrics.box4.label'), value: "73", trend: "+28%" }
  ];

  const automations = [
    { action: t('pageFidelisation.fidelityAnalytics.automations.box1.action'), status: t('pageFidelisation.fidelityAnalytics.automations.box1.status') },
    { action: t('pageFidelisation.fidelityAnalytics.automations.box2.action'), status: t('pageFidelisation.fidelityAnalytics.automations.box2.status') },
    { action: t('pageFidelisation.fidelityAnalytics.automations.box3.action'), status: t('pageFidelisation.fidelityAnalytics.automations.box3.status') },
    { action: t('pageFidelisation.fidelityAnalytics.automations.box4.action'), status: t('pageFidelisation.fidelityAnalytics.automations.box4.status') }
  ];

  return (
    <div className="space-y-8">
      {/* Segmentation */}
      <div className="grid md:grid-cols-3 gap-6">
        {segments.map((segment) => (
          <Card key={segment.segment} className="glass-effect border-white/20 p-6">
            <h4 className="text-xl font-bold text-white mb-4">{segment.segment}</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Volume</span>
                <span className="text-white font-bold">{segment.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Engagement</span>
                <span className="text-green-400 font-bold">{segment.engagement}</span>
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-pink-600 to-purple-600">
                Configurer Segment
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-effect border-white/20 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Métriques de Fidélité</h3>
          <div className="space-y-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-white/70">{metric.label}</span>
                <div className="text-right">
                  <div className="text-white font-bold">{metric.value}</div>
                  <div className="text-green-400 text-xs">{metric.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-effect border-white/20 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Actions Automatisées</h3>
          <div className="space-y-3">
            {automations.map((automation) => (
              <div key={automation.action} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-white">{automation.action}</span>
                <Badge className={`${automation.status === 'Actif' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                  {automation.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FidelityAnalytics;