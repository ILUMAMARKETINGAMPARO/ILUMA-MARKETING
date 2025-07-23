import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client.ts';
import { APISecret, APITestResult } from '@/types/api-secrets.ts';
import { useToast } from '@/hooks/use-toast';

export const useAPISecrets = () => {
  const [secrets, setSecrets] = useState<APISecret[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [testing, setTesting] = useState<string | null>(null);
  const { toast } = useToast();

  // Charger tous les secrets API
  const loadSecrets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('api_secrets')
        .select('*')
        .order('service_name', { ascending: true })
        .order('key_name', { ascending: true });

      if (error) throw error;
      setSecrets(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des secrets:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les secrets API",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Sauvegarder ou mettre à jour un secret
  const saveSecret = async (serviceName: string, keyName: string, value: string | boolean) => {
    try {
      setSaving(`${serviceName}.${keyName}`);
      
      const secretData = {
        service_name: serviceName,
        key_name: keyName,
        key_value: typeof value === 'boolean' ? value.toString() : value,
        is_configured: value !== '' && value !== null && value !== undefined
      };

      const { error } = await supabase
        .from('api_secrets')
        .upsert(secretData, {
          onConflict: 'service_name,key_name'
        });

      if (error) throw error;

      // Recharger les secrets pour avoir les données à jour
      await loadSecrets();
      
      toast({
        title: "Sauvegardé",
        description: `${serviceName}.${keyName} a été sauvegardé avec succès`,
        variant: "default"
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: `Impossible de sauvegarder ${serviceName}.${keyName}`,
        variant: "destructive"
      });
    } finally {
      setSaving(null);
    }
  };

  // Tester la connexion d'un service
  const testConnection = async (serviceName: string): Promise<APITestResult | null> => {
    try {
      setTesting(serviceName);
      
      const { data, error } = await supabase.rpc('test_api_connection', {
        p_service_name: serviceName,
        p_test_type: 'basic'
      });

      if (error) throw error;

      // Recharger pour avoir les statuts de test à jour
      await loadSecrets();
      
      toast({
        title: "Test réussi",
        description: `Connexion ${serviceName} testée avec succès`,
        variant: "default"
      });

      return (data as unknown) as APITestResult;
    } catch (error) {
      console.error('Erreur lors du test de connexion:', error);
      toast({
        title: "Test échoué",
        description: `Impossible de tester la connexion ${serviceName}`,
        variant: "destructive"
      });
      return null;
    } finally {
      setTesting(null);
    }
  };

  // Réinitialiser une section (tous les secrets d'un service)
  const resetService = async (serviceName: string) => {
    try {
      const { error } = await supabase
        .from('api_secrets')
        .update({ 
          key_value: null, 
          is_configured: false,
          test_status: 'unknown',
          last_tested_at: null
        })
        .eq('service_name', serviceName);

      if (error) throw error;

      await loadSecrets();
      
      toast({
        title: "Réinitialisé",
        description: `Tous les secrets de ${serviceName} ont été réinitialisés`,
        variant: "default"
      });
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      toast({
        title: "Erreur",
        description: `Impossible de réinitialiser ${serviceName}`,
        variant: "destructive"
      });
    }
  };

  // Exporter tous les secrets (valeurs masquées pour sécurité)
  const exportSecrets = () => {
    const exportData = secrets.map(secret => ({
      service: secret.service_name,
      key: secret.key_name,
      configured: secret.is_configured,
      test_status: secret.test_status,
      last_tested: secret.last_tested_at,
      expires_at: secret.expires_at
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iluma-api-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export réussi",
      description: "Configuration API exportée avec succès",
      variant: "default"
    });
  };

  // Obtenir les secrets d'un service spécifique
  const getServiceSecrets = (serviceName: string) => {
    return secrets.filter(secret => secret.service_name === serviceName);
  };

  // Obtenir le statut global d'un service
  const getServiceStatus = (serviceName: string) => {
    const serviceSecrets = getServiceSecrets(serviceName);
    const configuredCount = serviceSecrets.filter(s => s.is_configured).length;
    const totalCount = serviceSecrets.length;
    
    return {
      configured: configuredCount,
      total: totalCount,
      percentage: totalCount > 0 ? Math.round((configuredCount / totalCount) * 100) : 0,
      isComplete: configuredCount === totalCount && totalCount > 0,
      lastTested: serviceSecrets.reduce((latest, secret) => {
        if (!secret.last_tested_at) return latest;
        if (!latest) return secret.last_tested_at;
        return secret.last_tested_at > latest ? secret.last_tested_at : latest;
      }, null as string | null),
      testStatus: serviceSecrets.reduce((status, secret) => {
        if (secret.test_status === 'failed') return 'failed';
        if (secret.test_status === 'unknown' && status !== 'failed') return 'unknown';
        return status;
      }, 'success' as 'success' | 'failed' | 'unknown')
    };
  };

  useEffect(() => {
    loadSecrets();
  }, []);

  return {
    secrets,
    loading,
    saving,
    testing,
    saveSecret,
    testConnection,
    resetService,
    exportSecrets,
    getServiceSecrets,
    getServiceStatus,
    reload: loadSecrets
  };
};