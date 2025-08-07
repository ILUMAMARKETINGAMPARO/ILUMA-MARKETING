import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Crown, List, Eye } from 'lucide-react';

interface BusinessControlsProps {
  selectedCategory: string;
  viewMode: string;
  businessCount: number;
  onCategoryChange: (category: string) => void;
  onViewModeChange: (mode: string) => void;
  categories: string[];
}

export const BusinessControls: React.FC<BusinessControlsProps> = ({
  selectedCategory,
  viewMode,
  businessCount,
  onCategoryChange,
  onViewModeChange,
  categories
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Barre d'outils et contrôles */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48 bg-black/50 border-[#8E44FF]/30 text-white">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent className="bg-black border-[#8E44FF]/30">
              <SelectItem value="all" className="text-white hover:bg-[#8E44FF]/20">
                Toutes les catégories
              </SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-[#8E44FF]/20 capitalize">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('map')}
              className={viewMode === 'map' ? 'bg-[#8E44FF] text-white' : 'border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/20'}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Carte
            </Button>
            <Button
              variant={viewMode === 'ideal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('ideal')}
              className={viewMode === 'ideal' ? 'bg-[#8E44FF] text-white' : 'border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/20'}
            >
              <Crown className="w-4 h-4 mr-2" />
              Top Scores
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={viewMode === 'list' ? 'bg-[#8E44FF] text-white' : 'border-[#8E44FF]/30 text-white hover:bg-[#8E44FF]/20'}
            >
              <List className="w-4 h-4 mr-2" />
              Liste
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
            {businessCount} entreprises
          </Badge>
          <p className="text-sm text-white/60 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            👁️ Mode: <span className="text-[#FFD56B] font-semibold capitalize">{viewMode}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessControls;