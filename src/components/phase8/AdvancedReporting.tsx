import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, FileText, Download, Share, Calendar, Filter, TrendingUp, Eye } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdvancedReporting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReport, setSelectedReport] = useState('executive');

  const performanceData = [
    { name: 'Lun', seo: 245, content: 189, social: 167, ads: 203 },
    { name: 'Mar', seo: 267, content: 201, social: 145, ads: 234 },
    { name: 'Mer', seo: 289, content: 223, social: 178, ads: 267 },
    { name: 'Jeu', seo: 310, content: 245, social: 156, ads: 289 },
    { name: 'Ven', seo: 334, content: 267, social: 189, ads: 312 },
    { name: 'Sam', seo: 298, content: 234, social: 201, ads: 276 },
    { name: 'Dim', seo: 276, content: 198, social: 167, ads: 245 }
  ];

  const channelDistribution = [
    { name: 'SEO', value: 35, color: '#8B5CF6' },
    { name: 'Réseaux Sociaux', value: 25, color: '#06B6D4' },
    { name: 'Publicité', value: 20, color: '#10B981' },
    { name: 'Email', value: 12, color: '#F59E0B' },
    { name: 'Direct', value: 8, color: '#EF4444' }
  ];

  const reportTemplates = [
    {
      id: 'executive',
      name: 'Rapport Exécutif',
      description: 'Vue d\'ensemble stratégique pour la direction',
      frequency: 'Mensuel',
      pages: 8,
      icon: TrendingUp
    },
    {
      id: 'performance',
      name: 'Performance Détaillée',
      description: 'Analyse complète des métriques et KPIs',
      frequency: 'Hebdomadaire',
      pages: 15,
      icon: BarChart3
    },
    {
      id: 'roi',
      name: 'Analyse ROI',
      description: 'Retour sur investissement par canal',
      frequency: 'Mensuel',
      pages: 12,
      icon: FileText
    },
    {
      id: 'competitive',
      name: 'Veille Concurrentielle',
      description: 'Positionnement marché et opportunités',
      frequency: 'Mensuel',
      pages: 10,
      icon: Eye
    }
  ];

  const keyMetrics = [
    { title: 'Trafic Total', value: '2.4M', change: '+28%', trend: 'up' },
    { title: 'Taux Conversion', value: '8.7%', change: '+15%', trend: 'up' },
    { title: 'Coût Acquisition', value: '€24.50', change: '-12%', trend: 'down' },
    { title: 'Valeur Vie Client', value: '€340', change: '+22%', trend: 'up' }
  ];

  const generateReport = () => {
    console.log(`Génération du rapport ${selectedReport} pour la période ${selectedPeriod}`);
    // Logique de génération de rapport
  };

  return (
    <div className="space-y-6">
      {/* Contrôles de Rapport */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Rapports Avancés IA</h3>
            <p className="text-white/60">Génération automatique de rapports intelligents</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-black/40 border border-white/20 rounded px-3 py-2 text-white text-sm"
            >
              <option value="7d">7 jours</option>
              <option value="30d">30 jours</option>
              <option value="90d">90 jours</option>
              <option value="1y">1 an</option>
            </select>
            
            <Button onClick={generateReport} className="bg-gradient-to-r from-cyan-600 to-blue-600">
              <FileText className="w-4 h-4 mr-2" />
              Générer Rapport
            </Button>
          </div>
        </div>

        {/* Templates de Rapport */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => (
            <div
              key={template.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedReport === template.id 
                  ? 'border-cyan-500/50 bg-cyan-500/10' 
                  : 'border-white/20 bg-white/5 hover:border-cyan-500/30'
              }`}
              onClick={() => setSelectedReport(template.id)}
            >
              <template.icon className="w-6 h-6 text-cyan-400 mb-3" />
              <h4 className="font-semibold text-white mb-2">{template.name}</h4>
              <p className="text-white/60 text-sm mb-3">{template.description}</p>
              <div className="flex items-center justify-between text-xs">
                <Badge className="bg-white/10 border-white/20 text-white/80">
                  {template.frequency}
                </Badge>
                <span className="text-white/50">{template.pages} pages</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Métriques Clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-effect border-white/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white/80 text-sm">{metric.title}</h4>
                <Badge className={metric.trend === 'up' 
                  ? 'bg-green-500/20 border-green-500/30 text-green-300'
                  : 'bg-red-500/20 border-red-500/30 text-red-300'
                }>
                  {metric.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white">{metric.value}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Graphiques Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance par Canal */}
        <Card className="glass-effect border-white/20 p-6">
          <h4 className="text-lg font-bold text-white mb-4">Performance par Canal</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="seo" fill="#8B5CF6" name="SEO" />
                <Bar dataKey="content" fill="#06B6D4" name="Contenu" />
                <Bar dataKey="social" fill="#10B981" name="Social" />
                <Bar dataKey="ads" fill="#F59E0B" name="Publicité" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Répartition du Trafic */}
        <Card className="glass-effect border-white/20 p-6">
          <h4 className="text-lg font-bold text-white mb-4">Répartition du Trafic</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Actions de Rapport */}
      <Card className="glass-effect border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-white">Actions Rapport</h4>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Calendar className="w-4 h-4 mr-2" />
              Programmer
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Share className="w-4 h-4 mr-2" />
              Partager
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Exporter PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <h5 className="text-white font-medium mb-2">Automatisation</h5>
            <p className="text-white/60 text-sm mb-3">
              Génération et envoi automatique des rapports
            </p>
            <Progress value={85} className="h-2" />
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <h5 className="text-white font-medium mb-2">Personnalisation</h5>
            <p className="text-white/60 text-sm mb-3">
              Rapports adaptés à chaque stakeholder
            </p>
            <Progress value={92} className="h-2" />
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <h5 className="text-white font-medium mb-2">Intelligence IA</h5>
            <p className="text-white/60 text-sm mb-3">
              Insights et recommandations automatiques
            </p>
            <Progress value={78} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedReporting;