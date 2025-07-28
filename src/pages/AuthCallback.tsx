import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          toast({
            title: "Erreur d'authentification",
            description: error.message,
            variant: "destructive"
          });
        } else if (data.session) {
          toast({
            title: "Email confirmé!",
            description: "Votre compte a été activé avec succès.",
            variant: "default"
          });
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
      }
    };

    handleAuthCallback();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[hsl(var(--primary))]/20 to-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--primary))] mx-auto mb-4" />
        <p className="text-white font-['Montserrat']">Vérification de votre authentification...</p>
      </div>
    </div>
  );
};

export default AuthCallback;