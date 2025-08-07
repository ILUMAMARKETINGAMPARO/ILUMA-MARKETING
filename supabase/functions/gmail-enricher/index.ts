import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();

    console.log('Gmail Enricher - Action:', action);

    switch (action) {
      case 'extract_emails':
        return await extractEmails(data);
      
      case 'enrich_email':
        return await enrichEmail(data.emailId);
      
      case 'match_business':
        return await matchBusinessFromEmail(data.email);
      
      case 'calculate_interaction_score':
        return await calculateInteractionScore(data.emailId);
      
      default:
        throw new Error(`Action non supportée: ${action}`);
    }

  } catch (error) {
    console.error('Error in Gmail Enricher:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur Gmail Enricher',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function extractEmails(gmailData: any) {
  try {
    const emails = gmailData.emails || [];
    
    const processedEmails = [];
    
    for (const email of emails) {
      // Vérifier si l'email existe déjà
      const { data: existingEmail } = await supabase
        .from('emails')
        .select('id')
        .eq('gmail_id', email.id)
        .single();
      
      if (existingEmail) {
        console.log(`Email ${email.id} déjà traité`);
        continue;
      }

      // Extraire le contenu de l'email
      const emailData = {
        gmail_id: email.id,
        thread_id: email.threadId,
        from_email: extractEmail(email.payload?.headers?.find(h => h.name === 'From')?.value || ''),
        from_name: extractName(email.payload?.headers?.find(h => h.name === 'From')?.value || ''),
        to_email: extractEmail(email.payload?.headers?.find(h => h.name === 'To')?.value || ''),
        subject: email.payload?.headers?.find(h => h.name === 'Subject')?.value || '',
        body_text: extractTextFromPayload(email.payload),
        body_html: extractHtmlFromPayload(email.payload),
        received_at: new Date(parseInt(email.internalDate)).toISOString(),
        labels: email.labelIds || [],
        attachments_count: countAttachments(email.payload)
      };

      // Insérer l'email dans la base
      const { data: insertedEmail, error } = await supabase
        .from('emails')
        .insert(emailData)
        .select()
        .single();

      if (error) {
        console.error('Erreur insertion email:', error);
        continue;
      }

      // Analyser avec IA et enrichir
      await enrichEmail(insertedEmail.id);
      
      processedEmails.push(insertedEmail);
    }

    return new Response(JSON.stringify({
      success: true,
      processed_count: processedEmails.length,
      emails: processedEmails
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Extract emails error:', error);
    throw error;
  }
}

async function enrichEmail(emailId: string) {
  try {
    // Récupérer l'email
    const { data: email, error } = await supabase
      .from('emails')
      .select('*')
      .eq('id', emailId)
      .single();

    if (error || !email) {
      throw new Error('Email non trouvé');
    }

    // Analyser avec OpenAI
    const aiAnalysis = await analyzeEmailWithAI(email);

    // Chercher un business correspondant
    const businessMatch = await findMatchingBusiness(email);

    // Mettre à jour l'email avec les analyses
    const { error: updateError } = await supabase
      .from('emails')
      .update({
        ai_summary: aiAnalysis.summary,
        ai_sentiment: aiAnalysis.sentiment,
        ai_project_detected: aiAnalysis.project_detected,
        ai_priority_score: aiAnalysis.priority_score,
        business_id: businessMatch?.id || null,
        processed_at: new Date().toISOString()
      })
      .eq('id', emailId);

    if (updateError) {
      console.error('Erreur update email:', updateError);
    }

    // Créer une interaction si business détecté
    if (businessMatch) {
      await createInteraction(emailId, businessMatch.id, aiAnalysis);
    }

    // Enregistrer l'historique d'enrichissement
    await supabase.from('enrichissement_history').insert({
      email_id: emailId,
      business_id: businessMatch?.id || null,
      enrichment_type: 'ai_analysis',
      data_after: aiAnalysis,
      ai_confidence_score: aiAnalysis.confidence,
      processed_by: 'gmail_enricher'
    });

    return {
      success: true,
      ai_analysis: aiAnalysis,
      business_match: businessMatch
    };

  } catch (error) {
    console.error('Enrich email error:', error);
    throw error;
  }
}

async function analyzeEmailWithAI(email: any) {
  try {
    const prompt = `Analyse cet email en français et fournis une réponse JSON structurée :

Email de: ${email.from_name} <${email.from_email}>
Sujet: ${email.subject}
Contenu: ${email.body_text?.substring(0, 2000) || email.body_html?.substring(0, 2000)}

Analyse et retourne un JSON avec :
{
  "summary": "Résumé en 2-3 phrases",
  "sentiment": "positif|neutre|négatif",
  "project_detected": true/false,
  "priority_score": 1-100,
  "confidence": 1-100,
  "keywords": ["mot1", "mot2"],
  "next_action": "Action recommandée",
  "client_type": "prospect|existing|partner|other"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Tu es un assistant IA expert en analyse d\'emails commerciaux pour Iluma Marketing. Réponds uniquement en JSON valide.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    try {
      return JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Erreur parsing JSON AI:', parseError);
      return {
        summary: 'Analyse IA non disponible',
        sentiment: 'neutre',
        project_detected: false,
        priority_score: 50,
        confidence: 30,
        keywords: [],
        next_action: 'Révision manuelle recommandée',
        client_type: 'other'
      };
    }

  } catch (error) {
    console.error('AI analysis error:', error);
    throw error;
  }
}

async function findMatchingBusiness(email: any) {
  try {
    // Rechercher par email
    const { data: businessByEmail } = await supabase
      .from('businesses')
      .select('*')
      .ilike('name', `%${email.from_name?.split(' ')[0] || ''}%`)
      .limit(5);

    // Rechercher par domaine
    const domain = email.from_email.split('@')[1];
    const { data: businessByDomain } = await supabase
      .from('businesses')
      .select('*')
      .ilike('website', `%${domain}%`)
      .limit(5);

    // Retourner le premier match trouvé
    const matches = [...(businessByEmail || []), ...(businessByDomain || [])];
    return matches.length > 0 ? matches[0] : null;

  } catch (error) {
    console.error('Business matching error:', error);
    return null;
  }
}

async function createInteraction(emailId: string, businessId: string, aiAnalysis: any) {
  try {
    const interactionData = {
      business_id: businessId,
      email_id: emailId,
      type: 'email_inbound',
      content: aiAnalysis.summary,
      ai_analysis: JSON.stringify(aiAnalysis),
      sentiment_score: aiAnalysis.sentiment === 'positif' ? 75 : aiAnalysis.sentiment === 'négatif' ? -50 : 0,
      engagement_score: aiAnalysis.priority_score,
      conversion_probability: aiAnalysis.project_detected ? 80 : 30,
      next_action_suggested: aiAnalysis.next_action
    };

    const { error } = await supabase
      .from('interactions_client')
      .insert(interactionData);

    if (error) {
      console.error('Erreur création interaction:', error);
    }

  } catch (error) {
    console.error('Create interaction error:', error);
  }
}

// Fonctions utilitaires
function extractEmail(fromHeader: string): string {
  const match = fromHeader.match(/<([^>]+)>/);
  return match ? match[1] : fromHeader.split(' ')[0];
}

function extractName(fromHeader: string): string {
  const match = fromHeader.match(/^(.*)<[^>]+>$/);
  return match ? match[1].trim().replace(/"/g, '') : fromHeader.split('@')[0];
}

function extractTextFromPayload(payload: any): string {
  if (!payload) return '';
  
  if (payload.body?.data) {
    return atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
  }
  
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      }
    }
  }
  
  return '';
}

function extractHtmlFromPayload(payload: any): string {
  if (!payload) return '';
  
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/html' && part.body?.data) {
        return atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      }
    }
  }
  
  return '';
}

function countAttachments(payload: any): number {
  if (!payload?.parts) return 0;
  
  return payload.parts.filter((part: any) => 
    part.filename && part.filename.length > 0
  ).length;
}

async function matchBusinessFromEmail(email: any) {
  return await findMatchingBusiness(email);
}

async function calculateInteractionScore(emailId: string) {
  // Cette fonction pourrait être étendue pour calculer des scores plus complexes
  return { success: true, score: 75 };
}