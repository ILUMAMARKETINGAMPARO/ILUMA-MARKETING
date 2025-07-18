import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'lucide-react';

const HubSettings: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Configuration Générale</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <span className="text-white">Notifications email</span>
            <Button size="sm" variant="outline" className="border-white/20 text-white">
              Activer
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <span className="text-white">Optimisation automatique</span>
            <Button size="sm" variant="outline" className="border-white/20 text-white">
              Configurer
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <span className="text-white">Rapports automatiques</span>
            <Button size="sm" variant="outline" className="border-white/20 text-white">
              Planifier
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Intégrations</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <Link className="w-4 h-4 text-green-400" />
            <span className="text-white flex-1">CRM connecté</span>
            <Badge className="bg-green-500/20 text-green-300">Actif</Badge>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <Link className="w-4 h-4 text-gray-400" />
            <span className="text-white flex-1">Google Analytics</span>
            <Button size="sm" variant="outline" className="border-white/20 text-white">
              Connecter
            </Button>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <Link className="w-4 h-4 text-gray-400" />
            <span className="text-white flex-1">Zapier</span>
            <Button size="sm" variant="outline" className="border-white/20 text-white">
              Connecter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HubSettings;