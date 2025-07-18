import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, Sparkles } from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
const CRMLogin = () => {
  const {
    login,
    isLoading
  } = useCRM();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(credentials.email, credentials.password);
    if (!success) {
      setError('Identifiants incorrects');
    }
  };
  return <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black flex items-center justify-center p-4">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="w-full max-w-md">
        <Card className="glass-effect border-[#8E44FF]/20 p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock className="w-8 h-8 text-[#8E44FF]" />
              <Sparkles className="w-6 h-6 text-[#FFD56B] animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white font-['Montserrat'] mb-2">
              CRM ILUMA™
            </h1>
            <p className="text-white/60 font-['Montserrat']">
              Système Nerveux Stratégique Intégré
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-['Montserrat'] flex items-center gap-2">
                <User className="w-4 h-4" />
                Email
              </Label>
              <Input id="email" type="email" value={credentials.email} onChange={e => setCredentials(prev => ({
              ...prev,
              email: e.target.value
            }))} placeholder="sergio.ramos@ilumamarketing.com" required className="bg-black/20 border-white/20 text-white placeholder-white/50" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-['Montserrat'] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Mot de passe
              </Label>
              <Input id="password" type="password" value={credentials.password} onChange={e => setCredentials(prev => ({
              ...prev,
              password: e.target.value
            }))} placeholder="••••••••" required className="bg-black/20 border-white/20 text-white placeholder-white/50" />
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm font-['Montserrat']">{error}</p>
              </div>}

            <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] font-['Montserrat'] h-12">
              {isLoading ? <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Connexion...
                </> : <>
                  <Lock className="w-5 h-5 mr-2" />
                  Accéder au CRM
                </>}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            
          </div>
        </Card>
      </motion.div>
    </div>;
};
export default CRMLogin;