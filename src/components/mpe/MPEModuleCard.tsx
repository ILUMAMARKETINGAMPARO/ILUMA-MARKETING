
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, TrendingUp, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMPE } from '@/contexts/MPEContext';

interface MPEModuleCardProps {
  moduleId: string;
  onExecutePrompt?: (promptId: string) => void;
}

const MPEModuleCard: React.FC<MPEModuleCardProps> = ({ moduleId, onExecutePrompt }) => {
  const { modules, executePrompt, connectToCRM } = useMPE();
  const module = modules.find(m => m.id === moduleId);

  if (!module) return null;

  const getModuleIcon = (moduleId: string) => {
    const icons = {
      adluma: Brain,
      blogia: TrendingUp,
      hub: Zap,
      ila: TrendingUp,
      illumatch: Brain,
      landingpage: ExternalLink
    };
    return icons[moduleId as keyof typeof icons] || Brain;
  };

  const getModuleRoute = (moduleId: string) => {
    const routes = {
      adluma: '/modules/adluma',
      blogia: '/modules/blog-ia',
      hub: '/modules/hub', 
      ila: '/modules/ila',
      illumatch: '/modules/illumatch',
      landingpage: '/modules/landingpage'
    };
    return routes[moduleId as keyof typeof routes] || '#';
  };

  const ModuleIcon = getModuleIcon(moduleId);

  const handlePromptExecution = async (promptId: string) => {
    const result = await executePrompt(promptId);
    console.log('Résultat du prompt:', result);
    if (onExecutePrompt) {
      onExecutePrompt(promptId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 border-green-500/30 text-green-300';
      case 'loading': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full h-full"
    >
      <Card className="glass-effect border-purple-500/30 p-6 group hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden h-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4">
            <ModuleIcon className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <ModuleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-100 transition-colors">
                  {module.name}
                </h3>
                <p className="text-purple-300 text-sm">Module MPE</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                {module.status}
              </Badge>
              {module.ilaScore && (
                <Badge className="px-3 py-1 bg-blue-500/20 border-blue-500/30 rounded-full text-blue-300 text-xs font-medium">
                  ILA: {module.ilaScore}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 mb-6 leading-relaxed flex-grow">
            {module.description}
          </p>

          {/* CRM Status */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${module.crmConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-white/60 text-sm">
              CRM {module.crmConnected ? 'Connecté' : 'Déconnecté'}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Link to={getModuleRoute(moduleId)}>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group"
              >
                <Brain className="w-4 h-4 mr-2" />
                Ouvrir le module
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            {module.prompts.slice(0, 1).map((prompt) => (
              <Button
                key={prompt.id}
                variant="outline"
                size="sm"
                className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 text-white hover:from-purple-600/30 hover:to-pink-600/30 text-xs"
                onClick={() => handlePromptExecution(prompt.id)}
              >
                <Zap className="w-3 h-3 mr-2" />
                {prompt.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </Card>
    </motion.div>
  );
};

export default MPEModuleCard;