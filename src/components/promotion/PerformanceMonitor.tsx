import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, Download, RefreshCw } from 'lucide-react';
import { usePromotionMonitoring } from '@/hooks/usePromotionMonitoring.ts';

const PerformanceMonitor: React.FC = memo(() => {
  const { 
    metrics, 
    alerts, 
    isLoading, 
    realTimeData, 
    exportMetrics, 
    refreshMetrics 
  } = usePromotionMonitoring();

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Chargement des métriques...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) return null;

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatTime = (ms: number) => `${Math.round(ms / 1000)}s`;

  const getMetricTrend = (current: number, threshold: number) => {
    if (current > threshold * 1.1) return { icon: TrendingUp, color: 'text-green-500' };
    if (current < threshold * 0.9) return { icon: TrendingDown, color: 'text-red-500' };
    return { icon: TrendingUp, color: 'text-yellow-500' };
  };

  const activeAlerts = alerts.filter(alert => {
    if (!alert.isActive) return false;
    
    let currentValue = 0;
    switch (alert.metric) {
      case 'conversionRate':
        currentValue = metrics.conversionRate;
        break;
      case 'averageCompletionTime':
        currentValue = metrics.averageCompletionTime;
        break;
      case 'stepDropoffRates':
        currentValue = Math.max(...Object.values(metrics.stepDropoffRates));
        break;
    }
    
    return alert.condition === 'above' 
      ? currentValue > alert.threshold
      : currentValue < alert.threshold;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Alertes actives */}
      {activeAlerts.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-destructive">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Alertes Actives ({activeAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {activeAlerts.map(alert => (
              <Badge key={alert.id} variant="destructive" className="mr-2">
                {alert.metric} {alert.condition} {alert.threshold}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux de Conversion</p>
                <p className="text-2xl font-bold text-primary">
                  {formatPercentage(metrics.conversionRate)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Temps Moyen</p>
                <p className="text-2xl font-bold text-secondary-foreground">
                  {formatTime(metrics.averageCompletionTime)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-secondary-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-accent/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sessions Totales</p>
                <p className="text-2xl font-bold text-accent-foreground">
                  {metrics.userEngagement.totalSessions}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance des variants */}
      <Card>
        <CardHeader>
          <CardTitle>Performance des Variants A/B</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(metrics.variantPerformance).map(([variant, data]) => (
              <div key={variant} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{variant}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {data.views} vues • {data.conversions} conversions
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{formatPercentage(data.conversionRate)}</span>
                  {(() => {
                    const { icon: Icon, color } = getMetricTrend(data.conversionRate, 0.15);
                    return <Icon className={`w-4 h-4 ${color}`} />;
                  })()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Abandon par étape */}
      <Card>
        <CardHeader>
          <CardTitle>Taux d'Abandon par Étape</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(metrics.stepDropoffRates).map(([step, rate]) => (
              <div key={step} className="flex items-center justify-between">
                <span className="text-sm">Étape {step}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500"
                      style={{ width: `${rate * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold">{formatPercentage(rate)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Dernière mise à jour: {new Date().toLocaleTimeString()}
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={refreshMetrics}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline" size="sm" onClick={exportMetrics}>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;