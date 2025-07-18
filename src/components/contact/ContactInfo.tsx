import React from 'react';
import MPEContainer from '@/components/mpe/MPEContainer';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <MPEContainer>
        <div className="glass-effect rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6">Contact Direct</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="text-white/80">administracion@ilumamarketing.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-cyan-400" />
              <span className="text-white/80">+1 (514) 882-8910</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-white/80">Montréal, QC</span>
            </div>
          </div>
        </div>
      </MPEContainer>

      <MPEContainer>
        <div className="glass-effect rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Pourquoi nous choisir ?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <span className="text-white/80 text-sm">Réponse garantie sous 24h</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <span className="text-white/80 text-sm">Consultation initiale gratuite</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <span className="text-white/80 text-sm">Solutions 100% sur mesure</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <span className="text-white/80 text-sm">Technologie IA de pointe</span>
            </div>
          </div>
        </div>
      </MPEContainer>
    </div>
  );
};

export default ContactInfo;