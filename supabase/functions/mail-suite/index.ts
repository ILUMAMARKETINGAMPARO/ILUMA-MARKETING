import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

interface EmailRequest {
  type: 'contact' | 'ila_report' | 'welcome' | 'quote_request' | 'newsletter';
  to: string;
  data: any;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, to, data }: EmailRequest = await req.json();

    console.log('Mail Suite - Processing:', { type, to, data });

    let emailResponse;

    switch (type) {
      case 'contact':
        emailResponse = await sendContactEmail(to, data);
        break;
      
      case 'ila_report':
        emailResponse = await sendILAReport(to, data);
        break;
      
      case 'welcome':
        emailResponse = await sendWelcomeEmail(to, data);
        break;
      
      case 'quote_request':
        emailResponse = await sendQuoteRequest(to, data);
        break;
      
      case 'newsletter':
        emailResponse = await sendNewsletter(to, data);
        break;
      
      default:
        throw new Error(`Type d'email non supporté: ${type}`);
    }

    // Log email in CRM
    await supabase.from('liaisons_crm').insert({
      type: 'client_projet',
      source_id: crypto.randomUUID(),
      cible_id: crypto.randomUUID(),
      metadata: {
        type: 'email_sent',
        email_type: type,
        recipient: to,
        timestamp: new Date().toISOString(),
        email_id: emailResponse.data?.id
      }
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in Mail Suite:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

async function sendContactEmail(to: string, data: any) {
  const { name, email, company, message, phone } = data;

  return await resend.emails.send({
    from: "LILO™ Assistant <noreply@ilumamarketing.com>",
    to: [to],
    subject: `🚀 Merci pour votre message, ${name}!`,
    html: `
      <div style="font-family: 'Montserrat', Arial, sans-serif; background: linear-gradient(135deg, #0B0B0E 0%, #1a1a2e 100%); color: white; padding: 40px; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8E44FF; font-size: 28px; margin: 0;">✨ Message reçu avec succès!</h1>
          <p style="color: #F5D06F; font-size: 16px;">Votre demande sera traitée dans les 24h</p>
        </div>
        
        <div style="background: rgba(142, 68, 255, 0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h2 style="color: #8E44FF; margin-top: 0;">📋 Récapitulatif de votre demande</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ''}
          ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
          <p><strong>Message:</strong> ${message}</p>
        </div>

        <div style="background: rgba(245, 208, 111, 0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #F5D06F; margin-top: 0;">🎯 Prochaines étapes</h3>
          <ul style="line-height: 1.8;">
            <li>Analyse de votre demande par notre équipe IA</li>
            <li>Préparation d'une solution personnalisée</li>
            <li>Contact dans les 24h ouvrables</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #8E44FF;">En attendant, découvrez nos outils IA gratuits :</p>
          <a href="https://ilumamarketing.com/adluma" style="display: inline-block; background: linear-gradient(135deg, #8E44FF, #F5D06F); color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; margin: 10px;">🚀 Simulateur ADLUMA™</a>
          <a href="https://ilumamarketing.com/ila" style="display: inline-block; background: linear-gradient(135deg, #F5D06F, #8E44FF); color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; margin: 10px;">⚡ Score ILA™</a>
        </div>

        <hr style="border: 1px solid rgba(142, 68, 255, 0.3); margin: 30px 0;">
        
        <p style="text-align: center; color: #A3A3A3; font-size: 14px;">
          <strong>Iluma Marketing™</strong><br>
          L'IA au service de votre visibilité locale<br>
          📞 +1 (514) 882-8910 | ✉️ hola@ilumamarketing.com
        </p>
      </div>
    `,
  });
}

async function sendILAReport(to: string, data: any) {
  const { businessName, ilaScore, scores, recommendations } = data;

  return await resend.emails.send({
    from: "ILA™ Analyzer <noreply@ilumamarketing.com>",
    to: [to],
    subject: `📊 Votre Score ILA™: ${ilaScore}/100 - ${businessName}`,
    html: `
      <div style="font-family: 'Montserrat', Arial, sans-serif; background: linear-gradient(135deg, #0B0B0E 0%, #1a1a2e 100%); color: white; padding: 40px; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8E44FF; font-size: 32px; margin: 0;">⚡ Rapport ILA™</h1>
          <h2 style="color: #F5D06F; font-size: 24px;">${businessName}</h2>
          <div style="font-size: 48px; color: ${ilaScore >= 80 ? '#10B981' : ilaScore >= 60 ? '#F5D06F' : '#EF4444'}; font-weight: bold;">
            ${ilaScore}/100
          </div>
        </div>

        <div style="background: rgba(142, 68, 255, 0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #8E44FF; margin-top: 0;">📈 Détail des scores</h3>
          <div style="display: grid; gap: 15px;">
            <div>SEO: <span style="color: #F5D06F;">${scores.seo_score}/100</span></div>
            <div>Contenu: <span style="color: #F5D06F;">${scores.contenu_score}/100</span></div>
            <div>Présence physique: <span style="color: #F5D06F;">${scores.presence_physique_score}/100</span></div>
            <div>Réputation: <span style="color: #F5D06F;">${scores.reputation_score}/100</span></div>
            <div>Position locale: <span style="color: #F5D06F;">${scores.position_score}/100</span></div>
          </div>
        </div>

        <div style="background: rgba(245, 208, 111, 0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #F5D06F; margin-top: 0;">🎯 Recommandations IA</h3>
          <p style="line-height: 1.6;">${recommendations.analysis}</p>
          <p><strong>Action prioritaire:</strong> ${recommendations.primaryAction}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://ilumamarketing.com/contact" style="display: inline-block; background: linear-gradient(135deg, #8E44FF, #F5D06F); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
            🚀 Améliorer mon score ILA™
          </a>
        </div>

        <hr style="border: 1px solid rgba(142, 68, 255, 0.3); margin: 30px 0;">
        
        <p style="text-align: center; color: #A3A3A3; font-size: 14px;">
          <strong>ILA™ - Indice de Luminosité Algorithmique</strong><br>
          Analyse IA de votre visibilité locale par Iluma Marketing™
        </p>
      </div>
    `,
  });
}

async function sendWelcomeEmail(to: string, data: any) {
  const { name } = data;

  return await resend.emails.send({
    from: "LILO™ <welcome@ilumamarketing.com>",
    to: [to],
    subject: `👽 Bienvenue dans l'univers Iluma™, ${name}!`,
    html: `
      <div style="font-family: 'Montserrat', Arial, sans-serif; background: linear-gradient(135deg, #0B0B0E 0%, #1a1a2e 100%); color: white; padding: 40px; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8E44FF; font-size: 32px; margin: 0;">🚀 Bienvenue ${name}!</h1>
          <p style="color: #F5D06F; font-size: 18px;">Votre aventure IA commence maintenant</p>
        </div>

        <div style="background: rgba(142, 68, 255, 0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #8E44FF; margin-top: 0;">🎯 Vos outils IA gratuits</h3>
          <div style="line-height: 2;">
            <p>🔍 <strong>ADLUMA™</strong> - Simulateur de campagnes publicitaires</p>
            <p>⚡ <strong>ILA™</strong> - Score de visibilité locale</p>
            <p>🗺️ <strong>RevalViews™</strong> - Cartographie concurrentielle</p>
            <p>👽 <strong>LILO™</strong> - Assistant IA personnel</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://ilumamarketing.com/hub" style="display: inline-block; background: linear-gradient(135deg, #8E44FF, #F5D06F); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
            🌟 Accéder au Hub Iluma™
          </a>
        </div>

        <hr style="border: 1px solid rgba(142, 68, 255, 0.3); margin: 30px 0;">
        
        <p style="text-align: center; color: #A3A3A3; font-size: 14px;">
          <strong>Iluma Marketing™</strong><br>
          L'intelligence artificielle au service de votre croissance
        </p>
      </div>
    `,
  });
}

async function sendQuoteRequest(to: string, data: any) {
  const { name, company, services, budget } = data;

  return await resend.emails.send({
    from: "Devis Iluma™ <quotes@ilumamarketing.com>",
    to: [to],
    subject: `💰 Votre devis personnalisé - ${company || name}`,
    html: `
      <div style="font-family: 'Montserrat', Arial, sans-serif; background: linear-gradient(135deg, #0B0B0E 0%, #1a1a2e 100%); color: white; padding: 40px; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8E44FF; font-size: 28px; margin: 0;">💰 Devis personnalisé</h1>
          <p style="color: #F5D06F; font-size: 16px;">Préparé spécialement pour ${company || name}</p>
        </div>

        <div style="background: rgba(142, 68, 255, 0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #8E44FF; margin-top: 0;">📋 Votre demande</h3>
          <p><strong>Services demandés:</strong> ${Array.isArray(services) ? services.join(', ') : services}</p>
          ${budget ? `<p><strong>Budget indicatif:</strong> ${budget}</p>` : ''}
        </div>

        <div style="background: rgba(245, 208, 111, 0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #F5D06F; margin-top: 0;">⏱️ Prochaines étapes</h3>
          <ul style="line-height: 1.8;">
            <li>Analyse de vos besoins par nos experts IA</li>
            <li>Préparation du devis personnalisé (24-48h)</li>
            <li>Appel de présentation gratuit</li>
            <li>Mise en place rapide si validation</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://calendly.com/ilumamarketing" style="display: inline-block; background: linear-gradient(135deg, #8E44FF, #F5D06F); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
            📞 Réserver un appel gratuit
          </a>
        </div>

        <hr style="border: 1px solid rgba(142, 68, 255, 0.3); margin: 30px 0;">
        
        <p style="text-align: center; color: #A3A3A3; font-size: 14px;">
          Équipe commerciale Iluma™<br>
          📞 +1 (514) 882-8910 | ✉️ sales@ilumamarketing.com
        </p>
      </div>
    `,
  });
}

async function sendNewsletter(to: string, data: any) {
  const { subject, content, cta } = data;

  return await resend.emails.send({
    from: "Newsletter Iluma™ <newsletter@ilumamarketing.com>",
    to: [to],
    subject: subject || "🚀 Newsletter Iluma™ - Nouvelles IA & Marketing",
    html: `
      <div style="font-family: 'Montserrat', Arial, sans-serif; background: linear-gradient(135deg, #0B0B0E 0%, #1a1a2e 100%); color: white; padding: 40px; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8E44FF; font-size: 28px; margin: 0;">🚀 Newsletter Iluma™</h1>
          <p style="color: #F5D06F; font-size: 16px;">Les dernières innovations IA & Marketing</p>
        </div>

        <div style="background: rgba(142, 68, 255, 0.1); padding: 25px; border-radius: 15px; margin: 20px 0;">
          ${content || '<p>Contenu de la newsletter...</p>'}
        </div>

        ${cta ? `
        <div style="text-align: center; margin-top: 30px;">
          <a href="${cta.url}" style="display: inline-block; background: linear-gradient(135deg, #8E44FF, #F5D06F); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
            ${cta.text}
          </a>
        </div>
        ` : ''}

        <hr style="border: 1px solid rgba(142, 68, 255, 0.3); margin: 30px 0;">
        
        <p style="text-align: center; color: #A3A3A3; font-size: 12px;">
          Vous recevez cet email car vous êtes abonné à la newsletter Iluma™<br>
          <a href="#" style="color: #8E44FF;">Se désabonner</a> | <a href="#" style="color: #8E44FF;">Préférences</a>
        </p>
      </div>
    `,
  });
}