import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useGeoLanguageDetection } from '@/hooks/useGeoLanguageDetection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSelector = () => {
  const { language } = useLanguage();
  const { changeLanguage } = useGeoLanguageDetection();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', shortName: 'FR' },
    { code: 'en', name: 'English', flag: '🇺🇸', shortName: 'EN' },
    { code: 'es', name: 'Español', flag: '🇪🇸', shortName: 'ES' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="glass-effect border-white/20 text-white/80 hover:text-[#B88EFF] hover:bg-[#B88EFF]/10 transition-all duration-300 px-3 py-2 rounded-lg font-['Montserrat'] text-xs font-medium hover:scale-105"
        >
          <Globe className="w-4 h-4 mr-2" />
          <span className="flex items-center gap-1">
            {currentLang?.flag}
            <span className="font-semibold">{currentLang?.shortName}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="glass-effect border-white/20 bg-[#0C0C1E]/98 backdrop-blur-xl z-[100] min-w-[140px]"
        align="end"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code as 'fr' | 'en' | 'es', true)}
            className={`text-white/80 hover:text-[#B88EFF] hover:bg-[#B88EFF]/10 cursor-pointer transition-all duration-300 font-['Montserrat'] text-sm flex items-center justify-between ${
              language === lang.code ? 'bg-[#FFD56B]/10 text-[#FFD56B]' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
            {language === lang.code && (
              <Check className="w-4 h-4 text-[#FFD56B]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;