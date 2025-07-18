import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Zap, ArrowRight, Star } from 'lucide-react';

const NetworkAnalysis = () => {
  const [formData, setFormData] = useState({
    company: '',
    sector: '',
    audience: '',
    goals: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-6">Analyse de Compatibilité</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Votre entreprise</label>
            <Input
              placeholder="Nom de votre entreprise"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="bg-black/20 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Secteur d'activité</label>
            <Input
              placeholder="Ex: E-commerce, Consulting, SaaS..."
              value={formData.sector}
              onChange={(e) => handleInputChange('sector', e.target.value)}
              className="bg-black/20 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Audience cible</label>
            <Input
              placeholder="Décrivez votre clientèle idéale"
              value={formData.audience}
              onChange={(e) => handleInputChange('audience', e.target.value)}
              className="bg-black/20 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Objectifs de visibilité</label>
            <Textarea
              placeholder="Quels résultats recherchez-vous ?"
              value={formData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              className="bg-black/20 border-white/20 text-white"
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
            <Zap className="w-4 h-4 mr-2" />
            Analyser les Synergies
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-6">Potentiel de Réseau</h3>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Portée Potentielle</span>
              <Badge className="bg-cyan-500/20 text-cyan-300">Estimé</Badge>
            </div>
            <div className="text-2xl font-bold text-cyan-400">2.4M personnes</div>
            <p className="text-white/70 text-sm">Audience combinée accessible</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Économies Prévues</span>
              <Badge className="bg-green-500/20 text-green-300">Calculé</Badge>
            </div>
            <div className="text-2xl font-bold text-green-400">-73%</div>
            <p className="text-white/70 text-sm">Réduction coût d'acquisition</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">ROI Attendu</span>
              <Badge className="bg-purple-500/20 text-purple-300">Prédiction</Badge>
            </div>
            <div className="text-2xl font-bold text-purple-400">12.4x</div>
            <p className="text-white/70 text-sm">Retour sur investissement</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NetworkAnalysis;