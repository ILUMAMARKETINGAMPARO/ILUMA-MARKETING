import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, Brain, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Email {
  id: string;
  gmail_id: string;
  from_email: string;
  from_name: string;
  subject: string;
  ai_summary: string;
  ai_sentiment: string;
  ai_project_detected: boolean;
  ai_priority_score: number;
  business_id: string;
  received_at: string;
}

const GmailExtractor = () => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [extractedEmails, setExtractedEmails] = useState<Email[]>([]);
  const [stats, setStats] = useState({
    total_emails: 0,
    processed_emails: 0,
    businesses_matched: 0,
    projects_detected: 0
  });

  const handleExtractEmails = async () => {
    if (!(window as any).gapi) {
      toast.error('Gmail API non chargé. Veuillez rafraîchir la page.');
      return;
    }

    setIsExtracting(true);
    
    try {
      // Simulation de l'extraction Gmail (à remplacer par l'API Gmail réelle)
      const mockGmailData = {
        emails: [
          {
            id: 'msg_001',
            threadId: 'thread_001',
            internalDate: Date.now().toString(),
            labelIds: ['INBOX'],
            payload: {
              headers: [
                { name: 'From', value: 'Jean Dupont <jean@entreprise-locale.com>' },
                { name: 'To', value: 'contact@ilumamarketing.com' },
                { name: 'Subject', value: 'Demande de devis pour SEO local' }
              ],
              body: { data: btoa('Bonjour, nous souhaitons améliorer notre visibilité locale...') }
            }
          }
        ]
      };

      // Appel à l'Edge Function Gmail Enricher
      const { data, error } = await supabase.functions.invoke('gmail-enricher', {
        body: {
          action: 'extract_emails',
          data: mockGmailData
        }
      });

      if (error) throw error;

      setExtractedEmails(data.emails || []);
      setStats(prev => ({
        ...prev,
        total_emails: data.processed_count,
        processed_emails: data.processed_count
      }));

      toast.success(`${data.processed_count} emails extraits avec succès`);

    } catch (error) {
      console.error('Erreur extraction:', error);
      toast.error('Erreur lors de l\'extraction des emails');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleEnrichEmail = async (emailId: string) => {
    setIsEnriching(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('gmail-enricher', {
        body: {
          action: 'enrich_email',
          data: { emailId }
        }
      });

      if (error) throw error;

      // Mettre à jour l'email dans la liste
      setExtractedEmails(prev => 
        prev.map(email => 
          email.id === emailId 
            ? { ...email, ...data.ai_analysis }
            : email
        )
      );

      toast.success('Email enrichi avec succès');

    } catch (error) {
      console.error('Erreur enrichissement:', error);
      toast.error('Erreur lors de l\'enrichissement');
    } finally {
      setIsEnriching(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positif': return 'bg-green-500';
      case 'négatif': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header et stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Emails extraits</p>
                <p className="text-lg font-bold">{stats.total_emails}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-violet-400" />
              <div>
                <p className="text-sm text-muted-foreground">Analysés IA</p>
                <p className="text-lg font-bold">{stats.processed_emails}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-gold" />
              <div>
                <p className="text-sm text-muted-foreground">Entreprises matchées</p>
                <p className="text-lg font-bold">{stats.businesses_matched}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Projets détectés</p>
                <p className="text-lg font-bold">{stats.projects_detected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions principales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-purple-400" />
            <span>Extraction et Enrichissement Gmail</span>
          </CardTitle>
          <CardDescription>
            Extrayez automatiquement vos emails et enrichissez-les avec l'IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button 
              onClick={handleExtractEmails}
              disabled={isExtracting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isExtracting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Extraire les emails Gmail
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Actualiser les données
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des emails extraits */}
      {extractedEmails.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Emails extraits et analysés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {extractedEmails.map((email) => (
                <div key={email.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{email.from_name}</span>
                        <span className="text-sm text-muted-foreground">
                          {email.from_email}
                        </span>
                        {email.ai_sentiment && (
                          <Badge 
                            className={`${getSentimentColor(email.ai_sentiment)} text-white`}
                          >
                            {email.ai_sentiment}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium mt-1">{email.subject}</p>
                      {email.ai_summary && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {email.ai_summary}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {email.ai_project_detected && (
                        <Badge className="bg-green-600">
                          Projet détecté
                        </Badge>
                      )}
                      {email.ai_priority_score && (
                        <Badge variant="outline">
                          Score: {email.ai_priority_score}/100
                        </Badge>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEnrichEmail(email.id)}
                        disabled={isEnriching}
                      >
                        {isEnriching && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                        Re-analyser
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Reçu le {new Date(email.received_at).toLocaleDateString('fr-FR')}
                    {email.business_id && (
                      <span className="ml-2 text-green-600">• Entreprise matchée</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GmailExtractor;