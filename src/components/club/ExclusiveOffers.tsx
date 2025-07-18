import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Clock, ArrowRight } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  category: string;
  isNew?: boolean;
}

interface ExclusiveOffersProps {
  offers: Offer[];
}

const ExclusiveOffers: React.FC<ExclusiveOffersProps> = ({ offers }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent mb-4">
          Offres Exclusives
        </h2>
        <p className="text-white/70 text-lg">
          Profitez d'avantages réservés aux membres du Club Galactique
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <Card key={offer.id} className="glass-effect border-white/20 p-6 group hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              {offer.isNew && (
                <Badge className="bg-green-500/20 text-green-300">Nouveau</Badge>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
            <p className="text-white/70 text-sm mb-4">{offer.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-purple-400">{offer.discount}</div>
              <div className="flex items-center gap-1 text-white/60 text-xs">
                <Clock className="w-3 h-3" />
                {offer.validUntil}
              </div>
            </div>
            
            <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Profiter de l'offre
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default ExclusiveOffers;