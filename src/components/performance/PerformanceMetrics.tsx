import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  score: number; // Overall Performance Score
}

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    score: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate performance measurement
    const measurePerformance = () => {
      // Mock performance data - in real implementation, use Web Vitals API
      const mockMetrics: PerformanceMetrics = {
        lcp: 1.2, // seconds
        fid: 45,  // milliseconds
        cls: 0.05, // score
        ttfb: 180, // milliseconds
        score: 96   // percentage
      };

      setTimeout(() => {
        setMetrics(mockMetrics);
        setIsLoading(false);
      }, 1500);
    };

    measurePerformance();
  }, []);

  const getScoreColor = (value: number, thresholds: { good: number; needs: number }) => {
    if (value <= thresholds.good) return 'text-green-400';
    if (value <= thresholds.needs) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (value: number, thresholds: { good: number; needs: number }) => {
    if (value <= thresholds.good) return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Excellent</Badge>;
    if (value <= thresholds.needs) return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Bon</Badge>;
    return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">À améliorer</Badge>;
  };

  if (isLoading) {
    return (
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-[#8E44FF] animate-pulse" />
          <h3 className="text-lg font-semibold text-white font-['Montserrat']">
            Analyse des Performance Web
          </h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-white/5 rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#8E44FF]" />
          <h3 className="text-lg font-semibold text-white font-['Montserrat']">
            Performance Web
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white font-['Montserrat']">
            {metrics.score}
          </span>
          <CheckCircle className="w-5 h-5 text-green-400" />
        </div>
      </div>

      <div className="space-y-4">
        {/* LCP - Largest Contentful Paint */}
        <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-blue-400" />
            <div>
              <div className="text-white font-medium font-['Montserrat']">LCP</div>
              <div className="text-white/60 text-sm font-['Montserrat']">Largest Contentful Paint</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold font-['Montserrat'] ${getScoreColor(metrics.lcp, { good: 2.5, needs: 4.0 })}`}>
              {metrics.lcp}s
            </div>
            {getScoreBadge(metrics.lcp, { good: 2.5, needs: 4.0 })}
          </div>
        </div>

        {/* FID - First Input Delay */}
        <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-white font-medium font-['Montserrat']">FID</div>
              <div className="text-white/60 text-sm font-['Montserrat']">First Input Delay</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold font-['Montserrat'] ${getScoreColor(metrics.fid, { good: 100, needs: 300 })}`}>
              {metrics.fid}ms
            </div>
            {getScoreBadge(metrics.fid, { good: 100, needs: 300 })}
          </div>
        </div>

        {/* CLS - Cumulative Layout Shift */}
        <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <div>
              <div className="text-white font-medium font-['Montserrat']">CLS</div>
              <div className="text-white/60 text-sm font-['Montserrat']">Cumulative Layout Shift</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold font-['Montserrat'] ${getScoreColor(metrics.cls, { good: 0.1, needs: 0.25 })}`}>
              {metrics.cls.toFixed(3)}
            </div>
            {getScoreBadge(metrics.cls, { good: 0.1, needs: 0.25 })}
          </div>
        </div>

        {/* TTFB - Time to First Byte */}
        <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-green-400" />
            <div>
              <div className="text-white font-medium font-['Montserrat']">TTFB</div>
              <div className="text-white/60 text-sm font-['Montserrat']">Time to First Byte</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold font-['Montserrat'] ${getScoreColor(metrics.ttfb, { good: 200, needs: 500 })}`}>
              {metrics.ttfb}ms
            </div>
            {getScoreBadge(metrics.ttfb, { good: 200, needs: 500 })}
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-lg border border-[#8E44FF]/30">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1 font-['Montserrat']">
            Score Global: {metrics.score}/100
          </div>
          <div className="text-white/70 text-sm font-['Montserrat']">
            Performance optimisée par Iluma™
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceMetrics;
