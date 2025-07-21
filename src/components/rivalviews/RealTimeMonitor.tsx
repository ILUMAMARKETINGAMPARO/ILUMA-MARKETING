import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Wifi, Database, Zap, Clock, TrendingUp, MapPin, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
interface RealTimeMonitorProps {
  isActive: boolean;
  businessCount: number;
  lastUpdate: Date;
  onRefresh: () => void;
}
interface SystemMetric {
  name: string;
  value: string | number;
  status: 'good' | 'warning' | 'error';
  trend?: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}
const RealTimeMonitor: React.FC<RealTimeMonitorProps> = ({
  isActive,
  businessCount,
  lastUpdate,
  onRefresh
}) => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulation de métriques temps réel
  useEffect(() => {
    const updateMetrics = () => {
      const newMetrics: SystemMetric[] = [{
        name: 'Mapbox API',
        value: 'Connecté',
        status: 'good',
        icon: MapPin
      }, {
        name: 'Sync Rate',
        value: `${Math.floor(Math.random() * 50) + 50}/min`,
        status: 'good',
        trend: 'up',
        icon: Activity
      }, {
        name: 'Data Quality',
        value: `${95 + Math.floor(Math.random() * 5)}%`,
        status: 'good',
        trend: 'stable',
        icon: Database
      }, {
        name: 'Response Time',
        value: `${Math.floor(Math.random() * 50) + 120}ms`,
        status: 'good',
        trend: 'down',
        icon: Zap
      }, {
        name: 'Businesses',
        value: businessCount,
        status: 'good',
        trend: 'up',
        icon: TrendingUp
      }];
      setMetrics(newMetrics);
    };
    updateMetrics();
    const interval = setInterval(updateMetrics, 3000);
    return () => clearInterval(interval);
  }, [businessCount]);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-3 h-3" />;
      case 'warning':
        return <AlertCircle className="w-3 h-3" />;
      case 'error':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Activity className="w-3 h-3" />;
    }
  };
  const getTrendIcon = (trend?: string) => {
    if (!trend) return null;
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down':
        return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      case 'stable':
        return <Activity className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  return <motion.div initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} className="fixed bottom-4 right-4 z-40">
      <Card className="glass-effect border-white/20 w-80">
        
      </Card>
    </motion.div>;
};
export default RealTimeMonitor;