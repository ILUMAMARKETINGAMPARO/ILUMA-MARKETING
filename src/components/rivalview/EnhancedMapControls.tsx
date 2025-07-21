import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Satellite, Layers, Eye, Filter, Zap, Database, RotateCcw, Settings, Brain, ChevronDown, ChevronUp } from 'lucide-react';
interface EnhancedMapControlsProps {
  mapStyle: 'light' | 'dark' | 'satellite';
  onMapStyleChange: (style: 'light' | 'dark' | 'satellite') => void;
  showClusters: boolean;
  onClusterToggle: (enabled: boolean) => void;
  realTimeFilters: boolean;
  onRealTimeToggle: (enabled: boolean) => void;
  syncWithCRM: boolean;
  onCRMSyncToggle: (enabled: boolean) => void;
  onRefreshData: () => void;
  isLoading: boolean;
}
const EnhancedMapControls: React.FC<EnhancedMapControlsProps> = ({
  mapStyle,
  onMapStyleChange,
  showClusters,
  onClusterToggle,
  realTimeFilters,
  onRealTimeToggle,
  syncWithCRM,
  onCRMSyncToggle,
  onRefreshData,
  isLoading
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <Card className="p-4 bg-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Contrôles de la carte</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium mb-2 block">Style de carte</label>
            <Select value={mapStyle} onValueChange={onMapStyleChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Eye size={14} />
                    Clair
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Eye size={14} />
                    Sombre
                  </div>
                </SelectItem>
                <SelectItem value="satellite">
                  <div className="flex items-center gap-2">
                    <Satellite size={14} />
                    Satellite
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers size={14} />
              <span className="text-xs">Grouper les entreprises</span>
            </div>
            <Switch checked={showClusters} onCheckedChange={onClusterToggle} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={14} />
              <span className="text-xs">Filtres temps réel</span>
            </div>
            <Switch checked={realTimeFilters} onCheckedChange={onRealTimeToggle} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database size={14} />
              <span className="text-xs">Sync CRM</span>
            </div>
            <Switch checked={syncWithCRM} onCheckedChange={onCRMSyncToggle} />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshData}
            disabled={isLoading}
            className="w-full"
          >
            <RotateCcw size={14} className="mr-2" />
            {isLoading ? 'Actualisation...' : 'Actualiser les données'}
          </Button>
        </div>
      )}
    </Card>
  );
};
export default EnhancedMapControls;