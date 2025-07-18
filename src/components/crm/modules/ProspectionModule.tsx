import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  MapPin, 
  Target, 
  Brain, 
  Download,
  Map,
  Building2,
  Zap,
  Network
} from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';
import { ProspectionQuery } from '@/types/crm';

const ProspectionModule = () => {
  const { performProspection, isLoading } = useCRM();
  const [query, setQuery] = useState<ProspectionQuery>({
    ville: '',
    secteur: '',
    motsCles: [],
    ilaScoreMin: 60,
    rayonKm: 10,
    statusIlumatch: 'all'
  });
  const [results, setResults] = useState<any>(null);
  const [keywordInput, setKeywordInput] = useState('');

  const handleSearch = async () => {
    const searchResults = await performProspection(query);
    setResults(searchResults);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !query.motsCles.includes(keywordInput.trim())) {
      setQuery(prev => ({
        ...prev,
        motsCles: [...prev.motsCles, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setQuery(prev => ({
      ...prev,
      motsCles: prev.motsCles.filter(k => k !== keyword)
    }));
  };

  const secteurs = [
    'restauration', 'santé', 'commerce', 'services', 'immobilier', 
    'automobile', 'beauté', 'fitness', 'technologie', 'éducation'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="glass-effect border-[#8E44FF]/20 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-8 h-8 text-[#8E44FF]" />
          <h2 className="text-2xl font-bold text-white font-['Montserrat']">
            Prospection IA Dynamique
          </h2>
        </div>

        {/* Search Form */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-white font-['Montserrat'] flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Ville / Région
            </Label>
            <Input
              value={query.ville}
              onChange={(e) => setQuery(prev => ({ ...prev, ville: e.target.value }))}
              placeholder="Montréal, Laval, Québec..."
              className="bg-black/20 border-white/20 text-white placeholder-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-['Montserrat'] flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Secteur d'activité
            </Label>
            <Select value={query.secteur} onValueChange={(value) => setQuery(prev => ({ ...prev, secteur: value }))}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue placeholder="Choisir un secteur" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                {secteurs.map((secteur) => (
                  <SelectItem key={secteur} value={secteur}>
                    {secteur.charAt(0).toUpperCase() + secteur.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-['Montserrat']">
              Rayon géographique: {query.rayonKm} km
            </Label>
            <Slider
              value={[query.rayonKm]}
              onValueChange={(value) => setQuery(prev => ({ ...prev, rayonKm: value[0] }))}
              max={50}
              min={5}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-['Montserrat'] flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Mots-clés SEO
            </Label>
            <div className="flex gap-2">
              <Input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="restaurant, physiothérapie..."
                className="bg-black/20 border-white/20 text-white placeholder-white/50"
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              />
              <Button onClick={addKeyword} size="sm" className="bg-[#8E44FF]">
                +
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {query.motsCles.map((keyword) => (
                <span
                  key={keyword}
                  className="bg-[#8E44FF]/20 text-[#8E44FF] px-2 py-1 rounded-full text-sm cursor-pointer"
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword} ×
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-['Montserrat'] flex items-center gap-2">
              <Target className="w-4 h-4" />
              Score ILA™ minimum: {query.ilaScoreMin}
            </Label>
            <Slider
              value={[query.ilaScoreMin]}
              onValueChange={(value) => setQuery(prev => ({ ...prev, ilaScoreMin: value[0] }))}
              max={100}
              min={0}
              step={10}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-['Montserrat'] flex items-center gap-2">
              <Network className="w-4 h-4" />
              Statut ILUMATCH™
            </Label>
            <Select value={query.statusIlumatch} onValueChange={(value: any) => setQuery(prev => ({ ...prev, statusIlumatch: value }))}>
              <SelectTrigger className="bg-black/20 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="perfect">Match parfait</SelectItem>
                <SelectItem value="compensatory">Compensatoire</SelectItem>
                <SelectItem value="none">Aucun match</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            onClick={handleSearch}
            disabled={isLoading || !query.ville}
            className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] font-['Montserrat'] flex-1"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Analyse IA en cours...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5 mr-2" />
                Lancer la Prospection IA
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Results */}
      {results && (
        <Card className="glass-effect border-white/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white font-['Montserrat']">
              Résultats de Prospection
            </h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-white/20 text-white">
                <Map className="w-4 h-4 mr-2" />
                Vue Carte
              </Button>
              <Button size="sm" variant="outline" className="border-white/20 text-white">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-black/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#8E44FF] font-['Montserrat']">
                {results.businesses.length}
              </div>
              <div className="text-white/60 text-sm font-['Montserrat']">
                Entreprises trouvées
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400 font-['Montserrat']">
                {results.matches.length}
              </div>
              <div className="text-white/60 text-sm font-['Montserrat']">
                Matches ILUMATCH™
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#FFD56B] font-['Montserrat']">
                87%
              </div>
              <div className="text-white/60 text-sm font-['Montserrat']">
                Compatibilité moy.
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 font-['Montserrat']">
                {query.rayonKm}km
              </div>
              <div className="text-white/60 text-sm font-['Montserrat']">
                Rayon analysé
              </div>
            </div>
          </div>

          {/* Business List */}
          <div className="space-y-4">
            {results.businesses.map((business: any) => (
              <div key={business.id} className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white font-['Montserrat']">
                      {business.name}
                    </h4>
                    <p className="text-white/60 font-['Montserrat']">
                      {business.sector} • Score ILA™: {business.ilaScore.current}/100
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-[#8E44FF]">
                      Ajouter au CRM
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white">
                      Voir Détails
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default ProspectionModule;
