import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Monitor, Play, Globe } from 'lucide-react';

interface NetworkSelectorProps {
  selectedNetworks: string[];
  onNetworksChange: (networks: string[]) => void;
  businessContext: { industry: string; city: string; goal: string } | null;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  selectedNetworks,
  onNetworksChange,
  businessContext
}) => {
  const networks = [
    {
      id: 'Search',
      name: 'Google Search',
      icon: Search,
      description: 'Résultats de recherche Google',
      color: 'from-blue-500 to-cyan-500',
      recommended: businessContext?.industry === 'automobile'
    },
    {
      id: 'Display',
      name: 'Display Network',
      icon: Monitor,
      description: 'Sites partenaires et blogs',
      color: 'from-green-500 to-teal-500',
      recommended: businessContext?.industry === 'furniture'
    },
    {
      id: 'YouTube',
      name: 'YouTube Ads',
      icon: Play,
      description: 'Vidéos YouTube ciblées',
      color: 'from-red-500 to-pink-500',
      recommended: businessContext?.industry === 'mattress'
    },
    {
      id: 'Shopping',
      name: 'Google Shopping',
      icon: Globe,
      description: 'Fiches produits Google',
      color: 'from-purple-500 to-indigo-500',
      recommended: false
    }
  ];

  const toggleNetwork = (networkId: string) => {
    if (selectedNetworks.includes(networkId)) {
      onNetworksChange(selectedNetworks.filter(id => id !== networkId));
    } else {
      onNetworksChange([...selectedNetworks, networkId]);
    }
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="text-white">
          Réseaux Publicitaires
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {networks.map((network) => {
            const isSelected = selectedNetworks.includes(network.id);
            const IconComponent = network.icon;
            
            return (
              <div
                key={network.id}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-400/10 glow-effect'
                    : 'border-white/20 hover:border-white/40'
                } ${network.recommended ? 'ring-2 ring-yellow-400/50' : ''}`}
                onClick={() => toggleNetwork(network.id)}
              >
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleNetwork(network.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${network.color} flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <Label className="text-white font-medium cursor-pointer">
                          {network.name}
                        </Label>
                        {network.recommended && (
                          <div className="text-yellow-400 text-xs">Recommandé</div>
                        )}
                      </div>
                    </div>
                    <p className="text-white/60 text-sm">{network.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedNetworks.length > 0 && (
          <div className="mt-6 p-4 glass-effect rounded-xl">
            <h4 className="text-white font-medium mb-2">Réseaux sélectionnés :</h4>
            <div className="flex flex-wrap gap-2">
              {selectedNetworks.map((networkId) => {
                const network = networks.find(n => n.id === networkId);
                return network ? (
                  <div
                    key={networkId}
                    className={`px-3 py-1 rounded-full bg-gradient-to-r ${network.color} text-white text-sm`}
                  >
                    {network.name}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkSelector;