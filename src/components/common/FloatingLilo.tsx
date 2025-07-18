import React from 'react';
import Lilo3D from '@/components/lilo/Lilo3D';
import LiloFullBodyCharacter from '@/components/lilo/LiloFullBodyCharacter';
import { LiloModule } from '@/types/lilo';
import { useLiloContextual } from '@/hooks/useLiloContextual';

interface FloatingLiloProps {
  currentPage?: string;
  module?: LiloModule;
  onInteraction?: () => void;
  userId?: string;
  context?: {
    page: string;
    userLevel: string;
    recentActivity: string[];
    emotion?: string;
    industryContext?: string;
    currentGoals?: string[];
  };
}

const FloatingLilo: React.FC<FloatingLiloProps> = ({ 
  currentPage = 'home',
  module,
  onInteraction,
  userId = 'anonymous',
  context = {
    page: currentPage,
    userLevel: 'beginner',
    recentActivity: []
  }
}) => {
  const { getSystemPrompt, getMood } = useLiloContextual(context);

  // Enrichir le contexte avec les prompts contextuels
  const enrichedContext = {
    ...context,
    systemPrompt: getSystemPrompt(),
    mood: getMood()
  };

  // Robot consistant - toujours la même apparence 2D avec corps complet
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <LiloFullBodyCharacter 
        mood={enrichedContext.mood || 'happy'}
        scale={0.8}
        isIdle={true}
      />
    </div>
  );
};

export default FloatingLilo;