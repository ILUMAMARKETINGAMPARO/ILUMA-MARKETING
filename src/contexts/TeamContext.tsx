import React, { createContext, useContext, useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  avatar: string;
  status: 'available' | 'busy' | 'offline';
  description: string;
  experience: string;
  languages: string[];
  services: string[];
  calendlyUrl: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  assignedTo?: string;
  status: 'new' | 'assigned' | 'contacted' | 'converted';
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

interface TeamContextType {
  team: TeamMember[];
  leads: Lead[];
  assignLead: (leadId: string, memberId: string) => void;
  getAvailableExpert: (service: string) => TeamMember | null;
  autoAssignLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => string;
  updateMemberStatus: (memberId: string, status: TeamMember['status']) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: 'sergio',
      name: 'Sergio Alejandro',
      role: 'Stratège Digital Senior & Fondateur',
      specialties: ['Stratégie IA', 'SEO Avancé', 'Transformation Digitale'],
      avatar: '/placeholder.svg',
      status: 'available',
      description: 'Expert en stratégie digitale avec 15+ années d\'expérience',
      experience: '15+ années',
      languages: ['Français', 'Espagnol', 'Anglais'],
      services: ['seo-ia', 'transformation-digitale', 'strategie-ia'],
      calendlyUrl: 'https://calendly.com/sergio-iluma'
    },
    {
      id: 'amparo',
      name: 'Amparo Rodriguez',
      role: 'Spécialiste Marketing Digital',
      specialties: ['Social Media', 'Content Marketing', 'Brand Strategy'],
      avatar: '/placeholder.svg',
      status: 'available',
      description: 'Experte en marketing digital et stratégie de marque',
      experience: '10+ années',
      languages: ['Français', 'Espagnol'],
      services: ['social-media', 'content-marketing', 'brand-strategy'],
      calendlyUrl: 'https://calendly.com/amparo-iluma'
    },
    {
      id: 'andrea',
      name: 'Andrea Martinez',
      role: 'Développeuse Web & UX Designer',
      specialties: ['Développement Web', 'UX/UI Design', 'Landing Pages'],
      avatar: '/placeholder.svg',
      status: 'busy',
      description: 'Spécialiste en développement et expérience utilisateur',
      experience: '8+ années',
      languages: ['Français', 'Espagnol', 'Anglais'],
      services: ['landing-aimant', 'ux-design', 'developpement-web'],
      calendlyUrl: 'https://calendly.com/andrea-iluma'
    }
  ]);

  const [leads, setLeads] = useState<Lead[]>([]);

  const getAvailableExpert = (service: string): TeamMember | null => {
    const availableExperts = team.filter(member => 
      member.status === 'available' && 
      member.services.some(s => s.includes(service) || service.includes(s))
    );
    
    return availableExperts.length > 0 ? availableExperts[0] : null;
  };

  const autoAssignLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): string => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date(),
      status: 'new'
    };

    const expert = getAvailableExpert(leadData.service);
    if (expert) {
      newLead.assignedTo = expert.id;
      newLead.status = 'assigned';
    }

    setLeads(prev => [...prev, newLead]);
    return newLead.id;
  };

  const assignLead = (leadId: string, memberId: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, assignedTo: memberId, status: 'assigned' as const }
        : lead
    ));
  };

  const updateMemberStatus = (memberId: string, status: TeamMember['status']) => {
    setTeam(prev => prev.map(member => 
      member.id === memberId ? { ...member, status } : member
    ));
  };

  return (
    <TeamContext.Provider value={{
      team,
      leads,
      assignLead,
      getAvailableExpert,
      autoAssignLead,
      updateMemberStatus
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};