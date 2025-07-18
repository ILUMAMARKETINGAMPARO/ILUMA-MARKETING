import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  AlertTriangle, 
  Heart, 
  Shield, 
  Save, 
  RotateCcw,
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AIProtectionProps {
  type: 'delete' | 'critical' | 'save';
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  itemName?: string;
  autoSave?: boolean;
}

const AIProtection: React.FC<AIProtectionProps> = ({
  type,
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
  itemName = '',
  autoSave = false
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [showEmotional, setShowEmotional] = useState(true);

  const expectedText = type === 'delete' ? 'SUPPRIMER' : 'CONFIRMER';
  const isValidConfirmation = confirmText.toUpperCase() === expectedText;

  const handleConfirm = async () => {
    if (type === 'delete' && !isValidConfirmation) {
      return;
    }
    
    setIsConfirming(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pause émotionnelle
    onConfirm();
    setIsConfirming(false);
    setConfirmText('');
  };

  const emotionalMessages = {
    delete: [
      "😔 Es-tu vraiment sûr de vouloir supprimer cet élément ?",
      "🤔 Une fois supprimé, il sera difficile de le récupérer...",
      "💭 Peut-être vaut-il mieux l'archiver plutôt ?",
      "⚠️ Cette action est irréversible."
    ],
    critical: [
      "🚨 Cette action est importante !",
      "🧠 Prends un moment pour réfléchir...",
      "✋ Assure-toi que c'est bien ce que tu veux faire.",
      "🎯 Focus : cette décision peut avoir des conséquences."
    ],
    save: [
      "💾 Sauvegarde en cours...",
      "✨ Tes données sont précieuses !",
      "🔒 Protection automatique activée.",
      "🛡️ Sauvegarde sécurisée en cours."
    ]
  };

  const getIcon = () => {
    switch (type) {
      case 'delete': return AlertTriangle;
      case 'critical': return Eye;
      case 'save': return Save;
      default: return Shield;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'delete': return 'from-red-500 to-rose-500';
      case 'critical': return 'from-yellow-500 to-orange-500';
      case 'save': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'delete': return 'text-red-400';
      case 'critical': return 'text-yellow-400';
      case 'save': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  const IconComponent = getIcon();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <Card className="glass-effect border-white/20 p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`w-20 h-20 bg-gradient-to-br ${getColor()} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <IconComponent className="w-10 h-10 text-white" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-white font-['Montserrat'] mb-2">
                  {title}
                </h2>
                
                {itemName && (
                  <div className="text-[#FFD56B] font-medium font-['Montserrat']">
                    "{itemName}"
                  </div>
                )}
              </div>

              {/* Emotional Messages */}
              {showEmotional && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <Card className={`bg-gradient-to-r ${getColor()}/10 border-white/10 p-4`}>
                    <div className="space-y-2">
                      {emotionalMessages[type].map((msg, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + (index * 0.1) }}
                          className="text-sm text-white/80 font-['Montserrat']"
                        >
                          {msg}
                        </motion.p>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Main Message */}
              <div className="mb-6">
                <p className="text-white/80 text-center font-['Montserrat']">
                  {message}
                </p>
              </div>

              {/* Confirmation Input for Delete */}
              {type === 'delete' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm text-white/70 font-['Montserrat']">
                      Tape "{expectedText}" pour confirmer :
                    </label>
                    <Input
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder={expectedText}
                      className="bg-black/20 border-red-500/30 text-white text-center font-bold"
                      autoFocus
                    />
                    {confirmText && (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        {isValidConfirmation ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Confirmation valide</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400">Tape exactement "{expectedText}"</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                  disabled={isConfirming}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                
                <Button
                  onClick={handleConfirm}
                  disabled={isConfirming || (type === 'delete' && !isValidConfirmation)}
                  className={`flex-1 bg-gradient-to-r ${getColor()} hover:opacity-90 text-white`}
                >
                  {isConfirming ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      En cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {type === 'delete' ? 'Supprimer' : 'Confirmer'}
                    </>
                  )}
                </Button>
              </div>

              {/* Toggle Emotional Messages */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowEmotional(!showEmotional)}
                  className="w-full text-white/60 hover:text-white text-xs"
                >
                  {showEmotional ? (
                    <>
                      <EyeOff className="w-3 h-3 mr-2" />
                      Masquer les messages LILO
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 mr-2" />
                      Afficher les messages LILO
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIProtection;