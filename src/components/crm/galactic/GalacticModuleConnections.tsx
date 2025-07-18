import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Target, 
  Users, 
  Calculator,
  ArrowRight,
  Zap,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface GalacticModuleConnectionsProps {
  onModuleClick: (module: string) => void;
}

const GalacticModuleConnections: React.FC<GalacticModuleConnectionsProps> = ({ onModuleClick }) => {
  const modules = [
    {
      id: 'qrvisibilite',
      name: 'QRVISIBILITÉ™',
      description: 'Import automatique des businesses détectés dans votre zone',
      icon: Eye,
      color: 'from-[#8E44FF] to-[#8E44FF]',
      bgColor: 'bg-[#8E44FF]/10',
      borderColor: 'border-[#8E44FF]/30',
      textColor: 'text-[#8E44FF]',
      url: '/rival-views',
      status: 'connected',
      lastSync: '2 min',
      dataCount: '47 businesses'
    },
    {
      id: 'adluma',
      name: 'ADLUMA™',
      description: 'Création automatique de prospects depuis les simulations',
      icon: Calculator,
      color: 'from-[#FFD56B] to-[#FFD56B]',
      bgColor: 'bg-[#FFD56B]/10',
      borderColor: 'border-[#FFD56B]/30',
      textColor: 'text-[#FFD56B]',
      url: '/simulateur',
      status: 'connected',
      lastSync: '5 min',
      dataCount: '12 simulations'
    },
    {
      id: 'ilumatch',
      name: 'ILUMATCH™',
      description: 'Matching intelligent entreprises-partenaires',
      icon: Users,
      color: 'from-green-500 to-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
      url: '/modules/ilumatch',
      status: 'connected',
      lastSync: '1 min',
      dataCount: '8 matches'
    },
    {
      id: 'rivalviews',
      name: 'RivalViews™',
      description: 'Analyse concurrentielle et positionnement géographique',
      icon: Target,
      color: 'from-purple-500 to-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      url: '/rival-views?mode=rival',
      status: 'connected',
      lastSync: '3 min',
      dataCount: '23 analyses'
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'connected') {
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
    return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-2">
            🔗 Connexions Modules Iluma™
          </h2>
          <p className="text-white/60 font-['Montserrat']">
            Synchronisation bidirectionnelle avec l'écosystème complet
          </p>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <Zap className="w-3 h-3 mr-1" />
          Tous connectés
        </Badge>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => {
          const IconComponent = module.icon;
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`glass-effect ${module.borderColor} border-2 p-6 hover:border-opacity-50 transition-all duration-300 group cursor-pointer`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white font-['Montserrat'] flex items-center gap-2">
                        {module.name}
                        {getStatusIcon(module.status)}
                      </h3>
                      <p className="text-xs text-white/60">
                        Sync: {module.lastSync} • {module.dataCount}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                </div>

                <p className="text-sm text-white/70 font-['Montserrat'] mb-4">
                  {module.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className={`${module.bgColor} px-3 py-1 rounded-full`}>
                    <span className={`text-xs font-medium ${module.textColor}`}>
                      Connecté
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onModuleClick(module.id)}
                      className={`${module.borderColor} ${module.textColor} hover:${module.bgColor} text-xs`}
                    >
                      Sync
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(module.url, '_blank')}
                      className={`bg-gradient-to-r ${module.color} text-white hover:opacity-90 text-xs`}
                    >
                      Ouvrir
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="glass-effect border-white/20 p-6">
        <h3 className="text-lg font-bold text-white font-['Montserrat'] mb-4">
          ⚡ Actions Rapides Multi-Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="bg-[#8E44FF]/20 hover:bg-[#8E44FF]/30 text-white border border-[#8E44FF]/50"
            onClick={() => onModuleClick('import_all')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Import Global QRVISIBILITÉ™
          </Button>
          <Button 
            className="bg-[#FFD56B]/20 hover:bg-[#FFD56B]/30 text-white border border-[#FFD56B]/50"
            onClick={() => onModuleClick('create_from_simulation')}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Créer depuis ADLUMA™
          </Button>
          <Button 
            className="bg-green-500/20 hover:bg-green-500/30 text-white border border-green-500/50"
            onClick={() => onModuleClick('find_matches')}
          >
            <Users className="w-4 h-4 mr-2" />
            Lancer ILUMATCH™
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GalacticModuleConnections;