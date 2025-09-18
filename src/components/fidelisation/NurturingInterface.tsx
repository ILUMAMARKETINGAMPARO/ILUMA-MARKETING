import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Brain, ArrowRight, Sparkles, Target, Heart } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

const NurturingInterface = () => {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    sector: '',
    objectives: ''
  });

  const { t } = useTranslations();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-6">{t('pageFidelisation.nurturingInterface.configuration.title')}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">{t('pageFidelisation.nurturingInterface.configuration.email')}</label>
            <Input
              type="email"
              placeholder={t('pageFidelisation.nurturingInterface.configuration.emailPlaceholder')}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-black/20 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">{t('pageFidelisation.nurturingInterface.configuration.company')}</label>
            <Input
              placeholder={t('pageFidelisation.nurturingInterface.configuration.companyPlaceholder')}
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="bg-black/20 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">{t('pageFidelisation.nurturingInterface.configuration.industry')}</label>
            <Input
              placeholder={t('pageFidelisation.nurturingInterface.configuration.industryPlaceholder')}
              value={formData.sector}
              onChange={(e) => handleInputChange('sector', e.target.value)}
              className="bg-black/20 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">{t('pageFidelisation.nurturingInterface.configuration.loyalty')}</label>
            <Textarea
              placeholder={t('pageFidelisation.nurturingInterface.configuration.loyaltyPlaceholder')}
              value={formData.objectives}
              onChange={(e) => handleInputChange('objectives', e.target.value)}
              className="bg-black/20 border-white/20 text-white"
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
            <Brain className="w-4 h-4 mr-2" />
            {t('pageFidelisation.nurturingInterface.configuration.cta')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-6">{t('pageFidelisation.nurturingInterface.predictiveJourney.title')}</h3>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg p-4 border border-pink-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-white font-medium">{t('pageFidelisation.nurturingInterface.predictiveJourney.step1.title')}</span>
            </div>
            <p className="text-white/70 text-sm">{t('pageFidelisation.nurturingInterface.predictiveJourney.step1.description')}</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-white font-medium">{t('pageFidelisation.nurturingInterface.predictiveJourney.step2.title')}</span>
            </div>
            <p className="text-white/70 text-sm">{t('pageFidelisation.nurturingInterface.predictiveJourney.step2.description')}</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-blue-400" />
              <span className="text-white font-medium">{t('pageFidelisation.nurturingInterface.predictiveJourney.step3.title')}</span>
            </div>
            <p className="text-white/70 text-sm">{t('pageFidelisation.nurturingInterface.predictiveJourney.step3.description')}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NurturingInterface;