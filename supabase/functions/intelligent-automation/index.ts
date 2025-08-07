import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AutomationTrigger {
  type: 'user_action' | 'time_based' | 'score_threshold' | 'completion';
  data: any;
  userId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const trigger: AutomationTrigger = await req.json();

    // Déterminer les actions à déclencher selon le type
    const automations = await determineAutomations(trigger, supabaseClient);
    
    // Exécuter les automatisations en parallèle
    const results = await Promise.all(
      automations.map(automation => executeAutomation(automation, supabaseClient))
    );

    return new Response(JSON.stringify({ 
      success: true,
      triggered: automations.length,
      results: results.filter(r => r.success)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in intelligent-automation:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function determineAutomations(trigger: AutomationTrigger, supabase: any) {
  const automations = [];

  switch (trigger.type) {
    case 'user_action':
      // Utilisateur termine ADLUMA™
      if (trigger.data.action === 'adluma_completed') {
        automations.push({
          type: 'suggest_ila',
          userId: trigger.userId,
          data: { previousScore: trigger.data.score }
        });
        
        // Si score élevé, suggérer CRM
        if (trigger.data.score > 80) {
          automations.push({
            type: 'suggest_crm',
            userId: trigger.userId,
            data: { readiness: 'high' }
          });
        }
      }
      
      // Utilisateur inactif depuis 7 jours
      if (trigger.data.action === 'user_inactive') {
        automations.push({
          type: 'reengagement_email',
          userId: trigger.userId,
          data: { lastActivity: trigger.data.lastActivity }
        });
      }
      break;

    case 'score_threshold':
      // Score ILA™ > 90
      if (trigger.data.scoreType === 'ila' && trigger.data.score > 90) {
        automations.push({
          type: 'unlock_premium',
          userId: trigger.userId,
          data: { achievement: 'ila_master' }
        });
      }
      break;

    case 'completion':
      // Onboarding terminé
      if (trigger.data.flow === 'onboarding') {
        automations.push({
          type: 'welcome_journey',
          userId: trigger.userId,
          data: { preferences: trigger.data.preferences }
        });
      }
      break;
  }

  return automations;
}

async function executeAutomation(automation: any, supabase: any) {
  try {
    switch (automation.type) {
      case 'suggest_ila':
        await supabase.from('predictive_insights').insert({
          user_id: automation.userId,
          insight_type: 'module_suggestion',
          insight_data: {
            type: 'ila_recommendation',
            message: `Excellent travail avec ADLUMA™! Ton score de ${automation.data.previousScore} montre que tu es prêt pour ILA™ 🎯`,
            suggested_module: 'ILA',
            confidence: 92
          },
          confidence_score: 92
        });
        break;

      case 'suggest_crm':
        await supabase.from('predictive_insights').insert({
          user_id: automation.userId,
          insight_type: 'conversion_opportunity',
          insight_data: {
            type: 'crm_ready',
            message: 'Tes résultats sont impressionnants! Le CRM Iluma™ va propulser ton business 🚀',
            suggested_action: 'explore_crm',
            confidence: 88
          },
          confidence_score: 88
        });
        break;

      case 'reengagement_email':
        // Logique d'envoi d'email de réengagement
        await supabase.from('lilo_interactions').insert({
          user_id: automation.userId,
          page_context: 'automation',
          emotion_detected: 'concerned',
          lilo_response: 'Je remarque que tu n\'es pas venu depuis un moment. Besoin d\'aide? 🤔',
          user_message: 'Automation: réengagement après inactivité'
        });
        break;

      case 'unlock_premium':
        await supabase.from('user_preferences').upsert({
          user_id: automation.userId,
          user_level: 'expert',
          preferred_modules: ['ADLUMA', 'ILA', 'CRM', 'ILUMATCH'],
          ui_preferences: { theme: 'premium', achievements: ['ila_master'] }
        });
        break;

      case 'welcome_journey':
        await supabase.from('predictive_insights').insert({
          user_id: automation.userId,
          insight_type: 'welcome_guidance',
          insight_data: {
            type: 'journey_start',
            message: 'Bienvenue dans l\'univers Iluma™! Commençons par découvrir tes objectifs 🌟',
            suggested_module: 'ADLUMA',
            confidence: 95
          },
          confidence_score: 95
        });
        break;
    }

    return { success: true, type: automation.type };
  } catch (error) {
    console.error('Automation execution failed:', error);
    return { success: false, type: automation.type, error: error.message };
  }
}