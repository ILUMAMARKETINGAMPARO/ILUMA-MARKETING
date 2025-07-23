import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Meeting {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  type: 'consultation' | 'presentation' | 'follow-up';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  aiSuggestions?: string[];
}

interface MeetingContextType {
  meetings: Meeting[];
  createMeeting: (meeting: Omit<Meeting, 'id'>) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  getMeetingsByClient: (clientId: string) => Meeting[];
  getUpcomingMeetings: () => Meeting[];
  generateAISuggestions: (clientId: string) => string[];
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const createMeeting = (meetingData: Omit<Meeting, 'id'>) => {
    const newMeeting: Meeting = {
      ...meetingData,
      id: Date.now().toString(),
    };
    setMeetings(prev => [...prev, newMeeting]);
  };

  const updateMeeting = (id: string, updates: Partial<Meeting>) => {
    setMeetings(prev => prev.map(meeting => 
      meeting.id === id ? { ...meeting, ...updates } : meeting
    ));
  };

  const deleteMeeting = (id: string) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id));
  };

  const getMeetingsByClient = (clientId: string) => {
    return meetings.filter(meeting => meeting.clientId === clientId);
  };

  const getUpcomingMeetings = () => {
    const now = new Date();
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      return meetingDate > now && meeting.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const generateAISuggestions = (clientId: string): string[] => {
    // Simulation IA pour générer des suggestions de RDV
    return [
      "Présenter le module ADLUMA™ adapté à son secteur",
      "Faire un audit SEO local en temps réel",
      "Démonstration du ROI potentiel avec ILA™",
    ];
  };

  return (
    <MeetingContext.Provider value={{
      meetings,
      createMeeting,
      updateMeeting,
      deleteMeeting,
      getMeetingsByClient,
      getUpcomingMeetings,
      generateAISuggestions,
    }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error('useMeeting must be used within a MeetingProvider');
  }
  return context;
};