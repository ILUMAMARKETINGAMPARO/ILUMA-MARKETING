import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation/NavbarIlumaUltimate';
import Footer from '@/components/Footer';
import { Users, TrendingUp, Calendar, MessageSquare, Brain, Filter, Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/useTranslations';

const CRMIluma = () => {
  const { t } = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock client data
  const clients = [
    {
      id: 1,
      name: 'Restaurant La Belle Époque',
      status: 'active',
      score: 85,
      lastContact: '2024-01-15',
      sector: 'restauration',
      services: ['SEO Local', 'Landing Page'],
      revenue: 2500
    },
    {
      id: 2,
      name: 'Boutique Élégance',
      status: 'prospect',
      score: 72,
      lastContact: '2024-01-12',
      sector: 'mode',
      services: ['ADLUMA™', 'ILA™'],
      revenue: 0
    },
    {
      id: 3,
      name: 'Clinique Santé Plus',
      status: 'active',
      score: 92,
      lastContact: '2024-01-10',
      sector: 'santé',
      services: ['CRM', 'BlogIA'],
      revenue: 4200
    }
  ];

  const features = [
    {
      icon: Users,
      title: t('crm.features.management.title'),
      description: t('crm.features.management.description')
    },
    {
      icon: Brain,
      title: t('crm.features.scoring.title'),
      description: t('crm.features.scoring.description')
    },
    {
      icon: TrendingUp,
      title: t('crm.features.analytics.title'),
      description: t('crm.features.analytics.description')
    },
    {
      icon: Calendar,
      title: t('crm.features.automation.title'),
      description: t('crm.features.automation.description')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'prospect': return 'text-yellow-400 bg-yellow-400/10';
      case 'inactive': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-blue-300 font-medium text-lg font-['Montserrat']">CRM Iluma™</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6 font-['Montserrat'] leading-tight">
              CRM ILUMA™ – Cerveau stratégique de votre entreprise
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-['Montserrat']">
              Le CRM Iluma™ centralise et connecte TOUS vos outils : clients, projets, scores ILA™, campagnes ADLUMA™, leads ILUMATCH™. Ultra-sécurisé, intelligent et évolutif, c'est le système nerveux stratégique de votre croissance.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="glass-effect border-white/20 p-6 text-center hover:border-blue-400/30 transition-colors">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-['Montserrat']">{feature.title}</h3>
                    <p className="text-white/70 font-['Montserrat']">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* CRM Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <Card className="glass-effect border-white/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-['Montserrat']">
                  {t('crm.dashboard.title')}
                </h2>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 font-['Montserrat']">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('crm.dashboard.add_client')}
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                  <Input
                    placeholder={t('crm.dashboard.search_placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black/20 border-white/20 text-white"
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  {t('crm.dashboard.filter')}
                </Button>
              </div>

              {/* Client List */}
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="bg-black/20 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold font-['Montserrat']">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold font-['Montserrat']">{client.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span>Score ILA™: {client.score}</span>
                            <span>Secteur: {client.sector}</span>
                            <span>CA: {client.revenue}€</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white/60 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Card className="glass-effect border-white/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-4 font-['Montserrat']">
                {t('crm.cta.title')}
              </h2>
              <p className="text-white/80 mb-6 font-['Montserrat']">
                {t('crm.cta.description')}
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 font-['Montserrat']">
                <Users className="w-5 h-5 mr-2" />
                {t('crm.cta.button')}
              </Button>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CRMIluma;
