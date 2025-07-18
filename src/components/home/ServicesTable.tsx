import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, Star, MapPin, Video, Users } from 'lucide-react';

const ServicesTable = () => {
  const services = [
    {
      icon: ExternalLink,
      service: "Sites Web IA-optimisés",
      result: "+50 % de taux de conversion"
    },
    {
      icon: MapPin,
      service: "SEO local + Google SGE",
      result: "Position #1 sur requêtes locales clés"
    },
    {
      icon: TrendingUp,
      service: "Publicité Google Ads",
      result: "ROI piloté par IA et tableaux de bord"
    },
    {
      icon: Users,
      service: "Social Ads IA-friendly",
      result: "Engagement + portée locale renforcée"
    },
    {
      icon: Video,
      service: "SEO YouTube / Shorts",
      result: "Trafic vidéo organique multiplié"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-900/10 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Montserrat']">
            Ce que nous faisons pour votre croissance
          </h2>
        </motion.div>

        <div className="space-y-4 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-[#9B5DE5]/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#9B5DE5] to-[#FDCB6E] rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white font-['Montserrat']">
                    {service.service}
                  </span>
                </div>
                <div className="text-[#FDCB6E] font-bold font-['Montserrat']">
                  {service.result}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-[#9B5DE5] to-[#FDCB6E] hover:from-[#FDCB6E] hover:to-[#9B5DE5] text-white font-bold rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl font-['Montserrat']">
            Explorez nos solutions
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesTable;