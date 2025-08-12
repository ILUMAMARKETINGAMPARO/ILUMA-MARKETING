import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, AlertTriangle, User, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityAuditEvent {
  id: string;
  user_id: string;
  action_type: string;
  target_user_id?: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

const SecurityAuditLog: React.FC = () => {
  const [auditEvents, setAuditEvents] = useState<SecurityAuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchAuditEvents();
    }
  }, [profile]);

  const fetchAuditEvents = async () => {
    try {
      const { data, error } = await supabase.rpc('get_security_audit_events');

      if (error) throw error;
      setAuditEvents((data as SecurityAuditEvent[]) || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les logs de sécurité",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getActionBadgeVariant = (actionType: string) => {
    switch (actionType) {
      case 'role_change':
        return 'destructive';
      case 'login':
        return 'default';
      case 'profile_update':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'role_change':
        return <Shield className="w-4 h-4" />;
      case 'login':
        return <User className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  if (profile?.role !== 'admin') {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Accès restreint</h3>
            <p className="text-muted-foreground">
              Seuls les administrateurs peuvent consulter les logs de sécurité.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Journal d'audit de sécurité
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Chargement des logs...</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {auditEvents.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getActionIcon(event.action_type)}
                      <Badge variant={getActionBadgeVariant(event.action_type)}>
                        {event.action_type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {new Date(event.created_at).toLocaleString('fr-FR')}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p><strong>Utilisateur:</strong> {event.user_id}</p>
                    {event.target_user_id && (
                      <p><strong>Cible:</strong> {event.target_user_id}</p>
                    )}
                    {event.old_values && (
                      <p><strong>Anciennes valeurs:</strong> {JSON.stringify(event.old_values)}</p>
                    )}
                    {event.new_values && (
                      <p><strong>Nouvelles valeurs:</strong> {JSON.stringify(event.new_values)}</p>
                    )}
                    {event.ip_address && (
                      <p><strong>IP:</strong> {event.ip_address}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {auditEvents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun événement de sécurité enregistré
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityAuditLog;
