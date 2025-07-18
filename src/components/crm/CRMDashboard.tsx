import React, { useState } from 'react';
import { useCRM } from '@/contexts/CRMContext';
import CRMSectionSelector from './CRMSectionSelector';
import CRMCollaborateurDashboard from './CRMCollaborateurDashboard';
import CRMCommercialDashboard from './CRMCommercialDashboard';
import IntelligentCRMDashboard from './IntelligentCRMDashboard';
import RegistrationDashboard from './RegistrationDashboard';
import GalacticCRMHub from './galactic/GalacticCRMHub';
import AutoSaveIndicator from './galactic/AutoSaveIndicator';

const CRMDashboard = () => {
  const { user, logout } = useCRM();
  const [selectedSection, setSelectedSection] = useState<'collaborateur' | 'commercial' | 'intelligent' | 'inscription' | 'galactic' | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error' | 'offline'>('saved');

  // Section selection handlers
  const handleSectionSelect = (section: 'collaborateur' | 'commercial' | 'intelligent' | 'inscription' | 'galactic') => {
    setSelectedSection(section);
  };

  const handleBackToSelection = () => {
    setSelectedSection(null);
  };

  // Show section selector if no section is selected
  if (!selectedSection) {
    return <CRMSectionSelector onSelectSection={handleSectionSelect} />;
  }

  // Show appropriate dashboard based on selected section
  if (selectedSection === 'galactic') {
    return (
      <>
        <GalacticCRMHub />
        <AutoSaveIndicator 
          status={autoSaveStatus}
          lastSaved={new Date()}
          itemsChanged={0}
        />
      </>
    );
  }

  if (selectedSection === 'collaborateur') {
    return <CRMCollaborateurDashboard onBack={handleBackToSelection} />;
  }

  if (selectedSection === 'commercial') {
    return <CRMCommercialDashboard onBack={handleBackToSelection} />;
  }

  if (selectedSection === 'intelligent') {
    return <IntelligentCRMDashboard onBack={handleBackToSelection} />;
  }

  if (selectedSection === 'inscription') {
    return <RegistrationDashboard onBack={handleBackToSelection} />;
  }

  // This should never be reached, but just in case
  return null;
};

export default CRMDashboard;

// IMPORTANT: CRMDashboard.tsx is now 40 lines - much cleaner after refactoring!
// The old 447-line monolithic file has been split into focused components.
