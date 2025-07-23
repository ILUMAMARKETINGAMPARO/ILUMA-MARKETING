import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const LegalFooter = () => {
  const { t } = useLanguage();

  const legalInfo = {
    fr: {
      company: "Iluma Marketing LLC",
      addresses: {
        montreal: "3512 Boulevard Industriel, Montréal, QC H1H 2Y4, Canada",
        newyork: "228 Park Ave S, PMB 75185, New York, NY 10003-1502, USA",
        delaware: "651 N Broad St, Suite 201, Middletown, DE 19709, USA"
      },
      email: "iluma.marketing@gmail.com",
      phone: "+1 (514) 882-8910",
      ceo: "Sergio David Ortega-Ramos",
      coo: "Amparo Lopez",
      copyright: "Tous les contenus du site Iluma™ sont la propriété exclusive d'Iluma Marketing LLC.",
      dataProtection: "Vos données, votre droit. Naviguez en confiance.",
      compliance: "Conforme RGPD, Loi 25 & WCAG 2.1 AA"
    },
    en: {
      company: "Iluma Marketing LLC",
      addresses: {
        montreal: "3512 Boulevard Industriel, Montréal, QC H1H 2Y4, Canada",
        newyork: "228 Park Ave S, PMB 75185, New York, NY 10003-1502, USA",
        delaware: "651 N Broad St, Suite 201, Middletown, DE 19709, USA"
      },
      email: "iluma.marketing@gmail.com",
      phone: "+1 (514) 882-8910",
      ceo: "Sergio David Ortega-Ramos",
      coo: "Amparo Lopez",
      copyright: "All content on the Iluma™ site is the exclusive property of Iluma Marketing LLC.",
      dataProtection: "Your data, your right. Browse with confidence.",
      compliance: "GDPR, Loi 25 & WCAG 2.1 AA Compliant"
    },
    es: {
      company: "Iluma Marketing LLC",
      addresses: {
        montreal: "3512 Boulevard Industriel, Montréal, QC H1H 2Y4, Canada",
        newyork: "228 Park Ave S, PMB 75185, New York, NY 10003-1502, USA",
        delaware: "651 N Broad St, Suite 201, Middletown, DE 19709, USA"
      },
      email: "iluma.marketing@gmail.com",
      phone: "+1 (514) 882-8910",
      ceo: "Sergio David Ortega-Ramos",
      coo: "Amparo Lopez",
      copyright: "Todos los contenidos del sitio Iluma™ son propiedad exclusiva de Iluma Marketing LLC.",
      dataProtection: "Tus datos, tu derecho. Navega con confianza.",
      compliance: "Conforme RGPD, Ley 25 & WCAG 2.1 AA"
    },
    ar: {
      company: "Iluma Marketing LLC",
      addresses: {
        montreal: "3512 Boulevard Industriel, Montréal, QC H1H 2Y4, Canada",
        newyork: "228 Park Ave S, PMB 75185, New York, NY 10003-1502, USA",
        delaware: "651 N Broad St, Suite 201, Middletown, DE 19709, USA"
      },
      email: "iluma.marketing@gmail.com",
      phone: "+1 (514) 882-8910",
      ceo: "Sergio David Ortega-Ramos",
      coo: "Amparo Lopez",
      copyright: "جميع محتويات موقع Iluma™ هي ملكية حصرية لشركة Iluma Marketing LLC.",
      dataProtection: "بياناتك، حقك. تصفح بثقة.",
      compliance: "متوافق مع GDPR، Loi 25 & WCAG 2.1 AA"
    }
  };

  const currentLang = useLanguage().language;
  const info = legalInfo[currentLang] || legalInfo.fr; // Fallback to French if language not found

  return (
    <div className="bg-black/40 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Info */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4 font-['Montserrat']">{info.company}</h3>
            <div className="space-y-2 text-white/70 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium text-white">Montréal (Siège)</p>
                  <p>{info.addresses.montreal}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 font-['Montserrat']">{t('footer.legal.otherOffices')}</h4>
            <div className="space-y-3 text-white/70 text-sm">
              <div>
                <p className="font-medium text-white">New York</p>
                <p>{info.addresses.newyork}</p>
              </div>
              <div>
                <p className="font-medium text-white">Delaware</p>
                <p>{info.addresses.delaware}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 font-['Montserrat']">{t('footer.legal.contact')}</h4>
            <div className="space-y-2 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a href={`mailto:${info.email}`} className="hover:text-primary transition-colors">
                  {info.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a href={`tel:${info.phone}`} className="hover:text-primary transition-colors">
                  {info.phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 font-['Montserrat']">{t('footer.legal.management')}</h4>
            <div className="space-y-2 text-white/70 text-sm">
              <p><span className="text-white">CEO:</span> {info.ceo}</p>
              <p><span className="text-white">COO:</span> {info.coo}</p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-white/10 pt-8 mb-6">
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <a href="/politique-confidentialite" className="hover:text-primary transition-colors">
              {t('footer.legal.privacyPolicy')}
            </a>
            <a href="/mentions-legales" className="hover:text-primary transition-colors">
              {t('footer.legal.legalNotices')}
            </a>
            <a href="/accessibilite" className="hover:text-primary transition-colors">
              {t('footer.legal.accessibility')}
            </a>
            <a href="/cookies" className="hover:text-primary transition-colors">
              {t('footer.legal.cookieManagement')}
            </a>
            <a href="mailto:protection@iluma.marketing" className="hover:text-primary transition-colors">
              {t('footer.legal.gdprRights')}
            </a>
          </div>
        </div>

        {/* Compliance & Copyright */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-white/80 text-sm font-['Montserrat']">{info.compliance}</span>
            </div>
            <div className="text-center">
              <p className="text-primary font-medium text-sm font-['Montserrat']">
                {info.dataProtection}
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-white/60 text-xs">{info.copyright}</p>
            <p className="text-white/40 text-xs mt-1">
              © 2024 {info.company}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalFooter;