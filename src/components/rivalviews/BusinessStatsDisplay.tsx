import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Star, Globe, Target, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client.ts";
import { motion } from "framer-motion";

interface BusinessStats {
  total_businesses: number;
  high_potential: number;
  average_ila_score: number;
  average_domain_rating: number;
  last_updated: string;
}

interface BusinessStatsDisplayProps {
  refreshTrigger?: number;
}

const BusinessStatsDisplay: React.FC<BusinessStatsDisplayProps> = ({ refreshTrigger }) => {
  const [stats, setStats] = useState<BusinessStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_business_statistics');
      
      if (error) {
        console.error('Error fetching business statistics:', error);
        return;
      }

      setStats(data as unknown as BusinessStats);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Aucune donnée disponible</p>
        </CardContent>
      </Card>
    );
  }

  const highPotentialPercentage = stats.total_businesses > 0 
    ? Math.round((stats.high_potential / stats.total_businesses) * 100) 
    : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getDomainRatingLevel = (rating: number) => {
    if (rating >= 50) return { label: "Excellent", color: "bg-green-500" };
    if (rating >= 30) return { label: "Bon", color: "bg-blue-500" };
    if (rating >= 15) return { label: "Moyen", color: "bg-yellow-500" };
    return { label: "Faible", color: "bg-red-500" };
  };

  const drLevel = getDomainRatingLevel(stats.average_domain_rating);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Entreprises
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.total_businesses}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Base de données complète
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Haut Potentiel
              </CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-green-600">
                {stats.high_potential}
              </div>
              <Badge variant="secondary" className="text-xs">
                {highPotentialPercentage}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Score ILA™ ≥ 80 + Keywords ≥ 15
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Score ILA™ Moyen
              </CardTitle>
              <Brain className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                {stats.average_ila_score}
              </div>
              <Badge 
                variant="secondary" 
                className={`text-xs ${getScoreColor(stats.average_ila_score)}`}
              >
                /100
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Intelligence Locale Avancée
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Domain Rating Moyen
              </CardTitle>
              <Globe className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-orange-600">
                {stats.average_domain_rating}
              </div>
              <Badge 
                variant="secondary" 
                className={`text-xs text-white ${drLevel.color}`}
              >
                {drLevel.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Autorité de domaine (Ahrefs)
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="md:col-span-2 lg:col-span-4"
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-purple-900">
                    Définition "Haut Potentiel" Iluma™
                  </p>
                  <p className="text-sm text-purple-700">
                    Score ILA™ ≥ 80/100 + minimum 15 mots-clés bien positionnés = opportunité commerciale prioritaire
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">
                Algorithme IA
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BusinessStatsDisplay;