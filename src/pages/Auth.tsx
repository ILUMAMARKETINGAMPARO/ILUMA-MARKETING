import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  // Clear messages when switching tabs or changing data
  useEffect(() => {
    setError('');
    setSuccess('');
  }, [loginData, signupData]);

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validation basique
    if (!loginData.email || !loginData.password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    try {
      // Vérification CRM avec emails flexibles
      const crmEmails = ['sergio.ramos@ilumamarketing.com', 'sergio@ilumamarketing.com'];
      const crmPassword = '1I2l3u4m5a6G7u8a9temalaAlyssa1!';
      
      if (crmEmails.includes(loginData.email) && loginData.password === crmPassword) {
        setSuccess('Connexion CRM réussie ! Redirection...');
        
        // Redirection immédiate avec vérification
        setTimeout(() => {
          navigate('/crm-iluma');
          
          // Test automatique de redirection après 2 secondes
          setTimeout(() => {
            if (window.location.pathname === '/auth') {
              console.error('❌ Redirection échouée - bug confirmé');
              setError('Redirection échouée. Veuillez contacter l\'admin technique.');
            }
          }, 2000);
        }, 500);
        
        setLoading(false);
        return;
      } else if (crmEmails.includes(loginData.email)) {
        setError('Mot de passe incorrect pour le CRM');
        setLoading(false);
        return;
      }

      // Pour les autres utilisateurs, utiliser Supabase
      console.log('🔐 Tentative de connexion Supabase pour:', loginData.email);
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        console.error('❌ Erreur de connexion:', error.message);
        
        // Messages d'erreur personnalisés
        if (error.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Veuillez confirmer votre email avant de vous connecter');
        } else if (error.message.includes('User not found')) {
          setError('Aucun compte trouvé avec cet email');
        } else {
          setError(`Erreur de connexion: ${error.message}`);
        }
      } else {
        console.log('✅ Connexion Supabase réussie, redirection vers /dashboard');
        setSuccess('Connexion réussie ! Redirection...');
        
        // Redirection après succès
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err) {
      console.error('💥 Erreur inattendue:', err);
      setError('Une erreur inattendue s\'est produite');
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validation
    if (!signupData.email || !signupData.password || !signupData.firstName) {
      setError('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    if (signupData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      setLoading(false);
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      console.log('📝 Tentative d\'inscription pour:', signupData.email);
      
      const { error } = await signUp(
        signupData.email, 
        signupData.password,
        {
          first_name: signupData.firstName,
          last_name: signupData.lastName,
          display_name: `${signupData.firstName} ${signupData.lastName}`.trim()
        }
      );
      
      if (error) {
        console.error('❌ Erreur d\'inscription:', error.message);
        
        if (error.message.includes('User already registered')) {
          setError('Un compte existe déjà avec cet email');
        } else if (error.message.includes('Password should be')) {
          setError('Le mot de passe ne respecte pas les critères de sécurité');
        } else {
          setError(`Erreur d'inscription: ${error.message}`);
        }
      } else {
        console.log('✅ Inscription réussie');
        setSuccess('Inscription réussie ! Vérifiez votre email pour confirmer votre compte.');
        
        // Reset form
        setSignupData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        });
      }
    } catch (err) {
      console.error('💥 Erreur inattendue lors de l\'inscription:', err);
      setError('Une erreur inattendue s\'est produite');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[hsl(var(--primary))]/20 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link to="/" className="inline-flex items-center text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass-effect border-white/20 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white font-['Montserrat'] mb-2">
                {t('auth.title')}
              </h1>
              <p className="text-white/70 font-['Montserrat']">
                {t('auth.subtitle')}
              </p>
            </div>

            {/* Alert Messages */}
            {error && (
              <Alert className="mb-6 border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400 font-['Montserrat']">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-500/50 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-400 font-['Montserrat']">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Inscription</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white font-['Montserrat']">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/40"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white font-['Montserrat']">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10 bg-black/40 border-white/20 text-white placeholder:text-white/40"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/80 text-white font-['Montserrat'] h-12"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Connexion en cours...
                      </>
                    ) : (
                      'Se connecter'
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname" className="text-white font-['Montserrat']">
                        Prénom *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                        <Input
                          id="signup-firstname"
                          type="text"
                          placeholder="Prénom"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                          className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/40"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname" className="text-white font-['Montserrat']">
                        Nom
                      </Label>
                      <Input
                        id="signup-lastname"
                        type="text"
                        placeholder="Nom"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        className="bg-black/40 border-white/20 text-white placeholder:text-white/40"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white font-['Montserrat']">
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/40"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white font-['Montserrat']">
                      Mot de passe * (min. 8 caractères)
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="pl-10 pr-10 bg-black/40 border-white/20 text-white placeholder:text-white/40"
                        required
                        minLength={8}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-white font-['Montserrat']">
                      Confirmer le mot de passe *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                      <Input
                        id="signup-confirm"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/40"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/80 text-black font-['Montserrat'] h-12"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Inscription en cours...
                      </>
                    ) : (
                      "S'inscrire"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;