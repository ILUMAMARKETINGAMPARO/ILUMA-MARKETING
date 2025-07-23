import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, User, Eye, EyeOff, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.ts';

interface EmployeeAuthProps {
  onSuccess: () => void;
}

const EmployeeAuth: React.FC<EmployeeAuthProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.log('Erreur de connexion:', error);
        toast({
          title: "Erreur d'authentification",
          description: "Email ou mot de passe incorrect",
          variant: "destructive"
        });
      } else {
        console.log('Connexion réussie, appel de onSuccess()');
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans la section employé RevolveViews™",
        });
        onSuccess();
      }
    } catch (error) {
      console.log('Erreur catch:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la connexion",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0B0E] via-[#1a1a2e] to-[#16213e] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-black/80 border-[#8E44FF]/30 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              RevolveViews™ Employé
            </CardTitle>
            <p className="text-white/60">
              Accès sécurisé à la section prospection IA
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email professionnel
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    placeholder="votre.email@iluma.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white p-0 h-auto"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:opacity-90 text-white font-semibold py-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Accéder à la prospection IA
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-white/40 text-xs">
                Accès réservé aux employés Iluma™ autorisés
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmployeeAuth;