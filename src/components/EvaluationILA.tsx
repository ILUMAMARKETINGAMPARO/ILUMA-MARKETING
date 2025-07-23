import React, { useState } from 'react';
import { Calculator, TrendingUp, Award, Building, Star, Globe, BarChart3, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/hooks/useLanguage';
import MPEContainer from '@/components/mpe/MPEContainer';

const EvaluationILA = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nomEntreprise: '',
    adresse: '',
    siteWeb: '',
    etoiles: [4.2],
    nombreAvis: [35],
    volumeRecherche: [1200],
    cpc: [2.8],
    kd: [42],
    pagesIndexees: [18],
    traficEstime: [380],
    blogActif: false,
    qualiteBlog: [3],
    nombreSuccursales: [1],
    centrale: false
  });

  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const calculateScore = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const weights = {
        etoiles: 18,
        nombreAvis: 12,
        volumeRecherche: 20,
        cpc: 8,
        kd: 15,
        pagesIndexees: 12,
        traficEstime: 15
      };

      let totalScore = 0;
      
      // Calcul pondéré du score ILA™
      totalScore += (formData.etoiles[0] / 5) * weights.etoiles;
      totalScore += Math.min(formData.nombreAvis[0] / 100, 1) * weights.nombreAvis;
      totalScore += Math.min(formData.volumeRecherche[0] / 5000, 1) * weights.volumeRecherche;
      totalScore += Math.min(formData.cpc[0] / 10, 1) * weights.cpc;
      totalScore += (1 - Math.min(formData.kd[0] / 100, 1)) * weights.kd;
      totalScore += Math.min(formData.pagesIndexees[0] / 50, 1) * weights.pagesIndexees;
      totalScore += Math.min(formData.traficEstime[0] / 2000, 1) * weights.traficEstime;
      
      // Bonus pour blog actif et qualité
      if (formData.blogActif) {
        totalScore += (formData.qualiteBlog[0] / 5) * 5;
      }
      
      // Bonus pour multi-succursales
      if (formData.nombreSuccursales[0] > 1) {
        totalScore += Math.min(formData.nombreSuccursales[0] / 10, 1) * 3;
      }

      const finalScore = Math.round(Math.min(totalScore, 100));
      setScore(finalScore);
      setShowResults(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreLevel = (score) => {
    if (score >= 80) return { level: t('evaluationILA.results.levels.excellent'), color: 'text-green-400', bgColor: 'bg-green-500/20' };
    if (score >= 65) return { level: t('evaluationILA.results.levels.good'), color: 'text-blue-400', bgColor: 'bg-blue-500/20' };
    if (score >= 45) return { level: t('evaluationILA.results.levels.average'), color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
    if (score >= 25) return { level: t('evaluationILA.results.levels.poor'), color: 'text-orange-400', bgColor: 'bg-orange-500/20' };
    return { level: t('evaluationILA.results.levels.critical'), color: 'text-red-400', bgColor: 'bg-red-500/20' };
  };

  const getRecommendations = (score) => {
    if (score >= 80) {
      return [
        "Optimisation avancée avec IA Iluma™ pour maintenir la domination",
        "Expansion stratégique vers de nouveaux mots-clés premium",
        "Automatisation complète du content marketing",
        "Mise en place de campagnes de rétention client intelligentes"
      ];
    } else if (score >= 65) {
      return [
        "Optimisation SEO locale ciblée avec modules ILA™",
        "Amélioration de la stratégie d'avis clients",
        "Développement de contenu blog optimisé IA",
        "Campagnes Google Ads ciblées géographiquement"
      ];
    } else if (score >= 45) {
      return [
        "Révision complète de la stratégie SEO locale",
        "Optimisation urgente de la fiche Google Business Profile",
        "Création de contenu local optimisé avec BlogIA™",
        "Mise en place d'un système d'acquisition d'avis"
      ];
    } else {
      return [
        "Refonte complète de la présence digitale",
        "Audit SEO technique approfondi",
        "Création d'une stratégie de contenu locale",
        "Formation équipe aux bonnes pratiques digitales"
      ];
    }
  };

  return (
    <section id="evaluation-ila" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <MPEContainer animation="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              <span className="text-gradient">{t('evaluationILA.title')}</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t('evaluationILA.description')}
            </p>
          </MPEContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire */}
          <MPEContainer animation="slide-up">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-cyan-400" />
                  Informations entreprise
                </CardTitle>
                <CardDescription className="text-white/70">
                  Renseignez vos données pour une analyse précise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informations de base */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nomEntreprise" className="text-white/90">
                      {t('evaluationILA.form.companyName')}
                    </Label>
                    <Input
                      id="nomEntreprise"
                      value={formData.nomEntreprise}
                      onChange={(e) => setFormData({...formData, nomEntreprise: e.target.value})}
                      placeholder={t('evaluationILA.form.placeholders.companyName')}
                      className="glass-effect border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="adresse" className="text-white/90">
                      {t('evaluationILA.form.address')}
                    </Label>
                    <Input
                      id="adresse"
                      value={formData.adresse}
                      onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                      placeholder={t('evaluationILA.form.placeholders.address')}
                      className="glass-effect border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="siteWeb" className="text-white/90">
                      {t('evaluationILA.form.website')}
                    </Label>
                    <Input
                      id="siteWeb"
                      value={formData.siteWeb}
                      onChange={(e) => setFormData({...formData, siteWeb: e.target.value})}
                      placeholder={t('evaluationILA.form.placeholders.website')}
                      className="glass-effect border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                {/* Métriques avec sliders */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-white/90 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {t('evaluationILA.form.googleRating')}: {formData.etoiles[0]}/5
                    </Label>
                    <Slider
                      value={formData.etoiles}
                      onValueChange={(value) => setFormData({...formData, etoiles: value})}
                      max={5}
                      min={1}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-white/90">
                      {t('evaluationILA.form.reviewCount')}: {formData.nombreAvis[0]}
                    </Label>
                    <Slider
                      value={formData.nombreAvis}
                      onValueChange={(value) => setFormData({...formData, nombreAvis: value})}
                      max={500}
                      min={0}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-white/90">
                      {t('evaluationILA.form.searchVolume')}: {formData.volumeRecherche[0]}/mois
                    </Label>
                    <Slider
                      value={formData.volumeRecherche}
                      onValueChange={(value) => setFormData({...formData, volumeRecherche: value})}
                      max={10000}
                      min={100}
                      step={100}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-white/90">
                      {t('evaluationILA.form.difficulty')}: {formData.kd[0]}%
                    </Label>
                    <Slider
                      value={formData.kd}
                      onValueChange={(value) => setFormData({...formData, kd: value})}
                      max={100}
                      min={0}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Switches */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white/90">{t('evaluationILA.form.activeBlog')}</Label>
                    <Switch
                      checked={formData.blogActif}
                      onCheckedChange={(checked) => setFormData({...formData, blogActif: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-white/90">{t('evaluationILA.form.isChain')}</Label>
                    <Switch
                      checked={formData.centrale}
                      onCheckedChange={(checked) => setFormData({...formData, centrale: checked})}
                    />
                  </div>
                </div>

                {/* Bouton d'analyse */}
                <Button 
                  onClick={calculateScore}
                  disabled={isAnalyzing || !formData.nomEntreprise || !formData.adresse}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 text-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyse IA en cours...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-5 h-5 mr-2" />
                      {t('evaluationILA.form.calculate')}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </MPEContainer>

          {/* Résultats */}
          <MPEContainer animation="scale-in">
            {showResults && score !== null ? (
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Award className="w-6 h-6 text-yellow-400" />
                    {t('evaluationILA.results.score')} : {score}/100
                  </CardTitle>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${getScoreLevel(score).bgColor}`}>
                    <span className={`font-semibold ${getScoreLevel(score).color}`}>
                      {getScoreLevel(score).level}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Barre de progression */}
                  <div className="relative">
                    <div className="w-full bg-white/10 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                    <span className="absolute right-0 top-6 text-white/70 text-sm">{score}%</span>
                  </div>

                  {/* Recommandations */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      {t('evaluationILA.results.recommendations')}
                    </h4>
                    <ul className="space-y-3">
                      {getRecommendations(score).map((rec, index) => (
                        <li key={index} className="flex items-start gap-3 text-white/80">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-white/20">
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold">
                      <Globe className="w-5 h-5 mr-2" />
                      {t('evaluationILA.results.getDetailedReport')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-effect border-white/20 h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Calculator className="w-16 h-16 text-white/40 mx-auto mb-6" />
                  <h3 className="text-xl text-white/80 mb-4">
                    Remplissez le formulaire pour découvrir votre score ILA™
                  </h3>
                  <p className="text-white/60">
                    Notre IA analyse votre présence locale et vous propose un plan d'action personnalisé
                  </p>
                </CardContent>
              </Card>
            )}
          </MPEContainer>
        </div>
      </div>
    </section>
  );
};

export default EvaluationILA;