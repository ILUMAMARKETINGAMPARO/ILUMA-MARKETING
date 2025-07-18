import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Globe, Calendar, TrendingUp } from 'lucide-react';
import { ClientFiche } from '@/types/crm';

interface CRMClientDetailsProps {
  client: ClientFiche | null;
}

const CRMClientDetails: React.FC<CRMClientDetailsProps> = ({ client }) => {
  if (!client) {
    return (
      <Card className="glass-effect border-white/20 p-8 text-center">
        <div className="text-white/60">
          Sélectionnez un client pour voir ses détails
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{client.name}</h2>
            <Badge className="bg-blue-500/20 text-blue-300 mb-2">
              {client.sector}
            </Badge>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="w-4 h-4" />
              {client.address}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#FFD56B] mb-1">
              {client.ilaScore?.current ?? 0}
            </div>
            <div className="text-white/60 text-sm">Score ILA™</div>
            <div className={`flex items-center gap-1 text-sm ${
              client.ilaScore?.trend === 'up' ? 'text-green-400' : 
              client.ilaScore?.trend === 'down' ? 'text-red-400' : 'text-white/60'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {client.ilaScore?.trend ?? 'stable'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {client.contact.email && (
            <div className="flex items-center gap-2 text-white/80">
              <Mail className="w-4 h-4 text-cyan-400" />
              {client.contact.email}
            </div>
          )}
          {client.contact.phone && (
            <div className="flex items-center gap-2 text-white/80">
              <Phone className="w-4 h-4 text-green-400" />
              {client.contact.phone}
            </div>
          )}
          {client.contact.website && (
            <div className="flex items-center gap-2 text-white/80">
              <Globe className="w-4 h-4 text-purple-400" />
              <a href={client.contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                Site web
              </a>
            </div>
          )}
          <div className="flex items-center gap-2 text-white/80">
            <Calendar className="w-4 h-4 text-yellow-400" />
            Client depuis {new Date(client.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Services</h3>
            <div className="flex flex-wrap gap-2">
              {client.services.map((service, index) => (
                <Badge key={index} className="bg-[#8E44FF]/20 text-[#8E44FF]">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Revenus</h3>
            <div className="text-2xl font-bold text-green-400">
              {client.revenue.toLocaleString('fr-CA', {
                style: 'currency',
                currency: 'CAD',
                minimumFractionDigits: 0
              })}/mois
            </div>
          </div>

          {client.notes && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Notes</h3>
              <p className="text-white/70">{client.notes}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CRMClientDetails;