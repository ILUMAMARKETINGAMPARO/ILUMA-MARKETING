import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Upload, Download, FileText, Users, Calendar, Target, DollarSign, Sparkles, Calculator, X, Minus } from 'lucide-react';
interface ActionMenuButtonProps {
  onAction: (action: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  currentSection?: string;
}
const ActionMenuButton: React.FC<ActionMenuButtonProps> = ({
  onAction,
  position = 'top-right',
  currentSection = 'general'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      case 'bottom-right':
        return 'bottom-6 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      default:
        return 'top-6 right-6';
    }
  };
  const getMenuActions = () => {
    const baseActions = [{
      id: 'import',
      label: 'Importer',
      icon: Upload,
      color: '#00FF88'
    }, {
      id: 'export',
      label: 'Exporter',
      icon: Download,
      color: '#FFD56B'
    }, {
      id: 'ai_suggest',
      label: 'IA Suggère',
      icon: Sparkles,
      color: '#FF8C42'
    }];
    switch (currentSection) {
      case 'clients':
        return [{
          id: 'add_client',
          label: 'Nouveau Client',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'delete_client',
          label: 'Supprimer Client',
          icon: X,
          color: '#FF4444'
        }, {
          id: 'add_opportunity',
          label: 'Opportunité',
          icon: Target,
          color: '#00BFFF'
        }, {
          id: 'delete_opportunity',
          label: 'Suppr. Opportunité',
          icon: Minus,
          color: '#FF6666'
        }, ...baseActions];
      case 'pipeline':
        return [{
          id: 'add_opportunity',
          label: 'Nouvelle Opportunité',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'delete_opportunity',
          label: 'Suppr. Opportunité',
          icon: Minus,
          color: '#FF4444'
        }, {
          id: 'add_meeting',
          label: 'Planifier Réunion',
          icon: Calendar,
          color: '#00BFFF'
        }, {
          id: 'cancel_meeting',
          label: 'Annuler Réunion',
          icon: X,
          color: '#FF6666'
        }, ...baseActions];
      case 'opportunites':
        return [{
          id: 'add_opportunity',
          label: 'Nouvelle Opportunité',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'delete_opportunity',
          label: 'Suppr. Opportunité',
          icon: Minus,
          color: '#FF4444'
        }, {
          id: 'convert_opportunity',
          label: 'Convertir en Client',
          icon: Target,
          color: '#00FF88'
        }, {
          id: 'schedule_followup',
          label: 'Planifier Suivi',
          icon: Calendar,
          color: '#FFD56B'
        }, ...baseActions];
      case 'equipe':
      case 'team':
        return [{
          id: 'add_member',
          label: 'Ajouter Membre',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'remove_member',
          label: 'Retirer Membre',
          icon: Minus,
          color: '#FF4444'
        }, {
          id: 'add_task',
          label: 'Nouvelle Tâche',
          icon: FileText,
          color: '#00BFFF'
        }, {
          id: 'delete_task',
          label: 'Supprimer Tâche',
          icon: X,
          color: '#FF6666'
        }, {
          id: 'add_meeting',
          label: 'Planifier Réunion',
          icon: Calendar,
          color: '#FFD56B'
        }, ...baseActions];
      case 'taches':
      case 'tasks':
        return [{
          id: 'add_task',
          label: 'Nouvelle Tâche',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'complete_task',
          label: 'Terminer Tâche',
          icon: Target,
          color: '#00FF88'
        }, {
          id: 'delete_task',
          label: 'Supprimer Tâche',
          icon: Minus,
          color: '#FF4444'
        }, {
          id: 'assign_task',
          label: 'Assigner Tâche',
          icon: Users,
          color: '#00BFFF'
        }, ...baseActions];
      case 'projets':
      case 'projects':
        return [{
          id: 'add_project',
          label: 'Nouveau Projet',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'delete_project',
          label: 'Supprimer Projet',
          icon: Minus,
          color: '#FF4444'
        }, {
          id: 'archive_project',
          label: 'Archiver Projet',
          icon: X,
          color: '#FF6666'
        }, {
          id: 'add_task',
          label: 'Nouvelle Tâche',
          icon: FileText,
          color: '#00BFFF'
        }, ...baseActions];
      case 'calendrier':
      case 'calendar':
        return [{
          id: 'add_meeting',
          label: 'Nouvelle Réunion',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'cancel_meeting',
          label: 'Annuler Réunion',
          icon: Minus,
          color: '#FF4444'
        }, {
          id: 'add_task',
          label: 'Nouvelle Tâche',
          icon: FileText,
          color: '#00BFFF'
        }, {
          id: 'schedule_reminder',
          label: 'Planifier Rappel',
          icon: Calendar,
          color: '#FFD56B'
        }, ...baseActions];
      case 'revenus':
      case 'revenue':
        return [{
          id: 'add_revenue',
          label: 'Ajouter Revenus',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'remove_revenue',
          label: 'Retirer Revenus',
          icon: Minus,
          color: '#FF4444'
        }, {
          id: 'calculate_commission',
          label: 'Calc. Commissions',
          icon: Calculator,
          color: '#FFD56B'
        }, {
          id: 'reset_commission',
          label: 'Reset Commissions',
          icon: X,
          color: '#FF6666'
        }, ...baseActions];
      case 'commissions':
        return [{
          id: 'calculate_commission',
          label: 'Calculer Commission',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'reset_commission',
          label: 'Reset Commission',
          icon: Minus,
          color: '#FF4444'
        }, {
          id: 'export_commissions',
          label: 'Export Commissions',
          icon: Download,
          color: '#FFD56B'
        }, ...baseActions];
      default:
        return [{
          id: 'add_client',
          label: 'Nouveau Client',
          icon: Plus,
          color: '#8E44FF'
        }, {
          id: 'add_project',
          label: 'Nouveau Projet',
          icon: FileText,
          color: '#00BFFF'
        }, {
          id: 'add_task',
          label: 'Nouvelle Tâche',
          icon: Calendar,
          color: '#FFD56B'
        }, ...baseActions];
    }
  };
  const menuActions = getMenuActions();
  const handleActionClick = (actionId: string) => {
    onAction(actionId);
    setIsOpen(false);
  };
  return <div className={`fixed ${getPositionClasses()} z-50`}>
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        scale: 0,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0,
        y: 20
      }} className="absolute bottom-16 right-0 mb-2">
            <Card className="glass-effect border-white/20 p-3 min-w-[200px]">
              <div className="space-y-2">
                <div className="text-white/60 text-xs font-bold uppercase tracking-wide mb-3">
                  Actions Rapides
                </div>
                {menuActions.map((action, index) => {
              const IconComponent = action.icon;
              return <motion.div key={action.id} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.05
              }}>
                      <Button variant="outline" size="sm" onClick={() => handleActionClick(action.id)} className="w-full justify-start border-white/10 text-white hover:bg-white/10 transition-all duration-200" style={{
                  borderLeftColor: action.color,
                  borderLeftWidth: '3px'
                }}>
                        <IconComponent className="w-4 h-4 mr-3" style={{
                    color: action.color
                  }} />
                        {action.label}
                      </Button>
                    </motion.div>;
            })}
              </div>
            </Card>
          </motion.div>}
      </AnimatePresence>

      {/* Main Button */}
      <motion.div whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }}>
        
      </motion.div>

      {/* Backdrop */}
      {isOpen && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10" onClick={() => setIsOpen(false)} />}
    </div>;
};
export default ActionMenuButton;