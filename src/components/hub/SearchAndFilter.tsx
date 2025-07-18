import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  categories: Array<{ id: string; label: string; count: number }>;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  categories
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <Input
          type="text"
          placeholder="Rechercher un service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 glass-effect border-white/20 text-white placeholder:text-white/60 bg-white/5"
        />
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeFilter === category.id ? "default" : "outline"}
            onClick={() => setActiveFilter(category.id)}
            className={`${
              activeFilter === category.id
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'glass-effect border-white/20 text-white hover:bg-white/10'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            {category.label}
            <Badge variant="secondary" className="ml-2 bg-white/20">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
