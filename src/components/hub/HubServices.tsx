import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';

interface Service {
  name: string;
  status: 'active' | 'pending';
  performance: number;
  leads: number;
  trend: string;
  color: string;
}

interface HubServicesProps {
  services: Service[];
}

const HubServices: React.FC<HubServicesProps> = ({ services }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card key={service.name} className="glass-effect border-white/20 p-6 group hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">{service.name}</h3>
            <Badge className={`px-3 py-1 rounded-full text-xs font-medium ${
              service.status === 'active' ? 'bg-green-500/20 border-green-500/30 text-green-300' :
              'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
            }`}>
              {service.status === 'active' ? 'Actif' : 'En attente'}
            </Badge>
          </div>
          
          {service.status === 'active' && (
            <>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Performance</span>
                  <span className="text-white">{service.performance}%</span>
                </div>
                <Progress value={service.performance} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold text-white">{service.leads}</div>
                  <div className="text-white/60 text-xs">Leads ce mois</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{service.trend}</div>
                  <div className="text-white/60 text-xs">Évolution</div>
                </div>
              </div>
            </>
          )}
          
          <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            Gérer le service
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default HubServices;