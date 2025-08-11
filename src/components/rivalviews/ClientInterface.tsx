import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, Eye, Search, Filter, Star, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevolveViewsClient from './RevolveViewsClient';
import { useTranslations } from '@/hooks/useTranslations';
const ClientInterface = () => {
  const {
    t
  } = useTranslations();
  const [showMap, setShowMap] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Données d'exemple pour l'interface client
  const quickStats = [{
    label: t('competitor.stats.analyzed'),
    value: '2,847',
    icon: Users
  }, {
    label: t('competitor.stats.avgScore'),
    value: '73',
    icon: TrendingUp
  }, {
    label: t('competitor.stats.zones'),
    value: '15',
    icon: MapPin
  }, {
    label: t('competitor.stats.updated'),
    value: t('competitor.stats.realTime'),
    icon: Star
  }];
  const topOpportunities = [{
    name: 'Restaurant Le Gourmet',
    city: 'Montréal',
    score: 45,
    potential: 'high',
    reason: t('competitor.opportunities.strongVisibility')
  }, {
    name: 'Café Central',
    city: 'Laval',
    score: 38,
    potential: 'medium',
    reason: t('competitor.opportunities.excellentReviews')
  }, {
    name: 'Boulangerie Artisan',
    city: 'Longueuil',
    score: 52,
    potential: 'high',
    reason: t('competitor.opportunities.googleMaps')
  }];
  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'low':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };
  if (showMap) {
    return <RevolveViewsClient />;
  }
  return;
};
export default ClientInterface;