import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Building2, 
  MapPin, 
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { RivalBusiness } from '@/types/rivalviews.ts';
import { supabase } from "@/integrations/supabase/client.ts";

interface ClientEntryFormProps {
  onBusinessFound: (business: RivalBusiness) => void;
  onShowAllBusinesses: () => void;
  existingBusinesses: RivalBusiness[];
}

const ClientEntryForm: React.FC<ClientEntryFormProps> = ({
  onBusinessFound,
  onShowAllBusinesses,
  existingBusinesses
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RivalBusiness[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<RivalBusiness | null>(null);

  // Recherche en temps réel dans la base de données
  const performSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .or(`name.ilike.%${query}%, website.ilike.%${query}%, city.ilike.%${query}%`)
        .limit(8);

      if (error) throw error;

      const mappedResults: RivalBusiness[] = (data || []).map(business => ({
        id: business.id,
        name: business.name,
        address: business.address || '',
        city: business.city,
        phone: business.phone || '',
        email: '',
        website: business.website || '',
        sector: business.sector,
        googleRating: business.google_rating || 0,
        reviewCount: business.review_count || 0,
        serpRank: business.serp_rank || 0,
        isSponsored: business.is_sponsored || false,
        source: business.source as 'SEO' | 'GMB' | 'Ads' | 'Social' || 'SEO',
        lat: business.lat || 0,
        lng: business.lng || 0,
        ilaScore: business.ila_score || 0,
        status: business.status as 'prospect' | 'contacted' | 'client' | 'lost' || 'prospect',
        potential: business.potential as 'low' | 'medium' | 'high' || 'medium',
        isChain: business.is_chain || false,
        indexedKeywords: business.indexed_keywords || 0,
        top10Keywords: business.top10_keywords || 0,
        topKeyword: business.website?.split('.')[0] || '',
        topKeywordVolume: business.organic_traffic || 0,
        backlinks: business.backlinks || 0,
        organicTraffic: business.organic_traffic || 0,
        totalComments: business.total_comments || 0,
        hasPhotos: business.has_photos || false,
        distanceFromUser: 0,
        lastReview: '',
        avgPosition: business.serp_rank || 0,
      }));

      setSearchResults(mappedResults);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleBusinessSelect = (business: RivalBusiness) => {
    setSelectedBusiness(business);
    onBusinessFound(business);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '🚀 Excellent';
    if (score >= 60) return '⚡ Bon';
    if (score >= 40) return '⚖️ Moyen';
    return '💡 À améliorer';
  };

  return (
    <div className="space-y-6">
      {/* Formulaire d'entrée ultra-simple */}
      <Card className="glass-effect border-primary/30">
        <CardHeader>
          <CardTitle className="text-xl text-foreground font-['Montserrat'] flex items-center gap-2">
            <Search className="w-6 h-6 text-primary" />
            Trouvez votre entreprise
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Recherchez par nom d'entreprise, site web ou ville pour voir votre position concurrentielle
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Ex: Mon Restaurant, monsite.com, ou Montréal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base border-primary/20 focus:border-primary/50"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Clock className="w-4 h-4 text-primary animate-spin" />
              </div>
            )}
          </div>

          {/* Suggestion rapide */}
          {searchQuery.length === 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Essayez:</span>
              {['Restaurant', 'Garage', 'Coiffeur', 'Dentiste'].map((suggestion) => (
                <Badge 
                  key={suggestion}
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/10 text-xs"
                  onClick={() => setSearchQuery(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Résultats de recherche en temps réel */}
      {searchResults.length > 0 && (
        <Card className="glass-effect border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg text-foreground font-['Montserrat'] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              {searchResults.length} entreprise{searchResults.length > 1 ? 's' : ''} trouvée{searchResults.length > 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchResults.map((business) => (
                <div
                  key={business.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedBusiness?.id === business.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-muted/30'
                  }`}
                  onClick={() => handleBusinessSelect(business)}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground font-['Montserrat']">
                          {business.name}
                        </h3>
                        {selectedBusiness?.id === business.id && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {business.city}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {business.sector}
                        </div>
                      </div>

                      {/* Métriques essentielles en un coup d'œil */}
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        <div className="text-center p-2 bg-green-500/10 rounded-lg">
                          <div className="text-sm font-bold text-green-400">
                            {business.organicTraffic.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">visites/mois</div>
                        </div>
                        
                        <div className="text-center p-2 bg-blue-500/10 rounded-lg">
                          <div className="text-sm font-bold text-blue-400">
                            {business.indexedKeywords}
                          </div>
                          <div className="text-xs text-muted-foreground">mots-clés</div>
                        </div>
                        
                        <div className={`text-center p-2 rounded-lg border ${getScoreColor(business.ilaScore)}`}>
                          <div className="text-sm font-bold">
                            {business.ilaScore}/100
                          </div>
                          <div className="text-xs">Score ILA™</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getScoreColor(business.ilaScore)}>
                        {getScoreLabel(business.ilaScore)}
                      </Badge>
                      
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-accent text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBusinessSelect(business);
                        }}
                      >
                        Analyser
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message si aucun résultat */}
      {searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
        <Card className="glass-effect border-orange-500/30">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Entreprise non trouvée
            </h3>
            <p className="text-muted-foreground mb-4">
              Votre entreprise n'est pas encore dans notre base de données.
            </p>
            <Button 
              onClick={onShowAllBusinesses}
              className="bg-gradient-to-r from-primary to-accent"
            >
              Voir toutes les entreprises disponibles
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Bouton pour voir toutes les entreprises */}
      {searchQuery.length === 0 && existingBusinesses.length > 0 && (
        <Card className="glass-effect border-accent/30">
          <CardContent className="p-6 text-center">
            <Building2 className="w-12 h-12 text-accent mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Explorer toutes les entreprises
            </h3>
            <p className="text-muted-foreground mb-4">
              Découvrez les {existingBusinesses.length} entreprises de notre base de données
            </p>
            <Button 
              onClick={onShowAllBusinesses}
              variant="outline"
              className="border-accent/30 text-accent hover:bg-accent/10"
            >
              Voir la liste complète
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientEntryForm;