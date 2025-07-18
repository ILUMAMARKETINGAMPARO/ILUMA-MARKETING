import React from 'react';
import ServiceCard from './ServiceCard';
import { Search } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
  features: string[];
  link: string;
}

interface ServicesGridProps {
  filteredServices: Service[];
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ filteredServices }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        
        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Aucun service trouvé</h3>
            <p className="text-white/60">Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;
