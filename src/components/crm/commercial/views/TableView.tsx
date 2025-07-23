import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';

interface TableViewProps {
  businesses: RivalBusiness[];
  selectedBusinesses: string[];
  setSelectedBusinesses: (selected: string[]) => void;
  showFiltersPanel: boolean;
}

interface Column {
  key: keyof RivalBusiness | 'actions';
  label: string;
  sortable: boolean;
  visible: boolean;
  width?: string;
}

const TableView: React.FC<TableViewProps> = ({
  businesses,
  selectedBusinesses,
  setSelectedBusinesses,
  showFiltersPanel
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof RivalBusiness>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    city: true,
    sector: true,
    ilaScore: true,
    status: true,
    potential: true,
    actions: true
  });

  const columns: Column[] = [
    { key: 'name', label: 'Nom', sortable: true, visible: columnVisibility.name },
    { key: 'city', label: 'Ville', sortable: true, visible: columnVisibility.city },
    { key: 'sector', label: 'Secteur', sortable: true, visible: columnVisibility.sector },
    { key: 'ilaScore', label: 'Score ILA™', sortable: true, visible: columnVisibility.ilaScore },
    { key: 'status', label: 'Statut', sortable: true, visible: columnVisibility.status },
    { key: 'potential', label: 'Potentiel', sortable: true, visible: columnVisibility.potential },
    { key: 'actions', label: 'Actions', sortable: false, visible: columnVisibility.actions }
  ];

  // Filtrage et tri
  const filteredAndSortedBusinesses = useMemo(() => {
    let filtered = businesses;
    
    if (searchTerm) {
      filtered = businesses.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [businesses, searchTerm, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBusinesses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBusinesses = filteredAndSortedBusinesses.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: keyof RivalBusiness) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedBusinesses.length === filteredAndSortedBusinesses.length) {
      setSelectedBusinesses([]);
    } else {
      setSelectedBusinesses(filteredAndSortedBusinesses.map(b => b.id));
    }
  };

  const toggleBusinessSelection = (businessId: string) => {
    if (selectedBusinesses.includes(businessId)) {
      setSelectedBusinesses(selectedBusinesses.filter(id => id !== businessId));
    } else {
      setSelectedBusinesses([...selectedBusinesses, businessId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'client': return 'bg-green-500/20 text-green-300';
      case 'prospect': return 'bg-yellow-500/20 text-yellow-300';
      case 'contacted': return 'bg-blue-500/20 text-blue-300';
      case 'lost': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Contrôles et filtres */}
      <Card className="glass-effect border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20 border-white/20 text-white w-64"
              />
            </div>
            
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-32 bg-black/20 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20">
                <SelectItem value="10">10 par page</SelectItem>
                <SelectItem value="25">25 par page</SelectItem>
                <SelectItem value="50">50 par page</SelectItem>
                <SelectItem value="100">100 par page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Colonnes
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        <div className="text-sm text-white/60">
          {filteredAndSortedBusinesses.length} entreprise(s) • {selectedBusinesses.length} sélectionnée(s)
        </div>
      </Card>

      {/* Tableau */}
      <Card className="glass-effect border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedBusinesses.length === filteredAndSortedBusinesses.length && filteredAndSortedBusinesses.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                {columns.filter(col => col.visible).map((column) => (
                  <th key={column.key} className="p-4 text-left text-white font-medium">
                    {column.sortable ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort(column.key as keyof RivalBusiness)}
                        className="text-white hover:bg-white/10 p-0 h-auto font-medium"
                      >
                        {column.label}
                        {sortBy === column.key && (
                          sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 ml-1" /> : <ArrowDown className="w-4 h-4 ml-1" />
                        )}
                      </Button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedBusinesses.map((business) => (
                <tr key={business.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedBusinesses.includes(business.id)}
                      onCheckedChange={() => toggleBusinessSelection(business.id)}
                    />
                  </td>
                  {columnVisibility.name && (
                    <td className="p-4">
                      <div className="font-medium text-white">{business.name}</div>
                      <div className="text-sm text-white/60">{business.address}</div>
                    </td>
                  )}
                  {columnVisibility.city && (
                    <td className="p-4 text-white/80">{business.city}</td>
                  )}
                  {columnVisibility.sector && (
                    <td className="p-4">
                      <Badge variant="outline" className="border-white/20 text-white/80">
                        {business.sector}
                      </Badge>
                    </td>
                  )}
                  {columnVisibility.ilaScore && (
                    <td className="p-4">
                      <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30">
                        {business.ilaScore}/100
                      </Badge>
                    </td>
                  )}
                  {columnVisibility.status && (
                    <td className="p-4">
                      <Badge className={getStatusColor(business.status)}>
                        {business.status}
                      </Badge>
                    </td>
                  )}
                  {columnVisibility.potential && (
                    <td className="p-4">
                      <span className={`font-medium ${getPotentialColor(business.potential)}`}>
                        {business.potential === 'high' ? 'Élevé' : 
                         business.potential === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                    </td>
                  )}
                  {columnVisibility.actions && (
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-400/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-white/10">
            <div className="text-sm text-white/60">
              Page {currentPage} sur {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TableView;