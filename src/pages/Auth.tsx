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
import { useDeviceInfo } from '@/hooks/use-mobile';
import MobilePageWrapper from '@/components/mobile/MobilePageWrapper';

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const { t } = useTranslations();
  const { isMobile, isTablet } = useDeviceInfo();
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
    <MobilePageWrapper 
      className="min-h-screen bg-gradient-to-b from-black via-[hsl(var(--primary))]/20 to-black flex items-center justify-center"
      enablePadding={true}
      fullHeight={true}
    >
      <div className={`w-full ${isMobile ? 'max-w-sm px-2' : 'max-w-md px-4'}`}>
        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${isMobile ? 'mb-4' : 'mb-6'}`}
        >
          <Link to="/" className={`inline-flex items-center text-white/60 hover:text-white transition-colors ${isMobile ? 'text-sm' : ''}`}>
            <ArrowLeft className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
            {isMobile ? 'Accueil' : 'Retour à l\'accueil'}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className={`glass-effect border-white/20 ${isMobile ? 'p-4' : 'p-8'}`}>
            {/* Header */}
            <div className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
              <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white font-['Montserrat'] mb-2`}>
                {t('auth.title')}
              </h1>
              <p className={`text-white/70 font-['Montserrat'] ${isMobile ? 'text-sm' : ''}`}>
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
              <TabsList className={`grid w-full grid-cols-2 ${isMobile ? 'mb-4 h-10' : 'mb-6 h-12'}`}>
                <TabsTrigger value="login" className={isMobile ? 'text-sm' : ''}>Connexion</TabsTrigger>
                <TabsTrigger value="signup" className={isMobile ? 'text-sm' : ''}>Inscription</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className={isMobile ? 'space-y-3' : 'space-y-4'}>
                <form onSubmit={handleLogin} className={isMobile ? 'space-y-3' : 'space-y-4'}>
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className={`text-white font-['Montserrat'] ${isMobile ? 'text-sm' : ''}`}>
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className={`${isMobile ? 'pl-8 h-10 text-sm' : 'pl-10 h-12'} bg-black/40 border-white/20 text-white placeholder:text-white/40`}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className={`text-white font-['Montserrat'] ${isMobile ? 'text-sm' : ''}`}>
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className={`${isMobile ? 'pl-8 pr-8 h-10 text-sm' : 'pl-10 pr-10 h-12'} bg-black/40 border-white/20 text-white placeholder:text-white/40`}
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white"
                        disabled={loading}
                      >
                        {showPassword ? <EyeOff className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} /> : <Eye className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/80 text-white font-['Montserrat'] ${isMobile ? 'h-10 text-sm' : 'h-12'}`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2 animate-spin`} />
                        {isMobile ? 'Connexion...' : 'Connexion en cours...'}
                      </>
                    ) : (
                      'Se connecter'
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className={isMobile ? 'space-y-3' : 'space-y-4'}>
                <form onSubmit={handleSignup} className={isMobile ? 'space-y-3' : 'space-y-4'}>
                  <div className={`${isMobile ? 'space-y-3' : 'grid grid-cols-2 gap-4'}`}>
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname" className={`text-white font-['Montserrat'] ${isMobile ? 'text-sm' : ''}`}>
                        Prénom *
                      </Label>
                      <div className="relative">
                        <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                        <Input
                          id="signup-firstname"
                          type="text"
                          placeholder="Prénom"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                          className={`${isMobile ? 'pl-8 h-10 text-sm' : 'pl-10 h-12'} bg-black/40 border-white/20 text-white placeholder:text-white/40`}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname" className={`text-white font-['Montserrat'] ${isMobile ? 'text-sm' : ''}`}>
                        Nom
                      </Label>
                      <Input
                        id="signup-lastname"
                        type="text"
                        placeholder="Nom"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        className={`${isMobile ? 'h-10 text-sm' : 'h-12'} bg-black/40 border-white/20 text-white placeholder:text-white/40`}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className={`text-white font-['Montserrat'] ${isMobile ? 'text-sm' : ''}`}>
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className={`${isMobile ? 'pl-8 h-10 text-sm' : 'pl-10 h-12'} bg-black/40 border-white/20 text-white placeholder:text-white/40`}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className={`text-white font-['Montserrat'] ${isMobile ? 'text-sm' : ''}`}>
                      Mot de passe * {isMobile ? '(8+ car.)' : '(min. 8 caractères)'}
                    </Label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className={`${isMobile ? 'pl-8 pr-8 h-10 text-sm' : 'pl-10 pr-10 h-12'} bg-black/40 border-white/20 text-white placeholder:text-white/40`}
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
                        {showPassword ? <EyeOff className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} /> : <Eye className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className={`text-white font-['Montserrat'] ${isMobile ? 'text-sm' : ''}`}>
                      {isMobile ? 'Confirmer MDP *' : 'Confirmer le mot de passe *'}
                    </Label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                      <Input
                        id="signup-confirm"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className={`${isMobile ? 'pl-8 h-10 text-sm' : 'pl-10 h-12'} bg-black/40 border-white/20 text-white placeholder:text-white/40`}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/80 text-black font-['Montserrat'] ${isMobile ? 'h-10 text-sm' : 'h-12'}`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2 animate-spin`} />
                        {isMobile ? 'Inscription...' : 'Inscription en cours...'}
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
    </MobilePageWrapper>
  );
};

export default Auth;