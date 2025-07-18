import React from 'react';
import MPEContainer from '@/components/mpe/MPEContainer';
import SearchAndFilter from './SearchAndFilter';
import { Target } from 'lucide-react';

interface HubHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  categories: Array<{ id: string; label: string; count: number }>;
}

const HubHero: React.FC<HubHeroProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  categories
}) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <MPEContainer animation="fade-in" className="text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-6 glow-effect">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-gradient">HUB™</span> Services Iluma
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Découvrez notre écosystème complet de services marketing alimentés par l'IA
          </p>
          
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            categories={categories}
          />
        </MPEContainer>
      </div>
    </section>
  );
};

export default HubHero;