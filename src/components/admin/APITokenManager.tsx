import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Eye, 
  EyeOff, 
  Save, 
  TestTube, 
  RotateCcw, 
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useAPISecrets } from '@/hooks/useAPISecrets';
import { SERVICE_CONFIGS } from '@/types/api-secrets';

const APITokenManager = () => {
  const {
    secrets,
    loading,
    saving,
    testing,
    saveSecret,
    testConnection,
    resetService,
    exportSecrets,
    getServiceSecrets,
    getServiceStatus
  } = useAPISecrets();

  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set(['google_ads']));

  const toggleSecretVisibility = (secretId: string) => {
    const newVisible = new Set(visibleSecrets);
    if (newVisible.has(secretId)) {
      newVisible.delete(secretId);
    } else {
      newVisible.add(secretId);
    }
    setVisibleSecrets(newVisible);
  };

  const toggleServiceExpanded = (serviceName: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceName)) {
      newExpanded.delete(serviceName);
    } else {
      newExpanded.add(serviceName);
    }
    setExpandedServices(newExpanded);
  };

  const getSecretValue = (serviceName: string, keyName: string) => {
    const secret = secrets.find(s => s.service_name === serviceName && s.key_name === keyName);
    return secret?.key_value || '';
  };

  const isSecretConfigured = (serviceName: string, keyName: string) => {
    const secret = secrets.find(s => s.service_name === serviceName && s.key_name === keyName);
    return secret?.is_configured || false;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'unknown':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'unknown':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#8E44FF]" />
        <span className="ml-2 text-white font-['Montserrat']">Chargement des configurations API...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec actions globales */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-['Montserrat'] flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#8E44FF]" />
            Gestionnaire d'APIs & Tokens Iluma™
          </h2>
          <p className="text-white/60 font-['Montserrat'] mt-1">
            Configuration centralisée de toutes les intégrations API
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={exportSecrets}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter JSON
          </Button>
        </div>
      </div>

      {/* Vue d'ensemble des services */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4 font-['Montserrat']">
          Vue d'ensemble des services
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SERVICE_CONFIGS.map(service => {
            const status = getServiceStatus(service.name);
            return (
              <div
                key={service.name}
                className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => toggleServiceExpanded(service.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{service.icon}</span>
                  <Badge className={getStatusColor(status.testStatus)}>
                    {status.configured}/{status.total}
                  </Badge>
                </div>
                <h4 className="font-semibold text-white text-sm font-['Montserrat']">
                  {service.displayName}
                </h4>
                <div className="mt-2">
                  <Progress value={status.percentage} className="h-1" />
                  <span className="text-xs text-white/60 font-['Montserrat']">
                    {status.percentage}% configuré
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Configuration détaillée par service */}
      {SERVICE_CONFIGS.map(service => {
        const serviceSecrets = getServiceSecrets(service.name);
        const status = getServiceStatus(service.name);
        const isExpanded = expandedServices.has(service.name);

        return (
          <Card key={service.name} className="glass-effect border-white/20">
            {/* Header du service */}
            <div 
              className="p-6 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => toggleServiceExpanded(service.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white font-['Montserrat']">
                      {service.displayName}
                    </h3>
                    <p className="text-white/60 font-['Montserrat'] text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(status.testStatus)}>
                    {status.configured}/{status.total} configuré
                  </Badge>
                  {getStatusIcon(status.testStatus)}
                </div>
              </div>
              
              <div className="mt-4">
                <Progress value={status.percentage} className="h-2" />
              </div>
            </div>

            {/* Contenu du service (expandable) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    {/* Champs de configuration */}
                    {service.keys.map(keyConfig => {
                      const secretValue = getSecretValue(service.name, keyConfig.name);
                      const isConfigured = isSecretConfigured(service.name, keyConfig.name);
                      const secretId = `${service.name}.${keyConfig.name}`;
                      const isVisible = visibleSecrets.has(secretId);
                      const isSaving = saving === secretId;

                      return (
                        <div key={keyConfig.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-white font-['Montserrat'] flex items-center gap-2">
                              {isConfigured ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-400" />
                              )}
                              {keyConfig.displayName}
                              {keyConfig.required && (
                                <span className="text-red-400">*</span>
                              )}
                            </Label>
                            
                            {keyConfig.type === 'password' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSecretVisibility(secretId)}
                                className="p-1 h-auto"
                              >
                                {isVisible ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                          </div>

                          {keyConfig.type === 'select' ? (
                            <Select
                              value={secretValue}
                              onValueChange={(value) => saveSecret(service.name, keyConfig.name, value)}
                            >
                              <SelectTrigger className="bg-black/40 border-white/20 text-white">
                                <SelectValue placeholder={keyConfig.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {keyConfig.options?.map(option => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : keyConfig.type === 'boolean' ? (
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={secretValue === 'true'}
                                onCheckedChange={(checked) => 
                                  saveSecret(service.name, keyConfig.name, checked)
                                }
                              />
                              <span className="text-white/70 font-['Montserrat']">
                                {secretValue === 'true' ? 'Oui' : 'Non'}
                              </span>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Input
                                type={keyConfig.type === 'password' && !isVisible ? 'password' : 'text'}
                                value={secretValue}
                                onChange={(e) => saveSecret(service.name, keyConfig.name, e.target.value)}
                                placeholder={keyConfig.placeholder}
                                className="bg-black/40 border-white/20 text-white flex-1"
                                disabled={isSaving}
                              />
                              {isSaving && (
                                <div className="flex items-center px-3">
                                  <Loader2 className="w-4 h-4 animate-spin text-[#8E44FF]" />
                                </div>
                              )}
                            </div>
                          )}

                          {keyConfig.helpText && (
                            <p className="text-xs text-white/50 font-['Montserrat']">
                              {keyConfig.helpText}
                            </p>
                          )}
                        </div>
                      );
                    })}

                    {/* Actions du service */}
                    <div className="flex gap-2 pt-4 border-t border-white/10">
                      <Button
                        onClick={() => testConnection(service.name)}
                        disabled={testing === service.name}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {testing === service.name ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <TestTube className="w-4 h-4 mr-2" />
                        )}
                        Tester connexion
                      </Button>
                      
                      <Button
                        onClick={() => resetService(service.name)}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Réinitialiser
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );
      })}
    </div>
  );
};

export default APITokenManager;