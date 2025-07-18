import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Loader2, Check, AlertCircle, Eye, EyeOff, X, TestTube, Upload, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAPISecrets } from '@/hooks/useAPISecrets';

type FilterType = 'all' | 'configured' | 'not_configured';

const APISecretsTable = () => {
  const {
    secrets,
    loading,
    saving,
    testing,
    saveSecret,
    testConnection,
    exportSecrets
  } = useAPISecrets();

  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});

  // Filtrer et rechercher
  const filteredSecrets = useMemo(() => {
    return secrets.filter(secret => {
      // Filtre par statut
      if (filter === 'configured' && !secret.is_configured) return false;
      if (filter === 'not_configured' && secret.is_configured) return false;

      // Recherche par nom de service ou clé
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          secret.service_name.toLowerCase().includes(term) ||
          secret.key_name.toLowerCase().includes(term)
        );
      }

      return true;
    });
  }, [secrets, filter, searchTerm]);

  // Statistiques
  const stats = useMemo(() => {
    const configured = secrets.filter(s => s.is_configured).length;
    const total = secrets.length;
    return {
      configured,
      total,
      percentage: total > 0 ? Math.round((configured / total) * 100) : 0
    };
  }, [secrets]);

  const toggleSecretVisibility = (secretId: string) => {
    const newVisible = new Set(visibleSecrets);
    if (newVisible.has(secretId)) {
      newVisible.delete(secretId);
    } else {
      newVisible.add(secretId);
    }
    setVisibleSecrets(newVisible);
  };

  const handleValueChange = (secretId: string, value: string) => {
    setEditingValues(prev => ({
      ...prev,
      [secretId]: value
    }));
  };

  const handleSaveValue = async (secret: any) => {
    const newValue = editingValues[secret.id] ?? secret.key_value ?? '';
    if (newValue !== (secret.key_value ?? '')) {
      await saveSecret(secret.service_name, secret.key_name, newValue);
      setEditingValues(prev => {
        const { [secret.id]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const clearEditingValue = (secretId: string) => {
    setEditingValues(prev => {
      const { [secretId]: _, ...rest } = prev;
      return rest;
    });
  };

  const getServiceBadgeColor = (serviceName: string) => {
    const criticalServices = ['google_ads', 'gmail', 'meta_ads', 'stripe', 'openai'];
    const primaryServices = ['supabase', 'mapbox', 'serpapi', 'resend'];
    const partnerServices = ['google_my_business', 'search_console', 'youtube'];
    
    if (criticalServices.includes(serviceName)) {
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    } else if (primaryServices.includes(serviceName)) {
      return 'bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30';
    } else if (partnerServices.includes(serviceName)) {
      return 'bg-[#FFD56B]/20 text-[#FFD56B] border-[#FFD56B]/30';
    }
    return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  };

  const getServiceIcon = (serviceName: string) => {
    const icons: Record<string, string> = {
      'openai': '🤖',
      'google_ads': '🔍',
      'google_maps': '🗺️',
      'supabase': '⚡',
      'mapbox': '🌍',
      'resend': '✉️',
      'serpapi': '🐍',
      'gmail': '📧',
      'google_my_business': '📍',
      'search_console': '🔎',
      'google_analytics': '📊',
      'meta_ads': '📱',
      'instagram_business': '📸',
      'youtube': '▶️',
      'make_integromat': '🔗',
      'lovable': '💜',
      'iluma_crm': '🧠'
    };
    return icons[serviceName] || '🔧';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#8E44FF]" />
        <span className="ml-2 text-white font-['Montserrat']">Chargement des clés API...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-['Montserrat']">
            Gestion des Clés API
          </h2>
          <p className="text-white/60 font-['Montserrat']">
            {stats.configured}/{stats.total} clés configurées ({stats.percentage}%)
          </p>
        </div>
        
        <Button
          onClick={exportSecrets}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card className="glass-effect border-white/20 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Rechercher par service ou nom de clé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/40 border-white/20 text-white"
              />
            </div>
          </div>
          
          <Select value={filter} onValueChange={(value: FilterType) => setFilter(value)}>
            <SelectTrigger className="w-full md:w-48 bg-black/40 border-white/20 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="configured">Configurés</SelectItem>
              <SelectItem value="not_configured">Non configurés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Tableau */}
      <Card className="glass-effect border-white/20">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead className="text-white font-['Montserrat']">Service</TableHead>
              <TableHead className="text-white font-['Montserrat']">Clé</TableHead>
              <TableHead className="text-white font-['Montserrat']">Valeur</TableHead>
              <TableHead className="text-white font-['Montserrat']">Statut</TableHead>
              <TableHead className="text-white font-['Montserrat']">Test</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSecrets.map((secret) => {
              const isEditing = secret.id in editingValues;
              const currentValue = isEditing ? editingValues[secret.id] : (secret.key_value ?? '');
              const isSaving = saving === `${secret.service_name}.${secret.key_name}`;
              const isVisible = visibleSecrets.has(secret.id);
              const hasChanges = isEditing && editingValues[secret.id] !== (secret.key_value ?? '');

              return (
                <TableRow key={secret.id} className="border-white/10">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getServiceIcon(secret.service_name)}</span>
                      <Badge className={getServiceBadgeColor(secret.service_name)}>
                        {secret.service_name}
                      </Badge>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-white font-['Montserrat']">
                    {secret.key_name}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        type={isVisible ? 'text' : 'password'}
                        value={currentValue}
                        onChange={(e) => handleValueChange(secret.id, e.target.value)}
                        onBlur={() => handleSaveValue(secret)}
                        placeholder="Entrer la valeur..."
                        className="bg-black/40 border-white/20 text-white text-sm"
                        disabled={isSaving}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSecretVisibility(secret.id)}
                        className="p-1 h-auto text-white/60 hover:text-white"
                      >
                        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      {hasChanges && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => clearEditingValue(secret.id)}
                          className="p-1 h-auto text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {secret.is_configured ? (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <Check className="w-3 h-3 mr-1" />
                        Configuré
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Manquant
                      </Badge>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                      {secret.test_status || 'En attente'}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    {isSaving && (
                      <Loader2 className="w-4 h-4 animate-spin text-[#8E44FF]" />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredSecrets.length === 0 && (
          <div className="text-center py-8 text-white/60 font-['Montserrat']">
            Aucune clé API trouvée
          </div>
        )}
      </Card>

      {/* Info bubble */}
      <div className="text-sm text-white/50 font-['Montserrat']">
        💡 Les modifications sont sauvegardées automatiquement lors de la perte de focus
      </div>
    </div>
  );
};

export default APISecretsTable;