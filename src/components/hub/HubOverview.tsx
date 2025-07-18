import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, BarChart, Settings } from 'lucide-react';

const HubOverview: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Performance Chart */}
      <Card className="glass-effect border-white/20 p-6 lg:col-span-2">
        <h3 className="text-xl font-bold text-white mb-6">Performance Globale</h3>
        <div className="h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-white/10">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-white/60">Graphique de performance interactif</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Actions Rapides</h3>
        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            <Zap className="w-4 h-4 mr-2" />
            Nouveau Service
          </Button>
          <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
            <BarChart className="w-4 h-4 mr-2" />
            Générer Rapport
          </Button>
          <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
            <Settings className="w-4 h-4 mr-2" />
            Optimisation Auto
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HubOverview;