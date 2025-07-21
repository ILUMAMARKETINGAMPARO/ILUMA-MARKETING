import React from 'react';
import { useMapbox } from './MapboxProvider';

interface MapboxConfigProps {
  children: (token: string | null) => React.ReactNode;
}

const MapboxConfig: React.FC<MapboxConfigProps> = ({ children }) => {
  const { token } = useMapbox();
  return <>{children(token)}</>;
};

export default MapboxConfig;