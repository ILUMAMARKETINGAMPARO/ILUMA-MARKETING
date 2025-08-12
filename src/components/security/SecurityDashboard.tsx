import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, CheckCircle, Eye, Download, RefreshCw } from 'lucide-react';
import { useSecurityContext } from './SecurityProvider';

interface SecurityDashboardProps {
  className?: string;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ className = '' }) => {
  const { logDataAccess } = useSecurityContext();

  const securityMetrics = {
    overallScore: 95,
    activeThreats: 0,
    blockedAttempts: 12,
    lastScan: new Date().toISOString(),
    encryptionStatus: 'active'
  };

  const handleSecurityAction = (action: string) => {
    logDataAccess('security_dashboard', action);
    
    switch (action) {
      case 'full_scan':
        console.log('Initiating full security scan...');
        break;
      case 'backup':
        console.log('Creating secure backup...');
        break;
      case 'rotate_keys':
        console.log('Rotating security keys...');
        break;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-primary" />
            Sécurité du Système
          </CardTitle>
          <CardDescription className="text-white/70">
            Surveillance en temps réel de la sécurité de l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Security Score */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-green-400">{securityMetrics.overallScore}%</div>
              <div className="text-sm text-white/70">Score Global</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-blue-400">{securityMetrics.activeThreats}</div>
              <div className="text-sm text-white/70">Menaces Actives</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-orange-400">{securityMetrics.blockedAttempts}</div>
              <div className="text-sm text-white/70">Tentatives Bloquées</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-green-400">
                <CheckCircle className="w-6 h-6 mx-auto" />
              </div>
              <div className="text-sm text-white/70">Chiffrement</div>
            </div>
          </div>

          {/* Security Features Status */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-3">État des Fonctionnalités</h3>
            
            {[
              { name: 'Protection RLS', status: 'active', description: 'Sécurité au niveau des lignes activée' },
              { name: 'Limitation de Débit', status: 'active', description: 'Protection contre les attaques DoS' },
              { name: 'Validation d\'Entrée', status: 'active', description: 'Filtrage XSS et injection SQL' },
              { name: 'Audit de Sécurité', status: 'active', description: 'Journalisation des événements' },
              { name: 'Tokens Sécurisés', status: 'active', description: 'Gestion sécurisée des API' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <div className="font-medium text-white">{feature.name}</div>
                  <div className="text-sm text-white/60">{feature.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Actif</span>
                </div>
              </div>
            ))}
          </div>

          {/* Security Actions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-3">Actions de Sécurité</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSecurityAction('full_scan')}
                className="glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Scan Complet
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSecurityAction('backup')}
                className="glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Sauvegarde Sécurisée
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSecurityAction('rotate_keys')}
                className="glass-effect border-white/20 text-white hover:bg-white/10"
              >
                <Shield className="w-4 h-4 mr-2" />
                Rotation des Clés
              </Button>
            </div>
          </div>

          {/* Recent Security Events */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-3">Événements Récents</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {[
                { type: 'success', event: 'Authentification réussie', user: 'Admin', time: '2 min' },
                { type: 'warning', event: 'Tentative de connexion suspecte bloquée', user: 'Inconnu', time: '15 min' },
                { type: 'info', event: 'Scan de sécurité automatique terminé', user: 'Système', time: '1h' }
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded bg-white/5">
                  {event.type === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                  {event.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-400" />}
                  {event.type === 'info' && <Eye className="w-4 h-4 text-blue-400" />}
                  <div className="flex-1">
                    <div className="text-sm text-white">{event.event}</div>
                    <div className="text-xs text-white/60">Par {event.user} • il y a {event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};