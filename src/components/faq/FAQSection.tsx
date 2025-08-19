import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Filter, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/useTranslations';
import { allFAQs, FAQItem } from '@/data/faqData';

interface FAQSectionProps {
  maxItems?: number;
  category?: 'general' | 'seo' | 'technical' | 'services';
  showSearch?: boolean;
  showFilters?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({ 
  maxItems, 
  category, 
  showSearch = true, 
  showFilters = true 
}) => {
  const { t, language } = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: { fr: 'Tout', en: 'All', es: 'Todo' } },
    { id: 'general', label: { fr: 'Général', en: 'General', es: 'General' } },
    { id: 'seo', label: { fr: 'SEO', en: 'SEO', es: 'SEO' } },
    { id: 'technical', label: { fr: 'Technique', en: 'Technical', es: 'Técnico' } },
    { id: 'services', label: { fr: 'Services', en: 'Services', es: 'Servicios' } }
  ];

  const filteredFAQs = allFAQs
    .filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = !searchTerm || 
        faq.question[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .slice(0, maxItems);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HelpCircle className="w-8 h-8 text-[#8E44FF]" />
          <span className="text-[#8E44FF] font-medium text-lg font-['Montserrat']">
            FAQ Iluma™
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Montserrat']">
          {t('faqSection.title')}
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto font-['Montserrat']">
          {t('faqSection.description')}
        </p>
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <Card className="glass-effect border-white/20 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {showSearch && (
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                   <Input
                     placeholder={t('faqSection.searchPlaceholder')}
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/50"
                   />
                </div>
              </div>
            )}
            
            {showFilters && (
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`${
                      selectedCategory === cat.id 
                        ? 'bg-[#8E44FF] text-white' 
                        : 'border-white/20 text-white hover:bg-white/10'
                    } font-['Montserrat']`}
                  >
                    <Filter className="w-3 h-3 mr-1" />
                    {cat.label[language]}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-white/20 overflow-hidden hover:border-[#8E44FF]/30 transition-colors">
                <button
                  onClick={() => setOpenItem(openItem === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 font-['Montserrat']">
                      {faq.question[language]}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={`
                        ${faq.category === 'general' && 'bg-blue-500/20 border-blue-500/30 text-blue-300'}
                        ${faq.category === 'seo' && 'bg-green-500/20 border-green-500/30 text-green-300'}
                        ${faq.category === 'technical' && 'bg-purple-500/20 border-purple-500/30 text-purple-300'}
                        ${faq.category === 'services' && 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'}
                      `}>
                        {faq.category.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-white/60 transition-transform ${
                      openItem === faq.id ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openItem === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/10">
                        <div className="pt-4">
                          <p className="text-white/80 leading-relaxed font-['Montserrat']">
                            {faq.answer[language]}
                          </p>
                          {faq.tags.length > 0 && (
                            <div className="flex gap-1 flex-wrap mt-4">
                              {faq.tags.map((tag) => (
                                <Badge 
                                  key={tag}
                                  variant="outline"
                                  className="border-white/20 text-white/60 text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredFAQs.length === 0 && (
        <Card className="glass-effect border-white/20 p-8 text-center">
          <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 font-['Montserrat']">
            {t('faqSection.noResults')}
          </p>
        </Card>
      )}
    </div>
  );
};

export default FAQSection;