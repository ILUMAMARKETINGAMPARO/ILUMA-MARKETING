import React from 'react';
import { CRMProvider } from '@/contexts/CRMContext';
import CRMLogin from '@/components/crm/CRMLogin';
import CRMDashboard from '@/components/crm/CRMDashboard';
import { useCRM } from '@/contexts/CRMContext';
import { useLiloUX } from '@/hooks/useLiloUX';

const CRMIlumaCompletPage = () => {
  return (
    <CRMProvider>
      <CRMIlumaContent />
    </CRMProvider>
  );
};

const CRMIlumaContent = () => {
  const { user } = useCRM();
  const { updateMood } = useLiloUX();

  React.useEffect(() => {
    updateMood('helper', 'Bienvenue dans le CRM Iluma™! 🚀');
  }, [updateMood]);

  if (!user) {
    return <CRMLogin />;
  }

  return <CRMDashboard />;
};

export default CRMIlumaCompletPage;