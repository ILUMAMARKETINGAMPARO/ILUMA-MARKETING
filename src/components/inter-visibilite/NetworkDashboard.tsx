import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const NetworkDashboard = () => {
  const currentNetwork = [
    { name: "TechConsult Pro", sector: "Consulting IT", audience: "150K", status: "Actif" },
    { name: "Digital Boost", sector: "Marketing", audience: "89K", status: "Actif" },
    { name: "E-com Masters", sector: "E-commerce", audience: "234K", status: "Partenaire" },
    { name: "Growth Hackers", sector: "Startups", audience: "67K", status: "Nouveau" }
  ];

  const candidates = [
    { name: "WebFlow Experts", compatibility: "94%", reason: "Audience similaire" },
    { name: "Content Kings", compatibility: "87%", reason: "Services complémentaires" },
    { name: "Social Media Pro", compatibility: "91%", reason: "Synergies SEO" },
    { name: "Data Analytics Co", compatibility: "83%", reason: "Partenariat stratégique" }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Réseau Actuel Iluma™</h3>
        <div className="space-y-3">
          {currentNetwork.map((partner) => (
            <div key={partner.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div>
                <div className="text-white font-medium">{partner.name}</div>
                <div className="text-white/60 text-sm">{partner.sector} • {partner.audience} audience</div>
              </div>
              <Badge className={`${
                partner.status === 'Actif' ? 'bg-green-500/20 text-green-300' :
                partner.status === 'Partenaire' ? 'bg-blue-500/20 text-blue-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {partner.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Candidats Recommandés</h3>
        <div className="space-y-3">
          {candidates.map((candidate) => (
            <div key={candidate.name} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-medium">{candidate.name}</div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-green-400 font-bold">{candidate.compatibility}</span>
                </div>
              </div>
              <div className="text-white/60 text-sm">{candidate.reason}</div>
              <Button size="sm" className="mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                Contacter
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NetworkDashboard;