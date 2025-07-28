import React, { useState } from 'react';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import SEOManager from '@/components/seo/SEOManager';
import JsonLd from '@/components/seo/JsonLd';
import SkipToContent from '@/components/accessibility/SkipToContent';
import { useLanguage } from '@/hooks/useLanguage';
import { useLiloUX } from '@/hooks/useLiloUX';
import { Phone, Mail, MapPin, Clock, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ContactMap from '@/components/contact/ContactMap';
import MapboxProvider from '@/components/rivalviews/MapboxProvider';
import FloatingLilo from '@/components/common/FloatingLilo';
const Contact = () => {
  const { language, t } = useLanguage();
  const {
    liloMood,
    liloMessage,
    handleCTAHighlight
  } = useLiloUX();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    objet: '',
    message: ''
  });
  const contacts = [{
    name: "Sergio Ramos",
    role: "Co-Fondateur & Directeur Général",
    email: "sergio.ramos@ilumamarketing.com",
    phone: "+1 (514) 882-8910",
    speciality: "CEO",
    avatar: "SR"
  }, {
    name: "Amparo Lopez",
    role: "Co-Fondatrice & Directrice des opérations",
    email: "amparo@ilumamarketing.com",
    phone: "+54 9 379 460-8239",
    speciality: "COO",
    avatar: "AL"
  }];
  // SEO Data
  const seoData = {
    title: t('contact.seo.title'),
    description: t('contact.seo.description'),
    keywords: ['contact', 'Iluma Marketing', 'assistance IA', 'consultation', 'Montréal', 'Quebec'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Iluma Marketing",
      "description": t('contact.seo.description'),
      "url": "https://ilumamarketing.com/contact",
      "sameAs": [
        "https://www.linkedin.com/company/iluma-marketing",
        "https://twitter.com/ilumamarketing"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-514-882-8910",
        "contactType": "customer service",
        "email": "administracion@ilumamarketing.com",
        "areaServed": "CA",
        "availableLanguage": ["French", "English", "Spanish"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CA",
        "addressRegion": "Quebec",
        "addressLocality": "Montreal"
      }
    },
    openGraph: {
      title: t('contact.seo.title'),
      description: t('contact.seo.description'),
      type: 'website',
      image: 'https://ilumamarketing.com/images/contact-og.jpg'
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Iluma Marketing",
    "url": "https://ilumamarketing.com",
    "logo": "https://ilumamarketing.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-514-882-8910",
      "contactType": "customer service",
      "email": "administracion@ilumamarketing.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Canada",
      "addressRegion": "Quebec", 
      "addressLocality": "Montreal"
    },
    "sameAs": [
      "https://www.linkedin.com/company/iluma-marketing"
    ]
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ici on pourrait ajouter la logique d'envoi
  };
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  return <div className="min-h-screen">
      <SEOManager seoData={seoData} path="/contact" />
      <JsonLd data={organizationSchema} />
      <SkipToContent />
      <Navigation />
      <main id="main-content" className="pt-20" role="main">
        {/* Hero Section */}
        <section className="py-20 relative" aria-labelledby="contact-hero">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 id="contact-hero" className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up font-['Montserrat']">
                <span className="text-gradient">{t('contact.title')} – {t('contact.subtitle')}</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in-up font-['Montserrat']" style={{
              animationDelay: '0.2s'
            }}>
                {t('contact.subtitle')} - {language === 'fr' && 'Vous avez un projet ? Vous cherchez une solution IA-first ? Planifions un rendez-vous personnalisé pour analyser votre situation, vous présenter Iluma™ et concevoir votre stratégie sur mesure.'}
                {language === 'en' && 'Do you have a project? Looking for an AI-first solution? Let\'s schedule a personalized meeting to analyze your situation, present Iluma™ and design your custom strategy.'}
                {language === 'es' && '¿Tiene un proyecto? ¿Busca una solución AI-first? Programemos una reunión personalizada para analizar su situación, presentar Iluma™ y diseñar su estrategia a medida.'}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-12" aria-labelledby="contact-form-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <CardTitle id="contact-form-section" className="text-2xl text-white">
                    {language === 'fr' && 'Envoyez-nous un message'}
                    {language === 'en' && 'Send us a message'}
                    {language === 'es' && 'Envíanos un mensaje'}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {language === 'fr' && 'Nous vous répondrons sous 24h ouvrables'}
                    {language === 'en' && 'We will respond within 24 business hours'}
                    {language === 'es' && 'Responderemos en 24 horas hábiles'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulaire de contact">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nom" className="text-white">{t('contact.form.name')} *</Label>
                        <Input 
                          id="nom" 
                          type="text" 
                          required 
                          value={formData.nom} 
                          onChange={e => handleChange('nom', e.target.value)} 
                          className="bg-white/10 border-white/20 text-white placeholder-white/50" 
                          placeholder={t('contact.form.placeholder.name')}
                          aria-required="true"
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">{t('contact.form.email')} *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          value={formData.email} 
                          onChange={e => handleChange('email', e.target.value)} 
                          className="bg-white/10 border-white/20 text-white placeholder-white/50" 
                          placeholder={t('contact.form.placeholder.email')}
                          aria-required="true"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telephone" className="text-white">{t('contact.form.phone')}</Label>
                        <Input 
                          id="telephone" 
                          type="tel" 
                          value={formData.telephone} 
                          onChange={e => handleChange('telephone', e.target.value)} 
                          className="bg-white/10 border-white/20 text-white placeholder-white/50" 
                          placeholder={t('contact.form.placeholder.phone')}
                          autoComplete="tel"
                        />
                      </div>
                      <div>
                        <Label htmlFor="entreprise" className="text-white">{t('contact.form.company')}</Label>
                        <Input 
                          id="entreprise" 
                          type="text" 
                          value={formData.entreprise} 
                          onChange={e => handleChange('entreprise', e.target.value)} 
                          className="bg-white/10 border-white/20 text-white placeholder-white/50" 
                          placeholder={t('contact.form.placeholder.company')}
                          autoComplete="organization"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="objet" className="text-white">{t('contact.form.subject')}</Label>
                      <Select value={formData.objet} onValueChange={value => handleChange('objet', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white" aria-label={t('contact.form.subject')}>
                          <SelectValue placeholder={t('forms.placeholders.subject')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">{t('contact.form.subjects.consultation')}</SelectItem>
                          <SelectItem value="seo">{t('contact.form.subjects.seo')}</SelectItem>
                          <SelectItem value="landing">{t('contact.form.subjects.landing')}</SelectItem>
                          <SelectItem value="youtube">{t('contact.form.subjects.youtube')}</SelectItem>
                          <SelectItem value="devis">{t('contact.form.subjects.quote')}</SelectItem>
                          <SelectItem value="autre">{t('contact.form.subjects.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white">{t('contact.form.message')} *</Label>
                      <Textarea 
                        id="message" 
                        required 
                        rows={5} 
                        value={formData.message} 
                        onChange={e => handleChange('message', e.target.value)} 
                        className="bg-white/10 border-white/20 text-white placeholder-white/50" 
                        placeholder={t('contact.form.placeholder.message')}
                        aria-required="true"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="bg-gradient-to-r from-iluma-blue-500 to-iluma-purple-500 hover:from-iluma-blue-600 hover:to-iluma-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover-glow"
                        aria-label="Envoyer le formulaire de contact"
                      >
                        <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                        {t('contact.form.send')}
                      </Button>
                      
                      <Button 
                        type="button"
                        size="lg"
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8 py-3 rounded-2xl font-semibold hover-glow"
                        onClick={() => window.open('https://calendar.app.google/njJNK9Ua5ryMd6kF7', '_blank')}
                        aria-label="Réserver un rendez-vous"
                      >
                        <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
                        Réserver un RDV
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

                {/* Contact Info */}
              <div className="space-y-8">
                {/* Agenda Intelligent */}
                <Card className="glass-effect border-primary/30 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Clock className="w-6 h-6 text-primary" />
                      Réservation intelligente
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      LILO™ vous propose les meilleurs créneaux disponibles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Créneaux proposés par LILO */}
                      <div className="p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                          </div>
                          <span className="text-sm text-white/90 font-medium">
                            LILO™ recommande ces créneaux :
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { day: "Demain", time: "14:00-15:00", type: "Consultation IA" },
                            { day: "Vendredi", time: "10:30-11:30", type: "Démo personnalisée" },
                            { day: "Lundi", time: "16:00-17:00", type: "Stratégie digitale" }
                          ].map((slot, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="justify-start h-auto p-3 border-white/20 text-white hover:bg-primary/20 hover:border-primary/50"
                              onClick={() => window.open('https://calendar.app.google/njJNK9Ua5ryMd6kF7', '_blank')}
                            >
                              <div className="flex flex-col items-start text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{slot.day} {slot.time}</span>
                                  <span className="text-xs px-2 py-1 bg-primary/30 rounded-full">
                                    {slot.type}
                                  </span>
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Autres options */}
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                          onClick={() => window.open('https://calendar.app.google/njJNK9Ua5ryMd6kF7', '_blank')}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Voir tous les créneaux disponibles
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="w-full border-primary/30 text-primary hover:bg-primary/10"
                        >
                          💬 Demander un créneau personnalisé
                        </Button>
                      </div>

                      <div className="text-xs text-white/60 text-center p-2 bg-black/20 rounded-lg">
                        🔒 Vos informations restent privées - LILO™ ne montre que la disponibilité
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Informations de contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-iluma-blue-400" />
                      <span className="text-white/80">+1 (514) 882-8910</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-iluma-blue-400" />
                      <span className="text-white/80">administracion@ilumamarketing.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-iluma-blue-400" />
                      <span className="text-white/80">Montréal, Québec, Canada</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-iluma-blue-400" />
                      <span className="text-white/80">Lun-Ven 9h-18h EST</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Contacts */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Notre équipe</h3>
                  {contacts.map((contact, index) => <Card key={contact.name} className="glass-effect border-white/20 hover:border-white/30 transition-all duration-300 animate-slide-up" style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-iluma-blue-500 to-iluma-purple-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">{contact.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{contact.name}</h4>
                            <p className="text-iluma-blue-400 text-sm">{contact.role}</p>
                            <p className="text-white/60 text-sm mb-2">{contact.speciality}</p>
                            <div className="space-y-1">
                              <a href={`mailto:${contact.email}`} className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors text-sm">
                                <Mail className="w-4 h-4" />
                                <span>{contact.email}</span>
                              </a>
                              <a href={`tel:${contact.phone}`} className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors text-sm">
                                <Phone className="w-4 h-4" />
                                <span>{contact.phone}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <MapboxProvider>
              <ContactMap />
            </MapboxProvider>
          </div>
        </section>
       </main>
      <Footer />
      
      {/* LILO™ Assistant */}
      <FloatingLilo 
        currentPage="contact"
        context={{
          page: 'contact',
          userLevel: 'intermediate',
          recentActivity: ['form_view', 'contact_page'],
          emotion: 'curious',
          industryContext: 'general',
          currentGoals: ['contact_team', 'get_consultation']
        }}
        userId="visitor"
      />
    </div>;
};
export default Contact;