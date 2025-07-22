import React from 'react';
import { ChevronRight } from 'lucide-react';

interface GalacticBreadcrumbsProps {
  steps: string[];
  currentStep: number;
}

const GalacticBreadcrumbs: React.FC<GalacticBreadcrumbsProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4 glass-effect rounded-full px-6 py-3">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div
              className={`flex items-center space-x-2 transition-all duration-300 ${
                index === currentStep
                  ? 'text-cyan-400 scale-110'
                  : index < currentStep
                  ? 'text-green-400'
                  : 'text-white/40'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 glow-effect'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-white/20'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="text-sm font-medium hidden md:block">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-white/40" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GalacticBreadcrumbs;