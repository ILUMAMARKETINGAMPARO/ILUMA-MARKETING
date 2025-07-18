import React from 'react';
import MPEContainer from '@/components/mpe/MPEContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    category: string;
    features: string[];
    link: string;
  };
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <MPEContainer
      key={service.id}
      animation="slide-up"
      className={`animate-slide-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Card className="glass-effect border-white/20 hover:border-white/30 transition-all duration-500 hover-glow h-full">
        <CardHeader>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-4 glow-effect">
            <service.icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl text-white">{service.title}</CardTitle>
          <CardDescription className="text-white/70">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white/80">Fonctionnalités incluses :</h4>
            <ul className="space-y-1">
              {service.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-white/60 flex items-center">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-end mb-4">
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Premium
              </Badge>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white hover-glow"
              onClick={() => window.location.href = service.link}
            >
              Voir le projet
            </Button>
          </div>
        </CardContent>
      </Card>
    </MPEContainer>
  );
};

export default ServiceCard;