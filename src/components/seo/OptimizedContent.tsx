import React from 'react';
import { PageContent } from '@/utils/seoEngine';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import MPEContainer from '@/components/mpe/MPEContainer';

interface OptimizedContentProps {
  content: PageContent;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

const OptimizedContent: React.FC<OptimizedContentProps> = ({ 
  content, 
  primaryCTA,
  secondaryCTA 
}) => {
  return (
    <>
      {/* Hero Section Optimisé */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <MPEContainer animation="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Montserrat']">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {content.hero.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto font-['Montserrat']">
              {content.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {primaryCTA && (
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <a href={primaryCTA.href}>
                    {primaryCTA.text}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              )}
              
              {secondaryCTA && (
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-['Montserrat'] hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <a href={secondaryCTA.href}>
                    {secondaryCTA.text}
                  </a>
                </Button>
              )}
            </div>
          </MPEContainer>
        </div>
      </section>

      {/* Sections de Contenu SEO */}
      {content.sections.map((section, index) => (
        <section key={index} className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <MPEContainer animation="slide-up" className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-['Montserrat']">
                {section.title}
              </h2>
              <div className="prose prose-invert prose-lg mx-auto max-w-4xl">
                <p className="text-xl text-white/80 leading-relaxed font-['Montserrat']">
                  {section.content}
                </p>
              </div>
            </MPEContainer>
          </div>
        </section>
      ))}

      {/* CTA Final Optimisé */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <MPEContainer animation="fade-in">
            <div className="bg-gradient-to-r from-[#8E44FF]/20 to-[#FFD56B]/20 rounded-2xl p-8 border border-[#8E44FF]/30">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-['Montserrat']">
                Prêt à Transformer votre Marketing ?
              </h3>
              <p className="text-xl text-white/80 mb-8 font-['Montserrat']">
                Rejoignez les entreprises qui révolutionnent leur approche avec l'IA Iluma™
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#8E44FF] to-[#FFD56B] hover:from-[#FFD56B] hover:to-[#8E44FF] text-white px-12 py-4 text-xl font-semibold font-['Montserrat'] hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="/contact">
                  {content.hero.cta}
                  <ArrowRight className="w-6 h-6 ml-3" />
                </a>
              </Button>
            </div>
          </MPEContainer>
        </div>
      </section>
    </>
  );
};

export default OptimizedContent;