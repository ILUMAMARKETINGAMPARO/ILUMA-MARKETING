import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, CheckCircle, AlertTriangle, TrendingUp, User } from 'lucide-react';
import { useCRM } from '@/contexts/CRMContext';

const JournalModule = () => {
  const { journal } = useCRM();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai_analysis': return <Brain className="w-4 h-4 text-[#8E44FF]" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'issue': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'update': return <TrendingUp className="w-4 h-4 text-blue-400" />;
      default: return <User className="w-4 h-4 text-white/60" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ai_analysis': return 'text-[#8E44FF] bg-[#8E44FF]/10 border-[#8E44FF]/20';
      case 'success': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'issue': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'update': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-white/60 bg-white/10 border-white/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-[#8E44FF]" />
          <h2 className="text-2xl font-bold text-white font-['Montserrat']">
            Journal de Bord IA
          </h2>
          <Badge className="bg-[#FFD56B]/20 text-[#FFD56B] border-[#FFD56B]/30">
            {journal.length} entrées
          </Badge>
        </div>
      </Card>

      {/* Journal Entries */}
      <div className="space-y-4">
        {journal.map((entry) => (
          <Card key={entry.id} className="glass-effect border-white/20 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {getTypeIcon(entry.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white font-['Montserrat']">
                    {entry.title}
                  </h3>
                  <Badge className={`${getTypeColor(entry.type)} border text-xs`}>
                    {entry.type.replace('_', ' ')}
                  </Badge>
                  {entry.aiGenerated && (
                    <Badge className="bg-[#8E44FF]/20 text-[#8E44FF] border-[#8E44FF]/30 text-xs">
                      IA
                    </Badge>
                  )}
                </div>
                
                <p className="text-white/80 font-['Montserrat'] mb-3">
                  {entry.content}
                </p>
                
                <div className="flex items-center gap-4 text-white/50 text-sm font-['Montserrat']">
                  <span>Par: {entry.author}</span>
                  <span>•</span>
                  <span>{entry.timestamp.toLocaleString('fr-CA')}</span>
                  <span>•</span>
                  <span>
                    {entry.relatedTo.type}: {entry.relatedTo.id}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {journal.length === 0 && (
        <Card className="glass-effect border-white/20 p-12 text-center">
          <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
            Journal vide
          </h3>
          <p className="text-white/60 font-['Montserrat']">
            Les actions et analyses IA apparaîtront ici automatiquement
          </p>
        </Card>
      )}
    </motion.div>
  );
};

export default JournalModule;
