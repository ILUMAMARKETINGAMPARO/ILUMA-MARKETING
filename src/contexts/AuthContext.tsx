import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sanitizeUserInput, sanitizeEmail, validateRoleChange, logSecurityEvent } from '@/utils/security';

interface Profile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  avatar_url?: string;
  role: 'user' | 'admin' | 'manager';
  preferences: Record<string, any>;
  onboarding_completed: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data as Profile);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch profile after auth state change
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata = {}) => {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });

    if (error) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer votre compte.",
        variant: "default"
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Iluma™!",
        variant: "default"
      });
    }

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive"
      });
    }

    return { error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      // Sanitize input data
      const sanitizedUpdates = {
        ...updates,
        first_name: updates.first_name ? sanitizeUserInput(updates.first_name) : updates.first_name,
        last_name: updates.last_name ? sanitizeUserInput(updates.last_name) : updates.last_name,
        display_name: updates.display_name ? sanitizeUserInput(updates.display_name) : updates.display_name,
      };

      // Enhanced security check for role modifications
      if (sanitizedUpdates.role && profile) {
        const isAllowed = validateRoleChange(
          profile.role,
          sanitizedUpdates.role,
          user.id,
          user.id
        );
        
        if (!isAllowed) {
          logSecurityEvent('UNAUTHORIZED_ROLE_CHANGE_ATTEMPT', {
            userId: user.id,
            currentRole: profile.role,
            attemptedRole: sanitizedUpdates.role,
            timestamp: new Date().toISOString()
          });
          
          const error = new Error('Unauthorized: Insufficient privileges to modify roles');
          toast({
            title: "Erreur de sécurité",
            description: "Vous n'avez pas les privilèges pour modifier les rôles.",
            variant: "destructive"
          });
          return { error };
        }
      }

      const { error } = await supabase
        .from('profiles')
        .update(sanitizedUpdates)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Erreur de mise à jour",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      // Refresh profile
      await fetchProfile(user.id);
      
      // Log successful profile update
      logSecurityEvent('PROFILE_UPDATED', {
        userId: user.id,
        updatedFields: Object.keys(sanitizedUpdates),
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées.",
        variant: "default"
      });

      return { error: null };
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Erreur de mise à jour",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};