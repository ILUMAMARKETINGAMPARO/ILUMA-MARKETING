import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Brain, Wand2, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  label: string;
  options?: string[];
  required?: boolean;
  value: string;
}

interface GPTDynamicFormProps {
  context: string;
  onSubmit: (data: Record<string, string>) => void;
  onGenerate?: (prompt: string) => void;
  className?: string;
}

const GPTDynamicForm: React.FC<GPTDynamicFormProps> = ({
  context,
  onSubmit,
  onGenerate,
  className
}) => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateForm = async () => {
    setIsGenerating(true);
    
    // Simulation de génération IA
    setTimeout(() => {
      const generatedFields: FormField[] = [
        {
          id: 'name',
          type: 'text',
          label: 'Nom de l\'entreprise',
          required: true,
          value: ''
        },
        {
          id: 'sector',
          type: 'select',
          label: 'Secteur d\'activité',
          options: ['Restaurant', 'Commerce', 'Services', 'Santé', 'Immobilier'],
          required: true,
          value: ''
        },
        {
          id: 'location',
          type: 'text',
          label: 'Ville',
          required: true,
          value: ''
        },
        {
          id: 'goals',
          type: 'textarea',
          label: 'Objectifs marketing',
          required: false,
          value: ''
        },
        {
          id: 'budget',
          type: 'number',
          label: 'Budget mensuel (CAD)',
          required: false,
          value: ''
        }
      ];
      
      setFields(generatedFields);
      setIsGenerating(false);
      onGenerate?.(prompt);
    }, 2000);
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, value } : field
    ));
  };

  const handleSubmit = () => {
    const data = fields.reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {} as Record<string, string>);
    
    onSubmit(data);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            key={field.id}
            placeholder={field.label}
            value={field.value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="bg-black/30 border-white/20 text-white"
          />
        );
      case 'select':
        return (
          <Select key={field.id} onValueChange={(value) => handleFieldChange(field.id, value)}>
            <SelectTrigger className="bg-black/30 border-white/20 text-white">
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'number':
        return (
          <Input
            key={field.id}
            type="number"
            placeholder={field.label}
            value={field.value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="bg-black/30 border-white/20 text-white"
          />
        );
      default:
        return (
          <Input
            key={field.id}
            type="text"
            placeholder={field.label}
            value={field.value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="bg-black/30 border-white/20 text-white"
          />
        );
    }
  };

  return (
    <Card className={`glass-effect border-white/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Générateur IA Contextuel
          <Badge className="bg-primary/20 text-primary">
            {context}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Prompt Input */}
        <div className="space-y-3">
          <label className="text-white/80 text-sm font-medium">
            Décrivez votre besoin :
          </label>
          <div className="flex gap-2">
            <Textarea
              placeholder="Ex: Créer un formulaire pour qualifier des prospects restaurants à Montréal..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-black/30 border-white/20 text-white flex-1"
              rows={3}
            />
            <Button
              onClick={generateForm}
              disabled={!prompt || isGenerating}
              className="bg-gradient-to-r from-primary to-secondary text-black px-6"
            >
              {isGenerating ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Generated Form */}
        {fields.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-white font-medium mb-4">Formulaire généré :</h3>
              <div className="space-y-3">
                {fields.map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-white/70 text-sm">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-primary to-secondary text-black"
            >
              <Send className="w-4 h-4 mr-2" />
              Soumettre
            </Button>
          </motion.div>
        )}

        {isGenerating && (
          <div className="text-center py-8">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-2 animate-spin" />
            <p className="text-white/60">Génération IA en cours...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GPTDynamicForm;