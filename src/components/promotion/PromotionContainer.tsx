import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PromotionContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PromotionContainer: React.FC<PromotionContainerProps> = memo(({ 
  isOpen, 
  onClose, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-gradient-to-br from-background via-background to-primary/5 border-2 border-primary/20 shadow-2xl">
          <CardContent className="p-0">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              >
                <X className="w-4 h-4" />
              </Button>
              {children}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
});

PromotionContainer.displayName = 'PromotionContainer';

export default PromotionContainer;