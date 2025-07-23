import React, { useState } from 'react';
import { RivalBusiness } from '@/types/rivalviews.ts';
import ClientEntryForm from './ClientEntryForm';
import ClientMetricsDisplay from './ClientMetricsDisplay';
import { 
  Users,
  Search,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClientSimplifiedInterfaceProps {
  businesses: RivalBusiness[];
  selectedBusiness: RivalBusiness | null;
  onBusinessSelect: (business: RivalBusiness) => void;
  onCompareClick: (business: RivalBusiness) => void;
  onShowMap?: () => void;
}

const ClientSimplifiedInterface: React.FC<ClientSimplifiedInterfaceProps> = ({
  businesses,
  selectedBusiness,
  onBusinessSelect,
  onCompareClick,
  onShowMap
}) => {
  const [showForm, setShowForm] = useState(true);
  const [showAllBusinesses, setShowAllBusinesses] = useState(false);

  const handleBusinessFound = (business: RivalBusiness) => {
    onBusinessSelect(business);
    setShowForm(false);
  };

  const handleShowAllBusinesses = () => {
    setShowAllBusinesses(true);
    setShowForm(false);
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setShowAllBusinesses(false);
  };

  return (
    <div className="space-y-4">
      {/* Navigation et état */}
      {!showForm && !showAllBusinesses && selectedBusiness && (
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="ghost"
            onClick={handleBackToForm}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la recherche
          </Button>
        </div>
      )}

      {/* Formulaire de recherche - Point d'entrée client */}
      {showForm && (
        <ClientEntryForm
          onBusinessFound={handleBusinessFound}
          onShowAllBusinesses={handleShowAllBusinesses}
          existingBusinesses={businesses}
        />
      )}

      {/* Liste complète des entreprises */}
      {showAllBusinesses && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground font-['Montserrat']">
                Toutes les entreprises ({businesses.length})
              </h2>
              <p className="text-muted-foreground">Cliquez sur une entreprise pour voir son analyse détaillée</p>
            </div>
            <Button
              variant="outline"
              onClick={handleBackToForm}
              className="flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Nouvelle recherche
            </Button>
          </div>

          <Card className="glass-effect border-primary/30">
            <CardHeader>
              <CardTitle className="text-lg text-foreground font-['Montserrat'] flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Toutes les entreprises • Données réelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {businesses.map((business) => (
                  <div
                    key={business.id}
                    className="p-4 rounded-lg border cursor-pointer transition-all duration-200 border-border hover:border-primary/50 hover:bg-muted/30"
                    onClick={() => handleBusinessFound(business)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground font-['Montserrat']">
                          {business.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{business.city}</span>
                          <span>{business.sector}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div className="text-center p-2 bg-green-500/10 rounded-lg">
                            <div className="font-bold text-green-400">
                              {business.organicTraffic.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">visites/mois</div>
                          </div>
                          
                          <div className="text-center p-2 bg-blue-500/10 rounded-lg">
                            <div className="font-bold text-blue-400">
                              {business.indexedKeywords}
                            </div>
                            <div className="text-xs text-muted-foreground">mots-clés</div>
                          </div>
                          
                          <div className="text-center p-2 bg-primary/10 rounded-lg">
                            <div className="font-bold text-primary">
                              {business.ilaScore}/100
                            </div>
                            <div className="text-xs text-muted-foreground">Score ILA™</div>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-accent"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBusinessFound(business);
                        }}
                      >
                        Analyser
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Affichage détaillé de l'entreprise sélectionnée */}
      {selectedBusiness && !showForm && !showAllBusinesses && (
        <ClientMetricsDisplay
          business={selectedBusiness}
          onCompareClick={() => onCompareClick(selectedBusiness)}
          competitorCount={businesses.length - 1}
        />
      )}
    </div>
  );
};

export default ClientSimplifiedInterface;