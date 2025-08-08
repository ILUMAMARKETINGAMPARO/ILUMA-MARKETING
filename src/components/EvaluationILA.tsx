import React, { useState } from 'react';
import { Calculator, TrendingUp, Award, Building, Star, Globe, BarChart3, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from '@/hooks/useTranslations';
import MPEContainer from '@/components/mpe/MPEContainer';
const EvaluationILA = () => {
  const {
    t
  } = useTranslations();
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
      totalScore += formData.etoiles[0] / 5 * weights.etoiles;
      totalScore += Math.min(formData.nombreAvis[0] / 100, 1) * weights.nombreAvis;
      totalScore += Math.min(formData.volumeRecherche[0] / 5000, 1) * weights.volumeRecherche;
      totalScore += Math.min(formData.cpc[0] / 10, 1) * weights.cpc;
      totalScore += (1 - Math.min(formData.kd[0] / 100, 1)) * weights.kd;
      totalScore += Math.min(formData.pagesIndexees[0] / 50, 1) * weights.pagesIndexees;
      totalScore += Math.min(formData.traficEstime[0] / 2000, 1) * weights.traficEstime;

      // Bonus pour blog actif et qualité
      if (formData.blogActif) {
        totalScore += formData.qualiteBlog[0] / 5 * 5;
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
  const getScoreLevel = score => {
    if (score >= 80) return {
      level: t('ila.results.level.excellent'),
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    };
    if (score >= 65) return {
      level: t('ila.results.level.good'),
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    };
    if (score >= 45) return {
      level: t('ila.results.level.average'),
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    };
    if (score >= 25) return {
      level: t('ila.results.level.weak'),
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    };
    return {
      level: t('ila.results.level.critical'),
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    };
  };
  const getRecommendations = score => {
    if (score >= 80) {
      return [t('ila.recommendations.excellent1'), t('ila.recommendations.excellent2'), t('ila.recommendations.excellent3'), t('ila.recommendations.excellent4')];
    } else if (score >= 65) {
      return [t('ila.recommendations.good1'), t('ila.recommendations.good2'), t('ila.recommendations.good3'), t('ila.recommendations.good4')];
    } else if (score >= 45) {
      return [t('ila.recommendations.average1'), t('ila.recommendations.average2'), t('ila.recommendations.average3'), t('ila.recommendations.average4')];
    } else {
      return [t('ila.recommendations.weak1'), t('ila.recommendations.weak2'), t('ila.recommendations.weak3'), t('ila.recommendations.weak4')];
    }
  };
  return <section id="evaluation-ila" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <MPEContainer animation="fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              <span className="text-gradient">{t('ila.hero.title')}</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t('ila.hero.subtitle')}
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
                  {t('ila.form.title')}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {t('ila.form.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informations de base */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nomEntreprise" className="text-white/90">
                      {t('ila.form.businessName')}
                    </Label>
                    <Input id="nomEntreprise" value={formData.nomEntreprise} onChange={e => setFormData({
                    ...formData,
                    nomEntreprise: e.target.value
                  })} placeholder={t('ila.form.businessNamePlaceholder')} className="glass-effect border-white/20 text-white placeholder:text-white/50" />
                  </div>

                  <div>
                    <Label htmlFor="adresse" className="text-white/90">
                      {t('ila.form.address')}
                    </Label>
                    <Input id="adresse" value={formData.adresse} onChange={e => setFormData({
                    ...formData,
                    adresse: e.target.value
                  })} placeholder={t('ila.form.addressPlaceholder')} className="glass-effect border-white/20 text-white placeholder:text-white/50" />
                  </div>

                  <div>
                    <Label htmlFor="siteWeb" className="text-white/90">
                      {t('ila.form.website')}
                    </Label>
                    <Input id="siteWeb" value={formData.siteWeb} onChange={e => setFormData({
                    ...formData,
                    siteWeb: e.target.value
                  })} placeholder={t('ila.form.websitePlaceholder')} className="glass-effect border-white/20 text-white placeholder:text-white/50" />
                  </div>
                </div>

                {/* Métriques avec sliders */}
                

                {/* Switches */}
                

                {/* Bouton d'analyse */}
                <Button onClick={calculateScore} disabled={isAnalyzing || !formData.nomEntreprise || !formData.adresse} className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 text-lg">
                  {isAnalyzing ? <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {t('ila.form.analyzingButton')}
                    </> : <>
                      <BarChart3 className="w-5 h-5 mr-2" />
                      {t('ila.form.calculateButton')}
                    </>}
                </Button>
              </CardContent>
            </Card>
          </MPEContainer>

          {/* Résultats */}
          <MPEContainer animation="scale-in">
            {showResults && score !== null ? <Card className="glass-effect border-white/20">
                <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Award className="w-6 h-6 text-yellow-400" />
                  {t('ila.results.scoreTitle')} : {score}/100
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
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-4 rounded-full transition-all duration-1000" style={{
                    width: `${score}%`
                  }}></div>
                    </div>
                    <span className="absolute right-0 top-6 text-white/70 text-sm">{score}%</span>
                  </div>

                  {/* Recommandations */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      {t('ila.results.recommendationsTitle')}
                    </h4>
                    <ul className="space-y-3">
                      {getRecommendations(score).map((rec, index) => <li key={index} className="flex items-start gap-3 text-white/80">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>)}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-white/20">
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold">
                      <Globe className="w-5 h-5 mr-2" />
                      {t('ila.results.getReportButton')}
                    </Button>
                  </div>
                </CardContent>
              </Card> : <Card className="glass-effect border-white/20 h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Calculator className="w-16 h-16 text-white/40 mx-auto mb-6" />
                  <h3 className="text-xl text-white/80 mb-4">
                    {t('ila.placeholder.title')}
                  </h3>
                  <p className="text-white/60">
                    {t('ila.placeholder.subtitle')}
                  </p>
                </CardContent>
              </Card>}
          </MPEContainer>
        </div>
      </div>
    </section>;
};
export default EvaluationILA;