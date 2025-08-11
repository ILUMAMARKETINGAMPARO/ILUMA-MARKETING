import React, { useState } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import MPEContainer from '@/components/mpe/MPEContainer';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ThankYouScreen from '@/components/contact/ThankYouScreen';
import { useTranslations } from '@/hooks/useTranslations';

interface FormData {
  nom: string;
  email: string;
  entreprise: string;
  secteur: string;
  budget: string;
  objectif: string;
  message: string;
  priorite: string;
}

const ContactAdaptatif = () => {
  const { t } = useTranslations();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setIsSubmitted(true);
  };

  if (isSubmitted && formData) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20">
          <ThankYouScreen formData={formData} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <MPEContainer className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('contact.hero.title')} <span className="text-gradient">{t('contact.hero.highlight')}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                {t('contact.hero.description')}
              </p>
            </MPEContainer>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <MPEContainer>
                  <ContactForm onSubmit={handleFormSubmit} />
                </MPEContainer>
              </div>

              {/* Contact Info */}
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactAdaptatif;